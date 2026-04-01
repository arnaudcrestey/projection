import OpenAI from "openai";
import { buildFallbackProjection } from "@/lib/projection/fallback";
import { buildProjectionPrompt } from "@/lib/projection/prompt";
import type { ProjectionAnswers, ProjectionResult } from "@/lib/projection/types";

function normalizeResult(value: unknown): ProjectionResult | null {
  if (!value || typeof value !== "object") return null;

  const candidate = value as Record<string, unknown>;
  const vision = typeof candidate.vision === "string" ? candidate.vision.trim() : "";
  const clarity = typeof candidate.clarity === "string" ? candidate.clarity.trim() : "";
  const nextStep = typeof candidate.nextStep === "string" ? candidate.nextStep.trim() : "";

  if (!vision || !clarity || !nextStep) {
    return null;
  }

  return {
    vision,
    clarity,
    nextStep,
  };
}

function extractJsonObject(content: string): ProjectionResult | null {
  const trimmed = content.trim();

  const direct = tryParseJson(trimmed);
  if (direct) return direct;

  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fencedMatch?.[1]) {
    const fenced = tryParseJson(fencedMatch[1]);
    if (fenced) return fenced;
  }

  const objectMatch = trimmed.match(/\{[\s\S]*\}/);
  if (objectMatch?.[0]) {
    const extracted = tryParseJson(objectMatch[0]);
    if (extracted) return extracted;
  }

  return null;
}

function tryParseJson(content: string): ProjectionResult | null {
  try {
    const parsed = JSON.parse(content);
    return normalizeResult(parsed);
  } catch {
    return null;
  }
}

export async function generateProjection(
  answers: ProjectionAnswers
): Promise<ProjectionResult> {
  if (!process.env.OPENAI_API_KEY) {
    return buildFallbackProjection(answers);
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.responses.create({
      model: "gpt-4.1-mini",
      temperature: 0.45,
      text: {
        format: {
          type: "json_schema",
          name: "projection_result",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              vision: { type: "string" },
              clarity: { type: "string" },
              nextStep: { type: "string" },
            },
            required: ["vision", "clarity", "nextStep"],
          },
        },
      },
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text:
                "Tu reformules des activités de manière claire, premium, crédible et naturelle. " +
                "Tu écris en français. Tu évites le jargon d’agence, le ton marketing, les phrases génériques, " +
                "les tournures floues et les formulations trop artificielles. " +
                "Tu privilégies la netteté, la tenue, la simplicité et la qualité perçue.",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: buildProjectionPrompt(answers),
            },
          ],
        },
      ],
    });

    const text = completion.output_text?.trim();
    if (!text) {
      return buildFallbackProjection(answers);
    }

    const parsed = extractJsonObject(text);
    return parsed ?? buildFallbackProjection(answers);
  } catch {
    return buildFallbackProjection(answers);
  }
}

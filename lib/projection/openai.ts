import OpenAI from "openai";
import { buildFallbackProjection } from "@/lib/projection/fallback";
import { buildProjectionPrompt } from "@/lib/projection/prompt";
import { enhanceProjection } from "@/lib/projection/enhance";
import { refineProjection } from "@/lib/projection/refine";
import type { ProjectionAnswers, ProjectionResult } from "@/lib/projection/types";

function normalizeResult(value: unknown): ProjectionResult | null {
  if (!value || typeof value !== "object") return null;

  const candidate = value as Record<string, unknown>;

  const vision =
    typeof candidate.vision === "string" ? candidate.vision.trim() : "";
  const clarity =
    typeof candidate.clarity === "string" ? candidate.clarity.trim() : "";
  const nextStep =
    typeof candidate.nextStep === "string" ? candidate.nextStep.trim() : "";

  if (!vision || !clarity || !nextStep) {
    return null;
  }

  return {
    vision,
    clarity,
    nextStep,
  };
}

function tryParseJson(content: string): ProjectionResult | null {
  try {
    const parsed = JSON.parse(content);
    return normalizeResult(parsed);
  } catch {
    return null;
  }
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

function finalizeProjection(
  result: ProjectionResult,
  answers: ProjectionAnswers
): ProjectionResult {
  return enhanceProjection(refineProjection(result), answers);
}

function buildSafeFallback(answers: ProjectionAnswers): ProjectionResult {
  return finalizeProjection(buildFallbackProjection(answers), answers);
}

export async function generateProjection(
  answers: ProjectionAnswers
): Promise<ProjectionResult> {
  if (!process.env.OPENAI_API_KEY) {
    return buildSafeFallback(answers);
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
                "Tu reformules des activités de manière claire, crédible et naturelle. " +
                "Tu écris en français. Tu évites le jargon d’agence, le ton marketing, " +
                "les phrases génériques, les tournures floues et les formulations artificielles. " +
                "Tu privilégies la netteté, la simplicité, la précision et l’utilité.",
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
      return buildSafeFallback(answers);
    }

    const parsed = extractJsonObject(text);

    if (!parsed) {
      return buildSafeFallback(answers);
    }

    return finalizeProjection(parsed, answers);
  } catch {
    return buildSafeFallback(answers);
  }
}

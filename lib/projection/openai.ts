import OpenAI from "openai";
import { buildFallbackProjection } from "@/lib/projection/fallback";
import { buildProjectionPrompt } from "@/lib/projection/prompt";
import type { ProjectionAnswers, ProjectionResult } from "@/lib/projection/types";

function parseModelResult(content: string): ProjectionResult | null {
  try {
    const parsed = JSON.parse(content) as ProjectionResult;

    if (parsed.vision && parsed.clarity && parsed.nextStep) {
      return parsed;
    }

    return null;
  } catch {
    return null;
  }
}

export async function generateProjection(answers: ProjectionAnswers): Promise<ProjectionResult> {
  if (!process.env.OPENAI_API_KEY) {
    return buildFallbackProjection(answers);
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = buildProjectionPrompt(answers);

    const completion = await client.responses.create({
      model: "gpt-4.1-mini",
      temperature: 0.4,
      input: prompt,
    });

    const text = completion.output_text?.trim();
    if (!text) return buildFallbackProjection(answers);

    const parsed = parseModelResult(text);
    return parsed ?? buildFallbackProjection(answers);
  } catch {
    return buildFallbackProjection(answers);
  }
}

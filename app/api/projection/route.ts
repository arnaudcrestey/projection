import { NextResponse } from "next/server";
import { generateProjection } from "@/lib/projection/openai";
import { projectionQuestions } from "@/lib/projection/questions";
import type { ProjectionAnswers } from "@/lib/projection/types";

type ProjectionPayload = {
  answers?: ProjectionAnswers;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ProjectionPayload;
    const answers = body.answers ?? {};

    for (const question of projectionQuestions) {
      const value = answers[question.id]?.trim() ?? "";
      if (value.length < (question.minLength ?? 1)) {
        return NextResponse.json(
          { success: false, error: `Réponse insuffisante pour: ${question.label}` },
          { status: 400 }
        );
      }
    }

    const result = await generateProjection(answers);

    return NextResponse.json({ success: true, result });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Impossible de produire la projection pour le moment."
      },
      { status: 500 }
    );
  }
}

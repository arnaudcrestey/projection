import type { ProjectionAnswers, ProjectionResult } from "@/lib/projection/types";

function pick(answers: ProjectionAnswers, key: string, fallback: string) {
  const value = answers[key]?.trim();
  return value && value.length > 0 ? value : fallback;
}

export function buildFallbackProjection(answers: ProjectionAnswers): ProjectionResult {
  const audience = pick(
    answers,
    "audience",
    "des personnes en transition ou en doute"
  );

  const immediateUnderstanding = pick(
    answers,
    "immediateUnderstanding",
    "vous les aidez à clarifier leur situation et à avancer plus concrètement"
  );

  return {
    vision: `Vous accompagnez ${audience}. Vous les aidez à y voir plus clair et à retrouver une direction.`,
    clarity: `On doit comprendre rapidement que ${immediateUnderstanding}. La personne doit pouvoir prendre contact simplement pour faire le point.`,
    nextStep: `La première étape peut être un échange simple pour faire le point sur la situation et voir comment vous pouvez aider.`,
  };
}

import type { ProjectionAnswers, ProjectionResult } from "@/lib/projection/types";

function pick(answers: ProjectionAnswers, key: string, fallback: string) {
  const value = answers[key]?.trim();
  return value && value.length > 0 ? value : fallback;
}

export function buildFallbackProjection(answers: ProjectionAnswers): ProjectionResult {
  const activity = pick(
    answers,
    "activity",
    "vous accompagnez des personnes à mieux comprendre leur situation"
  );

  const audience = pick(
    answers,
    "audience",
    "des personnes qui ont besoin d’y voir plus clair"
  );

  const immediateUnderstanding = pick(
    answers,
    "immediateUnderstanding",
    "vous les aidez à clarifier ce qu’elles vivent et à avancer plus concrètement"
  );

  const action = pick(
    answers,
    "naturalAction",
    "prendre un premier échange pour faire le point"
  );

  return {
    vision: `Vous accompagnez ${audience}. Votre activité consiste à ${activity}.`,
    clarity: `On doit comprendre rapidement que ${immediateUnderstanding}. La personne doit pouvoir ${action}.`,
    nextStep: `La première étape peut être un échange simple pour faire le point sur la situation et voir comment vous pouvez aider.`,
  };
}

import type { ProjectionAnswers, ProjectionResult } from "@/lib/projection/types";

function hasText(value?: string) {
  return typeof value === "string" && value.trim().length > 0;
}

function getAudienceLabel(answers: ProjectionAnswers) {
  const audience = answers.audience?.toLowerCase() ?? "";

  if (
    audience.includes("transition") ||
    audience.includes("doute") ||
    audience.includes("blocage")
  ) {
    return "des personnes en transition, en doute ou en blocage";
  }

  if (
    audience.includes("indépendant") ||
    audience.includes("entrepreneur") ||
    audience.includes("professionnel")
  ) {
    return "des professionnels qui ont besoin d’y voir plus clair";
  }

  return "des personnes qui ont besoin d’y voir plus clair";
}

function getVision(answers: ProjectionAnswers) {
  const activity = answers.activity?.toLowerCase() ?? "";

  if (
    activity.includes("clar") ||
    activity.includes("comprendre") ||
    activity.includes("situation")
  ) {
    return "Vous aidez à mieux comprendre une situation et à retrouver une direction claire.";
  }

  if (
    activity.includes("accompagn") ||
    activity.includes("plan d’action") ||
    activity.includes("avancer")
  ) {
    return "Vous accompagnez pour clarifier une situation et avancer de manière plus structurée.";
  }

  return "Vous accompagnez pour clarifier une situation et avancer plus concrètement.";
}

function getClarity(answers: ProjectionAnswers) {
  const immediate = answers.immediateUnderstanding?.toLowerCase() ?? "";
  const action = hasText(answers.naturalAction);

  if (
    immediate.includes("plan d’action") ||
    immediate.includes("concret") ||
    immediate.includes("avancer")
  ) {
    return `On doit comprendre rapidement que vous aidez à clarifier une situation et à avancer concrètement. La personne doit pouvoir ${action ? "prendre contact simplement pour faire le point" : "passer facilement à une première étape claire"}.`;
  }

  return `On doit comprendre rapidement que vous aidez à y voir plus clair et à prendre du recul. La personne doit pouvoir ${action ? "prendre contact simplement pour faire le point" : "passer facilement à une première étape claire"}.`;
}

export function buildFallbackProjection(
  answers: ProjectionAnswers
): ProjectionResult {
  const audience = getAudienceLabel(answers);
  const vision = getVision(answers);
  const clarity = getClarity(answers);

  return {
    vision: `Vous accompagnez ${audience}. ${vision}`,
    clarity,
    nextStep:
      "La première étape peut être un échange simple pour faire le point sur la situation et voir comment vous pouvez aider.",
  };
}

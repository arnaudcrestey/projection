import type { ProjectionAnswers, ProjectionResult } from "@/lib/projection/types";

function pick(answers: ProjectionAnswers, key: string, defaultText: string) {
  const value = answers[key]?.trim();
  return value && value.length > 0 ? value : defaultText;
}

export function buildFallbackProjection(answers: ProjectionAnswers): ProjectionResult {
  const activity = pick(answers, "activity", "votre activité actuelle");
  const audience = pick(answers, "audience", "vos interlocuteurs prioritaires");
  const objective = pick(
    answers,
    "immediateUnderstanding",
    "la valeur concrète que vous apportez"
  );
  const blur = pick(answers, "currentBlur", "la dispersion actuelle de votre message");
  const impact = pick(answers, "impactOfClarity", "une dynamique plus lisible et plus stable");
  const action = pick(answers, "naturalAction", "demander un premier échange ciblé");
  const impression = pick(answers, "firstImpression", "une impression de sérieux et de maîtrise");

  return {
    vision: `Votre activité peut être présentée comme un point de repère clair autour de ${activity}, orienté vers ${audience}. La projection consiste à réduire la dispersion et à installer une lecture immédiate de votre rôle.`,
    centralMessage: `Vous accompagnez ${audience} pour obtenir ${objective}, avec une méthode lisible et structurée. L'enjeu principal est de transformer ${blur} en trajectoire compréhensible.`,
    userExperience: `L'expérience projetée commence par une entrée simple, explicite et rassurante, puis guide naturellement vers vos contenus de preuve et vos modalités d'accompagnement. Le parcours doit confirmer ${impression}.`,
    recommendedEntryPoint: `Construire une page d'entrée unique qui explicite votre promesse, vos bénéficiaires et l'action attendue (${action}) dans les premiers écrans.`,
    closingNote: `Si cette direction est alignée avec votre intention, la prochaine étape consiste à cadrer une version opérationnelle priorisant ${impact}.`
  };
}

import type { ProjectionAnswers, ProjectionResult } from "@/lib/projection/types";

function clean(value?: string) {
  return value?.trim() ?? "";
}

function containsOneOf(value: string, keywords: string[]) {
  return keywords.some((keyword) => value.includes(keyword));
}

function getAudience(answers: ProjectionAnswers) {
  const audience = clean(answers.audience).toLowerCase();

  if (
    containsOneOf(audience, [
      "indépendant",
      "independant",
      "consultant",
      "expert",
      "entrepreneur",
      "professionnel",
      "formateur",
    ])
  ) {
    return "des indépendants, consultants et professionnels";
  }

  if (
    containsOneOf(audience, [
      "transition",
      "doute",
      "blocage",
      "repère",
      "reperes",
      "sens",
    ])
  ) {
    return "des personnes qui traversent une phase de doute, de transition ou de blocage";
  }

  return "des personnes qui ont besoin d’y voir plus clair";
}

function getVision(answers: ProjectionAnswers) {
  const activity = clean(answers.activity).toLowerCase();
  const audience = getAudience(answers);

  if (
    containsOneOf(activity, [
      "numérique",
      "numerique",
      "site",
      "parcours",
      "diagnostic",
      "page",
      "digital",
    ])
  ) {
    return `Vous concevez des pages, diagnostics ou parcours digitaux pour ${audience}, afin de rendre leur activité plus claire et plus facile à comprendre.`;
  }

  if (
    containsOneOf(activity, [
      "clar",
      "comprendre",
      "situation",
      "recul",
      "direction",
    ])
  ) {
    return `Vous apportez un cadre clair à ${audience}, pour les aider à mieux comprendre leur situation et à retrouver une direction plus lisible.`;
  }

  return `Vous intervenez auprès de ${audience} pour rendre une situation plus claire, plus lisible et plus simple à faire avancer.`;
}

function getClarity(answers: ProjectionAnswers) {
  const immediate = clean(answers.immediateUnderstanding).toLowerCase();
  const action = clean(answers.naturalAction).toLowerCase();

  if (
    containsOneOf(immediate, [
      "ce que je fais",
      "à qui",
      "a qui",
      "concrètement",
      "concretement",
      "offre",
      "bénéfice",
      "benefice",
    ])
  ) {
    return "On comprend rapidement ce que vous proposez, à qui cela s’adresse et ce que cela peut apporter concrètement.";
  }

  if (
    containsOneOf(action, [
      "contact",
      "échange",
      "echange",
      "diagnostic",
      "premier échange",
      "premier echange",
    ])
  ) {
    return "Votre activité doit être perçue comme claire, sérieuse et simple à engager, avec une première étape naturelle pour aller plus loin.";
  }

  return "Votre activité doit se comprendre vite, inspirer confiance et donner envie d’engager une première démarche simple.";
}

function getNextStep(answers: ProjectionAnswers) {
  const action = clean(answers.naturalAction).toLowerCase();
  const blur = clean(answers.currentBlur).toLowerCase();

  if (
    containsOneOf(action, ["diagnostic", "analyse", "audit"])
  ) {
    return "La première étape peut être un diagnostic ciblé pour repérer ce qui mérite d’être clarifié avant d’aller plus loin.";
  }

  if (
    containsOneOf(action, ["échange", "echange", "contact", "rendez-vous", "rdv"])
  ) {
    return "La première étape peut être un échange simple pour poser les bases, clarifier le besoin et voir comment avancer dans le bon sens.";
  }

  if (
    containsOneOf(blur, ["offre", "positionnement", "flou", "comprendre"])
  ) {
    return "La première étape peut être un travail bref de clarification pour rendre votre activité plus lisible et mieux orienter la suite.";
  }

  return "La première étape peut être un échange court pour clarifier l’essentiel et définir la suite la plus cohérente.";
}

export function buildFallbackProjection(
  answers: ProjectionAnswers
): ProjectionResult {
  return {
    vision: getVision(answers),
    clarity: getClarity(answers),
    nextStep: getNextStep(answers),
  };
}

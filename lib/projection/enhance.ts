import type { ProjectionResult } from "@/lib/projection/types";

function normalize(text: string) {
  return text.replace(/\s+/g, " ").replace(/\.\s*\./g, ".").trim();
}

function includesOneOf(text: string, patterns: string[]) {
  const lower = text.toLowerCase();
  return patterns.some((pattern) => lower.includes(pattern));
}

function isWeakVision(text: string) {
  return includesOneOf(text, [
    "j’aide",
    "je aide",
    "vous aide",
    "accompagne",
    "permet",
    "accessible",
    "attractif",
    "message",
    "valeur",
    "agir",
    "sans hésitation",
    "interface numérique",
    "interfaces numériques",
  ]);
}

function isWeakClarity(text: string) {
  return includesOneOf(text, [
    "j’aide",
    "vous aide",
    "message",
    "valeur",
    "agir",
    "accessible",
    "attractif",
    "sans hésitation",
    "vous découvrez",
    "vous découvrirez",
    "vous pourrez",
    "vous allez",
  ]);
}

function isWeakNextStep(text: string) {
  return includesOneOf(text, [
    "consultez",
    "demandez",
    "évaluez",
    "évaluer",
    "commencez par",
    "diagnostic simple",
    "communication actuelle",
  ]);
}

function rewriteVision(text: string) {
  const cleaned = normalize(text);

  if (!isWeakVision(cleaned)) {
    return cleaned;
  }

  if (
    includesOneOf(cleaned, [
      "interface numérique",
      "interfaces numériques",
      "page",
      "pages",
      "diagnostic",
      "parcours",
    ])
  ) {
    return "Vous concevez des pages, diagnostics et parcours pour des indépendants et experts qui ont besoin de rendre leur offre plus claire et plus facile à comprendre.";
  }

  return "Vous rendez une offre plus lisible, plus claire et plus simple à comprendre pour les personnes auxquelles elle s’adresse.";
}

function rewriteClarity(text: string) {
  const cleaned = normalize(text);

  if (!isWeakClarity(cleaned)) {
    return cleaned;
  }

  return "On comprend rapidement ce que vous proposez, à qui cela s’adresse et pourquoi cela donne envie de vous contacter.";
}

function rewriteNextStep(text: string) {
  const cleaned = normalize(text);

  if (!isWeakNextStep(cleaned)) {
    return cleaned;
  }

  if (includesOneOf(cleaned, ["diagnostic", "audit", "analyse"])) {
    return "La première étape peut être un diagnostic ciblé pour repérer ce qui mérite d’être clarifié avant d’aller plus loin.";
  }

  if (includesOneOf(cleaned, ["page", "dédiée", "dediee"])) {
    return "La première étape peut être une page ou un point d’entrée dédié pour clarifier le positionnement et orienter la suite.";
  }

  return "La première étape peut être un échange simple pour clarifier l’essentiel et poser une base plus nette pour la suite.";
}

export function enhanceProjection(result: ProjectionResult): ProjectionResult {
  return {
    vision: rewriteVision(result.vision),
    clarity: rewriteClarity(result.clarity),
    nextStep: rewriteNextStep(result.nextStep),
  };
}

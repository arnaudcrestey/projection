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

  if (cleaned.length > 85 && !isWeakVision(cleaned)) {
    return cleaned;
  }

  if (
    includesOneOf(cleaned, [
      "page",
      "pages",
      "diagnostic",
      "diagnostics",
      "parcours",
      "dispositif",
      "dispositifs",
      "point d’entrée",
      "points d’entrée",
      "point d'entree",
      "points d'entree",
    ])
  ) {
    return "Vous concevez des pages, diagnostics et dispositifs qui rendent une offre plus claire, plus lisible et plus facile à comprendre.";
  }

  if (
    includesOneOf(cleaned, [
      "interface numérique",
      "interfaces numériques",
      "numérique",
      "numerique",
      "digital",
      "digitaux",
    ])
  ) {
    return "Vous concevez des pages et dispositifs digitaux qui rendent une offre immédiatement plus claire et plus simple à comprendre.";
  }

  return "Vous rendez une offre plus claire, plus lisible et plus facile à comprendre pour les personnes auxquelles elle s’adresse.";
}

function rewriteClarity(text: string) {
  const cleaned = normalize(text);

  if (cleaned.length > 85 && !isWeakClarity(cleaned)) {
    return cleaned;
  }

  return "On comprend rapidement ce que vous proposez, à qui cela s’adresse et pourquoi cela mérite qu’on s’y intéresse.";
}

function rewriteNextStep(text: string) {
  const cleaned = normalize(text);

  if (cleaned.length > 85 && !isWeakNextStep(cleaned)) {
    return cleaned;
  }

  if (includesOneOf(cleaned, ["diagnostic", "audit", "analyse"])) {
    return "La première étape peut être un diagnostic ciblé pour identifier ce qui freine la compréhension et clarifier le bon point d’entrée.";
  }

  if (includesOneOf(cleaned, ["page", "dédiée", "dediee", "point d’entrée", "point d'entree"])) {
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

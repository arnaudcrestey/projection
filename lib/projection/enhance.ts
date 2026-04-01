import type { ProjectionResult } from "@/lib/projection/types";

function isWeak(text: string) {
  const lower = text.toLowerCase();

  return (
    lower.includes("j’aide") ||
    lower.includes("vous aide") ||
    lower.includes("message") ||
    lower.includes("valeur") ||
    lower.includes("agir") ||
    lower.includes("accompagne") ||
    lower.includes("permet") ||
    lower.includes("accessible") ||
    lower.includes("attractif") ||
    lower.includes("sans hésitation")
  );
}

function rewriteVision(text: string) {
  if (isWeak(text)) {
    return text
      .replace(/j[’']aide.*?/, "")
      .replace(/vous aide.*?/, "")
      .replace(/afin de/gi, "pour")
      .replace(/faciliter/gi, "simplifier")
      .trim();
  }

  return text;
}

function rewriteClarity(text: string) {
  if (isWeak(text)) {
    return "On comprend rapidement ce que vous proposez, à qui cela s’adresse et pourquoi cela donne envie d’aller plus loin.";
  }

  return text;
}

function rewriteNextStep(text: string) {
  if (isWeak(text)) {
    return text
      .replace(/consultez/gi, "La première étape peut être")
      .replace(/demandez/gi, "ou demander")
      .trim();
  }

  return text;
}

export function enhanceProjection(result: ProjectionResult): ProjectionResult {
  return {
    vision: rewriteVision(result.vision),
    clarity: rewriteClarity(result.clarity),
    nextStep: rewriteNextStep(result.nextStep),
  };
}

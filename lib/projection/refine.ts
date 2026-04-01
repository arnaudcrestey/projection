import type { ProjectionResult } from "@/lib/projection/types";

function cleanText(text: string) {
  return text
    .replace(/\s+/g, " ")
    .replace(/\.\s*\./g, ".")
    .trim();
}

function removeWeakPhrases(text: string) {
  return text
    .replace(/vous découvrirez/gi, "")
    .replace(/vous pourrez/gi, "")
    .replace(/vous allez/gi, "")
    .replace(/vous apprendrez/gi, "")
    .trim();
}

function simplify(text: string) {
  return text
    .replace(/afin de/gi, "pour")
    .replace(/dans le but de/gi, "pour")
    .replace(/permettre de/gi, "")
    .trim();
}

function tighten(text: string) {
  return text
    .replace(/très\s+/gi, "")
    .replace(/rapidement\s+/gi, "")
    .replace(/facilement\s+/gi, "")
    .trim();
}

export function refineProjection(result: ProjectionResult): ProjectionResult {
  return {
    vision: finalize(result.vision),
    clarity: finalize(result.clarity),
    nextStep: finalize(result.nextStep),
  };
}

function finalize(text: string) {
  let t = cleanText(text);
  t = removeWeakPhrases(t);
  t = simplify(t);
  t = tighten(t);

  return t;
}

import type { ProjectionAnswers, ProjectionResult } from "@/lib/projection/types";

const ANSWERS_KEY = "projection_answers_v2";
const RESULT_KEY = "projection_result_v2";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";
}

export function saveAnswers(answers: ProjectionAnswers) {
  if (!canUseStorage()) return;
  window.sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
}

export function loadAnswers(): ProjectionAnswers {
  if (!canUseStorage()) return {};
  const raw = window.sessionStorage.getItem(ANSWERS_KEY);
  if (!raw) return {};

  try {
    return JSON.parse(raw) as ProjectionAnswers;
  } catch {
    return {};
  }
}

export function saveResult(result: ProjectionResult) {
  if (!canUseStorage()) return;
  window.sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
}

export function loadResult(): ProjectionResult | null {
  if (!canUseStorage()) return null;
  const raw = window.sessionStorage.getItem(RESULT_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ProjectionResult;
  } catch {
    return null;
  }
}

export function clearProjectionStorage() {
  if (!canUseStorage()) return;
  window.sessionStorage.removeItem(ANSWERS_KEY);
  window.sessionStorage.removeItem(RESULT_KEY);
}

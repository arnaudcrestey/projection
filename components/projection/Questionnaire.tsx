"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { projectionQuestions } from "@/lib/projection/questions";
import { loadAnswers, saveAnswers, saveResult } from "@/lib/projection/storage";
import type { ProjectionAnswers } from "@/lib/projection/types";

function emptyAnswers(): ProjectionAnswers {
  return projectionQuestions.reduce<ProjectionAnswers>((acc, question) => {
    acc[question.id] = "";
    return acc;
  }, {} as ProjectionAnswers);
}

export function Questionnaire() {
  const router = useRouter();
  const [answers, setAnswers] = useState<ProjectionAnswers>(emptyAnswers());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = loadAnswers();
    const hasStoredAnswers = Object.values(stored).some(
      (value) => typeof value === "string" && value.trim().length > 0
    );

    if (hasStoredAnswers) {
      setAnswers((current) => ({ ...current, ...stored }));
    }
  }, []);

  const completion = useMemo(() => {
    const filled = projectionQuestions.filter(
      (question) => answers[question.id]?.trim().length
    ).length;

    return Math.round((filled / projectionQuestions.length) * 100);
  }, [answers]);

  function updateAnswer(id: string, value: string) {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    saveAnswers(next);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const missing = projectionQuestions.find((question) => {
      const value = answers[question.id]?.trim() ?? "";
      const minLength = question.minLength ?? 1;
      return value.length < minLength;
    });

    if (missing) {
      setError("Merci de compléter chaque réponse avec un minimum de contexte.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/projection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        setError("Le traitement n’a pas pu être finalisé. Merci de réessayer.");
        setLoading(false);
        return;
      }

      const data = (await response.json()) as { success: boolean; result: unknown };

      if (!data.success) {
        setError("La projection est indisponible pour le moment. Merci de réessayer.");
        setLoading(false);
        return;
      }

      saveResult(data.result as never);
      router.push("/analyse");
    } catch {
      setError("Une erreur technique est survenue. Merci de réessayer.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-[24px] border border-[#d7e0f0] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(249,251,255,0.95)_100%)] shadow-[0_22px_60px_rgba(22,48,100,0.06)] sm:rounded-[28px]"
    >
      <div className="border-b border-[#e5ebf6] bg-[rgba(255,255,255,0.7)] px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7d8eae] sm:text-[11px]">
              Progression
            </p>
            <p className="mt-1 text-[14px] leading-6 text-[#627390] sm:text-[15px]">
              Avancez question par question pour faire émerger une vision plus nette.
            </p>
          </div>

          <div className="inline-flex w-fit items-center rounded-full border border-[#dce5f3] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#173b73] shadow-[0_6px_18px_rgba(23,59,115,0.06)] sm:text-[13px]">
            {completion}% complété
          </div>
        </div>

        <div className="mt-4 h-[7px] w-full overflow-hidden rounded-full bg-[#edf2fb] md:mt-5">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#2f63e9_0%,#1d4fc6_100%)] transition-all duration-300"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      <div className="space-y-6 px-4 py-5 sm:space-y-7 sm:px-6 sm:py-6 md:space-y-8 md:px-8 md:py-8">
        {projectionQuestions.map((question, index) => (
          <div
            key={question.id}
            className="rounded-[20px] border border-[#dfe7f4] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(250,252,255,0.96)_100%)] p-4 shadow-[0_10px_30px_rgba(21,45,95,0.04)] sm:rounded-[22px] sm:p-5 md:p-6"
          >
            <label className="block">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d8e2f1] bg-white text-[12px] font-semibold text-[#3e5f9f] shadow-[0_4px_12px_rgba(62,95,159,0.08)]">
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <span className="block text-[14px] font-semibold leading-6 text-[#173b73] sm:text-[15px] md:text-[16px] md:leading-7">
                    {question.label}
                  </span>

                  {question.hint ? (
                    <p className="mt-2 text-[12px] leading-6 text-[#7283a0] sm:text-[13px] md:text-[14px]">
                      {question.hint}
                    </p>
                  ) : null}

                  <textarea
                    value={answers[question.id] ?? ""}
                    onChange={(event) => updateAnswer(question.id, event.target.value)}
                    rows={5}
                    placeholder={question.placeholder}
                    className="mt-4 min-h-[140px] w-full resize-y rounded-[18px] border border-[#dbe3f1] bg-white px-4 py-3.5 text-[14px] leading-7 text-[#17304f] shadow-[inset_0_1px_2px_rgba(15,23,42,0.02)] outline-none transition duration-200 placeholder:text-[#9aa8bf] focus:border-[#b8c8e6] focus:bg-[#ffffff] focus:ring-4 focus:ring-[#eaf1ff] sm:min-h-[152px] sm:px-4.5 sm:py-4 sm:text-[15px] md:min-h-[168px] md:rounded-[20px] md:px-5 md:py-4.5"
                    required
                  />

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-[11px] leading-5 text-[#94a1b7] sm:text-[12px]">
                      Réponse libre · quelques phrases suffisent pour bien démarrer
                    </p>

                    <p className="shrink-0 text-[11px] font-medium text-[#8a9ab4] sm:text-[12px]">
                      {(answers[question.id] ?? "").trim().length} caractères
                    </p>
                  </div>
                </div>
              </div>
            </label>
          </div>
        ))}

        {error ? (
          <p className="rounded-[16px] border border-red-200 bg-red-50 px-4 py-3.5 text-sm leading-6 text-red-700 md:text-[15px]">
            {error}
          </p>
        ) : null}

        <div className="rounded-[22px] border border-[#e0e8f5] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,251,255,0.94)_100%)] px-4 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#2f63e9_0%,#2d58cf_100%)] px-6 text-[14px] font-semibold text-white shadow-[0_18px_36px_rgba(47,99,233,0.24)] transition duration-200 hover:scale-[1.01] hover:shadow-[0_22px_42px_rgba(47,99,233,0.3)] disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-[52px] sm:max-w-[280px] md:min-h-[56px] md:max-w-[320px] md:px-8 md:text-[15px]"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
                  <span>Lancement de l’analyse...</span>
                </>
              ) : (
                "Voir ma projection"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

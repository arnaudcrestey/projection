"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { projectionQuestions } from "@/lib/projection/questions";
import { loadAnswers, saveAnswers, saveResult } from "@/lib/projection/storage";
import type { ProjectionAnswers } from "@/lib/projection/types";

const USE_MOCK_ANSWERS = true;

const mockAnswers: ProjectionAnswers = {
  activity:
    "J’accompagne des personnes qui se sentent perdues ou en perte de repères à retrouver de la clarté, à mieux comprendre leur situation et à avancer de manière plus structurée dans leur vie personnelle et professionnelle.",
  audience:
    "Des personnes en transition, en doute ou en blocage, qui cherchent à retrouver du sens, de la confiance et une direction plus claire dans leur vie.",
  immediateUnderstanding:
    "Je vous aide à comprendre ce que vous traversez et à le transformer en un plan d’action clair, adapté et concret.",
  currentBlur:
    "Mon activité reste difficile à comprendre rapidement : les bénéfices ne sont pas assez explicites, la méthode n’est pas suffisamment structurée et le positionnement reste trop large.",
  impactOfClarity:
    "Je pourrais attirer les bonnes personnes, expliquer plus simplement mon accompagnement et générer davantage de demandes qualifiées.",
  naturalAction:
    "Prendre contact facilement, comprendre rapidement mon approche, puis réserver un premier échange ou un accompagnement.",
  firstImpression:
    "Une impression de sérieux, de clarté et de confiance, avec une approche humaine mais structurée et orientée vers des résultats concrets.",
};

function emptyAnswers(): ProjectionAnswers {
  return projectionQuestions.reduce<ProjectionAnswers>((acc, question) => {
    acc[question.id] = "";
    return acc;
  }, {} as ProjectionAnswers);
}

function initialAnswers(): ProjectionAnswers {
  const base = emptyAnswers();
  return USE_MOCK_ANSWERS ? { ...base, ...mockAnswers } : base;
}

export function Questionnaire() {
  const router = useRouter();
  const [answers, setAnswers] = useState<ProjectionAnswers>(initialAnswers());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = loadAnswers();
    const hasStoredAnswers = Object.values(stored).some(
      (value) => typeof value === "string" && value.trim().length > 0
    );

    if (hasStoredAnswers) {
      setAnswers((current) => ({ ...current, ...stored }));
    } else if (USE_MOCK_ANSWERS) {
      saveAnswers(initialAnswers());
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
      className="overflow-hidden rounded-[22px] border border-[#d7e0f0] bg-white/92 shadow-[0_18px_50px_rgba(22,48,100,0.05)] sm:rounded-[26px]"
    >
      <div className="border-b border-[#e4eaf5] px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
        <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.24em] text-[#7d8eae] sm:text-[10px] md:text-[11px]">
          <span>Progression</span>
          <span>{completion}%</span>
        </div>

        <div className="mt-3 h-[6px] w-full overflow-hidden rounded-full bg-[#edf2fb] md:mt-4 md:h-[7px]">
          <div
            className="h-full rounded-full bg-[#173b73] transition-all duration-300"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      <div className="space-y-5 px-4 py-4 sm:space-y-6 sm:px-6 sm:py-6 md:space-y-8 md:px-8 md:py-8">
        {projectionQuestions.map((question) => (
          <label key={question.id} className="block">
            <span className="block text-[12px] font-medium leading-5 text-[#173b73] sm:text-[13px] md:text-[15px] md:leading-6">
              {question.label}
            </span>

            <textarea
              value={answers[question.id] ?? ""}
              onChange={(event) => updateAnswer(question.id, event.target.value)}
              rows={4}
              placeholder={question.placeholder}
              className="mt-2 min-h-[100px] w-full resize-y rounded-[14px] border border-[#dbe3f1] bg-[#fbfcff] px-3.5 py-3 text-[13px] leading-6 text-[#17304f] outline-none transition placeholder:text-[#9aa8bf] focus:border-[#b8c8e6] focus:bg-white focus:ring-4 focus:ring-[#eaf1ff] sm:min-h-[112px] sm:px-4 sm:py-3.5 sm:text-[14px] sm:leading-7 md:mt-3 md:min-h-[136px] md:rounded-[16px] md:px-5 md:py-4 md:text-[15px] md:leading-7"
              required
            />
          </label>
        ))}

        {error ? (
          <p className="rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 md:text-[15px]">
            {error}
          </p>
        ) : null}

        <div className="flex justify-center pt-2 md:pt-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#2f63e9_0%,#2d58cf_100%)] px-6 text-[13px] font-semibold text-white shadow-[0_14px_28px_rgba(47,99,233,0.24)] transition hover:scale-[1.01] hover:shadow-[0_18px_34px_rgba(47,99,233,0.3)] disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-[48px] sm:max-w-[240px] sm:text-sm md:min-h-[52px] md:max-w-[280px] md:px-8 md:text-[15px]"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
                <span>Traitement en cours...</span>
              </>
            ) : (
              "Voir ma projection"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

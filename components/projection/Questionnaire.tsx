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
      className="overflow-hidden rounded-[28px] border border-[#d9e1f2] bg-white/92 shadow-[0_18px_60px_rgba(29,56,110,0.06)]"
    >
      <div className="border-b border-[#e6ebf5] px-5 py-4 sm:px-7 sm:py-5">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7e8daa] sm:text-[11px]">
          <span>Progression</span>
          <span>{completion}%</span>
        </div>

        <div className="mt-3 h-[7px] w-full overflow-hidden rounded-full bg-[#edf2fb]">
          <div
            className="h-full rounded-full bg-[#173b73] transition-all duration-300"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      <div className="space-y-5 px-5 py-5 sm:px-7 sm:py-7">
        {projectionQuestions.map((question) => (
          <label key={question.id} className="block">
            <span className="block text-[13px] font-medium leading-6 text-[#173b73] sm:text-[14px]">
              {question.label}
            </span>

            <textarea
              value={answers[question.id] ?? ""}
              onChange={(event) => updateAnswer(question.id, event.target.value)}
              rows={4}
              placeholder={question.placeholder}
              className="mt-2 min-h-[124px] w-full resize-y rounded-[16px] border border-[#dbe3f1] bg-[#fbfcff] px-4 py-3 text-[14px] leading-7 text-[#17304f] outline-none transition placeholder:text-[#9aa8bf] focus:border-[#b8c8e6] focus:bg-white focus:ring-4 focus:ring-[#e9f0ff]"
              required
            />
          </label>
        ))}

        {error ? (
          <p className="rounded-[16px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <div className="pt-1">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#2f63e9_0%,#1746b7_100%)] px-6 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(47,99,233,0.28)] transition hover:scale-[1.01] hover:shadow-[0_20px_36px_rgba(47,99,233,0.34)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Traitement en cours..." : "Lancer ma projection"}
          </button>
        </div>
      </div>
    </form>
  );
}

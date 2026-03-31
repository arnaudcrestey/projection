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
    "Une impression de sérieux, de clarté et de confiance, avec une approche humaine mais structurée et orientée vers des résultats concrets."
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
        body: JSON.stringify({ answers })
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
    <form onSubmit={handleSubmit} className="premium-panel p-6 md:p-8">
      <div className="mb-7">
        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slateSoft">
          <span>Progression</span>
          <span>{completion}%</span>
        </div>

        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-mist">
          <div
            className="h-full rounded-full bg-ink transition-all"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      <div className="space-y-5">
        {projectionQuestions.map((question) => (
          <label key={question.id} className="block">
            <span className="text-sm font-medium text-ink">{question.label}</span>

            <textarea
              value={answers[question.id] ?? ""}
              onChange={(event) => updateAnswer(question.id, event.target.value)}
              rows={4}
              placeholder={question.placeholder}
              className="mt-2 w-full rounded-xl border border-mist bg-white px-4 py-3 text-sm leading-relaxed text-ink outline-none transition focus:border-slateSoft"
              required
            />
          </label>
        ))}
      </div>

      {error ? <p className="mt-5 text-sm text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Traitement en cours..." : "Lancer ma projection"}
      </button>
    </form>
  );
}

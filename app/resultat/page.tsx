"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LeadForm } from "@/components/projection/LeadForm";
import { PageFrame } from "@/components/projection/PageFrame";
import { ResultCards } from "@/components/projection/ResultCard";
import { buildFallbackProjection } from "@/lib/projection/fallback";
import { loadAnswers, loadResult } from "@/lib/projection/storage";
import type { ProjectionResult } from "@/lib/projection/types";

export default function ResultatPage() {
  const [result, setResult] = useState<ProjectionResult | null>(null);

  useEffect(() => {
    const stored = loadResult();
    if (stored) {
      setResult(stored);
      return;
    }

    const answers = loadAnswers();
    const fallback = buildFallbackProjection(answers);
    setResult(fallback);
  }, []);

  return (
    <PageFrame eyebrow="PROJECTION · RÉSULTAT">
      <section className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold md:text-4xl">Votre projection structurée</h1>
          <p className="mt-3 text-sm leading-relaxed text-slateSoft md:text-base">
            Une base claire pour positionner votre activité et orienter vos prochains arbitrages.
          </p>
        </div>
        <Link
          href="/questions"
          className="rounded-xl border border-mist px-4 py-2 text-sm font-medium text-ink transition hover:bg-white"
        >
          Refaire la projection
        </Link>
      </section>

      {result ? <ResultCards result={result} /> : null}
      {result ? <LeadForm projectionSnapshot={result} /> : null}
    </PageFrame>
  );
}

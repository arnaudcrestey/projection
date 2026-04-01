"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LeadForm } from "@/components/projection/LeadForm";
import { PageFrame } from "@/components/projection/PageFrame";
import { ResultCards } from "@/components/projection/ResultCard";
import { buildFallbackProjection } from "@/lib/projection/fallback";
import { loadAnswers, loadResult } from "@/lib/projection/storage";
import type {
  ProjectionAnswers,
  ProjectionResult,
} from "@/lib/projection/types";

export default function ResultatPage() {
  const [result, setResult] = useState<ProjectionResult | null>(null);
  const [answers, setAnswers] = useState<ProjectionAnswers | null>(null);

  useEffect(() => {
    const storedAnswers = loadAnswers();
    setAnswers(storedAnswers);

    const storedResult = loadResult();
    if (storedResult) {
      setResult(storedResult);
      return;
    }

    const fallback = buildFallbackProjection(storedAnswers);
    setResult(fallback);
  }, []);

  return (
    <PageFrame>
      <section className="mb-8 md:mb-10">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-semibold leading-tight text-ink md:text-[2.6rem] md:leading-[1.08]">
            Voici une version plus claire de votre activité
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slateSoft md:mt-4 md:text-[1.02rem]">
            Une base claire pour mieux présenter votre activité et orienter la suite.
          </p>
        </div>
      </section>

      {result ? <ResultCards result={result} answers={answers ?? undefined} /> : null}

      <div className="mt-6 flex justify-center md:mt-8">
        <Link
          href="/questions"
          className="text-sm font-medium text-[#5f78a3] underline decoration-[#c8d6ee] underline-offset-4 transition hover:text-[#173b73]"
        >
          Recommencer la projection
        </Link>
      </div>

      {result ? <LeadForm projectionSnapshot={result} /> : null}
    </PageFrame>
  );
}

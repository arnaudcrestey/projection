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
      <section className="mb-6 md:mb-8">
        <div className="relative overflow-hidden rounded-[24px] border border-[#d7e0f0] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(247,250,255,0.96)_100%)] px-5 py-6 shadow-[0_18px_50px_rgba(22,48,100,0.05)] sm:rounded-[28px] sm:px-7 sm:py-8 md:px-9 md:py-9">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),transparent_34%)]" />
          <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-[180px] w-[180px] rounded-full bg-[rgba(96,126,210,0.05)] blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-[#d9e4f3] bg-white/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c74ca] shadow-[0_4px_14px_rgba(92,116,202,0.08)] sm:text-[11px]">
              Projection obtenue
            </div>

            <h1 className="mt-4 text-[2rem] font-semibold leading-[1.02] tracking-[-0.055em] text-[#102847] sm:text-[2.35rem] md:text-[2.95rem]">
              Voici une version plus claire de votre activité
            </h1>

            <p className="mt-4 max-w-2xl text-[14px] leading-7 text-[#5f7190] sm:text-[15px] sm:leading-7 md:text-[16px] md:leading-8">
              Cette première lecture fait ressortir ce que votre activité exprime
              déjà, ce qui reste encore partiellement flou, et ce qui peut être
              renforcé pour la rendre plus lisible.
            </p>
          </div>
        </div>
      </section>

      {result ? <ResultCards result={result} answers={answers ?? undefined} /> : null}

      <div className="mt-6 flex justify-center md:mt-8">
        <Link
          href="/questions"
          className="inline-flex items-center rounded-full border border-[#dbe4f3] bg-white/80 px-4 py-2 text-[12px] font-medium text-[#5f78a3] shadow-[0_6px_18px_rgba(22,48,100,0.04)] transition hover:border-[#c8d7ee] hover:text-[#173b73] sm:text-[13px]"
        >
          Recommencer la projection
        </Link>
      </div>

      {result ? (
        <LeadForm
          projectionSnapshot={result}
          answers={answers ?? undefined}
        />
      ) : null}
    </PageFrame>
  );
}

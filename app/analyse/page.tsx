"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageFrame } from "@/components/projection/PageFrame";

const milestones = [
  "Lecture des signaux clés",
  "Reformulation du message central",
  "Projection du parcours utilisateur",
  "Finalisation de la direction recommandée",
];

export default function AnalysePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

 useEffect(() => {
  const interval = window.setInterval(() => {
    setStep((current) => Math.min(current + 1, milestones.length - 1));
  }, 1600);

  const timeout = window.setTimeout(() => {
    router.push("/resultat");
  }, 7600);

  return () => {
    window.clearInterval(interval);
    window.clearTimeout(timeout);
  };
}, [router]);

  return (
    <PageFrame>
      <section className="mx-auto w-full max-w-5xl">
        <div className="relative overflow-hidden rounded-[24px] border border-[#d7e0f0] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(247,250,255,0.96)_100%)] px-5 py-6 shadow-[0_18px_50px_rgba(22,48,100,0.05)] sm:rounded-[28px] sm:px-7 sm:py-8 md:px-9 md:py-9">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),transparent_34%)]" />
          <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-[180px] w-[180px] rounded-full bg-[rgba(96,126,210,0.05)] blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-[#d9e4f3] bg-white/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c74ca] shadow-[0_4px_14px_rgba(92,116,202,0.08)] sm:text-[11px]">
              Analyse en cours
            </div>

            <h1 className="mt-4 text-[2rem] font-semibold leading-[1.04] tracking-[-0.055em] text-[#102847] sm:text-[2.35rem] md:text-[2.9rem]">
              Analyse en cours de vos réponses
            </h1>

            <p className="mt-4 max-w-2xl text-[14px] leading-7 text-[#5f7190] sm:text-[15px] sm:leading-7 md:text-[16px] md:leading-8">
              Vos réponses sont en train d’être relues pour faire émerger une
              restitution plus claire, plus structurée et immédiatement exploitable.
            </p>

            <div className="mt-5 rounded-[18px] border border-[#e3eaf6] bg-white/75 px-4 py-3.5 sm:px-5 sm:py-4">
              <p className="text-[13px] leading-6 text-[#667796] sm:text-[14px] sm:leading-7">
                L’analyse avance par étapes pour clarifier le message central,
                projeter le parcours utilisateur et faire ressortir une direction
                plus nette.
              </p>
            </div>
          </div>

          <div className="relative mt-7 space-y-4 sm:mt-8 sm:space-y-4 md:mt-10 md:space-y-5">
            {milestones.map((label, index) => {
              const isPast = index < step;
              const isCurrent = index === step;
              const isUpcoming = index > step;

              return (
                <div
                  key={label}
                  className={[
                    "rounded-[20px] border p-4 transition-all duration-300 sm:rounded-[22px] sm:p-5 md:p-6",
                    isCurrent
                      ? "border-[#cddbf3] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(245,249,255,0.98)_100%)] shadow-[0_16px_36px_rgba(22,48,100,0.08)]"
                      : "",
                    isPast
                      ? "border-[#d8e3f3] bg-white/92 shadow-[0_10px_24px_rgba(22,48,100,0.05)]"
                      : "",
                    isUpcoming
                      ? "border-[#e2e9f5] bg-[rgba(248,251,255,0.82)]"
                      : "",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div
                      className={[
                        "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[12px] font-semibold transition-all md:h-10 md:w-10 md:text-[13px]",
                        isCurrent
                          ? "border-[#c8d7f2] bg-white text-[#2f63e9] shadow-[0_6px_16px_rgba(47,99,233,0.12)]"
                          : "",
                        isPast
                          ? "border-[#d7e2f1] bg-white text-[#1c4c97]"
                          : "",
                        isUpcoming
                          ? "border-[#dde5f2] bg-[#f6f9fe] text-[#93a1b6]"
                          : "",
                      ].join(" ")}
                    >
                      {isPast ? "✓" : index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <p
                          className={[
                            "text-[14px] font-semibold leading-6 sm:text-[15px] md:text-[16px]",
                            isCurrent ? "text-[#173b73]" : "",
                            isPast ? "text-[#17304f]" : "",
                            isUpcoming ? "text-[#71819d]" : "",
                          ].join(" ")}
                        >
                          {label}
                        </p>

                        <span
                          className={[
                            "inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-[11px]",
                            isCurrent
                              ? "bg-[rgba(47,99,233,0.08)] text-[#2f63e9]"
                              : "",
                            isPast
                              ? "bg-[rgba(23,59,115,0.06)] text-[#4d648d]"
                              : "",
                            isUpcoming
                              ? "bg-[rgba(148,161,183,0.12)] text-[#8d9bb0]"
                              : "",
                          ].join(" ")}
                        >
                          {isCurrent
                            ? "En cours"
                            : isPast
                              ? "Terminé"
                              : "À venir"}
                        </span>
                      </div>

                      <div className="mt-3 h-[6px] w-full overflow-hidden rounded-full bg-[#eef3fb]">
                        <div
                          className={[
                            "h-full rounded-full transition-all duration-500",
                            isCurrent
                              ? "w-2/3 animate-pulse bg-[linear-gradient(90deg,#2f63e9_0%,#5f8cff_100%)]"
                              : "",
                            isPast
                              ? "w-full bg-[linear-gradient(90deg,#173b73_0%,#2f63e9_100%)]"
                              : "",
                            isUpcoming ? "w-0 bg-transparent" : "",
                          ].join(" ")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}

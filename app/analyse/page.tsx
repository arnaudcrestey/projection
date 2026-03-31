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
    }, 1100);

    const timeout = window.setTimeout(() => {
      router.push("/resultat");
    }, 4800);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [router]);

  return (
    <PageFrame>
      <section className="premium-panel p-8 md:p-12">
        <h1 className="text-2xl font-semibold md:text-4xl">
          Traitement de votre projection
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slateSoft md:text-base">
          Votre réponse est consolidée pour produire une restitution claire,
          structurée et directement exploitable.
        </p>

        <div className="mt-8 grid gap-3">
          {milestones.map((label, index) => {
            const done = index <= step;

            return (
              <div
                key={label}
                className={`rounded-xl border px-4 py-3 text-sm transition ${
                  done
                    ? "border-ink bg-white text-ink shadow-subtle"
                    : "border-mist bg-[#f8fbff] text-slateSoft"
                }`}
              >
                {label}
              </div>
            );
          })}
        </div>
      </section>
    </PageFrame>
  );
}

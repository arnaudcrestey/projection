import Link from "next/link";
import { PageFrame } from "@/components/projection/PageFrame";

const benefits = [
  {
    icon: "🧭",
    title: "Vision clarifiée",
    text: "Une lecture plus claire de votre activité et de ce qu’elle doit faire comprendre."
  },
  {
    icon: "✦",
    title: "Message plus lisible",
    text: "Une structure plus cohérente, plus crédible et plus facile à saisir immédiatement."
  },
  {
    icon: "→",
    title: "Base exploitable",
    text: "Une direction concrète pour mieux présenter votre activité et engager la suite."
  }
];

export default function HomePage() {
  return (
    <PageFrame>
      <section className="premium-panel overflow-hidden p-8 md:p-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slateSoft">
            Point d’entrée stratégique
          </p>

          <h1 className="mt-4 text-3xl font-semibold leading-[1.05] text-ink md:text-5xl">
            Rendez votre activité claire, cohérente et engageante.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slateSoft md:text-lg">
            Projection vous aide à structurer ce que vous faites, pour que ce soit compris
            immédiatement — et donne envie d’aller plus loin.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/questions"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-ink px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Clarifier mon activité
            </Link>

            <p className="text-sm text-slateSoft">
              7 questions guidées · 3 minutes · rendu structuré
            </p>
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-3">
        {benefits.map((item) => (
          <article
            key={item.title}
            className="premium-panel p-6"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(31,39,64,0.08)] bg-[rgba(255,255,255,0.72)] text-base">
                {item.icon}
              </div>

              <div>
                <h2 className="text-base font-semibold text-ink">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slateSoft">{item.text}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </PageFrame>
  );
}

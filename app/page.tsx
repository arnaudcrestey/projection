import Link from "next/link";
import { PageFrame } from "@/components/projection/PageFrame";

const benefits = [
  {
    icon: "◌",
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
      <section className="premium-panel rounded-[30px] px-8 py-10 md:px-14 md:py-14">
        <div className="mx-auto max-w-4xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-slateSoft">
            Point d’entrée stratégique
          </p>

          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-ink md:text-6xl">
            Rendez votre activité claire, cohérente et engageante.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slateSoft md:text-[1.55rem] md:leading-relaxed">
            Projection vous aide à structurer ce que vous faites, pour que ce soit compris
            immédiatement — et donne envie d’aller plus loin.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/questions"
              className="inline-flex min-h-[54px] items-center justify-center rounded-[14px] bg-[#17263f] px-7 py-3 text-sm font-medium text-white shadow-[0_14px_34px_rgba(23,38,63,0.18)] transition duration-200 hover:-translate-y-[1px] hover:shadow-[0_18px_40px_rgba(23,38,63,0.22)]"
            >
              Clarifier mon activité
            </Link>

            <p className="text-sm text-slateSoft">
              7 questions guidées · 3 minutes · rendu structuré
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {benefits.map((item) => (
          <article
            key={item.title}
            className="premium-panel rounded-[24px] px-6 py-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(23,38,63,0.08)] bg-white/75 text-sm text-ink shadow-[0_6px_18px_rgba(23,38,63,0.05)]">
                {item.icon}
              </div>

              <div>
                <h2 className="text-[1.55rem] font-semibold tracking-[-0.02em] text-ink">
                  {item.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slateSoft">
                  {item.text}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </PageFrame>
  );
}

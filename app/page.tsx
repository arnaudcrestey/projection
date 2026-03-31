import Link from "next/link";
import { PageFrame } from "@/components/projection/PageFrame";

const benefits = [
  {
    title: "Vision clarifiée",
    text: "Une lecture plus claire de votre activité et de ce qu’elle donne réellement à comprendre.",
  },
  {
    title: "Message plus lisible",
    text: "Une structure plus cohérente, plus crédible et plus facile à saisir dès les premières secondes.",
  },
  {
    title: "Base exploitable",
    text: "Une direction concrète pour mieux présenter votre activité et engager la suite.",
  },
];

export default function HomePage() {
  return (
    <PageFrame>
      <section className="rounded-[34px] border border-[#dbe3f4] bg-white px-8 py-10 shadow-[0_18px_50px_rgba(61,95,214,0.07)] md:px-14 md:py-14">
        <div className="max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[#3d5fd6]">
            STRUCTURATION D&apos;ACTIVITÉ
          </p>

          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-ink md:text-6xl">
            Rendez votre activité claire et évidente à comprendre.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slateSoft md:text-[1.55rem]">
            Structurez ce que vous faites pour que la bonne personne comprenne
            immédiatement, se reconnaisse et ait envie d’aller plus loin.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/questions"
              className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-[#2f58c8] px-7 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(47,88,200,0.28)] transition duration-200 hover:-translate-y-[1px] hover:shadow-[0_18px_40px_rgba(47,88,200,0.34)]"
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
            className="rounded-[24px] border border-[#dbe3f4] bg-white px-6 py-6 shadow-[0_12px_30px_rgba(61,95,214,0.05)]"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#3d5fd6]" />

              <div>
                <h2 className="text-[1.45rem] font-semibold tracking-[-0.02em] text-ink">
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

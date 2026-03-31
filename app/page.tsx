import Link from "next/link";
import { PageFrame } from "@/components/projection/PageFrame";

const benefits = [
  {
    title: "Vision clarifiée",
    text: "Comprendre immédiatement ce que votre activité exprime",
  },
  {
    title: "Message plus lisible",
    text: "Être compris sans effort dès les premières secondes",
  },
  {
    title: "Base exploitable",
    text: "Savoir quoi dire et comment le formuler clairement",
  },
];

export default function HomePage() {
  return (
    <PageFrame>
      <section className="rounded-[34px] border border-[#dbe3f4] bg-white px-8 py-10 shadow-[0_18px_50px_rgba(61,95,214,0.07)] md:px-14 md:py-14">
        <div className="max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[#3d5fd6]">
            CLARIFIER SON ACTIVITÉ
          </p>

          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-ink md:text-6xl">
            Expliquez clairement ce que vous faites.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slateSoft md:text-[1.55rem]">
            Si votre activité n’est pas comprise rapidement, elle n’attire pas. En quelques questions, mettez des mots simples sur ce que vous proposez.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/questions"
              className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-[#2f58c8] px-7 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(47,88,200,0.28)] transition duration-200 hover:-translate-y-[1px] hover:shadow-[0_18px_40px_rgba(47,88,200,0.34)]"
            >
              Faire le point sur votre activité
            </Link>

            <p className="text-sm text-slateSoft">
              7 questions guidées · 3 minutes · sans inscription
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
            <div>
              <h2 className="text-[1.3rem] font-semibold tracking-[-0.02em] text-ink">
                {item.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slateSoft">
                {item.text}
              </p>
            </div>
          </article>
        ))}
      </section>
    </PageFrame>
  );
}

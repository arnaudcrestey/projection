import Link from "next/link";
import { PageFrame } from "@/components/projection/PageFrame";

const benefits = [
  {
    title: "Vision clarifiée",
    text: "Lire immédiatement ce que votre activité exprime",
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
      <section className="rounded-[28px] border border-[#dbe3f4] bg-white px-6 py-8 shadow-[0_18px_50px_rgba(61,95,214,0.07)] sm:rounded-[30px] sm:px-8 sm:py-10 md:rounded-[34px] md:px-12 md:py-12 lg:px-14 lg:py-14">
        <div className="max-w-4xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#3d5fd6] sm:text-[11px] sm:tracking-[0.30em]">
            CLARIFIER SON ACTIVITÉ
          </p>

          <h1 className="mt-5 max-w-3xl text-[2.2rem] font-semibold leading-[0.96] tracking-[-0.05em] text-ink sm:mt-6 sm:text-[2.8rem] md:text-[3.6rem] lg:text-6xl">
            Expliquez clairement ce que vous faites.
          </h1>

          <div className="mt-7 max-w-3xl text-[1.1rem] leading-[1.75] text-slateSoft sm:text-[1.22rem] md:text-[1.42rem] md:leading-[1.7]">
            <p className="sm:hidden">
              Si votre activité n’est pas comprise rapidement, elle n’attire
              pas. En quelques questions, mettez des mots simples sur ce que
              vous proposez.
            </p>

            <p className="hidden sm:block">
              <span className="block">
                Si votre activité n’est pas comprise rapidement, elle n’attire pas.
              </span>
              <span className="mt-1.5 block">
                En quelques questions, mettez des mots simples sur ce que vous proposez.
              </span>
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href="/questions"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#2f58c8] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(47,88,200,0.28)] transition duration-200 hover:-translate-y-[1px] hover:shadow-[0_18px_40px_rgba(47,88,200,0.34)] sm:min-h-[54px] sm:px-7"
            >
              Faire le point sur votre activité
            </Link>

            <p className="text-sm leading-relaxed text-slateSoft">
              7 questions · 3 minutes · sans inscription
            </p>
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-4 md:mt-6 md:grid-cols-3">
        {benefits.map((item) => (
          <article
            key={item.title}
            className="rounded-[22px] border border-[#dbe3f4] bg-white px-5 py-5 shadow-[0_12px_30px_rgba(61,95,214,0.05)] sm:rounded-[24px] sm:px-6 sm:py-6"
          >
            <div>
              <h2 className="text-[1.18rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.24rem] md:text-[1.3rem]">
                {item.title}
              </h2>

              <p className="mt-2.5 text-[0.98rem] leading-relaxed text-slateSoft sm:mt-3 sm:text-base">
                {item.text}
              </p>
            </div>
          </article>
        ))}
      </section>
    </PageFrame>
  );
}

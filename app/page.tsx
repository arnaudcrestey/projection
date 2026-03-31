import Link from "next/link";
import { PageFrame } from "@/components/projection/PageFrame";

export default function HomePage() {
  return (
    <PageFrame>
      <section className="premium-panel p-8 md:p-12">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-slateSoft">Point d’entrée stratégique</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
          Visualisez une version plus claire, cohérente et engageante de votre activité.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slateSoft md:text-lg">
          Projection vous aide à structurer votre message, votre expérience utilisateur et votre direction
          d’entrée, sans jargon ni promesse artificielle.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/questions"
            className="inline-flex items-center justify-center rounded-xl bg-ink px-6 py-3 text-sm font-medium text-white"
          >
            Commencer la projection
          </Link>
          <p className="text-sm text-slateSoft">7 questions guidées · 3 minutes · rendu structuré</p>
        </div>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Ce que vous obtenez",
            text: "Une vision claire de votre activité et de la manière dont elle devrait apparaître."
          },
          {
            title: "Ce que vous évitez",
            text: "Les audits génériques, les recommandations abstraites et les réponses trop marketing."
          },
          {
            title: "Ce que cela prépare",
            text: "Un point d’entrée crédible pour transformer l’intérêt en prise de contact qualifiée."
          }
        ].map((item) => (
          <article key={item.title} className="premium-panel p-6">
            <h2 className="text-base font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slateSoft">{item.text}</p>
          </article>
        ))}
      </section>
    </PageFrame>
  );
}

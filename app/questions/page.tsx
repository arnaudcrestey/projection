import { Questionnaire } from "@/components/projection/Questionnaire";
import { PageFrame } from "@/components/projection/PageFrame";

export default function QuestionsPage() {
  return (
    <PageFrame eyebrow="PROJECTION · QUESTIONS">
      <section className="mb-6">
        <h1 className="text-2xl font-semibold md:text-4xl">Décrivez votre activité avec précision.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slateSoft md:text-base">
          Répondez simplement. L’objectif est de faire émerger une projection claire, crédible et exploitable.
        </p>
      </section>
      <Questionnaire />
    </PageFrame>
  );
}

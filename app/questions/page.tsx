import { Questionnaire } from "@/components/projection/Questionnaire";
import { PageFrame } from "@/components/projection/PageFrame";

export default function QuestionsPage() {
  return (
    <PageFrame>
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-[30px] border border-[#d9e1f2] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,251,255,0.92)_100%)] px-6 py-7 shadow-[0_20px_60px_rgba(29,56,110,0.05)] sm:px-8 sm:py-9 md:px-10 md:py-10">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#5d74c8] sm:text-[11px]">
              Clarifier son activité
            </p>

            <h1 className="mt-3 text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-[#0f2747] sm:text-[2.35rem] md:text-[3rem]">
              Décrivez votre activité avec précision.
            </h1>

            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#5e6f8f] sm:text-[16px]">
              Répondez simplement. L’objectif est de faire émerger une projection
              claire, crédible et exploitable.
            </p>
          </div>
        </div>

        <Questionnaire />
      </section>
    </PageFrame>
  );
}

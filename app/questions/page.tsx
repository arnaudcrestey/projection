import { Questionnaire } from "@/components/projection/Questionnaire";
import { PageFrame } from "@/components/projection/PageFrame";

export default function QuestionsPage() {
  return (
    <PageFrame>
      <section className="mx-auto w-full max-w-5xl">
        <div className="mb-5 rounded-[22px] border border-[#d7e0f0] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,251,255,0.92)_100%)] px-5 py-5 shadow-[0_18px_50px_rgba(22,48,100,0.04)] sm:mb-7 sm:rounded-[26px] sm:px-7 sm:py-7 md:px-9 md:py-8">
          <div className="max-w-3xl">
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#5c74ca] sm:text-[10px]">
              Clarifier son activité
            </p>

            <h1 className="mt-3 text-[1.9rem] font-semibold leading-[1.04] tracking-[-0.05em] text-[#102847] sm:text-[2.3rem] md:text-[2.85rem]">
              Décrivez votre activité avec précision.
            </h1>

            <p className="mt-3 max-w-2xl text-[13px] leading-6 text-[#667796] sm:mt-4 sm:text-[15px] sm:leading-7">
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

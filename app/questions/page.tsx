import { Questionnaire } from "@/components/projection/Questionnaire";
import { PageFrame } from "@/components/projection/PageFrame";

export default function QuestionsPage() {
  return (
    <PageFrame>
      <section className="mx-auto w-full max-w-5xl">
        <div className="relative mb-6 overflow-hidden rounded-[24px] border border-[#d7e0f0] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(247,250,255,0.96)_100%)] px-5 py-6 shadow-[0_18px_50px_rgba(22,48,100,0.05)] sm:mb-8 sm:rounded-[28px] sm:px-7 sm:py-8 md:px-9 md:py-9">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),transparent_34%)]" />
          <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-[180px] w-[180px] rounded-full bg-[rgba(96,126,210,0.05)] blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-[#d9e4f3] bg-white/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5c74ca] shadow-[0_4px_14px_rgba(92,116,202,0.08)] sm:text-[11px]">
              Clarifier son activité
            </div>

            <h1 className="mt-4 text-[2rem] font-semibold leading-[1.02] tracking-[-0.055em] text-[#102847] sm:text-[2.45rem] md:text-[3rem]">
              Décrivez votre activité avec précision.
            </h1>

            <p className="mt-4 max-w-2xl text-[14px] leading-7 text-[#5f7190] sm:text-[15px] sm:leading-7 md:text-[16px] md:leading-8">
              Répondez avec vos mots. L’objectif n’est pas d’écrire parfaitement,
              mais de faire émerger une projection plus claire, plus crédible et
              plus exploitable.
            </p>

            <div className="mt-5 rounded-[18px] border border-[#e3eaf6] bg-white/75 px-4 py-3.5 sm:px-5 sm:py-4">
              <p className="text-[13px] leading-6 text-[#667796] sm:text-[14px] sm:leading-7">
                Prenez simplement les questions dans l’ordre. Chaque réponse aide
                à clarifier ce que vous faites, à qui cela s’adresse, et ce que
                votre activité devrait faire comprendre plus vite.
              </p>
            </div>
          </div>
        </div>

        <Questionnaire />
      </section>
    </PageFrame>
  );
}

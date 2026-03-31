import type { ProjectionResult } from "@/lib/projection/types";

type ItemProps = {
  title: string;
  content: string;
  variant?: "default" | "highlight" | "hero" | "compact";
};

function Item({ title, content, variant = "default" }: ItemProps) {
  const baseClasses =
    "rounded-[22px] border shadow-[0_18px_50px_rgba(22,48,100,0.05)]";

  const variantClasses = {
    default:
      "border-[#d7e0f0] bg-white/92 px-6 py-6 md:px-7 md:py-7",
    compact:
      "border-[#dbe3f1] bg-white/88 px-6 py-5 md:px-7 md:py-6",
    highlight:
      "border-[#c9d8f2] bg-[linear-gradient(180deg,rgba(247,250,255,0.98)_0%,rgba(239,245,255,0.96)_100%)] px-6 py-6 md:px-7 md:py-7",
    hero:
      "border-[#cfdcf2] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(246,249,255,0.98)_100%)] px-6 py-7 md:px-8 md:py-8",
  };

  const titleClasses = {
    default:
      "text-[11px] font-semibold uppercase tracking-[0.18em] text-slateSoft",
    compact:
      "text-[11px] font-semibold uppercase tracking-[0.18em] text-slateSoft",
    highlight:
      "text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3d5f97]",
    hero:
      "text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3d5f97]",
  };

  const contentClasses = {
    default:
      "mt-3 text-[15px] leading-7 text-ink md:text-[16px]",
    compact:
      "mt-3 text-[15px] leading-7 text-ink/95 md:text-[15.5px]",
    highlight:
      "mt-3 text-[15px] leading-7 text-ink md:text-[16px]",
    hero:
      "mt-4 text-[15.5px] leading-7 text-ink md:text-[17px] md:leading-8",
  };

  return (
    <section className={`${baseClasses} ${variantClasses[variant]}`}>
      <h3 className={titleClasses[variant]}>{title}</h3>
      <p className={contentClasses[variant]}>{content}</p>
    </section>
  );
}

export function ResultCards({ result }: { result: ProjectionResult }) {
  return (
    <div className="grid gap-4 md:gap-5">
      <Item title="Vision" content={result.vision} variant="hero" />
      <Item title="Message central" content={result.centralMessage} variant="compact" />
      <Item
        title="Expérience utilisateur projetée"
        content={result.userExperience}
        variant="default"
      />
      <Item
        title="Point d'entrée recommandé"
        content={result.recommendedEntryPoint}
        variant="highlight"
      />
      <Item title="Note finale" content={result.closingNote} variant="compact" />
    </div>
  );
}

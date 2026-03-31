import type { ProjectionResult } from "@/lib/projection/types";

type ItemProps = {
  title: string;
  content: string;
  variant?: "primary" | "secondary" | "accent";
};

function Item({ title, content, variant = "secondary" }: ItemProps) {
  const variants = {
    primary:
      "border-[#cfdcf2] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(246,249,255,0.98)_100%)]",
    secondary:
      "border-[#d7e0f0] bg-white/92",
    accent:
      "border-[#c9d8f2] bg-[linear-gradient(180deg,rgba(247,250,255,0.98)_0%,rgba(239,245,255,0.96)_100%)]",
  };

  return (
    <section
      className={`rounded-[20px] border p-5 shadow-[0_18px_50px_rgba(22,48,100,0.05)] md:rounded-[22px] md:p-7 ${variants[variant]}`}
    >
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5f78a3] md:text-[11px]">
        {title}
      </h3>

      <p className="mt-3 text-[14px] leading-6 text-[#17304f] md:mt-4 md:text-[16px] md:leading-8">
        {content}
      </p>
    </section>
  );
}

function buildClarityBlock(result: ProjectionResult) {
  return `${result.centralMessage} ${result.userExperience}`;
}

export function ResultCards({ result }: { result: ProjectionResult }) {
  return (
    <div className="grid gap-4 md:gap-5">
      <Item title="Vision clarifiée" content={result.vision} variant="primary" />

      <Item
        title="Ce qu’il faut rendre évident"
        content={buildClarityBlock(result)}
        variant="secondary"
      />

      <Item
        title="Point d’entrée recommandé"
        content={result.recommendedEntryPoint}
        variant="accent"
      />
    </div>
  );
}

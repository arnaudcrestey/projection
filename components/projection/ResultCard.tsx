import type { ProjectionResult } from "@/lib/projection/types";

type ItemProps = {
  title: string;
  content: string;
  variant?: "hero" | "default" | "accent";
};

function Item({ title, content, variant = "default" }: ItemProps) {
  const shell =
    "relative overflow-hidden rounded-[22px] border shadow-[0_24px_70px_rgba(22,48,100,0.055)]";

  const variants = {
    hero:
      "border-[#d9e4f5] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,251,255,0.98)_52%,rgba(243,247,255,0.98)_100%)] px-6 py-6 md:px-8 md:py-8",
    default:
      "border-[#dde6f3] bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(251,253,255,0.96)_100%)] px-5 py-5 md:px-7 md:py-7",
    accent:
      "border-[#d6e2f5] bg-[linear-gradient(180deg,rgba(248,251,255,0.98)_0%,rgba(240,246,255,0.98)_100%)] px-5 py-5 md:px-7 md:py-7",
  };

  const eyebrow = {
    hero: "text-[#5b74a0]",
    default: "text-[#6b81a8]",
    accent: "text-[#496a9b]",
  };

  const contentStyle = {
    hero: "mt-4 text-[15px] leading-7 text-[#17304f] md:text-[18px] md:leading-9",
    default: "mt-3 text-[14px] leading-7 text-[#17304f] md:text-[16px] md:leading-8",
    accent: "mt-3 text-[14px] leading-7 text-[#17304f] md:text-[16px] md:leading-8",
  };

  return (
    <section className={`${shell} ${variants[variant]}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_34%)]" />

      <div className="relative">
        <h3
          className={`text-[10px] font-semibold uppercase tracking-[0.24em] md:text-[11px] ${eyebrow[variant]}`}
        >
          {title}
        </h3>

        <p className={contentStyle[variant]}>{content}</p>
      </div>
    </section>
  );
}

export function ResultCards({ result }: { result: ProjectionResult }) {
  return (
    <div className="grid gap-4 md:gap-6">
      <Item title="Ce que vous faites" content={result.vision} variant="hero" />

      <div className="grid gap-4 md:grid-cols-[1.08fr_0.92fr] md:gap-6">
        <Item
          title="Ce que l’on doit comprendre"
          content={result.clarity}
          variant="default"
        />

        <Item
          title="Comment commencer avec vous"
          content={result.nextStep}
          variant="accent"
        />
      </div>
    </div>
  );
}

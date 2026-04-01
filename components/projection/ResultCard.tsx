import type { ProjectionResult } from "@/lib/projection/types";

type ItemProps = {
  title: string;
  content: string;
  variant?: "hero" | "default" | "accent" | "soft";
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
    soft:
      "border-[#e3eaf5] bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(246,249,255,0.95)_100%)] px-5 py-5 md:px-7 md:py-7",
  };

  const eyebrow = {
    hero: "text-[#5b74a0]",
    default: "text-[#6b81a8]",
    accent: "text-[#496a9b]",
    soft: "text-[#7185ab]",
  };

  const contentStyle = {
    hero: "mt-4 text-[15px] leading-7 text-[#17304f] md:text-[18px] md:leading-9",
    default: "mt-3 text-[14px] leading-7 text-[#17304f] md:text-[16px] md:leading-8",
    accent: "mt-3 text-[14px] leading-7 text-[#17304f] md:text-[16px] md:leading-8",
    soft: "mt-3 text-[14px] leading-7 text-[#17304f] md:text-[16px] md:leading-8",
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

function buildImpactText(result: ProjectionResult) {
  const source = `${result.vision} ${result.clarity} ${result.nextStep}`.toLowerCase();

  if (
    source.includes("offre") ||
    source.includes("comprendre") ||
    source.includes("lisible") ||
    source.includes("claire")
  ) {
    return "Quand une activité n’est pas comprise rapidement, elle suscite de l’intérêt sans déclencher naturellement de prise de contact.";
  }

  if (
    source.includes("diagnostic") ||
    source.includes("positionnement") ||
    source.includes("point d’entrée") ||
    source.includes("point d'entree")
  ) {
    return "Sans point d’entrée clair, les bonnes personnes peuvent s’intéresser à votre activité sans voir immédiatement comment aller plus loin.";
  }

  return "Quand le message reste partiellement flou, les visiteurs perçoivent l’intention sans toujours comprendre pourquoi ils devraient vous contacter.";
}

function buildImprovementText(result: ProjectionResult) {
  const source = `${result.vision} ${result.clarity} ${result.nextStep}`.toLowerCase();

  if (
    source.includes("diagnostic") ||
    source.includes("audit") ||
    source.includes("analyse")
  ) {
    return "Un diagnostic ciblé permet d’identifier ce qui freine la compréhension et de clarifier le bon point d’entrée pour la suite.";
  }

  if (
    source.includes("page") ||
    source.includes("dispositif") ||
    source.includes("parcours")
  ) {
    return "Un travail de clarification sur la page, le message et le parcours permet de rendre l’ensemble plus lisible et plus engageant.";
  }

  return "Un travail de clarification permet de rendre votre activité plus compréhensible, plus cohérente et plus simple à engager.";
}

export function ResultCards({ result }: { result: ProjectionResult }) {
  const impactText = buildImpactText(result);
  const improvementText = buildImprovementText(result);

  return (
    <div className="grid gap-4 md:gap-6">
      <Item
        title="Ce que vous exprimez aujourd’hui"
        content={result.vision}
        variant="hero"
      />

      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <Item
          title="Ce que l’on comprend réellement"
          content={result.clarity}
          variant="default"
        />

        <Item
          title="Ce que cela produit"
          content={impactText}
          variant="accent"
        />
      </div>

      <Item
        title="Ce que vous pouvez améliorer"
        content={improvementText}
        variant="soft"
      />
    </div>
  );
}

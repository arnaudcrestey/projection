import type { ProjectionResult } from "@/lib/projection/types";

type ItemProps = {
  title: string;
  content: string;
  variant?: "hero" | "default" | "accent" | "soft";
};

type ProjectionAngle =
  | "digital"
  | "accompagnement"
  | "expertise"
  | "generic";

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

function normalize(text: string) {
  return text.toLowerCase();
}

function includesOneOf(text: string, values: string[]) {
  return values.some((value) => text.includes(value));
}

function detectAngle(result: ProjectionResult): ProjectionAngle {
  const source = normalize(
    `${result.vision} ${result.clarity} ${result.nextStep}`
  );

  if (
    includesOneOf(source, [
      "page",
      "pages",
      "diagnostic",
      "diagnostics",
      "dispositif",
      "dispositifs",
      "point d’entrée",
      "point d'entree",
      "offre",
      "prise de contact",
      "site",
      "parcours",
      "digital",
      "digitaux",
      "numérique",
      "numerique",
    ])
  ) {
    return "digital";
  }

  if (
    includesOneOf(source, [
      "situation",
      "transition",
      "doute",
      "blocage",
      "recul",
      "direction",
      "personne",
      "personnes",
      "accompagnement",
    ])
  ) {
    return "accompagnement";
  }

  if (
    includesOneOf(source, [
      "expert",
      "experts",
      "consultant",
      "consultants",
      "formateur",
      "formateurs",
      "professionnel",
      "professionnels",
      "expertise",
      "activité",
    ])
  ) {
    return "expertise";
  }

  return "generic";
}

function buildImpactText(angle: ProjectionAngle) {
  switch (angle) {
    case "digital":
      return "Quand une offre n’est pas comprise rapidement, elle peut susciter de l’intérêt sans déclencher naturellement de prise de contact.";

    case "accompagnement":
      return "Quand l’activité reste difficile à saisir, les personnes concernées peuvent se reconnaître dans l’intention sans comprendre clairement pourquoi aller plus loin.";

    case "expertise":
      return "Quand une expertise n’est pas formulée de manière nette, elle peut paraître sérieuse sans devenir immédiatement lisible ni engageante pour les bons profils.";

    default:
      return "Quand le message reste partiellement flou, les visiteurs perçoivent l’intention sans comprendre immédiatement pourquoi ils devraient vous contacter.";
  }
}

function buildImprovementText(angle: ProjectionAngle) {
  switch (angle) {
    case "digital":
      return "Un diagnostic ciblé permet d’identifier ce qui freine la compréhension et de clarifier le bon point d’entrée pour la suite.";

    case "accompagnement":
      return "Un travail de clarification permet de rendre l’approche plus lisible, plus rassurante et plus simple à engager pour les personnes concernées.";

    case "expertise":
      return "Un travail de formulation et de structure permet de rendre l’expertise plus compréhensible et d’aider les bons profils à se reconnaître plus vite.";

    default:
      return "Un travail de clarification permet de rendre l’activité plus compréhensible, plus cohérente et plus simple à engager.";
  }
}

export function ResultCards({ result }: { result: ProjectionResult }) {
  const angle = detectAngle(result);
  const impactText = buildImpactText(angle);
  const improvementText = buildImprovementText(angle);

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

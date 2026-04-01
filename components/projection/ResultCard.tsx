import type {
  ProjectionAnswers,
  ProjectionResult,
} from "@/lib/projection/types";

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

function normalize(...values: Array<string | undefined>) {
  return values
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function includesOneOf(text: string, values: string[]) {
  return values.some((value) => text.includes(value));
}

function detectAngle(
  result: ProjectionResult,
  answers?: ProjectionAnswers
): ProjectionAngle {
  const source = normalize(
    result.vision,
    result.clarity,
    result.nextStep,
    answers?.activity,
    answers?.audience,
    answers?.immediateUnderstanding,
    answers?.currentBlur,
    answers?.impactOfClarity,
    answers?.naturalAction,
    answers?.firstImpression
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
      "conversion",
      "visiteur",
      "visiteurs",
      "positionnement",
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
      "sens",
      "repère",
      "reperes",
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
      "offre de service",
      "service",
      "services",
    ])
  ) {
    return "expertise";
  }

  return "generic";
}

function buildImpactText(
  angle: ProjectionAngle,
  answers?: ProjectionAnswers
) {
  const blur = normalize(answers?.currentBlur);
  const impact = normalize(answers?.impactOfClarity);

  if (
    includesOneOf(blur, ["flou", "pas clair", "difficile à comprendre", "positionnement"])
  ) {
    return "Quand l’activité reste partiellement floue, les visiteurs peuvent percevoir une intention intéressante sans comprendre clairement ce qui est proposé.";
  }

  if (
    includesOneOf(impact, [
      "demandes qualifiées",
      "prises de contact",
      "clients",
      "bons profils",
      "attirer",
    ])
  ) {
    return "Sans compréhension immédiate, l’intérêt existe parfois, mais il ne se transforme pas naturellement en prises de contact qualifiées.";
  }

  switch (angle) {
    case "digital":
      return "Quand une offre n’est pas comprise rapidement, elle peut susciter de l’intérêt sans déclencher naturellement de prise de contact.";

    case "accompagnement":
      return "Quand l’activité reste difficile à saisir, les personnes concernées peuvent se reconnaître dans l’intention sans comprendre clairement pourquoi aller plus loin.";

    case "expertise":
      return "Quand une expertise n’est pas formulée de manière nette, elle peut paraître sérieuse sans devenir immédiatement lisible pour les bons profils.";

    default:
      return "Quand le message reste partiellement flou, les visiteurs perçoivent l’intention sans comprendre immédiatement pourquoi ils devraient vous contacter.";
  }
}

function buildImprovementText(
  angle: ProjectionAngle,
  answers?: ProjectionAnswers
) {
  const action = normalize(answers?.naturalAction);
  const blur = normalize(answers?.currentBlur);

  if (includesOneOf(action, ["diagnostic", "audit", "analyse"])) {
    return "Un diagnostic ciblé permet d’identifier ce qui freine la compréhension et de clarifier le bon point d’entrée pour la suite.";
  }

  if (includesOneOf(action, ["contact", "échange", "echange", "rendez-vous", "rdv"])) {
    return "Un travail de clarification permet de rendre l’activité plus lisible, afin que la première prise de contact paraisse plus naturelle et plus évidente.";
  }

  if (includesOneOf(blur, ["positionnement", "offre", "bénéfices", "benefices"])) {
    return "Un travail de fond sur le positionnement, le message et la lisibilité permet de rendre l’offre plus nette et plus facile à comprendre.";
  }

  switch (angle) {
    case "digital":
      return "Un travail de clarification sur le message, la page et le parcours permet de rendre l’ensemble plus lisible et plus engageant.";

    case "accompagnement":
      return "Un travail de clarification permet de rendre l’approche plus lisible, plus rassurante et plus simple à engager pour les bonnes personnes.";

    case "expertise":
      return "Un travail de formulation et de structure permet de rendre l’expertise plus compréhensible et d’aider les bons profils à se reconnaître plus vite.";

    default:
      return "Un travail de clarification permet de rendre l’activité plus compréhensible, plus cohérente et plus simple à engager.";
  }
}

export function ResultCards({
  result,
  answers,
}: {
  result: ProjectionResult;
  answers?: ProjectionAnswers;
}) {
  const angle = detectAngle(result, answers);
  const impactText = buildImpactText(angle, answers);
  const improvementText = buildImprovementText(angle, answers);

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

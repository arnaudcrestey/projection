import type {
  ProjectionAnswers,
  ProjectionResult,
} from "@/lib/projection/types";

function normalize(...values: Array<string | undefined>) {
  return values
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function includesOneOf(text: string, values: string[]) {
  return values.some((value) => text.includes(value));
}

function cleanSentence(text: string) {
  return text.replace(/\s+/g, " ").replace(/\.\s*\./g, ".").trim();
}

function isWeakVision(text: string) {
  return includesOneOf(text, [
    "expérience numérique",
    "expériences numériques",
    "interface numérique",
    "interfaces numériques",
    "message",
    "valeur",
    "attractif",
    "accessible",
    "j’aide",
    "vous aide",
    "accompagne",
    "permet",
  ]);
}

function isWeakNextStep(text: string) {
  return includesOneOf(text, [
    "consultez",
    "demandez",
    "commencez par",
    "réaliser",
    "réalisez",
    "communication actuelle",
    "diagnostic simple",
  ]);
}

function rewriteVision(text: string, answers?: ProjectionAnswers) {
  const cleaned = cleanSentence(text);
  const source = normalize(
    text,
    answers?.activity,
    answers?.audience,
    answers?.immediateUnderstanding
  );

  if (cleaned.length > 90 && !isWeakVision(source)) {
    return cleaned;
  }

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
      "parcours",
    ])
  ) {
    return "Vous concevez des pages, diagnostics et dispositifs qui rendent une offre plus claire et plus facile à comprendre.";
  }

  if (
    includesOneOf(source, [
      "site",
      "numérique",
      "numerique",
      "digital",
      "digitaux",
      "interface",
      "interfaces",
    ])
  ) {
    return "Vous concevez des dispositifs clairs qui aident à mieux faire comprendre une offre et à faciliter la prise de contact.";
  }

  return cleaned;
}

function rewriteClarity(text: string, answers?: ProjectionAnswers) {
  const cleaned = cleanSentence(text);

  const source = normalize(
    text,
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
      "trop large",
      "plusieurs choses",
      "plusieurs activités",
      "différents publics",
      "pas ciblé",
      "pas cible",
    ])
  ) {
    return "On perçoit plusieurs choses dans votre activité, sans identifier clairement ce qui est proposé ni à qui cela s’adresse.";
  }

  if (
    includesOneOf(source, [
      "flou",
      "difficile à comprendre",
      "difficile a comprendre",
      "pas clair",
      "bénéfices",
      "benefices",
      "positionnement",
      "on ne comprend pas",
      "pas assez explicite",
    ])
  ) {
    return "Votre activité paraît sérieuse, mais reste difficile à saisir rapidement pour quelqu’un qui la découvre.";
  }

  if (
    includesOneOf(source, [
      "prise de contact",
      "prendre contact",
      "contact",
      "demande",
      "réserver",
      "reserver",
      "premier échange",
      "premier echange",
    ])
  ) {
    return "On comprend l’idée générale, mais pas assez clairement ce que vous proposez ni pourquoi passer à l’étape suivante.";
  }

  if (cleaned.length > 95) {
    return cleaned;
  }

  return "On comprend l’idée générale, mais pas clairement ce que vous proposez ni pourquoi vous contacter.";
}

function rewriteNextStep(text: string, answers?: ProjectionAnswers) {
  const cleaned = cleanSentence(text);
  const source = normalize(
    text,
    answers?.naturalAction,
    answers?.currentBlur,
    answers?.impactOfClarity
  );

  if (cleaned.length > 95 && !isWeakNextStep(source)) {
    return cleaned;
  }

  if (
    includesOneOf(source, ["diagnostic", "audit", "analyse"])
  ) {
    return "Un diagnostic ciblé permet d’identifier ce qui freine la compréhension et de clarifier le bon point d’entrée pour la suite.";
  }

  if (
    includesOneOf(source, [
      "contact",
      "échange",
      "echange",
      "rendez-vous",
      "rdv",
      "premier échange",
      "premier echange",
    ])
  ) {
    return "Un travail de clarification permet de rendre la prise de contact plus naturelle, plus cohérente et plus simple à déclencher.";
  }

  if (
    includesOneOf(source, [
      "positionnement",
      "offre",
      "bénéfices",
      "benefices",
      "message",
      "compréhension",
      "comprehension",
    ])
  ) {
    return "Un travail de clarification permet de rendre l’offre plus lisible, de mieux orienter le message et de faciliter la suite.";
  }

  return cleaned;
}

export function enhanceProjection(
  result: ProjectionResult,
  answers?: ProjectionAnswers
): ProjectionResult {
  return {
    vision: rewriteVision(result.vision, answers),
    clarity: rewriteClarity(result.clarity, answers),
    nextStep: rewriteNextStep(result.nextStep, answers),
  };
}

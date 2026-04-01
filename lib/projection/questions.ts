import type { ProjectionQuestion } from "@/lib/projection/types";

export const projectionQuestions: ProjectionQuestion[] = [
  {
    id: "activity",
    label: "Quelle activité développez-vous aujourd’hui ?",
    placeholder:
      "Décrivez votre activité avec vos mots, même si elle vous semble encore incomplète.",
    hint: "Décrivez simplement ce que vous faites aujourd’hui, sans chercher la formulation parfaite.",
    minLength: 20,
  },
  {
    id: "audience",
    label: "À qui s’adresse-t-elle en priorité ?",
    placeholder:
      "Précisez le profil des personnes que vous souhaitez réellement accompagner.",
    hint: "Pensez aux personnes les plus concernées, pas à tout le monde.",
    minLength: 20,
  },
  {
    id: "immediateUnderstanding",
    label: "Qu’aimeriez-vous que l’on comprenne immédiatement en découvrant votre activité ?",
    placeholder: "Formulez ce qui devrait être saisi en quelques secondes.",
    hint: "Ici, cherche l’idée qui devrait être comprise presque instantanément.",
    minLength: 20,
  },
  {
    id: "currentBlur",
    label: "Aujourd’hui, qu’est-ce qui vous semble encore flou ou dispersé ?",
    placeholder:
      "Expliquez les zones de confusion que vous constatez dans votre présentation actuelle.",
    hint: "Tu peux parler de ton site, de ton discours, de ton offre ou de la perception des visiteurs.",
    minLength: 20,
  },
  {
    id: "impactOfClarity",
    label: "Si tout devenait plus clair, qu’est-ce que cela changerait concrètement ?",
    placeholder:
      "Décrivez les effets attendus sur votre relation client et vos décisions.",
    hint: "Par exemple : mieux convaincre, mieux filtrer, mieux orienter ou gagner en confiance.",
    minLength: 20,
  },
  {
    id: "naturalAction",
    label: "Que devrait faire naturellement une personne intéressée après vous avoir découvert ?",
    placeholder: "Indiquez l’action simple et logique que vous souhaitez faciliter.",
    hint: "Imagine le prochain pas idéal après la découverte de ton activité.",
    minLength: 20,
  },
  {
    id: "firstImpression",
    label: "Quelle première impression devrait se dégager de votre activité ?",
    placeholder:
      "Précisez le ressenti de sérieux, de méthode ou de proximité que vous souhaitez transmettre.",
    hint: "Décris le ressenti global que tu voudrais laisser dès les premières secondes.",
    minLength: 20,
  },
];

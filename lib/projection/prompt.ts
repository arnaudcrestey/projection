import type { ProjectionAnswers } from "@/lib/projection/types";

function clean(value?: string) {
  return value?.trim() ?? "";
}

export function buildProjectionPrompt(answers: ProjectionAnswers) {
  return `Tu dois reformuler une activité de manière simple et claire.

Objectif :
Quelqu’un qui découvre cette activité doit comprendre en quelques secondes :
- ce que fait la personne
- pour qui
- ce que ça apporte
- comment commencer

---

Règles absolues :

- Tu ne dois PAS reprendre les phrases telles quelles
- Tu dois reformuler avec tes propres mots
- Tu dois simplifier les idées
- Tu dois supprimer tout ce qui est inutile

---

Style :

- phrases courtes
- mots simples
- ton naturel
- pas de jargon
- pas de langage “intelligent”

---

Interdictions strictes :

- copier les phrases utilisateur
- phrases longues
- répétitions
- mots abstraits
- ton “expert”
- structures compliquées

---

Format obligatoire :

- maximum 2 phrases par bloc
- 1 idée par phrase
- phrases courtes (15 mots max idéalement)

---

Données :

Activité :
${clean(answers.activity)}

Audience :
${clean(answers.audience)}

Compréhension attendue :
${clean(answers.immediateUnderstanding)}

Action :
${clean(answers.naturalAction)}

---

Tu produis UNIQUEMENT ce JSON :

{
  "vision": "...",
  "clarity": "...",
  "nextStep": "..."
}

---

Consignes précises :

vision :
Explique clairement ce que fait la personne et pour qui.
Ne copie pas les phrases.
Simplifie.

clarity :
Explique ce que l’on doit comprendre immédiatement et ce que la personne peut faire.
Sois concret.

nextStep :
Explique comment commencer simplement.
Propose une action naturelle.

---

IMPORTANT :

Chaque bloc doit être lisible en moins de 5 secondes.

Si une phrase est inutile → supprime-la.

Le résultat doit donner :
"Ok, j’ai compris."

Pas plus.
`;
}

import type { ProjectionAnswers } from "@/lib/projection/types";

function clean(value?: string) {
  return value?.trim() ?? "";
}

export function buildProjectionPrompt(answers: ProjectionAnswers) {
  return `Tu dois reformuler une activité de manière simple.

Règle absolue :
Le texte doit être compris en 3 secondes.

Si une phrase est trop longue → raccourcis.
Si un mot est compliqué → remplace.
Si une idée est inutile → supprime.

Tu écris comme si tu parlais à quelqu’un.

---

Interdictions strictes :
- phrases longues
- jargon
- mots abstraits
- ton “expert”
- répétitions
- phrases compliquées

---

Format obligatoire :
- maximum 2 phrases par bloc
- phrases courtes
- une idée par phrase

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

Consignes :

vision :
Dire simplement ce que la personne fait et pour qui.

clarity :
Dire ce qu’on doit comprendre immédiatement + ce que la personne peut faire.

nextStep :
Dire comment commencer simplement.

---

IMPORTANT :

Si tu écris une phrase de plus de 20 mots → c’est une erreur.

Le résultat doit être simple, direct, humain.

Pas intelligent. Pas complexe.

Simple.
`;
}

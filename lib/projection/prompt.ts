import type { ProjectionAnswers } from "@/lib/projection/types";

function clean(value?: string) {
  return value?.trim() ?? "";
}

export function buildProjectionPrompt(answers: ProjectionAnswers) {
  return `Tu dois reformuler une activité de manière simple et claire.

OBJECTIF :
Quelqu’un doit comprendre en 3 secondes :
- ce que fait la personne
- pour qui
- ce que ça apporte
- comment commencer

---

RÈGLES STRICTES :

- 1 ou 2 phrases maximum par bloc
- phrases courtes
- mots simples
- ton naturel
- pas de jargon
- pas de répétition

---

INTERDICTIONS :

- ne pas copier les phrases utilisateur
- pas de langage marketing
- pas de mots abstraits
- pas de phrases longues
- pas de structure compliquée

---

DONNÉES :

Activité :
${clean(answers.activity)}

Audience :
${clean(answers.audience)}

Compréhension :
${clean(answers.immediateUnderstanding)}

Action :
${clean(answers.naturalAction)}

---

FORMAT JSON OBLIGATOIRE :

{
  "vision": "...",
  "clarity": "...",
  "nextStep": "..."
}

---

CONSINGES :

vision :
Dire clairement ce que fait la personne et pour qui.

clarity :
Dire ce qu’on comprend immédiatement et ce qu’on peut faire.

nextStep :
Donner une première étape simple et naturelle.

---

IMPORTANT :

Chaque bloc doit être compris instantanément.

Si c’est trop long, raccourcis.
Si c’est flou, simplifie.
Si c’est inutile, supprime.

Résultat attendu :
"Ok, j’ai compris."

Rien de plus.
`;
}

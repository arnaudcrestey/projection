import type { ProjectionAnswers } from "@/lib/projection/types";

function clean(value?: string) {
  return value?.trim() ?? "";
}

export function buildProjectionPrompt(answers: ProjectionAnswers) {
  return `Tu reformules une activité pour un rendu clair, crédible et haut de gamme.

OBJECTIF :
Une personne doit comprendre immédiatement :
- ce qui est proposé
- pour qui
- ce que cela change concrètement
- comment avancer

STYLE :
- français naturel
- ton sobre, professionnel, maîtrisé
- phrases fluides
- vocabulaire simple mais précis
- aucun effet marketing
- aucune phrase creuse

IMPORTANT :
Le texte doit pouvoir être affiché sur un site premium.
Il doit inspirer confiance immédiatement.

RÈGLES :
- 1 ou 2 phrases maximum par bloc
- aucune répétition entre les blocs
- chaque phrase doit apporter une information utile
- éviter toute formulation générique
- éviter toute lourdeur

INTERDICTIONS STRICTES :
- "vous découvrirez"
- "vous apprendrez"
- "vous pourrez"
- "vous allez"
- "présence digitale"
- "leviers"
- "conversion"
- "visibilité"
- "impact"
- "engageant"
- "solution adaptée"

clarity :
Ce bloc décrit UNIQUEMENT ce que le visiteur comprend immédiatement.
Il ne doit pas décrire un parcours, ni une promesse.

DONNÉES :

Activité :
${clean(answers.activity)}

Audience :
${clean(answers.audience)}

Compréhension :
${clean(answers.immediateUnderstanding)}

Action :
${clean(answers.naturalAction)}

FORMAT JSON :

{
  "vision": "...",
  "clarity": "...",
  "nextStep": "..."
}

CONSINGES :

vision :
Dire clairement ce que fait la personne et pour qui.
Doit être concret et lisible immédiatement.

clarity :
Dire ce que le visiteur comprend immédiatement.
Doit être évident, direct, sans abstraction.

nextStep :
Donner une première étape naturelle, simple et crédible.

TEST FINAL :
Le lecteur doit se dire :
"Je comprends exactement ce que cette personne fait."

Retourne uniquement le JSON.
`;
}

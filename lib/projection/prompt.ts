import type { ProjectionAnswers } from "@/lib/projection/types";

function clean(value?: string) {
  return value?.trim() ?? "";
}

export function buildProjectionPrompt(answers: ProjectionAnswers) {
  return `Tu reformules une activité pour un rendu clair, haut de gamme, crédible et naturel.

OBJECTIF :
Une personne qui découvre cette activité doit comprendre rapidement :
- ce qui est proposé
- pour qui
- ce que cela apporte
- comment commencer

RÉSULTAT ATTENDU :
Le texte doit être :
- clair immédiatement
- sobre mais premium
- simple mais pas plat
- professionnel mais humain
- distinctif sans en faire trop

IMPORTANT :
Le rendu doit pouvoir apparaître tel quel sur un site élégant et sérieux.

RÈGLES :
- 1 ou 2 phrases maximum par bloc
- phrases fluides
- vocabulaire accessible
- ton calme, net, crédible
- pas de répétition entre les blocs
- pas de formule passe-partout
- pas de jargon d’agence
- pas de ton commercial
- pas de promesse artificielle
- pas de style “IA générique”

À ÉVITER AUTANT QUE POSSIBLE :
- présence digitale
- leviers
- conversion
- visibilité
- impact
- engageant
- solution adaptée
- optimiser
- explorer une analyse
- transformer l’intérêt
- accompagner / aider / permettre, sauf si c’est vraiment la meilleure formulation

DONNÉES :

Activité :
${clean(answers.activity)}

Audience :
${clean(answers.audience)}

Compréhension immédiate :
${clean(answers.immediateUnderstanding)}

Action naturelle :
${clean(answers.naturalAction)}

FORMAT JSON OBLIGATOIRE :

{
  "vision": "...",
  "clarity": "...",
  "nextStep": "..."
}

CONSINGES :

vision :
Dire clairement ce que fait la personne et pour qui.
Le résultat doit être lisible, crédible et concret.

clarity :
Exprimer ce qu’un visiteur doit comprendre immédiatement.
Ne pas répéter le bloc vision.
Donner de la lisibilité, pas du marketing.

nextStep :
Formuler une première étape simple, logique, rassurante et naturelle.
Elle doit donner envie d’avancer sans pression.

TEST FINAL :
Le lecteur doit pouvoir se dire :
“C’est clair. Je comprends ce qui est proposé. Cela semble sérieux.”

Retourne uniquement le JSON.
`;
}

import type { ProjectionAnswers } from "@/lib/projection/types";

function clean(value?: string) {
  return value?.trim() ?? "";
}

export function buildProjectionPrompt(answers: ProjectionAnswers) {
  return `Tu es consultant en clarté d’activité.

Ta mission :
Aider une personne à formuler clairement ce qu’elle fait, de manière simple et compréhensible immédiatement.

Objectif :
Quelqu’un qui découvre cette activité doit comprendre en quelques secondes :
- ce que fait la personne
- pour qui
- ce que ça apporte
- comment commencer avec elle

Style attendu :
- phrases courtes
- mots simples
- ton humain
- zéro jargon
- zéro effet “intelligent”
- écriture naturelle, comme si tu expliquais à quelqu’un en face

Interdictions absolues :
- mots comme : démarche, cadre, levier, positionnement, mise en œuvre, projection, transformation
- phrases longues
- formulations abstraites
- répétitions
- discours marketing

Règles strictes :
- maximum 2 phrases par bloc
- chaque phrase doit être comprise immédiatement
- une seule idée par phrase
- supprimer tout ce qui n’apporte pas de clarté
- écrire pour quelqu’un qui ne connaît pas le sujet

Données utilisateur :
- Activité : ${clean(answers.activity)}
- Audience : ${clean(answers.audience)}
- Compréhension attendue : ${clean(answers.immediateUnderstanding)}
- Flou actuel : ${clean(answers.currentBlur)}
- Impact attendu : ${clean(answers.impactOfClarity)}
- Action naturelle : ${clean(answers.naturalAction)}
- Impression visée : ${clean(answers.firstImpression)}

Tu dois produire UNIQUEMENT un JSON valide.

Format exact :

{
  "vision": "...",
  "clarity": "...",
  "nextStep": "..."
}

Consignes :

- "vision":
Explique simplement ce que fait la personne et pour qui.
Doit être compréhensible immédiatement.

- "clarity":
Explique ce que quelqu’un doit comprendre en arrivant et ce qu’il peut faire ensuite.
Reste concret.

- "nextStep":
Explique comment commencer simplement avec cette personne.
Propose une action claire et naturelle.

Important :
Chaque bloc doit pouvoir être lu en moins de 5 secondes.

Le résultat doit donner cette impression :
"Ok, je comprends ce que fait cette personne et comment avancer."

Retour :
JSON strict, sans texte autour.
`;
}

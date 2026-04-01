function rewriteClarity(text: string) {
  const cleaned = normalize(text);

  // Si déjà très bon → on garde
  if (cleaned.length > 85 && !isWeakClarity(cleaned)) {
    return cleaned;
  }

  // Détection du problème principal
  const lower = cleaned.toLowerCase();

  // 1. PROBLÈME : flou
  if (
    lower.includes("flou") ||
    lower.includes("difficile") ||
    lower.includes("pas clair") ||
    lower.includes("comprendre")
  ) {
    return "Votre activité semble pertinente, mais reste difficile à comprendre rapidement pour quelqu’un qui la découvre.";
  }

  // 2. PROBLÈME : positionnement
  if (
    lower.includes("trop large") ||
    lower.includes("pas ciblé") ||
    lower.includes("plusieurs") ||
    lower.includes("différents")
  ) {
    return "On perçoit plusieurs choses dans votre activité, sans identifier clairement ce qui est proposé ni à qui cela s’adresse.";
  }

  // 3. PROBLÈME : conversion (le plus courant)
  return "On comprend l’idée générale, mais pas clairement ce que vous proposez ni pourquoi vous contacter.";
}

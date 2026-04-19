// Detect if text is Arabic or French
export function detectLanguage(text: string): "FR" | "AR" {
  // Arabic Unicode ranges
  const arabicPattern = /[\u0600-\u06FF]/g;
  // French/Latin characters (common French patterns)
  const frenchPattern = /[a-zA-ZàâäéèêëïîôöùûüœæçÀÂÄÉÈÊËÏÎÔÖÙÛÜŒÆÇ]/g;

  const arabicMatches = (text.match(arabicPattern) || []).length;
  const frenchMatches = (text.match(frenchPattern) || []).length;

  // If we have more Arabic characters, treat as Arabic
  if (arabicMatches > frenchMatches && arabicMatches > 0) {
    return "AR";
  }

  // Default to French
  return "FR";
}

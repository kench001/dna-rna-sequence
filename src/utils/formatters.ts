/**
 * Formats a sequence into separated blocks (e.g. groups of 3 or 10)
 */
export function formatSequenceBlocks(sequence: string, blockSize: number = 3): string {
  const chunks: string[] = [];
  for (let i = 0; i < sequence.length; i += blockSize) {
    chunks.push(sequence.slice(i, i + blockSize));
  }
  return chunks.join(' ');
}

/**
 * Copies text safely to clipboard
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (!navigator.clipboard) {
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}

/**
 * Simple DNA melting temperature (Tm) estimate for high school biology students:
 * Wallace Rule: Tm = 2 * (A + T) + 4 * (G + C) °C
 */
export function estimateMeltingTemperature(sequence: string): number {
  const upper = sequence.toUpperCase();
  let atCount = 0;
  let gcCount = 0;

  for (const char of upper) {
    if (char === 'A' || char === 'T' || char === 'U') {
      atCount++;
    } else if (char === 'G' || char === 'C') {
      gcCount++;
    }
  }

  return 2 * atCount + 4 * gcCount;
}

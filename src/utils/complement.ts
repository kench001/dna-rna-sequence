import { BASE_METADATA_RECORD, WORD_TO_BASE_MAP } from '../constants/basePairs';
import type { BaseSymbol, DetectedWordItem, PairedCharacter, SequenceAnalysis } from '../types/biology';

/**
 * Normalizes input string (trimming whitespace)
 */
export function normalizeInput(raw: string): string {
  return raw.trim();
}

/**
 * Returns the complementary DNA base for a given character
 * A <-> T, G <-> C, U -> A
 */
export function getDnaComplementChar(char: string): string {
  const upper = char.toUpperCase();
  switch (upper) {
    case 'A':
      return 'T';
    case 'T':
      return 'A';
    case 'G':
      return 'C';
    case 'C':
      return 'G';
    case 'U':
      return 'A'; // If RNA was supplied
    default:
      return '?';
  }
}

/**
 * Returns the RNA transcript base (transcription from DNA to mRNA)
 * DNA A -> RNA U
 * DNA T -> RNA A
 * DNA G -> RNA C
 * DNA C -> RNA G
 * RNA U -> RNA A
 */
export function getRnaComplementChar(char: string): string {
  const upper = char.toUpperCase();
  switch (upper) {
    case 'A':
      return 'U';
    case 'T':
      return 'A';
    case 'G':
      return 'C';
    case 'C':
      return 'G';
    case 'U':
      return 'A';
    default:
      return '?';
  }
}

/**
 * Analyzes an input string, supporting:
 * 1. Single word (e.g. "Adenine")
 * 2. Multiple words (e.g. "CYTOSINE ADENINE" or "Adenine, Thymine, Guanine")
 * 3. Raw nucleotide sequences (e.g. "AGCTAGC")
 */
export function analyzeSequenceInput(input: string): SequenceAnalysis {
  const normalized = normalizeInput(input);

  if (!normalized) {
    return {
      originalRaw: '',
      cleanedSequence: '',
      isWordMode: false,
      isSingleWord: false,
      detectedWords: [],
      dnaWordResult: '',
      rnaWordResult: '',
      dnaComplement: '',
      rnaTranscript: '',
      pairs: [],
      length: 0,
      gcContentPercent: 0,
      invalidCharacters: [],
      invalidWords: [],
    };
  }

  // Tokenize by spaces, commas, dashes, semicolons, or slashes
  const rawTokens = normalized.split(/[\s,\-_;/|]+/).filter(Boolean);

  // Check if any token is a recognized base word name (e.g., "cytosine", "adenine", etc.)
  const hasWordMatch = rawTokens.some((token) => {
    const clean = token.toLowerCase();
    return Boolean(WORD_TO_BASE_MAP[clean]);
  });

  // 1. WORD MODE: User entered one or more word names (e.g. "CYTOSINE ADENINE" or "Adenine")
  if (hasWordMatch) {
    const detectedWords: DetectedWordItem[] = [];
    const invalidWords: string[] = [];
    const pairs: PairedCharacter[] = [];
    let gcCount = 0;

    rawTokens.forEach((token, index) => {
      const clean = token.toLowerCase();
      const symbol =
        WORD_TO_BASE_MAP[clean] ||
        (['A', 'T', 'G', 'C', 'U'].includes(token.toUpperCase())
          ? (token.toUpperCase() as BaseSymbol)
          : null);

      if (symbol && BASE_METADATA_RECORD[symbol]) {
        const meta = BASE_METADATA_RECORD[symbol];
        if (symbol === 'G' || symbol === 'C') gcCount++;

        const wordItem: DetectedWordItem = {
          index,
          inputName: meta.name,
          dnaPair: meta.dnaPair.name,
          rnaPair: meta.rnaPair.name,
          symbol,
          dnaSymbol: meta.dnaPair.symbol,
          rnaSymbol: meta.rnaPair.symbol,
          hBonds: meta.hBonds,
          explanation: `${meta.name} (${symbol}) forms ${meta.hBonds} hydrogen bonds with ${meta.dnaPair.name} (${meta.dnaPair.symbol}) in DNA, and pairs with ${meta.rnaPair.name} (${meta.rnaPair.symbol}) in RNA transcription.`,
        };

        detectedWords.push(wordItem);

        pairs.push({
          index,
          inputChar: symbol,
          dnaChar: meta.dnaPair.symbol,
          rnaChar: meta.rnaPair.symbol,
          inputName: meta.name,
          dnaPairName: meta.dnaPair.name,
          rnaPairName: meta.rnaPair.name,
          hBonds: meta.hBonds,
          isValid: true,
        });
      } else {
        invalidWords.push(token);
      }
    });

    const cleanedSequence = detectedWords.map((w) => w.symbol).join('');
    const dnaComplement = detectedWords.map((w) => w.dnaSymbol).join('');
    const rnaTranscript = detectedWords.map((w) => w.rnaSymbol).join('');
    const dnaWordResult = detectedWords.map((w) => w.dnaPair).join(' ');
    const rnaWordResult = detectedWords.map((w) => w.rnaPair).join(' ');
    const gcContentPercent =
      detectedWords.length > 0 ? Math.round((gcCount / detectedWords.length) * 100) : 0;

    return {
      originalRaw: input,
      cleanedSequence,
      isWordMode: true,
      isSingleWord: detectedWords.length === 1 && invalidWords.length === 0,
      detectedWord: detectedWords[0],
      detectedWords,
      dnaWordResult,
      rnaWordResult,
      dnaComplement,
      rnaTranscript,
      pairs,
      length: detectedWords.length,
      gcContentPercent,
      invalidCharacters: [],
      invalidWords,
    };
  }

  // 2. RAW SEQUENCE MODE: e.g. "AGCTAGC" or "A G C T A G C"
  const cleanedChars = normalized.toUpperCase().replace(/[\s\-_0-9]/g, '').split('');
  const invalidSet = new Set<string>();
  let gcCount = 0;
  let validCount = 0;

  const pairs: PairedCharacter[] = cleanedChars.map((char, index) => {
    const isBase = ['A', 'T', 'G', 'C', 'U'].includes(char);

    if (isBase) {
      validCount++;
      if (char === 'G' || char === 'C') {
        gcCount++;
      }
      const dnaChar = getDnaComplementChar(char);
      const rnaChar = getRnaComplementChar(char);
      const meta = BASE_METADATA_RECORD[char as BaseSymbol];

      return {
        index,
        inputChar: char,
        dnaChar,
        rnaChar,
        inputName: meta?.name,
        dnaPairName: meta?.dnaPair.name,
        rnaPairName: meta?.rnaPair.name,
        hBonds: meta?.hBonds,
        isValid: true,
      };
    } else {
      invalidSet.add(char);
      return {
        index,
        inputChar: char,
        dnaChar: '?',
        rnaChar: '?',
        isValid: false,
      };
    }
  });

  const dnaComplement = pairs.map((p) => p.dnaChar).join('');
  const rnaTranscript = pairs.map((p) => p.rnaChar).join('');
  const dnaWordResult = pairs.filter((p) => p.isValid).map((p) => p.dnaPairName || '').join(' ');
  const rnaWordResult = pairs.filter((p) => p.isValid).map((p) => p.rnaPairName || '').join(' ');
  const gcContentPercent = validCount > 0 ? Math.round((gcCount / validCount) * 100) : 0;

  return {
    originalRaw: input,
    cleanedSequence: cleanedChars.join(''),
    isWordMode: false,
    isSingleWord: false,
    detectedWords: [],
    dnaWordResult,
    rnaWordResult,
    dnaComplement,
    rnaTranscript,
    pairs,
    length: cleanedChars.length,
    gcContentPercent,
    invalidCharacters: Array.from(invalidSet),
    invalidWords: [],
  };
}

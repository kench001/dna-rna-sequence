import { AMINO_ACID_DEFINITIONS, GENETIC_CODE_TABLE } from '../constants/geneticCode';
import type { CodonTranslationItem } from '../types/biology';

/**
 * Translates an RNA or DNA sequence into amino acids.
 * DNA sequences with T's are automatically transcribed to U's for codon lookup.
 */
export function translateSequence(sequence: string): {
  codons: CodonTranslationItem[];
  polypeptideChain: string;
  hasStartCodon: boolean;
  hasStopCodon: boolean;
  warning?: string;
} {
  // Clean string: uppercase, letters only
  const clean = sequence.toUpperCase().replace(/[^A-Z]/g, '');

  if (!clean) {
    return {
      codons: [],
      polypeptideChain: '',
      hasStartCodon: false,
      hasStopCodon: false,
    };
  }

  // Convert T -> U (DNA to RNA representation)
  const rnaSequence = clean.replace(/T/g, 'U');

  const codons: CodonTranslationItem[] = [];
  let hasStartCodon = false;
  let hasStopCodon = false;

  for (let i = 0; i < rnaSequence.length; i += 3) {
    const triplet = rnaSequence.slice(i, i + 3);

    // If incomplete codon at the end
    if (triplet.length < 3) {
      break;
    }

    const aaKey = GENETIC_CODE_TABLE[triplet] || 'Unknown';
    const aaInfo = AMINO_ACID_DEFINITIONS[aaKey] || {
      name: `Unknown (${triplet})`,
      threeLetter: '???',
      oneLetter: '?',
      property: 'Nonpolar',
      color: 'bg-slate-700 text-slate-300 border-slate-600',
      description: 'Unrecognized codon sequence',
    };

    if (aaInfo.isStart) hasStartCodon = true;
    if (aaInfo.isStop) hasStopCodon = true;

    codons.push({
      codon: triplet,
      aminoAcid: aaInfo,
      isStart: !!aaInfo.isStart,
      isStop: !!aaInfo.isStop,
    });
  }

  const polypeptideChain = codons.map((c) => c.aminoAcid.threeLetter).join(' - ');

  let warning: string | undefined;
  if (clean.length % 3 !== 0) {
    warning = `Sequence length is ${clean.length} bases. The last ${clean.length % 3} base(s) did not form a complete 3-letter codon.`;
  }

  return {
    codons,
    polypeptideChain,
    hasStartCodon,
    hasStopCodon,
    warning,
  };
}

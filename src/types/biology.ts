export type BaseSymbol = 'A' | 'T' | 'G' | 'C' | 'U';

export type BaseName = 'Adenine' | 'Thymine' | 'Guanine' | 'Cytosine' | 'Uracil';

export type NucleicAcidType = 'DNA' | 'RNA';

export interface BaseMetadata {
  symbol: BaseSymbol;
  name: BaseName;
  dnaPair: {
    symbol: BaseSymbol;
    name: BaseName;
  };
  rnaPair: {
    symbol: BaseSymbol;
    name: BaseName;
  };
  hBonds: number; // 2 for A-T / A-U, 3 for G-C
  category: 'Purine (Double Ring)' | 'Pyrimidine (Single Ring)';
  badgeColor: string;
  glowColor: string;
  funFact: string;
}

export interface PairedCharacter {
  index: number;
  inputChar: string;
  dnaChar: string;
  rnaChar: string;
  inputName?: BaseName;
  dnaPairName?: BaseName;
  rnaPairName?: BaseName;
  hBonds?: number;
  isValid: boolean;
}

export interface DetectedWordItem {
  index: number;
  inputName: BaseName;
  dnaPair: BaseName;
  rnaPair: BaseName;
  symbol: BaseSymbol;
  dnaSymbol: BaseSymbol;
  rnaSymbol: BaseSymbol;
  hBonds: number;
  explanation: string;
}

export interface SequenceAnalysis {
  originalRaw: string;
  cleanedSequence: string;
  isWordMode: boolean;
  isSingleWord: boolean;
  detectedWord?: DetectedWordItem;
  detectedWords: DetectedWordItem[];
  dnaWordResult: string;
  rnaWordResult: string;
  dnaComplement: string;
  rnaTranscript: string;
  pairs: PairedCharacter[];
  length: number;
  gcContentPercent: number;
  invalidCharacters: string[];
  invalidWords: string[];
}

export interface AminoAcidInfo {
  name: string;
  threeLetter: string;
  oneLetter: string;
  property: 'Nonpolar' | 'Polar' | 'Acidic' | 'Basic' | 'Special / Stop';
  color: string;
  isStart?: boolean;
  isStop?: boolean;
  description: string;
}

export interface CodonTranslationItem {
  codon: string;
  aminoAcid: AminoAcidInfo;
  isStart: boolean;
  isStop: boolean;
}

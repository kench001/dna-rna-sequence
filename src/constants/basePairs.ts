import type { BaseMetadata, BaseName, BaseSymbol } from '../types/biology';

export const BASE_METADATA_RECORD: Record<BaseSymbol, BaseMetadata> = {
  A: {
    symbol: 'A',
    name: 'Adenine',
    dnaPair: { symbol: 'T', name: 'Thymine' },
    rnaPair: { symbol: 'U', name: 'Uracil' },
    hBonds: 2,
    category: 'Purine (Double Ring)',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    glowColor: 'shadow-emerald-500/20',
    funFact: 'Adenine forms 2 hydrogen bonds. In RNA, Uracil takes Thymine’s place to save cellular energy.',
  },
  T: {
    symbol: 'T',
    name: 'Thymine',
    dnaPair: { symbol: 'A', name: 'Adenine' },
    rnaPair: { symbol: 'A', name: 'Adenine' },
    hBonds: 2,
    category: 'Pyrimidine (Single Ring)',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    glowColor: 'shadow-amber-500/20',
    funFact: 'Thymine exists exclusively in DNA! It provides extra chemical stability against mutations.',
  },
  G: {
    symbol: 'G',
    name: 'Guanine',
    dnaPair: { symbol: 'C', name: 'Cytosine' },
    rnaPair: { symbol: 'C', name: 'Cytosine' },
    hBonds: 3,
    category: 'Purine (Double Ring)',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    glowColor: 'shadow-cyan-500/20',
    funFact: 'Guanine bonds with Cytosine using 3 strong hydrogen bonds, making GC-rich DNA harder to melt.',
  },
  C: {
    symbol: 'C',
    name: 'Cytosine',
    dnaPair: { symbol: 'G', name: 'Guanine' },
    rnaPair: { symbol: 'G', name: 'Guanine' },
    hBonds: 3,
    category: 'Pyrimidine (Single Ring)',
    badgeColor: 'bg-violet-500/20 text-violet-400 border-violet-500/40',
    glowColor: 'shadow-violet-500/20',
    funFact: 'Cytosine pairs with Guanine via 3 hydrogen bonds and can undergo methylation for gene regulation.',
  },
  U: {
    symbol: 'U',
    name: 'Uracil',
    dnaPair: { symbol: 'A', name: 'Adenine' },
    rnaPair: { symbol: 'A', name: 'Adenine' },
    hBonds: 2,
    category: 'Pyrimidine (Single Ring)',
    badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
    glowColor: 'shadow-rose-500/20',
    funFact: 'Uracil replaces Thymine in RNA. It pairs with Adenine using 2 hydrogen bonds during translation.',
  },
};

// Word map to recognize English full chemical names
export const WORD_TO_BASE_MAP: Record<string, BaseSymbol> = {
  adenine: 'A',
  thymine: 'T',
  guanine: 'G',
  cytosine: 'C',
  uracil: 'U',
};

// Full name lookup from BaseName
export const BASE_NAME_LOOKUP: Record<BaseName, BaseSymbol> = {
  Adenine: 'A',
  Thymine: 'T',
  Guanine: 'G',
  Cytosine: 'C',
  Uracil: 'U',
};

export const COLOR_MAP: Record<BaseSymbol, { bg: string; text: string; border: string; dot: string }> = {
  A: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/40', dot: 'bg-emerald-400' },
  T: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/40', dot: 'bg-amber-400' },
  G: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/40', dot: 'bg-cyan-400' },
  C: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/40', dot: 'bg-violet-400' },
  U: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/40', dot: 'bg-rose-400' },
};

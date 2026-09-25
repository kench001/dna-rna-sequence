export interface SamplePreset {
  label: string;
  type: 'word' | 'sequence' | 'codon';
  value: string;
  description: string;
}

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    label: 'User Example: AGCTAGC',
    type: 'sequence',
    value: 'AGCTAGC',
    description: 'Exact prompt example: DNA -> TCGATCG, RNA -> UCGAUCG',
  },
  {
    label: 'Single Word: Adenine',
    type: 'word',
    value: 'Adenine',
    description: 'Single word lookup: Pairs with Thymine (DNA) or Uracil (RNA)',
  },
  {
    label: 'Single Word: Cytosine',
    type: 'word',
    value: 'Cytosine',
    description: 'Single word lookup: Pairs with Guanine (3 Hydrogen Bonds)',
  },
  {
    label: 'Start Codon Sequence',
    type: 'sequence',
    value: 'ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG',
    description: 'Typical gene fragment starting with ATG (AUG in RNA) and terminating with a stop codon',
  },
  {
    label: 'Telomere Repeat (Human)',
    type: 'sequence',
    value: 'TTAGGGTTAGGG',
    description: 'Repeated hexanucleotide sequence found at the protective ends of human chromosomes',
  },
  {
    label: 'TATA Box Promoter',
    type: 'sequence',
    value: 'TATAAA',
    description: 'Core DNA promoter sequence that indicates where transcription begins',
  },
];

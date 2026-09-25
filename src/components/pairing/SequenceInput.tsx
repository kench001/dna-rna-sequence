import React from 'react';
import { SAMPLE_PRESETS } from '../../constants/sampleSequences';
import type { SamplePreset } from '../../constants/sampleSequences';
import { Button } from '../common/Button';
import { X, Sparkles, AlertCircle } from 'lucide-react';

interface SequenceInputProps {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
  onSelectPreset: (preset: SamplePreset) => void;
  isWordMode: boolean;
  isSingleWord: boolean;
  length: number;
  gcContentPercent: number;
  invalidCharacters: string[];
  invalidWords: string[];
}

export const SequenceInput: React.FC<SequenceInputProps> = ({
  value,
  onChange,
  onClear,
  onSelectPreset,
  isWordMode,
  length,
  gcContentPercent,
  invalidCharacters,
  invalidWords,
}) => {
  return (
    <div className="space-y-4">
      {/* Input Field Container */}
      <div className="relative">
        <label
          htmlFor="sequence-input"
          className="block text-sm font-medium text-slate-300 mb-2 flex items-center justify-between"
        >
          <span>Enter Base Name(s) or Nucleotide Sequence</span>
          <span className="text-xs text-slate-400 font-normal">
            Try <span className="text-indigo-400 font-mono">Cytosine Adenine</span> or{' '}
            <span className="text-indigo-400 font-mono">AGCTAGC</span>
          </span>
        </label>

        <div className="relative">
          <input
            id="sequence-input"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type 'Adenine', 'Cytosine Adenine', or DNA sequence 'AGCTAGC'..."
            className="w-full bg-slate-900/90 border border-slate-750 focus:border-indigo-500 rounded-xl px-4 py-3.5 pr-24 text-slate-100 placeholder-slate-500 font-mono text-base tracking-wide shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all uppercase placeholder:normal-case"
          />

          {value && (
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="h-8 w-8 p-0 text-slate-400 hover:text-rose-400"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Unrecognized Word Warning */}
        {invalidWords && invalidWords.length > 0 && (
          <div className="mt-2.5 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-300">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Notice:</span> Unrecognized base name(s):{' '}
              <span className="font-mono bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-200">
                {invalidWords.join(', ')}
              </span>
              . Standard base names are <span className="font-semibold text-white">Adenine, Thymine, Guanine, Cytosine, Uracil</span>.
            </div>
          </div>
        )}

        {/* Invalid Character Warning for Sequence Mode */}
        {!isWordMode && invalidCharacters && invalidCharacters.length > 0 && (
          <div className="mt-2.5 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-300">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Notice:</span> Non-standard nucleotide characters detected:{' '}
              <span className="font-mono bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-200">
                {invalidCharacters.join(', ')}
              </span>
              . Standard DNA bases are <span className="font-semibold text-white">A, T, G, C</span> and RNA is{' '}
              <span className="font-semibold text-white">A, U, G, C</span>.
            </div>
          </div>
        )}
      </div>

      {/* Live Stats bar */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 px-1 gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            Mode:{' '}
            <strong className="text-slate-200">
              {isWordMode
                ? `Base Name Lookup (${length} word${length === 1 ? '' : 's'})`
                : 'Nucleotide Sequence Chain'}
            </strong>
          </span>
          <span>&bull;</span>
          <span>
            Length: <strong className="text-slate-200">{length}</strong> base{length === 1 ? '' : 's'}
          </span>
          {length > 0 && (
            <>
              <span>&bull;</span>
              <span>
                GC Content: <strong className="text-cyan-400">{gcContentPercent}%</strong>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Preset Quick Chips */}
      <div>
        <div className="text-xs text-slate-400 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Quick Examples (Click to test):</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => onSelectPreset(preset)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/60 hover:border-indigo-500/40 transition-all cursor-pointer font-mono"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

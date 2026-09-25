import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useClipboard } from '../../hooks/useClipboard';
import { COLOR_MAP } from '../../constants/basePairs';
import type { BaseSymbol } from '../../types/biology';
import { Copy, Check, Dna, FileCode } from 'lucide-react';

interface SequenceResultBoxProps {
  originalSequence: string;
  dnaComplement: string;
  rnaTranscript: string;
  dnaWordResult?: string;
  rnaWordResult?: string;
  isWordMode?: boolean;
}

export const SequenceResultBox: React.FC<SequenceResultBoxProps> = ({
  originalSequence,
  dnaComplement,
  rnaTranscript,
  dnaWordResult,
  rnaWordResult,
  isWordMode,
}) => {
  const { copy, isCopied } = useClipboard();

  const renderColoredSequence = (seq: string) => {
    return (
      <div className="flex flex-wrap gap-1 font-mono text-base font-bold py-1">
        {seq.split('').map((char, i) => {
          const color = COLOR_MAP[char as BaseSymbol];
          return (
            <span
              key={i}
              className={`w-7 h-8 flex items-center justify-center rounded border ${
                color
                  ? `${color.bg} ${color.text} ${color.border}`
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* DNA Complement Box */}
      <Card
        title="DNA Complement (Replication)"
        subtitle="Template Strand &bull; Follows A-T and G-C rules"
        headerIcon={<Dna className="w-5 h-5 text-cyan-400" />}
        action={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => copy(isWordMode && dnaWordResult ? dnaWordResult : dnaComplement, 'dna')}
            icon={isCopied('dna') ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          >
            {isCopied('dna') ? 'Copied!' : 'Copy DNA'}
          </Button>
        }
      >
        <div className="space-y-4">
          {/* Comparison View */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
            <div>
              <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between mb-1">
                <span>INPUT DNA (5' &rarr; 3')</span>
              </div>
              {renderColoredSequence(originalSequence)}
            </div>

            <div className="flex items-center gap-2 text-slate-600 text-xs font-mono py-0.5">
              <span>&darr; &uarr;</span>
              <span className="text-[11px] text-slate-400 italic">Antiparallel Complementary Base Pairing</span>
            </div>

            <div>
              <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between mb-1">
                <span className="text-cyan-400 font-semibold">DNA COMPLEMENT (3' &rarr; 5')</span>
              </div>
              {renderColoredSequence(dnaComplement)}
            </div>
          </div>

          {/* Word Equivalent Result if available */}
          {dnaWordResult && (
            <div className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/80">
              <div className="text-[10px] uppercase font-mono text-slate-400 mb-0.5">Equivalent Words</div>
              <div className="text-sm font-bold text-cyan-300 font-mono">{dnaWordResult}</div>
            </div>
          )}

          {/* Quick Raw String & Rule badge */}
          <div className="flex items-center justify-between pt-1">
            <div className="text-xs text-slate-400 font-mono">
              Raw: <span className="text-slate-100 font-bold select-all">{dnaComplement}</span>
            </div>
            <Badge variant="cyan" size="sm">
              DNA Pairs: A-T, G-C
            </Badge>
          </div>
        </div>
      </Card>

      {/* RNA Transcript Box */}
      <Card
        title="RNA Transcript (Transcription)"
        subtitle="mRNA Strand &bull; Adenine pairs with Uracil (U)"
        headerIcon={<FileCode className="w-5 h-5 text-rose-400" />}
        action={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => copy(isWordMode && rnaWordResult ? rnaWordResult : rnaTranscript, 'rna')}
            icon={isCopied('rna') ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          >
            {isCopied('rna') ? 'Copied!' : 'Copy RNA'}
          </Button>
        }
      >
        <div className="space-y-4">
          {/* Comparison View */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
            <div>
              <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between mb-1">
                <span>INPUT DNA (5' &rarr; 3')</span>
              </div>
              {renderColoredSequence(originalSequence)}
            </div>

            <div className="flex items-center gap-2 text-slate-600 text-xs font-mono py-0.5">
              <span>&darr;</span>
              <span className="text-[11px] text-slate-400 italic">RNA Polymerase Transcription (A &rarr; U)</span>
            </div>

            <div>
              <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between mb-1">
                <span className="text-rose-400 font-semibold">RNA TRANSCRIPT (mRNA)</span>
              </div>
              {renderColoredSequence(rnaTranscript)}
            </div>
          </div>

          {/* Word Equivalent Result if available */}
          {rnaWordResult && (
            <div className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/80">
              <div className="text-[10px] uppercase font-mono text-slate-400 mb-0.5">Equivalent Words</div>
              <div className="text-sm font-bold text-rose-300 font-mono">{rnaWordResult}</div>
            </div>
          )}

          {/* Quick Raw String & Rule badge */}
          <div className="flex items-center justify-between pt-1">
            <div className="text-xs text-slate-400 font-mono">
              Raw: <span className="text-slate-100 font-bold select-all">{rnaTranscript}</span>
            </div>
            <Badge variant="rose" size="sm">
              RNA Pairs: A-U, G-C
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};

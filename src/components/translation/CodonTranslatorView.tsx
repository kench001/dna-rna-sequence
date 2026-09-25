import { Fragment } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useClipboard } from '../../hooks/useClipboard';
import type { CodonTranslationItem } from '../../types/biology';
import { Sparkles, Copy, Check, Info, AlertTriangle } from 'lucide-react';

interface CodonTranslatorViewProps {
  codons: CodonTranslationItem[];
  polypeptideChain: string;
  hasStartCodon: boolean;
  hasStopCodon: boolean;
  warning?: string;
}

export const CodonTranslatorView: React.FC<CodonTranslatorViewProps> = ({
  codons,
  polypeptideChain,
  hasStartCodon,
  hasStopCodon,
  warning,
}) => {
  const { copy, isCopied } = useClipboard();

  return (
    <div className="space-y-6">
      <Card
        title="RNA Codon &rarr; Amino Acid Polypeptide Translator"
        subtitle="Translate triplets into the protein building blocks of life"
        headerIcon={<Sparkles className="w-5 h-5 text-indigo-400" />}
        action={
          polypeptideChain ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copy(polypeptideChain, 'peptide')}
              icon={isCopied('peptide') ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {isCopied('peptide') ? 'Copied Peptide!' : 'Copy Chain'}
            </Button>
          ) : undefined
        }
      >
        <div className="space-y-6">
          {/* Status Indicators */}
          <div className="flex flex-wrap items-center gap-3">
            {hasStartCodon ? (
              <Badge variant="emerald" size="md">
                &check; Start Codon (AUG / Met) Present
              </Badge>
            ) : (
              <Badge variant="slate" size="md">
                No Start Codon (AUG) found at beginning
              </Badge>
            )}

            {hasStopCodon && (
              <Badge variant="rose" size="md">
                &bull; Stop Codon Present
              </Badge>
            )}

            <div className="text-xs text-slate-400 ml-auto">
              Total Codons: <strong className="text-white">{codons.length}</strong> ({codons.length * 3} bases)
            </div>
          </div>

          {/* Warning notice if not multiple of 3 */}
          {warning && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-2.5 text-xs text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{warning}</span>
            </div>
          )}

          {/* Visual Peptide Bead Chain */}
          {codons.length > 0 ? (
            <div>
              <div className="text-xs font-semibold text-slate-300 mb-3 flex items-center justify-between">
                <span>POLYPEPTIDE PEPTIDE CHAIN</span>
                <span className="text-[11px] text-slate-400">N-terminus &rarr; C-terminus</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 p-4 bg-slate-950/70 rounded-2xl border border-slate-800">
                {codons.map((item, index) => (
                  <Fragment key={index}>
                    {/* Amino Acid Bead */}
                    <div
                      className={`flex flex-col items-center p-3 rounded-xl border ${item.aminoAcid.color} min-w-[85px] transition-all hover:scale-105 shadow-md`}
                    >
                      <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                        #{index + 1}
                      </span>
                      <span className="font-mono text-xs font-black tracking-widest text-slate-300 my-0.5">
                        {item.codon}
                      </span>
                      <span className="text-sm font-bold">{item.aminoAcid.threeLetter}</span>
                      <span className="text-[9px] opacity-80 mt-0.5 truncate max-w-[80px]">
                        {item.aminoAcid.property}
                      </span>
                    </div>

                    {/* Peptide Bond Line */}
                    {index < codons.length - 1 && (
                      <div className="h-0.5 w-3 bg-slate-700 rounded-full" title="Peptide Bond (-CO-NH-)" />
                    )}
                  </Fragment>
                ))}
              </div>

              {/* Formatted Chain String */}
              <div className="mt-4 p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between">
                <div>
                  <span className="text-slate-500">Chain: </span>
                  <span className="text-indigo-300 font-semibold">{polypeptideChain}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 bg-slate-950/40 rounded-xl border border-dashed border-slate-800">
              <Info className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm">Enter at least 3 bases (e.g. <span className="font-mono text-indigo-400">AUGGCCUAA</span>) to translate into amino acids.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

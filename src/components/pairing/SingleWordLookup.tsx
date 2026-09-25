import type { DetectedWordItem } from '../../types/biology';
import { BASE_METADATA_RECORD, COLOR_MAP } from '../../constants/basePairs';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { ArrowRight, Link2, Sparkles, BookOpen } from 'lucide-react';

interface SingleWordLookupProps {
  words: DetectedWordItem[];
}

export const SingleWordLookup: React.FC<SingleWordLookupProps> = ({ words }) => {
  if (words.length === 0) return null;

  // Single Word View
  if (words.length === 1) {
    const item = words[0];
    const inputMeta = BASE_METADATA_RECORD[item.symbol];
    const dnaMeta = BASE_METADATA_RECORD[item.dnaSymbol];
    const rnaMeta = BASE_METADATA_RECORD[item.rnaSymbol];

    const inColor = COLOR_MAP[item.symbol];
    const dnaColor = COLOR_MAP[item.dnaSymbol];
    const rnaColor = COLOR_MAP[item.rnaSymbol];

    return (
      <Card
        title="Base Pair Matcher"
        subtitle="Direct complementary base match"
        headerIcon={<Sparkles className="w-5 h-5 text-indigo-400" />}
        className="border-indigo-500/30 bg-gradient-to-b from-indigo-950/20 to-slate-900/80"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Input Base Card */}
          <div className={`p-5 rounded-2xl border ${inColor.border} ${inColor.bg} text-center space-y-3`}>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Input Base</div>
            <div className={`text-5xl font-black font-mono ${inColor.text}`}>{item.symbol}</div>
            <div className="text-xl font-bold text-white">{item.inputName}</div>
            <div className="pt-2 flex flex-col items-center gap-1.5">
              <Badge variant="slate" size="sm">
                {inputMeta?.category}
              </Badge>
            </div>
          </div>

          {/* Central Connecting Hub */}
          <div className="flex flex-col items-center justify-center space-y-4 text-center py-2">
            <div className="flex items-center gap-2 text-indigo-400">
              <div className="h-[1px] w-8 bg-indigo-500/40"></div>
              <Link2 className="w-5 h-5" />
              <div className="h-[1px] w-8 bg-indigo-500/40"></div>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80 w-full max-w-xs">
              <div className="text-xs text-slate-400 font-medium mb-1">Hydrogen Bonding</div>
              <div className="text-base font-bold text-amber-300">
                {item.hBonds === 2 ? '2 Hydrogen Bonds (═)' : '3 Hydrogen Bonds (≡)'}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {item.symbol === 'A' || item.symbol === 'T' || item.symbol === 'U'
                  ? 'A pairs with T / U via 2 hydrogen bonds'
                  : 'G pairs with C via 3 hydrogen bonds (stronger)'}
              </div>
            </div>

            <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <span>Pairs with:</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
            </div>
          </div>

          {/* Complements Result Cards (DNA and RNA) */}
          <div className="space-y-4">
            {/* DNA Pair */}
            <div className={`p-4 rounded-xl border ${dnaColor.border} ${dnaColor.bg} flex items-center justify-between`}>
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">DNA Complement</div>
                <div className="text-lg font-bold text-white">{item.dnaPair}</div>
                <div className="text-xs text-slate-400">{dnaMeta?.category}</div>
              </div>
              <div className={`text-3xl font-black font-mono px-3 py-1 rounded-lg ${dnaColor.text} bg-slate-900/60 border ${dnaColor.border}`}>
                {item.dnaSymbol}
              </div>
            </div>

            {/* RNA Pair */}
            <div className={`p-4 rounded-xl border ${rnaColor.border} ${rnaColor.bg} flex items-center justify-between`}>
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">RNA Transcript</div>
                <div className="text-lg font-bold text-white">{item.rnaPair}</div>
                <div className="text-xs text-slate-400">{rnaMeta?.category}</div>
              </div>
              <div className={`text-3xl font-black font-mono px-3 py-1 rounded-lg ${rnaColor.text} bg-slate-900/60 border ${rnaColor.border}`}>
                {item.rnaSymbol}
              </div>
            </div>
          </div>
        </div>

        {/* High School Biology Explanation Box */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-indigo-300">Why this happens: </strong>
            {item.explanation} {inputMeta?.funFact}
          </div>
        </div>
      </Card>
    );
  }

  // Multi-Word View (e.g. CYTOSINE ADENINE)
  return (
    <Card
      title={`Base Word Matcher (${words.length} Words Inputted)`}
      subtitle="Each recognized word is matched with its equivalent complementary base"
      headerIcon={<Sparkles className="w-5 h-5 text-indigo-400" />}
      className="border-indigo-500/30 bg-gradient-to-b from-indigo-950/20 to-slate-900/80"
    >
      <div className="space-y-4">
        {/* Full Word Equivalent Banner */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>INPUT BASE WORDS:</span>
            <span className="text-white font-bold">{words.map((w) => w.inputName).join(' + ')}</span>
          </div>
          <div className="text-xs font-mono text-cyan-400 flex items-center justify-between">
            <span>EQUIVALENT DNA WORDS:</span>
            <span className="font-bold">{words.map((w) => w.dnaPair).join(' + ')}</span>
          </div>
          <div className="text-xs font-mono text-rose-400 flex items-center justify-between">
            <span>EQUIVALENT RNA WORDS:</span>
            <span className="font-bold">{words.map((w) => w.rnaPair).join(' + ')}</span>
          </div>
        </div>

        {/* Word-by-Word Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {words.map((item, idx) => {
            const inColor = COLOR_MAP[item.symbol];
            const dnaColor = COLOR_MAP[item.dnaSymbol];
            const rnaColor = COLOR_MAP[item.rnaSymbol];

            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-3"
              >
                {/* Word header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">Word #{idx + 1}</span>
                  <Badge variant="amber" size="sm">
                    {item.hBonds} H-Bonds
                  </Badge>
                </div>

                {/* Input word */}
                <div className={`p-2.5 rounded-lg border ${inColor.border} ${inColor.bg} flex items-center justify-between`}>
                  <div>
                    <div className="text-[10px] uppercase text-slate-400">Input</div>
                    <div className="text-base font-bold text-white">{item.inputName}</div>
                  </div>
                  <div className={`text-xl font-black font-mono px-2 py-0.5 rounded ${inColor.text} bg-slate-900/60`}>
                    {item.symbol}
                  </div>
                </div>

                <div className="flex items-center justify-center text-xs text-slate-500 font-mono">
                  &darr; pairs with
                </div>

                {/* DNA pair */}
                <div className={`p-2.5 rounded-lg border ${dnaColor.border} ${dnaColor.bg} flex items-center justify-between`}>
                  <div>
                    <div className="text-[10px] uppercase text-cyan-400 font-semibold">DNA Complement</div>
                    <div className="text-sm font-bold text-white">{item.dnaPair}</div>
                  </div>
                  <div className={`text-lg font-black font-mono px-2 py-0.5 rounded ${dnaColor.text} bg-slate-900/60`}>
                    {item.dnaSymbol}
                  </div>
                </div>

                {/* RNA pair */}
                <div className={`p-2.5 rounded-lg border ${rnaColor.border} ${rnaColor.bg} flex items-center justify-between`}>
                  <div>
                    <div className="text-[10px] uppercase text-rose-400 font-semibold">RNA Transcript</div>
                    <div className="text-sm font-bold text-white">{item.rnaPair}</div>
                  </div>
                  <div className={`text-lg font-black font-mono px-2 py-0.5 rounded ${rnaColor.text} bg-slate-900/60`}>
                    {item.rnaSymbol}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

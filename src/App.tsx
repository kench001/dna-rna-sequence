import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { TabGroup } from './components/common/TabGroup';
import { SequenceInput } from './components/pairing/SequenceInput';
import { SingleWordLookup } from './components/pairing/SingleWordLookup';
import { SequenceResultBox } from './components/pairing/SequenceResultBox';
import { CodonTranslatorView } from './components/translation/CodonTranslatorView';
import { CodonReferenceTable } from './components/translation/CodonReferenceTable';
import { useBioConverter } from './hooks/useBioConverter';
import { Dna, ArrowDown } from 'lucide-react';

export function App() {
  const {
    input,
    setInput,
    activeTab,
    setActiveTab,
    analysis,
    translation,
    handleClear,
    handlePresetSelect,
  } = useBioConverter('AGCTAGC');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-medium mb-1">
            <Dna className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Interactive Molecular Biology Tool</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
            DNA & RNA Complementary Base Matcher
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Enter a base name (like <span className="text-emerald-400 font-semibold font-mono">Adenine</span>)
            or a genetic sequence (like <span className="text-indigo-400 font-semibold font-mono">AGCTAGC</span>)
            to instantly see its equivalent complementary pair for DNA replication and RNA transcription.
          </p>
        </div>

        {/* Tab Switcher */}
        <TabGroup activeTab={activeTab} onChange={setActiveTab} />

        {/* TAB 1: Base & Sequence Pairing */}
        {activeTab === 'pairing' && (
          <div className="space-y-6">
            {/* Input Section */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-md">
              <SequenceInput
                value={input}
                onChange={setInput}
                onClear={handleClear}
                onSelectPreset={handlePresetSelect}
                isWordMode={analysis.isWordMode}
                isSingleWord={analysis.isSingleWord}
                length={analysis.length}
                gcContentPercent={analysis.gcContentPercent}
                invalidCharacters={analysis.invalidCharacters}
                invalidWords={analysis.invalidWords}
              />
            </div>

            {/* Word Spotlight: Supports both Single Word and Multiple Words (e.g. CYTOSINE ADENINE) */}
            {analysis.isWordMode && analysis.detectedWords.length > 0 && (
              <SingleWordLookup words={analysis.detectedWords} />
            )}

            {/* Sequence Results (DNA: TCGATCG, RNA: UCGAUCG) */}
            {analysis.cleanedSequence && (
              <SequenceResultBox
                originalSequence={analysis.cleanedSequence}
                dnaComplement={analysis.dnaComplement}
                rnaTranscript={analysis.rnaTranscript}
                dnaWordResult={analysis.dnaWordResult}
                rnaWordResult={analysis.rnaWordResult}
                isWordMode={analysis.isWordMode}
              />
            )}




          </div>
        )}

        {/* TAB 2: Codon to Amino Acid Translation */}
        {activeTab === 'translation' && (
          <div className="space-y-6">
            {/* Sequence Input Reuse */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-md">
              <div className="text-xs text-indigo-400 font-semibold mb-3 flex items-center gap-1.5">
                <ArrowDown className="w-3.5 h-3.5" />
                <span>Sequence to Translate (mRNA Triplets)</span>
              </div>
              <SequenceInput
                value={input}
                onChange={setInput}
                onClear={handleClear}
                onSelectPreset={handlePresetSelect}
                isWordMode={false}
                isSingleWord={false}
                length={analysis.length}
                gcContentPercent={analysis.gcContentPercent}
                invalidCharacters={analysis.invalidCharacters}
                invalidWords={[]}
              />
            </div>

            {/* Translation Bead Chain */}
            <CodonTranslatorView
              codons={translation.codons}
              polypeptideChain={translation.polypeptideChain}
              hasStartCodon={translation.hasStartCodon}
              hasStopCodon={translation.hasStopCodon}
              warning={translation.warning}
            />

            {/* Searchable 64-Codon Genetic Code Table */}
            <CodonReferenceTable />
          </div>
        )}


      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

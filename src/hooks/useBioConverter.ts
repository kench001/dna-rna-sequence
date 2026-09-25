import { useState, useMemo } from 'react';
import { analyzeSequenceInput } from '../utils/complement';
import { translateSequence } from '../utils/translator';
import type { ActiveTab, PairingTargetMode } from '../types/navigation';
import type { SamplePreset } from '../constants/sampleSequences';

export function useBioConverter(initialInput: string = 'AGCTAGC') {
  const [input, setInput] = useState<string>(initialInput);
  const [activeTab, setActiveTab] = useState<ActiveTab>('pairing');
  const [pairingTarget, setPairingTarget] = useState<PairingTargetMode>('both');

  // Compute complementary sequence analysis
  const analysis = useMemo(() => {
    return analyzeSequenceInput(input);
  }, [input]);

  // Compute codon translation
  const translation = useMemo(() => {
    return translateSequence(input);
  }, [input]);

  const handleClear = () => {
    setInput('');
  };

  const handlePresetSelect = (preset: SamplePreset) => {
    setInput(preset.value);
    if (preset.type === 'codon') {
      setActiveTab('translation');
    }
  };

  return {
    input,
    setInput,
    activeTab,
    setActiveTab,
    pairingTarget,
    setPairingTarget,
    analysis,
    translation,
    handleClear,
    handlePresetSelect,
  };
}

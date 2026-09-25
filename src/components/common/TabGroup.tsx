import React from 'react';
import type { ActiveTab } from '../../types/navigation';
import { Dna, Sparkles } from 'lucide-react';

interface TabGroupProps {
  activeTab: ActiveTab;
  onChange: (tab: ActiveTab) => void;
}

export const TabGroup: React.FC<TabGroupProps> = ({ activeTab, onChange }) => {
  const tabs = [
    {
      id: 'pairing' as ActiveTab,
      label: 'DNA & RNA Base Pairing',
      description: 'Single words & sequences',
      icon: <Dna className="w-4 h-4" />,
    },
    {
      id: 'translation' as ActiveTab,
      label: 'Codon Translator',
      description: 'RNA to Amino Acids',
      icon: <Sparkles className="w-4 h-4" />,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl w-fit mx-auto shadow-inner">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              isActive
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span className={isActive ? 'text-white' : 'text-indigo-400'}>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

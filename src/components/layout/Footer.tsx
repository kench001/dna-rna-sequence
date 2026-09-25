import React from 'react';
import { Dna } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/80 py-8 mt-16 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Dna className="w-4 h-4 text-indigo-400" />
          <span>BioPair &bull; High School Biology Sequence Explorer</span>
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          <span>Designed with simplicity & senior clean architecture</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <span>Chargaff's Rules Compliant</span>
          <span>&bull;</span>
          <span>Central Dogma of Molecular Biology</span>
        </div>
      </div>
    </footer>
  );
};

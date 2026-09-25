import React from 'react';
import { Dna, BookOpenCheck } from 'lucide-react';
import { Badge } from '../common/Badge';

export const Navbar: React.FC = () => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Dna className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                BioPair
              </span>
              <Badge variant="indigo" size="sm">
                Kate Juslyn Loyola
              </Badge>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              DNA Replication &bull; RNA Transcription &bull; Amino Acid Translation
            </p>
          </div>
        </div>

        {/* Quick Reference Pill */}
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
          <BookOpenCheck className="w-4 h-4 text-emerald-400" />
          <span className="hidden md:inline font-mono">DNA: A-T &bull; G-C | RNA: A-U &bull; G-C</span>
          <span className="md:hidden font-mono">A-T / A-U &bull; G-C</span>
        </div>
      </div>
    </header>
  );
};

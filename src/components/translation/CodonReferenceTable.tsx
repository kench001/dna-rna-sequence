import { useState, useMemo } from 'react';
import { Card } from '../common/Card';
import { GENETIC_CODE_TABLE, AMINO_ACID_DEFINITIONS } from '../../constants/geneticCode';
import { Search, BookMarked, Filter } from 'lucide-react';

export const CodonReferenceTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyFilter, setPropertyFilter] = useState<string>('All');

  const allCodonEntries = useMemo(() => {
    return Object.entries(GENETIC_CODE_TABLE).map(([codon, aaKey]) => {
      const aa = AMINO_ACID_DEFINITIONS[aaKey] || {
        name: aaKey,
        threeLetter: aaKey,
        oneLetter: '?',
        property: 'Nonpolar',
        color: 'bg-slate-800 text-slate-300 border-slate-700',
        description: '',
      };
      return {
        codon,
        aaKey,
        aa,
      };
    });
  }, []);

  const filteredEntries = useMemo(() => {
    return allCodonEntries.filter((entry) => {
      const matchesSearch =
        entry.codon.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.aa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.aa.threeLetter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.aa.oneLetter.toLowerCase() === searchTerm.toLowerCase();

      const matchesProperty =
        propertyFilter === 'All' ||
        (propertyFilter === 'Start / Stop' && (entry.aa.isStart || entry.aa.isStop)) ||
        entry.aa.property === propertyFilter;

      return matchesSearch && matchesProperty;
    });
  }, [allCodonEntries, searchTerm, propertyFilter]);

  const properties = ['All', 'Start / Stop', 'Nonpolar', 'Polar', 'Acidic', 'Basic'];

  return (
    <Card
      title="Standard Genetic Code Reference (64 Codons)"
      subtitle="Interactive high school chart mapping mRNA codons to amino acids"
      headerIcon={<BookMarked className="w-5 h-5 text-indigo-400" />}
    >
      <div className="space-y-4">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search codon (e.g. AUG) or amino acid..."
              className="w-full bg-slate-950 border border-slate-850 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
            {properties.map((prop) => (
              <button
                key={prop}
                onClick={() => setPropertyFilter(prop)}
                className={`text-xs px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  propertyFilter === prop
                    ? 'bg-indigo-600 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
                }`}
              >
                {prop}
              </button>
            ))}
          </div>
        </div>

        {/* Codons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 max-h-96 overflow-y-auto pr-1">
          {filteredEntries.map((item) => (
            <div
              key={item.codon}
              className={`p-2.5 rounded-xl border text-center transition-all hover:scale-105 ${item.aa.color} bg-slate-950/40`}
            >
              <div className="font-mono text-sm font-black tracking-wider text-white">
                {item.codon}
              </div>
              <div className="text-xs font-semibold mt-0.5 truncate">{item.aa.threeLetter}</div>
              <div className="text-[10px] opacity-75 truncate">{item.aa.name}</div>
            </div>
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center py-6 text-xs text-slate-400">
            No codons match "{searchTerm}". Try "AUG", "UAA", "Leucine", or "Phe".
          </div>
        )}

        <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <span>Showing {filteredEntries.length} of 64 mRNA codons</span>
          <span>Universal Genetic Code &bull; Central Dogma of Molecular Biology</span>
        </div>
      </div>
    </Card>
  );
};

import React, { useState } from 'react';
import { PaperComparisonEntry, DocumentMetadata } from '../../types';
import { Columns3, Sparkles, Check, RefreshCw, Layers } from 'lucide-react';

interface PaperComparisonPageProps {
  comparisonData: PaperComparisonEntry[];
  documents: DocumentMetadata[];
  onGenerateComparison: (paperIds: string[]) => Promise<void>;
  isLoading: boolean;
}

export const PaperComparisonPage: React.FC<PaperComparisonPageProps> = ({
  comparisonData,
  documents,
  onGenerateComparison,
  isLoading
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    documents.slice(0, 3).map(d => d.id)
  );

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter(i => i !== id));
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const handleRunComparison = async () => {
    await onGenerateComparison(selectedIds);
  };

  const displayedEntries = comparisonData.filter(e =>
    selectedIds.includes(e.documentId) || selectedIds.length === 0
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display flex items-center gap-2.5">
            <Columns3 className="w-6 h-6 text-indigo-400" />
            <span>Paper Comparison Matrix</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Side-by-side cross-document evaluation comparing datasets, methodologies, key findings, limitations, and future work.
          </p>
        </div>

        <button
          onClick={handleRunComparison}
          disabled={isLoading || selectedIds.length === 0}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
        >
          {isLoading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span>Synthesize Comparison Matrix</span>
        </button>
      </div>

      {/* Select Papers Drawer */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Select Papers to Compare (2 to 4 Selected):
        </span>
        <div className="flex flex-wrap gap-2">
          {documents.map((doc) => {
            const isSelected = selectedIds.includes(doc.id);
            return (
              <button
                key={doc.id}
                onClick={() => toggleSelect(doc.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                  isSelected ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700'
                }`}>
                  {isSelected && <Check className="w-2.5 h-2.5" />}
                </div>
                <span>{doc.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px] text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-300">
                <th className="p-4 w-40 font-bold uppercase text-[10px] tracking-wider text-indigo-400">
                  Evaluation Dimension
                </th>
                {displayedEntries.map((entry, idx) => (
                  <th key={idx} className="p-4 font-bold text-white border-l border-slate-800/80">
                    <div className="space-y-0.5">
                      <span className="block text-sm font-display text-indigo-300">{entry.documentName}</span>
                      <span className="block text-[10px] text-slate-400 font-mono">{entry.authorYear}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {/* Datasets */}
              <tr className="hover:bg-slate-900/40">
                <td className="p-4 font-bold text-slate-200 bg-slate-950/60">
                  Datasets Used
                </td>
                {displayedEntries.map((entry, idx) => (
                  <td key={idx} className="p-4 border-l border-slate-800/60 leading-relaxed">
                    {entry.datasetUsed}
                  </td>
                ))}
              </tr>

              {/* Methodology */}
              <tr className="hover:bg-slate-900/40">
                <td className="p-4 font-bold text-slate-200 bg-slate-950/60">
                  Methodology & Architecture
                </td>
                {displayedEntries.map((entry, idx) => (
                  <td key={idx} className="p-4 border-l border-slate-800/60 leading-relaxed">
                    {entry.methodology}
                  </td>
                ))}
              </tr>

              {/* Key Findings */}
              <tr className="hover:bg-slate-900/40">
                <td className="p-4 font-bold text-slate-200 bg-slate-950/60">
                  Key Findings & Metrics
                </td>
                {displayedEntries.map((entry, idx) => (
                  <td key={idx} className="p-4 border-l border-slate-800/60 leading-relaxed text-emerald-300 font-medium">
                    {entry.keyFindings}
                  </td>
                ))}
              </tr>

              {/* Limitations */}
              <tr className="hover:bg-slate-900/40">
                <td className="p-4 font-bold text-slate-200 bg-slate-950/60">
                  Limitations & Constraints
                </td>
                {displayedEntries.map((entry, idx) => (
                  <td key={idx} className="p-4 border-l border-slate-800/60 leading-relaxed text-amber-300/90">
                    {entry.limitations}
                  </td>
                ))}
              </tr>

              {/* Future Work */}
              <tr className="hover:bg-slate-900/40">
                <td className="p-4 font-bold text-slate-200 bg-slate-950/60">
                  Future Directions
                </td>
                {displayedEntries.map((entry, idx) => (
                  <td key={idx} className="p-4 border-l border-slate-800/60 leading-relaxed text-indigo-300">
                    {entry.futureWork}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Citation, DocumentMetadata } from '../../types';
import { Search, Quote, Filter, CheckCircle2, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';

interface EvidenceExplorerProps {
  citations: Citation[];
  documents: DocumentMetadata[];
}

export const EvidenceExplorer: React.FC<EvidenceExplorerProps> = ({ citations, documents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minScore, setMinScore] = useState<number>(80);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = citations.filter(c =>
    (c.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     c.snippet.toLowerCase().includes(searchTerm.toLowerCase())) &&
    c.relevanceScore >= minScore
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display flex items-center gap-2">
            <Search className="w-6 h-6 text-indigo-400" />
            <span>Evidence Explorer</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ranked FAISS vector passages, cosine similarity scores, and verified source snippets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
            {filtered.length} Passages Matched
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search passage content or document name..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0 text-xs text-slate-300 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-indigo-400" />
          <span>Min Cosine Similarity:</span>
          <select
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="bg-slate-950 border border-slate-800 text-white rounded-lg px-2 py-1 text-xs focus:outline-none"
          >
            <option value={70}>&gt; 70% Match</option>
            <option value={80}>&gt; 80% Match</option>
            <option value={90}>&gt; 90% Match</option>
            <option value={95}>&gt; 95% Match</option>
          </select>
        </div>
      </div>

      {/* Evidence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-2 p-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-500 text-xs">
            No evidence passages match your current filter settings.
          </div>
        ) : (
          filtered.map((cit, idx) => (
            <div
              key={cit.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/30 transition-all space-y-4 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-xs flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <span className="font-bold text-white text-xs truncate max-w-[200px]">{cit.documentName}</span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold font-mono">
                    {cit.relevanceScore}% Similarity
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-200 italic leading-relaxed">
                  "{cit.snippet}"
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-slate-400">
                  <Quote className="w-3 h-3 text-indigo-400" />
                  <span>Page {cit.pageNumber}</span>
                  <span>•</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Anchor
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(cit.snippet, cit.id)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium flex items-center gap-1 transition-colors"
                >
                  {copiedId === cit.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

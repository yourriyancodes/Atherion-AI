import React from 'react';
import { Bot, Search, Quote, Columns3, FileSpreadsheet, Database } from 'lucide-react';
import { ThemeMode } from '../../types';

interface FeatureGridProps {
  theme?: ThemeMode;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  const features = [
    {
      icon: Bot,
      title: '7-Agent Orchestration',
      description: 'Collaborative pipeline featuring Planner, Retriever, Reflection, Citation, Gap, Timeline, and Report agents.',
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10'
    },
    {
      icon: Search,
      title: 'FAISS Hybrid Retrieval',
      description: 'Combines dense semantic vector embeddings (all-MiniLM-L6-v2) with exact BM25 keyword matching.',
      color: 'text-violet-500',
      bg: 'bg-violet-500/10'
    },
    {
      icon: Quote,
      title: '100% Grounded Citations',
      description: 'Every generated claim is mapped directly to exact document snippets, section headers, and page numbers.',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    {
      icon: Database,
      title: 'Research Gap Discovery',
      description: 'Scans paper collections for unaddressed questions, missing baselines, and novel hypothesis opportunities.',
      color: 'text-amber-500',
      bg: 'bg-amber-500/10'
    },
    {
      icon: Columns3,
      title: 'Paper Comparison Matrix',
      description: 'Generates structured side-by-side matrices evaluating datasets, methodologies, findings, and limitations.',
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10'
    },
    {
      icon: FileSpreadsheet,
      title: 'Executive Report Synthesis',
      description: 'Compiles structured literature reviews with interactive Markdown previews and downloadable IEEE PDF reports.',
      color: 'text-rose-500',
      bg: 'bg-rose-500/10'
    }
  ];

  return (
    <section id="features" className={`py-20 border-t relative transition-colors duration-200 ${
      isDark ? 'border-white/5 bg-[#0A0A0B]' : 'border-slate-200 bg-slate-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-500">
            Platform Capabilities
          </h2>
          <p className={`text-3xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Designed for Rigorous Research Workflows
          </p>
          <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
            Atherion replaces standard ungrounded AI chat with deterministic multi-agent retrieval and citation enforcement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all duration-200 group ${
                  isDark
                    ? 'bg-[#0F0F10] border-white/5 hover:border-indigo-500/40 hover:bg-[#141415]'
                    : 'bg-white border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl ${feat.bg} ${feat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {feat.title}
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

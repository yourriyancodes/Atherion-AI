import React, { useState } from 'react';
import { Compass, Search, ShieldCheck, Quote, Sparkles, GitBranch, FileText, CheckCircle2 } from 'lucide-react';
import { ThemeMode } from '../../types';

interface AgentArchitectureProps {
  theme?: ThemeMode;
}

export const AgentArchitecture: React.FC<AgentArchitectureProps> = ({ theme = 'dark' }) => {
  const [selectedAgent, setSelectedAgent] = useState('planner');
  const isDark = theme === 'dark';

  const agents = [
    {
      id: 'planner',
      name: 'Planner Agent',
      icon: Compass,
      role: 'Query Deconstructor',
      desc: 'Parses complex multi-faceted research prompts into actionable sub-goals and task graphs.',
      output: 'Formulates 3-5 distinct search sub-queries to maximize coverage.'
    },
    {
      id: 'retriever',
      name: 'Retriever Agent',
      icon: Search,
      role: 'FAISS Vector Indexer',
      desc: 'Queries all-MiniLM-L6-v2 vector embeddings combined with BM25 keyword matching.',
      output: 'Fetches top candidate passages with cosine similarity > 0.80.'
    },
    {
      id: 'reflection',
      name: 'Reflection Agent',
      icon: ShieldCheck,
      role: 'Anti-Hallucination Audit',
      desc: 'Critiques retrieved context, evaluates logical consistency, and eliminates non-grounded claims.',
      output: 'Computes grounding score (target > 95% factual consistency).'
    },
    {
      id: 'citation',
      name: 'Citation Agent',
      icon: Quote,
      role: 'Page & Line Mapper',
      desc: 'Maps every output statement back to exact source documents, page numbers, and snippet IDs.',
      output: 'Inserts interactive citation anchors [1], [2], [3].'
    },
    {
      id: 'gap',
      name: 'Research Gap Agent',
      icon: Sparkles,
      role: 'Boundary Discovery',
      desc: 'Identifies unaddressed baseline controls, contradictory findings, and future work opportunities.',
      output: 'Generates structured gap cards with hypothesis recommendations.'
    },
    {
      id: 'timeline',
      name: 'Timeline Agent',
      icon: GitBranch,
      role: 'Chronological Sequencer',
      desc: 'Extracts historical progression of algorithmic breakthroughs across publication years.',
      output: 'Outputs chronological evolution timeline.'
    },
    {
      id: 'report',
      name: 'Report Agent',
      icon: FileText,
      role: 'Executive Synthesis',
      desc: 'Compiles formatted literature reviews into structured Markdown and printable IEEE format.',
      output: 'Produces downloadable IEEE PDF & executive reports.'
    }
  ];

  const current = agents.find(a => a.id === selectedAgent) || agents[0];

  return (
    <section id="architecture" className={`py-20 border-t relative transition-colors duration-200 ${
      isDark ? 'border-white/5 bg-[#0A0A0B]' : 'border-slate-200 bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-500">
            System Architecture
          </h2>
          <p className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            7 Autonomous AI Agents Working in Unison
          </p>
          <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
            Explore the specialized responsibilities inside Atherion's multi-agent execution pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Agent Selector Column */}
          <div className="lg:col-span-5 space-y-2">
            {agents.map((agent) => {
              const Icon = agent.icon;
              const isActive = selectedAgent === agent.id;
              return (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent.id)}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-200 ${
                    isActive
                      ? isDark
                        ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-md'
                        : 'bg-indigo-50 border-indigo-400 text-slate-900 shadow-xs'
                      : isDark
                        ? 'bg-[#0F0F10] border-white/5 hover:border-white/10 text-neutral-400 hover:text-neutral-200'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isActive ? 'bg-indigo-500 text-white' : isDark ? 'bg-white/5 text-neutral-400' : 'bg-slate-200 text-slate-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block">{agent.name}</span>
                      <span className={`text-[10px] ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>{agent.role}</span>
                    </div>
                  </div>
                  <CheckCircle2 className={`w-4 h-4 ${isActive ? 'text-indigo-500' : 'opacity-0'}`} />
                </button>
              );
            })}
          </div>

          {/* Active Agent Inspector Detail Card */}
          <div className="lg:col-span-7">
            <div className={`p-8 rounded-2xl border space-y-6 ${
              isDark ? 'bg-[#0F0F10] border-indigo-500/30' : 'bg-slate-50 border-indigo-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between pb-4 border-b border-indigo-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-500 border border-indigo-500/30 flex items-center justify-center font-bold">
                    {React.createElement(current.icon, { className: 'w-5 h-5' })}
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{current.name}</h3>
                    <span className="text-xs text-indigo-500 font-semibold">{current.role}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-semibold">
                  Active Agent
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${
                    isDark ? 'text-neutral-400' : 'text-slate-500'
                  }`}>
                    Core Responsibility
                  </span>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                    {current.desc}
                  </p>
                </div>

                <div className={`p-4 rounded-xl border space-y-1.5 ${
                  isDark ? 'bg-[#141415] border-white/5' : 'bg-white border-slate-200'
                }`}>
                  <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block">
                    Expected Agent Output
                  </span>
                  <p className={`text-xs font-mono ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    → {current.output}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

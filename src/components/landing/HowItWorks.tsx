import React from 'react';
import { Upload, Database, Bot, FileText } from 'lucide-react';
import { ThemeMode } from '../../types';

interface HowItWorksProps {
  theme?: ThemeMode;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  const steps = [
    {
      num: '01',
      title: 'Upload Research Papers',
      desc: 'Drag & drop PDFs, DOCX, TXT, or Markdown papers into Atherion’s secure workspace.',
      icon: Upload
    },
    {
      num: '02',
      title: 'Local FAISS Indexing',
      desc: 'Documents are chunked and converted into 384-dim dense embeddings using all-MiniLM-L6-v2.',
      icon: Database
    },
    {
      num: '03',
      title: 'Multi-Agent Reasoning',
      desc: 'Planner, Retriever, Reflection, Citation, and Gap agents collaborate to analyze sources.',
      icon: Bot
    },
    {
      num: '04',
      title: 'Export IEEE Reports',
      desc: 'Download publication-ready literature reviews, comparison matrices, and IEEE PDF reports.',
      icon: FileText
    }
  ];

  return (
    <section className={`py-20 border-t relative transition-colors duration-200 ${
      isDark ? 'border-white/5 bg-[#0A0A0B]' : 'border-slate-200 bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-500">
            Simple Workflow
          </h2>
          <p className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            How Atherion Operates in 4 Steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className={`p-6 rounded-2xl border space-y-4 relative group transition-all duration-200 ${
                isDark ? 'bg-[#0F0F10] border-white/5' : 'bg-slate-50 border-slate-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-500 font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-2xl font-black font-mono transition-colors ${
                    isDark ? 'text-neutral-700 group-hover:text-indigo-500/40' : 'text-slate-300 group-hover:text-indigo-400'
                  }`}>
                    {step.num}
                  </span>
                </div>
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{step.title}</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

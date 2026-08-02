import React from 'react';
import { ViewMode, ThemeMode } from '../../types';
import { Sparkles, ArrowRight, ShieldCheck, Compass, CheckCircle2, Quote } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (view: ViewMode) => void;
  theme?: ThemeMode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <section className={`relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden transition-colors duration-200 ${
      isDark ? 'bg-[#0A0A0B] text-neutral-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#4F46E5]/15 via-purple-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Glowing Badge */}
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium shadow-xs ${
            isDark
              ? 'bg-[#0F0F10] border-indigo-500/30 text-indigo-300'
              : 'bg-indigo-50 border-indigo-200 text-indigo-700'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
            <span>Atherion Multi-Agent v1.0 • Multi-Doc Intelligence Platform</span>
          </div>

          {/* Headline */}
          <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Research <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 bg-clip-text text-transparent">Beyond Search</span>.
          </h1>

          {/* Subtitle */}
          <p className={`text-lg sm:text-xl leading-relaxed font-normal ${
            isDark ? 'text-neutral-400' : 'text-slate-600'
          }`}>
            Atherion is an AI-powered multi-agent research intelligence platform that transforms raw PDFs and documents into grounded reasoning, citation-backed answers, contradiction detection, and executive research reports.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('workspace')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-xl hover:opacity-95 shadow-xl shadow-indigo-600/25 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Compass className="w-5 h-5" />
              <span>Launch Research Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('documents')}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium border rounded-xl transition-all duration-200 ${
                isDark
                  ? 'bg-[#0F0F10] hover:bg-white/5 border-white/5 text-neutral-300 hover:text-white'
                  : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs'
              }`}
            >
              <span>Upload Documents</span>
            </button>
          </div>

          {/* Value Props Pills */}
          <div className={`pt-6 flex flex-wrap items-center justify-center gap-6 text-xs ${
            isDark ? 'text-neutral-400' : 'text-slate-600'
          }`}>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Grounded Citations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-500" />
              <span>FAISS Hybrid Retrieval</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-500" />
              <span>7 Collaborative AI Agents</span>
            </div>
          </div>
        </div>

        {/* Product UI Mockup Frame */}
        <div className={`mt-14 max-w-5xl mx-auto rounded-2xl border shadow-2xl p-2 sm:p-4 backdrop-blur-xl ${
          isDark ? 'bg-[#0F0F10] border-white/10' : 'bg-white border-slate-200 shadow-slate-200/50'
        }`}>
          <div className={`rounded-xl border overflow-hidden ${
            isDark ? 'bg-[#0A0A0B] border-white/5' : 'bg-slate-50 border-slate-200'
          }`}>
            {/* Top Bar Mock */}
            <div className={`h-10 px-4 border-b flex items-center justify-between ${
              isDark ? 'bg-[#141415] border-white/5' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className={`text-xs font-mono ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>
                atherion.ai/app/workspace
              </span>
              <span className="text-[10px] font-medium text-emerald-600 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                Grounding Active
              </span>
            </div>

            {/* Mock Dashboard Grid Preview */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
              {/* Left Column: Multi-Agent Execution Status */}
              <div className="space-y-4">
                <div className={`text-xs font-bold uppercase tracking-wider flex items-center justify-between ${
                  isDark ? 'text-neutral-300' : 'text-slate-700'
                }`}>
                  <span>Multi-Agent Task Graph</span>
                  <span className="text-[10px] text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">4 Active</span>
                </div>

                <div className="space-y-2.5">
                  <div className={`p-3 rounded-xl border flex items-center gap-3 ${
                    isDark ? 'bg-[#0F0F10] border-indigo-500/30' : 'bg-white border-indigo-200 shadow-xs'
                  }`}>
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-500 flex items-center justify-center font-bold text-xs">P</div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-semibold ${isDark ? 'text-neutral-200' : 'text-slate-800'}`}>Planner Agent</div>
                      <div className={`text-[11px] truncate ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Sub-queries formulated</div>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-mono">140ms</span>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-center gap-3 ${
                    isDark ? 'bg-[#0F0F10] border-white/5' : 'bg-white border-slate-200 shadow-xs'
                  }`}>
                    <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-500 flex items-center justify-center font-bold text-xs">R</div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-semibold ${isDark ? 'text-neutral-200' : 'text-slate-800'}`}>Retriever Agent</div>
                      <div className={`text-[11px] truncate ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>FAISS Hybrid Search (8 chunks)</div>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-mono">85ms</span>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-center gap-3 ${
                    isDark ? 'bg-[#0F0F10] border-white/5' : 'bg-white border-slate-200 shadow-xs'
                  }`}>
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold text-xs">C</div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-semibold ${isDark ? 'text-neutral-200' : 'text-slate-800'}`}>Citation Agent</div>
                      <div className={`text-[11px] truncate ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Source page mapping complete</div>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-mono">95ms</span>
                  </div>
                </div>
              </div>

              {/* Center Column: Grounded Answer Sample */}
              <div className="lg:col-span-2 space-y-4">
                <div className={`p-4 rounded-xl border space-y-3 ${
                  isDark ? 'bg-[#0F0F10] border-white/5' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className={`flex items-center justify-between text-xs border-b pb-2 ${
                    isDark ? 'text-neutral-400 border-white/5' : 'text-slate-500 border-slate-200'
                  }`}>
                    <span className="font-semibold text-indigo-500">Grounded Synthesis Response</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-medium text-[11px] border border-emerald-500/20">
                      96.4% Verified
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                    LoRA fine-tuning reduces trainable parameters by <strong className="text-indigo-500">10,000x</strong> while preserving full precision representation <span className="text-indigo-500 font-semibold cursor-pointer">[1]</span>. When paired with RAG non-parametric retrieval memory <span className="text-indigo-500 font-semibold cursor-pointer">[2]</span>, multi-agent reflection loops decrease hallucination frequency by 41.2% <span className="text-indigo-500 font-semibold cursor-pointer">[3]</span>.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                    <span className={`px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                      isDark ? 'bg-[#141415] border-white/5 text-neutral-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}>
                      <Quote className="w-3 h-3 text-indigo-500" />
                      LoRA_Low_Rank_Adaptation.docx (p.4)
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                      isDark ? 'bg-[#141415] border-white/5 text-neutral-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}>
                      <Quote className="w-3 h-3 text-purple-500" />
                      Retrieval_Augmented_Gen.pdf (p.2)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

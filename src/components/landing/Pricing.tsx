import React from 'react';
import { ViewMode, ThemeMode } from '../../types';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

interface PricingProps {
  onNavigate: (view: ViewMode) => void;
  theme?: ThemeMode;
}

export const Pricing: React.FC<PricingProps> = ({ onNavigate, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  const plans = [
    {
      name: 'Academic Free',
      price: '$0',
      period: 'forever free',
      desc: 'Ideal for students & individual researchers getting started.',
      features: [
        'Up to 10 document uploads',
        'Standard FAISS Vector Indexing',
        '3 Active Agents (Planner, Retriever, Citation)',
        'Basic Q&A with direct page citations',
        'Export Markdown literature reviews'
      ],
      popular: false,
      cta: 'Get Started Free'
    },
    {
      name: 'Researcher Pro',
      price: '$29',
      period: 'per month',
      desc: 'For professional researchers, PhD candidates, & technical authors.',
      features: [
        'Unlimited document uploads & storage',
        'All 7 Agents (Reflection, Gap, Timeline, Report)',
        'FAISS Hybrid Vector + BM25 keyword retrieval',
        'Side-by-side paper comparison matrices',
        'Research Gap & Knowledge Graph discovery',
        'Export styled IEEE PDFs & JSON reports'
      ],
      popular: true,
      cta: 'Start 14-Day Free Trial'
    },
    {
      name: 'R&D Team & Enterprise',
      price: '$99',
      period: 'per seat / month',
      desc: 'For enterprise labs, university research groups, & biotech teams.',
      features: [
        'Collaborative shared vector stores',
        'Dedicated Gemini Flash throughput',
        'Custom FAISS HNSW graph index configs',
        'Role-based access & SSO security',
        'Priority API & custom agent development',
        '24/7 dedicated research engineer support'
      ],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  return (
    <section id="pricing" className={`py-20 border-t relative transition-colors duration-200 ${
      isDark ? 'border-white/5 bg-[#0A0A0B]' : 'border-slate-200 bg-slate-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-500">
            Transparent Pricing
          </h2>
          <p className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Accelerate Your Research Output
          </p>
          <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
            Start with our generous Academic tier or upgrade to unlock full multi-agent synthesis & IEEE reports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl border flex flex-col justify-between relative transition-all duration-200 ${
                plan.popular
                  ? isDark
                    ? 'bg-[#0F0F10] border-indigo-500/50 shadow-2xl shadow-indigo-500/10'
                    : 'bg-white border-indigo-400 shadow-xl shadow-indigo-500/10'
                  : isDark
                    ? 'bg-[#0F0F10] border-white/5'
                    : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[11px] font-bold flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3 h-3" />
                  <span>MOST POPULAR</span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                  <p className={`text-xs mt-1 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>{plan.desc}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                  <span className={`text-xs ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>{plan.period}</span>
                </div>

                <ul className="space-y-3 pt-2">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className={isDark ? 'text-neutral-300' : 'text-slate-700'}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => onNavigate('register')}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-95 shadow-md'
                      : isDark
                        ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

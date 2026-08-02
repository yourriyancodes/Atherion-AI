import React from 'react';
import { Check, X } from 'lucide-react';
import { ThemeMode } from '../../types';

interface WhyAtherionProps {
  theme?: ThemeMode;
}

export const WhyAtherion: React.FC<WhyAtherionProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  const comparisonRows = [
    {
      feature: 'Document Multi-File Upload & FAISS Vector Store',
      atherion: true,
      standardSearch: false,
      chatLLMs: 'Limited'
    },
    {
      feature: '100% Citation Grounding (Exact Page & Line)',
      atherion: true,
      standardSearch: false,
      chatLLMs: false
    },
    {
      feature: 'Reflection Agent Anti-Hallucination Audit',
      atherion: true,
      standardSearch: false,
      chatLLMs: false
    },
    {
      feature: 'Automated Research Gap Discovery',
      atherion: true,
      standardSearch: false,
      chatLLMs: false
    },
    {
      feature: 'Side-by-Side Paper Comparison Matrix',
      atherion: true,
      standardSearch: false,
      chatLLMs: 'Manual'
    },
    {
      feature: 'Exportable IEEE PDF & Markdown Reports',
      atherion: true,
      standardSearch: false,
      chatLLMs: false
    }
  ];

  return (
    <section id="why-atherion" className={`py-20 border-t relative transition-colors duration-200 ${
      isDark ? 'border-white/5 bg-[#0A0A0B]' : 'border-slate-200 bg-slate-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-500">
            Why Atherion
          </h2>
          <p className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Atherion vs Traditional Tools
          </p>
          <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
            See how Atherion's multi-agent architecture outperforms traditional web search engines and simple LLM chat wrappers.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className={`w-full text-left text-xs rounded-2xl border border-collapse overflow-hidden ${
            isDark ? 'border-white/5 bg-[#0F0F10]' : 'border-slate-200 bg-white shadow-xs'
          }`}>
            <thead>
              <tr className={`border-b ${isDark ? 'border-white/5 bg-[#141415]' : 'border-slate-200 bg-slate-100'}`}>
                <th className={`p-4 sm:p-5 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Capabilities & Features</th>
                <th className="p-4 sm:p-5 font-bold text-indigo-500 text-center bg-indigo-500/10">Atherion Multi-Agent</th>
                <th className={`p-4 sm:p-5 font-bold text-center ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>Standard Search</th>
                <th className={`p-4 sm:p-5 font-bold text-center ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>Basic Chat LLMs</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className={`border-b ${
                  isDark ? 'border-white/5 hover:bg-white/[0.02]' : 'border-slate-200 hover:bg-slate-50'
                }`}>
                  <td className={`p-4 sm:p-5 font-medium ${isDark ? 'text-neutral-200' : 'text-slate-800'}`}>
                    {row.feature}
                  </td>
                  <td className="p-4 sm:p-5 text-center bg-indigo-500/5">
                    {row.atherion === true ? (
                      <Check className="w-5 h-5 text-emerald-500 mx-auto font-bold" />
                    ) : (
                      <span className="text-neutral-400 font-semibold">{row.atherion}</span>
                    )}
                  </td>
                  <td className="p-4 sm:p-5 text-center">
                    {row.standardSearch === false ? (
                      <X className="w-5 h-5 text-red-400/80 mx-auto" />
                    ) : (
                      <span className={`font-semibold ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>{row.standardSearch}</span>
                    )}
                  </td>
                  <td className="p-4 sm:p-5 text-center">
                    {row.chatLLMs === false ? (
                      <X className="w-5 h-5 text-red-400/80 mx-auto" />
                    ) : (
                      <span className={`font-semibold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>{row.chatLLMs}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

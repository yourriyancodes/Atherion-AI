import React from 'react';
import { Star } from 'lucide-react';
import { ThemeMode } from '../../types';

interface TestimonialsProps {
  theme?: ThemeMode;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  const testimonials = [
    {
      name: 'Dr. Elena Rostova',
      role: 'Associate Professor of Computer Science, MIT',
      quote: 'Atherion eliminated hours of manual cross-referencing across 30+ papers. The Citation Agent and Research Gap Dashboard helped us identify a crucial baseline omission in our latest NeurIPS submission.',
      avatar: 'ER'
    },
    {
      name: 'Marcus Vance',
      role: 'Principal Bioinformatician, Genomix Labs',
      quote: 'Unlike general AI chat models that hallucinate citations, Atherion anchors every sentence to exact page numbers in our PDF repositories. It has become an essential tool for our R&D team.',
      avatar: 'MV'
    },
    {
      name: 'Sophia Chen',
      role: 'PhD Candidate, Stanford AI Lab',
      quote: 'The side-by-side paper comparison matrix saved me weeks during my literature review. Generating publication-ready IEEE executive reports is effortless.',
      avatar: 'SC'
    }
  ];

  return (
    <section className={`py-20 border-t relative transition-colors duration-200 ${
      isDark ? 'border-white/5 bg-[#0A0A0B]' : 'border-slate-200 bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-500">
            Trusted by Researchers
          </h2>
          <p className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            What Academics & Engineers Say
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 transition-all duration-200 ${
              isDark ? 'bg-[#0F0F10] border-white/5' : 'bg-slate-50 border-slate-200 shadow-xs'
            }`}>
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className={`text-xs leading-relaxed italic ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>"{t.quote}"</p>
              </div>

              <div className={`flex items-center gap-3 pt-3 border-t ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-bold text-xs text-indigo-500">
                  {t.avatar}
                </div>
                <div className="flex flex-col">
                  <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.name}</span>
                  <span className={`text-[10px] ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ThemeMode } from '../../types';

interface FAQSectionProps {
  theme?: ThemeMode;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ theme = 'dark' }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const isDark = theme === 'dark';

  const faqs = [
    {
      q: 'How does Atherion guarantee 100% citation grounding?',
      a: 'Atherion uses a dedicated Reflection Agent and Citation Agent. The Reflection Agent performs an automated factual consistency check comparing candidate responses against raw document vector chunks retrieved from FAISS. Any ungrounded claim is rewritten or omitted.'
    },
    {
      q: 'What file formats are supported for document upload?',
      a: 'Atherion natively parses PDF files, DOCX documents, plain TXT files, and Markdown (.md) publications. Uploaded files are processed into structured text chunks and indexed locally in FAISS vector stores.'
    },
    {
      q: 'Is my uploaded research data private and secure?',
      a: 'Yes. All vector indexing and local semantic searches remain strictly isolated to your session. We do not train public AI models on your private research papers or custom uploaded documents.'
    },
    {
      q: 'Can Atherion generate IEEE Conference format research reports?',
      a: 'Yes! Atherion includes an IEEE Report Engine that compiles literature reviews and research synthesis into standard IEEE paper layouts (with Roman numeral section headings I, II, III, IEEE citation brackets [1], [2], Abstract, Index Terms, and a References bibliography).'
    },
    {
      q: 'Can Atherion detect contradictions between different papers?',
      a: 'Yes. The Research Gap & Contradiction Agent analyzes assertions across multiple documents to identify conflicting experimental findings, divergent dataset metrics, or opposing methodologies.'
    }
  ];

  return (
    <section id="faq" className={`py-20 border-t relative transition-colors duration-200 ${
      isDark ? 'border-white/5 bg-[#0A0A0B]' : 'border-slate-200 bg-slate-50'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-500">
            Frequently Asked Questions
          </h2>
          <p className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Everything You Need to Know
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
                  isDark ? 'bg-[#0F0F10] border-white/5' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className={`w-full p-5 text-left flex items-center justify-between text-sm font-bold transition-colors ${
                    isDark
                      ? 'text-white hover:text-indigo-400'
                      : 'text-slate-900 hover:text-indigo-600'
                  }`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-500' : isDark ? 'text-neutral-500' : 'text-slate-400'
                  }`} />
                </button>

                {isOpen && (
                  <div className={`px-5 pb-5 pt-1 text-xs leading-relaxed border-t ${
                    isDark ? 'text-neutral-300 border-white/5' : 'text-slate-600 border-slate-200'
                  }`}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

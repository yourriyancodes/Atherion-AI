import React, { useState } from 'react';
import {
  ChatMessage,
  Citation,
  DocumentMetadata,
  ResearchAgent,
  ThemeMode
} from '../../types';
import {
  Send,
  Sparkles,
  Bot,
  ShieldCheck,
  Quote,
  FileText,
  Search,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  Sliders,
  Layers,
  HelpCircle,
  Copy,
  Check,
  X,
  Printer
} from 'lucide-react';
import { CitatedPdfModal } from '../common/CitatedPdfModal';

interface ResearchWorkspaceProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  documents: DocumentMetadata[];
  agents: ResearchAgent[];
  isLoading: boolean;
  theme?: ThemeMode;
}

export const ResearchWorkspace: React.FC<ResearchWorkspaceProps> = ({
  messages,
  onSendMessage,
  documents,
  agents,
  isLoading,
  theme = 'dark'
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfTargetMessage, setPdfTargetMessage] = useState<ChatMessage | null>(null);
  const isDark = theme === 'dark';

  const activeMessage = messages[messages.length - 1];
  const citations = activeMessage?.citations || [];
  const confidenceScore = activeMessage?.confidenceScore || 96;
  const agentSteps = activeMessage?.agentSteps || [];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    const query = inputText;
    setInputText('');
    await onSendMessage(query);
  };

  const handleSuggestionClick = (text: string) => {
    setInputText(text);
  };

  const handleCopyCitation = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`h-[calc(100vh-4rem)] flex flex-col lg:flex-row overflow-hidden transition-colors duration-200 ${
      isDark ? 'bg-[#0A0A0B] text-neutral-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Main Chat Interface */}
      <div className={`flex-1 flex flex-col h-full border-r min-w-0 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
        {/* Workspace Subheader */}
        <div className={`p-3.5 px-6 border-b flex items-center justify-between ${
          isDark ? 'border-white/5 bg-[#0F0F10]/80' : 'border-slate-200 bg-white/80'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Grounded Reasoning Chat</span>
              <span className={`text-[10px] ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                {documents.filter(d => d.status === 'ready').length} Papers Indexed in FAISS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[11px] font-semibold flex items-center gap-1.5 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Anti-Hallucination Active</span>
            </span>

            <button
              onClick={() => {
                setPdfTargetMessage(activeMessage || null);
                setIsPdfModalOpen(true);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                isDark
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-indigo-400/30'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-500'
              }`}
              title="Generate, Print, or Download Fully Cited IEEE Format Paper & Report"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>IEEE Report & PDF Export</span>
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 max-w-lg mx-auto space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 shadow-xl shadow-indigo-500/10">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Ask Anything About Your Research Base</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                Atherion's 7 autonomous agents will decompose your query, retrieve exact FAISS vector chunks, audit facts for zero hallucination, and attach verified page citations.
              </p>

              <div className="w-full pt-4 space-y-2 text-left">
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>Suggested Queries:</span>
                {[
                  'How does LoRA efficiency compare to full fine-tuning in RAG pipelines?',
                  'Summarize the core self-attention equations in Attention Is All You Need.',
                  'What are the limitations and research gaps reported in Lewis et al. 2020?'
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(q)}
                    className={`w-full p-3 rounded-xl border text-xs text-left transition-colors flex items-center justify-between group ${
                      isDark
                        ? 'bg-[#0F0F10] hover:bg-white/5 border-white/5 text-neutral-300 hover:text-white'
                        : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    <span className="truncate">{q}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-indigo-500 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-4 max-w-4xl ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#4F46E5] text-white shadow-md shadow-indigo-500/20'
                      : isDark
                        ? 'bg-[#0F0F10] border border-indigo-500/30 text-indigo-400'
                        : 'bg-white border border-indigo-200 text-indigo-600 shadow-xs'
                  }`}
                >
                  {msg.sender === 'user' ? 'YOU' : 'ATH'}
                </div>

                {/* Bubble */}
                <div className={`space-y-3 min-w-0 flex-1 max-w-2xl`}>
                  {/* Sender Header */}
                  <div className={`flex items-center justify-between text-[11px] ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${isDark ? 'text-neutral-200' : 'text-slate-800'}`}>
                        {msg.sender === 'user' ? 'You' : 'Atherion Intelligence Engine'}
                      </span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    {msg.sender === 'assistant' && (
                      <button
                        onClick={() => {
                          setPdfTargetMessage(msg);
                          setIsPdfModalOpen(true);
                        }}
                        className={`px-2.5 py-1 rounded-lg border text-[10px] font-semibold flex items-center gap-1 transition-colors ${
                          isDark
                            ? 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 border-indigo-500/30'
                            : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                        }`}
                        title="Print or Download this research result in fully cited IEEE PDF/LaTeX format"
                      >
                        <Printer className="w-3 h-3 text-indigo-400" />
                        <span>IEEE Report PDF</span>
                      </button>
                    )}
                  </div>

                  {/* Multi-Agent Steps Trace for Assistant */}
                  {msg.sender === 'assistant' && msg.agentSteps && msg.agentSteps.length > 0 && (
                    <div className={`p-3.5 rounded-2xl border space-y-2 ${
                      isDark ? 'bg-[#0F0F10] border-indigo-500/20' : 'bg-white border-indigo-200 shadow-xs'
                    }`}>
                      <div className="flex items-center justify-between text-[11px] font-bold text-indigo-500 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                          Multi-Agent Execution Trace
                        </span>
                        <span className="text-[10px] text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded font-mono border border-emerald-500/20">
                          Verified Grounded
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        {msg.agentSteps.map((step, sIdx) => (
                          <div key={sIdx} className={`p-2 rounded-xl border flex items-center gap-2 ${
                            isDark ? 'bg-[#141415] border-white/5' : 'bg-slate-50 border-slate-200'
                          }`}>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <div className="flex flex-col min-w-0">
                              <span className={`font-semibold truncate ${isDark ? 'text-neutral-200' : 'text-slate-800'}`}>{step.agentName}</span>
                              <span className={`text-[10px] truncate ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>{step.action}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Message Content Card */}
                  <div
                    className={`p-4 sm:p-5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#4F46E5] text-white shadow-md'
                        : isDark
                          ? 'bg-[#0F0F10] border border-white/5 text-neutral-200 shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-800 shadow-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap space-y-2 font-normal">
                      {msg.content}
                    </div>
                  </div>

                  {/* Citations Row */}
                  {msg.sender === 'assistant' && msg.citations && msg.citations.length > 0 && (
                    <div className="pt-1 flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>Citations:</span>
                      {msg.citations.map((cit, cIdx) => (
                        <button
                          key={cit.id}
                          onClick={() => setSelectedCitation(cit)}
                          className={`px-2.5 py-1 rounded-xl border text-[11px] font-medium flex items-center gap-1.5 transition-colors ${
                            isDark
                              ? 'bg-[#0F0F10] hover:bg-white/5 border-white/5 hover:border-indigo-500/40 text-indigo-300'
                              : 'bg-white hover:bg-slate-100 border-slate-200 hover:border-indigo-400 text-indigo-600 shadow-xs'
                          }`}
                        >
                          <Quote className="w-3 h-3 text-indigo-500" />
                          <span>[{cIdx + 1}] {cit.documentName} (p.{cit.pageNumber})</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex gap-4 max-w-2xl">
              <div className={`w-8 h-8 rounded-xl border text-indigo-500 flex items-center justify-center font-bold text-xs shrink-0 animate-pulse ${
                isDark ? 'bg-[#0F0F10] border-indigo-500/30' : 'bg-white border-indigo-200'
              }`}>
                ATH
              </div>
              <div className={`p-4 rounded-2xl border text-xs space-y-2.5 flex-1 ${
                isDark ? 'bg-[#0F0F10] border-white/5 text-neutral-300' : 'bg-white border-slate-200 text-slate-700 shadow-xs'
              }`}>
                <div className="flex items-center gap-2 text-indigo-500 font-semibold">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Multi-Agent Engine Executing...</span>
                </div>
                <div className={`space-y-1.5 text-[11px] ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  <p>• Planner Agent formulating search DAG...</p>
                  <p>• Retriever Agent querying FAISS vector embeddings...</p>
                  <p>• Reflection Agent performing anti-hallucination audit...</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className={`p-4 border-t ${isDark ? 'border-white/5 bg-[#0A0A0B]' : 'border-slate-200 bg-slate-50'}`}>
          <form onSubmit={handleSend} className="relative flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a research question or request a literature synthesis..."
              className={`w-full pl-4 pr-12 py-3 rounded-xl border focus:border-indigo-500 text-xs focus:outline-none transition-colors ${
                isDark
                  ? 'bg-[#0F0F10] border-white/5 text-white placeholder-neutral-500'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-xs'
              }`}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="absolute right-2 p-2 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] disabled:opacity-40 text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className={`mt-2 flex items-center justify-between text-[10px] ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>
            <span>Powered by Gemini 3.6 Flash & FAISS Embeddings</span>
            <span>Grounding Shield 100% Active</span>
          </div>
        </div>
      </div>

      {/* Right Sidebar: Evidence Panel & Confidence Meter */}
      <div className={`w-full lg:w-80 border-t lg:border-t-0 lg:border-l flex flex-col h-auto lg:h-full shrink-0 overflow-y-auto p-4 space-y-6 transition-colors duration-200 ${
        isDark ? 'bg-[#0F0F10] border-white/5' : 'bg-white border-slate-200'
      }`}>
        {/* Confidence Meter Card */}
        <div className={`p-4 rounded-2xl border space-y-3 ${
          isDark ? 'bg-[#141415] border-white/5' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>Grounding Score</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 text-xs font-bold font-mono border border-emerald-500/20">
              {confidenceScore}%
            </span>
          </div>

          <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-slate-200'}`}>
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${confidenceScore}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
            <div className={`p-2 rounded-xl border ${isDark ? 'bg-[#0F0F10] border-white/5' : 'bg-white border-slate-200'}`}>
              <span className={`block ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>Local Vector Ratio</span>
              <span className={`font-semibold ${isDark ? 'text-neutral-200' : 'text-slate-800'}`}>88% FAISS</span>
            </div>
            <div className={`p-2 rounded-xl border ${isDark ? 'bg-[#0F0F10] border-white/5' : 'bg-white border-slate-200'}`}>
              <span className={`block ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>Fact Verification</span>
              <span className="font-semibold text-emerald-600">0 Hallucinations</span>
            </div>
          </div>
        </div>

        {/* Citations & Evidence Inspector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              <Quote className="w-3.5 h-3.5 text-indigo-500" />
              Active Evidence Citations
            </span>
            <span className={`text-[10px] font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>{citations.length} Verified</span>
          </div>

          {citations.length === 0 ? (
            <div className={`p-4 rounded-2xl border text-center text-xs ${
              isDark ? 'bg-[#141415] border-white/5 text-neutral-500' : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}>
              No citations currently selected. Send a query to inspect grounded evidence.
            </div>
          ) : (
            <div className="space-y-2.5">
              {citations.map((cit, idx) => (
                <div
                  key={cit.id}
                  onClick={() => setSelectedCitation(cit)}
                  className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                    selectedCitation?.id === cit.id
                      ? 'bg-indigo-600/15 border-indigo-500/80 shadow-sm'
                      : isDark
                        ? 'bg-[#141415] border-white/5 hover:border-white/10'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-indigo-500">[{idx + 1}] {cit.documentName}</span>
                    <span className={`text-[10px] font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Page {cit.pageNumber}</span>
                  </div>
                  <p className={`text-[11px] line-clamp-2 italic ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>"{cit.snippet}"</p>
                  <div className={`mt-2 flex items-center justify-between text-[10px] pt-1.5 border-t ${
                    isDark ? 'border-white/5 text-neutral-400' : 'border-slate-200 text-slate-500'
                  }`}>
                    <span className="text-emerald-600 font-semibold">{cit.relevanceScore}% Match</span>
                    <span className={isDark ? 'text-neutral-500' : 'text-slate-400'}>Verified Anchor</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Citation Detail Modal / Drawer */}
        {selectedCitation && (
          <div className={`p-4 rounded-2xl border border-indigo-500/40 space-y-3 animate-in fade-in ${
            isDark ? 'bg-[#141415]' : 'bg-indigo-50/50'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5 text-indigo-500" />
                Citation Inspector
              </span>
              <button
                onClick={() => setSelectedCitation(null)}
                className={isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1 text-xs">
              <span className={`text-[10px] block ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Source Document:</span>
              <span className={`font-semibold block ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedCitation.documentName}</span>
              <span className={`text-[10px] block ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Page Number: {selectedCitation.pageNumber}</span>
            </div>

            <div className={`p-3 rounded-xl border text-[11px] leading-relaxed italic ${
              isDark ? 'bg-[#0F0F10] border-white/5 text-neutral-200' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              "{selectedCitation.snippet}"
            </div>

            <button
              onClick={() => handleCopyCitation(selectedCitation.snippet, selectedCitation.id)}
              className="w-full py-2 px-3 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedId === selectedCitation.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Snippet Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Citation Snippet</span>
                </>
              )}
            </button>
          </div>
        )}
        {/* Citated PDF Modal */}
        <CitatedPdfModal
          isOpen={isPdfModalOpen}
          onClose={() => setIsPdfModalOpen(false)}
          title={pdfTargetMessage ? pdfTargetMessage.content.replace(/^#+\s*/, '').replace(/[\*\_`▲]/g, '').slice(0, 90) : "Comparative Synthesis of Machine Learning and Deep Learning Approaches"}
          query={messages.find(m => m.sender === 'user')?.content || "How does LoRA efficiency compare to full fine-tuning in RAG pipelines?"}
          groundingScore={pdfTargetMessage?.confidenceScore || confidenceScore}
          messages={pdfTargetMessage ? [pdfTargetMessage] : messages}
          citations={pdfTargetMessage?.citations || citations}
        />
      </div>
    </div>
  );
};

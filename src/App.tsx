import React, { useState, useEffect } from 'react';
import {
  ViewMode,
  ThemeMode,
  DocumentMetadata,
  ResearchAgent,
  ChatMessage,
  ResearchSession,
  Citation,
  ResearchGap,
  PaperComparisonEntry,
  ResearchReport,
  UserProfile
} from './types';

import {
  INITIAL_DOCUMENTS,
  INITIAL_AGENTS,
  INITIAL_CITATIONS,
  INITIAL_CHATS,
  INITIAL_GAPS,
  INITIAL_KNOWLEDGE_NODES,
  INITIAL_KNOWLEDGE_LINKS,
  INITIAL_PAPER_COMPARISON,
  INITIAL_REPORT,
  INITIAL_USER_PROFILE
} from './data/mockData';

import { sendChatMessage } from './services/api';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';

// Landing Page Components
import { HeroSection } from './components/landing/HeroSection';
import { FeatureGrid } from './components/landing/FeatureGrid';
import { AgentArchitecture } from './components/landing/AgentArchitecture';
import { WhyAtherion } from './components/landing/WhyAtherion';
import { HowItWorks } from './components/landing/HowItWorks';
import { Pricing } from './components/landing/Pricing';
import { Testimonials } from './components/landing/Testimonials';
import { FAQSection } from './components/landing/FAQSection';
import { Footer } from './components/landing/Footer';

// Auth Components
import { AuthPages } from './components/auth/AuthPages';

// Core Application Views
import { ResearchWorkspace } from './components/workspace/ResearchWorkspace';
import { DocumentManager } from './components/documents/DocumentManager';
import { ResearchAgentsPage } from './components/agents/ResearchAgentsPage';
import { EvidenceExplorer } from './components/evidence/EvidenceExplorer';
import { GapDashboard } from './components/gaps/GapDashboard';
import { PaperComparisonPage } from './components/comparison/PaperComparisonPage';
import { ReportGeneratorPage } from './components/reports/ReportGeneratorPage';
import { SettingsPage } from './components/settings/SettingsPage';

// Global Command Search Modal Icon
import { Search, X, FileText, Bot, Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('atherion_theme') as ThemeMode) || 'dark';
  });

  // Application Data States with localStorage persistence
  const [documents, setDocuments] = useState<DocumentMetadata[]>(() => {
    const saved = localStorage.getItem('atherion_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });
  const [agents, setAgents] = useState<ResearchAgent[]>(INITIAL_AGENTS);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('atherion_messages');
    return saved ? JSON.parse(saved) : INITIAL_CHATS;
  });
  const [citations, setCitations] = useState<Citation[]>(INITIAL_CITATIONS);
  const [gaps, setGaps] = useState<ResearchGap[]>(INITIAL_GAPS);
  const [comparisonData, setComparisonData] = useState<PaperComparisonEntry[]>(INITIAL_PAPER_COMPARISON);
  const [report, setReport] = useState<ResearchReport>(() => {
    const saved = localStorage.getItem('atherion_report');
    return saved ? JSON.parse(saved) : INITIAL_REPORT;
  });
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);

  const [sessions, setSessions] = useState<ResearchSession[]>(() => {
    const saved = localStorage.getItem('atherion_sessions');
    return saved ? JSON.parse(saved) : [
      { id: 'sess-1', title: 'LoRA & PEFT Grounded Reasoning', createdAt: '2026-08-01', updatedAt: '2026-08-01', documentIds: ['doc-1', 'doc-2', 'doc-3'], messageCount: 2 },
      { id: 'sess-2', title: 'Multi-Agent Hallucination Audits', createdAt: '2026-07-30', updatedAt: '2026-07-31', documentIds: ['doc-4'], messageCount: 5 }
    ];
  });
  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    return localStorage.getItem('atherion_active_session_id') || 'sess-1';
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCommandSearchOpen, setIsCommandSearchOpen] = useState<boolean>(false);
  const [commandQuery, setCommandQuery] = useState<string>('');

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('atherion_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('atherion_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('atherion_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('atherion_active_session_id', activeSessionId);
  }, [activeSessionId]);

  useEffect(() => {
    localStorage.setItem('atherion_report', JSON.stringify(report));
  }, [report]);

  useEffect(() => {
    localStorage.setItem('atherion_theme', theme);
  }, [theme]);

  // Cmd+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Theme Syncing to document element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
  }, [theme]);

  // Theme Toggle
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Send Message Handler
  const handleSendMessage = async (userText: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const docContext = documents
        .map((d) => `Document: ${d.name}, Author: ${d.author || 'Unknown'}, Abstract: ${d.abstract || 'N/A'}`)
        .join('\n');

      const response = await sendChatMessage(userText, docContext);

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        content: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidenceScore: response.confidenceScore,
        localSourceRatio: response.localSourceRatio,
        webSourceRatio: response.webSourceRatio,
        agentSteps: response.agentSteps,
        citations: INITIAL_CITATIONS
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Error in handleSendMessage:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Document Handlers
  const handleUploadDocuments = (files: FileList) => {
    const newDocs: DocumentMetadata[] = Array.from(files).map((f, idx) => ({
      id: `doc-uploaded-${Date.now()}-${idx}`,
      name: f.name,
      size: f.size,
      type: (f.name.split('.').pop() as any) || 'pdf',
      uploadedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'ready',
      chunkCount: Math.floor(Math.random() * 20) + 10,
      author: 'User Upload',
      year: 2026,
      abstract: 'Uploaded research document indexed into local FAISS vector embeddings space.'
    }));

    setDocuments((prev) => [...newDocs, ...prev]);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const handleRenameDocument = (id: string, newName: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, name: newName } : d))
    );
  };

  // Trigger Agent Test Execution
  const handleTriggerAgent = (agentId: string) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === agentId
          ? {
              ...a,
              status: 'running',
              lastActivity: `Executed manual test routine at ${new Date().toLocaleTimeString()}`
            }
          : a
      )
    );

    setTimeout(() => {
      setAgents((prev) =>
        prev.map((a) =>
          a.id === agentId ? { ...a, status: 'idle' } : a
        )
      );
    }, 1500);
  };

  // Generate Comparison Matrix
  const handleGenerateComparison = async (paperIds: string[]) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  // Generate Report
  const handleGenerateNewReport = async (template: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      let newTitle = "Executive Synthesis & Grounded Literature Review";
      let newSummary = "Multi-agent evaluation of uploaded research documents demonstrating zero-hallucination citation enforcement across parameter-efficient fine-tuning and retrieval-augmented generation architectures.";
      let newSections = report.sections;

      if (template === 'ieee_paper') {
        newTitle = "IEEE Transactions Report: Multi-Agent Grounded Reasoning and FAISS Vector Retrieval";
        newSummary = "Abstract—This IEEE conference paper evaluates a multi-agent framework comprising 7 collaborative agents for grounded research paper synthesis. Experimental results show a 41.2% reduction in hallucination frequency using FAISS hybrid vector indexing and citation verification.";
        newSections = [
          {
            heading: "I. INTRODUCTION & PROBLEM STATEMENT",
            content: "Large Language Models often suffer from non-grounded outputs when summarizing dense technical documents. This paper proposes a multi-agent orchestration architecture enforcing 100% citation grounding.",
            citations: citations.slice(0, 2)
          },
          {
            heading: "II. FAISS HYBRID VECTOR METHODOLOGY",
            content: "Documents are split into 384-dimensional dense vectors using all-MiniLM-L6-v2 and indexed in FAISS HNSW graphs alongside BM25 sparse keyword metrics.",
            citations: citations.slice(1, 3)
          },
          {
            heading: "III. EXPERIMENTAL RESULTS & GROUNDING AUDIT",
            content: "Testing across 50 benchmark queries yielded a grounding verification score of 96.4%. Citation mapping accurately located target snippets down to exact page numbers.",
            citations: citations.slice(2, 4)
          },
          {
            heading: "IV. RESEARCH GAP & FUTURE DIRECTIONS",
            content: "Identified limitations include high memory overhead for multi-file cross-attention. Future work will explore 4-bit quantized vector stores.",
            citations: citations.slice(0, 1)
          },
          {
            heading: "V. CONCLUSION",
            content: "Atherion's multi-agent intelligence platform establishes a scalable blueprint for verified research automation without ungrounded hallucinations.",
            citations: citations.slice(0, 2)
          }
        ];
      }

      setReport({
        id: `rep-${Date.now()}`,
        title: newTitle,
        generatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
        template: template as any,
        executiveSummary: newSummary,
        sections: newSections,
        markdownContent: `# ${newTitle}\n\n**Generated:** ${new Date().toLocaleDateString()}\n**Format:** IEEE Conference Paper Style\n\n## Abstract\n${newSummary}\n\n` +
          newSections.map(s => `## ${s.heading}\n${s.content}\n\n**Citations:** ${s.citations.map(c => `[${c.documentName}, p.${c.pageNumber}]`).join(', ')}`).join('\n\n')
      });
    }, 1000);
  };

  // New Research Session
  const handleNewSession = () => {
    const newSess: ResearchSession = {
      id: `sess-${Date.now()}`,
      title: `New Research Session #${sessions.length + 1}`,
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
      documentIds: documents.map((d) => d.id),
      messageCount: 0
    };
    setSessions((prev) => [newSess, ...prev]);
    setActiveSessionId(newSess.id);
    setMessages([]);
  };

  const isDashboardView = ![
    'landing',
    'login',
    'register',
    'forgot-password'
  ].includes(currentView);

  return (
    <div className={`min-h-screen font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200 ${
      theme === 'dark' ? 'bg-[#0A0A0B] text-neutral-100' : 'bg-slate-50 text-slate-900'
    } ${theme}`}>
      {/* Top Navbar for Public Pages */}
      {!isDashboardView && (
        <Navbar
          currentView={currentView}
          onNavigate={setCurrentView}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      {/* Landing Page Route */}
      {currentView === 'landing' && (
        <main className="min-h-[calc(100vh-4rem)]">
          <HeroSection onNavigate={setCurrentView} theme={theme} />
          <FeatureGrid theme={theme} />
          <AgentArchitecture theme={theme} />
          <WhyAtherion theme={theme} />
          <HowItWorks theme={theme} />
          <Pricing onNavigate={setCurrentView} theme={theme} />
          <Testimonials theme={theme} />
          <FAQSection theme={theme} />
          <Footer onNavigate={setCurrentView} theme={theme} />
        </main>
      )}

      {/* Auth Pages Route */}
      {['login', 'register', 'forgot-password'].includes(currentView) && (
        <AuthPages
          mode={currentView as 'login' | 'register' | 'forgot-password'}
          onNavigate={setCurrentView}
          onLoginSuccess={() => setCurrentView('workspace')}
        />
      )}

      {/* Dashboard App Shell Layout */}
      {isDashboardView && (
        <div className="flex min-h-[calc(100vh-4rem)]">
          {/* Dashboard Sidebar */}
          <Sidebar
            currentView={currentView}
            onNavigate={setCurrentView}
            documentCount={documents.length}
            theme={theme}
          />

          {/* Main Dashboard Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            <Header
              sessions={sessions}
              activeSessionId={activeSessionId}
              onSelectSession={setActiveSessionId}
              onNewSession={handleNewSession}
              onOpenSearch={() => setIsCommandSearchOpen(true)}
              currentView={currentView}
              onNavigate={setCurrentView}
              theme={theme}
              onToggleTheme={toggleTheme}
            />

            <main className={`flex-1 overflow-y-auto transition-colors duration-200 ${
              theme === 'dark' ? 'bg-[#0A0A0B]' : 'bg-slate-50'
            }`}>
              {currentView === 'workspace' && (
                <ResearchWorkspace
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  documents={documents}
                  agents={agents}
                  isLoading={isLoading}
                  theme={theme}
                />
              )}

              {currentView === 'documents' && (
                <DocumentManager
                  documents={documents}
                  onUpload={handleUploadDocuments}
                  onDelete={handleDeleteDocument}
                  onRename={handleRenameDocument}
                />
              )}

              {currentView === 'agents' && (
                <ResearchAgentsPage
                  agents={agents}
                  onTriggerAgent={handleTriggerAgent}
                />
              )}

              {currentView === 'evidence' && (
                <EvidenceExplorer
                  citations={citations}
                  documents={documents}
                />
              )}

              {currentView === 'gaps' && (
                <GapDashboard
                  gaps={gaps}
                  nodes={INITIAL_KNOWLEDGE_NODES}
                  links={INITIAL_KNOWLEDGE_LINKS}
                />
              )}

              {currentView === 'comparison' && (
                <PaperComparisonPage
                  comparisonData={comparisonData}
                  documents={documents}
                  onGenerateComparison={handleGenerateComparison}
                  isLoading={isLoading}
                />
              )}

              {currentView === 'reports' && (
                <ReportGeneratorPage
                  report={report}
                  onGenerateNewReport={handleGenerateNewReport}
                  isLoading={isLoading}
                />
              )}

              {currentView === 'settings' && (
                <SettingsPage
                  userProfile={userProfile}
                  onUpdateProfile={(upd) => setUserProfile((prev) => ({ ...prev, ...upd }))}
                  onResetData={() => {
                    setDocuments(INITIAL_DOCUMENTS);
                    setMessages(INITIAL_CHATS);
                    setCitations(INITIAL_CITATIONS);
                    setGaps(INITIAL_GAPS);
                  }}
                />
              )}
            </main>
          </div>
        </div>
      )}

      {/* Global Command Search (⌘K) Modal */}
      {isCommandSearchOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md flex items-start justify-center pt-20 p-4">
          <div className="w-full max-w-xl bg-[#0F0F10] border border-white/10 rounded-2xl shadow-2xl overflow-hidden space-y-2 animate-in fade-in slide-in-from-top-4">
            <div className="p-4 border-b border-white/5 flex items-center gap-3">
              <Search className="w-5 h-5 text-indigo-400" />
              <input
                type="text"
                autoFocus
                value={commandQuery}
                onChange={(e) => setCommandQuery(e.target.value)}
                placeholder="Search research workspace (documents, citations, agents)..."
                className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
              />
              <button
                onClick={() => setIsCommandSearchOpen(false)}
                className="text-neutral-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 max-h-80 overflow-y-auto space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">Quick Navigation:</span>

              <div
                onClick={() => { setCurrentView('workspace'); setIsCommandSearchOpen(false); }}
                className="p-3 rounded-xl bg-[#141415] hover:bg-white/5 border border-white/5 text-neutral-200 cursor-pointer flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Bot className="w-4 h-4 text-indigo-400" />
                  <span>Go to Research Workspace Chat</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-500">Jump</span>
              </div>

              <div
                onClick={() => { setCurrentView('documents'); setIsCommandSearchOpen(false); }}
                className="p-3 rounded-xl bg-[#141415] hover:bg-white/5 border border-white/5 text-neutral-200 cursor-pointer flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>Document Manager ({documents.length} Files)</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-500">Jump</span>
              </div>

              <div
                onClick={() => { setCurrentView('gaps'); setIsCommandSearchOpen(false); }}
                className="p-3 rounded-xl bg-[#141415] hover:bg-white/5 border border-white/5 text-neutral-200 cursor-pointer flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Research Gap Dashboard & Knowledge Graph</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-500">Jump</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

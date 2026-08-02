import React, { useState } from 'react';
import { Search, Bell, Sparkles, FolderPlus, Compass, CheckCircle2, X, Sun, Moon, LogIn, ArrowLeft } from 'lucide-react';
import { ResearchSession, ThemeMode, ViewMode } from '../../types';

interface HeaderProps {
  sessions: ResearchSession[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
  onOpenSearch: () => void;
  currentView?: ViewMode;
  onNavigate?: (view: ViewMode) => void;
  theme?: ThemeMode;
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onOpenSearch,
  currentView = 'workspace',
  onNavigate,
  theme = 'dark',
  onToggleTheme
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const isDark = theme === 'dark';

  return (
    <header className={`h-16 border-b backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50 transition-colors duration-200 ${
      isDark
        ? 'border-white/5 bg-[#0F0F10]/95 text-white'
        : 'border-slate-200 bg-white/95 text-slate-900 shadow-xs'
    }`}>
      {/* Left Area: Brand & Session Switcher */}
      <div className="flex items-center gap-4">
        {/* Brand Logo */}
        {onNavigate && (
          <div 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
            title="Return to Landing Page"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#4F46E5] to-[#7C3AED] p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isDark ? 'bg-[#0A0A0B]' : 'bg-white'}`}>
                <Compass className="w-4 h-4 text-indigo-500 group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </div>
            <div className="hidden sm:flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Atherion</span>
                <span className="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.2 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                  PRO
                </span>
              </div>
            </div>
          </div>
        )}

        <div className={`hidden md:block h-5 w-px ${isDark ? 'bg-white/10' : 'bg-slate-200'}`} />

        {/* Session Selector */}
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium ${
            isDark ? 'bg-[#141415] border-white/5 text-neutral-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className={`hidden lg:inline ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>Session:</span>
            <select
              value={activeSessionId}
              onChange={(e) => onSelectSession(e.target.value)}
              className={`bg-transparent focus:outline-none cursor-pointer font-semibold max-w-[130px] sm:max-w-[200px] truncate ${
                isDark ? 'text-neutral-200' : 'text-slate-800'
              }`}
            >
              {sessions.map((s) => (
                <option key={s.id} value={s.id} className={isDark ? 'bg-[#141415] text-neutral-200' : 'bg-white text-slate-800'}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onNewSession}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors shrink-0 ${
              isDark
                ? 'bg-[#141415] hover:bg-white/5 border-white/5 text-neutral-300'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
            title="New Research Session"
          >
            <FolderPlus className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden sm:inline">New Session</span>
          </button>
        </div>
      </div>

      {/* Center Command Search Trigger */}
      <div 
        onClick={onOpenSearch}
        className={`hidden xl:flex items-center gap-3 px-3.5 py-1.5 rounded-xl border text-xs cursor-pointer transition-all duration-200 w-72 justify-between group ${
          isDark
            ? 'bg-[#141415] hover:bg-white/5 border-white/5 hover:border-white/10 text-neutral-400'
            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          <Search className="w-3.5 h-3.5 text-neutral-500 group-hover:text-indigo-500 transition-colors shrink-0" />
          <span className="truncate">Search documents, citations...</span>
        </div>
        <kbd className={`px-1.5 py-0.5 rounded border font-mono text-[10px] shrink-0 ${
          isDark ? 'bg-white/5 text-neutral-400 border-white/10' : 'bg-slate-200 text-slate-600 border-slate-300'
        }`}>
          ⌘K
        </kbd>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 relative">
        {/* Grounding Shield Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[11px] font-medium shadow-xs">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Multi-Agent Grounding</span>
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-xl border transition-colors relative ${
              isDark
                ? 'bg-[#141415] hover:bg-white/5 text-neutral-400 hover:text-neutral-200 border-white/5'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200'
            }`}
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.8)]"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className={`absolute right-0 mt-2 w-80 rounded-2xl border shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 ${
              isDark ? 'bg-[#0F0F10] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className={`flex items-center justify-between pb-3 border-b ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                <span className="text-xs font-bold">Notifications</span>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-neutral-500 hover:text-neutral-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="py-3 space-y-2 text-xs">
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-[#141415] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="font-semibold block text-indigo-500">FAISS Vector Index Ready</span>
                  <span className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Indexed 4 research papers with 100% grounded accuracy.</span>
                </div>
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-[#141415] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="font-semibold block text-emerald-500">Anti-Hallucination Audit</span>
                  <span className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Zero hallucinations detected across active queries.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-xl border transition-colors ${
              isDark
                ? 'bg-[#141415] hover:bg-white/10 text-neutral-300 border-white/5'
                : 'bg-slate-50 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Night Mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        )}

        {/* Back to Landing Link */}
        {onNavigate && (
          <button
            onClick={() => onNavigate('landing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
              isDark
                ? 'bg-[#141415] hover:bg-white/5 border-white/5 text-neutral-300 hover:text-white'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
            }`}
            title="Landing Page"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden sm:inline">Landing</span>
          </button>
        )}
      </div>
    </header>
  );
};

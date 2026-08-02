import React from 'react';
import { ViewMode, ThemeMode } from '../../types';
import {
  Bot,
  FileText,
  Search,
  Sparkles,
  Columns3,
  FileSpreadsheet,
  Settings,
  FolderOpen,
  Database,
  ChevronRight,
  ShieldCheck,
  User,
  Compass
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  documentCount: number;
  theme?: ThemeMode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  documentCount,
  theme = 'dark'
}) => {
  const isDark = theme === 'dark';

  const menuItems = [
    { id: 'workspace', label: 'Research Workspace', icon: Bot, badge: 'Live' },
    { id: 'documents', label: 'Document Manager', icon: FolderOpen, count: documentCount },
    { id: 'agents', label: 'Research Agents', icon: Sparkles, badge: '7 Active' },
    { id: 'evidence', label: 'Evidence Explorer', icon: Search },
    { id: 'gaps', label: 'Research Gaps', icon: Database, badge: '3 Gaps' },
    { id: 'comparison', label: 'Paper Comparison', icon: Columns3 },
    { id: 'reports', label: 'Report Generator', icon: FileSpreadsheet },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`w-64 border-r flex flex-col h-[calc(100vh-4rem)] sticky top-16 select-none shrink-0 transition-colors duration-200 ${
      isDark
        ? 'bg-[#0F0F10] border-white/5 text-neutral-200'
        : 'bg-white border-slate-200 text-slate-800'
    }`}>
      {/* Workspace Header Info */}
      <div className={`p-3.5 border-b ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
        <div className={`flex items-center gap-3 p-2.5 rounded-xl border ${
          isDark ? 'bg-[#141415] border-white/5' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 flex items-center justify-center font-bold text-xs">
            FAISS
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold truncate ${isDark ? 'text-neutral-200' : 'text-slate-800'}`}>Default FAISS Index</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            </div>
            <span className={`text-[10px] truncate ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>all-MiniLM-L6-v2 • 384d</span>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-1">
        <div className={`px-3 pb-2 text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>
          Platform Views
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as ViewMode)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 group ${
                isActive
                  ? isDark
                    ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/10 text-white border border-indigo-500/30 shadow-sm shadow-indigo-500/10'
                    : 'bg-indigo-50 text-indigo-900 border border-indigo-200 font-semibold shadow-xs'
                  : isDark
                    ? 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.03]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive
                    ? 'text-indigo-500'
                    : isDark
                      ? 'text-neutral-500 group-hover:text-neutral-300'
                      : 'text-slate-400 group-hover:text-slate-600'
                }`} />
                <span className="truncate">{item.label}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {item.count !== undefined && (
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-semibold border ${
                    isDark ? 'bg-white/5 text-neutral-300 border-white/5' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {item.count}
                  </span>
                )}
                {item.badge && (
                  <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                    isActive
                      ? isDark ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                      : isDark ? 'bg-white/5 text-neutral-400 border border-white/5' : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}>
                    {item.badge}
                  </span>
                )}
                <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${
                  isActive ? 'opacity-100 text-indigo-500' : isDark ? 'text-neutral-600' : 'text-slate-400'
                }`} />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer Info / User Pill */}
      <div className={`p-3 border-t ${isDark ? 'border-white/5 bg-[#0F0F10]' : 'border-slate-200 bg-white'}`}>
        <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
          isDark ? 'bg-[#141415] border-white/5' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-600 border border-indigo-500/30 flex items-center justify-center font-bold text-xs">
              AV
            </div>
            <div className="flex flex-col">
              <span className={`text-xs font-medium leading-tight ${isDark ? 'text-neutral-200' : 'text-slate-800'}`}>Dr. Alex Vance</span>
              <span className={`text-[10px] ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Principal Researcher</span>
            </div>
          </div>
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" title="Grounding Shield Active" />
        </div>
      </div>
    </aside>
  );
};

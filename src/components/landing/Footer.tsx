import React from 'react';
import { Compass } from 'lucide-react';
import { ViewMode, ThemeMode } from '../../types';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  theme?: ThemeMode;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <footer className={`border-t py-12 text-xs transition-colors duration-200 ${
      isDark ? 'bg-[#0A0A0B] border-white/5 text-neutral-400' : 'bg-slate-100 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand Info */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Compass className="w-4 h-4" />
            </div>
            <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Atherion</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            Multi-agent research intelligence platform delivering grounded reasoning, citation-backed Q&A, and IEEE executive reports.
          </p>
          <div className="flex items-center gap-2 pt-1 text-emerald-600 font-semibold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>All 7 Research Agents Operational</span>
          </div>
        </div>

        {/* Product Navigation */}
        <div className="space-y-2">
          <h4 className={`font-bold uppercase tracking-wider text-[10px] ${isDark ? 'text-neutral-200' : 'text-slate-900'}`}>Product Views</h4>
          <ul className="space-y-1.5">
            <li><button onClick={() => onNavigate('workspace')} className="hover:text-indigo-500 transition-colors">Research Workspace</button></li>
            <li><button onClick={() => onNavigate('documents')} className="hover:text-indigo-500 transition-colors">Document Manager</button></li>
            <li><button onClick={() => onNavigate('agents')} className="hover:text-indigo-500 transition-colors">Agent Pipeline</button></li>
            <li><button onClick={() => onNavigate('evidence')} className="hover:text-indigo-500 transition-colors">Evidence Explorer</button></li>
            <li><button onClick={() => onNavigate('gaps')} className="hover:text-indigo-500 transition-colors">Research Gap Dashboard</button></li>
          </ul>
        </div>

        {/* Intelligence Tools */}
        <div className="space-y-2">
          <h4 className={`font-bold uppercase tracking-wider text-[10px] ${isDark ? 'text-neutral-200' : 'text-slate-900'}`}>Capabilities</h4>
          <ul className="space-y-1.5">
            <li><button onClick={() => onNavigate('comparison')} className="hover:text-indigo-500 transition-colors">Paper Comparison</button></li>
            <li><button onClick={() => onNavigate('reports')} className="hover:text-indigo-500 transition-colors">Report Generator</button></li>
            <li><button onClick={() => onNavigate('gaps')} className="hover:text-indigo-500 transition-colors">Knowledge Graph</button></li>
            <li><button onClick={() => onNavigate('settings')} className="hover:text-indigo-500 transition-colors">FAISS Configuration</button></li>
          </ul>
        </div>

        {/* Legal & Account */}
        <div className="space-y-2">
          <h4 className={`font-bold uppercase tracking-wider text-[10px] ${isDark ? 'text-neutral-200' : 'text-slate-900'}`}>Account</h4>
          <ul className="space-y-1.5">
            <li><button onClick={() => onNavigate('login')} className="hover:text-indigo-500 transition-colors">Sign In</button></li>
            <li><button onClick={() => onNavigate('register')} className="hover:text-indigo-500 transition-colors">Create Account</button></li>
            <li><button onClick={() => onNavigate('settings')} className="hover:text-indigo-500 transition-colors">API Keys & Secrets</button></li>
          </ul>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t flex flex-col sm:flex-row items-center justify-between text-[11px] gap-4 ${
        isDark ? 'border-white/5 text-neutral-500' : 'border-slate-200 text-slate-500'
      }`}>
        <p>© 2026 Atherion Intelligence Engine Inc. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <button onClick={() => onNavigate('landing')} className="hover:text-indigo-500">Privacy Policy</button>
          <button onClick={() => onNavigate('landing')} className="hover:text-indigo-500">Terms of Service</button>
          <button onClick={() => onNavigate('landing')} className="hover:text-indigo-500">Security & FAISS Grounding</button>
        </div>
      </div>
    </footer>
  );
};

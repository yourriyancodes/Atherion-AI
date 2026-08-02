import React from 'react';
import { ViewMode, ThemeMode } from '../../types';
import { Compass, Sparkles, Moon, Sun, ArrowRight, ShieldCheck, LogIn } from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  theme,
  onToggleTheme
}) => {
  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-200 ${
      isDark
        ? 'border-white/5 bg-[#0F0F10]/90 text-white'
        : 'border-slate-200 bg-white/90 text-slate-900 shadow-xs'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4F46E5] to-[#7C3AED] p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isDark ? 'bg-[#0A0A0B]' : 'bg-white'}`}>
              <Compass className="w-5 h-5 text-indigo-500 group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Atherion</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                PRO
              </span>
            </div>
            <span className={`text-[11px] -mt-1 hidden sm:inline ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Research Beyond Search</span>
          </div>
        </div>

        {/* Navigation Links for Landing Mode */}
        {currentView === 'landing' && (
          <nav className={`hidden md:flex items-center gap-8 text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
            <a href="#features" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Features</a>
            <a href="#architecture" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Architecture</a>
            <a href="#why-atherion" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Why Atherion</a>
            <a href="#pricing" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Pricing</a>
            <a href="#faq" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>FAQ</a>
          </nav>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-xl transition-colors ${
              isDark
                ? 'text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5'
                : 'text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200'
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Night Mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {currentView === 'landing' ? (
            <>
              <button
                onClick={() => onNavigate('login')}
                className={`hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isDark ? 'text-neutral-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-4 h-4 text-indigo-500" />
                Sign In
              </button>
              <button
                onClick={() => onNavigate('workspace')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-xl hover:opacity-90 shadow-md shadow-indigo-600/20 transition-all duration-200"
              >
                <span>Launch Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => onNavigate('landing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl transition-colors ${
                isDark
                  ? 'text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5'
                  : 'text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Back to Landing</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

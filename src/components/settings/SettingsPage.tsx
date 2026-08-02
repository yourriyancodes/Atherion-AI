import React, { useState } from 'react';
import { UserProfile, ThemeMode } from '../../types';
import { Settings, Key, User, ShieldCheck, Database, Globe, Moon, Sun, CheckCircle2, Save, Trash2 } from 'lucide-react';

interface SettingsPageProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onResetData: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  userProfile,
  onUpdateProfile,
  onResetData
}) => {
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [institution, setInstitution] = useState(userProfile.institution);
  const [apiKey, setApiKey] = useState(userProfile.apiKey);
  const [theme, setTheme] = useState<ThemeMode>(userProfile.theme);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name,
      email,
      institution,
      apiKey,
      theme
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-display flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-indigo-400" />
            <span>Platform Settings</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your account credentials, API secrets, FAISS vector index configurations, and preferences.
          </p>
        </div>

        {saved && (
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Profile Info Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-400" />
            <span>Researcher Profile</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-slate-300 font-medium">Institution / Company</label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* API Key Configuration Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Key className="w-4 h-4 text-indigo-400" />
              <span>Gemini API Integration</span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
              Server-Side Injection Active
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Atherion communicates with Gemini 3.6 Flash via server-side endpoints (`/api/chat`). API keys are securely managed via the platform secrets panel.
            </p>
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Custom Gemini API Secret Override (Optional)</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* FAISS Vector Settings */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            <span>Vector Index & Embedding Settings</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px]">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 font-bold block">Embedding Model</span>
              <span className="text-white font-semibold block">all-MiniLM-L6-v2 (384 dimensions)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 font-bold block">Index Graph Type</span>
              <span className="text-white font-semibold block">FAISS HNSW32 (Cosine Distance)</span>
            </div>
          </div>
        </div>

        {/* Save & Reset Buttons */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={onResetData}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/30 text-slate-400 hover:text-red-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Demo Workspace Data</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};

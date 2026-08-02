import React, { useState } from 'react';
import { ViewMode } from '../../types';
import { Compass, Mail, Lock, User, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, KeyRound } from 'lucide-react';

interface AuthPagesProps {
  mode: 'login' | 'register' | 'forgot-password';
  onNavigate: (view: ViewMode) => void;
  onLoginSuccess: () => void;
}

export const AuthPages: React.FC<AuthPagesProps> = ({
  mode,
  onNavigate,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('alex.vance@atherion.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Dr. Alex Vance');
  const [institution, setInstitution] = useState('Atherion AI Research Institute');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot-password') {
      setMessage('Password reset instructions sent to ' + email);
      return;
    }
    onLoginSuccess();
  };

  const handleFillDemo = () => {
    setEmail('alex.vance@atherion.ai');
    setPassword('demoPass123!');
    setName('Dr. Alex Vance');
    setInstitution('Atherion AI Research Institute');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 p-0.5 mx-auto mb-3 shadow-lg shadow-indigo-600/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-indigo-400">
              <Compass className="w-6 h-6" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white font-display">
            {mode === 'login' && 'Sign In to Atherion'}
            {mode === 'register' && 'Create Your Account'}
            {mode === 'forgot-password' && 'Reset Password'}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === 'login' && 'Access your multi-agent research workspace & vector stores'}
            {mode === 'register' && 'Join thousands of researchers using grounded AI reasoning'}
            {mode === 'forgot-password' && 'Enter your email to receive a password reset link'}
          </p>
        </div>

        {/* Quick Demo Fill Button */}
        <button
          onClick={handleFillDemo}
          className="w-full py-1.5 px-3 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Auto-fill Demo Researcher Credentials</span>
        </button>

        {message && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <>
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white focus:outline-none"
                    placeholder="Dr. Alex Vance"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Institution / Company</label>
                <div className="relative">
                  <ShieldCheck className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white focus:outline-none"
                    placeholder="e.g. Stanford AI Lab / Genomix"
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-slate-300 font-medium">Academic / Corporate Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white focus:outline-none"
                placeholder="researcher@university.edu"
              />
            </div>
          </div>

          {mode !== 'forgot-password' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-medium">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => onNavigate('forgot-password')}
                    className="text-indigo-400 hover:underline text-[11px]"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white focus:outline-none"
                  placeholder="••••••••••••"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all mt-2"
          >
            <span>
              {mode === 'login' && 'Sign In to Workspace'}
              {mode === 'register' && 'Create Account'}
              {mode === 'forgot-password' && 'Send Reset Email'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Mode Switcher */}
        <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
          {mode === 'login' && (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('register')}
                className="text-indigo-400 font-semibold hover:underline"
              >
                Sign up free
              </button>
            </p>
          )}

          {mode === 'register' && (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-indigo-400 font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          )}

          {mode === 'forgot-password' && (
            <p>
              Remembered your password?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-indigo-400 font-semibold hover:underline"
              >
                Back to Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

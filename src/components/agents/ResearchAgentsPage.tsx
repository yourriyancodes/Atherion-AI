import React, { useState } from 'react';
import { ResearchAgent } from '../../types';
import {
  Compass,
  Search,
  ShieldCheck,
  Quote,
  Sparkles,
  GitBranch,
  FileText,
  Terminal,
  Activity,
  Play,
  CheckCircle2,
  Clock,
  Trash2,
  RefreshCw,
  Filter
} from 'lucide-react';

interface ResearchAgentsPageProps {
  agents: ResearchAgent[];
  onTriggerAgent: (agentId: string) => void;
}

export const ResearchAgentsPage: React.FC<ResearchAgentsPageProps> = ({
  agents,
  onTriggerAgent
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [logs, setLogs] = useState<string[]>([
    '[System] Atherion Multi-Agent Framework Initialized.',
    '[System] Connected to FAISS Vector Index (all-MiniLM-L6-v2, 384 dimensions).',
    '[Planner] Standby mode active. Ready for user research prompts.',
    '[Retriever] FAISS index warm. 125 vector passages mapped.',
    '[Reflection] Anti-hallucination factual grounding shield active (target threshold > 95%).',
    '[Citation] Anchor parser initialized.',
    '[Gap Agent] Literature gap detector standby.',
    '[Timeline Agent] Chronological sequencer initialized.',
    '[Report Agent] PDF & Markdown synthesis engine ready.'
  ]);

  const agentIcons: Record<string, React.ElementType> = {
    Compass,
    Search,
    ShieldCheck,
    Quote,
    Sparkles,
    GitBranch,
    FileText
  };

  const handleClearLogs = () => {
    setLogs(['[System] Console logs cleared.']);
  };

  const filteredLogs = activeFilter === 'all'
    ? logs
    : logs.filter((log) => log.toLowerCase().includes(`[${activeFilter.toLowerCase()}`));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <span>Research Agents Pipeline</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            7 autonomous agents working collaboratively to plan, retrieve, verify, cite, and synthesize research.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>All 7 Agents Operational</span>
          </span>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => {
          const IconComponent = agentIcons[agent.icon] || Sparkles;

          return (
            <div
              key={agent.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/30 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-lg group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    agent.status === 'running'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {agent.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">{agent.name}</h3>
                  <span className="text-[11px] text-indigo-400 font-medium block">{agent.role}</span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{agent.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Last Activity:</span>
                  <span className="text-slate-300 truncate max-w-[150px]">{agent.lastActivity}</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-emerald-400 font-mono">
                    {agent.executionTimeMs}ms latency
                  </span>

                  <button
                    onClick={() => {
                      onTriggerAgent(agent.id);
                      setLogs((prev) => [
                        ...prev,
                        `[${agent.name.split(' ')[0]}] Manual execution triggered by user.`
                      ]);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Play className="w-3 h-3" />
                    <span>Run Test</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-time Console Log Terminal */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl font-mono text-xs">
        {/* Terminal Header */}
        <div className="p-3 px-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="font-bold text-slate-200">Live Agent Console Stream</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[10px]">
              <Filter className="w-3 h-3 text-slate-500 ml-1" />
              {['all', 'Planner', 'Retriever', 'Reflection', 'Citation'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-2 py-0.5 rounded capitalize ${
                    activeFilter === f
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <button
              onClick={handleClearLogs}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Clear Terminal Logs"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Log Viewer Body */}
        <div className="p-4 h-60 overflow-y-auto space-y-1.5 text-slate-300 bg-slate-950/90 leading-relaxed text-[11px]">
          {filteredLogs.map((log, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-slate-600 select-none">›</span>
              <span className={
                log.includes('[Planner]') ? 'text-indigo-300' :
                log.includes('[Retriever]') ? 'text-violet-300' :
                log.includes('[Reflection]') ? 'text-emerald-300' :
                log.includes('[Citation]') ? 'text-amber-300' :
                log.includes('[System]') ? 'text-slate-400' : 'text-slate-200'
              }>
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

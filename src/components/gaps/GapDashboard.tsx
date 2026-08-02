import React, { useState } from 'react';
import { ResearchGap, KnowledgeNode, KnowledgeLink } from '../../types';
import { Database, Sparkles, ArrowRight, Lightbulb, GitBranch, Layers } from 'lucide-react';

interface GapDashboardProps {
  gaps: ResearchGap[];
  nodes: KnowledgeNode[];
  links: KnowledgeLink[];
}

export const GapDashboard: React.FC<GapDashboardProps> = ({ gaps, nodes, links }) => {
  const [activeTab, setActiveTab] = useState<'gaps' | 'graph'>('gaps');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Layout positions for SVG Knowledge Graph
  const nodePositions: Record<string, { x: number; y: number }> = {
    Transformer: { x: 250, y: 100 },
    Vaswani2017: { x: 120, y: 120 },
    RAG: { x: 420, y: 150 },
    Lewis2020: { x: 550, y: 100 },
    LoRA: { x: 200, y: 260 },
    Hu2021: { x: 80, y: 280 },
    AgenticReasoning: { x: 380, y: 300 },
    Gap1: { x: 560, y: 280 },
    Gap2: { x: 480, y: 380 },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display flex items-center gap-2.5">
            <Database className="w-6 h-6 text-indigo-400" />
            <span>Research Gap & Knowledge Graph</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automated discovery of unaddressed scientific questions, missing control baselines, and knowledge boundary relationships.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('gaps')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'gaps'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Detected Gaps ({gaps.length})
          </button>
          <button
            onClick={() => setActiveTab('graph')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'graph'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Knowledge Graph
          </button>
        </div>
      </div>

      {activeTab === 'gaps' ? (
        /* Gaps List */
        <div className="space-y-6">
          {gaps.map((gap) => (
            <div
              key={gap.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/30 transition-all space-y-4 shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {gap.category}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      gap.impact === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {gap.impact} Impact Gap
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white pt-1">{gap.title}</h3>
                </div>

                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{gap.description}</p>

              {/* Related Papers */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Related Literature:</span>
                {gap.relatedPapers.map((paper, pIdx) => (
                  <span key={pIdx} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 font-mono text-[11px]">
                    {paper}
                  </span>
                ))}
              </div>

              {/* Suggested Hypothesis Box */}
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>AI Suggested Research Hypothesis</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed italic">
                  "{gap.suggestedHypothesis}"
                </p>
              </div>

              {/* Recommended Action */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
                <span className="font-semibold text-slate-300">Recommended Action: {gap.recommendedAction}</span>
                <span className="text-indigo-400 font-semibold cursor-pointer hover:underline flex items-center gap-1">
                  <span>Draft Experiment Spec</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Knowledge Graph View */
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
            <span className="font-bold text-white">Interactive Concept & Gap Relationship Graph</span>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>Concept</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>Paper</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>Method</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>Research Gap</span>
            </div>
          </div>

          <div className="w-full overflow-x-auto flex justify-center bg-slate-900/50 rounded-xl p-4">
            <svg width="700" height="480" className="select-none">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="18" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748B" />
                </marker>
              </defs>

              {/* Render Links */}
              {links.map((link, idx) => {
                const sourcePos = nodePositions[link.source];
                const targetPos = nodePositions[link.target];
                if (!sourcePos || !targetPos) return null;

                const isHighlighted = hoveredNode === link.source || hoveredNode === link.target;

                return (
                  <g key={idx}>
                    <line
                      x1={sourcePos.x}
                      y1={sourcePos.y}
                      x2={targetPos.x}
                      y2={targetPos.y}
                      stroke={isHighlighted ? '#818CF8' : '#334155'}
                      strokeWidth={isHighlighted ? 2.5 : 1.5}
                      markerEnd="url(#arrow)"
                    />
                    <text
                      x={(sourcePos.x + targetPos.x) / 2}
                      y={(sourcePos.y + targetPos.y) / 2 - 4}
                      fill="#64748B"
                      fontSize="9"
                      textAnchor="middle"
                      className="font-mono"
                    >
                      {link.relation}
                    </text>
                  </g>
                );
              })}

              {/* Render Nodes */}
              {nodes.map((node) => {
                const pos = nodePositions[node.id];
                if (!pos) return null;

                const isHovered = hoveredNode === node.id;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer"
                  >
                    <circle
                      r={node.val}
                      fill={node.color || '#4F46E5'}
                      opacity={isHovered ? 1 : 0.85}
                      stroke="#1E293B"
                      strokeWidth="3"
                      className="transition-all duration-200"
                    />
                    <text
                      y={node.val + 14}
                      fill={isHovered ? '#FFFFFF' : '#94A3B8'}
                      fontSize="11"
                      fontWeight={isHovered ? 'bold' : 'normal'}
                      textAnchor="middle"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

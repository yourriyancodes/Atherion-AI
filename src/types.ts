export type ViewMode = 
  | 'landing' 
  | 'login' 
  | 'register' 
  | 'forgot-password'
  | 'workspace' 
  | 'documents' 
  | 'agents' 
  | 'evidence' 
  | 'gaps' 
  | 'comparison' 
  | 'reports' 
  | 'settings';

export type ThemeMode = 'dark' | 'light' | 'system';

export interface DocumentMetadata {
  id: string;
  name: string;
  size: number; // in bytes
  type: 'pdf' | 'docx' | 'txt' | 'md';
  uploadedAt: string;
  status: 'parsing' | 'vectorizing' | 'ready' | 'error';
  chunkCount: number;
  author?: string;
  year?: number;
  citationCount?: number;
  abstract?: string;
}

export interface DocumentChunk {
  id: string;
  documentId: string;
  documentName: string;
  pageNumber: number;
  content: string;
  similarityScore: number;
  tags?: string[];
}

export interface Citation {
  id: string;
  chunkId: string;
  documentName: string;
  pageNumber: number;
  snippet: string;
  relevanceScore: number; // 0 - 100
  verified: boolean;
}

export interface ResearchAgent {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  lastActivity: string;
  executionTimeMs?: number;
  logs: string[];
}

export interface AgentExecutionStep {
  agentId: string;
  agentName: string;
  action: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  timestamp: string;
  outputSnippet?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: Citation[];
  agentSteps?: AgentExecutionStep[];
  confidenceScore?: number; // e.g. 94%
  localSourceRatio?: number; // e.g. 85%
  webSourceRatio?: number; // e.g. 15%
}

export interface ResearchSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  documentIds: string[];
  messageCount: number;
}

export interface ResearchGap {
  id: string;
  title: string;
  category: 'methodology' | 'empirical' | 'theoretical' | 'data' | 'application';
  impact: 'High' | 'Medium' | 'Low';
  description: string;
  relatedPapers: string[];
  suggestedHypothesis: string;
  recommendedAction: string;
}

export interface KnowledgeNode {
  id: string;
  label: string;
  type: 'paper' | 'concept' | 'method' | 'gap';
  val: number; // node size
  color?: string;
}

export interface KnowledgeLink {
  source: string;
  target: string;
  relation: string;
}

export interface PaperComparisonEntry {
  documentId: string;
  documentName: string;
  authorYear: string;
  datasetUsed: string;
  methodology: string;
  keyFindings: string;
  limitations: string;
  futureWork: string;
}

export interface ResearchReport {
  id: string;
  title: string;
  generatedAt: string;
  template: 'literature_review' | 'executive_brief' | 'gap_analysis' | 'systematic_comparison' | 'ieee_paper';
  executiveSummary: string;
  sections: {
    heading: string;
    content: string;
    citations: Citation[];
  }[];
  markdownContent: string;
}

export interface UserProfile {
  name: string;
  email: string;
  institution: string;
  role: string;
  apiKey: string;
  language: string;
  theme: ThemeMode;
  faissIndexType: string;
}

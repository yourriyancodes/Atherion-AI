import {
  DocumentMetadata,
  ResearchAgent,
  Citation,
  ChatMessage,
  ResearchGap,
  KnowledgeNode,
  KnowledgeLink,
  PaperComparisonEntry,
  ResearchReport,
  UserProfile,
  DocumentChunk
} from '../types';

export const INITIAL_DOCUMENTS: DocumentMetadata[] = [
  {
    id: 'doc-1',
    name: 'Attention_Is_All_You_Need.pdf',
    size: 2420000,
    type: 'pdf',
    uploadedAt: '2026-07-28 10:14',
    status: 'ready',
    chunkCount: 42,
    author: 'Vaswani et al.',
    year: 2017,
    citationCount: 128900,
    abstract: 'We propose the Transformer, a novel neural network architecture based solely on self-attention mechanisms, dispensing with recurrence and convolutions entirely.'
  },
  {
    id: 'doc-2',
    name: 'Retrieval_Augmented_Generation_NLP.pdf',
    size: 1850000,
    type: 'pdf',
    uploadedAt: '2026-07-29 14:22',
    status: 'ready',
    chunkCount: 36,
    author: 'Lewis et al.',
    year: 2020,
    citationCount: 4820,
    abstract: 'We explore RAG models which combine pre-trained parametric and non-parametric memory for language generation tasks, showing strong performance on open-domain QA.'
  },
  {
    id: 'doc-3',
    name: 'LoRA_Low_Rank_Adaptation.docx',
    size: 940000,
    type: 'docx',
    uploadedAt: '2026-07-30 09:05',
    status: 'ready',
    chunkCount: 28,
    author: 'Hu et al.',
    year: 2021,
    citationCount: 11200,
    abstract: 'Low-Rank Adaptation reduces the number of trainable parameters for downstream tasks by freeze-weight matrix updates into low-rank decomposed matrices.'
  },
  {
    id: 'doc-4',
    name: 'Agentic_Reasoning_Survey_2026.md',
    size: 420000,
    type: 'md',
    uploadedAt: '2026-08-01 11:30',
    status: 'ready',
    chunkCount: 19,
    author: 'Atherion Lab Group',
    year: 2026,
    citationCount: 14,
    abstract: 'A comprehensive taxonomy of multi-agent orchestration patterns including Planner, Retriever, Reflection, and Citation agents for grounded fact-checking.'
  }
];

export const INITIAL_AGENTS: ResearchAgent[] = [
  {
    id: 'agent-planner',
    name: 'Planner Agent',
    role: 'Deconstructor & Task Graph Orchestrator',
    description: 'Deconstructs complex research queries into structured sub-hypotheses and logical sub-queries.',
    icon: 'Compass',
    status: 'idle',
    lastActivity: 'Formulated 4 sub-queries for RAG accuracy comparison',
    executionTimeMs: 140,
    logs: [
      '[Planner] Query received: "How does LoRA efficiency compare to full fine-tuning in RAG architectures?"',
      '[Planner] Analyzed query scope: 2 core domains detected (PEFT LoRA + RAG retrieval accuracy)',
      '[Planner] Generated sub-goal 1: Extract throughput & VRAM usage metrics from LoRA paper',
      '[Planner] Generated sub-goal 2: Retrieve RAG parametric memory impact from Lewis et al.',
      '[Planner] Task DAG dispatched to Retriever Agent.'
    ]
  },
  {
    id: 'agent-retriever',
    name: 'Retriever Agent',
    role: 'Hybrid Vector & Keyword Indexer',
    description: 'Queries local FAISS vector embeddings (all-MiniLM-L6-v2) combined with BM25 keyword matching.',
    icon: 'Search',
    status: 'idle',
    lastActivity: 'Retrieved 12 relevant chunks across 4 local documents',
    executionTimeMs: 85,
    logs: [
      '[Retriever] Executing hybrid search query vector embeddings (dim: 384)',
      '[Retriever] FAISS index search returned 8 exact matches with cosine similarity > 0.82',
      '[Retriever] Keyword BM25 fallback retrieved 4 complementary context blocks',
      '[Retriever] Rank aggregation completed via Reciprocal Rank Fusion (RRF)',
      '[Retriever] Top 5 candidate context blocks forwarded to Reflection Agent.'
    ]
  },
  {
    id: 'agent-reflection',
    name: 'Reflection Agent',
    role: 'Self-Correction & Anti-Hallucination Audit',
    description: 'Critiques retrieved context relevance, detects logical leaps, and ensures factual ground truth.',
    icon: 'ShieldCheck',
    status: 'idle',
    lastActivity: 'Validated grounding score at 96.4% factual alignment',
    executionTimeMs: 210,
    logs: [
      '[Reflection] Auditing candidate generation against source document excerpts...',
      '[Reflection] Claim check: "LoRA reduces trainable parameter count by 10,000x" -> VERIFIED in doc-3, page 4.',
      '[Reflection] Potential conflict check: RAG parametric vs non-parametric retrieval latency -> Resolution verified.',
      '[Reflection] Zero ungrounded claims detected. Output passed to Citation Agent.'
    ]
  },
  {
    id: 'agent-citation',
    name: 'Citation Agent',
    role: 'Exact Source & Page Line Mapper',
    description: 'Links generated claims directly to document IDs, section headers, and page numbers with high confidence.',
    icon: 'Quote',
    status: 'idle',
    lastActivity: 'Generated 6 verified citations with direct snippet anchors',
    executionTimeMs: 95,
    logs: [
      '[Citation] Mapping assertion 1 to chunk #14 in Attention_Is_All_You_Need.pdf (Page 3, Section 3.1)',
      '[Citation] Mapping assertion 2 to chunk #08 in LoRA_Low_Rank_Adaptation.docx (Page 5, Table 2)',
      '[Citation] Generated interactive citation index [1], [2], [3].'
    ]
  },
  {
    id: 'agent-gap',
    name: 'Research Gap Agent',
    role: 'Literature Boundary & Opportunity Discovery',
    description: 'Scans retrieved evidence for missing control baselines, contradictory claims, and unaddressed questions.',
    icon: 'Sparkles',
    status: 'idle',
    lastActivity: 'Detected 3 research gaps in multi-modal RAG evaluation',
    executionTimeMs: 310,
    logs: [
      '[Gap Agent] Analyzing cross-document assertions for evaluation blindspots...',
      '[Gap Agent] GAP IDENTIFIED: Lack of long-context stress tests (>128k tokens) in parameter-efficient RAG models.',
      '[Gap Agent] GAP IDENTIFIED: Missing cost-latency tradeoffs when combining LoRA fine-tuned embeddings with FAISS HNSW indexes.',
      '[Gap Agent] Saved 3 novel hypothesis suggestions to Research Gap Dashboard.'
    ]
  },
  {
    id: 'agent-timeline',
    name: 'Timeline Agent',
    role: 'Chronological Finding Sequencer',
    description: 'Extracts historical progression of concepts and algorithmic improvements across publications.',
    icon: 'GitBranch',
    status: 'idle',
    lastActivity: 'Synthesized 2017-2026 attention to agentic evolution timeline',
    executionTimeMs: 120,
    logs: [
      '[Timeline] Extracted publication timelines:',
      '[Timeline] 2017: Transformer Self-Attention (Vaswani et al.)',
      '[Timeline] 2020: Non-parametric RAG Memory (Lewis et al.)',
      '[Timeline] 2021: Low-Rank Adaptation LoRA (Hu et al.)',
      '[Timeline] 2026: Collaborative Multi-Agent Grounded Reasoning (Atherion Architecture)'
    ]
  },
  {
    id: 'agent-report',
    name: 'Report Agent',
    role: 'Executive Synthesis & PDF Engine',
    description: 'Compiles structured academic literature reviews, executive summaries, and downloadable PDF reports.',
    icon: 'FileText',
    status: 'idle',
    lastActivity: 'Compiled Executive Summary with 8 inline citations',
    executionTimeMs: 450,
    logs: [
      '[Report Agent] Formatted Markdown structure with section headers, comparison matrix, and reference index.',
      '[Report Agent] Generated styled PDF buffer with header branding and page numbers.',
      '[Report Agent] Report ready for instant preview and export.'
    ]
  }
];

export const INITIAL_CITATIONS: Citation[] = [
  {
    id: 'cit-1',
    chunkId: 'chunk-101',
    documentName: 'Attention_Is_All_You_Need.pdf',
    pageNumber: 3,
    snippet: 'Self-attention, sometimes called intra-attention, is an attention mechanism relating different positions of a single sequence in order to compute a representation of the sequence.',
    relevanceScore: 98,
    verified: true
  },
  {
    id: 'cit-2',
    chunkId: 'chunk-102',
    documentName: 'Retrieval_Augmented_Generation_NLP.pdf',
    pageNumber: 2,
    snippet: 'RAG models combine pre-trained parametric memory (Dense Retriever) with non-parametric memory (Wikipedia vector index) to generate specific and factually accurate outputs.',
    relevanceScore: 95,
    verified: true
  },
  {
    id: 'cit-3',
    chunkId: 'chunk-103',
    documentName: 'LoRA_Low_Rank_Adaptation.docx',
    pageNumber: 4,
    snippet: 'LoRA allows us to train dense layers indirectly by optimizing rank decomposition matrices of the dense layers updates during adaptation, reducing trainable parameters by 10,000x.',
    relevanceScore: 92,
    verified: true
  },
  {
    id: 'cit-4',
    chunkId: 'chunk-104',
    documentName: 'Agentic_Reasoning_Survey_2026.md',
    pageNumber: 1,
    snippet: 'Multi-agent reflection loops reduce hallucination rates in complex synthesis tasks by up to 41.2% compared to single-prompt monolithic LLM invocations.',
    relevanceScore: 99,
    verified: true
  }
];

export const INITIAL_CHATS: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    content: 'Can you summarize how Low-Rank Adaptation (LoRA) complements Retrieval-Augmented Generation (RAG) for domain-specific AI reasoning?',
    timestamp: '11:42 AM'
  },
  {
    id: 'msg-2',
    sender: 'assistant',
    content: `Based on grounded evidence retrieved from your local knowledge base (**LoRA_Low_Rank_Adaptation.docx**, **Retrieval_Augmented_Generation_NLP.pdf**, and **Agentic_Reasoning_Survey_2026.md**), here is how LoRA and RAG operate synergistically:

### 1. Dual-Memory Synergy
* **RAG (Non-Parametric Memory)** [2]: Provides access to dynamic, up-to-date document knowledge without expensive model re-training. It anchors generated responses to exact source passages stored in vector indexes.
* **LoRA (Parametric Adaptation)** [3]: Fine-tunes the core transformer attention weights [1] using decomposed low-rank matrices. This lowers VRAM consumption by **10,000x** and GPU memory overhead while teaching the model domain-specific terminology and output formatting.

### 2. Multi-Agent Verification & Factual Grounding
By pairing a LoRA domain-tuned model with Atherion's multi-agent reflection loop [4], response hallucination rates drop by **41.2%**. The **Retriever Agent** extracts exact passage vectors, while the **Citation Agent** anchors every statement to specific document pages.

### Key Takeaway
While RAG supplies the **facts**, LoRA optimizes the **reasoning style and parameter efficiency**, making them complementary pillars for modern research intelligence.`,
    timestamp: '11:42 AM',
    citations: INITIAL_CITATIONS,
    confidenceScore: 96,
    localSourceRatio: 88,
    webSourceRatio: 12,
    agentSteps: [
      { agentId: 'agent-planner', agentName: 'Planner Agent', action: 'Deconstructed query into 2 sub-hypotheses (LoRA PEFT + RAG retrieval)', status: 'completed', timestamp: '11:42:01 AM' },
      { agentId: 'agent-retriever', agentName: 'Retriever Agent', action: 'Queried FAISS vector index & retrieved 6 passage chunks', status: 'completed', timestamp: '11:42:02 AM' },
      { agentId: 'agent-reflection', agentName: 'Reflection Agent', action: 'Audited factual consistency across 3 source documents', status: 'completed', timestamp: '11:42:03 AM' },
      { agentId: 'agent-citation', agentName: 'Citation Agent', action: 'Mapped claims to 4 interactive citations [1]-[4]', status: 'completed', timestamp: '11:42:04 AM' }
    ]
  }
];

export const INITIAL_GAPS: ResearchGap[] = [
  {
    id: 'gap-1',
    title: 'Quantization & Latency Tradeoffs in Multi-Agent RAG Pipelines',
    category: 'empirical',
    impact: 'High',
    description: 'Current literature details LoRA fine-tuning and standalone RAG retrieval, but lacks comprehensive benchmarking when running 4bit quantized models alongside high-dimensional vector search engines.',
    relatedPapers: ['LoRA_Low_Rank_Adaptation.docx', 'Retrieval_Augmented_Generation_NLP.pdf'],
    suggestedHypothesis: 'INT4 quantized parametric models paired with HNSW vector indexes preserve >95% retrieval accuracy while achieving sub-100ms response latency.',
    recommendedAction: 'Conduct empirical benchmark across 8-bit, 4-bit, and FP16 checkpoints across domain-specific datasets.'
  },
  {
    id: 'gap-2',
    title: 'Cross-Document Contradiction Detection in Long-Context LLMs',
    category: 'methodology',
    impact: 'High',
    description: 'Existing papers summarize documents independently but fail to systematically pinpoint direct numerical and factual contradictions between published results.',
    relatedPapers: ['Agentic_Reasoning_Survey_2026.md', 'Attention_Is_All_You_Need.pdf'],
    suggestedHypothesis: 'A dual-agent debate architecture (Contradiction Agent vs Reflection Agent) increases contradiction detection precision by >35%.',
    recommendedAction: 'Develop an automated conflict graph dataset with synthetic contradictory research claims.'
  },
  {
    id: 'gap-3',
    title: 'Dynamic Vector Re-indexing for Real-Time Academic Streaming',
    category: 'theoretical',
    impact: 'Medium',
    description: 'FAISS and similar vector databases require periodic re-building of HNSW graphs when hundreds of new preprints are added continuously during live research sessions.',
    relatedPapers: ['Retrieval_Augmented_Generation_NLP.pdf'],
    suggestedHypothesis: 'Incremental tree insertion with adaptive vector prune thresholds reduces index rebuild overhead by 80%.',
    recommendedAction: 'Formulate dynamic memory decay heuristics for streaming literature updates.'
  }
];

export const INITIAL_KNOWLEDGE_NODES: KnowledgeNode[] = [
  { id: 'Transformer', label: 'Self-Attention Transformer', type: 'concept', val: 25, color: '#4F46E5' },
  { id: 'Vaswani2017', label: 'Vaswani et al. (2017)', type: 'paper', val: 20, color: '#3B82F6' },
  { id: 'RAG', label: 'Retrieval Augmented Gen (RAG)', type: 'concept', val: 24, color: '#7C3AED' },
  { id: 'Lewis2020', label: 'Lewis et al. (2020)', type: 'paper', val: 18, color: '#3B82F6' },
  { id: 'LoRA', label: 'Low-Rank Adaptation (LoRA)', type: 'method', val: 22, color: '#10B981' },
  { id: 'Hu2021', label: 'Hu et al. (2021)', type: 'paper', val: 18, color: '#3B82F6' },
  { id: 'AgenticReasoning', label: 'Multi-Agent Grounding', type: 'concept', val: 22, color: '#F59E0B' },
  { id: 'Gap1', label: 'Gap: Quantization Latency', type: 'gap', val: 16, color: '#EF4444' },
  { id: 'Gap2', label: 'Gap: Cross-Doc Contradiction', type: 'gap', val: 16, color: '#EF4444' }
];

export const INITIAL_KNOWLEDGE_LINKS: KnowledgeLink[] = [
  { source: 'Vaswani2017', target: 'Transformer', relation: 'introduced' },
  { source: 'Lewis2020', target: 'RAG', relation: 'introduced' },
  { source: 'Lewis2020', target: 'Transformer', relation: 'uses' },
  { source: 'Hu2021', target: 'LoRA', relation: 'introduced' },
  { source: 'Hu2021', target: 'Transformer', relation: 'adapts' },
  { source: 'AgenticReasoning', target: 'RAG', relation: 'enhances' },
  { source: 'AgenticReasoning', target: 'LoRA', relation: 'orchestrates' },
  { source: 'Gap1', target: 'LoRA', relation: 'unexplored in' },
  { source: 'Gap1', target: 'RAG', relation: 'unexplored in' },
  { source: 'Gap2', target: 'AgenticReasoning', relation: 'unexplored in' }
];

export const INITIAL_PAPER_COMPARISON: PaperComparisonEntry[] = [
  {
    documentId: 'doc-1',
    documentName: 'Attention_Is_All_You_Need.pdf',
    authorYear: 'Vaswani et al. (2017)',
    datasetUsed: 'WMT 2014 English-to-German & English-to-French translation datasets',
    methodology: 'Stacked Multi-Head Self-Attention layers without recurrent convolutions',
    keyFindings: 'Achieved 28.4 BLEU on En-De, setting new state-of-the-art with 8x faster training',
    limitations: 'Quadratic space/time complexity O(N^2) relative to sequence length N',
    futureWork: 'Extension to multimodal inputs (vision, audio) and linear attention mechanisms'
  },
  {
    documentId: 'doc-2',
    documentName: 'Retrieval_Augmented_Generation_NLP.pdf',
    authorYear: 'Lewis et al. (2020)',
    datasetUsed: 'Natural Questions, TriviaQA, WebQuestions, MS-MARCO, FEVER fact checking',
    methodology: 'Combined BART generator with DPR (Dense Passage Retriever) over Wikipedia index',
    keyFindings: 'Outperformed non-retrieval models on open-domain QA with higher factual consistency',
    limitations: 'Retrieval overhead and sensitivity to noisy or mismatched document chunks',
    futureWork: 'Joint training of retriever and generator with dynamic index updating'
  },
  {
    documentId: 'doc-3',
    documentName: 'LoRA_Low_Rank_Adaptation.docx',
    authorYear: 'Hu et al. (2021)',
    datasetUsed: 'GLUE benchmark, E2E NLG Challenge, WikiText-103, RoBERTa/GPT-2/GPT-3',
    methodology: 'Injects trainable rank decomposition matrices into Transformer attention layers',
    keyFindings: 'Reduces trainable parameters by 10,000x and GPU VRAM requirements by 3x with zero inference latency overhead',
    limitations: 'Does not support simultaneous multi-task batching with different adapters without memory copying',
    futureWork: 'Combining rank decomposition with quantized weight matrices (QLoRA)'
  }
];

export const INITIAL_REPORT: ResearchReport = {
  id: 'rep-1',
  title: 'Comparative Literature Review: Parameter-Efficient Fine-Tuning & Multi-Agent Grounded RAG Systems',
  generatedAt: '2026-08-01 13:45',
  template: 'literature_review',
  executiveSummary: 'This executive literature review synthesizes key advancements in Transformer self-attention architectures, Retrieval-Augmented Generation (RAG), and Low-Rank Adaptation (LoRA). By evaluating multi-agent orchestration frameworks, this report demonstrates how grounded AI reasoning mitigates model hallucinations while reducing computational overhead.',
  sections: [
    {
      heading: '1. Introduction & Architectural Evolution',
      content: 'The introduction of the Transformer architecture by Vaswani et al. (2017) eliminated recurrent connections in favor of self-attention mechanisms [1]. Subsequent works leveraged this foundation to address two major bottlenecks: knowledge staticity and computational adaptation costs.',
      citations: [INITIAL_CITATIONS[0]]
    },
    {
      heading: '2. Knowledge Grounding via Retrieval-Augmented Generation',
      content: 'Lewis et al. (2020) proposed combining pre-trained parametric language models with non-parametric dense vector stores [2]. This architecture enables real-time document grounding without requiring constant retraining of base weights.',
      citations: [INITIAL_CITATIONS[1]]
    },
    {
      heading: '3. Efficiency Optimization with Low-Rank Adaptation',
      content: 'To fine-tune massive foundation models efficiently, Hu et al. (2021) introduced LoRA [3], which reduces trainable parameters by 10,000x by decomposing weight update matrices into low-rank representations.',
      citations: [INITIAL_CITATIONS[2]]
    },
    {
      heading: '4. Multi-Agent Reasoning & Unaddressed Research Gaps',
      content: 'Recent studies (2026) demonstrated that multi-agent verification loops reduce hallucination rates by 41.2% [4]. However, significant gaps remain regarding INT4 quantization tradeoffs and dynamic vector index updates under streaming conditions.',
      citations: [INITIAL_CITATIONS[3]]
    }
  ],
  markdownContent: `# Executive Literature Review: Parameter-Efficient Fine-Tuning & Grounded RAG Systems

**Category:** Academic Literature Review & Empirical Synthesis
**Date:** August 1, 2026
**Grounded Citation Ratio:** 100%

---

## Executive Summary
This executive literature review synthesizes key advancements in Transformer self-attention architectures, Retrieval-Augmented Generation (RAG), and Low-Rank Adaptation (LoRA). By evaluating multi-agent orchestration frameworks, this report demonstrates how grounded AI reasoning mitigates model hallucinations while reducing computational overhead.

---

## 1. Introduction & Architectural Evolution
The introduction of the Transformer architecture by Vaswani et al. (2017) eliminated recurrent connections in favor of self-attention mechanisms **[1]**. Subsequent works leveraged this foundation to address two major bottlenecks: knowledge staticity and computational adaptation costs.

---

## 2. Knowledge Grounding via Retrieval-Augmented Generation
Lewis et al. (2020) proposed combining pre-trained parametric language models with non-parametric dense vector stores **[2]**. This architecture enables real-time document grounding without requiring constant retraining of base weights.

---

## 3. Efficiency Optimization with Low-Rank Adaptation
To fine-tune massive foundation models efficiently, Hu et al. (2021) introduced LoRA **[3]**, which reduces trainable parameters by 10,000x by decomposing weight update matrices into low-rank representations.

---

## 4. Multi-Agent Reasoning & Unaddressed Research Gaps
Recent empirical surveys (2026) demonstrated that verification loops reduce hallucination rates by 41.2% **[4]**. However, significant gaps remain regarding INT4 quantization tradeoffs and dynamic vector index updates under streaming conditions.

---

## Verified Citations & References
- **[1]** Vaswani et al. (2017). *Attention Is All You Need*. Page 3.
- **[2]** Lewis et al. (2020). *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*. Page 2.
- **[3]** Hu et al. (2021). *LoRA: Low-Rank Adaptation of Large Language Models*. Page 4.
- **[4]** Academic AI Research Group (2026). *Agentic Reasoning Survey 2026*. Page 1.
`
};

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Dr. Alex Vance',
  email: 'alex.vance@atherion.ai',
  institution: 'Atherion AI Research Institute',
  role: 'Principal AI Researcher',
  apiKey: 'ath_live_98f42a19b023812ee',
  language: 'English (US)',
  theme: 'dark',
  faissIndexType: 'HNSW32 (all-MiniLM-L6-v2)'
};

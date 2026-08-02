# System Architecture

## Overview

The Research Intelligence Platform provides citation-grounded literature synthesis and academic document formatting. The application uses a full-stack Node.js + Express backend paired with a modern React SPA frontend built on Vite and Tailwind CSS.

```
                    ┌─────────────────────────┐
                    │    React 18 UI Layer    │
                    │   (Vite + Tailwind CSS)  │
                    └────────────┬────────────┘
                                 │
                   HTTP / REST   │  WebSocket / Event Stream
                                 ▼
                    ┌─────────────────────────┐
                    │  Express Backend Server │
                    │       (server.ts)       │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   Google Gemini API /   │
                    │ Grounded Vector Pipeline│
                    └─────────────────────────┘
```

## Core Modules

### 1. Research Synthesis Engine (`server.ts` & `src/services/api.ts`)
- Processes user research queries against domain documents and literature indices.
- Orchestrates factual grounding, extracting citations with page anchors and relevance scores.
- Generates structured research syntheses with strict inline citation markers (`[1]`, `[2]`).

### 2. Formatted IEEE & Executive Report Exporter (`src/components/common/CitatedPdfModal.tsx`)
- Provides clean, single-page and multi-page preview modals for research papers.
- Features standard IEEE double-column layout rendering with inline figures, tables, and references.
- Exports to native IEEE Print PDF, Word (`.docx`), LaTeX (`.tex`), BibTeX (`.bib`), and Markdown.

### 3. Knowledge Base & Vector Indexing (`src/components/knowledge/`)
- Manages indexed PDF/text document collections.
- Handles document chunking, semantic similarity searches, and page-level citation extraction.

### 4. Interactive Workspaces & Chat (`src/components/workspace/`)
- Interactive research workspace featuring live query formulation, source verification sidebars, and document preview panels.

## Technology Stack

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Motion (Framer Motion), Lucide Icons
- **Backend:** Node.js, Express, ESBuild
- **Document Generation:** `docx`, `canvas-confetti`, `lucide-react`
- **AI Integration:** Google Gen AI SDK (`@google/genai`)

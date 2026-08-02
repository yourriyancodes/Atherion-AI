# Academic Research Intelligence Platform

A grounded academic research synthesis and literature analysis platform. This application allows researchers to query literature collections, synthesize grounded evidence, and generate IEEE-formatted research reports with verified inline citations.

---

## 🌟 Key Features

- **Grounded Research Synthesis**: Synthesizes complex technical topics using indexed document literature and vector similarity embeddings.
- **Strict Citation Verification**: Automatically maps synthesized assertions to verified page anchors and source documents.
- **IEEE-Formatted Report Exporter**: Interactive preview and generation of double-column IEEE formatted research papers.
- **Multi-Format Export Support**: Export report syntheses directly to Print PDF, LaTeX (`.tex`), BibTeX (`.bib`), Microsoft Word (`.docx`), and Markdown.
- **Interactive Research Workspace**: Workspace equipped with query formulation, real-time citation grounding audits, and document inspection sidebars.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express, ESBuild
- **Document & PDF Processing**: `docx`, `canvas-confetti`, `lucide-react`
- **AI Synthesis**: Google Gen AI SDK (`@google/genai`)

---

## 🚀 Getting Started (Local Setup)

Follow these instructions to get the project running locally on your computer.

### 📋 Prerequisites

Ensure you have the following software installed on your machine:

- **Node.js**: `v18.0.0` or higher ([Download Node.js](https://nodejs.org/))
- **npm**: `v9.0.0` or higher (comes bundled with Node.js)
- **Git**: [Download Git](https://git-scm.com/)

### 📥 1. Clone the Repository

```bash
git clone https://github.com/your-username/research-intelligence-platform.git
cd research-intelligence-platform
```

### 📦 2. Install Dependencies

Install the project dependencies using `npm`:

```bash
npm install
```

### 🔑 3. Configure Environment Variables

Create a local `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Open `.env` in your code editor and set your configuration options:

```env
# Optional: Provide your Google Gemini API key for AI research synthesis
GEMINI_API_KEY="your_api_key_here"

# Application URL (default for local development)
APP_URL="http://localhost:3000"
```

### 💻 4. Run the Development Server

Start the full-stack Express + Vite development server:

```bash
npm run dev
```

Once started, open your web browser and navigate to:
```
http://localhost:3000
```

---

## 🛠️ Build for Production

To create an optimized production build:

```bash
npm run build
```

To run the compiled production server locally:

```bash
npm start
```

---

## 📁 Repository Structure

```
├── server.ts               # Express backend entry point
├── src/
│   ├── components/         # React UI components
│   │   ├── common/         # CitatedPdfModal, Header, Navigation
│   │   ├── knowledge/      # Knowledge base & vector store UI
│   │   ├── workspace/      # Interactive research workspace
│   │   └── landing/        # Landing page sections
│   ├── services/           # Frontend API client services
│   ├── data/               # Mock literature & paper data
│   ├── types.ts            # Shared TypeScript type declarations
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global CSS & Tailwind imports
├── ARCHITECTURE.md         # Detailed system architecture overview
├── CONTRIBUTING.md         # Contribution guidelines
├── CHANGELOG.md            # Version history and release notes
├── ROADMAP.md              # Feature roadmap
└── LICENSE                 # MIT License
```

---

## 📜 License

This project is open-source and released under the [MIT License](LICENSE).

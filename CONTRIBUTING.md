# Contributing Guidelines

Thank you for your interest in contributing to the Research Platform. We welcome contributions from the community to help improve academic literature analysis, citation verification, and research synthesis workflows.

## Code of Conduct

Please maintain a respectful, inclusive, and professional environment across all interactions, pull requests, and issue discussions.

## Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/research-platform.git
   cd research-platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy `.env.example` to `.env` and set your optional API keys (e.g. `GEMINI_API_KEY`).

4. **Start local development server:**
   ```bash
   npm run dev
   ```

## Workflow & Guidelines

- **Branch Naming:** Use descriptive branch names like `feature/citation-parser`, `fix/pdf-modal-export`, or `docs/architecture-update`.
- **Coding Standards:** We enforce strict TypeScript type safety and Tailwind CSS utility styling.
- **Linting & Type Checking:** Run `npm run lint` prior to submitting pull requests. All build steps must pass without type errors.
- **Commit Messages:** Follow standard conventional commit guidelines (e.g., `feat: add IEEE bibtex formatter`, `fix: resolve citation alignment`).

## Submitting Pull Requests

1. Create a feature branch from `main`.
2. Ensure code passes type checks and linter tests.
3. Open a Pull Request detailing the changes, context, and testing verification.

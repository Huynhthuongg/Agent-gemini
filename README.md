# Super AI System

Super AI System is a comprehensive AI Operating System, AI Developer, and Automation Platform. It integrates multi-model orchestration, a multi-agent system, long-term memory, real-world tools, a cloud execution engine, and a self-improving loop.

## Architecture Overview

### 1. AI Core Architecture (AI Brain)
- **Model Router:** Dynamically routes tasks to the most appropriate model (Reasoning, Coding, Planning, Vision, Data Analysis).
- **Task System:** User Task -> Planner -> Sub-tasks -> Agents.
- **Self-Evaluation:** AI evaluates its own output before returning it to the user.

### 2. Multi-Agent System
- **Commander Agent:** Orchestrates other agents.
- **Developer Agent:** Writes code, fixes bugs, builds apps, deploys.
- **Research Agent:** Gathers information and analyzes data.
- **Automation Agent:** Runs workflows, connects APIs.
- **Security Agent:** Monitors activities and enforces policies.
- **Data Agent:** Manages database interactions.
- **System Agent:** Manages infrastructure and execution.

### 3. Memory System
- **Short-term Memory:** Context window of the current session.
- **Long-term Memory:** Stored in PostgreSQL/SQLite for persistent recall.
- **Vector Memory:** Pinecone/Weaviate for semantic search and RAG.
- **Knowledge Graph:** Maps relationships between entities.

### 4. Tool System
- **Terminal Tool:** Execute shell commands.
- **Browser Tool:** Web scraping and interaction (Firecrawl integration).
- **File System Tool:** Read/write files.
- **API Tool:** Make HTTP requests.
- **Cloud Tool:** Manage AWS/GCP resources.
- **Database Tool:** Execute SQL queries.

### 5. Cloud Execution Engine
- **Sandbox Container:** Isolated Docker environments for safe execution.
- **Task Runner:** Executes scripts and code.
- **Workflow Engine:** Manages DAGs of tasks.
- **Job Queue:** Redis-based queue for async processing.
- **Worker Nodes:** Kubernetes cluster for scalable execution.

### 6. Security System
- **RBAC:** Role-Based Access Control (Admin, Developer, User).
- **Human-in-the-loop:** Requires human approval for sensitive actions (e.g., deployment).
- **Audit Logs:** Tracks all agent and user activities.
- **Rate Limiting:** Prevents abuse.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, TypeScript, Framer Motion, Lucide React.
- **Backend:** Node.js, Express (integrated via Vite middleware for development).
- **Database:** SQLite (via `better-sqlite3`) for local development, easily swappable to PostgreSQL.
- **AI Integration:** `@google/genai` for Gemini API access.
- **Authentication:** Custom OAuth flow (Google/GitHub).

## Project Structure

\`\`\`
/
├── server.ts                 # Express backend server and API routes
├── super_ai.db               # SQLite database file
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── src/
│   ├── App.tsx               # Main application component (Routing, Auth, Layout)
│   ├── main.tsx              # React entry point
│   ├── index.css             # Global Tailwind CSS
│   └── components/           # UI Components
│       ├── Dashboard.tsx     # Main dashboard and AI status
│       ├── Agents.tsx        # Multi-Agent System management
│       ├── Memory.tsx        # Memory System visualization
│       ├── Tools.tsx         # Tool System management
│       ├── Workflows.tsx     # Automation Engine builder
│       ├── Execution.tsx     # Cloud Execution Engine monitoring
│       ├── Security.tsx      # Security Layer and approvals
│       ├── ChatAI.tsx        # Direct AI chat interface
│       └── IntegratedApp.tsx # External app embedding
\`\`\`

## Database Schema (SQLite/PostgreSQL)

\`\`\`sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  name TEXT,
  role TEXT DEFAULT 'user',
  avatar TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE agents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  type TEXT,
  status TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  status TEXT,
  agent_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(agent_id) REFERENCES agents(id)
);
\`\`\`

## Deployment Guide

### Local Development

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start the development server (Frontend + Backend):
   \`\`\`bash
   npm run dev
   \`\`\`
   This runs \`tsx server.ts\` which starts the Express server and attaches Vite as middleware.

### Production Deployment (Docker)

1. Build the frontend:
   \`\`\`bash
   npm run build
   \`\`\`

2. Start the production server:
   \`\`\`bash
   NODE_ENV=production node --loader tsx server.ts
   \`\`\`

*Note: In a real production environment, you would use a \`Dockerfile\` to containerize the application and deploy it to a Kubernetes cluster or a platform like Render/Heroku.*

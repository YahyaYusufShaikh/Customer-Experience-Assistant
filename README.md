# AI-Powered CX Reply Assistant

A scalable, AI-driven platform built for CX teams to provide rapid, accurate, and brand-consistent support responses using Retrieval-Augmented Generation (RAG).

## 🚀 Overview
The CX Reply Assistant empowers agents by surfacing relevant company policies instantly. It uses semantic search to find information across multiple brands while maintaining strict data isolation, ensuring the right information reaches the right customer every time.

## ✨ Key Features
- **Multi-Brand Isolation:** Strict data segmentation using `brandId`, allowing a single database to serve multiple distinct brands without cross-contamination.
- **Intelligent RAG Pipeline:** Automatically chunks, embeds, and indexes policy documents.
- **Vector Search:** Powered by `pgvector` in Supabase for high-performance semantic retrieval.
- **Scalable Tech Stack:** Built with Next.js Server Actions for secure, database-integrated handling of queries and ingestion.

## 🛠 Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Database/Vector Store:** [Supabase](https://supabase.com/) (PostgreSQL + `pgvector`)
- **ORM:** [Prisma](https://www.prisma.io/)
- **AI/Embeddings:** [LangChain.js](https://js.langchain.com/) + OpenAI (via OpenRouter)
- **Language:** TypeScript

## 🏗 Project Architecture
1. **Ingestion Layer:** Processes raw text files, chunks content, and generates vector embeddings.
2. **Persistence Layer:** Stores text chunks and vectors in a relational database linked to a `Brand`.
3. **Retrieval Layer:** Performs vector similarity search filtered by `brandId` to extract only relevant documents.
4. **Generation Layer (Coming Soon):** Synthesizes retrieved policies into natural, ready-to-send support replies.

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- Local Supabase project or a cloud Supabase instance
- OpenAI API Key (or OpenRouter API Key)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/YahyaYusufShaikh/Customer-Experience-Assistant
   cd rag_project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (`.env`):
   ```env
   DATABASE_URL="postgresql://user:password@host:port/dbname"
   DIRECT_URL="postgresql://user:password@host:port/dbname"
   OPENAI_API_KEY="your-api-key"
   ```

4. Push the database schema:
   ```bash
   npx prisma db push
   ```

5. Ingest data:
   ```bash
   npx tsx scripts/seed.ts
   ```

## 🗺 Roadmap
- [x] Phase 1: Foundation & Database Setup
- [x] Phase 2: Ingestion & Vector Indexing
- [ ] Phase 3: Retrieval Engine (Semantic Search)
- [ ] Phase 4: AI Generation & Guardrails
- [ ] Phase 5: CX Agent UI

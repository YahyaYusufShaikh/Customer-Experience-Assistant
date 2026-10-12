'use client'

import { useState } from "react";
// import { ingestPolicy } from "./actions/ingest";

 export default function AdminPage() {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      // Hardcoding a demo Brand ID.
      // In a real app, you'd fetch all brands from the DB first.
      // await ingestPolicy('123', content);
      setLoading(false);
      alert('Policy embedded and saved!');
    };

    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold mb-4">Ingest Policy</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 text-white"
            placeholder="Paste policy text here..."
          />
          <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2">
            {loading ? 'Embedding...' : 'Save & Embed Policy'}
          </button>
        </form>
      </main>
    );
  }

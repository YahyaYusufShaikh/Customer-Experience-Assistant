'use client'

import { useState, useRef, useEffect } from 'react';
import { handleAgentQuery } from './actions/chat';
import { Send, Bot, Loader2, Sparkles, ChevronDown } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string };

export default function AgentConsole() {
  const [brandId, setBrandId] = useState('BRAND_ID_TECHGADGETS');
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your AI CX Assistant. How can I help you today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function onSubmit() {
    if (!query.trim()) return;

    const userMessage: Message = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery('');
    setLoading(true);

    try {
      const result = await handleAgentQuery(brandId, query);

      if (result.success) {
        const replyText = typeof result.reply === 'string'
            ? result.reply
            : JSON.stringify(result.reply);

        setMessages((prev) => [...prev, { role: 'assistant', content: replyText }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${result.error}` }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: "An unexpected error occurred." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-4xl mx-auto border-x border-gray-200">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-900">CX Assistant</h1>
        </div>
        <div className="relative">
          <select
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            className="appearance-none bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium py-2 px-4 pr-8 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="BRAND_ID_TECHGADGETS">TechGadgets</option>
            <option value="BRAND_ID_FASHIONFLOW">FashionFlow</option>
            <option value="BRAND_ID_HOMECOMFORT">HomeComfort</option>
            <option value="BRAND_ID_GOURMETGRUB">GourmetGrub</option>
          </select>
          <ChevronDown className="absolute right-2 top-2.5 text-gray-500 pointer-events-none" size={16} />
        </div>
      </header>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0">
                <Bot size={18} className="text-blue-600" />
              </div>
            )}
            <div className={`p-4 rounded-2xl shadow-sm max-w-[85%] text-sm leading-relaxed ${
              m.role === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-gray-500 text-sm italic pl-11">
            <Loader2 className="animate-spin" size={16} />Assistant is thinking...
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="relative flex items-center">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-4 pr-14 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            placeholder="Type your reply request here..."
            rows={1}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSubmit(); }}}
          />
          <button
            onClick={onSubmit}
            disabled={loading || !query.trim()}
            className="absolute right-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

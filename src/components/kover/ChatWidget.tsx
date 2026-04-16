"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, ShieldCheck } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Sou a Kova 👋 Posso te ajudar com dúvidas sobre os seguros e benefícios disponíveis. Como posso ajudar?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Desculpe, não consegui responder agora.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Erro de conexão. Tente novamente.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
      {open && (
        <div className="w-[340px] sm:w-[380px] md:w-[440px] bg-white rounded-[2rem] shadow-2xl border border-zinc-100 flex flex-col overflow-hidden" style={{ height: '580px' }}>
          {/* Header */}
          <div className="bg-primary px-6 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-black text-sm tracking-tight">Kova</p>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Assistente Kover</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-primary text-white rounded-br-sm'
                    : 'bg-zinc-50 text-zinc-800 rounded-bl-sm border border-zinc-100'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-zinc-50 border border-zinc-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-zinc-100 flex gap-2 shrink-0">
            <input
              className="flex-1 bg-zinc-50 rounded-xl px-4 py-3 text-sm font-medium outline-none border border-zinc-100 focus:border-primary transition-colors"
              placeholder="Digite sua dúvida..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="w-11 h-11 bg-primary hover:bg-primary/90 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30 transition-all hover:scale-105"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}

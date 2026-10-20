'use client';

import { useEffect, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { PROFILE } from '@/lib/profile';

const SUGGESTIONS = ['What services do you offer?', 'Tell me about myai', 'How can I contact you?'];

// The API replies with {"error": "..."}, so show that text if we can read it.
function friendlyError(error: Error) {
  try {
    return JSON.parse(error.message).error as string;
  } catch {
    return 'Sorry, something went wrong. Please try again in a moment.';
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const bottom = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });
  const busy = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, status]);

  const send = (text: string) => {
    if (!text.trim() || busy) return;
    sendMessage({ text: text.trim() });
    setInput('');
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Ask my AI'}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 font-medium shadow-lg shadow-blue-600/30 transition hover:bg-blue-700"
      >
        {open ? '✕' : '💬'}
        <span className="hidden sm:inline">{open ? 'Close' : 'Ask my AI'}</span>
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-4 left-4 z-50 flex h-[70vh] max-h-[560px] flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/95 shadow-2xl backdrop-blur-lg sm:left-auto sm:w-96">
          <div className="border-b border-neutral-800 px-4 py-3">
            <p className="font-semibold">Ask about {PROFILE.name.split(' ')[0]}</p>
            <p className="text-xs text-neutral-500">
              AI answers from my portfolio.
              {PROFILE.chatUrl && (
                <>
                  {' '}
                  <a href={PROFILE.chatUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    Open full AI chat ↗
                  </a>
                </>
              )}
            </p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-neutral-400">Hi! Ask me anything about my work, skills or services.</p>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="block w-full rounded-lg border border-neutral-800 px-3 py-2 text-left text-neutral-300 transition hover:border-blue-500"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 leading-relaxed ${
                    m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-100'
                  }`}
                >
                  {m.parts.map((p, i) => (p.type === 'text' ? <span key={i}>{p.text}</span> : null))}
                </div>
              </div>
            ))}

            {status === 'submitted' && <p className="text-neutral-500">Thinking…</p>}
            {error && <p className="text-red-400">{friendlyError(error)}</p>}
            <div ref={bottom} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2 border-t border-neutral-800 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={800}
              placeholder="Type your question…"
              className="flex-1 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="rounded-lg bg-blue-600 px-4 text-sm font-medium transition hover:bg-blue-700 disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

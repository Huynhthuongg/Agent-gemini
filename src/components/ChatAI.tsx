import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User, Loader2, AlertCircle } from 'lucide-react';
import Markdown from 'react-markdown';

export default function ChatAI() {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Thiếu API Key của Gemini. Vui lòng cấu hình biến môi trường VITE_GEMINI_API_KEY hoặc GEMINI_API_KEY.');
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // We use generateContentStream for a streaming effect
      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
      });

      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of responseStream) {
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.role === 'model') {
            lastMessage.text += chunk.text;
          }
          return newMessages;
        });
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setError(err.message || 'Đã xảy ra lỗi khi kết nối với AI.');
      // Remove the empty model message if it failed before streaming
      setMessages(prev => {
        if (prev[prev.length - 1].role === 'model' && prev[prev.length - 1].text === '') {
          return prev.slice(0, -1);
        }
        return prev;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-[#141414] border border-zinc-800/50 rounded-xl overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-zinc-800/50 bg-[#0A0A0A] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <Bot className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-200">Trợ lý AI (Gemini)</h3>
            <p className="text-[10px] text-emerald-400">Đang hoạt động</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
            <Bot className="w-12 h-12 opacity-20" />
            <p className="text-sm">Hãy đặt câu hỏi hoặc yêu cầu cho Trợ lý AI.</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              msg.role === 'user' 
                ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' 
                : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
            }`}>
              {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            <div className={`max-w-[80%] rounded-xl p-4 ${
              msg.role === 'user' 
                ? 'bg-blue-500/10 border border-blue-500/20 text-blue-100' 
                : 'bg-[#0A0A0A] border border-zinc-800/50 text-zinc-300'
            }`}>
              <div className="prose prose-invert prose-sm max-w-none">
                <Markdown>{msg.text}</Markdown>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-[#0A0A0A] border border-zinc-800/50 rounded-xl p-4 flex items-center gap-2 text-zinc-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Đang suy nghĩ...</span>
            </div>
          </div>
        )}
        
        {error && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 text-rose-400 text-sm">
              {error}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-zinc-800/50 bg-[#0A0A0A]">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Nhập tin nhắn cho AI..."
            className="w-full bg-[#141414] border border-zinc-800/50 rounded-xl pl-4 pr-12 py-3 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-600"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

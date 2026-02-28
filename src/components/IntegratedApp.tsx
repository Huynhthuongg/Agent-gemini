import { useState } from 'react';
import { Send, Bot, User, Paperclip, MoreVertical } from 'lucide-react';

export default function IntegratedApp() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: 'Xin chào! Tôi là trợ lý AI cho ứng dụng tích hợp này. Tôi có thể giúp gì cho bạn hôm nay?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: input }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        role: 'assistant', 
        content: 'Tôi đã nhận được yêu cầu của bạn và đang xử lý nó trong ngữ cảnh của ứng dụng tích hợp.' 
      }]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] w-full flex flex-col lg:flex-row gap-4">
      {/* Iframe Container */}
      <div className="flex-1 rounded-xl overflow-hidden border border-white/5 bg-[#0A0A0A] relative shadow-lg flex flex-col">
        <div className="w-full h-10 bg-[#141414]/80 backdrop-blur-md border-b border-white/5 flex items-center px-4 gap-2 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          <div className="mx-auto flex items-center gap-2 bg-[#0A0A0A] px-3 py-1 rounded-md border border-white/5 text-xs text-zinc-400 w-1/2 max-w-md justify-center truncate shadow-inner">
            <span className="text-emerald-400">https://</span>
            p_5psln36yl9a3t03lf3kyh.rork.live
          </div>
        </div>
        <div className="flex-1 relative bg-white">
          <iframe 
            src="https://p_5psln36yl9a3t03lf3kyh.rork.live/" 
            className="absolute inset-0 w-full h-full border-none"
            title="Integrated App"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      </div>

      {/* Chat Interface */}
      <div className="w-full lg:w-96 rounded-xl border border-white/5 bg-[#141414]/80 backdrop-blur-md shadow-lg flex flex-col shrink-0 h-[400px] lg:h-auto">
        {/* Chat Header */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Bot className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-200">Trợ lý Ứng dụng</h3>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Trực tuyến
              </p>
            </div>
          </div>
          <button className="text-zinc-400 hover:text-zinc-200 transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                msg.role === 'user' 
                  ? 'bg-blue-500/10 border-blue-500/20' 
                  : 'bg-emerald-500/10 border-emerald-500/20'
              }`}>
                {msg.role === 'user' ? (
                  <User className="w-4 h-4 text-blue-400" />
                ) : (
                  <Bot className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                msg.role === 'user'
                  ? 'bg-blue-500/10 text-blue-100 border border-blue-500/20 rounded-tr-sm'
                  : 'bg-[#0A0A0A] text-zinc-300 border border-white/5 rounded-tl-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-white/5 shrink-0 bg-[#0A0A0A]/50 rounded-b-xl">
          <div className="flex items-end gap-2 bg-[#141414] border border-white/5 rounded-xl p-2 focus-within:border-white/10 transition-colors shadow-inner">
            <button className="p-2 text-zinc-400 hover:text-zinc-200 transition-colors shrink-0">
              <Paperclip className="w-4 h-4" />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Nhắn tin cho trợ lý..."
              className="w-full bg-transparent border-none focus:ring-0 text-sm text-zinc-200 placeholder-zinc-500 resize-none max-h-32 min-h-[40px] py-2 outline-none"
              rows={1}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 border border-emerald-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] text-zinc-500">AI có thể mắc lỗi. Vui lòng kiểm tra lại thông tin quan trọng.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

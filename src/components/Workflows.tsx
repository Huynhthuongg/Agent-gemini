import { Workflow, Play, Settings, Plus, ArrowRight, BrainCircuit } from 'lucide-react';

export default function Workflows() {
  const workflows = [
    { name: 'Tóm tắt Họp giao ban Hàng ngày', trigger: 'Lịch trình', action: 'Tin nhắn Slack', status: 'Hoạt động', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { name: 'Đánh giá PR Mới', trigger: 'GitHub Webhook', action: 'CodeRabbit AI', status: 'Hoạt động', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { name: 'Phân loại Hỗ trợ Khách hàng', trigger: 'Nhận Email', action: 'Zendesk Ticket', status: 'Tạm dừng', color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { name: 'Thu thập Giá Đối thủ', trigger: 'Lịch trình', action: 'Firecrawl API', status: 'Hoạt động', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Động cơ Tự động hóa</h2>
          <p className="text-sm text-zinc-400 mt-1">Xây dựng và quản lý các luồng công việc do AI điều khiển (giống Zapier).</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-sm font-medium hover:bg-emerald-500/20 transition-colors whitespace-nowrap">
          <Plus className="w-4 h-4" />
          Luồng công việc mới
        </button>
      </div>

      <div className="bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl p-6 mb-8 shadow-lg overflow-x-auto">
        <h3 className="text-sm font-medium text-zinc-200 mb-6">Trình tạo Luồng công việc (Bản xem trước)</h3>
        <div className="flex items-center justify-center gap-4 py-8 min-w-[600px]">
          <div className="w-48 bg-[#0A0A0A] border border-white/5 rounded-lg p-4 flex flex-col items-center gap-2 shadow-md">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Workflow className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-xs font-medium text-zinc-300">Trình kích hoạt (Trigger)</span>
            <span className="text-[10px] text-zinc-500">GitHub Webhook</span>
          </div>
          
          <ArrowRight className="w-5 h-5 text-zinc-600 shrink-0" />
          
          <div className="w-48 bg-[#0A0A0A] border border-emerald-500/50 rounded-lg p-4 flex flex-col items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.1)] relative">
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <BrainCircuit className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-xs font-medium text-emerald-400">Quyết định AI</span>
            <span className="text-[10px] text-zinc-500 text-center">Phân tích thay đổi mã</span>
          </div>
          
          <ArrowRight className="w-5 h-5 text-zinc-600 shrink-0" />
          
          <div className="w-48 bg-[#0A0A0A] border border-white/5 rounded-lg p-4 flex flex-col items-center gap-2 shadow-md">
            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Settings className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-xs font-medium text-zinc-300">Hành động (Action)</span>
            <span className="text-[10px] text-zinc-500 text-center">Đăng bình luận PR</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {workflows.map((wf) => (
          <div key={wf.name} className="bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/10 transition-colors cursor-pointer group shadow-md">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${wf.bg} ${wf.color} border-white/5 shrink-0`}>
                <Workflow className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors">{wf.name}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-[10px] text-zinc-500 bg-[#0A0A0A] px-2 py-0.5 rounded border border-white/5">{wf.trigger}</span>
                  <ArrowRight className="w-3 h-3 text-zinc-600" />
                  <span className="text-[10px] text-zinc-500 bg-[#0A0A0A] px-2 py-0.5 rounded border border-white/5">{wf.action}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
              <span className={`text-[10px] uppercase tracking-wider font-medium ${wf.status === 'Hoạt động' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {wf.status}
              </span>
              <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5">
                <Play className="w-4 h-4 text-zinc-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

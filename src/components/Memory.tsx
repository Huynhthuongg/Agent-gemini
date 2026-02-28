import { Database, HardDrive, Network, History } from 'lucide-react';

export default function Memory() {
  const memoryLayers = [
    { name: 'Bộ nhớ Ngắn hạn', desc: 'Ngữ cảnh hiện tại, trạng thái tác vụ', icon: History, type: 'Redis', size: '2.4 GB', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { name: 'Bộ nhớ Dài hạn', desc: 'Sở thích người dùng, lịch sử tương tác', icon: HardDrive, type: 'PostgreSQL', size: '14.2 GB', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { name: 'Bộ nhớ Vector', desc: 'Tìm kiếm ngữ nghĩa, embeddings', icon: Database, type: 'Pinecone', size: '8.1 GB', color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { name: 'Đồ thị Tri thức', desc: 'Mối quan hệ, thực thể, sự kiện', icon: Network, type: 'Neo4j', size: '1.5 GB', color: 'text-amber-400', bg: 'bg-amber-400/10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Hệ thống Bộ nhớ</h2>
          <p className="text-sm text-zinc-400 mt-1">Kiến trúc lưu trữ đa tầng cho ngữ cảnh và tri thức AI.</p>
        </div>
        <button className="px-4 py-2 bg-zinc-800/50 text-zinc-300 border border-zinc-700/50 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors whitespace-nowrap">
          Xóa Ngữ cảnh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {memoryLayers.map((layer) => {
          const Icon = layer.icon;
          return (
            <div key={layer.name} className="bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl p-6 flex items-start gap-4 hover:border-white/10 transition-colors shadow-lg">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${layer.bg} ${layer.color} border-white/5`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-medium text-zinc-200">{layer.name}</h3>
                  <span className="text-xs font-mono text-zinc-500 bg-[#0A0A0A] px-2 py-0.5 rounded border border-white/5">{layer.size}</span>
                </div>
                <p className="text-sm text-zinc-400 mb-4">{layer.desc}</p>
                
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500">Backend:</span>
                  <span className={`text-[10px] uppercase tracking-wider ${layer.color} bg-[#0A0A0A] px-2 py-0.5 rounded border border-white/5`}>{layer.type}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-lg">
        <h3 className="text-sm font-medium text-zinc-200 mb-4">Trạng thái Cơ sở dữ liệu Vector (Pinecone)</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm p-2 rounded bg-[#0A0A0A] border border-white/5">
            <span className="text-zinc-400">Tổng số Vector</span>
            <span className="text-zinc-200 font-mono">1,245,892</span>
          </div>
          <div className="flex items-center justify-between text-sm p-2 rounded bg-[#0A0A0A] border border-white/5">
            <span className="text-zinc-400">Tên Index</span>
            <span className="text-zinc-200 font-mono">nexus-core-v1</span>
          </div>
          <div className="flex items-center justify-between text-sm p-2 rounded bg-[#0A0A0A] border border-white/5">
            <span className="text-zinc-400">Số chiều (Dimensions)</span>
            <span className="text-zinc-200 font-mono">1536 (OpenAI ada-002)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

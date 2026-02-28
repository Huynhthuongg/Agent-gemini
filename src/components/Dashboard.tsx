import { Brain, Code, Eye, LineChart as LineChartIcon, Network, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { epoch: 'E1', accuracy: 82, speed: 45 },
  { epoch: 'E2', accuracy: 85, speed: 52 },
  { epoch: 'E3', accuracy: 89, speed: 61 },
  { epoch: 'E4', accuracy: 91, speed: 75 },
  { epoch: 'E5', accuracy: 94, speed: 82 },
  { epoch: 'E6', accuracy: 96, speed: 89 },
];

export default function Dashboard({ liveMonitoring = false }: { liveMonitoring?: boolean }) {
  const models = [
    { name: 'Mô hình Suy luận', icon: Brain, status: 'Hoạt động', load: '45%', color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-500/20' },
    { name: 'Mô hình Lập trình', icon: Code, status: 'Hoạt động', load: '82%', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-500/20' },
    { name: 'Mô hình Lập kế hoạch', icon: Network, status: 'Chờ', load: '12%', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-500/20' },
    { name: 'Mô hình Thị giác', icon: Eye, status: 'Hoạt động', load: '34%', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-500/20' },
    { name: 'Mô hình Dữ liệu', icon: LineChartIcon, status: 'Hoạt động', load: '67%', color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-500/20' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-sm font-medium text-zinc-200 flex items-center gap-2">
              Lõi Não bộ AI (Bộ định tuyến Mô hình)
              {liveMonitoring && (
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                  Trực tiếp
                </span>
              )}
            </h3>
            <span className="text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-500/20 self-start sm:self-auto">Tự động định tuyến Đang hoạt động</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {models.map((model) => {
              const Icon = model.icon;
              return (
                <div key={model.name} className="bg-[#0A0A0A] border border-white/5 rounded-lg p-4 flex items-center gap-4 shadow-md hover:border-white/10 transition-colors group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${model.bg} ${model.color} ${model.border} shrink-0 relative z-10`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0 relative z-10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-zinc-200 truncate pr-2">{model.name}</span>
                      <span className="text-xs text-zinc-500 font-mono">{model.load}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className={`text-[10px] uppercase tracking-wider font-medium ${model.status === 'Hoạt động' ? 'text-emerald-400' : 'text-zinc-500'}`}>{model.status}</span>
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div className={`h-full ${model.bg.replace('/10', '/80')} shadow-[0_0_10px_currentColor]`} style={{ width: model.load }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-lg">
          <h3 className="text-sm font-medium text-zinc-200 mb-6">Phân rã Tác vụ</h3>
          <div className="space-y-4">
            <div className="relative pl-4 border-l border-white/10 pb-4">
              <div className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 -left-[5.5px] top-1.5 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <p className="text-xs text-zinc-400 mb-1">Đã nhận Tác vụ Người dùng</p>
              <p className="text-sm text-zinc-200 bg-[#0A0A0A] p-2 rounded border border-white/5 mt-2">"Xây dựng ứng dụng e-commerce full-stack"</p>
            </div>
            <div className="relative pl-4 border-l border-white/10 pb-4">
              <div className="absolute w-2.5 h-2.5 rounded-full bg-blue-400 -left-[5.5px] top-1.5 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
              <p className="text-xs text-zinc-400 mb-1">Phân tích Kế hoạch</p>
              <p className="text-sm text-zinc-200 mt-1">Chia thành 4 tác vụ phụ</p>
            </div>
            <div className="relative pl-4 border-l border-transparent">
              <div className="absolute w-2.5 h-2.5 rounded-full bg-purple-400 -left-[5.5px] top-1.5 animate-pulse shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
              <p className="text-xs text-zinc-400 mb-2">Các Đại lý Đang thực thi</p>
              <div className="space-y-2 bg-[#0A0A0A] p-3 rounded-lg border border-white/5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-300 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>DB Schema</span>
                  <span className="text-emerald-400 font-medium">Hoàn thành</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-300 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>API Routes</span>
                  <span className="text-blue-400 font-medium">Đang tiến hành</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>Frontend UI</span>
                  <span className="text-zinc-500 font-medium">Đang chờ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-sm font-medium text-zinc-200">Vòng lặp Tự cải thiện</h3>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs bg-[#0A0A0A] px-3 py-1.5 rounded-lg border border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
              <span className="text-zinc-300">Độ chính xác</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_5px_rgba(96,165,250,0.5)]" />
              <span className="text-zinc-300">Tốc độ Thực thi</span>
            </div>
          </div>
        </div>
        
        <div className="h-64 w-full bg-[#0A0A0A] rounded-lg border border-white/5 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="epoch" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(20, 20, 20, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                itemStyle={{ fontSize: '12px', fontWeight: 500 }}
                labelStyle={{ fontSize: '12px', color: '#a1a1aa', marginBottom: '4px' }}
              />
              <Line type="monotone" dataKey="accuracy" name="Độ chính xác" stroke="#34d399" strokeWidth={2} dot={{ r: 4, fill: '#141414', stroke: '#34d399', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#34d399', stroke: '#141414', strokeWidth: 2 }} />
              <Line type="monotone" dataKey="speed" name="Tốc độ" stroke="#60a5fa" strokeWidth={2} dot={{ r: 4, fill: '#141414', stroke: '#60a5fa', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#60a5fa', stroke: '#141414', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/5">
          <div className="text-center p-3 rounded-lg bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-colors">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Kế hoạch</div>
            <div className="text-xs font-medium text-zinc-300">Phân tích Tác vụ</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-colors">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Thực thi</div>
            <div className="text-xs font-medium text-zinc-300">Bầy đàn Đại lý</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-colors">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Đánh giá</div>
            <div className="text-xs font-medium text-zinc-300">Tự Gỡ lỗi</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
            <div className="text-[10px] text-emerald-500/70 uppercase tracking-wider mb-1">Cải thiện</div>
            <div className="text-xs font-medium text-emerald-400">Cập nhật Logic</div>
          </div>
        </div>
      </div>
    </div>
  );
}

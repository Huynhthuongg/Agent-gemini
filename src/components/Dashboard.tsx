import { useState, useEffect } from 'react';
import { Brain, Code, Eye, LineChart as LineChartIcon, Network, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  liveMonitoring?: boolean;
}

const performanceData = [
  { epoch: 'E1', accuracy: 82, speed: 45 },
  { epoch: 'E2', accuracy: 85, speed: 52 },
  { epoch: 'E3', accuracy: 89, speed: 61 },
  { epoch: 'E4', accuracy: 91, speed: 75 },
  { epoch: 'E5', accuracy: 94, speed: 82 },
  { epoch: 'E6', accuracy: 96, speed: 89 },
];

export default function Dashboard({ liveMonitoring = true }: DashboardProps) {
  const [stats, setStats] = useState({
    reasoning: 45,
    coding: 82,
    planning: 12,
    vision: 34,
    data: 67
  });

  useEffect(() => {
    if (!liveMonitoring) return;

    const interval = setInterval(() => {
      setStats(prev => ({
        reasoning: Math.min(100, Math.max(0, prev.reasoning + (Math.random() * 6 - 3))),
        coding: Math.min(100, Math.max(0, prev.coding + (Math.random() * 6 - 3))),
        planning: Math.min(100, Math.max(0, prev.planning + (Math.random() * 6 - 3))),
        vision: Math.min(100, Math.max(0, prev.vision + (Math.random() * 6 - 3))),
        data: Math.min(100, Math.max(0, prev.data + (Math.random() * 6 - 3))),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [liveMonitoring]);

  const models = [
    { name: 'Mô hình Suy luận', icon: Brain, status: 'Đang hoạt động', load: stats.reasoning, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-500/20' },
    { name: 'Mô hình Lập trình', icon: Code, status: 'Đang hoạt động', load: stats.coding, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-500/20' },
    { name: 'Mô hình Lập kế hoạch', icon: Network, status: 'Chờ (Standby)', load: stats.planning, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-500/20' },
    { name: 'Mô hình Thị giác', icon: Eye, status: 'Đang hoạt động', load: stats.vision, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-500/20' },
    { name: 'Mô hình Dữ liệu', icon: LineChartIcon, status: 'Đang hoạt động', load: stats.data, color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-500/20' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-medium text-zinc-200 flex items-center gap-2">
              Lõi AI (AI Brain Core)
              {liveMonitoring && <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" title="Giám sát trực tiếp đang bật"></span>}
            </h3>
            <span className="text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-500/20">Định tuyến tự động: BẬT</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {models.map((model) => {
              const Icon = model.icon;
              return (
                <div key={model.name} className="bg-[#0A0A0A] border border-white/5 rounded-lg p-4 flex items-center gap-4 hover:border-white/10 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${model.bg} ${model.color} ${model.border}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-zinc-200">{model.name}</span>
                      <span className="text-xs text-zinc-500">{model.load.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-500">{model.status}</span>
                      <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${model.load > 80 ? 'bg-rose-500/80' : model.load > 50 ? 'bg-amber-500/80' : 'bg-emerald-500/80'}`} 
                          style={{ width: `${model.load}%` }} 
                        />
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
            <div className="relative pl-4 border-l border-white/10">
              <div className="absolute w-2 h-2 rounded-full bg-emerald-400 -left-[4.5px] top-1.5 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              <p className="text-xs text-zinc-400 mb-1">Nhận Tác vụ từ Người dùng</p>
              <p className="text-sm text-zinc-200">"Xây dựng ứng dụng e-commerce full-stack"</p>
            </div>
            <div className="relative pl-4 border-l border-white/10">
              <div className="absolute w-2 h-2 rounded-full bg-blue-400 -left-[4.5px] top-1.5 shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
              <p className="text-xs text-zinc-400 mb-1">Phân tích Kế hoạch</p>
              <p className="text-sm text-zinc-200">Chia thành 4 tác vụ con</p>
            </div>
            <div className="relative pl-4 border-l border-white/10">
              <div className="absolute w-2 h-2 rounded-full bg-purple-400 -left-[4.5px] top-1.5 animate-pulse shadow-[0_0_8px_rgba(192,132,252,0.5)]" />
              <p className="text-xs text-zinc-400 mb-1">Các Agent đang thực thi</p>
              <div className="space-y-2 mt-2">
                <div className="flex items-center justify-between text-xs bg-[#0A0A0A] p-2 rounded border border-white/5">
                  <span className="text-zinc-300">DB Schema</span>
                  <span className="text-emerald-400">Hoàn thành</span>
                </div>
                <div className="flex items-center justify-between text-xs bg-blue-500/5 p-2 rounded border border-blue-500/20">
                  <span className="text-zinc-300">API Routes</span>
                  <span className="text-blue-400">Đang xử lý</span>
                </div>
                <div className="flex items-center justify-between text-xs bg-[#0A0A0A] p-2 rounded border border-white/5 opacity-50">
                  <span className="text-zinc-300">Frontend UI</span>
                  <span className="text-zinc-500">Chờ xử lý</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-medium text-zinc-200">Vòng lặp Tự cải thiện</h3>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-zinc-400">Độ chính xác</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-zinc-400">Tốc độ thực thi</span>
            </div>
          </div>
        </div>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="epoch" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                itemStyle={{ fontSize: '12px' }}
                labelStyle={{ fontSize: '12px', color: '#a1a1aa', marginBottom: '4px' }}
              />
              <Line type="monotone" dataKey="accuracy" stroke="#34d399" strokeWidth={2} dot={{ r: 4, fill: '#34d399', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="speed" stroke="#60a5fa" strokeWidth={2} dot={{ r: 4, fill: '#60a5fa', strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/5">
          <div className="text-center">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Lập kế hoạch</div>
            <div className="text-xs font-medium text-zinc-300">Phân tích Tác vụ</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Thực thi</div>
            <div className="text-xs font-medium text-zinc-300">Cụm Agent</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Đánh giá</div>
            <div className="text-xs font-medium text-zinc-300">Tự Debug</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Cải thiện</div>
            <div className="text-xs font-medium text-emerald-400">Cập nhật Logic</div>
          </div>
        </div>
      </div>
    </div>
  );
}

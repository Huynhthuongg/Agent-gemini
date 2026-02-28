import { Server, Terminal, Box, Activity, Clock } from 'lucide-react';

export default function Execution() {
  const containers = [
    { id: 'c-8f92a1', image: 'node:20-alpine', status: 'Đang chạy', cpu: '12%', mem: '256MB', task: 'Build Frontend' },
    { id: 'c-3b4e7c', image: 'python:3.11-slim', status: 'Đang chạy', cpu: '45%', mem: '1.2GB', task: 'Phân tích dữ liệu' },
    { id: 'c-1a2b3c', image: 'ubuntu:latest', status: 'Đã thoát', cpu: '0%', mem: '0MB', task: 'Quét bảo mật' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Động cơ Thực thi Đám mây</h2>
          <p className="text-sm text-zinc-400 mt-1">Môi trường sandbox và trình chạy tác vụ cho thực thi AI.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-500/20 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Cụm hoạt động tốt
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Server className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="text-sm font-medium text-zinc-200">Node Worker</h3>
          </div>
          <div className="text-3xl font-light text-zinc-100 mb-2 relative z-10">12 <span className="text-xl text-zinc-500">/ 16</span></div>
          <p className="text-xs text-zinc-500 relative z-10">Các node đang hoạt động trên 3 vùng</p>
        </div>
        
        <div className="bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Box className="w-4 h-4 text-purple-400" />
            </div>
            <h3 className="text-sm font-medium text-zinc-200">Sandbox Đang hoạt động</h3>
          </div>
          <div className="text-3xl font-light text-zinc-100 mb-2 relative z-10">48</div>
          <p className="text-xs text-zinc-500 relative z-10">Môi trường thực thi bị cô lập</p>
        </div>
        
        <div className="bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-sm font-medium text-zinc-200">Hàng đợi Tác vụ</h3>
          </div>
          <div className="text-3xl font-light text-zinc-100 mb-2 relative z-10">142</div>
          <p className="text-xs text-zinc-500 relative z-10">Các tác vụ đang chờ thực thi</p>
        </div>
      </div>

      <div className="bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#0A0A0A]">
          <h3 className="text-sm font-medium text-zinc-200 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-zinc-400" />
            Container Sandbox Trực tiếp
          </h3>
        </div>
        
        <div className="divide-y divide-white/5">
          {containers.map((container) => (
            <div key={container.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition-colors group">
              <div className="flex items-start sm:items-center gap-4">
                <div className={`w-2 h-2 rounded-full mt-1.5 sm:mt-0 shrink-0 ${container.status === 'Đang chạy' ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-zinc-600'}`} />
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm font-mono text-zinc-200 group-hover:text-white transition-colors">{container.id}</span>
                    <span className="text-[10px] text-zinc-500 bg-[#0A0A0A] px-1.5 py-0.5 rounded border border-white/5">{container.image}</span>
                  </div>
                  <p className="text-xs text-zinc-400">{container.task}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 sm:gap-8 ml-6 sm:ml-0">
                <div className="text-left sm:text-right">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">CPU</div>
                  <div className="text-xs font-mono text-zinc-300">{container.cpu}</div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">MEM</div>
                  <div className="text-xs font-mono text-zinc-300">{container.mem}</div>
                </div>
                <div className="text-right w-20 shrink-0">
                  <span className={`text-[10px] uppercase tracking-wider font-medium ${container.status === 'Đang chạy' ? 'text-emerald-400' : 'text-zinc-500'}`}>
                    {container.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Shield, Code, Search, Zap, Database, Settings, UserCheck, Activity, PauseCircle, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Agents() {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'idle'>('all');

  const agents = [
    { name: 'Đại lý Chỉ huy', role: 'Điều phối viên', icon: UserCheck, status: 'Nghỉ', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-500/20' },
    { name: 'Đại lý Lập trình', role: 'Code & Build', icon: Code, status: 'Đang làm việc', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-500/20' },
    { name: 'Đại lý Nghiên cứu', role: 'Thu thập Dữ liệu', icon: Search, status: 'Nghỉ', color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-500/20' },
    { name: 'Đại lý Tự động hóa', role: 'Quy trình làm việc', icon: Zap, status: 'Đang làm việc', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-500/20' },
    { name: 'Đại lý Bảo mật', role: 'Kiểm toán & Xác thực', icon: Shield, status: 'Đang giám sát', color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-500/20' },
    { name: 'Đại lý Dữ liệu', role: 'DB & Phân tích', icon: Database, status: 'Nghỉ', color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-500/20' },
    { name: 'Đại lý Hệ thống', role: 'Hạ tầng & Triển khai', icon: Settings, status: 'Nghỉ', color: 'text-zinc-400', bg: 'bg-zinc-400/10', border: 'border-zinc-500/20' },
  ];

  const filteredAgents = agents.filter(agent => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return agent.status === 'Đang làm việc' || agent.status === 'Đang giám sát';
    if (activeTab === 'idle') return agent.status === 'Nghỉ';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Hệ thống Đa Đại lý</h2>
          <p className="text-sm text-zinc-400 mt-1">Các đại lý tự trị với vai trò và quyền hạn cụ thể.</p>
        </div>
        <button className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-sm font-medium hover:bg-emerald-500/20 transition-colors whitespace-nowrap shadow-sm">
          + Tạo Đại lý Tùy chỉnh
        </button>
      </div>

      {/* Nested Tabs */}
      <div className="bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl p-1.5 inline-flex mb-6 shadow-sm overflow-x-auto max-w-full">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'all' ? 'bg-white/10 text-white shadow-sm border border-white/5' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
          }`}
        >
          <Users className="w-4 h-4" />
          Tất cả Đại lý
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'active' ? 'bg-white/10 text-white shadow-sm border border-white/5' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
          }`}
        >
          <Activity className="w-4 h-4" />
          Hoạt động
        </button>
        <button
          onClick={() => setActiveTab('idle')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'idle' ? 'bg-white/10 text-white shadow-sm border border-white/5' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
          }`}
        >
          <PauseCircle className="w-4 h-4" />
          Nghỉ
        </button>
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredAgents.map((agent) => {
            const Icon = agent.icon;
            const isWorking = agent.status === 'Đang làm việc' || agent.status === 'Đang giám sát';
            return (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={agent.name} 
                className="bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${agent.bg} ${agent.color} ${agent.border} shadow-inner`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#0A0A0A] px-2 py-1 rounded-full border border-white/5">
                    <span className={`w-2 h-2 rounded-full ${isWorking ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-600'}`} />
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">{agent.status}</span>
                  </div>
                </div>
                
                <h3 className="text-base font-medium text-zinc-200 mb-1 group-hover:text-emerald-400 transition-colors relative z-10">{agent.name}</h3>
                <p className="text-xs text-zinc-500 mb-4 relative z-10">{agent.role}</p>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs relative z-10">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Shield className="w-3 h-3" />
                    Quyền hạn
                  </span>
                  <span className="text-zinc-300 font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5 group-hover:bg-white/10 transition-colors">Xem chi tiết</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

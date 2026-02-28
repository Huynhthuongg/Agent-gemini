import { useState } from 'react';
import { Shield, Code, Search, Zap, Database, Settings, UserCheck, Activity, PauseCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Agents() {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'idle'>('all');

  const agents = [
    { name: 'Commander Agent', role: 'Orchestrator', icon: UserCheck, status: 'Idle', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-500/20' },
    { name: 'Developer Agent', role: 'Code & Build', icon: Code, status: 'Working', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-500/20' },
    { name: 'Research Agent', role: 'Data Gathering', icon: Search, status: 'Idle', color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-500/20' },
    { name: 'Automation Agent', role: 'Workflows', icon: Zap, status: 'Working', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-500/20' },
    { name: 'Security Agent', role: 'Audit & Auth', icon: Shield, status: 'Monitoring', color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-500/20' },
    { name: 'Data Agent', role: 'DB & Analytics', icon: Database, status: 'Idle', color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-500/20' },
    { name: 'System Agent', role: 'Infra & Deploy', icon: Settings, status: 'Idle', color: 'text-zinc-400', bg: 'bg-zinc-400/10', border: 'border-zinc-500/20' },
  ];

  const filteredAgents = agents.filter(agent => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return agent.status === 'Working' || agent.status === 'Monitoring';
    if (activeTab === 'idle') return agent.status === 'Idle';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Multi-Agent System</h2>
          <p className="text-sm text-zinc-400 mt-1">Autonomous agents with specific roles and permissions.</p>
        </div>
        <button className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-sm font-medium hover:bg-emerald-500/20 transition-colors whitespace-nowrap">
          + Create Custom Agent
        </button>
      </div>

      {/* Nested Tabs */}
      <div className="bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl p-1.5 inline-flex mb-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            activeTab === 'all' ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
          }`}
        >
          <Users className="w-4 h-4" />
          All Agents
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            activeTab === 'active' ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
          }`}
        >
          <Activity className="w-4 h-4" />
          Active
        </button>
        <button
          onClick={() => setActiveTab('idle')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            activeTab === 'idle' ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
          }`}
        >
          <PauseCircle className="w-4 h-4" />
          Idle
        </button>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredAgents.map((agent) => {
            const Icon = agent.icon;
            const isWorking = agent.status === 'Working' || agent.status === 'Monitoring';
            return (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={agent.name} 
                className="bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors cursor-pointer group shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${agent.bg} ${agent.color} ${agent.border}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isWorking ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-600'}`} />
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{agent.status}</span>
                  </div>
                </div>
                
                <h3 className="text-base font-medium text-zinc-200 mb-1 group-hover:text-emerald-400 transition-colors">{agent.name}</h3>
                <p className="text-xs text-zinc-500 mb-4">{agent.role}</p>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Permissions</span>
                  <span className="text-zinc-300 font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">View Details</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// Need to import Users for the tabs
import { Users } from 'lucide-react';

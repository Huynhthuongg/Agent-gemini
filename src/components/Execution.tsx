import { Server, Terminal, Box, Activity, Clock } from 'lucide-react';

export default function Execution() {
  const containers = [
    { id: 'c-8f92a1', image: 'node:20-alpine', status: 'Running', cpu: '12%', mem: '256MB', task: 'Build Frontend' },
    { id: 'c-3b4e7c', image: 'python:3.11-slim', status: 'Running', cpu: '45%', mem: '1.2GB', task: 'Data Analysis' },
    { id: 'c-1a2b3c', image: 'ubuntu:latest', status: 'Exited', cpu: '0%', mem: '0MB', task: 'Security Scan' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Cloud Execution Engine</h2>
          <p className="text-sm text-zinc-400 mt-1">Sandbox environments and task runners for AI execution.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-500/20">
            Cluster Healthy
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#141414] border border-zinc-800/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Server className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-medium text-zinc-200">Worker Nodes</h3>
          </div>
          <div className="text-3xl font-light text-zinc-100 mb-2">12 / 16</div>
          <p className="text-xs text-zinc-500">Nodes active across 3 zones</p>
        </div>
        
        <div className="bg-[#141414] border border-zinc-800/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Box className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-medium text-zinc-200">Active Sandboxes</h3>
          </div>
          <div className="text-3xl font-light text-zinc-100 mb-2">48</div>
          <p className="text-xs text-zinc-500">Isolated execution environments</p>
        </div>
        
        <div className="bg-[#141414] border border-zinc-800/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-medium text-zinc-200">Job Queue</h3>
          </div>
          <div className="text-3xl font-light text-zinc-100 mb-2">142</div>
          <p className="text-xs text-zinc-500">Tasks pending execution</p>
        </div>
      </div>

      <div className="bg-[#141414] border border-zinc-800/50 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-zinc-800/50 flex items-center justify-between bg-[#0A0A0A]">
          <h3 className="text-sm font-medium text-zinc-200 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-zinc-400" />
            Live Sandbox Containers
          </h3>
        </div>
        
        <div className="divide-y divide-zinc-800/50">
          {containers.map((container) => (
            <div key={container.id} className="p-4 flex items-center justify-between hover:bg-zinc-800/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${container.status === 'Running' ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`} />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-mono text-zinc-200">{container.id}</span>
                    <span className="text-[10px] text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">{container.image}</span>
                  </div>
                  <p className="text-xs text-zinc-400">{container.task}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">CPU</div>
                  <div className="text-xs font-mono text-zinc-300">{container.cpu}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">MEM</div>
                  <div className="text-xs font-mono text-zinc-300">{container.mem}</div>
                </div>
                <div className="text-right w-16">
                  <span className={`text-[10px] uppercase tracking-wider ${container.status === 'Running' ? 'text-emerald-400' : 'text-zinc-500'}`}>
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

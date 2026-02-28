import { ShieldAlert, Lock, CheckCircle, AlertTriangle, Key } from 'lucide-react';

export default function Security() {
  const permissions = [
    { id: 1, agent: 'Developer Agent', action: 'Write to /src/components', status: 'Approved', time: '2 mins ago' },
    { id: 2, agent: 'System Agent', action: 'Deploy to AWS Production', status: 'Pending', time: 'Just now' },
    { id: 3, agent: 'Data Agent', action: 'Read from Production DB', status: 'Denied', time: '1 hour ago' },
    { id: 4, agent: 'Automation Agent', action: 'Execute arbitrary script', status: 'Pending', time: '5 mins ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Security & Permissions</h2>
          <p className="text-sm text-zinc-400 mt-1">Human-in-the-loop approvals and audit logs.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-zinc-800/50 text-zinc-300 border border-zinc-700/50 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors">
            Audit Logs
          </button>
          <button className="px-4 py-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg text-sm font-medium hover:bg-rose-500/20 transition-colors">
            Emergency Stop
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#141414] border border-zinc-800/50 rounded-xl p-6">
            <h3 className="text-sm font-medium text-zinc-200 mb-6">Pending Approvals</h3>
            <div className="space-y-3">
              {permissions.filter(p => p.status === 'Pending').map((req) => (
                <div key={req.id} className="bg-[#0A0A0A] border border-amber-500/20 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-zinc-200">{req.agent}</h4>
                      <p className="text-xs text-zinc-400">Requests: <span className="text-zinc-300">{req.action}</span></p>
                      <span className="text-[10px] text-zinc-500">{req.time}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-xs font-medium hover:bg-emerald-500/20 transition-colors">
                      Approve
                    </button>
                    <button className="px-3 py-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded text-xs font-medium hover:bg-rose-500/20 transition-colors">
                      Deny
                    </button>
                  </div>
                </div>
              ))}
              {permissions.filter(p => p.status === 'Pending').length === 0 && (
                <div className="text-center py-8 text-zinc-500 text-sm">No pending approvals.</div>
              )}
            </div>
          </div>

          <div className="bg-[#141414] border border-zinc-800/50 rounded-xl p-6">
            <h3 className="text-sm font-medium text-zinc-200 mb-6">Recent Activity</h3>
            <div className="space-y-3">
              {permissions.filter(p => p.status !== 'Pending').map((req) => (
                <div key={req.id} className="bg-[#0A0A0A] border border-zinc-800/50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                      req.status === 'Approved' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    }`}>
                      {req.status === 'Approved' ? <CheckCircle className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-zinc-200">{req.agent}</h4>
                      <p className="text-xs text-zinc-400">{req.action}</p>
                      <span className="text-[10px] text-zinc-500">{req.time}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    req.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#141414] border border-zinc-800/50 rounded-xl p-6">
            <h3 className="text-sm font-medium text-zinc-200 mb-4">Security Policies</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm text-zinc-300">Require Human Approval</span>
                </div>
                <div className="w-8 h-4 bg-emerald-500/20 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-0.5 w-3 h-3 bg-emerald-400 rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm text-zinc-300">Strict Sandbox Mode</span>
                </div>
                <div className="w-8 h-4 bg-emerald-500/20 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-0.5 w-3 h-3 bg-emerald-400 rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm text-zinc-300">Rate Limiting</span>
                </div>
                <div className="w-8 h-4 bg-emerald-500/20 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-0.5 w-3 h-3 bg-emerald-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

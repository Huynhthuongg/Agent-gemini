import { ShieldAlert, Lock, CheckCircle, AlertTriangle, Key } from 'lucide-react';

export default function Security({ advancedSecurity = false }: { advancedSecurity?: boolean }) {
  const permissions = [
    { id: 1, agent: 'Đại lý Lập trình', action: 'Ghi vào /src/components', status: 'Đã phê duyệt', time: '2 phút trước' },
    { id: 2, agent: 'Đại lý Hệ thống', action: 'Triển khai lên AWS Production', status: 'Chờ xử lý', time: 'Vừa xong' },
    { id: 3, agent: 'Đại lý Dữ liệu', action: 'Đọc từ DB Production', status: 'Bị từ chối', time: '1 giờ trước' },
    { id: 4, agent: 'Đại lý Tự động hóa', action: 'Thực thi script tùy ý', status: 'Chờ xử lý', time: '5 phút trước' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            Bảo mật & Quyền truy cập
            {advancedSecurity && (
              <span className="text-[10px] uppercase tracking-wider text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded border border-purple-500/20">
                Nâng cao
              </span>
            )}
          </h2>
          <p className="text-sm text-zinc-400 mt-1">Phê duyệt có sự tham gia của con người và nhật ký kiểm toán.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-white/5 text-zinc-300 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors shadow-sm">
            Nhật ký Kiểm toán
          </button>
          <button className="px-4 py-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg text-sm font-medium hover:bg-rose-500/20 transition-colors shadow-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Dừng Khẩn cấp
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-lg">
            <h3 className="text-sm font-medium text-zinc-200 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Phê duyệt Chờ xử lý
            </h3>
            <div className="space-y-3">
              {permissions.filter(p => p.status === 'Chờ xử lý').map((req) => (
                <div key={req.id} className="bg-[#0A0A0A] border border-amber-500/20 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex items-start sm:items-center gap-4 relative z-10">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shrink-0">
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-zinc-200">{req.agent}</h4>
                      <p className="text-xs text-zinc-400 mt-0.5">Yêu cầu: <span className="text-zinc-300 font-medium">{req.action}</span></p>
                      <span className="text-[10px] text-zinc-500 mt-1 block">{req.time}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 relative z-10 w-full sm:w-auto mt-2 sm:mt-0">
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-medium hover:bg-emerald-500/20 transition-colors">
                      Phê duyệt
                    </button>
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-medium hover:bg-rose-500/20 transition-colors">
                      Từ chối
                    </button>
                  </div>
                </div>
              ))}
              {permissions.filter(p => p.status === 'Chờ xử lý').length === 0 && (
                <div className="text-center py-8 text-zinc-500 text-sm bg-[#0A0A0A] rounded-lg border border-white/5">Không có phê duyệt nào đang chờ.</div>
              )}
            </div>
          </div>

          <div className="bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-lg">
            <h3 className="text-sm font-medium text-zinc-200 mb-6 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-zinc-400" />
              Hoạt động Gần đây
            </h3>
            <div className="space-y-3">
              {permissions.filter(p => p.status !== 'Chờ xử lý').map((req) => (
                <div key={req.id} className="bg-[#0A0A0A] border border-white/5 rounded-lg p-4 flex items-center justify-between shadow-sm hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border shrink-0 ${
                      req.status === 'Đã phê duyệt' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    }`}>
                      {req.status === 'Đã phê duyệt' ? <CheckCircle className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-zinc-200">{req.agent}</h4>
                      <p className="text-xs text-zinc-400 mt-0.5">{req.action}</p>
                      <span className="text-[10px] text-zinc-500 mt-1 block">{req.time}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded border shrink-0 ${
                    req.status === 'Đã phê duyệt' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-lg">
            <h3 className="text-sm font-medium text-zinc-200 mb-6 flex items-center gap-2">
              <Key className="w-4 h-4 text-zinc-400" />
              Chính sách Bảo mật
            </h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
                    <Key className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div>
                    <span className="text-sm text-zinc-200 block">Yêu cầu Phê duyệt</span>
                    <span className="text-[10px] text-zinc-500">Từ con người</span>
                  </div>
                </div>
                <div className="w-10 h-5 bg-emerald-500/20 rounded-full relative cursor-pointer border border-emerald-500/30 shadow-inner">
                  <div className="absolute right-1 top-0.5 w-4 h-4 bg-emerald-400 rounded-full shadow-md" />
                </div>
              </div>
              
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
                    <ShieldAlert className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div>
                    <span className="text-sm text-zinc-200 block">Chế độ Sandbox</span>
                    <span className="text-[10px] text-zinc-500">Nghiêm ngặt</span>
                  </div>
                </div>
                <div className="w-10 h-5 bg-emerald-500/20 rounded-full relative cursor-pointer border border-emerald-500/30 shadow-inner">
                  <div className="absolute right-1 top-0.5 w-4 h-4 bg-emerald-400 rounded-full shadow-md" />
                </div>
              </div>
              
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
                    <Lock className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div>
                    <span className="text-sm text-zinc-200 block">Giới hạn Tốc độ</span>
                    <span className="text-[10px] text-zinc-500">API & Tác vụ</span>
                  </div>
                </div>
                <div className="w-10 h-5 bg-emerald-500/20 rounded-full relative cursor-pointer border border-emerald-500/30 shadow-inner">
                  <div className="absolute right-1 top-0.5 w-4 h-4 bg-emerald-400 rounded-full shadow-md" />
                </div>
              </div>

              {advancedSecurity && (
                <div className="flex items-center justify-between group pt-4 border-t border-white/5 mt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/30 transition-colors">
                      <ShieldAlert className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <span className="text-sm text-purple-300 block">Bảo vệ Nâng cao</span>
                      <span className="text-[10px] text-purple-400/60">Phân tích hành vi AI</span>
                    </div>
                  </div>
                  <div className="w-10 h-5 bg-purple-500/20 rounded-full relative cursor-pointer border border-purple-500/30 shadow-inner">
                    <div className="absolute right-1 top-0.5 w-4 h-4 bg-purple-400 rounded-full shadow-md animate-pulse" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

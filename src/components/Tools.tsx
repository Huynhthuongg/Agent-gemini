import { Terminal, Globe, Folder, Cloud, Database, Cpu } from 'lucide-react';

export default function Tools() {
  const tools = [
    { name: 'Công cụ Terminal', icon: Terminal, desc: 'Thực thi lệnh shell, chạy script và quản lý tiến trình.', status: 'Đã kết nối' },
    { name: 'Công cụ Trình duyệt', icon: Globe, desc: 'Thu thập dữ liệu, tương tác với trang web và trích xuất nội dung.', status: 'Đã kết nối' },
    { name: 'Hệ thống Tệp', icon: Folder, desc: 'Đọc, ghi và sửa đổi các tệp và thư mục cục bộ.', status: 'Đã kết nối' },
    { name: 'Công cụ API', icon: Cloud, desc: 'Thực hiện các yêu cầu HTTP, tương tác với REST/GraphQL APIs.', status: 'Đã kết nối' },
    { name: 'Công cụ Đám mây', icon: Cloud, desc: 'Triển khai lên AWS, GCP, Azure, hoặc Vercel/Netlify.', status: 'Đã kết nối' },
    { name: 'Công cụ Cơ sở dữ liệu', icon: Database, desc: 'Truy vấn SQL/NoSQL, quản lý schema.', status: 'Đã kết nối' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#141414]/80 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-medium text-zinc-200">Công cụ Hệ thống & Tích hợp</h3>
          <span className="text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-500/20">Tất cả hoạt động tốt</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div key={tool.name} className="bg-[#0A0A0A] border border-white/5 rounded-lg p-5 hover:border-white/10 transition-colors cursor-pointer shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                    <Icon className="w-5 h-5 text-zinc-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-200">{tool.name}</h4>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      {tool.status}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">{tool.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BrainCircuit, 
  Users, 
  Database, 
  Wrench, 
  Workflow, 
  Server, 
  ShieldAlert, 
  LayoutDashboard,
  Terminal,
  Activity,
  Menu,
  X,
  Globe,
  MessageSquare,
  Settings as SettingsIcon,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Agents from './components/Agents';
import Memory from './components/Memory';
import Workflows from './components/Workflows';
import Execution from './components/Execution';
import Tools from './components/Tools';
import Security from './components/Security';
import IntegratedApp from './components/IntegratedApp';
import ChatAI from './components/ChatAI';

type View = 'dashboard' | 'agents' | 'memory' | 'tools' | 'workflows' | 'execution' | 'security' | 'integrated' | 'chat';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Feature Flags
  const [flags, setFlags] = useState({
    experimentalChat: true,
    liveMonitoring: true,
    advancedSecurity: false
  });

  const navItems = [
    { id: 'dashboard', label: 'Lõi AI (Brain)', icon: LayoutDashboard },
    { id: 'agents', label: 'Hệ thống Đa Tác vụ', icon: Users },
    { id: 'memory', label: 'Hệ thống Bộ nhớ', icon: Database },
    { id: 'tools', label: 'Công cụ & Tích hợp', icon: Wrench },
    { id: 'workflows', label: 'Động cơ Tự động hóa', icon: Workflow },
    { id: 'execution', label: 'Cụm Thực thi', icon: Server },
    { id: 'security', label: 'Lớp Bảo mật', icon: ShieldAlert },
    { id: 'integrated', label: 'Ứng dụng Tích hợp', icon: Globe },
    ...(flags.experimentalChat ? [{ id: 'chat', label: 'Trợ lý AI (Chat)', icon: MessageSquare }] : []),
  ];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard liveMonitoring={flags.liveMonitoring} />;
      case 'agents': return <Agents />;
      case 'memory': return <Memory />;
      case 'tools': return <Tools />;
      case 'workflows': return <Workflows />;
      case 'execution': return <Execution />;
      case 'security': return <Security advanced={flags.advancedSecurity} />;
      case 'integrated': return <IntegratedApp />;
      case 'chat': return <ChatAI />;
      default: return <div className="p-8 text-zinc-400">Module đang được xây dựng...</div>;
    }
  };

  const handleNavClick = (id: View) => {
    setCurrentView(id);
    setIsMobileMenuOpen(false);
  };

  const toggleFlag = (key: keyof typeof flags) => {
    setFlags(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex h-screen bg-[#050505] text-zinc-100 font-sans overflow-hidden relative">
      {/* Smoke Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-emerald-500/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[80%] rounded-full bg-blue-500/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute -bottom-[20%] left-[20%] w-[80%] h-[60%] rounded-full bg-purple-500/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <div className="bg-[#141414] border border-zinc-800/50 rounded-xl p-6 w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-zinc-100">Cài đặt Tính năng (Feature Flags)</h3>
                <button onClick={() => setIsSettingsOpen(false)} className="text-zinc-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-lg border border-zinc-800/50">
                  <div>
                    <h4 className="text-sm font-medium text-zinc-200">Trợ lý AI Chat</h4>
                    <p className="text-xs text-zinc-500">Bật/tắt module giao tiếp trực tiếp với AI.</p>
                  </div>
                  <button onClick={() => toggleFlag('experimentalChat')} className="text-emerald-400">
                    {flags.experimentalChat ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-zinc-600" />}
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-lg border border-zinc-800/50">
                  <div>
                    <h4 className="text-sm font-medium text-zinc-200">Giám sát Thời gian thực</h4>
                    <p className="text-xs text-zinc-500">Cập nhật trạng thái Dashboard liên tục.</p>
                  </div>
                  <button onClick={() => toggleFlag('liveMonitoring')} className="text-emerald-400">
                    {flags.liveMonitoring ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-zinc-600" />}
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-lg border border-zinc-800/50">
                  <div>
                    <h4 className="text-sm font-medium text-zinc-200">Bảo mật Nâng cao</h4>
                    <p className="text-xs text-zinc-500">Bật các quy tắc kiểm duyệt khắt khe hơn.</p>
                  </div>
                  <button onClick={() => toggleFlag('advancedSecurity')} className="text-emerald-400">
                    {flags.advancedSecurity ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-zinc-600" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 border-r border-white/5 bg-[#0A0A0A]/80 backdrop-blur-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <BrainCircuit className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="font-semibold text-sm tracking-wide">NEXUS CORE</h1>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Super AI v1</p>
            </div>
          </div>
          <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id as View)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 ${
                  isActive 
                    ? 'bg-white/10 text-white font-medium shadow-sm border border-white/5' 
                    : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'text-zinc-500'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="bg-black/40 rounded-lg p-3 border border-white/5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400">Trạng thái Hệ thống</span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
                ONLINE
              </span>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-zinc-500">Tải CPU</span>
                  <span className="text-zinc-300">24%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500/50 to-emerald-400/80 w-[24%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-zinc-500">Bộ nhớ</span>
                  <span className="text-zinc-300">64GB / 128GB</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500/50 to-blue-400/80 w-[50%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 md:px-6 bg-[#0A0A0A]/40 backdrop-blur-xl z-20">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-medium text-zinc-200">
              {navItems.find(i => i.id === currentView)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSettingsOpen(true)} className="text-zinc-400 hover:text-zinc-200 transition-colors hidden sm:block" title="Cài đặt Tính năng">
              <SettingsIcon className="w-4 h-4" />
            </button>
            <button className="text-zinc-400 hover:text-zinc-200 transition-colors hidden sm:block">
              <Terminal className="w-4 h-4" />
            </button>
            <button className="text-zinc-400 hover:text-zinc-200 transition-colors">
              <Activity className="w-4 h-4" />
            </button>
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-blue-500 shadow-[0_0_10px_rgba(16,185,129,0.3)] border border-white/20" />
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full max-w-7xl mx-auto"
          >
            {renderView()}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

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
  Github,
  LogOut
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Agents from './components/Agents';
import Memory from './components/Memory';
import Workflows from './components/Workflows';
import Execution from './components/Execution';
import Tools from './components/Tools';
import Security from './components/Security';
import IntegratedApp from './components/IntegratedApp';

type View = 'dashboard' | 'agents' | 'memory' | 'tools' | 'workflows' | 'execution' | 'security' | 'integrated';

interface User {
  name: string;
  role: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        setUser(event.data.user);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleLogin = async (provider: string) => {
    try {
      const response = await fetch(`/api/auth/url?provider=${provider}`);
      if (!response.ok) throw new Error('Failed to get auth URL');
      const { url } = await response.json();
      
      window.open(
        url,
        'oauth_popup',
        'width=600,height=700'
      );
    } catch (error) {
      console.error('Login error:', error);
      // Fallback for demo purposes if backend is not ready
      setUser({ name: 'Admin User', role: 'admin' });
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const navItems = [
    { id: 'dashboard', label: 'Não bộ AI', icon: LayoutDashboard },
    { id: 'agents', label: 'Hệ thống Đa Đại lý', icon: Users },
    { id: 'memory', label: 'Hệ thống Bộ nhớ', icon: Database },
    { id: 'tools', label: 'Công cụ & Tích hợp', icon: Wrench },
    { id: 'workflows', label: 'Động cơ Tự động hóa', icon: Workflow },
    { id: 'execution', label: 'Cụm Thực thi', icon: Server },
    { id: 'security', label: 'Lớp Bảo mật', icon: ShieldAlert },
    { id: 'integrated', label: 'Ứng dụng Tích hợp', icon: Globe },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'agents': return <Agents />;
      case 'memory': return <Memory />;
      case 'tools': return <Tools />;
      case 'workflows': return <Workflows />;
      case 'execution': return <Execution />;
      case 'security': return <Security />;
      case 'integrated': return <IntegratedApp />;
      default: return <div className="p-8 text-zinc-400">Mô-đun đang được xây dựng...</div>;
    }
  };

  const handleNavClick = (id: View) => {
    setCurrentView(id);
    setIsMobileMenuOpen(false);
  };

  if (!user) {
    return (
      <div className="flex h-screen bg-[#050505] text-zinc-100 font-sans items-center justify-center relative overflow-hidden">
        {/* Smoke Background Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-emerald-500/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute top-[20%] -right-[10%] w-[60%] h-[80%] rounded-full bg-blue-500/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }} />
          <div className="absolute -bottom-[20%] left-[20%] w-[80%] h-[60%] rounded-full bg-purple-500/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/10 p-8 rounded-2xl shadow-2xl z-10 w-full max-w-md"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)] mb-4">
              <BrainCircuit className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Super AI System</h1>
            <p className="text-sm text-zinc-400 mt-2 text-center">AI Operating System + AI Developer + Automation Platform</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => handleLogin('google')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-black rounded-xl font-medium hover:bg-zinc-200 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Đăng nhập với Google
            </button>
            <button 
              onClick={() => handleLogin('github')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#24292F] text-white rounded-xl font-medium hover:bg-[#24292F]/80 transition-colors border border-white/10"
            >
              <Github className="w-5 h-5" />
              Đăng nhập với GitHub
            </button>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-xs text-zinc-500">Bằng cách đăng nhập, bạn đồng ý với Điều khoản Dịch vụ và Chính sách Bảo mật của chúng tôi.</p>
          </div>
        </motion.div>
      </div>
    );
  }

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

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 border-r border-white/5 bg-[#0A0A0A]/80 backdrop-blur-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
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
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'text-zinc-500'}`} />
                <span className="truncate">{item.label}</span>
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
                TRỰC TUYẾN
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
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10 w-full">
        <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 md:px-6 bg-[#0A0A0A]/40 backdrop-blur-xl z-20 shrink-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-medium text-zinc-200 truncate max-w-[200px] sm:max-w-none">
              {navItems.find(i => i.id === currentView)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <button className="text-zinc-400 hover:text-zinc-200 transition-colors hidden sm:block">
              <Terminal className="w-4 h-4" />
            </button>
            <button className="text-zinc-400 hover:text-zinc-200 transition-colors">
              <Activity className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-zinc-200">{user.name}</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{user.role}</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-blue-500 shadow-[0_0_10px_rgba(16,185,129,0.3)] border border-white/20 flex items-center justify-center text-white font-bold text-xs">
                {user.name.charAt(0)}
              </div>
              <button 
                onClick={handleLogout}
                className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors"
                title="Đăng xuất"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 w-full relative">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full max-w-7xl mx-auto w-full"
          >
            {renderView()}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

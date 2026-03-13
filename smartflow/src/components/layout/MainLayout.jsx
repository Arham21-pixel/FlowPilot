import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Activity, Settings, Bell, Search, PlusCircle, Hexagon } from 'lucide-react';
import { motion } from 'framer-motion';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isBuilder = location.pathname.startsWith('/builder');

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Activity, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-surface-50 overflow-hidden font-sans">
      {/* Sidebar */}
      {!isBuilder && (
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-brand flex items-center justify-center text-white shadow-lg shadow-primary-brand/20">
            <Hexagon className="w-6 h-6 fill-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            FlowPilot
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="font-semibold">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-primary-400 transition-colors duration-500"></div>
            <p className="text-xs font-medium text-gray-400 mb-1">Current Plan</p>
            <h4 className="font-bold mb-3">Enterprise Pro</h4>
            <button className="w-full py-2 bg-white text-gray-900 rounded-lg text-xs font-bold hover:bg-primary-brand transition-colors">
              Upgrade
            </button>
          </div>
        </div>
      </aside>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 glass border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex-1 max-w-xl relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search workflows, logs, or settings..." 
              className="w-full bg-gray-50/50 border border-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:bg-white focus:border-primary-brand focus:ring-4 focus:ring-primary-brand/10 transition-all"
            />
          </div>

          <div className="flex items-center gap-4 ml-6">
            <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary-brand hover:border-primary-brand/30 hover:shadow-sm transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-100 mx-1"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 leading-none">Riana Vu</p>
                <p className="text-[11px] font-medium text-gray-500 mt-1">Admin Account</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary-100 border border-primary-200 flex items-center justify-center font-bold text-primary-700 shadow-sm overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Riana`} alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className={`flex-1 overflow-y-auto mesh-gradient custom-scrollbar relative ${isBuilder ? 'p-0' : 'p-8'}`}>
          {!isBuilder && (
            <>
              <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary-brand/10 rounded-full blur-3xl animate-blob"></div>
              <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-[50%] left-[50%] w-48 h-48 bg-amber-400/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
            </>
          )}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full relative z-10"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

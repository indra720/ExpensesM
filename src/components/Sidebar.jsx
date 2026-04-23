import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Briefcase, 
  BarChart3, 
  FileText, 
  Settings, 
  LogOut,
  User,
  Menu,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: Wallet, label: 'Personal Expenses', path: '/personal' },
    { icon: Briefcase, label: 'Project Expenses', path: '/projects' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: FileText, label: 'Reports', path: '/reports' },
  ];

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 flex items-center justify-between lg:justify-start gap-3  ">
        <div className="flex items-center gap-3 ">
          <div className="w-10 h-10 bg-[#3D2B1F] rounded-xl flex items-center justify-center shadow-lg shadow-stone-200">
            <Wallet className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-[#3D2B1F] tracking-tight">Expanse<span className="text-[#8B5E3C]">M</span></span>
        </div>
        <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-stone-400 hover:text-[#3D2B1F]">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-[#3D2B1F] text-white shadow-md shadow-stone-200' 
                  : 'text-stone-500 hover:bg-stone-50 hover:text-[#3D2B1F]'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-stone-400 group-hover:text-[#3D2B1F]'}`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile/Settings */}
      <div className="p-4 border-t border-stone-100 bg-white">
        <div className="flex items-center gap-3 px-4 py-4 mb-2 bg-stone-50 rounded-2xl border border-stone-100">
          <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-[#3D2B1F]">
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#3D2B1F]">John Doe</p>
            <p className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">Premium Plan</p>
          </div>
        </div>
        
        <Link to="/settings" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 text-stone-500 hover:text-[#3D2B1F] transition-colors">
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-stone-500 hover:text-red-600 transition-colors text-left">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile/Tablet Fixed Header */}
      <div className="lg:hidden   fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-stone-100 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <div className="w-8 h-8 bg-[#3D2B1F] rounded-lg flex items-center justify-center shadow-md">
            <Wallet className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-[#3D2B1F] tracking-tight">Expanse<span className="text-[#8B5E3C]">M</span></span>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2.5 bg-stone-50 border border-stone-100 text-[#3D2B1F] rounded-xl shadow-sm hover:bg-stone-100 transition-all"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 h-screen bg-white border-r border-stone-100 flex-col fixed left-0 top-0 z-20">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-[#3D2B1F]/40 backdrop-blur-sm z-100"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-[80%] max-w-sm bg-white z-101 flex flex-col shadow-2xl"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

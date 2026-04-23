import React from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  CreditCard, 
  LogOut,
  ChevronRight,
  Camera
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const SettingItem = ({ icon: Icon, title, description, badge }) => (
  <div className="flex items-center justify-between p-6 hover:bg-stone-50 transition-all cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-white border border-stone-100 rounded-2xl flex items-center justify-center text-[#3D2B1F] group-hover:bg-[#3D2B1F] group-hover:text-white transition-all shadow-sm">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h3 className="text-sm font-bold text-[#3D2B1F]">{title}</h3>
        <p className="text-xs text-stone-400 font-medium">{description}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      {badge && <span className="px-2.5 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-lg uppercase tracking-wider">{badge}</span>}
      <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-[#3D2B1F]" />
    </div>
  </div>
);

const Settings = () => {
  return (
    <div className="min-h-screen bg-[#FDFCFB] flex">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 p-6 mt-16 lg:mt-0">

        <header className="mb-4">
          <h1 className="text-3xl font-extrabold text-[#3D2B1F] tracking-tight">Account Settings</h1>
          <p className="text-stone-500 font-medium mt-1">Manage your profile and application preferences</p>
        </header>

        <div className="max-w-4xl space-y-8">
          {/* Profile Section */}
          <section className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden p-8 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-stone-100 flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                  <User className="w-10 h-10 text-[#3D2B1F]" />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-[#3D2B1F] text-white rounded-full border-2 border-white shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#3D2B1F]">John Doe</h2>
                <p className="text-stone-400 font-medium">john.doe@premium.com</p>
                <div className="mt-2 flex gap-2">
                  <span className="px-3 py-1 bg-[#FDFCFB] border border-stone-100 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#8B5E3C]">Pro Member</span>
                </div>
              </div>
            </div>
            <button className="px-6 py-3 bg-stone-50 border border-stone-100 rounded-2xl text-[#3D2B1F] font-bold text-sm hover:bg-stone-100 transition-all">
              Edit Profile
            </button>
          </section>

          {/* Settings Groups */}
          <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden divide-y divide-stone-50">
            <div className="px-8 py-6">
              <h2 className="text-lg font-bold text-[#3D2B1F]">General Preferences</h2>
            </div>
            <SettingItem 
              icon={Globe} 
              title="Currency & Region" 
              description="Indian Rupee (₹) • India (GMT+5:30)" 
            />
            <SettingItem 
              icon={Bell} 
              title="Notifications" 
              description="Email, Push, and Budget alerts" 
              badge="3 New"
            />
            <SettingItem 
              icon={Lock} 
              title="Privacy & Security" 
              description="Password, 2FA, and sessions" 
            />
            <SettingItem 
              icon={CreditCard} 
              title="Subscription Plan" 
              description="Premium Monthly Plan" 
              badge="Active"
            />
          </div>

          <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden divide-y divide-stone-50">
            <div className="px-8 py-6">
              <h2 className="text-lg font-bold text-[#3D2B1F]">Danger Zone</h2>
            </div>
            <div className="flex items-center justify-between p-6 hover:bg-rose-50 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 shadow-sm">
                  <LogOut className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-rose-600">Delete Account</h3>
                  <p className="text-xs text-rose-400 font-medium">Permanently remove your data</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-rose-200" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;

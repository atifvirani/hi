import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ReceiptIndianRupee, 
  Users, 
  Scissors, 
  Settings, 
  MonitorSmartphone 
} from 'lucide-react';

export default function Layout() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: ReceiptIndianRupee, label: 'Billing / POS', path: '/billing' },
    { icon: Users, label: 'CRM Clients', path: '/crm' },
    { icon: Scissors, label: 'Services', path: '/services' },
    { icon: MonitorSmartphone, label: 'Device Mgr', path: '/devices' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 text-sm">
      {/* SIDEBAR */}
      <aside className="w-64 bg-sidebar text-white flex flex-col shadow-2xl z-10">
        
        {/* LOGO */}
        <div className="h-16 flex items-center justify-center border-b border-slate-700 bg-slate-900">
          <h1 className="text-xl font-bold tracking-widest text-blue-400">TS-SALOON</h1>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 py-6 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 font-medium transition-all duration-200 border-l-4
                ${isActive 
                  ? 'bg-slate-800 text-blue-400 border-blue-500' 
                  : 'border-transparent text-slate-400 hover:bg-slate-800 hover:text-white'}`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* SERVER STATUS (Bottom of Sidebar) */}
        <div className="p-4 bg-slate-900/50 border-t border-slate-700">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">System Status</p>
              <p className="text-xs font-bold text-green-400">Online • Cuttack</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-auto bg-slate-50 p-8">
        <Outlet /> {/* This renders the Dashboard, Billing, etc. */}
      </main>
    </div>
  );
}
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarClock, 
  Users, 
  UserCheck, 
  Scale, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Bell, 
  Building2, 
  LogOut, 
  ArrowRightLeft, 
  ShieldCheck, 
  Search, 
  Menu, 
  X,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import LanguageSelector from '../../components/common/LanguageSelector';
import SMSNotificationSimulator from '../../components/common/SMSNotificationSimulator';
import DemoController from '../../components/common/DemoController';

export default function AuthorityLayout() {
  const { centres, notifications, setUserRole } = useKisan();
  const [selectedCentreId, setSelectedCentreId] = useState(centres[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === '/authority/login';

  const navItems = [
    { to: '/authority/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/authority/slots', label: 'Centre Capacity & Operations', icon: CalendarClock },
    { to: '/authority/queue', label: 'Live Farmer Queue', icon: Users, badge: 'Live' },
    { to: '/authority/farmers', label: 'Farmers Directory (20k)', icon: UserCheck },
    { to: '/authority/procurement', label: 'Procurement & Weighment', icon: Scale },
    { to: '/authority/payments', label: 'DBT Payment Approvals', icon: CreditCard },
    { to: '/authority/reports', label: 'Reports & Analytics', icon: BarChart3 },
    { to: '/authority/settings', label: 'Centre Settings', icon: Settings },
  ];

  const handleLogout = () => {
    setUserRole(null);
    navigate('/');
  };

  const handleSwitchToFarmer = () => {
    setUserRole('farmer');
    navigate('/farmer/dashboard');
  };

  if (isLoginPage) {
    return <Outlet />;
  }

  const selectedCentre = centres.find(c => c.id === selectedCentreId) || centres[0];

  return (
    <div className="min-h-screen bg-[#F4F7F5] text-[#1A2E22] flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#0B7A3B] text-white px-4 sm:px-6 py-2.5 shadow-md flex items-center justify-between border-b border-[#085428]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div 
            onClick={() => navigate('/authority/dashboard')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center font-black text-sm">
              🏢
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base leading-tight tracking-tight flex items-center gap-1.5">
                <span>AGRI-NEX Authority</span>
                <span className="text-[10px] font-semibold bg-emerald-950/40 text-emerald-200 px-2 py-0.5 rounded-md hidden sm:inline">
                  Operations Desk
                </span>
              </div>
              <div className="text-[10px] text-emerald-200 leading-none">
                Govt APMC Smart Procurement & Queue Controller
              </div>
            </div>
          </div>
        </div>

        {/* Centre Selector & Officer Profile */}
        <div className="flex items-center gap-3">
          {/* Centre Dropdown */}
          <div className="hidden lg:flex items-center gap-2 bg-emerald-950/30 px-3 py-1.5 rounded-xl border border-white/15 text-xs">
            <Building2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span className="text-emerald-200">Active Centre:</span>
            <select
              value={selectedCentreId}
              onChange={(e) => setSelectedCentreId(e.target.value)}
              className="bg-transparent text-white font-bold focus:outline-hidden cursor-pointer text-xs"
            >
              {centres.map(c => (
                <option key={c.id} value={c.id} className="text-gray-900 font-medium">
                  {c.name} ({c.district})
                </option>
              ))}
            </select>
          </div>

          {/* Switch to Farmer View Button */}
          <button
            onClick={handleSwitchToFarmer}
            title="Switch to Farmer interface"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold border border-white/20 transition-all"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-300" />
            <span>Farmer View</span>
          </button>

          {/* Officer Info */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/20">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
              SD
            </div>
            <div className="hidden md:block text-left text-xs leading-tight">
              <div className="font-bold text-white">Sunil Deshmukh</div>
              <div className="text-[10px] text-emerald-200">Officer #402</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-emerald-100 flex flex-col justify-between transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="p-4 space-y-1">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1 mb-1">
              Procurement Operations
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all
                    ${isActive
                      ? 'bg-[#EAF7EF] text-[#0B7A3B] shadow-2xs font-extrabold border border-emerald-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-900'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-emerald-600 text-white rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-100 space-y-2">
            <div className="bg-[#F8FAF9] p-3 rounded-2xl border border-emerald-100 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Security Token Engine</span>
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">
                Paithan APMC Node #MH-042 Online
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-2 px-3 flex items-center justify-center gap-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Authority Portal</span>
            </button>
          </div>
        </aside>

        {/* Content View */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
          <Outlet context={{ selectedCentre }} />
        </main>
      </div>

      {/* SMS & Demo Tools */}
      <SMSNotificationSimulator />
      <DemoController />
    </div>
  );
}

import React from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  CalendarDays, 
  Users, 
  FileCheck2, 
  IndianRupee, 
  Bell, 
  User, 
  PhoneCall, 
  ChevronLeft,
  ArrowRightLeft
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import LanguageSelector from '../../components/common/LanguageSelector';
import SMSNotificationSimulator from '../../components/common/SMSNotificationSimulator';
import DemoController from '../../components/common/DemoController';

export default function FarmerLayout() {
  const { t, notifications, isDeviceFrame, setIsDeviceFrame, setUserRole } = useKisan();
  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifications.filter(n => !n.read).length;
  const isAuthPage = location.pathname.includes('/farmer/login') || 
                     location.pathname.includes('/farmer/otp') || 
                     location.pathname.includes('/farmer/profile-setup');

  const navItems = [
    { to: '/farmer/dashboard', label: t('navHome'), icon: Home },
    { to: '/farmer/centres', label: t('navBookings'), icon: CalendarDays },
    { to: '/farmer/queue', label: t('navQueue'), icon: Users },
    { to: '/farmer/procurement', label: t('navProcurement'), icon: FileCheck2 },
    { to: '/farmer/payment', label: t('navPayment'), icon: IndianRupee },
    { to: '/farmer/notifications', label: t('navNotifications'), icon: Bell, badge: unreadCount },
    { to: '/farmer/profile', label: t('navProfile'), icon: User },
  ];

  const content = (
    <div className="flex flex-col min-h-screen bg-[#F7FAF8] text-[#1A2E22]">
      {/* Farmer Top Header */}
      {!isAuthPage && (
        <header className="sticky top-0 z-30 bg-[#138A4B] text-white px-4 py-3 shadow-md">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              {location.pathname !== '/farmer/dashboard' && (
                <button
                  onClick={() => navigate(-1)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <div 
                onClick={() => navigate('/farmer/dashboard')}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-1.5 font-extrabold text-base tracking-tight">
                  <span className="text-xl">🌾</span>
                  <span>AGRI-NEX</span>
                </div>
                <div className="text-[10px] text-emerald-100 font-medium leading-none">
                  {t('tagline')}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <LanguageSelector />
            </div>
          </div>
        </header>
      )}

      {/* Main Screen Outlet */}
      <main className="flex-1 pb-24 max-w-md mx-auto w-full">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      {!isAuthPage && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-between">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `
                    flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all relative flex-1
                    ${isActive 
                      ? 'text-[#138A4B] font-bold scale-105' 
                      : 'text-gray-500 hover:text-emerald-700 font-medium'
                    }
                  `}
                >
                  <div className="relative">
                    <Icon className="w-5 h-5" />
                    {item.badge > 0 && (
                      <span className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-[54px] text-center">
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </nav>
      )}

      {/* SMS Alert Simulator */}
      <SMSNotificationSimulator />

      {/* Demo Floating Controller */}
      <DemoController />
    </div>
  );

  if (isDeviceFrame) {
    return (
      <div className="farmer-screen-wrapper">
        <div className="farmer-device-frame">
          {/* Mock Phone Notch */}
          <div className="w-full bg-[#1E2E24] py-1 px-6 flex items-center justify-between text-white text-[11px] font-semibold select-none z-50">
            <span>10:15</span>
            <div className="w-16 h-3.5 bg-black/60 rounded-full"></div>
            <span className="text-[10px]">5G 88%</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return content;
}

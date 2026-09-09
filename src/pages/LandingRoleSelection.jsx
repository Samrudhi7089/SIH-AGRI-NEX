import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  CheckCircle2, 
  Users, 
  Truck,
  TrendingUp,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { useKisan } from '../context/KisanContext';
import LanguageSelector from '../components/common/LanguageSelector';

export default function LandingRoleSelection() {
  const navigate = useNavigate();
  const { setUserRole, t } = useKisan();

  const handleSelectRole = (role) => {
    setUserRole(role);
    if (role === 'farmer') {
      navigate('/farmer/login');
    } else {
      navigate('/authority/login');
    }
  };

  const handleQuickDemoFarmer = () => {
    setUserRole('farmer');
    navigate('/farmer/dashboard');
  };

  const handleQuickDemoAuthority = () => {
    setUserRole('authority');
    navigate('/authority/dashboard');
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#F2F8F4] via-[#FFFFFF] to-[#EBF5EF] flex flex-col text-[#1A2E22]">
      {/* Top Govt Bar */}
      <header className="bg-[#0B7A3B] text-white py-2 px-4 border-b border-[#085428] shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-[10px]">
              🇮🇳
            </div>
            <span className="font-medium text-emerald-100 hidden sm:inline">
              Ministry of Agriculture & Farmers Welfare • Government of India
            </span>
            <span className="font-medium text-emerald-100 sm:hidden">
              Govt of India • Agri Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Main Hero & Role Selection */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center justify-center w-full">
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/80 text-emerald-900 text-xs font-semibold mb-4 shadow-xs">
          <Sprout className="w-4 h-4 text-emerald-700" />
          <span>Smart Procurement Slot & Queue Management System</span>
        </div>

        {/* Title & Tagline */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B7A3B] tracking-tight text-center mb-3">
          AGRI-NEX <span className="text-[#138A4B] font-light">| एग्री-नेक्स</span>
        </h1>
        <p className="text-lg sm:text-xl text-[#3A5243] font-medium text-center max-w-2xl mb-8">
          "{t('tagline')}"
        </p>

        {/* System Impact Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl mb-10">
          <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Wait Reduction</div>
              <div className="text-sm font-bold text-gray-900">4.5h → 35 min</div>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Live Capacity</div>
              <div className="text-sm font-bold text-gray-900">20,000+ Farmers</div>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500">DBT Payout</div>
              <div className="text-sm font-bold text-gray-900">Direct to Bank</div>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Transparency</div>
              <div className="text-sm font-bold text-gray-900">Token-driven</div>
            </div>
          </div>
        </div>

        {/* Role Selection Prompt */}
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Select Your Role to Enter System
          </span>
        </div>

        {/* Two Interface Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Card 1: Farmer Interface */}
          <div className="group relative bg-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-200 hover:border-[#138A4B] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-200">
              Mobile-First
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#EAF7EF] text-[#138A4B] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                <span className="text-3xl">👨‍🌾</span>
              </div>

              <h2 className="text-2xl font-bold text-[#1A2E22] mb-2 flex items-center gap-2">
                {t('farmerRoleTitle')}
                <span className="text-sm font-medium text-emerald-700">/ किसान</span>
              </h2>

              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {t('farmerRoleDesc')}
              </p>

              {/* Feature bullets */}
              <div className="space-y-2.5 mb-8 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Book procurement slot at nearest APMC/Mandi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Real-time queue tracking & Token status</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Weighment verification & DBT payment alerts</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleSelectRole('farmer')}
                className="w-full py-3.5 px-5 bg-[#138A4B] hover:bg-[#0B7A3B] text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm group-hover:gap-3"
              >
                <span>Enter Farmer Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleQuickDemoFarmer}
                className="w-full py-2 px-4 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant Demo as Ramesh Patil (Token A127)</span>
              </button>
            </div>
          </div>

          {/* Card 2: Authority Interface */}
          <div className="group relative bg-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-200 hover:border-[#0B7A3B] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-4 right-4 bg-slate-100 text-slate-700 text-[11px] font-bold px-3 py-1 rounded-full border border-slate-200">
              Operations Desk
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#EAF7EF] text-[#0B7A3B] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                <Building2 className="w-7 h-7 text-[#0B7A3B]" />
              </div>

              <h2 className="text-2xl font-bold text-[#1A2E22] mb-2 flex items-center gap-2">
                {t('authorityRoleTitle')}
                <span className="text-sm font-medium text-emerald-700">/ अधिकारी</span>
              </h2>

              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {t('authorityRoleDesc')}
              </p>

              {/* Feature bullets */}
              <div className="space-y-2.5 mb-8 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Configure daily centre slot capacities</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Live weighbridge queue dispatching (Start/Complete)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct Benefit Transfer (DBT) payment authorization</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleSelectRole('authority')}
                className="w-full py-3.5 px-5 bg-[#0B7A3B] hover:bg-[#065426] text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm group-hover:gap-3"
              >
                <span>Enter Authority Console</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleQuickDemoAuthority}
                className="w-full py-2 px-4 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant Demo as Procurement Officer #402</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-emerald-100 py-6 px-4 text-xs text-gray-500 text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-left">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
              AN
            </div>
            <div>
              <div className="font-semibold text-gray-800">AGRI-NEX • Smart Procurement Platform</div>
              <div className="text-[11px] text-gray-500">Empowering Indian Farmers through Digital Precision</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-emerald-800 font-medium">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              Kisan Helpline: 1800-180-1551 (Toll Free)
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

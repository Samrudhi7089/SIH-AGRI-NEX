import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Phone, 
  MapPin, 
  Sprout, 
  CalendarDays, 
  IndianRupee, 
  Globe, 
  Headphones, 
  LogOut, 
  ChevronRight, 
  ShieldCheck, 
  ArrowRightLeft,
  Building2
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import LanguageSelector from '../../components/common/LanguageSelector';

export default function FarmerProfile() {
  const navigate = useNavigate();
  const { farmerProfile, language, setLanguage, setUserRole, t } = useKisan();

  const handleLogout = () => {
    setUserRole(null);
    navigate('/');
  };

  const handleSwitchToAuthority = () => {
    setUserRole('authority');
    navigate('/authority/dashboard');
  };

  return (
    <div className="p-4 space-y-4">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm text-center relative overflow-hidden">
        <div className="w-20 h-20 rounded-3xl bg-[#EAF7EF] border-2 border-emerald-200 text-emerald-800 flex items-center justify-center text-4xl mx-auto mb-3 shadow-xs">
          👨‍🌾
        </div>

        <h1 className="text-xl font-bold text-gray-900">
          {farmerProfile.name}
        </h1>
        <div className="text-xs text-gray-500 font-medium mt-0.5">
          {farmerProfile.mobile} • {farmerProfile.village}, {farmerProfile.district}
        </div>

        <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-bold text-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Aadhaar Verified: {farmerProfile.farmerId}</span>
        </div>
      </div>

      {/* Language Options Section */}
      <div className="bg-white rounded-3xl p-4 border border-emerald-100 shadow-xs space-y-2">
        <div className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span>Select App Language / भाषा</span>
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { code: 'en', name: 'English', sub: 'Default' },
            { code: 'hi', name: 'हिन्दी', sub: 'Hindi' },
            { code: 'mr', name: 'मराठी', sub: 'Marathi' }
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`p-3 rounded-2xl border-2 text-center transition-all ${
                language === lang.code
                  ? 'bg-[#138A4B] text-white border-[#0B7A3B] shadow-sm font-bold'
                  : 'bg-[#F8FAF9] text-gray-700 border-gray-100 hover:border-emerald-200 font-medium'
              }`}
            >
              <div className="text-sm font-bold">{lang.name}</div>
              <div className={`text-[10px] ${language === lang.code ? 'text-emerald-100' : 'text-gray-400'}`}>
                {lang.sub}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Menu Options List */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs divide-y divide-gray-100 overflow-hidden text-xs">
        <button
          onClick={() => navigate('/farmer/profile-setup')}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Edit Profile & Land Records</div>
              <div className="text-[10px] text-gray-500">Update crop area and village</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button
          onClick={() => navigate('/farmer/centres')}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <CalendarDays className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-gray-900">{t('myBookings')}</div>
              <div className="text-[10px] text-gray-500">View token history & pass</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button
          onClick={() => navigate('/farmer/payment')}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Payment & Bank Details</div>
              <div className="text-[10px] text-gray-500">State Bank of India (**** 4912)</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <div className="p-4 flex items-center justify-between bg-emerald-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Kisan Call Centre (24x7)</div>
              <div className="text-[10px] text-emerald-800 font-semibold">Toll Free: 1800-180-1551</div>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-1 rounded-lg border border-emerald-200">
            Free Call
          </span>
        </div>
      </div>

      {/* Switch & Logout Actions */}
      <div className="space-y-2 pt-1">
        <button
          onClick={handleSwitchToAuthority}
          className="w-full py-3 px-4 bg-white hover:bg-gray-50 border-2 border-emerald-300 text-emerald-900 font-bold rounded-2xl transition-all shadow-xs flex items-center justify-center gap-2 text-xs"
        >
          <Building2 className="w-4 h-4 text-[#0B7A3B]" />
          <span>Switch to Procurement Authority Interface</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full py-3 px-4 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 text-xs"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout from Session</span>
        </button>
      </div>
    </div>
  );
}

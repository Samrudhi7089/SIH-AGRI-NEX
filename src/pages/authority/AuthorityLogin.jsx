import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Lock, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle,
  Building
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import LanguageSelector from '../../components/common/LanguageSelector';

export default function AuthorityLogin() {
  const [userId, setUserId] = useState('OFFICER_402');
  const [password, setPassword] = useState('••••••••');
  const navigate = useNavigate();
  const { setUserRole, triggerSimulatedSMS } = useKisan();

  const handleLogin = (e) => {
    e.preventDefault();
    setUserRole('authority');
    triggerSimulatedSMS(
      'Authority Login Successful',
      'Officer Sunil Deshmukh authenticated at Paithan APMC Centre.'
    );
    navigate('/authority/dashboard');
  };

  const handleDemoLogin = () => {
    setUserRole('authority');
    triggerSimulatedSMS(
      'Demo Authority Officer Active',
      'Logged into Paithan APMC Procurement Node #402.'
    );
    navigate('/authority/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5] flex flex-col justify-between p-4 sm:p-6 text-[#1A2E22]">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-[#0B7A3B] text-white flex items-center justify-center text-xl shadow-xs">
            🏢
          </div>
          <div>
            <div className="font-extrabold text-emerald-950 text-base">AGRI-NEX Authority</div>
            <div className="text-[10px] text-emerald-700 font-medium">Procurement Management System</div>
          </div>
        </div>
        <LanguageSelector />
      </div>

      {/* Main Login Box */}
      <div className="my-auto py-8 max-w-sm mx-auto w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 shadow-xl relative">
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto rounded-3xl bg-[#EAF7EF] border border-emerald-200 flex items-center justify-center text-[#0B7A3B] mb-3 shadow-xs">
              <Building2 className="w-7 h-7" />
            </div>

            <h1 className="text-xl font-bold text-gray-900">
              Procurement Authority Login
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Authorized Mandi Officers, Weighbridge Operators & Treasury Officers.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Official User ID / Employee ID
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="e.g. OFFICER_402"
                  className="w-full pl-9 pr-3 py-3 bg-[#F8FAF9] border border-emerald-200 focus:border-[#0B7A3B] focus:bg-white rounded-xl font-medium outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secure password"
                  className="w-full pl-9 pr-3 py-3 bg-[#F8FAF9] border border-emerald-200 focus:border-[#0B7A3B] focus:bg-white rounded-xl font-medium outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#0B7A3B] hover:bg-[#065426] active:scale-[0.99] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm mt-2"
            >
              <span>Login to Operations Desk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo Login Option */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative px-3 bg-white text-[10px] font-semibold text-gray-400 uppercase">
              OR
            </span>
          </div>

          <button
            onClick={handleDemoLogin}
            className="w-full py-3 px-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-xs"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Continue as Demo Officer (Sunil Deshmukh)</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[11px] text-gray-500 pb-2">
        National APMC Agricultural Market Network • Department of Agriculture
      </div>
    </div>
  );
}

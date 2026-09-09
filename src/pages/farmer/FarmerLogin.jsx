import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle,
  Building
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import LanguageSelector from '../../components/common/LanguageSelector';

export default function FarmerLogin() {
  const [mobile, setMobile] = useState('9876543210');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t, triggerSimulatedSMS } = useKisan();

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!mobile || mobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    triggerSimulatedSMS(
      'AGRI-NEX OTP Verification',
      'Your 6-digit OTP is 123456. Valid for 10 minutes. Do not share with anyone.'
    );
    navigate('/farmer/otp', { state: { mobile } });
  };

  const handleDemoLogin = () => {
    triggerSimulatedSMS(
      'AGRI-NEX Login Successful',
      'Welcome back Ramesh Patil! Active Token A127 for Paithan Centre.'
    );
    navigate('/farmer/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col justify-between p-4 sm:p-6 text-[#1A2E22]">
      {/* Top Bar */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF7EF] border border-emerald-200 flex items-center justify-center text-xl shadow-xs">
            🌾
          </div>
          <div>
            <div className="font-extrabold text-emerald-900 leading-none text-base">AGRI-NEX</div>
            <div className="text-[10px] text-emerald-700 font-medium">एग्री-नेक्स</div>
          </div>
        </div>

        <LanguageSelector />
      </div>

      {/* Main Login Card */}
      <div className="my-auto py-6 max-w-sm mx-auto w-full">
        {/* Agricultural Illustration / Header Graphic */}
        <div className="relative mb-6 text-center">
          <div className="inline-block p-4 bg-linear-to-b from-[#EAF7EF] to-[#D4EFE0] rounded-3xl border border-emerald-200 shadow-sm mb-3">
            <span className="text-5xl">👨‍🌾</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1A2E22] mb-1">
            {t('welcomeFarmer')}
          </h1>
          <p className="text-xs text-gray-600 max-w-xs mx-auto">
            {t('mobileNumberPrompt')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              {t('enterMobile')}
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-sm font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md border border-gray-200">
                +91
              </span>
              <input
                type="tel"
                maxLength="10"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value.replace(/\D/g, ''));
                  if (error) setError('');
                }}
                placeholder="Enter 10-digit number"
                className="w-full pl-20 pr-4 py-3.5 text-base font-semibold bg-white border-2 border-emerald-200 focus:border-[#138A4B] focus:ring-4 focus:ring-emerald-500/10 rounded-2xl outline-hidden transition-all shadow-xs"
              />
            </div>
            {error && <p className="text-xs text-rose-600 mt-1.5 font-medium">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-[#138A4B] hover:bg-[#0B7A3B] active:scale-[0.99] text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
          >
            <span>{t('sendOtp')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <span className="relative px-3 bg-[#F8FAF9] text-[11px] font-semibold text-gray-400 uppercase">
            OR
          </span>
        </div>

        {/* Demo Login Button */}
        <button
          onClick={handleDemoLogin}
          className="w-full py-3 px-4 bg-emerald-50 hover:bg-emerald-100/80 active:scale-[0.99] border-2 border-emerald-300/80 text-emerald-900 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-xs shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>{t('demoFarmerLogin')}</span>
        </button>

        {/* Trust Badges */}
        <div className="mt-8 pt-4 border-t border-emerald-100 text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official Government APMC Procurement Gateway</span>
          </div>
          <p className="text-[10px] text-gray-500">
            {t('govtSupport')}
          </p>
        </div>
      </div>

      {/* Footer Support */}
      <div className="text-center text-[11px] text-gray-500 pb-2">
        Need help? Call Toll Free <span className="font-semibold text-emerald-700">1800-180-1551</span>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Sprout, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import LanguageSelector from '../../components/common/LanguageSelector';

export default function FarmerProfileSetup() {
  const { farmerProfile, setFarmerProfile, crops, t, triggerSimulatedSMS } = useKisan();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: farmerProfile.name,
    mobile: farmerProfile.mobile,
    farmerId: farmerProfile.farmerId,
    state: farmerProfile.state,
    district: farmerProfile.district,
    village: farmerProfile.village,
    primaryCrop: farmerProfile.primaryCrop
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFarmerProfile(prev => ({ ...prev, ...form }));
    triggerSimulatedSMS(
      'Profile Setup Complete',
      `Welcome ${form.name}! Your account is linked with ${form.village} APMC Centre.`
    );
    navigate('/farmer/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col justify-between p-4 sm:p-6 text-[#1A2E22]">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#EAF7EF] text-emerald-700 flex items-center justify-center font-bold">
            🌾
          </div>
          <span className="font-extrabold text-emerald-950 text-sm">AGRI-NEX Profile</span>
        </div>
        <LanguageSelector />
      </div>

      <div className="my-auto py-4 max-w-md mx-auto w-full">
        {/* Progress Step Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between relative max-w-xs mx-auto">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
            <div className="absolute top-1/2 left-0 w-2/3 h-1 bg-[#138A4B] -translate-y-1/2 z-0"></div>

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#138A4B] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                <Check className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-semibold text-emerald-800 mt-1">{t('stepAccount')}</span>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#138A4B] text-white flex items-center justify-center text-xs font-bold ring-4 ring-emerald-100 shadow-xs">
                2
              </div>
              <span className="text-[10px] font-bold text-[#138A4B] mt-1">{t('stepDetails')}</span>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold">
                3
              </div>
              <span className="text-[10px] font-medium text-gray-400 mt-1">{t('stepReady')}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-100 shadow-sm">
          <div className="mb-5">
            <h1 className="text-xl font-bold text-gray-900">
              {t('profileSetupTitle')}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Please verify your agricultural land & bank registration details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {/* Full Name */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                {t('fullName')} *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F9FBFA] border border-emerald-200 rounded-xl focus:border-[#138A4B] focus:bg-white outline-hidden font-medium text-gray-900"
              />
            </div>

            {/* Mobile & Farmer ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  disabled
                  value={form.mobile}
                  className="w-full px-3.5 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-600 font-semibold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  {t('farmerId')}
                </label>
                <input
                  type="text"
                  value={form.farmerId}
                  onChange={(e) => setForm({ ...form, farmerId: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F9FBFA] border border-emerald-200 rounded-xl focus:border-[#138A4B] focus:bg-white outline-hidden font-medium text-gray-900"
                />
              </div>
            </div>

            {/* Location Details */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  {t('district')}
                </label>
                <input
                  type="text"
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F9FBFA] border border-emerald-200 rounded-xl focus:border-[#138A4B] focus:bg-white outline-hidden font-medium text-gray-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  {t('village')}
                </label>
                <input
                  type="text"
                  value={form.village}
                  onChange={(e) => setForm({ ...form, village: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F9FBFA] border border-emerald-200 rounded-xl focus:border-[#138A4B] focus:bg-white outline-hidden font-medium text-gray-900"
                />
              </div>
            </div>

            {/* Primary Crop */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                {t('primaryCrop')} *
              </label>
              <select
                value={form.primaryCrop}
                onChange={(e) => setForm({ ...form, primaryCrop: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F9FBFA] border border-emerald-200 rounded-xl focus:border-[#138A4B] focus:bg-white outline-hidden font-semibold text-emerald-950 cursor-pointer"
              >
                <option value="Wheat">Wheat (गेहूं / गहू) - MSP ₹2,275/qtl</option>
                <option value="Soybean">Soybean (सोयाबीन) - MSP ₹4,892/qtl</option>
                <option value="Cotton">Cotton (कपास / कापूस) - MSP ₹7,121/qtl</option>
                <option value="Maize">Maize (मक्का / मका) - MSP ₹2,090/qtl</option>
                <option value="Jowar">Jowar (ज्वार / ज्वारी) - MSP ₹3,180/qtl</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#138A4B] hover:bg-[#0B7A3B] active:scale-[0.99] text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span>{t('continueBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-center text-[10px] text-gray-400 pb-2">
        Aadhaar & Land Records Auto-synced via e-Samarth portal
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Settings, 
  Building2, 
  Clock, 
  Scale, 
  Radio, 
  ShieldCheck, 
  Save, 
  CheckCircle2, 
  RefreshCw,
  Sliders
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';

export default function AuthoritySettings() {
  const { selectedCentre } = useOutletContext();
  const { crops } = useKisan();

  const [operatingHours, setOperatingHours] = useState('09:00 AM - 05:00 PM');
  const [activeWeighbridges, setActiveWeighbridges] = useState('2');
  const [moistureThreshold, setMoistureThreshold] = useState('12.0');
  const [smsGatewayStatus, setSmsGatewayStatus] = useState('Active (NIC-AGRI-GATEWAY)');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#0B7A3B]" />
            <h1 className="text-xl font-extrabold text-gray-900">
              Procurement Centre Node Configuration
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Configure telemetry parameters, weighbridge hardware links, and APMC gateway standards.
          </p>
        </div>

        <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-bold rounded-xl text-xs flex items-center gap-1.5 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Node ID: MH-PAI-042 (Live)</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs">
          <h2 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
            <span>Hardware & Slot Rules</span>
            <span className="text-xs font-semibold text-emerald-800">ISO-9001 APMC Certified</span>
          </h2>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Daily Operational Hours
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={operatingHours}
                  onChange={(e) => setOperatingHours(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#F8FAF9] border border-emerald-200 rounded-xl font-bold text-gray-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Active Electronic Weighbridges
                </label>
                <select
                  value={activeWeighbridges}
                  onChange={(e) => setActiveWeighbridges(e.target.value)}
                  className="w-full p-2.5 bg-[#F8FAF9] border border-emerald-200 rounded-xl font-bold text-gray-900 cursor-pointer"
                >
                  <option value="1">1 Weighbridge (40 tons/hr)</option>
                  <option value="2">2 Weighbridges (80 tons/hr)</option>
                  <option value="3">3 Weighbridges (120 tons/hr)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  FAQ Moisture Upper Limit (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={moistureThreshold}
                    onChange={(e) => setMoistureThreshold(e.target.value)}
                    className="w-full p-2.5 bg-[#F8FAF9] border border-emerald-200 rounded-xl font-bold text-gray-900"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Government SMS Alert Gateway Pipeline
              </label>
              <input
                type="text"
                disabled
                value={smsGatewayStatus}
                className="w-full p-2.5 bg-gray-100 border border-gray-200 rounded-xl font-mono font-semibold text-gray-600 cursor-not-allowed"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="submit"
                className="py-3 px-6 bg-[#0B7A3B] hover:bg-[#065426] text-white font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 text-xs"
              >
                <Save className="w-4 h-4" />
                <span>Save Centre Parameters</span>
              </button>

              {isSaved && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Parameters Updated</span>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: MSP Price Master Table */}
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 pb-2 border-b border-gray-100 flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-[#0B7A3B]" />
            <span>National MSP Master Rates (2026)</span>
          </h3>

          <div className="space-y-2.5 text-xs">
            {crops.map((crop) => (
              <div
                key={crop.id}
                className="p-3 bg-[#F8FAF9] rounded-2xl border border-emerald-50 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{crop.icon}</span>
                  <div>
                    <div className="font-bold text-gray-900">{crop.name.split(' ')[0]}</div>
                    <div className="text-[10px] text-gray-500">Government Support Price</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-black text-emerald-950 text-sm">₹{crop.mspPerQuintal.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-gray-400">per quintal</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

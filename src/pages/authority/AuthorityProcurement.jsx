import React, { useState } from 'react';
import { 
  Scale, 
  CheckCircle2, 
  RefreshCw, 
  AlertCircle, 
  FileCheck2, 
  Printer, 
  Save, 
  Sparkles,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import StatusBadge from '../../components/common/StatusBadge';
import confetti from 'canvas-confetti';

export default function AuthorityProcurement() {
  const { currentBooking, myQueueItem, updateProcurement, updateQueueStatus, queueList } = useKisan();

  const [selectedToken, setSelectedToken] = useState(currentBooking.token);
  const [quantity, setQuantity] = useState('420');
  const [grossWeight, setGrossWeight] = useState('2420');
  const [tareWeight, setTareWeight] = useState('2000');
  const [moisture, setMoisture] = useState('11.8');
  const [qualityGrade, setQualityGrade] = useState('Grade A+');
  const [status, setStatus] = useState(myQueueItem.procurementStatus || 'Completed');
  const [isSaved, setIsSaved] = useState(false);

  // Sync when token changes
  const activeFarmer = queueList.find(q => q.token === selectedToken) || myQueueItem;

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProcurement(selectedToken, {
      quantity,
      moisturePercent: `${moisture}%`,
      qualityGrade,
      status
    });

    if (status === 'Completed') {
      updateQueueStatus(selectedToken, 'Completed');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#138A4B', '#22C55E', '#F59E0B']
      });
    } else if (status === 'Processing') {
      updateQueueStatus(selectedToken, 'Processing');
    }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#0B7A3B]" />
            <h1 className="text-xl font-extrabold text-gray-900">
              Procurement & Weighbridge Verification
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Update electronic weighment receipts, moisture percentage, and procurement status.
          </p>
        </div>

        {/* Token Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-600">Select Farmer Token:</span>
          <select
            value={selectedToken}
            onChange={(e) => {
              const tok = e.target.value;
              setSelectedToken(tok);
              const f = queueList.find(q => q.token === tok);
              if (f) {
                setQuantity(f.quantity.replace(/\D/g, '') || '420');
                setStatus(f.procurementStatus || f.status);
              }
            }}
            className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl font-black text-xs text-emerald-950 outline-hidden cursor-pointer"
          >
            {queueList.map((item) => (
              <option key={item.token} value={item.token}>
                Token {item.token} - {item.farmerName} ({item.crop})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form update */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs">
          <h2 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
            <span>Weighbridge Measurement Entry</span>
            <span className="text-xs font-semibold text-emerald-700">Weighbridge #1 • Automated Telemetry</span>
          </h2>

          <form onSubmit={handleUpdate} className="space-y-4 text-xs">
            {/* Farmer details header */}
            <div className="bg-[#F8FAF9] p-3.5 rounded-2xl border border-emerald-100 grid grid-cols-3 gap-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase">Farmer</span>
                <div className="font-bold text-gray-900 mt-0.5">{activeFarmer.farmerName}</div>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase">Token</span>
                <div className="font-black text-emerald-900 mt-0.5">{activeFarmer.token}</div>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase">Crop</span>
                <div className="font-bold text-gray-900 mt-0.5">{activeFarmer.crop}</div>
              </div>
            </div>

            {/* Weighbridge Tare / Gross Calculation */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Gross Weight (kg)
                </label>
                <input
                  type="number"
                  value={grossWeight}
                  onChange={(e) => {
                    const gw = parseFloat(e.target.value) || 0;
                    const tw = parseFloat(tareWeight) || 0;
                    setGrossWeight(e.target.value);
                    setQuantity(String(Math.max(0, gw - tw)));
                  }}
                  className="w-full p-2.5 bg-[#F8FAF9] border border-emerald-200 rounded-xl font-bold text-gray-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Vehicle Tare Weight (kg)
                </label>
                <input
                  type="number"
                  value={tareWeight}
                  onChange={(e) => {
                    const tw = parseFloat(e.target.value) || 0;
                    const gw = parseFloat(grossWeight) || 0;
                    setTareWeight(e.target.value);
                    setQuantity(String(Math.max(0, gw - tw)));
                  }}
                  className="w-full p-2.5 bg-[#F8FAF9] border border-emerald-200 rounded-xl font-bold text-gray-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Net Grain Quantity (kg)
                </label>
                <input
                  type="number"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl font-black text-emerald-950 text-sm"
                />
              </div>
            </div>

            {/* Quality & Moisture */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Moisture Content (% Testing)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={moisture}
                    onChange={(e) => setMoisture(e.target.value)}
                    className="w-full p-2.5 bg-[#F8FAF9] border border-emerald-200 rounded-xl font-bold text-gray-900"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-medium">Standard FAQ moisture limit: 12.0%</span>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Grain Quality Grade
                </label>
                <select
                  value={qualityGrade}
                  onChange={(e) => setQualityGrade(e.target.value)}
                  className="w-full p-2.5 bg-[#F8FAF9] border border-emerald-200 rounded-xl font-bold text-gray-900 cursor-pointer"
                >
                  <option value="Grade A+">Grade A+ (Premium Quality)</option>
                  <option value="Grade A">Grade A (Standard FAQ)</option>
                  <option value="Grade B">Grade B (Acceptable with deduction)</option>
                  <option value="Under Inspection">Under Inspection</option>
                </select>
              </div>
            </div>

            {/* Status Dropdown */}
            <div>
              <label className="block font-bold text-gray-800 mb-1">
                Procurement Status Dropdown
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 bg-emerald-50 border-2 border-emerald-300 rounded-2xl font-black text-emerald-950 text-sm cursor-pointer outline-hidden"
              >
                <option value="Waiting">Waiting (In Line)</option>
                <option value="Processing">Processing (In Weighbridge / Inspection)</option>
                <option value="Completed">Completed (Grain Received & Verified)</option>
                <option value="Rejected">Rejected (High Moisture or Quality Fail)</option>
              </select>
            </div>

            <div className="pt-3 flex items-center justify-between gap-4">
              <button
                type="submit"
                className="py-3 px-6 bg-[#0B7A3B] hover:bg-[#065426] text-white font-extrabold rounded-2xl shadow-md transition-all flex items-center gap-2 text-xs"
              >
                <Save className="w-4 h-4" />
                <span>Update Status & Sync with Farmer App</span>
              </button>

              {isSaved && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Procurement Data Synced Live!</span>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: E-Weighment Receipt Preview */}
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                <FileCheck2 className="w-4 h-4 text-emerald-700" />
                <span>Digital Weighment Slip (J-Form)</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                E-RECEIPT
              </span>
            </div>

            <div className="space-y-3 text-xs text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-400">Token Ref:</span>
                <span className="font-mono font-bold text-gray-900">{selectedToken}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Farmer Name:</span>
                <span className="font-bold text-gray-900">{activeFarmer.farmerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Net Grain Weight:</span>
                <span className="font-black text-emerald-900">{quantity} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Moisture Index:</span>
                <span className="font-bold text-gray-900">{moisture}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Quality Classification:</span>
                <span className="font-bold text-gray-900">{qualityGrade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Procurement State:</span>
                <StatusBadge status={status} size="sm" />
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-bold">Approved Payout:</span>
                <span className="font-extrabold text-emerald-800 text-sm">
                  ₹{((parseInt(quantity || 0) * 59.5)).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={() => window.print()}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Weighment Slip</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

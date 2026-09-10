import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  RefreshCw, 
  IndianRupee, 
  Scale, 
  ArrowRight, 
  Play, 
  Eye, 
  Sparkles,
  TrendingUp,
  AlertCircle,
  CalendarDays,
  Plus
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import StatusBadge from '../../components/common/StatusBadge';
import confetti from 'canvas-confetti';

export default function AuthorityDashboard() {
  const navigate = useNavigate();
  const { selectedCentre } = useOutletContext();
  const { 
    queueList, 
    updateQueueStatus, 
    advanceQueueNext, 
    currentBooking,
    updateProcurement
  } = useKisan();

  const [selectedFarmerForModal, setSelectedFarmerForModal] = useState(null);

  // Key Metrics
  const totalToday = 142;
  const waitingCount = queueList.filter(q => q.status === 'Waiting').length + 30;
  const processingCount = queueList.filter(q => q.status === 'Processing').length;
  const processedCount = queueList.filter(q => q.status === 'Completed').length + 86;
  const paymentPendingCount = 17;

  const handleStart = (token) => {
    updateQueueStatus(token, 'Processing');
    updateProcurement(token, {
      status: 'Processing',
      moisturePercent: '11.8%',
      qualityGrade: 'Grade A+'
    });
  };

  const handleComplete = (token) => {
    updateQueueStatus(token, 'Completed');
    updateProcurement(token, {
      status: 'Completed',
      moisturePercent: '11.8%',
      qualityGrade: 'Grade A+'
    });
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#138A4B', '#22C55E', '#F59E0B']
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🏢</span>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
              {selectedCentre?.name || 'Paithan Procurement Centre'}
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              Active Node
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            District: {selectedCentre?.district || 'Chhatrapati Sambhajinagar'} • Date: 10 September 2026 • Operating: 09:00 AM - 05:00 PM
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={advanceQueueNext}
            className="py-2.5 px-4 bg-[#0B7A3B] hover:bg-[#065426] text-white font-bold rounded-xl text-xs shadow-sm transition-all flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Advance Next Token</span>
          </button>

          <button
            onClick={() => navigate('/authority/slots')}
            className="py-2.5 px-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold rounded-xl text-xs border border-emerald-200 transition-colors flex items-center gap-1.5"
          >
            <CalendarDays className="w-3.5 h-3.5 text-emerald-700" />
            <span>Capacity & Operations</span>
          </button>
        </div>
      </div>

      {/* 5 Operational Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Farmers Today */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1.5">
            <span className="text-xs font-semibold">Farmers Today</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-gray-900">{totalToday}</div>
          <div className="text-[10px] text-emerald-700 font-medium mt-1">100% of Slot Quota</div>
        </div>

        {/* Card 2: Waiting */}
        <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1.5">
            <span className="text-xs font-semibold">Waiting</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-900">{waitingCount}</div>
          <div className="text-[10px] text-blue-700 font-medium mt-1">Avg Wait: 35 min</div>
        </div>

        {/* Card 3: Processing */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs bg-amber-50/20">
          <div className="flex items-center justify-between text-gray-500 mb-1.5">
            <span className="text-xs font-semibold">In Weighbridge</span>
            <Scale className="w-4 h-4 text-amber-600 animate-pulse" />
          </div>
          <div className="text-2xl font-black text-amber-900">{processingCount}</div>
          <div className="text-[10px] text-amber-700 font-medium mt-1">Weighbridge #1 Active</div>
        </div>

        {/* Card 4: Processed */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1.5">
            <span className="text-xs font-semibold">Processed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-900">{processedCount}</div>
          <div className="text-[10px] text-emerald-700 font-medium mt-1">42,800 kg Verified</div>
        </div>

        {/* Card 5: Payment Pending */}
        <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1.5">
            <span className="text-xs font-semibold">Payment Auth</span>
            <IndianRupee className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-purple-900">{paymentPendingCount}</div>
          <div className="text-[10px] text-purple-700 font-medium mt-1">Ready for Treasury</div>
        </div>
      </div>

      {/* Main Table: Today's Active Farmer Queue */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <span>Today's Real-Time Procurement Line</span>
              <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                10:00 AM – 11:00 AM Window
              </span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Actions instantly propagate to farmer mobile devices via AGRI-NEX reactive engine.
            </p>
          </div>

          <button
            onClick={() => navigate('/authority/queue')}
            className="text-xs font-bold text-[#0B7A3B] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Open Dedicated Queue Station</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAF9] text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-4">Token</th>
                <th className="py-3.5 px-4">Farmer Details</th>
                <th className="py-3.5 px-4">Crop & Quantity</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Operational Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {queueList.slice(0, 7).map((farmer) => {
                const isRamesh = farmer.token === currentBooking.token;
                const isDone = farmer.status === 'Completed';
                const isProc = farmer.status === 'Processing';

                return (
                  <tr 
                    key={farmer.token} 
                    className={`hover:bg-emerald-50/40 transition-colors ${
                      isRamesh ? 'bg-[#F4FBF6] font-semibold' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-8 h-8 rounded-lg font-black text-xs flex items-center justify-center ${
                          isRamesh ? 'bg-[#0B7A3B] text-white shadow-xs' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {farmer.token}
                        </span>
                        {isRamesh && (
                          <span className="text-[9px] font-black uppercase text-[#0B7A3B] bg-emerald-100 px-1.5 py-0.2 rounded-md">
                            Demo Farmer
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-900">{farmer.farmerName}</div>
                      <div className="text-[11px] text-gray-500">{farmer.farmerId} • {farmer.village}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-900">{farmer.crop}</div>
                      <div className="text-[11px] text-emerald-800 font-semibold">{farmer.quantity}</div>
                    </td>

                    <td className="py-3.5 px-4 font-extrabold text-gray-900">
                      {farmer.amount}
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={farmer.status} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {isDone ? (
                          <button
                            onClick={() => navigate('/authority/farmers')}
                            className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                        ) : isProc ? (
                          <button
                            onClick={() => handleComplete(farmer.token)}
                            className="px-3.5 py-1.5 rounded-lg bg-[#0B7A3B] hover:bg-[#065426] text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Complete</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStart(farmer.token)}
                            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>Start</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

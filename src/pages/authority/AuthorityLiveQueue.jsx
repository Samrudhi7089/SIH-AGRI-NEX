import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { 
  Users, 
  Play, 
  CheckCircle2, 
  Eye, 
  RotateCw, 
  Scale, 
  Check, 
  ArrowRight, 
  Sparkles,
  Search,
  Filter,
  Truck
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import StatusBadge from '../../components/common/StatusBadge';
import confetti from 'canvas-confetti';

export default function AuthorityLiveQueue() {
  const navigate = useNavigate();
  const { selectedCentre } = useOutletContext();
  const { 
    queueList, 
    updateQueueStatus, 
    advanceQueueNext, 
    currentBooking,
    updateProcurement,
    updatePayment
  } = useKisan();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

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
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#138A4B', '#22C55E', '#F59E0B']
    });
  };

  const filteredQueue = queueList.filter(item => {
    const matchSearch = !search ||
      item.farmerName.toLowerCase().includes(search.toLowerCase()) ||
      item.token.toLowerCase().includes(search.toLowerCase()) ||
      item.village.toLowerCase().includes(search.toLowerCase()) ||
      item.crop.toLowerCase().includes(search.toLowerCase());

    const matchStatus = filterStatus === 'all' || item.status.toLowerCase() === filterStatus.toLowerCase();
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#0B7A3B]" />
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
              Live Farmer Queue Management Station
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Real-time weighbridge inward controller for {selectedCentre?.name}.
          </p>
        </div>

        <button
          onClick={advanceQueueNext}
          className="py-2.5 px-4 bg-[#0B7A3B] hover:bg-[#065426] text-white font-bold rounded-xl text-xs shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Call Next Token to Weighbridge</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by token (e.g. A127), farmer name, or village..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-emerald-200 focus:border-[#0B7A3B] rounded-2xl text-xs font-semibold text-gray-900 outline-hidden shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2.5 bg-white border border-emerald-200 rounded-2xl text-xs font-bold text-gray-800 focus:border-[#0B7A3B] outline-hidden shadow-xs cursor-pointer"
          >
            <option value="all">All States</option>
            <option value="Waiting">Waiting</option>
            <option value="Processing">In Weighbridge</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Real-time Queue Table */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAF9] text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-5">Token</th>
                <th className="py-3.5 px-5">Farmer Name</th>
                <th className="py-3.5 px-5">Crop Declared</th>
                <th className="py-3.5 px-5">Quantity</th>
                <th className="py-3.5 px-5">Weighment State</th>
                <th className="py-3.5 px-5">Live Status</th>
                <th className="py-3.5 px-5 text-right">Controller Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredQueue.map((item) => {
                const isRamesh = item.token === currentBooking.token;
                const isDone = item.status === 'Completed';
                const isProc = item.status === 'Processing';

                return (
                  <tr 
                    key={item.token} 
                    className={`hover:bg-emerald-50/40 transition-colors ${
                      isRamesh ? 'bg-[#F4FBF6] font-semibold ring-1 ring-emerald-200' : ''
                    }`}
                  >
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2">
                        <span className={`w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center ${
                          isRamesh ? 'bg-[#0B7A3B] text-white shadow-xs' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.token}
                        </span>
                        {isRamesh && (
                          <span className="text-[9px] font-black uppercase text-[#0B7A3B] bg-emerald-100 px-1.5 py-0.2 rounded-md">
                            Demo Target
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <div className="font-bold text-gray-900 text-sm">{item.farmerName}</div>
                      <div className="text-[11px] text-gray-500">{item.mobile} • {item.village}</div>
                    </td>

                    <td className="py-4 px-5">
                      <div className="font-bold text-gray-900">{item.crop}</div>
                      <div className="text-[10px] text-gray-400">MSP Standard Grade</div>
                    </td>

                    <td className="py-4 px-5">
                      <div className="font-black text-gray-900 text-sm">{item.quantity}</div>
                      <div className="text-[10px] text-emerald-700 font-semibold">{item.amount}</div>
                    </td>

                    <td className="py-4 px-5">
                      <div className="text-[11px] font-medium text-gray-700">
                        {item.weighedAt}
                      </div>
                      {item.moisturePercent !== '-' && (
                        <div className="text-[10px] text-emerald-800 font-semibold">
                          M: {item.moisturePercent} • {item.qualityGrade}
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-5">
                      <StatusBadge status={item.status} size="sm" />
                    </td>

                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {isDone ? (
                          <button
                            onClick={() => navigate('/authority/procurement')}
                            className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </button>
                        ) : isProc ? (
                          <button
                            onClick={() => handleComplete(item.token)}
                            className="px-3.5 py-1.5 rounded-lg bg-[#0B7A3B] hover:bg-[#065426] text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Complete</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStart(item.token)}
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

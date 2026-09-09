import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  IndianRupee, 
  Scale, 
  Download, 
  Calendar,
  Layers,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';

export default function AuthorityReports() {
  const { queueList, slotsList } = useKisan();

  // Hourly slot chart data
  const slotHourlyStats = [
    { time: '09:00', processed: 20, capacity: 20 },
    { time: '10:00', processed: 18, capacity: 20 },
    { time: '11:00', processed: 12, capacity: 20 },
    { time: '12:00', processed: 9, capacity: 20 },
    { time: '02:00', processed: 15, capacity: 20 },
    { time: '03:00', processed: 6, capacity: 20 },
    { time: '04:00', processed: 2, capacity: 20 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#0B7A3B]" />
            <h1 className="text-xl font-extrabold text-gray-900">
              Procurement Telemetry & Queue Analytics
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Real-time performance indicators, queue congestion metrics, and DBT disbursement records.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-emerald-700" />
          <span>Export Analytics Report (PDF)</span>
        </button>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Card 1: Waiting Time Comparison */}
        <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-1">
            <span>Avg Waiting Time</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-gray-900">35 min</div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold mt-1">
            <ArrowUpRight className="w-3 h-3 text-emerald-600" />
            <span>87% reduction vs 4.5 hr baseline</span>
          </div>
        </div>

        {/* Card 2: Slot Utilization */}
        <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-1">
            <span>Slot Utilization</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-950">92.4%</div>
          <div className="text-[10px] text-blue-700 font-bold mt-1">82 of 90 booked today</div>
        </div>

        {/* Card 3: Avg Weighbridge Cycle */}
        <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-1">
            <span>Processing Speed</span>
            <Scale className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-purple-950">8.4 min</div>
          <div className="text-[10px] text-purple-700 font-bold mt-1">Per vehicle tare & sample test</div>
        </div>

        {/* Card 4: Total Disbursed */}
        <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-1">
            <span>DBT MSP Disbursed</span>
            <IndianRupee className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-950">₹22.4 L</div>
          <div className="text-[10px] text-amber-700 font-bold mt-1">89 farmers paid via PFMS</div>
        </div>
      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Hourly Farmers Throughput */}
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Hourly Farmer Intake vs Capacity
              </h3>
              <p className="text-[11px] text-gray-400">Hourly booked quota distribution</p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl">
              10 Sep 2026
            </span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-4 px-2">
            {slotHourlyStats.map((item, idx) => {
              const heightPercent = (item.processed / item.capacity) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full max-w-[36px] bg-gray-100 rounded-t-xl overflow-hidden h-36 flex items-end">
                    <div
                      className="w-full bg-linear-to-t from-[#0B7A3B] to-emerald-400 rounded-t-xl transition-all duration-500"
                      style={{ height: `${heightPercent}%` }}
                    ></div>
                  </div>
                  <div className="text-[10px] font-bold text-gray-600">{item.time}</div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-gray-500 mt-4 pt-3 border-t border-gray-100">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3 h-3 rounded-md bg-[#0B7A3B]"></span>
              <span>Processed Farmers</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3 h-3 rounded-md bg-gray-200"></span>
              <span>Available Capacity</span>
            </span>
          </div>
        </div>

        {/* Chart 2: Queue Length Dynamics Curve */}
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Queue Length Dynamics (Congestion Metric)
              </h3>
              <p className="text-[11px] text-gray-400">Peak wait times smoothed by slot regulation</p>
            </div>
            <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-xl">
              Peak: 36 Farmers
            </span>
          </div>

          {/* SVG Smooth Flow Curve */}
          <div className="h-48 w-full flex items-center justify-center">
            <svg viewBox="0 0 400 150" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#138A4B" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#138A4B" stopOpacity="0.0"/>
                </linearGradient>
              </defs>
              {/* Background grid */}
              <line x1="0" y1="30" x2="400" y2="30" stroke="#F1F5F2" strokeWidth="1" />
              <line x1="0" y1="75" x2="400" y2="75" stroke="#F1F5F2" strokeWidth="1" />
              <line x1="0" y1="120" x2="400" y2="120" stroke="#F1F5F2" strokeWidth="1" />

              {/* Area */}
              <path
                d="M 0 120 Q 80 40, 160 70 T 320 60 T 400 130 L 400 150 L 0 150 Z"
                fill="url(#curveGradient)"
              />

              {/* Line */}
              <path
                d="M 0 120 Q 80 40, 160 70 T 320 60 T 400 130"
                fill="none"
                stroke="#138A4B"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Data points */}
              <circle cx="80" cy="48" r="4" fill="#0B7A3B" stroke="white" strokeWidth="2" />
              <circle cx="160" cy="70" r="4" fill="#0B7A3B" stroke="white" strokeWidth="2" />
              <circle cx="240" cy="85" r="4" fill="#0B7A3B" stroke="white" strokeWidth="2" />
              <circle cx="320" cy="60" r="4" fill="#0B7A3B" stroke="white" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-400 mt-2 px-2">
            <span>09:00 AM</span>
            <span>11:00 AM (Peak)</span>
            <span>01:00 PM</span>
            <span>03:00 PM</span>
            <span>05:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ArrowRight, 
  PlusCircle, 
  FileText, 
  IndianRupee, 
  HelpCircle, 
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Truck,
  CheckCircle2
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import StatusBadge from '../../components/common/StatusBadge';

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const { 
    farmerProfile, 
    currentBooking, 
    myQueueItem, 
    servingToken, 
    myPosition, 
    farmersAhead, 
    estimatedWaitMinutes, 
    t 
  } = useKisan();

  const isCompleted = myQueueItem.status === 'Completed';
  const isProcessing = myQueueItem.status === 'Processing';

  return (
    <div className="p-4 space-y-4">
      {/* Top Welcome Greeting */}
      <div className="bg-linear-to-r from-[#138A4B] to-[#0B7A3B] text-white p-4 sm:p-5 rounded-3xl shadow-md relative overflow-hidden">
        {/* Subtle decorative crop silhouette */}
        <div className="absolute -right-4 -bottom-4 text-7xl opacity-15 select-none pointer-events-none">
          🌾
        </div>

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="text-xs text-emerald-100 font-medium">
              {t('goodMorning')},
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5 mt-0.5">
              <span>{farmerProfile.name.split(' ')[0]}</span>
              <span className="text-2xl">👋</span>
            </h1>
            <div className="flex items-center gap-2 mt-2 text-xs text-emerald-100 font-medium">
              <span className="bg-white/15 px-2 py-0.5 rounded-md">ID: {farmerProfile.farmerId.split('-').pop()}</span>
              <span>•</span>
              <span>{farmerProfile.village}, {farmerProfile.primaryCrop}</span>
            </div>
          </div>

          <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-xl border border-white/20 shadow-inner">
            👨‍🌾
          </div>
        </div>
      </div>

      {/* Prominent Next Procurement Card */}
      <div className="bg-white rounded-3xl p-5 border-2 border-emerald-200 shadow-sm hover:shadow-md transition-shadow relative">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900">
              {t('nextProcurement')}
            </span>
          </div>
          <StatusBadge status={isCompleted ? 'Completed' : (isProcessing ? 'Processing' : (myPosition <= 2 ? 'Your Turn' : 'Waiting'))} />
        </div>

        {/* Centre & Slot Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <div className="text-base font-bold text-gray-900 leading-tight">
                {currentBooking.centreName}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {currentBooking.district} • {currentBooking.crop} ({currentBooking.quantity})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-700 bg-[#F4FBF6] p-2.5 rounded-2xl border border-emerald-100">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold">{currentBooking.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold">{currentBooking.timeSlot}</span>
            </div>
          </div>
        </div>

        {/* Token & Queue Highlight */}
        <div className="bg-linear-to-b from-[#EAF7EF] to-[#D5EFE1] p-3.5 rounded-2xl border border-emerald-200 flex items-center justify-between mb-4">
          <div>
            <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
              {t('token')} • <span className="font-mono text-gray-700">{currentBooking.bookingId || 'BK-98421'}</span>
            </div>
            <div className="text-2xl font-black text-emerald-950 tracking-tight">
              {currentBooking.token}
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] text-gray-600 font-medium">
              {isCompleted ? 'Status' : (isProcessing ? 'Now Serving' : (currentBooking.status === 'Late / No-show' ? 'Status' : 'Queue Position'))}
            </div>
            <div className="text-sm font-extrabold text-emerald-900">
              {isCompleted ? (
                <span className="text-emerald-700 flex items-center gap-1 justify-end">
                  <CheckCircle2 className="w-4 h-4" /> Finished
                </span>
              ) : (
                isProcessing ? 'In Weighbridge #1' : (currentBooking.status === 'Late / No-show' ? <span className="text-rose-700">Late / No-show</span> : `#${myPosition} (${farmersAhead} ahead)`)
              )}
            </div>
          </div>
        </div>

        {/* Track Queue CTA Button */}
        <button
          onClick={() => navigate('/farmer/queue')}
          className="w-full py-3 px-4 bg-[#138A4B] hover:bg-[#0B7A3B] active:scale-[0.99] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
        >
          <span>{t('trackQueue')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Actions Grid (4 Buttons) */}
      <div>
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1 mb-2.5">
          {t('quickActions')}
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {/* Action 1: Book New Slot */}
          <button
            onClick={() => navigate('/farmer/centres')}
            className="p-3.5 bg-white hover:bg-emerald-50/50 border border-emerald-100 hover:border-emerald-300 rounded-2xl shadow-xs transition-all text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <PlusCircle className="w-5 h-5 text-emerald-700" />
            </div>
            <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-800">
              {t('bookNewSlot')}
            </div>
            <div className="text-[10px] text-gray-500 mt-0.5">Select mandi centre</div>
          </button>

          {/* Action 2: My Bookings / Status */}
          <button
            onClick={() => navigate('/farmer/procurement')}
            className="p-3.5 bg-white hover:bg-blue-50/50 border border-emerald-100 hover:border-blue-300 rounded-2xl shadow-xs transition-all text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5 text-blue-700" />
            </div>
            <div className="text-xs font-bold text-gray-900 group-hover:text-blue-800">
              {t('myBookings')}
            </div>
            <div className="text-[10px] text-gray-500 mt-0.5">Weighment & timeline</div>
          </button>

          {/* Action 3: Payment Status */}
          <button
            onClick={() => navigate('/farmer/payment')}
            className="p-3.5 bg-white hover:bg-amber-50/50 border border-emerald-100 hover:border-amber-300 rounded-2xl shadow-xs transition-all text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <IndianRupee className="w-5 h-5 text-amber-700" />
            </div>
            <div className="text-xs font-bold text-gray-900 group-hover:text-amber-800">
              {t('paymentStatus')}
            </div>
            <div className="text-[10px] text-gray-500 mt-0.5">DBT Bank transfer ₹25k</div>
          </button>

          {/* Action 4: Help & Support */}
          <button
            onClick={() => navigate('/farmer/profile')}
            className="p-3.5 bg-white hover:bg-purple-50/50 border border-emerald-100 hover:border-purple-300 rounded-2xl shadow-xs transition-all text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <HelpCircle className="w-5 h-5 text-purple-700" />
            </div>
            <div className="text-xs font-bold text-gray-900 group-hover:text-purple-800">
              {t('helpSupport')}
            </div>
            <div className="text-[10px] text-gray-500 mt-0.5">Kisan helpline 1800</div>
          </button>
        </div>
      </div>

      {/* Today's Centre Status Card */}
      <div className="bg-white rounded-3xl p-4 border border-emerald-100 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>{t('todayCentreStatus')}</span>
          </div>
          <span className="text-[10px] text-gray-400">Live APMC Telemetry</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#F8FAF9] p-3 rounded-2xl border border-emerald-50 text-center">
            <div className="text-[11px] text-gray-500 font-medium">
              {t('currentQueue')}
            </div>
            <div className="text-xl font-extrabold text-emerald-950 mt-0.5">
              24 <span className="text-xs font-semibold text-gray-600">{t('farmers')}</span>
            </div>
          </div>

          <div className="bg-[#F8FAF9] p-3 rounded-2xl border border-emerald-50 text-center">
            <div className="text-[11px] text-gray-500 font-medium">
              {t('estimatedWaiting')}
            </div>
            <div className="text-xl font-extrabold text-emerald-950 mt-0.5">
              {estimatedWaitMinutes || 35} <span className="text-xs font-semibold text-gray-600">{t('minutes')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

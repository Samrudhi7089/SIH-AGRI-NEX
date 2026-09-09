import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  RotateCw, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  MapPin, 
  Sparkles,
  Truck,
  Activity,
  ChevronRight
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import StatusBadge from '../../components/common/StatusBadge';

export default function FarmerLiveQueue() {
  const navigate = useNavigate();
  const { 
    currentBooking, 
    queueList, 
    servingToken, 
    myPosition, 
    farmersAhead, 
    estimatedWaitMinutes, 
    myQueueItem, 
    t,
    triggerSimulatedSMS
  } = useKisan();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('10:15 AM');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastUpdated(timeStr);
      setIsRefreshing(false);
      triggerSimulatedSMS(
        'Live Queue Synced',
        `Current Serving: Token ${servingToken}. You are #${myPosition} in line.`
      );
    }, 600);
  };

  const isCompleted = myQueueItem.status === 'Completed';
  const isProcessing = myQueueItem.status === 'Processing';
  const isYourTurn = myPosition === 1 && !isCompleted;

  // Processed count
  const processedCount = queueList.filter(q => q.status === 'Completed').length;
  const totalInSlot = queueList.length;

  return (
    <div className="p-4 space-y-4">
      {/* Top Header & Refresh Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>{t('liveQueue')}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          </h1>
          <p className="text-[11px] text-gray-500">
            {t('lastUpdated')}: <span className="font-semibold text-gray-700">{lastUpdated}</span>
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="px-3 py-1.5 bg-white hover:bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-bold shadow-2xs transition-all flex items-center gap-1.5"
        >
          <RotateCw className={`w-3.5 h-3.5 text-emerald-600 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{t('refresh')}</span>
        </button>
      </div>

      {/* Hero Position Card */}
      <div className={`p-5 rounded-3xl border-2 shadow-md relative overflow-hidden transition-all ${
        isCompleted
          ? 'bg-emerald-900 text-white border-emerald-700'
          : (isProcessing 
              ? 'bg-amber-900 text-white border-amber-600 animate-pulse-subtle' 
              : 'bg-linear-to-b from-[#138A4B] to-[#0B7A3B] text-white border-emerald-600')
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-200">
              {t('tokenNumber')}
            </div>
            <div className="text-4xl font-black tracking-tight text-white mt-0.5">
              {currentBooking.token}
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30">
              {isCompleted ? 'Completed' : (isProcessing ? 'Weighbridge Active' : `${farmersAhead} Farmers Ahead`)}
            </span>
          </div>
        </div>

        {/* Position & Waiting Time Grid */}
        <div className="grid grid-cols-2 gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 mb-3">
          <div>
            <div className="text-[10px] text-emerald-100 font-medium">
              {t('yourPosition')}
            </div>
            <div className="text-2xl font-black text-white mt-0.5">
              {isCompleted ? (
                <span className="text-lg text-emerald-300">Done ✓</span>
              ) : (
                isProcessing ? <span className="text-amber-300 text-lg">Now Serving!</span> : `#${myPosition}`
              )}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-emerald-100 font-medium">
              {t('estimatedWaiting')}
            </div>
            <div className="text-2xl font-black text-white mt-0.5">
              {isCompleted ? '0 min' : (isProcessing ? '~2 min' : `~${estimatedWaitMinutes} min`)}
            </div>
          </div>
        </div>

        {/* Active Serving Token Indicator */}
        <div className="flex items-center justify-between text-xs text-emerald-100 pt-1">
          <span className="flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-300" />
            {t('currentlyServing')}: <strong className="text-white text-sm">{servingToken}</strong>
          </span>
          <span className="text-[11px] text-emerald-200">
            {currentBooking.centreName.split(' ')[0]} Centre
          </span>
        </div>
      </div>

      {/* Progress Bar Metric */}
      <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-2">
          <span>Centre Queue Progress</span>
          <span className="text-emerald-700">{processedCount} of {totalInSlot} Done</span>
        </div>
        
        {/* Progress Track */}
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200">
          <div 
            className="h-full bg-linear-to-r from-[#138A4B] to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(10, (processedCount / totalInSlot) * 100))}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-gray-500 mt-2">
          <span>Token A121 (Start)</span>
          <span>Token A130 (End)</span>
        </div>
      </div>

      {/* Visual Live Queue Token List */}
      <div>
        <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Live Token Order</span>
          <span className="text-[10px] text-gray-400">Auto-updated from Gate Scanner</span>
        </div>

        <div className="space-y-2">
          {queueList.slice(0, 8).map((item) => {
            const isMe = item.token === currentBooking.token;
            const isItemCompleted = item.status === 'Completed';
            const isItemProcessing = item.status === 'Processing';

            return (
              <div
                key={item.token}
                className={`p-3 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                  isMe
                    ? 'bg-[#EAF7EF] border-[#138A4B] shadow-md ring-2 ring-[#138A4B]/20 scale-101'
                    : (isItemCompleted 
                        ? 'bg-gray-50 border-gray-200 opacity-60' 
                        : (isItemProcessing 
                            ? 'bg-amber-50 border-amber-300 animate-pulse-subtle' 
                            : 'bg-white border-gray-100 shadow-2xs'))
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl font-black text-sm flex items-center justify-center shrink-0 ${
                    isMe 
                      ? 'bg-[#138A4B] text-white shadow-xs' 
                      : (isItemCompleted 
                          ? 'bg-gray-200 text-gray-600' 
                          : (isItemProcessing ? 'bg-amber-500 text-white animate-bounce' : 'bg-gray-100 text-gray-800'))
                  }`}>
                    {item.token}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-bold ${isMe ? 'text-emerald-950 text-sm' : 'text-gray-900'}`}>
                        {item.farmerName}
                      </span>
                      {isMe && (
                        <span className="bg-[#138A4B] text-white text-[9px] font-black px-1.5 py-0.2 rounded-md uppercase">
                          {t('you')}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-0.5">
                      {item.crop} • {item.quantity} • {item.village}
                    </div>
                  </div>
                </div>

                <div>
                  <StatusBadge status={item.status} size="sm" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action to Procurement Status */}
      <div className="pt-2">
        <button
          onClick={() => navigate('/farmer/procurement')}
          className="w-full py-3.5 px-4 bg-white hover:bg-emerald-50 border-2 border-emerald-200 text-emerald-900 font-bold rounded-2xl transition-all shadow-xs flex items-center justify-center gap-2 text-xs"
        >
          <span>View Detailed Procurement Timeline</span>
          <ChevronRight className="w-4 h-4 text-emerald-700" />
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  RotateCcw, 
  ChevronUp, 
  ChevronDown, 
  ArrowRightLeft, 
  Play, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  Monitor, 
  FastForward, 
  Scale, 
  Clock, 
  AlertTriangle, 
  UserCheck, 
  Sliders, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import confetti from 'canvas-confetti';

export default function DemoController() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { 
    userRole, 
    setUserRole, 
    advanceQueueNext, 
    updateQueueStatus, 
    updateProcurement, 
    updatePayment, 
    handleNoShow,
    acceptRescheduledSlot,
    promoteFromWaitlist,
    updateSlotCapacity,
    resetDemoData, 
    isDeviceFrame, 
    setIsDeviceFrame,
    currentBooking,
    slotsList
  } = useKisan();
  
  const navigate = useNavigate();
  const location = useLocation();

  const isFarmerRoute = location.pathname.startsWith('/farmer');
  const isAuthorityRoute = location.pathname.startsWith('/authority');

  const triggerCelebration = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#138A4B', '#22C55E', '#EAB308', '#3B82F6']
    });
  };

  const handleStartA127 = () => {
    updateQueueStatus(currentBooking.token, 'Processing');
    updateProcurement(currentBooking.token, {
      status: 'Processing',
      quantity: '420',
      moisturePercent: '11.8%',
      qualityGrade: 'Grade A+'
    });
  };

  const handleCompleteA127 = () => {
    updateQueueStatus(currentBooking.token, 'Completed');
    updateProcurement(currentBooking.token, {
      status: 'Completed',
      quantity: '420',
      moisturePercent: '11.8%',
      qualityGrade: 'Grade A+'
    });
    triggerCelebration();
  };

  const handleCompletePaymentA127 = () => {
    updatePayment(currentBooking.token, {
      status: 'Completed',
      amount: '₹25,000',
      txnRef: 'TXN98765'
    });
    triggerCelebration();
  };

  const handleSimulateGraceExpiry = () => {
    handleNoShow(currentBooking.token);
  };

  const handleSimulateRescheduleAccept = () => {
    acceptRescheduledSlot();
    triggerCelebration();
  };

  const handleSimulateCapacityAuditChange = () => {
    const target = slotsList[1] || slotsList[0];
    const newCap = target.capacity === 20 ? 25 : 20;
    updateSlotCapacity(
      target.id, 
      newCap, 
      'OPEN', 
      'Emergency capacity expansion due to dry weather surge & additional intake lane activation.'
    );
    triggerCelebration();
  };

  const handleSimulateWaitlistPromotion = () => {
    promoteFromWaitlist('09:00 – 10:00');
    triggerCelebration();
  };

  const toggleRole = () => {
    if (isFarmerRoute) {
      setUserRole('authority');
      navigate('/authority/dashboard');
    } else {
      setUserRole('farmer');
      navigate('/farmer/dashboard');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-[#132E1E]/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-emerald-500/40 p-3 max-w-md w-full transition-all">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-left flex-1 hover:opacity-90 transition-opacity"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                SIH Prototype Demo Controller
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-700 text-emerald-100 font-normal">
                  Live State Sync
                </span>
              </div>
              <div className="text-[10px] text-emerald-300/80">
                {isFarmerRoute ? 'Active: Farmer Portal' : (isAuthorityRoute ? 'Active: Authority Portal' : 'AGRI-NEX Platform')}
              </div>
            </div>
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleRole}
              title="Switch between Farmer & Authority view"
              className="p-1.5 rounded-lg bg-emerald-800/60 hover:bg-emerald-700 text-white text-xs flex items-center gap-1 border border-emerald-500/30 transition-colors"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden sm:inline text-[11px] font-medium">
                {isFarmerRoute ? 'To Authority' : 'To Farmer'}
              </span>
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-lg hover:bg-white/10 text-gray-300"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expanded Controls for Judges */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-emerald-800/80 space-y-2.5 text-xs">
            {/* Group 1: Procurement Flow */}
            <div>
              <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider mb-1">
                1. Standard Procurement & DBT Flow:
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={advanceQueueNext}
                  className="p-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-white border border-emerald-600/30 flex items-center gap-2 text-left transition-colors"
                >
                  <FastForward className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-[11px]">Advance Queue</div>
                    <div className="text-[9px] text-gray-300">Move next token</div>
                  </div>
                </button>

                <button
                  onClick={handleStartA127}
                  className="p-2 rounded-xl bg-blue-950/60 hover:bg-blue-900 text-white border border-blue-600/30 flex items-center gap-2 text-left transition-colors"
                >
                  <Scale className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-[11px]">Start A127 Weigh</div>
                    <div className="text-[9px] text-gray-300">Set Processing</div>
                  </div>
                </button>

                <button
                  onClick={handleCompleteA127}
                  className="p-2 rounded-xl bg-green-950/60 hover:bg-green-900 text-white border border-green-600/30 flex items-center gap-2 text-left transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-[11px]">Complete A127</div>
                    <div className="text-[9px] text-gray-300">420kg Wheat OK</div>
                  </div>
                </button>

                <button
                  onClick={handleCompletePaymentA127}
                  className="p-2 rounded-xl bg-amber-950/60 hover:bg-amber-900 text-white border border-amber-600/30 flex items-center gap-2 text-left transition-colors"
                >
                  <CreditCard className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-[11px]">Pay ₹25,000</div>
                    <div className="text-[9px] text-gray-300">DBT TXN98765</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Group 2: Smart No-Show & Grace Expiry */}
            <div>
              <div className="text-[10px] font-bold text-rose-300 uppercase tracking-wider mb-1">
                2. Smart No-show / Grace Expiry & Rescheduling:
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={handleSimulateGraceExpiry}
                  className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-white border border-rose-600/30 flex items-center gap-2 text-left transition-colors"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-[11px]">Simulate Grace Expiry</div>
                    <div className="text-[9px] text-rose-200">Mark Late & Auto-offer</div>
                  </div>
                </button>

                <button
                  onClick={handleSimulateRescheduleAccept}
                  className="p-2 rounded-xl bg-purple-950/60 hover:bg-purple-900 text-white border border-purple-600/30 flex items-center gap-2 text-left transition-colors"
                >
                  <RefreshCw className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-[11px]">Accept Reschedule</div>
                    <div className="text-[9px] text-purple-200">Confirm new slot</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Group 3: Capacity & Waitlist */}
            <div>
              <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1">
                3. Operational Audit & Fair Waitlist:
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={handleSimulateCapacityAuditChange}
                  className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-600/40 flex items-center gap-2 text-left transition-colors"
                >
                  <Sliders className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-[11px]">Adjust Capacity</div>
                    <div className="text-[9px] text-gray-300">Creates Audit Log</div>
                  </div>
                </button>

                <button
                  onClick={handleSimulateWaitlistPromotion}
                  className="p-2 rounded-xl bg-indigo-950/60 hover:bg-indigo-900 text-white border border-indigo-600/30 flex items-center gap-2 text-left transition-colors"
                >
                  <UserCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-[11px]">Promote Waitlist</div>
                    <div className="text-[9px] text-indigo-200">Fair FIFO promotion</div>
                  </div>
                </button>
              </div>
            </div>

            {/* View Mode & Reset Controls */}
            <div className="pt-2 border-t border-emerald-800/80 flex items-center justify-between gap-2">
              {isFarmerRoute && (
                <button
                  onClick={() => setIsDeviceFrame(!isDeviceFrame)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium flex items-center gap-1.5 border transition-all ${
                    isDeviceFrame 
                      ? 'bg-emerald-600 text-white border-emerald-400' 
                      : 'bg-emerald-950/50 text-emerald-200 border-emerald-700 hover:bg-emerald-900'
                  }`}
                >
                  {isDeviceFrame ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
                  <span>{isDeviceFrame ? 'Mobile Frame' : 'Full Screen'}</span>
                </button>
              )}

              <button
                onClick={resetDemoData}
                className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-rose-200 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/50 flex items-center gap-1.5 ml-auto transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Demo Baseline</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  Scale, 
  Check, 
  MapPin, 
  Calendar, 
  FileText, 
  IndianRupee, 
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Truck
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import StatusBadge from '../../components/common/StatusBadge';

export default function FarmerProcurementStatus() {
  const navigate = useNavigate();
  const { currentBooking, myQueueItem, myPosition, t } = useKisan();

  const isCompleted = myQueueItem.status === 'Completed' || myQueueItem.procurementStatus === 'Completed';
  const isProcessing = myQueueItem.status === 'Processing' || myQueueItem.procurementStatus === 'Processing';

  // Timeline Steps
  const steps = [
    {
      id: 1,
      title: 'Farmer Registered',
      subtext: 'Aadhaar & Land verification complete',
      timestamp: '08 Sep 2026, 09:45 AM',
      isDone: true,
      isActive: false
    },
    {
      id: 2,
      title: 'Automated Slot Allocation',
      subtext: `Booking ID ${currentBooking.bookingId || 'BK-98421'} system-confirmed. Token ${currentBooking.token} issued automatically.`,
      timestamp: currentBooking.allocatedAt || currentBooking.bookedAt || '08 Sep 2026, 10:20 AM',
      isDone: true,
      isActive: false
    },
    {
      id: 3,
      title: 'Queue & Gate Verification',
      subtext: isCompleted || isProcessing ? 'Security Gate Inward Scanned' : `Token in line (Position #${myPosition})`,
      timestamp: isCompleted || isProcessing ? '10 Sep 2026, 10:05 AM' : 'Expected 10:00 AM',
      isDone: isCompleted || isProcessing,
      isActive: !isCompleted && !isProcessing
    },
    {
      id: 4,
      title: 'Procurement & Weighbridge Testing',
      subtext: isCompleted 
        ? 'Gross & Tare Weighment complete • Moisture: 11.8%' 
        : (isProcessing ? 'Currently in Weighbridge #1 • Quality Inspection' : 'Pending turn arrival'),
      timestamp: isCompleted ? '10 Sep 2026, 10:35 AM' : (isProcessing ? 'Active Now' : 'Pending'),
      isDone: isCompleted,
      isActive: isProcessing
    },
    {
      id: 5,
      title: 'Procurement Completed & E-Receipt',
      subtext: isCompleted ? '420 kg Wheat Accepted • Grain Batch #MH-PAI-881' : 'Pending procurement weighment',
      timestamp: isCompleted ? '10 Sep 2026, 10:48 AM' : 'Pending',
      isDone: isCompleted,
      isActive: false
    }
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Title & Badge */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {t('myProcurement')}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Token <span className="font-bold text-emerald-800">{currentBooking.token}</span> • {currentBooking.crop}
          </p>
        </div>

        <StatusBadge status={isCompleted ? 'Completed' : (isProcessing ? 'Processing' : 'In Line')} />
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-emerald-100 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-xs">
          <span className="text-gray-500 font-medium">Procurement Centre:</span>
          <span className="font-bold text-gray-900">{currentBooking.centreName}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-3 text-center">
          <div className="bg-[#F8FAF9] p-2.5 rounded-2xl border border-emerald-50">
            <div className="text-[10px] text-gray-500 font-medium">Declared</div>
            <div className="text-sm font-bold text-gray-900 mt-0.5">{currentBooking.quantity}</div>
          </div>

          <div className="bg-[#F8FAF9] p-2.5 rounded-2xl border border-emerald-50">
            <div className="text-[10px] text-gray-500 font-medium">Moisture</div>
            <div className="text-sm font-bold text-emerald-800 mt-0.5">
              {myQueueItem.moisturePercent !== '-' ? myQueueItem.moisturePercent : '11.8% (Target <12%)'}
            </div>
          </div>

          <div className="bg-[#F8FAF9] p-2.5 rounded-2xl border border-emerald-50">
            <div className="text-[10px] text-gray-500 font-medium">Quality Grade</div>
            <div className="text-sm font-bold text-emerald-800 mt-0.5">
              {myQueueItem.qualityGrade !== '-' ? myQueueItem.qualityGrade : 'Grade A+'}
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-xs">
        <div className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>Official Stage Progress</span>
          <span className="text-[10px] text-emerald-700 font-semibold">Stage {isCompleted ? '5 of 5' : (isProcessing ? '4 of 5' : '3 of 5')}</span>
        </div>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-100">
          {steps.map((step) => {
            return (
              <div key={step.id} className="relative group">
                {/* Checkmark or Circle Indicator */}
                <div className={`absolute -left-6 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step.isDone 
                    ? 'bg-[#138A4B] text-white ring-4 ring-emerald-50 shadow-xs' 
                    : (step.isActive 
                        ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse' 
                        : 'bg-white border-2 border-gray-300 text-gray-400')
                }`}>
                  {step.isDone ? <Check className="w-3.5 h-3.5" /> : step.id}
                </div>

                <div className="pl-3">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className={`text-xs font-bold ${
                      step.isDone ? 'text-gray-900' : (step.isActive ? 'text-amber-900 font-extrabold' : 'text-gray-400')
                    }`}>
                      {step.title}
                    </h4>
                    <span className="text-[10px] font-medium text-gray-400 shrink-0">
                      {step.timestamp}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                    {step.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action to Payment Screen */}
      <div className="pt-2">
        <button
          onClick={() => navigate('/farmer/payment')}
          className="w-full py-3.5 px-4 bg-[#138A4B] hover:bg-[#0B7A3B] active:scale-[0.99] text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-xs"
        >
          <IndianRupee className="w-4 h-4" />
          <span>Track Direct Bank Payment Status (₹25,000)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

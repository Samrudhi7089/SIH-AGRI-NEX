import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  X, 
  Sparkles, 
  Coffee, 
  XCircle, 
  ShieldCheck, 
  Lock, 
  Users, 
  Truck, 
  Info,
  CalendarX
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import confetti from 'canvas-confetti';

export default function FarmerBookSlot() {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    centres, 
    crops, 
    slotsList, 
    bookSlot, 
    joinWaitlist, 
    centreOperations, 
    t 
  } = useKisan();

  const selectedCentre = location.state?.selectedCentre || centres[0];

  // Dates list
  const dates = [
    { day: 'Mon', date: '8 Sep', full: '08 September 2026' },
    { day: 'Tue', date: '9 Sep', full: '09 September 2026' },
    { day: 'Wed', date: '10 Sep', full: '10 September 2026' },
    { day: 'Thu', date: '11 Sep', full: '11 September 2026' },
    { day: 'Fri', date: '12 Sep', full: '12 September 2026' },
    { day: 'Tue', date: '15 Sep', full: '15 September 2026' } // Note: 15 Sep is declared holiday
  ];

  const [selectedDate, setSelectedDate] = useState(dates[2].full); // Default 10 Sep
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [quantity, setQuantity] = useState('420');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [waitlistTargetSlot, setWaitlistTargetSlot] = useState(null);

  // Check if selected date is a declared holiday
  const holidayRecord = centreOperations.holidays?.find(h => h.date === selectedDate);
  const isCentreClosed = centreOperations.isTemporarilyClosed || !!holidayRecord;

  const handleOpenBookingModal = (slot) => {
    if (isCentreClosed || slot.status === 'FULL' || slot.status === 'BREAK') return;
    setSelectedSlot(slot);
    setShowConfirmModal(true);
  };

  const handleOpenWaitlistModal = (slot) => {
    setWaitlistTargetSlot(slot);
    setShowWaitlistModal(true);
  };

  const handleConfirmWaitlist = () => {
    if (!waitlistTargetSlot) return;
    joinWaitlist(selectedCentre, selectedDate, waitlistTargetSlot.time, selectedCrop, quantity);
    setShowWaitlistModal(false);
  };

  const handleConfirmBooking = () => {
    const result = bookSlot(
      selectedCentre,
      selectedDate,
      selectedSlot.time,
      selectedCrop,
      quantity
    );

    if (!result) {
      setShowConfirmModal(false);
      return;
    }

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#138A4B', '#22C55E', '#F59E0B']
    });

    setShowConfirmModal(false);
    navigate('/farmer/booking-success', {
      state: {
        token: result.token,
        bookingId: result.bookingId,
        centre: selectedCentre,
        date: selectedDate,
        timeSlot: selectedSlot.time,
        crop: selectedCrop,
        quantity: quantity,
        allocatedAt: 'Just now'
      }
    });
  };

  return (
    <div className="p-4 space-y-4">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">
          {t('bookProcSlot')}
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Select preferred date, time window, and estimated grain quantity.
        </p>
      </div>

      {/* Automated Fair Allocation Guarantee Strip */}
      <div className="bg-linear-to-r from-[#EAF7EF] to-[#D5EFE1] p-3.5 rounded-2xl border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-950 shadow-2xs">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
        <div className="text-[11px] leading-tight">
          <strong className="font-extrabold text-emerald-900">Automated Fair Allocation: </strong>
          Bookings are confirmed immediately by AGRI-NEX backend capacity checks. Zero manual authority intervention required.
        </div>
      </div>

      {/* Selected Centre Summary Banner */}
      <div className="bg-white p-4 rounded-3xl border-2 border-emerald-100 flex items-start gap-3 shadow-xs">
        <div className="w-10 h-10 rounded-2xl bg-[#EAF7EF] text-emerald-800 flex items-center justify-center shrink-0 shadow-2xs border border-emerald-200">
          <MapPin className="w-5 h-5 text-emerald-700" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
            {t('selectedCentre')}
          </div>
          <div className="text-sm font-bold text-gray-900 truncate">
            {selectedCentre.name}
          </div>
          <div className="text-xs text-gray-600 mt-0.5">
            {selectedCentre.district} • {selectedCentre.distance} • Operating: {centreOperations.operatingHours}
          </div>
        </div>
      </div>

      {/* Date Selector */}
      <div>
        <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          {t('chooseDate')}
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {dates.map((d, index) => {
            const isSelected = selectedDate === d.full;
            const isHol = centreOperations.holidays?.some(h => h.date === d.full);

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(d.full)}
                className={`py-3 px-2 rounded-2xl text-center border-2 transition-all flex flex-col items-center justify-center relative ${
                  isSelected
                    ? 'bg-[#138A4B] text-white border-[#0B7A3B] shadow-sm scale-102'
                    : (isHol 
                        ? 'bg-orange-50/70 border-orange-200 text-orange-900' 
                        : 'bg-white text-gray-700 border-emerald-100 hover:border-emerald-300')
                }`}
              >
                <span className={`text-[10px] font-semibold ${isSelected ? 'text-emerald-100' : (isHol ? 'text-orange-700' : 'text-gray-400')}`}>
                  {d.day}
                </span>
                <span className="text-sm font-extrabold mt-0.5">
                  {d.date}
                </span>
                {isHol && (
                  <span className="text-[8px] font-black uppercase text-orange-700 mt-0.5">
                    Holiday
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Centre Closed / Holiday Warning if Applicable */}
      {holidayRecord && (
        <div className="bg-orange-50 p-4 rounded-3xl border-2 border-orange-200 text-xs text-orange-950 flex items-start gap-3">
          <CalendarX className="w-5 h-5 text-orange-700 shrink-0 mt-0.5" />
          <div>
            <strong className="font-extrabold text-sm block">Procurement Holiday on {selectedDate}</strong>
            <p className="text-[11px] text-orange-900 mt-0.5">
              {holidayRecord.occasion}. Mandi yard and weighbridges are closed on this date. Please select another date.
            </p>
          </div>
        </div>
      )}

      {centreOperations.isTemporarilyClosed && !holidayRecord && (
        <div className="bg-rose-50 p-4 rounded-3xl border-2 border-rose-200 text-xs text-rose-950 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
          <div>
            <strong className="font-extrabold text-sm block">Centre Intake Temporarily Suspended</strong>
            <p className="text-[11px] text-rose-900 mt-0.5">
              {centreOperations.closureReason || 'Temporary maintenance closure in effect.'}
            </p>
          </div>
        </div>
      )}

      {/* Crop & Quantity Selector */}
      <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs space-y-3">
        <div className="text-xs font-bold text-gray-800 uppercase tracking-wider">
          Crop & Quantity Details
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-gray-600 mb-1">
              Select Crop
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full p-2.5 bg-[#F8FAF9] border border-emerald-200 rounded-xl text-xs font-bold text-emerald-950 outline-hidden cursor-pointer"
            >
              {crops.map((c) => (
                <option key={c.id} value={c.name.split(' ')[0]}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-600 mb-1">
              {t('quantityToProcure')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-2.5 bg-[#F8FAF9] border border-emerald-200 rounded-xl text-xs font-bold text-gray-900 outline-hidden"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
                kg
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Time Slots List */}
      <div>
        <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>{t('availableTimeSlots')}</span>
          <span className="text-[11px] text-emerald-700 font-semibold">{selectedDate.split(' ')[0]} {selectedDate.split(' ')[1]}</span>
        </div>

        <div className="space-y-2.5">
          {slotsList.map((slot) => {
            const isFull = slot.status === 'FULL' || slot.available === 0;
            const isBreak = slot.status === 'BREAK';

            return (
              <div
                key={slot.id}
                className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                  isFull 
                    ? 'bg-rose-50/40 border-rose-100' 
                    : (isBreak 
                        ? 'bg-amber-50/40 border-amber-100 opacity-80' 
                        : 'bg-white border-emerald-100 hover:border-emerald-400 shadow-xs')
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isFull 
                      ? 'bg-rose-100 text-rose-700' 
                      : (isBreak ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-800')
                  }`}>
                    {isBreak ? <Coffee className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="text-xs font-bold text-gray-900">
                      {slot.time}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      {isFull ? (
                        <span className="text-rose-600 font-bold">Slot Full ({slot.booked}/{slot.capacity} booked)</span>
                      ) : (
                        isBreak ? (
                          <span className="text-amber-700 font-medium">Lunch & Calibration Break</span>
                        ) : (
                          <span className="text-emerald-700 font-semibold">{slot.available} of {slot.capacity} slots available</span>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  {isBreak ? (
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-xl">
                      BREAK
                    </span>
                  ) : isFull ? (
                    <button
                      onClick={() => handleOpenWaitlistModal(slot)}
                      className="py-1.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold rounded-xl text-xs border border-indigo-200 transition-colors flex items-center gap-1"
                    >
                      <span>Join Waitlist</span>
                    </button>
                  ) : (
                    <button
                      disabled={isCentreClosed}
                      onClick={() => handleOpenBookingModal(slot)}
                      className="py-2 px-4 bg-[#138A4B] hover:bg-[#0B7A3B] active:scale-95 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <span>{t('book')}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedSlot && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-emerald-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  🌾
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  {t('confirmBooking')}
                </h3>
              </div>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Booking Details Box */}
            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-emerald-100 space-y-2.5 text-xs text-gray-700 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Centre:</span>
                <span className="font-bold text-gray-900 text-right">{selectedCentre.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date:</span>
                <span className="font-bold text-emerald-800">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Time Window:</span>
                <span className="font-bold text-emerald-800">{selectedSlot.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Crop & Quantity:</span>
                <span className="font-bold text-gray-900">{quantity} kg {selectedCrop}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-500">Estimated MSP Value:</span>
                <span className="font-extrabold text-emerald-900 text-sm">
                  ₹{((parseInt(quantity || 0) * 59.5)).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Grace period info */}
            <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>15-min arrival grace period applies. Token auto-issued on confirm.</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmBooking}
                className="flex-2 py-3 px-4 bg-[#138A4B] hover:bg-[#0B7A3B] text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Issue Token</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Waitlist Modal */}
      {showWaitlistModal && waitlistTargetSlot && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-indigo-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  Join Fair FIFO Waitlist
                </h3>
              </div>
              <button onClick={() => setShowWaitlistModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-600 mb-3">
              Slot <strong className="text-gray-900">{waitlistTargetSlot.time}</strong> is currently at full capacity. 
              If any farmer cancels or capacity expands, the system will automatically allocate this slot to the next waitlisted farmer in strict FIFO order.
            </p>

            <div className="bg-indigo-50/70 p-3 rounded-2xl border border-indigo-100 text-xs text-indigo-950 space-y-1 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Requested Slot:</span>
                <span className="font-bold">{waitlistTargetSlot.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Crop Quantity:</span>
                <span className="font-bold">{quantity} kg {selectedCrop}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Rule:</span>
                <span className="font-bold text-indigo-800">First-Come, First-Served</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowWaitlistModal(false)}
                className="flex-1 py-3 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmWaitlist}
                className="flex-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Join Fair Waitlist</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

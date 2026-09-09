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
  Truck
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import confetti from 'canvas-confetti';

export default function FarmerBookSlot() {
  const navigate = useNavigate();
  const location = useLocation();
  const { centres, crops, slotsList, bookSlot, t } = useKisan();

  const selectedCentre = location.state?.selectedCentre || centres[0];

  // Dates list
  const dates = [
    { day: 'Mon', date: '8 Sep', full: '08 September 2026' },
    { day: 'Tue', date: '9 Sep', full: '09 September 2026' },
    { day: 'Wed', date: '10 Sep', full: '10 September 2026' },
    { day: 'Thu', date: '11 Sep', full: '11 September 2026' },
  ];

  const [selectedDate, setSelectedDate] = useState(dates[2].full); // Default 10 Sep
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [quantity, setQuantity] = useState('420');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleOpenBookingModal = (slot) => {
    if (slot.status === 'FULL' || slot.status === 'BREAK') return;
    setSelectedSlot(slot);
    setShowConfirmModal(true);
  };

  const handleConfirmBooking = () => {
    const newToken = bookSlot(
      selectedCentre,
      selectedDate,
      selectedSlot.time,
      selectedCrop,
      quantity
    );

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#138A4B', '#22C55E', '#F59E0B']
    });

    setShowConfirmModal(false);
    navigate('/farmer/booking-success', {
      state: {
        token: newToken,
        centre: selectedCentre,
        date: selectedDate,
        timeSlot: selectedSlot.time,
        crop: selectedCrop,
        quantity: quantity
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

      {/* Selected Centre Summary Banner */}
      <div className="bg-[#EAF7EF] p-4 rounded-3xl border-2 border-emerald-200 flex items-start gap-3 shadow-xs">
        <div className="w-10 h-10 rounded-2xl bg-white text-emerald-800 flex items-center justify-center shrink-0 shadow-2xs">
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
            {selectedCentre.district} • {selectedCentre.distance}
          </div>
        </div>
      </div>

      {/* Date Selector */}
      <div>
        <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          {t('chooseDate')}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {dates.map((d, index) => {
            const isSelected = selectedDate === d.full;
            return (
              <button
                key={index}
                onClick={() => setSelectedDate(d.full)}
                className={`py-3 px-2 rounded-2xl text-center border-2 transition-all flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-[#138A4B] text-white border-[#0B7A3B] shadow-sm scale-102'
                    : 'bg-white text-gray-700 border-emerald-100 hover:border-emerald-300'
                }`}
              >
                <span className={`text-[10px] font-semibold ${isSelected ? 'text-emerald-100' : 'text-gray-400'}`}>
                  {d.day}
                </span>
                <span className="text-sm font-extrabold mt-0.5">
                  {d.date}
                </span>
              </button>
            );
          })}
        </div>
      </div>

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
            const isFull = slot.status === 'FULL';
            const isBreak = slot.status === 'BREAK';

            return (
              <div
                key={slot.id}
                className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                  isFull 
                    ? 'bg-rose-50/50 border-rose-100 opacity-70' 
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
                        <span className="text-rose-600 font-bold">Slot is Full (0 capacity)</span>
                      ) : (
                        isBreak ? (
                          <span className="text-amber-700 font-medium">Lunch & Calibration Break</span>
                        ) : (
                          <span className="text-emerald-700 font-semibold">{slot.available} of {slot.capacity} slots left</span>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  {isFull ? (
                    <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-xl">
                      FULL
                    </span>
                  ) : isBreak ? (
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-xl">
                      BREAK
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOpenBookingModal(slot)}
                      className="py-2 px-4 bg-[#138A4B] hover:bg-[#0B7A3B] active:scale-95 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center gap-1"
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
            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-emerald-100 space-y-2.5 text-xs text-gray-700 mb-5">
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
    </div>
  );
}

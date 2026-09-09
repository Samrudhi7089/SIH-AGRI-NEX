import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  QrCode, 
  ArrowRight, 
  Home, 
  ShieldCheck, 
  BellRing,
  Download,
  Share2
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';

export default function FarmerBookingSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentBooking, t } = useKisan();

  const booking = location.state || currentBooking;

  return (
    <div className="p-4 space-y-4">
      {/* Success Badge & Headline */}
      <div className="text-center pt-3">
        <div className="w-16 h-16 rounded-3xl bg-[#EAF7EF] border-2 border-emerald-300 text-[#138A4B] flex items-center justify-center mx-auto mb-3 shadow-md animate-in zoom-in-50 duration-300">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h1 className="text-2xl font-black text-[#1A2E22] tracking-tight">
          {t('slotBookedSuccess')}
        </h1>
        <p className="text-xs text-gray-600 mt-1 max-w-xs mx-auto">
          {t('notifMessage')}
        </p>
      </div>

      {/* Official Digital E-Token Pass Card */}
      <div className="bg-white rounded-3xl border-2 border-emerald-300 shadow-lg overflow-hidden relative">
        {/* Top Header Strip */}
        <div className="bg-linear-to-r from-[#138A4B] to-[#0B7A3B] text-white p-3.5 px-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌾</span>
            <div>
              <div className="text-xs font-black tracking-wider uppercase">AGRI-NEX E-Token Pass</div>
              <div className="text-[9px] text-emerald-200">Govt APMC Automated Slot System</div>
            </div>
          </div>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
            VERIFIED
          </span>
        </div>

        {/* Big Token Number Callout */}
        <div className="p-5 text-center bg-radial from-[#F4FBF6] to-white border-b border-dashed border-emerald-200">
          <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest">
            {t('tokenNumber')}
          </div>
          <div className="text-4xl font-black text-emerald-950 tracking-tight my-1">
            {booking.token || currentBooking.token}
          </div>
          <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-3 py-0.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Show at Entry Gate & Weighbridge</span>
          </div>
        </div>

        {/* Booking Details Table */}
        <div className="p-5 space-y-3 text-xs text-gray-700">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase">{t('centre')}</div>
              <div className="font-bold text-gray-900 text-sm">
                {booking.centre?.name || booking.centreName || 'Paithan Procurement Centre'}
              </div>
              <div className="text-[11px] text-gray-500">
                {booking.centre?.district || booking.district || 'Chhatrapati Sambhajinagar'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase">{t('date')}</div>
                <div className="font-bold text-gray-900">{booking.date}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase">{t('time')}</div>
                <div className="font-bold text-gray-900">{booking.timeSlot}</div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
            <span className="text-gray-500">Declared Crop:</span>
            <span className="font-bold text-gray-900">{booking.quantity || '420 kg'} {booking.crop || 'Wheat'}</span>
          </div>
        </div>

        {/* QR Code Barcode Representation */}
        <div className="bg-[#F8FAF9] p-3 text-center border-t border-gray-100 flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-white p-1 rounded-lg border border-gray-300 flex items-center justify-center">
            <QrCode className="w-10 h-10 text-gray-800" />
          </div>
          <div className="text-left text-[10px] text-gray-500">
            <div className="font-bold text-gray-700">Digital Gate Pass Hash</div>
            <div className="font-mono text-[9px] text-gray-400">KS-2026-A127-AUTH-SEC</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <button
          onClick={() => navigate('/farmer/queue')}
          className="w-full py-3.5 px-4 bg-[#138A4B] hover:bg-[#0B7A3B] active:scale-[0.99] text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
        >
          <span>{t('trackQueue')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigate('/farmer/dashboard')}
          className="w-full py-3 px-4 bg-white hover:bg-emerald-50 border-2 border-emerald-200 text-emerald-900 font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 text-xs"
        >
          <Home className="w-4 h-4" />
          <span>{t('goToHome')}</span>
        </button>
      </div>
    </div>
  );
}

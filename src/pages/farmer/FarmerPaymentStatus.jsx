import React from 'react';
import { 
  IndianRupee, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Building2, 
  FileText, 
  Download, 
  Sparkles,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import StatusBadge from '../../components/common/StatusBadge';

export default function FarmerPaymentStatus() {
  const { paymentState, farmerProfile, currentBooking, t } = useKisan();

  const isCompleted = paymentState.status === 'COMPLETED';
  const isProcessing = paymentState.status === 'PROCESSING';

  return (
    <div className="p-4 space-y-4">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">
          {t('paymentStatus')}
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Government Direct Benefit Transfer (DBT) MSP tracking portal.
        </p>
      </div>

      {/* Hero Amount & Status Card */}
      <div className={`p-5 rounded-3xl border-2 shadow-md relative overflow-hidden transition-all ${
        isCompleted 
          ? 'bg-linear-to-b from-[#0B7A3B] to-[#065426] text-white border-emerald-500'
          : 'bg-white text-gray-900 border-amber-300 ring-2 ring-amber-500/10'
      }`}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className={`text-[10px] font-bold uppercase tracking-widest ${isCompleted ? 'text-emerald-200' : 'text-gray-500'}`}>
              Approved Procurement Payout
            </div>
            <div className={`text-4xl font-black tracking-tight mt-0.5 flex items-center ${isCompleted ? 'text-white' : 'text-gray-900'}`}>
              <span>{paymentState.amount || '₹25,000'}</span>
            </div>
          </div>

          <StatusBadge 
            status={paymentState.status} 
            size="lg" 
            className={isCompleted ? 'bg-white/20 text-white border-white/30' : ''} 
          />
        </div>

        {/* Payment Subtext / Expected */}
        <div className={`p-3 rounded-2xl text-xs font-medium ${
          isCompleted 
            ? 'bg-white/10 text-emerald-100 border border-white/15' 
            : 'bg-amber-50 text-amber-900 border border-amber-200'
        }`}>
          {isCompleted ? (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>DBT Payout Transferred to Bank Account via PFMS Portal</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{paymentState.expectedDate} via Direct Benefit Transfer</span>
            </div>
          )}
        </div>
      </div>

      {/* Critical Government Disclaimer Note */}
      <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="text-[11px] leading-relaxed">
          <strong className="font-bold">Official DBT Status Tracking: </strong>
          This screen tracks the real-time authorization state from the APMC Treasury. Funds are deposited directly to your Aadhaar-seeded bank account.
        </div>
      </div>

      {/* Payment Information Table */}
      <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-xs space-y-3.5 text-xs text-gray-700">
        <div className="text-xs font-bold text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100">
          Transaction & Bank Record
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">{t('paymentId')}:</span>
          <span className="font-mono font-bold text-gray-900">{paymentState.paymentId}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">{t('txnRef')}:</span>
          <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
            {paymentState.txnRef}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">Beneficiary Name:</span>
          <span className="font-bold text-gray-900">{farmerProfile.name}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">Credit Account:</span>
          <span className="font-bold text-gray-900">{farmerProfile.bankName} (**** {farmerProfile.accountLast4})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">IFSC Code:</span>
          <span className="font-mono font-bold text-gray-700">{farmerProfile.ifsc}</span>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <div className="text-[11px] text-gray-500 mb-1">MSP Rate Breakdown:</div>
          <div className="bg-[#F8FAF9] p-2.5 rounded-xl text-[11px] text-gray-700 font-medium space-y-1">
            <div className="flex justify-between">
              <span>Wheat (4.2 Quintals @ ₹2,275/qtl):</span>
              <span className="font-bold">₹9,555</span>
            </div>
            <div className="flex justify-between">
              <span>State Bonus (₹1,000/qtl):</span>
              <span className="font-bold">₹4,200</span>
            </div>
            <div className="flex justify-between">
              <span>Special Rabi 2026 Procurement Grant:</span>
              <span className="font-bold">₹11,245</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-gray-200 text-emerald-900 font-bold">
              <span>Total Credited:</span>
              <span>₹25,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

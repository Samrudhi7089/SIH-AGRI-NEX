import React, { useState } from 'react';
import { 
  IndianRupee, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Send, 
  FileText, 
  AlertCircle,
  Sparkles,
  Building2
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import StatusBadge from '../../components/common/StatusBadge';
import confetti from 'canvas-confetti';

export default function AuthorityPayments() {
  const { currentBooking, farmerProfile, paymentState, updatePayment, queueList } = useKisan();

  const [selectedToken, setSelectedToken] = useState(currentBooking.token);
  const [amount, setAmount] = useState('25000');
  const [status, setStatus] = useState(paymentState.status || 'PROCESSING');
  const [txnRef, setTxnRef] = useState(paymentState.txnRef || 'TXN98765');
  const [isSuccess, setIsSuccess] = useState(false);

  const activeFarmer = queueList.find(q => q.token === selectedToken) || {
    farmerName: farmerProfile.name,
    crop: currentBooking.crop,
    quantity: currentBooking.quantity,
    token: currentBooking.token
  };

  const handleUpdatePayment = (e) => {
    e.preventDefault();
    updatePayment(selectedToken, {
      status: status.toLowerCase(),
      amount: `₹${parseInt(amount).toLocaleString('en-IN')}`,
      txnRef
    });

    if (status.toUpperCase() === 'COMPLETED') {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#138A4B', '#22C55E', '#F59E0B']
      });
    }

    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-[#0B7A3B]" />
            <h1 className="text-xl font-extrabold text-gray-900">
              Direct Benefit Transfer (DBT) Payment Status Management
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Authorize state procurement payout releases and sync PFMS transaction status with farmers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-600">Farmer:</span>
          <select
            value={selectedToken}
            onChange={(e) => {
              const tok = e.target.value;
              setSelectedToken(tok);
              const f = queueList.find(q => q.token === tok);
              if (f) {
                setAmount(f.amount.replace(/\D/g, '') || '25000');
                setTxnRef(f.txnRef !== '-' ? f.txnRef : `TXN${Math.floor(10000 + Math.random() * 90000)}`);
              }
            }}
            className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl font-black text-xs text-emerald-950 outline-hidden cursor-pointer"
          >
            {queueList.map((item) => (
              <option key={item.token} value={item.token}>
                Token {item.token} - {item.farmerName} ({item.amount})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Payment Update Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs">
          <h2 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
            <span>Treasury Disbursement Form</span>
            <span className="text-xs font-semibold text-emerald-800">PFMS Gateway Link Active</span>
          </h2>

          <form onSubmit={handleUpdatePayment} className="space-y-4 text-xs">
            {/* Beneficiary Header */}
            <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-emerald-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase">Beneficiary</span>
                <div className="font-bold text-gray-900 mt-0.5">{activeFarmer.farmerName}</div>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase">Token Assigned</span>
                <div className="font-black text-emerald-900 mt-0.5">{activeFarmer.token}</div>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase">Procured Grain</span>
                <div className="font-bold text-gray-900 mt-0.5">{activeFarmer.quantity} {activeFarmer.crop}</div>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase">Credit Bank</span>
                <div className="font-bold text-gray-900 mt-0.5">SBI (**** 4912)</div>
              </div>
            </div>

            {/* Amount & Transaction Reference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Procurement Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-500">₹</span>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 bg-[#F8FAF9] border border-emerald-200 rounded-xl font-black text-emerald-950 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Transaction Reference (TXN ID)
                </label>
                <input
                  type="text"
                  required
                  value={txnRef}
                  onChange={(e) => setTxnRef(e.target.value)}
                  className="w-full p-2.5 bg-[#F8FAF9] border border-emerald-200 rounded-xl font-mono font-bold text-gray-900"
                />
              </div>
            </div>

            {/* Payment Status Dropdown */}
            <div>
              <label className="block font-bold text-gray-800 mb-1">
                Payment Status Dropdown
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 bg-emerald-50 border-2 border-emerald-300 rounded-2xl font-black text-emerald-950 text-sm cursor-pointer outline-hidden"
              >
                <option value="PENDING">PENDING (Verification in Progress)</option>
                <option value="PROCESSING">PROCESSING (Initiated via DBT Gateway)</option>
                <option value="COMPLETED">COMPLETED (Successfully Credited to Bank)</option>
                <option value="FAILED">FAILED (Account Seed Error / IFSC Mismatch)</option>
              </select>
            </div>

            {/* Important Prototype Notice */}
            <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>SIH Demonstration Notice: </strong>
                This updates demo state and immediately reflects on the farmer's mobile interface. No live banking APIs are called.
              </span>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="submit"
                className="py-3.5 px-6 bg-[#0B7A3B] hover:bg-[#065426] text-white font-extrabold rounded-2xl shadow-md transition-all flex items-center gap-2 text-xs"
              >
                <Send className="w-4 h-4" />
                <span>Authorize & Update Payment Status</span>
              </button>

              {isSuccess && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Farmer Payment Status Updated!</span>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: Status Summary */}
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-xs font-bold text-gray-900">
                DBT Advice Summary
              </h3>
              <StatusBadge status={status} size="sm" />
            </div>

            <div className="space-y-3 text-xs text-gray-700">
              <div className="bg-[#F8FAF9] p-3 rounded-2xl border border-gray-100 text-center">
                <div className="text-[10px] text-gray-500 font-bold uppercase">Disbursement Amount</div>
                <div className="text-2xl font-black text-emerald-950 mt-1">
                  ₹{parseInt(amount || 0).toLocaleString('en-IN')}
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment Ref:</span>
                  <span className="font-mono font-bold text-gray-900">{txnRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Target Farmer:</span>
                  <span className="font-bold text-gray-900">{activeFarmer.farmerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">PFMS Batch:</span>
                  <span className="font-mono font-semibold text-gray-600">MH-DBT-2026-B81</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 text-center">
            <div className="text-[10px] text-gray-400">
              Authorized by Sunil Deshmukh (Procurement Officer #402)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

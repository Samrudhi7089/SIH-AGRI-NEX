import React from 'react';
import { MessageSquare, X, ShieldCheck } from 'lucide-react';
import { useKisan } from '../../context/KisanContext';

export default function SMSNotificationSimulator() {
  const { activeSMS, setActiveSMS } = useKisan();

  if (!activeSMS) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md animate-in slide-in-from-top-6 duration-300">
      <div className="bg-[#1E2922]/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-2xl border border-emerald-500/30 flex items-start gap-3 ring-4 ring-black/10">
        <div className="w-9 h-9 rounded-xl bg-emerald-600/90 flex items-center justify-center shrink-0 shadow-inner">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <span className="text-[11px] font-bold tracking-wide uppercase text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> GOV-AGRI / AGRI-NEX SMS
            </span>
            <span className="text-[10px] text-gray-400">Now</span>
          </div>
          <p className="text-xs font-semibold text-white leading-tight mb-1">{activeSMS.title}</p>
          <p className="text-xs text-emerald-100/90 leading-snug">{activeSMS.message}</p>
        </div>
        <button
          onClick={() => setActiveSMS(null)}
          className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

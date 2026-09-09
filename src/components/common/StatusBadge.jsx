import React from 'react';
import { CheckCircle2, Clock, AlertCircle, RefreshCw, XCircle, Coffee } from 'lucide-react';

export default function StatusBadge({ status, size = 'md', className = '' }) {
  const norm = (status || '').toUpperCase();

  let styles = 'bg-gray-100 text-gray-700 border-gray-200';
  let icon = <Clock className="w-3.5 h-3.5" />;
  let label = status;

  if (norm === 'COMPLETED' || norm === 'CONFIRMED' || norm === 'SUCCESS' || norm === 'VERIFIED') {
    styles = 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-1 ring-emerald-500/20';
    icon = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
    label = norm === 'COMPLETED' ? 'Completed' : (norm === 'CONFIRMED' ? 'Confirmed' : 'Verified');
  } else if (norm === 'PROCESSING' || norm === 'IN PROGRESS' || norm === 'IN_PROGRESS' || norm === 'PROCUREMENT_IN_PROGRESS') {
    styles = 'bg-amber-50 text-amber-800 border-amber-300 ring-1 ring-amber-500/20 animate-pulse-subtle';
    icon = <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />;
    label = 'Processing';
  } else if (norm === 'YOUR_TURN' || norm === 'YOUR TURN' || norm === 'APPROACHING') {
    styles = 'bg-blue-50 text-blue-800 border-blue-300 ring-1 ring-blue-500/20 animate-bounce';
    icon = <AlertCircle className="w-3.5 h-3.5 text-blue-600" />;
    label = 'Your Turn!';
  } else if (norm === 'WAITING' || norm === 'PENDING' || norm === 'SLOT_BOOKED' || norm === 'REGISTERED') {
    styles = 'bg-slate-100 text-slate-700 border-slate-300';
    icon = <Clock className="w-3.5 h-3.5 text-slate-500" />;
    label = norm === 'WAITING' ? 'Waiting' : (norm === 'PENDING' ? 'Pending' : 'In Line');
  } else if (norm === 'OPEN' || norm === 'AVAILABLE') {
    styles = 'bg-green-50 text-green-700 border-green-200';
    icon = <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />;
    label = 'OPEN';
  } else if (norm === 'FULL') {
    styles = 'bg-rose-50 text-rose-700 border-rose-200 font-semibold';
    icon = <XCircle className="w-3.5 h-3.5 text-rose-600" />;
    label = 'FULL';
  } else if (norm === 'BREAK') {
    styles = 'bg-amber-50 text-amber-700 border-amber-200';
    icon = <Coffee className="w-3.5 h-3.5 text-amber-600" />;
    label = 'BREAK';
  } else if (norm === 'FAILED' || norm === 'REJECTED') {
    styles = 'bg-red-50 text-red-700 border-red-200';
    icon = <XCircle className="w-3.5 h-3.5 text-red-600" />;
    label = norm === 'REJECTED' ? 'Rejected' : 'Failed';
  }

  const sizeClasses = size === 'sm' 
    ? 'text-xs px-2 py-0.5 gap-1' 
    : (size === 'lg' ? 'text-sm px-3.5 py-1.5 gap-2 font-semibold' : 'text-xs px-2.5 py-1 gap-1.5 font-medium');

  return (
    <span className={`inline-flex items-center rounded-full border ${styles} ${sizeClasses} ${className}`}>
      {icon}
      <span>{label}</span>
    </span>
  );
}

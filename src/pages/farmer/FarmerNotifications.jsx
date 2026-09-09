import React, { useState } from 'react';
import { 
  Bell, 
  Clock, 
  CheckCircle2, 
  IndianRupee, 
  FileText, 
  Truck, 
  MessageSquare, 
  Sparkles,
  Info
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';

export default function FarmerNotifications() {
  const { notifications, t } = useKisan();
  const [activeTab, setActiveTab] = useState('all');

  const filteredNotifs = notifications.filter(n => {
    if (activeTab === 'all') return true;
    return n.type === activeTab;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'queue':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'procurement':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'payment':
        return <IndianRupee className="w-5 h-5 text-amber-600" />;
      default:
        return <Bell className="w-5 h-5 text-purple-600" />;
    }
  };

  const getBg = (type) => {
    switch (type) {
      case 'queue':
        return 'bg-blue-50 border-blue-200';
      case 'procurement':
        return 'bg-emerald-50 border-emerald-200';
      case 'payment':
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-purple-50 border-purple-200';
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">
          {t('navNotifications')}
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Real-time SMS & App updates for Token and Procurement events.
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-white border border-emerald-100 rounded-2xl shadow-2xs">
        {['all', 'queue', 'procurement', 'payment'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all capitalize ${
              activeTab === tab
                ? 'bg-[#138A4B] text-white shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-gray-100">
            <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <div className="text-xs font-bold text-gray-700">No alerts in this category</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Updates will appear when queue progresses</div>
          </div>
        ) : (
          filteredNotifs.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-3xl border-2 transition-all flex items-start gap-3.5 shadow-2xs bg-white ${
                !n.read ? 'border-emerald-200 ring-2 ring-emerald-500/10' : 'border-gray-100'
              }`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${getBg(n.type)}`}>
                {getIcon(n.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-xs font-bold text-gray-900 truncate">
                    {n.title}
                  </span>
                  <span className="text-[10px] text-gray-400 shrink-0 font-medium">
                    {n.timestamp}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-snug">
                  {n.message}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {n.type} Alert
                  </span>
                  <span className="text-[10px] text-gray-400">Delivered via SMS + App</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

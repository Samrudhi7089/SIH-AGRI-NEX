import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Building2, 
  Clock, 
  Calendar, 
  CalendarClock, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Sliders, 
  History, 
  Plus, 
  Lock, 
  AlertCircle, 
  Save, 
  X, 
  Search, 
  Filter, 
  Scale, 
  Coffee, 
  Edit3, 
  Sparkles,
  Info
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import StatusBadge from '../../components/common/StatusBadge';

export default function AuthoritySlots() {
  const { selectedCentre } = useOutletContext();
  const { 
    slotsList, 
    centreOperations, 
    operationalAuditLog, 
    updateCentreOperations, 
    updateSlotCapacity, 
    declareHoliday 
  } = useKisan();

  const [activeTab, setActiveTab] = useState('slots'); // 'slots' | 'operations' | 'audit' | 'holidays'

  // Modal states
  const [showCapacityModal, setShowCapacityModal] = useState(false);
  const [selectedSlotForEdit, setSelectedSlotForEdit] = useState(null);
  const [capacityForm, setCapacityForm] = useState({ capacity: 20, status: 'OPEN', reason: '' });

  const [showHolidayModal, setShowHolidayModal] = useState(false);
  const [holidayForm, setHolidayForm] = useState({ date: '18 September 2026', occasion: '', reason: '' });

  const [showClosureModal, setShowClosureModal] = useState(false);
  const [closureForm, setClosureForm] = useState({ isClosed: !centreOperations.isTemporarilyClosed, reason: '' });

  // Audit search & filter
  const [auditSearch, setAuditSearch] = useState('');
  const [auditCategory, setAuditCategory] = useState('all');

  // Open edit slot modal
  const handleOpenSlotModal = (slot) => {
    setSelectedSlotForEdit(slot);
    setCapacityForm({
      capacity: slot.capacity,
      status: slot.status,
      reason: ''
    });
    setShowCapacityModal(true);
  };

  // Submit slot capacity change with mandatory reason
  const handleSaveSlotCapacity = (e) => {
    e.preventDefault();
    if (!capacityForm.reason.trim()) {
      alert('An official operational reason is mandatory for all capacity changes.');
      return;
    }

    updateSlotCapacity(
      selectedSlotForEdit.id,
      capacityForm.capacity,
      capacityForm.status,
      capacityForm.reason
    );

    setShowCapacityModal(false);
  };

  // Submit declare holiday
  const handleSaveHoliday = (e) => {
    e.preventDefault();
    if (!holidayForm.occasion.trim() || !holidayForm.reason.trim()) {
      alert('Please provide occasion and reason for declaring a holiday.');
      return;
    }

    declareHoliday(holidayForm.date, holidayForm.occasion, holidayForm.reason);
    setShowHolidayModal(false);
    setHolidayForm({ date: '18 September 2026', occasion: '', reason: '' });
  };

  // Submit emergency closure toggle
  const handleToggleClosure = (e) => {
    e.preventDefault();
    if (!closureForm.reason.trim()) {
      alert('An official operational reason is mandatory to change centre intake closure status.');
      return;
    }

    updateCentreOperations({
      isTemporarilyClosed: closureForm.isClosed,
      closureReason: closureForm.isClosed ? closureForm.reason : ''
    }, closureForm.reason);

    setShowClosureModal(false);
  };

  // Filtered audit logs
  const filteredAuditLogs = operationalAuditLog.filter(log => {
    const matchSearch = !auditSearch ||
      log.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.reason.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.officerName.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.id.toLowerCase().includes(auditSearch.toLowerCase());

    const matchCategory = auditCategory === 'all' || log.category.toLowerCase().includes(auditCategory.toLowerCase());
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#0B7A3B]" />
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
              Centre Capacity & Operations
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-700" />
              <span>Anti-Manipulation Protocol Active</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Configure aggregate throughput, slot quotas, and operating calendars for {selectedCentre?.name || centreOperations.centreName}.
          </p>
        </div>

        {/* Zero Manual Assignment Guarantee Badge */}
        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex items-center gap-3 text-xs text-emerald-950">
          <div className="w-8 h-8 rounded-xl bg-[#0B7A3B] text-white flex items-center justify-center shrink-0 font-bold">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-[11px] uppercase tracking-wider text-emerald-900">
              Fairness Assurance
            </div>
            <div className="text-[10px] text-emerald-800">
              Individual farmer scheduling is 100% automated via algorithmic FCFS. Authorities cannot manually pick or favor farmers.
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('slots')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'slots'
              ? 'bg-[#0B7A3B] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <CalendarClock className="w-4 h-4" />
          <span>Hourly Slot Capacity ({slotsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('operations')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'operations'
              ? 'bg-[#0B7A3B] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Centre Operations & Timing</span>
        </button>

        <button
          onClick={() => setActiveTab('holidays')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'holidays'
              ? 'bg-[#0B7A3B] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Holidays & Closures ({centreOperations.holidays?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'audit'
              ? 'bg-[#0B7A3B] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Anti-Manipulation Audit Log ({operationalAuditLog.length})</span>
        </button>
      </div>

      {/* TAB 1: HOURLY SLOTS CAPACITY */}
      {activeTab === 'slots' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <h2 className="font-bold text-gray-900 text-sm">Automated Time Slot Capacity Grid</h2>
              <p className="text-gray-500 text-[11px] mt-0.5">
                Farmers self-select available slots. Adjusting capacity updates slot openings live with audit recording.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs">Default Quota:</span>
              <span className="font-extrabold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                {centreOperations.defaultHourlyCapacity} farmers / hr
              </span>
            </div>
          </div>

          {/* Slots Table */}
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAF9] text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-100">
                  <tr>
                    <th className="py-3.5 px-5">Time Window</th>
                    <th className="py-3.5 px-5">Intake Quota</th>
                    <th className="py-3.5 px-5">System Booked</th>
                    <th className="py-3.5 px-5">Available Slots</th>
                    <th className="py-3.5 px-5">Operational State</th>
                    <th className="py-3.5 px-5 text-right">Capacity Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {slotsList.map((slot) => {
                    const isBreak = slot.status === 'BREAK';
                    const isFull = slot.status === 'FULL';

                    return (
                      <tr key={slot.id} className="hover:bg-emerald-50/30 transition-colors">
                        <td className="py-4 px-5">
                          <div className="font-bold text-gray-900 text-sm">{slot.time}</div>
                          <div className="text-[10px] text-gray-400">10 September 2026</div>
                        </td>

                        <td className="py-4 px-5 font-bold text-gray-800">
                          {isBreak ? (
                            <span className="text-amber-700">0 (Calibration)</span>
                          ) : (
                            <span>{slot.capacity} farmers</span>
                          )}
                        </td>

                        <td className="py-4 px-5 font-bold text-gray-700">
                          {isBreak ? '-' : `${slot.booked} registered`}
                        </td>

                        <td className="py-4 px-5">
                          <span className={`font-extrabold text-sm ${slot.available > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                            {isBreak ? '-' : `${slot.available} open`}
                          </span>
                        </td>

                        <td className="py-4 px-5">
                          <StatusBadge status={slot.status} size="sm" />
                        </td>

                        <td className="py-4 px-5 text-right">
                          <button
                            onClick={() => handleOpenSlotModal(slot)}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-200 transition-colors inline-flex items-center gap-1"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Adjust Capacity</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CENTRE OPERATIONS & TIMING */}
      {activeTab === 'operations' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs space-y-5">
            <div>
              <h2 className="text-sm font-bold text-gray-900 flex items-center justify-between pb-2 border-b border-gray-100">
                <span>Core Operating Parameters</span>
                <span className="text-xs text-emerald-700 font-semibold">APMC Directive #MH-402</span>
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Any modifications to operating hours, default intake, or grace period require an audit justification.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-emerald-100 space-y-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Operating Window</span>
                <div className="text-base font-extrabold text-gray-900">{centreOperations.operatingHours}</div>
                <div className="text-[10px] text-gray-500">Mandi yard gates & electronic weighbridge active</div>
              </div>

              <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-emerald-100 space-y-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Default Slot Capacity</span>
                <div className="text-base font-extrabold text-emerald-900">{centreOperations.defaultHourlyCapacity} Farmers / Hour</div>
                <div className="text-[10px] text-gray-500">Calculated based on 2 active weighbridges</div>
              </div>

              <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-emerald-100 space-y-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Arrival Grace Period</span>
                <div className="text-base font-extrabold text-emerald-900">{centreOperations.gracePeriodMinutes} Minutes</div>
                <div className="text-[10px] text-gray-500">Auto-rescheduling triggers if farmer misses grace period</div>
              </div>

              <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-emerald-100 space-y-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Active Electronic Weighbridges</span>
                <div className="text-base font-extrabold text-gray-900">{centreOperations.activeWeighbridges} Hardware Stations</div>
                <div className="text-[10px] text-gray-500">Telemetry automated gross & tare sampling</div>
              </div>
            </div>

            {/* Temporary Closure Card */}
            <div className={`p-4 rounded-2xl border-2 transition-all ${
              centreOperations.isTemporarilyClosed 
                ? 'bg-rose-50 border-rose-300' 
                : 'bg-emerald-50/50 border-emerald-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    {centreOperations.isTemporarilyClosed ? (
                      <span className="text-rose-700 flex items-center gap-1 font-extrabold">
                        <AlertTriangle className="w-4 h-4" /> Centre Intake Temporarily Suspended
                      </span>
                    ) : (
                      <span className="text-emerald-800 flex items-center gap-1 font-extrabold">
                        <CheckCircle2 className="w-4 h-4" /> Centre Operations Normal (Intake Active)
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-gray-600 mt-0.5">
                    {centreOperations.isTemporarilyClosed 
                      ? `Reason: ${centreOperations.closureReason || 'Emergency weather / technical maintenance'}`
                      : 'Slots are open for farmer self-booking.'}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setClosureForm({
                      isClosed: !centreOperations.isTemporarilyClosed,
                      reason: ''
                    });
                    setShowClosureModal(true);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                    centreOperations.isTemporarilyClosed
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-rose-600 hover:bg-rose-700 text-white'
                  }`}
                >
                  {centreOperations.isTemporarilyClosed ? 'Resume Operations' : 'Trigger Emergency Closure'}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Info & Policy Guidelines */}
          <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs space-y-4 text-xs">
            <div className="text-xs font-bold text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0B7A3B]" />
              <span>APMC Operating Guidelines</span>
            </div>

            <div className="space-y-2.5 text-gray-600 text-[11px] leading-relaxed">
              <div className="p-3 bg-[#F8FAF9] rounded-xl border border-gray-100">
                <strong className="text-gray-900 block mb-0.5">1. Server-Side Capacity Check:</strong>
                Slot availability is dynamically verified in real time. Overbooking is strictly prevented by code constraints.
              </div>

              <div className="p-3 bg-[#F8FAF9] rounded-xl border border-gray-100">
                <strong className="text-gray-900 block mb-0.5">2. Mandatory Audit Reasoning:</strong>
                Every change to slot capacity or operating hours requires an official reason logged into the permanent register.
              </div>

              <div className="p-3 bg-[#F8FAF9] rounded-xl border border-gray-100">
                <strong className="text-gray-900 block mb-0.5">3. Algorithmic Grace Period:</strong>
                If a farmer misses their 15-minute window, the slot is released to the next farmer and a new slot is automatically reserved.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HOLIDAYS & MAINTENANCE CLOSURES */}
      {activeTab === 'holidays' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Official Holidays & Mandi Maintenance Closures</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Farmers cannot book slots on declared holiday dates. Each declaration is logged with officer credentials.
              </p>
            </div>

            <button
              onClick={() => setShowHolidayModal(true)}
              className="py-2.5 px-4 bg-[#0B7A3B] hover:bg-[#065426] text-white font-bold rounded-xl text-xs shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Declare Holiday</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {centreOperations.holidays?.map((hol) => (
              <div key={hol.id} className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs space-y-2.5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-700 flex items-center justify-center font-bold">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-gray-900">{hol.occasion}</h3>
                      <div className="text-xs font-bold text-emerald-800">{hol.date}</div>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-900">
                    Centre Closed
                  </span>
                </div>

                <div className="bg-[#F8FAF9] p-3 rounded-2xl border border-gray-100 text-xs text-gray-600">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400">Declared By:</span>
                    <span className="font-bold text-gray-800">{hol.declaredBy}</span>
                  </div>
                  <div className="flex justify-between text-[11px] mt-1">
                    <span className="text-gray-400">Recorded Timestamp:</span>
                    <span className="font-mono text-gray-700">{hol.declaredAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ANTI-MANIPULATION AUDIT LOG */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-[#0B7A3B]" />
                <h2 className="text-base font-extrabold text-gray-900">
                  Tamper-Proof Operational Audit Trail
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Complete verifiable record of all capacity shifts, holiday declarations, and emergency changes with mandatory reasons.
              </p>
            </div>

            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 self-start sm:self-auto">
              Total Recorded Events: {operationalAuditLog.length}
            </span>
          </div>

          {/* Audit Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                placeholder="Search audit trail by keyword, reason, or officer..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-emerald-200 focus:border-[#0B7A3B] rounded-2xl text-xs font-semibold text-gray-900 outline-hidden shadow-xs"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={auditCategory}
                onChange={(e) => setAuditCategory(e.target.value)}
                className="p-2.5 bg-white border border-emerald-200 rounded-2xl text-xs font-bold text-gray-800 focus:border-[#0B7A3B] outline-hidden shadow-xs cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="Capacity">Capacity Adjustments</option>
                <option value="Operating Hours">Operating Hours</option>
                <option value="Holiday">Holidays</option>
                <option value="Closure">Temporary Closures</option>
              </select>
            </div>
          </div>

          {/* Audit Log Table */}
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAF9] text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-100">
                  <tr>
                    <th className="py-3.5 px-4">Event ID & Time</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Action Performed</th>
                    <th className="py-3.5 px-4">Shift Details</th>
                    <th className="py-3.5 px-4">Recorded Official Reason</th>
                    <th className="py-3.5 px-4">Authorized Officer</th>
                    <th className="py-3.5 px-4 text-right">Integrity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {filteredAuditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-emerald-50/20 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-gray-900">{log.id}</div>
                        <div className="text-[10px] text-gray-500">{log.timestamp}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-emerald-100 text-emerald-900">
                          {log.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-gray-900 max-w-[200px]">
                        {log.action}
                      </td>

                      <td className="py-3.5 px-4 text-[11px] text-gray-600">
                        <div className="line-through text-gray-400">{log.previousValue}</div>
                        <div className="text-emerald-900 font-bold">{log.newValue}</div>
                      </td>

                      <td className="py-3.5 px-4 text-gray-700 max-w-[240px] text-[11px]">
                        <span className="bg-[#F8FAF9] px-2 py-1 rounded-lg border border-gray-100 block">
                          "{log.reason}"
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-gray-900">{log.officerName}</div>
                        <div className="text-[10px] text-gray-400">{log.officerId}</div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Verified</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: ADJUST CAPACITY (WITH MANDATORY REASON) */}
      {showCapacityModal && selectedSlotForEdit && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-emerald-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    Adjust Slot Intake Capacity
                  </h3>
                  <div className="text-xs text-emerald-800 font-semibold">{selectedSlotForEdit.time}</div>
                </div>
              </div>
              <button onClick={() => setShowCapacityModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSlotCapacity} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Farmer Capacity (Quota)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    value={capacityForm.capacity}
                    onChange={(e) => setCapacityForm({ ...capacityForm, capacity: e.target.value })}
                    className="w-full p-2.5 bg-[#F8FAF9] border border-emerald-200 rounded-xl font-black text-gray-900 text-sm outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Slot Status
                  </label>
                  <select
                    value={capacityForm.status}
                    onChange={(e) => setCapacityForm({ ...capacityForm, status: e.target.value })}
                    className="w-full p-2.5 bg-[#F8FAF9] border border-emerald-200 rounded-xl font-bold text-gray-900 cursor-pointer outline-hidden"
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="FULL">FULL</option>
                    <option value="BREAK">BREAK (Lunch/Calibration)</option>
                  </select>
                </div>
              </div>

              {/* Mandatory Reason Input */}
              <div>
                <label className="block font-bold text-gray-900 mb-1 flex items-center justify-between">
                  <span>Official Operational Reason (Mandatory)</span>
                  <span className="text-[10px] text-rose-600">* Required for Audit Log</span>
                </label>
                <textarea
                  required
                  rows="3"
                  value={capacityForm.reason}
                  onChange={(e) => setCapacityForm({ ...capacityForm, reason: e.target.value })}
                  placeholder="e.g., Load-cell recalibration, extra weighbridge activated for peak morning intake..."
                  className="w-full p-3 bg-[#F8FAF9] border-2 border-emerald-200 focus:border-[#0B7A3B] rounded-xl text-xs font-semibold text-gray-900 outline-hidden resize-none"
                ></textarea>
              </div>

              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  This change will be recorded under Officer #402 with an immutable timestamp.
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCapacityModal(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-2 py-3 bg-[#0B7A3B] hover:bg-[#065426] text-white font-bold rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Capacity & Log Reason</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: DECLARE HOLIDAY */}
      {showHolidayModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-emerald-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#0B7A3B]" />
                <span>Declare Procurement Holiday</span>
              </h3>
              <button onClick={() => setShowHolidayModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveHoliday} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Holiday Date
                </label>
                <input
                  type="text"
                  required
                  value={holidayForm.date}
                  onChange={(e) => setHolidayForm({ ...holidayForm, date: e.target.value })}
                  placeholder="e.g. 18 September 2026"
                  className="w-full p-2.5 bg-[#F8FAF9] border border-emerald-200 rounded-xl font-bold text-gray-900 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Occasion / Holiday Name
                </label>
                <input
                  type="text"
                  required
                  value={holidayForm.occasion}
                  onChange={(e) => setHolidayForm({ ...holidayForm, occasion: e.target.value })}
                  placeholder="e.g. Regional Mandi Holiday / Power Maintenance"
                  className="w-full p-2.5 bg-[#F8FAF9] border border-emerald-200 rounded-xl font-bold text-gray-900 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-900 mb-1">
                  Reason for Declaration (Mandatory)
                </label>
                <textarea
                  required
                  rows="3"
                  value={holidayForm.reason}
                  onChange={(e) => setHolidayForm({ ...holidayForm, reason: e.target.value })}
                  placeholder="Official administrative reason for closure..."
                  className="w-full p-3 bg-[#F8FAF9] border-2 border-emerald-200 focus:border-[#0B7A3B] rounded-xl text-xs font-semibold text-gray-900 outline-hidden resize-none"
                ></textarea>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowHolidayModal(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-2 py-3 bg-[#0B7A3B] hover:bg-[#065426] text-white font-bold rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Declare Holiday & Log</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: EMERGENCY CLOSURE TOGGLE */}
      {showClosureModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-emerald-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <span>{closureForm.isClosed ? 'Suspend Centre Intake' : 'Resume Centre Intake'}</span>
              </h3>
              <button onClick={() => setShowClosureModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleToggleClosure} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-900 mb-1">
                  Reason for {closureForm.isClosed ? 'Suspension' : 'Resumption'} (Mandatory)
                </label>
                <textarea
                  required
                  rows="3"
                  value={closureForm.reason}
                  onChange={(e) => setClosureForm({ ...closureForm, reason: e.target.value })}
                  placeholder="e.g. Unseasonal rain storm, APMC covered shed full, weighbridge sensor malfunction..."
                  className="w-full p-3 bg-[#F8FAF9] border-2 border-emerald-200 focus:border-[#0B7A3B] rounded-xl text-xs font-semibold text-gray-900 outline-hidden resize-none"
                ></textarea>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowClosureModal(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-2 py-3 text-white font-bold rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 ${
                    closureForm.isClosed ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  <span>Confirm Status Change & Log</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

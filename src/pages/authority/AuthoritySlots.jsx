import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  CalendarClock, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Coffee, 
  Save, 
  X,
  Sparkles,
  Building2,
  Calendar
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import StatusBadge from '../../components/common/StatusBadge';

export default function AuthoritySlots() {
  const { selectedCentre } = useOutletContext();
  const { slotsList, addSlot, updateSlot } = useKisan();

  const [selectedDate, setSelectedDate] = useState('10 September 2026');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSlotId, setEditingSlotId] = useState(null);

  // Edit slot form state
  const [editForm, setEditForm] = useState({ capacity: 20, status: 'OPEN' });

  // Add slot form state
  const [newSlotForm, setNewSlotForm] = useState({
    time: '05:00 – 06:00',
    capacity: 20,
    booked: 0,
    available: 20,
    status: 'OPEN'
  });

  const handleStartEdit = (slot) => {
    setEditingSlotId(slot.id);
    setEditForm({ capacity: slot.capacity, status: slot.status });
  };

  const handleSaveEdit = (slotId) => {
    const slot = slotsList.find(s => s.id === slotId);
    const capacityNum = parseInt(editForm.capacity) || 0;
    const availableNum = Math.max(0, capacityNum - (slot?.booked || 0));
    const statusVal = availableNum === 0 ? 'FULL' : editForm.status;

    updateSlot(slotId, {
      capacity: capacityNum,
      available: availableNum,
      status: statusVal
    });
    setEditingSlotId(null);
  };

  const handleCreateSlot = (e) => {
    e.preventDefault();
    const capacityNum = parseInt(newSlotForm.capacity) || 20;
    addSlot({
      ...newSlotForm,
      capacity: capacityNum,
      booked: 0,
      available: capacityNum,
      status: 'OPEN'
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-[#0B7A3B]" />
            <h1 className="text-xl font-extrabold text-gray-900">
              Manage Procurement Slots
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Configure hourly farmer intake capacity and operational breaks for {selectedCentre?.name}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 rounded-xl text-xs font-bold text-emerald-900 border border-emerald-200">
            <Calendar className="w-4 h-4 text-emerald-700" />
            <span>{selectedDate}</span>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="py-2 px-4 bg-[#0B7A3B] hover:bg-[#065426] text-white font-bold rounded-xl text-xs shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Slot</span>
          </button>
        </div>
      </div>

      {/* Slots Table */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAF9] text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-5">Time Window</th>
                <th className="py-3.5 px-5">Intake Capacity</th>
                <th className="py-3.5 px-5">Booked</th>
                <th className="py-3.5 px-5">Available</th>
                <th className="py-3.5 px-5">Slot State</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {slotsList.map((slot) => {
                const isEditing = editingSlotId === slot.id;
                const isBreak = slot.status === 'BREAK';

                return (
                  <tr key={slot.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-bold text-gray-900 text-sm">{slot.time}</div>
                    </td>

                    <td className="py-4 px-5">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editForm.capacity}
                          onChange={(e) => setEditForm({ ...editForm, capacity: e.target.value })}
                          className="w-20 px-2 py-1 bg-white border border-emerald-300 rounded-lg text-xs font-bold"
                        />
                      ) : (
                        <span className="font-bold text-gray-800">{isBreak ? '-' : slot.capacity}</span>
                      )}
                    </td>

                    <td className="py-4 px-5">
                      <span className="font-bold text-gray-700">{isBreak ? '-' : slot.booked}</span>
                    </td>

                    <td className="py-4 px-5">
                      <span className={`font-extrabold ${slot.available > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {isBreak ? '-' : slot.available}
                      </span>
                    </td>

                    <td className="py-4 px-5">
                      {isEditing ? (
                        <select
                          value={editForm.status}
                          onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                          className="px-2 py-1 bg-white border border-emerald-300 rounded-lg text-xs font-bold"
                        >
                          <option value="OPEN">OPEN</option>
                          <option value="FULL">FULL</option>
                          <option value="BREAK">BREAK</option>
                        </select>
                      ) : (
                        <StatusBadge status={slot.status} size="sm" />
                      )}
                    </td>

                    <td className="py-4 px-5 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleSaveEdit(slot.id)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={() => setEditingSlotId(null)}
                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(slot)}
                          className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-emerald-100 text-gray-700 hover:text-emerald-900 font-semibold text-xs transition-colors inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Slot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-emerald-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-[#0B7A3B]" />
                <span>Create New Procurement Slot</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSlot} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Time Window Range</label>
                <input
                  type="text"
                  required
                  value={newSlotForm.time}
                  onChange={(e) => setNewSlotForm({ ...newSlotForm, time: e.target.value })}
                  placeholder="e.g. 05:00 – 06:00"
                  className="w-full p-2.5 bg-[#F8FAF9] border border-emerald-200 rounded-xl font-bold text-gray-900 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Hourly Farmer Capacity</label>
                <input
                  type="number"
                  required
                  value={newSlotForm.capacity}
                  onChange={(e) => setNewSlotForm({ ...newSlotForm, capacity: e.target.value })}
                  className="w-full p-2.5 bg-[#F8FAF9] border border-emerald-200 rounded-xl font-bold text-gray-900 outline-hidden"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-2 py-2.5 bg-[#0B7A3B] hover:bg-[#065426] text-white font-bold rounded-xl shadow-sm"
                >
                  Add Slot Window
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

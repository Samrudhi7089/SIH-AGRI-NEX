import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  CheckCircle2, 
  Clock, 
  X, 
  Building2, 
  Scale, 
  CreditCard,
  Layers,
  Sparkles,
  MapPin,
  Calendar,
  FileCheck2
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import { generateScalableFarmerList } from '../../data/mockData';
import StatusBadge from '../../components/common/StatusBadge';

export default function AuthorityFarmers() {
  const navigate = useNavigate();
  const { currentBooking, updateProcurement, updatePayment } = useKisan();

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCrop, setFilterCrop] = useState('all');
  const [filterDistrict, setFilterDistrict] = useState('all');

  // Selected farmer for detail modal (Screen 17)
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  // Scalable generator output
  const data = generateScalableFarmerList(page, pageSize, search, filterStatus, 'all', filterCrop);

  const handleOpenDetails = (farmer) => {
    setSelectedFarmer(farmer);
  };

  return (
    <div className="space-y-6">
      {/* Scalability Overview Banner (Section 6) */}
      <div className="bg-linear-to-r from-[#0B7A3B] to-[#065426] text-white p-5 rounded-3xl shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-300" />
              <h1 className="text-xl font-black tracking-tight">
                Scalable Farmer Directory & Architecture
              </h1>
              <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                20,000 Capacity
              </span>
            </div>
            <p className="text-xs text-emerald-100 mt-1 max-w-2xl">
              Hierarchical Architecture: <strong className="text-white">State → District → APMC Centre → Date → Hourly Slot → Real-Time Queue</strong>.
              Enables seamless throughput with low latency and distributed loads.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 text-xs text-center shrink-0">
            <div>
              <div className="text-[10px] text-emerald-200">Registered Pool</div>
              <div className="text-lg font-black text-white">20,000</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div>
              <div className="text-[10px] text-emerald-200">Total Districts</div>
              <div className="text-lg font-black text-white">4</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div>
              <div className="text-[10px] text-emerald-200">Mandi Nodes</div>
              <div className="text-lg font-black text-white">12</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search Name, Token, ID, Mobile..."
              className="w-full pl-9 pr-3 py-2 bg-[#F8FAF9] border border-emerald-200 rounded-xl text-xs font-semibold text-gray-900 outline-hidden focus:border-[#0B7A3B]"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
              className="w-full p-2 bg-[#F8FAF9] border border-emerald-200 rounded-xl text-xs font-semibold text-gray-800 outline-hidden cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Waiting">Waiting</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Slot Booked">Slot Booked</option>
            </select>
          </div>

          {/* Crop Filter */}
          <div>
            <select
              value={filterCrop}
              onChange={(e) => { setFilterCrop(e.target.value); setPage(1); }}
              className="w-full p-2 bg-[#F8FAF9] border border-emerald-200 rounded-xl text-xs font-semibold text-gray-800 outline-hidden cursor-pointer"
            >
              <option value="all">All Crops</option>
              <option value="Wheat">Wheat (गेहूं)</option>
              <option value="Soybean">Soybean (सोयाबीन)</option>
              <option value="Cotton">Cotton (कपास)</option>
              <option value="Maize">Maize (मक्का)</option>
              <option value="Jowar">Jowar (ज्वार)</option>
            </select>
          </div>

          {/* District Filter */}
          <div>
            <select
              value={filterDistrict}
              onChange={(e) => { setFilterDistrict(e.target.value); setPage(1); }}
              className="w-full p-2 bg-[#F8FAF9] border border-emerald-200 rounded-xl text-xs font-semibold text-gray-800 outline-hidden cursor-pointer"
            >
              <option value="all">All Districts (Maharashtra)</option>
              <option value="CS">Chhatrapati Sambhajinagar</option>
              <option value="Jalna">Jalna</option>
              <option value="Beed">Beed</option>
              <option value="Ahmednagar">Ahmednagar</option>
            </select>
          </div>
        </div>
      </div>

      {/* Farmers Scalable Table */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAF9] text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-5">Farmer</th>
                <th className="py-3.5 px-5">Farmer ID</th>
                <th className="py-3.5 px-5">Village / APMC</th>
                <th className="py-3.5 px-5">Crop Declared</th>
                <th className="py-3.5 px-5">Token</th>
                <th className="py-3.5 px-5">Procurement Status</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {data.farmers.map((farmer) => {
                const isRamesh = farmer.token === currentBooking.token;
                return (
                  <tr 
                    key={farmer.farmerId} 
                    className={`hover:bg-emerald-50/30 transition-colors ${
                      isRamesh ? 'bg-[#F4FBF6] font-semibold ring-1 ring-emerald-200' : ''
                    }`}
                  >
                    <td className="py-4 px-5">
                      <div className="font-bold text-gray-900 text-sm">{farmer.farmerName}</div>
                      <div className="text-[11px] text-gray-500">{farmer.mobile}</div>
                    </td>

                    <td className="py-4 px-5">
                      <span className="font-mono font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">
                        {farmer.farmerId}
                      </span>
                    </td>

                    <td className="py-4 px-5">
                      <div className="font-bold text-gray-800">{farmer.village}</div>
                      <div className="text-[10px] text-gray-400">{farmer.centre || 'Paithan Centre'}</div>
                    </td>

                    <td className="py-4 px-5">
                      <div className="font-bold text-gray-900">{farmer.crop}</div>
                      <div className="text-[11px] text-emerald-800 font-semibold">{farmer.quantity}</div>
                    </td>

                    <td className="py-4 px-5">
                      <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-950 font-black text-xs inline-flex items-center justify-center">
                        {farmer.token}
                      </span>
                    </td>

                    <td className="py-4 px-5">
                      <StatusBadge status={farmer.status} size="sm" />
                    </td>

                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => handleOpenDetails(farmer)}
                        className="px-3 py-1.5 rounded-lg bg-[#EAF7EF] hover:bg-emerald-200 text-[#0B7A3B] font-bold text-xs transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Scalable Pagination Footer */}
        <div className="p-4 border-t border-gray-100 bg-[#F8FAF9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <div>
            Showing <strong className="text-gray-900">{(page - 1) * pageSize + 1}</strong> to{' '}
            <strong className="text-gray-900">{Math.min(page * pageSize, data.totalFiltered)}</strong> of{' '}
            <strong className="text-gray-900">{data.totalFiltered}</strong> filtered results (from 20,000 total farmers)
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-bold text-gray-800 px-2">
              Page {page} of {data.totalPages}
            </span>

            <button
              onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
              disabled={page === data.totalPages}
              className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Screen 17: Farmer Details Modal */}
      {selectedFarmer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-emerald-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#EAF7EF] text-[#0B7A3B] flex items-center justify-center text-lg">
                  👨‍🌾
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-gray-900">
                    {selectedFarmer.farmerName}
                  </h3>
                  <div className="text-[11px] text-gray-500">
                    ID: {selectedFarmer.farmerId} • Mobile: {selectedFarmer.mobile}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedFarmer(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs mb-5">
              <div className="bg-[#F8FAF9] p-3 rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Village</span>
                <div className="font-bold text-gray-900 mt-0.5">{selectedFarmer.village}</div>
              </div>

              <div className="bg-[#F8FAF9] p-3 rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Token Assigned</span>
                <div className="font-black text-emerald-900 text-sm mt-0.5">{selectedFarmer.token}</div>
              </div>

              <div className="bg-[#F8FAF9] p-3 rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Crop & Quantity</span>
                <div className="font-bold text-gray-900 mt-0.5">{selectedFarmer.crop} ({selectedFarmer.quantity})</div>
              </div>

              <div className="bg-[#F8FAF9] p-3 rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Estimated MSP Value</span>
                <div className="font-extrabold text-emerald-800 text-sm mt-0.5">{selectedFarmer.amount}</div>
              </div>
            </div>

            {/* Stages Badges */}
            <div className="bg-[#F4FBF6] p-4 rounded-2xl border border-emerald-100 space-y-2 text-xs mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Booking Status:</span>
                <span className="font-bold text-emerald-800">Confirmed (10 Sep 2026)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Procurement Status:</span>
                <StatusBadge status={selectedFarmer.procurementStatus || selectedFarmer.status} size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Payment Status:</span>
                <StatusBadge status={selectedFarmer.paymentStatus || 'Processing'} size="sm" />
              </div>
            </div>

            {/* Buttons: Update Procurement / Update Payment */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  setSelectedFarmer(null);
                  navigate('/authority/procurement');
                }}
                className="py-3 px-4 bg-[#0B7A3B] hover:bg-[#065426] text-white font-bold rounded-xl text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <Scale className="w-4 h-4" />
                <span>Update Procurement</span>
              </button>

              <button
                onClick={() => {
                  setSelectedFarmer(null);
                  navigate('/authority/payments');
                }}
                className="py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold rounded-xl text-xs border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <CreditCard className="w-4 h-4 text-emerald-700" />
                <span>Update Payment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

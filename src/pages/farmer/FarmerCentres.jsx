import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Phone,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useKisan } from '../../context/KisanContext';

export default function FarmerCentres() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { centres, t } = useKisan();

  const filteredCentres = centres.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.district.toLowerCase().includes(search.toLowerCase()) ||
    c.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectCentre = (centre) => {
    navigate('/farmer/book-slot', { state: { selectedCentre: centre } });
  };

  return (
    <div className="p-4 space-y-4">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">
          {t('selectCentre')}
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Choose an authorized APMC government grain procurement centre near you.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('searchCentres')}
          className="w-full pl-10 pr-4 py-3 bg-white border-2 border-emerald-100 focus:border-[#138A4B] focus:ring-4 focus:ring-emerald-500/10 rounded-2xl text-xs font-semibold text-gray-900 placeholder:text-gray-400 outline-hidden shadow-xs transition-all"
        />
      </div>

      {/* Centres List */}
      <div className="space-y-3.5">
        {filteredCentres.map((centre) => (
          <div
            key={centre.id}
            className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-emerald-100 hover:border-[#138A4B] shadow-xs hover:shadow-md transition-all relative group"
          >
            {/* Header: Name & Distance */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-start gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#EAF7EF] text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200 shadow-2xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-emerald-900 transition-colors">
                    {centre.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate max-w-[200px]">{centre.district}</span>
                    <span>•</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-md">
                      {centre.distance}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <p className="text-[11px] text-gray-500 mb-3.5 pl-0.5">
              {centre.address}
            </p>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 bg-[#F8FAF9] p-3 rounded-2xl border border-emerald-50 mb-4">
              <div>
                <div className="text-[10px] text-gray-500 font-medium">
                  {t('slotsAvailable')}
                </div>
                <div className="text-sm font-black text-emerald-800 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{centre.availableSlotsToday} slots left</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-gray-500 font-medium">
                  {t('currentQueue')}
                </div>
                <div className="text-sm font-black text-gray-800 flex items-center gap-1 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span>{centre.currentQueueCount} {t('farmers')}</span>
                </div>
              </div>
            </div>

            {/* Facilities tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {centre.facilities.slice(0, 3).map((f, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-full font-medium border border-emerald-100"
                >
                  ✓ {f}
                </span>
              ))}
            </div>

            {/* Select Button */}
            <button
              onClick={() => handleSelectCentre(centre)}
              className="w-full py-3 px-4 bg-[#138A4B] hover:bg-[#0B7A3B] active:scale-[0.99] text-white font-bold rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-xs"
            >
              <span>{t('select')} {centre.name.split(' ')[0]} Centre</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

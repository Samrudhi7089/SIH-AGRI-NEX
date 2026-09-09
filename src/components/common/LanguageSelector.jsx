import React from 'react';
import { Globe } from 'lucide-react';
import { useKisan } from '../../context/KisanContext';

export default function LanguageSelector({ variant = 'default', className = '' }) {
  const { language, setLanguage } = useKisan();

  const languages = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'hi', label: 'हिन्दी', short: 'हि' },
    { code: 'mr', label: 'मराठी', short: 'म' }
  ];

  if (variant === 'pills') {
    return (
      <div className={`inline-flex p-1 bg-emerald-950/20 backdrop-blur-md rounded-xl border border-white/20 ${className}`}>
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              language === lang.code
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 border border-emerald-200 rounded-xl shadow-xs text-xs font-medium text-emerald-900">
        <Globe className="w-3.5 h-3.5 text-emerald-600" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-transparent border-none text-xs font-semibold text-emerald-900 focus:outline-hidden cursor-pointer"
        >
          <option value="en">English (EN)</option>
          <option value="hi">हिन्दी (Hindi)</option>
          <option value="mr">मराठी (Marathi)</option>
        </select>
      </div>
    </div>
  );
}

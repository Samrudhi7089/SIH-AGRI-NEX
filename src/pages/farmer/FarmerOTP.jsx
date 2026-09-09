import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, ArrowRight, RotateCw, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useKisan } from '../../context/KisanContext';
import LanguageSelector from '../../components/common/LanguageSelector';

export default function FarmerOTP() {
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [timer, setTimer] = useState(28);
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, triggerSimulatedSMS } = useKisan();

  const mobile = location.state?.mobile || '9876543210';

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (val, index) => {
    const num = val.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = num ? num[num.length - 1] : '';
    setOtp(newOtp);

    // Auto advance focus
    if (num && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    triggerSimulatedSMS(
      'AGRI-NEX OTP Resent',
      'Your new 6-digit verification code is 123456. Valid for 10 minutes.'
    );
  };

  const handleVerify = (e) => {
    e.preventDefault();
    triggerSimulatedSMS(
      'OTP Verified Successfully',
      'Mobile number verified. Profile loaded for Ramesh Patil.'
    );
    navigate('/farmer/profile-setup');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col justify-between p-4 sm:p-6 text-[#1A2E22]">
      {/* Top Bar */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-white border border-emerald-200 text-emerald-900 hover:bg-emerald-50 transition-colors shadow-xs"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <LanguageSelector />
      </div>

      {/* Main OTP Card */}
      <div className="my-auto py-6 max-w-sm mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-3xl bg-[#EAF7EF] border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4 shadow-xs">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <h1 className="text-2xl font-bold text-[#1A2E22] mb-1.5">
            {t('verifyNumber')}
          </h1>
          <p className="text-xs text-gray-600 max-w-xs mx-auto">
            {t('otpSubtext')}
          </p>
          <div className="inline-block mt-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-bold text-emerald-800">
            +91 {mobile}
          </div>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          {/* 6 OTP Boxes */}
          <div className="flex items-center justify-between gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputsRef.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-12 h-14 text-center text-xl font-bold text-emerald-950 bg-white border-2 border-emerald-200 focus:border-[#138A4B] focus:ring-4 focus:ring-emerald-500/10 rounded-2xl outline-hidden transition-all shadow-xs"
              />
            ))}
          </div>

          {/* Resend status */}
          <div className="text-center text-xs text-gray-600">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                className="text-[#138A4B] font-bold hover:underline flex items-center justify-center gap-1 mx-auto"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{t('resendNow')}</span>
              </button>
            ) : (
              <span>
                {t('resendOtpIn')}{' '}
                <span className="font-bold text-emerald-800">
                  00:{timer < 10 ? `0${timer}` : timer}
                </span>{' '}
                {t('seconds')}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-[#138A4B] hover:bg-[#0B7A3B] active:scale-[0.99] text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
          >
            <span>{t('verifyContinue')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[11px] text-gray-400">
            For demonstration, demo OTP is <strong className="text-emerald-700">123456</strong>
          </p>
        </div>
      </div>

      <div className="text-center text-[10px] text-gray-400 pb-2">
        Protected by National Cyber Security Framework
      </div>
    </div>
  );
}

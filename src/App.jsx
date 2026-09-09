import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { KisanProvider } from './context/KisanContext';

// Landing / Role Selection
import LandingRoleSelection from './pages/LandingRoleSelection';

// Farmer Screens
import FarmerLayout from './pages/farmer/FarmerLayout';
import FarmerLogin from './pages/farmer/FarmerLogin';
import FarmerOTP from './pages/farmer/FarmerOTP';
import FarmerProfileSetup from './pages/farmer/FarmerProfileSetup';
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import FarmerCentres from './pages/farmer/FarmerCentres';
import FarmerBookSlot from './pages/farmer/FarmerBookSlot';
import FarmerBookingSuccess from './pages/farmer/FarmerBookingSuccess';
import FarmerLiveQueue from './pages/farmer/FarmerLiveQueue';
import FarmerProcurementStatus from './pages/farmer/FarmerProcurementStatus';
import FarmerPaymentStatus from './pages/farmer/FarmerPaymentStatus';
import FarmerNotifications from './pages/farmer/FarmerNotifications';
import FarmerProfile from './pages/farmer/FarmerProfile';

// Authority Screens
import AuthorityLayout from './pages/authority/AuthorityLayout';
import AuthorityLogin from './pages/authority/AuthorityLogin';
import AuthorityDashboard from './pages/authority/AuthorityDashboard';
import AuthoritySlots from './pages/authority/AuthoritySlots';
import AuthorityLiveQueue from './pages/authority/AuthorityLiveQueue';
import AuthorityFarmers from './pages/authority/AuthorityFarmers';
import AuthorityProcurement from './pages/authority/AuthorityProcurement';
import AuthorityPayments from './pages/authority/AuthorityPayments';
import AuthorityReports from './pages/authority/AuthorityReports';
import AuthoritySettings from './pages/authority/AuthoritySettings';

export default function App() {
  return (
    <KisanProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing / Role Selection */}
          <Route path="/" element={<LandingRoleSelection />} />

          {/* Farmer Journey Routes */}
          <Route path="/farmer" element={<FarmerLayout />}>
            <Route index element={<Navigate to="/farmer/dashboard" replace />} />
            <Route path="login" element={<FarmerLogin />} />
            <Route path="otp" element={<FarmerOTP />} />
            <Route path="profile-setup" element={<FarmerProfileSetup />} />
            <Route path="dashboard" element={<FarmerDashboard />} />
            <Route path="centres" element={<FarmerCentres />} />
            <Route path="book-slot" element={<FarmerBookSlot />} />
            <Route path="booking-success" element={<FarmerBookingSuccess />} />
            <Route path="queue" element={<FarmerLiveQueue />} />
            <Route path="procurement" element={<FarmerProcurementStatus />} />
            <Route path="payment" element={<FarmerPaymentStatus />} />
            <Route path="notifications" element={<FarmerNotifications />} />
            <Route path="profile" element={<FarmerProfile />} />
          </Route>

          {/* Authority Journey Routes */}
          <Route path="/authority/login" element={<AuthorityLogin />} />
          <Route path="/authority" element={<AuthorityLayout />}>
            <Route index element={<Navigate to="/authority/dashboard" replace />} />
            <Route path="dashboard" element={<AuthorityDashboard />} />
            <Route path="slots" element={<AuthoritySlots />} />
            <Route path="queue" element={<AuthorityLiveQueue />} />
            <Route path="farmers" element={<AuthorityFarmers />} />
            <Route path="procurement" element={<AuthorityProcurement />} />
            <Route path="payments" element={<AuthorityPayments />} />
            <Route path="reports" element={<AuthorityReports />} />
            <Route path="settings" element={<AuthoritySettings />} />
          </Route>

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </KisanProvider>
  );
}

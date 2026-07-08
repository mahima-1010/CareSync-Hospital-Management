import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HospitalProvider } from './context/HospitalContext';
import DashboardLayout from './components/DashboardLayout';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Policies from './pages/Policies';
import EmergencyWorkspace from './pages/EmergencyWorkspace';
import CSSDWorkspace from './pages/CSSDWorkspace';
import FeedbackWorkspace from './pages/FeedbackWorkspace';
import PharmacyWorkspace from './pages/PharmacyWorkspace';
import LaboratoryQualityWorkspace from './pages/LaboratoryQualityWorkspace';
import FemaleWardWorkspace from './pages/FemaleWardWorkspace';
import CommitteeMOMWorkspace from './pages/CommitteeMOMWorkspace';

function App() {
  return (
    <HospitalProvider>
      <BrowserRouter>
        <Routes>
          {/* Unprotected configuration portal */}
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Secure branded workspace pages wrapping Sidebar & Header */}
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="policies" element={<Policies />} />
            <Route path="emergency" element={<EmergencyWorkspace onBack={() => window.history.back()} />} />
            <Route path="committee-mom" element={<CommitteeMOMWorkspace onBack={() => window.history.back()} />} />
          </Route>

          {/* Fallback Catch-All */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </HospitalProvider>
  );
}

export default App;

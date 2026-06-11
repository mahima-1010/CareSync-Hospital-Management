import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useHospital } from '../context/HospitalContext';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = () => {
  const { hospital } = useHospital();

  // If the user has not onboarded their hospital details, redirect to /onboarding
  if (!hospital.onboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <div className="flex min-h-screen bg-darkBg text-slate-100 select-none">
      
      {/* Dynamic Collapsible Sidebar */}
      <Sidebar />

      {/* Main Content scroll window */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Global Context Header */}
        <Header />

        {/* Scrollable content container */}
        <main className="flex-1 p-6 overflow-y-auto custom-scroll">
          <div className="max-w-6xl mx-auto w-full">
            <Outlet />
          </div>
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;

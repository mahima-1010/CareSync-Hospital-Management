import React from 'react';
import { useLocation } from 'react-router-dom';
import { useHospital } from '../context/HospitalContext';
import { Bell, ShieldCheck } from 'lucide-react';

const Header = () => {
  const { hospital } = useHospital();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.substring(1);
    if (!path) return "Overview Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1) + " Workspace";
  };

  return (
    <header className="h-16 px-6 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
      
      {/* Title Context */}
      <div>
        <h1 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
          {getPageTitle()}
        </h1>
      </div>

      {/* Action Chips & Profile Badges */}
      <div className="flex items-center gap-4">
        
        {/* Compliance Badge with soft background tint */}
        <div 
          style={{ borderColor: `${hospital.themeColor}22`, backgroundColor: `${hospital.themeColor}0b`, color: hospital.themeColor }}
          className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>NABH Compliance Active</span>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-slate-250 hidden sm:block" />

        {/* Action icons & User profiles */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer">
            <Bell className="w-3.5 h-3.5" />
          </button>
          
          {/* User profile */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
              AV
            </div>
            <div className="hidden lg:block leading-none">
              <span className="block text-[10px] font-bold text-slate-800">Dr. A. Verma</span>
              <span className="block text-[8px] text-slate-400 mt-0.5 uppercase tracking-wider">Quality Lead</span>
            </div>
          </div>
        </div>

      </div>

    </header>
  );
};

export default Header;

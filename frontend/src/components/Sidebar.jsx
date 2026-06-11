import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useHospital } from '../context/HospitalContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Shield, 
  Activity, 
  Award,
  RefreshCw,
  Wrench,
  Folder,
  FileText,
  Calendar,
  Layers,
  Heart
} from 'lucide-react';

const ICON_MAP = {
  BookOpen,
  Award,
  Users,
  Shield,
  Activity,
  Wrench,
  Folder,
  FileText,
  Calendar,
  Layers,
  Heart
};

const LOGO_TEMPLATES_MAP = {
  heart: Heart,
  shield: Shield,
  activity: Activity,
  award: Award
};

const Sidebar = () => {
  const { hospital, resetOnboarding } = useHospital();
  const navigate = useNavigate();

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your hospital configuration and return to onboarding?")) {
      resetOnboarding();
      navigate('/onboarding');
    }
  };

  const getMonogram = (name) => {
    if (!name) return "H";
    return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
  };

  const renderLogo = () => {
    if (hospital.logoUrl && hospital.logoUrl.startsWith('data:')) {
      return (
        <img 
          src={hospital.logoUrl} 
          alt="Hospital Logo" 
          className="w-full h-full object-contain"
        />
      );
    }
    
    const LogoComponent = LOGO_TEMPLATES_MAP[hospital.logoUrl];
    if (LogoComponent) {
      return <LogoComponent className="w-5 h-5" />;
    }

    return (
      <span className="text-xs font-extrabold tracking-tight text-white select-none">
        {getMonogram(hospital.name)}
      </span>
    );
  };

  // Group modules into standard and custom lists
  const systemModules = (hospital.modules || []).filter(m => !m.isCustom);
  const customModules = (hospital.modules || []).filter(m => m.isCustom);

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between h-screen sticky top-0 shrink-0 z-20">
      
      {/* Brand Header */}
      <div className="p-5 flex flex-col gap-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          
          <div 
            style={{ 
              borderColor: hospital.logoUrl && hospital.logoUrl.startsWith('data:') ? '#e2e8f0' : `${hospital.themeColor}33`, 
              backgroundColor: hospital.logoUrl && hospital.logoUrl.startsWith('data:') ? '#ffffff' : hospital.themeColor,
              color: hospital.logoUrl && hospital.logoUrl.startsWith('data:') ? 'transparent' : '#ffffff'
            }}
            className="w-10 h-10 rounded-xl border flex items-center justify-center p-1.5 shadow-sm overflow-hidden shrink-0"
          >
            {renderLogo()}
          </div>

          <div className="overflow-hidden">
            <h2 className="text-xs font-bold text-slate-900 truncate max-w-[150px]" title={hospital.name}>
              {hospital.name}
            </h2>
            <p className="text-[9px] text-slate-400 font-mono tracking-wide uppercase mt-0.5 truncate">
              {hospital.hpnId || "NO-HPN-ID"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 py-6 space-y-5 overflow-y-auto custom-scroll">
        
        {/* Core Dashboard Link */}
        <div className="space-y-1">
          <NavLink
            to="/dashboard"
            style={({ isActive }) => isActive ? { 
              backgroundColor: `${hospital.themeColor}09`, 
              borderColor: `${hospital.themeColor}22`,
              color: hospital.themeColor 
            } : {}}
            className={({ isActive }) => `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-150 cursor-pointer ${
              isActive 
                ? 'border-sky-500/20 font-bold' 
                : 'bg-transparent border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-200/50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Dashboard</span>
          </NavLink>
        </div>

        {/* System Functionalities */}
        <div className="space-y-1.5">
          <span className="block px-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Modules</span>
          {systemModules.map((item) => {
            const Icon = ICON_MAP[item.iconName] || BookOpen;
            return (
              <NavLink
                key={item.id}
                to={item.to}
                style={({ isActive }) => isActive ? { 
                  backgroundColor: `${hospital.themeColor}09`, 
                  borderColor: `${hospital.themeColor}22`,
                  color: hospital.themeColor 
                } : {}}
                className={({ isActive }) => `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isActive 
                    ? 'border-sky-500/20 font-bold' 
                    : 'bg-transparent border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-200/50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Custom Functionalities */}
        {customModules.length > 0 && (
          <div className="space-y-1.5">
            <span className="block px-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Custom Additions</span>
            {customModules.map((item) => {
              const Icon = ICON_MAP[item.iconName] || Folder;
              return (
                <NavLink
                  key={item.id}
                  to={item.to}
                  style={({ isActive }) => isActive ? { 
                    backgroundColor: `${hospital.themeColor}09`, 
                    borderColor: `${hospital.themeColor}22`,
                    color: hospital.themeColor 
                  } : {}}
                  className={({ isActive }) => `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive 
                      ? 'border-sky-500/20 font-bold' 
                      : 'bg-transparent border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-200/50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-slate-500" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        )}

      </nav>

      {/* Footer controls & Settings Reset */}
      <div className="p-4 border-t border-slate-100 shrink-0">
        <button
          onClick={handleReset}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200/40 text-xs font-semibold transition-all duration-150 cursor-pointer group"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600 group-hover:rotate-180 transition-all duration-500" />
          <span>Reset Workspace</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHospital } from '../context/HospitalContext';
import { Shield, Activity, Heart, Award, ChevronRight, Upload, X, Sparkles } from 'lucide-react';

const LOGO_TEMPLATES = [
  { id: 'heart', icon: Heart, name: 'Cardio Crest', color: 'text-rose-600' },
  { id: 'shield', icon: Shield, name: 'Safety Shield', color: 'text-blue-600' },
  { id: 'activity', icon: Activity, name: 'Pulse Logo', color: 'text-emerald-600' },
  { id: 'award', icon: Award, name: 'NABH Medal', color: 'text-amber-600' },
];

const THEME_PALETTES = [
  { id: 'sky', color: '#0284c7', label: 'Sky Blue', bg: 'bg-sky-600' },
  { id: 'emerald', color: '#10b981', label: 'Teal Green', bg: 'bg-emerald-600' },
  { id: 'indigo', color: '#4f46e5', label: 'Indigo Blue', bg: 'bg-indigo-600' },
  { id: 'rose', color: '#e11d48', label: 'Cardio Red', bg: 'bg-rose-600' },
];

const Onboarding = () => {
  const { hospital, updateHospital } = useHospital();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Form states
  const [name, setName] = useState(hospital.name);
  const [hpnId, setHpnId] = useState(hospital.hpnId);
  const [estNum, setEstNum] = useState(hospital.establishmentNum);
  const [themeColor, setThemeColor] = useState(hospital.themeColor);
  const [selectedLogo, setSelectedLogo] = useState(hospital.logoUrl && !hospital.logoUrl.startsWith('data:') ? hospital.logoUrl : 'heart');
  
  // Custom uploaded logo state (Base64)
  const [uploadedLogo, setUploadedLogo] = useState(hospital.logoUrl && hospital.logoUrl.startsWith('data:') ? hospital.logoUrl : null);
  const [error, setError] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Image file must be under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedLogo(reader.result); // Base64 string
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const clearUploadedLogo = () => {
    setUploadedLogo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLaunch = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a valid Hospital Name.');
      return;
    }
    
    updateHospital({
      name,
      hpnId,
      establishmentNum: estNum,
      logoUrl: uploadedLogo || selectedLogo, 
      themeColor,
      onboarded: true
    });

    navigate('/dashboard');
  };

  const ActiveLogoIcon = LOGO_TEMPLATES.find(l => l.id === selectedLogo)?.icon || Heart;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12 gap-10">
      
      {/* Onboarding Control Form Card */}
      <div className="w-full lg:max-w-xl flex flex-col justify-center">
        <div className="glass-panel p-8 rounded-2xl w-full bg-white border border-slate-200 shadow-sm">
          
          <div className="flex items-center gap-2.5 mb-6">
            <div className="p-2 rounded-lg bg-sky-50 text-sky-600 border border-sky-100">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold tracking-widest text-sky-600 uppercase">NABH System Config</span>
          </div>

          <h1 className="text-xl font-bold tracking-tight mb-1 text-slate-900">
            Initialize Hospital Workspace
          </h1>
          <p className="text-slate-500 mb-6 text-xs leading-relaxed">
            Fill in your hospital registration and branding details. The live mockup on the right adapts instantly to show how your clinical interface looks.
          </p>

          <form onSubmit={handleLaunch} className="space-y-5">
            {/* Hospital Name */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Hospital Brand Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                placeholder="e.g. Apollo Cardio Institute"
                className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 text-xs font-semibold"
              />
              {error && <p className="text-xs text-rose-500 mt-2 font-medium">{error}</p>}
            </div>

            {/* Identifiers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">HPN Registry ID</label>
                <input
                  type="text"
                  value={hpnId}
                  onChange={(e) => setHpnId(e.target.value)}
                  placeholder="HPN-77192-DEL"
                  className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Establishment Number</label>
                <input
                  type="text"
                  value={estNum}
                  onChange={(e) => setEstNum(e.target.value)}
                  placeholder="REG-2026-MED"
                  className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 text-xs font-mono"
                />
              </div>
            </div>

            {/* Custom Logo File Uploader */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Hospital Official Logo</label>
              
              <div className="flex items-center gap-4 p-4 bg-slate-50/50 border border-slate-200 rounded-xl">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                />
                
                {uploadedLogo ? (
                  <div className="relative w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1.5 group overflow-hidden">
                    <img 
                      src={uploadedLogo} 
                      alt="Hospital Logo" 
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={clearUploadedLogo}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-rose-400 transition-opacity duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-12 h-12 rounded-xl border border-dashed border-slate-350 hover:border-slate-400 bg-white hover:bg-slate-50 flex flex-col items-center justify-center text-slate-400 transition-all cursor-pointer"
                  >
                    <Upload className="w-4 h-4 text-slate-500" />
                  </button>
                )}

                <div className="flex-1">
                  <span className="block text-xs font-bold text-slate-700">
                    {uploadedLogo ? "Custom logo uploaded" : "Upload high-res PNG/JPG"}
                  </span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">
                    Transparent square logo (max 2MB)
                  </span>
                </div>
              </div>
            </div>

            {/* Fallback Preset Emblems (If no custom image is uploaded) */}
            {!uploadedLogo && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Or select clinical emblem</label>
                <div className="grid grid-cols-4 gap-3">
                  {LOGO_TEMPLATES.map((item) => {
                    const Icon = item.icon;
                    const isSelected = selectedLogo === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedLogo(item.id)}
                        className={`py-2 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-sky-50/50 border-sky-500 text-sky-900 shadow-sm font-semibold' 
                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-sky-600' : item.color}`} />
                        <span className="text-[9px] tracking-tight">{item.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Colors Selection */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Primary Accent Color</label>
              <div className="grid grid-cols-4 gap-3">
                {THEME_PALETTES.map((palette) => {
                  const isSelected = themeColor === palette.color;
                  return (
                    <button
                      key={palette.id}
                      type="button"
                      onClick={() => setThemeColor(palette.color)}
                      className={`py-2 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-slate-50 border-sky-500 text-sky-900 shadow-sm font-semibold' 
                          : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${palette.bg}`} />
                      <span className="text-[10px]">{palette.label.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              style={{ backgroundColor: themeColor }}
              className="w-full py-3 px-6 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 hover:brightness-95 active:scale-[0.99] transition-all cursor-pointer btn-primary shadow-sm group"
            >
              Launch Clinical Workspace
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>
        </div>
      </div>

      {/* Branded Dashboard Live Preview Mockup */}
      <div className="w-full lg:flex-1 flex flex-col justify-center">
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between aspect-[4/3] w-full min-h-[380px] relative overflow-hidden select-none shadow-sm">
          
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[8px] font-bold text-slate-500 uppercase tracking-widest">
            Workspace Preview
          </div>

          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-1.5 shadow-inner overflow-hidden">
                {uploadedLogo ? (
                  <img 
                    src={uploadedLogo} 
                    alt="Logo preview" 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <ActiveLogoIcon className="w-5 h-5" style={{ color: themeColor }} />
                )}
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-850 max-w-[180px] truncate leading-tight">
                  {name || "Untitled Workspace"}
                </h3>
                <p className="text-[9px] text-slate-400 font-mono mt-0.5 uppercase tracking-wide">
                  {hpnId || "NO-REGISTRY-ID"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
              <span className="text-[9px] text-slate-500 font-bold tracking-wider uppercase">Active Layout</span>
            </div>
          </div>

          {/* Module List Grid */}
          <div className="grid grid-cols-2 gap-4 my-6 relative z-10">
            <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-200 flex flex-col gap-1.5">
              <div className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center">
                <Activity className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <span className="text-[10px] font-bold text-slate-700">Policies & SOPs</span>
              <div className="w-10 h-1 rounded-full mt-1" style={{ backgroundColor: themeColor }} />
            </div>

            <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-200 flex flex-col gap-1.5">
              <div className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center">
                <Award className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <span className="text-[10px] font-bold text-slate-700">Committee Minutes</span>
              <div className="w-7 h-1 rounded-full bg-slate-200 mt-1" />
            </div>
          </div>

          {/* Bottom badge info */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between text-xs relative z-10">
            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 text-[10px] font-medium">Compliance License</span>
              <span className="text-[9px] text-slate-500 font-mono">{estNum || "REG-UNCONFIGURED"}</span>
            </div>
            <div 
              style={{ color: themeColor, borderColor: `${themeColor}22`, backgroundColor: `${themeColor}09` }}
              className="px-2.5 py-0.5 rounded-full text-[9px] font-bold border transition-colors"
            >
              NABH Standard
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Onboarding;

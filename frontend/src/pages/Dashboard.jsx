import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHospital } from '../context/HospitalContext';
import { 
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
  Plus, 
  Trash2, 
  X,
  Sparkles,
  ChevronRight
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
  Layers
};

const Dashboard = () => {
  const { hospital, addModule, deleteModule } = useHospital();
  const navigate = useNavigate();

  // Modal Creator States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newIcon, setNewIcon] = useState('Folder');
  const [error, setError] = useState('');

  const handleOpenModal = () => {
    setNewLabel('');
    setNewDesc('');
    setNewIcon('Wrench');
    setError('');
    setIsModalOpen(true);
  };

  const handleCreateModule = (e) => {
    e.preventDefault();
    if (!newLabel.trim()) {
      setError('Please provide a name for this workspace module.');
      return;
    }
    
    addModule(newLabel.trim(), newDesc.trim(), newIcon);
    setIsModalOpen(false);
  };

  const handleDeleteModule = (id, label, e) => {
    e.stopPropagation(); // Avoid triggering card navigation
    if (window.confirm(`Are you sure you want to delete the custom workspace module: "${label}"?`)) {
      deleteModule(id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Branded Section Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <Sparkles className="w-3.5 h-3.5" style={{ color: hospital.themeColor }} />
            <span>Clinical Workspace Registry</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
            Operational Modules — {hospital.name}
          </h2>
          <p className="text-slate-500 text-xs max-w-lg leading-relaxed">
            Select an active registry block below to review SOPs, log minutes, or manage state compliance reports.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <button 
            onClick={handleOpenModal}
            style={{ backgroundColor: hospital.themeColor }}
            className="px-4 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 hover:brightness-95 active:scale-[0.98] transition-all btn-primary shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Functionality Card
          </button>
        </div>
      </div>

      {/* Workspace Modules Dynamic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {(hospital.modules || []).map((item) => {
          const IconComponent = ICON_MAP[item.iconName] || Folder;
          return (
            <div 
              key={item.id}
              onClick={() => navigate(item.to)}
              className="glass-panel p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between min-h-[170px] relative group hover:border-slate-350 cursor-pointer transition-all duration-150"
            >
              
              {/* Header Box */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div 
                    style={{ backgroundColor: `${hospital.themeColor}0d`, color: hospital.themeColor }}
                    className="p-2.5 rounded-xl border border-slate-100 shadow-inner"
                  >
                    <IconComponent className="w-4.5 h-4.5" />
                  </div>

                  {/* Delete Option for custom modules */}
                  {item.isCustom && (
                    <button
                      onClick={(e) => handleDeleteModule(item.id, item.label, e)}
                      className="p-1.5 rounded-lg bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-100 text-slate-400 hover:text-rose-600 transition-all cursor-pointer"
                      title="Remove Module"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-slate-850 group-hover:text-sky-600 transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Bottom tag line */}
              <div className="border-t border-slate-50 pt-3 mt-4 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-slate-600 transition-colors">
                <span>
                  {item.isCustom ? "Custom Workspace" : "System Workspace"}
                </span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" style={{ color: hospital.themeColor }} />
              </div>

            </div>
          );
        })}

        {/* Add custom functionality placeholder box */}
        <div 
          onClick={handleOpenModal}
          className="rounded-2xl border-2 border-dashed border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 flex flex-col items-center justify-center gap-3 p-5 min-h-[170px] cursor-pointer transition-all duration-150 group"
        >
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-400 group-hover:text-slate-600 transition-colors">
            <Plus className="w-5 h-5" />
          </div>
          <div className="text-center">
            <span className="block text-xs font-bold text-slate-700">Add Custom Functionality</span>
            <span className="block text-[10px] text-slate-400 mt-1">Configure a new workspace card</span>
          </div>
        </div>
      </div>

      {/* Modal Popup dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl shadow-lg p-6 space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-600" />
                Add Workspace Functionality
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateModule} className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Functionality Name</label>
                <input
                  type="text"
                  placeholder="e.g. Maintenance Logs"
                  value={newLabel}
                  onChange={(e) => { setNewLabel(e.target.value); setError(''); }}
                  className="w-full px-3 py-2 rounded-xl glass-input text-slate-900 text-xs font-semibold"
                  required
                />
                {error && <p className="text-[10px] text-rose-500 mt-1.5 font-medium">{error}</p>}
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Description</label>
                <textarea
                  placeholder="e.g. Track biomedical equipment inspection lists, routine calibration, and fire drill NOC approvals."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl glass-input text-slate-900 text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-2">Workspace Icon Representation</label>
                <div className="grid grid-cols-5 gap-2.5">
                  {[
                    { name: 'Wrench', label: 'Tool' },
                    { name: 'Folder', label: 'Files' },
                    { name: 'Calendar', label: 'Dates' },
                    { name: 'Layers', label: 'Stack' },
                    { name: 'Activity', label: 'Pulse' }
                  ].map((iconItem) => {
                    const TargetIcon = ICON_MAP[iconItem.name] || Folder;
                    const isSelected = newIcon === iconItem.name;
                    return (
                      <button
                        key={iconItem.name}
                        type="button"
                        onClick={() => setNewIcon(iconItem.name)}
                        className={`py-2 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-slate-50 border-sky-500 text-sky-950 font-bold' 
                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                        }`}
                      >
                        <TargetIcon className="w-4 h-4 text-slate-500" />
                        <span className="text-[8px] tracking-tight">{iconItem.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-xs font-semibold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-4 py-2 rounded-xl text-white font-bold text-xs hover:brightness-95 active:scale-[0.98] transition-all cursor-pointer shadow-sm btn-primary"
                >
                  Create Module
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;

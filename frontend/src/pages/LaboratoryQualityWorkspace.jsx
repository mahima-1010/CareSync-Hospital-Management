import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { ChevronLeft, Edit3, Save, BookOpen, Shield, Users, Activity, FileText, Award, Layers, AlertTriangle, Settings, Clipboard, Trash2, CheckCircle, MessageSquare, BarChart3, TrendingUp, Search } from 'lucide-react';

const DEFAULT_LAB_QUALITY_MODULES = [
  {
    id: 'overview',
    label: 'Laboratory Quality Overview',
    icon: 'BookOpen',
    objective: 'Continuously monitor laboratory performance through measurable quality indicators.',
    policy: 'Quality indicators shall be defined, monitored, and reviewed regularly.\nData collection shall be standardized across all laboratory services.\nKPI results shall be analyzed monthly.\nImprovement actions shall be initiated when targets are not met.'
  },
  {
    id: 'reporting-error',
    label: 'Reporting Error Monitoring',
    icon: 'AlertTriangle',
    objective: 'Ensure accuracy and reliability of laboratory reports.',
    policy: 'All reporting errors shall be recorded.\nError rates shall be calculated periodically.\nRoot cause analysis shall be conducted for recurring errors.\nCorrective and Preventive Actions (CAPA) shall be implemented.\nTrends shall be reviewed during quality meetings.'
  },
  {
    id: 'redo-investigation',
    label: 'Re-Do Investigation Monitoring',
    icon: 'Activity',
    objective: 'Reduce repeat testing and improve laboratory efficiency.',
    policy: 'Repeat investigations shall be monitored.\nReasons for re-testing shall be documented.\nRe-do rates shall be calculated monthly.\nProcess improvements shall be implemented to reduce unnecessary repeats.\nResults shall be reviewed by laboratory leadership.'
  },
  {
    id: 'safety-compliance',
    label: 'Laboratory Safety Compliance',
    icon: 'Shield',
    objective: 'Ensure staff adherence to laboratory safety requirements.',
    policy: 'Periodic safety audits shall be conducted.\nEmployee adherence to safety precautions shall be monitored.\nCompliance percentages shall be calculated and tracked.\nNon-compliance shall trigger corrective actions and retraining.\nSafety performance shall be reported to management.'
  },
  {
    id: 'waiting-time',
    label: 'Patient Waiting Time Tracking',
    icon: 'Users',
    objective: 'Improve patient experience and operational efficiency.',
    policy: 'Patient waiting times shall be recorded.\nAverage waiting time shall be calculated monthly.\nDelays shall be investigated.\nStaffing and workflow improvements shall be implemented where required.\nWaiting time targets shall be monitored.'
  },
  {
    id: 'tat-monitoring',
    label: 'Report Turnaround Time (TAT)',
    icon: 'FileText',
    objective: 'Ensure timely delivery of laboratory results.',
    policy: 'Reporting times shall be monitored for all investigations.\nAverage report turnaround time shall be calculated.\nDelayed reports shall be reviewed.\nCritical tests shall follow defined TAT requirements.\nTAT compliance shall be reported regularly.'
  },
  {
    id: 'data-collection',
    label: 'Quality Indicator Data Collection',
    icon: 'Clipboard',
    objective: 'Maintain reliable quality performance data.',
    policy: 'The laboratory shall collect data related to:\n- Reporting Errors\n- Re-do Investigations\n- Safety Compliance\n- Patient Waiting Time\n- Report Turnaround Time\n\nData shall be reviewed, validated, and archived.'
  },
  {
    id: 'capa-management',
    label: 'CAPA Management',
    icon: 'CheckCircle',
    objective: 'Drive continuous improvement using KPI outcomes.',
    policy: 'KPI deviations shall trigger investigation.\nRoot causes shall be documented.\nCorrective actions shall be assigned.\nPreventive actions shall be implemented.\nCAPA effectiveness shall be monitored.'
  },
  {
    id: 'kpi-dashboard',
    label: 'KPI Dashboard',
    icon: 'BarChart3',
    objective: 'Provide real-time visibility into laboratory performance.',
    policy: 'The dashboard shall display:\n- Reporting Error % = (Reporting Errors ÷ Total Investigations) × 100\n- Re-Do % = (Re-Do Investigations ÷ Total Investigations) × 100\n- Safety Compliance % = (Employees Following Safety Precautions ÷ Total Employees Surveyed) × 100\n- Avg Waiting Time = Total Waiting Time ÷ Total Patients\n- Avg Reporting Time = Total Reporting Time ÷ Total Patients\n- Monthly Trends\n- Department-wise Performance'
  },
  {
    id: 'trend-analysis',
    label: 'Trend Analysis',
    icon: 'TrendingUp',
    objective: 'Analyze quality indicator trends over time for predictive insights.',
    policy: 'Monthly and quarterly trend analysis shall be conducted for all quality indicators.\nStatistical process control methods shall be used where applicable.\nTrend deviations shall trigger root cause investigation.\nHistorical data shall be maintained for benchmark comparison.\nTrend reports shall be presented to quality committee.'
  },
  {
    id: 'monthly-quality-reviews',
    label: 'Monthly Quality Reviews',
    icon: 'Search',
    objective: 'Review laboratory quality performance periodically.',
    policy: 'KPI reports shall be reviewed monthly.\nSignificant deviations shall be discussed.\nAction plans shall be documented.\nFollow-up reviews shall be conducted.\nMeeting minutes shall be maintained.'
  },
  {
    id: 'audit-compliance',
    label: 'Audit & Compliance Reports',
    icon: 'FileText',
    objective: 'Ensure readiness for regulatory inspections and accreditation.',
    policy: 'Internal quality audits shall be conducted periodically.\nAudit checklists shall be maintained and updated.\nNon-conformances shall be documented and tracked.\nCorrective actions shall be implemented within defined timelines.\nAudit records shall be retained for regulatory review.\nExternal inspection readiness shall be maintained continuously.'
  }
];

const ICON_MAP = {
  BookOpen, Shield, Users, Activity, FileText, Award, Layers,
  AlertTriangle, Settings, Clipboard, Trash2, CheckCircle, MessageSquare,
  BarChart3, TrendingUp, Search
};

const LaboratoryQualityWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();

  const [customized, setCustomized] = useState(() => {
    const saved = localStorage.getItem('lab_quality_custom_policies');
    return saved ? JSON.parse(saved) : {};
  });

  const [activeModuleId, setActiveModuleId] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');

  const activeModule = DEFAULT_LAB_QUALITY_MODULES.find(m => m.id === activeModuleId);
  const customData = customized[activeModuleId];
  const displayClauses = customData?.clauses || (activeModule?.policy ? activeModule.policy.split('\n').filter(line => line.trim()) : []);
  const isCustomized = !!customData;

  const handleStartEdit = () => {
    setEditContent(displayClauses.join('\n'));
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const updatedClauses = editContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const updated = {
      ...customized,
      [activeModuleId]: { clauses: updatedClauses }
    };
    setCustomized(updated);
    localStorage.setItem('lab_quality_custom_policies', JSON.stringify(updated));
    setIsEditing(false);
  };

  const handleResetToDefault = () => {
    if (window.confirm(`Reset "${activeModule?.label}" to the NABH standard template? Your customizations will be lost.`)) {
      const updated = { ...customized };
      delete updated[activeModuleId];
      setCustomized(updated);
      localStorage.setItem('lab_quality_custom_policies', JSON.stringify(updated));
      setIsEditing(false);
    }
  };

  return (
    <div className="flex gap-0 -m-6 min-h-[calc(100vh-4rem)]">

      <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col">

        <div className="p-4 border-b border-slate-100">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider cursor-pointer transition-colors group"
          >
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Policies Directory
          </button>
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">Laboratory Quality</h2>
          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">NABH KPI & Compliance Module</p>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scroll py-3 px-2 space-y-0.5">
          {DEFAULT_LAB_QUALITY_MODULES.map((mod) => {
            const Icon = ICON_MAP[mod.icon] || BookOpen;
            const isActive = mod.id === activeModuleId;
            const isModCustomized = !!customized[mod.id];

            return (
              <button
                key={mod.id}
                onClick={() => { setActiveModuleId(mod.id); setIsEditing(false); }}
                style={isActive ? {
                  backgroundColor: `${hospital.themeColor}0d`,
                  borderColor: `${hospital.themeColor}22`,
                  color: hospital.themeColor
                } : {}}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'border-sky-500/20 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[10px] font-semibold truncate">{mod.label}</span>
                </div>
                {isModCustomized && (
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500" title="Customized" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-100 space-y-1.5">
          <div className="flex items-center gap-2 text-[8px] text-slate-400 font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 inline-block" />
            NABH Standard
          </div>
          <div className="flex items-center gap-2 text-[8px] text-slate-400 font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Hospital Customized
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto custom-scroll bg-slate-50/40 p-6 space-y-5">
        {activeModule && (
          <>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      Laboratory Quality / {activeModule.label}
                    </span>
                    {isCustomized ? (
                      <span className="px-2 py-0.5 rounded-full text-[8px] font-bold border bg-emerald-50 border-emerald-200 text-emerald-700 uppercase tracking-wider">
                        Hospital Customized
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[8px] font-bold border bg-sky-50 border-sky-200 text-sky-700 uppercase tracking-wider">
                        NABH Standard
                      </span>
                    )}
                  </div>
                  <h1 className="text-base font-extrabold text-slate-900">{activeModule.label} Policy</h1>
                  <p className="text-[11px] text-slate-500 leading-relaxed max-w-2xl">
                    <span className="font-bold text-slate-600">Objective: </span>
                    {activeModule.objective}
                  </p>
                </div>

                {!isEditing ? (
                  <div className="flex items-center gap-2 shrink-0">
                    {isCustomized && (
                      <button
                        onClick={handleResetToDefault}
                        className="px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-500 hover:text-rose-600 text-[10px] font-bold cursor-pointer transition-all"
                      >
                        Reset to NABH
                      </button>
                    )}
                    <button
                      onClick={handleStartEdit}
                      style={{ backgroundColor: hospital.themeColor }}
                      className="px-3 py-2 rounded-xl text-white font-bold text-[10px] flex items-center gap-1.5 hover:brightness-95 transition-all cursor-pointer shadow-sm btn-primary"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Customize SOP
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-500 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      style={{ backgroundColor: hospital.themeColor }}
                      className="px-3 py-2 rounded-xl text-white font-bold text-[10px] flex items-center gap-1.5 hover:brightness-95 transition-all cursor-pointer shadow-sm btn-primary"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>

            {!isEditing && (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3">
                  Policy
                </h3>
                <ol className="space-y-3">
                  {displayClauses.map((clause, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span
                        style={{ backgroundColor: `${hospital.themeColor}0d`, color: hospital.themeColor }}
                        className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-extrabold mt-0.5 border border-slate-100"
                      >
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">{clause}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {isEditing && (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Customize Policy
                  </h3>
                  <p className="text-[9px] text-slate-400 mt-1">Enter each policy clause on a new line. All edits override the NABH standard template for this hospital.</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-t-xl px-4 py-1.5 flex items-center gap-2 border-b-0">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Edit Clauses — one per line</span>
                </div>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={12}
                  className="w-full px-4 py-3 rounded-b-xl border border-slate-200 border-t-0 text-slate-900 text-xs leading-relaxed font-sans focus:outline-none focus:border-sky-400 custom-scroll resize-none"
                />

                <p className="text-[9px] text-slate-400 font-medium">
                  Tip: Each line becomes one numbered policy clause. Empty lines are ignored.
                </p>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-wrap items-center gap-6 text-[9px] font-bold uppercase tracking-wider text-slate-400">
              <div>
                <span className="block text-[8px] mb-0.5">Module Scope</span>
                <span className="text-slate-600">Laboratory Quality</span>
              </div>
              <div>
                <span className="block text-[8px] mb-0.5">Compliance Framework</span>
                <span className="text-slate-600">NABH / NABL / MoHFW</span>
              </div>
              <div>
                <span className="block text-[8px] mb-0.5">Review Cycle</span>
                <span className="text-slate-600">Monthly / Quarterly</span>
              </div>
              <div>
                <span className="block text-[8px] mb-0.5">Status</span>
                <span className={isCustomized ? 'text-emerald-600' : 'text-sky-600'}>
                  {isCustomized ? 'Hospital Customized' : 'NABH Standard Template'}
                </span>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default LaboratoryQualityWorkspace;

import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { ChevronLeft, Edit3, Save, BookOpen, Shield, Users, Activity, FileText, Award, Layers, AlertTriangle, Settings, Clipboard, Trash2, CheckCircle, MessageSquare, BarChart3, TrendingUp, Gavel, Search } from 'lucide-react';

const DEFAULT_FEEDBACK_MODULES = [
  {
    id: 'overview',
    label: 'Overview',
    icon: 'BookOpen',
    objective: 'Capture patient feedback to improve service quality and patient satisfaction.',
    policy: 'Feedback shall be collected through multiple channels.\nPositive and negative feedback shall be recorded.\nFeedback shall be reviewed regularly.\nImprovement opportunities shall be identified and tracked.\nFeedback data shall be analyzed periodically.'
  },
  {
    id: 'feedback-collection',
    label: 'Feedback Collection',
    icon: 'MessageSquare',
    objective: 'Provide multiple channels for patients to submit feedback.',
    policy: 'Feedback may be collected through:\n- OPD visits\n- IPD admissions\n- Discharge feedback forms\n- Website forms\n- Mobile applications\n- Email\n- Social media reviews\n- Online review platforms\nAll submissions shall be documented and tracked.'
  },
  {
    id: 'complaint-registration',
    label: 'Complaint Registration',
    icon: 'Clipboard',
    objective: 'Maintain complete records for all feedback and complaints.',
    policy: 'Each record shall include:\n- Date received\n- Patient identifier\n- Department\n- Feedback/Complaint description\n- Category\n- Severity level\n- Assigned owner\n- Action taken\n- RCA status\n- Closure date\n- TAT compliance status\nRecords shall be retained according to organizational policy.'
  },
  {
    id: 'complaint-management',
    label: 'Complaint Management',
    icon: 'Gavel',
    objective: 'Ensure timely and effective resolution of patient complaints.',
    policy: 'All complaints shall be formally recorded.\nComplaints shall be acknowledged promptly.\nComplaints shall be investigated objectively.\nAppropriate corrective actions shall be implemented.\nClosure shall be communicated to the complainant when applicable.'
  },
  {
    id: 'complaint-categorization',
    label: 'Complaint Categories',
    icon: 'Settings',
    objective: 'Enable effective tracking and analysis.',
    policy: 'Complaints may be categorized as:\n- Service Delay\n- Staff Behaviour\n- Communication\n- Billing\n- Clinical Care\n- Infrastructure\n- Housekeeping\n- Safety\n- Technology/System Issues\n- Other\n\nSeverity classification shall be maintained:\n- Low\n- Medium\n- High\n- Critical'
  },
  {
    id: 'severity-management',
    label: 'Severity Management',
    icon: 'AlertTriangle',
    objective: 'Classify complaints by severity for appropriate response.',
    policy: 'Severity levels shall be assigned at registration:\n\nLow – Minor inconvenience, no clinical impact\nMedium – Service disruption, requires attention\nHigh – Significant impact, requires management review\nCritical – Patient safety risk, immediate escalation\n\nSeverity shall be reviewed if new information emerges.'
  },
  {
    id: 'tat-management',
    label: 'TAT Management',
    icon: 'Activity',
    objective: 'Ensure complaints are resolved within defined timelines.',
    policy: 'Complaint Type\tTarget Timeline\nRoutine Feedback\t48–72 hours\nComplaint Acknowledgement\tWithin 24 hours\nComplaint Investigation & Closure\tWithin 3–7 days\nSerious Patient Safety Complaint\tImmediate escalation within 24 hours\n\nTAT compliance shall be monitored and reported.'
  },
  {
    id: 'escalation-matrix',
    label: 'Escalation Matrix',
    icon: 'TrendingUp',
    objective: 'Ensure serious complaints receive timely attention.',
    policy: 'A formal escalation matrix shall exist:\n\nLevel 1 – Frontline staff / department supervisor\nLevel 2 – Quality Manager / Department Head\nLevel 3 – Senior Leadership / Medical Superintendent\n\nHigh-risk complaints shall be escalated immediately.'
  },
  {
    id: 'rca',
    label: 'Root Cause Analysis (RCA)',
    icon: 'Search',
    objective: 'Identify underlying causes of recurring issues.',
    policy: 'RCA shall be performed for significant complaints.\nRCA methodologies may include:\n- 5 Why Analysis\n- Fishbone Analysis\n- Incident Investigation\n\nRoot causes shall be documented.\nRCA records shall be maintained for audit purposes.'
  },
  {
    id: 'capa-management',
    label: 'CAPA Management',
    icon: 'CheckCircle',
    objective: 'Prevent recurrence of identified issues.',
    policy: 'Following RCA:\n- Immediate corrective actions shall be implemented.\n- Preventive actions shall address systemic causes.\n- CAPA effectiveness shall be monitored.\n- CAPA closure shall be documented.'
  },
  {
    id: 'patient-safety-complaints',
    label: 'Patient Safety Complaints',
    icon: 'Shield',
    objective: 'Manage complaints involving patient safety risks.',
    policy: 'Safety-related complaints shall receive priority review.\nImmediate risk assessment shall be performed.\nLeadership shall be notified.\nCorrective measures shall be initiated immediately.\nOutcomes shall be documented.'
  },
  {
    id: 'complaint-dashboard',
    label: 'Complaint Dashboard',
    icon: 'BarChart3',
    objective: 'Provide real-time visibility into complaint management performance.',
    policy: 'Dashboard metrics may include:\n- Total complaints\n- Open complaints\n- Closed complaints\n- Average closure time\n- TAT compliance percentage\n- Complaint category distribution\n- Severity trends\n- Department-wise complaints'
  },
  {
    id: 'monthly-analysis',
    label: 'Monthly Analysis',
    icon: 'TrendingUp',
    objective: 'Use complaint data for organizational improvement.',
    policy: 'Monthly analysis shall include:\n- Total feedback received\n- Total complaints\n- Complaint trends\n- Top complaint categories\n- TAT compliance\n- Open vs closed complaints\n- CAPA status\n\nResults shall be reviewed during quality meetings.'
  },
  {
    id: 'digital-reputation',
    label: 'Digital Reviews & Reputation',
    icon: 'Activity',
    objective: 'Monitor and respond to online patient feedback.',
    policy: 'Online reviews shall be monitored regularly.\nResponses shall be provided within defined timelines.\nNegative reviews shall be assessed for complaint registration.\nImprovement opportunities shall be identified from digital feedback.\nResponse records shall be maintained.'
  },
  {
    id: 'quality-indicators',
    label: 'Quality Indicators',
    icon: 'Award',
    objective: 'Measure effectiveness of complaint management processes.',
    policy: 'The following KPIs shall be monitored:\n- Complaint closure rate\n- TAT compliance percentage\n- Average resolution time\n- Repeat complaint rate\n- CAPA completion rate\n- Patient satisfaction score\n\nTarget values shall be reviewed periodically.'
  },
  {
    id: 'staff-training',
    label: 'Staff Training & Awareness',
    icon: 'Users',
    objective: 'Ensure employees understand complaint handling processes.',
    policy: 'Training shall cover:\n- Complaint registration\n- Communication skills\n- Escalation process\n- RCA methodology\n- CAPA implementation\n- Patient-centered service\n\nTraining records shall be maintained.'
  },
  {
    id: 'documentation-audits',
    label: 'Audit & Documentation',
    icon: 'FileText',
    objective: 'Ensure readiness for audits and accreditation.',
    policy: 'The following documents shall be maintained:\n- Complaint register\n- Feedback register\n- RCA records\n- CAPA records\n- Quality meeting minutes\n- Dashboard reports\n- Escalation records\n- Closed complaint records\n\nAll records shall be retained as per retention policy.'
  }
];

const ICON_MAP = {
  BookOpen, Shield, Users, Activity, FileText, Award, Layers,
  AlertTriangle, Settings, Clipboard, Trash2, CheckCircle, MessageSquare,
  BarChart3, TrendingUp, Gavel, Search
};

const FeedbackWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();

  const [customized, setCustomized] = useState(() => {
    const saved = localStorage.getItem('feedback_custom_policies');
    return saved ? JSON.parse(saved) : {};
  });

  const [activeModuleId, setActiveModuleId] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');

  const activeModule = DEFAULT_FEEDBACK_MODULES.find(m => m.id === activeModuleId);
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
    localStorage.setItem('feedback_custom_policies', JSON.stringify(updated));
    setIsEditing(false);
  };

  const handleResetToDefault = () => {
    if (window.confirm(`Reset "${activeModule?.label}" to the NABH standard template? Your customizations will be lost.`)) {
      const updated = { ...customized };
      delete updated[activeModuleId];
      setCustomized(updated);
      localStorage.setItem('feedback_custom_policies', JSON.stringify(updated));
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
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">Feedback & Complaints</h2>
          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">Patient Experience Module</p>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scroll py-3 px-2 space-y-0.5">
          {DEFAULT_FEEDBACK_MODULES.map((mod) => {
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
                      Feedback & Complaints / {activeModule.label}
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
                <span className="text-slate-600">Patient Experience</span>
              </div>
              <div>
                <span className="block text-[8px] mb-0.5">Compliance Framework</span>
                <span className="text-slate-600">NABH / NABL / MoHFW</span>
              </div>
              <div>
                <span className="block text-[8px] mb-0.5">Review Cycle</span>
                <span className="text-slate-600">Monthly / Post-incident</span>
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

export default FeedbackWorkspace;

import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { ChevronLeft, Edit3, Save, BookOpen, Shield, Users, Activity, FileText, Award, Layers, AlertTriangle, Settings, Clipboard, Trash2, CheckCircle } from 'lucide-react';

const DEFAULT_CSSD_MODULES = [
  {
    id: 'overview',
    label: 'CSSD Overview',
    icon: 'BookOpen',
    objective: 'Ensure safe processing of reusable medical devices through proper workflow and segregation.',
    policy: 'CSSD shall maintain a unidirectional workflow.\nClean and dirty activities shall be physically separated.\nDesignated zones shall include:\n- Receiving Area\n- Cleaning/Washing Area\n- Drying Area\n- Packing Area\n- Sterilization Area\n- Sterile Storage Area\n- Distribution/Issue Area\nAdequate working space shall be maintained.'
  },
  {
    id: 'infrastructure-zoning',
    label: 'Infrastructure & Zoning',
    icon: 'Settings',
    objective: 'Ensure safe processing of reusable medical devices through proper workflow and segregation.',
    policy: 'CSSD shall maintain a unidirectional workflow.\nClean and dirty activities shall be physically separated.\nDesignated zones shall include:\n- Receiving Area\n- Cleaning/Washing Area\n- Drying Area\n- Packing Area\n- Sterilization Area\n- Sterile Storage Area\n- Distribution/Issue Area\nAdequate working space shall be maintained.'
  },
  {
    id: 'infection-control',
    label: 'Infection Prevention & Control',
    icon: 'Shield',
    objective: 'Prevent contamination during reprocessing activities.',
    policy: 'Standard infection control practices shall be followed.\nHand hygiene shall be mandatory.\nPPE shall be used according to risk.\nCross-contamination between clean and dirty zones shall be prevented.\nCompliance audits shall be conducted periodically.'
  },
  {
    id: 'instrument-cleaning',
    label: 'Instrument Cleaning & Disinfection',
    icon: 'Clipboard',
    objective: 'Ensure effective removal of soil before sterilization.',
    policy: 'Instruments shall be cleaned according to approved SOPs.\nCleaning shall occur immediately after use whenever possible.\nUltrasonic cleaning may be used where applicable.\nInstruments shall be adequately dried before packaging.\nCleaning effectiveness shall be monitored and documented.'
  },
  {
    id: 'packaging-labelling',
    label: 'Packaging & Labelling',
    icon: 'FileText',
    objective: 'Maintain sterility until point of use.',
    policy: 'Approved packaging materials shall be used.\nChemical indicators shall be placed within packs.\nEvery pack shall contain:\n- Sterilization date\n- Batch/load number\n- Sterilizer identification\n- Expiry date (where applicable)\nPack integrity shall be verified before issue.'
  },
  {
    id: 'sterilization-process',
    label: 'Sterilization Process',
    icon: 'Settings',
    objective: 'Ensure effective sterilization of medical devices.',
    policy: 'Validated sterilization methods shall be used.\nSterilization parameters shall follow manufacturer and regulatory requirements.\nSterilization cycles shall be documented.\nOnly trained personnel may operate sterilizers.\nFailed cycles shall be investigated immediately.'
  },
  {
    id: 'validation-monitoring',
    label: 'Sterilization Monitoring & Validation',
    icon: 'CheckCircle',
    objective: 'Verify effectiveness of sterilization processes.',
    policy: 'The following monitoring methods shall be used where applicable:\n\nPhysical Monitoring\n- Time\n- Temperature\n- Pressure\n\nChemical Monitoring\n- Internal indicators\n- External indicators\n\nBiological Monitoring\n- Biological indicators\n\nEquipment Validation\n- Bowie-Dick testing\n- Vacuum leak testing\n- Sterilizer validation\n\nAll validation records shall be maintained and reviewed.'
  },
  {
    id: 'sterilization-recall',
    label: 'Sterilization Recall Management',
    icon: 'AlertTriangle',
    objective: 'Ensure patient safety when sterilization failure occurs.',
    policy: 'A documented recall procedure shall be maintained.\nStaff shall be trained on recall procedures.\nFailed loads shall be identified and isolated immediately.\nRecall actions shall be documented.\nRoot cause analysis shall be conducted for every recall event.'
  },
  {
    id: 'staff-training',
    label: 'Staff Training & Competency',
    icon: 'Users',
    objective: 'Ensure personnel competency in sterilization services.',
    policy: 'CSSD personnel shall receive induction training.\nCompetency assessments shall be performed periodically.\nContinuing education programs shall be maintained.\nStaff vaccination requirements shall be monitored.\nTraining records shall be retained.'
  },
  {
    id: 'documentation',
    label: 'Documentation & Traceability',
    icon: 'FileText',
    objective: 'Maintain traceability and compliance.',
    policy: 'The following records shall be maintained:\n- Sterilization logs\n- Load records\n- Issue records\n- Validation records\n- Maintenance records\n- Recall records\n- Training records\nRecords shall be retained according to organizational policy.'
  },
  {
    id: 'equipment-maintenance',
    label: 'Equipment Management',
    icon: 'Settings',
    objective: 'Ensure safe and reliable operation of CSSD equipment.',
    policy: 'Preventive maintenance schedules shall be established.\nEquipment calibration shall be performed periodically.\nBreakdown maintenance shall be documented.\nValidation certificates shall be maintained.\nEquipment shall not be used when safety is compromised.'
  },
  {
    id: 'occupational-safety',
    label: 'Occupational Health & Safety',
    icon: 'Shield',
    objective: 'Protect CSSD personnel from workplace hazards.',
    policy: 'Needle-stick injury protocols shall be available.\nChemical handling procedures shall be followed.\nSpill management procedures shall be implemented.\nSafety Data Sheets (SDS/MSDS) shall be accessible.\nIncident reporting shall be mandatory.'
  },
  {
    id: 'fire-safety',
    label: 'Fire & Emergency Safety',
    icon: 'AlertTriangle',
    objective: 'Ensure preparedness for emergencies.',
    policy: 'Fire safety equipment shall be available and maintained.\nEmergency response procedures shall be displayed.\nStaff shall receive emergency preparedness training.\nFire drills shall be conducted periodically.\nEmergency exits shall remain unobstructed.'
  },
  {
    id: 'sterile-storage',
    label: 'Sterile Storage',
    icon: 'Layers',
    objective: 'Maintain sterility of processed items.',
    policy: 'Sterile items shall be stored in designated clean areas.\nStorage conditions shall be monitored.\nTemperature and humidity shall be controlled where required.\nDamaged packs shall be removed from use.\nStock rotation shall follow FIFO/FEFO principles.'
  },
  {
    id: 'sterile-distribution',
    label: 'Sterile Distribution',
    icon: 'Activity',
    objective: 'Ensure safe delivery of sterile items.',
    policy: 'Sterile items shall be transported in a manner that preserves sterility.\nIssue records shall be maintained.\nTraceability of distributed items shall be ensured.\nReturned sterile items shall follow documented procedures.'
  },
  {
    id: 'quality-assurance',
    label: 'Quality Assurance & Continuous Improvement',
    icon: 'Award',
    objective: 'Continuously improve CSSD performance.',
    policy: 'The following quality indicators shall be monitored:\n- Sterilization failure rate\n- Recall incidents\n- Turnaround time\n- Equipment downtime\n- Training compliance\n- Audit findings\n\nCorrective and Preventive Actions (CAPA) shall be implemented for identified issues.'
  },
  {
    id: 'compliance-audit',
    label: 'Compliance & Audit Management',
    icon: 'CheckCircle',
    objective: 'Ensure adherence to regulatory standards.',
    policy: 'Internal and external audits shall be conducted as per schedule.\nNon-conformances shall be documented and tracked.\nCorrective actions shall be implemented within defined timelines.\nRegulatory inspections shall be coordinated and documented.\nAudit reports shall be presented to management.'
  }
];

const ICON_MAP = {
  BookOpen, Shield, Users, Activity, FileText, Award, Layers,
  AlertTriangle, Settings, Clipboard, Trash2, CheckCircle
};

const CSSDWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();

  const [customized, setCustomized] = useState(() => {
    const saved = localStorage.getItem('cssd_custom_policies');
    return saved ? JSON.parse(saved) : {};
  });

  const [activeModuleId, setActiveModuleId] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');

  const activeModule = DEFAULT_CSSD_MODULES.find(m => m.id === activeModuleId);
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
    localStorage.setItem('cssd_custom_policies', JSON.stringify(updated));
    setIsEditing(false);
  };

  const handleResetToDefault = () => {
    if (window.confirm(`Reset "${activeModule?.label}" to the NABH standard template? Your customizations will be lost.`)) {
      const updated = { ...customized };
      delete updated[activeModuleId];
      setCustomized(updated);
      localStorage.setItem('cssd_custom_policies', JSON.stringify(updated));
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
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">CSSD</h2>
          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">Sterilization Services</p>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scroll py-3 px-2 space-y-0.5">
          {DEFAULT_CSSD_MODULES.map((mod) => {
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
                      CSSD / {activeModule.label}
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
                <span className="text-slate-600">CSSD Department</span>
              </div>
              <div>
                <span className="block text-[8px] mb-0.5">Compliance Framework</span>
                <span className="text-slate-600">NABH / ISO 13485</span>
              </div>
              <div>
                <span className="block text-[8px] mb-0.5">Review Cycle</span>
                <span className="text-slate-600">Annually / Post-incident</span>
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

export default CSSDWorkspace;

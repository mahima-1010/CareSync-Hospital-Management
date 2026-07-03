import React, { useState, useEffect } from 'react';
import { useHospital } from '../context/HospitalContext';
import { ChevronLeft, BookOpen, Shield, Users, Activity, FileText, Award, Layers, AlertTriangle, Settings, Clipboard, Trash2, CheckCircle, Edit3, Save } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const DEFAULT_SAFETY_MODULES = [
  {
    id: 'overview',
    label: 'Laboratory Overview',
    icon: 'BookOpen',
    objective: 'Provide a structured, compliant laboratory that meets NABH/NABL accreditation standards across all safety and testing services.',
    policy: 'The laboratory operates as a critical diagnostic support service for all clinical divisions.\nAll laboratory activities shall comply with applicable accreditation, regulatory, and safety requirements.\nSafety shall be integrated into all laboratory workflows and daily operations.\nHazards shall be systematically identified, assessed, and controlled.\nSafety incidents shall be reported and investigated promptly without punitive consequences.'
  },
  {
    id: 'safety-management',
    label: 'Safety Management',
    icon: 'Shield',
    objective: 'Provide a safe working environment for staff, patients, visitors, and contractors at all times.',
    policy: 'Laboratory operations shall comply with applicable accreditation, regulatory, and safety requirements.\nSafety shall be integrated into all laboratory activities.\nHazards shall be identified, assessed, and controlled.\nSafety incidents shall be reported and investigated promptly.'
  },
  {
    id: 'staff-roles',
    label: 'Staff Roles & Responsibilities',
    icon: 'Users',
    objective: 'Define clear accountability for laboratory safety compliance across all staff levels.',
    policy: 'The Laboratory Head is accountable for overall safety compliance and policy implementation.\nAll staff must adhere to safety protocols relevant to their assigned tasks.\nLaboratory access shall be restricted to authorized personnel only.\nVisitors shall be escorted at all times within laboratory restricted areas.\nBiohazard and restricted area signage shall be clearly displayed at all entry points.\nStaff must report unsafe conditions, near misses, or incidents immediately to their supervisor.'
  },
  {
    id: 'laboratory-access',
    label: 'Laboratory Access Control',
    icon: 'Shield',
    objective: 'Restrict access to authorized personnel only.',
    policy: 'Laboratory access shall be controlled.\nVisitors shall be escorted where required.\nRestricted areas shall be clearly identified.\nBiohazard signage shall be displayed where applicable.'
  },
  {
    id: 'housekeeping',
    label: 'Housekeeping & Facility Safety',
    icon: 'Settings',
    objective: 'Maintain a clean and safe laboratory environment.',
    policy: 'Work areas shall remain clean and organized.\nAisles, exits, eyewash stations, and fire equipment shall remain unobstructed.\nSpills shall be cleaned immediately.\nWaste bins shall be color-coded and emptied regularly.\nMaterials shall not be stored in corridors or emergency pathways.'
  },
  {
    id: 'personal-hygiene',
    label: 'Personal Hygiene',
    icon: 'Activity',
    objective: 'Prevent contamination and infection.',
    policy: 'Eating, drinking, smoking, and cosmetic application are prohibited in laboratory areas.\nFood shall not be stored in laboratory refrigerators.\nHand hygiene shall be performed:\n- Before and after patient contact\n- After glove removal\n- Before leaving the laboratory\nApproved hand hygiene methods shall be followed.'
  },
  {
    id: 'ppe',
    label: 'Personal Protective Equipment (PPE)',
    icon: 'Shield',
    objective: 'Protect staff from biological, chemical, and physical hazards.',
    policy: 'Appropriate PPE shall be worn according to task risk.\nLaboratory coats, gloves, and eye protection shall be available.\nContaminated PPE shall be removed before entering public areas.\nPPE usage compliance shall be monitored.'
  },
  {
    id: 'specimen-collection',
    label: 'Specimen Collection',
    icon: 'Clipboard',
    objective: 'Ensure specimen accuracy and patient safety.',
    policy: 'Patients shall be identified using at least two identifiers.\nSpecimens shall be labeled immediately after collection.\nLabels shall include:\n- Patient identifier\n- Collection date/time\n- Specimen type\n- Collector identification\nUnlabeled or mislabeled specimens shall be rejected.'
  },
  {
    id: 'patient-identification',
    label: 'Patient Identification',
    icon: 'Users',
    objective: 'Prevent patient misidentification errors throughout the laboratory testing pathway.',
    policy: 'Patient identification must be performed using at least two approved identifiers at every handoff point.\nApproved identifiers: Patient Name, Medical Record Number (MRN/UHID), Date of Birth.\nInpatients must be verified against wristband details before specimen collection.\nIdentity verification must be documented in the laboratory requisition log.\nStaff shall not proceed with specimen collection if patient identity cannot be confirmed.\nAny discrepancy between requisition and patient details must be resolved before collection.'
  },
  {
    id: 'sample-handling',
    label: 'Sample Handling & Transport',
    icon: 'Activity',
    objective: 'Maintain specimen integrity from collection through receipt and testing.',
    policy: 'Specimens shall be transported in leak-proof containers.\nBiohazard labeling shall be used where required.\nTemperature requirements shall be maintained.\nTransportation turnaround times shall be monitored.\nOutsourced specimens shall follow packaging and chain-of-custody requirements.'
  },
  {
    id: 'specimen-rejection',
    label: 'Specimen Rejection',
    icon: 'AlertTriangle',
    objective: 'Prevent inaccurate test results.',
    policy: 'Specimens may be rejected if:\n- Identification mismatch exists.\n- Container is leaking or damaged.\n- Quantity is insufficient.\n- Incorrect container is used.\n- Specimen quality is compromised.\nAll rejected specimens shall be documented.'
  },
  {
    id: 'testing-qc',
    label: 'Testing & Quality Control',
    icon: 'CheckCircle',
    objective: 'Ensure accurate and reliable testing.',
    policy: 'Approved SOPs shall exist for every test.\nValidation and verification activities shall be documented.\nQuality control shall be performed according to defined schedules.\nCalibration and maintenance records shall be maintained.'
  },
  {
    id: 'equipment-management',
    label: 'Equipment Management',
    icon: 'Settings',
    objective: 'Ensure reliable laboratory operations.',
    policy: 'Preventive maintenance schedules shall be established.\nCalibration shall be performed at defined intervals.\nEquipment performance checks shall be documented.\nFaulty equipment shall be removed from service until resolved.'
  },
  {
    id: 'result-reporting',
    label: 'Result Reporting',
    icon: 'FileText',
    objective: 'Provide accurate and timely laboratory reports.',
    policy: 'Reports shall contain patient identifiers.\nStandard report formats shall be used.\nAuthorized personnel shall validate reports.\nReport turnaround times (TAT) shall be monitored.\nReports shall be retained according to record retention requirements.'
  },
  {
    id: 'critical-values',
    label: 'Critical Value Notification',
    icon: 'AlertTriangle',
    objective: 'Ensure immediate communication of life-threatening findings.',
    policy: 'Critical values shall be predefined.\nCritical results shall be communicated immediately.\nRead-back verification shall be documented.\nNotification details shall be recorded.'
  },
  {
    id: 'report-amendment',
    label: 'Report Amendment',
    icon: 'FileText',
    objective: 'Maintain report integrity.',
    policy: 'Original reports shall remain available.\nAmended reports shall clearly identify corrections.\nReason for amendment shall be documented.\nAudit trails shall be maintained.'
  },
  {
    id: 'fire-safety',
    label: 'Fire Safety',
    icon: 'Shield',
    objective: 'Prevent and respond effectively to fire emergencies.',
    policy: 'Fire safety equipment shall be maintained.\nFire exits shall remain accessible.\nStaff shall receive fire safety training.\nEmergency response procedures shall follow RACE principles:\n- Rescue\n- Alarm\n- Confine\n- Evacuate\nFire extinguisher training shall follow PASS methodology.'
  },
  {
    id: 'biological-spill',
    label: 'Biological Spill Management',
    icon: 'AlertTriangle',
    objective: 'Manage biological spills safely.',
    policy: 'Appropriate PPE shall be used.\nSpill kits shall be readily available.\nApproved disinfectants shall be used.\nContact times shall be followed.\nAll spill events shall be documented.'
  },
  {
    id: 'chemical-spill',
    label: 'Chemical Spill Management',
    icon: 'AlertTriangle',
    objective: 'Reduce risk from chemical exposures.',
    policy: 'Safety Data Sheets (SDS) shall be available.\nSpill response shall follow chemical-specific procedures.\nChemical spill kits shall be maintained.\nHazardous waste disposal requirements shall be followed.'
  },
  {
    id: 'needlestick',
    label: 'Exposure & Needle-Stick',
    icon: 'AlertTriangle',
    objective: 'Ensure rapid response to occupational exposures.',
    policy: 'First aid shall be initiated immediately.\nExposure incidents shall be reported without delay.\nRisk assessment shall be conducted.\nPost-exposure prophylaxis (PEP) shall be available where indicated.\nFollow-up testing and counseling shall be documented.'
  },
  {
    id: 'infection-control',
    label: 'Infection Control',
    icon: 'Shield',
    objective: 'Prevent laboratory-acquired infections.',
    policy: 'Standard precautions shall be followed.\nBiosafety practices shall be implemented.\nBio-safety cabinets shall be used for aerosol-generating procedures.\nWork surfaces shall be disinfected routinely.\nStaff vaccination requirements shall be maintained.'
  },
  {
    id: 'chemical-safety',
    label: 'Chemical Safety',
    icon: 'Shield',
    objective: 'Ensure safe chemical handling and storage.',
    policy: 'Chemical inventories shall be maintained.\nSDS access shall be available at all times.\nChemicals shall be segregated by hazard class.\nHazard labeling shall be mandatory.\nHigh-risk chemicals shall have dedicated SOPs.'
  },
  {
    id: 'physical-safety',
    label: 'Physical Safety',
    icon: 'Activity',
    objective: 'Reduce injury from equipment and physical hazards.',
    policy: 'Sharps shall be disposed of immediately.\nGlassware shall be inspected before use.\nElectrical equipment shall be inspected regularly.\nEquipment safety procedures shall be followed.\nHazard reporting mechanisms shall be available.'
  },
  {
    id: 'waste-management',
    label: 'Waste Management',
    icon: 'Trash2',
    objective: 'Ensure safe waste segregation and disposal.',
    policy: 'Waste shall be segregated according to applicable regulations.\nColor-coded disposal systems shall be used.\nSharps disposal requirements shall be followed.\nHazardous chemical waste shall be managed separately.\nDisposal records shall be maintained.'
  },
  {
    id: 'incident-capa',
    label: 'Incident Reporting & CAPA',
    icon: 'AlertTriangle',
    objective: 'Promote continuous improvement.',
    policy: 'Safety incidents and near misses shall be reported.\nRoot Cause Analysis (RCA) shall be conducted.\nCorrective and Preventive Actions (CAPA) shall be implemented.\nTrends shall be reviewed periodically.'
  },
  {
    id: 'training-competency',
    label: 'Training & Competency',
    icon: 'Layers',
    objective: 'Maintain workforce competency.',
    policy: 'New employees shall receive safety orientation.\nAnnual refresher training shall be conducted.\nCompetency assessments shall be documented.\nTraining records shall be maintained electronically.'
  },
  {
    id: 'documentation-audits',
    label: 'Documentation & Audits',
    icon: 'FileText',
    objective: 'Maintain regulatory compliance.',
    policy: 'Safety records shall be retained according to policy.\nInternal audits shall be conducted periodically.\nInspection checklists shall be maintained.\nCorrective actions shall be tracked to closure.'
  }
];

const ICON_MAP = { BookOpen, Shield, Users, Activity, FileText, Award, Layers, AlertTriangle, Settings, Clipboard, Trash2, CheckCircle };

const SafetyWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();

  const [customized, setCustomized] = useState(() => {
    const saved = localStorage.getItem('safety_custom_policies');
    return saved ? JSON.parse(saved) : {};
  });

  const [activeModuleId, setActiveModuleId] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');

  const activeModule = DEFAULT_SAFETY_MODULES.find(m => m.id === activeModuleId);
  const customData = customized[activeModuleId];
  const displayClauses = customData?.clauses || (activeModule?.policy ? activeModule.policy.split('\n').filter(line => line.trim()) : []);
  const isCustomized = !!customData;

  const handleStartEdit = () => { setEditContent(displayClauses.join('\n')); setIsEditing(true); };

  const handleSaveEdit = () => {
    const updatedClauses = editContent.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const updated = { ...customized, [activeModuleId]: { clauses: updatedClauses } };
    setCustomized(updated);
    localStorage.setItem('safety_custom_policies', JSON.stringify(updated));
    setIsEditing(false);
  };

  const handleResetToDefault = () => {
    if (window.confirm(`Reset "${activeModule?.label}" to the NABH standard template?`)) {
      const updated = { ...customized };
      delete updated[activeModuleId];
      setCustomized(updated);
      localStorage.setItem('safety_custom_policies', JSON.stringify(updated));
      setIsEditing(false);
    }
  };

  return (
    <div className="flex gap-0 -m-6 min-h-[calc(100vh-4rem)]">
      {/* Left Rail */}
      <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider cursor-pointer transition-colors group">
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Policies Directory
          </button>
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">Safety</h2>
          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">NABH/NABL Compliance Module</p>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scroll py-3 px-2 space-y-0.5">
          {DEFAULT_SAFETY_MODULES.map((mod) => {
            const Icon = ICON_MAP[mod.icon] || BookOpen;
            const isActive = mod.id === activeModuleId;
            const isModCustomized = !!customized[mod.id];
            return (
              <button key={mod.id} onClick={() => { setActiveModuleId(mod.id); setIsEditing(false); }}
                style={isActive ? { backgroundColor: `${hospital.themeColor}0d`, borderColor: `${hospital.themeColor}22`, color: hospital.themeColor } : {}}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl border text-left transition-all cursor-pointer ${isActive ? 'border-sky-500/20 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[10px] font-semibold truncate">{mod.label}</span>
                </div>
                {isModCustomized && <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500" />}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-100 space-y-1.5">
          <div className="flex items-center gap-2 text-[8px] text-slate-400 font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 inline-block" /> NABH Standard
          </div>
          <div className="flex items-center gap-2 text-[8px] text-slate-400 font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Hospital Customized
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto custom-scroll bg-slate-50/40 p-6 space-y-5">
        {activeModule && (
          <>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Safety / {activeModule.label}</span>
                    {isCustomized
                      ? <span className="px-2 py-0.5 rounded-full text-[8px] font-bold border bg-emerald-50 border-emerald-200 text-emerald-700 uppercase tracking-wider">Hospital Customized</span>
                      : <span className="px-2 py-0.5 rounded-full text-[8px] font-bold border bg-sky-50 border-sky-200 text-sky-700 uppercase tracking-wider">NABH Standard</span>
                    }
                  </div>
                  <h1 className="text-base font-extrabold text-slate-900">{activeModule.label} Policy</h1>
                  <p className="text-[11px] text-slate-500 leading-relaxed max-w-2xl">
                    <span className="font-bold text-slate-600">Objective: </span>{activeModule.objective}
                  </p>
                </div>
                {!isEditing ? (
                  <div className="flex items-center gap-2 shrink-0">
                    {isCustomized && (
                      <button onClick={handleResetToDefault} className="px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-500 hover:text-rose-600 text-[10px] font-bold cursor-pointer transition-all">
                        Reset to NABH
                      </button>
                    )}
                    <button onClick={handleStartEdit} style={{ backgroundColor: hospital.themeColor }}
                      className="px-3 py-2 rounded-xl text-white font-bold text-[10px] flex items-center gap-1.5 hover:brightness-95 transition-all cursor-pointer shadow-sm btn-primary">
                      <Edit3 className="w-3.5 h-3.5" /> Customize SOP
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => setIsEditing(false)} className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                    <button onClick={handleSaveEdit} style={{ backgroundColor: hospital.themeColor }}
                      className="px-3 py-2 rounded-xl text-white font-bold text-[10px] flex items-center gap-1.5 hover:brightness-95 transition-all cursor-pointer shadow-sm btn-primary">
                      <Save className="w-3.5 h-3.5" /> Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>

            {!isEditing && (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3">Policy</h3>
                <ol className="space-y-3">
                  {displayClauses.map((clause, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span style={{ backgroundColor: `${hospital.themeColor}0d`, color: hospital.themeColor }}
                        className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-extrabold mt-0.5 border border-slate-100">
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
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Customize Policy Clauses</h3>
                  <p className="text-[9px] text-slate-400 mt-1">Enter each policy clause on a new line.</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-t-xl px-4 py-1.5 flex items-center gap-2">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Edit Clauses — one per line</span>
                </div>
                <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={12}
                  className="w-full px-4 py-3 rounded-b-xl border border-slate-200 border-t-0 text-slate-900 text-xs leading-relaxed font-sans focus:outline-none focus:border-sky-400 custom-scroll resize-none" />
                <p className="text-[9px] text-slate-400 font-medium">Each line becomes one numbered policy clause. Empty lines are ignored.</p>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-wrap items-center gap-6 text-[9px] font-bold uppercase tracking-wider text-slate-400">
              <div><span className="block text-[8px] mb-0.5">Module Scope</span><span className="text-slate-600">Safety Department</span></div>
              <div><span className="block text-[8px] mb-0.5">Compliance Framework</span><span className="text-slate-600">NABH / NABL / MoHFW</span></div>
              <div><span className="block text-[8px] mb-0.5">Review Cycle</span><span className="text-slate-600">Every 2 years / Post-incident</span></div>
              <div><span className="block text-[8px] mb-0.5">Status</span>
                <span className={isCustomized ? 'text-emerald-600' : 'text-sky-600'}>{isCustomized ? 'Hospital Customized' : 'NABH Standard Template'}</span>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default SafetyWorkspace;

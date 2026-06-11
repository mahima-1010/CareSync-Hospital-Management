import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { ChevronLeft, Edit3, Save, BookOpen, Shield, Users, Activity, FileText, Award, Layers, AlertTriangle, Settings, Clipboard, Trash2, CheckCircle, MessageSquare, BarChart3 } from 'lucide-react';

const DEFAULT_PHARMACY_MODULES = [
  {
    id: 'overview',
    label: 'Overview',
    icon: 'BookOpen',
    objective: 'Ensure safe, effective, and compliant management of medications.',
    policy: 'Pharmacy services shall operate under defined organizational governance.\nPharmacy responsibilities and reporting structure shall be documented.\nMedication management activities shall be overseen by qualified personnel.\nPharmacy services shall support inpatient, outpatient, emergency, ICU, and OT requirements.'
  },
  {
    id: 'regulatory-compliance',
    label: 'Regulatory Compliance',
    icon: 'Award',
    objective: 'Ensure compliance with all applicable laws and regulations.',
    policy: 'All required pharmacy licenses shall be maintained.\nLicense renewals shall be tracked through a compliance system.\nPharmacist registrations shall remain valid.\nRegulatory documents shall be readily available for inspection.\nCompliance audits shall be conducted periodically.'
  },
  {
    id: 'governance',
    label: 'Governance',
    icon: 'Settings',
    objective: 'Ensure safe, effective, and compliant management of medications.',
    policy: 'Pharmacy services shall operate under defined organizational governance.\nPharmacy responsibilities and reporting structure shall be documented.\nMedication management activities shall be overseen by qualified personnel.\nPharmacy services shall support inpatient, outpatient, emergency, ICU, and OT requirements.'
  },
  {
    id: 'qualified-pharmacist',
    label: 'Qualified Pharmacist',
    icon: 'Users',
    objective: 'Ensure medications are handled only by authorized personnel.',
    policy: 'Medication dispensing shall be performed by licensed pharmacists.\nPharmacists shall review prescriptions before dispensing.\nPharmacists shall provide patient counseling when required.\nPharmacists shall participate in medication safety initiatives.\nPharmacy staff competency shall be assessed regularly.'
  },
  {
    id: 'formulary-management',
    label: 'Formulary Management',
    icon: 'Clipboard',
    objective: 'Maintain a standardized and approved list of medications.',
    policy: 'A formulary shall define approved medications.\nNew drug additions shall follow a formal review process.\nMedication selection shall consider efficacy, safety, availability, and cost.\nFormulary reviews shall occur periodically.\nBanned or restricted medications shall be removed promptly.'
  },
  {
    id: 'ptc-committee',
    label: 'PTC Committee',
    icon: 'Users',
    objective: 'Provide multidisciplinary oversight of medication management.',
    policy: 'A Pharmacy & Therapeutics Committee shall be established.\nMembership shall include physicians, pharmacists, nursing representatives, microbiology, quality, and patient safety personnel.\nThe committee shall review:\n- Formulary changes\n- Antibiotic stewardship\n- Medication safety\n- ADR trends\n- Medication errors\nMeeting records shall be maintained.'
  },
  {
    id: 'procurement',
    label: 'Procurement',
    icon: 'Settings',
    objective: 'Ensure reliable procurement of safe and quality medications.',
    policy: 'Medicines shall be purchased from approved vendors.\nProcurement records shall be maintained.\nSupplier performance shall be periodically reviewed.\nEmergency procurement procedures shall be defined.\nProduct quality verification shall occur before acceptance.'
  },
  {
    id: 'inventory-management',
    label: 'Inventory Management',
    icon: 'Activity',
    objective: 'Maintain adequate stock while minimizing wastage.',
    policy: 'Inventory levels shall be monitored regularly.\nABC/VED analysis may be used for inventory control.\nStock rotation shall follow FIFO or FEFO principles.\nShort-expiry medicines shall be tracked.\nStock audits shall be conducted periodically.'
  },
  {
    id: 'storage',
    label: 'Medication Storage',
    icon: 'Shield',
    objective: 'Preserve medication quality and safety.',
    policy: 'Medicines shall be stored according to manufacturer requirements.\nTemperature and humidity shall be monitored.\nStorage areas shall be secure and clean.\nExpired medications shall be segregated immediately.\nStorage conditions shall be documented.'
  },
  {
    id: 'cold-chain',
    label: 'Cold Chain Management',
    icon: 'AlertTriangle',
    objective: 'Maintain integrity of temperature-sensitive products.',
    policy: 'Refrigerated medications shall be stored within specified temperature ranges.\nContinuous temperature monitoring shall be maintained.\nTemperature excursions shall be investigated.\nCold chain records shall be retained.\nBackup arrangements shall be available during power failures.'
  },
  {
    id: 'high-alert-medications',
    label: 'High-Alert Medications',
    icon: 'AlertTriangle',
    objective: 'Reduce risk associated with high-risk medications.',
    policy: 'High-alert medications shall be identified and listed.\nSpecial storage and labeling requirements shall be implemented.\nIndependent double-checks shall be performed where applicable.\nStaff shall receive training on high-alert medications.\nAdministration errors shall be reported and analyzed.'
  },
  {
    id: 'lasa',
    label: 'LASA Management',
    icon: 'AlertTriangle',
    objective: 'Prevent medication selection errors.',
    policy: 'LASA medications shall be identified.\nDistinct labeling shall be used.\nStorage separation shall be maintained.\nStaff awareness programs shall be conducted.\nLASA incidents shall be reviewed.'
  },
  {
    id: 'controlled-drugs',
    label: 'Controlled Drugs & Narcotics',
    icon: 'Shield',
    objective: 'Ensure secure handling of controlled substances.',
    policy: 'Controlled drugs shall be stored securely.\nAccess shall be restricted to authorized personnel.\nUsage logs shall be maintained.\nStock reconciliation shall be conducted regularly.\nDiscrepancies shall be investigated immediately.'
  },
  {
    id: 'emergency-medicines',
    label: 'Emergency Medicines',
    icon: 'Clipboard',
    objective: 'Ensure availability of emergency medications.',
    policy: 'Emergency medication lists shall be maintained.\nCrash carts shall be stocked and monitored.\nExpiry dates shall be checked regularly.\nReplenishment shall occur immediately after use.\nInspection records shall be maintained.'
  },
  {
    id: 'prescription-management',
    label: 'Prescription Management',
    icon: 'FileText',
    objective: 'Ensure safe and accurate medication ordering.',
    policy: 'Prescriptions shall contain complete patient identifiers.\nMedication orders shall be legible and complete.\nDose, route, frequency, and duration shall be specified.\nUnclear orders shall be clarified before dispensing.\nPrescription records shall be maintained.'
  },
  {
    id: 'verbal-orders',
    label: 'Verbal & Telephonic Orders',
    icon: 'Activity',
    objective: 'Reduce errors in verbal communication.',
    policy: 'Verbal orders shall be restricted to exceptional circumstances.\nOrders shall be read back and verified.\nDocumentation shall occur immediately.\nPrescriber authentication shall be obtained subsequently.\nCompliance shall be audited periodically.'
  },
  {
    id: 'medication-reconciliation',
    label: 'Medication Reconciliation',
    icon: 'Clipboard',
    objective: 'Prevent medication discrepancies during care transitions.',
    policy: 'Medication reconciliation shall be performed:\n- At admission\n- During transfer\n- At discharge\nDiscrepancies shall be documented and resolved.'
  },
  {
    id: 'dispensing',
    label: 'Dispensing Management',
    icon: 'Activity',
    objective: 'Ensure accurate medication dispensing.',
    policy: 'Prescriptions shall be reviewed before dispensing.\nCorrect medication selection shall be verified.\nLabels shall include required information.\nPatient counseling shall be provided when necessary.\nDispensing records shall be maintained.'
  },
  {
    id: 'medication-recall',
    label: 'Medication Recall',
    icon: 'AlertTriangle',
    objective: 'Ensure prompt removal of unsafe products.',
    policy: 'Recall notices shall be reviewed immediately.\nAffected stock shall be quarantined.\nRecall actions shall be documented.\nPatients shall be notified when required.\nRecall effectiveness shall be verified.'
  },
  {
    id: 'medication-administration',
    label: 'Medication Administration',
    icon: 'Clipboard',
    objective: 'Promote safe administration practices.',
    policy: 'Healthcare staff shall follow:\n- Right Patient\n- Right Drug\n- Right Dose\n- Right Route\n- Right Time\n- Right Reason\n- Right Documentation\nfor every medication administration.'
  },
  {
    id: 'adr-management',
    label: 'ADR Management',
    icon: 'Activity',
    objective: 'Detect and manage medication-related harm.',
    policy: 'ADRs shall be reported promptly.\nSerious ADRs shall be escalated.\nInvestigation and trend analysis shall be conducted.\nPreventive measures shall be implemented.\nADR records shall be maintained.'
  },
  {
    id: 'medication-errors',
    label: 'Medication Error Reporting',
    icon: 'AlertTriangle',
    objective: 'Promote medication safety and learning.',
    policy: 'Medication errors and near misses shall be reported.\nRoot cause analysis shall be performed.\nCorrective and preventive actions shall be implemented.\nNon-punitive reporting culture shall be encouraged.\nTrends shall be reviewed regularly.'
  },
  {
    id: 'disposal',
    label: 'Expired & Hazardous Drug Disposal',
    icon: 'Trash2',
    objective: 'Ensure safe disposal of pharmaceutical waste.',
    policy: 'Expired drugs shall be segregated immediately.\nHazardous medications shall be handled safely.\nDisposal shall comply with biomedical waste regulations.\nDisposal records shall be maintained.\nDisposal activities shall be audited.'
  },
  {
    id: 'quality-assurance',
    label: 'Quality Audits',
    icon: 'Award',
    objective: 'Continuously improve pharmacy services.',
    policy: 'Pharmacy quality indicators shall be monitored.\nInternal audits shall be conducted.\nMedication safety initiatives shall be reviewed.\nImprovement actions shall be documented.\nCompliance reports shall be maintained.'
  },
  {
    id: 'patient-education',
    label: 'Patient Counseling & Education',
    icon: 'Users',
    objective: 'Improve patient understanding and medication adherence.',
    policy: 'Patients shall receive information regarding:\n- Medication purpose\n- Dosage instructions\n- Storage requirements\n- Side effects\n- Precautions\n- Discharge medications\nEducation records shall be documented when applicable.'
  },
  {
    id: 'kpi-dashboard',
    label: 'KPI Dashboard',
    icon: 'BarChart3',
    objective: 'Measure effectiveness of medication management processes.',
    policy: 'KPIs may include:\n- Medication error rate\n- ADR rate\n- Prescription audit compliance\n- Stock-out rate\n- Expired medicine rate\n- Cold chain compliance\n- High-alert medication compliance\n- Recall completion rate\n- Patient counseling compliance\n\nPerformance shall be reviewed periodically.'
  }
];

const ICON_MAP = {
  BookOpen, Shield, Users, Activity, FileText, Award, Layers,
  AlertTriangle, Settings, Clipboard, Trash2, CheckCircle, MessageSquare,
  BarChart3
};

const PharmacyWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();

  const [customized, setCustomized] = useState(() => {
    const saved = localStorage.getItem('pharmacy_custom_policies');
    return saved ? JSON.parse(saved) : {};
  });

  const [activeModuleId, setActiveModuleId] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');

  const activeModule = DEFAULT_PHARMACY_MODULES.find(m => m.id === activeModuleId);
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
    localStorage.setItem('pharmacy_custom_policies', JSON.stringify(updated));
    setIsEditing(false);
  };

  const handleResetToDefault = () => {
    if (window.confirm(`Reset "${activeModule?.label}" to the NABH standard template? Your customizations will be lost.`)) {
      const updated = { ...customized };
      delete updated[activeModuleId];
      setCustomized(updated);
      localStorage.setItem('pharmacy_custom_policies', JSON.stringify(updated));
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
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">Pharmacy</h2>
          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">Medication Management Module</p>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scroll py-3 px-2 space-y-0.5">
          {DEFAULT_PHARMACY_MODULES.map((mod) => {
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
                      Pharmacy / {activeModule.label}
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
                <span className="text-slate-600">Pharmacy Department</span>
              </div>
              <div>
                <span className="block text-[8px] mb-0.5">Compliance Framework</span>
                <span className="text-slate-600">NABH / DCGI / MoHFW</span>
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

export default PharmacyWorkspace;

import React, { useState, useEffect } from 'react';
import { useHospital } from '../context/HospitalContext';
import { ChevronLeft, Edit3, Save, BookOpen, Shield, Users, Activity, FileText, Award, Layers, AlertTriangle, Settings, Clipboard, Trash2, CheckCircle, MessageSquare, BarChart3, TrendingUp, Search, Plus, X, ChevronRight, Download, Upload, Eye, Filter, Calendar, User, Folder } from 'lucide-react';

const FEMALE_WARD_MODULES = [
  { id: 'overview', label: 'Overview', icon: 'BookOpen' },
  { id: 'policies', label: 'Policies & SOPs', icon: 'FileText' },
  { id: 'registers', label: 'Registers', icon: 'Clipboard' },
  { id: 'quality', label: 'Quality Indicators', icon: 'BarChart3' },
  { id: 'audits', label: 'Audits', icon: 'Search' },
  { id: 'capa', label: 'CAPA', icon: 'AlertTriangle' },
  { id: 'evidence', label: 'Evidence Repository', icon: 'Folder' },
  { id: 'training', label: 'Training', icon: 'Users' },
  { id: 'reports', label: 'Reports', icon: 'Download' }
];

const ICON_MAP = {
  FileText, Clipboard, BarChart3, Search, AlertTriangle, Folder, Users, Download, Shield,
  BookOpen, Users, Activity, Award, Layers, Settings, Trash2, CheckCircle, MessageSquare, TrendingUp, Plus, X, ChevronRight, Upload, Eye, Filter, Calendar
};

const SAMPLE_POLICIES = [
  { id: 'p1', title: 'Admission Policy', code: 'POL-FW-001', version: '1.0', status: 'Published', effectiveDate: '2024-01-01', reviewDate: '2026-01-01', category: 'Admission' },
  { id: 'p2', title: 'Fall Prevention Policy', code: 'POL-FW-002', version: '2.1', status: 'Published', effectiveDate: '2024-03-15', reviewDate: '2025-03-15', category: 'Safety' },
  { id: 'p3', title: 'Medication Administration Policy', code: 'POL-FW-003', version: '1.2', status: 'Draft', effectiveDate: '2024-06-01', reviewDate: '2025-06-01', category: 'Medication' },
  { id: 'p4', title: 'Blood Transfusion Policy', code: 'POL-FW-004', version: '1.0', status: 'Published', effectiveDate: '2024-02-01', reviewDate: '2026-02-01', category: 'Blood' },
  { id: 'p5', title: 'Infection Control Policy', code: 'POL-FW-005', version: '3.0', status: 'Published', effectiveDate: '2024-01-15', reviewDate: '2025-01-15', category: 'Infection' }
];

const SAMPLE_FALLS = [
  { id: 'f1', date: '2025-05-12', patient: 'Mrs. Sharma', uhid: 'UHID-001', bed: 'FW-101', severity: 'Moderate', rootCause: 'Wet floor', immediateAction: 'First aid administered, flooring repaired' },
  { id: 'f2', date: '2025-05-18', patient: 'Ms. Patel', uhid: 'UHID-045', bed: 'FW-203', severity: 'Minor', rootCause: 'Improper footwear', immediateAction: 'Patient counseled, slippers provided' }
];

const SAMPLE_ADRS = [
  { id: 'a1', date: '2025-05-10', patient: 'Mrs. Singh', drug: 'Amoxicillin', reaction: 'Rash', severity: 'Moderate', outcome: 'Resolved' },
  { id: 'a2', date: '2025-05-22', patient: 'Ms. Kumar', drug: 'Ibuprofen', reaction: 'GI Upset', severity: 'Mild', outcome: 'Resolved' }
];

const SAMPLE_MED_ERRORS = [
  { id: 'm1', date: '2025-05-15', type: 'Wrong Dose', description: '10mg given instead of 5mg', severity: 'Moderate', rca: 'Calculation error', action: 'Retraining conducted' }
];

const SAMPLE_INFECTIONS = [
  { id: 'i1', type: 'CAUTI', date: '2025-04-20', patient: 'Mrs. Devi', organism: 'E. coli', treatment: 'Antibiotics' },
  { id: 'i2', type: 'HAI', date: '2025-05-01', patient: 'Ms. Rao', organism: 'Klebsiella', treatment: 'IV antibiotics' }
];

const SAMPLE_BLOOD_TRANSFUSIONS = [
  { id: 'b1', date: '2025-05-05', patient: 'Mrs. Iyer', product: 'Packed RBC', units: 2, details: 'Routine transfusion' }
];

const SAMPLE_BLOOD_WASTAGE = [
  { id: 'w1', product: 'Packed RBC', units: 1, reason: 'Expired', date: '2025-05-01' }
];

const SAMPLE_AUDITS = [
  { id: 'au1', title: 'Female Ward Monthly Audit', date: '2025-05-01', auditor: 'Dr. Verma', score: 85, status: 'Completed' },
  { id: 'au2', title: 'Infection Control Audit', date: '2025-05-15', auditor: 'Infection Control Nurse', score: 92, status: 'Completed' }
];

const SAMPLE_CAPA = [
  { id: 'c1', issue: 'Wet floor fall incident', rootCause: 'Housekeeping lapse', correctiveAction: 'Immediate mopping protocol reinforced', preventiveAction: 'Install wet floor signs at all entry points', responsible: 'Ward Sister', dueDate: '2025-06-01', status: 'Open' },
  { id: 'c2', issue: 'Medication calculation error', rootCause: 'Lack of double-check', correctiveAction: 'Independent double-check implemented', preventiveAction: 'Monthly competency assessment', responsible: 'Pharmacist', dueDate: '2025-05-30', status: 'Closed' }
];

const SAMPLE_TRAINING = [
  { id: 't1', topic: 'Hand Hygiene', trainer: 'Infection Control Nurse', date: '2025-04-10', attendees: 12, certificate: true, expiry: '2026-04-10' },
  { id: 't2', topic: 'Fall Prevention', trainer: 'Physiotherapist', date: '2025-04-20', attendees: 10, certificate: true, expiry: '2026-04-20' },
  { id: 't3', topic: 'Medication Safety', trainer: 'Pharmacist', date: '2025-05-05', attendees: 15, certificate: true, expiry: '2026-05-05' }
];

const EVIDENCE_FOLDERS = [
  { id: 'ef1', name: 'Policies', files: 5 },
  { id: 'ef2', name: 'Audits', files: 8 },
  { id: 'ef3', name: 'CAPA', files: 3 },
  { id: 'ef4', name: 'Training', files: 4 },
  { id: 'ef5', name: 'Infection Control', files: 6 },
  { id: 'ef6', name: 'Medication Safety', files: 2 },
  { id: 'ef7', name: 'Blood Transfusion', files: 1 },
  { id: 'ef8', name: 'Patient Safety', files: 4 }
];

const FemaleWardWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();
  const [activeTab, setActiveTab] = useState('overview');

  const [policies, setPolicies] = useState(() => {
    const saved = localStorage.getItem('fw_policies');
    return saved ? JSON.parse(saved) : SAMPLE_POLICIES;
  });
  const [falls, setFalls] = useState(() => { const s = localStorage.getItem('fw_falls'); return s ? JSON.parse(s) : SAMPLE_FALLS; });
  const [adrs, setAdrs] = useState(() => { const s = localStorage.getItem('fw_adrs'); return s ? JSON.parse(s) : SAMPLE_ADRS; });
  const [medErrors, setMedErrors] = useState(() => { const s = localStorage.getItem('fw_med_errors'); return s ? JSON.parse(s) : SAMPLE_MED_ERRORS; });
  const [infections, setInfections] = useState(() => { const s = localStorage.getItem('fw_infections'); return s ? JSON.parse(s) : SAMPLE_INFECTIONS; });
  const [bloodTransfusions, setBloodTransfusions] = useState(() => { const s = localStorage.getItem('fw_blood_trans'); return s ? JSON.parse(s) : SAMPLE_BLOOD_TRANSFUSIONS; });
  const [bloodWastage, setBloodWastage] = useState(() => { const s = localStorage.getItem('fw_blood_waste'); return s ? JSON.parse(s) : SAMPLE_BLOOD_WASTAGE; });
  const [audits, setAudits] = useState(() => { const s = localStorage.getItem('fw_audits'); return s ? JSON.parse(s) : SAMPLE_AUDITS; });
  const [capa, setCapa] = useState(() => { const s = localStorage.getItem('fw_capa'); return s ? JSON.parse(s) : SAMPLE_CAPA; });
  const [training, setTraining] = useState(() => { const s = localStorage.getItem('fw_training'); return s ? JSON.parse(s) : SAMPLE_TRAINING; });

  useEffect(() => { localStorage.setItem('fw_policies', JSON.stringify(policies)); }, [policies]);
  useEffect(() => { localStorage.setItem('fw_falls', JSON.stringify(falls)); }, [falls]);
  useEffect(() => { localStorage.setItem('fw_adrs', JSON.stringify(adrs)); }, [adrs]);
  useEffect(() => { localStorage.setItem('fw_med_errors', JSON.stringify(medErrors)); }, [medErrors]);
  useEffect(() => { localStorage.setItem('fw_infections', JSON.stringify(infections)); }, [infections]);
  useEffect(() => { localStorage.setItem('fw_blood_trans', JSON.stringify(bloodTransfusions)); }, [bloodTransfusions]);
  useEffect(() => { localStorage.setItem('fw_blood_waste', JSON.stringify(bloodWastage)); }, [bloodWastage]);
  useEffect(() => { localStorage.setItem('fw_audits', JSON.stringify(audits)); }, [audits]);
  useEffect(() => { localStorage.setItem('fw_capa', JSON.stringify(capa)); }, [capa]);
  useEffect(() => { localStorage.setItem('fw_training', JSON.stringify(training)); }, [training]);

  const kpiData = {
    totalFalls: falls.length,
    medErrors: medErrors.length,
    adrs: adrs.length,
    cauti: infections.filter(i => i.type === 'CAUTI').length,
    clabsi: infections.filter(i => i.type === 'CLABSI').length,
    hai: infections.filter(i => i.type === 'HAI').length,
    bloodTransfusions: bloodTransfusions.length,
    bloodWastage: bloodWastage.length,
    openCapa: capa.filter(c => c.status === 'Open').length,
    auditCompliance: audits.length > 0 ? Math.round(audits.reduce((a, b) => a + b.score, 0) / audits.length) : 0
  };

  const TabIcon = ({ icon }) => {
    const LucideIcon = ICON_MAP[icon] || BookOpen;
    return <LucideIcon className="w-3.5 h-3.5 shrink-0" />;
  };

  return (
    <div className="flex gap-0 -m-6 min-h-[calc(100vh-4rem)]">
      <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider cursor-pointer transition-colors group">
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Policies Directory
          </button>
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">Female Ward</h2>
          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">NABH Compliance Module</p>
        </div>
        <nav className="flex-1 overflow-y-auto custom-scroll py-3 px-2 space-y-0.5">
          {FEMALE_WARD_MODULES.map((mod) => {
            const Icon = ICON_MAP[mod.icon] || BookOpen;
            const isActive = mod.id === activeTab;
            return (
              <button key={mod.id} onClick={() => setActiveTab(mod.id)}
                style={isActive ? { backgroundColor: `${hospital.themeColor}0d`, borderColor: `${hospital.themeColor}22`, color: hospital.themeColor } : {}}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all duration-150 cursor-pointer ${isActive ? 'border-sky-500/20 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[10px] font-semibold truncate">{mod.label}</span>
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

      <main className="flex-1 overflow-y-auto custom-scroll bg-slate-50/40 p-6 space-y-5">
        {activeTab === 'overview' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Falls', value: kpiData.totalFalls, icon: 'AlertTriangle', color: 'text-rose-600' },
                { label: 'Medication Errors', value: kpiData.medErrors, icon: 'Activity', color: 'text-amber-600' },
                { label: 'ADRs', value: kpiData.adrs, icon: 'AlertTriangle', color: 'text-red-600' },
                { label: 'CAUTI Cases', value: kpiData.cauti, icon: 'Activity', color: 'text-orange-600' },
                { label: 'CLABSI Cases', value: kpiData.clabsi, icon: 'Shield', color: 'text-purple-600' },
                { label: 'Blood Transfusions', value: kpiData.bloodTransfusions, icon: 'Activity', color: 'text-blue-600' },
                { label: 'Blood Wastage', value: kpiData.bloodWastage, icon: 'Trash2', color: 'text-slate-600' },
                { label: 'Open CAPA', value: kpiData.openCapa, icon: 'AlertTriangle', color: 'text-emerald-600' },
                { label: 'Audit Compliance %', value: `${kpiData.auditCompliance}%`, icon: 'CheckCircle', color: 'text-sky-600' }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                      <p className="text-xl font-extrabold text-slate-900 mt-1">{kpi.value}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <TabIcon icon={kpi.icon} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3 mb-4">Monthly Safety & Quality Trends</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Safety Trend', 'Infection Trend', 'Quality Trend'].map((title, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 h-40 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-[10px] font-bold text-slate-400">{title}</p>
                      <p className="text-[9px] text-slate-400 mt-1">Chart placeholder — integrate chart library</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search policies..." className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-slate-800 text-xs" />
              </div>
              <button style={{ backgroundColor: hospital.themeColor }} className="px-4 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 shadow-sm">
                <Plus className="w-4 h-4" /> Add Policy
              </button>
            </div>
            <div className="space-y-3">
              {policies.map(policy => (
                <div key={policy.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100"><FileText className="w-4 h-4 text-slate-500" /></div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{policy.title}</h4>
                      <p className="text-[9px] text-slate-400 font-mono">{policy.code} • v{policy.version} • {policy.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${policy.status === 'Published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>{policy.status}</span>
                    <button className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500"><Eye className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'registers' && (
          <RegistersTab />
        )}

        {activeTab === 'quality' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Fall Rate', value: `${kpiData.totalFalls} incidents`, icon: 'AlertTriangle' },
                 { label: 'ADR Count', value: kpiData.adrs, icon: 'AlertTriangle' },
                { label: 'Medication Errors', value: kpiData.medErrors, icon: 'Activity' },
                { label: 'CAUTI Cases', value: kpiData.cauti, icon: 'Thermometer' },
                { label: 'CLABSI Cases', value: kpiData.clabsi, icon: 'Shield' },
                { label: 'Blood Transfusions', value: kpiData.bloodTransfusions, icon: 'Activity' },
                { label: 'Blood Wastage', value: kpiData.bloodWastage, icon: 'Trash2' },
                { label: 'Audit Compliance', value: `${kpiData.auditCompliance}%`, icon: 'CheckCircle' }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                  <p className="text-lg font-extrabold text-slate-900 mt-1">{kpi.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Monthly Comparison Charts</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-lg border border-slate-200 text-[9px] font-bold text-slate-600">Monthly</button>
                  <button className="px-3 py-1 rounded-lg border border-slate-200 text-[9px] font-bold text-slate-600">Quarterly</button>
                  <button className="px-3 py-1 rounded-lg border border-slate-200 text-[9px] font-bold text-slate-600">Yearly</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Safety Indicators', 'Infection Indicators', 'Blood Management', 'Clinical Indicators'].map((title, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 h-32 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                      <p className="text-[9px] font-bold text-slate-400">{title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audits' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800">Audit Records</h3>
              <button style={{ backgroundColor: hospital.themeColor }} className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2"><Plus className="w-3.5 h-3.5" /> New Audit</button>
            </div>
            <div className="space-y-3">
              {audits.map(audit => (
                <div key={audit.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{audit.title}</h4>
                    <p className="text-[9px] text-slate-400">Date: {audit.date} • Auditor: {audit.auditor}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${audit.score >= 80 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>{audit.score}%</span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase">{audit.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'capa' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Open CAPA', value: kpiData.openCapa, color: 'text-amber-600' },
                { label: 'Closed CAPA', value: capa.filter(c => c.status === 'Closed').length, color: 'text-emerald-600' },
                { label: 'Overdue CAPA', value: capa.filter(c => c.status === 'Open' && new Date(c.dueDate) < new Date()).length, color: 'text-rose-600' }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                  <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {capa.map(c => (
                <div key={c.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-slate-800">{c.issue}</h4>
                    <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${c.status === 'Open' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>{c.status}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Root Cause: {c.rootCause}</p>
                  <p className="text-[10px] text-slate-500">Responsible: {c.responsible} • Due: {c.dueDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800">Evidence Repository</h3>
              <button style={{ backgroundColor: hospital.themeColor }} className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2"><Upload className="w-3.5 h-3.5" /> Upload Evidence</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {EVIDENCE_FOLDERS.map(folder => (
                <div key={folder.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-sky-300 transition-all cursor-pointer min-h-[100px]">
                  <Folder className="w-8 h-8 text-sky-600" />
                  <span className="text-[10px] font-bold text-slate-700">{folder.name}</span>
                  <span className="text-[9px] text-slate-400">{folder.files} files</span>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-slate-400 text-center mt-4">Supports PDF, DOCX, Images, Excel • Tag and link to audits/CAPA</p>
          </div>
        )}

        {activeTab === 'training' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800">Training Records</h3>
              <button style={{ backgroundColor: hospital.themeColor }} className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2"><Plus className="w-3.5 h-3.5" /> Add Training</button>
            </div>
            <div className="space-y-3">
              {training.map(t => (
                <div key={t.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{t.topic}</h4>
                    <p className="text-[9px] text-slate-400">Trainer: {t.trainer} • Date: {t.date} • Attendees: {t.attendees}</p>
                    <p className="text-[9px] text-slate-400">Certificate: {t.certificate ? 'Yes' : 'No'} • Expiry: {t.expiry}</p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-[8px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Completed</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-800">Report Library</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Female Ward Monthly Report',
                'Quality Indicator Report',
                'Audit Report',
                'CAPA Report',
                'Infection Control Report',
                'Medication Safety Report',
                'Blood Utilization Report',
                'Training Compliance Report',
                'NABH Audit Readiness Report'
              ].map((report, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between hover:border-sky-300 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100"><FileText className="w-4 h-4 text-slate-500" /></div>
                    <span className="text-xs font-bold text-slate-700">{report}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-[9px] font-bold text-slate-600 flex items-center gap-1"><Download className="w-3 h-3" /> PDF</button>
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-[9px] font-bold text-slate-600 flex items-center gap-1"><Download className="w-3 h-3" /> Excel</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

function RegistersTab() {
  const [activeRegister, setActiveRegister] = useState('falls');
  const [falls, setFalls] = useState(() => { const s = localStorage.getItem('fw_falls'); return s ? JSON.parse(s) : SAMPLE_FALLS; });
  const [adrs, setAdrs] = useState(() => { const s = localStorage.getItem('fw_adrs'); return s ? JSON.parse(s) : SAMPLE_ADRS; });
  const [medErrors, setMedErrors] = useState(() => { const s = localStorage.getItem('fw_med_errors'); return s ? JSON.parse(s) : SAMPLE_MED_ERRORS; });
  const [infections, setInfections] = useState(() => { const s = localStorage.getItem('fw_infections'); return s ? JSON.parse(s) : SAMPLE_INFECTIONS; });
  const [bloodTransfusions, setBloodTransfusions] = useState(() => { const s = localStorage.getItem('fw_blood_trans'); return s ? JSON.parse(s) : SAMPLE_BLOOD_TRANSFUSIONS; });
  const [bloodWastage, setBloodWastage] = useState(() => { const s = localStorage.getItem('fw_blood_waste'); return s ? JSON.parse(s) : SAMPLE_BLOOD_WASTAGE; });

  useEffect(() => { localStorage.setItem('fw_falls', JSON.stringify(falls)); }, [falls]);
  useEffect(() => { localStorage.setItem('fw_adrs', JSON.stringify(adrs)); }, [adrs]);
  useEffect(() => { localStorage.setItem('fw_med_errors', JSON.stringify(medErrors)); }, [medErrors]);
  useEffect(() => { localStorage.setItem('fw_infections', JSON.stringify(infections)); }, [infections]);
  useEffect(() => { localStorage.setItem('fw_blood_trans', JSON.stringify(bloodTransfusions)); }, [bloodTransfusions]);
  useEffect(() => { localStorage.setItem('fw_blood_waste', JSON.stringify(bloodWastage)); }, [bloodWastage]);

  const registers = {
    falls: { title: 'Fall Register', data: falls, setData: setFalls, columns: ['Date', 'Patient', 'UHID', 'Bed', 'Severity', 'Root Cause', 'Action'] },
    adr: { title: 'ADR Register', data: adrs, setData: setAdrs, columns: ['Date', 'Patient', 'Drug', 'Reaction', 'Severity', 'Outcome'] },
    medErrors: { title: 'Medication Error Register', data: medErrors, setData: setMedErrors, columns: ['Date', 'Type', 'Description', 'Severity', 'RCA', 'Action'] },
    infections: { title: 'Infection Register', data: infections, setData: setInfections, columns: ['Type', 'Date', 'Patient', 'Organism', 'Treatment'] },
    bloodTrans: { title: 'Blood Transfusion Register', data: bloodTransfusions, setData: setBloodTransfusions, columns: ['Date', 'Patient', 'Product', 'Units', 'Details'] },
    bloodWaste: { title: 'Blood Wastage Register', data: bloodWastage, setData: setBloodWastage, columns: ['Product', 'Units', 'Reason', 'Date'] }
  };

  const current = registers[activeRegister];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        {Object.entries(registers).map(([key, reg]) => (
          <button key={key} onClick={() => setActiveRegister(key)}
            className={`px-4 py-2 rounded-t-lg text-[10px] font-bold whitespace-nowrap transition-all ${activeRegister === key ? 'bg-white border border-b-white border-t border-l border-r text-sky-700' : 'text-slate-500 hover:text-slate-700'}`}>
            {reg.title}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{current.title}</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-600 flex items-center gap-1"><Filter className="w-3 h-3" /> Filter</button>
          <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-600 flex items-center gap-1"><Download className="w-3 h-3" /> Export Excel</button>
          <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-600 flex items-center gap-1"><Download className="w-3 h-3" /> Print PDF</button>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>{current.columns.map(col => <th key={col} className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">{col}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {current.data.map(row => (
                <tr key={row.id} className="hover:bg-slate-50/50">
                  {Object.values(row).filter((_, i) => i < current.columns.length).map((val, i) => (
                    <td key={i} className="px-4 py-3 text-slate-700">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FemaleWardWorkspace;

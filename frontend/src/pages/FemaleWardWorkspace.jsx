import React, { useState, useEffect } from 'react';
import { useHospital } from '../context/HospitalContext';
import { ChevronLeft, Plus, X, Edit3, Trash2, Eye, AlertTriangle, Activity, BarChart3, Search, Users, Shield, Clock, BookOpen } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FEMALE_WARD_MODULES = [
  { id: 'overview', label: 'Overview', icon: 'BookOpen' },
  { id: 'quality', label: 'Quality Indicators', icon: 'BarChart3' },
  { id: 'audits', label: 'Audits', icon: 'Search' },
  { id: 'capa', label: 'CAPA', icon: 'AlertTriangle' },
  { id: 'training', label: 'Training', icon: 'Users' }
];

const ICON_MAP = {
  BookOpen, BarChart3, Search, AlertTriangle, Users, Activity, Shield, Clock
};

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

const SAMPLE_QUALITY_INDICATORS = [
  { id: 'qi1', month: 'January', year: 2025, fallsReported: 2, dischargeCount: 45, lamaCount: 3, deathCount: 1, adrCount: 1, medErrorCount: 1, totalNurseAssessmentMins: 1200, totalDoctorAssessmentMins: 900, totalPatients: 50, cautiCases: 0, catheterDays: 120, bsiCases: 1, centralLineDays: 80, totalDischargeMins: 3600, totalDischarges: 45, admissions: 50, transfersOut: 2, sdpUnits: 0, prbcUnits: 3, rdpUnits: 0, ffpUnits: 2, plsmUnits: 0, cryoUnits: 0, bloodTatMins: 45, transfusionReactions: 0 },
  { id: 'qi2', month: 'February', year: 2025, fallsReported: 1, dischargeCount: 42, lamaCount: 2, deathCount: 0, adrCount: 0, medErrorCount: 1, totalNurseAssessmentMins: 1100, totalDoctorAssessmentMins: 850, totalPatients: 47, cautiCases: 1, catheterDays: 115, bsiCases: 0, centralLineDays: 75, totalDischargeMins: 3400, totalDischarges: 42, admissions: 48, transfersOut: 1, sdpUnits: 0, prbcUnits: 2, rdpUnits: 0, ffpUnits: 1, plsmUnits: 0, cryoUnits: 0, bloodTatMins: 40, transfusionReactions: 0 },
  { id: 'qi3', month: 'March', year: 2025, fallsReported: 3, dischargeCount: 50, lamaCount: 4, deathCount: 1, adrCount: 2, medErrorCount: 0, totalNurseAssessmentMins: 1350, totalDoctorAssessmentMins: 1000, totalPatients: 55, cautiCases: 0, catheterDays: 130, bsiCases: 1, centralLineDays: 85, totalDischargeMins: 3800, totalDischarges: 50, admissions: 55, transfersOut: 3, sdpUnits: 0, prbcUnits: 4, rdpUnits: 0, ffpUnits: 3, plsmUnits: 0, cryoUnits: 1, bloodTatMins: 50, transfusionReactions: 0 },
  { id: 'qi4', month: 'April', year: 2025, fallsReported: 0, dischargeCount: 48, lamaCount: 2, deathCount: 0, adrCount: 1, medErrorCount: 1, totalNurseAssessmentMins: 1250, totalDoctorAssessmentMins: 920, totalPatients: 52, cautiCases: 0, catheterDays: 125, bsiCases: 0, centralLineDays: 78, totalDischargeMins: 3700, totalDischarges: 48, admissions: 52, transfersOut: 2, sdpUnits: 0, prbcUnits: 3, rdpUnits: 0, ffpUnits: 2, plsmUnits: 0, cryoUnits: 0, bloodTatMins: 42, transfusionReactions: 1 },
  { id: 'qi5', month: 'May', year: 2025, fallsReported: 2, dischargeCount: 55, lamaCount: 3, deathCount: 0, adrCount: 0, medErrorCount: 2, totalNurseAssessmentMins: 1400, totalDoctorAssessmentMins: 1050, totalPatients: 58, cautiCases: 1, catheterDays: 140, bsiCases: 0, centralLineDays: 90, totalDischargeMins: 4000, totalDischarges: 55, admissions: 58, transfersOut: 1, sdpUnits: 0, prbcUnits: 5, rdpUnits: 0, ffpUnits: 2, plsmUnits: 0, cryoUnits: 0, bloodTatMins: 38, transfusionReactions: 0 }
];

const SAMPLE_AUDITS = [
  { id: 'au1', title: 'Female Ward Monthly Audit', date: '2025-05-01', auditor: 'Dr. Verma', score: 85, findings: 'Overall compliant. Documentation needs improvement.', status: 'Completed' },
  { id: 'au2', title: 'Infection Control Audit', date: '2025-05-15', auditor: 'Infection Control Nurse', score: 92, findings: 'Hand hygiene compliance improved. Catheter care SOP updated.', status: 'Completed' }
];

const SAMPLE_CAPA = [
  { id: 'c1', issue: 'Wet floor fall incident', indicator: 'Patient Safety - Falls', rootCause: 'Housekeeping lapse', correctiveAction: 'Immediate mopping protocol reinforced', preventiveAction: 'Install wet floor signs at all entry points', owner: 'Ward Sister', dueDate: '2025-06-01', status: 'Open' },
  { id: 'c2', issue: 'Medication calculation error', indicator: 'Medication Safety', rootCause: 'Lack of double-check', correctiveAction: 'Independent double-check implemented', preventiveAction: 'Monthly competency assessment', owner: 'Pharmacist', dueDate: '2025-05-30', status: 'Closed' }
];

const SAMPLE_TRAINING = [
  { id: 't1', topic: 'Hand Hygiene', trainer: 'Infection Control Nurse', date: '2025-04-10', participants: 12, completionPct: 100, status: 'Completed' },
  { id: 't2', topic: 'Fall Prevention', trainer: 'Physiotherapist', date: '2025-04-20', participants: 10, completionPct: 100, status: 'Completed' },
  { id: 't3', topic: 'Medication Safety', trainer: 'Pharmacist', date: '2025-05-05', participants: 15, completionPct: 80, status: 'In Progress' }
];

const FemaleWardWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();
  const [activeTab, setActiveTab] = useState('overview');

  const [qualityIndicators, setQualityIndicators] = useState(() => {
    const s = localStorage.getItem('fw_quality_indicators');
    return s ? JSON.parse(s) : SAMPLE_QUALITY_INDICATORS;
  });
  const [audits, setAudits] = useState(() => { const s = localStorage.getItem('fw_audits'); return s ? JSON.parse(s) : SAMPLE_AUDITS; });
  const [capa, setCapa] = useState(() => { const s = localStorage.getItem('fw_capa'); return s ? JSON.parse(s) : SAMPLE_CAPA; });
  const [training, setTraining] = useState(() => { const s = localStorage.getItem('fw_training'); return s ? JSON.parse(s) : SAMPLE_TRAINING; });

  useEffect(() => { localStorage.setItem('fw_quality_indicators', JSON.stringify(qualityIndicators)); }, [qualityIndicators]);
  useEffect(() => { localStorage.setItem('fw_audits', JSON.stringify(audits)); }, [audits]);
  useEffect(() => { localStorage.setItem('fw_capa', JSON.stringify(capa)); }, [capa]);
  useEffect(() => { localStorage.setItem('fw_training', JSON.stringify(training)); }, [training]);

  const [isQiModalOpen, setIsQiModalOpen] = useState(false);
  const [editingQiId, setEditingQiId] = useState(null);
  const [qiForm, setQiForm] = useState({
    month: 'January', year: 2025, fallsReported: 0, dischargeCount: 0, lamaCount: 0, deathCount: 0,
    adrCount: 0, medErrorCount: 0, totalNurseAssessmentMins: 0, totalDoctorAssessmentMins: 0, totalPatients: 0,
    cautiCases: 0, catheterDays: 0, bsiCases: 0, centralLineDays: 0,
    totalDischargeMins: 0, totalDischarges: 0, admissions: 0, transfersOut: 0,
    sdpUnits: 0, prbcUnits: 0, rdpUnits: 0, ffpUnits: 0, plsmUnits: 0, cryoUnits: 0, bloodTatMins: 0, transfusionReactions: 0
  });

  const [isCapaModalOpen, setIsCapaModalOpen] = useState(false);
  const [editingCapaId, setEditingCapaId] = useState(null);
  const [capaForm, setCapaForm] = useState({ issue: '', indicator: '', rootCause: '', correctiveAction: '', preventiveAction: '', owner: '', dueDate: '', status: 'Open' });

  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [editingAuditId, setEditingAuditId] = useState(null);
  const [auditForm, setAuditForm] = useState({ title: '', date: '', auditor: '', score: 0, findings: '', status: 'Planned' });

  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);
  const [editingTrainingId, setEditingTrainingId] = useState(null);
  const [trainingForm, setTrainingForm] = useState({ topic: '', trainer: '', date: '', participants: 0, completionPct: 0, status: 'Planned' });

  const calc = (r) => {
    const denomFalls = (r.dischargeCount || 0) + (r.lamaCount || 0) + (r.deathCount || 0);
    const fallRate = denomFalls > 0 ? ((r.fallsReported || 0) / denomFalls * 100).toFixed(2) : '0.00';
    const adrRate = r.totalPatients > 0 ? ((r.adrCount || 0) / r.totalPatients * 100).toFixed(2) : '0.00';
    const medErrorRate = r.totalPatients > 0 ? ((r.medErrorCount || 0) / r.totalPatients * 100).toFixed(2) : '0.00';
    const avgNurse = (r.totalPatients || 0) > 0 ? ((r.totalNurseAssessmentMins || 0) / (r.totalPatients || 0)).toFixed(1) : '0.0';
    const avgDoctor = (r.totalPatients || 0) > 0 ? ((r.totalDoctorAssessmentMins || 0) / (r.totalPatients || 0)).toFixed(1) : '0.0';
    const cautiRate = (r.catheterDays || 0) > 0 ? ((r.cautiCases || 0) / (r.catheterDays || 0) * 100).toFixed(2) : '0.00';
    const bsiRate = (r.centralLineDays || 0) > 0 ? ((r.bsiCases || 0) / (r.centralLineDays || 0) * 100).toFixed(2) : '0.00';
    const avgDischarge = (r.totalDischarges || 0) > 0 ? ((r.totalDischargeMins || 0) / (r.totalDischarges || 0)).toFixed(1) : '0.0';
    const patientDays = (r.admissions || 0) - (r.transfersOut || 0);
    const bloodUsage = (r.sdpUnits || 0) + (r.prbcUnits || 0) + (r.rdpUnits || 0) + (r.ffpUnits || 0) + (r.plsmUnits || 0) + (r.cryoUnits || 0);
    return { ...r, fallRate, adrRate, medErrorRate, avgNurseAssessment: avgNurse, avgDoctorAssessment: avgDoctor, cautiRate, bsiRate, avgDischargeTime: avgDischarge, patientDays, bloodUsage };
  };

  const enrichedQI = qualityIndicators.map(calc);

  const chartData = enrichedQI.map(r => ({
    name: `${r.month} ${r.year}`,
    'Falls %': parseFloat(r.fallRate),
    'ADR %': parseFloat(r.adrRate),
    'Med Error %': parseFloat(r.medErrorRate),
    'CAUTI Rate': parseFloat(r.cautiRate),
    'BSI Rate': parseFloat(r.bsiRate),
    'Blood Usage': r.bloodUsage
  }));

  const overviewKpi = {
    totalFalls: qualityIndicators.reduce((s, r) => s + (r.fallsReported || 0), 0),
    totalADRs: qualityIndicators.reduce((s, r) => s + (r.adrCount || 0), 0),
    totalMedErrors: qualityIndicators.reduce((s, r) => s + (r.medErrorCount || 0), 0),
    totalCAUTI: qualityIndicators.reduce((s, r) => s + (r.cautiCases || 0), 0),
    totalBSI: qualityIndicators.reduce((s, r) => s + (r.bsiCases || 0), 0),
    totalBloodUsage: qualityIndicators.reduce((s, r) => s + (r.sdpUnits || 0) + (r.prbcUnits || 0) + (r.rdpUnits || 0) + (r.ffpUnits || 0) + (r.plsmUnits || 0) + (r.cryoUnits || 0), 0),
    avgAssessmentTime: qualityIndicators.length > 0 ? (qualityIndicators.reduce((s, r) => s + parseFloat(((r.totalNurseAssessmentMins || 0) + (r.totalDoctorAssessmentMins || 0)) / (r.totalPatients || 1)), 0) / qualityIndicators.length).toFixed(1) : '0.0',
    avgDischargeTime: qualityIndicators.length > 0 ? (qualityIndicators.reduce((s, r) => s + ((r.totalDischargeMins || 0) / (r.totalDischarges || 1)), 0) / qualityIndicators.length).toFixed(1) : '0.0',
    openCapa: capa.filter(c => c.status === 'Open').length,
    auditCompliance: audits.length > 0 ? Math.round(audits.reduce((a, b) => a + (b.score || 0), 0) / audits.length) : 0
  };

  const handleDeleteTraining = (id) => {
    if (confirm('Delete this training record?')) {
      setTraining(prev => prev.filter(t => t.id !== id));
    }
  };

  const nextCapaId = () => {
    const maxNum = capa.reduce((max, c) => {
      const num = parseInt(c.id.split('-').pop(), 10);
      return num > max ? num : max;
    }, 0);
    return `FW-CAPA-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenQiModal = (record) => {
    if (record) {
      setQiForm({ ...record });
      setEditingQiId(record.id);
    } else {
      setQiForm({ month: 'January', year: 2025, fallsReported: 0, dischargeCount: 0, lamaCount: 0, deathCount: 0, adrCount: 0, medErrorCount: 0, totalNurseAssessmentMins: 0, totalDoctorAssessmentMins: 0, totalPatients: 0, cautiCases: 0, catheterDays: 0, bsiCases: 0, centralLineDays: 0, totalDischargeMins: 0, totalDischarges: 0, admissions: 0, transfersOut: 0, sdpUnits: 0, prbcUnits: 0, rdpUnits: 0, ffpUnits: 0, plsmUnits: 0, cryoUnits: 0, bloodTatMins: 0, transfusionReactions: 0 });
      setEditingQiId(null);
    }
    setIsQiModalOpen(true);
  };

  const handleSaveQi = (e) => {
    e.preventDefault();
    if (editingQiId) {
      setQualityIndicators(prev => prev.map(r => r.id === editingQiId ? { ...qiForm, id: editingQiId } : r));
    } else {
      setQualityIndicators(prev => [...prev, { ...qiForm, id: `qi${Date.now()}` }]);
    }
    setIsQiModalOpen(false);
    setEditingQiId(null);
  };

  const handleDeleteQi = (id) => {
    if (confirm('Delete this quality indicator record?')) {
      setQualityIndicators(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleOpenCapaModal = (record) => {
    if (record) {
      setCapaForm({ ...record });
      setEditingCapaId(record.id);
    } else {
      setCapaForm({ id: nextCapaId(), issue: '', indicator: '', rootCause: '', correctiveAction: '', preventiveAction: '', owner: '', dueDate: '', status: 'Open' });
      setEditingCapaId(null);
    }
    setIsCapaModalOpen(true);
  };

  const handleSaveCapa = (e) => {
    e.preventDefault();
    if (editingCapaId) {
      setCapa(prev => prev.map(c => c.id === editingCapaId ? { ...capaForm, id: editingCapaId } : c));
    } else {
      setCapa(prev => [...prev, capaForm]);
    }
    setIsCapaModalOpen(false);
    setEditingCapaId(null);
  };

  const handleDeleteCapa = (id) => {
    if (confirm('Delete this CAPA record?')) {
      setCapa(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleOpenAuditModal = (record) => {
    if (record) {
      setAuditForm({ ...record });
      setEditingAuditId(record.id);
    } else {
      setAuditForm({ title: '', date: '', auditor: '', score: 0, findings: '', status: 'Planned' });
      setEditingAuditId(null);
    }
    setIsAuditModalOpen(true);
  };

  const handleSaveAudit = (e) => {
    e.preventDefault();
    if (editingAuditId) {
      setAudits(prev => prev.map(a => a.id === editingAuditId ? { ...auditForm, id: editingAuditId } : a));
    } else {
      setAudits(prev => [...prev, { ...auditForm, id: `au${Date.now()}` }]);
    }
    setIsAuditModalOpen(false);
    setEditingAuditId(null);
  };

  const handleDeleteAudit = (id) => {
    if (confirm('Delete this audit record?')) {
      setAudits(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleOpenTrainingModal = (record) => {
    if (record) {
      setTrainingForm({ ...record });
      setEditingTrainingId(record.id);
    } else {
      setTrainingForm({ topic: '', trainer: '', date: '', participants: 0, completionPct: 0, status: 'Planned' });
      setEditingTrainingId(null);
    }
    setIsTrainingModalOpen(true);
  };

  const handleSaveTraining = (e) => {
    e.preventDefault();
    if (editingTrainingId) {
      setTraining(prev => prev.map(t => t.id === editingTrainingId ? { ...trainingForm, id: editingTrainingId } : t));
    } else {
      setTraining(prev => [...prev, { ...trainingForm, id: `t${Date.now()}` }]);
    }
    setIsTrainingModalOpen(false);
    setEditingTrainingId(null);
  };

  const TabIcon = ({ icon }) => {
    const LucideIcon = ICON_MAP[icon] || BookOpen;
    return <LucideIcon className="w-3.5 h-3.5 shrink-0" />;
  };

  const FormField = ({ label, field, form, setForm, type = 'number' }) => (
    <div>
      <label className="block text-[9px] font-medium text-slate-600 mb-1">{label}</label>
      <input type={type} value={form[field]} onChange={(e) => setForm({...form, [field]: type === 'number' ? (parseInt(e.target.value) || 0) : e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
   </div>
  );

  return (
    <div className="flex gap-0 -m-6 min-h-[calc(100vh-4rem)]">
      <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider cursor-pointer transition-colors group">
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Dashboard
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
                { label: 'Falls Reported', value: overviewKpi.totalFalls, icon: 'AlertTriangle', color: 'text-rose-600' },
                { label: 'ADR Count', value: overviewKpi.totalADRs, icon: 'AlertTriangle', color: 'text-red-600' },
                { label: 'Medication Errors', value: overviewKpi.totalMedErrors, icon: 'Activity', color: 'text-amber-600' },
                { label: 'CAUTI Cases', value: overviewKpi.totalCAUTI, icon: 'Activity', color: 'text-orange-600' },
                { label: 'BSI Cases', value: overviewKpi.totalBSI, icon: 'Shield', color: 'text-purple-600' },
                { label: 'Blood Product Usage', value: overviewKpi.totalBloodUsage, icon: 'Activity', color: 'text-blue-600' },
                { label: 'Avg Assessment Time', value: `${overviewKpi.avgAssessmentTime} min`, icon: 'Clock', color: 'text-teal-600' },
                { label: 'Avg Discharge Time', value: `${overviewKpi.avgDischargeTime} min`, icon: 'Clock', color: 'text-indigo-600' }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                      <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <TabIcon icon={kpi.icon} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3 mb-4">Trends</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-56">
                  <p className="text-[9px] font-bold text-slate-500 mb-2">Falls Trend</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                      <YAxis tick={{ fontSize: 9 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="Falls %" stroke="#e11d48" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-56">
                  <p className="text-[9px] font-bold text-slate-500 mb-2">Medication Error Trend</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                      <YAxis tick={{ fontSize: 9 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="Med Error %" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-56">
                  <p className="text-[9px] font-bold text-slate-500 mb-2">Infection Trend</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                      <YAxis tick={{ fontSize: 9 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="CAUTI Rate" stroke="#f97316" strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="BSI Rate" stroke="#a855f7" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-56">
                  <p className="text-[9px] font-bold text-slate-500 mb-2">Blood Usage Trend</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                      <YAxis tick={{ fontSize: 9 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="Blood Usage" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quality' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800">Quality Indicator Data Collection</h3>
              <button onClick={() => handleOpenQiModal()} style={{ backgroundColor: hospital.themeColor }} className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2"><Plus className="w-3.5 h-3.5" /> Add Monthly Data</button>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Month / Year</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Falls %</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">ADR %</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Med Error %</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Assessment Time</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">CAUTI Rate</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">BSI Rate</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Discharge Time</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Patient Days</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Blood Usage</th>
                      <th className="px-3 py-3 text-center font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {enrichedQI.map(r => (
                      <tr key={r.id} className="hover:bg-slate-50/50">
                        <td className="px-3 py-3 text-slate-700 font-medium">{r.month} {r.year}</td>
                        <td className="px-3 py-3 text-slate-700">{r.fallRate}%</td>
                        <td className="px-3 py-3 text-slate-700">{r.adrRate}%</td>
                        <td className="px-3 py-3 text-slate-700">{r.medErrorRate}%</td>
                        <td className="px-3 py-3 text-slate-700">{r.avgNurseAssessment} / {r.avgDoctorAssessment} min</td>
                        <td className="px-3 py-3 text-slate-700">{r.cautiRate}%</td>
                        <td className="px-3 py-3 text-slate-700">{r.bsiRate}%</td>
                        <td className="px-3 py-3 text-slate-700">{r.avgDischargeTime} min</td>
                        <td className="px-3 py-3 text-slate-700">{r.patientDays}</td>
                        <td className="px-3 py-3 text-slate-700">{r.bloodUsage} units</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => handleOpenQiModal(r)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-slate-600 hover:border-sky-300 hover:text-sky-700 cursor-pointer"><Eye className="w-3 h-3" /></button>
                            <button onClick={() => handleOpenQiModal(r)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer"><Edit3 className="w-3 h-3" /></button>
                            <button onClick={() => handleDeleteQi(r.id)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-rose-600 hover:border-rose-300 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {enrichedQI.length === 0 && (
                      <tr><td colSpan={11} className="px-3 py-8 text-center text-[10px] text-slate-400">No quality indicator records. Click "Add Monthly Data" to begin.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audits' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800">Audit Records</h3>
              <button onClick={() => handleOpenAuditModal()} style={{ backgroundColor: hospital.themeColor }} className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2"><Plus className="w-3.5 h-3.5" /> New Audit</button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Total Audits', value: audits.length, color: 'text-slate-700' },
                { label: 'Completed', value: audits.filter(a => a.status === 'Completed').length, color: 'text-emerald-600' },
                { label: 'Compliance %', value: `${audits.length > 0 ? Math.round(audits.reduce((a, b) => a + (b.score || 0), 0) / audits.length) : 0}%`, color: 'text-sky-600' }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                  <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {audits.map(audit => (
                <div key={audit.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{audit.title}</h4>
                    <p className="text-[9px] text-slate-400">Date: {audit.date} • Auditor: {audit.auditor}</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">{audit.findings}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${(audit.score || 0) >= 80 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>{audit.score || 0}%</span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase">{audit.status}</span>
                    <button onClick={() => handleOpenAuditModal(audit)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer"><Edit3 className="w-3 h-3" /></button>
                    <button onClick={() => handleDeleteAudit(audit.id)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-rose-600 hover:border-rose-300 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'capa' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800">CAPA Records</h3>
              <button onClick={() => handleOpenCapaModal()} style={{ backgroundColor: hospital.themeColor }} className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2"><Plus className="w-3.5 h-3.5" /> Add CAPA</button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Open CAPA', value: capa.filter(c => c.status === 'Open').length, color: 'text-amber-600' },
                { label: 'Under Investigation', value: capa.filter(c => c.status === 'Under Investigation').length, color: 'text-blue-600' },
                { label: 'Closed', value: capa.filter(c => c.status === 'Closed').length, color: 'text-emerald-600' }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                  <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {capa.map(c => (
                <div key={c.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-xs font-bold text-slate-800">{c.id} — {c.issue}</h4>
                      <span className={`px-2 py-1 rounded-full text-[7px] font-bold ${c.status === 'Open' ? 'bg-amber-50 text-amber-700 border border-amber-200' : c.status === 'Under Investigation' ? 'bg-blue-50 text-blue-700 border border-blue-200' : c.status === 'Under Verification' ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>{c.status}</span>
                    </div>
                    <p className="text-[9px] text-slate-500">Indicator: {c.indicator}</p>
                    <p className="text-[9px] text-slate-500">Root Cause: {c.rootCause}</p>
                    <p className="text-[9px] text-slate-500">Owner: {c.owner} • Due: {c.dueDate}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => handleOpenCapaModal(c)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer"><Edit3 className="w-3 h-3" /></button>
                    <button onClick={() => handleDeleteCapa(c.id)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-rose-600 hover:border-rose-300 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'training' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800">Training Records</h3>
              <button onClick={() => handleOpenTrainingModal()} style={{ backgroundColor: hospital.themeColor }} className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2"><Plus className="w-3.5 h-3.5" /> Add Training</button>
            </div>
            <div className="space-y-3">
              {training.map(t => (
                <div key={t.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{t.topic}</h4>
                    <p className="text-[9px] text-slate-400">Trainer: {t.trainer} • Date: {t.date} • Participants: {t.participants}</p>
                    <p className="text-[9px] text-slate-400">Completion: {t.completionPct}% • Status: {t.status}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${t.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : t.status === 'In Progress' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}>{t.status}</span>
                    <button onClick={() => handleOpenTrainingModal(t)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer"><Edit3 className="w-3 h-3" /></button>
                    <button onClick={() => handleDeleteTraining(t.id)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-rose-600 hover:border-rose-300 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      {isQiModalOpen && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-5 w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800">{editingQiId ? 'Edit Quality Indicator' : 'Add Monthly Data'}</h3>
          <button onClick={() => { setIsQiModalOpen(false); setEditingQiId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
        </div>
        <form onSubmit={handleSaveQi} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
              <select value={qiForm.month} onChange={(e) => setQiForm({...qiForm, month: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => <option key={m} value={m}>{m}</option>)}
              </select></div>
            <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label><input type="number" value={qiForm.year} onChange={(e) => setQiForm({...qiForm, year: parseInt(e.target.value) || 2025})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Patient Safety</p>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Falls Reported" field="fallsReported" form={qiForm} setForm={setQiForm} />
              <FormField label="Discharge Count" field="dischargeCount" form={qiForm} setForm={setQiForm} />
              <FormField label="LAMA Count" field="lamaCount" form={qiForm} setForm={setQiForm} />
              <FormField label="Death Count" field="deathCount" form={qiForm} setForm={setQiForm} />
            </div>
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Medication Safety</p>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="ADR Count" field="adrCount" form={qiForm} setForm={setQiForm} />
              <FormField label="Medication Error Count" field="medErrorCount" form={qiForm} setForm={setQiForm} />
            </div>
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Initial Assessment</p>
            <div className="grid grid-cols-3 gap-3">
              <FormField label="Nurse Assessment (min)" field="totalNurseAssessmentMins" form={qiForm} setForm={setQiForm} />
              <FormField label="Doctor Assessment (min)" field="totalDoctorAssessmentMins" form={qiForm} setForm={setQiForm} />
              <FormField label="Total Patients" field="totalPatients" form={qiForm} setForm={setQiForm} />
            </div>
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Infection Control</p>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="CAUTI Cases" field="cautiCases" form={qiForm} setForm={setQiForm} />
              <FormField label="Catheter Days" field="catheterDays" form={qiForm} setForm={setQiForm} />
              <FormField label="BSI Cases" field="bsiCases" form={qiForm} setForm={setQiForm} />
              <FormField label="Central Line Days" field="centralLineDays" form={qiForm} setForm={setQiForm} />
            </div>
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Discharge</p>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Total Discharge Minutes" field="totalDischargeMins" form={qiForm} setForm={setQiForm} />
              <FormField label="Total Discharges" field="totalDischarges" form={qiForm} setForm={setQiForm} />
            </div>
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Patient Days</p>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Admissions" field="admissions" form={qiForm} setForm={setQiForm} />
              <FormField label="Transfers Out" field="transfersOut" form={qiForm} setForm={setQiForm} />
            </div>
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Blood Bank</p>
            <div className="grid grid-cols-4 gap-3">
              <FormField label="SDP Units" field="sdpUnits" form={qiForm} setForm={setQiForm} />
              <FormField label="PRBC Units" field="prbcUnits" form={qiForm} setForm={setQiForm} />
              <FormField label="RDP Units" field="rdpUnits" form={qiForm} setForm={setQiForm} />
              <FormField label="FFP Units" field="ffpUnits" form={qiForm} setForm={setQiForm} />
              <FormField label="PLSM Units" field="plsmUnits" form={qiForm} setForm={setQiForm} />
              <FormField label="CRYO Units" field="cryoUnits" form={qiForm} setForm={setQiForm} />
              <FormField label="Blood TAT (min)" field="bloodTatMins" form={qiForm} setForm={setQiForm} />
              <FormField label="Transfusion Reactions" field="transfusionReactions" form={qiForm} setForm={setQiForm} />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={() => { setIsQiModalOpen(false); setEditingQiId(null); }} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-[9px] font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
            <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="flex-1 px-3 py-2 rounded-lg text-white text-[9px] font-bold">{editingQiId ? 'Update' : 'Add Record'}</button>
          </div>
        </form>
      </div>
    </div>
  )}

  {isCapaModalOpen && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-5 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800">{editingCapaId ? 'Edit CAPA' : 'Add CAPA'}</h3>
          <button onClick={() => { setIsCapaModalOpen(false); setEditingCapaId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
        </div>
        <form onSubmit={handleSaveCapa} className="space-y-3">
          {!editingCapaId && (
            <div><label className="block text-[9px] font-medium text-slate-600 mb-1">CAPA ID</label><input type="text" value={capaForm.id || nextCapaId()} disabled className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 bg-slate-50" /></div>
          )}
          <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Indicator</label><input type="text" value={capaForm.indicator} onChange={(e) => setCapaForm({...capaForm, indicator: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
          <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Issue / Root Cause</label><input type="text" value={capaForm.rootCause} onChange={(e) => setCapaForm({...capaForm, rootCause: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
          <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Corrective Action</label><textarea value={capaForm.correctiveAction} onChange={(e) => setCapaForm({...capaForm, correctiveAction: e.target.value})} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"></textarea></div>
          <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Preventive Action</label><textarea value={capaForm.preventiveAction} onChange={(e) => setCapaForm({...capaForm, preventiveAction: e.target.value})} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"></textarea></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Owner</label><input type="text" value={capaForm.owner} onChange={(e) => setCapaForm({...capaForm, owner: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
            <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Due Date</label><input type="date" value={capaForm.dueDate} onChange={(e) => setCapaForm({...capaForm, dueDate: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
          </div>
          <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
            <select value={capaForm.status} onChange={(e) => setCapaForm({...capaForm, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
              <option value="Open">Open</option>
              <option value="Under Investigation">Under Investigation</option>
              <option value="Under Verification">Under Verification</option>
              <option value="Closed">Closed</option>
            </select></div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={() => { setIsCapaModalOpen(false); setEditingCapaId(null); }} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-[9px] font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
            <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="flex-1 px-3 py-2 rounded-lg text-white text-[9px] font-bold">{editingCapaId ? 'Update' : 'Add CAPA'}</button>
          </div>
        </form>
      </div>
    </div>
  )}

  {isAuditModalOpen && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-5 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800">{editingAuditId ? 'Edit Audit' : 'New Audit'}</h3>
          <button onClick={() => { setIsAuditModalOpen(false); setEditingAuditId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
        </div>
        <form onSubmit={handleSaveAudit} className="space-y-3">
          <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Name</label><input type="text" value={auditForm.title} onChange={(e) => setAuditForm({...auditForm, title: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Date</label><input type="date" value={auditForm.date} onChange={(e) => setAuditForm({...auditForm, date: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
            <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Auditor</label><input type="text" value={auditForm.auditor} onChange={(e) => setAuditForm({...auditForm, auditor: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Score (%)</label><input type="number" min="0" max="100" value={auditForm.score} onChange={(e) => setAuditForm({...auditForm, score: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
            <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
              <select value={auditForm.status} onChange={(e) => setAuditForm({...auditForm, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select></div>
          </div>
          <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Findings</label><textarea value={auditForm.findings} onChange={(e) => setAuditForm({...auditForm, findings: e.target.value})} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"></textarea></div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={() => { setIsAuditModalOpen(false); setEditingAuditId(null); }} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-[9px] font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
            <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="flex-1 px-3 py-2 rounded-lg text-white text-[9px] font-bold">{editingAuditId ? 'Update' : 'Create Audit'}</button>
          </div>
        </form>
      </div>
    </div>
  )}

  {isTrainingModalOpen && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-5 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800">{editingTrainingId ? 'Edit Training' : 'Add Training'}</h3>
          <button onClick={() => { setIsTrainingModalOpen(false); setEditingTrainingId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
        </div>
        <form onSubmit={handleSaveTraining} className="space-y-3">
          <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Training Topic</label><input type="text" value={trainingForm.topic} onChange={(e) => setTrainingForm({...trainingForm, topic: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
          <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Trainer</label><input type="text" value={trainingForm.trainer} onChange={(e) => setTrainingForm({...trainingForm, trainer: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Date</label><input type="date" value={trainingForm.date} onChange={(e) => setTrainingForm({...trainingForm, date: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
            <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Participants</label><input type="number" value={trainingForm.participants} onChange={(e) => setTrainingForm({...trainingForm, participants: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Completion %</label><input type="number" min="0" max="100" value={trainingForm.completionPct} onChange={(e) => setTrainingForm({...trainingForm, completionPct: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
            <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
              <select value={trainingForm.status} onChange={(e) => setTrainingForm({...trainingForm, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select></div>
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={() => { setIsTrainingModalOpen(false); setEditingTrainingId(null); }} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-[9px] font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
            <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="flex-1 px-3 py-2 rounded-lg text-white text-[9px] font-bold">{editingTrainingId ? 'Update' : 'Add Training'}</button>
          </div>
        </form>
      </div>
    </div>
  )}
   </div>
  );
};

export default FemaleWardWorkspace;


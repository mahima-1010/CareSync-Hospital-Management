import React, { useState, useEffect } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  ChevronLeft,
  LayoutDashboard,
  BarChart3,
  Droplets,
  ShieldCheck,
  ClipboardList,
  CheckSquare,
  FileText,
  Plus,
  Edit3,
  Trash2,
  X,
  Search,
  Download,
  Printer,
  FileDown,
  Flame
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LS_KEY_QUALITY = 'deluxeward_quality_indicators';
const LS_KEY_BLOOD      = 'deluxeward_blood_management';
const LS_KEY_INFECTION  = 'deluxeward_infection_control';
const LS_KEY_PATIENT_SAFETY = 'deluxeward_patient_safety';
const LS_KEY_INITIAL_ASSESSMENTS = 'deluxe_initial_assessments';
const LS_KEY_PRESSURE_INJURIES = 'deluxe_pressure_injuries';
const LS_KEY_INFECTION_PREVENTION = 'deluxe_infection_prevention';
const LS_KEY_PATIENT_SAFETY_REGISTER = 'deluxe_patient_safety';
const LS_KEY_FIRE_SAFETY = 'deluxe_fire_safety';

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const EMPTY_QUALITY_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  patientDays: 0,
  falls: 0,
  medicationErrors: 0,
  adverseDrugReactions: 0,
  cauti: 0,
  bloodstreamInfections: 0,
  dischargeTime: 0,       // avg minutes
  initialAssessmentTime: 0, // avg minutes
  status: 'Active',
};

const SAMPLE_QUALITY_INDICATORS = [
  { id: 'dwqi-001', month: 'January',  year: 2025, patientDays: 620, falls: 2, medicationErrors: 1, adverseDrugReactions: 0, cauti: 1, bloodstreamInfections: 0, dischargeTime: 38, initialAssessmentTime: 22, status: 'Active' },
  { id: 'dwqi-002', month: 'February', year: 2025, patientDays: 560, falls: 1, medicationErrors: 2, adverseDrugReactions: 1, cauti: 0, bloodstreamInfections: 0, dischargeTime: 42, initialAssessmentTime: 25, status: 'Active' },
  { id: 'dwqi-003', month: 'March',    year: 2025, patientDays: 640, falls: 3, medicationErrors: 0, adverseDrugReactions: 1, cauti: 1, bloodstreamInfections: 1, dischargeTime: 35, initialAssessmentTime: 20, status: 'Active' },
  { id: 'dwqi-004', month: 'April',    year: 2025, patientDays: 590, falls: 0, medicationErrors: 1, adverseDrugReactions: 0, cauti: 0, bloodstreamInfections: 0, dischargeTime: 40, initialAssessmentTime: 23, status: 'Active' },
  { id: 'dwqi-005', month: 'May',      year: 2025, patientDays: 670, falls: 2, medicationErrors: 3, adverseDrugReactions: 2, cauti: 0, bloodstreamInfections: 1, dischargeTime: 44, initialAssessmentTime: 27, status: 'Active' },
];

const EMPTY_BLOOD_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  prbc: 0,
  sdp: 0,
  rdp: 0,
  ffp: 0,
  cryo: 0,
  bloodWastage: 0,
  transfusionReactions: 0,
  turnaroundTime: 0,
  status: 'Active',
};

const SAMPLE_BLOOD_RECORDS = [
  { id: 'dwbl-001', month: 'January',  year: 2025, prbc: 12, sdp: 4, rdp: 2, ffp: 6, cryo: 1, bloodWastage: 1, transfusionReactions: 0, turnaroundTime: 45, status: 'Active' },
  { id: 'dwbl-002', month: 'February', year: 2025, prbc: 9,  sdp: 3, rdp: 1, ffp: 4, cryo: 0, bloodWastage: 0, transfusionReactions: 1, turnaroundTime: 50, status: 'Active' },
  { id: 'dwbl-003', month: 'March',    year: 2025, prbc: 15, sdp: 5, rdp: 3, ffp: 8, cryo: 2, bloodWastage: 2, transfusionReactions: 0, turnaroundTime: 42, status: 'Active' },
  { id: 'dwbl-004', month: 'April',    year: 2025, prbc: 10, sdp: 2, rdp: 0, ffp: 5, cryo: 0, bloodWastage: 0, transfusionReactions: 0, turnaroundTime: 38, status: 'Active' },
  { id: 'dwbl-005', month: 'May',      year: 2025, prbc: 18, sdp: 6, rdp: 4, ffp: 9, cryo: 3, bloodWastage: 1, transfusionReactions: 1, turnaroundTime: 55, status: 'Active' },
];

const EMPTY_INFECTION_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  patientDays: 0,
  cauti: 0,
  bloodstreamInfections: 0,
  ssi: 0,
  infectionRate: 0,
  status: 'Active',
};

const SAMPLE_INFECTION_RECORDS = [
  { id: 'dwic-001', month: 'January',  year: 2025, patientDays: 620, cauti: 1, bloodstreamInfections: 0, ssi: 0, infectionRate: 0.16, status: 'Active' },
  { id: 'dwic-002', month: 'February', year: 2025, patientDays: 560, cauti: 0, bloodstreamInfections: 1, ssi: 1, infectionRate: 0.36, status: 'Active' },
  { id: 'dwic-003', month: 'March',    year: 2025, patientDays: 640, cauti: 1, bloodstreamInfections: 1, ssi: 0, infectionRate: 0.31, status: 'Active' },
  { id: 'dwic-004', month: 'April',    year: 2025, patientDays: 590, cauti: 0, bloodstreamInfections: 0, ssi: 0, infectionRate: 0.00, status: 'Active' },
  { id: 'dwic-005', month: 'May',      year: 2025, patientDays: 670, cauti: 0, bloodstreamInfections: 1, ssi: 1, infectionRate: 0.30, status: 'Active' },
];

const EMPTY_PATIENT_SAFETY_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  falls: 0,
  medicationErrors: 0,
  adverseDrugReactions: 0,
  initialAssessmentTime: 0,
  dischargeTime: 0,
  status: 'Active',
};

const SAMPLE_PATIENT_SAFETY_RECORDS = [
  { id: 'dwps-001', month: 'January',  year: 2025, falls: 2, medicationErrors: 1, adverseDrugReactions: 0, initialAssessmentTime: 22, dischargeTime: 38, status: 'Active' },
  { id: 'dwps-002', month: 'February', year: 2025, falls: 1, medicationErrors: 2, adverseDrugReactions: 1, initialAssessmentTime: 25, dischargeTime: 42, status: 'Active' },
  { id: 'dwps-003', month: 'March',    year: 2025, falls: 3, medicationErrors: 0, adverseDrugReactions: 1, initialAssessmentTime: 20, dischargeTime: 35, status: 'Active' },
  { id: 'dwps-004', month: 'April',    year: 2025, falls: 0, medicationErrors: 1, adverseDrugReactions: 0, initialAssessmentTime: 23, dischargeTime: 40, status: 'Active' },
  { id: 'dwps-005', month: 'May',      year: 2025, falls: 2, medicationErrors: 3, adverseDrugReactions: 2, initialAssessmentTime: 27, dischargeTime: 44, status: 'Active' },
];

const EMPTY_ASSESSMENT_FORM = {
  id: '',
  assessmentId: '',
  uhId: '',
  patientName: '',
  assessmentDate: '2025-01-01',
  nurseAssessmentTime: '',
  doctorAssessmentTime: '',
  status: 'Pending',
  remarks: '',
};

const SAMPLE_INITIAL_ASSESSMENTS = [
  { id: 'dwa-001', assessmentId: 'DWA-2501', uhId: 'UH0001', patientName: 'Rahul Menon',     assessmentDate: '2025-01-05', nurseAssessmentTime: '08:30', doctorAssessmentTime: '10:15', status: 'Completed', remarks: 'Stable vitals' },
  { id: 'dwa-002', assessmentId: 'DWA-2502', uhId: 'UH0045', patientName: 'Sunita Iyer',     assessmentDate: '2025-01-08', nurseAssessmentTime: '09:10', doctorAssessmentTime: '11:00', status: 'Completed', remarks: 'Follow-up required' },
  { id: 'dwa-003', assessmentId: 'DWA-2503', uhId: 'UH0112', patientName: 'Ajay Kulkarni',   assessmentDate: '2025-02-02', nurseAssessmentTime: '07:45', doctorAssessmentTime: '09:30', status: 'Completed', remarks: 'Routine screening' },
  { id: 'dwa-004', assessmentId: 'DWA-2504', uhId: 'UH0188', patientName: 'Meera Deshmukh',  assessmentDate: '2025-02-14', nurseAssessmentTime: '10:00', doctorAssessmentTime: '12:00', status: 'Pending',   remarks: 'Awaiting doctor review' },
  { id: 'dwa-005', assessmentId: 'DWA-2505', uhId: 'UH0234', patientName: 'Karthik Rao',     assessmentDate: '2025-03-05', nurseAssessmentTime: '08:15', doctorAssessmentTime: '10:45', status: 'Completed', remarks: 'Discharge planned' },
];

const EMPTY_PRESSURE_INJURY_FORM = {
  id: '',
  recordId: '',
  uhId: '',
  patientName: '',
  riskLevel: 'Medium',
  stage: 'Stage 2',
  assessmentDate: '2025-01-01',
  preventiveMeasures: '',
  status: 'Active',
  remarks: '',
};

const SAMPLE_PRESSURE_INJURIES = [
  { id: 'dwpi-001', recordId: 'DWPI-2501', uhId: 'UH0001', patientName: 'Rahul Menon',    riskLevel: 'High',   stage: 'Stage 2', assessmentDate: '2025-01-06', preventiveMeasures: 'Alternating mattress, 2-hourly turns',         status: 'Active',   remarks: 'Improving' },
  { id: 'dwpi-002', recordId: 'DWPI-2502', uhId: 'UH0045', patientName: 'Sunita Iyer',    riskLevel: 'Medium', stage: 'Stage 1', assessmentDate: '2025-01-09', preventiveMeasures: 'Cream application, pressure relief cushion',      status: 'Active',   remarks: 'Monitoring' },
  { id: 'dwpi-003', recordId: 'DWPI-2503', uhId: 'UH0112', patientName: 'Ajay Kulkarni',  riskLevel: 'Low',    stage: 'Stage 1', assessmentDate: '2025-02-03', preventiveMeasures: 'Skin hygiene, repositioning every 3 hours',      status: 'Resolved', remarks: 'Healed' },
  { id: 'dwpi-004', recordId: 'DWPI-2504', uhId: 'UH0188', patientName: 'Meera Deshmukh', riskLevel: 'High',   stage: 'Stage 3', assessmentDate: '2025-02-15', preventiveMeasures: 'Air-fluidised bed, wound care dressing',          status: 'Active',   remarks: 'Wound care ongoing' },
  { id: 'dwpi-005', recordId: 'DWPI-2505', uhId: 'UH0234', patientName: 'Karthik Rao',    riskLevel: 'Medium', stage: 'Stage 2', assessmentDate: '2025-03-06', preventiveMeasures: 'Foam overlay, moisture barrier cream',           status: 'Active',   remarks: 'Re-evaluate in 1 week' },
];

const EMPTY_INFECTION_PREVENTION_FORM = {
  id: '',
  recordId: '',
  areaWard: '',
  auditDate: '2025-01-01',
  handHygieneCompliance: 0,
  ppeCompliance: 0,
  isolationPrecautions: '',
  environmentalCleaning: '',
  infectionControlStatus: 'Pending',
  remarks: '',
};

const SAMPLE_INFECTION_PREVENTION = [
  { id: 'dwip-001', recordId: 'DWIP-2501', areaWard: 'General Ward A', auditDate: '2025-01-10', handHygieneCompliance: 88, ppeCompliance: 92, isolationPrecautions: 'Standard', environmentalCleaning: 'Satisfactory', infectionControlStatus: 'Compliant', remarks: 'All staff trained' },
  { id: 'dwip-002', recordId: 'DWIP-2502', areaWard: 'ICU Bay 1',      auditDate: '2025-01-15', handHygieneCompliance: 95, ppeCompliance: 98, isolationPrecautions: 'Contact + Droplet', environmentalCleaning: 'Excellent', infectionControlStatus: 'Compliant', remarks: 'High compliance' },
  { id: 'dwip-003', recordId: 'DWIP-2503', areaWard: 'Emergency Dept', auditDate: '2025-02-05', handHygieneCompliance: 76, ppeCompliance: 81, isolationPrecautions: 'Droplet', environmentalCleaning: 'Needs improvement', infectionControlStatus: 'Non-Compliant', remarks: 'Remediation planned' },
  { id: 'dwip-004', recordId: 'DWIP-2504', areaWard: 'Surgical Ward',  auditDate: '2025-02-20', handHygieneCompliance: 91, ppeCompliance: 94, isolationPrecautions: 'Standard', environmentalCleaning: 'Satisfactory', infectionControlStatus: 'Compliant', remarks: 'Routine audit' },
  { id: 'dwip-005', recordId: 'DWIP-2505', areaWard: 'Male Ward',      auditDate: '2025-03-08', handHygieneCompliance: 84, ppeCompliance: 87, isolationPrecautions: 'Airborne', environmentalCleaning: 'Satisfactory', infectionControlStatus: 'Compliant', remarks: 'Follow-up due' },
];

const EMPTY_PATIENT_SAFETY_REGISTER_FORM = {
  id: '',
  recordId: '',
  uhId: '',
  patientName: '',
  fallRisk: 'Medium',
  medicationSafety: 'Verified',
  patientIdentification: 'Verified',
  safeSurgeryChecklist: 'Not Applicable',
  incidentReported: 'No',
  status: 'Active',
  remarks: '',
};

const SAMPLE_PATIENT_SAFETY_REGISTER = [
  { id: 'dwpsr-001', recordId: 'DWPSR-2501', uhId: 'UH0001', patientName: 'Rahul Menon',    fallRisk: 'Low',      medicationSafety: 'Verified',      patientIdentification: 'Verified', safeSurgeryChecklist: 'Not Applicable', incidentReported: 'No',  status: 'Active',   remarks: 'Routine check' },
  { id: 'dwpsr-002', recordId: 'DWPSR-2502', uhId: 'UH0045', patientName: 'Sunita Iyer',    fallRisk: 'High',     medicationSafety: 'Double checked', patientIdentification: 'Verified', safeSurgeryChecklist: 'Completed',    incidentReported: 'No',  status: 'Active',   remarks: 'High fall-risk protocol applied' },
  { id: 'dwpsr-003', recordId: 'DWPSR-2503', uhId: 'UH0112', patientName: 'Ajay Kulkarni',  fallRisk: 'Medium',   medicationSafety: 'Verified',      patientIdentification: 'Verified', safeSurgeryChecklist: 'Not Applicable', incidentReported: 'No',  status: 'Active',   remarks: 'Observation noted' },
  { id: 'dwpsr-004', recordId: 'DWPSR-2504', uhId: 'UH0188', patientName: 'Meera Deshmukh', fallRisk: 'High',     medicationSafety: 'Pending',       patientIdentification: 'Flagged',    safeSurgeryChecklist: 'Completed',    incidentReported: 'Yes', status: 'Under Review', remarks: 'Incident reported for review' },
  { id: 'dwpsr-005', recordId: 'DWPSR-2505', uhId: 'UH0234', patientName: 'Karthik Rao',    fallRisk: 'Low',      medicationSafety: 'Verified',      patientIdentification: 'Verified', safeSurgeryChecklist: 'Completed',    incidentReported: 'No',  status: 'Active',   remarks: 'Discharged safely' },
];

const EMPTY_FIRE_SAFETY_FORM = {
  id: '',
  recordId: '',
  area: '',
  fireSafetyEquipmentChecked: 'Yes',
  emergencyExitStatus: 'Clear',
  ppeAvailability: 'Available',
  hazardIdentified: 'No',
  correctiveAction: '',
  status: 'Active',
  inspectionDate: '2025-01-01',
  remarks: '',
};

const SAMPLE_FIRE_SAFETY = [
  { id: 'dwfs-001', recordId: 'DWFS-2501', area: 'General Ward A', fireSafetyEquipmentChecked: 'Yes', emergencyExitStatus: 'Clear', ppeAvailability: 'Available', hazardIdentified: 'No',  correctiveAction: '', status: 'Active',   inspectionDate: '2025-01-11', remarks: 'All equipment functional' },
  { id: 'dwfs-002', recordId: 'DWFS-2502', area: 'ICU Bay 1',      fireSafetyEquipmentChecked: 'Yes', emergencyExitStatus: 'Clear', ppeAvailability: 'Available', hazardIdentified: 'No',  correctiveAction: '', status: 'Active',   inspectionDate: '2025-01-16', remarks: 'Extinguishers checked' },
  { id: 'dwfs-003', recordId: 'DWFS-2503', area: 'Emergency Dept', fireSafetyEquipmentChecked: 'No',  emergencyExitStatus: 'Blocked', ppeAvailability: 'Partial', hazardIdentified: 'Yes', correctiveAction: 'Clear exit route immediately', status: 'Non-Compliant', inspectionDate: '2025-02-06', remarks: 'Follow-up required' },
  { id: 'dwfs-004', recordId: 'DWFS-2504', area: 'Surgical Ward',  fireSafetyEquipmentChecked: 'Yes', emergencyExitStatus: 'Clear', ppeAvailability: 'Available', hazardIdentified: 'No',  correctiveAction: '', status: 'Active',   inspectionDate: '2025-02-21', remarks: 'Routine inspection passed' },
  { id: 'dwfs-005', recordId: 'DWFS-2505', area: 'Male Ward',      fireSafetyEquipmentChecked: 'Yes', emergencyExitStatus: 'Clear', ppeAvailability: 'Available', hazardIdentified: 'No',  correctiveAction: '', status: 'Active',   inspectionDate: '2025-03-09', remarks: 'Re-inspection due next month' },
];

const TABS = [
  { id: 'dashboard',      label: 'Dashboard',          icon: LayoutDashboard },
  { id: 'quality',        label: 'Quality Indicators', icon: BarChart3       },
  { id: 'patient_care',   label: 'Patient Care & Blood Management', icon: Droplets    },
  { id: 'infection',      label: 'Infection Prevention & Safety',  icon: ShieldCheck     },
  { id: 'clinical',       label: 'Clinical Monitoring', icon: ClipboardList  },
  { id: 'audit',          label: 'Internal Audit',      icon: CheckSquare    },
  { id: 'reports',        label: 'Reports & Analytics', icon: FileText       },
];

/* ─── Reusable number field ─── */
const NumField = ({ label, field, form, setForm }) => (
  <div>
    <label className="block text-[9px] font-medium text-slate-600 mb-1">{label}</label>
    <input
      type="number" min="0"
      value={form[field]}
      onChange={(e) => setForm({ ...form, [field]: parseInt(e.target.value) || 0 })}
      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
    />
  </div>
);

/* ─── Placeholder section ─── */
const PlaceholderSection = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[320px] bg-white border border-slate-200 rounded-2xl shadow-sm p-10 text-center">
    <span className="text-3xl mb-4">🚧</span>
    <h2 className="text-base font-extrabold text-slate-800 mb-2">{title}</h2>
    <p className="text-xs text-slate-400 font-medium">
      This section will be implemented in the next phase.
    </p>
  </div>
);

/* ─── Dashboard tab ─── */
const DashboardTab = ({ hospital }) => (
  <div className="space-y-5">
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Deluxe Ward Workspace</span>
      <h1 className="text-xl font-extrabold text-slate-900 mt-1">Deluxe Ward — Clinical Quality &amp; Safety</h1>
      <p className="text-xs text-slate-500 mt-2 max-w-2xl leading-relaxed">
        Centralised workspace for monitoring male ward clinical quality indicators, blood
        management, infection control, and patient safety metrics in alignment with NABH accreditation standards.
      </p>
    </div>
    <div>
      <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">Key Performance Indicators</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {['Bed Occupancy', 'Falls Rate', 'HAI Rate', 'LAMA Rate'].map((label) => (
          <div key={label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
            <div className="h-7 w-20 rounded-lg bg-slate-100 animate-pulse" />
            <div className="h-3 w-12 rounded bg-slate-100 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
    <div>
      <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">Analytics &amp; Trends</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {['Monthly Admission Trend', 'Infection Control Overview'].map((title) => (
          <div key={title} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-bold text-slate-500">{title}</span>
            <div className="mt-3 h-36 rounded-xl bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center">
              <span className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider">Chart — coming next phase</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── Quality Indicators tab ─── */
const QualityTab = ({
  hospital,
  qualityIndicators,
  searchQuery,
  setSearchQuery,
  handleOpenQualityModal,
  handleDeleteQuality,
}) => {
  const filtered = qualityIndicators.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.month.toLowerCase().includes(q) ||
      String(r.year).includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  /* KPI summary from all records */
  const totalFalls   = qualityIndicators.reduce((s, r) => s + (r.falls || 0), 0);
  const totalMedErr  = qualityIndicators.reduce((s, r) => s + (r.medicationErrors || 0), 0);
  const totalCAUTI   = qualityIndicators.reduce((s, r) => s + (r.cauti || 0), 0);
  const totalBSI     = qualityIndicators.reduce((s, r) => s + (r.bloodstreamInfections || 0), 0);

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Quality Indicator Data Collection</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Monthly clinical quality metrics — Deluxe Ward</p>
        </div>
        <button
          onClick={() => handleOpenQualityModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Monthly Data
        </button>
      </div>

      {/* KPI summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Falls',        value: totalFalls,  color: 'text-rose-600'   },
          { label: 'Medication Errors',  value: totalMedErr, color: 'text-amber-600'  },
          { label: 'CAUTI Cases',        value: totalCAUTI,  color: 'text-orange-600' },
          { label: 'BSI Cases',          value: totalBSI,    color: 'text-purple-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by month, year, or status…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {[
                  'Month / Year', 'Patient Days', 'Falls', 'Med Errors',
                  'ADR', 'CAUTI', 'BSI', 'Discharge (min)',
                  'Assessment (min)', 'Status', 'Actions',
                ].map((h) => (
                  <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-3 py-3 font-semibold text-slate-700 whitespace-nowrap">{r.month} {r.year}</td>
                  <td className="px-3 py-3 text-slate-600">{r.patientDays}</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.falls}</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.medicationErrors}</td>
                  <td className="px-3 py-3 text-red-600 font-bold">{r.adverseDrugReactions}</td>
                  <td className="px-3 py-3 text-orange-600 font-bold">{r.cauti}</td>
                  <td className="px-3 py-3 text-purple-600 font-bold">{r.bloodstreamInfections}</td>
                  <td className="px-3 py-3 text-slate-600">{r.dischargeTime}</td>
                  <td className="px-3 py-3 text-slate-600">{r.initialAssessmentTime}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Active}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenQualityModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuality(r.id)}
                        className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={11} className="px-3 py-10 text-center text-[10px] text-slate-400">
                    {searchQuery ? 'No records match your search.' : 'No records yet. Click "Add Monthly Data" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {qualityIndicators.length} record{qualityIndicators.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─── Initial Assessment Register tab ─── */
const InitialAssessmentTab = ({
  hospital,
  assessments,
  searchQuery,
  setSearchQuery,
  handleOpenAssessmentModal,
  handleDeleteAssessment,
}) => {
  const filtered = assessments.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.assessmentId.toLowerCase().includes(q) ||
      r.uhId.toLowerCase().includes(q) ||
      r.patientName.toLowerCase().includes(q) ||
      String(r.nurseAssessmentTime).includes(q) ||
      String(r.doctorAssessmentTime).includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalAssessments = assessments.length;
  const completed = assessments.filter((r) => r.status === 'Completed').length;
  const completionPct = totalAssessments > 0 ? ((completed / totalAssessments) * 100).toFixed(1) : '0.0';

  const STATUS_BADGE = {
    Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending:   'bg-amber-50 text-amber-700 border-amber-200',
    Incomplete:'bg-rose-50 text-rose-700 border-rose-200',
  };

  const TH_COLS = [
    'Assessment ID', 'UHID', 'Patient Name', 'Assessment Date',
    'Nurse Time (min)', 'Doctor Time (min)', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Initial Assessment Register</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Nurse &amp; Doctor assessment tracking — Deluxe Ward</p>
        </div>
        <button
          onClick={() => handleOpenAssessmentModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Assessment
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Assessments',   value: totalAssessments, color: 'text-blue-600'    },
          { label: 'Completed',            value: completed,        color: 'text-emerald-600' },
          { label: 'Completion %',         value: `${completionPct}%`, color: 'text-indigo-600' },
          { label: 'Remaining',            value: totalAssessments - completed, color: 'text-amber-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by ID, UHID, name, time, or status…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {TH_COLS.map((h) => (
                  <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.assessmentId}</td>
                  <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhId}</td>
                  <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                  <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{r.assessmentDate}</td>
                  <td className="px-3 py-3 text-slate-600">{r.nurseAssessmentTime}</td>
                  <td className="px-3 py-3 text-slate-600">{r.doctorAssessmentTime}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Pending}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenAssessmentModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteAssessment(r.id)}
                        className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">
                    {searchQuery ? 'No records match your search.' : 'No assessment records yet. Click "Add Assessment" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {assessments.length} record{assessments.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─── Pressure Injury / Bed Sore Monitoring tab ─── */
const PressureInjuryTab = ({
  hospital,
  injuries,
  searchQuery,
  setSearchQuery,
  handleOpenInjuryModal,
  handleDeleteInjury,
}) => {
  const filtered = injuries.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.recordId.toLowerCase().includes(q) ||
      r.uhId.toLowerCase().includes(q) ||
      r.patientName.toLowerCase().includes(q) ||
      r.riskLevel.toLowerCase().includes(q) ||
      r.stage.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalInjuries = injuries.length;
  const activeInjuries = injuries.filter((r) => r.status === 'Active').length;
  const resolvedInjuries = injuries.filter((r) => r.status === 'Resolved').length;
  const preventionCompliance = totalInjuries > 0 ? ((resolvedInjuries / totalInjuries) * 100).toFixed(1) : '0.0';

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Resolved: 'bg-sky-50 text-sky-700 border-sky-200',
    UnderReview: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'UHID', 'Patient Name', 'Risk Level', 'Stage',
    'Assessment Date', 'Preventive Measures', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Pressure Injury / Bed Sore Monitoring</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Braden risk assessment &amp; wound tracking — Deluxe Ward</p>
        </div>
        <button
          onClick={() => handleOpenInjuryModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Injury Cases',   value: totalInjuries,      color: 'text-rose-600'   },
          { label: 'Active Cases',          value: activeInjuries,     color: 'text-orange-600' },
          { label: 'Resolved Cases',        value: resolvedInjuries,   color: 'text-emerald-600' },
          { label: 'Prevention Compliance', value: `${preventionCompliance}%`, color: 'text-indigo-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by ID, UHID, name, risk, stage, or status…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {TH_COLS.map((h) => (
                  <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.recordId}</td>
                  <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhId}</td>
                  <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${
                      r.riskLevel === 'High'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : r.riskLevel === 'Medium'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {r.riskLevel}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-600">{r.stage}</td>
                  <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{r.assessmentDate}</td>
                  <td className="px-3 py-3 text-slate-600">{r.preventiveMeasures}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Active}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenInjuryModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteInjury(r.id)}
                        className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">
                    {searchQuery ? 'No records match your search.' : 'No pressure injury records yet. Click "Add Record" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {injuries.length} record{injuries.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─── Patient Care Dashboard tab ─── */
const PatientCareDashboard = ({ hospital, assessments, injuries, bloodRecords, bloodSearch, setBloodSearch, handleOpenBloodModal, handleDeleteBlood, assessmentSearch, setAssessmentSearch, handleOpenAssessmentModal, handleDeleteAssessment, injurySearch, setInjurySearch, handleOpenInjuryModal, handleDeleteInjury }) => {
  const totalAssessments = assessments.length;
  const completedAssessments = assessments.filter((r) => r.status === 'Completed').length;
  const completionPct = totalAssessments > 0 ? ((completedAssessments / totalAssessments) * 100).toFixed(1) : '0.0';

  const totalBlood = bloodRecords.length;
  const bloodReactions = bloodRecords.reduce((s, r) => s + (r.transfusionReactions || 0), 0);

  const totalInjuries = injuries.length;
  const resolvedInjuries = injuries.filter((r) => r.status === 'Resolved').length;
  const preventionCompliance = totalInjuries > 0 ? ((resolvedInjuries / totalInjuries) * 100).toFixed(1) : '0.0';

  const overallCompliance = totalAssessments > 0 || totalInjuries > 0
    ? (((completedAssessments / (totalAssessments || 1)) + (resolvedInjuries / (totalInjuries || 1))) / 2 * 100).toFixed(1)
    : '0.0';

  const [subTab, setSubTab] = useState('dashboard');

  const SUB_TABS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'blood',     label: 'Blood Mgmt', icon: Droplets },
    { id: 'assessment', label: 'Assessments', icon: ClipboardList },
    { id: 'injury',    label: 'Pressure Injury', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-5">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Patient Care &amp; Blood Management</span>
        <h1 className="text-xl font-extrabold text-slate-900 mt-1">Deluxe Ward — Patient Care Overview</h1>
        <p className="text-xs text-slate-500 mt-2 max-w-3xl leading-relaxed">
          Unified view of initial assessments, blood product utilisation, and pressure injury prevention.
        </p>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 w-fit">
        {SUB_TABS.map(({ id, label, icon: Icon }) => {
          const isActive = id === subTab;
          return (
            <button
              key={id}
              onClick={() => setSubTab(id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          );
        })}
      </div>

      {subTab === 'dashboard' && (
        <div className="space-y-5">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { label: 'Total Assessments',          value: totalAssessments,       color: 'text-blue-600'    },
              { label: 'Assessments Completed',      value: completedAssessments,   color: 'text-emerald-600' },
              { label: 'Assessment Completion %',    value: `${completionPct}%`,    color: 'text-indigo-600'  },
              { label: 'Blood Transfusions',         value: totalBlood,             color: 'text-rose-600'    },
              { label: 'Blood Reactions',            value: bloodReactions,         color: 'text-orange-600'  },
              { label: 'Pressure Injury Cases',      value: totalInjuries,          color: 'text-purple-600'  },
              { label: 'Prevention Compliance %',    value: `${preventionCompliance}%`, color: 'text-teal-600' },
              { label: 'Overall Patient Care Compliance %', value: `${overallCompliance}%`, color: 'text-amber-600' },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{kpi.label}</span>
                <p className={`text-2xl font-extrabold ${kpi.color}`}>{kpi.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h4 className="text-[10px] font-bold text-slate-600 mb-2">Assessments Summary</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                {completedAssessments} of {totalAssessments} assessments completed this period.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h4 className="text-[10px] font-bold text-slate-600 mb-2">Blood Safety</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                {bloodReactions} transfusion reaction{bloodReactions !== 1 ? 's' : ''} recorded across {totalBlood} record{totalBlood !== 1 ? 's' : ''}.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h4 className="text-[10px] font-bold text-slate-600 mb-2">Pressure Injury Prevention</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                {resolvedInjuries} of {totalInjuries} cases resolved. Prevention compliance is {preventionCompliance}%.
              </p>
            </div>
          </div>
        </div>
      )}

      {subTab === 'blood' && (
        <BloodTab
          hospital={hospital}
          bloodRecords={bloodRecords}
          bloodSearch={bloodSearch}
          setBloodSearch={setBloodSearch}
          handleOpenBloodModal={handleOpenBloodModal}
          handleDeleteBlood={handleDeleteBlood}
        />
      )}

      {subTab === 'assessment' && (
        <InitialAssessmentTab
          hospital={hospital}
          assessments={assessments}
          searchQuery={assessmentSearch}
          setSearchQuery={setAssessmentSearch}
          handleOpenAssessmentModal={handleOpenAssessmentModal}
          handleDeleteAssessment={handleDeleteAssessment}
        />
      )}

      {subTab === 'injury' && (
        <PressureInjuryTab
          hospital={hospital}
          injuries={injuries}
          searchQuery={injurySearch}
          setSearchQuery={setInjurySearch}
          handleOpenInjuryModal={handleOpenInjuryModal}
          handleDeleteInjury={handleDeleteInjury}
        />
      )}
    </div>
  );
};

/* ─── Reports & Analytics tab ─── */
const PatientSafetyTab = ({
  hospital,
  patientSafetyRecords,
  patientSafetySearch,
  setPatientSafetySearch,
  handleOpenPatientSafetyModal,
  handleDeletePatientSafety,
}) => {
  const filtered = patientSafetyRecords.filter((r) => {
    const q = patientSafetySearch.toLowerCase();
    return (
      r.month.toLowerCase().includes(q) ||
      String(r.year).includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalFalls = patientSafetyRecords.reduce((s, r) => s + (r.falls || 0), 0);
  const totalMedErrs = patientSafetyRecords.reduce((s, r) => s + (r.medicationErrors || 0), 0);
  const totalADR = patientSafetyRecords.reduce((s, r) => s + (r.adverseDrugReactions || 0), 0);
  const totalEvents = totalFalls + totalMedErrs + totalADR;

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Event ID', 'Month', 'Falls', 'Medication Errors', 'ADR',
    'Initial Assessment (min)', 'Discharge Time (min)', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Patient Safety Records</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Monthly safety incidents — Deluxe Ward</p>
        </div>
        <button
          onClick={() => handleOpenPatientSafetyModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Patient Safety Record
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Safety Events',  value: totalEvents,  color: 'text-rose-600'   },
          { label: 'Falls',                value: totalFalls,   color: 'text-orange-600' },
          { label: 'Medication Errors',    value: totalMedErrs, color: 'text-amber-600'  },
          { label: 'ADR Cases',            value: totalADR,     color: 'text-purple-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by month, year, or status…"
          value={patientSafetySearch}
          onChange={(e) => setPatientSafetySearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {TH_COLS.map((h) => (
                  <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                  <td className="px-3 py-3 font-semibold text-slate-700 whitespace-nowrap">{r.month} {r.year}</td>
                  <td className="px-3 py-3 text-orange-600 font-bold">{r.falls}</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.medicationErrors}</td>
                  <td className="px-3 py-3 text-purple-600 font-bold">{r.adverseDrugReactions}</td>
                  <td className="px-3 py-3 text-slate-600">{r.initialAssessmentTime}</td>
                  <td className="px-3 py-3 text-slate-600">{r.dischargeTime}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Active}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenPatientSafetyModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeletePatientSafety(r.id)}
                        className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">
                    {patientSafetySearch ? 'No records match your search.' : 'No safety records yet. Click "Add Patient Safety Record" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {patientSafetyRecords.length} record{patientSafetyRecords.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─── Reports & Analytics tab ─── */
const ReportsTab = ({
  hospital,
  qualityIndicators,
  bloodRecords,
  infectionRecords,
  patientSafetyRecords,
}) => {
  // Aggregate KPIs
  const totalQuality = qualityIndicators.length;
  const totalBlood = bloodRecords.length;
  const totalInfection = infectionRecords.length;
  const totalSafety = patientSafetyRecords.length;

  const totalFalls = patientSafetyRecords.reduce((sum, r) => sum + (r.falls || 0), 0) + qualityIndicators.reduce((sum, r) => sum + (r.falls || 0), 0);
  const totalMedErrs = patientSafetyRecords.reduce((sum, r) => sum + (r.medicationErrors || 0), 0) + qualityIndicators.reduce((sum, r) => sum + (r.medicationErrors || 0), 0);
  const totalCauti = infectionRecords.reduce((sum, r) => sum + (r.cauti || 0), 0) + qualityIndicators.reduce((sum, r) => sum + (r.cauti || 0), 0);
  
  const totalBloodUnits = bloodRecords.reduce((sum, r) => sum + (r.prbc || 0) + (r.sdp || 0) + (r.rdp || 0) + (r.ffp || 0) + (r.cryo || 0), 0);
  const totalBloodWastage = bloodRecords.reduce((sum, r) => sum + (r.bloodWastage || 0), 0);
  const wastagePercent = totalBloodUnits > 0 ? ((totalBloodWastage / totalBloodUnits) * 100).toFixed(1) : '0.0';

  // Align data by month
  const monthlyData = MONTHS.map((month) => {
    const q = qualityIndicators.find(r => r.month === month) || {};
    const b = bloodRecords.find(r => r.month === month) || {};
    const i = infectionRecords.find(r => r.month === month) || {};
    const p = patientSafetyRecords.find(r => r.month === month) || {};

    const falls = (q.falls || 0) + (p.falls || 0);
    const medErrs = (q.medicationErrors || 0) + (p.medicationErrors || 0);
    const cauti = (q.cauti || 0) + (i.cauti || 0);
    const bsi = (q.bloodstreamInfections || 0) + (i.bloodstreamInfections || 0);
    const bloodUnits = (b.prbc || 0) + (b.sdp || 0) + (b.rdp || 0) + (b.ffp || 0) + (b.cryo || 0);
    const bloodWastage = b.bloodWastage || 0;

    return {
      month,
      falls,
      medErrs,
      cauti,
      bsi,
      bloodUnits,
      bloodWastage,
      status: q.status || b.status || i.status || p.status || 'Inactive'
    };
  }).filter(d => d.falls > 0 || d.medErrs > 0 || d.cauti > 0 || d.bsi > 0 || d.bloodUnits > 0 || d.bloodWastage > 0);

  const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const infectionPie = [
    { name: 'CAUTI', value: totalCauti },
    { name: 'BSI', value: infectionRecords.reduce((sum, r) => sum + (r.bloodstreamInfections || 0), 0) + qualityIndicators.reduce((sum, r) => sum + (r.bloodstreamInfections || 0), 0) },
    { name: 'SSI', value: infectionRecords.reduce((sum, r) => sum + (r.ssi || 0), 0) }
  ].filter(d => d.value > 0);

  const bloodPie = [
    { name: 'PRBC', value: bloodRecords.reduce((sum, r) => sum + (r.prbc || 0), 0) },
    { name: 'SDP', value: bloodRecords.reduce((sum, r) => sum + (r.sdp || 0), 0) },
    { name: 'RDP', value: bloodRecords.reduce((sum, r) => sum + (r.rdp || 0), 0) },
    { name: 'FFP', value: bloodRecords.reduce((sum, r) => sum + (r.ffp || 0), 0) },
    { name: 'CRYO', value: bloodRecords.reduce((sum, r) => sum + (r.cryo || 0), 0) },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Reports &amp; Analytics</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Comprehensive overview of Deluxe Ward performance</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 hover:border-slate-300 text-[9px] font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer">
            <FileDown className="w-3.5 h-3.5" /> Export CSV
          </button>
          <button className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 hover:border-slate-300 text-[9px] font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer">
            <Download className="w-3.5 h-3.5" /> Export PDF
          </button>
          <button
            style={{ backgroundColor: hospital.themeColor }}
            className="px-3 py-1.5 rounded-xl text-white text-[9px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" /> Print Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Quality Records', value: totalQuality, color: 'text-blue-600' },
          { label: 'Total Blood Records', value: totalBlood, color: 'text-rose-600' },
          { label: 'Total Infection Records', value: totalInfection, color: 'text-emerald-600' },
          { label: 'Total Safety Records', value: totalSafety, color: 'text-purple-600' },
          { label: 'Total Falls', value: totalFalls, color: 'text-orange-600' },
          { label: 'Total Medication Errors', value: totalMedErrs, color: 'text-amber-600' },
          { label: 'Total CAUTI Cases', value: totalCauti, color: 'text-red-600' },
          { label: 'Blood Wastage', value: `${wastagePercent}%`, color: 'text-indigo-600' },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly Falls Trend */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-600 mb-4">Monthly Falls Trend</h4>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="falls" name="Falls" stroke="#f97316" strokeWidth={3} dot={{ r: 4, fill: '#f97316', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Medication Errors Trend */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-600 mb-4">Medication Errors</h4>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="medErrs" name="Med Errors" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Infection Distribution */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-600 mb-4">Infection Distribution</h4>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={infectionPie} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value">
                  {infectionPie.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '9px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Blood Products Distribution */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-600 mb-4">Blood Products Distribution</h4>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={bloodPie} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value">
                  {bloodPie.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '9px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Patient Safety Events Summary */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm lg:col-span-2">
          <h4 className="text-[10px] font-bold text-slate-600 mb-4">Monthly Quality Summary</h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '9px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="falls" name="Falls" stroke="#f97316" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="medErrs" name="Med Errors" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="cauti" name="CAUTI" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="bsi" name="BSI" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly Summary Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Monthly Summary</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-white border-b border-slate-200">
              <tr>
                {['Month', 'Falls', 'Med Errors', 'CAUTI', 'Bloodstream Inf', 'Blood Units', 'Blood Wastage', 'Status'].map(h => (
                  <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {monthlyData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-3 py-3 font-semibold text-slate-700">{row.month}</td>
                  <td className="px-3 py-3 font-bold text-orange-600">{row.falls}</td>
                  <td className="px-3 py-3 font-bold text-amber-600">{row.medErrs}</td>
                  <td className="px-3 py-3 font-bold text-red-600">{row.cauti}</td>
                  <td className="px-3 py-3 font-bold text-purple-600">{row.bsi}</td>
                  <td className="px-3 py-3 text-slate-600">{row.bloodUnits}</td>
                  <td className="px-3 py-3 text-slate-600">{row.bloodWastage}</td>
                  <td className="px-3 py-3">
                    <span className="px-2 py-0.5 rounded-full text-[8px] font-bold border bg-emerald-50 text-emerald-700 border-emerald-200">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
              {monthlyData.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-3 py-10 text-center text-[10px] text-slate-400">
                    No data available for reports.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ─── Main component ─── */
const DeluxeWardWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();
  const [activeTab, setActiveTab] = useState('dashboard');

  /* ── Quality Indicators state ── */
  const [qualityIndicators, setQualityIndicators] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_QUALITY);
    return saved ? JSON.parse(saved) : SAMPLE_QUALITY_INDICATORS;
  });
  const [isQualityModalOpen, setIsQualityModalOpen] = useState(false);
  const [editingQualityId, setEditingQualityId] = useState(null);
  const [qualityForm, setQualityForm] = useState({ ...EMPTY_QUALITY_FORM });
  const [qualitySearch, setQualitySearch] = useState('');

  /* ── Blood Management state ── */
  const [bloodRecords, setBloodRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_BLOOD);
    return saved ? JSON.parse(saved) : SAMPLE_BLOOD_RECORDS;
  });
  const [isBloodModalOpen, setIsBloodModalOpen] = useState(false);
  const [editingBloodId, setEditingBloodId] = useState(null);
  const [bloodForm, setBloodForm] = useState({ ...EMPTY_BLOOD_FORM });
  const [bloodSearch, setBloodSearch] = useState('');

  /* ── Infection Control state ── */
  const [infectionRecords, setInfectionRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_INFECTION);
    return saved ? JSON.parse(saved) : SAMPLE_INFECTION_RECORDS;
  });
  const [isInfectionModalOpen, setIsInfectionModalOpen] = useState(false);
  const [editingInfectionId, setEditingInfectionId] = useState(null);
  const [infectionForm, setInfectionForm] = useState({ ...EMPTY_INFECTION_FORM });
  const [infectionSearch, setInfectionSearch] = useState('');

  /* ── Patient Safety state ── */
  const [patientSafetyRecords, setPatientSafetyRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_PATIENT_SAFETY);
    return saved ? JSON.parse(saved) : SAMPLE_PATIENT_SAFETY_RECORDS;
  });
  const [isPatientSafetyModalOpen, setIsPatientSafetyModalOpen] = useState(false);
  const [editingPatientSafetyId, setEditingPatientSafetyId] = useState(null);
  const [patientSafetyForm, setPatientSafetyForm] = useState({ ...EMPTY_PATIENT_SAFETY_FORM });
  const [patientSafetySearch, setPatientSafetySearch] = useState('');

  /* ── Initial Assessments state ── */
  const [assessments, setAssessments] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_INITIAL_ASSESSMENTS);
    return saved ? JSON.parse(saved) : SAMPLE_INITIAL_ASSESSMENTS;
  });
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [editingAssessmentId, setEditingAssessmentId] = useState(null);
  const [assessmentForm, setAssessmentForm] = useState({ ...EMPTY_ASSESSMENT_FORM });
  const [assessmentSearch, setAssessmentSearch] = useState('');

  /* ── Pressure Injuries state ── */
  const [injuries, setInjuries] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_PRESSURE_INJURIES);
    return saved ? JSON.parse(saved) : SAMPLE_PRESSURE_INJURIES;
  });
  const [isInjuryModalOpen, setIsInjuryModalOpen] = useState(false);
  const [editingInjuryId, setEditingInjuryId] = useState(null);
  const [injuryForm, setInjuryForm] = useState({ ...EMPTY_PRESSURE_INJURY_FORM });
  const [injurySearch, setInjurySearch] = useState('');

  /* ── Infection Prevention state ── */
  const [preventionRecords, setPreventionRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_INFECTION_PREVENTION);
    return saved ? JSON.parse(saved) : SAMPLE_INFECTION_PREVENTION;
  });
  const [isPreventionModalOpen, setIsPreventionModalOpen] = useState(false);
  const [editingPreventionId, setEditingPreventionId] = useState(null);
  const [preventionForm, setPreventionForm] = useState({ ...EMPTY_INFECTION_PREVENTION_FORM });
  const [preventionSearch, setPreventionSearch] = useState('');

  /* ── Patient Safety Register state ── */
  const [safetyRegisterRecords, setSafetyRegisterRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_PATIENT_SAFETY_REGISTER);
    return saved ? JSON.parse(saved) : SAMPLE_PATIENT_SAFETY_REGISTER;
  });
  const [isSafetyRegisterModalOpen, setIsSafetyRegisterModalOpen] = useState(false);
  const [editingSafetyRegisterId, setEditingSafetyRegisterId] = useState(null);
  const [safetyRegisterForm, setSafetyRegisterForm] = useState({ ...EMPTY_PATIENT_SAFETY_REGISTER_FORM });
  const [safetyRegisterSearch, setSafetyRegisterSearch] = useState('');

  /* ── Fire Safety state ── */
  const [fireSafetyRecords, setFireSafetyRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_FIRE_SAFETY);
    return saved ? JSON.parse(saved) : SAMPLE_FIRE_SAFETY;
  });
  const [isFireSafetyModalOpen, setIsFireSafetyModalOpen] = useState(false);
  const [editingFireSafetyId, setEditingFireSafetyId] = useState(null);
  const [fireSafetyForm, setFireSafetyForm] = useState({ ...EMPTY_FIRE_SAFETY_FORM });
  const [fireSafetySearch, setFireSafetySearch] = useState('');

  /* ── Persist quality indicators ── */
  useEffect(() => {
    localStorage.setItem(LS_KEY_QUALITY, JSON.stringify(qualityIndicators));
  }, [qualityIndicators]);

  /* ── Persist blood records ── */
  useEffect(() => {
    localStorage.setItem(LS_KEY_BLOOD, JSON.stringify(bloodRecords));
  }, [bloodRecords]);

  /* ── Persist infection records ── */
  useEffect(() => {
    localStorage.setItem(LS_KEY_INFECTION, JSON.stringify(infectionRecords));
  }, [infectionRecords]);

  /* ── Persist patient safety records ── */
  useEffect(() => {
    localStorage.setItem(LS_KEY_PATIENT_SAFETY, JSON.stringify(patientSafetyRecords));
  }, [patientSafetyRecords]);

  /* ── Persist initial assessments ── */
  useEffect(() => {
    localStorage.setItem(LS_KEY_INITIAL_ASSESSMENTS, JSON.stringify(assessments));
  }, [assessments]);

  /* ── Persist pressure injuries ── */
  useEffect(() => {
    localStorage.setItem(LS_KEY_PRESSURE_INJURIES, JSON.stringify(injuries));
  }, [injuries]);

  /* ── Persist infection prevention records ── */
  useEffect(() => {
    localStorage.setItem(LS_KEY_INFECTION_PREVENTION, JSON.stringify(preventionRecords));
  }, [preventionRecords]);

  /* ── Persist patient safety register records ── */
  useEffect(() => {
    localStorage.setItem(LS_KEY_PATIENT_SAFETY_REGISTER, JSON.stringify(safetyRegisterRecords));
  }, [safetyRegisterRecords]);

  /* ── Persist fire safety records ── */
  useEffect(() => {
    localStorage.setItem(LS_KEY_FIRE_SAFETY, JSON.stringify(fireSafetyRecords));
  }, [fireSafetyRecords]);

  /* ── Quality Indicators handlers ── */
  const getNextQualityId = () => {
    const maxNum = qualityIndicators.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `dwqi-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenQualityModal = (record = null) => {
    if (record) {
      setQualityForm({ ...record });
      setEditingQualityId(record.id);
    } else {
      setQualityForm({ ...EMPTY_QUALITY_FORM, id: getNextQualityId() });
      setEditingQualityId(null);
    }
    setIsQualityModalOpen(true);
  };

  const handleSaveQuality = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingQualityId) {
      setQualityIndicators((prev) =>
        prev.map((r) => (r.id === editingQualityId ? { ...qualityForm, id: editingQualityId } : r))
      );
    } else {
      setQualityIndicators((prev) => [...prev, { ...qualityForm }]);
    }
    setIsQualityModalOpen(false);
    setEditingQualityId(null);
  };

  const handleDeleteQuality = (id) => {
    if (window.confirm('Delete this quality indicator record?')) {
      setQualityIndicators((prev) => prev.filter((r) => r.id !== id));
    }
  };

  /* ── Blood Management handlers ── */
  const getNextBloodId = () => {
    const maxNum = bloodRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `dwbl-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenBloodModal = (record = null) => {
    if (record) {
      setBloodForm({ ...record });
      setEditingBloodId(record.id);
    } else {
      setBloodForm({ ...EMPTY_BLOOD_FORM, id: getNextBloodId() });
      setEditingBloodId(null);
    }
    setIsBloodModalOpen(true);
  };

  const handleSaveBlood = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingBloodId) {
      setBloodRecords((prev) =>
        prev.map((r) => (r.id === editingBloodId ? { ...bloodForm, id: editingBloodId } : r))
      );
    } else {
      setBloodRecords((prev) => [...prev, { ...bloodForm }]);
    }
    setIsBloodModalOpen(false);
    setEditingBloodId(null);
  };

  const handleDeleteBlood = (id) => {
    if (window.confirm('Delete this blood management record?')) {
      setBloodRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  /* ── Infection Control handlers ── */
  const getNextInfectionId = () => {
    const maxNum = infectionRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `dwic-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenInfectionModal = (record = null) => {
    if (record) {
      setInfectionForm({ ...record });
      setEditingInfectionId(record.id);
    } else {
      setInfectionForm({ ...EMPTY_INFECTION_FORM, id: getNextInfectionId() });
      setEditingInfectionId(null);
    }
    setIsInfectionModalOpen(true);
  };

  const handleSaveInfection = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingInfectionId) {
      setInfectionRecords((prev) =>
        prev.map((r) => (r.id === editingInfectionId ? { ...infectionForm, id: editingInfectionId } : r))
      );
    } else {
      setInfectionRecords((prev) => [...prev, { ...infectionForm }]);
    }
    setIsInfectionModalOpen(false);
    setEditingInfectionId(null);
  };

  const handleDeleteInfection = (id) => {
    if (window.confirm('Delete this infection control record?')) {
      setInfectionRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  /* ── Patient Safety handlers ── */
  const getNextPatientSafetyId = () => {
    const maxNum = patientSafetyRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `dwps-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenPatientSafetyModal = (record = null) => {
    if (record) {
      setPatientSafetyForm({ ...record });
      setEditingPatientSafetyId(record.id);
    } else {
      setPatientSafetyForm({ ...EMPTY_PATIENT_SAFETY_FORM, id: getNextPatientSafetyId() });
      setEditingPatientSafetyId(null);
    }
    setIsPatientSafetyModalOpen(true);
  };

  const handleSavePatientSafety = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingPatientSafetyId) {
      setPatientSafetyRecords((prev) =>
        prev.map((r) => (r.id === editingPatientSafetyId ? { ...patientSafetyForm, id: editingPatientSafetyId } : r))
      );
    } else {
      setPatientSafetyRecords((prev) => [...prev, { ...patientSafetyForm }]);
    }
    setIsPatientSafetyModalOpen(false);
    setEditingPatientSafetyId(null);
  };

  const handleDeletePatientSafety = (id) => {
    if (window.confirm('Delete this patient safety record?')) {
      setPatientSafetyRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  /* ── Initial Assessments handlers ── */
  const getNextAssessmentId = () => {
    const maxNum = assessments.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `dwa-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenAssessmentModal = (record = null) => {
    if (record) {
      setAssessmentForm({ ...record });
      setEditingAssessmentId(record.id);
    } else {
      setAssessmentForm({ ...EMPTY_ASSESSMENT_FORM, id: getNextAssessmentId() });
      setEditingAssessmentId(null);
    }
    setIsAssessmentModalOpen(true);
  };

  const handleSaveAssessment = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingAssessmentId) {
      setAssessments((prev) =>
        prev.map((r) => (r.id === editingAssessmentId ? { ...assessmentForm, id: editingAssessmentId } : r))
      );
    } else {
      setAssessments((prev) => [...prev, { ...assessmentForm }]);
    }
    setIsAssessmentModalOpen(false);
    setEditingAssessmentId(null);
  };

  const handleDeleteAssessment = (id) => {
    if (window.confirm('Delete this assessment record?')) {
      setAssessments((prev) => prev.filter((r) => r.id !== id));
    }
  };

  /* ── Pressure Injuries handlers ── */
  const getNextInjuryId = () => {
    const maxNum = injuries.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `dwpi-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenInjuryModal = (record = null) => {
    if (record) {
      setInjuryForm({ ...record });
      setEditingInjuryId(record.id);
    } else {
      setInjuryForm({ ...EMPTY_PRESSURE_INJURY_FORM, id: getNextInjuryId() });
      setEditingInjuryId(null);
    }
    setIsInjuryModalOpen(true);
  };

  const handleSaveInjury = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingInjuryId) {
      setInjuries((prev) =>
        prev.map((r) => (r.id === editingInjuryId ? { ...injuryForm, id: editingInjuryId } : r))
      );
    } else {
      setInjuries((prev) => [...prev, { ...injuryForm }]);
    }
    setIsInjuryModalOpen(false);
    setEditingInjuryId(null);
  };

  const handleDeleteInjury = (id) => {
    if (window.confirm('Delete this pressure injury record?')) {
      setInjuries((prev) => prev.filter((r) => r.id !== id));
    }
  };

  /* ── Infection Prevention handlers ── */
  const getNextPreventionId = () => {
    const maxNum = preventionRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `dwip-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenPreventionModal = (record = null) => {
    if (record) {
      setPreventionForm({ ...record });
      setEditingPreventionId(record.id);
    } else {
      setPreventionForm({ ...EMPTY_INFECTION_PREVENTION_FORM, id: getNextPreventionId() });
      setEditingPreventionId(null);
    }
    setIsPreventionModalOpen(true);
  };

  const handleSavePrevention = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingPreventionId) {
      setPreventionRecords((prev) =>
        prev.map((r) => (r.id === editingPreventionId ? { ...preventionForm, id: editingPreventionId } : r))
      );
    } else {
      setPreventionRecords((prev) => [...prev, { ...preventionForm }]);
    }
    setIsPreventionModalOpen(false);
    setEditingPreventionId(null);
  };

  const handleDeletePrevention = (id) => {
    if (window.confirm('Delete this infection prevention record?')) {
      setPreventionRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  /* ── Patient Safety Register handlers ── */
  const getNextSafetyRegisterId = () => {
    const maxNum = safetyRegisterRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `dwpsr-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenSafetyRegisterModal = (record = null) => {
    if (record) {
      setSafetyRegisterForm({ ...record });
      setEditingSafetyRegisterId(record.id);
    } else {
      setSafetyRegisterForm({ ...EMPTY_PATIENT_SAFETY_REGISTER_FORM, id: getNextSafetyRegisterId() });
      setEditingSafetyRegisterId(null);
    }
    setIsSafetyRegisterModalOpen(true);
  };

  const handleSaveSafetyRegister = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingSafetyRegisterId) {
      setSafetyRegisterRecords((prev) =>
        prev.map((r) => (r.id === editingSafetyRegisterId ? { ...safetyRegisterForm, id: editingSafetyRegisterId } : r))
      );
    } else {
      setSafetyRegisterRecords((prev) => [...prev, { ...safetyRegisterForm }]);
    }
    setIsSafetyRegisterModalOpen(false);
    setEditingSafetyRegisterId(null);
  };

  const handleDeleteSafetyRegister = (id) => {
    if (window.confirm('Delete this patient safety register record?')) {
      setSafetyRegisterRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  /* ── Fire Safety handlers ── */
  const getNextFireSafetyId = () => {
    const maxNum = fireSafetyRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `dwfs-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenFireSafetyModal = (record = null) => {
    if (record) {
      setFireSafetyForm({ ...record });
      setEditingFireSafetyId(record.id);
    } else {
      setFireSafetyForm({ ...EMPTY_FIRE_SAFETY_FORM, id: getNextFireSafetyId() });
      setEditingFireSafetyId(null);
    }
    setIsFireSafetyModalOpen(true);
  };

  const handleSaveFireSafety = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingFireSafetyId) {
      setFireSafetyRecords((prev) =>
        prev.map((r) => (r.id === editingFireSafetyId ? { ...fireSafetyForm, id: editingFireSafetyId } : r))
      );
    } else {
      setFireSafetyRecords((prev) => [...prev, { ...fireSafetyForm }]);
    }
    setIsFireSafetyModalOpen(false);
    setEditingFireSafetyId(null);
  };

  const handleDeleteFireSafety = (id) => {
    if (window.confirm('Delete this fire safety record?')) {
      setFireSafetyRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  /* ── Tab renderer ── */
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab hospital={hospital} />;
      case 'quality':
        return (
          <QualityTab
            hospital={hospital}
            qualityIndicators={qualityIndicators}
            searchQuery={qualitySearch}
            setSearchQuery={setQualitySearch}
            handleOpenQualityModal={handleOpenQualityModal}
            handleDeleteQuality={handleDeleteQuality}
          />
        );
      case 'patient_care':
        return (
          <PatientCareDashboard
            hospital={hospital}
            assessments={assessments}
            injuries={injuries}
            bloodRecords={bloodRecords}
            bloodSearch={bloodSearch}
            setBloodSearch={setBloodSearch}
            handleOpenBloodModal={handleOpenBloodModal}
            handleDeleteBlood={handleDeleteBlood}
            assessmentSearch={assessmentSearch}
            setAssessmentSearch={setAssessmentSearch}
            handleOpenAssessmentModal={handleOpenAssessmentModal}
            handleDeleteAssessment={handleDeleteAssessment}
            injurySearch={injurySearch}
            setInjurySearch={setInjurySearch}
            handleOpenInjuryModal={handleOpenInjuryModal}
            handleDeleteInjury={handleDeleteInjury}
          />
        );
      case 'infection':
        return (
          <InfectionPreventionSafetyTab
            hospital={hospital}
            subTab="prevention"
            preventionRecords={preventionRecords}
            preventionSearch={preventionSearch}
            setPreventionSearch={setPreventionSearch}
            handleOpenPreventionModal={handleOpenPreventionModal}
            handleDeletePrevention={handleDeletePrevention}
            safetyRegisterRecords={safetyRegisterRecords}
            safetyRegisterSearch={safetyRegisterSearch}
            setSafetyRegisterSearch={setSafetyRegisterSearch}
            handleOpenSafetyRegisterModal={handleOpenSafetyRegisterModal}
            handleDeleteSafetyRegister={handleDeleteSafetyRegister}
            fireSafetyRecords={fireSafetyRecords}
            fireSafetySearch={fireSafetySearch}
            setFireSafetySearch={setFireSafetySearch}
            handleOpenFireSafetyModal={handleOpenFireSafetyModal}
            handleDeleteFireSafety={handleDeleteFireSafety}
          />
        );
      case 'clinical':
        return <PlaceholderSection title="Clinical Monitoring" />;
      case 'audit':
        return <PlaceholderSection title="Internal Audit" />;
      case 'reports':
        return (
          <ReportsTab 
            hospital={hospital}
            qualityIndicators={qualityIndicators}
            bloodRecords={bloodRecords}
            infectionRecords={infectionRecords}
            patientSafetyRecords={patientSafetyRecords}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-0 -m-6 min-h-[calc(100vh-4rem)]">
      {/* ── Left Rail ── */}
      <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider cursor-pointer transition-colors group"
          >
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Policies Directory
          </button>
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">Deluxe Ward</h2>
          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">
            NABH Clinical Quality Module
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scroll py-3 px-2 space-y-0.5">
          {TABS.map(({ id, label, icon: Icon }) => {
            const isActive = id === activeTab;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                style={
                  isActive
                    ? { backgroundColor: `${hospital.themeColor}0d`, borderColor: `${hospital.themeColor}22`, color: hospital.themeColor }
                    : {}
                }
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'border-sky-500/20 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[10px] font-semibold truncate">{label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-100">
          <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">
            Deluxe Ward — NABH Module
          </p>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto custom-scroll bg-slate-50/40 p-6">
        {renderContent()}
      </main>

      {/* ── Quality Indicators Modal ── */}
      {isQualityModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingQualityId ? 'Edit Quality Indicator Record' : 'Add Monthly Quality Data'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Deluxe Ward — NABH Clinical Quality</p>
              </div>
              <button
                onClick={() => { setIsQualityModalOpen(false); setEditingQualityId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveQuality} className="space-y-5">
              {/* Period */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">
                  Reporting Period
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                    <select
                      value={qualityForm.month}
                      onChange={(e) => setQualityForm({ ...qualityForm, month: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                    <input
                      type="number"
                      value={qualityForm.year}
                      onChange={(e) => setQualityForm({ ...qualityForm, year: parseInt(e.target.value) || 2025 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Patient census */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">
                  Patient Census
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Patient Days"            field="patientDays"          form={qualityForm} setForm={setQualityForm} />
                  <NumField label="Initial Assessment (min)" field="initialAssessmentTime" form={qualityForm} setForm={setQualityForm} />
                </div>
              </div>

              {/* Patient Safety */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">
                  Patient Safety
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <NumField label="Falls"                  field="falls"                form={qualityForm} setForm={setQualityForm} />
                  <NumField label="Medication Errors"      field="medicationErrors"     form={qualityForm} setForm={setQualityForm} />
                  <NumField label="Adverse Drug Reactions" field="adverseDrugReactions" form={qualityForm} setForm={setQualityForm} />
                </div>
              </div>

              {/* Infection Control */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">
                  Infection Control
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="CAUTI Cases"            field="cauti"                form={qualityForm} setForm={setQualityForm} />
                  <NumField label="Bloodstream Infections" field="bloodstreamInfections" form={qualityForm} setForm={setQualityForm} />
                </div>
              </div>

              {/* Discharge */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">
                  Discharge
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Avg Discharge Time (min)" field="dischargeTime" form={qualityForm} setForm={setQualityForm} />
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select
                      value={qualityForm.status}
                      onChange={(e) => setQualityForm({ ...qualityForm, status: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setIsQualityModalOpen(false); setEditingQualityId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingQualityId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Blood Management Modal ── */}
      {isBloodModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingBloodId ? 'Edit Blood Management Record' : 'Add Blood Record'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Deluxe Ward — Blood Product Usage</p>
              </div>
              <button
                onClick={() => { setIsBloodModalOpen(false); setEditingBloodId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveBlood} className="space-y-5">
              {/* Reporting Period */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                    <select
                      value={bloodForm.month}
                      onChange={(e) => setBloodForm({ ...bloodForm, month: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                    <input
                      type="number"
                      value={bloodForm.year}
                      onChange={(e) => setBloodForm({ ...bloodForm, year: parseInt(e.target.value) || 2025 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Blood Product Units */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Blood Product Units</p>
                <div className="grid grid-cols-3 gap-3">
                  <NumField label="PRBC (units)"  field="prbc"  form={bloodForm} setForm={setBloodForm} />
                  <NumField label="SDP (units)"   field="sdp"   form={bloodForm} setForm={setBloodForm} />
                  <NumField label="RDP (units)"   field="rdp"   form={bloodForm} setForm={setBloodForm} />
                  <NumField label="FFP (units)"   field="ffp"   form={bloodForm} setForm={setBloodForm} />
                  <NumField label="CRYO (units)"  field="cryo"  form={bloodForm} setForm={setBloodForm} />
                  <NumField label="Blood Wastage" field="bloodWastage" form={bloodForm} setForm={setBloodForm} />
                </div>
              </div>

              {/* Safety & Operations */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Safety &amp; Operations</p>
                <div className="grid grid-cols-3 gap-3">
                  <NumField label="Transfusion Reactions" field="transfusionReactions" form={bloodForm} setForm={setBloodForm} />
                  <NumField label="Turnaround Time (min)" field="turnaroundTime"       form={bloodForm} setForm={setBloodForm} />
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select
                      value={bloodForm.status}
                      onChange={(e) => setBloodForm({ ...bloodForm, status: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setIsBloodModalOpen(false); setEditingBloodId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingBloodId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Infection Control Modal ── */}
      {isInfectionModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingInfectionId ? 'Edit Infection Control Record' : 'Add Infection Record'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Deluxe Ward — HAI Surveillance</p>
              </div>
              <button
                onClick={() => { setIsInfectionModalOpen(false); setEditingInfectionId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveInfection} className="space-y-5">
              {/* Reporting Period */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                    <select
                      value={infectionForm.month}
                      onChange={(e) => setInfectionForm({ ...infectionForm, month: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                    <input
                      type="number"
                      value={infectionForm.year}
                      onChange={(e) => setInfectionForm({ ...infectionForm, year: parseInt(e.target.value) || 2025 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* HAI Data */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">HAI Surveillance Data</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Patient Days"             field="patientDays"           form={infectionForm} setForm={setInfectionForm} />
                  <NumField label="CAUTI Cases"              field="cauti"                 form={infectionForm} setForm={setInfectionForm} />
                  <NumField label="Bloodstream Infections"   field="bloodstreamInfections" form={infectionForm} setForm={setInfectionForm} />
                  <NumField label="SSI Cases"                field="ssi"                   form={infectionForm} setForm={setInfectionForm} />
                </div>
              </div>

              {/* Computed / Status */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Rate &amp; Status</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Infection Rate (per 1000 days)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={infectionForm.infectionRate}
                      onChange={(e) => setInfectionForm({ ...infectionForm, infectionRate: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select
                      value={infectionForm.status}
                      onChange={(e) => setInfectionForm({ ...infectionForm, status: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setIsInfectionModalOpen(false); setEditingInfectionId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingInfectionId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Patient Safety Modal ── */}
      {isPatientSafetyModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingPatientSafetyId ? 'Edit Patient Safety Record' : 'Add Patient Safety Record'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Deluxe Ward — Patient Safety Events</p>
              </div>
              <button
                onClick={() => { setIsPatientSafetyModalOpen(false); setEditingPatientSafetyId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSavePatientSafety} className="space-y-5">
              {/* Reporting Period */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                    <select
                      value={patientSafetyForm.month}
                      onChange={(e) => setPatientSafetyForm({ ...patientSafetyForm, month: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                    <input
                      type="number"
                      value={patientSafetyForm.year}
                      onChange={(e) => setPatientSafetyForm({ ...patientSafetyForm, year: parseInt(e.target.value) || 2025 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Safety Events */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Safety Events</p>
                <div className="grid grid-cols-3 gap-3">
                  <NumField label="Falls"                  field="falls"                form={patientSafetyForm} setForm={setPatientSafetyForm} />
                  <NumField label="Medication Errors"      field="medicationErrors"     form={patientSafetyForm} setForm={setPatientSafetyForm} />
                  <NumField label="Adverse Drug Reactions" field="adverseDrugReactions" form={patientSafetyForm} setForm={setPatientSafetyForm} />
                </div>
              </div>

              {/* Patient Outcomes / Status */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Patient Outcomes &amp; Status</p>
                <div className="grid grid-cols-3 gap-3">
                  <NumField label="Initial Assessment (min)" field="initialAssessmentTime" form={patientSafetyForm} setForm={setPatientSafetyForm} />
                  <NumField label="Discharge Time (min)"     field="dischargeTime"         form={patientSafetyForm} setForm={setPatientSafetyForm} />
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select
                      value={patientSafetyForm.status}
                      onChange={(e) => setPatientSafetyForm({ ...patientSafetyForm, status: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setIsPatientSafetyModalOpen(false); setEditingPatientSafetyId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingPatientSafetyId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Initial Assessment Modal ── */}
      {isAssessmentModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingAssessmentId ? 'Edit Assessment Record' : 'Add Initial Assessment'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Deluxe Ward — Nurse &amp; Doctor Assessment</p>
              </div>
              <button
                onClick={() => { setIsAssessmentModalOpen(false); setEditingAssessmentId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveAssessment} className="space-y-5">
              {/* Identifiers */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Patient &amp; Assessment Details</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Assessment ID *</label>
                    <input
                      type="text"
                      value={assessmentForm.assessmentId}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, assessmentId: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">UHID *</label>
                    <input
                      type="text"
                      value={assessmentForm.uhId}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, uhId: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name *</label>
                    <input
                      type="text"
                      value={assessmentForm.patientName}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, patientName: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Timings */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Assessment Timings</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Assessment Date *</label>
                    <input
                      type="date"
                      value={assessmentForm.assessmentDate}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, assessmentDate: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Nurse Assessment Time</label>
                    <input
                      type="time"
                      value={assessmentForm.nurseAssessmentTime}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, nurseAssessmentTime: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Doctor Assessment Time</label>
                    <input
                      type="time"
                      value={assessmentForm.doctorAssessmentTime}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, doctorAssessmentTime: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Status & Remarks */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Status &amp; Remarks</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                    <select
                      value={assessmentForm.status}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, status: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Incomplete">Incomplete</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                    <input
                      type="text"
                      value={assessmentForm.remarks}
                      onChange={(e) => setAssessmentForm({ ...assessmentForm, remarks: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setIsAssessmentModalOpen(false); setEditingAssessmentId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingAssessmentId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Pressure Injury Modal ── */}
      {isInjuryModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingInjuryId ? 'Edit Pressure Injury Record' : 'Add Pressure Injury Record'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Deluxe Ward — Wound Care &amp; Risk Assessment</p>
              </div>
              <button
                onClick={() => { setIsInjuryModalOpen(false); setEditingInjuryId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveInjury} className="space-y-5">
              {/* Identifiers */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Patient &amp; Record Details</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Record ID *</label>
                    <input
                      type="text"
                      value={injuryForm.recordId}
                      onChange={(e) => setInjuryForm({ ...injuryForm, recordId: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">UHID *</label>
                    <input
                      type="text"
                      value={injuryForm.uhId}
                      onChange={(e) => setInjuryForm({ ...injuryForm, uhId: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name *</label>
                    <input
                      type="text"
                      value={injuryForm.patientName}
                      onChange={(e) => setInjuryForm({ ...injuryForm, patientName: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Risk & Stage */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Risk Assessment</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Risk Level *</label>
                    <select
                      value={injuryForm.riskLevel}
                      onChange={(e) => setInjuryForm({ ...injuryForm, riskLevel: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Stage *</label>
                    <select
                      value={injuryForm.stage}
                      onChange={(e) => setInjuryForm({ ...injuryForm, stage: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Stage 1">Stage 1</option>
                      <option value="Stage 2">Stage 2</option>
                      <option value="Stage 3">Stage 3</option>
                      <option value="Stage 4">Stage 4</option>
                      <option value="Unstageable">Unstageable</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Assessment Date *</label>
                    <input
                      type="date"
                      value={injuryForm.assessmentDate}
                      onChange={(e) => setInjuryForm({ ...injuryForm, assessmentDate: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Care & Status */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Care Plan &amp; Status</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Preventive Measures</label>
                    <textarea
                      value={injuryForm.preventiveMeasures}
                      onChange={(e) => setInjuryForm({ ...injuryForm, preventiveMeasures: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                    <select
                      value={injuryForm.status}
                      onChange={(e) => setInjuryForm({ ...injuryForm, status: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Resolved">Resolved</option>
                      <option value="UnderReview">Under Review</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                    <input
                      type="text"
                      value={injuryForm.remarks}
                      onChange={(e) => setInjuryForm({ ...injuryForm, remarks: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setIsInjuryModalOpen(false); setEditingInjuryId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingInjuryId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Infection Prevention Modal ── */}
      {isPreventionModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingPreventionId ? 'Edit Prevention Record' : 'Add Infection Prevention Record'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Deluxe Ward — NABH Infection Control Audit</p>
              </div>
              <button
                onClick={() => { setIsPreventionModalOpen(false); setEditingPreventionId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSavePrevention} className="space-y-5">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Audit Details</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Record ID *</label>
                    <input
                      type="text"
                      value={preventionForm.recordId}
                      onChange={(e) => setPreventionForm({ ...preventionForm, recordId: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Area / Ward *</label>
                    <input
                      type="text"
                      value={preventionForm.areaWard}
                      onChange={(e) => setPreventionForm({ ...preventionForm, areaWard: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Date *</label>
                    <input
                      type="date"
                      value={preventionForm.auditDate}
                      onChange={(e) => setPreventionForm({ ...preventionForm, auditDate: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Compliance Metrics</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Hand Hygiene Compliance %</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={preventionForm.handHygieneCompliance}
                      onChange={(e) => setPreventionForm({ ...preventionForm, handHygieneCompliance: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">PPE Compliance %</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={preventionForm.ppeCompliance}
                      onChange={(e) => setPreventionForm({ ...preventionForm, ppeCompliance: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Infection Control Status *</label>
                    <select
                      value={preventionForm.infectionControlStatus}
                      onChange={(e) => setPreventionForm({ ...preventionForm, infectionControlStatus: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Compliant">Compliant</option>
                      <option value="Non-Compliant">Non-Compliant</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Observations</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Isolation Precautions</label>
                    <input
                      type="text"
                      value={preventionForm.isolationPrecautions}
                      onChange={(e) => setPreventionForm({ ...preventionForm, isolationPrecautions: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Environmental Cleaning</label>
                    <input
                      type="text"
                      value={preventionForm.environmentalCleaning}
                      onChange={(e) => setPreventionForm({ ...preventionForm, environmentalCleaning: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                    <input
                      type="text"
                      value={preventionForm.remarks}
                      onChange={(e) => setPreventionForm({ ...preventionForm, remarks: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setIsPreventionModalOpen(false); setEditingPreventionId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingPreventionId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Patient Safety Register Modal ── */}
      {isSafetyRegisterModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingSafetyRegisterId ? 'Edit Patient Safety Record' : 'Add Patient Safety Record'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Deluxe Ward — Patient Safety &amp; Incident Tracking</p>
              </div>
              <button
                onClick={() => { setIsSafetyRegisterModalOpen(false); setEditingSafetyRegisterId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveSafetyRegister} className="space-y-5">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Record Details</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Record ID *</label>
                    <input
                      type="text"
                      value={safetyRegisterForm.recordId}
                      onChange={(e) => setSafetyRegisterForm({ ...safetyRegisterForm, recordId: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">UHID *</label>
                    <input
                      type="text"
                      value={safetyRegisterForm.uhId}
                      onChange={(e) => setSafetyRegisterForm({ ...safetyRegisterForm, uhId: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name *</label>
                    <input
                      type="text"
                      value={safetyRegisterForm.patientName}
                      onChange={(e) => setSafetyRegisterForm({ ...safetyRegisterForm, patientName: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Safety Parameters</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Fall Risk *</label>
                    <select
                      value={safetyRegisterForm.fallRisk}
                      onChange={(e) => setSafetyRegisterForm({ ...safetyRegisterForm, fallRisk: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Medication Safety</label>
                    <select
                      value={safetyRegisterForm.medicationSafety}
                      onChange={(e) => setSafetyRegisterForm({ ...safetyRegisterForm, medicationSafety: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Verified">Verified</option>
                      <option value="Double checked">Double checked</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Identification</label>
                    <select
                      value={safetyRegisterForm.patientIdentification}
                      onChange={(e) => setSafetyRegisterForm({ ...safetyRegisterForm, patientIdentification: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Verified">Verified</option>
                      <option value="Flagged">Flagged</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Safe Surgery Checklist</label>
                    <select
                      value={safetyRegisterForm.safeSurgeryChecklist}
                      onChange={(e) => setSafetyRegisterForm({ ...safetyRegisterForm, safeSurgeryChecklist: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Not Applicable">Not Applicable</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Incident Reported</label>
                    <select
                      value={safetyRegisterForm.incidentReported}
                      onChange={(e) => setSafetyRegisterForm({ ...safetyRegisterForm, incidentReported: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                    <select
                      value={safetyRegisterForm.status}
                      onChange={(e) => setSafetyRegisterForm({ ...safetyRegisterForm, status: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Under Review">Under Review</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Notes</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                    <textarea
                      value={safetyRegisterForm.remarks}
                      onChange={(e) => setSafetyRegisterForm({ ...safetyRegisterForm, remarks: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setIsSafetyRegisterModalOpen(false); setEditingSafetyRegisterId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingSafetyRegisterId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Fire Safety Modal ── */}
      {isFireSafetyModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingFireSafetyId ? 'Edit Fire Safety Record' : 'Add Fire Safety Record'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Deluxe Ward — Fire Safety &amp; Occupational Hazard Audit</p>
              </div>
              <button
                onClick={() => { setIsFireSafetyModalOpen(false); setEditingFireSafetyId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveFireSafety} className="space-y-5">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Record Details</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Record ID *</label>
                    <input
                      type="text"
                      value={fireSafetyForm.recordId}
                      onChange={(e) => setFireSafetyForm({ ...fireSafetyForm, recordId: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Area *</label>
                    <input
                      type="text"
                      value={fireSafetyForm.area}
                      onChange={(e) => setFireSafetyForm({ ...fireSafetyForm, area: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Inspection Date *</label>
                    <input
                      type="date"
                      value={fireSafetyForm.inspectionDate}
                      onChange={(e) => setFireSafetyForm({ ...fireSafetyForm, inspectionDate: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Safety Checks</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Fire Safety Equipment Checked</label>
                    <select
                      value={fireSafetyForm.fireSafetyEquipmentChecked}
                      onChange={(e) => setFireSafetyForm({ ...fireSafetyForm, fireSafetyEquipmentChecked: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Emergency Exit Status</label>
                    <select
                      value={fireSafetyForm.emergencyExitStatus}
                      onChange={(e) => setFireSafetyForm({ ...fireSafetyForm, emergencyExitStatus: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Clear">Clear</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">PPE Availability</label>
                    <select
                      value={fireSafetyForm.ppeAvailability}
                      onChange={(e) => setFireSafetyForm({ ...fireSafetyForm, ppeAvailability: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Available">Available</option>
                      <option value="Partial">Partial</option>
                      <option value="Not Available">Not Available</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Hazard Identified</label>
                    <select
                      value={fireSafetyForm.hazardIdentified}
                      onChange={(e) => setFireSafetyForm({ ...fireSafetyForm, hazardIdentified: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Corrective Action</label>
                    <input
                      type="text"
                      value={fireSafetyForm.correctiveAction}
                      onChange={(e) => setFireSafetyForm({ ...fireSafetyForm, correctiveAction: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Status &amp; Remarks</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                    <select
                      value={fireSafetyForm.status}
                      onChange={(e) => setFireSafetyForm({ ...fireSafetyForm, status: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Non-Compliant">Non-Compliant</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                    <input
                      type="text"
                      value={fireSafetyForm.remarks}
                      onChange={(e) => setFireSafetyForm({ ...fireSafetyForm, remarks: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setIsFireSafetyModalOpen(false); setEditingFireSafetyId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingFireSafetyId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Infection Prevention Register tab ─── */
const InfectionPreventionTab = ({
  hospital,
  records,
  searchQuery,
  setSearchQuery,
  handleOpenModal,
  handleDelete,
}) => {
  const filtered = records.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.recordId.toLowerCase().includes(q) ||
      r.areaWard.toLowerCase().includes(q) ||
      r.infectionControlStatus.toLowerCase().includes(q) ||
      String(r.handHygieneCompliance).includes(q) ||
      String(r.ppeCompliance).includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const avgHandHygiene = records.length > 0 ? (records.reduce((s, r) => s + (r.handHygieneCompliance || 0), 0) / records.length).toFixed(1) : '0.0';
  const avgPPE = records.length > 0 ? (records.reduce((s, r) => s + (r.ppeCompliance || 0), 0) / records.length).toFixed(1) : '0.0';
  const totalCompliant = records.filter((r) => r.infectionControlStatus === 'Compliant').length;
  const compliancePct = records.length > 0 ? ((totalCompliant / records.length) * 100).toFixed(1) : '0.0';

  const STATUS_BADGE = {
    Compliant: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Non-Compliant': 'bg-rose-50 text-rose-700 border-rose-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Area / Ward', 'Audit Date', 'Hand Hygiene %', 'PPE %',
    'Isolation Precautions', 'Environmental Cleaning', 'IC Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Infection Prevention Register</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">NABH infection control audits — Deluxe Ward</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Avg Hand Hygiene %',     value: `${avgHandHygiene}%`, color: 'text-blue-600'    },
          { label: 'Avg PPE %',              value: `${avgPPE}%`,        color: 'text-indigo-600'  },
          { label: 'Compliance %',           value: `${compliancePct}%`, color: 'text-emerald-600' },
          { label: 'Total Records',          value: records.length,      color: 'text-slate-700'   },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by ID, area, status, or compliance…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {TH_COLS.map((h) => (
                  <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.recordId}</td>
                  <td className="px-3 py-3 font-semibold text-slate-700 whitespace-nowrap">{r.areaWard}</td>
                  <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{r.auditDate}</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.handHygieneCompliance}</td>
                  <td className="px-3 py-3 text-indigo-600 font-bold">{r.ppeCompliance}</td>
                  <td className="px-3 py-3 text-slate-600">{r.isolationPrecautions}</td>
                  <td className="px-3 py-3 text-slate-600">{r.environmentalCleaning}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.infectionControlStatus] || STATUS_BADGE.Pending}`}>
                      {r.infectionControlStatus}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">
                    {searchQuery ? 'No records match your search.' : 'No infection prevention records yet. Click "Add Record" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {records.length} record{records.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─── Patient Safety Register tab ─── */
const PatientSafetyRegisterTab = ({
  hospital,
  records,
  searchQuery,
  setSearchQuery,
  handleOpenModal,
  handleDelete,
}) => {
  const filtered = records.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.recordId.toLowerCase().includes(q) ||
      r.uhId.toLowerCase().includes(q) ||
      r.patientName.toLowerCase().includes(q) ||
      r.incidentReported.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalRecords = records.length;
  const incidentsReported = records.filter((r) => r.incidentReported === 'Yes').length;
  const highFallRisk = records.filter((r) => r.fallRisk === 'High').length;

  const STATUS_BADGE = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Resolved: 'bg-sky-50 text-sky-700 border-sky-200',
    'Under Review': 'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'UHID', 'Patient Name', 'Fall Risk', 'Med Safety',
    'Patient ID', 'Surgery Checklist', 'Incident', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Patient Safety Register</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">NABH patient safety &amp; incident tracking — Deluxe Ward</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Records',         value: totalRecords,      color: 'text-blue-600'    },
          { label: 'Incidents Reported',    value: incidentsReported, color: 'text-rose-600'    },
          { label: 'High Fall Risk',        value: highFallRisk,      color: 'text-orange-600'  },
          { label: 'Resolution Rate',       value: `${totalRecords > 0 ? ((1 - incidentsReported / totalRecords) * 100).toFixed(1) : '0.0'}%`, color: 'text-emerald-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by ID, UHID, name, incident, or status…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {TH_COLS.map((h) => (
                  <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.recordId}</td>
                  <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhId}</td>
                  <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${
                      r.fallRisk === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : r.fallRisk === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {r.fallRisk}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-600">{r.medicationSafety}</td>
                  <td className="px-3 py-3 text-slate-600">{r.patientIdentification}</td>
                  <td className="px-3 py-3 text-slate-600">{r.safeSurgeryChecklist}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${
                      r.incidentReported === 'Yes' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {r.incidentReported}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Active}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">
                    {searchQuery ? 'No records match your search.' : 'No patient safety records yet. Click "Add Record" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {records.length} record{records.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─── Fire & Occupational Safety Register tab ─── */
const FireSafetyTab = ({
  hospital,
  records,
  searchQuery,
  setSearchQuery,
  handleOpenModal,
  handleDelete,
}) => {
  const filtered = records.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.recordId.toLowerCase().includes(q) ||
      r.area.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q) ||
      r.emergencyExitStatus.toLowerCase().includes(q) ||
      r.hazardIdentified.toLowerCase().includes(q)
    );
  });

  const totalRecords = records.length;
  const equipmentChecked = records.filter((r) => r.fireSafetyEquipmentChecked === 'Yes').length;
  const clearExits = records.filter((r) => r.emergencyExitStatus === 'Clear').length;
  const compliancePct = totalRecords > 0 ? ((clearExits / totalRecords) * 100).toFixed(1) : '0.0';

  const STATUS_BADGE = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Non-Compliant': 'bg-rose-50 text-rose-700 border-rose-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Area', 'Equipment', 'Exit Status', 'PPE',
    'Hazard', 'Corrective Action', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Fire &amp; Occupational Safety Register</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">NABH fire safety &amp; occupational hazard audits — Deluxe Ward</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Fire Compliance %',     value: `${compliancePct}%`, color: 'text-emerald-600' },
          { label: 'Equipment Checked',      value: equipmentChecked,    color: 'text-blue-600'    },
          { label: 'Clear Exits',            value: clearExits,          color: 'text-indigo-600'  },
          { label: 'Open Hazards',           value: records.filter((r) => r.hazardIdentified === 'Yes').length, color: 'text-rose-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by ID, area, hazard, action, or status…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {TH_COLS.map((h) => (
                  <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.recordId}</td>
                  <td className="px-3 py-3 font-semibold text-slate-700">{r.area}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${
                      r.fireSafetyEquipmentChecked === 'Yes' ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {r.fireSafetyEquipmentChecked}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${
                      r.emergencyExitStatus === 'Clear' ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {r.emergencyExitStatus}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-600">{r.ppeAvailability}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${
                      r.hazardIdentified === 'Yes' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {r.hazardIdentified}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-600">{r.correctiveAction}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Active}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">
                    {searchQuery ? 'No records match your search.' : 'No fire safety records yet. Click "Add Record" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {records.length} record{records.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─── Infection Prevention & Safety wrapper tab ─── */
const InfectionPreventionSafetyTab = ({
  hospital,
  preventionRecords,
  preventionSearch,
  setPreventionSearch,
  handleOpenPreventionModal,
  handleDeletePrevention,
  safetyRegisterRecords,
  safetyRegisterSearch,
  setSafetyRegisterSearch,
  handleOpenSafetyRegisterModal,
  handleDeleteSafetyRegister,
  fireSafetyRecords,
  fireSafetySearch,
  setFireSafetySearch,
  handleOpenFireSafetyModal,
  handleDeleteFireSafety,
}) => {
  const [subTab, setSubTab] = useState('prevention');

  const SUB_TABS = [
    { id: 'prevention', label: 'Infection Prevention', icon: ShieldCheck },
    { id: 'safety',     label: 'Patient Safety',      icon: ClipboardList },
    { id: 'fire',       label: 'Fire Safety',          icon: Flame },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Infection Prevention &amp; Safety</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">NABH-aligned infection control, patient safety, and occupational hazard management</p>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 w-fit">
        {SUB_TABS.map(({ id, label, icon: Icon }) => {
          const isActive = id === subTab;
          return (
            <button
              key={id}
              onClick={() => setSubTab(id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          );
        })}
      </div>

      {/* 8 KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Infection Control Compliance %', value: (() => { const c = preventionRecords.filter(r => r.infectionControlStatus === 'Compliant').length; return preventionRecords.length ? ((c / preventionRecords.length) * 100).toFixed(1) : '0.0'; })(), color: 'text-emerald-600' },
            { label: 'Avg Hand Hygiene %',  value: `${preventionRecords.length ? (preventionRecords.reduce((s, r) => s + (r.handHygieneCompliance || 0), 0) / preventionRecords.length).toFixed(1) : '0.0'}%`, color: 'text-blue-600' },
            { label: 'Avg PPE %',           value: `${preventionRecords.length ? (preventionRecords.reduce((s, r) => s + (r.ppeCompliance || 0), 0) / preventionRecords.length).toFixed(1) : '0.0'}%`, color: 'text-indigo-600' },
            { label: 'Patient Safety Incidents', value: safetyRegisterRecords.filter(r => r.incidentReported === 'Yes').length, color: 'text-rose-600' },
            { label: 'Fire Safety Compliance %', value: `${fireSafetyRecords.length ? (fireSafetyRecords.filter(r => r.emergencyExitStatus === 'Clear').length / fireSafetyRecords.length * 100).toFixed(1) : '0.0'}%`, color: 'text-emerald-600' },
            { label: 'Occupational Safety Compliance %', value: `${fireSafetyRecords.length ? (fireSafetyRecords.filter(r => r.fireSafetyEquipmentChecked === 'Yes').length / fireSafetyRecords.length * 100).toFixed(1) : '0.0'}%`, color: 'text-blue-600' },
            { label: 'Open Safety Observations', value: fireSafetyRecords.filter(r => r.hazardIdentified === 'Yes').length + safetyRegisterRecords.filter(r => r.status === 'Under Review').length, color: 'text-orange-600' },
            { label: 'Overall Infection &amp; Safety Compliance %', value: `${(() => { const p = preventionRecords.filter(r => r.infectionControlStatus === 'Compliant').length; const f = fireSafetyRecords.filter(r => r.fireSafetyEquipmentChecked === 'Yes').length; const t = preventionRecords.length + fireSafetyRecords.length; return t > 0 ? ((p + f) / t * 100).toFixed(1) : '0.0'; })()}%`, color: 'text-amber-600' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

      {subTab === 'prevention' && (
        <InfectionPreventionTab
          hospital={hospital}
          records={preventionRecords}
          searchQuery={preventionSearch}
          setSearchQuery={setPreventionSearch}
          handleOpenModal={handleOpenPreventionModal}
          handleDelete={handleDeletePrevention}
        />
      )}

      {subTab === 'safety' && (
        <PatientSafetyRegisterTab
          hospital={hospital}
          records={safetyRegisterRecords}
          searchQuery={safetyRegisterSearch}
          setSearchQuery={setSafetyRegisterSearch}
          handleOpenModal={handleOpenSafetyRegisterModal}
          handleDelete={handleDeleteSafetyRegister}
        />
      )}

      {subTab === 'fire' && (
        <FireSafetyTab
          hospital={hospital}
          records={fireSafetyRecords}
          searchQuery={fireSafetySearch}
          setSearchQuery={setFireSafetySearch}
          handleOpenModal={handleOpenFireSafetyModal}
          handleDelete={handleDeleteFireSafety}
        />
      )}
    </div>
  );
};

const ClinicalTab = ({ hospital }) => (
  <PlaceholderSection title="Clinical Monitoring" />
);

const AuditTab = ({ hospital }) => (
  <PlaceholderSection title="Internal Audit" />
);

export default DeluxeWardWorkspace;

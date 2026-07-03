import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  ChevronLeft,
  LayoutDashboard,
  BarChart3,
  Stethoscope,
  Pill,
  Ambulance,
  CheckSquare,
  FileText,
  Plus,
  Edit3,
  Trash2,
  X,
  Search
} from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const TABS = [
  { id: 'dashboard',      label: 'Dashboard',               icon: LayoutDashboard },
  { id: 'quality',        label: 'Quality Indicators',      icon: BarChart3 },
  { id: 'procedure',      label: 'Procedure Management',   icon: Stethoscope },
  { id: 'scope',           label: 'Scope Reprocessing',     icon: Pill },
  { id: 'sedation',        label: 'Sedation Safety',        icon: Ambulance },
  { id: 'radiation',       label: 'Radiation Safety',       icon: CheckSquare },
  { id: 'reports',        label: 'Reports',                 icon: FileText },
];

const LS_KEY_QUALITY = 'endoscopy_quality_indicators';

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const EMPTY_QUALITY_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  totalProcedures: 0,
  endoscopyProcedures: 0,
  colonoscopyProcedures: 0,
  ercpProcedures: 0,
  complicationRate: 0,
  infectionRate: 0,
  consentCompliance: 100,
  reprocessingCompliance: 100,
  patientSatisfaction: 100,
  turnaroundTime: 0,
  status: 'Active',
};

const SAMPLE_QUALITY_INDICATORS = [
  { id: 'eqi-001', month: 'January',  year: 2025, totalProcedures: 185, endoscopyProcedures: 120, colonoscopyProcedures: 50, ercpProcedures: 15, complicationRate: 1.2, infectionRate: 0.3, consentCompliance: 99, reprocessingCompliance: 100, patientSatisfaction: 94, turnaroundTime: 35, status: 'Active' },
  { id: 'eqi-002', month: 'February', year: 2025, totalProcedures: 170, endoscopyProcedures: 110, colonoscopyProcedures: 45, ercpProcedures: 15, complicationRate: 0.8, infectionRate: 0.1, consentCompliance: 98, reprocessingCompliance: 99, patientSatisfaction: 92, turnaroundTime: 38, status: 'Active' },
  { id: 'eqi-003', month: 'March',    year: 2025, totalProcedures: 195, endoscopyProcedures: 130, colonoscopyProcedures: 50, ercpProcedures: 15, complicationRate: 1.5, infectionRate: 0.4, consentCompliance: 100, reprocessingCompliance: 100, patientSatisfaction: 95, turnaroundTime: 32, status: 'Active' },
  { id: 'eqi-004', month: 'April',    year: 2025, totalProcedures: 160, endoscopyProcedures: 105, colonoscopyProcedures: 40, ercpProcedures: 15, complicationRate: 0.5, infectionRate: 0.0, consentCompliance: 97, reprocessingCompliance: 98, patientSatisfaction: 90, turnaroundTime: 40, status: 'Active' },
  { id: 'eqi-005', month: 'May',      year: 2025, totalProcedures: 180, endoscopyProcedures: 115, colonoscopyProcedures: 50, ercpProcedures: 15, complicationRate: 1.0, infectionRate: 0.2, consentCompliance: 99, reprocessingCompliance: 100, patientSatisfaction: 93, turnaroundTime: 36, status: 'Active' },
];

const LS_KEY_PROCEDURE = 'endoscopy_procedure_management';

const EMPTY_PROCEDURE_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  procedureType: 'Diagnostic',
  procedureCount: 0,
  diagnosticProcedures: 0,
  therapeuticProcedures: 0,
  emergencyProcedures: 0,
  successRate: 100,
  averageProcedureTime: 0,
  status: 'Active',
};

const SAMPLE_PROCEDURE_RECORDS = [
  { id: 'epr-001', month: 'January',  year: 2025, procedureType: 'Diagnostic', procedureCount: 45, diagnosticProcedures: 30, therapeuticProcedures: 12, emergencyProcedures: 3, successRate: 98, averageProcedureTime: 25, status: 'Active' },
  { id: 'epr-002', month: 'February', year: 2025, procedureType: 'Therapeutic', procedureCount: 38, diagnosticProcedures: 20, therapeuticProcedures: 15, emergencyProcedures: 3, successRate: 96, averageProcedureTime: 35, status: 'Active' },
  { id: 'epr-003', month: 'March',    year: 2025, procedureType: 'Diagnostic', procedureCount: 50, diagnosticProcedures: 35, therapeuticProcedures: 12, emergencyProcedures: 3, successRate: 99, averageProcedureTime: 22, status: 'Active' },
  { id: 'epr-004', month: 'April',    year: 2025, procedureType: 'Mixed', procedureCount: 42, diagnosticProcedures: 25, therapeuticProcedures: 14, emergencyProcedures: 3, successRate: 97, averageProcedureTime: 30, status: 'Active' },
  { id: 'epr-005', month: 'May',      year: 2025, procedureType: 'Therapeutic', procedureCount: 40, diagnosticProcedures: 18, therapeuticProcedures: 18, emergencyProcedures: 4, successRate: 95, averageProcedureTime: 38, status: 'Active' },
];

const LS_KEY_SCOPE = 'endoscopy_scope_reprocessing';

const EMPTY_REPROCESSING_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  scopeType: 'Gastroscope',
  totalScopesProcessed: 0,
  manualCleaningCompliance: 100,
  leakTestCompliance: 100,
  highLevelDisinfectionCompliance: 100,
  dryingStorageCompliance: 100,
  failedReprocessingCycles: 0,
  status: 'Active',
};

const SAMPLE_REPROCESSING_RECORDS = [
  { id: 'esr-001', month: 'January',  year: 2025, scopeType: 'Gastroscope', totalScopesProcessed: 45, manualCleaningCompliance: 98, leakTestCompliance: 100, highLevelDisinfectionCompliance: 99, dryingStorageCompliance: 100, failedReprocessingCycles: 1, status: 'Active' },
  { id: 'esr-002', month: 'February', year: 2025, scopeType: 'Colonoscope', totalScopesProcessed: 38, manualCleaningCompliance: 97, leakTestCompliance: 98, highLevelDisinfectionCompliance: 100, dryingStorageCompliance: 99, failedReprocessingCycles: 2, status: 'Active' },
  { id: 'esr-003', month: 'March',    year: 2025, scopeType: 'Bronchoscope', totalScopesProcessed: 22, manualCleaningCompliance: 100, leakTestCompliance: 100, highLevelDisinfectionCompliance: 98, dryingStorageCompliance: 100, failedReprocessingCycles: 0, status: 'Active' },
  { id: 'esr-004', month: 'April',    year: 2025, scopeType: 'Gastroscope', totalScopesProcessed: 42, manualCleaningCompliance: 96, leakTestCompliance: 97, highLevelDisinfectionCompliance: 97, dryingStorageCompliance: 98, failedReprocessingCycles: 3, status: 'Active' },
  { id: 'esr-005', month: 'May',      year: 2025, scopeType: 'Colonoscope', totalScopesProcessed: 40, manualCleaningCompliance: 99, leakTestCompliance: 100, highLevelDisinfectionCompliance: 100, dryingStorageCompliance: 100, failedReprocessingCycles: 1, status: 'Active' },
];

const LS_KEY_RADIATION = 'endoscopy_radiation_safety';

const EMPTY_RADIATION_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  ercpProcedures: 0,
  leadApronCompliance: 100,
  thyroidShieldCompliance: 100,
  dosimeterBadgeCompliance: 100,
  averageFluoroscopyTime: 0,
  radiationExposureIncidents: 0,
  status: 'Active',
};

const SAMPLE_RADIATION_RECORDS = [
  { id: 'ers-001', month: 'January',  year: 2025, ercpProcedures: 15, leadApronCompliance: 98, thyroidShieldCompliance: 96, dosimeterBadgeCompliance: 100, averageFluoroscopyTime: 12, radiationExposureIncidents: 0, status: 'Active' },
  { id: 'ers-002', month: 'February', year: 2025, ercpProcedures: 14, leadApronCompliance: 97, thyroidShieldCompliance: 95, dosimeterBadgeCompliance: 99, averageFluoroscopyTime: 14, radiationExposureIncidents: 0, status: 'Active' },
  { id: 'ers-003', month: 'March',    year: 2025, ercpProcedures: 16, leadApronCompliance: 99, thyroidShieldCompliance: 98, dosimeterBadgeCompliance: 100, averageFluoroscopyTime: 11, radiationExposureIncidents: 1, status: 'Active' },
  { id: 'ers-004', month: 'April',    year: 2025, ercpProcedures: 13, leadApronCompliance: 96, thyroidShieldCompliance: 94, dosimeterBadgeCompliance: 98, averageFluoroscopyTime: 15, radiationExposureIncidents: 0, status: 'Active' },
  { id: 'ers-005', month: 'May',      year: 2025, ercpProcedures: 15, leadApronCompliance: 100, thyroidShieldCompliance: 97, dosimeterBadgeCompliance: 100, averageFluoroscopyTime: 10, radiationExposureIncidents: 0, status: 'Active' },
];


const LS_KEY_SEDATION = 'endoscopy_sedation_safety';

const EMPTY_SEDATION_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  sedationType: 'Conscious Sedation',
  totalSedationCases: 0,
  preSedationAssessment: 100,
  intraProcedureMonitoring: 100,
  postSedationRecovery: 100,
  sedationComplications: 0,
  recoveryTime: 0,
  status: 'Active',
};

const SAMPLE_SEDATION_RECORDS = [
  { id: 'ese-001', month: 'January',  year: 2025, sedationType: 'Conscious Sedation', totalSedationCases: 45, preSedationAssessment: 98, intraProcedureMonitoring: 100, postSedationRecovery: 97, sedationComplications: 1, recoveryTime: 45, status: 'Active' },
  { id: 'ese-002', month: 'February', year: 2025, sedationType: 'Deep Sedation', totalSedationCases: 38, preSedationAssessment: 97, intraProcedureMonitoring: 99, postSedationRecovery: 96, sedationComplications: 2, recoveryTime: 60, status: 'Active' },
  { id: 'ese-003', month: 'March',    year: 2025, sedationType: 'Conscious Sedation', totalSedationCases: 50, preSedationAssessment: 99, intraProcedureMonitoring: 100, postSedationRecovery: 98, sedationComplications: 0, recoveryTime: 40, status: 'Active' },
  { id: 'ese-004', month: 'April',    year: 2025, sedationType: 'Moderate Sedation', totalSedationCases: 42, preSedationAssessment: 96, intraProcedureMonitoring: 98, postSedationRecovery: 95, sedationComplications: 1, recoveryTime: 50, status: 'Active' },
  { id: 'ese-005', month: 'May',      year: 2025, sedationType: 'Conscious Sedation', totalSedationCases: 48, preSedationAssessment: 100, intraProcedureMonitoring: 100, postSedationRecovery: 99, sedationComplications: 0, recoveryTime: 42, status: 'Active' },
];

const NumField = ({ label, field, form, setForm, step = '1' }) => (
  <div>
    <label className="block text-[9px] font-medium text-slate-600 mb-1">{label}</label>
    <input
      type="number"
      step={step}
      value={form[field]}
      onChange={(e) => setForm({ ...form, [field]: parseFloat(e.target.value) || 0 })}
      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
    />
  </div>
);

const PlaceholderSection = ({ title }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
    <h3 className="text-sm font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-[10px] text-slate-500">This section will be implemented in the next phase.</p>
  </div>
);

const DashboardTab = ({ hospital }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xs font-extrabold text-slate-800">Endoscopy Dashboard</h3>
        <p className="text-[9px] text-slate-400 mt-0.5">Key performance metrics and quick actions</p>
      </div>
    </div>
    <PlaceholderSection title="KPI Cards Placeholder" />
    <PlaceholderSection title="Charts Placeholder" />
  </div>
);

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

  const totalRecords = qualityIndicators.length;
  const totalProcedures = qualityIndicators.reduce((s, r) => s + (r.totalProcedures || 0), 0);
  const avgComplication = totalRecords ? (qualityIndicators.reduce((s, r) => s + (r.complicationRate || 0), 0) / totalRecords).toFixed(1) : 0;
  const avgConsent = totalRecords ? (qualityIndicators.reduce((s, r) => s + (r.consentCompliance || 0), 0) / totalRecords).toFixed(1) : 0;
  const avgSatisfaction = totalRecords ? (qualityIndicators.reduce((s, r) => s + (r.patientSatisfaction || 0), 0) / totalRecords).toFixed(1) : 0;

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'Total Procs', 'Endoscopy', 'Colonoscopy', 'ERCP',
    'Complication %', 'Infection %', 'Consent %', 'Reprocessing %', 'Satisfaction %', 'TAT (min)', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Quality Indicators</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Endoscopy Department monthly metrics</p>
        </div>
        <button
          onClick={() => handleOpenQualityModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Quality Record
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Procedures', value: totalProcedures, color: 'text-blue-600' },
          { label: 'Avg Complication %', value: `${avgComplication}%`, color: 'text-rose-600' },
          { label: 'Avg Consent %', value: `${avgConsent}%`, color: 'text-amber-600' },
          { label: 'Avg Satisfaction %', value: `${avgSatisfaction}%`, color: 'text-emerald-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

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
                  <td className="px-3 py-3 text-slate-600">{r.totalProcedures}</td>
                  <td className="px-3 py-3 text-slate-600">{r.endoscopyProcedures}</td>
                  <td className="px-3 py-3 text-slate-600">{r.colonoscopyProcedures}</td>
                  <td className="px-3 py-3 text-slate-600">{r.ercpProcedures}</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.complicationRate}%</td>
                  <td className="px-3 py-3 text-orange-600 font-bold">{r.infectionRate}%</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.consentCompliance}%</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.reprocessingCompliance}%</td>
                  <td className="px-3 py-3 text-purple-600 font-bold">{r.patientSatisfaction}%</td>
                  <td className="px-3 py-3 text-slate-600">{r.turnaroundTime}</td>
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
                  <td colSpan={TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">
                    {searchQuery ? 'No records match your search.' : 'No quality records yet. Click "Add Quality Record" to begin.'}
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

const ProcedureTab = ({
  hospital,
  procedureRecords,
  searchQuery,
  setSearchQuery,
  handleOpenProcedureModal,
  handleDeleteProcedure,
}) => {
  const filtered = procedureRecords.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.month.toLowerCase().includes(q) ||
      String(r.year).includes(q) ||
      r.procedureType.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalRecords = procedureRecords.length;
  const totalDiagnostic = procedureRecords.reduce((s, r) => s + (r.diagnosticProcedures || 0), 0);
  const totalTherapeutic = procedureRecords.reduce((s, r) => s + (r.therapeuticProcedures || 0), 0);
  const avgSuccessRate = totalRecords ? (procedureRecords.reduce((s, r) => s + (r.successRate || 0), 0) / totalRecords).toFixed(1) : 0;

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'Procedure Type', 'Procedure Count', 'Diagnostic', 'Therapeutic', 'Emergency', 'Success Rate', 'Avg Procedure Time', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Procedure Management</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Endoscopy Department procedure metrics</p>
        </div>
        <button
          onClick={() => handleOpenProcedureModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Procedure Record
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Procedures', value: totalRecords, color: 'text-blue-600' },
          { label: 'Diagnostic Procedures', value: totalDiagnostic, color: 'text-rose-600' },
          { label: 'Therapeutic Procedures', value: totalTherapeutic, color: 'text-amber-600' },
          { label: 'Success Rate %', value: `${avgSuccessRate}%`, color: 'text-emerald-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by month, year, type, or status…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
        />
      </div>

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
                  <td className="px-3 py-3 text-slate-600">{r.procedureType}</td>
                  <td className="px-3 py-3 text-slate-600">{r.procedureCount}</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.diagnosticProcedures}</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.therapeuticProcedures}</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.emergencyProcedures}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.successRate}%</td>
                  <td className="px-3 py-3 text-slate-600">{r.averageProcedureTime}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Active}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenProcedureModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteProcedure(r.id)}
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
                    {searchQuery ? 'No records match your search.' : 'No procedure records yet. Click "Add Procedure Record" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {procedureRecords.length} record{procedureRecords.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

const ScopeTab = ({
  hospital,
  reprocessingRecords,
  searchQuery,
  setSearchQuery,
  handleOpenReprocessingModal,
  handleDeleteReprocessing,
}) => {
  const filtered = reprocessingRecords.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.month.toLowerCase().includes(q) ||
      String(r.year).includes(q) ||
      r.scopeType.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalRecords = reprocessingRecords.length;
  const totalScopes = reprocessingRecords.reduce((s, r) => s + (r.totalScopesProcessed || 0), 0);
  const avgManualCleaning = totalRecords ? (reprocessingRecords.reduce((s, r) => s + (r.manualCleaningCompliance || 0), 0) / totalRecords).toFixed(1) : 0;
  const avgHLD = totalRecords ? (reprocessingRecords.reduce((s, r) => s + (r.highLevelDisinfectionCompliance || 0), 0) / totalRecords).toFixed(1) : 0;
  const totalFailed = reprocessingRecords.reduce((s, r) => s + (r.failedReprocessingCycles || 0), 0);

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'Scope Type', 'Total Scopes', 'Manual Cleaning', 'Leak Test', 'HLD Compliance', 'Drying & Storage', 'Failed Cycles', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Scope Reprocessing</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Endoscopy Department scope reprocessing metrics</p>
        </div>
        <button
          onClick={() => handleOpenReprocessingModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Reprocessing Record
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Scopes Processed', value: totalScopes, color: 'text-blue-600' },
          { label: 'Manual Cleaning %', value: `${avgManualCleaning}%`, color: 'text-rose-600' },
          { label: 'HLD Compliance %', value: `${avgHLD}%`, color: 'text-amber-600' },
          { label: 'Failed Reprocessing Cycles', value: totalFailed, color: 'text-emerald-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by month, year, scope type, or status…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
        />
      </div>

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
                  <td className="px-3 py-3 text-slate-600">{r.scopeType}</td>
                  <td className="px-3 py-3 text-slate-600">{r.totalScopesProcessed}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.manualCleaningCompliance}%</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.leakTestCompliance}%</td>
                  <td className="px-3 py-3 text-purple-600 font-bold">{r.highLevelDisinfectionCompliance}%</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.dryingStorageCompliance}%</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.failedReprocessingCycles}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Active}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenReprocessingModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteReprocessing(r.id)}
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
                    {searchQuery ? 'No records match your search.' : 'No reprocessing records yet. Click "Add Reprocessing Record" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {reprocessingRecords.length} record{reprocessingRecords.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

const SedationTab = ({
  hospital,
  sedationRecords,
  searchQuery,
  setSearchQuery,
  handleOpenSedationModal,
  handleDeleteSedation,
}) => {
  const filtered = sedationRecords.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.month.toLowerCase().includes(q) ||
      String(r.year).includes(q) ||
      r.sedationType.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalRecords = sedationRecords.length;
  const totalCases = sedationRecords.reduce((s, r) => s + (r.totalSedationCases || 0), 0);
  const avgPreSedation = totalRecords ? (sedationRecords.reduce((s, r) => s + (r.preSedationAssessment || 0), 0) / totalRecords).toFixed(1) : 0;
  const avgRecovery = totalRecords ? (sedationRecords.reduce((s, r) => s + (r.postSedationRecovery || 0), 0) / totalRecords).toFixed(1) : 0;
  const totalComplications = sedationRecords.reduce((s, r) => s + (r.sedationComplications || 0), 0);

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'Sedation Type', 'Total Cases', 'Pre-Sedation', 'Monitoring', 'Recovery', 'Complications', 'Recovery Time', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Sedation Safety</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Endoscopy Department sedation safety metrics</p>
        </div>
        <button
          onClick={() => handleOpenSedationModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Sedation Record
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Sedation Cases', value: totalCases, color: 'text-blue-600' },
          { label: 'Pre-Sedation %', value: `${avgPreSedation}%`, color: 'text-rose-600' },
          { label: 'Post-Sedation Recovery %', value: `${avgRecovery}%`, color: 'text-amber-600' },
          { label: 'Sedation Complications', value: totalComplications, color: 'text-emerald-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by month, year, type, or status…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
        />
      </div>

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
                  <td className="px-3 py-3 text-slate-600">{r.sedationType}</td>
                  <td className="px-3 py-3 text-slate-600">{r.totalSedationCases}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.preSedationAssessment}%</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.intraProcedureMonitoring}%</td>
                  <td className="px-3 py-3 text-purple-600 font-bold">{r.postSedationRecovery}%</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.sedationComplications}</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.recoveryTime} min</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Active}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenSedationModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteSedation(r.id)}
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
                    {searchQuery ? 'No records match your search.' : 'No sedation records yet. Click "Add Sedation Record" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {sedationRecords.length} record{sedationRecords.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

const RadiationTab = ({
  hospital,
  radiationRecords,
  searchQuery,
  setSearchQuery,
  handleOpenRadiationModal,
  handleDeleteRadiation,
}) => {
  const filtered = radiationRecords.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.month.toLowerCase().includes(q) ||
      String(r.year).includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalRecords = radiationRecords.length;
  const totalERCP = radiationRecords.reduce((s, r) => s + (r.ercpProcedures || 0), 0);
  const avgLeadApron = totalRecords ? (radiationRecords.reduce((s, r) => s + (r.leadApronCompliance || 0), 0) / totalRecords).toFixed(1) : 0;
  const avgDosimeter = totalRecords ? (radiationRecords.reduce((s, r) => s + (r.dosimeterBadgeCompliance || 0), 0) / totalRecords).toFixed(1) : 0;
  const totalIncidents = radiationRecords.reduce((s, r) => s + (r.radiationExposureIncidents || 0), 0);

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'ERCP Procedures', 'Lead Apron', 'Thyroid Shield',
    'Dosimeter Badge', 'Fluoroscopy Time', 'Radiation Incidents', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Radiation Safety (ERCP)</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Endoscopy Department ERCP radiation safety metrics</p>
        </div>
        <button
          onClick={() => handleOpenRadiationModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Radiation Record
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total ERCP Procedures', value: totalERCP, color: 'text-blue-600' },
          { label: 'Lead Apron %', value: `${avgLeadApron}%`, color: 'text-rose-600' },
          { label: 'Dosimeter Badge %', value: `${avgDosimeter}%`, color: 'text-amber-600' },
          { label: 'Radiation Incidents', value: totalIncidents, color: 'text-emerald-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

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
                  <td className="px-3 py-3 text-slate-600">{r.ercpProcedures}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.leadApronCompliance}%</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.thyroidShieldCompliance}%</td>
                  <td className="px-3 py-3 text-purple-600 font-bold">{r.dosimeterBadgeCompliance}%</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.averageFluoroscopyTime} min</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.radiationExposureIncidents}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Active}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenRadiationModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteRadiation(r.id)}
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
                    {searchQuery ? 'No records match your search.' : 'No radiation records yet. Click "Add Radiation Record" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {radiationRecords.length} record{radiationRecords.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

const ReportsTab = ({
  hospital,
  qualityIndicators,
  procedureRecords,
  reprocessingRecords,
  sedationRecords,
  radiationRecords,
}) => {
  const handleExportCSV = () => {
    alert('Export CSV functionality will be implemented here.');
  };

  const handleExportPDF = () => {
    alert('Export PDF functionality will be implemented here.');
  };

  const handlePrintReport = () => {
    alert('Print Report functionality will be implemented here.');
  };

  const totalQuality = qualityIndicators.length;
  const totalProcedure = procedureRecords.length;
  const totalReprocessing = reprocessingRecords.length;
  const totalSedation = sedationRecords.length;
  const totalRadiation = radiationRecords.length;
  const avgComplication = totalQuality ? (qualityIndicators.reduce((s, r) => s + (r.complicationRate || 0), 0) / totalQuality).toFixed(1) : 0;
  const avgReprocessingCompliance = totalReprocessing ? (reprocessingRecords.reduce((s, r) => s + (r.highLevelDisinfectionCompliance || 0), 0) / totalReprocessing).toFixed(1) : 0;
  const avgPatientSatisfaction = totalQuality ? (qualityIndicators.reduce((s, r) => s + (r.patientSatisfaction || 0), 0) / totalQuality).toFixed(1) : 0;

  const procedureTrendData = MONTHS.map((month) => {
    const record = procedureRecords.find((r) => r.month === month);
    return { month, procedures: record ? record.procedureCount : 0 };
  }).filter((d) => d.procedures > 0 || procedureRecords.some((r) => r.month === d.month));

  const procedureTypeData = [
    { name: 'Diagnostic', value: procedureRecords.reduce((s, r) => s + (r.diagnosticProcedures || 0), 0), color: '#3b82f6' },
    { name: 'Therapeutic', value: procedureRecords.reduce((s, r) => s + (r.therapeuticProcedures || 0), 0), color: '#10b981' },
    { name: 'Emergency', value: procedureRecords.reduce((s, r) => s + (r.emergencyProcedures || 0), 0), color: '#ef4444' },
  ].filter((d) => d.value > 0);

  const reprocessingComplianceData = MONTHS.map((month) => {
    const record = reprocessingRecords.find((r) => r.month === month);
    return { month, compliance: record ? record.highLevelDisinfectionCompliance : 0 };
  }).filter((d) => d.compliance > 0 || reprocessingRecords.some((r) => r.month === d.month));

  const sedationComplianceData = MONTHS.map((month) => {
    const record = sedationRecords.find((r) => r.month === month);
    return { month, compliance: record ? record.postSedationRecovery : 0 };
  }).filter((d) => d.compliance > 0 || sedationRecords.some((r) => r.month === d.month));

  const radiationComplianceData = radiationRecords.map((r) => ({
    month: r.month,
    compliance: r.leadApronCompliance,
  }));

  const monthlySummaryData = MONTHS.map((month) => {
    const quality = qualityIndicators.find((r) => r.month === month);
    const procedure = procedureRecords.find((r) => r.month === month);
    const reprocessing = reprocessingRecords.find((r) => r.month === month);
    const sedation = sedationRecords.find((r) => r.month === month);
    const radiation = radiationRecords.find((r) => r.month === month);
    return {
      month,
      totalProcedures: procedure ? procedure.procedureCount : '-',
      complicationRate: quality ? `${quality.complicationRate}%` : '-',
      reprocessingCompliance: reprocessing ? `${reprocessing.highLevelDisinfectionCompliance}%` : '-',
      sedationCompliance: sedation ? `${sedation.postSedationRecovery}%` : '-',
      radiationCompliance: radiation ? `${radiation.leadApronCompliance}%` : '-',
      patientSatisfaction: quality ? `${quality.patientSatisfaction}%` : '-',
      status: quality ? quality.status : (procedure ? procedure.status : '-'),
    };
  }).filter((d) => {
    return qualityIndicators.some((r) => r.month === d.month) ||
      procedureRecords.some((r) => r.month === d.month) ||
      reprocessingRecords.some((r) => r.month === d.month) ||
      sedationRecords.some((r) => r.month === d.month) ||
      radiationRecords.some((r) => r.month === d.month);
  });

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Reports &amp; Analytics</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Endoscopy Department consolidated analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
          >
            Export CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
          >
            Export PDF
          </button>
          <button
            onClick={handlePrintReport}
            style={{ backgroundColor: hospital.themeColor }}
            className="px-3 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
          >
            Print Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Quality Records', value: totalQuality, color: 'text-blue-600' },
          { label: 'Total Procedure Records', value: totalProcedure, color: 'text-rose-600' },
          { label: 'Total Reprocessing Records', value: totalReprocessing, color: 'text-amber-600' },
          { label: 'Total Sedation Records', value: totalSedation, color: 'text-emerald-600' },
          { label: 'Total Radiation Records', value: totalRadiation, color: 'text-purple-600' },
          { label: 'Average Complication Rate %', value: `${avgComplication}%`, color: 'text-cyan-600' },
          { label: 'Avg Reprocessing Compliance %', value: `${avgReprocessingCompliance}%`, color: 'text-orange-600' },
          { label: 'Avg Patient Satisfaction %', value: `${avgPatientSatisfaction}%`, color: 'text-lime-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h4 className="text-xs font-extrabold text-slate-800 mb-4">Monthly Procedure Trend</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={procedureTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="procedures" stroke="#3b82f6" name="Total Procedures" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h4 className="text-xs font-extrabold text-slate-800 mb-4">Procedure Type Distribution</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={procedureTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {procedureTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
             <h4 className="text-xs font-extrabold text-slate-800 mb-4">Reprocessing Compliance</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reprocessingComplianceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="compliance" fill="#10b981" name="HLD Compliance %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h4 className="text-xs font-extrabold text-slate-800 mb-4">Sedation Compliance Trend</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sedationComplianceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="compliance" stroke="#f59e0b" name="Post-Sedation Recovery %" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h4 className="text-xs font-extrabold text-slate-800 mb-4">Radiation Safety Compliance</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={radiationComplianceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="compliance" fill="#8b5cf6" name="Lead Apron %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h4 className="text-xs font-extrabold text-slate-800 mb-4">Monthly Endoscopy Summary</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySummaryData.map((d) => ({
                ...d,
                complicationRate: typeof d.complicationRate === 'string' ? parseFloat(d.complicationRate) || 0 : 0,
                patientSatisfaction: typeof d.patientSatisfaction === 'string' ? parseFloat(d.patientSatisfaction) || 0 : 0,
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalProcedures" stroke="#3b82f6" name="Total Procedures" strokeWidth={2} />
                <Line type="monotone" dataKey="complicationRate" stroke="#ef4444" name="Complication Rate %" strokeWidth={2} />
                <Line type="monotone" dataKey="patientSatisfaction" stroke="#10b981" name="Patient Satisfaction %" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h4 className="text-xs font-extrabold text-slate-800">Monthly Summary</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Month</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Total Procedures</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Complication Rate</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Reprocessing Compliance</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Sedation Compliance</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Radiation Compliance</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Patient Satisfaction</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {monthlySummaryData.map((row) => (
                  <tr key={row.month} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-semibold text-slate-700 whitespace-nowrap">{row.month}</td>
                    <td className="px-3 py-3 text-slate-600">{row.totalProcedures}</td>
                    <td className="px-3 py-3 text-rose-600 font-bold">{row.complicationRate}</td>
                    <td className="px-3 py-3 text-emerald-600 font-bold">{row.reprocessingCompliance}</td>
                    <td className="px-3 py-3 text-amber-600 font-bold">{row.sedationCompliance}</td>
                    <td className="px-3 py-3 text-blue-600 font-bold">{row.radiationCompliance}</td>
                    <td className="px-3 py-3 text-purple-600 font-bold">{row.patientSatisfaction}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[row.status] || STATUS_BADGE.Active}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {monthlySummaryData.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-3 py-10 text-center text-[10px] text-slate-400">
                      No data available for monthly summary.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const EndoscopyWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();
  const [activeTab, setActiveTab] = useState('dashboard');

  const [qualityIndicators, setQualityIndicators] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_QUALITY);
    return saved ? JSON.parse(saved) : SAMPLE_QUALITY_INDICATORS;
  });
  const [isQualityModalOpen, setIsQualityModalOpen] = useState(false);
  const [editingQualityId, setEditingQualityId] = useState(null);
  const [qualityForm, setQualityForm] = useState({ ...EMPTY_QUALITY_FORM });
  const [qualitySearch, setQualitySearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_QUALITY, JSON.stringify(qualityIndicators));
  }, [qualityIndicators]);

  const getNextQualityId = () => {
    const maxNum = qualityIndicators.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `eqi-${String(maxNum + 1).padStart(3, '0')}`;
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

  /* ── Procedure Management state ── */
  const [procedureRecords, setProcedureRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_PROCEDURE);
    return saved ? JSON.parse(saved) : SAMPLE_PROCEDURE_RECORDS;
  });
  const [isProcedureModalOpen, setIsProcedureModalOpen] = useState(false);
  const [editingProcedureId, setEditingProcedureId] = useState(null);
  const [procedureForm, setProcedureForm] = useState({ ...EMPTY_PROCEDURE_FORM });
  const [procedureSearch, setProcedureSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_PROCEDURE, JSON.stringify(procedureRecords));
  }, [procedureRecords]);

  const getNextProcedureId = () => {
    const maxNum = procedureRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `epr-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenProcedureModal = (record = null) => {
    if (record) {
      setProcedureForm({ ...record });
      setEditingProcedureId(record.id);
    } else {
      setProcedureForm({ ...EMPTY_PROCEDURE_FORM, id: getNextProcedureId() });
      setEditingProcedureId(null);
    }
    setIsProcedureModalOpen(true);
  };

  const handleSaveProcedure = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingProcedureId) {
      setProcedureRecords((prev) =>
        prev.map((r) => (r.id === editingProcedureId ? { ...procedureForm, id: editingProcedureId } : r))
      );
    } else {
      setProcedureRecords((prev) => [...prev, { ...procedureForm }]);
    }
    setIsProcedureModalOpen(false);
    setEditingProcedureId(null);
  };

  const handleDeleteProcedure = (id) => {
    if (window.confirm('Delete this procedure record?')) {
      setProcedureRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  /* ── Scope Reprocessing state ── */
  const [reprocessingRecords, setReprocessingRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_SCOPE);
    return saved ? JSON.parse(saved) : SAMPLE_REPROCESSING_RECORDS;
  });
  const [isReprocessingModalOpen, setIsReprocessingModalOpen] = useState(false);
  const [editingReprocessingId, setEditingReprocessingId] = useState(null);
  const [reprocessingForm, setReprocessingForm] = useState({ ...EMPTY_REPROCESSING_FORM });
  const [reprocessingSearch, setReprocessingSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_SCOPE, JSON.stringify(reprocessingRecords));
  }, [reprocessingRecords]);

  const getNextReprocessingId = () => {
    const maxNum = reprocessingRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `esr-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenReprocessingModal = (record = null) => {
    if (record) {
      setReprocessingForm({ ...record });
      setEditingReprocessingId(record.id);
    } else {
      setReprocessingForm({ ...EMPTY_REPROCESSING_FORM, id: getNextReprocessingId() });
      setEditingReprocessingId(null);
    }
    setIsReprocessingModalOpen(true);
  };

  const handleSaveReprocessing = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingReprocessingId) {
      setReprocessingRecords((prev) =>
        prev.map((r) => (r.id === editingReprocessingId ? { ...reprocessingForm, id: editingReprocessingId } : r))
      );
    } else {
      setReprocessingRecords((prev) => [...prev, { ...reprocessingForm }]);
    }
    setIsReprocessingModalOpen(false);
    setEditingReprocessingId(null);
  };

  const handleDeleteReprocessing = (id) => {
    if (window.confirm('Delete this reprocessing record?')) {
      setReprocessingRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  /* ── Sedation Safety state ── */
  const [sedationRecords, setSedationRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_SEDATION);
    return saved ? JSON.parse(saved) : SAMPLE_SEDATION_RECORDS;
  });
  const [isSedationModalOpen, setIsSedationModalOpen] = useState(false);
  const [editingSedationId, setEditingSedationId] = useState(null);
  const [sedationForm, setSedationForm] = useState({ ...EMPTY_SEDATION_FORM });
  const [sedationSearch, setSedationSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_SEDATION, JSON.stringify(sedationRecords));
  }, [sedationRecords]);

  const getNextSedationId = () => {
    const maxNum = sedationRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `ese-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenSedationModal = (record = null) => {
    if (record) {
      setSedationForm({ ...record });
      setEditingSedationId(record.id);
    } else {
      setSedationForm({ ...EMPTY_SEDATION_FORM, id: getNextSedationId() });
      setEditingSedationId(null);
    }
    setIsSedationModalOpen(true);
  };

  const handleSaveSedation = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingSedationId) {
      setSedationRecords((prev) =>
        prev.map((r) => (r.id === editingSedationId ? { ...sedationForm, id: editingSedationId } : r))
      );
    } else {
      setSedationRecords((prev) => [...prev, { ...sedationForm }]);
    }
    setIsSedationModalOpen(false);
    setEditingSedationId(null);
  };

  const handleDeleteSedation = (id) => {
    if (window.confirm('Delete this sedation record?')) {
      setSedationRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  /* ── Radiation Safety state ── */
  const [radiationRecords, setRadiationRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_RADIATION);
    return saved ? JSON.parse(saved) : SAMPLE_RADIATION_RECORDS;
  });
  const [isRadiationModalOpen, setIsRadiationModalOpen] = useState(false);
  const [editingRadiationId, setEditingRadiationId] = useState(null);
  const [radiationForm, setRadiationForm] = useState({ ...EMPTY_RADIATION_FORM });
  const [radiationSearch, setRadiationSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_RADIATION, JSON.stringify(radiationRecords));
  }, [radiationRecords]);

  const getNextRadiationId = () => {
    const maxNum = radiationRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `ers-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenRadiationModal = (record = null) => {
    if (record) {
      setRadiationForm({ ...record });
      setEditingRadiationId(record.id);
    } else {
      setRadiationForm({ ...EMPTY_RADIATION_FORM, id: getNextRadiationId() });
      setEditingRadiationId(null);
    }
    setIsRadiationModalOpen(true);
  };

  const handleSaveRadiation = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingRadiationId) {
      setRadiationRecords((prev) =>
        prev.map((r) => (r.id === editingRadiationId ? { ...radiationForm, id: editingRadiationId } : r))
      );
    } else {
      setRadiationRecords((prev) => [...prev, { ...radiationForm }]);
    }
    setIsRadiationModalOpen(false);
    setEditingRadiationId(null);
  };

  const handleDeleteRadiation = (id) => {
    if (window.confirm('Delete this radiation record?')) {
      setRadiationRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

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
      case 'procedure':
        return (
          <ProcedureTab
            hospital={hospital}
            procedureRecords={procedureRecords}
            searchQuery={procedureSearch}
            setSearchQuery={setProcedureSearch}
            handleOpenProcedureModal={handleOpenProcedureModal}
            handleDeleteProcedure={handleDeleteProcedure}
          />
        );
  case 'scope':
    return (
      <ScopeTab
        hospital={hospital}
        reprocessingRecords={reprocessingRecords}
        searchQuery={reprocessingSearch}
        setSearchQuery={setReprocessingSearch}
        handleOpenReprocessingModal={handleOpenReprocessingModal}
        handleDeleteReprocessing={handleDeleteReprocessing}
      />
    );
      case 'sedation':
        return (
          <SedationTab
            hospital={hospital}
            sedationRecords={sedationRecords}
            searchQuery={sedationSearch}
            setSearchQuery={setSedationSearch}
            handleOpenSedationModal={handleOpenSedationModal}
            handleDeleteSedation={handleDeleteSedation}
          />
        );
      case 'radiation':
        return (
          <RadiationTab
            hospital={hospital}
            radiationRecords={radiationRecords}
            searchQuery={radiationSearch}
            setSearchQuery={setRadiationSearch}
            handleOpenRadiationModal={handleOpenRadiationModal}
            handleDeleteRadiation={handleDeleteRadiation}
          />
        );
      case 'reports':
        return (
          <ReportsTab
            hospital={hospital}
            qualityIndicators={qualityIndicators}
            procedureRecords={procedureRecords}
            reprocessingRecords={reprocessingRecords}
            sedationRecords={sedationRecords}
            radiationRecords={radiationRecords}
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
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">Endoscopy Department</h2>
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
            Endoscopy Dept — NABH Module
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
          <div className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingQualityId ? 'Edit Quality Indicator Record' : 'Add Monthly Quality Data'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Endoscopy Department — Quality Metrics</p>
              </div>
              <button
                onClick={() => { setIsQualityModalOpen(false); setEditingQualityId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveQuality} className="space-y-5">
              {/* Reporting Period */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period</p>
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

              {/* Procedure Volume */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Procedure Volume</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Total Procedures" field="totalProcedures" form={qualityForm} setForm={setQualityForm} />
                  <NumField label="Endoscopy Procedures" field="endoscopyProcedures" form={qualityForm} setForm={setQualityForm} />
                  <NumField label="Colonoscopy Procedures" field="colonoscopyProcedures" form={qualityForm} setForm={setQualityForm} />
                  <NumField label="ERCP Procedures" field="ercpProcedures" form={qualityForm} setForm={setQualityForm} />
                </div>
              </div>

              {/* Quality & Safety */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Quality &amp; Safety</p>
                <div className="grid grid-cols-3 gap-3">
                  <NumField label="Complication Rate %" field="complicationRate" form={qualityForm} setForm={setQualityForm} step="0.1" />
                  <NumField label="Infection Rate %" field="infectionRate" form={qualityForm} setForm={setQualityForm} step="0.1" />
                  <NumField label="Turnaround Time (min)" field="turnaroundTime" form={qualityForm} setForm={setQualityForm} />
                </div>
              </div>

              {/* Compliance & Satisfaction */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Compliance &amp; Satisfaction</p>
                <div className="grid grid-cols-3 gap-3">
                  <NumField label="Consent Compliance %" field="consentCompliance" form={qualityForm} setForm={setQualityForm} step="0.1" />
                  <NumField label="Reprocessing Compliance %" field="reprocessingCompliance" form={qualityForm} setForm={setQualityForm} step="0.1" />
                  <NumField label="Patient Satisfaction %" field="patientSatisfaction" form={qualityForm} setForm={setQualityForm} step="0.1" />
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Status</p>
                <div className="grid grid-cols-1 gap-3">
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
      {/* ── Procedure Management Modal ── */}
      {isProcedureModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingProcedureId ? 'Edit Procedure Record' : 'Add Monthly Procedure Data'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Endoscopy Department — Procedure Management</p>
              </div>
              <button
                onClick={() => { setIsProcedureModalOpen(false); setEditingProcedureId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveProcedure} className="space-y-5">
              {/* Reporting Period & Type */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period &amp; Type</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                    <select
                      value={procedureForm.month}
                      onChange={(e) => setProcedureForm({ ...procedureForm, month: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                    <input
                      type="number"
                      value={procedureForm.year}
                      onChange={(e) => setProcedureForm({ ...procedureForm, year: parseInt(e.target.value) || 2025 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Procedure Type *</label>
                    <select
                      value={procedureForm.procedureType}
                      onChange={(e) => setProcedureForm({ ...procedureForm, procedureType: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Diagnostic">Diagnostic</option>
                      <option value="Therapeutic">Therapeutic</option>
                      <option value="Mixed">Mixed</option>
                      <option value="Emergency">Emergency</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Procedure Counts */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Procedure Counts</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Procedure Count" field="procedureCount" form={procedureForm} setForm={setProcedureForm} />
                  <NumField label="Diagnostic Procedures" field="diagnosticProcedures" form={procedureForm} setForm={setProcedureForm} />
                  <NumField label="Therapeutic Procedures" field="therapeuticProcedures" form={procedureForm} setForm={setProcedureForm} />
                  <NumField label="Emergency Procedures" field="emergencyProcedures" form={procedureForm} setForm={setProcedureForm} />
                </div>
              </div>

              {/* Outcomes */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Outcomes</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Success Rate %" field="successRate" form={procedureForm} setForm={setProcedureForm} step="0.1" />
                  <NumField label="Average Procedure Time (min)" field="averageProcedureTime" form={procedureForm} setForm={setProcedureForm} />
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Status</p>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select
                      value={procedureForm.status}
                      onChange={(e) => setProcedureForm({ ...procedureForm, status: e.target.value })}
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
                  onClick={() => { setIsProcedureModalOpen(false); setEditingProcedureId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingProcedureId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ── Scope Reprocessing Modal ── */}
      {isReprocessingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingReprocessingId ? 'Edit Reprocessing Record' : 'Add Monthly Reprocessing Data'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Endoscopy Department — Scope Reprocessing</p>
              </div>
              <button
                onClick={() => { setIsReprocessingModalOpen(false); setEditingReprocessingId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveReprocessing} className="space-y-5">
              {/* Reporting Period */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                    <select
                      value={reprocessingForm.month}
                      onChange={(e) => setReprocessingForm({ ...reprocessingForm, month: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                    <input
                      type="number"
                      value={reprocessingForm.year}
                      onChange={(e) => setReprocessingForm({ ...reprocessingForm, year: parseInt(e.target.value) || 2025 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Failed Reprocessing Cycles</label>
                    <input
                      type="number"
                      value={reprocessingForm.failedReprocessingCycles}
                      onChange={(e) => setReprocessingForm({ ...reprocessingForm, failedReprocessingCycles: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Compliance Metrics */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Compliance & Availability</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Manual Cleaning %" field="manualCleaningCompliance" form={reprocessingForm} setForm={setReprocessingForm} step="0.1" />
                  <NumField label="Leak Test %" field="leakTestCompliance" form={reprocessingForm} setForm={setReprocessingForm} step="0.1" />
                </div>
              </div>

              {/* Drug Checks & Errors */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Drug Checks &amp; Errors</p>
                <div className="grid grid-cols-3 gap-3">
                  <NumField label="High-Level Disinfection %" field="highLevelDisinfectionCompliance" form={reprocessingForm} setForm={setReprocessingForm} />
                  <NumField label="Drying & Storage %" field="dryingStorageCompliance" form={reprocessingForm} setForm={setReprocessingForm} />
                  <NumField label="Failed Cycles" field="totalScopesProcessed" form={reprocessingForm} setForm={setReprocessingForm} />
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Status</p>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select
                      value={reprocessingForm.status}
                      onChange={(e) => setReprocessingForm({ ...reprocessingForm, status: e.target.value })}
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
                  onClick={() => { setIsReprocessingModalOpen(false); setEditingReprocessingId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingReprocessingId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ── Ambulance Modal ── */}
      {isSedationModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingSedationId ? 'Edit Sedation Record' : 'Add Sedation Record'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Endoscopy Department — Sedation Safety</p>
              </div>
              <button
                onClick={() => { setIsSedationModalOpen(false); setEditingSedationId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveSedation} className="space-y-5">
              {/* Reporting Period & Sedation Type */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period &amp; Sedation Type</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                    <select
                      value={sedationForm.month}
                      onChange={(e) => setSedationForm({ ...sedationForm, month: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                    <input
                      type="number"
                      value={sedationForm.year}
                      onChange={(e) => setSedationForm({ ...sedationForm, year: parseInt(e.target.value) || 2025 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Sedation Type *</label>
                    <select
                      value={sedationForm.sedationType}
                      onChange={(e) => setSedationForm({ ...sedationForm, sedationType: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Conscious Sedation">Conscious Sedation</option>
                      <option value="Deep Sedation">Deep Sedation</option>
                      <option value="Moderate Sedation">Moderate Sedation</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Sedation Metrics */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Sedation Metrics</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Total Sedation Cases" field="totalSedationCases" form={sedationForm} setForm={setSedationForm} />
                  <NumField label="Sedation Complications" field="sedationComplications" form={sedationForm} setForm={setSedationForm} />
                  <NumField label="Recovery Time (min)" field="recoveryTime" form={sedationForm} setForm={setSedationForm} />
                </div>
              </div>

              {/* Compliance */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Compliance</p>
                <div className="grid grid-cols-3 gap-3">
                  <NumField label="Pre-Sedation Assessment %" field="preSedationAssessment" form={sedationForm} setForm={setSedationForm} step="0.1" />
                  <NumField label="Intra-Procedure Monitoring %" field="intraProcedureMonitoring" form={sedationForm} setForm={setSedationForm} step="0.1" />
                  <NumField label="Post-Sedation Recovery %" field="postSedationRecovery" form={sedationForm} setForm={setSedationForm} step="0.1" />
                </div>
              </div>
               {/* Status */}
               <div>
                 <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Status</p>
                 <div className="grid grid-cols-1 gap-3">
                   <div>
                     <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                     <select
                       value={sedationForm.status}
                       onChange={(e) => setSedationForm({ ...sedationForm, status: e.target.value })}
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
                  onClick={() => { setIsSedationModalOpen(false); setEditingSedationId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingSedationId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ── Audit Checklist Modal ── */}
      {isRadiationModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingRadiationId ? 'Edit Radiation Record' : 'Add Radiation Record'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Endoscopy Department — Radiation Safety (ERCP)</p>
              </div>
              <button
                onClick={() => { setIsRadiationModalOpen(false); setEditingRadiationId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveRadiation} className="space-y-5">
              {/* Reporting Period & ERCP Procedures */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                    <select
                      value={radiationForm.month}
                      onChange={(e) => setRadiationForm({ ...radiationForm, month: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                    <input
                      type="number"
                      value={radiationForm.year}
                      onChange={(e) => setRadiationForm({ ...radiationForm, year: parseInt(e.target.value) || 2025 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">ERCP Procedures</label>
                    <input
                      type="text"
                      value={radiationForm.ercpProcedures}
                      onChange={(e) => setRadiationForm({ ...radiationForm, ercpProcedures: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="e.g. Triage Area"
                    />
                  </div>
                </div>
              </div>

              {/* Compliance & Lead Apron Compliance */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Compliance & Lead Apron Compliance</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Radiation Exposure Incidents" field="radiationExposureIncidents" form={radiationForm} setForm={setRadiationForm} step="0.1" />
                  <NumField label="Lead Apron Compliance" field="leadApronCompliance" form={radiationForm} setForm={setRadiationForm} />
                </div>
              </div>

              {/* Details */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Audit Details</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Thyroid Shield Compliance</label>
                    <input
                      type="text"
                      value={radiationForm.thyroidShieldCompliance}
                      onChange={(e) => setRadiationForm({ ...radiationForm, thyroidShieldCompliance: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="Describe corrective action taken"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Dosimeter Badge Compliance</label>
                    <input
                      type="text"
                      value={radiationForm.dosimeterBadgeCompliance}
                      onChange={(e) => setRadiationForm({ ...radiationForm, dosimeterBadgeCompliance: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="Dosimeter Badge Compliance name"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Average Fluoroscopy Time</label>
                    <input
                      type="number"
                      value={radiationForm.averageFluoroscopyTime}
                      onChange={(e) => setRadiationForm({ ...radiationForm, averageFluoroscopyTime: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Status</p>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select
                      value={radiationForm.status}
                      onChange={(e) => setRadiationForm({ ...radiationForm, status: e.target.value })}
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
                  onClick={() => { setIsRadiationModalOpen(false); setEditingRadiationId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingRadiationId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EndoscopyWorkspace;

import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  ChevronLeft,
  LayoutDashboard,
  BarChart3,
  Scissors,
  Wrench,
  ShieldCheck,
  ClipboardCheck,
  FileText,
  Plus,
  Edit3,
  Trash2,
  X,
  Search,
  Download,
  FileDown,
  Printer,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'quality', label: 'Quality Indicators', icon: BarChart3 },
  { id: 'procedure', label: 'Surgical Procedures', icon: Scissors },
  { id: 'equipment', label: 'Equipment & OT Readiness', icon: Wrench },
  { id: 'infection', label: 'Infection Control & Sterilization', icon: ShieldCheck },
  { id: 'audit', label: 'OT Audit Checklist', icon: ClipboardCheck },
  { id: 'reports', label: 'Reports', icon: FileText },
];

const LS_KEY_QUALITY = 'ot_quality_indicators';

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const EMPTY_QUALITY_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  totalSurgeries: 0,
  ssiRate: 0,
  whoChecklistCompliance: 100,
  onTimeSurgeryStart: 100,
  cancellationRate: 0,
  mortalityRate: 0,
  patientSatisfaction: 100,
  status: 'Active',
};

const SAMPLE_QUALITY_INDICATORS = [
  { id: 'otq-001', month: 'January',  year: 2025, totalSurgeries: 120, ssiRate: 2.1, whoChecklistCompliance: 96, onTimeSurgeryStart: 88, cancellationRate: 3.2, mortalityRate: 0.5, patientSatisfaction: 94, status: 'Active' },
  { id: 'otq-002', month: 'February', year: 2025, totalSurgeries: 115, ssiRate: 1.8, whoChecklistCompliance: 98, onTimeSurgeryStart: 90, cancellationRate: 2.8, mortalityRate: 0.3, patientSatisfaction: 92, status: 'Active' },
  { id: 'otq-003', month: 'March',    year: 2025, totalSurgeries: 130, ssiRate: 2.5, whoChecklistCompliance: 95, onTimeSurgeryStart: 85, cancellationRate: 4.1, mortalityRate: 0.7, patientSatisfaction: 95, status: 'Active' },
  { id: 'otq-004', month: 'April',    year: 2025, totalSurgeries: 125, ssiRate: 1.5, whoChecklistCompliance: 97, onTimeSurgeryStart: 92, cancellationRate: 2.5, mortalityRate: 0.4, patientSatisfaction: 93, status: 'Active' },
  { id: 'otq-005', month: 'May',      year: 2025, totalSurgeries: 135, ssiRate: 1.9, whoChecklistCompliance: 99, onTimeSurgeryStart: 94, cancellationRate: 2.2, mortalityRate: 0.6, patientSatisfaction: 96, status: 'Active' },
];

const LS_KEY_PROCEDURE = 'ot_surgical_procedures';

const EMPTY_PROCEDURE_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  surgeryType: 'General',
  totalSurgeries: 0,
  electiveSurgeries: 0,
  emergencySurgeries: 0,
  averageSurgeryDuration: 0,
  averageOtturnaroundTime: 0,
  surgicalSuccessRate: 100,
  status: 'Active',
};

const SAMPLE_PROCEDURE_RECORDS = [
  { id: 'otsp-001', month: 'January',  year: 2025, surgeryType: 'General', totalSurgeries: 45, electiveSurgeries: 35, emergencySurgeries: 10, averageSurgeryDuration: 120, averageOtturnaroundTime: 45, surgicalSuccessRate: 98, status: 'Active' },
  { id: 'otsp-002', month: 'February', year: 2025, surgeryType: 'Orthopedic', totalSurgeries: 40, electiveSurgeries: 30, emergencySurgeries: 10, averageSurgeryDuration: 150, averageOtturnaroundTime: 50, surgicalSuccessRate: 96, status: 'Active' },
  { id: 'otsp-003', month: 'March',    year: 2025, surgeryType: 'Cardiac', totalSurgeries: 50, electiveSurgeries: 30, emergencySurgeries: 20, averageSurgeryDuration: 180, averageOtturnaroundTime: 55, surgicalSuccessRate: 99, status: 'Active' },
  { id: 'otsp-004', month: 'April',    year: 2025, surgeryType: 'Neuro', totalSurgeries: 35, electiveSurgeries: 25, emergencySurgeries: 10, averageSurgeryDuration: 165, averageOtturnaroundTime: 60, surgicalSuccessRate: 97, status: 'Active' },
  { id: 'otsp-005', month: 'May',      year: 2025, surgeryType: 'General', totalSurgeries: 48, electiveSurgeries: 32, emergencySurgeries: 16, averageSurgeryDuration: 130, averageOtturnaroundTime: 48, surgicalSuccessRate: 98, status: 'Active' },
];

const LS_KEY_EQUIPMENT = 'ot_equipment_readiness';

const EMPTY_EQUIPMENT_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  equipmentName: '',
  equipmentCategory: 'Anaesthesia',
  preventiveMaintenanceStatus: 'Up-to-date',
  calibrationStatus: 'Calibrated',
  breakdownCount: 0,
  downtime: 0,
  lastServiceDate: '',
  nextServiceDate: '',
  status: 'Active',
};

const SAMPLE_EQUIPMENT_RECORDS = [
  { id: 'ote-001', month: 'January',  year: 2025, equipmentName: 'Anaesthesia Workstation', equipmentCategory: 'Anaesthesia', preventiveMaintenanceStatus: 'Up-to-date', calibrationStatus: 'Calibrated', breakdownCount: 0, downtime: 0, lastServiceDate: '2025-01-15', nextServiceDate: '2025-07-15', status: 'Active' },
  { id: 'ote-002', month: 'January',  year: 2025, equipmentName: 'OT Table', equipmentCategory: 'Furniture', preventiveMaintenanceStatus: 'Up-to-date', calibrationStatus: 'N/A', breakdownCount: 1, downtime: 2, lastServiceDate: '2025-01-10', nextServiceDate: '2025-07-10', status: 'Active' },
  { id: 'ote-003', month: 'February', year: 2025, equipmentName: 'Surgical Lights', equipmentCategory: 'Lighting', preventiveMaintenanceStatus: 'Due Soon', calibrationStatus: 'Calibrated', breakdownCount: 0, downtime: 0, lastServiceDate: '2025-02-01', nextServiceDate: '2025-02-28', status: 'Active' },
  { id: 'ote-004', month: 'February', year: 2025, equipmentName: 'Electrocautery Unit', equipmentCategory: 'Energy', preventiveMaintenanceStatus: 'Up-to-date', calibrationStatus: 'Calibrated', breakdownCount: 0, downtime: 0, lastServiceDate: '2025-02-20', nextServiceDate: '2025-08-20', status: 'Active' },
  { id: 'ote-005', month: 'March',    year: 2025, equipmentName: 'Patient Monitor', equipmentCategory: 'Monitoring', preventiveMaintenanceStatus: 'Overdue', calibrationStatus: 'Pending', breakdownCount: 2, downtime: 4, lastServiceDate: '2025-03-01', nextServiceDate: '2025-03-25', status: 'Pending' },
];

const LS_KEY_INFECTION = 'ot_infection_control';

const EMPTY_INFECTION_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  totalOtCases: 0,
  sterilizationCompliance: 100,
  instrumentReprocessingCompliance: 100,
  handHygieneCompliance: 100,
  ssiCases: 0,
  environmentalCleaningCompliance: 100,
  autoclaveValidationStatus: 'Valid',
  status: 'Active',
};

const SAMPLE_INFECTION_RECORDS = [
  { id: 'oti-001', month: 'January',  year: 2025, totalOtCases: 120, sterilizationCompliance: 98, instrumentReprocessingCompliance: 99, handHygieneCompliance: 96, ssiCases: 1, environmentalCleaningCompliance: 99, autoclaveValidationStatus: 'Valid', status: 'Active' },
  { id: 'oti-002', month: 'February', year: 2025, totalOtCases: 115, sterilizationCompliance: 97, instrumentReprocessingCompliance: 98, handHygieneCompliance: 95, ssiCases: 2, environmentalCleaningCompliance: 98, autoclaveValidationStatus: 'Valid', status: 'Active' },
  { id: 'oti-003', month: 'March',    year: 2025, totalOtCases: 130, sterilizationCompliance: 99, instrumentReprocessingCompliance: 100, handHygieneCompliance: 97, ssiCases: 1, environmentalCleaningCompliance: 100, autoclaveValidationStatus: 'Valid', status: 'Active' },
  { id: 'oti-004', month: 'April',    year: 2025, totalOtCases: 125, sterilizationCompliance: 96, instrumentReprocessingCompliance: 97, handHygieneCompliance: 94, ssiCases: 3, environmentalCleaningCompliance: 97, autoclaveValidationStatus: 'Due', status: 'Active' },
  { id: 'oti-005', month: 'May',      year: 2025, totalOtCases: 135, sterilizationCompliance: 98, instrumentReprocessingCompliance: 99, handHygieneCompliance: 96, ssiCases: 0, environmentalCleaningCompliance: 98, autoclaveValidationStatus: 'Valid', status: 'Active' },
];

const LS_KEY_AUDIT = 'ot_audit_checklist';

const EMPTY_AUDIT_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  auditArea: 'WHO Surgical Safety Checklist',
  complianceScore: 100,
  findings: 0,
  correctiveAction: '',
  auditor: '',
  auditDate: '',
  status: 'Active',
};

const SAMPLE_AUDIT_RECORDS = [
  { id: 'ota-001', month: 'January',  year: 2025, auditArea: 'WHO Surgical Safety Checklist', complianceScore: 96, findings: 2, correctiveAction: 'Updated timeout protocol', auditor: 'Dr. Mehta', auditDate: '2025-01-20', status: 'Active' },
  { id: 'ota-002', month: 'February', year: 2025, auditArea: 'Patient Identification', complianceScore: 98, findings: 1, correctiveAction: 'Added barcode wristbands', auditor: 'Dr. Sharma', auditDate: '2025-02-18', status: 'Active' },
  { id: 'ota-003', month: 'March',    year: 2025, auditArea: 'Infection Control', complianceScore: 95, findings: 3, correctiveAction: 'Enhanced hand hygiene training', auditor: 'Dr. Patel', auditDate: '2025-03-22', status: 'Active' },
  { id: 'ota-004', month: 'April',    year: 2025, auditArea: 'Equipment Readiness', complianceScore: 97, findings: 2, correctiveAction: 'Monthly equipment checks', auditor: 'Dr. Kumar', auditDate: '2025-04-15', status: 'Active' },
  { id: 'ota-005', month: 'May',      year: 2025, auditArea: 'Documentation & Records', complianceScore: 99, findings: 1, correctiveAction: 'Digital form templates updated', auditor: 'Dr. Singh', auditDate: '2025-05-10', status: 'Active' },
];

const AuditTab = ({
  hospital,
  auditRecords,
  searchQuery,
  setSearchQuery,
  handleOpenAuditModal,
  handleDeleteAudit,
}) => {
  const filtered = auditRecords.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.month.toLowerCase().includes(q) ||
      String(r.year).includes(q) ||
      r.auditArea.toLowerCase().includes(q) ||
      r.auditor.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalAudits = auditRecords.length;
  const avgCompliance = totalAudits ? (auditRecords.reduce((s, r) => s + (r.complianceScore || 0), 0) / totalAudits).toFixed(1) : 0;
  const openFindings = auditRecords.reduce((s, r) => s + (r.findings || 0), 0);
  const closedFindings = auditRecords.filter((r) => r.status === 'Active').length;

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Audit ID', 'Month', 'Audit Area', 'Compliance %',
    'Findings', 'Corrective Action', 'Auditor',
    'Audit Date', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">OT Audit Checklist</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Operation Theatre audit records</p>
        </div>
        <button
          onClick={() => handleOpenAuditModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Audit
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Audits', value: totalAudits, color: 'text-blue-600' },
          { label: 'Average Compliance %', value: `${avgCompliance}%`, color: 'text-rose-600' },
          { label: 'Open Findings', value: openFindings, color: 'text-amber-600' },
          { label: 'Closed Findings', value: closedFindings, color: 'text-emerald-600' },
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
          placeholder="Search by month, year, audit area, auditor, or status…"
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
                  <td className="px-3 py-3 text-slate-600">{r.auditArea}</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.complianceScore}%</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.findings}</td>
                  <td className="px-3 py-3 text-slate-600">{r.correctiveAction}</td>
                  <td className="px-3 py-3 text-slate-600">{r.auditor}</td>
                  <td className="px-3 py-3 text-slate-600">{r.auditDate}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Active}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenAuditModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteAudit(r.id)}
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
                    {searchQuery ? 'No records match your search.' : 'No audit records yet. Click "Add Audit" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {auditRecords.length} record{auditRecords.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

const InfectionTab = ({
  hospital,
  infectionRecords,
  searchQuery,
  setSearchQuery,
  handleOpenInfectionModal,
  handleDeleteInfection,
}) => {
  const filtered = infectionRecords.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.month.toLowerCase().includes(q) ||
      String(r.year).includes(q) ||
      r.autoclaveValidationStatus.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const avgSterilization = infectionRecords.length ? (infectionRecords.reduce((s, r) => s + (r.sterilizationCompliance || 0), 0) / infectionRecords.length).toFixed(1) : 0;
  const avgHandHygiene = infectionRecords.length ? (infectionRecords.reduce((s, r) => s + (r.handHygieneCompliance || 0), 0) / infectionRecords.length).toFixed(1) : 0;
  const totalSsiCases = infectionRecords.reduce((s, r) => s + (r.ssiCases || 0), 0);
  const avgEnvironmental = infectionRecords.length ? (infectionRecords.reduce((s, r) => s + (r.environmentalCleaningCompliance || 0), 0) / infectionRecords.length).toFixed(1) : 0;

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'Total OT Cases', 'Sterilization Compliance', 'Instrument Reprocessing',
    'Hand Hygiene', 'SSI Cases', 'Environmental Cleaning', 'Autoclave Validation', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Infection Control & Sterilization</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Operation Theatre infection control metrics</p>
        </div>
        <button
          onClick={() => handleOpenInfectionModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Sterilization Compliance %', value: `${avgSterilization}%`, color: 'text-emerald-600' },
          { label: 'Hand Hygiene Compliance %', value: `${avgHandHygiene}%`, color: 'text-blue-600' },
          { label: 'SSI Cases', value: totalSsiCases, color: 'text-rose-600' },
          { label: 'Environmental Cleaning Compliance %', value: `${avgEnvironmental}%`, color: 'text-amber-600' },
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
          placeholder="Search by month, year, autoclave status, or status…"
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
                  <td className="px-3 py-3 text-slate-600">{r.totalOtCases}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.sterilizationCompliance}%</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.instrumentReprocessingCompliance}%</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.handHygieneCompliance}%</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.ssiCases}</td>
                  <td className="px-3 py-3 text-sky-600 font-bold">{r.environmentalCleaningCompliance}%</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${r.autoclaveValidationStatus === 'Valid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                      {r.autoclaveValidationStatus}
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
                        onClick={() => handleOpenInfectionModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteInfection(r.id)}
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
                    {searchQuery ? 'No records match your search.' : 'No infection records yet. Click "Add Record" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {infectionRecords.length} record{infectionRecords.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

const EquipmentTab = ({
  hospital,
  equipmentRecords,
  searchQuery,
  setSearchQuery,
  handleOpenEquipmentModal,
  handleDeleteEquipment,
}) => {
  const filtered = equipmentRecords.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.month.toLowerCase().includes(q) ||
      String(r.year).includes(q) ||
      r.equipmentName.toLowerCase().includes(q) ||
      r.equipmentCategory.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalEquipment = equipmentRecords.length;
  const pmCompliant = equipmentRecords.filter((r) => r.preventiveMaintenanceStatus === 'Up-to-date').length;
  const pmCompliance = totalEquipment ? ((pmCompliant / totalEquipment) * 100).toFixed(1) : 0;
  const calibCompliant = equipmentRecords.filter((r) => r.calibrationStatus === 'Calibrated' || r.calibrationStatus === 'N/A').length;
  const calibCompliance = totalEquipment ? ((calibCompliant / totalEquipment) * 100).toFixed(1) : 0;
  const totalBreakdowns = equipmentRecords.reduce((s, r) => s + (r.breakdownCount || 0), 0);

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Equipment Name', 'Category', 'PM Status', 'Calibration',
    'Breakdown Count', 'Downtime', 'Last Service', 'Next Service', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Equipment & OT Readiness</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Operation Theatre equipment metrics</p>
        </div>
        <button
          onClick={() => handleOpenEquipmentModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Equipment
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Equipment', value: totalEquipment, color: 'text-blue-600' },
          { label: 'PM Compliance %', value: `${pmCompliance}%`, color: 'text-emerald-600' },
          { label: 'Calibration Compliance %', value: `${calibCompliance}%`, color: 'text-rose-600' },
          { label: 'Total Breakdowns', value: totalBreakdowns, color: 'text-amber-600' },
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
          placeholder="Search by month, year, name, category, or status…"
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
                  <td className="px-3 py-3 font-semibold text-slate-700 whitespace-nowrap">{r.equipmentName}</td>
                  <td className="px-3 py-3 text-slate-600">{r.equipmentCategory}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${r.preventiveMaintenanceStatus === 'Up-to-date' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : r.preventiveMaintenanceStatus === 'Due Soon' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                      {r.preventiveMaintenanceStatus}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${r.calibrationStatus === 'Calibrated' || r.calibrationStatus === 'N/A' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                      {r.calibrationStatus}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.breakdownCount}</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.downtime} hrs</td>
                  <td className="px-3 py-3 text-slate-600">{r.lastServiceDate}</td>
                  <td className="px-3 py-3 text-slate-600">{r.nextServiceDate}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Active}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEquipmentModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteEquipment(r.id)}
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
                    {searchQuery ? 'No records match your search.' : 'No equipment records yet. Click "Add Equipment" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {equipmentRecords.length} record{equipmentRecords.length !== 1 ? 's' : ''}
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
      r.surgeryType.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalSurgeries = procedureRecords.reduce((s, r) => s + (r.totalSurgeries || 0), 0);
  const totalElective = procedureRecords.reduce((s, r) => s + (r.electiveSurgeries || 0), 0);
  const totalEmergency = procedureRecords.reduce((s, r) => s + (r.emergencySurgeries || 0), 0);
  const avgSuccessRate = procedureRecords.length ? (procedureRecords.reduce((s, r) => s + (r.surgicalSuccessRate || 0), 0) / procedureRecords.length).toFixed(1) : 0;

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'Surgery Type', 'Total Surgeries', 'Elective', 'Emergency',
    'Avg Surgery Duration', 'OT Turnaround Time', 'Success Rate', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Surgical Procedures</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Operation Theatre surgical metrics</p>
        </div>
        <button
          onClick={() => handleOpenProcedureModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Surgery
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Surgeries', value: totalSurgeries, color: 'text-blue-600' },
          { label: 'Elective Surgeries', value: totalElective, color: 'text-emerald-600' },
          { label: 'Emergency Surgeries', value: totalEmergency, color: 'text-rose-600' },
          { label: 'Surgical Success Rate', value: `${avgSuccessRate}%`, color: 'text-amber-600' },
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
                  <td className="px-3 py-3 text-slate-600">{r.surgeryType}</td>
                  <td className="px-3 py-3 text-slate-600">{r.totalSurgeries}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.electiveSurgeries}</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.emergencySurgeries}</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.averageSurgeryDuration} min</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.averageOtturnaroundTime} min</td>
                  <td className="px-3 py-3 text-sky-600 font-bold">{r.surgicalSuccessRate}%</td>
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
                    {searchQuery ? 'No records match your search.' : 'No procedure records yet. Click "Add Surgery" to begin.'}
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

  const totalSurgeries = qualityIndicators.reduce((s, r) => s + (r.totalSurgeries || 0), 0);
  const avgWhoChecklist = qualityIndicators.length ? (qualityIndicators.reduce((s, r) => s + (r.whoChecklistCompliance || 0), 0) / qualityIndicators.length).toFixed(1) : 0;
  const avgSsiRate = qualityIndicators.length ? (qualityIndicators.reduce((s, r) => s + (r.ssiRate || 0), 0) / qualityIndicators.length).toFixed(1) : 0;
  const avgSatisfaction = qualityIndicators.length ? (qualityIndicators.reduce((s, r) => s + (r.patientSatisfaction || 0), 0) / qualityIndicators.length).toFixed(1) : 0;

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'Total Surgeries', 'SSI Rate',
    'WHO Checklist', 'On-Time Start', 'Cancellation Rate', 'Mortality Rate', 'Patient Satisfaction', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Quality Indicators</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Operation Theatre monthly metrics</p>
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
          { label: 'Total Surgeries', value: totalSurgeries, color: 'text-blue-600' },
          { label: 'WHO Checklist Compliance %', value: `${avgWhoChecklist}%`, color: 'text-emerald-600' },
          { label: 'SSI Rate %', value: `${avgSsiRate}%`, color: 'text-rose-600' },
          { label: 'Patient Satisfaction %', value: `${avgSatisfaction}%`, color: 'text-amber-600' },
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
                  <td className="px-3 py-3 text-slate-600">{r.totalSurgeries}</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.ssiRate}%</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.whoChecklistCompliance}%</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.onTimeSurgeryStart}%</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.cancellationRate}%</td>
                  <td className="px-3 py-3 text-red-600 font-bold">{r.mortalityRate}%</td>
                  <td className="px-3 py-3 text-sky-600 font-bold">{r.patientSatisfaction}%</td>
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

const OperationTheatreWorkspace = ({ onBack }) => {
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
    return `otq-${String(maxNum + 1).padStart(3, '0')}`;
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
    return `otsp-${String(maxNum + 1).padStart(3, '0')}`;
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

  const [equipmentRecords, setEquipmentRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_EQUIPMENT);
    return saved ? JSON.parse(saved) : SAMPLE_EQUIPMENT_RECORDS;
  });
  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);
  const [editingEquipmentId, setEditingEquipmentId] = useState(null);
  const [equipmentForm, setEquipmentForm] = useState({ ...EMPTY_EQUIPMENT_FORM });
  const [equipmentSearch, setEquipmentSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_EQUIPMENT, JSON.stringify(equipmentRecords));
  }, [equipmentRecords]);

  const getNextEquipmentId = () => {
    const maxNum = equipmentRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `ote-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenEquipmentModal = (record = null) => {
    if (record) {
      setEquipmentForm({ ...record });
      setEditingEquipmentId(record.id);
    } else {
      setEquipmentForm({ ...EMPTY_EQUIPMENT_FORM, id: getNextEquipmentId() });
      setEditingEquipmentId(null);
    }
    setIsEquipmentModalOpen(true);
  };

  const handleSaveEquipment = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingEquipmentId) {
      setEquipmentRecords((prev) =>
        prev.map((r) => (r.id === editingEquipmentId ? { ...equipmentForm, id: editingEquipmentId } : r))
      );
    } else {
      setEquipmentRecords((prev) => [...prev, { ...equipmentForm }]);
    }
    setIsEquipmentModalOpen(false);
    setEditingEquipmentId(null);
  };

  const handleDeleteEquipment = (id) => {
    if (window.confirm('Delete this equipment record?')) {
      setEquipmentRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const [infectionRecords, setInfectionRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_INFECTION);
    return saved ? JSON.parse(saved) : SAMPLE_INFECTION_RECORDS;
  });
  const [isInfectionModalOpen, setIsInfectionModalOpen] = useState(false);
  const [editingInfectionId, setEditingInfectionId] = useState(null);
  const [infectionForm, setInfectionForm] = useState({ ...EMPTY_INFECTION_FORM });
  const [infectionSearch, setInfectionSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_INFECTION, JSON.stringify(infectionRecords));
  }, [infectionRecords]);

  const getNextInfectionId = () => {
    const maxNum = infectionRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `oti-${String(maxNum + 1).padStart(3, '0')}`;
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

  const [auditRecords, setAuditRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_AUDIT);
    return saved ? JSON.parse(saved) : SAMPLE_AUDIT_RECORDS;
  });
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [editingAuditId, setEditingAuditId] = useState(null);
  const [auditForm, setAuditForm] = useState({ ...EMPTY_AUDIT_FORM });
  const [auditSearch, setAuditSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_AUDIT, JSON.stringify(auditRecords));
  }, [auditRecords]);

  const getNextAuditId = () => {
    const maxNum = auditRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `ota-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenAuditModal = (record = null) => {
    if (record) {
      setAuditForm({ ...record });
      setEditingAuditId(record.id);
    } else {
      setAuditForm({ ...EMPTY_AUDIT_FORM, id: getNextAuditId() });
      setEditingAuditId(null);
    }
    setIsAuditModalOpen(true);
  };

  const handleSaveAudit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingAuditId) {
      setAuditRecords((prev) =>
        prev.map((r) => (r.id === editingAuditId ? { ...auditForm, id: editingAuditId } : r))
      );
    } else {
      setAuditRecords((prev) => [...prev, { ...auditForm }]);
    }
    setIsAuditModalOpen(false);
    setEditingAuditId(null);
  };

  const handleDeleteAudit = (id) => {
    if (window.confirm('Delete this audit record?')) {
      setAuditRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <div className="text-xs text-slate-600">Dashboard content coming soon...</div>;
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
      case 'equipment':
        return (
          <EquipmentTab
            hospital={hospital}
            equipmentRecords={equipmentRecords}
            searchQuery={equipmentSearch}
            setSearchQuery={setEquipmentSearch}
            handleOpenEquipmentModal={handleOpenEquipmentModal}
            handleDeleteEquipment={handleDeleteEquipment}
          />
        );
      case 'infection':
        return (
          <InfectionTab
            hospital={hospital}
            infectionRecords={infectionRecords}
            searchQuery={infectionSearch}
            setSearchQuery={setInfectionSearch}
            handleOpenInfectionModal={handleOpenInfectionModal}
            handleDeleteInfection={handleDeleteInfection}
          />
        );
      case 'audit':
        return (
          <AuditTab
            hospital={hospital}
            auditRecords={auditRecords}
            searchQuery={auditSearch}
            setSearchQuery={setAuditSearch}
            handleOpenAuditModal={handleOpenAuditModal}
            handleDeleteAudit={handleDeleteAudit}
          />
        );
      case 'reports':
        return (
          <ReportsTab
            hospital={hospital}
            qualityIndicators={qualityIndicators}
            procedureRecords={procedureRecords}
            equipmentRecords={equipmentRecords}
            infectionRecords={infectionRecords}
            auditRecords={auditRecords}
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
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">Operation Theatre</h2>
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
            OT Dept — NABH Module
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
                <p className="text-[9px] text-slate-400 mt-0.5">Operation Theatre — Quality Metrics</p>
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

              {/* Surgical Metrics */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Surgical Metrics</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Total Surgeries" field="totalSurgeries" form={qualityForm} setForm={setQualityForm} />
                  <NumField label="SSI Rate %" field="ssiRate" form={qualityForm} setForm={setQualityForm} step="0.1" />
                  <NumField label="WHO Checklist Compliance %" field="whoChecklistCompliance" form={qualityForm} setForm={setQualityForm} step="0.1" />
                  <NumField label="On-Time Surgery Start %" field="onTimeSurgeryStart" form={qualityForm} setForm={setQualityForm} step="0.1" />
                  <NumField label="Cancellation Rate %" field="cancellationRate" form={qualityForm} setForm={setQualityForm} step="0.1" />
                  <NumField label="Mortality Rate %" field="mortalityRate" form={qualityForm} setForm={setQualityForm} step="0.1" />
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

      {/* ── Surgical Procedures Modal ── */}
      {isProcedureModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingProcedureId ? 'Edit Procedure Record' : 'Add Surgical Procedure'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Operation Theatre — Surgical Metrics</p>
              </div>
              <button
                onClick={() => { setIsProcedureModalOpen(false); setEditingProcedureId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveProcedure} className="space-y-5">
              {/* Reporting Period */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period</p>
                <div className="grid grid-cols-2 gap-3">
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
                </div>
              </div>

              {/* Surgery Details */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Surgery Details</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Surgery Type *</label>
                    <select
                      value={procedureForm.surgeryType}
                      onChange={(e) => setProcedureForm({ ...procedureForm, surgeryType: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="General">General</option>
                      <option value="Orthopedic">Orthopedic</option>
                      <option value="Cardiac">Cardiac</option>
                      <option value="Neuro">Neuro</option>
                      <option value="ENT">ENT</option>
                      <option value="Obstetrics">Obstetrics</option>
                    </select>
                  </div>
                  <NumField label="Total Surgeries" field="totalSurgeries" form={procedureForm} setForm={setProcedureForm} />
                  <NumField label="Elective Surgeries" field="electiveSurgeries" form={procedureForm} setForm={setProcedureForm} />
                  <NumField label="Emergency Surgeries" field="emergencySurgeries" form={procedureForm} setForm={setProcedureForm} />
                  <NumField label="Avg Surgery Duration (min)" field="averageSurgeryDuration" form={procedureForm} setForm={setProcedureForm} />
                  <NumField label="OT Turnaround Time (min)" field="averageOtturnaroundTime" form={procedureForm} setForm={setProcedureForm} />
                  <NumField label="Surgical Success Rate %" field="surgicalSuccessRate" form={procedureForm} setForm={setProcedureForm} step="0.1" />
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

      {/* ── Equipment & OT Readiness Modal ── */}
      {isEquipmentModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingEquipmentId ? 'Edit Equipment Record' : 'Add Equipment'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Operation Theatre — Equipment Readiness</p>
              </div>
              <button
                onClick={() => { setIsEquipmentModalOpen(false); setEditingEquipmentId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveEquipment} className="space-y-5">
              {/* Reporting Period */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                    <select
                      value={equipmentForm.month}
                      onChange={(e) => setEquipmentForm({ ...equipmentForm, month: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                    <input
                      type="number"
                      value={equipmentForm.year}
                      onChange={(e) => setEquipmentForm({ ...equipmentForm, year: parseInt(e.target.value) || 2025 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Equipment Details */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Equipment Details</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Equipment Name *</label>
                    <input
                      type="text"
                      value={equipmentForm.equipmentName}
                      onChange={(e) => setEquipmentForm({ ...equipmentForm, equipmentName: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="e.g. Anaesthesia Workstation"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Equipment Category *</label>
                    <select
                      value={equipmentForm.equipmentCategory}
                      onChange={(e) => setEquipmentForm({ ...equipmentForm, equipmentCategory: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Anaesthesia">Anaesthesia</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Lighting">Lighting</option>
                      <option value="Energy">Energy</option>
                      <option value="Monitoring">Monitoring</option>
                      <option value="Life Support">Life Support</option>
                      <option value="Infusion">Infusion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">PM Status *</label>
                    <select
                      value={equipmentForm.preventiveMaintenanceStatus}
                      onChange={(e) => setEquipmentForm({ ...equipmentForm, preventiveMaintenanceStatus: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Up-to-date">Up-to-date</option>
                      <option value="Due Soon">Due Soon</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Calibration Status *</label>
                    <select
                      value={equipmentForm.calibrationStatus}
                      onChange={(e) => setEquipmentForm({ ...equipmentForm, calibrationStatus: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Calibrated">Calibrated</option>
                      <option value="Pending">Pending</option>
                      <option value="N/A">N/A</option>
                    </select>
                  </div>
                  <NumField label="Breakdown Count" field="breakdownCount" form={equipmentForm} setForm={setEquipmentForm} />
                  <NumField label="Downtime (hours)" field="downtime" form={equipmentForm} setForm={setEquipmentForm} />
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Last Service Date *</label>
                    <input
                      type="date"
                      value={equipmentForm.lastServiceDate}
                      onChange={(e) => setEquipmentForm({ ...equipmentForm, lastServiceDate: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Next Service Date *</label>
                    <input
                      type="date"
                      value={equipmentForm.nextServiceDate}
                      onChange={(e) => setEquipmentForm({ ...equipmentForm, nextServiceDate: e.target.value })}
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
                      value={equipmentForm.status}
                      onChange={(e) => setEquipmentForm({ ...equipmentForm, status: e.target.value })}
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
                  onClick={() => { setIsEquipmentModalOpen(false); setEditingEquipmentId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingEquipmentId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Infection Control & Sterilization Modal ── */}
      {isInfectionModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingInfectionId ? 'Edit Infection Control Record' : 'Add Infection Control Data'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Operation Theatre — Infection Control</p>
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

              {/* Infection Control Metrics */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Infection Control Metrics</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Total OT Cases" field="totalOtCases" form={infectionForm} setForm={setInfectionForm} />
                  <NumField label="Sterilization Compliance %" field="sterilizationCompliance" form={infectionForm} setForm={setInfectionForm} step="0.1" />
                  <NumField label="Instrument Reprocessing %" field="instrumentReprocessingCompliance" form={infectionForm} setForm={setInfectionForm} step="0.1" />
                  <NumField label="Hand Hygiene Compliance %" field="handHygieneCompliance" form={infectionForm} setForm={setInfectionForm} step="0.1" />
                  <NumField label="SSI Cases" field="ssiCases" form={infectionForm} setForm={setInfectionForm} />
                  <NumField label="Environmental Cleaning %" field="environmentalCleaningCompliance" form={infectionForm} setForm={setInfectionForm} step="0.1" />
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Autoclave Validation *</label>
                    <select
                      value={infectionForm.autoclaveValidationStatus}
                      onChange={(e) => setInfectionForm({ ...infectionForm, autoclaveValidationStatus: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Valid">Valid</option>
                      <option value="Due">Due for Validation</option>
                      <option value="Invalid">Invalid</option>
                    </select>
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

      {/* ── OT Audit Checklist Modal ── */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingAuditId ? 'Edit Audit Record' : 'Add Audit Record'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Operation Theatre — Audit Checklist</p>
              </div>
              <button
                onClick={() => { setIsAuditModalOpen(false); setEditingAuditId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveAudit} className="space-y-5">
              {/* Reporting Period & Audit Area */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period & Audit Area</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                    <select
                      value={auditForm.month}
                      onChange={(e) => setAuditForm({ ...auditForm, month: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                    <input
                      type="number"
                      value={auditForm.year}
                      onChange={(e) => setAuditForm({ ...auditForm, year: parseInt(e.target.value) || 2025 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Area *</label>
                    <select
                      value={auditForm.auditArea}
                      onChange={(e) => setAuditForm({ ...auditForm, auditArea: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="WHO Surgical Safety Checklist">WHO Surgical Safety Checklist</option>
                      <option value="Patient Identification">Patient Identification</option>
                      <option value="Infection Control">Infection Control</option>
                      <option value="Equipment Readiness">Equipment Readiness</option>
                      <option value="Documentation & Records">Documentation & Records</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Audit Metrics */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Audit Metrics</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Compliance Score %" field="complianceScore" form={auditForm} setForm={setAuditForm} step="0.1" />
                  <NumField label="Findings" field="findings" form={auditForm} setForm={setAuditForm} />
                  <div className="col-span-2">
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Corrective Action *</label>
                    <input
                      type="text"
                      value={auditForm.correctiveAction}
                      onChange={(e) => setAuditForm({ ...auditForm, correctiveAction: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="e.g., Updated protocols"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Auditor *</label>
                    <input
                      type="text"
                      value={auditForm.auditor}
                      onChange={(e) => setAuditForm({ ...auditForm, auditor: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="e.g., Dr. Mehta"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Date *</label>
                    <input
                      type="date"
                      value={auditForm.auditDate}
                      onChange={(e) => setAuditForm({ ...auditForm, auditDate: e.target.value })}
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
                      value={auditForm.status}
                      onChange={(e) => setAuditForm({ ...auditForm, status: e.target.value })}
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
                  onClick={() => { setIsAuditModalOpen(false); setEditingAuditId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingAuditId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const ReportsTab = ({
  hospital,
  qualityIndicators,
  procedureRecords,
  equipmentRecords,
  infectionRecords,
  auditRecords,
}) => {
  const totalQuality = qualityIndicators.length;
  const totalProcedure = procedureRecords.length;
  const totalEquipment = equipmentRecords.length;
  const totalInfection = infectionRecords.length;
  const totalAudit = auditRecords.length;
  const avgSurgicalSuccessRate = totalProcedure
    ? (procedureRecords.reduce((s, r) => s + (r.surgicalSuccessRate || 0), 0) / totalProcedure).toFixed(1)
    : 0;
  const avgWhoChecklist = totalQuality
    ? (qualityIndicators.reduce((s, r) => s + (r.whoChecklistCompliance || 0), 0) / totalQuality).toFixed(1)
    : 0;
  const avgAuditCompliance = totalAudit
    ? (auditRecords.reduce((s, r) => s + (r.complianceScore || 0), 0) / totalAudit).toFixed(1)
    : 0;

  const surgeryTrendData = qualityIndicators.map((r) => ({
    month: r.month,
    surgeries: r.totalSurgeries || 0,
    successRate: r.procedureSuccessRate || 0,
  }));

  const surgeryTypeData = procedureRecords.reduce((acc, r) => {
    const type = r.surgeryType || 'Other';
    const existing = acc.find((d) => d.name === type);
    if (existing) existing.value += r.totalSurgeries || 0;
    else acc.push({ name: type, value: r.totalSurgeries || 0 });
    return acc;
  }, []);

  const equipmentComplianceData = equipmentRecords.map((r) => ({
    month: r.month,
    compliance: r.preventiveMaintenanceStatus === 'Up-to-date' ? 100 : r.preventiveMaintenanceStatus === 'Due Soon' ? 80 : 50,
  }));

  const infectionTrendData = infectionRecords.map((r) => ({
    month: r.month,
    sterilization: r.sterilizationCompliance || 0,
    handHygiene: r.handHygieneCompliance || 0,
  }));

  const auditAreaData = auditRecords.reduce((acc, r) => {
    const area = r.auditArea || 'Other';
    const existing = acc.find((d) => d.name === area);
    if (existing) existing.value += r.complianceScore || 0;
    else acc.push({ name: area, value: r.complianceScore || 0 });
    return acc;
  }, []);

  const monthlySummaryData = qualityIndicators.map((q) => {
    const monthProcedures = procedureRecords
      .filter((p) => p.month === q.month && p.year === q.year)
      .reduce((s, p) => s + (p.totalSurgeries || 0), 0);
    const monthSuccess = procedureRecords
      .filter((p) => p.month === q.month && p.year === q.year)
      .reduce((s, p) => s + (p.surgicalSuccessRate || 0), 0);
    const successCount = procedureRecords.filter((p) => p.month === q.month && p.year === q.year).length;
    const monthEquipment = equipmentRecords
      .filter((e) => e.month === q.month && e.year === q.year)
      .reduce((s, e) => s + (e.preventiveMaintenanceStatus === 'Up-to-date' ? 100 : 0), 0);
    const equipCount = equipmentRecords.filter((e) => e.month === q.month && e.year === q.year).length;
    const monthInfection = infectionRecords
      .filter((i) => i.month === q.month && i.year === q.year)
      .reduce((s, i) => s + (i.sterilizationCompliance || 0), 0);
    const infectCount = infectionRecords.filter((i) => i.month === q.month && i.year === q.year).length;
    const monthAudit = auditRecords
      .filter((a) => a.month === q.month && a.year === q.year)
      .reduce((s, a) => s + (a.complianceScore || 0), 0);
    const auditCount = auditRecords.filter((a) => a.month === q.month && a.year === q.year).length;

    return {
      month: `${q.month} ${q.year}`,
      totalSurgeries: monthProcedures || q.totalSurgeries,
      successRate: successCount ? monthSuccess / successCount : q.procedureSuccessRate,
      ssiRate: q.ssiRate,
      equipmentCompliance: equipCount ? monthEquipment / equipCount : 100,
      infectionCompliance: infectCount ? monthInfection / infectCount : 0,
      auditCompliance: auditCount ? monthAudit / auditCount : 0,
      status: q.status,
    };
  });

  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

  const handleExportCSV = () => {};
  const handleExportPDF = () => {};
  const handlePrintReport = () => {};

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Reports & Analytics</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Operation Theatre analytics dashboard</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Quality Records', value: totalQuality, color: 'text-blue-600' },
          { label: 'Total Procedure Records', value: totalProcedure, color: 'text-rose-600' },
          { label: 'Total Equipment Records', value: totalEquipment, color: 'text-amber-600' },
          { label: 'Total Infection Records', value: totalInfection, color: 'text-emerald-600' },
          { label: 'Total Audit Records', value: totalAudit, color: 'text-purple-600' },
          { label: 'Avg Surgical Success Rate', value: `${avgSurgicalSuccessRate}%`, color: 'text-sky-600' },
          { label: 'Avg WHO Checklist Compliance', value: `${avgWhoChecklist}%`, color: 'text-cyan-600' },
          { label: 'Avg Audit Compliance', value: `${avgAuditCompliance}%`, color: 'text-indigo-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-3">Monthly Surgery Trend</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={surgeryTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="surgeries" stroke="#3b82f6" strokeWidth={2} name="Surgeries" />
              <Line type="monotone" dataKey="successRate" stroke="#10b981" strokeWidth={2} name="Success Rate" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-3">Surgery Type Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={surgeryTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                {surgeryTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-3">Equipment Compliance</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={equipmentComplianceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="compliance" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-3">Infection Control Compliance</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={infectionTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sterilization" stroke="#3b82f6" strokeWidth={2} name="Sterilization" />
              <Line type="monotone" dataKey="handHygiene" stroke="#10b981" strokeWidth={2} name="Hand Hygiene" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-3">Audit Compliance by Area</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={auditAreaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-3">Monthly OT Summary</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlySummaryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalSurgeries" stroke="#3b82f6" strokeWidth={2} name="Surgeries" />
              <Line type="monotone" dataKey="successRate" stroke="#10b981" strokeWidth={2} name="Success Rate" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Month', 'Total Surgeries', 'Surgical Success Rate', 'SSI Rate', 'Equipment Compliance', 'Infection Control Compliance', 'Audit Compliance', 'Status'].map((h) => (
                  <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {monthlySummaryData.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-3 py-3 font-semibold text-slate-700 whitespace-nowrap">{r.month}</td>
                  <td className="px-3 py-3 text-slate-600">{r.totalSurgeries}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.successRate}%</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.ssiRate}%</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.equipmentCompliance.toFixed(1)}%</td>
                  <td className="px-3 py-3 text-purple-600 font-bold">{r.infectionCompliance.toFixed(1)}%</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.auditCompliance.toFixed(1)}%</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${r.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
              {monthlySummaryData.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-3 py-10 text-center text-slate-400">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {monthlySummaryData.length} monthly entr{monthlySummaryData.length !== 1 ? 'ies' : 'y'}
          </span>
          <div className="flex items-center gap-2">
            <button onClick={handleExportCSV} className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-700 text-[9px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors">
              <Download className="w-3 h-3" /> Export CSV
            </button>
            <button onClick={handleExportPDF} className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-rose-300 hover:text-rose-700 text-[9px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors">
              <FileDown className="w-3 h-3" /> Export PDF
            </button>
            <button onClick={handlePrintReport} className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700 text-[9px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors">
              <Printer className="w-3 h-3" /> Print Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationTheatreWorkspace;
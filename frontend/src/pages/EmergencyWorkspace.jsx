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
  { id: 'triage',         label: 'Triage & Assessment',     icon: Stethoscope },
  { id: 'medication',     label: 'Medication & Crash Cart', icon: Pill },
  { id: 'ambulance',      label: 'Ambulance',               icon: Ambulance },
  { id: 'audit',          label: 'Audit Checklist',         icon: CheckSquare },
  { id: 'reports',        label: 'Reports',                 icon: FileText },
];

const LS_KEY_QUALITY = 'emergency_quality_indicators';

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const EMPTY_QUALITY_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  doorToDoctorTime: 0,
  initialAssessmentTime: 0,
  lwbs: 0,
  returnVisits72h: 0,
  triageCompliance: 100,
  status: 'Active',
};

const SAMPLE_QUALITY_INDICATORS = [
  { id: 'eqi-001', month: 'January',  year: 2025, doorToDoctorTime: 12, initialAssessmentTime: 5, lwbs: 2, returnVisits72h: 1, triageCompliance: 98, status: 'Active' },
  { id: 'eqi-002', month: 'February', year: 2025, doorToDoctorTime: 15, initialAssessmentTime: 6, lwbs: 3, returnVisits72h: 0, triageCompliance: 95, status: 'Active' },
  { id: 'eqi-003', month: 'March',    year: 2025, doorToDoctorTime: 10, initialAssessmentTime: 4, lwbs: 1, returnVisits72h: 2, triageCompliance: 99, status: 'Active' },
  { id: 'eqi-004', month: 'April',    year: 2025, doorToDoctorTime: 14, initialAssessmentTime: 7, lwbs: 4, returnVisits72h: 1, triageCompliance: 92, status: 'Active' },
  { id: 'eqi-005', month: 'May',      year: 2025, doorToDoctorTime: 11, initialAssessmentTime: 5, lwbs: 2, returnVisits72h: 0, triageCompliance: 97, status: 'Active' },
];

const LS_KEY_TRIAGE = 'emergency_triage_assessment';

const EMPTY_TRIAGE_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  totalPatients: 0,
  redCategory: 0,
  yellowCategory: 0,
  greenCategory: 0,
  blackCategory: 0,
  averageWaitingTime: 0,
  averageAssessmentTime: 0,
  status: 'Active',
};

const SAMPLE_TRIAGE_RECORDS = [
  { id: 'eqt-001', month: 'January',  year: 2025, totalPatients: 450, redCategory: 25, yellowCategory: 120, greenCategory: 300, blackCategory: 5, averageWaitingTime: 15, averageAssessmentTime: 10, status: 'Active' },
  { id: 'eqt-002', month: 'February', year: 2025, totalPatients: 420, redCategory: 20, yellowCategory: 110, greenCategory: 285, blackCategory: 5, averageWaitingTime: 12, averageAssessmentTime: 8, status: 'Active' },
  { id: 'eqt-003', month: 'March',    year: 2025, totalPatients: 480, redCategory: 30, yellowCategory: 130, greenCategory: 310, blackCategory: 10, averageWaitingTime: 18, averageAssessmentTime: 12, status: 'Active' },
  { id: 'eqt-004', month: 'April',    year: 2025, totalPatients: 410, redCategory: 18, yellowCategory: 105, greenCategory: 280, blackCategory: 7, averageWaitingTime: 14, averageAssessmentTime: 9, status: 'Active' },
  { id: 'eqt-005', month: 'May',      year: 2025, totalPatients: 460, redCategory: 22, yellowCategory: 125, greenCategory: 305, blackCategory: 8, averageWaitingTime: 16, averageAssessmentTime: 11, status: 'Active' },
];

const LS_KEY_MEDICATION = 'emergency_medication_crashcart';

const EMPTY_MEDICATION_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  crashCartCompliance: 100,
  highAlertDrugsChecked: 0,
  emergencyDrugAvailability: 100,
  expiredDrugs: 0,
  medicationErrors: 0,
  inspectionDate: '',
  status: 'Active',
};

const SAMPLE_MEDICATION_RECORDS = [
  { id: 'emc-001', month: 'January',  year: 2025, crashCartCompliance: 98, highAlertDrugsChecked: 24, emergencyDrugAvailability: 96, expiredDrugs: 2, medicationErrors: 1, inspectionDate: '2025-01-15', status: 'Active' },
  { id: 'emc-002', month: 'February', year: 2025, crashCartCompliance: 97, highAlertDrugsChecked: 22, emergencyDrugAvailability: 94, expiredDrugs: 1, medicationErrors: 0, inspectionDate: '2025-02-15', status: 'Active' },
  { id: 'emc-003', month: 'March',    year: 2025, crashCartCompliance: 99, highAlertDrugsChecked: 25, emergencyDrugAvailability: 98, expiredDrugs: 0, medicationErrors: 2, inspectionDate: '2025-03-15', status: 'Active' },
  { id: 'emc-004', month: 'April',    year: 2025, crashCartCompliance: 95, highAlertDrugsChecked: 23, emergencyDrugAvailability: 92, expiredDrugs: 3, medicationErrors: 1, inspectionDate: '2025-04-15', status: 'Pending' },
  { id: 'emc-005', month: 'May',      year: 2025, crashCartCompliance: 96, highAlertDrugsChecked: 21, emergencyDrugAvailability: 95, expiredDrugs: 1, medicationErrors: 0, inspectionDate: '2025-05-15', status: 'Active' },
];

const LS_KEY_AMBULANCE = 'emergency_ambulance';

const EMPTY_AMBULANCE_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  ambulanceId: '',
  responseTime: 0,
  dispatchTime: '',
  arrivalTime: '',
  casesTransported: 0,
  vehicleReadiness: 100,
  equipmentReadiness: 100,
  status: 'Active',
};

const SAMPLE_AMBULANCE_RECORDS = [
  { id: 'eam-001', month: 'January',  year: 2025, ambulanceId: 'AMB-01', responseTime: 12, dispatchTime: '08:00', arrivalTime: '08:15', casesTransported: 45, vehicleReadiness: 96, equipmentReadiness: 98, status: 'Active' },
  { id: 'eam-002', month: 'February', year: 2025, ambulanceId: 'AMB-02', responseTime: 15, dispatchTime: '09:00', arrivalTime: '09:20', casesTransported: 38, vehicleReadiness: 94, equipmentReadiness: 95, status: 'Active' },
  { id: 'eam-003', month: 'March',    year: 2025, ambulanceId: 'AMB-01', responseTime: 10, dispatchTime: '07:30', arrivalTime: '07:45', casesTransported: 52, vehicleReadiness: 98, equipmentReadiness: 99, status: 'Active' },
  { id: 'eam-004', month: 'April',    year: 2025, ambulanceId: 'AMB-03', responseTime: 18, dispatchTime: '10:00', arrivalTime: '10:25', casesTransported: 41, vehicleReadiness: 92, equipmentReadiness: 90, status: 'Pending' },
  { id: 'eam-005', month: 'May',      year: 2025, ambulanceId: 'AMB-02', responseTime: 14, dispatchTime: '08:15', arrivalTime: '08:35', casesTransported: 48, vehicleReadiness: 97, equipmentReadiness: 96, status: 'Active' },
];

const LS_KEY_AUDIT = 'emergency_audit_checklist';

const EMPTY_AUDIT_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  auditArea: '',
  complianceScore: 100,
  findings: 0,
  correctiveAction: '',
  auditor: '',
  auditDate: '',
  status: 'Active',
};

const SAMPLE_AUDIT_RECORDS = [
  { id: 'eau-001', month: 'January',  year: 2025, auditArea: 'Triage Area', complianceScore: 94, findings: 3, correctiveAction: 'Updated triage protocol', auditor: 'Dr. Sharma', auditDate: '2025-01-20', status: 'Active' },
  { id: 'eau-002', month: 'February', year: 2025, auditArea: 'Medication Storage', complianceScore: 88, findings: 5, correctiveAction: 'Rearranged stock', auditor: 'Dr. Patel', auditDate: '2025-02-18', status: 'Active' },
  { id: 'eau-003', month: 'March',    year: 2025, auditArea: 'Crash Cart', complianceScore: 98, findings: 1, correctiveAction: 'Replaced expired items', auditor: 'Dr. Kumar', auditDate: '2025-03-15', status: 'Active' },
  { id: 'eau-004', month: 'April',    year: 2025, auditArea: 'Ambulance Bay', complianceScore: 91, findings: 4, correctiveAction: 'Scheduled maintenance', auditor: 'Dr. Singh', auditDate: '2025-04-22', status: 'Pending' },
  { id: 'eau-005', month: 'May',      year: 2025, auditArea: 'Emergency Waiting Area', complianceScore: 96, findings: 2, correctiveAction: 'Added seating', auditor: 'Dr. Reddy', auditDate: '2025-05-10', status: 'Active' },
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
        <h3 className="text-xs font-extrabold text-slate-800">Emergency Dashboard</h3>
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
  const avgDoorToDoctor = totalRecords ? (qualityIndicators.reduce((s, r) => s + (r.doorToDoctorTime || 0), 0) / totalRecords).toFixed(1) : 0;
  const avgInitialAssess = totalRecords ? (qualityIndicators.reduce((s, r) => s + (r.initialAssessmentTime || 0), 0) / totalRecords).toFixed(1) : 0;
  const avgTriage = totalRecords ? (qualityIndicators.reduce((s, r) => s + (r.triageCompliance || 0), 0) / totalRecords).toFixed(1) : 0;

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'Door-to-Doctor (m)', 'Initial Assess (m)', 'LWBS',
    '72h Returns', 'Triage Comp', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Quality Indicators</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Emergency Department monthly metrics</p>
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
          { label: 'Total Records', value: totalRecords, color: 'text-blue-600' },
          { label: 'Avg Door-to-Doc', value: avgDoorToDoctor, color: 'text-rose-600' },
          { label: 'Avg Initial Assess', value: avgInitialAssess, color: 'text-amber-600' },
          { label: 'Triage Comp. %', value: `${avgTriage}%`, color: 'text-emerald-600' },
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
                  <td className="px-3 py-3 text-slate-600">{r.doorToDoctorTime}</td>
                  <td className="px-3 py-3 text-slate-600">{r.initialAssessmentTime}</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.lwbs}</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.returnVisits72h}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.triageCompliance}%</td>
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

const TriageTab = ({
  hospital,
  triageRecords,
  searchQuery,
  setSearchQuery,
  handleOpenTriageModal,
  handleDeleteTriage,
}) => {
  const filtered = triageRecords.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.month.toLowerCase().includes(q) ||
      String(r.year).includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalRecords = triageRecords.length;
  const totalPatients = triageRecords.reduce((s, r) => s + (r.totalPatients || 0), 0);
  const avgWait = totalRecords ? (triageRecords.reduce((s, r) => s + (r.averageWaitingTime || 0), 0) / totalRecords).toFixed(1) : 0;
  const avgAssess = totalRecords ? (triageRecords.reduce((s, r) => s + (r.averageAssessmentTime || 0), 0) / totalRecords).toFixed(1) : 0;

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'Total Patients', 'Red', 'Yellow',
    'Green', 'Black', 'Avg Wait (m)', 'Avg Assess (m)', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Triage &amp; Assessment</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Emergency Department triage metrics</p>
        </div>
        <button
          onClick={() => handleOpenTriageModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Triage Record
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Records', value: totalRecords, color: 'text-blue-600' },
          { label: 'Total Patients', value: totalPatients, color: 'text-rose-600' },
          { label: 'Avg Waiting Time', value: avgWait, color: 'text-amber-600' },
          { label: 'Avg Assessment Time', value: avgAssess, color: 'text-emerald-600' },
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
                  <td className="px-3 py-3 text-slate-600">{r.totalPatients}</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.redCategory}</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.yellowCategory}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.greenCategory}</td>
                  <td className="px-3 py-3 text-slate-800 font-bold">{r.blackCategory}</td>
                  <td className="px-3 py-3 text-slate-600">{r.averageWaitingTime}</td>
                  <td className="px-3 py-3 text-slate-600">{r.averageAssessmentTime}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Active}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenTriageModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteTriage(r.id)}
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
                    {searchQuery ? 'No records match your search.' : 'No triage records yet. Click "Add Triage Record" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {triageRecords.length} record{triageRecords.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

const MedicationTab = ({
  hospital,
  medicationRecords,
  searchQuery,
  setSearchQuery,
  handleOpenMedicationModal,
  handleDeleteMedication,
}) => {
  const filtered = medicationRecords.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.month.toLowerCase().includes(q) ||
      String(r.year).includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalRecords = medicationRecords.length;
  const totalExpired = medicationRecords.reduce((s, r) => s + (r.expiredDrugs || 0), 0);
  const totalErrors = medicationRecords.reduce((s, r) => s + (r.medicationErrors || 0), 0);
  const avgCompliance = totalRecords ? (medicationRecords.reduce((s, r) => s + (r.crashCartCompliance || 0), 0) / totalRecords).toFixed(1) : 0;

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'Crash Cart Comp', 'High Alert Drugs',
    'Emergency Drug Avail', 'Expired Drugs', 'Med Errors',
    'Inspection Date', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Medication &amp; Crash Cart</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Emergency Department medication safety metrics</p>
        </div>
        <button
          onClick={() => handleOpenMedicationModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Medication Record
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Records', value: totalRecords, color: 'text-blue-600' },
          { label: 'Avg Crash Cart %', value: `${avgCompliance}%`, color: 'text-rose-600' },
          { label: 'Expired Drugs', value: totalExpired, color: 'text-amber-600' },
          { label: 'Med Errors', value: totalErrors, color: 'text-emerald-600' },
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
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.crashCartCompliance}%</td>
                  <td className="px-3 py-3 text-slate-600">{r.highAlertDrugsChecked}</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.emergencyDrugAvailability}%</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.expiredDrugs}</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.medicationErrors}</td>
                  <td className="px-3 py-3 text-slate-600">{r.inspectionDate}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Active}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenMedicationModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteMedication(r.id)}
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
                    {searchQuery ? 'No records match your search.' : 'No medication records yet. Click "Add Medication Record" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {medicationRecords.length} record{medicationRecords.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

const AmbulanceTab = ({
  hospital,
  ambulanceRecords,
  searchQuery,
  setSearchQuery,
  handleOpenAmbulanceModal,
  handleDeleteAmbulance,
}) => {
  const filtered = ambulanceRecords.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.month.toLowerCase().includes(q) ||
      String(r.year).includes(q) ||
      r.ambulanceId.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalRecords = ambulanceRecords.length;
  const avgResponse = totalRecords ? (ambulanceRecords.reduce((s, r) => s + (r.responseTime || 0), 0) / totalRecords).toFixed(1) : 0;
  const avgVehicle = totalRecords ? (ambulanceRecords.reduce((s, r) => s + (r.vehicleReadiness || 0), 0) / totalRecords).toFixed(1) : 0;
  const totalCases = ambulanceRecords.reduce((s, r) => s + (r.casesTransported || 0), 0);

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'Ambulance ID', 'Response Time',
    'Dispatch Time', 'Arrival Time', 'Cases Transported',
    'Vehicle Readiness', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Ambulance</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Emergency Department ambulance metrics</p>
        </div>
        <button
          onClick={() => handleOpenAmbulanceModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Ambulance Record
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Ambulance Records', value: totalRecords, color: 'text-blue-600' },
          { label: 'Average Response Time', value: `${avgResponse} min`, color: 'text-rose-600' },
          { label: 'Vehicle Readiness %', value: `${avgVehicle}%`, color: 'text-amber-600' },
          { label: 'Cases Transported', value: totalCases, color: 'text-emerald-600' },
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
          placeholder="Search by month, year, ambulance ID, or status…"
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
                  <td className="px-3 py-3 font-mono text-slate-600">{r.ambulanceId}</td>
                  <td className="px-3 py-3 text-slate-600">{r.responseTime} min</td>
                  <td className="px-3 py-3 text-slate-600">{r.dispatchTime}</td>
                  <td className="px-3 py-3 text-slate-600">{r.arrivalTime}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.casesTransported}</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.vehicleReadiness}%</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Active}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenAmbulanceModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteAmbulance(r.id)}
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
                    {searchQuery ? 'No records match your search.' : 'No ambulance records yet. Click "Add Ambulance Record" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {ambulanceRecords.length} record{ambulanceRecords.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

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

  const totalRecords = auditRecords.length;
  const avgCompliance = totalRecords ? (auditRecords.reduce((s, r) => s + (r.complianceScore || 0), 0) / totalRecords).toFixed(1) : 0;
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
          <h3 className="text-xs font-extrabold text-slate-800">Audit Checklist</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Emergency Department audit records</p>
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
          { label: 'Total Audits', value: totalRecords, color: 'text-blue-600' },
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

const ReportsTab = ({
  hospital,
  qualityIndicators,
  triageRecords,
  medicationRecords,
  ambulanceRecords,
  auditRecords,
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
  const totalTriage = triageRecords.length;
  const totalMedication = medicationRecords.length;
  const totalAmbulance = ambulanceRecords.length;
  const totalAudit = auditRecords.length;
  const avgDoorToDoctor = totalQuality ? (qualityIndicators.reduce((s, r) => s + (r.doorToDoctorTime || 0), 0) / totalQuality).toFixed(1) : 0;
  const avgResponse = totalAmbulance ? (ambulanceRecords.reduce((s, r) => s + (r.responseTime || 0), 0) / totalAmbulance).toFixed(1) : 0;
  const avgAuditCompliance = totalAudit ? (auditRecords.reduce((s, r) => s + (r.complianceScore || 0), 0) / totalAudit).toFixed(1) : 0;

  const doorToDoctorData = MONTHS.map((month) => {
    const record = qualityIndicators.find((r) => r.month === month);
    return { month, time: record ? record.doorToDoctorTime : 0 };
  }).filter((d) => d.time > 0 || qualityIndicators.some((r) => r.month === d.month));

  const triagePieData = [
    { name: 'Red', value: triageRecords.reduce((s, r) => s + (r.redCategory || 0), 0), color: '#ef4444' },
    { name: 'Yellow', value: triageRecords.reduce((s, r) => s + (r.yellowCategory || 0), 0), color: '#f59e0b' },
    { name: 'Green', value: triageRecords.reduce((s, r) => s + (r.greenCategory || 0), 0), color: '#10b981' },
    { name: 'Black', value: triageRecords.reduce((s, r) => s + (r.blackCategory || 0), 0), color: '#6b7280' },
  ];

  const medicationErrorData = MONTHS.map((month) => {
    const record = medicationRecords.find((r) => r.month === month);
    return { month, errors: record ? record.medicationErrors : 0 };
  }).filter((d) => d.errors > 0 || medicationRecords.some((r) => r.month === d.month));

  const ambulanceResponseData = MONTHS.map((month) => {
    const record = ambulanceRecords.find((r) => r.month === month);
    return { month, time: record ? record.responseTime : 0 };
  }).filter((d) => d.time > 0 || ambulanceRecords.some((r) => r.month === d.month));

  const auditComplianceData = auditRecords.map((r) => ({
    name: r.auditArea,
    score: r.complianceScore,
  }));

  const monthlySummaryData = MONTHS.map((month) => {
    const quality = qualityIndicators.find((r) => r.month === month);
    const triage = triageRecords.find((r) => r.month === month);
    const medication = medicationRecords.find((r) => r.month === month);
    const ambulance = ambulanceRecords.find((r) => r.month === month);
    const audit = auditRecords.find((r) => r.month === month);
    return {
      month,
      doorToDoctor: quality ? quality.doorToDoctorTime : '-',
      initialAssessment: quality ? quality.initialAssessmentTime : '-',
      totalPatients: triage ? triage.totalPatients : '-',
      medicationErrors: medication ? medication.medicationErrors : '-',
      avgResponse: ambulance ? ambulance.responseTime : '-',
      auditCompliance: audit ? `${audit.complianceScore}%` : '-',
      status: audit ? audit.status : '-',
    };
  }).filter((d) => {
    return qualityIndicators.some((r) => r.month === d.month) ||
      triageRecords.some((r) => r.month === d.month) ||
      medicationRecords.some((r) => r.month === d.month) ||
      ambulanceRecords.some((r) => r.month === d.month) ||
      auditRecords.some((r) => r.month === d.month);
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
          <p className="text-[9px] text-slate-400 mt-0.5">Emergency Department consolidated analytics</p>
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
          { label: 'Total Triage Records', value: totalTriage, color: 'text-rose-600' },
          { label: 'Total Medication Records', value: totalMedication, color: 'text-amber-600' },
          { label: 'Total Ambulance Records', value: totalAmbulance, color: 'text-emerald-600' },
          { label: 'Total Audit Records', value: totalAudit, color: 'text-purple-600' },
          { label: 'Avg Door-to-Doctor', value: `${avgDoorToDoctor} min`, color: 'text-cyan-600' },
          { label: 'Avg Response Time', value: `${avgResponse} min`, color: 'text-orange-600' },
          { label: 'Avg Audit Compliance', value: `${avgAuditCompliance}%`, color: 'text-lime-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h4 className="text-xs font-extrabold text-slate-800 mb-4">Monthly Door-to-Doctor Trend</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={doorToDoctorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="time" stroke="#3b82f6" name="Door-to-Doctor (min)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h4 className="text-xs font-extrabold text-slate-800 mb-4">Triage Category Distribution</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={triagePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {triagePieData.map((entry, index) => (
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
            <h4 className="text-xs font-extrabold text-slate-800 mb-4">Medication Error Trend</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={medicationErrorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="errors" fill="#f59e0b" name="Medication Errors" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h4 className="text-xs font-extrabold text-slate-800 mb-4">Ambulance Response Time Trend</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ambulanceResponseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="time" stroke="#10b981" name="Response Time (min)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h4 className="text-xs font-extrabold text-slate-800 mb-4">Audit Compliance by Area</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={auditComplianceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#8b5cf6" name="Compliance %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h4 className="text-xs font-extrabold text-slate-800 mb-4">Monthly Emergency Summary</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySummaryData.map((d) => ({ ...d, doorToDoctor: typeof d.doorToDoctor === 'number' ? d.doorToDoctor : 0 }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="doorToDoctor" stroke="#3b82f6" name="Door-to-Doctor" strokeWidth={2} />
                <Line type="monotone" dataKey="totalPatients" stroke="#ef4444" name="Total Patients" strokeWidth={2} />
                <Line type="monotone" dataKey="medicationErrors" stroke="#f59e0b" name="Med Errors" strokeWidth={2} />
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
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Door-to-Doctor Time</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Initial Assessment</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Total Patients</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Medication Errors</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Avg Response Time</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Audit Compliance</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {monthlySummaryData.map((row) => (
                  <tr key={row.month} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-semibold text-slate-700 whitespace-nowrap">{row.month}</td>
                    <td className="px-3 py-3 text-slate-600">{row.doorToDoctor}</td>
                    <td className="px-3 py-3 text-slate-600">{row.initialAssessment}</td>
                    <td className="px-3 py-3 text-slate-600">{row.totalPatients}</td>
                    <td className="px-3 py-3 text-amber-600 font-bold">{row.medicationErrors}</td>
                    <td className="px-3 py-3 text-slate-600">{row.avgResponse}</td>
                    <td className="px-3 py-3 text-blue-600 font-bold">{row.auditCompliance}</td>
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

const EmergencyWorkspace = ({ onBack }) => {
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

  /* ── Triage & Assessment state ── */
  const [triageRecords, setTriageRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_TRIAGE);
    return saved ? JSON.parse(saved) : SAMPLE_TRIAGE_RECORDS;
  });
  const [isTriageModalOpen, setIsTriageModalOpen] = useState(false);
  const [editingTriageId, setEditingTriageId] = useState(null);
  const [triageForm, setTriageForm] = useState({ ...EMPTY_TRIAGE_FORM });
  const [triageSearch, setTriageSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_TRIAGE, JSON.stringify(triageRecords));
  }, [triageRecords]);

  const getNextTriageId = () => {
    const maxNum = triageRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `eqt-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenTriageModal = (record = null) => {
    if (record) {
      setTriageForm({ ...record });
      setEditingTriageId(record.id);
    } else {
      setTriageForm({ ...EMPTY_TRIAGE_FORM, id: getNextTriageId() });
      setEditingTriageId(null);
    }
    setIsTriageModalOpen(true);
  };

  const handleSaveTriage = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingTriageId) {
      setTriageRecords((prev) =>
        prev.map((r) => (r.id === editingTriageId ? { ...triageForm, id: editingTriageId } : r))
      );
    } else {
      setTriageRecords((prev) => [...prev, { ...triageForm }]);
    }
    setIsTriageModalOpen(false);
    setEditingTriageId(null);
  };

  const handleDeleteTriage = (id) => {
    if (window.confirm('Delete this triage record?')) {
      setTriageRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  /* ── Medication & Crash Cart state ── */
  const [medicationRecords, setMedicationRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_MEDICATION);
    return saved ? JSON.parse(saved) : SAMPLE_MEDICATION_RECORDS;
  });
  const [isMedicationModalOpen, setIsMedicationModalOpen] = useState(false);
  const [editingMedicationId, setEditingMedicationId] = useState(null);
  const [medicationForm, setMedicationForm] = useState({ ...EMPTY_MEDICATION_FORM });
  const [medicationSearch, setMedicationSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_MEDICATION, JSON.stringify(medicationRecords));
  }, [medicationRecords]);

  const getNextMedicationId = () => {
    const maxNum = medicationRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `emc-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenMedicationModal = (record = null) => {
    if (record) {
      setMedicationForm({ ...record });
      setEditingMedicationId(record.id);
    } else {
      setMedicationForm({ ...EMPTY_MEDICATION_FORM, id: getNextMedicationId() });
      setEditingMedicationId(null);
    }
    setIsMedicationModalOpen(true);
  };

  const handleSaveMedication = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingMedicationId) {
      setMedicationRecords((prev) =>
        prev.map((r) => (r.id === editingMedicationId ? { ...medicationForm, id: editingMedicationId } : r))
      );
    } else {
      setMedicationRecords((prev) => [...prev, { ...medicationForm }]);
    }
    setIsMedicationModalOpen(false);
    setEditingMedicationId(null);
  };

  const handleDeleteMedication = (id) => {
    if (window.confirm('Delete this medication record?')) {
      setMedicationRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  /* ── Ambulance state ── */
  const [ambulanceRecords, setAmbulanceRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_AMBULANCE);
    return saved ? JSON.parse(saved) : SAMPLE_AMBULANCE_RECORDS;
  });
  const [isAmbulanceModalOpen, setIsAmbulanceModalOpen] = useState(false);
  const [editingAmbulanceId, setEditingAmbulanceId] = useState(null);
  const [ambulanceForm, setAmbulanceForm] = useState({ ...EMPTY_AMBULANCE_FORM });
  const [ambulanceSearch, setAmbulanceSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_AMBULANCE, JSON.stringify(ambulanceRecords));
  }, [ambulanceRecords]);

  const getNextAmbulanceId = () => {
    const maxNum = ambulanceRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `eam-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenAmbulanceModal = (record = null) => {
    if (record) {
      setAmbulanceForm({ ...record });
      setEditingAmbulanceId(record.id);
    } else {
      setAmbulanceForm({ ...EMPTY_AMBULANCE_FORM, id: getNextAmbulanceId() });
      setEditingAmbulanceId(null);
    }
    setIsAmbulanceModalOpen(true);
  };

  const handleSaveAmbulance = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingAmbulanceId) {
      setAmbulanceRecords((prev) =>
        prev.map((r) => (r.id === editingAmbulanceId ? { ...ambulanceForm, id: editingAmbulanceId } : r))
      );
    } else {
      setAmbulanceRecords((prev) => [...prev, { ...ambulanceForm }]);
    }
    setIsAmbulanceModalOpen(false);
    setEditingAmbulanceId(null);
  };

  const handleDeleteAmbulance = (id) => {
    if (window.confirm('Delete this ambulance record?')) {
      setAmbulanceRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  /* ── Audit Checklist state ── */
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
    return `eau-${String(maxNum + 1).padStart(3, '0')}`;
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
      case 'triage':
        return (
          <TriageTab
            hospital={hospital}
            triageRecords={triageRecords}
            searchQuery={triageSearch}
            setSearchQuery={setTriageSearch}
            handleOpenTriageModal={handleOpenTriageModal}
            handleDeleteTriage={handleDeleteTriage}
          />
        );
      case 'medication':
        return (
          <MedicationTab
            hospital={hospital}
            medicationRecords={medicationRecords}
            searchQuery={medicationSearch}
            setSearchQuery={setMedicationSearch}
            handleOpenMedicationModal={handleOpenMedicationModal}
            handleDeleteMedication={handleDeleteMedication}
          />
        );
      case 'ambulance':
        return (
          <AmbulanceTab
            hospital={hospital}
            ambulanceRecords={ambulanceRecords}
            searchQuery={ambulanceSearch}
            setSearchQuery={setAmbulanceSearch}
            handleOpenAmbulanceModal={handleOpenAmbulanceModal}
            handleDeleteAmbulance={handleDeleteAmbulance}
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
            triageRecords={triageRecords}
            medicationRecords={medicationRecords}
            ambulanceRecords={ambulanceRecords}
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
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">Emergency Department</h2>
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
            Emergency Dept — NABH Module
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
                <p className="text-[9px] text-slate-400 mt-0.5">Emergency Department — Quality Metrics</p>
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

              {/* Time Metrics */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Time Metrics</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Door-to-Doctor Time (min)" field="doorToDoctorTime" form={qualityForm} setForm={setQualityForm} />
                  <NumField label="Initial Assessment Time (min)" field="initialAssessmentTime" form={qualityForm} setForm={setQualityForm} />
                </div>
              </div>

              {/* Patient Outcomes */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Patient Outcomes &amp; Compliance</p>
                <div className="grid grid-cols-3 gap-3">
                  <NumField label="LWBS Cases" field="lwbs" form={qualityForm} setForm={setQualityForm} />
                  <NumField label="72h Return Visits" field="returnVisits72h" form={qualityForm} setForm={setQualityForm} />
                  <NumField label="Triage Compliance %" field="triageCompliance" form={qualityForm} setForm={setQualityForm} step="0.1" />
                  <div className="col-span-3">
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
      {/* ── Triage & Assessment Modal ── */}
      {isTriageModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingTriageId ? 'Edit Triage Record' : 'Add Monthly Triage Data'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Emergency Department — Triage & Assessment</p>
              </div>
              <button
                onClick={() => { setIsTriageModalOpen(false); setEditingTriageId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveTriage} className="space-y-5">
              {/* Reporting Period & Total Patients */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                    <select
                      value={triageForm.month}
                      onChange={(e) => setTriageForm({ ...triageForm, month: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                    <input
                      type="number"
                      value={triageForm.year}
                      onChange={(e) => setTriageForm({ ...triageForm, year: parseInt(e.target.value) || 2025 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <NumField label="Total Patients" field="totalPatients" form={triageForm} setForm={setTriageForm} />
                </div>
              </div>

              {/* Triage Categories */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Triage Categories</p>
                <div className="grid grid-cols-4 gap-3">
                  <NumField label="Red (Resuscitation)" field="redCategory" form={triageForm} setForm={setTriageForm} />
                  <NumField label="Yellow (Emergent)" field="yellowCategory" form={triageForm} setForm={setTriageForm} />
                  <NumField label="Green (Urgent)" field="greenCategory" form={triageForm} setForm={setTriageForm} />
                  <NumField label="Black (Deceased)" field="blackCategory" form={triageForm} setForm={setTriageForm} />
                </div>
              </div>

              {/* Time & Status */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Time & Status</p>
                <div className="grid grid-cols-3 gap-3">
                  <NumField label="Avg Waiting Time (min)" field="averageWaitingTime" form={triageForm} setForm={setTriageForm} />
                  <NumField label="Avg Assessment Time (min)" field="averageAssessmentTime" form={triageForm} setForm={setTriageForm} />
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select
                      value={triageForm.status}
                      onChange={(e) => setTriageForm({ ...triageForm, status: e.target.value })}
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
                  onClick={() => { setIsTriageModalOpen(false); setEditingTriageId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingTriageId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ── Medication & Crash Cart Modal ── */}
      {isMedicationModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingMedicationId ? 'Edit Medication Record' : 'Add Monthly Medication Data'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Emergency Department — Medication & Crash Cart</p>
              </div>
              <button
                onClick={() => { setIsMedicationModalOpen(false); setEditingMedicationId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveMedication} className="space-y-5">
              {/* Reporting Period */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                    <select
                      value={medicationForm.month}
                      onChange={(e) => setMedicationForm({ ...medicationForm, month: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                    <input
                      type="number"
                      value={medicationForm.year}
                      onChange={(e) => setMedicationForm({ ...medicationForm, year: parseInt(e.target.value) || 2025 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Inspection Date</label>
                    <input
                      type="date"
                      value={medicationForm.inspectionDate}
                      onChange={(e) => setMedicationForm({ ...medicationForm, inspectionDate: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Compliance Metrics */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Compliance & Availability</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Crash Cart Compliance %" field="crashCartCompliance" form={medicationForm} setForm={setMedicationForm} step="0.1" />
                  <NumField label="Emergency Drug Availability %" field="emergencyDrugAvailability" form={medicationForm} setForm={setMedicationForm} step="0.1" />
                </div>
              </div>

              {/* Drug Checks & Errors */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Drug Checks &amp; Errors</p>
                <div className="grid grid-cols-3 gap-3">
                  <NumField label="High Alert Drugs Checked" field="highAlertDrugsChecked" form={medicationForm} setForm={setMedicationForm} />
                  <NumField label="Expired Drugs" field="expiredDrugs" form={medicationForm} setForm={setMedicationForm} />
                  <NumField label="Medication Errors" field="medicationErrors" form={medicationForm} setForm={setMedicationForm} />
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Status</p>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select
                      value={medicationForm.status}
                      onChange={(e) => setMedicationForm({ ...medicationForm, status: e.target.value })}
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
                  onClick={() => { setIsMedicationModalOpen(false); setEditingMedicationId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingMedicationId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ── Ambulance Modal ── */}
      {isAmbulanceModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingAmbulanceId ? 'Edit Ambulance Record' : 'Add Ambulance Record'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Emergency Department — Ambulance</p>
              </div>
              <button
                onClick={() => { setIsAmbulanceModalOpen(false); setEditingAmbulanceId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveAmbulance} className="space-y-5">
              {/* Reporting Period & Ambulance ID */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                    <select
                      value={ambulanceForm.month}
                      onChange={(e) => setAmbulanceForm({ ...ambulanceForm, month: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                    <input
                      type="number"
                      value={ambulanceForm.year}
                      onChange={(e) => setAmbulanceForm({ ...ambulanceForm, year: parseInt(e.target.value) || 2025 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Ambulance ID</label>
                    <input
                      type="text"
                      value={ambulanceForm.ambulanceId}
                      onChange={(e) => setAmbulanceForm({ ...ambulanceForm, ambulanceId: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="e.g. AMB-01"
                    />
                  </div>
                </div>
              </div>

              {/* Time Metrics */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Time Metrics</p>
                <div className="grid grid-cols-3 gap-3">
                  <NumField label="Response Time (min)" field="responseTime" form={ambulanceForm} setForm={setAmbulanceForm} step="0.1" />
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Dispatch Time</label>
                    <input
                      type="time"
                      value={ambulanceForm.dispatchTime}
                      onChange={(e) => setAmbulanceForm({ ...ambulanceForm, dispatchTime: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Arrival Time</label>
                    <input
                      type="time"
                      value={ambulanceForm.arrivalTime}
                      onChange={(e) => setAmbulanceForm({ ...ambulanceForm, arrivalTime: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Readiness & Status */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Readiness &amp; Status</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Cases Transported" field="casesTransported" form={ambulanceForm} setForm={setAmbulanceForm} />
                  <NumField label="Vehicle Readiness %" field="vehicleReadiness" form={ambulanceForm} setForm={setAmbulanceForm} step="0.1" />
                  <NumField label="Equipment Readiness %" field="equipmentReadiness" form={ambulanceForm} setForm={setAmbulanceForm} step="0.1" />
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select
                      value={ambulanceForm.status}
                      onChange={(e) => setAmbulanceForm({ ...ambulanceForm, status: e.target.value })}
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
                  onClick={() => { setIsAmbulanceModalOpen(false); setEditingAmbulanceId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingAmbulanceId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ── Audit Checklist Modal ── */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingAuditId ? 'Edit Audit Record' : 'Add Audit Record'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Emergency Department — Audit Checklist</p>
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
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period</p>
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
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Area</label>
                    <input
                      type="text"
                      value={auditForm.auditArea}
                      onChange={(e) => setAuditForm({ ...auditForm, auditArea: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="e.g. Triage Area"
                    />
                  </div>
                </div>
              </div>

              {/* Compliance & Findings */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Compliance & Findings</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Compliance Score %" field="complianceScore" form={auditForm} setForm={setAuditForm} step="0.1" />
                  <NumField label="Findings" field="findings" form={auditForm} setForm={setAuditForm} />
                </div>
              </div>

              {/* Details */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Audit Details</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Corrective Action</label>
                    <input
                      type="text"
                      value={auditForm.correctiveAction}
                      onChange={(e) => setAuditForm({ ...auditForm, correctiveAction: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="Describe corrective action taken"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Auditor</label>
                    <input
                      type="text"
                      value={auditForm.auditor}
                      onChange={(e) => setAuditForm({ ...auditForm, auditor: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="Auditor name"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Date</label>
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

export default EmergencyWorkspace;

import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  ChevronLeft,
  LayoutDashboard,
  BarChart3,
  Stethoscope,
  CheckSquare,
  Wrench,
  ClipboardList,
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
  { id: 'dashboard',      label: 'Dashboard',               icon: LayoutDashboard },
  { id: 'quality',        label: 'Quality Indicators',      icon: BarChart3 },
  { id: 'procedure',      label: 'Procedure Management',   icon: Stethoscope },
  { id: 'radiation',      label: 'Radiation Safety',       icon: CheckSquare },
  { id: 'equipment',      label: 'Equipment Management',   icon: Wrench },
  { id: 'audit',          label: 'Audit Checklist',        icon: ClipboardList },
  { id: 'reports',        label: 'Reports',                 icon: FileText },
];

const LS_KEY_QUALITY = 'cathlab_quality_indicators';

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const EMPTY_QUALITY_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  totalProcedures: 0,
  doorToBalloonTime: 0,
  procedureSuccessRate: 100,
  complicationRate: 0,
  bleedingComplicationRate: 0,
  contrastReactionRate: 0,
  infectionRate: 0,
  mortalityRate: 0,
  patientSatisfaction: 100,
  status: 'Active',
};

const SAMPLE_QUALITY_INDICATORS = [
  { id: 'cqi-001', month: 'January',  year: 2025, totalProcedures: 45, doorToBalloonTime: 28, procedureSuccessRate: 98, complicationRate: 2.1, bleedingComplicationRate: 1.2, contrastReactionRate: 0.5, infectionRate: 0.3, mortalityRate: 0.5, patientSatisfaction: 94, status: 'Active' },
  { id: 'cqi-002', month: 'February', year: 2025, totalProcedures: 42, doorToBalloonTime: 32, procedureSuccessRate: 97, complicationRate: 2.5, bleedingComplicationRate: 1.5, contrastReactionRate: 0.8, infectionRate: 0.4, mortalityRate: 0.7, patientSatisfaction: 92, status: 'Active' },
  { id: 'cqi-003', month: 'March',    year: 2025, totalProcedures: 50, doorToBalloonTime: 25, procedureSuccessRate: 99, complicationRate: 1.8, bleedingComplicationRate: 1.0, contrastReactionRate: 0.3, infectionRate: 0.2, mortalityRate: 0.3, patientSatisfaction: 95, status: 'Active' },
  { id: 'cqi-004', month: 'April',    year: 2025, totalProcedures: 48, doorToBalloonTime: 30, procedureSuccessRate: 96, complicationRate: 2.8, bleedingComplicationRate: 1.6, contrastReactionRate: 0.9, infectionRate: 0.5, mortalityRate: 0.8, patientSatisfaction: 91, status: 'Active' },
  { id: 'cqi-005', month: 'May',      year: 2025, totalProcedures: 52, doorToBalloonTime: 27, procedureSuccessRate: 98, complicationRate: 2.2, bleedingComplicationRate: 1.3, contrastReactionRate: 0.6, infectionRate: 0.3, mortalityRate: 0.4, patientSatisfaction: 93, status: 'Active' },
];

const LS_KEY_PROCEDURE = 'cathlab_procedure_management';
const LS_KEY_RADIATION = 'cathlab_radiation_safety';

const EMPTY_RADIATION_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  totalFluoroscopyProcedures: 0,
  leadApronCompliance: 100,
  thyroidShieldCompliance: 100,
  dosimeterBadgeCompliance: 100,
  averageFluoroscopyTime: 0,
  radiationExposureIncidents: 0,
  staffDoseMonitoringCompliance: 100,
  status: 'Active',
};

const SAMPLE_RADIATION_RECORDS = [
  { id: 'crr-001', month: 'January',  year: 2025, totalFluoroscopyProcedures: 45, leadApronCompliance: 98, thyroidShieldCompliance: 96, dosimeterBadgeCompliance: 100, averageFluoroscopyTime: 12, radiationExposureIncidents: 0, staffDoseMonitoringCompliance: 99, status: 'Active' },
  { id: 'crr-002', month: 'February', year: 2025, totalFluoroscopyProcedures: 42, leadApronCompliance: 97, thyroidShieldCompliance: 95, dosimeterBadgeCompliance: 99, averageFluoroscopyTime: 14, radiationExposureIncidents: 0, staffDoseMonitoringCompliance: 98, status: 'Active' },
  { id: 'crr-003', month: 'March',    year: 2025, totalFluoroscopyProcedures: 50, leadApronCompliance: 99, thyroidShieldCompliance: 98, dosimeterBadgeCompliance: 100, averageFluoroscopyTime: 11, radiationExposureIncidents: 1, staffDoseMonitoringCompliance: 100, status: 'Active' },
  { id: 'crr-004', month: 'April',    year: 2025, totalFluoroscopyProcedures: 48, leadApronCompliance: 96, thyroidShieldCompliance: 94, dosimeterBadgeCompliance: 98, averageFluoroscopyTime: 15, radiationExposureIncidents: 0, staffDoseMonitoringCompliance: 97, status: 'Active' },
  { id: 'crr-005', month: 'May',      year: 2025, totalFluoroscopyProcedures: 52, leadApronCompliance: 100, thyroidShieldCompliance: 97, dosimeterBadgeCompliance: 100, averageFluoroscopyTime: 10, radiationExposureIncidents: 0, staffDoseMonitoringCompliance: 99, status: 'Active' },
];

const EMPTY_PROCEDURE_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  procedureType: 'Diagnostic',
  totalProcedures: 0,
  coronaryAngiography: 0,
  pciPtca: 0,
  pacemakerImplantation: 0,
  epRfAblation: 0,
  procedureSuccessRate: 100,
  averageProcedureTime: 0,
  status: 'Active',
};

const SAMPLE_PROCEDURE_RECORDS = [
  { id: 'cpp-001', month: 'January',  year: 2025, procedureType: 'Diagnostic', totalProcedures: 25, coronaryAngiography: 15, pciPtca: 8, pacemakerImplantation: 2, epRfAblation: 0, procedureSuccessRate: 98, averageProcedureTime: 45, status: 'Active' },
  { id: 'cpp-002', month: 'February', year: 2025, procedureType: 'Therapeutic', totalProcedures: 28, coronaryAngiography: 12, pciPtca: 15, pacemakerImplantation: 1, epRfAblation: 0, procedureSuccessRate: 96, averageProcedureTime: 60, status: 'Active' },
  { id: 'cpp-003', month: 'March',    year: 2025, procedureType: 'Mixed', totalProcedures: 30, coronaryAngiography: 18, pciPtca: 10, pacemakerImplantation: 2, epRfAblation: 0, procedureSuccessRate: 99, averageProcedureTime: 55, status: 'Active' },
  { id: 'cpp-004', month: 'April',    year: 2025, procedureType: 'Emergency', totalProcedures: 22, coronaryAngiography: 10, pciPtca: 12, pacemakerImplantation: 0, epRfAblation: 0, procedureSuccessRate: 95, averageProcedureTime: 50, status: 'Active' },
  { id: 'cpp-005', month: 'May',      year: 2025, procedureType: 'Therapeutic', totalProcedures: 32, coronaryAngiography: 16, pciPtca: 14, pacemakerImplantation: 2, epRfAblation: 0, procedureSuccessRate: 97, averageProcedureTime: 58, status: 'Active' },
];

const LS_KEY_EQUIPMENT = 'cathlab_equipment_management';

const EMPTY_EQUIPMENT_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  equipmentName: '',
  equipmentCategory: 'Imaging',
  preventiveMaintenanceStatus: 'Up-to-date',
  calibrationStatus: 'Calibrated',
  breakdownCount: 0,
  downtime: 0,
  lastServiceDate: '',
  nextServiceDate: '',
  status: 'Active',
};

const SAMPLE_EQUIPMENT_RECORDS = [
  { id: 'ceq-001', month: 'January',  year: 2025, equipmentName: 'Cath Lab Imaging System', equipmentCategory: 'Imaging', preventiveMaintenanceStatus: 'Up-to-date', calibrationStatus: 'Calibrated', breakdownCount: 0, downtime: 0, lastServiceDate: '2025-01-10', nextServiceDate: '2025-07-10', status: 'Active' },
  { id: 'ceq-002', month: 'January',  year: 2025, equipmentName: 'Patient Monitor', equipmentCategory: 'Monitoring', preventiveMaintenanceStatus: 'Due Soon', calibrationStatus: 'Calibrated', breakdownCount: 1, downtime: 4, lastServiceDate: '2025-01-05', nextServiceDate: '2025-04-05', status: 'Active' },
  { id: 'ceq-003', month: 'February', year: 2025, equipmentName: 'Defibrillator', equipmentCategory: 'Life Support', preventiveMaintenanceStatus: 'Up-to-date', calibrationStatus: 'Pending', breakdownCount: 0, downtime: 0, lastServiceDate: '2025-02-12', nextServiceDate: '2025-08-12', status: 'Active' },
  { id: 'ceq-004', month: 'February', year: 2025, equipmentName: 'Contrast Injector', equipmentCategory: 'Infusion', preventiveMaintenanceStatus: 'Up-to-date', calibrationStatus: 'Calibrated', breakdownCount: 0, downtime: 0, lastServiceDate: '2025-02-08', nextServiceDate: '2025-05-08', status: 'Active' },
  { id: 'ceq-005', month: 'March',    year: 2025, equipmentName: 'Infusion Pump', equipmentCategory: 'Infusion', preventiveMaintenanceStatus: 'Overdue', calibrationStatus: 'Calibrated', breakdownCount: 2, downtime: 8, lastServiceDate: '2025-03-01', nextServiceDate: '2025-03-15', status: 'Pending' },
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

const DashboardTab = ({ hospital }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xs font-extrabold text-slate-800">CathLab Dashboard</h3>
        <p className="text-[9px] text-slate-400 mt-0.5">Key performance metrics and department overview</p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[
        { label: 'Department Status', value: 'Active', color: 'text-emerald-600' },
        { label: 'Quality Module', value: 'NABH', color: 'text-sky-600' },
        { label: 'Accreditation', value: 'Valid', color: 'text-blue-600' },
        { label: 'Last Audit', value: 'Jun 2025', color: 'text-violet-600' },
      ].map((kpi) => (
        <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
          <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
        </div>
      ))}
    </div>
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center">
      <p className="text-[10px] text-slate-500 font-semibold">Select a tab from the sidebar to view detailed records, analytics, and reports.</p>
    </div>
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
  const avgSuccessRate = totalRecords ? (qualityIndicators.reduce((s, r) => s + (r.procedureSuccessRate || 0), 0) / totalRecords).toFixed(1) : 0;
  const avgDoorToBalloon = totalRecords ? (qualityIndicators.reduce((s, r) => s + (r.doorToBalloonTime || 0), 0) / totalRecords).toFixed(1) : 0;
  const avgSatisfaction = totalRecords ? (qualityIndicators.reduce((s, r) => s + (r.patientSatisfaction || 0), 0) / totalRecords).toFixed(1) : 0;

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'Total Procedures', 'Door-to-Balloon', 'Success Rate',
    'Complication Rate', 'Bleeding Rate', 'Contrast Reaction', 'Infection Rate', 'Mortality Rate', 'Patient Satisfaction', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Quality Indicators</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">CathLab Department monthly metrics</p>
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
          { label: 'Procedure Success Rate', value: `${avgSuccessRate}%`, color: 'text-rose-600' },
          { label: 'Avg Door-to-Balloon', value: `${avgDoorToBalloon} min`, color: 'text-amber-600' },
          { label: 'Patient Satisfaction', value: `${avgSatisfaction}%`, color: 'text-emerald-600' },
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
                  <td className="px-3 py-3 text-slate-600">{r.doorToBalloonTime}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.procedureSuccessRate}%</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.complicationRate}%</td>
                  <td className="px-3 py-3 text-orange-600 font-bold">{r.bleedingComplicationRate}%</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.contrastReactionRate}%</td>
                  <td className="px-3 py-3 text-purple-600 font-bold">{r.infectionRate}%</td>
                  <td className="px-3 py-3 text-red-600 font-bold">{r.mortalityRate}%</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.patientSatisfaction}%</td>
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
  const totalProcedures = procedureRecords.reduce((s, r) => s + (r.totalProcedures || 0), 0);
  const totalCoronary = procedureRecords.reduce((s, r) => s + (r.coronaryAngiography || 0), 0);
  const totalPCI = procedureRecords.reduce((s, r) => s + (r.pciPtca || 0), 0);
  const avgSuccessRate = totalRecords ? (procedureRecords.reduce((s, r) => s + (r.procedureSuccessRate || 0), 0) / totalRecords).toFixed(1) : 0;

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'Procedure Type', 'Total Procedures', 'Coronary Angio', 'PCI/PTCA', 'Pacemaker', 'EP/RF Ablation', 'Success Rate', 'Avg Time', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Procedure Management</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">CathLab Department procedure metrics</p>
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
          { label: 'Total Procedures', value: totalProcedures, color: 'text-blue-600' },
          { label: 'Coronary Angiography', value: totalCoronary, color: 'text-rose-600' },
          { label: 'PCI/PTCA Procedures', value: totalPCI, color: 'text-amber-600' },
          { label: 'Procedure Success Rate', value: `${avgSuccessRate}%`, color: 'text-emerald-600' },
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
                  <td className="px-3 py-3 text-slate-600">{r.totalProcedures}</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.coronaryAngiography}</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.pciPtca}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.pacemakerImplantation}</td>
                  <td className="px-3 py-3 text-purple-600 font-bold">{r.epRfAblation}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.procedureSuccessRate}%</td>
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
  const totalFluoroscopy = radiationRecords.reduce((s, r) => s + (r.totalFluoroscopyProcedures || 0), 0);
  const avgLeadApron = totalRecords ? (radiationRecords.reduce((s, r) => s + (r.leadApronCompliance || 0), 0) / totalRecords).toFixed(1) : 0;
  const avgDosimeter = totalRecords ? (radiationRecords.reduce((s, r) => s + (r.dosimeterBadgeCompliance || 0), 0) / totalRecords).toFixed(1) : 0;
  const totalIncidents = radiationRecords.reduce((s, r) => s + (r.radiationExposureIncidents || 0), 0);

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'Fluoroscopy Procedures', 'Lead Apron', 'Thyroid Shield',
    'Dosimeter Badge', 'Avg Fluoroscopy Time', 'Staff Dose Compliance', 'Radiation Incidents', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Radiation Safety</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">CathLab Department radiation safety metrics</p>
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
          { label: 'Total Fluoroscopy Procedures', value: totalFluoroscopy, color: 'text-blue-600' },
          { label: 'Lead Apron Compliance %', value: `${avgLeadApron}%`, color: 'text-rose-600' },
          { label: 'Dosimeter Badge Compliance %', value: `${avgDosimeter}%`, color: 'text-amber-600' },
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
                  <td className="px-3 py-3 text-slate-600">{r.totalFluoroscopyProcedures}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.leadApronCompliance}%</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.thyroidShieldCompliance}%</td>
                  <td className="px-3 py-3 text-purple-600 font-bold">{r.dosimeterBadgeCompliance}%</td>
                  <td className="px-3 py-3 text-slate-600">{r.averageFluoroscopyTime}</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.staffDoseMonitoringCompliance}%</td>
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
  const calibCompliant = equipmentRecords.filter((r) => r.calibrationStatus === 'Calibrated').length;
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
          <h3 className="text-xs font-extrabold text-slate-800">Equipment Management</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">CathLab Department equipment metrics</p>
        </div>
        <button
          onClick={() => handleOpenEquipmentModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Equipment Record
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
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${r.calibrationStatus === 'Calibrated' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
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
                    {searchQuery ? 'No records match your search.' : 'No equipment records yet. Click "Add Equipment Record" to begin.'}
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

const LS_KEY_AUDIT = 'cathlab_audit_checklist';

const EMPTY_AUDIT_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  auditArea: 'Care of Patients',
  complianceScore: 100,
  findings: 0,
  correctiveAction: '',
  auditor: '',
  auditDate: '',
  status: 'Active',
};

const SAMPLE_AUDIT_RECORDS = [
  { id: 'ca-001', month: 'January',  year: 2025, auditArea: 'Care of Patients', complianceScore: 96, findings: 2, correctiveAction: 'Updated patient monitoring protocols', auditor: 'Dr. Sharma', auditDate: '2025-01-15', status: 'Active' },
  { id: 'ca-002', month: 'February', year: 2025, auditArea: 'Radiation Safety', complianceScore: 92, findings: 5, correctiveAction: 'Replaced expired lead aprons', auditor: 'Dr. Patel', auditDate: '2025-02-10', status: 'Active' },
  { id: 'ca-003', month: 'March',    year: 2025, auditArea: 'Infection Control', complianceScore: 98, findings: 1, correctiveAction: 'Enhanced sterilization procedures', auditor: 'Dr. Kumar', auditDate: '2025-03-05', status: 'Active' },
  { id: 'ca-004', month: 'April',    year: 2025, auditArea: 'Medication Management', complianceScore: 94, findings: 3, correctiveAction: 'Corrected storage temperature', auditor: 'Dr. Singh', auditDate: '2025-04-12', status: 'Pending' },
  { id: 'ca-005', month: 'May',      year: 2025, auditArea: 'Equipment Management', complianceScore: 97, findings: 2, correctiveAction: 'Scheduled preventive maintenance', auditor: 'Dr. Reddy', auditDate: '2025-05-08', status: 'Active' },
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
          <h3 className="text-xs font-extrabold text-slate-800">Audit Checklist</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">CathLab Department audit records</p>
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

const ReportsTab = ({
  hospital,
  qualityIndicators,
  procedureRecords,
  radiationRecords,
  equipmentRecords,
  auditRecords,
}) => {
  const totalQuality = qualityIndicators.length;
  const totalProcedure = procedureRecords.length;
  const totalRadiation = radiationRecords.length;
  const totalEquipment = equipmentRecords.length;
  const totalAudit = auditRecords.length;
  const avgProcedureSuccessRate = totalProcedure
    ? (procedureRecords.reduce((s, r) => s + (r.procedureSuccessRate || 0), 0) / totalProcedure).toFixed(1)
    : 0;
  const avgDoorToBalloon = totalQuality
    ? (qualityIndicators.reduce((s, r) => s + (r.doorToBalloonTime || 0), 0) / totalQuality).toFixed(1)
    : 0;
  const avgAuditCompliance = totalAudit
    ? (auditRecords.reduce((s, r) => s + (r.complianceScore || 0), 0) / totalAudit).toFixed(1)
    : 0;

  const procedureTrendData = qualityIndicators.map((r) => ({
    month: r.month,
    procedures: r.totalProcedures || 0,
    successRate: r.procedureSuccessRate || 0,
  }));

  const procedureDistData = procedureRecords.reduce((acc, r) => {
    const type = r.procedureType || 'Other';
    const existing = acc.find((d) => d.name === type);
    if (existing) existing.value += r.totalProcedures || 0;
    else acc.push({ name: type, value: r.totalProcedures || 0 });
    return acc;
  }, []);

  const radiationComplianceData = radiationRecords.map((r) => ({
    month: r.month,
    compliance: ((r.leadApronCompliance + r.thyroidShieldCompliance + r.dosimeterBadgeCompliance) / 3).toFixed(1),
  }));

  const equipmentStatusData = equipmentRecords.reduce((acc, r) => {
    const status = r.status || 'Active';
    const existing = acc.find((d) => d.name === status);
    if (existing) existing.value += 1;
    else acc.push({ name: status, value: 1 });
    return acc;
  }, []);

  const auditComplianceData = auditRecords.map((r) => ({
    month: r.month,
    compliance: r.complianceScore || 0,
  }));

  const monthlySummaryData = qualityIndicators.map((q) => {
    const monthProcedures = procedureRecords
      .filter((p) => p.month === q.month && p.year === q.year)
      .reduce((s, p) => s + (p.totalProcedures || 0), 0);
    const monthRadiation = radiationRecords
      .filter((r) => r.month === q.month && r.year === q.year)
      .reduce((s, r) => s + (r.dosimeterBadgeCompliance || 0), 0);
    const monthEquipment = equipmentRecords
      .filter((e) => e.month === q.month && e.year === q.year)
      .reduce((s, e) => s + (e.preventiveMaintenanceStatus === 'Up-to-date' ? 100 : 0), 0);
    const equipmentCount = equipmentRecords.filter((e) => e.month === q.month && e.year === q.year).length;
    const monthAudit = auditRecords
      .filter((a) => a.month === q.month && a.year === q.year)
      .reduce((s, a) => s + (a.complianceScore || 0), 0);
    const auditCount = auditRecords.filter((a) => a.month === q.month && a.year === q.year).length;

    return {
      month: `${q.month} ${q.year}`,
      totalProcedures: monthProcedures || q.totalProcedures,
      doorToBalloon: q.doorToBalloonTime,
      successRate: q.procedureSuccessRate,
      radiationCompliance: monthRadiation / (radiationRecords.filter((r) => r.month === q.month && r.year === q.year).length || 1),
      equipmentCompliance: equipmentCount ? monthEquipment / equipmentCount : 100,
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
          <p className="text-[9px] text-slate-400 mt-0.5">CathLab Department analytics dashboard</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Quality Records', value: totalQuality, color: 'text-blue-600' },
          { label: 'Total Procedure Records', value: totalProcedure, color: 'text-rose-600' },
          { label: 'Total Radiation Records', value: totalRadiation, color: 'text-amber-600' },
          { label: 'Total Equipment Records', value: totalEquipment, color: 'text-emerald-600' },
          { label: 'Total Audit Records', value: totalAudit, color: 'text-purple-600' },
          { label: 'Avg Procedure Success Rate', value: `${avgProcedureSuccessRate}%`, color: 'text-sky-600' },
          { label: 'Avg Door-to-Balloon Time', value: `${avgDoorToBalloon} min`, color: 'text-cyan-600' },
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
          <h4 className="text-[10px] font-bold text-slate-700 mb-3">Monthly Procedure Trend</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={procedureTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="procedures" stroke="#3b82f6" strokeWidth={2} name="Procedures" />
              <Line type="monotone" dataKey="successRate" stroke="#10b981" strokeWidth={2} name="Success Rate" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-3">Procedure Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={procedureDistData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                {procedureDistData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-3">Radiation Compliance</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={radiationComplianceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} domain={[90, 100]} />
              <Tooltip />
              <Bar dataKey="compliance" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-3">Equipment Status</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={equipmentStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                {equipmentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-3">Audit Compliance Trend</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={auditComplianceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="compliance" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-3">Monthly Cath Lab Summary</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlySummaryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalProcedures" stroke="#3b82f6" strokeWidth={2} name="Procedures" />
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
                {['Month', 'Total Procedures', 'Door-to-Balloon Time', 'Procedure Success Rate', 'Radiation Compliance', 'Equipment Compliance', 'Audit Compliance', 'Status'].map((h) => (
                  <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {monthlySummaryData.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-3 py-3 font-semibold text-slate-700 whitespace-nowrap">{r.month}</td>
                  <td className="px-3 py-3 text-slate-600">{r.totalProcedures}</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.doorToBalloon} min</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.successRate}%</td>
                  <td className="px-3 py-3 text-orange-600 font-bold">{r.radiationCompliance.toFixed(1)}%</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.equipmentCompliance.toFixed(1)}%</td>
                  <td className="px-3 py-3 text-purple-600 font-bold">{r.auditCompliance.toFixed(1)}%</td>
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

const CathLabWorkspace = ({ onBack }) => {
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
    return `cqi-${String(maxNum + 1).padStart(3, '0')}`;
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
    return `cpp-${String(maxNum + 1).padStart(3, '0')}`;
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
    return `crr-${String(maxNum + 1).padStart(3, '0')}`;
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
    return `ceq-${String(maxNum + 1).padStart(3, '0')}`;
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
    return `ca-${String(maxNum + 1).padStart(3, '0')}`;
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
        return <ReportsTab hospital={hospital} qualityIndicators={qualityIndicators} procedureRecords={procedureRecords} radiationRecords={radiationRecords} equipmentRecords={equipmentRecords} auditRecords={auditRecords} />;
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
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">CathLab Department</h2>
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
            CathLab Dept — NABH Module
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
                <p className="text-[9px] text-slate-400 mt-0.5">CathLab Department — Quality Metrics</p>
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

              {/* Procedure Metrics */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Procedure Metrics</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Total Procedures" field="totalProcedures" form={qualityForm} setForm={setQualityForm} />
                  <NumField label="Door-to-Balloon Time (min)" field="doorToBalloonTime" form={qualityForm} setForm={setQualityForm} />
                  <NumField label="Procedure Success Rate %" field="procedureSuccessRate" form={qualityForm} setForm={setQualityForm} step="0.1" />
                  <NumField label="Complication Rate %" field="complicationRate" form={qualityForm} setForm={setQualityForm} step="0.1" />
                  <NumField label="Bleeding Complication Rate %" field="bleedingComplicationRate" form={qualityForm} setForm={setQualityForm} step="0.1" />
                  <NumField label="Contrast Reaction Rate %" field="contrastReactionRate" form={qualityForm} setForm={setQualityForm} step="0.1" />
                  <NumField label="Infection Rate %" field="infectionRate" form={qualityForm} setForm={setQualityForm} step="0.1" />
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

      {/* ── Procedure Management Modal ── */}
      {isProcedureModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingProcedureId ? 'Edit Procedure Record' : 'Add Monthly Procedure Data'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">CathLab Department — Procedure Management</p>
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
                  <NumField label="Total Procedures" field="totalProcedures" form={procedureForm} setForm={setProcedureForm} />
                  <NumField label="Coronary Angiography" field="coronaryAngiography" form={procedureForm} setForm={setProcedureForm} />
                  <NumField label="PCI/PTCA" field="pciPtca" form={procedureForm} setForm={setProcedureForm} />
                  <NumField label="Pacemaker Implantation" field="pacemakerImplantation" form={procedureForm} setForm={setProcedureForm} />
                  <NumField label="EP Study / RF Ablation" field="epRfAblation" form={procedureForm} setForm={setProcedureForm} />
                  <NumField label="Procedure Success Rate %" field="procedureSuccessRate" form={procedureForm} setForm={setProcedureForm} step="0.1" />
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

      {/* ── Equipment Management Modal ── */}
      {isEquipmentModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingEquipmentId ? 'Edit Equipment Record' : 'Add Equipment Data'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">CathLab Department — Equipment Management</p>
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
                      placeholder="e.g., Cath Lab Imaging System"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Equipment Category *</label>
                    <select
                      value={equipmentForm.equipmentCategory}
                      onChange={(e) => setEquipmentForm({ ...equipmentForm, equipmentCategory: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Imaging">Imaging</option>
                      <option value="Monitoring">Monitoring</option>
                      <option value="Life Support">Life Support</option>
                      <option value="Infusion">Infusion</option>
                      <option value="Radiation">Radiation</option>
                      <option value="Consumables">Consumables</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Preventive Maintenance Status *</label>
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
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Service Metrics */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Service Metrics</p>
                <div className="grid grid-cols-2 gap-3">
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

      {/* ── Audit Checklist Modal ── */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingAuditId ? 'Edit Audit Record' : 'Add Audit Record'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">CathLab Department — Audit Checklist</p>
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
                      <option value="Care of Patients">Care of Patients</option>
                      <option value="Radiation Safety">Radiation Safety</option>
                      <option value="Infection Control">Infection Control</option>
                      <option value="Medication Management">Medication Management</option>
                      <option value="Equipment Management">Equipment Management</option>
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
                      placeholder="e.g., Updated sterilization protocols"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Auditor *</label>
                    <input
                      type="text"
                      value={auditForm.auditor}
                      onChange={(e) => setAuditForm({ ...auditForm, auditor: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="e.g., Dr. Sharma"
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

export default CathLabWorkspace;

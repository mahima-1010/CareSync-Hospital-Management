import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  ChevronLeft,
  LayoutDashboard,
  BarChart3,
  TestTube2,
  Microscope,
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

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const LS_KEY_QUALITY = 'cssd_quality_indicators';

const STERILIZATION_METHODS = ['Steam Autoclave', 'ETO', 'Plasma Sterilization'];

const LS_KEY_STERILIZATION = 'cssd_sterilization_process';

const LS_KEY_EQUIPMENT = 'cssd_equipment_validation';

const LS_KEY_STORAGE = 'cssd_sterile_storage';

const LS_KEY_AUDIT = 'cssd_internal_audit';

const AUDIT_AREAS = ['Decontamination', 'Sterilization Process', 'Equipment Validation', 'Biological Indicator Monitoring', 'Sterile Storage', 'Distribution Process', 'Documentation & Traceability', 'Infection Prevention'];

const EMPTY_AUDIT_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  auditArea: 'Decontamination',
  complianceScore: 100,
  findings: '',
  correctiveAction: '',
  auditor: '',
  auditDate: '',
  status: 'Active',
};

const AUDIT_RECORDS = [
  { id: 'cssd-au-001', month: 'January', year: 2025, auditArea: 'Decontamination', complianceScore: 98, findings: 'Minor labeling issues', correctiveAction: 'Staff retraining completed', auditor: 'John Smith', auditDate: '2025-01-20', status: 'Active' },
  { id: 'cssd-au-002', month: 'February', year: 2025, auditArea: 'Sterilization Process', complianceScore: 95, findings: 'Steam quality monitoring inconsistent', correctiveAction: 'Enhanced monitoring protocol', auditor: 'Jane Doe', auditDate: '2025-02-15', status: 'Active' },
  { id: 'cssd-au-003', month: 'March', year: 2025, auditArea: 'Equipment Validation', complianceScore: 100, findings: '', correctiveAction: '', auditor: 'Mike Brown', auditDate: '2025-03-10', status: 'Active' },
  { id: 'cssd-au-004', month: 'April', year: 2025, auditArea: 'Sterile Storage', complianceScore: 92, findings: 'Humidity slightly elevated', correctiveAction: 'HVAC adjustments made', auditor: 'Sarah Lee', auditDate: '2025-04-05', status: 'Active' },
  { id: 'cssd-au-005', month: 'May', year: 2025, auditArea: 'Distribution Process', complianceScore: 96, findings: 'Issue slip missing for 2 items', correctiveAction: 'Process reinforcement', auditor: 'Tom Wilson', auditDate: '2025-05-01', status: 'Active' },
];

const STORAGE_AREAS = ['Main Sterile Store', 'OT Sterile Store', 'ICU Sterile Store', 'Cath Lab Store', 'Emergency Store'];

const EMPTY_STORAGE_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  storageArea: 'Main Sterile Store',
  sterilePacksStored: 0,
  temperature: 20,
  humidity: 50,
  fifoFefoCompliance: 100,
  packIntegrity: 100,
  itemsIssued: 0,
  status: 'Active',
};

const STORAGE_RECORDS = [
  { id: 'cssd-sto-001', month: 'January', year: 2025, storageArea: 'Main Sterile Store', sterilePacksStored: 2500, temperature: 22, humidity: 45, fifoFefoCompliance: 98, packIntegrity: 99, itemsIssued: 1800, status: 'Active' },
  { id: 'cssd-sto-002', month: 'February', year: 2025, storageArea: 'OT Sterile Store', sterilePacksStored: 1200, temperature: 22, humidity: 48, fifoFefoCompliance: 97, packIntegrity: 98, itemsIssued: 1100, status: 'Active' },
  { id: 'cssd-sto-003', month: 'March', year: 2025, storageArea: 'ICU Sterile Store', sterilePacksStored: 800, temperature: 24, humidity: 42, fifoFefoCompliance: 99, packIntegrity: 100, itemsIssued: 750, status: 'Active' },
  { id: 'cssd-sto-004', month: 'April', year: 2025, storageArea: 'Cath Lab Store', sterilePacksStored: 600, temperature: 22, humidity: 46, fifoFefoCompliance: 96, packIntegrity: 97, itemsIssued: 580, status: 'Active' },
  { id: 'cssd-sto-005', month: 'May', year: 2025, storageArea: 'Emergency Store', sterilePacksStored: 400, temperature: 23, humidity: 44, fifoFefoCompliance: 95, packIntegrity: 96, itemsIssued: 350, status: 'Active' },
];

const EQUIPMENT_TYPES = ['Autoclave', 'ETO', 'Ultrasonic Cleaner', 'Sealer', 'Other'];

const EMPTY_EQUIPMENT_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  equipmentName: '',
  equipmentType: 'Autoclave',
  preventiveMaintenanceStatus: 'Done',
  calibrationStatus: 'Done',
  bowieDickTestStatus: 'Done',
  biologicalIndicatorStatus: 'Done',
  breakdownCount: 0,
  lastValidationDate: '',
  status: 'Active',
};

const EQUIPMENT_RECORDS = [
  { id: 'cssd-eq-001', month: 'January', year: 2025, equipmentName: 'Steam Autoclave 1', equipmentType: 'Autoclave', preventiveMaintenanceStatus: 'Done', calibrationStatus: 'Done', bowieDickTestStatus: 'Done', biologicalIndicatorStatus: 'Passed', breakdownCount: 0, lastValidationDate: '2025-01-25', status: 'Active' },
  { id: 'cssd-eq-002', month: 'February', year: 2025, equipmentName: 'Steam Autoclave 2', equipmentType: 'Autoclave', preventiveMaintenanceStatus: 'Done', calibrationStatus: 'Due', bowieDickTestStatus: 'Done', biologicalIndicatorStatus: 'Passed', breakdownCount: 0, lastValidationDate: '2025-02-20', status: 'Active' },
  { id: 'cssd-eq-003', month: 'March', year: 2025, equipmentName: 'ETO Sterilizer', equipmentType: 'ETO', preventiveMaintenanceStatus: 'Done', calibrationStatus: 'Done', bowieDickTestStatus: 'N/A', biologicalIndicatorStatus: 'Passed', breakdownCount: 1, lastValidationDate: '2025-03-15', status: 'Active' },
  { id: 'cssd-eq-004', month: 'April', year: 2025, equipmentName: 'ETO Film Sealer', equipmentType: 'Sealer', preventiveMaintenanceStatus: 'Pending', calibrationStatus: 'Done', bowieDickTestStatus: 'N/A', biologicalIndicatorStatus: 'Passed', breakdownCount: 0, lastValidationDate: '2025-04-10', status: 'Active' },
  { id: 'cssd-eq-005', month: 'May', year: 2025, equipmentName: 'Ultrasonic Cleaner', equipmentType: 'Ultrasonic Cleaner', preventiveMaintenanceStatus: 'Done', calibrationStatus: 'Done', bowieDickTestStatus: 'N/A', biologicalIndicatorStatus: 'Passed', breakdownCount: 0, lastValidationDate: '2025-05-05', status: 'Active' },
];

const EMPTY_QUALITY_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  totalSterilizationLoads: 0,
  sterilizationFailureRate: 0,
  biologicalIndicatorPassRate: 100,
  chemicalIndicatorCompliance: 100,
  bowieDickTestCompliance: 100,
  recallIncidents: 0,
  turnaroundTime: 0,
  status: 'Active',
};

const QUALITY_RECORDS = [
  { id: 'cssd-qi-001', month: 'January', year: 2025, totalSterilizationLoads: 1250, sterilizationFailureRate: 2.5, biologicalIndicatorPassRate: 99.2, chemicalIndicatorCompliance: 98.5, bowieDickTestCompliance: 100, recallIncidents: 0, turnaroundTime: 180, status: 'Active' },
  { id: 'cssd-qi-002', month: 'February', year: 2025, totalSterilizationLoads: 1180, sterilizationFailureRate: 1.8, biologicalIndicatorPassRate: 99.5, chemicalIndicatorCompliance: 98.8, bowieDickTestCompliance: 100, recallIncidents: 0, turnaroundTime: 175, status: 'Active' },
  { id: 'cssd-qi-003', month: 'March', year: 2025, totalSterilizationLoads: 1320, sterilizationFailureRate: 3.2, biologicalIndicatorPassRate: 98.9, chemicalIndicatorCompliance: 97.5, bowieDickTestCompliance: 100, recallIncidents: 1, turnaroundTime: 190, status: 'Active' },
  { id: 'cssd-qi-004', month: 'April', year: 2025, totalSterilizationLoads: 1200, sterilizationFailureRate: 2.1, biologicalIndicatorPassRate: 99.3, chemicalIndicatorCompliance: 99.0, bowieDickTestCompliance: 100, recallIncidents: 0, turnaroundTime: 178, status: 'Active' },
  { id: 'cssd-qi-005', month: 'May', year: 2025, totalSterilizationLoads: 1280, sterilizationFailureRate: 1.5, biologicalIndicatorPassRate: 99.6, chemicalIndicatorCompliance: 99.2, bowieDickTestCompliance: 100, recallIncidents: 0, turnaroundTime: 172, status: 'Active' },
];

const EMPTY_STERILIZATION_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  sterilizationMethod: 'Steam Autoclave',
  totalLoads: 0,
  steamLoads: 0,
  etoLoads: 0,
  biologicalIndicatorPassed: 0,
  chemicalIndicatorPassed: 0,
  failedLoads: 0,
  recallRequired: 'No',
  status: 'Active',
};

const STERILIZATION_RECORDS = [
  { id: 'cssd-st-001', month: 'January', year: 2025, sterilizationMethod: 'Steam Autoclave', totalLoads: 450, steamLoads: 400, etoLoads: 0, biologicalIndicatorPassed: 380, chemicalIndicatorPassed: 445, failedLoads: 2, recallRequired: 'No', status: 'Active' },
  { id: 'cssd-st-002', month: 'February', year: 2025, sterilizationMethod: 'Steam Autoclave', totalLoads: 420, steamLoads: 380, etoLoads: 0, biologicalIndicatorPassed: 365, chemicalIndicatorPassed: 410, failedLoads: 1, recallRequired: 'No', status: 'Active' },
  { id: 'cssd-st-003', month: 'March', year: 2025, sterilizationMethod: 'ETO', totalLoads: 120, steamLoads: 0, etoLoads: 120, biologicalIndicatorPassed: 115, chemicalIndicatorPassed: 118, failedLoads: 0, recallRequired: 'No', status: 'Active' },
  { id: 'cssd-st-004', month: 'April', year: 2025, sterilizationMethod: 'Steam Autoclave', totalLoads: 400, steamLoads: 350, etoLoads: 0, biologicalIndicatorPassed: 340, chemicalIndicatorPassed: 390, failedLoads: 3, recallRequired: 'Yes', status: 'Active' },
  { id: 'cssd-st-005', month: 'May', year: 2025, sterilizationMethod: 'Plasma Sterilization', totalLoads: 80, steamLoads: 0, etoLoads: 0, biologicalIndicatorPassed: 78, chemicalIndicatorPassed: 79, failedLoads: 0, recallRequired: 'No', status: 'Active' },
];

const DEFAULT_CSSD_MODULES = [
  {
    id: 'overview',
    label: 'CSSD Overview',
    policy: 'CSSD shall maintain a unidirectional workflow.',
  },
];

const ICON_MAP = {
  BookOpen: TestTube2, Settings: Microscope, Shield: ShieldCheck, Users: TestTube2,
  Activity: BarChart3, FileText: FileText, Award: BarChart3, Layers: TestTube2,
  AlertTriangle: TestTube2, Clipboard: ClipboardCheck, Trash2: TestTube2, CheckCircle: BarChart3,
};

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'quality', label: 'Quality Indicators', icon: BarChart3 },
  { id: 'sterilization', label: 'Sterilization Process Management', icon: TestTube2 },
  { id: 'equipment', label: 'Equipment & Validation', icon: Microscope },
  { id: 'storage', label: 'Sterile Storage & Distribution', icon: ShieldCheck },
  { id: 'audit', label: 'Internal Audit Checklist', icon: ClipboardCheck },
  { id: 'reports', label: 'Reports', icon: FileText },
];

const DashboardTab = () => (
  <div className="text-xs text-slate-600">Dashboard content coming soon...</div>
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

  const totalLoads = qualityIndicators.reduce((s, r) => s + (r.totalSterilizationLoads || 0), 0);
  const avgBiPassRate = qualityIndicators.length ? (qualityIndicators.reduce((s, r) => s + (r.biologicalIndicatorPassRate || 0), 0) / qualityIndicators.length).toFixed(1) : 0;
  const avgBowieDick = qualityIndicators.length ? (qualityIndicators.reduce((s, r) => s + (r.bowieDickTestCompliance || 0), 0) / qualityIndicators.length).toFixed(1) : 0;
  const avgFailureRate = qualityIndicators.length ? (qualityIndicators.reduce((s, r) => s + (r.sterilizationFailureRate || 0), 0) / qualityIndicators.length).toFixed(2) : 0;

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'Total Loads', 'Failure Rate', 'BI Pass Rate',
    'Chemical Indicator Compliance', 'Bowie-Dick Compliance', 'Recall Incidents',
    'Turnaround Time', 'Status', 'Actions',
  ];

  const NumField = ({ label, field, form, setForm, step = '1' }) => (
    <div>
      <label className="block text-[9px] font-medium text-slate-600 mb-1">{label}</label>
      <input
        type="number"
        step={step}
        min="0"
        max={field.includes('Rate') || field.includes('Compliance') ? '100' : undefined}
        value={form[field]}
        onChange={(e) => {
          const val = parseFloat(e.target.value) || 0;
          const max = field.includes('Rate') || field.includes('Compliance') ? 100 : undefined;
          setForm({ ...form, [field]: max !== undefined ? Math.min(Math.max(0, val), max) : Math.max(0, val) });
        }}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Quality Indicators</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">CSSD sterilization quality metrics</p>
        </div>
        <button
          onClick={() => handleOpenQualityModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Sterilization Loads', value: totalLoads, color: 'text-blue-600' },
          { label: 'Biological Indicator Pass Rate %', value: `${avgBiPassRate}%`, color: 'text-emerald-600' },
          { label: 'Bowie-Dick Compliance %', value: `${avgBowieDick}%`, color: 'text-sky-600' },
          { label: 'Sterilization Failure Rate %', value: `${avgFailureRate}%`, color: 'text-rose-600' },
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
                  <td className="px-3 py-3 text-slate-600">{r.totalSterilizationLoads}</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.sterilizationFailureRate}%</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.biologicalIndicatorPassRate}%</td>
                  <td className="px-3 py-3 text-sky-600 font-bold">{r.chemicalIndicatorCompliance}%</td>
                  <td className="px-3 py-3 text-violet-600 font-bold">{r.bowieDickTestCompliance}%</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.recallIncidents}</td>
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
                    {searchQuery ? 'No records match your search.' : 'No quality records yet. Click "Add Record" to begin.'}
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

const SterilizationTab = ({
  hospital,
  sterilizationRecords,
  searchQuery,
  setSearchQuery,
  handleOpenSterilizationModal,
  handleDeleteSterilization,
}) => {
  const filtered = sterilizationRecords.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.month.toLowerCase().includes(q) ||
      String(r.year).includes(q) ||
      r.sterilizationMethod.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalLoads = sterilizationRecords.reduce((s, r) => s + (r.totalLoads || 0), 0);
  const totalSteamLoads = sterilizationRecords.reduce((s, r) => s + (r.steamLoads || 0), 0);
  const totalEtoLoads = sterilizationRecords.reduce((s, r) => s + (r.etoLoads || 0), 0);
  const totalFailedLoads = sterilizationRecords.reduce((s, r) => s + (r.failedLoads || 0), 0);

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'Sterilization Method', 'Total Loads',
    'Steam Loads', 'ETO Loads', 'Biological Indicator',
    'Chemical Indicator', 'Failed Loads', 'Recall Required',
    'Status', 'Actions',
  ];

  const NumInput = ({ label, field, form, setForm, step = '1' }) => (
    <div>
      <label className="block text-[9px] font-medium text-slate-600 mb-1">{label}</label>
      <input
        type="number"
        step={step}
        min="0"
        value={form[field] || ''}
        onChange={(e) => {
          let val = parseFloat(e.target.value) || 0;
          if (field === 'failedLoads' && val > (form.totalLoads || 0)) {
            val = form.totalLoads || 0;
          }
          setForm({ ...form, [field]: Math.max(0, val) });
        }}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Sterilization Process Management</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">CSSD sterilization process tracking</p>
        </div>
        <button
          onClick={() => handleOpenSterilizationModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Sterilization Loads', value: totalLoads, color: 'text-blue-600' },
          { label: 'Steam Loads', value: totalSteamLoads, color: 'text-emerald-600' },
          { label: 'ETO Loads', value: totalEtoLoads, color: 'text-sky-600' },
          { label: 'Failed Loads', value: totalFailedLoads, color: 'text-rose-600' },
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
          placeholder="Search by month, method, or status…"
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
                  <td className="px-3 py-3 text-violet-600 font-bold">{r.sterilizationMethod}</td>
                  <td className="px-3 py-3 text-slate-600">{r.totalLoads}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.steamLoads}</td>
                  <td className="px-3 py-3 text-sky-600 font-bold">{r.etoLoads}</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.biologicalIndicatorPassed}</td>
                  <td className="px-3 py-3 text-slate-600">{r.chemicalIndicatorPassed}</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.failedLoads}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${r.recallRequired === 'Yes' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                      {r.recallRequired}
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
                        onClick={() => handleOpenSterilizationModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteSterilization(r.id)}
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
                    {searchQuery ? 'No records match your search.' : 'No sterilization records yet. Click "Add Record" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {sterilizationRecords.length} record{sterilizationRecords.length !== 1 ? 's' : ''}
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
      r.equipmentName.toLowerCase().includes(q) ||
      r.equipmentType.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalEquipment = equipmentRecords.length;
  const calibrationCompliance = equipmentRecords.length ? (equipmentRecords.filter((r) => r.calibrationStatus === 'Done').length / equipmentRecords.length * 100).toFixed(1) : 0;
  const biCompliance = equipmentRecords.length ? (equipmentRecords.filter((r) => r.biologicalIndicatorStatus === 'Passed').length / equipmentRecords.length * 100).toFixed(1) : 0;
  const pmCompliance = equipmentRecords.length ? (equipmentRecords.filter((r) => r.preventiveMaintenanceStatus === 'Done').length / equipmentRecords.length * 100).toFixed(1) : 0;

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Equipment Name', 'Equipment Type', 'PM Status',
    'Calibration Status', 'Bowie-Dick Status', 'Biological Indicator',
    'Breakdown Count', 'Last Validation', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Equipment & Validation</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">CSSD equipment monitoring and validation</p>
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
          { label: 'Calibration Compliance %', value: `${calibrationCompliance}%`, color: 'text-emerald-600' },
          { label: 'Biological Indicator %', value: `${biCompliance}%`, color: 'text-sky-600' },
          { label: 'PM Compliance %', value: `${pmCompliance}%`, color: 'text-violet-600' },
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
          placeholder="Search by equipment name, type, or status…"
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
                  <td className="px-3 py-3 font-semibold text-slate-700">{r.equipmentName}</td>
                  <td className="px-3 py-3 text-violet-600 font-bold">{r.equipmentType}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.preventiveMaintenanceStatus] || STATUS_BADGE.Active}`}>
                      {r.preventiveMaintenanceStatus}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.calibrationStatus] || STATUS_BADGE.Active}`}>
                      {r.calibrationStatus}
                    </span>
                  </td>
                  <td className="px-3 py-3">{r.bowieDickTestStatus}</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.biologicalIndicatorStatus}</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.breakdownCount}</td>
                  <td className="px-3 py-3 text-slate-600">{r.lastValidationDate}</td>
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

const StorageTab = ({
  hospital,
  storageRecords,
  searchQuery,
  setSearchQuery,
  handleOpenStorageModal,
  handleDeleteStorage,
}) => {
  const filtered = storageRecords.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.month.toLowerCase().includes(q) ||
      r.storageArea.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalPacks = storageRecords.reduce((s, r) => s + (r.sterilePacksStored || 0), 0);
  const totalIssued = storageRecords.reduce((s, r) => s + (r.itemsIssued || 0), 0);
  const avgFifoCompliance = storageRecords.length ? (storageRecords.reduce((s, r) => s + (r.fifoFefoCompliance || 0), 0) / storageRecords.length).toFixed(1) : 0;
  const avgPackIntegrity = storageRecords.length ? (storageRecords.reduce((s, r) => s + (r.packIntegrity || 0), 0) / storageRecords.length).toFixed(1) : 0;

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'Storage Area', 'Sterile Packs Stored',
    'Temperature', 'Humidity', 'FIFO/FEFO Compliance',
    'Pack Integrity', 'Items Issued', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Sterile Storage & Distribution</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">CSSD storage and distribution tracking</p>
        </div>
        <button
          onClick={() => handleOpenStorageModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Sterile Packs', value: totalPacks, color: 'text-blue-600' },
          { label: 'FIFO/FEFO Compliance %', value: `${avgFifoCompliance}%`, color: 'text-emerald-600' },
          { label: 'Pack Integrity %', value: `${avgPackIntegrity}%`, color: 'text-sky-600' },
          { label: 'Items Issued', value: totalIssued, color: 'text-violet-600' },
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
          placeholder="Search by month, area, or status…"
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
                  <td className="px-3 py-3 text-violet-600 font-bold">{r.storageArea}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.sterilePacksStored}</td>
                  <td className="px-3 py-3 text-slate-600">{r.temperature}°C</td>
                  <td className="px-3 py-3 text-sky-600 font-bold">{r.humidity}%</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.fifoFefoCompliance}%</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.packIntegrity}%</td>
                  <td className="px-3 py-3 text-slate-600">{r.itemsIssued}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Active}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenStorageModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteStorage(r.id)}
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
                    {searchQuery ? 'No records match your search.' : 'No storage records yet. Click "Add Record" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {storageRecords.length} record{storageRecords.length !== 1 ? 's' : ''}
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
      r.auditArea.toLowerCase().includes(q) ||
      r.auditor.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalAudits = auditRecords.length;
  const avgCompliance = auditRecords.length ? (auditRecords.reduce((s, r) => s + (r.complianceScore || 0), 0) / auditRecords.length).toFixed(1) : 0;
  const openFindings = auditRecords.filter((r) => r.findings && r.findings.trim() !== '').length;
  const closedFindings = auditRecords.filter((r) => r.correctiveAction && r.correctiveAction.trim() !== '').length;

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Audit ID', 'Month', 'Audit Area', 'Compliance %', 'Findings',
    'Corrective Action', 'Auditor', 'Audit Date', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Internal Audit Checklist</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">CSSD audit tracking and compliance</p>
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
          { label: 'Average Compliance %', value: `${avgCompliance}%`, color: 'text-emerald-600' },
          { label: 'Open Findings', value: openFindings, color: 'text-amber-600' },
          { label: 'Closed Findings', value: closedFindings, color: 'text-sky-600' },
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
          placeholder="Search by month, area, auditor, or status…"
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
                  <td className="px-3 py-3 text-violet-600 font-bold">{r.auditArea}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.complianceScore}%</td>
                  <td className="px-3 py-3 text-slate-600 max-w-[150px] truncate">{r.findings || '-'}</td>
                  <td className="px-3 py-3 text-sky-600 max-w-[150px] truncate">{r.correctiveAction || '-'}</td>
                  <td className="px-3 py-3 text-slate-600">{r.auditor}</td>
                  <td className="px-3 py-3 text-slate-600">{r.auditDate || '-'}</td>
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

const ReportsTab = ({ qualityIndicators, sterilizationRecords, equipmentRecords, storageRecords, auditRecords, hospital }) => {
  const totalQuality = qualityIndicators.length;
  const totalSterilization = sterilizationRecords.length;
  const totalEquipment = equipmentRecords.length;
  const totalStorage = storageRecords.length;
  const totalAudit = auditRecords.length;
  const avgBiPassRate = qualityIndicators.length ? (qualityIndicators.reduce((s, r) => s + (r.biologicalIndicatorPassRate || 0), 0) / qualityIndicators.length).toFixed(1) : 0;
  const avgFailureRate = qualityIndicators.length ? (qualityIndicators.reduce((s, r) => s + (r.sterilizationFailureRate || 0), 0) / qualityIndicators.length).toFixed(2) : 0;
  const avgAuditCompliance = auditRecords.length ? (auditRecords.reduce((s, r) => s + (r.complianceScore || 0), 0) / auditRecords.length).toFixed(1) : 0;

  const monthlySterilizationData = qualityIndicators.map((r, idx) => ({
    month: r.month,
    loads: r.totalSterilizationLoads || 0,
    biPassRate: r.biologicalIndicatorPassRate || 0,
    failureRate: r.sterilizationFailureRate || 0,
  }));

  const sterilizationMethodData = STERILIZATION_METHODS.map((method) => ({
    name: method,
    value: sterilizationRecords.filter(r => r.sterilizationMethod === method).reduce((s, r) => s + (r.totalLoads || 0), 0),
  })).filter(d => d.value > 0);

  const equipmentComplianceData = equipmentRecords.map(r => ({
    name: r.equipmentName || r.id,
    pmStatus: r.preventiveMaintenanceStatus === 'Done' ? 100 : 0,
    calibration: r.calibrationStatus === 'Done' ? 100 : 0,
    biStatus: r.biologicalIndicatorStatus === 'Passed' ? 100 : 0,
  }));

  const storageTrendData = storageRecords.map(r => ({
    month: r.month,
    fifoFefo: r.fifoFefoCompliance || 0,
    packIntegrity: r.packIntegrity || 0,
  }));

  const auditAreaData = AUDIT_AREAS.map((area) => ({
    area,
    compliance: auditRecords.filter(r => r.auditArea === area).length
      ? (auditRecords.filter(r => r.auditArea === area).reduce((s, r) => s + (r.complianceScore || 0), 0) / auditRecords.filter(r => r.auditArea === area).length).toFixed(1)
      : 0,
  })).filter(d => d.compliance > 0);

  const monthlySummary = MONTHS.map((month) => {
    const quality = qualityIndicators.find(r => r.month === month) || {};
    const equips = equipmentRecords.filter(r => r.month === month);
    const storage = storageRecords.find(r => r.month === month) || {};
    const audits = auditRecords.filter(r => r.month === month);
    const equipCompliance = equips.length ? (equips.filter(e => e.calibrationStatus === 'Done').length / equips.length * 100).toFixed(1) : 0;
    const storageCompliance = storage.fifoFefoCompliance || 0;
    const auditCompliance = audits.length ? (audits.reduce((s, r) => s + (r.complianceScore || 0), 0) / audits.length).toFixed(1) : 0;
    const hasData = quality.totalSterilizationLoads || equips.length || storage.sterilePacksStored || audits.length;
    return {
      month,
      loads: quality.totalSterilizationLoads || 0,
      biPassRate: quality.biologicalIndicatorPassRate || 0,
      failureRate: quality.sterilizationFailureRate || 0,
      equipCompliance: parseFloat(equipCompliance),
      storageCompliance: storageCompliance,
      auditCompliance: parseFloat(auditCompliance),
      status: hasData ? 'Complete' : 'No Data',
    };
  });

  const handleExportCSV = () => {
    alert('Export CSV - placeholder');
  };
  const handleExportPDF = () => {
    alert('Export PDF - placeholder');
  };
  const handlePrintReport = () => {
    alert('Print Report - placeholder');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Reports & Analytics</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">CSSD comprehensive reporting dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            style={{ backgroundColor: hospital.themeColor }}
            className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
          <button
            onClick={handleExportPDF}
            style={{ backgroundColor: hospital.themeColor }}
            className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" /> Export PDF
          </button>
          <button
            onClick={handlePrintReport}
            style={{ backgroundColor: hospital.themeColor }}
            className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" /> Print Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Quality Records', value: totalQuality, color: 'text-blue-600' },
          { label: 'Total Sterilization Records', value: totalSterilization, color: 'text-emerald-600' },
          { label: 'Total Equipment Records', value: totalEquipment, color: 'text-sky-600' },
          { label: 'Total Storage Records', value: totalStorage, color: 'text-violet-600' },
          { label: 'Total Audit Records', value: totalAudit, color: 'text-amber-600' },
          { label: 'Average BI Pass Rate %', value: `${avgBiPassRate}%`, color: 'text-rose-600' },
          { label: 'Average Sterilization Failure Rate %', value: `${avgFailureRate}%`, color: 'text-orange-600' },
          { label: 'Average Audit Compliance %', value: `${avgAuditCompliance}%`, color: 'text-indigo-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-extrabold text-slate-800 mb-3">Monthly Sterilization Trend</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlySterilizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="loads" stroke="#3b82f6" name="Total Loads" />
              <Line type="monotone" dataKey="biPassRate" stroke="#10b981" name="BI Pass Rate %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-extrabold text-slate-800 mb-3">Sterilization Method Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={sterilizationMethodData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                {sterilizationMethodData.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={['#3b82f6', '#10b981', '#8b5cf6'][idx % 3]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-extrabold text-slate-800 mb-3">Equipment Validation Compliance</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={equipmentComplianceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="pmStatus" fill="#10b981" name="PM Compliance" />
              <Bar dataKey="calibration" fill="#3b82f6" name="Calibration Compliance" />
              <Bar dataKey="biStatus" fill="#8b5cf6" name="BI Compliance" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-extrabold text-slate-800 mb-3">Storage Compliance Trend</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={storageTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="fifoFefo" stroke="#10b981" name="FIFO/FEFO Compliance %" />
              <Line type="monotone" dataKey="packIntegrity" stroke="#3b82f6" name="Pack Integrity %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-extrabold text-slate-800 mb-3">Audit Compliance by Area</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={auditAreaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="area" tick={{ fontSize: 9 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="compliance" fill="#3b82f6" name="Compliance %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-extrabold text-slate-800 mb-3">Monthly CSSD Summary</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlySummary}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="loads" stroke="#3b82f6" name="Sterilization Loads" />
              <Line type="monotone" dataKey="biPassRate" stroke="#10b981" name="BI Pass Rate %" />
              <Line type="monotone" dataKey="auditCompliance" stroke="#8b5cf6" name="Audit Compliance %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Month', 'Total Sterilization Loads', 'BI Pass Rate %', 'Sterilization Failure Rate %', 'Equipment Validation Compliance %', 'Storage Compliance %', 'Audit Compliance %', 'Status'].map((h) => (
                  <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {monthlySummary.map((r) => (
                <tr key={r.month} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-3 py-3 font-semibold text-slate-700">{r.month}</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.loads}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.biPassRate}%</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.failureRate}%</td>
                  <td className="px-3 py-3 text-sky-600 font-bold">{r.equipCompliance}%</td>
                  <td className="px-3 py-3 text-violet-600 font-bold">{r.storageCompliance}%</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.auditCompliance}%</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${r.status === 'Complete' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const CSSDWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();
  const [activeTab, setActiveTab] = useState('dashboard');

  const [qualityIndicators, setQualityIndicators] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_QUALITY);
    return saved ? JSON.parse(saved) : QUALITY_RECORDS;
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
    return `cssd-qi-${String(maxNum + 1).padStart(3, '0')}`;
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
    if (window.confirm('Delete this quality record?')) {
      setQualityIndicators((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const [sterilizationRecords, setSterilizationRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_STERILIZATION);
    return saved ? JSON.parse(saved) : STERILIZATION_RECORDS;
  });
  const [isSterilizationModalOpen, setIsSterilizationModalOpen] = useState(false);
  const [editingSterilizationId, setEditingSterilizationId] = useState(null);
  const [sterilizationForm, setSterilizationForm] = useState({ ...EMPTY_STERILIZATION_FORM });
  const [sterilizationSearch, setSterilizationSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_STERILIZATION, JSON.stringify(sterilizationRecords));
  }, [sterilizationRecords]);

  const getNextSterilizationId = () => {
    const maxNum = sterilizationRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `cssd-st-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenSterilizationModal = (record = null) => {
    if (record) {
      setSterilizationForm({ ...record });
      setEditingSterilizationId(record.id);
    } else {
      setSterilizationForm({ ...EMPTY_STERILIZATION_FORM, id: getNextSterilizationId() });
      setEditingSterilizationId(null);
    }
    setIsSterilizationModalOpen(true);
  };

  const handleSaveSterilization = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingSterilizationId) {
      setSterilizationRecords((prev) =>
        prev.map((r) => (r.id === editingSterilizationId ? { ...sterilizationForm, id: editingSterilizationId } : r))
      );
    } else {
      setSterilizationRecords((prev) => [...prev, { ...sterilizationForm }]);
    }
    setIsSterilizationModalOpen(false);
    setEditingSterilizationId(null);
  };

  const handleDeleteSterilization = (id) => {
    if (window.confirm('Delete this sterilization record?')) {
      setSterilizationRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const [equipmentRecords, setEquipmentRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_EQUIPMENT);
    return saved ? JSON.parse(saved) : EQUIPMENT_RECORDS;
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
    return `cssd-eq-${String(maxNum + 1).padStart(3, '0')}`;
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

  const [storageRecords, setStorageRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_STORAGE);
    return saved ? JSON.parse(saved) : STORAGE_RECORDS;
  });
  const [isStorageModalOpen, setIsStorageModalOpen] = useState(false);
  const [editingStorageId, setEditingStorageId] = useState(null);
  const [storageForm, setStorageForm] = useState({ ...EMPTY_STORAGE_FORM });
  const [storageSearch, setStorageSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_STORAGE, JSON.stringify(storageRecords));
  }, [storageRecords]);

  const getNextStorageId = () => {
    const maxNum = storageRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `cssd-sto-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenStorageModal = (record = null) => {
    if (record) {
      setStorageForm({ ...record });
      setEditingStorageId(record.id);
    } else {
      setStorageForm({ ...EMPTY_STORAGE_FORM, id: getNextStorageId() });
      setEditingStorageId(null);
    }
    setIsStorageModalOpen(true);
  };

  const handleSaveStorage = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingStorageId) {
      setStorageRecords((prev) =>
        prev.map((r) => (r.id === editingStorageId ? { ...storageForm, id: editingStorageId } : r))
      );
    } else {
      setStorageRecords((prev) => [...prev, { ...storageForm }]);
    }
    setIsStorageModalOpen(false);
    setEditingStorageId(null);
  };

  const handleDeleteStorage = (id) => {
    if (window.confirm('Delete this storage record?')) {
      setStorageRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const [auditRecords, setAuditRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_AUDIT);
    return saved ? JSON.parse(saved) : AUDIT_RECORDS;
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
    return `cssd-au-${String(maxNum + 1).padStart(3, '0')}`;
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

  const NumField = ({ label, field, form, setForm, step = '1' }) => (
    <div>
      <label className="block text-[9px] font-medium text-slate-600 mb-1">{label}</label>
      <input
        type="number"
        step={step}
        min="0"
        max={field.includes('Rate') || field.includes('Compliance') ? '100' : undefined}
        value={form[field]}
        onChange={(e) => {
          const val = parseFloat(e.target.value) || 0;
          const max = field.includes('Rate') || field.includes('Compliance') ? 100 : undefined;
          setForm({ ...form, [field]: max !== undefined ? Math.min(Math.max(0, val), max) : Math.max(0, val) });
        }}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />;
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
      case 'sterilization':
        return (
          <SterilizationTab
            hospital={hospital}
            sterilizationRecords={sterilizationRecords}
            searchQuery={sterilizationSearch}
            setSearchQuery={setSterilizationSearch}
            handleOpenSterilizationModal={handleOpenSterilizationModal}
            handleDeleteSterilization={handleDeleteSterilization}
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
      case 'storage':
        return (
          <StorageTab
            hospital={hospital}
            storageRecords={storageRecords}
            searchQuery={storageSearch}
            setSearchQuery={setStorageSearch}
            handleOpenStorageModal={handleOpenStorageModal}
            handleDeleteStorage={handleDeleteStorage}
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
            qualityIndicators={qualityIndicators}
            sterilizationRecords={sterilizationRecords}
            equipmentRecords={equipmentRecords}
            storageRecords={storageRecords}
            auditRecords={auditRecords}
            hospital={hospital}
          />
        );
      default: return null;
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
          {TABS.map(({ id, label, icon: Icon }) => {
            const isActive = id === activeTab;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                style={isActive ? { backgroundColor: `${hospital.themeColor}0d`, borderColor: `${hospital.themeColor}22`, color: hospital.themeColor } : {}}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all cursor-pointer ${isActive ? 'border-sky-500/20 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[10px] font-semibold truncate">{label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-100">
          <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">CSSD Workspace — NABH Module</p>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto custom-scroll bg-slate-50/40 p-6">
        {renderContent()}
        {isQualityModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">
                    {editingQualityId ? 'Edit Quality Record' : 'Add Quality Record'}
                  </h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">CSSD Quality Metrics</p>
                </div>
                <button
                  onClick={() => { setIsQualityModalOpen(false); setEditingQualityId(null); }}
                  className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveQuality} className="space-y-5">
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

                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Quality Metrics</p>
                  <div className="grid grid-cols-2 gap-3">
                    <NumField label="Total Sterilization Loads" field="totalSterilizationLoads" form={qualityForm} setForm={setQualityForm} />
                    <NumField label="Sterilization Failure Rate %" field="sterilizationFailureRate" form={qualityForm} setForm={setQualityForm} step="0.1" />
                    <NumField label="Biological Indicator Pass Rate %" field="biologicalIndicatorPassRate" form={qualityForm} setForm={setQualityForm} step="0.1" />
                    <NumField label="Chemical Indicator Compliance %" field="chemicalIndicatorCompliance" form={qualityForm} setForm={setQualityForm} step="0.1" />
                    <NumField label="Bowie-Dick Test Compliance %" field="bowieDickTestCompliance" form={qualityForm} setForm={setQualityForm} step="0.1" />
                    <NumField label="Recall Incidents" field="recallIncidents" form={qualityForm} setForm={setQualityForm} />
                    <NumField label="Turnaround Time (min)" field="turnaroundTime" form={qualityForm} setForm={setQualityForm} />
                  </div>
                </div>

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

        {isSterilizationModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">
                    {editingSterilizationId ? 'Edit Sterilization Record' : 'Add Sterilization Record'}
                  </h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">CSSD Sterilization Process</p>
                </div>
                <button
                  onClick={() => { setIsSterilizationModalOpen(false); setEditingSterilizationId(null); }}
                  className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveSterilization} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                      <select
                        value={sterilizationForm.month}
                        onChange={(e) => setSterilizationForm({ ...sterilizationForm, month: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                      <input
                        type="number"
                        value={sterilizationForm.year}
                        onChange={(e) => setSterilizationForm({ ...sterilizationForm, year: parseInt(e.target.value) || 2025 })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Sterilization Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Sterilization Method *</label>
                      <select
                        value={sterilizationForm.sterilizationMethod}
                        onChange={(e) => setSterilizationForm({ ...sterilizationForm, sterilizationMethod: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {STERILIZATION_METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <NumField label="Total Loads" field="totalLoads" form={sterilizationForm} setForm={setSterilizationForm} />
                    <NumField label="Steam Sterilization Loads" field="steamLoads" form={sterilizationForm} setForm={setSterilizationForm} />
                    <NumField label="ETO Sterilization Loads" field="etoLoads" form={sterilizationForm} setForm={setSterilizationForm} />
                    <NumField label="Biological Indicator Passed" field="biologicalIndicatorPassed" form={sterilizationForm} setForm={setSterilizationForm} />
                    <NumField label="Chemical Indicator Passed" field="chemicalIndicatorPassed" form={sterilizationForm} setForm={setSterilizationForm} />
                    <NumField label="Failed Loads" field="failedLoads" form={sterilizationForm} setForm={setSterilizationForm} />
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Status</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Recall Required</label>
                      <select
                        value={sterilizationForm.recallRequired}
                        onChange={(e) => setSterilizationForm({ ...sterilizationForm, recallRequired: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                      <select
                        value={sterilizationForm.status}
                        onChange={(e) => setSterilizationForm({ ...sterilizationForm, status: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => { setIsSterilizationModalOpen(false); setEditingSterilizationId(null); }}
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ backgroundColor: hospital.themeColor }}
                    className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                  >
                    {editingSterilizationId ? 'Save Changes' : 'Add Record'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isEquipmentModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">
                    {editingEquipmentId ? 'Edit Equipment Record' : 'Add Equipment Record'}
                  </h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">CSSD Equipment & Validation</p>
                </div>
                <button
                  onClick={() => { setIsEquipmentModalOpen(false); setEditingEquipmentId(null); }}
                  className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveEquipment} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Equipment Details</p>
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
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Equipment Name *</label>
                      <input
                        type="text"
                        value={equipmentForm.equipmentName}
                        onChange={(e) => setEquipmentForm({ ...equipmentForm, equipmentName: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Equipment Type *</label>
                      <select
                        value={equipmentForm.equipmentType}
                        onChange={(e) => setEquipmentForm({ ...equipmentForm, equipmentType: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {EQUIPMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <NumField label="Breakdown Count" field="breakdownCount" form={equipmentForm} setForm={setEquipmentForm} />
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Last Validation Date</label>
                      <input
                        type="date"
                        value={equipmentForm.lastValidationDate}
                        onChange={(e) => setEquipmentForm({ ...equipmentForm, lastValidationDate: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Validation Status</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Preventive Maintenance Status</label>
                      <select
                        value={equipmentForm.preventiveMaintenanceStatus}
                        onChange={(e) => setEquipmentForm({ ...equipmentForm, preventiveMaintenanceStatus: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Done">Done</option>
                        <option value="Pending">Pending</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Calibration Status</label>
                      <select
                        value={equipmentForm.calibrationStatus}
                        onChange={(e) => setEquipmentForm({ ...equipmentForm, calibrationStatus: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Done">Done</option>
                        <option value="Pending">Pending</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Bowie-Dick Test Status</label>
                      <select
                        value={equipmentForm.bowieDickTestStatus}
                        onChange={(e) => setEquipmentForm({ ...equipmentForm, bowieDickTestStatus: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Done">Done</option>
                        <option value="Pending">Pending</option>
                        <option value="N/A">N/A</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Biological Indicator Status</label>
                      <select
                        value={equipmentForm.biologicalIndicatorStatus}
                        onChange={(e) => setEquipmentForm({ ...equipmentForm, biologicalIndicatorStatus: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Passed">Passed</option>
                        <option value="Failed">Failed</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
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

        {isStorageModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">
                    {editingStorageId ? 'Edit Storage Record' : 'Add Storage Record'}
                  </h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">CSSD Sterile Storage & Distribution</p>
                </div>
                <button
                  onClick={() => { setIsStorageModalOpen(false); setEditingStorageId(null); }}
                  className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveStorage} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                      <select
                        value={storageForm.month}
                        onChange={(e) => setStorageForm({ ...storageForm, month: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                      <input
                        type="number"
                        value={storageForm.year}
                        onChange={(e) => setStorageForm({ ...storageForm, year: parseInt(e.target.value) || 2025 })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Storage Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Storage Area *</label>
                      <select
                        value={storageForm.storageArea}
                        onChange={(e) => setStorageForm({ ...storageForm, storageArea: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {STORAGE_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <NumField label="Sterile Packs Stored" field="sterilePacksStored" form={storageForm} setForm={setStorageForm} />
                    <NumField label="Temperature (°C)" field="temperature" form={storageForm} setForm={setStorageForm} step="0.1" />
                    <NumField label="Humidity (%)" field="humidity" form={storageForm} setForm={setStorageForm} step="0.1" />
                    <NumField label="FIFO/FEFO Compliance (%)" field="fifoFefoCompliance" form={storageForm} setForm={setStorageForm} step="0.1" />
                    <NumField label="Pack Integrity (%)" field="packIntegrity" form={storageForm} setForm={setStorageForm} step="0.1" />
                    <NumField label="Items Issued" field="itemsIssued" form={storageForm} setForm={setStorageForm} />
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Status</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                      <select
                        value={storageForm.status}
                        onChange={(e) => setStorageForm({ ...storageForm, status: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => { setIsStorageModalOpen(false); setEditingStorageId(null); }}
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ backgroundColor: hospital.themeColor }}
                    className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                  >
                    {editingStorageId ? 'Save Changes' : 'Add Record'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isAuditModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">
                    {editingAuditId ? 'Edit Audit Record' : 'Add Audit Record'}
                  </h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">CSSD Internal Audit</p>
                </div>
                <button
                  onClick={() => { setIsAuditModalOpen(false); setEditingAuditId(null); }}
                  className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveAudit} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period</p>
                  <div className="grid grid-cols-2 gap-3">
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
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Audit Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Area *</label>
                      <select
                        value={auditForm.auditArea}
                        onChange={(e) => setAuditForm({ ...auditForm, auditArea: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {AUDIT_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <NumField label="Compliance Score %" field="complianceScore" form={auditForm} setForm={setAuditForm} step="0.1" />
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Auditor *</label>
                      <input
                        type="text"
                        value={auditForm.auditor}
                        onChange={(e) => setAuditForm({ ...auditForm, auditor: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
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

                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Findings</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Findings</label>
                      <textarea
                        value={auditForm.findings}
                        onChange={(e) => setAuditForm({ ...auditForm, findings: e.target.value })}
                        rows="2"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Enter findings"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Corrective Action</label>
                      <textarea
                        value={auditForm.correctiveAction}
                        onChange={(e) => setAuditForm({ ...auditForm, correctiveAction: e.target.value })}
                        rows="2"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Enter corrective action"
                      />
                    </div>
                  </div>
                </div>

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
      </main>
    </div>
  );
};

export default CSSDWorkspace;
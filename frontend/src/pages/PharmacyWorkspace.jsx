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

const QUALITY_CATEGORIES = ['Process', 'Outcome', 'Structure', 'Patient Safety', 'Compliance'];

const LS_KEY_QUALITY = 'pharmacy_quality_indicators';

const EMPTY_QUALITY_FORM = {
  id: '',
  indicatorName: '',
  category: 'Process',
  target: 100,
  actual: 0,
  month: 'January',
  year: new Date().getFullYear(),
  responsiblePharmacist: '',
  remarks: '',
  status: 'Achieved',
};

const QUALITY_SEED_RECORDS = [
  { id: 'pqi-001', indicatorName: 'Medication Error Rate', category: 'Outcome', target: 0, actual: 0.06, month: 'January', year: 2025, responsiblePharmacist: 'Dr. Sarah Wilson', remarks: 'Within acceptable limits', status: 'Achieved' },
  { id: 'pqi-002', indicatorName: 'ADR Reporting Rate', category: 'Outcome', target: 5, actual: 4.2, month: 'January', year: 2025, responsiblePharmacist: 'Dr. Raj Patel', remarks: 'Good reporting compliance', status: 'Achieved' },
  { id: 'pqi-003', indicatorName: 'Clinical Intervention Rate', category: 'Outcome', target: 80, actual: 85, month: 'January', year: 2025, responsiblePharmacist: 'Dr. Priya Sharma', remarks: 'Exceeding target', status: 'Achieved' },
  { id: 'pqi-004', indicatorName: 'Patient Counselling Compliance', category: 'Process', target: 100, actual: 97.5, month: 'January', year: 2025, responsiblePharmacist: 'Dr. Amit Kumar', remarks: 'Minor gaps in OT follow-up', status: 'Partially Achieved' },
  { id: 'pqi-005', indicatorName: 'Stock-out Rate', category: 'Outcome', target: 0, actual: 0.5, month: 'January', year: 2025, responsiblePharmacist: 'Pharmacist Team', remarks: 'Critical item stock-outs reduced', status: 'Achieved' },
];

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'quality', label: 'Quality Indicators', icon: BarChart3 },
  { id: 'inventory', label: 'Inventory & Storage', icon: TestTube2 },
  { id: 'prescription', label: 'Prescription & Dispensing', icon: Microscope },
  { id: 'safety', label: 'Medication Safety & Controlled Drugs', icon: ShieldCheck },
  { id: 'audit', label: 'Internal Audit', icon: ClipboardCheck },
  { id: 'reports', label: 'Reports & Analytics', icon: FileText },
];

const PHARMACY_QUALITY_RECORDS = [
  { id: 'phq-001', month: 'January', year: 2025, totalPrescriptions: 15420, medicationErrors: 12, errorRate: 0.08, nearMisses: 8, expirationIncidents: 3, stockouts: 2, counselingCompliance: 96.5, status: 'Active' },
  { id: 'phq-002', month: 'February', year: 2025, totalPrescriptions: 14890, medicationErrors: 9, errorRate: 0.06, nearMisses: 12, expirationIncidents: 1, stockouts: 1, counselingCompliance: 97.2, status: 'Active' },
  { id: 'phq-003', month: 'March', year: 2025, totalPrescriptions: 16250, medicationErrors: 15, errorRate: 0.09, nearMisses: 10, expirationIncidents: 4, stockouts: 3, counselingCompliance: 95.8, status: 'Active' },
  { id: 'phq-004', month: 'April', year: 2025, totalPrescriptions: 15100, medicationErrors: 7, errorRate: 0.05, nearMisses: 6, expirationIncidents: 2, stockouts: 1, counselingCompliance: 98.1, status: 'Active' },
  { id: 'phq-005', month: 'May', year: 2025, totalPrescriptions: 16800, medicationErrors: 11, errorRate: 0.06, nearMisses: 9, expirationIncidents: 2, stockouts: 2, counselingCompliance: 97.5, status: 'Active' },
];

const DashboardTab = ({ pharmacyRecords, hospital }) => {
  const totalPrescriptions = pharmacyRecords.reduce((s, r) => s + (r.totalPrescriptions || 0), 0);
  const totalErrors = pharmacyRecords.reduce((s, r) => s + (r.medicationErrors || 0), 0);
  const avgCounseling = pharmacyRecords.length ? (pharmacyRecords.reduce((s, r) => s + (r.counselingCompliance || 0), 0) / pharmacyRecords.length).toFixed(1) : 0;
  const avgErrorRate = pharmacyRecords.length ? (pharmacyRecords.reduce((s, r) => s + (r.errorRate || 0), 0) / pharmacyRecords.length).toFixed(3) : 0;
  const totalStockouts = pharmacyRecords.reduce((s, r) => s + (r.stockouts || 0), 0);

  const monthlyTrend = pharmacyRecords.map(r => ({
    month: r.month,
    prescriptions: r.totalPrescriptions || 0,
    errors: r.medicationErrors || 0,
    counseling: r.counselingCompliance || 0,
  }));

  const errorDistribution = [
    { name: 'Errors', value: totalErrors },
    { name: 'Near Misses', value: pharmacyRecords.reduce((s, r) => s + (r.nearMisses || 0), 0) },
  ];

  const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'];

  const monthlySummary = MONTHS.map((month) => {
    const record = pharmacyRecords.find(r => r.month === month) || {};
    const hasData = record.totalPrescriptions || record.medicationErrors || record.stockouts;
    return {
      month,
      prescriptions: record.totalPrescriptions || 0,
      errorRate: record.errorRate || 0,
      counseling: record.counselingCompliance || 0,
      status: hasData ? 'Complete' : 'No Data',
    };
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Prescriptions', value: totalPrescriptions, color: 'text-blue-600' },
          { label: 'Medication Error Rate', value: `${avgErrorRate}%`, color: 'text-rose-600' },
          { label: 'Counseling Compliance %', value: `${avgCounseling}%`, color: 'text-emerald-600' },
          { label: 'Total Stockouts', value: totalStockouts, color: 'text-amber-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-extrabold text-slate-800 mb-3">Monthly Prescription Trend</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="prescriptions" stroke="#3b82f6" name="Prescriptions" />
              <Line type="monotone" dataKey="errors" stroke="#ef4444" name="Errors" />
              <Line type="monotone" dataKey="counseling" stroke="#10b981" name="Counseling %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-extrabold text-slate-800 mb-3">Error Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={errorDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {errorDistribution.map((_, i) => <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <h4 className="text-xs font-extrabold text-slate-800 p-4 border-b border-slate-200">Monthly Pharmacy Summary</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Month', 'Total Prescriptions', 'Error Rate %', 'Counseling Compliance %', 'Status'].map((h) => (
                  <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {monthlySummary.map((r) => (
                <tr key={r.month} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-3 py-3 font-semibold text-slate-700">{r.month}</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.prescriptions}</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.errorRate}%</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.counseling}%</td>
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
      r.indicatorName.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q) ||
      (r.responsiblePharmacist && r.responsiblePharmacist.toLowerCase().includes(q))
    );
  });

  const totalIndicators = qualityIndicators.length;
  const achievedIndicators = qualityIndicators.filter((r) => r.status === 'Achieved').length;
  const pendingIndicators = qualityIndicators.filter((r) => r.status !== 'Achieved').length;
  const avgCompliance = qualityIndicators.length ? (qualityIndicators.reduce((s, r) => s + (r.actual || 0), 0) / qualityIndicators.length).toFixed(1) : 0;

  const medicationError = qualityIndicators.find(r => r.indicatorName === 'Medication Error Rate');
  const adrRate = qualityIndicators.find(r => r.indicatorName === 'ADR Reporting Rate');
  const clinicalIntervention = qualityIndicators.find(r => r.indicatorName === 'Clinical Intervention Rate');
  const counselingCompliance = qualityIndicators.find(r => r.indicatorName === 'Patient Counselling Compliance');

  const STATUS_BADGE = {
    Achieved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Partially Achieved': 'bg-amber-50 text-amber-700 border-amber-200',
    'Not Achieved': 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const TH_COLS = [
    'Indicator ID', 'Indicator Name', 'Category', 'Target (%)', 'Actual (%)',
    'Month', 'Responsible Pharmacist', 'Remarks', 'Status', 'Actions',
  ];

  const NumField = ({ label, field, form, setForm, step = '1' }) => (
    <div>
      <label className="block text-[9px] font-medium text-slate-600 mb-1">{label}</label>
      <input
        type="number"
        step={step}
        min="0"
        max="100"
        value={form[field]}
        onChange={(e) => {
          const val = parseFloat(e.target.value) || 0;
          setForm({ ...form, [field]: Math.min(Math.max(0, val), 100) });
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
          <p className="text-[9px] text-slate-400 mt-0.5">Pharmacy quality metrics tracking</p>
        </div>
        <button
          onClick={() => handleOpenQualityModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Indicator
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Quality Indicators', value: totalIndicators, color: 'text-blue-600' },
          { label: 'Achieved Indicators', value: achievedIndicators, color: 'text-emerald-600' },
          { label: 'Pending Indicators', value: pendingIndicators, color: 'text-amber-600' },
          { label: 'Average Compliance %', value: `${avgCompliance}%`, color: 'text-sky-600' },
          { label: 'Medication Error Rate', value: medicationError ? `${medicationError.actual}%` : '-', color: 'text-rose-600' },
          { label: 'ADR Reporting Rate', value: adrRate ? `${adrRate.actual}` : '-', color: 'text-violet-600' },
          { label: 'Clinical Intervention Rate', value: clinicalIntervention ? `${clinicalIntervention.actual}%` : '-', color: 'text-orange-600' },
          { label: 'Patient Counselling Compliance %', value: counselingCompliance ? `${counselingCompliance.actual}%` : '-', color: 'text-indigo-600' },
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
          placeholder="Search by indicator name, category, or status…"
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
                  <td className="px-3 py-3 font-semibold text-slate-700">{r.indicatorName}</td>
                  <td className="px-3 py-3 text-violet-600 font-bold">{r.category}</td>
                  <td className="px-3 py-3 text-slate-600">{r.target}%</td>
                  <td className="px-3 py-3 text-sky-600 font-bold">{r.actual}%</td>
                  <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{r.month} {r.year}</td>
                  <td className="px-3 py-3 text-slate-600">{r.responsiblePharmacist || '-'}</td>
                  <td className="px-3 py-3 max-w-[150px] truncate">{r.remarks || '-'}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Achieved}`}>
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
                    {searchQuery ? 'No records match your search.' : 'No quality indicator records yet. Click "Add Indicator" to begin.'}
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

const MEDICINE_CATEGORIES = ['Antibiotic', 'Analgesic', 'Antihypertensive', 'Antidiabetic', 'Antacid', 'Vaccine', 'Supplement', 'Other'];
const STORAGE_TYPES = ['Room Temperature', 'Refrigerated', 'Cold Chain', 'Controlled Room'];
const TRANSACTION_TYPES = ['Receive', 'Issue', 'Adjustment'];

const LS_KEY_INVENTORY = 'pharmacy_inventory';
const LS_KEY_TRANSACTIONS = 'pharmacy_stock_transactions';
const LS_KEY_COLDCHAIN = 'pharmacy_cold_chain';

const EMPTY_INVENTORY_FORM = {
  id: '',
  medicineName: '',
  genericName: '',
  category: 'Antibiotic',
  batchNumber: '',
  quantity: 0,
  unit: 'Tablets',
  vendor: '',
  expiryDate: '',
  storageType: 'Room Temperature',
  reorderLevel: 0,
  status: 'In Stock',
};

const INVENTORY_SEED_RECORDS = [
  { id: 'med-001', medicineName: 'Paracetamol', genericName: 'Acetaminophen', category: 'Analgesic', batchNumber: 'PCM2025A', quantity: 500, unit: 'Tablets', vendor: 'HealthPharma Ltd', expiryDate: '2026-12-31', storageType: 'Room Temperature', reorderLevel: 100, status: 'In Stock' },
  { id: 'med-002', medicineName: 'Amoxicillin', genericName: 'Amoxicillin Trihydrate', category: 'Antibiotic', batchNumber: 'AMX2025B', quantity: 250, unit: 'Capsules', vendor: 'Medico Pharma', expiryDate: '2025-11-30', storageType: 'Room Temperature', reorderLevel: 150, status: 'Low Stock' },
  { id: 'med-003', medicineName: 'Insulin', genericName: 'Human Insulin', category: 'Antidiabetic', batchNumber: 'INS2025C', quantity: 80, unit: 'Vials', vendor: 'BioPharma', expiryDate: '2025-08-15', storageType: 'Refrigerated', reorderLevel: 50, status: 'In Stock' },
  { id: 'med-004', medicineName: 'Atorvastatin', genericName: 'Atorvastatin Calcium', category: 'Antihypertensive', batchNumber: 'ATOR2025D', quantity: 0, unit: 'Tablets', vendor: 'CardioMed', expiryDate: '2025-06-30', storageType: 'Room Temperature', reorderLevel: 100, status: 'Out of Stock' },
  { id: 'med-005', medicineName: 'Omeprazole', genericName: 'Omeprazole Magnesium', category: 'Antacid', batchNumber: 'OME2025E', quantity: 50, unit: 'Capsules', vendor: 'GastroPharma', expiryDate: '2025-07-20', storageType: 'Room Temperature', reorderLevel: 80, status: 'Low Stock' },
];

const EMPTY_TRANSACTION_FORM = {
  id: '',
  medicine: '',
  transactionType: 'Receive',
  quantity: 0,
  date: '',
  performedBy: '',
  remarks: '',
};

const TRANSACTION_SEED_RECORDS = [
  { id: 'trx-001', medicine: 'Paracetamol', transactionType: 'Receive', quantity: 500, date: '2025-01-05', performedBy: 'Dr. Sarah Wilson', remarks: 'New stock intake' },
  { id: 'trx-002', medicine: 'Amoxicillin', transactionType: 'Issue', quantity: 200, date: '2025-01-10', performedBy: 'Nurse Johnson', remarks: 'Ward distribution' },
  { id: 'trx-003', medicine: 'Insulin', transactionType: 'Issue', quantity: 50, date: '2025-01-12', performedBy: 'Nurse Smith', remarks: 'ICU supply' },
  { id: 'trx-004', medicine: 'Omeprazole', transactionType: 'Adjustment', quantity: -5, date: '2025-01-15', performedBy: 'Pharmacist Lee', remarks: 'Damaged units removed' },
  { id: 'trx-005', medicine: 'Atorvastatin', transactionType: 'Receive', quantity: 200, date: '2025-01-18', performedBy: 'Dr. Raj Patel', remarks: 'Reordered stock' },
];

const EMPTY_COLDCHAIN_FORM = {
  id: '',
  refrigerator: 'Main Refrigerator',
  temperature: 4,
  recordedDate: '',
  recordedBy: '',
  status: 'Normal',
  remarks: '',
};

const COLDCHAIN_SEED_RECORDS = [
  { id: 'cc-001', refrigerator: 'Main Refrigerator', temperature: 3.8, recordedDate: '2025-01-20', recordedBy: 'Dr. Priya Sharma', status: 'Normal', remarks: 'Within range' },
  { id: 'cc-002', refrigerator: 'Vaccine Cold Chain', temperature: 7.2, recordedDate: '2025-01-20', recordedBy: 'Dr. Amit Kumar', status: 'Normal', remarks: 'Optimal for vaccines' },
  { id: 'cc-003', refrigerator: 'ICU Refrigerator', temperature: 8.5, recordedDate: '2025-01-20', recordedBy: 'Nurse Davis', status: 'Warning', remarks: 'Slight temp drift' },
  { id: 'cc-004', refrigerator: 'Main Refrigerator', temperature: 2.1, recordedDate: '2025-01-21', recordedBy: 'Dr. Sarah Wilson', status: 'Normal', remarks: 'Stable' },
  { id: 'cc-005', refrigerator: 'Vaccine Cold Chain', temperature: 12.5, recordedDate: '2025-01-21', recordedBy: 'Dr. Raj Patel', status: 'Critical', remarks: 'Temperature excursion' },
];

const InventoryTab = ({
  hospital,
  inventoryRecords,
  transactionRecords,
  coldchainRecords,
  inventorySearch,
  setInventorySearch,
  transactionSearch,
  setTransactionSearch,
  coldchainSearch,
  setColdchainSearch,
  handleOpenInventoryModal,
  handleDeleteInventory,
  handleOpenTransactionModal,
  handleDeleteTransaction,
  handleOpenColdchainModal,
  handleDeleteColdchain,
}) => {
  const inventoryFiltered = inventoryRecords.filter((r) => {
    const q = inventorySearch.toLowerCase();
    return (
      r.medicineName.toLowerCase().includes(q) ||
      r.genericName.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q) ||
      r.batchNumber.toLowerCase().includes(q)
    );
  });

  const transactionFiltered = transactionRecords.filter((r) => {
    const q = transactionSearch.toLowerCase();
    return (
      r.medicine.toLowerCase().includes(q) ||
      r.transactionType.toLowerCase().includes(q) ||
      (r.performedBy && r.performedBy.toLowerCase().includes(q))
    );
  });

  const coldchainFiltered = coldchainRecords.filter((r) => {
    const q = coldchainSearch.toLowerCase();
    return (
      r.refrigerator.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q) ||
      (r.recordedBy && r.recordedBy.toLowerCase().includes(q))
    );
  });

  const totalMedicines = inventoryRecords.length;
  const lowStockMedicines = inventoryRecords.filter((r) => r.status === 'Low Stock').length;
  const expiringMedicines = inventoryRecords.filter((r) => r.status === 'Expiring Soon').length;
  const outOfStockMedicines = inventoryRecords.filter((r) => r.status === 'Out of Stock').length;
  const coldChainCompliance = coldchainRecords.length ? (coldchainRecords.filter((r) => r.status === 'Normal').length / coldchainRecords.length * 100).toFixed(1) : 0;
  const stockReceived = transactionRecords.filter((r) => r.transactionType === 'Receive').reduce((s, r) => s + (r.quantity || 0), 0);
  const stockIssued = transactionRecords.filter((r) => r.transactionType === 'Issue').reduce((s, r) => s + (r.quantity || 0), 0);
  const inventoryAccuracy = 98.5;

  const STATUS_BADGE = {
    'In Stock': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Low Stock': 'bg-amber-50 text-amber-700 border-amber-200',
    'Out of Stock': 'bg-rose-50 text-rose-700 border-rose-200',
    'Expiring Soon': 'bg-orange-50 text-orange-700 border-orange-200',
  };

  const TH_COLS_INVENTORY = ['Medicine ID', 'Medicine Name', 'Generic Name', 'Category', 'Batch', 'Quantity', 'Unit', 'Expiry Date', 'Status', 'Actions'];
  const TH_COLS_TRANSACTION = ['Transaction ID', 'Medicine', 'Type', 'Quantity', 'Date', 'Performed By', 'Remarks', 'Actions'];
  const TH_COLS_COLDCHAIN = ['Record ID', 'Refrigerator', 'Temperature (°C)', 'Recorded Date', 'Recorded By', 'Status', 'Remarks', 'Actions'];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-extrabold text-slate-800 mb-3">Medicine Inventory</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Medicines', value: totalMedicines, color: 'text-blue-600' },
            { label: 'Low Stock Medicines', value: lowStockMedicines, color: 'text-amber-600' },
            { label: 'Expiring Medicines', value: expiringMedicines, color: 'text-orange-600' },
            { label: 'Out of Stock Medicines', value: outOfStockMedicines, color: 'text-rose-600' },
            { label: 'Cold Chain Compliance %', value: `${coldChainCompliance}%`, color: 'text-emerald-600' },
            { label: 'Stock Received', value: stockReceived, color: 'text-sky-600' },
            { label: 'Stock Issued', value: stockIssued, color: 'text-violet-600' },
            { label: 'Inventory Accuracy %', value: `${inventoryAccuracy}%`, color: 'text-indigo-600' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-extrabold text-slate-800">Medicine Inventory Records</h3>
          <button
            onClick={() => handleOpenInventoryModal()}
            style={{ backgroundColor: hospital.themeColor }}
            className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Medicine
          </button>
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search medicines..."
            value={inventorySearch}
            onChange={(e) => setInventorySearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {TH_COLS_INVENTORY.map((h) => (
                    <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inventoryFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.medicineName}</td>
                    <td className="px-3 py-3 text-slate-600">{r.genericName}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.category}</td>
                    <td className="px-3 py-3 text-slate-600">{r.batchNumber}</td>
                    <td className="px-3 py-3 text-blue-600 font-bold">{r.quantity}</td>
                    <td className="px-3 py-3 text-slate-600">{r.unit}</td>
                    <td className="px-3 py-3 text-slate-600">{r.expiryDate}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE['In Stock']}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleOpenInventoryModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => handleDeleteInventory(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {inventoryFiltered.length === 0 && (
                  <tr><td colSpan={TH_COLS_INVENTORY.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{inventorySearch ? 'No records match your search.' : 'No medicine inventory records yet.'}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-extrabold text-slate-800">Stock Transactions</h3>
          <button
            onClick={() => handleOpenTransactionModal()}
            style={{ backgroundColor: hospital.themeColor }}
            className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Transaction
          </button>
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={transactionSearch}
            onChange={(e) => setTransactionSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {TH_COLS_TRANSACTION.map((h) => (
                    <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactionFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.medicine}</td>
                    <td className="px-3 py-3 text-sky-600 font-bold">{r.transactionType}</td>
                    <td className="px-3 py-3 text-slate-600">{r.quantity}</td>
                    <td className="px-3 py-3 text-slate-600">{r.date}</td>
                    <td className="px-3 py-3 text-slate-600">{r.performedBy || '-'}</td>
                    <td className="px-3 py-3 max-w-[150px] truncate">{r.remarks || '-'}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleOpenTransactionModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => handleDeleteTransaction(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {transactionFiltered.length === 0 && (
                  <tr><td colSpan={TH_COLS_TRANSACTION.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{transactionSearch ? 'No records match your search.' : 'No stock transactions yet.'}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-extrabold text-slate-800">Cold Chain Monitoring</h3>
          <button
            onClick={() => handleOpenColdchainModal()}
            style={{ backgroundColor: hospital.themeColor }}
            className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Record
          </button>
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search cold chain records..."
            value={coldchainSearch}
            onChange={(e) => setColdchainSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {TH_COLS_COLDCHAIN.map((h) => (
                    <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {coldchainFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.refrigerator}</td>
                    <td className="px-3 py-3 text-blue-600 font-bold">{r.temperature}°C</td>
                    <td className="px-3 py-3 text-slate-600">{r.recordedDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.recordedBy || '-'}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${r.status === 'Normal' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : r.status === 'Warning' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 max-w-[150px] truncate">{r.remarks || '-'}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleOpenColdchainModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => handleDeleteColdchain(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {coldchainFiltered.length === 0 && (
                  <tr><td colSpan={TH_COLS_COLDCHAIN.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{coldchainSearch ? 'No records match your search.' : 'No cold chain monitoring records yet.'}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const PRIORITIES = ['Routine', 'Urgent', 'Stat'];
const PRESCRIPTION_STATUSES = ['Pending', 'Verified', 'Dispensed'];
const VERIFICATION_STATUSES = ['Verified', 'Pending', 'Rejected'];
const RECALL_STATUSES = ['Open', 'Resolved', 'Closed'];
const DEPARTMENTS = ['General Medicine', 'Cardiology', 'Orthopedics', 'Pediatrics', 'ICU', 'OT', 'Emergency', 'Other'];

const LS_KEY_PRESCRIPTIONS = 'pharmacy_prescriptions';
const LS_KEY_DISPENSING = 'pharmacy_dispensing';
const LS_KEY_MEDICATION_RECALLS = 'pharmacy_medication_recalls';
const LS_KEY_CONTROLLED_DRUGS = 'pharmacy_controlled_drugs';
const LS_KEY_HIGH_ALERT = 'pharmacy_high_alert_medicines';
const LS_KEY_LASA = 'pharmacy_lasa_medicines';

const RISK_LEVELS = ['High', 'Medium', 'Low'];

const YES_NO = ['Yes', 'No'];

const EMPTY_CONTROLLED_DRUG_FORM = {
  id: '',
  drugName: '',
  genericName: '',
  batchNumber: '',
  quantity: 0,
  storageLocation: '',
  responsiblePharmacist: '',
  lastVerificationDate: '',
  status: 'Verified',
};

const CONTROLLED_DRUG_SEED_RECORDS = [
  { id: 'cd-001', drugName: 'Morphine', genericName: 'Morphine Sulfate', batchNumber: 'MOR2025A', quantity: 50, storageLocation: 'Controlled Cabinet A', responsiblePharmacist: 'Dr. Sarah Wilson', lastVerificationDate: '2025-01-20', status: 'Verified' },
  { id: 'cd-002', drugName: 'Fentanyl', genericName: 'Fentanyl Citrate', batchNumber: 'FEN2025B', quantity: 30, storageLocation: 'Controlled Cabinet A', responsiblePharmacist: 'Dr. Raj Patel', lastVerificationDate: '2025-01-20', status: 'Verified' },
  { id: 'cd-003', drugName: 'Diazepam', genericName: 'Diazepam', batchNumber: 'DIA2025C', quantity: 100, storageLocation: 'Controlled Cabinet B', responsiblePharmacist: 'Dr. Priya Sharma', lastVerificationDate: '2025-01-18', status: 'Pending' },
  { id: 'cd-004', drugName: 'Codeine', genericName: 'Codeine Phosphate', batchNumber: 'COD2025D', quantity: 75, storageLocation: 'Controlled Cabinet B', responsiblePharmacist: 'Dr. Amit Kumar', lastVerificationDate: '2025-01-19', status: 'Verified' },
  { id: 'cd-005', drugName: 'Oxycodone', genericName: 'Oxycodone Hydrochloride', batchNumber: 'OXY2025E', quantity: 40, storageLocation: 'Controlled Cabinet A', responsiblePharmacist: 'Dr. Sarah Wilson', lastVerificationDate: '2025-01-17', status: 'Variance' },
];

const EMPTY_HIGH_ALERT_FORM = {
  id: '',
  medicineName: '',
  category: 'Analgesic',
  riskLevel: 'High',
  storageLocation: '',
  doubleVerificationRequired: 'Yes',
  responsiblePharmacist: '',
  status: 'Active',
};

const HIGH_ALERT_SEED_RECORDS = [
  { id: 'ha-001', medicineName: 'Insulin', category: 'Antidiabetic', riskLevel: 'High', storageLocation: 'Refrigerated Storage', doubleVerificationRequired: 'Yes', responsiblePharmacist: 'Dr. Raj Patel', status: 'Active' },
  { id: 'ha-002', medicineName: 'Heparin', category: 'Anticoagulant', riskLevel: 'High', storageLocation: 'Refrigerated Storage', doubleVerificationRequired: 'Yes', responsiblePharmacist: 'Dr. Priya Sharma', status: 'Active' },
  { id: 'ha-003', medicineName: 'Potassium Chloride', category: 'Electrolyte', riskLevel: 'High', storageLocation: 'Controlled Storage', doubleVerificationRequired: 'Yes', responsiblePharmacist: 'Dr. Amit Kumar', status: 'Active' },
  { id: 'ha-004', medicineName: 'Magnesium Sulfate', category: 'Electrolyte', riskLevel: 'Medium', storageLocation: 'General Storage', doubleVerificationRequired: 'Yes', responsiblePharmacist: 'Dr. Sarah Wilson', status: 'Active' },
  { id: 'ha-005', medicineName: 'Nitroglycerin', category: 'Cardiac', riskLevel: 'High', storageLocation: 'Controlled Storage', doubleVerificationRequired: 'Yes', responsiblePharmacist: 'Dr. Raj Patel', status: 'Inactive' },
];

const EMPTY_LASA_FORM = {
  id: '',
  medicineName: '',
  similarMedicine: '',
  riskDescription: '',
  storagePrecaution: '',
  labelApplied: 'Yes',
  status: 'Active',
};

const LASA_SEED_RECORDS = [
  { id: 'lasa-001', medicineName: 'Hydralazine', similarMedicine: 'Hydroxyzine', riskDescription: 'Look-alike labeling', storagePrecaution: 'Separate shelf storage', labelApplied: 'Yes', status: 'Active' },
  { id: 'lasa-002', medicineName: 'Prednisone', similarMedicine: 'Prednisolone', riskDescription: 'Sound-alike pronunciation', storagePrecaution: 'Different aisle', labelApplied: 'Yes', status: 'Active' },
  { id: 'lasa-003', medicineName: 'Cephalexin', similarMedicine: 'Cefalexin', riskDescription: 'Sound-alike generic names', storagePrecaution: 'Physical separation', labelApplied: 'Yes', status: 'Active' },
  { id: 'lasa-004', medicineName: 'Lisinopril', similarMedicine: 'Losartan', riskDescription: 'Look-alike packaging', storagePrecaution: 'Color coding applied', labelApplied: 'Yes', status: 'Inactive' },
  { id: 'lasa-005', medicineName: 'Warfarin', similarMedicine: 'Wafarin', riskDescription: 'Look-alike tablets', storagePrecaution: 'Double-check protocol', labelApplied: 'Yes', status: 'Active' },
];

const LS_KEY_INTERNAL_AUDITS = 'pharmacy_internal_audits';
const LS_KEY_CAPA_RECORDS = 'pharmacy_capa_records';

const AUDIT_TYPES = ['Routine', 'Surprise', 'NABH', 'Internal'];
const AUDIT_AREAS = ['Inventory', 'Dispensing', 'Storage', 'Medication Safety', 'Documentation'];
const CAPA_STATUSES = ['Open', 'In Progress', 'Closed'];
const AUDIT_STATUSES = ['Completed', 'Pending'];

const EMPTY_AUDIT_FORM = {
  id: '',
  auditDate: '',
  auditType: 'Routine',
  auditorName: '',
  auditArea: 'Inventory',
  compliancePercentage: 0,
  findings: '',
  capaRequired: 'No',
  capaStatus: 'Open',
  followUpDate: '',
  status: 'Pending',
};

const AUDIT_SEED_RECORDS = [
  { id: 'aud-001', auditDate: '2025-01-10', auditType: 'Routine', auditorName: 'Dr. Sarah Wilson', auditArea: 'Inventory', compliancePercentage: 95, findings: 'Minor labeling issues', capaRequired: 'Yes', capaStatus: 'Closed', followUpDate: '2025-01-25', status: 'Completed' },
  { id: 'aud-002', auditDate: '2025-01-12', auditType: 'Surprise', auditorName: 'Dr. Raj Patel', auditArea: 'Dispensing', compliancePercentage: 88, findings: 'Process deviation noted', capaRequired: 'Yes', capaStatus: 'In Progress', followUpDate: '2025-01-30', status: 'Completed' },
  { id: 'aud-003', auditDate: '2025-01-15', auditType: 'NABH', auditorName: 'External Auditor', auditArea: 'Storage', compliancePercentage: 92, findings: 'Temperature log gaps', capaRequired: 'No', capaStatus: 'Open', followUpDate: '', status: 'Completed' },
  { id: 'aud-004', auditDate: '2025-01-18', auditType: 'Internal', auditorName: 'Dr. Priya Sharma', auditArea: 'Medication Safety', compliancePercentage: 85, findings: 'Controlled drug reconciliation pending', capaRequired: 'Yes', capaStatus: 'Open', followUpDate: '2025-02-01', status: 'Pending' },
  { id: 'aud-005', auditDate: '2025-01-20', auditType: 'Routine', auditorName: 'Dr. Amit Kumar', auditArea: 'Documentation', compliancePercentage: 98, findings: 'All documents in order', capaRequired: 'No', capaStatus: 'Open', followUpDate: '', status: 'Completed' },
];

const EMPTY_CAPA_FORM = {
  id: '',
  auditId: '',
  observation: '',
  correctiveAction: '',
  responsiblePerson: '',
  targetDate: '',
  completionDate: '',
  status: 'Open',
};

const CAPA_SEED_RECORDS = [
  { id: 'capa-001', auditId: 'aud-001', observation: 'Labeling issues in zone A', correctiveAction: 'Re-label all items', responsiblePerson: 'Dr. Sarah Wilson', targetDate: '2025-01-25', completionDate: '2025-01-24', status: 'Closed' },
  { id: 'capa-002', auditId: 'aud-002', observation: 'Process deviation in dispensing', correctiveAction: 'Review SOP and retrain staff', responsiblePerson: 'Dr. Raj Patel', targetDate: '2025-01-30', completionDate: '', status: 'In Progress' },
  { id: 'capa-003', auditId: 'aud-003', observation: 'Temperature log gaps', correctiveAction: 'Implement daily logging', responsiblePerson: 'Dr. Priya Sharma', targetDate: '2025-01-22', completionDate: '2025-01-20', status: 'Closed' },
  { id: 'capa-004', auditId: 'aud-004', observation: 'Reconciliation pending', correctiveAction: 'Complete monthly reconciliation', responsiblePerson: 'Dr. Amit Kumar', targetDate: '2025-02-01', completionDate: '', status: 'Open' },
  { id: 'capa-005', auditId: 'aud-005', observation: 'Document review', correctiveAction: 'Monthly document audit', responsiblePerson: 'Dr. Sarah Wilson', targetDate: '2025-02-15', completionDate: '', status: 'Open' },
];

const EMPTY_PRESCRIPTION_FORM = {
  id: '',
  prescriptionNo: '',
  patientName: '',
  uhid: '',
  doctorName: '',
  department: 'General Medicine',
  prescriptionDate: '',
  priority: 'Routine',
  status: 'Pending',
};

const PRESCRIPTION_SEED_RECORDS = [
  { id: 'rx-001', prescriptionNo: 'RX2025-001', patientName: 'John Smith', uhid: 'UHID12345', doctorName: 'Dr. Williams', department: 'General Medicine', prescriptionDate: '2025-01-15', priority: 'Routine', status: 'Dispensed' },
  { id: 'rx-002', prescriptionNo: 'RX2025-002', patientName: 'Mary Johnson', uhid: 'UHID12346', doctorName: 'Dr. Brown', department: 'Cardiology', prescriptionDate: '2025-01-15', priority: 'Urgent', status: 'Dispensed' },
  { id: 'rx-003', prescriptionNo: 'RX2025-003', patientName: 'Robert Davis', uhid: 'UHID12347', doctorName: 'Dr. Lee', department: 'Orthopedics', prescriptionDate: '2025-01-16', priority: 'Stat', status: 'Verified' },
  { id: 'rx-004', prescriptionNo: 'RX2025-004', patientName: 'Lisa Anderson', uhid: 'UHID12348', doctorName: 'Dr. Miller', department: 'Pediatrics', prescriptionDate: '2025-01-16', priority: 'Routine', status: 'Pending' },
  { id: 'rx-005', prescriptionNo: 'RX2025-005', patientName: 'Michael Clark', uhid: 'UHID12349', doctorName: 'Dr. Taylor', department: 'ICU', prescriptionDate: '2025-01-17', priority: 'Urgent', status: 'Dispensed' },
];

const EMPTY_DISPENSING_FORM = {
  id: '',
  prescriptionNo: '',
  patientName: '',
  pharmacist: '',
  medicinesCount: 0,
  dispensedDate: '',
  verificationStatus: 'Verified',
  remarks: '',
};

const DISPENSING_SEED_RECORDS = [
  { id: 'disp-001', prescriptionNo: 'RX2025-001', patientName: 'John Smith', pharmacist: 'Dr. Sarah Wilson', medicinesCount: 5, dispensedDate: '2025-01-15', verificationStatus: 'Verified', remarks: 'Patient counseled' },
  { id: 'disp-002', prescriptionNo: 'RX2025-002', patientName: 'Mary Johnson', pharmacist: 'Dr. Raj Patel', medicinesCount: 3, dispensedDate: '2025-01-15', verificationStatus: 'Verified', remarks: 'Allergies checked' },
  { id: 'disp-003', prescriptionNo: 'RX2025-003', patientName: 'Robert Davis', pharmacist: 'Dr. Priya Sharma', medicinesCount: 2, dispensedDate: '2025-01-16', verificationStatus: 'Verified', remarks: 'OT supply' },
  { id: 'disp-004', prescriptionNo: 'RX2025-005', patientName: 'Michael Clark', pharmacist: 'Dr. Amit Kumar', medicinesCount: 4, dispensedDate: '2025-01-17', verificationStatus: 'Verified', remarks: 'ICU prescription' },
  { id: 'disp-005', prescriptionNo: 'RX2025-001', patientName: 'John Smith', pharmacist: 'Dr. Sarah Wilson', medicinesCount: 5, dispensedDate: '2025-01-15', verificationStatus: 'Pending', remarks: 'Verification pending' },
];

const EMPTY_MEDICATION_RECALL_FORM = {
  id: '',
  medicineName: '',
  batchNumber: '',
  recallReason: '',
  recallDate: '',
  quantityAffected: 0,
  actionTaken: '',
  status: 'Open',
};

const MEDICATION_RECALL_SEED_RECORDS = [
  { id: 'recall-001', medicineName: 'Amoxicillin', batchNumber: 'AMX2025B', recallReason: 'Contamination detected', recallDate: '2025-01-10', quantityAffected: 500, actionTaken: 'Quarantine initiated', status: 'Resolved' },
  { id: 'recall-002', medicineName: 'Insulin', batchNumber: 'INS2025F', recallReason: 'Potency issue', recallDate: '2025-01-12', quantityAffected: 200, actionTaken: 'Recall notice issued', status: 'Open' },
  { id: 'recall-003', medicineName: 'Omeprazole', batchNumber: 'OME2025G', recallReason: 'Packaging defect', recallDate: '2025-01-14', quantityAffected: 300, actionTaken: 'Returned to vendor', status: 'Closed' },
  { id: 'recall-004', medicineName: 'Paracetamol', batchNumber: 'PCM2025H', recallReason: 'Labeling error', recallDate: '2025-01-15', quantityAffected: 150, actionTaken: 'Label correction', status: 'Resolved' },
  { id: 'recall-005', medicineName: 'Atorvastatin', batchNumber: 'ATOR2025I', recallReason: 'Stability concern', recallDate: '2025-01-16', quantityAffected: 100, actionTaken: 'Under investigation', status: 'Open' },
];

const PrescriptionTab = ({
  hospital,
  prescriptionRecords,
  dispensingRecords,
  medicationRecallRecords,
  prescriptionSearch,
  setPrescriptionSearch,
  dispensingSearch,
  setDispensingSearch,
  recallSearch,
  setRecallSearch,
  handleOpenPrescriptionModal,
  handleDeletePrescription,
  handleOpenDispensingModal,
  handleDeleteDispensing,
  handleOpenRecallModal,
  handleDeleteRecall,
}) => {
  const prescriptionFiltered = prescriptionRecords.filter((r) => {
    const q = prescriptionSearch.toLowerCase();
    return (
      r.prescriptionNo.toLowerCase().includes(q) ||
      r.patientName.toLowerCase().includes(q) ||
      r.doctorName.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const dispensingFiltered = dispensingRecords.filter((r) => {
    const q = dispensingSearch.toLowerCase();
    return (
      r.prescriptionNo.toLowerCase().includes(q) ||
      r.patientName.toLowerCase().includes(q) ||
      r.pharmacist.toLowerCase().includes(q)
    );
  });

  const recallFiltered = medicationRecallRecords.filter((r) => {
    const q = recallSearch.toLowerCase();
    return (
      r.medicineName.toLowerCase().includes(q) ||
      r.batchNumber.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalPrescriptions = prescriptionRecords.length;
  const pendingPrescriptions = prescriptionRecords.filter((r) => r.status === 'Pending').length;
  const dispensedPrescriptions = prescriptionRecords.filter((r) => r.status === 'Dispensed').length;
  const medicinesDispensed = dispensingRecords.reduce((s, r) => s + (r.medicinesCount || 0), 0);
  const prescriptionVerification = prescriptionRecords.length ? (prescriptionRecords.filter((r) => r.status === 'Verified' || r.status === 'Dispensed').length / prescriptionRecords.length * 100).toFixed(1) : 0;
  const medRecallCases = medicationRecallRecords.length;
  const avgDispensingTime = 2.5;
  const pharmacistInterventionRate = 15;

  const STATUS_BADGE_PRESCRIPTION = {
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Verified: 'bg-sky-50 text-sky-700 border-sky-200',
    Dispensed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const STATUS_BADGE_DISPENSING = {
    Verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Rejected: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const STATUS_BADGE_RECALL = {
    Open: 'bg-rose-50 text-rose-700 border-rose-200',
    Resolved: 'bg-sky-50 text-sky-700 border-sky-200',
    Closed: 'bg-slate-50 text-slate-500 border-slate-200',
  };

  const TH_COLS_PRESCRIPTION = ['Prescription No', 'Patient Name', 'UHID', 'Doctor', 'Department', 'Date', 'Priority', 'Status', 'Actions'];
  const TH_COLS_DISPENSING = ['Dispensing ID', 'Prescription No', 'Patient', 'Pharmacist', 'Medicines', 'Date', 'Verification', 'Actions'];
  const TH_COLS_RECALL = ['Recall ID', 'Medicine', 'Batch', 'Reason', 'Recall Date', 'Qty Affected', 'Action', 'Status', 'Actions'];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-extrabold text-slate-800 mb-3">Prescription Register</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Prescriptions', value: totalPrescriptions, color: 'text-blue-600' },
            { label: 'Pending Prescriptions', value: pendingPrescriptions, color: 'text-amber-600' },
            { label: 'Dispensed Prescriptions', value: dispensedPrescriptions, color: 'text-emerald-600' },
            { label: 'Medicines Dispensed', value: medicinesDispensed, color: 'text-sky-600' },
            { label: 'Prescription Verification %', value: `${prescriptionVerification}%`, color: 'text-violet-600' },
            { label: 'Medication Recall Cases', value: medRecallCases, color: 'text-rose-600' },
            { label: 'Avg Dispensing Time (min)', value: avgDispensingTime, color: 'text-orange-600' },
            { label: 'Pharmacist Intervention Rate %', value: `${pharmacistInterventionRate}%`, color: 'text-indigo-600' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-extrabold text-slate-800">Prescription Records</h4>
          <button onClick={() => handleOpenPrescriptionModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Prescription</button>
        </div>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search prescriptions..." value={prescriptionSearch} onChange={(e) => setPrescriptionSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {TH_COLS_PRESCRIPTION.map((h) => (
                    <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {prescriptionFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.prescriptionNo}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                    <td className="px-3 py-3 text-slate-600">{r.uhid}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.doctorName}</td>
                    <td className="px-3 py-3 text-slate-600">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600">{r.prescriptionDate}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${r.priority === 'Routine' ? 'bg-slate-50 text-slate-700 border-slate-200' : r.priority === 'Urgent' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                        {r.priority}
                      </span>
                    </td>
                    <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_PRESCRIPTION[r.status] || STATUS_BADGE_PRESCRIPTION.Pending}`}>{r.status}</span></td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleOpenPrescriptionModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => handleDeletePrescription(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {prescriptionFiltered.length === 0 && (
                  <tr><td colSpan={TH_COLS_PRESCRIPTION.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{prescriptionSearch ? 'No records match your search.' : 'No prescription records yet.'}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-extrabold text-slate-800">Dispensing Register</h4>
          <button onClick={() => handleOpenDispensingModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Dispensing</button>
        </div>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search dispensing..." value={dispensingSearch} onChange={(e) => setDispensingSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {TH_COLS_DISPENSING.map((h) => (
                    <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dispensingFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.prescriptionNo}</td>
                    <td className="px-3 py-3 text-slate-600">{r.patientName}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.pharmacist}</td>
                    <td className="px-3 py-3 text-blue-600 font-bold">{r.medicinesCount}</td>
                    <td className="px-3 py-3 text-slate-600">{r.dispensedDate}</td>
                    <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_DISPENSING[r.verificationStatus] || STATUS_BADGE_DISPENSING.Verified}`}>{r.verificationStatus}</span></td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleOpenDispensingModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => handleDeleteDispensing(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {dispensingFiltered.length === 0 && (
                  <tr><td colSpan={TH_COLS_DISPENSING.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{dispensingSearch ? 'No records match your search.' : 'No dispensing records yet.'}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-extrabold text-slate-800">Medication Recall Register</h4>
          <button onClick={() => handleOpenRecallModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Recall</button>
        </div>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search recalls..." value={recallSearch} onChange={(e) => setRecallSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {TH_COLS_RECALL.map((h) => (
                    <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recallFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.medicineName}</td>
                    <td className="px-3 py-3 text-slate-600">{r.batchNumber}</td>
                    <td className="px-3 py-3 max-w-[150px] truncate">{r.recallReason}</td>
                    <td className="px-3 py-3 text-rose-600 font-bold">{r.recallDate}</td>
                    <td className="px-3 py-3 text-blue-600 font-bold">{r.quantityAffected}</td>
                    <td className="px-3 py-3 max-w-[150px] truncate">{r.actionTaken}</td>
                    <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_RECALL[r.status] || STATUS_BADGE_RECALL.Open}`}>{r.status}</span></td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleOpenRecallModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => handleDeleteRecall(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {recallFiltered.length === 0 && (
                  <tr><td colSpan={TH_COLS_RECALL.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{recallSearch ? 'No records match your search.' : 'No medication recall records yet.'}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const SafetyTab = ({
  hospital,
  controlledDrugRecords,
  highAlertRecords,
  lansaRecords,
  controlledDrugSearch,
  setControlledDrugSearch,
  highAlertSearch,
  setHighAlertSearch,
  lansaSearch,
  setLansaSearch,
  handleOpenControlledDrugModal,
  handleDeleteControlledDrug,
  handleOpenHighAlertModal,
  handleDeleteHighAlert,
  handleOpenLansaModal,
  handleDeleteLansa,
}) => {
  const controlledDrugFiltered = controlledDrugRecords.filter((r) => {
    const q = controlledDrugSearch.toLowerCase();
    return (
      r.drugName.toLowerCase().includes(q) ||
      r.genericName.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const highAlertFiltered = highAlertRecords.filter((r) => {
    const q = highAlertSearch.toLowerCase();
    return (
      r.medicineName.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const lansaFiltered = lansaRecords.filter((r) => {
    const q = lansaSearch.toLowerCase();
    return (
      r.medicineName.toLowerCase().includes(q) ||
      r.similarMedicine.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalControlledDrugs = controlledDrugRecords.length;
  const highAlertMedicines = highAlertRecords.length;
  const lasaMedicines = lansaRecords.length;
  const controlledDrugCompliance = controlledDrugRecords.length ? (controlledDrugRecords.filter((r) => r.status === 'Verified').length / controlledDrugRecords.length * 100).toFixed(1) : 0;
  const doubleVerificationCompliance = highAlertRecords.length ? (highAlertRecords.filter((r) => r.doubleVerificationRequired === 'Yes').length / highAlertRecords.length * 100).toFixed(1) : 0;
  const stockVerificationCompleted = controlledDrugRecords.filter((r) => r.lastVerificationDate).length;
  const controlledDrugVariances = controlledDrugRecords.filter((r) => r.status === 'Variance').length;
  const medicationSafetyCompliance = 98.5;

  const STATUS_BADGE_CONTROLLED = {
    Verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Variance: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const STATUS_BADGE_HIGHALERT = {
    Active: 'bg-sky-50 text-sky-700 border-sky-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
  };

  const TH_COLS_CONTROLLED = ['Drug ID', 'Drug Name', 'Generic Name', 'Batch', 'Quantity', 'Location', 'Pharmacist', 'Last Verification', 'Status', 'Actions'];
  const TH_COLS_HIGHALERT = ['Medicine ID', 'Medicine Name', 'Category', 'Risk Level', 'Location', 'Double Verification', 'Pharmacist', 'Status', 'Actions'];
  const TH_COLS_LASA = ['Medicine ID', 'Medicine Name', 'Similar Medicine', 'Risk Description', 'Label Applied', 'Status', 'Actions'];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-extrabold text-slate-800 mb-3">Medication Safety & Controlled Drugs</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Controlled Drugs', value: totalControlledDrugs, color: 'text-blue-600' },
            { label: 'High Alert Medicines', value: highAlertMedicines, color: 'text-rose-600' },
            { label: 'LASA Medicines', value: lasaMedicines, color: 'text-orange-600' },
            { label: 'Controlled Drug Compliance %', value: `${controlledDrugCompliance}%`, color: 'text-emerald-600' },
            { label: 'Double Verification Compliance %', value: `${doubleVerificationCompliance}%`, color: 'text-violet-600' },
            { label: 'Stock Verification Completed', value: stockVerificationCompleted, color: 'text-sky-600' },
            { label: 'Controlled Drug Variances', value: controlledDrugVariances, color: 'text-amber-600' },
            { label: 'Medication Safety Compliance %', value: `${medicationSafetyCompliance}%`, color: 'text-indigo-600' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-extrabold text-slate-800">Controlled Drug Register</h4>
          <button onClick={() => handleOpenControlledDrugModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Record</button>
        </div>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search controlled drugs..." value={controlledDrugSearch} onChange={(e) => setControlledDrugSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {TH_COLS_CONTROLLED.map((h) => (
                    <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {controlledDrugFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.drugName}</td>
                    <td className="px-3 py-3 text-slate-600">{r.genericName}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.batchNumber}</td>
                    <td className="px-3 py-3 text-blue-600 font-bold">{r.quantity}</td>
                    <td className="px-3 py-3 text-slate-600">{r.storageLocation}</td>
                    <td className="px-3 py-3 text-slate-600">{r.responsiblePharmacist}</td>
                    <td className="px-3 py-3 text-slate-600">{r.lastVerificationDate}</td>
                    <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_CONTROLLED[r.status] || STATUS_BADGE_CONTROLLED.Pending}`}>{r.status}</span></td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleOpenControlledDrugModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => handleDeleteControlledDrug(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {controlledDrugFiltered.length === 0 && (
                  <tr><td colSpan={TH_COLS_CONTROLLED.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{controlledDrugSearch ? 'No records match your search.' : 'No controlled drug records yet.'}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-extrabold text-slate-800">High Alert Medicines</h4>
          <button onClick={() => handleOpenHighAlertModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Medicine</button>
        </div>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search high alert medicines..." value={highAlertSearch} onChange={(e) => setHighAlertSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {TH_COLS_HIGHALERT.map((h) => (
                    <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {highAlertFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.medicineName}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.category}</td>
                    <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${r.riskLevel === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200' : r.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-sky-50 text-sky-700 border-sky-200'}`}>{r.riskLevel}</span></td>
                    <td className="px-3 py-3 text-slate-600">{r.storageLocation}</td>
                    <td className="px-3 py-3 text-emerald-600 font-bold">{r.doubleVerificationRequired}</td>
                    <td className="px-3 py-3 text-slate-600">{r.responsiblePharmacist}</td>
                    <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_HIGHALERT[r.status] || STATUS_BADGE_HIGHALERT.Active}`}>{r.status}</span></td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleOpenHighAlertModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => handleDeleteHighAlert(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {highAlertFiltered.length === 0 && (
                  <tr><td colSpan={TH_COLS_HIGHALERT.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{highAlertSearch ? 'No records match your search.' : 'No high alert medicine records yet.'}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-extrabold text-slate-800">LASA Medicines</h4>
          <button onClick={() => handleOpenLansaModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Medicine</button>
        </div>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search LASA medicines..." value={lansaSearch} onChange={(e) => setLansaSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {TH_COLS_LASA.map((h) => (
                    <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {lansaFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.medicineName}</td>
                    <td className="px-3 py-3 text-rose-600 font-bold">{r.similarMedicine}</td>
                    <td className="px-3 py-3 max-w-[150px] truncate">{r.riskDescription}</td>
                    <td className="px-3 py-3 text-emerald-600 font-bold">{r.labelApplied}</td>
                    <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_HIGHALERT[r.status] || STATUS_BADGE_HIGHALERT.Active}`}>{r.status}</span></td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleOpenLansaModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => handleDeleteLansa(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {lansaFiltered.length === 0 && (
                  <tr><td colSpan={TH_COLS_LASA.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{lansaSearch ? 'No records match your search.' : 'No LASA medicine records yet.'}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const AuditTab = ({
  hospital,
  auditRecords,
  capaRecords,
  auditSearch,
  setAuditSearch,
  capaSearch,
  setCapaSearch,
  handleOpenAuditModal,
  handleDeleteAudit,
  handleOpenCapaModal,
  handleDeleteCapa,
}) => {
  const auditFiltered = auditRecords.filter((r) => {
    const q = auditSearch.toLowerCase();
    return (
      r.auditorName.toLowerCase().includes(q) ||
      r.auditArea.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q) ||
      (r.findings && r.findings.toLowerCase().includes(q))
    );
  });

  const capaFiltered = capaRecords.filter((r) => {
    const q = capaSearch.toLowerCase();
    return (
      r.auditId.toLowerCase().includes(q) ||
      r.observation.toLowerCase().includes(q) ||
      r.responsiblePerson.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalAudits = auditRecords.length;
  const completedAudits = auditRecords.filter((r) => r.status === 'Completed').length;
  const pendingAudits = auditRecords.filter((r) => r.status === 'Pending').length;
  const avgCompliance = auditRecords.length ? (auditRecords.reduce((s, r) => s + (r.compliancePercentage || 0), 0) / auditRecords.length).toFixed(1) : 0;
  const openCapas = capaRecords.filter((r) => r.status === 'Open').length;
  const closedCapas = capaRecords.filter((r) => r.status === 'Closed').length;
  const followUpCompleted = auditRecords.filter((r) => r.followUpDate && r.followUpDate.trim() !== '').length;
  const followUpPercent = auditRecords.length ? (followUpCompleted / auditRecords.length * 100).toFixed(1) : 0;
  const auditScore = 4.2;

  const STATUS_BADGE_AUDIT = {
    Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  const STATUS_BADGE_CAPA = {
    Open: 'bg-rose-50 text-rose-700 border-rose-200',
    'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
    Closed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const TH_COLS_AUDIT = ['Audit ID', 'Date', 'Type', 'Auditor', 'Area', 'Compliance %', 'Findings', 'CAPA', 'CAPA Status', 'Follow-up', 'Status', 'Actions'];
  const TH_COLS_CAPA = ['CAPA ID', 'Audit ID', 'Observation', 'Corrective Action', 'Responsible', 'Target Date', 'Completion Date', 'Status', 'Actions'];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-extrabold text-slate-800 mb-3">Internal Audit</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Audits', value: totalAudits, color: 'text-blue-600' },
            { label: 'Completed Audits', value: completedAudits, color: 'text-emerald-600' },
            { label: 'Pending Audits', value: pendingAudits, color: 'text-amber-600' },
            { label: 'Avg Compliance %', value: `${avgCompliance}%`, color: 'text-violet-600' },
            { label: 'Open CAPAs', value: openCapas, color: 'text-rose-600' },
            { label: 'Closed CAPAs', value: closedCapas, color: 'text-sky-600' },
            { label: 'Follow-up %', value: `${followUpPercent}%`, color: 'text-indigo-600' },
            { label: 'Audit Score', value: auditScore, color: 'text-orange-600' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-extrabold text-slate-800">Pharmacy Audit Records</h4>
          <button onClick={() => handleOpenAuditModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Audit</button>
        </div>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search audits..." value={auditSearch} onChange={(e) => setAuditSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {TH_COLS_AUDIT.map((h) => (
                    <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 text-slate-600">{r.auditDate}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.auditType}</td>
                    <td className="px-3 py-3 text-slate-600">{r.auditorName}</td>
                    <td className="px-3 py-3 text-slate-600">{r.auditArea}</td>
                    <td className="px-3 py-3 text-emerald-600 font-bold">{r.compliancePercentage}%</td>
                    <td className="px-3 py-3 max-w-[120px] truncate">{r.findings || '-'}</td>
                    <td className="px-3 py-3 text-blue-600 font-bold">{r.capaRequired}</td>
                    <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_CAPA[r.capaStatus] || STATUS_BADGE_CAPA.Open}`}>{r.capaStatus}</span></td>
                    <td className="px-3 py-3 text-slate-600">{r.followUpDate || '-'}</td>
                    <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_AUDIT[r.status] || STATUS_BADGE_AUDIT.Pending}`}>{r.status}</span></td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleOpenAuditModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => handleDeleteAudit(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {auditFiltered.length === 0 && (
                  <tr><td colSpan={TH_COLS_AUDIT.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{auditSearch ? 'No records match your search.' : 'No audit records yet.'}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-extrabold text-slate-800">CAPA Tracker</h4>
          <button onClick={() => handleOpenCapaModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add CAPA</button>
        </div>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search CAPAs..." value={capaSearch} onChange={(e) => setCapaSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {TH_COLS_CAPA.map((h) => (
                    <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {capaFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.auditId}</td>
                    <td className="px-3 py-3 max-w-[150px] truncate">{r.observation}</td>
                    <td className="px-3 py-3 max-w-[150px] truncate">{r.correctiveAction || '-'}</td>
                    <td className="px-3 py-3 text-slate-600">{r.responsiblePerson}</td>
                    <td className="px-3 py-3 text-slate-600">{r.targetDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.completionDate || '-'}</td>
                    <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_CAPA[r.status] || STATUS_BADGE_CAPA.Open}`}>{r.status}</span></td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleOpenCapaModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => handleDeleteCapa(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {capaFiltered.length === 0 && (
                  <tr><td colSpan={TH_COLS_CAPA.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{capaSearch ? 'No records match your search.' : 'No CAPA records yet.'}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReportsTab = ({
  pharmacyRecords,
  qualityIndicators,
  inventoryRecords,
  transactionRecords,
  coldchainRecords,
  prescriptionRecords,
  dispensingRecords,
  medicationRecallRecords,
  controlledDrugRecords,
  highAlertRecords,
  lansaRecords,
  auditRecords,
  capaRecords,
  hospital,
}) => {
  const totalMedicines = inventoryRecords.length;
  const totalPrescriptions = prescriptionRecords.length;
  const medicinesDispensed = dispensingRecords.reduce((s, r) => s + (r.medicinesCount || 0), 0);
  const lowStockMedicines = inventoryRecords.filter((r) => (r.currentStock || 0) < 50).length;
  const errorRate = dispensingRecords.length ? ((dispensingRecords.filter((r) => r.verificationStatus === 'Rejected').length / dispensingRecords.length) * 100).toFixed(1) : 0;
  const controlledDrugCompliance = controlledDrugRecords.length ? (controlledDrugRecords.filter((r) => r.status === 'Verified').length / controlledDrugRecords.length * 100).toFixed(1) : 0;
  const auditCompliance = auditRecords.length ? (auditRecords.reduce((s, r) => s + (r.compliancePercentage || 0), 0) / auditRecords.length).toFixed(1) : 0;
  const overallPerformance = ((parseFloat(controlledDrugCompliance) + parseFloat(auditCompliance)) / 2).toFixed(1);

  const monthlyPrescriptionData = MONTHS.map((month) => ({
    month,
    count: prescriptionRecords.length,
  }));

  const inventoryCategoryData = [
    { name: 'Normal Stock', value: inventoryRecords.filter((r) => (r.currentStock || 0) >= 50).length },
    { name: 'Low Stock', value: lowStockMedicines },
    { name: 'Out of Stock', value: inventoryRecords.filter((r) => (r.currentStock || 0) === 0).length },
  ].filter(d => d.value > 0);

  const stockMovementData = MONTHS.map((month) => ({
    month,
    receipts: transactionRecords.filter((r) => r.transactionType === 'Receipt').length,
    issues: transactionRecords.filter((r) => r.transactionType === 'Issue').length,
  }));

  const safetyDistribution = [
    { name: 'Controlled Drugs', value: controlledDrugRecords.length },
    { name: 'High Alert', value: highAlertRecords.length },
    { name: 'LASA', value: lansaRecords.length },
  ];

  const monthlyAuditData = MONTHS.map((month) => ({
    month,
    compliance: auditRecords.filter((r) => r.auditDate && r.auditDate.includes('2025')).length ? auditRecords.reduce((s, r) => s + (r.compliancePercentage || 0), 0) / auditRecords.length : 0,
  }));

  const dispensingRecallData = [
    { name: 'Dispensed', value: dispensingRecords.length },
    { name: 'Recalls', value: medicationRecallRecords.length },
  ];

  const monthlySummary = MONTHS.map((month) => {
    const audits = auditRecords.filter((r) => r.auditDate && r.auditDate.startsWith('2025'));
    return {
      month,
      prescriptions: prescriptionRecords.length,
      medicinesDispensed,
      lowStockCount: lowStockMedicines,
      medicationErrors: dispensingRecords.filter((r) => r.verificationStatus === 'Rejected').length,
      auditCompliance: auditRecords.length ? (auditRecords.reduce((s, r) => s + (r.compliancePercentage || 0), 0) / auditRecords.length).toFixed(1) : 0,
      controlledDrugCompliance,
    };
  });

  const handleExportCSV = () => {
    const csvContent = [
      ['Metric', 'Value'],
      ['Total Medicines', totalMedicines],
      ['Total Prescriptions', totalPrescriptions],
      ['Medicines Dispensed', medicinesDispensed],
      ['Low Stock Medicines', lowStockMedicines],
      ['Medication Error Rate %', errorRate],
      ['Controlled Drug Compliance %', controlledDrugCompliance],
      ['Audit Compliance %', auditCompliance],
      ['Overall Performance %', overallPerformance],
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pharmacy-reports.csv';
    a.click();
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
          <p className="text-[9px] text-slate-400 mt-0.5">Pharmacy comprehensive reporting dashboard</p>
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
          { label: 'Total Medicines', value: totalMedicines, color: 'text-blue-600' },
          { label: 'Total Prescriptions', value: totalPrescriptions, color: 'text-emerald-600' },
          { label: 'Medicines Dispensed', value: medicinesDispensed, color: 'text-sky-600' },
          { label: 'Low Stock Medicines', value: lowStockMedicines, color: 'text-rose-600' },
          { label: 'Medication Error Rate %', value: `${errorRate}%`, color: 'text-amber-600' },
          { label: 'Controlled Drug Compliance %', value: `${controlledDrugCompliance}%`, color: 'text-violet-600' },
          { label: 'Audit Compliance %', value: `${auditCompliance}%`, color: 'text-indigo-600' },
          { label: 'Overall Performance %', value: `${overallPerformance}%`, color: 'text-orange-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-extrabold text-slate-800 mb-3">Monthly Prescription Trend</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyPrescriptionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" name="Prescriptions" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-extrabold text-slate-800 mb-3">Inventory Category Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={inventoryCategoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                {inventoryCategoryData.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={['#3b82f6', '#f59e0b', '#ef4444'][idx % 3]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-extrabold text-slate-800 mb-3">Stock Movement Trend</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stockMovementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="receipts" fill="#10b981" name="Receipts" />
              <Bar dataKey="issues" fill="#3b82f6" name="Issues" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-extrabold text-slate-800 mb-3">Medication Safety Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={safetyDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                {safetyDistribution.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={['#3b82f6', '#10b981', '#8b5cf6'][idx % 3]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-extrabold text-slate-800 mb-3">Monthly Audit Compliance</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyAuditData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="compliance" stroke="#10b981" name="Compliance %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-extrabold text-slate-800 mb-3">Dispensing vs Recall Analysis</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dispensingRecallData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/50">
          <h4 className="text-xs font-extrabold text-slate-800">Monthly Summary</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Month', 'Prescriptions', 'Medicines Dispensed', 'Low Stock Count', 'Medication Errors', 'Audit Compliance %', 'Controlled Drug Compliance %'].map((h) => (
                  <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {monthlySummary.map((r) => (
                <tr key={r.month} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-3 py-3 font-semibold text-slate-700">{r.month}</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.prescriptions}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.medicinesDispensed}</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.lowStockCount}</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.medicationErrors}</td>
                  <td className="px-3 py-3 text-indigo-600 font-bold">{r.auditCompliance}%</td>
                  <td className="px-3 py-3 text-violet-600 font-bold">{r.controlledDrugCompliance}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PharmacyWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();
  const [activeTab, setActiveTab] = useState('dashboard');

  const [pharmacyRecords, setPharmacyRecords] = useState(() => {
    const saved = localStorage.getItem('pharmacy_quality_indicators');
    return saved ? JSON.parse(saved) : PHARMACY_QUALITY_RECORDS;
  });

  const [qualityIndicators, setQualityIndicators] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_QUALITY);
    return saved ? JSON.parse(saved) : QUALITY_SEED_RECORDS;
  });
  const [isQualityModalOpen, setIsQualityModalOpen] = useState(false);
  const [editingQualityId, setEditingQualityId] = useState(null);
  const [qualityForm, setQualityForm] = useState({ ...EMPTY_QUALITY_FORM });
  const [qualitySearch, setQualitySearch] = useState('');

  const [inventoryRecords, setInventoryRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_INVENTORY);
    return saved ? JSON.parse(saved) : INVENTORY_SEED_RECORDS;
  });
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [editingInventoryId, setEditingInventoryId] = useState(null);
  const [inventoryForm, setInventoryForm] = useState({ ...EMPTY_INVENTORY_FORM });
  const [inventorySearch, setInventorySearch] = useState('');

  const [transactionRecords, setTransactionRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_TRANSACTIONS);
    return saved ? JSON.parse(saved) : TRANSACTION_SEED_RECORDS;
  });
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [transactionForm, setTransactionForm] = useState({ ...EMPTY_TRANSACTION_FORM });
  const [transactionSearch, setTransactionSearch] = useState('');

  const [coldchainRecords, setColdchainRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_COLDCHAIN);
    return saved ? JSON.parse(saved) : COLDCHAIN_SEED_RECORDS;
  });
  const [isColdchainModalOpen, setIsColdchainModalOpen] = useState(false);
  const [editingColdchainId, setEditingColdchainId] = useState(null);
  const [coldchainForm, setColdchainForm] = useState({ ...EMPTY_COLDCHAIN_FORM });
  const [coldchainSearch, setColdchainSearch] = useState('');

  const [controlledDrugRecords, setControlledDrugRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_CONTROLLED_DRUGS);
    return saved ? JSON.parse(saved) : CONTROLLED_DRUG_SEED_RECORDS;
  });
  const [isControlledDrugModalOpen, setIsControlledDrugModalOpen] = useState(false);
  const [editingControlledDrugId, setEditingControlledDrugId] = useState(null);
  const [controlledDrugForm, setControlledDrugForm] = useState({ ...EMPTY_CONTROLLED_DRUG_FORM });
  const [controlledDrugSearch, setControlledDrugSearch] = useState('');

  const [highAlertRecords, setHighAlertRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_HIGH_ALERT);
    return saved ? JSON.parse(saved) : HIGH_ALERT_SEED_RECORDS;
  });
  const [isHighAlertModalOpen, setIsHighAlertModalOpen] = useState(false);
  const [editingHighAlertId, setEditingHighAlertId] = useState(null);
  const [highAlertForm, setHighAlertForm] = useState({ ...EMPTY_HIGH_ALERT_FORM });
  const [highAlertSearch, setHighAlertSearch] = useState('');

  const [lansaRecords, setLansaRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_LASA);
    return saved ? JSON.parse(saved) : LASA_SEED_RECORDS;
  });
  const [isLansaModalOpen, setIsLansaModalOpen] = useState(false);
  const [editingLansaId, setEditingLansaId] = useState(null);
  const [lansaForm, setLansaForm] = useState({ ...EMPTY_LASA_FORM });
  const [lansaSearch, setLansaSearch] = useState('');

  const [auditRecords, setAuditRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_INTERNAL_AUDITS);
    return saved ? JSON.parse(saved) : AUDIT_SEED_RECORDS;
  });
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [editingAuditId, setEditingAuditId] = useState(null);
  const [auditForm, setAuditForm] = useState({ ...EMPTY_AUDIT_FORM });
  const [auditSearch, setAuditSearch] = useState('');

  const [capaRecords, setCapaRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_CAPA_RECORDS);
    return saved ? JSON.parse(saved) : CAPA_SEED_RECORDS;
  });
  const [isCapaModalOpen, setIsCapaModalOpen] = useState(false);
  const [editingCapaId, setEditingCapaId] = useState(null);
  const [capaForm, setCapaForm] = useState({ ...EMPTY_CAPA_FORM });
  const [capaSearch, setCapaSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_QUALITY, JSON.stringify(qualityIndicators));
  }, [qualityIndicators]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_INVENTORY, JSON.stringify(inventoryRecords));
  }, [inventoryRecords]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_TRANSACTIONS, JSON.stringify(transactionRecords));
  }, [transactionRecords]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_COLDCHAIN, JSON.stringify(coldchainRecords));
  }, [coldchainRecords]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_CONTROLLED_DRUGS, JSON.stringify(controlledDrugRecords));
  }, [controlledDrugRecords]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_HIGH_ALERT, JSON.stringify(highAlertRecords));
  }, [highAlertRecords]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_LASA, JSON.stringify(lansaRecords));
  }, [lansaRecords]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_INTERNAL_AUDITS, JSON.stringify(auditRecords));
  }, [auditRecords]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_CAPA_RECORDS, JSON.stringify(capaRecords));
  }, [capaRecords]);

  const getNextQualityId = () => {
    const maxNum = qualityIndicators.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `pqi-${String(maxNum + 1).padStart(3, '0')}`;
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

  const getNextInventoryId = () => {
    const maxNum = inventoryRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `med-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenInventoryModal = (record = null) => {
    if (record) {
      setInventoryForm({ ...record });
      setEditingInventoryId(record.id);
    } else {
      setInventoryForm({ ...EMPTY_INVENTORY_FORM, id: getNextInventoryId() });
      setEditingInventoryId(null);
    }
    setIsInventoryModalOpen(true);
  };

  const handleSaveInventory = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingInventoryId) {
      setInventoryRecords((prev) =>
        prev.map((r) => (r.id === editingInventoryId ? { ...inventoryForm, id: editingInventoryId } : r))
      );
    } else {
      setInventoryRecords((prev) => [...prev, { ...inventoryForm }]);
    }
    setIsInventoryModalOpen(false);
    setEditingInventoryId(null);
  };

  const handleDeleteInventory = (id) => {
    if (window.confirm('Delete this inventory record?')) {
      setInventoryRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const getNextTransactionId = () => {
    const maxNum = transactionRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `trx-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenTransactionModal = (record = null) => {
    if (record) {
      setTransactionForm({ ...record });
      setEditingTransactionId(record.id);
    } else {
      setTransactionForm({ ...EMPTY_TRANSACTION_FORM, id: getNextTransactionId() });
      setEditingTransactionId(null);
    }
    setIsTransactionModalOpen(true);
  };

  const handleSaveTransaction = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingTransactionId) {
      setTransactionRecords((prev) =>
        prev.map((r) => (r.id === editingTransactionId ? { ...transactionForm, id: editingTransactionId } : r))
      );
    } else {
      setTransactionRecords((prev) => [...prev, { ...transactionForm }]);
    }
    setIsTransactionModalOpen(false);
    setEditingTransactionId(null);
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm('Delete this transaction record?')) {
      setTransactionRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const getNextColdchainId = () => {
    const maxNum = coldchainRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `cc-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenColdchainModal = (record = null) => {
    if (record) {
      setColdchainForm({ ...record });
      setEditingColdchainId(record.id);
    } else {
      setColdchainForm({ ...EMPTY_COLDCHAIN_FORM, id: getNextColdchainId() });
      setEditingColdchainId(null);
    }
    setIsColdchainModalOpen(true);
  };

  const handleSaveColdchain = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingColdchainId) {
      setColdchainRecords((prev) =>
        prev.map((r) => (r.id === editingColdchainId ? { ...coldchainForm, id: editingColdchainId } : r))
      );
    } else {
      setColdchainRecords((prev) => [...prev, { ...coldchainForm }]);
    }
    setIsColdchainModalOpen(false);
    setEditingColdchainId(null);
  };

  const handleDeleteColdchain = (id) => {
    if (window.confirm('Delete this cold chain record?')) {
      setColdchainRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const [prescriptionRecords, setPrescriptionRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_PRESCRIPTIONS);
    return saved ? JSON.parse(saved) : PRESCRIPTION_SEED_RECORDS;
  });
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [editingPrescriptionId, setEditingPrescriptionId] = useState(null);
  const [prescriptionForm, setPrescriptionForm] = useState({ ...EMPTY_PRESCRIPTION_FORM });
  const [prescriptionSearch, setPrescriptionSearch] = useState('');

  const [dispensingRecords, setDispensingRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_DISPENSING);
    return saved ? JSON.parse(saved) : DISPENSING_SEED_RECORDS;
  });
  const [isDispensingModalOpen, setIsDispensingModalOpen] = useState(false);
  const [editingDispensingId, setEditingDispensingId] = useState(null);
  const [dispensingForm, setDispensingForm] = useState({ ...EMPTY_DISPENSING_FORM });
  const [dispensingSearch, setDispensingSearch] = useState('');

  const [medicationRecallRecords, setMedicationRecallRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_MEDICATION_RECALLS);
    return saved ? JSON.parse(saved) : MEDICATION_RECALL_SEED_RECORDS;
  });
  const [isRecallModalOpen, setIsRecallModalOpen] = useState(false);
  const [editingRecallId, setEditingRecallId] = useState(null);
  const [recallForm, setRecallForm] = useState({ ...EMPTY_MEDICATION_RECALL_FORM });
  const [recallSearch, setRecallSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_PRESCRIPTIONS, JSON.stringify(prescriptionRecords));
  }, [prescriptionRecords]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_DISPENSING, JSON.stringify(dispensingRecords));
  }, [dispensingRecords]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_MEDICATION_RECALLS, JSON.stringify(medicationRecallRecords));
  }, [medicationRecallRecords]);

  const getNextPrescriptionId = () => {
    const maxNum = prescriptionRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `rx-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenPrescriptionModal = (record = null) => {
    if (record) {
      setPrescriptionForm({ ...record });
      setEditingPrescriptionId(record.id);
    } else {
      setPrescriptionForm({ ...EMPTY_PRESCRIPTION_FORM, id: getNextPrescriptionId() });
      setEditingPrescriptionId(null);
    }
    setIsPrescriptionModalOpen(true);
  };

  const handleSavePrescription = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingPrescriptionId) {
      setPrescriptionRecords((prev) =>
        prev.map((r) => (r.id === editingPrescriptionId ? { ...prescriptionForm, id: editingPrescriptionId } : r))
      );
    } else {
      setPrescriptionRecords((prev) => [...prev, { ...prescriptionForm }]);
    }
    setIsPrescriptionModalOpen(false);
    setEditingPrescriptionId(null);
  };

  const handleDeletePrescription = (id) => {
    if (window.confirm('Delete this prescription record?')) {
      setPrescriptionRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const getNextDispensingId = () => {
    const maxNum = dispensingRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `disp-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenDispensingModal = (record = null) => {
    if (record) {
      setDispensingForm({ ...record });
      setEditingDispensingId(record.id);
    } else {
      setDispensingForm({ ...EMPTY_DISPENSING_FORM, id: getNextDispensingId() });
      setEditingDispensingId(null);
    }
    setIsDispensingModalOpen(true);
  };

  const handleSaveDispensing = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingDispensingId) {
      setDispensingRecords((prev) =>
        prev.map((r) => (r.id === editingDispensingId ? { ...dispensingForm, id: editingDispensingId } : r))
      );
    } else {
      setDispensingRecords((prev) => [...prev, { ...dispensingForm }]);
    }
    setIsDispensingModalOpen(false);
    setEditingDispensingId(null);
  };

  const handleDeleteDispensing = (id) => {
    if (window.confirm('Delete this dispensing record?')) {
      setDispensingRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const getNextRecallId = () => {
    const maxNum = medicationRecallRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `recall-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenRecallModal = (record = null) => {
    if (record) {
      setRecallForm({ ...record });
      setEditingRecallId(record.id);
    } else {
      setRecallForm({ ...EMPTY_MEDICATION_RECALL_FORM, id: getNextRecallId() });
      setEditingRecallId(null);
    }
    setIsRecallModalOpen(true);
  };

  const handleSaveRecall = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingRecallId) {
      setMedicationRecallRecords((prev) =>
        prev.map((r) => (r.id === editingRecallId ? { ...recallForm, id: editingRecallId } : r))
      );
    } else {
      setMedicationRecallRecords((prev) => [...prev, { ...recallForm }]);
    }
    setIsRecallModalOpen(false);
    setEditingRecallId(null);
  };

  const handleDeleteRecall = (id) => {
    if (window.confirm('Delete this medication recall record?')) {
      setMedicationRecallRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const getNextControlledDrugId = () => {
    const maxNum = controlledDrugRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `cd-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenControlledDrugModal = (record = null) => {
    if (record) {
      setControlledDrugForm({ ...record });
      setEditingControlledDrugId(record.id);
    } else {
      setControlledDrugForm({ ...EMPTY_CONTROLLED_DRUG_FORM, id: getNextControlledDrugId() });
      setEditingControlledDrugId(null);
    }
    setIsControlledDrugModalOpen(true);
  };

  const handleSaveControlledDrug = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingControlledDrugId) {
      setControlledDrugRecords((prev) =>
        prev.map((r) => (r.id === editingControlledDrugId ? { ...controlledDrugForm, id: editingControlledDrugId } : r))
      );
    } else {
      setControlledDrugRecords((prev) => [...prev, { ...controlledDrugForm }]);
    }
    setIsControlledDrugModalOpen(false);
    setEditingControlledDrugId(null);
  };

  const handleDeleteControlledDrug = (id) => {
    if (window.confirm('Delete this controlled drug record?')) {
      setControlledDrugRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const getNextHighAlertId = () => {
    const maxNum = highAlertRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `ha-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenHighAlertModal = (record = null) => {
    if (record) {
      setHighAlertForm({ ...record });
      setEditingHighAlertId(record.id);
    } else {
      setHighAlertForm({ ...EMPTY_HIGH_ALERT_FORM, id: getNextHighAlertId() });
      setEditingHighAlertId(null);
    }
    setIsHighAlertModalOpen(true);
  };

  const handleSaveHighAlert = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingHighAlertId) {
      setHighAlertRecords((prev) =>
        prev.map((r) => (r.id === editingHighAlertId ? { ...highAlertForm, id: editingHighAlertId } : r))
      );
    } else {
      setHighAlertRecords((prev) => [...prev, { ...highAlertForm }]);
    }
    setIsHighAlertModalOpen(false);
    setEditingHighAlertId(null);
  };

  const handleDeleteHighAlert = (id) => {
    if (window.confirm('Delete this high alert medicine record?')) {
      setHighAlertRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const getNextLansaId = () => {
    const maxNum = lansaRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `lasa-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenLansaModal = (record = null) => {
    if (record) {
      setLansaForm({ ...record });
      setEditingLansaId(record.id);
    } else {
      setLansaForm({ ...EMPTY_LASA_FORM, id: getNextLansaId() });
      setEditingLansaId(null);
    }
    setIsLansaModalOpen(true);
  };

  const handleSaveLansa = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingLansaId) {
      setLansaRecords((prev) =>
        prev.map((r) => (r.id === editingLansaId ? { ...lansaForm, id: editingLansaId } : r))
      );
    } else {
      setLansaRecords((prev) => [...prev, { ...lansaForm }]);
    }
    setIsLansaModalOpen(false);
    setEditingLansaId(null);
  };

  const handleDeleteLansa = (id) => {
    if (window.confirm('Delete this LASA medicine record?')) {
      setLansaRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const getNextAuditId = () => {
    const maxNum = auditRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `aud-${String(maxNum + 1).padStart(3, '0')}`;
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

  const getNextCapaId = () => {
    const maxNum = capaRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `capa-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenCapaModal = (record = null) => {
    if (record) {
      setCapaForm({ ...record });
      setEditingCapaId(record.id);
    } else {
      setCapaForm({ ...EMPTY_CAPA_FORM, id: getNextCapaId() });
      setEditingCapaId(null);
    }
    setIsCapaModalOpen(true);
  };

  const handleSaveCapa = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingCapaId) {
      setCapaRecords((prev) =>
        prev.map((r) => (r.id === editingCapaId ? { ...capaForm, id: editingCapaId } : r))
      );
    } else {
      setCapaRecords((prev) => [...prev, { ...capaForm }]);
    }
    setIsCapaModalOpen(false);
    setEditingCapaId(null);
  };

  const handleDeleteCapa = (id) => {
    if (window.confirm('Delete this CAPA record?')) {
      setCapaRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab pharmacyRecords={pharmacyRecords} hospital={hospital} />;
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
      case 'inventory':
        return (
          <InventoryTab
            hospital={hospital}
            inventoryRecords={inventoryRecords}
            transactionRecords={transactionRecords}
            coldchainRecords={coldchainRecords}
            inventorySearch={inventorySearch}
            setInventorySearch={setInventorySearch}
            transactionSearch={transactionSearch}
            setTransactionSearch={setTransactionSearch}
            coldchainSearch={coldchainSearch}
            setColdchainSearch={setColdchainSearch}
            handleOpenInventoryModal={handleOpenInventoryModal}
            handleDeleteInventory={handleDeleteInventory}
            handleOpenTransactionModal={handleOpenTransactionModal}
            handleDeleteTransaction={handleDeleteTransaction}
            handleOpenColdchainModal={handleOpenColdchainModal}
            handleDeleteColdchain={handleDeleteColdchain}
          />
        );
      case 'prescription':
        return (
          <PrescriptionTab
            hospital={hospital}
            prescriptionRecords={prescriptionRecords}
            dispensingRecords={dispensingRecords}
            medicationRecallRecords={medicationRecallRecords}
            prescriptionSearch={prescriptionSearch}
            setPrescriptionSearch={setPrescriptionSearch}
            dispensingSearch={dispensingSearch}
            setDispensingSearch={setDispensingSearch}
            recallSearch={recallSearch}
            setRecallSearch={setRecallSearch}
            handleOpenPrescriptionModal={handleOpenPrescriptionModal}
            handleDeletePrescription={handleDeletePrescription}
            handleOpenDispensingModal={handleOpenDispensingModal}
            handleDeleteDispensing={handleDeleteDispensing}
            handleOpenRecallModal={handleOpenRecallModal}
            handleDeleteRecall={handleDeleteRecall}
          />
        );
      case 'safety':
        return (
          <SafetyTab
            hospital={hospital}
            controlledDrugRecords={controlledDrugRecords}
            highAlertRecords={highAlertRecords}
            lansaRecords={lansaRecords}
            controlledDrugSearch={controlledDrugSearch}
            setControlledDrugSearch={setControlledDrugSearch}
            highAlertSearch={highAlertSearch}
            setHighAlertSearch={setHighAlertSearch}
            lansaSearch={lansaSearch}
            setLansaSearch={setLansaSearch}
            handleOpenControlledDrugModal={handleOpenControlledDrugModal}
            handleDeleteControlledDrug={handleDeleteControlledDrug}
            handleOpenHighAlertModal={handleOpenHighAlertModal}
            handleDeleteHighAlert={handleDeleteHighAlert}
            handleOpenLansaModal={handleOpenLansaModal}
            handleDeleteLansa={handleDeleteLansa}
          />
        );
      case 'audit':
        return (
          <AuditTab
            hospital={hospital}
            auditRecords={auditRecords}
            capaRecords={capaRecords}
            auditSearch={auditSearch}
            setAuditSearch={setAuditSearch}
            capaSearch={capaSearch}
            setCapaSearch={setCapaSearch}
            handleOpenAuditModal={handleOpenAuditModal}
            handleDeleteAudit={handleDeleteAudit}
            handleOpenCapaModal={handleOpenCapaModal}
            handleDeleteCapa={handleDeleteCapa}
          />
        );
      case 'reports': return (
          <ReportsTab
            pharmacyRecords={pharmacyRecords}
            qualityIndicators={qualityIndicators}
            inventoryRecords={inventoryRecords}
            transactionRecords={transactionRecords}
            coldchainRecords={coldchainRecords}
            prescriptionRecords={prescriptionRecords}
            dispensingRecords={dispensingRecords}
            medicationRecallRecords={medicationRecallRecords}
            controlledDrugRecords={controlledDrugRecords}
            highAlertRecords={highAlertRecords}
            lansaRecords={lansaRecords}
            auditRecords={auditRecords}
            capaRecords={capaRecords}
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
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">Pharmacy</h2>
          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">Medication Management Module</p>
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
          <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Pharmacy Workspace — NABH Module</p>
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
                    {editingQualityId ? 'Edit Quality Indicator' : 'Add Quality Indicator'}
                  </h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Pharmacy Quality Metrics</p>
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
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Indicator Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Indicator Name *</label>
                      <input
                        type="text"
                        value={qualityForm.indicatorName}
                        onChange={(e) => setQualityForm({ ...qualityForm, indicatorName: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Category *</label>
                      <select
                        value={qualityForm.category}
                        onChange={(e) => setQualityForm({ ...qualityForm, category: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {QUALITY_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <NumField label="Target (%) *" field="target" form={qualityForm} setForm={setQualityForm} step="0.1" />
                    <NumField label="Actual (%) *" field="actual" form={qualityForm} setForm={setQualityForm} step="0.1" />
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
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Responsible</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Responsible Pharmacist</label>
                      <input
                        type="text"
                        value={qualityForm.responsiblePharmacist}
                        onChange={(e) => setQualityForm({ ...qualityForm, responsiblePharmacist: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Enter pharmacist name"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                      <textarea
                        value={qualityForm.remarks}
                        onChange={(e) => setQualityForm({ ...qualityForm, remarks: e.target.value })}
                        rows="2"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Optional remarks"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Status</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                      <select
                        value={qualityForm.status}
                        onChange={(e) => setQualityForm({ ...qualityForm, status: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Achieved">Achieved</option>
                        <option value="Partially Achieved">Partially Achieved</option>
                        <option value="Not Achieved">Not Achieved</option>
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

        {isInventoryModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">
                    {editingInventoryId ? 'Edit Medicine' : 'Add Medicine'}
                  </h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Pharmacy Medicine Inventory</p>
                </div>
                <button
                  onClick={() => { setIsInventoryModalOpen(false); setEditingInventoryId(null); }}
                  className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveInventory} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Medicine Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Medicine Name *</label>
                      <input
                        type="text"
                        value={inventoryForm.medicineName}
                        onChange={(e) => setInventoryForm({ ...inventoryForm, medicineName: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Generic Name *</label>
                      <input
                        type="text"
                        value={inventoryForm.genericName}
                        onChange={(e) => setInventoryForm({ ...inventoryForm, genericName: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Category *</label>
                      <select
                        value={inventoryForm.category}
                        onChange={(e) => setInventoryForm({ ...inventoryForm, category: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {MEDICINE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Batch Number *</label>
                      <input
                        type="text"
                        value={inventoryForm.batchNumber}
                        onChange={(e) => setInventoryForm({ ...inventoryForm, batchNumber: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                    <NumField label="Quantity *" field="quantity" form={inventoryForm} setForm={setInventoryForm} />
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Unit *</label>
                      <input
                        type="text"
                        value={inventoryForm.unit}
                        onChange={(e) => setInventoryForm({ ...inventoryForm, unit: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Vendor</label>
                      <input
                        type="text"
                        value={inventoryForm.vendor}
                        onChange={(e) => setInventoryForm({ ...inventoryForm, vendor: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Expiry Date *</label>
                      <input
                        type="date"
                        value={inventoryForm.expiryDate}
                        onChange={(e) => setInventoryForm({ ...inventoryForm, expiryDate: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Storage Type *</label>
                      <select
                        value={inventoryForm.storageType}
                        onChange={(e) => setInventoryForm({ ...inventoryForm, storageType: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {STORAGE_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <NumField label="Reorder Level *" field="reorderLevel" form={inventoryForm} setForm={setInventoryForm} />
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Status</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                      <select
                        value={inventoryForm.status}
                        onChange={(e) => setInventoryForm({ ...inventoryForm, status: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="In Stock">In Stock</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                        <option value="Expiring Soon">Expiring Soon</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => { setIsInventoryModalOpen(false); setEditingInventoryId(null); }}
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ backgroundColor: hospital.themeColor }}
                    className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                  >
                    {editingInventoryId ? 'Save Changes' : 'Add Record'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isTransactionModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">
                    {editingTransactionId ? 'Edit Transaction' : 'Add Transaction'}
                  </h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Stock Transaction Record</p>
                </div>
                <button
                  onClick={() => { setIsTransactionModalOpen(false); setEditingTransactionId(null); }}
                  className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveTransaction} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Transaction Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Medicine *</label>
                      <select
                        value={transactionForm.medicine}
                        onChange={(e) => setTransactionForm({ ...transactionForm, medicine: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      >
                        <option value="">Select Medicine</option>
                        {inventoryRecords.map((m) => <option key={m.id} value={m.medicineName}>{m.medicineName}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Transaction Type *</label>
                      <select
                        value={transactionForm.transactionType}
                        onChange={(e) => setTransactionForm({ ...transactionForm, transactionType: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {TRANSACTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <NumField label="Quantity *" field="quantity" form={transactionForm} setForm={setTransactionForm} />
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Date *</label>
                      <input
                        type="date"
                        value={transactionForm.date}
                        onChange={(e) => setTransactionForm({ ...transactionForm, date: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Performed By *</label>
                      <input
                        type="text"
                        value={transactionForm.performedBy}
                        onChange={(e) => setTransactionForm({ ...transactionForm, performedBy: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Remarks</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                      <textarea
                        value={transactionForm.remarks}
                        onChange={(e) => setTransactionForm({ ...transactionForm, remarks: e.target.value })}
                        rows="2"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Optional remarks"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => { setIsTransactionModalOpen(false); setEditingTransactionId(null); }}
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ backgroundColor: hospital.themeColor }}
                    className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                  >
                    {editingTransactionId ? 'Save Changes' : 'Add Record'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isColdchainModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">
                    {editingColdchainId ? 'Edit Cold Chain Record' : 'Add Cold Chain Record'}
                  </h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Temperature Monitoring</p>
                </div>
                <button
                  onClick={() => { setIsColdchainModalOpen(false); setEditingColdchainId(null); }}
                  className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveColdchain} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Monitoring Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Refrigerator *</label>
                      <select
                        value={coldchainForm.refrigerator}
                        onChange={(e) => setColdchainForm({ ...coldchainForm, refrigerator: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Main Refrigerator">Main Refrigerator</option>
                        <option value="Vaccine Cold Chain">Vaccine Cold Chain</option>
                        <option value="ICU Refrigerator">ICU Refrigerator</option>
                        <option value="OR Refrigerator">OR Refrigerator</option>
                      </select>
                    </div>
                    <NumField label="Temperature (°C) *" field="temperature" form={coldchainForm} setForm={setColdchainForm} step="0.1" />
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Recorded Date *</label>
                      <input
                        type="date"
                        value={coldchainForm.recordedDate}
                        onChange={(e) => setColdchainForm({ ...coldchainForm, recordedDate: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Recorded By *</label>
                      <input
                        type="text"
                        value={coldchainForm.recordedBy}
                        onChange={(e) => setColdchainForm({ ...coldchainForm, recordedBy: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Status</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                      <select
                        value={coldchainForm.status}
                        onChange={(e) => setColdchainForm({ ...coldchainForm, status: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Normal">Normal</option>
                        <option value="Warning">Warning</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Remarks</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                      <textarea
                        value={coldchainForm.remarks}
                        onChange={(e) => setColdchainForm({ ...coldchainForm, remarks: e.target.value })}
                        rows="2"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Optional remarks"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => { setIsColdchainModalOpen(false); setEditingColdchainId(null); }}
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ backgroundColor: hospital.themeColor }}
                    className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                  >
                    {editingColdchainId ? 'Save Changes' : 'Add Record'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isPrescriptionModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">
                    {editingPrescriptionId ? 'Edit Prescription' : 'Add Prescription'}
                  </h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Prescription Register</p>
                </div>
                <button
                  onClick={() => { setIsPrescriptionModalOpen(false); setEditingPrescriptionId(null); }}
                  className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSavePrescription} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Prescription Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Prescription No *</label>
                      <input
                        type="text"
                        value={prescriptionForm.prescriptionNo}
                        onChange={(e) => setPrescriptionForm({ ...prescriptionForm, prescriptionNo: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name *</label>
                      <input
                        type="text"
                        value={prescriptionForm.patientName}
                        onChange={(e) => setPrescriptionForm({ ...prescriptionForm, patientName: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">UHID/IPD/OPD No *</label>
                      <input
                        type="text"
                        value={prescriptionForm.uhid}
                        onChange={(e) => setPrescriptionForm({ ...prescriptionForm, uhid: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Doctor Name *</label>
                      <input
                        type="text"
                        value={prescriptionForm.doctorName}
                        onChange={(e) => setPrescriptionForm({ ...prescriptionForm, doctorName: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Department *</label>
                      <select
                        value={prescriptionForm.department}
                        onChange={(e) => setPrescriptionForm({ ...prescriptionForm, department: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Prescription Date *</label>
                      <input
                        type="date"
                        value={prescriptionForm.prescriptionDate}
                        onChange={(e) => setPrescriptionForm({ ...prescriptionForm, prescriptionDate: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Priority *</label>
                      <select
                        value={prescriptionForm.priority}
                        onChange={(e) => setPrescriptionForm({ ...prescriptionForm, priority: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                      <select
                        value={prescriptionForm.status}
                        onChange={(e) => setPrescriptionForm({ ...prescriptionForm, status: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {PRESCRIPTION_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => { setIsPrescriptionModalOpen(false); setEditingPrescriptionId(null); }}
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ backgroundColor: hospital.themeColor }}
                    className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                  >
                    {editingPrescriptionId ? 'Save Changes' : 'Add Record'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isDispensingModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">
                    {editingDispensingId ? 'Edit Dispensing' : 'Add Dispensing'}
                  </h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Dispensing Register</p>
                </div>
                <button
                  onClick={() => { setIsDispensingModalOpen(false); setEditingDispensingId(null); }}
                  className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveDispensing} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Dispensing Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Prescription No *</label>
                      <select
                        value={dispensingForm.prescriptionNo}
                        onChange={(e) => {
                          const p = prescriptionRecords.find(r => r.prescriptionNo === e.target.value);
                          setDispensingForm({ ...dispensingForm, prescriptionNo: e.target.value, patientName: p ? p.patientName : '' });
                        }}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      >
                        <option value="">Select Prescription</option>
                        {prescriptionRecords.map((p) => <option key={p.id} value={p.prescriptionNo}>{p.prescriptionNo} - {p.patientName}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name</label>
                      <input
                        type="text"
                        value={dispensingForm.patientName}
                        onChange={(e) => setDispensingForm({ ...dispensingForm, patientName: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Pharmacist *</label>
                      <input
                        type="text"
                        value={dispensingForm.pharmacist}
                        onChange={(e) => setDispensingForm({ ...dispensingForm, pharmacist: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                    <NumField label="Medicines Count *" field="medicinesCount" form={dispensingForm} setForm={setDispensingForm} />
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Dispensed Date *</label>
                      <input
                        type="date"
                        value={dispensingForm.dispensedDate}
                        onChange={(e) => setDispensingForm({ ...dispensingForm, dispensedDate: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Verification Status *</label>
                      <select
                        value={dispensingForm.verificationStatus}
                        onChange={(e) => setDispensingForm({ ...dispensingForm, verificationStatus: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {VERIFICATION_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Remarks</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                      <textarea
                        value={dispensingForm.remarks}
                        onChange={(e) => setDispensingForm({ ...dispensingForm, remarks: e.target.value })}
                        rows="2"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Optional remarks"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => { setIsDispensingModalOpen(false); setEditingDispensingId(null); }}
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ backgroundColor: hospital.themeColor }}
                    className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                  >
                    {editingDispensingId ? 'Save Changes' : 'Add Record'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isRecallModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">
                    {editingRecallId ? 'Edit Recall' : 'Add Recall'}
                  </h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Medication Recall Register</p>
                </div>
                <button
                  onClick={() => { setIsRecallModalOpen(false); setEditingRecallId(null); }}
                  className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveRecall} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Recall Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Medicine Name *</label>
                      <input
                        type="text"
                        value={recallForm.medicineName}
                        onChange={(e) => setRecallForm({ ...recallForm, medicineName: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Batch Number *</label>
                      <input
                        type="text"
                        value={recallForm.batchNumber}
                        onChange={(e) => setRecallForm({ ...recallForm, batchNumber: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                    <NumField label="Quantity Affected *" field="quantityAffected" form={recallForm} setForm={setRecallForm} />
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Recall Date *</label>
                      <input
                        type="date"
                        value={recallForm.recallDate}
                        onChange={(e) => setRecallForm({ ...recallForm, recallDate: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Recall Reason *</label>
                      <textarea
                        value={recallForm.recallReason}
                        onChange={(e) => setRecallForm({ ...recallForm, recallReason: e.target.value })}
                        rows="2"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Action</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Action Taken</label>
                      <textarea
                        value={recallForm.actionTaken}
                        onChange={(e) => setRecallForm({ ...recallForm, actionTaken: e.target.value })}
                        rows="2"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Action taken"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                      <select
                        value={recallForm.status}
                        onChange={(e) => setRecallForm({ ...recallForm, status: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {RECALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => { setIsRecallModalOpen(false); setEditingRecallId(null); }}
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ backgroundColor: hospital.themeColor }}
                    className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                  >
{editingRecallId ? 'Save Changes' : 'Add Record'}
                   </button>
                 </div>
               </form>
             </div>
           </div>
         )}

        {isControlledDrugModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingControlledDrugId ? 'Edit Controlled Drug' : 'Add Controlled Drug'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Controlled Drug Register</p>
                </div>
                <button onClick={() => { setIsControlledDrugModalOpen(false); setEditingControlledDrugId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveControlledDrug} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Drug Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Drug Name *</label>
                      <input type="text" value={controlledDrugForm.drugName} onChange={(e) => setControlledDrugForm({ ...controlledDrugForm, drugName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Generic Name *</label>
                      <input type="text" value={controlledDrugForm.genericName} onChange={(e) => setControlledDrugForm({ ...controlledDrugForm, genericName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Batch Number *</label>
                      <input type="text" value={controlledDrugForm.batchNumber} onChange={(e) => setControlledDrugForm({ ...controlledDrugForm, batchNumber: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <NumField label="Quantity *" field="quantity" form={controlledDrugForm} setForm={setControlledDrugForm} />
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Storage Location *</label>
                      <input type="text" value={controlledDrugForm.storageLocation} onChange={(e) => setControlledDrugForm({ ...controlledDrugForm, storageLocation: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Responsible Pharmacist *</label>
                      <input type="text" value={controlledDrugForm.responsiblePharmacist} onChange={(e) => setControlledDrugForm({ ...controlledDrugForm, responsiblePharmacist: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Last Verification Date *</label>
                      <input type="date" value={controlledDrugForm.lastVerificationDate} onChange={(e) => setControlledDrugForm({ ...controlledDrugForm, lastVerificationDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                      <select value={controlledDrugForm.status} onChange={(e) => setControlledDrugForm({ ...controlledDrugForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        <option value="Verified">Verified</option>
                        <option value="Pending">Pending</option>
                        <option value="Variance">Variance</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsControlledDrugModalOpen(false); setEditingControlledDrugId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingControlledDrugId ? 'Save Changes' : 'Add Record'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isHighAlertModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingHighAlertId ? 'Edit High Alert Medicine' : 'Add High Alert Medicine'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">High Alert Medicine Register</p>
                </div>
                <button onClick={() => { setIsHighAlertModalOpen(false); setEditingHighAlertId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveHighAlert} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Medicine Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Medicine Name *</label>
                      <input type="text" value={highAlertForm.medicineName} onChange={(e) => setHighAlertForm({ ...highAlertForm, medicineName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Category *</label>
                      <select value={highAlertForm.category} onChange={(e) => setHighAlertForm({ ...highAlertForm, category: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        <option value="Analgesic">Analgesic</option>
                        <option value="Anticoagulant">Anticoagulant</option>
                        <option value="Electrolyte">Electrolyte</option>
                        <option value="Cardiac">Cardiac</option>
                        <option value="Antibiotic">Antibiotic</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Risk Level *</label>
                      <select value={highAlertForm.riskLevel} onChange={(e) => setHighAlertForm({ ...highAlertForm, riskLevel: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {RISK_LEVELS.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Storage Location *</label>
                      <input type="text" value={highAlertForm.storageLocation} onChange={(e) => setHighAlertForm({ ...highAlertForm, storageLocation: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Double Verification Required *</label>
                      <select value={highAlertForm.doubleVerificationRequired} onChange={(e) => setHighAlertForm({ ...highAlertForm, doubleVerificationRequired: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {YES_NO.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Responsible Pharmacist *</label>
                      <input type="text" value={highAlertForm.responsiblePharmacist} onChange={(e) => setHighAlertForm({ ...highAlertForm, responsiblePharmacist: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                      <select value={highAlertForm.status} onChange={(e) => setHighAlertForm({ ...highAlertForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsHighAlertModalOpen(false); setEditingHighAlertId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingHighAlertId ? 'Save Changes' : 'Add Record'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isLansaModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingLansaId ? 'Edit LASA Medicine' : 'Add LASA Medicine'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">LASA Medicine Register</p>
                </div>
                <button onClick={() => { setIsLansaModalOpen(false); setEditingLansaId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveLansa} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Medicine Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Medicine Name *</label>
                      <input type="text" value={lansaForm.medicineName} onChange={(e) => setLansaForm({ ...lansaForm, medicineName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Similar Medicine *</label>
                      <input type="text" value={lansaForm.similarMedicine} onChange={(e) => setLansaForm({ ...lansaForm, similarMedicine: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Risk Description *</label>
                      <textarea value={lansaForm.riskDescription} onChange={(e) => setLansaForm({ ...lansaForm, riskDescription: e.target.value })} rows="2" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Storage Precaution *</label>
                      <input type="text" value={lansaForm.storagePrecaution} onChange={(e) => setLansaForm({ ...lansaForm, storagePrecaution: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Label Applied *</label>
                      <select value={lansaForm.labelApplied} onChange={(e) => setLansaForm({ ...lansaForm, labelApplied: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {YES_NO.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                      <select value={lansaForm.status} onChange={(e) => setLansaForm({ ...lansaForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsLansaModalOpen(false); setEditingLansaId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingLansaId ? 'Save Changes' : 'Add Record'}</button>
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
                  <h3 className="text-sm font-extrabold text-slate-800">{editingAuditId ? 'Edit Audit' : 'Add Audit'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Pharmacy Audit Register</p>
                </div>
                <button onClick={() => { setIsAuditModalOpen(false); setEditingAuditId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveAudit} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Audit Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Date *</label>
                      <input type="date" value={auditForm.auditDate} onChange={(e) => setAuditForm({ ...auditForm, auditDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Type *</label>
                      <select value={auditForm.auditType} onChange={(e) => setAuditForm({ ...auditForm, auditType: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {AUDIT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Auditor Name *</label>
                      <input type="text" value={auditForm.auditorName} onChange={(e) => setAuditForm({ ...auditForm, auditorName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Area *</label>
                      <select value={auditForm.auditArea} onChange={(e) => setAuditForm({ ...auditForm, auditArea: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {AUDIT_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <NumField label="Compliance %" field="compliancePercentage" form={auditForm} setForm={setAuditForm} max="100" />
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Findings *</label>
                      <textarea value={auditForm.findings} onChange={(e) => setAuditForm({ ...auditForm, findings: e.target.value })} rows="2" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">CAPA Required *</label>
                      <select value={auditForm.capaRequired} onChange={(e) => setAuditForm({ ...auditForm, capaRequired: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {YES_NO.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">CAPA Status *</label>
                      <select value={auditForm.capaStatus} onChange={(e) => setAuditForm({ ...auditForm, capaStatus: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {CAPA_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Follow-up Date</label>
                      <input type="date" value={auditForm.followUpDate} onChange={(e) => setAuditForm({ ...auditForm, followUpDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                      <select value={auditForm.status} onChange={(e) => setAuditForm({ ...auditForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {AUDIT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsAuditModalOpen(false); setEditingAuditId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingAuditId ? 'Save Changes' : 'Add Record'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isCapaModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingCapaId ? 'Edit CAPA' : 'Add CAPA'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">CAPA Tracker</p>
                </div>
                <button onClick={() => { setIsCapaModalOpen(false); setEditingCapaId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveCapa} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">CAPA Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit ID *</label>
                      <input type="text" value={capaForm.auditId} onChange={(e) => setCapaForm({ ...capaForm, auditId: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Observation *</label>
                      <textarea value={capaForm.observation} onChange={(e) => setCapaForm({ ...capaForm, observation: e.target.value })} rows="2" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Corrective Action *</label>
                      <textarea value={capaForm.correctiveAction} onChange={(e) => setCapaForm({ ...capaForm, correctiveAction: e.target.value })} rows="2" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Responsible Person *</label>
                      <input type="text" value={capaForm.responsiblePerson} onChange={(e) => setCapaForm({ ...capaForm, responsiblePerson: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Target Date *</label>
                      <input type="date" value={capaForm.targetDate} onChange={(e) => setCapaForm({ ...capaForm, targetDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Completion Date</label>
                      <input type="date" value={capaForm.completionDate} onChange={(e) => setCapaForm({ ...capaForm, completionDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                      <select value={capaForm.status} onChange={(e) => setCapaForm({ ...capaForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {CAPA_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsCapaModalOpen(false); setEditingCapaId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingCapaId ? 'Save Changes' : 'Add Record'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PharmacyWorkspace;
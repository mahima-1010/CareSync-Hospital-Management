import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  ChevronLeft,
  LayoutDashboard,
  Building2,
  Leaf,
  Wrench,
  RefreshCw,
  ClipboardCheck,
  BarChart3,
  Plus,
  Edit3,
  Trash2,
  X,
  Search,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
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

/* ============================================================
   SHARED CONSTANTS
   ============================================================ */

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];

const TABS = [
  { id: 'dashboard',    label: 'Dashboard',                            icon: LayoutDashboard },
  { id: 'hospital_lic', label: 'Hospital Licenses',                    icon: Building2 },
  { id: 'reg_env',      label: 'Regulatory & Environmental Compliance', icon: Leaf },
  { id: 'equip_fac',    label: 'Equipment & Facility Licenses',         icon: Wrench },
  { id: 'renewal',      label: 'Renewal & Compliance Tracker',          icon: RefreshCw },
  { id: 'audit',        label: 'Internal Audit',                        icon: ClipboardCheck },
  { id: 'reports',      label: 'Reports & Analytics',                   icon: BarChart3 },
];

/* ============================================================
   PHASE 1 — DASHBOARD DATA
   ============================================================ */

const dashboardKpiCards = [
  { label: 'Total Licenses',    value: '148', color: 'text-blue-600' },
  { label: 'Valid Licenses',    value: '112', color: 'text-emerald-600' },
  { label: 'Expired Licenses',  value: '18',  color: 'text-rose-600' },
  { label: 'Expiring Soon',     value: '11',  color: 'text-amber-600' },
  { label: 'Pending Renewals',  value: '7',   color: 'text-violet-600' },
  { label: 'Compliance %',      value: '91%', color: 'text-teal-600' },
  { label: 'Missing Documents', value: '4',   color: 'text-orange-600' },
  { label: 'Renewed This Year', value: '29',  color: 'text-sky-600' },
];

const licenseStatusData = [
  { name: 'Valid',           value: 112 },
  { name: 'Expired',         value: 18 },
  { name: 'Expiring Soon',   value: 11 },
  { name: 'Pending Renewal', value: 7 },
];

const deptLicenseData = [
  { name: 'Radiology',  licenses: 24 },
  { name: 'Pharmacy',   licenses: 18 },
  { name: 'Laboratory', licenses: 22 },
  { name: 'Emergency',  licenses: 15 },
  { name: 'OT/ICU',     licenses: 29 },
  { name: 'Admin',      licenses: 12 },
];

const monthlyRenewalsData = [
  { name: 'Jan', renewals: 3 },
  { name: 'Feb', renewals: 2 },
  { name: 'Mar', renewals: 5 },
  { name: 'Apr', renewals: 4 },
  { name: 'May', renewals: 6 },
  { name: 'Jun', renewals: 9 },
];

const expiringTrendData = [
  { name: 'Jul', expiring: 4 },
  { name: 'Aug', expiring: 2 },
  { name: 'Sep', expiring: 6 },
  { name: 'Oct', expiring: 3 },
  { name: 'Nov', expiring: 5 },
  { name: 'Dec', expiring: 7 },
];

const authorityData = [
  { name: 'State Govt',   value: 48 },
  { name: 'Central Govt', value: 34 },
  { name: 'Municipal',    value: 22 },
  { name: 'AERB',         value: 14 },
  { name: 'CPCB/SPCB',    value: 18 },
  { name: 'Others',       value: 12 },
];

const complianceTrendData = [
  { name: 'Jan', compliance: 84 },
  { name: 'Feb', compliance: 86 },
  { name: 'Mar', compliance: 87 },
  { name: 'Apr', compliance: 89 },
  { name: 'May', compliance: 90 },
  { name: 'Jun', compliance: 91 },
];

const monthlySummaryData = [
  { department: 'Radiology',      total: 24, valid: 20, expiring: 2, expired: 2, compliance: 92, status: 'Good' },
  { department: 'Pharmacy',       total: 18, valid: 15, expiring: 2, expired: 1, compliance: 89, status: 'Watch' },
  { department: 'Laboratory',     total: 22, valid: 19, expiring: 1, expired: 2, compliance: 91, status: 'Good' },
  { department: 'OT / ICU',       total: 29, valid: 25, expiring: 3, expired: 1, compliance: 95, status: 'Good' },
  { department: 'Administration', total: 12, valid:  9, expiring: 1, expired: 2, compliance: 82, status: 'Watch' },
];

const STATUS_BADGE_SUMMARY = {
  Good:     'bg-emerald-50 text-emerald-700 border-emerald-200',
  Watch:    'bg-amber-50 text-amber-700 border-amber-200',
  Critical: 'bg-rose-50 text-rose-700 border-rose-200',
};

/* ============================================================
   PHASE 2 — HOSPITAL LICENSES CONSTANTS & SEED
   ============================================================ */

const LS_KEY_HOSPITAL_LICENSES = 'licenses_hospital_register';

const LICENSE_CATEGORIES = [
  'Hospital Registration',
  'Medical Establishment',
  'Clinical Establishment',
  'Drug License',
  'Food Safety',
  'Blood Bank',
  'PAN / Tax Registration',
  'Other',
];

const HOSPITAL_DEPARTMENTS = [
  'Administration', 'Blood Bank', 'Cardiology', 'CSSD', 'Emergency',
  'ICU', 'Laboratory', 'Nephrology', 'Neurology', 'OBG', 'OT',
  'Orthopaedics', 'Pediatrics', 'Pharmacy', 'Radiology', 'General',
];

const LICENSING_AUTHORITIES = [
  'State Government', 'Central Government', 'Municipal Corporation',
  'FSSAI', 'Drug Controller', 'Income Tax Department', 'GST Department',
  'Blood Bank Authority', 'AERB', 'CPCB / SPCB', 'Other',
];

const SEED_HOSPITAL_LICENSES = [
  {
    id: 'hl-001', licenseId: 'LIC-H-0001',
    licenseName: 'Nursing Home Registration Certificate',
    licenseCategory: 'Hospital Registration',
    registrationNumber: 'NH/KA/2019/00234',
    licensingAuthority: 'State Government',
    hospitalDepartment: 'Administration',
    issueDate: '2019-04-01',
    expiryDate: '2027-03-31',
    renewBefore: '2027-01-31',
    responsiblePerson: 'Mr. Rahul Verma',
    documentNumber: 'DOC-NH-2019-234',
    documentUpload: '',
    remarks: 'Renewal to be initiated 60 days prior.',
  },
  {
    id: 'hl-002', licenseId: 'LIC-H-0002',
    licenseName: 'Clinical Establishment Registration',
    licenseCategory: 'Clinical Establishment',
    registrationNumber: 'CE/KA/2021/1087',
    licensingAuthority: 'State Government',
    hospitalDepartment: 'Administration',
    issueDate: '2021-06-15',
    expiryDate: '2026-06-14',
    renewBefore: '2026-04-14',
    responsiblePerson: 'Mr. Rahul Verma',
    documentNumber: 'DOC-CE-2021-1087',
    documentUpload: '',
    remarks: 'Renewal application submitted.',
  },
  {
    id: 'hl-003', licenseId: 'LIC-H-0003',
    licenseName: 'Retail Drug License',
    licenseCategory: 'Drug License',
    registrationNumber: 'DL/RETAIL/KA/2022/5678',
    licensingAuthority: 'Drug Controller',
    hospitalDepartment: 'Pharmacy',
    issueDate: '2022-01-01',
    expiryDate: '2027-12-31',
    renewBefore: '2027-10-31',
    responsiblePerson: 'Ms. Anitha B',
    documentNumber: 'DOC-DL-2022-5678',
    documentUpload: '',
    remarks: '',
  },
  {
    id: 'hl-004', licenseId: 'LIC-H-0004',
    licenseName: 'Bulk Drug License',
    licenseCategory: 'Drug License',
    registrationNumber: 'DL/BULK/KA/2022/9012',
    licensingAuthority: 'Drug Controller',
    hospitalDepartment: 'Pharmacy',
    issueDate: '2022-03-01',
    expiryDate: '2027-02-28',
    renewBefore: '2026-12-31',
    responsiblePerson: 'Ms. Kavitha R',
    documentNumber: 'DOC-DL-2022-9012',
    documentUpload: '',
    remarks: '',
  },
  {
    id: 'hl-005', licenseId: 'LIC-H-0005',
    licenseName: 'FSSAI Food Safety License',
    licenseCategory: 'Food Safety',
    registrationNumber: 'FSS/KA/2023/FBO-4567',
    licensingAuthority: 'FSSAI',
    hospitalDepartment: 'Administration',
    issueDate: '2023-04-01',
    expiryDate: '2026-03-31',
    renewBefore: '2026-01-31',
    responsiblePerson: 'Mr. Rahul Verma',
    documentNumber: 'DOC-FSS-2023-4567',
    documentUpload: '',
    remarks: 'Covers hospital canteen and dietary services.',
  },
  {
    id: 'hl-006', licenseId: 'LIC-H-0006',
    licenseName: 'Blood Bank License',
    licenseCategory: 'Blood Bank',
    registrationNumber: 'BB/KA/2020/BB-0089',
    licensingAuthority: 'Blood Bank Authority',
    hospitalDepartment: 'Blood Bank',
    issueDate: '2020-07-01',
    expiryDate: '2025-06-30',
    renewBefore: '2025-04-30',
    responsiblePerson: 'Dr. Priya Nair',
    documentNumber: 'DOC-BB-2020-0089',
    documentUpload: '',
    remarks: 'Renewal overdue — action required immediately.',
  },
  {
    id: 'hl-007', licenseId: 'LIC-H-0007',
    licenseName: 'PAN Registration',
    licenseCategory: 'PAN / Tax Registration',
    registrationNumber: 'AABCH1234K',
    licensingAuthority: 'Income Tax Department',
    hospitalDepartment: 'Administration',
    issueDate: '2005-01-10',
    expiryDate: '2099-12-31',
    renewBefore: '2099-10-31',
    responsiblePerson: 'Mr. Mahesh Rao',
    documentNumber: 'DOC-PAN-2005-001',
    documentUpload: '',
    remarks: 'Permanent — no renewal required.',
  },
  {
    id: 'hl-008', licenseId: 'LIC-H-0008',
    licenseName: 'GST Registration Certificate',
    licenseCategory: 'PAN / Tax Registration',
    registrationNumber: '29AABCH1234K1Z5',
    licensingAuthority: 'GST Department',
    hospitalDepartment: 'Administration',
    issueDate: '2017-07-01',
    expiryDate: '2099-12-31',
    renewBefore: '2099-10-31',
    responsiblePerson: 'Mr. Mahesh Rao',
    documentNumber: 'DOC-GST-2017-001',
    documentUpload: '',
    remarks: 'GSTIN active; annual return filing up to date.',
  },
  {
    id: 'hl-009', licenseId: 'LIC-H-0009',
    licenseName: 'Medical Establishment Renewal Certificate',
    licenseCategory: 'Medical Establishment',
    registrationNumber: 'ME/KA/2024/3301',
    licensingAuthority: 'Municipal Corporation',
    hospitalDepartment: 'Administration',
    issueDate: '2024-01-01',
    expiryDate: '2026-12-31',
    renewBefore: '2026-10-31',
    responsiblePerson: 'Mr. Rahul Verma',
    documentNumber: 'DOC-ME-2024-3301',
    documentUpload: '',
    remarks: 'Annual renewal — due December 2026.',
  },
  {
    id: 'hl-010', licenseId: 'LIC-H-0010',
    licenseName: 'Pharmacy License (Retail)',
    licenseCategory: 'Drug License',
    registrationNumber: 'PH/KA/2023/RET-7890',
    licensingAuthority: 'Drug Controller',
    hospitalDepartment: 'Pharmacy',
    issueDate: '2023-06-01',
    expiryDate: '2026-07-25',
    renewBefore: '2026-05-25',
    responsiblePerson: 'Ms. Anitha B',
    documentNumber: 'DOC-PH-2023-7890',
    documentUpload: '',
    remarks: 'Expiry approaching — renewal in progress.',
  },
];

const BLANK_LICENSE_FORM = {
  id: '',
  licenseId: '',
  licenseName: '',
  licenseCategory: 'Hospital Registration',
  registrationNumber: '',
  licensingAuthority: 'State Government',
  hospitalDepartment: 'Administration',
  issueDate: '',
  expiryDate: '',
  renewBefore: '',
  responsiblePerson: '',
  documentNumber: '',
  documentUpload: '',
  remarks: '',
};

/* ============================================================
   BUSINESS LOGIC HELPERS
   ============================================================ */

const calcLicenseStatus = (expiryDate) => {
  if (!expiryDate) return 'Valid';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  if (isNaN(expiry.getTime())) return 'Valid';
  if (expiry < today) return 'Expired';
  const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  if (diffDays <= 30) return 'Expiring Soon';
  return 'Valid';
};

const isRenewalDueThisMonth = (expiryDate) => {
  if (!expiryDate) return false;
  const today = new Date();
  const expiry = new Date(expiryDate);
  if (isNaN(expiry.getTime())) return false;
  return expiry.getFullYear() === today.getFullYear() && expiry.getMonth() === today.getMonth();
};

/* ============================================================
   STATUS BADGE STYLES
   ============================================================ */

const STATUS_BADGE_LICENSE = {
  Valid:          'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Expiring Soon':'bg-amber-50 text-amber-700 border-amber-200',
  Expired:        'bg-rose-50 text-rose-700 border-rose-200',
};

/* ============================================================
   PLACEHOLDER TAB (shared)
   ============================================================ */

const PlaceholderTab = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[320px] bg-white border border-slate-200 rounded-2xl shadow-sm p-10 text-center">
    <span className="text-3xl mb-4">🚧</span>
    <h2 className="text-base font-extrabold text-slate-800 mb-2">{title}</h2>
    <p className="text-xs text-slate-400 font-medium">
      This module will be implemented in the next phase.
    </p>
  </div>
);

/* ============================================================
   PHASE 1 — DASHBOARD TAB
   ============================================================ */

const DashboardTab = ({ hospital }) => (
  <div className="space-y-5">
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
        Licenses Registry Workspace
      </span>
      <h1 className="text-xl font-extrabold text-slate-900 mt-1">
        Licenses Registry — Dashboard
      </h1>
      <p className="text-xs text-slate-500 mt-2 max-w-2xl leading-relaxed">
        Centralised hospital license and compliance management system for tracking all statutory
        licenses, regulatory certificates, equipment permits, and renewal schedules in alignment
        with NABH and applicable statutory requirements.
      </p>
    </div>

    <div>
      <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">
        Key Performance Indicators
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {dashboardKpiCards.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{kpi.label}</span>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">
        Analytics &amp; Trends
      </h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">License Status Distribution</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={licenseStatusData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                  {licenseStatusData.map((entry, index) => (
                    <Cell key={`cell-ls-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '9px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Department-wise Licenses</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptLicenseData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Bar dataKey="licenses" fill={hospital?.themeColor || '#3b82f6'} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Monthly Renewals</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRenewalsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Bar dataKey="renewals" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Expiring Licenses Trend</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={expiringTrendData}>
                <defs>
                  <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="expiring" stroke="#ef4444" strokeWidth={2.5} fill="url(#expGrad)" dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Licensing Authority Distribution</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={authorityData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                  {authorityData.map((entry, index) => (
                    <Cell key={`cell-auth-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '9px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Compliance Trend</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complianceTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} domain={[78, 100]} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="compliance" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200">
        <h3 className="text-xs font-bold text-slate-800">Monthly License Summary</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['Department', 'Total Licenses', 'Valid', 'Expiring', 'Expired', 'Compliance %', 'Status'].map((h) => (
                <th key={h} className="px-4 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {monthlySummaryData.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-4 py-2 font-semibold text-slate-700">{row.department}</td>
                <td className="px-4 py-2 text-slate-600">{row.total}</td>
                <td className="px-4 py-2 text-emerald-600 font-bold">{row.valid}</td>
                <td className="px-4 py-2 text-amber-600 font-bold">{row.expiring}</td>
                <td className="px-4 py-2 text-rose-600 font-bold">{row.expired}</td>
                <td className="px-4 py-2 text-blue-600 font-bold">{row.compliance}%</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_SUMMARY[row.status] || STATUS_BADGE_SUMMARY.Good}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
        <span className="text-[9px] text-slate-400 font-medium">
          Showing {monthlySummaryData.length} departments
        </span>
      </div>
    </div>
  </div>
);

/* ============================================================
   PHASE 2 — HOSPITAL LICENSES TAB
   ============================================================ */

const HospitalLicensesTab = ({ hospital }) => {
  const [licenses, setLicenses] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_HOSPITAL_LICENSES);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      } catch (e) { /* ignore */ }
    }
    return SEED_HOSPITAL_LICENSES;
  });

  const [search, setSearch] = React.useState('');
  const [filterCategory, setFilterCategory] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterAuthority, setFilterAuthority] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_LICENSE_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_HOSPITAL_LICENSES, JSON.stringify(licenses));
  }, [licenses]);

  const getNextId = () => {
    const max = licenses.reduce((m, r) => {
      const n = parseInt((r.id || '').replace('hl-', ''), 10);
      return n > m ? n : m;
    }, 0);
    return `hl-${String(max + 1).padStart(3, '0')}`;
  };

  const getNextLicenseId = () => {
    const max = licenses.reduce((m, r) => {
      const n = parseInt((r.licenseId || '').replace('LIC-H-', ''), 10);
      return n > m ? n : m;
    }, 0);
    return `LIC-H-${String(max + 1).padStart(4, '0')}`;
  };

  const openAddModal = () => {
    setForm({ ...BLANK_LICENSE_FORM, id: getNextId(), licenseId: getNextLicenseId() });
    setEditingId(null);
    setErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (record) => {
    setForm({ ...record });
    setEditingId(record.id);
    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setErrors({});
  };

  const validate = (f) => {
    const e = {};
    if (!f.licenseName.trim()) e.licenseName = 'License name is required.';
    if (!f.licenseCategory.trim()) e.licenseCategory = 'Category is required.';
    if (!f.registrationNumber.trim()) e.registrationNumber = 'Registration number is required.';
    if (!f.licensingAuthority.trim()) e.licensingAuthority = 'Licensing authority is required.';
    if (!f.hospitalDepartment.trim()) e.hospitalDepartment = 'Department is required.';
    if (!f.issueDate) e.issueDate = 'Issue date is required.';
    if (!f.expiryDate) e.expiryDate = 'Expiry date is required.';
    if (!f.renewBefore) e.renewBefore = 'Renew before date is required.';
    if (!f.responsiblePerson.trim()) e.responsiblePerson = 'Responsible person is required.';
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (editingId) {
      setLicenses((prev) => prev.map((r) => r.id === editingId ? { ...form, id: editingId } : r));
    } else {
      setLicenses((prev) => [...prev, { ...form }]);
    }
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setLicenses((prev) => prev.filter((r) => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const withStatus = licenses.map((r) => ({ ...r, currentStatus: calcLicenseStatus(r.expiryDate) }));

  const filtered = withStatus.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      r.licenseName.toLowerCase().includes(q) ||
      r.registrationNumber.toLowerCase().includes(q) ||
      r.licensingAuthority.toLowerCase().includes(q) ||
      r.responsiblePerson.toLowerCase().includes(q);
    const matchCat = !filterCategory || r.licenseCategory === filterCategory;
    const matchStatus = !filterStatus || r.currentStatus === filterStatus;
    const matchDept = !filterDept || r.hospitalDepartment === filterDept;
    const matchAuth = !filterAuthority || r.licensingAuthority === filterAuthority;
    return matchSearch && matchCat && matchStatus && matchDept && matchAuth;
  });

  const total = withStatus.length;
  const valid = withStatus.filter((r) => r.currentStatus === 'Valid').length;
  const expiringSoon = withStatus.filter((r) => r.currentStatus === 'Expiring Soon').length;
  const expired = withStatus.filter((r) => r.currentStatus === 'Expired').length;
  const renewalDue = withStatus.filter((r) => isRenewalDueThisMonth(r.expiryDate)).length;
  const missingDocs = withStatus.filter((r) => !r.documentNumber.trim()).length;
  const compliancePct = total ? Math.round((valid / total) * 100) : 0;
  const activeAuthorities = [...new Set(withStatus.map((r) => r.licensingAuthority))].length;

  const kpis = [
    { label: 'Total Hospital Licenses', value: total,               color: 'text-blue-600' },
    { label: 'Valid Licenses',           value: valid,               color: 'text-emerald-600' },
    { label: 'Expiring Soon',            value: expiringSoon,        color: 'text-amber-600' },
    { label: 'Expired',                  value: expired,             color: 'text-rose-600' },
    { label: 'Renewals Due This Month',  value: renewalDue,          color: 'text-violet-600' },
    { label: 'Missing Documents',        value: missingDocs,         color: 'text-orange-600' },
    { label: 'Compliance %',             value: `${compliancePct}%`, color: 'text-teal-600' },
    { label: 'Active Authorities',       value: activeAuthorities,   color: 'text-sky-600' },
  ];

  const TH_COLS = ['License ID', 'License Name', 'Category', 'Reg. Number', 'Authority', 'Department', 'Expiry Date', 'Status', 'Responsible', 'Actions'];

  const FormField = ({ label, error, children }) => (
    <div className="flex flex-col gap-1">
      <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">{label}</label>
      {children}
      {error && <span className="text-[9px] text-rose-500 font-medium">{error}</span>}
    </div>
  );

  const inputCls = (err) =>
    `w-full px-3 py-2 border rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent ${err ? 'border-rose-400' : 'border-slate-200'}`;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Hospital Licenses Register</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Statutory hospital licenses, registrations &amp; certifications</p>
        </div>
        <button
          onClick={openAddModal}
          style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}
          className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add License
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, reg. number, authority, person..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Categories</option>
          {LICENSE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Statuses</option>
          {['Valid', 'Expiring Soon', 'Expired'].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Departments</option>
          {HOSPITAL_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filterAuthority} onChange={(e) => setFilterAuthority(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Authorities</option>
          {LICENSING_AUTHORITIES.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {TH_COLS.map((h) => (
                  <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={TH_COLS.length} className="px-4 py-10 text-center text-slate-400 text-[10px]">
                    No licenses found. Add your first license or adjust filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.licenseId}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700 max-w-[180px] truncate">{r.licenseName}</td>
                    <td className="px-3 py-3 text-slate-600">{r.licenseCategory}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.registrationNumber}</td>
                    <td className="px-3 py-3 text-slate-600">{r.licensingAuthority}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.hospitalDepartment}</td>
                    <td className="px-3 py-3 text-slate-600">{r.expiryDate}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_LICENSE[r.currentStatus] || STATUS_BADGE_LICENSE.Valid}`}>
                        {r.currentStatus}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{r.responsiblePerson}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 rounded-lg hover:bg-sky-50 text-sky-600 transition-colors" title="Edit">
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 transition-colors" title="Delete">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {withStatus.length} licenses
          </span>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">
                  {editingId ? 'Edit License' : 'Add New License'}
                </h2>
                <p className="text-[9px] text-slate-400 mt-0.5">
                  {editingId ? `Editing: ${form.licenseId}` : `New License ID: ${form.licenseId}`}
                </p>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="License ID" error={null}>
                  <input value={form.licenseId} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="License Name *" error={errors.licenseName}>
                  <input
                    value={form.licenseName}
                    onChange={(e) => setForm((f) => ({ ...f, licenseName: e.target.value }))}
                    placeholder="e.g., Nursing Home Registration"
                    className={inputCls(errors.licenseName)}
                  />
                </FormField>
                <FormField label="License Category *" error={errors.licenseCategory}>
                  <select value={form.licenseCategory} onChange={(e) => setForm((f) => ({ ...f, licenseCategory: e.target.value }))} className={inputCls(errors.licenseCategory)}>
                    {LICENSE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Registration / License Number *" error={errors.registrationNumber}>
                  <input
                    value={form.registrationNumber}
                    onChange={(e) => setForm((f) => ({ ...f, registrationNumber: e.target.value }))}
                    placeholder="e.g., NH/KA/2023/00234"
                    className={inputCls(errors.registrationNumber)}
                  />
                </FormField>
                <FormField label="Licensing Authority *" error={errors.licensingAuthority}>
                  <select value={form.licensingAuthority} onChange={(e) => setForm((f) => ({ ...f, licensingAuthority: e.target.value }))} className={inputCls(errors.licensingAuthority)}>
                    {LICENSING_AUTHORITIES.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </FormField>
                <FormField label="Hospital Department *" error={errors.hospitalDepartment}>
                  <select value={form.hospitalDepartment} onChange={(e) => setForm((f) => ({ ...f, hospitalDepartment: e.target.value }))} className={inputCls(errors.hospitalDepartment)}>
                    {HOSPITAL_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </FormField>
                <FormField label="Issue Date *" error={errors.issueDate}>
                  <input type="date" value={form.issueDate} onChange={(e) => setForm((f) => ({ ...f, issueDate: e.target.value }))} className={inputCls(errors.issueDate)} />
                </FormField>
                <FormField label="Expiry Date *" error={errors.expiryDate}>
                  <input type="date" value={form.expiryDate} onChange={(e) => setForm((f) => ({ ...f, expiryDate: e.target.value }))} className={inputCls(errors.expiryDate)} />
                </FormField>
                <FormField label="Renew Before *" error={errors.renewBefore}>
                  <input type="date" value={form.renewBefore} onChange={(e) => setForm((f) => ({ ...f, renewBefore: e.target.value }))} className={inputCls(errors.renewBefore)} />
                </FormField>
                <FormField label="Current Status">
                  <div className={`flex items-center px-3 py-2 border border-slate-200 rounded-xl text-[10px] font-bold ${STATUS_BADGE_LICENSE[calcLicenseStatus(form.expiryDate)] || STATUS_BADGE_LICENSE.Valid}`}>
                    {calcLicenseStatus(form.expiryDate)}
                    <span className="ml-1 text-[8px] font-normal text-slate-400">(auto-calculated)</span>
                  </div>
                </FormField>
                <FormField label="Responsible Person *" error={errors.responsiblePerson}>
                  <input
                    value={form.responsiblePerson}
                    onChange={(e) => setForm((f) => ({ ...f, responsiblePerson: e.target.value }))}
                    placeholder="e.g., Mr. Rahul Verma"
                    className={inputCls(errors.responsiblePerson)}
                  />
                </FormField>
                <FormField label="Document Number" error={null}>
                  <input
                    value={form.documentNumber}
                    onChange={(e) => setForm((f) => ({ ...f, documentNumber: e.target.value }))}
                    placeholder="e.g., DOC-NH-2023-001"
                    className={inputCls(false)}
                  />
                </FormField>
              </div>
              <FormField label="Document Upload (Placeholder)" error={null}>
                <div className="flex items-center justify-center w-full h-16 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 text-[9px] text-slate-400 font-medium cursor-not-allowed">
                  📎 Document upload will be enabled in a later phase
                </div>
              </FormField>
              <FormField label="Remarks" error={null}>
                <textarea
                  value={form.remarks}
                  onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))}
                  rows={2}
                  placeholder="Any additional notes..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
                />
              </FormField>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}
                  className="px-4 py-2 rounded-xl text-[10px] font-bold text-white hover:brightness-95 transition-all shadow-sm"
                >
                  {editingId ? 'Save Changes' : 'Add License'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-sm font-extrabold text-slate-900 mb-2">Confirm Delete</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to delete license{' '}
              <span className="font-bold text-rose-600">
                {withStatus.find((r) => r.id === deleteConfirmId)?.licenseId || deleteConfirmId}
              </span>?
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */


/* ============================================================
   PHASE 3 — REGULATORY & ENVIRONMENTAL COMPLIANCE CONSTANTS & SEED
   ============================================================ */

const LS_KEY_BIOMEDICAL = 'licenses_biomedical_compliance';
const LS_KEY_POLLUTION = 'licenses_pollution_control';
const LS_KEY_FIRE = 'licenses_fire_safety';

const POLLUTION_COMPLIANCE_TYPES = [
  'Air Pollution',
  'Water Pollution',
  'Environmental Clearance',
  'PCB Authorization',
];

const SEED_BIOMEDICAL = Array.from({ length: 10 }, (_, i) => ({
  id: `bio-${String(i + 1).padStart(3, '0')}`,
  authorizationNumber: `BMW/KA/2023/${1000 + i}`,
  hospitalDepartment: HOSPITAL_DEPARTMENTS[i % HOSPITAL_DEPARTMENTS.length],
  pollutionControlBoard: 'State PCB',
  vendorName: `BioSafe Solutions Pvt Ltd`,
  vendorAgreementNumber: `V-AGR-${2020 + i}-00${i+1}`,
  authorizationDate: `2023-01-${String((i % 28) + 1).padStart(2, '0')}`,
  expiryDate: `2025-12-${String((i % 28) + 1).padStart(2, '0')}`,
  renewBefore: `2025-10-${String((i % 28) + 1).padStart(2, '0')}`,
  responsibleOfficer: `Officer ${String.fromCharCode(65 + i)}`,
  agreementDocument: '',
  remarks: i === 0 ? 'Renewal due soon' : '',
}));

const SEED_POLLUTION = Array.from({ length: 10 }, (_, i) => ({
  id: `pol-${String(i + 1).padStart(3, '0')}`,
  complianceType: POLLUTION_COMPLIANCE_TYPES[i % POLLUTION_COMPLIANCE_TYPES.length],
  authority: LICENSING_AUTHORITIES[i % LICENSING_AUTHORITIES.length],
  certificateNumber: `PCB/CERT/${2021 + (i % 3)}/${5000 + i}`,
  issueDate: `2021-03-${String((i % 28) + 1).padStart(2, '0')}`,
  expiryDate: `2026-03-${String((i % 28) + 1).padStart(2, '0')}`,
  renewBefore: `2026-01-${String((i % 28) + 1).padStart(2, '0')}`,
  responsibleOfficer: `Officer ${String.fromCharCode(75 + i)}`,
  documentUpload: '',
  remarks: '',
}));

const SEED_FIRE = Array.from({ length: 10 }, (_, i) => ({
  id: `fir-${String(i + 1).padStart(3, '0')}`,
  fireNocNumber: `FIRE/NOC/${2022 + (i % 2)}/${8000 + i}`,
  issuingAuthority: 'State Fire Department',
  issueDate: `2022-05-${String((i % 28) + 1).padStart(2, '0')}`,
  expiryDate: `2024-05-${String((i % 28) + 1).padStart(2, '0')}`,
  renewBefore: `2024-03-${String((i % 28) + 1).padStart(2, '0')}`,
  inspectionDate: `2023-11-${String((i % 28) + 1).padStart(2, '0')}`,
  responsibleOfficer: `Safety Officer ${i + 1}`,
  certificateUpload: '',
  remarks: i === 2 ? 'Requires updated fire extinguishers' : '',
}));

const BLANK_BIO_FORM = {
  id: '', authorizationNumber: '', hospitalDepartment: HOSPITAL_DEPARTMENTS[0],
  pollutionControlBoard: 'State PCB', vendorName: '', vendorAgreementNumber: '',
  authorizationDate: '', expiryDate: '', renewBefore: '', responsibleOfficer: '',
  agreementDocument: '', remarks: ''
};

const BLANK_POL_FORM = {
  id: '', complianceType: POLLUTION_COMPLIANCE_TYPES[0], authority: LICENSING_AUTHORITIES[0],
  certificateNumber: '', issueDate: '', expiryDate: '', renewBefore: '',
  responsibleOfficer: '', documentUpload: '', remarks: ''
};

const BLANK_FIR_FORM = {
  id: '', fireNocNumber: '', issuingAuthority: 'State Fire Department',
  issueDate: '', expiryDate: '', renewBefore: '', inspectionDate: '',
  responsibleOfficer: '', certificateUpload: '', remarks: ''
};

/* ============================================================
   PHASE 3 — REGULATORY COMPONENTS
   ============================================================ */

const RegEnvTab = ({ hospital }) => {
  const [bioLicenses, setBioLicenses] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_BIOMEDICAL);
    return saved ? JSON.parse(saved) : SEED_BIOMEDICAL;
  });
  const [polLicenses, setPolLicenses] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_POLLUTION);
    return saved ? JSON.parse(saved) : SEED_POLLUTION;
  });
  const [firLicenses, setFirLicenses] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_FIRE);
    return saved ? JSON.parse(saved) : SEED_FIRE;
  });

  React.useEffect(() => { localStorage.setItem(LS_KEY_BIOMEDICAL, JSON.stringify(bioLicenses)); }, [bioLicenses]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_POLLUTION, JSON.stringify(polLicenses)); }, [polLicenses]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_FIRE, JSON.stringify(firLicenses)); }, [firLicenses]);

  const allBio = bioLicenses.map(r => ({ ...r, currentStatus: calcLicenseStatus(r.expiryDate) }));
  const allPol = polLicenses.map(r => ({ ...r, currentStatus: calcLicenseStatus(r.expiryDate) }));
  const allFir = firLicenses.map(r => ({ ...r, currentStatus: calcLicenseStatus(r.expiryDate) }));

  const allRecords = [...allBio, ...allPol, ...allFir];
  const totalRecords = allRecords.length;
  const bioValid = allBio.filter(r => r.currentStatus === 'Valid').length;
  const polValid = allPol.filter(r => r.currentStatus === 'Valid').length;
  const firValid = allFir.filter(r => r.currentStatus === 'Valid').length;
  const expiringSoon = allRecords.filter(r => r.currentStatus === 'Expiring Soon').length;
  const expired = allRecords.filter(r => r.currentStatus === 'Expired').length;
  const totalValid = bioValid + polValid + firValid;
  const compliancePct = totalRecords ? Math.round((totalValid / totalRecords) * 100) : 0;
  const renewalsDue = allRecords.filter(r => isRenewalDueThisMonth(r.expiryDate)).length;

  const kpis = [
    { label: 'Total Compliance Records', value: totalRecords, color: 'text-blue-600' },
    { label: 'Biomedical Waste Valid',   value: bioValid,     color: 'text-emerald-600' },
    { label: 'Pollution Control Valid',  value: polValid,     color: 'text-emerald-600' },
    { label: 'Fire NOC Valid',           value: firValid,     color: 'text-emerald-600' },
    { label: 'Expiring Soon',            value: expiringSoon, color: 'text-amber-600' },
    { label: 'Expired',                  value: expired,      color: 'text-rose-600' },
    { label: 'Compliance %',             value: `${compliancePct}%`, color: 'text-teal-600' },
    { label: 'Renewals Due',             value: renewalsDue,  color: 'text-violet-600' },
  ];

  const [activeSubTab, setActiveSubTab] = React.useState('bio');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Regulatory &amp; Environmental Compliance</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Biomedical waste, pollution control, and fire safety</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {[
          { id: 'bio', label: 'Biomedical Waste' },
          { id: 'pol', label: 'Pollution Control' },
          { id: 'fir', label: 'Fire & Safety' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveSubTab(t.id)}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeSubTab === t.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeSubTab === 'bio' && <BioMedicalWasteModule hospital={hospital} data={allBio} setData={setBioLicenses} />}
      {activeSubTab === 'pol' && <PollutionControlModule hospital={hospital} data={allPol} setData={setPolLicenses} />}
      {activeSubTab === 'fir' && <FireSafetyModule hospital={hospital} data={allFir} setData={setFirLicenses} />}
    </div>
  );
};

/* ================== CRUD MODULE: BIOMEDICAL WASTE ================== */
const BioMedicalWasteModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_BIO_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('bio-', ''), 10); return n > m ? n : m; }, 0);
    return `bio-${String(max + 1).padStart(3, '0')}`;
  };

  const openAddModal = () => { setForm({ ...BLANK_BIO_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.authorizationNumber.trim()) e.authorizationNumber = 'Req';
    if (!f.hospitalDepartment.trim()) e.hospitalDepartment = 'Req';
    if (!f.pollutionControlBoard.trim()) e.pollutionControlBoard = 'Req';
    if (!f.vendorName.trim()) e.vendorName = 'Req';
    if (!f.vendorAgreementNumber.trim()) e.vendorAgreementNumber = 'Req';
    if (!f.authorizationDate) e.authorizationDate = 'Req';
    if (!f.expiryDate) e.expiryDate = 'Req';
    if (!f.renewBefore) e.renewBefore = 'Req';
    if (!f.responsibleOfficer.trim()) e.responsibleOfficer = 'Req';
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (editingId) setData(prev => prev.map(r => r.id === editingId ? { ...form, id: editingId } : r));
    else setData(prev => [...prev, { ...form }]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData(prev => prev.filter(r => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = r.authorizationNumber.toLowerCase().includes(q) || r.vendorName.toLowerCase().includes(q) || r.responsibleOfficer.toLowerCase().includes(q);
    const matchDept = !filterDept || r.hospitalDepartment === filterDept;
    const matchStatus = !filterStatus || r.currentStatus === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const TH_COLS = ['Auth Number', 'Department', 'Vendor', 'Auth Date', 'Expiry', 'Status', 'Officer', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search auth #, vendor, officer..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Departments</option>
          {HOSPITAL_DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Statuses</option>
          {['Valid', 'Expiring Soon', 'Expired'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={openAddModal} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}>
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>{TH_COLS.map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={TH_COLS.length} className="px-4 py-10 text-center text-slate-400">No records found.</td></tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-3 py-3 font-mono text-slate-700">{r.authorizationNumber}</td>
                    <td className="px-3 py-3 text-slate-600">{r.hospitalDepartment}</td>
                    <td className="px-3 py-3 text-slate-600">{r.vendorName}</td>
                    <td className="px-3 py-3 text-slate-600">{r.authorizationDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.expiryDate}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_LICENSE[r.currentStatus] || STATUS_BADGE_LICENSE.Valid}`}>{r.currentStatus}</span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{r.responsibleOfficer}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 text-sky-600 hover:bg-sky-50 rounded"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5">
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit BMW Record' : 'Add BMW Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <input value={form.authorizationNumber} onChange={e => setForm({...form, authorizationNumber: e.target.value})} placeholder="Auth Number *" className="border p-2 rounded text-[10px]" />
              <select value={form.hospitalDepartment} onChange={e => setForm({...form, hospitalDepartment: e.target.value})} className="border p-2 rounded text-[10px]">
                {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.pollutionControlBoard} onChange={e => setForm({...form, pollutionControlBoard: e.target.value})} placeholder="PCB *" className="border p-2 rounded text-[10px]" />
              <input value={form.vendorName} onChange={e => setForm({...form, vendorName: e.target.value})} placeholder="Vendor Name *" className="border p-2 rounded text-[10px]" />
              <input value={form.vendorAgreementNumber} onChange={e => setForm({...form, vendorAgreementNumber: e.target.value})} placeholder="Agreement Number *" className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.authorizationDate} onChange={e => setForm({...form, authorizationDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.expiryDate} onChange={e => setForm({...form, expiryDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.renewBefore} onChange={e => setForm({...form, renewBefore: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input value={form.responsibleOfficer} onChange={e => setForm({...form, responsibleOfficer: e.target.value})} placeholder="Responsible Officer *" className="border p-2 rounded text-[10px]" />
              <input value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})} placeholder="Remarks" className="border p-2 rounded text-[10px] col-span-2" />
              <div className="col-span-2 flex justify-end gap-2 mt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-[10px]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white p-5 rounded-2xl w-full max-w-sm">
            <h3 className="font-bold mb-2">Confirm Delete</h3>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-rose-500 text-white rounded text-[10px]">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================== CRUD MODULE: POLLUTION CONTROL ================== */
const PollutionControlModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterType, setFilterType] = React.useState('');
  const [filterAuth, setFilterAuth] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_POL_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('pol-', ''), 10); return n > m ? n : m; }, 0);
    return `pol-${String(max + 1).padStart(3, '0')}`;
  };

  const openAddModal = () => { setForm({ ...BLANK_POL_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.complianceType.trim()) e.complianceType = 'Req';
    if (!f.authority.trim()) e.authority = 'Req';
    if (!f.certificateNumber.trim()) e.certificateNumber = 'Req';
    if (!f.issueDate) e.issueDate = 'Req';
    if (!f.expiryDate) e.expiryDate = 'Req';
    if (!f.renewBefore) e.renewBefore = 'Req';
    if (!f.responsibleOfficer.trim()) e.responsibleOfficer = 'Req';
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (editingId) setData(prev => prev.map(r => r.id === editingId ? { ...form, id: editingId } : r));
    else setData(prev => [...prev, { ...form }]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData(prev => prev.filter(r => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = r.certificateNumber.toLowerCase().includes(q) || r.responsibleOfficer.toLowerCase().includes(q);
    const matchType = !filterType || r.complianceType === filterType;
    const matchAuth = !filterAuth || r.authority === filterAuth;
    const matchStatus = !filterStatus || r.currentStatus === filterStatus;
    return matchSearch && matchType && matchAuth && matchStatus;
  });

  const TH_COLS = ['Cert Number', 'Type', 'Authority', 'Issue Date', 'Expiry', 'Status', 'Officer', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search cert #, officer..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Types</option>
          {POLLUTION_COMPLIANCE_TYPES.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterAuth} onChange={(e) => setFilterAuth(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Authorities</option>
          {LICENSING_AUTHORITIES.map(a => <option key={a}>{a}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Statuses</option>
          {['Valid', 'Expiring Soon', 'Expired'].map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={openAddModal} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}>
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>{TH_COLS.map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={TH_COLS.length} className="px-4 py-10 text-center text-slate-400">No records found.</td></tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-3 py-3 font-mono text-slate-700">{r.certificateNumber}</td>
                    <td className="px-3 py-3 text-slate-600">{r.complianceType}</td>
                    <td className="px-3 py-3 text-slate-600">{r.authority}</td>
                    <td className="px-3 py-3 text-slate-600">{r.issueDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.expiryDate}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_LICENSE[r.currentStatus] || STATUS_BADGE_LICENSE.Valid}`}>{r.currentStatus}</span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{r.responsibleOfficer}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 text-sky-600 hover:bg-sky-50 rounded"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5">
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit Pollution Record' : 'Add Pollution Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <input value={form.certificateNumber} onChange={e => setForm({...form, certificateNumber: e.target.value})} placeholder="Cert Number *" className="border p-2 rounded text-[10px]" />
              <select value={form.complianceType} onChange={e => setForm({...form, complianceType: e.target.value})} className="border p-2 rounded text-[10px]">
                {POLLUTION_COMPLIANCE_TYPES.map(d => <option key={d}>{d}</option>)}
              </select>
              <select value={form.authority} onChange={e => setForm({...form, authority: e.target.value})} className="border p-2 rounded text-[10px]">
                {LICENSING_AUTHORITIES.map(d => <option key={d}>{d}</option>)}
              </select>
              <input type="date" value={form.issueDate} onChange={e => setForm({...form, issueDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.expiryDate} onChange={e => setForm({...form, expiryDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.renewBefore} onChange={e => setForm({...form, renewBefore: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input value={form.responsibleOfficer} onChange={e => setForm({...form, responsibleOfficer: e.target.value})} placeholder="Responsible Officer *" className="border p-2 rounded text-[10px]" />
              <input value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})} placeholder="Remarks" className="border p-2 rounded text-[10px] col-span-2" />
              <div className="col-span-2 flex justify-end gap-2 mt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-[10px]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white p-5 rounded-2xl w-full max-w-sm">
            <h3 className="font-bold mb-2">Confirm Delete</h3>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-rose-500 text-white rounded text-[10px]">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================== CRUD MODULE: FIRE & SAFETY ================== */
const FireSafetyModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_FIR_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('fir-', ''), 10); return n > m ? n : m; }, 0);
    return `fir-${String(max + 1).padStart(3, '0')}`;
  };

  const openAddModal = () => { setForm({ ...BLANK_FIR_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.fireNocNumber.trim()) e.fireNocNumber = 'Req';
    if (!f.issuingAuthority.trim()) e.issuingAuthority = 'Req';
    if (!f.issueDate) e.issueDate = 'Req';
    if (!f.expiryDate) e.expiryDate = 'Req';
    if (!f.renewBefore) e.renewBefore = 'Req';
    if (!f.inspectionDate) e.inspectionDate = 'Req';
    if (!f.responsibleOfficer.trim()) e.responsibleOfficer = 'Req';
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (editingId) setData(prev => prev.map(r => r.id === editingId ? { ...form, id: editingId } : r));
    else setData(prev => [...prev, { ...form }]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData(prev => prev.filter(r => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = r.fireNocNumber.toLowerCase().includes(q) || r.issuingAuthority.toLowerCase().includes(q) || r.responsibleOfficer.toLowerCase().includes(q);
    const matchStatus = !filterStatus || r.currentStatus === filterStatus;
    return matchSearch && matchStatus;
  });

  const TH_COLS = ['NOC Number', 'Authority', 'Issue Date', 'Expiry', 'Inspection', 'Status', 'Officer', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search NOC #, authority, officer..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Statuses</option>
          {['Valid', 'Expiring Soon', 'Expired'].map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={openAddModal} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}>
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>{TH_COLS.map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={TH_COLS.length} className="px-4 py-10 text-center text-slate-400">No records found.</td></tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-3 py-3 font-mono text-slate-700">{r.fireNocNumber}</td>
                    <td className="px-3 py-3 text-slate-600">{r.issuingAuthority}</td>
                    <td className="px-3 py-3 text-slate-600">{r.issueDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.expiryDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.inspectionDate}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_LICENSE[r.currentStatus] || STATUS_BADGE_LICENSE.Valid}`}>{r.currentStatus}</span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{r.responsibleOfficer}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 text-sky-600 hover:bg-sky-50 rounded"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5">
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit Fire Safety Record' : 'Add Fire Safety Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <input value={form.fireNocNumber} onChange={e => setForm({...form, fireNocNumber: e.target.value})} placeholder="NOC Number *" className="border p-2 rounded text-[10px]" />
              <input value={form.issuingAuthority} onChange={e => setForm({...form, issuingAuthority: e.target.value})} placeholder="Authority *" className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.issueDate} onChange={e => setForm({...form, issueDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.expiryDate} onChange={e => setForm({...form, expiryDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.renewBefore} onChange={e => setForm({...form, renewBefore: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.inspectionDate} onChange={e => setForm({...form, inspectionDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input value={form.responsibleOfficer} onChange={e => setForm({...form, responsibleOfficer: e.target.value})} placeholder="Responsible Officer *" className="border p-2 rounded text-[10px]" />
              <input value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})} placeholder="Remarks" className="border p-2 rounded text-[10px] col-span-2" />
              <div className="col-span-2 flex justify-end gap-2 mt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-[10px]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white p-5 rounded-2xl w-full max-w-sm">
            <h3 className="font-bold mb-2">Confirm Delete</h3>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-rose-500 text-white rounded text-[10px]">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


/* ============================================================
   PHASE 4 — EQUIPMENT & FACILITY LICENSES CONSTANTS & SEED
   ============================================================ */

const LS_KEY_AERB = 'licenses_aerb';
const LS_KEY_BUILDING_FACILITY = 'licenses_building_facility';
const LS_KEY_UTILITY_VEHICLE = 'licenses_utility_vehicle';

const EQUIPMENT_TYPES = [
  'CT Scanner',
  'MRI',
  'X-Ray',
  'C-Arm',
  'Cath Lab',
  'Mammography',
  'Fluoroscopy'
];

const AERB_APPROVAL_TYPES = [
  'Type Approval',
  'Layout Approval',
  'Equipment Registration'
];

const FACILITY_TYPES = [
  'Building',
  'Lift',
  'Boiler',
  'DG Set',
  'Diesel Storage',
  'Medical Gas System'
];

const VEHICLE_UTILITY_TYPES = [
  'Ambulance',
  'Commercial Vehicle Permit',
  'Driver License',
  'Pollution Certificate',
  'Wireless Certificate'
];

const SEED_AERB = Array.from({ length: 10 }, (_, i) => ({
  id: `aerb-${String(i + 1).padStart(3, '0')}`,
  equipmentName: `${EQUIPMENT_TYPES[i % EQUIPMENT_TYPES.length]} Machine ${i + 1}`,
  equipmentType: EQUIPMENT_TYPES[i % EQUIPMENT_TYPES.length],
  department: HOSPITAL_DEPARTMENTS[i % HOSPITAL_DEPARTMENTS.length],
  aerbApprovalType: AERB_APPROVAL_TYPES[i % AERB_APPROVAL_TYPES.length],
  approvalNumber: `AERB/${2020 + (i % 3)}/${1000 + i}`,
  issueDate: `2021-02-${String((i % 28) + 1).padStart(2, '0')}`,
  expiryDate: `2026-02-${String((i % 28) + 1).padStart(2, '0')}`,
  renewBefore: `2025-12-${String((i % 28) + 1).padStart(2, '0')}`,
  responsibleOfficer: `Rad Officer ${String.fromCharCode(65 + i)}`,
  documentUpload: '',
  remarks: i === 1 ? 'Needs QA test' : '',
}));

const SEED_BUILDING = Array.from({ length: 10 }, (_, i) => ({
  id: `bldg-${String(i + 1).padStart(3, '0')}`,
  facility: FACILITY_TYPES[i % FACILITY_TYPES.length],
  licenseType: `Safety Certificate`,
  licenseNumber: `BLDG/SAF/${2022 + (i % 2)}/${5000 + i}`,
  authority: 'Municipal Corp',
  issueDate: `2022-04-${String((i % 28) + 1).padStart(2, '0')}`,
  expiryDate: `2027-04-${String((i % 28) + 1).padStart(2, '0')}`,
  renewBefore: `2027-02-${String((i % 28) + 1).padStart(2, '0')}`,
  responsibleOfficer: `Facility Mgr ${String.fromCharCode(75 + i)}`,
  documentUpload: '',
  remarks: '',
}));

const SEED_UTILITY = Array.from({ length: 10 }, (_, i) => ({
  id: `util-${String(i + 1).padStart(3, '0')}`,
  vehicleUtility: VEHICLE_UTILITY_TYPES[i % VEHICLE_UTILITY_TYPES.length],
  registrationNumber: `KA 01 ${String.fromCharCode(65 + i)} ${1000 + i}`,
  licenseType: 'Commercial Permit',
  authority: 'RTO',
  issueDate: `2023-01-${String((i % 28) + 1).padStart(2, '0')}`,
  expiryDate: `2024-12-${String((i % 28) + 1).padStart(2, '0')}`,
  renewBefore: `2024-11-${String((i % 28) + 1).padStart(2, '0')}`,
  responsibleOfficer: `Fleet Admin ${i + 1}`,
  documentUpload: '',
  remarks: i === 3 ? 'Valid across state' : '',
}));

const BLANK_AERB_FORM = {
  id: '', equipmentName: '', equipmentType: EQUIPMENT_TYPES[0], department: HOSPITAL_DEPARTMENTS[0],
  aerbApprovalType: AERB_APPROVAL_TYPES[0], approvalNumber: '', issueDate: '', expiryDate: '',
  renewBefore: '', responsibleOfficer: '', documentUpload: '', remarks: ''
};

const BLANK_BUILDING_FORM = {
  id: '', facility: FACILITY_TYPES[0], licenseType: '', licenseNumber: '', authority: '',
  issueDate: '', expiryDate: '', renewBefore: '', responsibleOfficer: '', documentUpload: '', remarks: ''
};

const BLANK_UTILITY_FORM = {
  id: '', vehicleUtility: VEHICLE_UTILITY_TYPES[0], registrationNumber: '', licenseType: '', authority: '',
  issueDate: '', expiryDate: '', renewBefore: '', responsibleOfficer: '', documentUpload: '', remarks: ''
};

/* ============================================================
   PHASE 4 — EQUIPMENT & FACILITY COMPONENTS
   ============================================================ */

const EquipFacTab = ({ hospital }) => {
  const [aerbLicenses, setAerbLicenses] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_AERB);
    return saved ? JSON.parse(saved) : SEED_AERB;
  });
  const [bldgLicenses, setBldgLicenses] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_BUILDING_FACILITY);
    return saved ? JSON.parse(saved) : SEED_BUILDING;
  });
  const [utilLicenses, setUtilLicenses] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_UTILITY_VEHICLE);
    return saved ? JSON.parse(saved) : SEED_UTILITY;
  });

  React.useEffect(() => { localStorage.setItem(LS_KEY_AERB, JSON.stringify(aerbLicenses)); }, [aerbLicenses]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_BUILDING_FACILITY, JSON.stringify(bldgLicenses)); }, [bldgLicenses]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_UTILITY_VEHICLE, JSON.stringify(utilLicenses)); }, [utilLicenses]);

  const allAerb = aerbLicenses.map(r => ({ ...r, currentStatus: calcLicenseStatus(r.expiryDate) }));
  const allBldg = bldgLicenses.map(r => ({ ...r, currentStatus: calcLicenseStatus(r.expiryDate) }));
  const allUtil = utilLicenses.map(r => ({ ...r, currentStatus: calcLicenseStatus(r.expiryDate) }));

  const allRecords = [...allAerb, ...allBldg, ...allUtil];
  const totalRecords = allRecords.length;
  
  const aerbValid = allAerb.filter(r => r.currentStatus === 'Valid').length;
  const bldgValid = allBldg.filter(r => r.currentStatus === 'Valid').length;
  const utilValid = allUtil.filter(r => r.currentStatus === 'Valid').length;
  
  const expiringSoon = allRecords.filter(r => r.currentStatus === 'Expiring Soon').length;
  const expired = allRecords.filter(r => r.currentStatus === 'Expired').length;
  const totalValid = aerbValid + bldgValid + utilValid;
  const compliancePct = totalRecords ? Math.round((totalValid / totalRecords) * 100) : 0;
  const renewalsDue = allRecords.filter(r => isRenewalDueThisMonth(r.expiryDate)).length;

  const kpis = [
    { label: 'Total Equipment Licenses', value: totalRecords, color: 'text-blue-600' },
    { label: 'Active AERB Licenses',     value: aerbValid,    color: 'text-emerald-600' },
    { label: 'Building Licenses',        value: bldgValid,    color: 'text-emerald-600' },
    { label: 'Utility Licenses',         value: utilValid,    color: 'text-emerald-600' },
    { label: 'Expiring Soon',            value: expiringSoon, color: 'text-amber-600' },
    { label: 'Expired',                  value: expired,      color: 'text-rose-600' },
    { label: 'Compliance %',             value: `${compliancePct}%`, color: 'text-teal-600' },
    { label: 'Renewals Due',             value: renewalsDue,  color: 'text-violet-600' },
  ];

  const [activeSubTab, setActiveSubTab] = React.useState('aerb');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Equipment &amp; Facility Licenses</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">AERB, Building, and Utility vehicle licenses</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {[
          { id: 'aerb', label: 'AERB Licenses' },
          { id: 'bldg', label: 'Building & Facility' },
          { id: 'util', label: 'Utility & Vehicle' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveSubTab(t.id)}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeSubTab === t.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeSubTab === 'aerb' && <AerbLicensesModule hospital={hospital} data={allAerb} setData={setAerbLicenses} />}
      {activeSubTab === 'bldg' && <BuildingLicensesModule hospital={hospital} data={allBldg} setData={setBldgLicenses} />}
      {activeSubTab === 'util' && <UtilityLicensesModule hospital={hospital} data={allUtil} setData={setUtilLicenses} />}
    </div>
  );
};

/* ================== CRUD MODULE: AERB LICENSES ================== */
const AerbLicensesModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterEquip, setFilterEquip] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_AERB_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('aerb-', ''), 10); return n > m ? n : m; }, 0);
    return `aerb-${String(max + 1).padStart(3, '0')}`;
  };

  const openAddModal = () => { setForm({ ...BLANK_AERB_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.equipmentName.trim()) e.equipmentName = 'Req';
    if (!f.approvalNumber.trim()) e.approvalNumber = 'Req';
    if (!f.issueDate) e.issueDate = 'Req';
    if (!f.expiryDate) e.expiryDate = 'Req';
    if (!f.renewBefore) e.renewBefore = 'Req';
    if (!f.responsibleOfficer.trim()) e.responsibleOfficer = 'Req';
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (editingId) setData(prev => prev.map(r => r.id === editingId ? { ...form, id: editingId } : r));
    else setData(prev => [...prev, { ...form }]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData(prev => prev.filter(r => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = r.equipmentName.toLowerCase().includes(q) || r.approvalNumber.toLowerCase().includes(q) || r.responsibleOfficer.toLowerCase().includes(q);
    const matchEquip = !filterEquip || r.equipmentType === filterEquip;
    const matchDept = !filterDept || r.department === filterDept;
    const matchStatus = !filterStatus || r.currentStatus === filterStatus;
    return matchSearch && matchEquip && matchDept && matchStatus;
  });

  const TH_COLS = ['Approval Number', 'Equipment', 'Type', 'Department', 'Expiry', 'Status', 'Officer', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search equip, approval, officer..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterEquip} onChange={(e) => setFilterEquip(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Equipment</option>
          {EQUIPMENT_TYPES.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Departments</option>
          {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Statuses</option>
          {['Valid', 'Expiring Soon', 'Expired'].map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={openAddModal} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}>
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>{TH_COLS.map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={TH_COLS.length} className="px-4 py-10 text-center text-slate-400">No records found.</td></tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-3 py-3 font-mono text-slate-700">{r.approvalNumber}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.equipmentName}</td>
                    <td className="px-3 py-3 text-slate-600">{r.equipmentType}</td>
                    <td className="px-3 py-3 text-slate-600">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600">{r.expiryDate}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_LICENSE[r.currentStatus] || STATUS_BADGE_LICENSE.Valid}`}>{r.currentStatus}</span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{r.responsibleOfficer}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 text-sky-600 hover:bg-sky-50 rounded"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5">
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit AERB Record' : 'Add AERB Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <input value={form.equipmentName} onChange={e => setForm({...form, equipmentName: e.target.value})} placeholder="Equipment Name *" className="border p-2 rounded text-[10px]" />
              <select value={form.equipmentType} onChange={e => setForm({...form, equipmentType: e.target.value})} className="border p-2 rounded text-[10px]">
                {EQUIPMENT_TYPES.map(d => <option key={d}>{d}</option>)}
              </select>
              <select value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="border p-2 rounded text-[10px]">
                {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
              <select value={form.aerbApprovalType} onChange={e => setForm({...form, aerbApprovalType: e.target.value})} className="border p-2 rounded text-[10px]">
                {AERB_APPROVAL_TYPES.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.approvalNumber} onChange={e => setForm({...form, approvalNumber: e.target.value})} placeholder="Approval Number *" className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.issueDate} onChange={e => setForm({...form, issueDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.expiryDate} onChange={e => setForm({...form, expiryDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.renewBefore} onChange={e => setForm({...form, renewBefore: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input value={form.responsibleOfficer} onChange={e => setForm({...form, responsibleOfficer: e.target.value})} placeholder="Responsible Officer *" className="border p-2 rounded text-[10px]" />
              <input value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})} placeholder="Remarks" className="border p-2 rounded text-[10px] col-span-2" />
              <div className="col-span-2 flex justify-end gap-2 mt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-[10px]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white p-5 rounded-2xl w-full max-w-sm">
            <h3 className="font-bold mb-2">Confirm Delete</h3>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-rose-500 text-white rounded text-[10px]">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================== CRUD MODULE: BUILDING & FACILITY ================== */
const BuildingLicensesModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterFacility, setFilterFacility] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_BUILDING_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('bldg-', ''), 10); return n > m ? n : m; }, 0);
    return `bldg-${String(max + 1).padStart(3, '0')}`;
  };

  const openAddModal = () => { setForm({ ...BLANK_BUILDING_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.licenseType.trim()) e.licenseType = 'Req';
    if (!f.licenseNumber.trim()) e.licenseNumber = 'Req';
    if (!f.authority.trim()) e.authority = 'Req';
    if (!f.issueDate) e.issueDate = 'Req';
    if (!f.expiryDate) e.expiryDate = 'Req';
    if (!f.renewBefore) e.renewBefore = 'Req';
    if (!f.responsibleOfficer.trim()) e.responsibleOfficer = 'Req';
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (editingId) setData(prev => prev.map(r => r.id === editingId ? { ...form, id: editingId } : r));
    else setData(prev => [...prev, { ...form }]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData(prev => prev.filter(r => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = r.licenseNumber.toLowerCase().includes(q) || r.authority.toLowerCase().includes(q) || r.responsibleOfficer.toLowerCase().includes(q);
    const matchFac = !filterFacility || r.facility === filterFacility;
    const matchStatus = !filterStatus || r.currentStatus === filterStatus;
    return matchSearch && matchFac && matchStatus;
  });

  const TH_COLS = ['License Number', 'Facility', 'License Type', 'Authority', 'Expiry', 'Status', 'Officer', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search license, authority, officer..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterFacility} onChange={(e) => setFilterFacility(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Facilities</option>
          {FACILITY_TYPES.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Statuses</option>
          {['Valid', 'Expiring Soon', 'Expired'].map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={openAddModal} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}>
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>{TH_COLS.map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={TH_COLS.length} className="px-4 py-10 text-center text-slate-400">No records found.</td></tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-3 py-3 font-mono text-slate-700">{r.licenseNumber}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.facility}</td>
                    <td className="px-3 py-3 text-slate-600">{r.licenseType}</td>
                    <td className="px-3 py-3 text-slate-600">{r.authority}</td>
                    <td className="px-3 py-3 text-slate-600">{r.expiryDate}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_LICENSE[r.currentStatus] || STATUS_BADGE_LICENSE.Valid}`}>{r.currentStatus}</span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{r.responsibleOfficer}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 text-sky-600 hover:bg-sky-50 rounded"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5">
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit Facility Record' : 'Add Facility Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <select value={form.facility} onChange={e => setForm({...form, facility: e.target.value})} className="border p-2 rounded text-[10px]">
                {FACILITY_TYPES.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.licenseType} onChange={e => setForm({...form, licenseType: e.target.value})} placeholder="License Type *" className="border p-2 rounded text-[10px]" />
              <input value={form.licenseNumber} onChange={e => setForm({...form, licenseNumber: e.target.value})} placeholder="License Number *" className="border p-2 rounded text-[10px]" />
              <input value={form.authority} onChange={e => setForm({...form, authority: e.target.value})} placeholder="Authority *" className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.issueDate} onChange={e => setForm({...form, issueDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.expiryDate} onChange={e => setForm({...form, expiryDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.renewBefore} onChange={e => setForm({...form, renewBefore: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input value={form.responsibleOfficer} onChange={e => setForm({...form, responsibleOfficer: e.target.value})} placeholder="Responsible Officer *" className="border p-2 rounded text-[10px]" />
              <input value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})} placeholder="Remarks" className="border p-2 rounded text-[10px] col-span-2" />
              <div className="col-span-2 flex justify-end gap-2 mt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-[10px]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white p-5 rounded-2xl w-full max-w-sm">
            <h3 className="font-bold mb-2">Confirm Delete</h3>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-rose-500 text-white rounded text-[10px]">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================== CRUD MODULE: UTILITY & VEHICLE ================== */
const UtilityLicensesModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterType, setFilterType] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_UTILITY_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('util-', ''), 10); return n > m ? n : m; }, 0);
    return `util-${String(max + 1).padStart(3, '0')}`;
  };

  const openAddModal = () => { setForm({ ...BLANK_UTILITY_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.registrationNumber.trim()) e.registrationNumber = 'Req';
    if (!f.licenseType.trim()) e.licenseType = 'Req';
    if (!f.authority.trim()) e.authority = 'Req';
    if (!f.issueDate) e.issueDate = 'Req';
    if (!f.expiryDate) e.expiryDate = 'Req';
    if (!f.renewBefore) e.renewBefore = 'Req';
    if (!f.responsibleOfficer.trim()) e.responsibleOfficer = 'Req';
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (editingId) setData(prev => prev.map(r => r.id === editingId ? { ...form, id: editingId } : r));
    else setData(prev => [...prev, { ...form }]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData(prev => prev.filter(r => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = r.registrationNumber.toLowerCase().includes(q) || r.authority.toLowerCase().includes(q) || r.responsibleOfficer.toLowerCase().includes(q);
    const matchType = !filterType || r.vehicleUtility === filterType;
    const matchStatus = !filterStatus || r.currentStatus === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const TH_COLS = ['Reg Number', 'Vehicle / Utility', 'License Type', 'Authority', 'Expiry', 'Status', 'Officer', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search registration, authority, officer..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Types</option>
          {VEHICLE_UTILITY_TYPES.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Statuses</option>
          {['Valid', 'Expiring Soon', 'Expired'].map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={openAddModal} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}>
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>{TH_COLS.map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={TH_COLS.length} className="px-4 py-10 text-center text-slate-400">No records found.</td></tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-3 py-3 font-mono text-slate-700">{r.registrationNumber}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.vehicleUtility}</td>
                    <td className="px-3 py-3 text-slate-600">{r.licenseType}</td>
                    <td className="px-3 py-3 text-slate-600">{r.authority}</td>
                    <td className="px-3 py-3 text-slate-600">{r.expiryDate}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_LICENSE[r.currentStatus] || STATUS_BADGE_LICENSE.Valid}`}>{r.currentStatus}</span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{r.responsibleOfficer}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 text-sky-600 hover:bg-sky-50 rounded"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5">
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit Utility Record' : 'Add Utility Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <select value={form.vehicleUtility} onChange={e => setForm({...form, vehicleUtility: e.target.value})} className="border p-2 rounded text-[10px]">
                {VEHICLE_UTILITY_TYPES.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.registrationNumber} onChange={e => setForm({...form, registrationNumber: e.target.value})} placeholder="Registration Number *" className="border p-2 rounded text-[10px]" />
              <input value={form.licenseType} onChange={e => setForm({...form, licenseType: e.target.value})} placeholder="License Type *" className="border p-2 rounded text-[10px]" />
              <input value={form.authority} onChange={e => setForm({...form, authority: e.target.value})} placeholder="Authority *" className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.issueDate} onChange={e => setForm({...form, issueDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.expiryDate} onChange={e => setForm({...form, expiryDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.renewBefore} onChange={e => setForm({...form, renewBefore: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input value={form.responsibleOfficer} onChange={e => setForm({...form, responsibleOfficer: e.target.value})} placeholder="Responsible Officer *" className="border p-2 rounded text-[10px]" />
              <input value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})} placeholder="Remarks" className="border p-2 rounded text-[10px] col-span-2" />
              <div className="col-span-2 flex justify-end gap-2 mt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-[10px]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white p-5 rounded-2xl w-full max-w-sm">
            <h3 className="font-bold mb-2">Confirm Delete</h3>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-rose-500 text-white rounded text-[10px]">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


/* ============================================================
   PHASE 5 — RENEWAL & COMPLIANCE TRACKER CONSTANTS & SEED
   ============================================================ */

const LS_KEY_RENEWAL = 'licenses_renewal_tracker';
const LS_KEY_COMPLIANCE = 'licenses_compliance_monitoring';
const LS_KEY_REMINDER = 'licenses_reminder_scheduler';

const RENEWAL_STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed', 'Overdue'];
const COMPLIANCE_AREAS = [
  'General Hospital Rules',
  'Fire Safety Standard',
  'Biomedical Waste Standard',
  'AERB Radiation Safety',
  'Pharmacy Storage Standard',
  'OT Sterilization',
];

const REMINDER_TYPES = ['Email', 'SMS', 'System Push', 'Meeting'];
const NOTIFICATION_STATUS = ['Pending', 'Sent', 'Acknowledged', 'Completed'];

const SEED_RENEWAL = Array.from({ length: 15 }, (_, i) => ({
  id: `ren-${String(i + 1).padStart(3, '0')}`,
  licenseCategory: LICENSE_CATEGORIES[i % LICENSE_CATEGORIES.length],
  licenseName: `License Name ${i + 1}`,
  referenceLicense: `LIC-REF-${2000 + i}`,
  department: HOSPITAL_DEPARTMENTS[i % HOSPITAL_DEPARTMENTS.length],
  expiryDate: `2024-${String((i % 12) + 1).padStart(2, '0')}-15`,
  renewBefore: `2024-${String((i % 12) + 1).padStart(2, '0')}-01`,
  renewalDate: '',
  renewalStatus: RENEWAL_STATUS_OPTIONS[i % RENEWAL_STATUS_OPTIONS.length],
  responsiblePerson: `Admin ${String.fromCharCode(65 + i)}`,
  documentUpload: '',
  remarks: '',
}));

const SEED_COMPLIANCE = Array.from({ length: 10 }, (_, i) => ({
  id: `cmp-${String(i + 1).padStart(3, '0')}`,
  department: HOSPITAL_DEPARTMENTS[(i + 2) % HOSPITAL_DEPARTMENTS.length],
  complianceArea: COMPLIANCE_AREAS[i % COMPLIANCE_AREAS.length],
  inspectionDate: `2023-11-${String((i % 28) + 1).padStart(2, '0')}`,
  complianceScore: 95 - (i * 4), // ranging down to around 55
  observation: i % 3 === 0 ? 'Minor deviation found' : 'All good',
  responsibleOfficer: `Officer ${String.fromCharCode(75 + i)}`,
  targetClosureDate: `2024-02-${String((i % 28) + 1).padStart(2, '0')}`,
  remarks: '',
}));

const SEED_REMINDER = Array.from({ length: 10 }, (_, i) => ({
  id: `rem-${String(i + 1).padStart(3, '0')}`,
  license: `Reference License ${1000 + i}`,
  reminderType: REMINDER_TYPES[i % REMINDER_TYPES.length],
  reminderDate: `2024-03-${String((i % 28) + 1).padStart(2, '0')}`,
  responsiblePerson: `Admin ${String.fromCharCode(80 + i)}`,
  notificationStatus: NOTIFICATION_STATUS[i % NOTIFICATION_STATUS.length],
  remarks: '',
}));

const BLANK_RENEWAL_FORM = {
  id: '', licenseCategory: LICENSE_CATEGORIES[0], licenseName: '', referenceLicense: '',
  department: HOSPITAL_DEPARTMENTS[0], expiryDate: '', renewBefore: '', renewalDate: '',
  renewalStatus: RENEWAL_STATUS_OPTIONS[0], responsiblePerson: '', documentUpload: '', remarks: ''
};

const BLANK_COMPLIANCE_FORM = {
  id: '', department: HOSPITAL_DEPARTMENTS[0], complianceArea: COMPLIANCE_AREAS[0],
  inspectionDate: '', complianceScore: '', observation: '', responsibleOfficer: '',
  targetClosureDate: '', remarks: ''
};

const BLANK_REMINDER_FORM = {
  id: '', license: '', reminderType: REMINDER_TYPES[0], reminderDate: '',
  responsiblePerson: '', notificationStatus: NOTIFICATION_STATUS[0], remarks: ''
};

/* ============================================================
   PHASE 5 — RENEWAL & COMPLIANCE HELPERS
   ============================================================ */

const calcRenewalTrackerStatus = (expiryDate) => {
  if (!expiryDate) return 'Valid';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  if (isNaN(expiry.getTime())) return 'Valid';
  if (today > expiry) return 'Overdue';
  const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  if (diffDays <= 30) return 'Pending Renewal';
  return 'Valid';
};

const calcComplianceStatus = (score) => {
  const s = parseFloat(score);
  if (isNaN(s)) return 'Non-Compliant';
  if (s >= 90) return 'Compliant';
  if (s >= 70) return 'Partially Compliant';
  return 'Non-Compliant';
};

const COMPLIANCE_BADGE_STYLE = {
  'Compliant': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Partially Compliant': 'bg-amber-50 text-amber-700 border-amber-200',
  'Non-Compliant': 'bg-rose-50 text-rose-700 border-rose-200',
};

const RENEWAL_STATUS_BADGE = {
  'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
  'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
  'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Overdue': 'bg-rose-50 text-rose-700 border-rose-200',
  'Pending Renewal': 'bg-orange-50 text-orange-700 border-orange-200',
  'Valid': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

/* ============================================================
   PHASE 5 — MAIN COMPONENTS
   ============================================================ */

const RenewalTrackerTab = ({ hospital }) => {
  const [renewalRecords, setRenewalRecords] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_RENEWAL);
    return saved ? JSON.parse(saved) : SEED_RENEWAL;
  });
  const [compRecords, setCompRecords] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_COMPLIANCE);
    return saved ? JSON.parse(saved) : SEED_COMPLIANCE;
  });
  const [remRecords, setRemRecords] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_REMINDER);
    return saved ? JSON.parse(saved) : SEED_REMINDER;
  });

  React.useEffect(() => { localStorage.setItem(LS_KEY_RENEWAL, JSON.stringify(renewalRecords)); }, [renewalRecords]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_COMPLIANCE, JSON.stringify(compRecords)); }, [compRecords]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_REMINDER, JSON.stringify(remRecords)); }, [remRecords]);

  const allRenewals = renewalRecords.map(r => ({ ...r, autoStatus: calcRenewalTrackerStatus(r.expiryDate) }));
  const allComp = compRecords.map(r => ({ ...r, autoStatus: calcComplianceStatus(r.complianceScore) }));
  
  const totalRenewals = allRenewals.length;
  const pendingRenewals = allRenewals.filter(r => r.renewalStatus === 'Pending' || r.autoStatus === 'Pending Renewal').length;
  const completedRenewals = allRenewals.filter(r => r.renewalStatus === 'Completed').length;
  const overdueRenewals = allRenewals.filter(r => r.renewalStatus === 'Overdue' || r.autoStatus === 'Overdue').length;

  const compliants = allComp.filter(r => r.autoStatus === 'Compliant').length;
  const nonCompliants = allComp.filter(r => r.autoStatus === 'Non-Compliant').length;
  const compliancePct = allComp.length ? Math.round((compliants / allComp.length) * 100) : 0;
  
  const reminderNotifs = remRecords.filter(r => r.notificationStatus === 'Sent' || r.notificationStatus === 'Pending').length;
  const overallHealth = totalRenewals ? Math.round(((totalRenewals - overdueRenewals) / totalRenewals) * 100) : 0;

  const kpis = [
    { label: 'Total Licenses (Renewals)', value: totalRenewals, color: 'text-blue-600' },
    { label: 'Renewals Pending',          value: pendingRenewals, color: 'text-amber-600' },
    { label: 'Renewals Completed',        value: completedRenewals, color: 'text-emerald-600' },
    { label: 'Overdue Renewals',          value: overdueRenewals, color: 'text-rose-600' },
    { label: 'Compliance %',              value: `${compliancePct}%`, color: 'text-teal-600' },
    { label: 'Non-Compliant Licenses',    value: nonCompliants, color: 'text-rose-600' },
    { label: 'Reminder Notifications',    value: reminderNotifs, color: 'text-sky-600' },
    { label: 'Overall License Health',    value: `${overallHealth}%`, color: 'text-violet-600' },
  ];

  const [activeSubTab, setActiveSubTab] = React.useState('ren');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Renewal &amp; Compliance Tracker</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Track renewals, monitor compliance, and schedule reminders</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {[
          { id: 'ren', label: 'Renewal Tracker' },
          { id: 'cmp', label: 'Compliance Monitoring' },
          { id: 'rem', label: 'Renewal Reminders' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveSubTab(t.id)}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeSubTab === t.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeSubTab === 'ren' && <RenewalTrackerModule hospital={hospital} data={allRenewals} setData={setRenewalRecords} />}
      {activeSubTab === 'cmp' && <ComplianceMonitoringModule hospital={hospital} data={allComp} setData={setCompRecords} />}
      {activeSubTab === 'rem' && <ReminderSchedulerModule hospital={hospital} data={remRecords} setData={setRemRecords} />}
    </div>
  );
};

/* ================== CRUD MODULE: RENEWAL TRACKER ================== */
const RenewalTrackerModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterCat, setFilterCat] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_RENEWAL_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('ren-', ''), 10); return n > m ? n : m; }, 0);
    return `ren-${String(max + 1).padStart(3, '0')}`;
  };

  const openAddModal = () => { setForm({ ...BLANK_RENEWAL_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.licenseName.trim()) e.licenseName = 'Req';
    if (!f.referenceLicense.trim()) e.referenceLicense = 'Req';
    if (!f.expiryDate) e.expiryDate = 'Req';
    if (!f.renewBefore) e.renewBefore = 'Req';
    if (!f.responsiblePerson.trim()) e.responsiblePerson = 'Req';
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    // Clean out computed properties so they aren't stored in localStorage
    const toSave = { ...form };
    delete toSave.autoStatus;
    
    if (editingId) setData(prev => prev.map(r => r.id === editingId ? { ...toSave, id: editingId } : r));
    else setData(prev => [...prev, { ...toSave }]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData(prev => prev.filter(r => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = r.licenseName.toLowerCase().includes(q) || r.referenceLicense.toLowerCase().includes(q) || r.responsiblePerson.toLowerCase().includes(q);
    const matchCat = !filterCat || r.licenseCategory === filterCat;
    const matchDept = !filterDept || r.department === filterDept;
    const matchStatus = !filterStatus || r.renewalStatus === filterStatus;
    return matchSearch && matchCat && matchDept && matchStatus;
  });

  const TH_COLS = ['Ref', 'License Name', 'Category', 'Dept', 'Expiry', 'Auto Status', 'Renewal Status', 'Officer', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search license, ref, officer..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Categories</option>
          {LICENSE_CATEGORIES.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Departments</option>
          {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Statuses</option>
          {RENEWAL_STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={openAddModal} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}>
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>{TH_COLS.map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={TH_COLS.length} className="px-4 py-10 text-center text-slate-400">No records found.</td></tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.referenceLicense}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.licenseName}</td>
                    <td className="px-3 py-3 text-slate-600">{r.licenseCategory}</td>
                    <td className="px-3 py-3 text-slate-600">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600">{r.expiryDate}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${RENEWAL_STATUS_BADGE[r.autoStatus] || RENEWAL_STATUS_BADGE.Valid}`}>{r.autoStatus}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${RENEWAL_STATUS_BADGE[r.renewalStatus] || RENEWAL_STATUS_BADGE.Valid}`}>{r.renewalStatus}</span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{r.responsiblePerson}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 text-sky-600 hover:bg-sky-50 rounded"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5">
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit Renewal Record' : 'Add Renewal Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <select value={form.licenseCategory} onChange={e => setForm({...form, licenseCategory: e.target.value})} className="border p-2 rounded text-[10px]">
                {LICENSE_CATEGORIES.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.licenseName} onChange={e => setForm({...form, licenseName: e.target.value})} placeholder="License Name *" className="border p-2 rounded text-[10px]" />
              <input value={form.referenceLicense} onChange={e => setForm({...form, referenceLicense: e.target.value})} placeholder="Reference License *" className="border p-2 rounded text-[10px]" />
              <select value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="border p-2 rounded text-[10px]">
                {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
              <input type="date" value={form.expiryDate} onChange={e => setForm({...form, expiryDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.renewBefore} onChange={e => setForm({...form, renewBefore: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.renewalDate} onChange={e => setForm({...form, renewalDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <select value={form.renewalStatus} onChange={e => setForm({...form, renewalStatus: e.target.value})} className="border p-2 rounded text-[10px]">
                {RENEWAL_STATUS_OPTIONS.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.responsiblePerson} onChange={e => setForm({...form, responsiblePerson: e.target.value})} placeholder="Responsible Person *" className="border p-2 rounded text-[10px]" />
              <input value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})} placeholder="Remarks" className="border p-2 rounded text-[10px] col-span-2" />
              <div className="col-span-2 flex justify-end gap-2 mt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-[10px]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white p-5 rounded-2xl w-full max-w-sm">
            <h3 className="font-bold mb-2">Confirm Delete</h3>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-rose-500 text-white rounded text-[10px]">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================== CRUD MODULE: COMPLIANCE MONITORING ================== */
const ComplianceMonitoringModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_COMPLIANCE_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('cmp-', ''), 10); return n > m ? n : m; }, 0);
    return `cmp-${String(max + 1).padStart(3, '0')}`;
  };

  const openAddModal = () => { setForm({ ...BLANK_COMPLIANCE_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.inspectionDate) e.inspectionDate = 'Req';
    if (f.complianceScore === '') e.complianceScore = 'Req';
    if (!f.responsibleOfficer.trim()) e.responsibleOfficer = 'Req';
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const toSave = { ...form };
    delete toSave.autoStatus;
    if (editingId) setData(prev => prev.map(r => r.id === editingId ? { ...toSave, id: editingId } : r));
    else setData(prev => [...prev, { ...toSave }]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData(prev => prev.filter(r => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = r.complianceArea.toLowerCase().includes(q) || r.responsibleOfficer.toLowerCase().includes(q);
    const matchDept = !filterDept || r.department === filterDept;
    const matchStatus = !filterStatus || r.autoStatus === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const TH_COLS = ['Department', 'Area', 'Inspection', 'Score (%)', 'Status', 'Closure Date', 'Officer', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search area, officer..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Departments</option>
          {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Statuses</option>
          {Object.keys(COMPLIANCE_BADGE_STYLE).map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={openAddModal} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}>
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>{TH_COLS.map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={TH_COLS.length} className="px-4 py-10 text-center text-slate-400">No records found.</td></tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600">{r.complianceArea}</td>
                    <td className="px-3 py-3 text-slate-600">{r.inspectionDate}</td>
                    <td className="px-3 py-3 font-mono text-slate-600">{r.complianceScore}%</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${COMPLIANCE_BADGE_STYLE[r.autoStatus] || COMPLIANCE_BADGE_STYLE.Compliant}`}>{r.autoStatus}</span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{r.targetClosureDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.responsibleOfficer}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 text-sky-600 hover:bg-sky-50 rounded"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5">
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit Compliance Record' : 'Add Compliance Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <select value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="border p-2 rounded text-[10px]">
                {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
              <select value={form.complianceArea} onChange={e => setForm({...form, complianceArea: e.target.value})} className="border p-2 rounded text-[10px]">
                {COMPLIANCE_AREAS.map(d => <option key={d}>{d}</option>)}
              </select>
              <input type="date" value={form.inspectionDate} onChange={e => setForm({...form, inspectionDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="number" min="0" max="100" value={form.complianceScore} onChange={e => setForm({...form, complianceScore: e.target.value})} placeholder="Score (0-100) *" className="border p-2 rounded text-[10px]" />
              <input value={calcComplianceStatus(form.complianceScore)} disabled className="border p-2 rounded text-[10px] bg-slate-50 cursor-not-allowed" title="Auto calculated" />
              <input type="date" value={form.targetClosureDate} onChange={e => setForm({...form, targetClosureDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input value={form.observation} onChange={e => setForm({...form, observation: e.target.value})} placeholder="Observation" className="border p-2 rounded text-[10px]" />
              <input value={form.responsibleOfficer} onChange={e => setForm({...form, responsibleOfficer: e.target.value})} placeholder="Responsible Officer *" className="border p-2 rounded text-[10px]" />
              <input value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})} placeholder="Remarks" className="border p-2 rounded text-[10px] col-span-2" />
              <div className="col-span-2 flex justify-end gap-2 mt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-[10px]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white p-5 rounded-2xl w-full max-w-sm">
            <h3 className="font-bold mb-2">Confirm Delete</h3>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-rose-500 text-white rounded text-[10px]">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================== CRUD MODULE: RENEWAL REMINDER SCHEDULER ================== */
const ReminderSchedulerModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterType, setFilterType] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_REMINDER_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('rem-', ''), 10); return n > m ? n : m; }, 0);
    return `rem-${String(max + 1).padStart(3, '0')}`;
  };

  const openAddModal = () => { setForm({ ...BLANK_REMINDER_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.license.trim()) e.license = 'Req';
    if (!f.reminderDate) e.reminderDate = 'Req';
    if (!f.responsiblePerson.trim()) e.responsiblePerson = 'Req';
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (editingId) setData(prev => prev.map(r => r.id === editingId ? { ...form, id: editingId } : r));
    else setData(prev => [...prev, { ...form }]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData(prev => prev.filter(r => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = r.license.toLowerCase().includes(q) || r.responsiblePerson.toLowerCase().includes(q);
    const matchType = !filterType || r.reminderType === filterType;
    const matchStatus = !filterStatus || r.notificationStatus === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const TH_COLS = ['License', 'Type', 'Reminder Date', 'Status', 'Person', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search license, person..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Types</option>
          {REMINDER_TYPES.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Statuses</option>
          {NOTIFICATION_STATUS.map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={openAddModal} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}>
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>{TH_COLS.map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={TH_COLS.length} className="px-4 py-10 text-center text-slate-400">No records found.</td></tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.license}</td>
                    <td className="px-3 py-3 text-slate-600">{r.reminderType}</td>
                    <td className="px-3 py-3 text-slate-600">{r.reminderDate}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${
                        r.notificationStatus === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        r.notificationStatus === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        r.notificationStatus === 'Sent' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>{r.notificationStatus}</span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{r.responsiblePerson}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 text-sky-600 hover:bg-sky-50 rounded"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5">
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit Reminder Record' : 'Add Reminder Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <input value={form.license} onChange={e => setForm({...form, license: e.target.value})} placeholder="License *" className="border p-2 rounded text-[10px]" />
              <select value={form.reminderType} onChange={e => setForm({...form, reminderType: e.target.value})} className="border p-2 rounded text-[10px]">
                {REMINDER_TYPES.map(d => <option key={d}>{d}</option>)}
              </select>
              <input type="date" value={form.reminderDate} onChange={e => setForm({...form, reminderDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <select value={form.notificationStatus} onChange={e => setForm({...form, notificationStatus: e.target.value})} className="border p-2 rounded text-[10px]">
                {NOTIFICATION_STATUS.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.responsiblePerson} onChange={e => setForm({...form, responsiblePerson: e.target.value})} placeholder="Responsible Person *" className="border p-2 rounded text-[10px]" />
              <input value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})} placeholder="Remarks" className="border p-2 rounded text-[10px]" />
              <div className="col-span-2 flex justify-end gap-2 mt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-[10px]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white p-5 rounded-2xl w-full max-w-sm">
            <h3 className="font-bold mb-2">Confirm Delete</h3>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-rose-500 text-white rounded text-[10px]">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


/* ============================================================
   PHASE 6 — INTERNAL AUDIT CONSTANTS & SEED
   ============================================================ */

const LS_KEY_AUDITS = 'licenses_internal_audits';
const LS_KEY_CAPA = 'licenses_capa_tracker';

const AUDIT_TYPES = ['Internal Audit', 'External Audit', 'Surprise Inspection'];
const OBSERVATION_CATEGORIES = ['Critical', 'Major', 'Minor'];
const AUDIT_STATUSES = ['Scheduled', 'Completed', 'Pending'];
const CAPA_STATUSES = ['Open', 'In Progress', 'Closed', 'Overdue'];

const SEED_AUDITS = Array.from({ length: 10 }, (_, i) => ({
  id: `aud-${String(i + 1).padStart(3, '0')}`,
  auditDate: `2023-10-${String((i % 28) + 1).padStart(2, '0')}`,
  auditType: AUDIT_TYPES[i % AUDIT_TYPES.length],
  licenseCategory: LICENSE_CATEGORIES[i % LICENSE_CATEGORIES.length],
  licenseName: `License ${100 + i}`,
  department: HOSPITAL_DEPARTMENTS[i % HOSPITAL_DEPARTMENTS.length],
  auditor: `Auditor ${String.fromCharCode(65 + i)}`,
  complianceScore: 95 - (i * 3), // range 95 down to 68
  auditFindings: `Findings details ${i + 1}`,
  observationCategory: OBSERVATION_CATEGORIES[i % OBSERVATION_CATEGORIES.length],
  recommendation: 'Fix minor gaps',
  targetClosureDate: `2024-01-${String((i % 28) + 1).padStart(2, '0')}`,
  auditStatus: AUDIT_STATUSES[i % AUDIT_STATUSES.length],
  remarks: '',
}));

const SEED_CAPAS = Array.from({ length: 10 }, (_, i) => ({
  id: `cap-${String(i + 1).padStart(3, '0')}`,
  linkedAudit: `aud-${String(i + 1).padStart(3, '0')}`,
  department: HOSPITAL_DEPARTMENTS[(i + 1) % HOSPITAL_DEPARTMENTS.length],
  capaDescription: `Fix findings from audit ${i + 1}`,
  rootCause: 'Lack of training',
  correctiveAction: 'Conducted training',
  preventiveAction: 'Updated SOP',
  responsiblePerson: `Mgr ${String.fromCharCode(75 + i)}`,
  targetDate: `2024-02-${String((i % 28) + 1).padStart(2, '0')}`,
  completionDate: i % 2 === 0 ? `2024-01-${String((i % 28) + 1).padStart(2, '0')}` : '',
  status: i % 2 === 0 ? 'Closed' : 'In Progress',
  remarks: '',
}));

const BLANK_AUDIT_FORM = {
  id: '', auditDate: '', auditType: AUDIT_TYPES[0], licenseCategory: LICENSE_CATEGORIES[0],
  licenseName: '', department: HOSPITAL_DEPARTMENTS[0], auditor: '', complianceScore: '',
  auditFindings: '', observationCategory: OBSERVATION_CATEGORIES[0], recommendation: '',
  targetClosureDate: '', auditStatus: AUDIT_STATUSES[0], remarks: ''
};

const BLANK_CAPA_FORM = {
  id: '', linkedAudit: '', department: HOSPITAL_DEPARTMENTS[0], capaDescription: '',
  rootCause: '', correctiveAction: '', preventiveAction: '', responsiblePerson: '',
  targetDate: '', completionDate: '', status: CAPA_STATUSES[0], remarks: ''
};

/* ============================================================
   PHASE 6 — INTERNAL AUDIT HELPERS
   ============================================================ */

const calcAuditComplianceStatus = (score) => {
  const s = parseFloat(score);
  if (isNaN(s)) return 'Non-Compliant';
  if (s >= 90) return 'Compliant';
  if (s >= 70) return 'Needs Improvement';
  return 'Non-Compliant';
};

const calcCapaStatus = (targetDate, completionDate, currentStatus) => {
  if (completionDate) return 'Closed';
  if (targetDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDate);
    if (!isNaN(target.getTime()) && today > target) return 'Overdue';
  }
  return currentStatus || 'Open';
};

const AUDIT_COMPLIANCE_BADGE = {
  'Compliant': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Needs Improvement': 'bg-amber-50 text-amber-700 border-amber-200',
  'Non-Compliant': 'bg-rose-50 text-rose-700 border-rose-200',
};

const CAPA_STATUS_BADGE = {
  'Open': 'bg-blue-50 text-blue-700 border-blue-200',
  'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
  'Closed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Overdue': 'bg-rose-50 text-rose-700 border-rose-200',
};

/* ============================================================
   PHASE 6 — MAIN COMPONENTS
   ============================================================ */

const InternalAuditTab = ({ hospital }) => {
  const [auditRecords, setAuditRecords] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_AUDITS);
    return saved ? JSON.parse(saved) : SEED_AUDITS;
  });
  const [capaRecords, setCapaRecords] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_CAPA);
    return saved ? JSON.parse(saved) : SEED_CAPAS;
  });

  React.useEffect(() => { localStorage.setItem(LS_KEY_AUDITS, JSON.stringify(auditRecords)); }, [auditRecords]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_CAPA, JSON.stringify(capaRecords)); }, [capaRecords]);

  const allAudits = auditRecords.map(r => ({ ...r, autoCompliance: calcAuditComplianceStatus(r.complianceScore) }));
  const allCapas = capaRecords.map(r => ({ ...r, autoStatus: calcCapaStatus(r.targetDate, r.completionDate, r.status) }));
  
  const totalAudits = allAudits.length;
  const completedAudits = allAudits.filter(r => r.auditStatus === 'Completed').length;
  const pendingAudits = allAudits.filter(r => r.auditStatus === 'Pending' || r.auditStatus === 'Scheduled').length;
  const avgCompliance = totalAudits ? Math.round(allAudits.reduce((acc, r) => acc + (parseFloat(r.complianceScore) || 0), 0) / totalAudits) : 0;
  
  const totalCapas = allCapas.length;
  const closedCapas = allCapas.filter(r => r.autoStatus === 'Closed').length;
  const overdueCapas = allCapas.filter(r => r.autoStatus === 'Overdue').length;
  
  const compliants = allAudits.filter(r => r.autoCompliance === 'Compliant').length;
  const licenseCompliancePct = totalAudits ? Math.round((compliants / totalAudits) * 100) : 0;

  const kpis = [
    { label: 'Total Audits',           value: totalAudits,     color: 'text-blue-600' },
    { label: 'Completed Audits',       value: completedAudits, color: 'text-emerald-600' },
    { label: 'Pending Audits',         value: pendingAudits,   color: 'text-amber-600' },
    { label: 'Average Compliance %',   value: `${avgCompliance}%`, color: 'text-teal-600' },
    { label: 'Total CAPAs',            value: totalCapas,      color: 'text-violet-600' },
    { label: 'Closed CAPAs',           value: closedCapas,     color: 'text-emerald-600' },
    { label: 'Overdue CAPAs',          value: overdueCapas,    color: 'text-rose-600' },
    { label: 'License Compliance %',   value: `${licenseCompliancePct}%`, color: 'text-sky-600' },
  ];

  const [activeSubTab, setActiveSubTab] = React.useState('aud');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Internal Audit &amp; CAPA</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Manage compliance audits and corrective/preventive actions</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {[
          { id: 'aud', label: 'License Compliance Audit' },
          { id: 'cap', label: 'CAPA Tracker' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveSubTab(t.id)}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeSubTab === t.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeSubTab === 'aud' && <ComplianceAuditModule hospital={hospital} data={allAudits} setData={setAuditRecords} />}
      {activeSubTab === 'cap' && <CapaTrackerModule hospital={hospital} data={allCapas} setData={setCapaRecords} audits={allAudits} />}
    </div>
  );
};

/* ================== CRUD MODULE: LICENSE COMPLIANCE AUDIT ================== */
const ComplianceAuditModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');
  const [filterObs, setFilterObs] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_AUDIT_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('aud-', ''), 10); return n > m ? n : m; }, 0);
    return `aud-${String(max + 1).padStart(3, '0')}`;
  };

  const openAddModal = () => { setForm({ ...BLANK_AUDIT_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.auditDate) e.auditDate = 'Req';
    if (!f.licenseName.trim()) e.licenseName = 'Req';
    if (!f.auditor.trim()) e.auditor = 'Req';
    if (f.complianceScore === '') e.complianceScore = 'Req';
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const toSave = { ...form };
    delete toSave.autoCompliance;
    if (editingId) setData(prev => prev.map(r => r.id === editingId ? { ...toSave, id: editingId } : r));
    else setData(prev => [...prev, { ...toSave }]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData(prev => prev.filter(r => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = r.id.toLowerCase().includes(q) || r.licenseName.toLowerCase().includes(q) || r.auditor.toLowerCase().includes(q);
    const matchDept = !filterDept || r.department === filterDept;
    const matchStatus = !filterStatus || r.auditStatus === filterStatus;
    const matchObs = !filterObs || r.observationCategory === filterObs;
    return matchSearch && matchDept && matchStatus && matchObs;
  });

  const TH_COLS = ['Audit ID', 'License Name', 'Dept', 'Date', 'Auditor', 'Score (%)', 'Observation', 'Status', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search ID, license, auditor..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Departments</option>
          {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterObs} onChange={(e) => setFilterObs(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Observations</option>
          {OBSERVATION_CATEGORIES.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Statuses</option>
          {AUDIT_STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={openAddModal} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}>
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>{TH_COLS.map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={TH_COLS.length} className="px-4 py-10 text-center text-slate-400">No records found.</td></tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-3 py-3 font-mono text-slate-700">{r.id}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.licenseName}</td>
                    <td className="px-3 py-3 text-slate-600">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600">{r.auditDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.auditor}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${AUDIT_COMPLIANCE_BADGE[r.autoCompliance]}`}>{r.complianceScore}% ({r.autoCompliance})</span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{r.observationCategory}</td>
                    <td className="px-3 py-3 text-slate-600">{r.auditStatus}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 text-sky-600 hover:bg-sky-50 rounded"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5">
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit Audit Record' : 'Add Audit Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <input type="date" value={form.auditDate} onChange={e => setForm({...form, auditDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <select value={form.auditType} onChange={e => setForm({...form, auditType: e.target.value})} className="border p-2 rounded text-[10px]">
                {AUDIT_TYPES.map(d => <option key={d}>{d}</option>)}
              </select>
              <select value={form.licenseCategory} onChange={e => setForm({...form, licenseCategory: e.target.value})} className="border p-2 rounded text-[10px]">
                {LICENSE_CATEGORIES.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.licenseName} onChange={e => setForm({...form, licenseName: e.target.value})} placeholder="License Name *" className="border p-2 rounded text-[10px]" />
              <select value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="border p-2 rounded text-[10px]">
                {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.auditor} onChange={e => setForm({...form, auditor: e.target.value})} placeholder="Auditor *" className="border p-2 rounded text-[10px]" />
              <input type="number" min="0" max="100" value={form.complianceScore} onChange={e => setForm({...form, complianceScore: e.target.value})} placeholder="Score (0-100) *" className="border p-2 rounded text-[10px]" />
              <select value={form.observationCategory} onChange={e => setForm({...form, observationCategory: e.target.value})} className="border p-2 rounded text-[10px]">
                {OBSERVATION_CATEGORIES.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.auditFindings} onChange={e => setForm({...form, auditFindings: e.target.value})} placeholder="Findings" className="border p-2 rounded text-[10px]" />
              <input value={form.recommendation} onChange={e => setForm({...form, recommendation: e.target.value})} placeholder="Recommendation" className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.targetClosureDate} onChange={e => setForm({...form, targetClosureDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <select value={form.auditStatus} onChange={e => setForm({...form, auditStatus: e.target.value})} className="border p-2 rounded text-[10px]">
                {AUDIT_STATUSES.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})} placeholder="Remarks" className="border p-2 rounded text-[10px] col-span-2" />
              <div className="col-span-2 flex justify-end gap-2 mt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-[10px]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white p-5 rounded-2xl w-full max-w-sm">
            <h3 className="font-bold mb-2">Confirm Delete</h3>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-rose-500 text-white rounded text-[10px]">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================== CRUD MODULE: CAPA TRACKER ================== */
const CapaTrackerModule = ({ hospital, data, setData, audits }) => {
  const [search, setSearch] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_CAPA_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('cap-', ''), 10); return n > m ? n : m; }, 0);
    return `cap-${String(max + 1).padStart(3, '0')}`;
  };

  const openAddModal = () => { setForm({ ...BLANK_CAPA_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.linkedAudit.trim()) e.linkedAudit = 'Req';
    if (!f.capaDescription.trim()) e.capaDescription = 'Req';
    if (!f.responsiblePerson.trim()) e.responsiblePerson = 'Req';
    if (!f.targetDate) e.targetDate = 'Req';
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const toSave = { ...form };
    delete toSave.autoStatus;
    if (editingId) setData(prev => prev.map(r => r.id === editingId ? { ...toSave, id: editingId } : r));
    else setData(prev => [...prev, { ...toSave }]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData(prev => prev.filter(r => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = r.id.toLowerCase().includes(q) || r.capaDescription.toLowerCase().includes(q) || r.responsiblePerson.toLowerCase().includes(q);
    const matchDept = !filterDept || r.department === filterDept;
    const matchStatus = !filterStatus || r.autoStatus === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const TH_COLS = ['CAPA ID', 'Linked Audit', 'Dept', 'Description', 'Person', 'Target Date', 'Completion', 'Status', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search ID, desc, person..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Departments</option>
          {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Statuses</option>
          {CAPA_STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={openAddModal} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}>
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>{TH_COLS.map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={TH_COLS.length} className="px-4 py-10 text-center text-slate-400">No records found.</td></tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-3 py-3 font-mono text-slate-700">{r.id}</td>
                    <td className="px-3 py-3 text-slate-600">{r.linkedAudit}</td>
                    <td className="px-3 py-3 text-slate-600">{r.department}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.capaDescription}</td>
                    <td className="px-3 py-3 text-slate-600">{r.responsiblePerson}</td>
                    <td className="px-3 py-3 text-slate-600">{r.targetDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.completionDate || '-'}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${CAPA_STATUS_BADGE[r.autoStatus] || CAPA_STATUS_BADGE.Open}`}>{r.autoStatus}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 text-sky-600 hover:bg-sky-50 rounded"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5">
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit CAPA Record' : 'Add CAPA Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <select value={form.linkedAudit} onChange={e => setForm({...form, linkedAudit: e.target.value})} className="border p-2 rounded text-[10px]">
                <option value="">Select Audit...</option>
                {audits.map(a => <option key={a.id} value={a.id}>{a.id} - {a.licenseName}</option>)}
              </select>
              <select value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="border p-2 rounded text-[10px]">
                {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.capaDescription} onChange={e => setForm({...form, capaDescription: e.target.value})} placeholder="CAPA Description *" className="border p-2 rounded text-[10px]" />
              <input value={form.rootCause} onChange={e => setForm({...form, rootCause: e.target.value})} placeholder="Root Cause" className="border p-2 rounded text-[10px]" />
              <input value={form.correctiveAction} onChange={e => setForm({...form, correctiveAction: e.target.value})} placeholder="Corrective Action" className="border p-2 rounded text-[10px]" />
              <input value={form.preventiveAction} onChange={e => setForm({...form, preventiveAction: e.target.value})} placeholder="Preventive Action" className="border p-2 rounded text-[10px]" />
              <input value={form.responsiblePerson} onChange={e => setForm({...form, responsiblePerson: e.target.value})} placeholder="Responsible Person *" className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.targetDate} onChange={e => setForm({...form, targetDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.completionDate} onChange={e => setForm({...form, completionDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="border p-2 rounded text-[10px]">
                {CAPA_STATUSES.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})} placeholder="Remarks" className="border p-2 rounded text-[10px] col-span-2" />
              <div className="col-span-2 flex justify-end gap-2 mt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-[10px]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white p-5 rounded-2xl w-full max-w-sm">
            <h3 className="font-bold mb-2">Confirm Delete</h3>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-rose-500 text-white rounded text-[10px]">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


/* ============================================================
   PHASE 7 — REPORTS & ANALYTICS
   ============================================================ */

const ReportsTab = ({ hospital }) => {
  // Load data from all previous phases
  const getParsed = (key) => { const d = localStorage.getItem(key); return d ? JSON.parse(d) : []; };

  const hospitalLic = getParsed('licenses_hospital_register');
  const bioLic = getParsed('licenses_biomedical_compliance');
  const polLic = getParsed('licenses_pollution_control');
  const firLic = getParsed('licenses_fire_safety');
  const aerbLic = getParsed('licenses_aerb');
  const bldgLic = getParsed('licenses_building_facility');
  const utilLic = getParsed('licenses_utility_vehicle');
  const renLic = getParsed('licenses_renewal_tracker');
  const compMon = getParsed('licenses_compliance_monitoring');
  const audLic = getParsed('licenses_internal_audits');
  const capaLic = getParsed('licenses_capa_tracker');

  // Enhance data with calculated status where necessary
  const allLic = [
    ...hospitalLic.map(r => ({ ...r, category: 'Hospital', currentStatus: calcLicenseStatus(r.expiryDate), dept: r.hospitalDepartment || 'Administration' })),
    ...bioLic.map(r => ({ ...r, category: 'Biomedical', currentStatus: calcLicenseStatus(r.expiryDate), dept: r.hospitalDepartment || 'Administration' })),
    ...polLic.map(r => ({ ...r, category: 'Pollution', currentStatus: calcLicenseStatus(r.expiryDate), dept: r.department || 'Facility' })),
    ...firLic.map(r => ({ ...r, category: 'Fire Safety', currentStatus: calcLicenseStatus(r.expiryDate), dept: r.department || 'Facility' })),
    ...aerbLic.map(r => ({ ...r, category: 'AERB', currentStatus: calcLicenseStatus(r.expiryDate), dept: r.department || 'Radiology' })),
    ...bldgLic.map(r => ({ ...r, category: 'Building & Facility', currentStatus: calcLicenseStatus(r.expiryDate), dept: r.department || 'Facility' })),
    ...utilLic.map(r => ({ ...r, category: 'Utility & Vehicle', currentStatus: calcLicenseStatus(r.expiryDate), dept: r.department || 'Transport' })),
  ];

  // 8 KPIs
  const totalLicenses = allLic.length;
  const validLicenses = allLic.filter(l => l.currentStatus === 'Valid').length;
  const expiringSoon = allLic.filter(l => l.currentStatus === 'Expiring Soon').length;
  const expiredLicenses = allLic.filter(l => l.currentStatus === 'Expired').length;
  
  const renewalsTotal = renLic.length;
  const renewalsDone = renLic.filter(r => r.renewalStatus === 'Completed').length;
  const renewalCompliance = renewalsTotal ? Math.round((renewalsDone / renewalsTotal) * 100) : 0;
  
  const auditsTotal = audLic.length;
  const auditsCompliant = audLic.filter(a => calcAuditComplianceStatus(a.complianceScore) === 'Compliant').length;
  const auditCompliance = auditsTotal ? Math.round((auditsCompliant / auditsTotal) * 100) : 0;

  const capaTotal = capaLic.length;
  const capaClosed = capaLic.filter(c => calcCapaStatus(c.targetDate, c.completionDate, c.status) === 'Closed').length;
  const capaClosure = capaTotal ? Math.round((capaClosed / capaTotal) * 100) : 0;

  const overallLicenseCompliance = totalLicenses ? Math.round((validLicenses / totalLicenses) * 100) : 0;

  // 1. License Category Distribution
  const catMap = {};
  allLic.forEach(l => { catMap[l.category] = (catMap[l.category] || 0) + 1; });
  const categoryData = Object.keys(catMap).map((k, i) => ({ name: k, value: catMap[k], color: COLORS[i % COLORS.length] }));

  // 2. Department-wise Licenses
  const deptMap = {};
  allLic.forEach(l => { deptMap[l.dept] = (deptMap[l.dept] || 0) + 1; });
  const deptData = Object.keys(deptMap).map((k) => ({ name: k, count: deptMap[k] }));

  // 3. Monthly License Renewals (from renLic)
  const monthMap = {};
  renLic.forEach(r => {
    if(r.expiryDate) {
      const m = r.expiryDate.substring(0, 7); // YYYY-MM
      monthMap[m] = (monthMap[m] || 0) + 1;
    }
  });
  const monthlyRenewals = Object.keys(monthMap).sort().map(k => ({ month: k, count: monthMap[k] }));

  // 4. License Expiry Trend (from allLic)
  const expTrend = {};
  allLic.forEach(l => {
    if(l.expiryDate) {
      const year = l.expiryDate.substring(0, 4);
      expTrend[year] = (expTrend[year] || 0) + 1;
    }
  });
  const expiryTrendData = Object.keys(expTrend).sort().map(k => ({ year: k, count: expTrend[k] }));

  // 5. Compliance Status Distribution
  const statusMap = { Valid: validLicenses, 'Expiring Soon': expiringSoon, Expired: expiredLicenses };
  const statusData = Object.keys(statusMap).map((k, i) => ({ name: k, value: statusMap[k], color: ['#10b981', '#f59e0b', '#ef4444'][i] }));

  // 6. Audit & CAPA Compliance Trend (dummy trend from actual counts over arbitrary periods, as dates may lack variance in seed)
  // Just use departments for trend since this is cross-sectional data
  const auditCapaData = [];
  Object.keys(deptMap).forEach(d => {
    const dAudits = audLic.filter(a => a.department === d).length;
    const dCapas = capaLic.filter(c => c.department === d).length;
    if(dAudits > 0 || dCapas > 0) {
      auditCapaData.push({ name: d, Audits: dAudits, CAPAs: dCapas });
    }
  });

  // Monthly Summary Table (Department-wise aggregations)
  const tableData = Object.keys(deptMap).map(d => {
    const lics = allLic.filter(l => l.dept === d);
    const valid = lics.filter(l => l.currentStatus === 'Valid').length;
    const expiring = lics.filter(l => l.currentStatus === 'Expiring Soon').length;
    const expired = lics.filter(l => l.currentStatus === 'Expired').length;
    const compPct = lics.length ? Math.round((valid / lics.length) * 100) : 0;
    
    const dAud = audLic.filter(a => a.department === d);
    const avgScore = dAud.length ? Math.round(dAud.reduce((a, b) => a + (parseFloat(b.complianceScore)||0), 0) / dAud.length) : '-';
    
    return {
      department: d,
      total: lics.length,
      valid, expiring, expired,
      compliance: compPct,
      auditScore: avgScore,
      status: compPct >= 90 ? 'Excellent' : compPct >= 70 ? 'Good' : 'Needs Review'
    };
  });

  // Export
  const exportToCSV = () => {
    const headers = ['Department', 'Total Licenses', 'Valid', 'Expiring', 'Expired', 'Compliance %', 'Audit Score', 'Status'];
    const csvRows = [headers.join(',')];
    tableData.forEach(row => {
      csvRows.push([row.department, row.total, row.valid, row.expiring, row.expired, row.compliance, row.auditScore, row.status].join(','));
    });
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Licenses_Registry_Report.csv';
    a.click();
  };

  const exportToPDF = () => alert('PDF export generated (placeholder).');
  const printReport = () => window.print();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Reports &amp; Analytics</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Comprehensive insights across all modules</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportToCSV} className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 text-[10px] font-bold hover:bg-slate-50">Export CSV</button>
          <button onClick={exportToPDF} className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 text-[10px] font-bold hover:bg-slate-50">Export PDF</button>
          <button onClick={printReport} style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }} className="px-3 py-1.5 rounded-lg text-white text-[10px] font-bold hover:brightness-95 shadow-sm">Print Report</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Licenses', value: totalLicenses, color: 'text-slate-800' },
          { label: 'Valid Licenses', value: validLicenses, color: 'text-emerald-600' },
          { label: 'Expiring Soon', value: expiringSoon, color: 'text-amber-600' },
          { label: 'Expired Licenses', value: expiredLicenses, color: 'text-rose-600' },
          { label: 'Renewal Compliance %', value: `${renewalCompliance}%`, color: 'text-indigo-600' },
          { label: 'Audit Compliance %', value: `${auditCompliance}%`, color: 'text-teal-600' },
          { label: 'CAPA Closure %', value: `${capaClosure}%`, color: 'text-blue-600' },
          { label: 'Overall License Compliance %', value: `${overallLicenseCompliance}%`, color: 'text-emerald-600' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[11px] font-bold text-slate-700 mb-4 uppercase tracking-wider">License Category Distribution</h4>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {categoryData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[11px] font-bold text-slate-700 mb-4 uppercase tracking-wider">Department-wise Licenses</h4>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} interval={0} angle={-45} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', fontSize: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[11px] font-bold text-slate-700 mb-4 uppercase tracking-wider">Monthly License Renewals</h4>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRenewals} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[11px] font-bold text-slate-700 mb-4 uppercase tracking-wider">License Expiry Trend</h4>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={expiryTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#f43f5e" fillOpacity={1} fill="url(#colorExp)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[11px] font-bold text-slate-700 mb-4 uppercase tracking-wider">Compliance Status Distribution</h4>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} innerRadius={0} outerRadius={80} dataKey="value">
                  {statusData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[11px] font-bold text-slate-700 mb-4 uppercase tracking-wider">Audit &amp; CAPA Trend</h4>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={auditCapaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line type="monotone" dataKey="Audits" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="CAPAs" stroke="#0ea5e9" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mt-6">
        <div className="p-4 border-b border-slate-200">
          <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Monthly Summary Table</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Department</th>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Total Licenses</th>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Valid</th>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Expiring</th>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Expired</th>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Compliance %</th>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Audit Score</th>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tableData.length === 0 ? (
                <tr><td colSpan="8" className="px-4 py-10 text-center text-slate-400">No data available</td></tr>
              ) : (
                tableData.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-semibold text-slate-700">{r.department}</td>
                    <td className="px-4 py-3 text-slate-600">{r.total}</td>
                    <td className="px-4 py-3 text-emerald-600 font-medium">{r.valid}</td>
                    <td className="px-4 py-3 text-amber-600 font-medium">{r.expiring}</td>
                    <td className="px-4 py-3 text-rose-600 font-medium">{r.expired}</td>
                    <td className="px-4 py-3 font-mono">{r.compliance}%</td>
                    <td className="px-4 py-3 font-mono">{r.auditScore}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${
                        r.status === 'Excellent' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        r.status === 'Good' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>{r.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function LicensesRegistryWorkspace() {
  const { hospital, navigateTo } = useHospital();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':    return <DashboardTab hospital={hospital} />;
      case 'hospital_lic': return <HospitalLicensesTab hospital={hospital} />;
      case 'reg_env':      return <RegEnvTab hospital={hospital} />;
      case 'equip_fac':    return <EquipFacTab hospital={hospital} />;
      case 'renewal':      return <RenewalTrackerTab hospital={hospital} />;
      case 'audit':        return <InternalAuditTab hospital={hospital} />;
      case 'reports':      return <ReportsTab hospital={hospital} />;
      default:             return <DashboardTab hospital={hospital} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigateTo && navigateTo('home')}
          className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ChevronLeft size={14} />
          Back
        </button>
        <span className="text-slate-300">|</span>
        <span className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">
          Licenses Registry
        </span>
      </div>

      <div className="bg-white border-b border-slate-200 px-4 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-3 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-400 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon size={12} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 max-w-7xl mx-auto">
        {renderTab()}
      </div>
    </div>
  );
}

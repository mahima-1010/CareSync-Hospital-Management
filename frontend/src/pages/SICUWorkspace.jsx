import React, { useState, useEffect } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  ChevronLeft,
  LayoutDashboard,
  BarChart3,
  Droplets,
  ShieldCheck,
  UserCheck,
  FileText,
  Plus,
  Edit3,
  Trash2,
  X,
  Search,
  Download,
  Printer,
  FileDown
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LS_KEY_QUALITY = 'sicu_quality_indicators';
const LS_KEY_BLOOD      = 'sicu_blood_management';
const LS_KEY_INFECTION  = 'sicu_infection_control';
const LS_KEY_PATIENT_SAFETY = 'sicu_patient_safety';

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
  adverseDrugReactions: 0,
  medicationErrors: 0,
  initialAssessmentTimeNurse: 0,
  initialAssessmentTimeDoctor: 0,
  vap: 0,
  cauti: 0,
  clabsi: 0,
  dischargeTime: 0,
  status: 'Active',
};

const SAMPLE_QUALITY_INDICATORS = [
  { id: 'sqsi-001', month: 'January',  year: 2025, patientDays: 280, falls: 2, adverseDrugReactions: 1, medicationErrors: 1, initialAssessmentTimeNurse: 8, initialAssessmentTimeDoctor: 15, vap: 0, cauti: 1, clabsi: 0, dischargeTime: 45, status: 'Active' },
  { id: 'sqsi-002', month: 'February', year: 2025, patientDays: 260, falls: 1, adverseDrugReactions: 0, medicationErrors: 2, initialAssessmentTimeNurse: 7, initialAssessmentTimeDoctor: 14, vap: 1, cauti: 0, clabsi: 1, dischargeTime: 48, status: 'Active' },
  { id: 'sqsi-003', month: 'March',    year: 2025, patientDays: 300, falls: 3, adverseDrugReactions: 2, medicationErrors: 0, initialAssessmentTimeNurse: 9, initialAssessmentTimeDoctor: 16, vap: 0, cauti: 1, clabsi: 0, dischargeTime: 42, status: 'Active' },
  { id: 'sqsi-004', month: 'April',    year: 2025, patientDays: 270, falls: 1, adverseDrugReactions: 1, medicationErrors: 1, initialAssessmentTimeNurse: 6, initialAssessmentTimeDoctor: 13, vap: 1, cauti: 0, clabsi: 0, dischargeTime: 50, status: 'Active' },
  { id: 'sqsi-005', month: 'May',      year: 2025, patientDays: 310, falls: 2, adverseDrugReactions: 0, medicationErrors: 1, initialAssessmentTimeNurse: 8, initialAssessmentTimeDoctor: 14, vap: 0, cauti: 1, clabsi: 1, dischargeTime: 44, status: 'Active' },
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
  { id: 'mwbl-001', month: 'January',  year: 2025, prbc: 12, sdp: 4, rdp: 2, ffp: 6, cryo: 1, bloodWastage: 1, transfusionReactions: 0, turnaroundTime: 45, status: 'Active' },
  { id: 'mwbl-002', month: 'February', year: 2025, prbc: 9,  sdp: 3, rdp: 1, ffp: 4, cryo: 0, bloodWastage: 0, transfusionReactions: 1, turnaroundTime: 50, status: 'Active' },
  { id: 'mwbl-003', month: 'March',    year: 2025, prbc: 15, sdp: 5, rdp: 3, ffp: 8, cryo: 2, bloodWastage: 2, transfusionReactions: 0, turnaroundTime: 42, status: 'Active' },
  { id: 'mwbl-004', month: 'April',    year: 2025, prbc: 10, sdp: 2, rdp: 0, ffp: 5, cryo: 0, bloodWastage: 0, transfusionReactions: 0, turnaroundTime: 38, status: 'Active' },
  { id: 'mwbl-005', month: 'May',      year: 2025, prbc: 18, sdp: 6, rdp: 4, ffp: 9, cryo: 3, bloodWastage: 1, transfusionReactions: 1, turnaroundTime: 55, status: 'Active' },
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
  { id: 'mwic-001', month: 'January',  year: 2025, patientDays: 620, cauti: 1, bloodstreamInfections: 0, ssi: 0, infectionRate: 0.16, status: 'Active' },
  { id: 'mwic-002', month: 'February', year: 2025, patientDays: 560, cauti: 0, bloodstreamInfections: 1, ssi: 1, infectionRate: 0.36, status: 'Active' },
  { id: 'mwic-003', month: 'March',    year: 2025, patientDays: 640, cauti: 1, bloodstreamInfections: 1, ssi: 0, infectionRate: 0.31, status: 'Active' },
  { id: 'mwic-004', month: 'April',    year: 2025, patientDays: 590, cauti: 0, bloodstreamInfections: 0, ssi: 0, infectionRate: 0.00, status: 'Active' },
  { id: 'mwic-005', month: 'May',      year: 2025, patientDays: 670, cauti: 0, bloodstreamInfections: 1, ssi: 1, infectionRate: 0.30, status: 'Active' },
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
  { id: 'mwps-001', month: 'January',  year: 2025, falls: 2, medicationErrors: 1, adverseDrugReactions: 0, initialAssessmentTime: 22, dischargeTime: 38, status: 'Active' },
  { id: 'mwps-002', month: 'February', year: 2025, falls: 1, medicationErrors: 2, adverseDrugReactions: 1, initialAssessmentTime: 25, dischargeTime: 42, status: 'Active' },
  { id: 'mwps-003', month: 'March',    year: 2025, falls: 3, medicationErrors: 0, adverseDrugReactions: 1, initialAssessmentTime: 20, dischargeTime: 35, status: 'Active' },
  { id: 'mwps-004', month: 'April',    year: 2025, falls: 0, medicationErrors: 1, adverseDrugReactions: 0, initialAssessmentTime: 23, dischargeTime: 40, status: 'Active' },
  { id: 'mwps-005', month: 'May',      year: 2025, falls: 2, medicationErrors: 3, adverseDrugReactions: 2, initialAssessmentTime: 27, dischargeTime: 44, status: 'Active' },
];

const TABS = [
  { id: 'dashboard',      label: 'Dashboard',          icon: LayoutDashboard },
  { id: 'quality',        label: 'Quality Indicators', icon: BarChart3       },
  { id: 'blood',          label: 'Blood Management',   icon: Droplets        },
  { id: 'infection',      label: 'Infection Control',  icon: ShieldCheck     },
  { id: 'patient-safety', label: 'Patient Safety',     icon: UserCheck       },
  { id: 'reports',        label: 'Reports',            icon: FileText        },
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
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">SICU Workspace</span>
      <h1 className="text-xl font-extrabold text-slate-900 mt-1">SICU — Clinical Quality &amp; Safety</h1>
      <p className="text-xs text-slate-500 mt-2 max-w-2xl leading-relaxed">
        Centralised workspace for monitoring SICU clinical quality indicators, blood
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
  const totalFalls    = qualityIndicators.reduce((s, r) => s + (r.falls || 0), 0);
  const totalMedErr   = qualityIndicators.reduce((s, r) => s + (r.medicationErrors || 0), 0);
  const totalVAP      = qualityIndicators.reduce((s, r) => s + (r.vap || 0), 0);
  const totalCLABSI   = qualityIndicators.reduce((s, r) => s + (r.clabsi || 0), 0);

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
          <p className="text-[9px] text-slate-400 mt-0.5">Monthly clinical quality metrics — SICU</p>
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
          { label: 'Falls',           value: totalFalls,    color: 'text-rose-600'   },
          { label: 'Medication Errors', value: totalMedErr,  color: 'text-amber-600'  },
          { label: 'VAP Cases',       value: totalVAP,      color: 'text-orange-600' },
          { label: 'CLABSI Cases',    value: totalCLABSI,   color: 'text-purple-600' },
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
                  'ADR', 'VAP', 'CAUTI', 'CLABSI',
                  'Assess (Nurse)', 'Assess (Dr)', 'Discharge (min)', 'Status', 'Actions',
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
                  <td className="px-3 py-3 text-orange-600 font-bold">{r.vap}</td>
                  <td className="px-3 py-3 text-orange-600 font-bold">{r.cauti}</td>
                  <td className="px-3 py-3 text-purple-600 font-bold">{r.clabsi}</td>
                  <td className="px-3 py-3 text-slate-600">{r.initialAssessmentTimeNurse}</td>
                  <td className="px-3 py-3 text-slate-600">{r.initialAssessmentTimeDoctor}</td>
                  <td className="px-3 py-3 text-slate-600">{r.dischargeTime}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE['Active']}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEditQuality(r)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-sky-600 transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuality(r.id)}
                        className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
                  <td colSpan={14} className="px-3 py-10 text-center text-[10px] text-slate-400">
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

/* ─── Blood Management tab ─── */
const BloodTab = ({
  hospital,
  bloodRecords,
  bloodSearch,
  setBloodSearch,
  handleOpenBloodModal,
  handleDeleteBlood,
}) => {
  const filtered = bloodRecords.filter((r) => {
    const q = bloodSearch.toLowerCase();
    return (
      r.month.toLowerCase().includes(q) ||
      String(r.year).includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalUnits    = bloodRecords.reduce((s, r) => s + (r.prbc || 0) + (r.sdp || 0) + (r.rdp || 0) + (r.ffp || 0) + (r.cryo || 0), 0);
  const totalPRBC     = bloodRecords.reduce((s, r) => s + (r.prbc || 0), 0);
  const totalFFP      = bloodRecords.reduce((s, r) => s + (r.ffp  || 0), 0);
  const totalWastage  = bloodRecords.reduce((s, r) => s + (r.bloodWastage || 0), 0);
  const wastageRate   = totalUnits > 0 ? ((totalWastage / totalUnits) * 100).toFixed(1) : '0.0';

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Blood ID', 'Month', 'PRBC', 'SDP', 'RDP', 'FFP', 'CRYO',
    'Blood Wastage', 'Transfusion Reactions', 'TAT (min)', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Blood Management Records</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Monthly blood product usage — SICU</p>
        </div>
        <button
          onClick={() => handleOpenBloodModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Blood Record
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Blood Units',  value: totalUnits,         color: 'text-blue-600'   },
          { label: 'PRBC Units',         value: totalPRBC,          color: 'text-rose-600'   },
          { label: 'FFP Units',          value: totalFFP,           color: 'text-indigo-600' },
          { label: 'Blood Wastage %',    value: `${wastageRate}%`,  color: 'text-amber-600'  },
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
          value={bloodSearch}
          onChange={(e) => setBloodSearch(e.target.value)}
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
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.prbc}</td>
                  <td className="px-3 py-3 text-slate-600">{r.sdp}</td>
                  <td className="px-3 py-3 text-slate-600">{r.rdp}</td>
                  <td className="px-3 py-3 text-indigo-600 font-bold">{r.ffp}</td>
                  <td className="px-3 py-3 text-slate-600">{r.cryo}</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.bloodWastage}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${
                      r.transfusionReactions > 0
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {r.transfusionReactions}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-600">{r.turnaroundTime} min</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Active}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenBloodModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteBlood(r.id)}
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
                    {bloodSearch ? 'No records match your search.' : 'No blood records yet. Click "Add Blood Record" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {bloodRecords.length} record{bloodRecords.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─── Infection Control tab ─── */
const InfectionTab = ({
  hospital,
  infectionRecords,
  infectionSearch,
  setInfectionSearch,
  handleOpenInfectionModal,
  handleDeleteInfection,
}) => {
  const filtered = infectionRecords.filter((r) => {
    const q = infectionSearch.toLowerCase();
    return (
      r.month.toLowerCase().includes(q) ||
      String(r.year).includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalCases  = infectionRecords.reduce((s, r) => s + (r.cauti || 0) + (r.bloodstreamInfections || 0) + (r.ssi || 0), 0);
  const totalCAUTI  = infectionRecords.reduce((s, r) => s + (r.cauti || 0), 0);
  const totalBSI    = infectionRecords.reduce((s, r) => s + (r.bloodstreamInfections || 0), 0);
  const totalDays   = infectionRecords.reduce((s, r) => s + (r.patientDays || 0), 0);
  const overallRate = totalDays > 0 ? ((totalCases / totalDays) * 1000).toFixed(2) : '0.00';

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Infection ID', 'Month', 'Patient Days', 'CAUTI',
    'Bloodstream Inf.', 'SSI', 'Infection Rate', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Infection Control Records</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Monthly HAI surveillance — SICU</p>
        </div>
        <button
          onClick={() => handleOpenInfectionModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Infection Record
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Infection Cases',       value: totalCases,           color: 'text-rose-600'   },
          { label: 'CAUTI Cases',                 value: totalCAUTI,           color: 'text-orange-600' },
          { label: 'Bloodstream Inf. Cases',      value: totalBSI,             color: 'text-purple-600' },
          { label: 'Infection Rate (per 1000)',   value: overallRate,          color: 'text-amber-600'  },
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
          value={infectionSearch}
          onChange={(e) => setInfectionSearch(e.target.value)}
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
              {filtered.map((r) => {
                const total = (r.cauti || 0) + (r.bloodstreamInfections || 0) + (r.ssi || 0);
                const rate  = r.patientDays > 0 ? ((total / r.patientDays) * 1000).toFixed(2) : '0.00';
                return (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700 whitespace-nowrap">{r.month} {r.year}</td>
                    <td className="px-3 py-3 text-slate-600">{r.patientDays}</td>
                    <td className="px-3 py-3 text-orange-600 font-bold">{r.cauti}</td>
                    <td className="px-3 py-3 text-purple-600 font-bold">{r.bloodstreamInfections}</td>
                    <td className="px-3 py-3 text-rose-600 font-bold">{r.ssi}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${
                        parseFloat(rate) > 1
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : parseFloat(rate) > 0
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {rate}
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
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">
                    {infectionSearch ? 'No records match your search.' : 'No infection records yet. Click "Add Infection Record" to begin.'}
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

/* ─── Patient Safety tab ─── */
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
          <p className="text-[9px] text-slate-400 mt-0.5">Monthly safety incidents — SICU</p>
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
  const totalClabsi = infectionRecords.reduce((sum, r) => sum + (r.bloodstreamInfections || 0), 0) + qualityIndicators.reduce((sum, r) => sum + (r.clabsi || 0), 0);
  const totalVap = qualityIndicators.reduce((sum, r) => sum + (r.vap || 0), 0);
  const totalAdr = qualityIndicators.reduce((sum, r) => sum + (r.adverseDrugReactions || 0), 0) + patientSafetyRecords.reduce((sum, r) => sum + (r.adverseDrugReactions || 0), 0);
  
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
    const vap = (q.vap || 0);
    const cauti = (q.cauti || 0) + (i.cauti || 0);
    const clabsi = (q.clabsi || 0) + (i.bloodstreamInfections || 0);
    const bloodUnits = (b.prbc || 0) + (b.sdp || 0) + (b.rdp || 0) + (b.ffp || 0) + (b.cryo || 0);
    const bloodWastage = b.bloodWastage || 0;

    return {
      month,
      falls,
      medErrs,
      vap,
      cauti,
      clabsi,
      bloodUnits,
      bloodWastage,
      status: q.status || b.status || i.status || p.status || 'Inactive'
    };
  }).filter(d => d.falls > 0 || d.medErrs > 0 || d.vap > 0 || d.cauti > 0 || d.clabsi > 0 || d.bloodUnits > 0 || d.bloodWastage > 0);

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
          <p className="text-[9px] text-slate-400 mt-0.5">Comprehensive overview of SICU performance</p>
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
          { label: 'Falls', value: totalFalls, color: 'text-orange-600' },
          { label: 'Total Medication Errors', value: totalMedErrs, color: 'text-amber-600' },
          { label: 'Total VAP Cases', value: totalVap, color: 'text-red-600' },
          { label: 'Total CLABSI Cases', value: totalClabsi, color: 'text-indigo-600' },
          { label: 'ADR Cases', value: totalAdr, color: 'text-pink-600' },
          { label: 'Blood Wastage', value: `${wastagePercent}%`, color: 'text-slate-600' },
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
                <Line type="monotone" dataKey="vap" name="VAP" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="clabsi" name="CLABSI" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
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
                 {['Month', 'Falls', 'Med Errors', 'VAP', 'CAUTI', 'CLABSI', 'Blood Units', 'Blood Wastage', 'Status'].map(h => (
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
                  <td className="px-3 py-3 font-bold text-red-600">{row.vap}</td>
                  <td className="px-3 py-3 font-bold text-orange-600">{row.cauti}</td>
                  <td className="px-3 py-3 font-bold text-purple-600">{row.clabsi}</td>
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
const SICUWorkspace = ({ onBack }) => {
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

  /* ── Quality Indicators handlers ── */
  const getNextQualityId = () => {
    const maxNum = qualityIndicators.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `mwqi-${String(maxNum + 1).padStart(3, '0')}`;
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
    return `mwbl-${String(maxNum + 1).padStart(3, '0')}`;
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
    return `mwic-${String(maxNum + 1).padStart(3, '0')}`;
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
    return `mwps-${String(maxNum + 1).padStart(3, '0')}`;
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
      case 'blood':
        return (
          <BloodTab
            hospital={hospital}
            bloodRecords={bloodRecords}
            bloodSearch={bloodSearch}
            setBloodSearch={setBloodSearch}
            handleOpenBloodModal={handleOpenBloodModal}
            handleDeleteBlood={handleDeleteBlood}
          />
        );
      case 'infection':
        return (
          <InfectionTab
            hospital={hospital}
            infectionRecords={infectionRecords}
            infectionSearch={infectionSearch}
            setInfectionSearch={setInfectionSearch}
            handleOpenInfectionModal={handleOpenInfectionModal}
            handleDeleteInfection={handleDeleteInfection}
          />
        );
      case 'patient-safety':
        return (
          <PatientSafetyTab
            hospital={hospital}
            patientSafetyRecords={patientSafetyRecords}
            patientSafetySearch={patientSafetySearch}
            setPatientSafetySearch={setPatientSafetySearch}
            handleOpenPatientSafetyModal={handleOpenPatientSafetyModal}
            handleDeletePatientSafety={handleDeletePatientSafety}
          />
        );
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
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">SICU</h2>
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
            SICU — NABH Module
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
                <p className="text-[9px] text-slate-400 mt-0.5">SICU — NABH Clinical Quality</p>
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
                <NumField label="Patient Days" field="patientDays" form={qualityForm} setForm={setQualityForm} />
              </div>

              {/* Assessment Times */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">
                  Assessment Times
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Initial Assessment – Nurse (min)" field="initialAssessmentTimeNurse" form={qualityForm} setForm={setQualityForm} />
                  <NumField label="Initial Assessment – Doctor (min)" field="initialAssessmentTimeDoctor" form={qualityForm} setForm={setQualityForm} />
                </div>
              </div>

              {/* Patient Safety & Outcomes */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">
                  Patient Safety &amp; Outcomes
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <NumField label="Falls"                field="falls"                form={qualityForm} setForm={setQualityForm} />
                  <NumField label="Medication Errors"     field="medicationErrors"    form={qualityForm} setForm={setQualityForm} />
                  <NumField label="Adverse Drug Reactions" field="adverseDrugReactions" form={qualityForm} setForm={setQualityForm} />
                </div>
              </div>

              {/* Infection Control */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">
                  Infection Control
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <NumField label="VAP Cases"         field="vap"     form={qualityForm} setForm={setQualityForm} />
                  <NumField label="CAUTI Cases"       field="cauti"   form={qualityForm} setForm={setQualityForm} />
                  <NumField label="CLABSI / BSI"      field="clabsi"  form={qualityForm} setForm={setQualityForm} />
                </div>
              </div>

              {/* Discharge */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">
                  Discharge
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Discharge Time (min)" field="dischargeTime" form={qualityForm} setForm={setQualityForm} />
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
                <p className="text-[9px] text-slate-400 mt-0.5">SICU — Blood Product Usage</p>
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
                <p className="text-[9px] text-slate-400 mt-0.5">SICU — HAI Surveillance</p>
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
                <p className="text-[9px] text-slate-400 mt-0.5">SICU — Patient Safety Events</p>
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
    </div>
  );
};

export default SICUWorkspace;

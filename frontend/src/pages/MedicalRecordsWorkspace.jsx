import React from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  ChevronLeft,
  LayoutDashboard,
  Users,
  FileText,
  ClipboardCheck,
  Wrench,
  Search,
  BarChart3,
  Plus,
  Edit3,
  Trash2,
  X,
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

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patient_records', label: 'Patient Records', icon: Users },
  { id: 'clinical_documentation', label: 'Clinical Documentation', icon: FileText },
  { id: 'record_quality', label: 'Medical Record Quality', icon: ClipboardCheck },
  { id: 'record_management', label: 'Record Management', icon: Wrench },
  { id: 'audit', label: 'Internal Audit', icon: Search },
  { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
];

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];

const STATUS_BADGE_SUMMARY = {
  Good: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Watch: 'bg-amber-50 text-amber-700 border-amber-200',
  Critical: 'bg-rose-50 text-rose-700 border-rose-200',
};

const kpiCards = [
  { label: 'Total Medical Records', value: '12,847', color: 'text-blue-600' },
  { label: 'Active Inpatient Records', value: '1,245', color: 'text-emerald-600' },
  { label: 'Outpatient Records', value: '8,392', color: 'text-sky-600' },
  { label: 'Emergency Records', value: '3,210', color: 'text-violet-600' },
  { label: 'Documentation Compliance %', value: '92%', color: 'text-teal-600' },
  { label: 'Pending Discharge Summaries', value: '67', color: 'text-amber-600' },
  { label: 'Audit Compliance %', value: '94%', color: 'text-indigo-600' },
  { label: 'Overall Medical Record Compliance %', value: '90%', color: 'text-rose-600' },
];

const patientRecordDistributionData = [
  { name: 'Inpatient', value: 1245 },
  { name: 'Outpatient', value: 8392 },
  { name: 'Emergency', value: 3210 },
];

const departmentWiseRecordsData = [
  { name: 'Cardiology', records: 1240 },
  { name: 'Neurology', records: 980 },
  { name: 'Orthopaedics', records: 1050 },
  { name: 'Pediatrics', records: 1120 },
  { name: 'Emergency', records: 1340 },
  { name: 'ICU', records: 890 },
];

const monthlyAdmissionsData = [
  { name: 'Jan', admissions: 820 },
  { name: 'Feb', admissions: 750 },
  { name: 'Mar', admissions: 910 },
  { name: 'Apr', admissions: 880 },
  { name: 'May', admissions: 970 },
  { name: 'Jun', admissions: 1020 },
];

const documentationComplianceData = [
  { name: 'Jan', compliance: 88 },
  { name: 'Feb', compliance: 89 },
  { name: 'Mar', compliance: 90 },
  { name: 'Apr', compliance: 91 },
  { name: 'May', compliance: 92 },
  { name: 'Jun', compliance: 92 },
];

const medicalRecordStatusData = [
  { name: 'Complete', value: 11200 },
  { name: 'Incomplete', value: 890 },
  { name: 'Pending Review', value: 757 },
];

const auditComplianceData = [
  { name: 'Jan', compliance: 90 },
  { name: 'Feb', compliance: 91 },
  { name: 'Mar', compliance: 92 },
  { name: 'Apr', compliance: 93 },
  { name: 'May', compliance: 94 },
  { name: 'Jun', compliance: 94 },
];

const monthlySummaryData = [
  { department: 'Cardiology', totalRecords: 1240, documentationPct: 94, pendingRecords: 32, completedRecords: 1108, auditPct: 96, status: 'Good' },
  { department: 'Neurology', totalRecords: 980, documentationPct: 91, pendingRecords: 45, completedRecords: 882, auditPct: 93, status: 'Good' },
  { department: 'Orthopaedics', totalRecords: 1050, documentationPct: 89, pendingRecords: 58, completedRecords: 942, auditPct: 90, status: 'Watch' },
  { department: 'Pediatrics', totalRecords: 1120, documentationPct: 93, pendingRecords: 28, completedRecords: 1032, auditPct: 95, status: 'Good' },
  { department: 'Emergency', totalRecords: 1340, documentationPct: 87, pendingRecords: 72, completedRecords: 1198, auditPct: 88, status: 'Watch' },
  { department: 'ICU', totalRecords: 890, documentationPct: 96, pendingRecords: 15, completedRecords: 854, auditPct: 97, status: 'Good' },
];

const PlaceholderTab = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[320px] bg-white border border-slate-200 rounded-2xl shadow-sm p-10 text-center">
    <span className="text-3xl mb-4">🚧</span>
    <h2 className="text-base font-extrabold text-slate-800 mb-2">{title}</h2>
    <p className="text-xs text-slate-400 font-medium">
      This module will be implemented in the next phase.
    </p>
  </div>
);

const DashboardTab = ({ hospital }) => (
  <div className="space-y-5">
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Medical Records Workspace</span>
      <h1 className="text-xl font-extrabold text-slate-900 mt-1">Medical Records — Dashboard</h1>
      <p className="text-xs text-slate-500 mt-2 max-w-2xl leading-relaxed">
        Centralised hospital medical record management system for patient records, clinical documentation,
        record quality assurance, and internal audit in alignment with NABH standards.
      </p>
    </div>

    <div>
      <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">Key Performance Indicators</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpiCards.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{kpi.label}</span>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">Analytics &amp; Trends</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Patient Record Distribution</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={patientRecordDistributionData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                  {patientRecordDistributionData.map((entry, index) => (
                    <Cell key={`cell-prd-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '9px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Department-wise Medical Records</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentWiseRecordsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Bar dataKey="records" fill={hospital?.themeColor || '#3b82f6'} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Monthly Patient Admissions</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyAdmissionsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="admissions" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Documentation Compliance Trend</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={documentationComplianceData}>
                <defs>
                  <linearGradient id="docGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} domain={[80, 100]} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="compliance" stroke="#10b981" strokeWidth={2.5} fill="url(#docGrad)" dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Medical Record Status</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={medicalRecordStatusData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                  {medicalRecordStatusData.map((entry, index) => (
                    <Cell key={`cell-mrs-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '9px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Audit Compliance Trend</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={auditComplianceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} domain={[80, 100]} />
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
        <h3 className="text-xs font-bold text-slate-800">Monthly Medical Record Summary</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['Department', 'Total Records', 'Documentation %', 'Pending Records', 'Completed Records', 'Audit %', 'Status'].map((h) => (
                <th key={h} className="px-4 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {monthlySummaryData.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-4 py-2 font-semibold text-slate-700">{row.department}</td>
                <td className="px-4 py-2 text-slate-600">{row.totalRecords}</td>
                <td className="px-4 py-2 text-emerald-600 font-bold">{row.documentationPct}%</td>
                <td className="px-4 py-2 text-amber-600 font-bold">{row.pendingRecords}</td>
                <td className="px-4 py-2 text-blue-600 font-bold">{row.completedRecords}</td>
                <td className="px-4 py-2 text-violet-600 font-bold">{row.auditPct}%</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_SUMMARY[row.status] || STATUS_BADGE_SUMMARY.Good}`}>{row.status}</span>
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
   PHASE 3 — CLINICAL DOCUMENTATION CONSTANTS & SEED DATA
   ============================================================ */

const computeDocKpis = (assessments, consents, summaries) => {
  const totalAssessments = assessments.length;
  const totalConsents = consents.length;
  const totalSummaries = summaries.length;
  const activeConsents = consents.filter(c => c.consentStatus === 'Active').length;
  const completedSummaries = summaries.filter(s => s.summaryStatus === 'Completed').length;
  const pendingSummaries = summaries.filter(s => s.summaryStatus === 'Pending' || s.summaryStatus === 'Delayed').length;
  return [
    { label: 'Total Assessments', value: totalAssessments, color: 'text-blue-600' },
    { label: 'Active Consents', value: activeConsents, color: 'text-emerald-600' },
    { label: 'Total Consents', value: totalConsents, color: 'text-sky-600' },
    { label: 'Discharge Summaries', value: totalSummaries, color: 'text-violet-600' },
    { label: 'Completed Summaries', value: completedSummaries, color: 'text-teal-600' },
    { label: 'Pending Summaries', value: pendingSummaries, color: 'text-amber-600' },
    { label: 'Documentation Compliance %', value: `${totalAssessments ? Math.round((totalAssessments / totalAssessments) * 100) : 0}%`, color: 'text-indigo-600' },
    { label: 'Consent Compliance %', value: `${totalConsents ? Math.round((activeConsents / totalConsents) * 100) : 0}%`, color: 'text-rose-600' },
  ];
};

const ASSESSMENT_TYPES = ['General', 'Surgical', 'Neurological', 'Cardiac', 'Orthopaedic', 'Pediatric', 'Obstetric', 'Psychiatric'];
const ASSESSMENT_CATEGORIES = ['New Patient', 'Follow-up', 'Pre-operative', 'Post-operative', 'Emergency', 'Transfer'];
const NUTRITIONAL_STATUSES = ['Normal', 'Malnourished', 'Obese', 'Underweight'];
const RISK_LEVELS = ['Low', 'Medium', 'High', 'Critical'];
const DISCHARGE_TYPES = ['Routine', 'LAMA', 'Absconded', 'Transferred', 'Expired'];
const DISCHARGE_CONDITIONS = ['Improved', 'Unchanged', 'Deteriorated'];
const CONSENT_TYPES = ['General Consent', 'Surgical Consent', 'Anesthesia Consent', 'Procedure Consent', 'Research Consent', 'Blood Transfusion Consent', 'High-risk Consent'];
const CONSENT_STATUSES = ['Active', 'Expired', 'Revoked', 'Pending'];
const WITNESS_ROLES = ['Nurse', 'Relative', 'Staff', 'Volunteer'];

const EMPTY_ASSESSMENT = {
  id: '', patientId: '', uhID: '', patientName: '', department: '', consultant: '', admissionDate: '',
  assessmentType: 'General', category: 'New Patient', presentingComplaints: '', vitalSigns: '',
  physicalExamination: '', provisionalDiagnosis: '', treatmentPlan: '', coMorbidities: '', allergies: '',
  nutritionalStatus: 'Normal', riskLevel: 'Medium', assessmentDate: '', assessedBy: '', remarks: '',
};

const EMPTY_CONSENT = {
  id: '', patientId: '', uhID: '', patientName: '', department: '', consultant: '',
  consentType: 'General Consent', procedureName: '', consentDate: '', expiryDate: '',
  consentStatus: 'Active', witnessName: '', witnessRole: 'Nurse', consentDocumentUrl: '',
  patientSignature: true, doctorSignature: true, remarks: '',
};

const EMPTY_SUMMARY = {
  id: '', patientId: '', uhID: '', patientName: '', department: '', consultant: '',
  admissionDate: '', dischargeDate: '', primaryDiagnosis: '', summaryPreparedDate: '',
  dischargeType: 'Routine', dischargeCondition: 'Improved', summaryStatus: 'Pending',
  tatDays: '', preparedBy: '', reviewedBy: '', remarks: '',
};

const SEED_ASSESSMENTS = [
  { id: 'as-001', patientId: 'ip-001', uhID: 'UHID-000001', patientName: 'Rajesh Kumar', department: 'Cardiology', consultant: 'Dr. Arvind Menon', admissionDate: '2026-06-28', assessmentType: 'Cardiac', category: 'New Patient', presentingComplaints: 'Chest pain, dyspnoea', vitalSigns: 'BP 140/90, HR 88', physicalExamination: 'HEART: S1 S2 normal, no murmurs', provisionalDiagnosis: 'Acute MI', treatmentPlan: 'PTCA planned', coMorbidities: 'HTN, DM', allergies: 'NKDA', nutritionalStatus: 'Normal', riskLevel: 'High', assessmentDate: '2026-06-28', assessedBy: 'Dr. Arvind Menon', remarks: 'High-risk cardiac patient.' },
  { id: 'as-002', patientId: 'ip-002', uhID: 'UHID-000002', patientName: 'Meena Nair', department: 'Neurology', consultant: 'Dr. Priya Nair', admissionDate: '2026-07-01', assessmentType: 'Neurological', category: 'New Patient', presentingComplaints: 'Sudden weakness RHS, slurred speech', vitalSigns: 'BP 160/95, HR 76', physicalExamination: 'GCS 15, RHS hemiparesis', provisionalDiagnosis: 'Ischemic Stroke', treatmentPlan: 'Thrombolysis', coMorbidities: 'HTN', allergies: 'Penicillin', nutritionalStatus: 'Normal', riskLevel: 'High', assessmentDate: '2026-07-01', assessedBy: 'Dr. Priya Nair', remarks: 'Window period within 4.5 hrs.' },
  { id: 'as-003', patientId: 'ip-003', uhID: 'UHID-000003', patientName: 'Suresh Babu', department: 'Orthopaedics', consultant: 'Dr. Suresh Pillai', admissionDate: '2026-06-30', assessmentType: 'Orthopaedic', category: 'Pre-operative', presentingComplaints: 'Right hip pain after fall', vitalSigns: 'BP 130/80, HR 72', physicalExamination: 'Right hip deformity, shortened', provisionalDiagnosis: 'Femoral Neck Fracture', treatmentPlan: 'Hemiarthroplasty', coMorbidities: 'None', allergies: 'NKDA', nutritionalStatus: 'Normal', riskLevel: 'Medium', assessmentDate: '2026-06-30', assessedBy: 'Dr. Suresh Pillai', remarks: 'Pre-op optimisation done.' },
  { id: 'as-004', patientId: 'ip-004', uhID: 'UHID-000004', patientName: 'Anitha Reddy', department: 'Pediatrics', consultant: 'Dr. Karthik Reddy', admissionDate: '2026-07-05', assessmentType: 'Pediatric', category: 'New Patient', presentingComplaints: 'High fever, rash, abdominal pain', vitalSigns: 'BP 100/60, HR 110', physicalExamination: 'Petechiae, hepatomegaly', provisionalDiagnosis: 'Dengue with Warning Signs', treatmentPlan: 'IV fluids, monitoring', coMorbidities: 'None', allergies: 'NKDA', nutritionalStatus: 'Underweight', riskLevel: 'High', assessmentDate: '2026-07-05', assessedBy: 'Dr. Karthik Reddy', remarks: 'Close monitoring for bleeding.' },
  { id: 'as-005', patientId: 'ip-005', uhID: 'UHID-000005', patientName: 'Joseph Mathew', department: 'Cardiology', consultant: 'Dr. Arvind Menon', admissionDate: '2026-07-03', assessmentType: 'Cardiac', category: 'New Patient', presentingComplaints: 'Dyspnoea, orthopnoea, pedal oedema', vitalSigns: 'BP 120/70, HR 98', physicalExamination: 'Bibasilar crepitations, raised JVP', provisionalDiagnosis: 'Congestive Heart Failure', treatmentPlan: 'Diuretics, ACE inhibitors', coMorbidities: 'HTN, DM', allergies: 'Sulpha drugs', nutritionalStatus: 'Obese', riskLevel: 'High', assessmentDate: '2026-07-03', assessedBy: 'Dr. Arvind Menon', remarks: 'EF 35%. Optimise diuresis.' },
  { id: 'as-006', patientId: 'ip-006', uhID: 'UHID-000006', patientName: 'Lakshmi Devi', department: 'Neurology', consultant: 'Dr. Priya Nair', admissionDate: '2026-07-06', assessmentType: 'Neurological', category: 'Emergency', presentingComplaints: 'Recurrent seizures, unconscious', vitalSigns: 'BP 150/90, HR 110', physicalExamination: 'GCS 8, pupils equal', provisionalDiagnosis: 'Status Epilepticus', treatmentPlan: 'Loading dose AED, ICU', coMorbidities: 'Epilepsy', allergies: 'NKDA', nutritionalStatus: 'Normal', riskLevel: 'Critical', assessmentDate: '2026-07-06', assessedBy: 'Dr. Priya Nair', remarks: 'Airway protection required.' },
  { id: 'as-007', patientId: 'ip-007', uhID: 'UHID-000007', patientName: 'Vikram Singh', department: 'Orthopaedics', consultant: 'Dr. Suresh Pillai', admissionDate: '2026-07-02', assessmentType: 'Orthopaedic', category: 'Emergency', presentingComplaints: 'Open wound right leg, deformity', vitalSigns: 'BP 110/70, HR 100', physicalExamination: 'Compound fracture tibia', provisionalDiagnosis: 'Open Tibial Fracture', treatmentPlan: 'Debridement, external fixation', coMorbidities: 'None', allergies: 'NKDA', nutritionalStatus: 'Normal', riskLevel: 'High', assessmentDate: '2026-07-02', assessedBy: 'Dr. Suresh Pillai', remarks: 'Tetanus prophylaxis given.' },
  { id: 'as-008', patientId: 'ip-008', uhID: 'UHID-000008', patientName: 'Fatima Begum', department: 'Pediatrics', consultant: 'Dr. Karthik Reddy', admissionDate: '2026-07-04', assessmentType: 'Pediatric', category: 'New Patient', presentingComplaints: 'Fever, cough, breathlessness', vitalSigns: 'BP 90/60, HR 120', physicalExamination: 'Crepitations bilaterally', provisionalDiagnosis: 'Pneumonia', treatmentPlan: 'IV antibiotics, oxygen', coMorbidities: 'Asthma', allergies: 'NKDA', nutritionalStatus: 'Underweight', riskLevel: 'Medium', assessmentDate: '2026-07-04', assessedBy: 'Dr. Karthik Reddy', remarks: 'Responding to treatment.' },
  { id: 'as-009', patientId: 'ip-009', uhID: 'UHID-000009', patientName: 'Ravi Shankar', department: 'Cardiology', consultant: 'Dr. Arvind Menon', admissionDate: '2026-07-08', assessmentType: 'Cardiac', category: 'New Patient', presentingComplaints: 'Chest pain, sweating', vitalSigns: 'BP 140/90, HR 90', physicalExamination: 'S3 gallop, pulmonary oedema', provisionalDiagnosis: 'Unstable Angina', treatmentPlan: 'Coronary angiography', coMorbidities: 'HTN, DM, Smoking', allergies: 'NKDA', nutritionalStatus: 'Obese', riskLevel: 'Critical', assessmentDate: '2026-07-08', assessedBy: 'Dr. Arvind Menon', remarks: 'High-risk ACS. Monitor closely.' },
  { id: 'as-010', patientId: 'op-001', uhID: 'UHID-000101', patientName: 'Arun Gopal', department: 'General Medicine', consultant: 'Dr. Fatima Sheikh', admissionDate: '2026-07-10', assessmentType: 'General', category: 'New Patient', presentingComplaints: 'Fever, body ache, sore throat', vitalSigns: 'BP 110/70, HR 88', physicalExamination: 'Pharyngeal erythema', provisionalDiagnosis: 'Viral Fever', treatmentPlan: 'Symptomatic, rest', coMorbidities: 'None', allergies: 'NKDA', nutritionalStatus: 'Normal', riskLevel: 'Low', assessmentDate: '2026-07-10', assessedBy: 'Dr. Fatima Sheikh', remarks: 'Self-limiting illness.' },
];

const SEED_CONSENTS = [
  { id: 'cn-001', patientId: 'ip-001', uhID: 'UHID-000001', patientName: 'Rajesh Kumar', department: 'Cardiology', consultant: 'Dr. Arvind Menon', consentType: 'Surgical Consent', procedureName: 'PTCA', consentDate: '2026-06-28', expiryDate: '2026-07-28', consentStatus: 'Active', witnessName: 'Nurse Lakshmi', witnessRole: 'Nurse', consentDocumentUrl: '/consents/cn-001.pdf', patientSignature: true, doctorSignature: true, remarks: 'Consent obtained before PTCA.' },
  { id: 'cn-002', patientId: 'ip-002', uhID: 'UHID-000002', patientName: 'Meena Nair', department: 'Neurology', consultant: 'Dr. Priya Nair', consentType: 'Procedure Consent', procedureName: 'Thrombolysis', consentDate: '2026-07-01', expiryDate: '2026-07-31', consentStatus: 'Active', witnessName: 'Nurse Priya', witnessRole: 'Nurse', consentDocumentUrl: '/consents/cn-002.pdf', patientSignature: true, doctorSignature: true, remarks: 'Thrombolysis consent obtained.' },
  { id: 'cn-003', patientId: 'ip-003', uhID: 'UHID-000003', patientName: 'Suresh Babu', department: 'Orthopaedics', consultant: 'Dr. Suresh Pillai', consentType: 'Surgical Consent', procedureName: 'Hemiarthroplasty', consentDate: '2026-06-30', expiryDate: '2026-07-30', consentStatus: 'Active', witnessName: 'Nurse Anitha', witnessRole: 'Nurse', consentDocumentUrl: '/consents/cn-003.pdf', patientSignature: true, doctorSignature: true, remarks: 'Surgical consent for hip surgery.' },
  { id: 'cn-004', patientId: 'ip-004', uhID: 'UHID-000004', patientName: 'Anitha Reddy', department: 'Pediatrics', consultant: 'Dr. Karthik Reddy', consentType: 'General Consent', procedureName: 'IV Fluid Therapy', consentDate: '2026-07-05', expiryDate: '2026-08-04', consentStatus: 'Active', witnessName: 'Nurse Bindu', witnessRole: 'Nurse', consentDocumentUrl: '/consents/cn-004.pdf', patientSignature: true, doctorSignature: true, remarks: 'Guardian consent obtained.' },
  { id: 'cn-005', patientId: 'ip-005', uhID: 'UHID-000005', patientName: 'Joseph Mathew', department: 'Cardiology', consultant: 'Dr. Arvind Menon', consentType: 'Procedure Consent', procedureName: 'Right Heart Catheterisation', consentDate: '2026-07-03', expiryDate: '2026-07-03', consentStatus: 'Expired', witnessName: 'Nurse Kavya', witnessRole: 'Nurse', consentDocumentUrl: '/consents/cn-005.pdf', patientSignature: true, doctorSignature: true, remarks: 'Consent expired; renewed.' },
  { id: 'cn-006', patientId: 'ip-006', uhID: 'UHID-000006', patientName: 'Lakshmi Devi', department: 'Neurology', consultant: 'Dr. Priya Nair', consentType: 'High-risk Consent', procedureName: 'Intubation & Mechanical Ventilation', consentDate: '2026-07-06', expiryDate: '2026-08-05', consentStatus: 'Active', witnessName: 'Nurse Sudeep', witnessRole: 'Nurse', consentDocumentUrl: '/consents/cn-006.pdf', patientSignature: false, doctorSignature: true, remarks: 'Relative consent pending.' },
  { id: 'cn-007', patientId: 'ip-007', uhID: 'UHID-000007', patientName: 'Vikram Singh', department: 'Orthopaedics', consultant: 'Dr. Suresh Pillai', consentType: 'Surgical Consent', procedureName: 'Debridement & External Fixation', consentDate: '2026-07-02', expiryDate: '2026-08-01', consentStatus: 'Active', witnessName: 'Nurse Ravi', witnessRole: 'Nurse', consentDocumentUrl: '/consents/cn-007.pdf', patientSignature: true, doctorSignature: true, remarks: 'Emergency consent taken.' },
  { id: 'cn-008', patientId: 'ip-008', uhID: 'UHID-000008', patientName: 'Fatima Begum', department: 'Pediatrics', consultant: 'Dr. Karthik Reddy', consentType: 'Procedure Consent', procedureName: 'Lumbar Puncture', consentDate: '2026-07-04', expiryDate: '2026-07-04', consentStatus: 'Expired', witnessName: 'Nurse Thomas', witnessRole: 'Nurse', consentDocumentUrl: '/consents/cn-008.pdf', patientSignature: true, doctorSignature: true, remarks: 'Consent expired; not renewed.' },
  { id: 'cn-009', patientId: 'ip-009', uhID: 'UHID-000009', patientName: 'Ravi Shankar', department: 'Cardiology', consultant: 'Dr. Arvind Menon', consentType: 'High-risk Consent', procedureName: 'Coronary Angiography', consentDate: '2026-07-08', expiryDate: '2026-08-07', consentStatus: 'Active', witnessName: 'Nurse Jyothi', witnessRole: 'Nurse', consentDocumentUrl: '/consents/cn-009.pdf', patientSignature: true, doctorSignature: true, remarks: 'High-risk consent obtained.' },
  { id: 'cn-010', patientId: 'em-001', uhID: 'UHID-000201', patientName: 'Sanjay Verma', department: 'Emergency Medicine', consultant: 'Dr. Kavya Menon', consentType: 'General Consent', procedureName: 'Emergency Treatment', consentDate: '2026-07-10', expiryDate: '2026-08-09', consentStatus: 'Active', witnessName: 'Nurse Amit', witnessRole: 'Nurse', consentDocumentUrl: '/consents/cn-010.pdf', patientSignature: false, doctorSignature: true, remarks: 'Unconscious; relative consent awaited.' },
];

const SEED_SUMMARIES = [
  { id: 'ds-001', patientId: 'ip-001', uhID: 'UHID-000001', patientName: 'Rajesh Kumar', department: 'Cardiology', consultant: 'Dr. Arvind Menon', admissionDate: '2026-06-28', dischargeDate: '2026-07-04', primaryDiagnosis: 'Acute Myocardial Infarction', summaryPreparedDate: '2026-07-04', dischargeType: 'Routine', dischargeCondition: 'Improved', summaryStatus: 'Completed', tatDays: 0, preparedBy: 'Dr. Arvind Menon', reviewedBy: 'Dr. Karthik Reddy', remarks: 'Discharged in stable condition.' },
  { id: 'ds-002', patientId: 'ip-002', uhID: 'UHID-000002', patientName: 'Meena Nair', department: 'Neurology', consultant: 'Dr. Priya Nair', admissionDate: '2026-07-01', dischargeDate: '2026-07-08', primaryDiagnosis: 'Ischemic Stroke', summaryPreparedDate: '2026-07-08', dischargeType: 'Routine', dischargeCondition: 'Improved', summaryStatus: 'Completed', tatDays: 0, preparedBy: 'Dr. Priya Nair', reviewedBy: 'Dr. Suresh Pillai', remarks: 'Thrombolysis successful.' },
  { id: 'ds-003', patientId: 'ip-003', uhID: 'UHID-000003', patientName: 'Suresh Babu', department: 'Orthopaedics', consultant: 'Dr. Suresh Pillai', admissionDate: '2026-06-30', dischargeDate: '2026-07-09', primaryDiagnosis: 'Femoral Neck Fracture', summaryPreparedDate: '2026-07-10', dischargeType: 'Routine', dischargeCondition: 'Improved', summaryStatus: 'Delayed', tatDays: 1, preparedBy: 'Dr. Suresh Pillai', reviewedBy: 'Dr. Arvind Menon', remarks: 'Delayed by 1 day.' },
  { id: 'ds-004', patientId: 'ip-005', uhID: 'UHID-000005', patientName: 'Joseph Mathew', department: 'Cardiology', consultant: 'Dr. Arvind Menon', admissionDate: '2026-07-03', dischargeDate: '2026-07-10', primaryDiagnosis: 'Congestive Heart Failure', summaryPreparedDate: '2026-07-10', dischargeType: 'Routine', dischargeCondition: 'Improved', summaryStatus: 'Completed', tatDays: 0, preparedBy: 'Dr. Arvind Menon', reviewedBy: 'Dr. Priya Nair', remarks: 'Stable at discharge.' },
  { id: 'ds-005', patientId: 'ip-007', uhID: 'UHID-000007', patientName: 'Vikram Singh', department: 'Orthopaedics', consultant: 'Dr. Suresh Pillai', admissionDate: '2026-07-02', dischargeDate: '2026-07-07', primaryDiagnosis: 'Open Tibial Fracture', summaryPreparedDate: '2026-07-08', dischargeType: 'Routine', dischargeCondition: 'Improved', summaryStatus: 'Delayed', tatDays: 1, preparedBy: 'Dr. Suresh Pillai', reviewedBy: 'Dr. Karthik Reddy', remarks: 'Delayed due to OT schedule.' },
  { id: 'ds-006', patientId: 'ip-008', uhID: 'UHID-000008', patientName: 'Fatima Begum', department: 'Pediatrics', consultant: 'Dr. Karthik Reddy', admissionDate: '2026-07-04', dischargeDate: '2026-07-11', primaryDiagnosis: 'Pneumonia', summaryPreparedDate: '', dischargeType: 'Routine', dischargeCondition: 'Improved', summaryStatus: 'Pending', tatDays: '', preparedBy: '', reviewedBy: '', remarks: 'Discharged; summary pending.' },
  { id: 'ds-007', patientId: 'ip-004', uhID: 'UHID-000004', patientName: 'Anitha Reddy', department: 'Pediatrics', consultant: 'Dr. Karthik Reddy', admissionDate: '2026-07-05', dischargeDate: '', primaryDiagnosis: 'Dengue with Warning Signs', summaryPreparedDate: '', dischargeType: '', dischargeCondition: '', summaryStatus: 'Pending', tatDays: '', preparedBy: '', reviewedBy: '', remarks: 'Still admitted.' },
  { id: 'ds-008', patientId: 'em-002', uhID: 'UHID-000202', patientName: 'Pooja Iyer', department: 'Emergency Medicine', consultant: 'Dr. Kavya Menon', admissionDate: '2026-07-10', dischargeDate: '2026-07-10', primaryDiagnosis: 'Acute Bronchial Asthma', summaryPreparedDate: '2026-07-10', dischargeType: 'Routine', dischargeCondition: 'Improved', summaryStatus: 'Completed', tatDays: 0, preparedBy: 'Dr. Kavya Menon', reviewedBy: 'Dr. Priya Nair', remarks: 'Same-day discharge.' },
  { id: 'ds-009', patientId: 'em-004', uhID: 'UHID-000204', patientName: 'Anjali Nair', department: 'Emergency Medicine', consultant: 'Dr. Kavya Menon', admissionDate: '2026-07-11', dischargeDate: '2026-07-11', primaryDiagnosis: 'Sprained Ankle', summaryPreparedDate: '', dischargeType: 'Routine', dischargeCondition: 'Improved', summaryStatus: 'Pending', tatDays: '', preparedBy: '', reviewedBy: '', remarks: 'Summary not yet prepared.' },
  { id: 'ds-010', patientId: 'ip-006', uhID: 'UHID-000006', patientName: 'Lakshmi Devi', department: 'Neurology', consultant: 'Dr. Priya Nair', admissionDate: '2026-07-06', dischargeDate: '2026-07-12', primaryDiagnosis: 'Epilepsy — Status Epilepticus', summaryPreparedDate: '2026-07-14', dischargeType: 'Routine', dischargeCondition: 'Improved', summaryStatus: 'Delayed', tatDays: 2, preparedBy: 'Dr. Priya Nair', reviewedBy: 'Dr. Arvind Menon', remarks: 'Delayed due to complex care.' },
];

/* ============================================================
   PHASE 4 — MEDICAL RECORD QUALITY (MRD QUALITY MANAGEMENT)
   ============================================================ */

const MedicalRecordQualityTab = ({ hospital }) => {
  const [docAudits, setDocAudits] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_DOC_AUDITS);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch { /* ignore */ } }
    return SEED_DOC_AUDITS;
  });
  const [deathAudits, setDeathAudits] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_DEATH_AUDITS);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch { /* ignore */ } }
    return SEED_DEATH_AUDITS;
  });
  const [emrTracker, setEmrTracker] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_EMR_TRACKER);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch { /* ignore */ } }
    return SEED_EMR_TRACKER;
  });

  React.useEffect(() => { localStorage.setItem(LS_KEY_DOC_AUDITS, JSON.stringify(docAudits)); }, [docAudits]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_DEATH_AUDITS, JSON.stringify(deathAudits)); }, [deathAudits]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_EMR_TRACKER, JSON.stringify(emrTracker)); }, [emrTracker]);

  const kpis = computeQualityKpis(docAudits, deathAudits, emrTracker);

  const [activeSub, setActiveSub] = React.useState('doc_audit');

  const SUB_TABS = [
    { id: 'doc_audit', label: 'Documentation Quality Audit' },
    { id: 'death_audit', label: 'Death Audit Register' },
    { id: 'emr_tracker', label: 'EMR Implementation Tracker' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Medical Record Quality</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">
            MRD quality management — documentation audits, death audit register, and EMR implementation tracking
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">Quality Management Overview</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200">
        {SUB_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveSub(t.id)}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeSub === t.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeSub === 'doc_audit' && (
        <DocumentationAuditModule hospital={hospital} data={docAudits} setData={setDocAudits} allPatients={ALL_PATIENTS} />
      )}
      {activeSub === 'death_audit' && (
        <DeathAuditModule hospital={hospital} data={deathAudits} setData={setDeathAudits} allPatients={ALL_PATIENTS} />
      )}
      {activeSub === 'emr_tracker' && (
        <EmrTrackerModule hospital={hospital} data={emrTracker} setData={setEmrTracker} />
      )}
    </div>
  );
};

/* ============================================================
   PHASE 5 — RECORD MANAGEMENT (MRD LIFECYCLE MANAGEMENT)
   ============================================================ */

const RecordManagementTab = ({ hospital }) => {
  const [issues, setIssues] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_ISSUE_REGISTER);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch { /* ignore */ } }
    return SEED_ISSUES;
  });
  const [returns, setReturns] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_RETURN_REGISTER);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch { /* ignore */ } }
    return SEED_RETURNS;
  });
  const [archives, setArchives] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_ARCHIVE_RETENTION);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch { /* ignore */ } }
    return SEED_ARCHIVES;
  });

  React.useEffect(() => { localStorage.setItem(LS_KEY_ISSUE_REGISTER, JSON.stringify(issues)); }, [issues]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_RETURN_REGISTER, JSON.stringify(returns)); }, [returns]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_ARCHIVE_RETENTION, JSON.stringify(archives)); }, [archives]);

  const kpis = computeRecordKpis(issues, returns, archives);

  const [activeSub, setActiveSub] = React.useState('issue');

  const SUB_TABS = [
    { id: 'issue', label: 'Medical Record Issue Register' },
    { id: 'return', label: 'Medical Record Return Register' },
    { id: 'archive', label: 'Archive & Retention Register' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Record Management</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">
            MRD record lifecycle — issue, return, and archive &amp; retention management
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">Record Management Overview</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200">
        {SUB_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveSub(t.id)}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeSub === t.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeSub === 'issue' && <IssueRegisterModule hospital={hospital} data={issues} setData={setIssues} allPatients={RECORD_MANAGEMENT_PATIENTS} />}
      {activeSub === 'return' && <ReturnRegisterModule hospital={hospital} data={returns} setData={setReturns} issues={issues} />}
      {activeSub === 'archive' && <ArchiveRetentionModule hospital={hospital} data={archives} setData={setArchives} allPatients={RECORD_MANAGEMENT_PATIENTS} />}
    </div>
  );
};

/* ============================================================
   PHASE 6 — INTERNAL AUDIT (MRD AUDIT & CAPA SYSTEM)
   ============================================================ */

const InternalAuditTab = ({ hospital }) => {
  const [audits, setAudits] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_INTERNAL_AUDITS);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch { /* ignore */ } }
    return SEED_AUDITS;
  });
  const [capas, setCapas] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_CAPA_TRACKER);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch { /* ignore */ } }
    return SEED_CAPAS;
  });

  React.useEffect(() => { localStorage.setItem(LS_KEY_INTERNAL_AUDITS, JSON.stringify(audits)); }, [audits]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_CAPA_TRACKER, JSON.stringify(capas)); }, [capas]);

  const kpis = computeAuditKpis(audits, capas);

  const [activeSub, setActiveSub] = React.useState('audit');

  const SUB_TABS = [
    { id: 'audit', label: 'Medical Record Internal Audit' },
    { id: 'capa', label: 'CAPA Tracker' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Internal Audit</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">
            MRD internal audit, documentation deficiency identification, and CAPA monitoring
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">Audit &amp; CAPA Overview</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200">
        {SUB_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveSub(t.id)}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeSub === t.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeSub === 'audit' && <InternalAuditModule hospital={hospital} data={audits} setData={setAudits} allPatients={RECORD_MANAGEMENT_PATIENTS} />}
      {activeSub === 'capa' && <CapaTrackerModule hospital={hospital} data={capas} setData={setCapas} audits={audits} />}
    </div>
  );
};

/* ============================================================
   PHASE 7 — REPORTS & ANALYTICS
   All metrics are derived dynamically from live state
   (Patient Records, Clinical Documentation, Medical Record
   Quality, Record Management, Internal Audit).
   ============================================================ */

const getLiveArr = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch { /* ignore */ }
  return fallback || [];
};

const monthKey = (str) => {
  if (!str) return null;
  const s = String(str).slice(0, 7);
  return /^\d{4}-\d{2}$/.test(s) ? s : null;
};

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthLabel = (key) => {
  if (!key) return key;
  const m = Number(key.slice(5, 7));
  return MONTH_LABELS[(m - 1 + 12) % 12];
};

const buildTrend = (records, dateField, valueField) => {
  const buckets = {};
  records.forEach((r) => {
    const k = monthKey(r[dateField]);
    if (!k) return;
    if (!buckets[k]) buckets[k] = { sum: 0, count: 0 };
    buckets[k].sum += Number(r[valueField]) || 0;
    buckets[k].count += 1;
  });
  return Object.keys(buckets).sort().map((k) => ({
    name: monthLabel(k),
    value: buckets[k].count ? Math.round(buckets[k].sum / buckets[k].count) : 0,
  }));
};

const buildCountTrend = (records, dateField) => {
  const buckets = {};
  records.forEach((r) => {
    const k = monthKey(r[dateField]);
    if (!k) return;
    buckets[k] = (buckets[k] || 0) + 1;
  });
  return Object.keys(buckets).sort().map((k) => ({ name: monthLabel(k), count: buckets[k] }));
};

const ReportsAnalyticsTab = ({ hospital }) => {
  const inpatient = getLiveArr(LS_KEY_INPATIENT, SEED_INPATIENT);
  const outpatient = getLiveArr(LS_KEY_OUTPATIENT, SEED_OUTPATIENT);
  const emergency = getLiveArr(LS_KEY_EMERGENCY, SEED_EMERGENCY);
  const assessments = getLiveArr(LS_KEY_ASSESSMENTS, SEED_ASSESSMENTS);
  const consents = getLiveArr(LS_KEY_CONSENTS, SEED_CONSENTS);
  const summaries = getLiveArr(LS_KEY_SUMMARIES, SEED_SUMMARIES);
  const docAudits = getLiveArr(LS_KEY_DOC_AUDITS, SEED_DOC_AUDITS);
  const emrTracker = getLiveArr(LS_KEY_EMR_TRACKER, SEED_EMR_TRACKER);
  const issues = getLiveArr(LS_KEY_ISSUE_REGISTER, SEED_ISSUES);
  const archives = getLiveArr(LS_KEY_ARCHIVE_RETENTION, SEED_ARCHIVES);
  const audits = getLiveArr(LS_KEY_INTERNAL_AUDITS, SEED_AUDITS);
  const capas = getLiveArr(LS_KEY_CAPA_TRACKER, SEED_CAPAS);

  const allRecords = [...inpatient, ...outpatient, ...emergency];
  const totalRecords = allRecords.length;
  const activeRecords = allRecords.filter((r) => r.recordStatus === 'Open').length;

  const avgDocCompliance = docAudits.length
    ? Math.round(docAudits.reduce((s, r) => s + (Number(r.overallCompliance) || 0), 0) / docAudits.length)
    : 0;
  const dischargeCompleted = summaries.filter((s) => s.summaryStatus === 'Completed').length;
  const dischargeCompletion = summaries.length
    ? Math.round((dischargeCompleted / summaries.length) * 100)
    : 0;
  const avgEmr = emrTracker.length
    ? Math.round(emrTracker.reduce((s, r) => s + (Number(r.implementationPercentage) || 0), 0) / emrTracker.length)
    : 0;
  const totalIssued = issues.length;
  const returned = issues.filter((r) => r.status === 'Returned').length;
  const retrievalCompliance = totalIssued ? Math.round((returned / totalIssued) * 100) : 0;
  const avgAuditCompliance = audits.length
    ? Math.round(audits.reduce((s, r) => s + (Number(r.complianceScore) || 0), 0) / audits.length)
    : 0;

  const compliancePcts = [avgDocCompliance, dischargeCompletion, avgEmr, retrievalCompliance, avgAuditCompliance]
    .filter((v) => v > 0);
  const overallCompliance = compliancePcts.length
    ? Math.round(compliancePcts.reduce((s, v) => s + v, 0) / compliancePcts.length)
    : 0;

  const kpis = [
    { label: 'Total Medical Records', value: totalRecords, color: 'text-blue-600' },
    { label: 'Active Records', value: activeRecords, color: 'text-emerald-600' },
    { label: 'Documentation Compliance %', value: `${avgDocCompliance}%`, color: 'text-teal-600' },
    { label: 'Discharge Summary Completion %', value: `${dischargeCompletion}%`, color: 'text-sky-600' },
    { label: 'EMR Implementation %', value: `${avgEmr}%`, color: 'text-violet-600' },
    { label: 'Record Retrieval Compliance %', value: `${retrievalCompliance}%`, color: 'text-indigo-600' },
    { label: 'Internal Audit Compliance %', value: `${avgAuditCompliance}%`, color: 'text-amber-600' },
    { label: 'Overall Medical Record Compliance %', value: `${overallCompliance}%`, color: 'text-rose-600' },
  ];

  const patientDistributionData = [
    { name: 'Inpatient', value: inpatient.length },
    { name: 'Outpatient', value: outpatient.length },
    { name: 'Emergency', value: emergency.length },
  ];

  const deptMap = {};
  allRecords.forEach((r) => { if (r.department) deptMap[r.department] = (deptMap[r.department] || 0) + 1; });
  const departmentRecordsData = Object.keys(deptMap).map((k) => ({ name: k, records: deptMap[k] }));

  const admissionBuckets = {};
  const pushAdmission = (str) => {
    const k = monthKey(str);
    if (k) admissionBuckets[k] = (admissionBuckets[k] || 0) + 1;
  };
  inpatient.forEach((r) => pushAdmission(r.admissionDate));
  outpatient.forEach((r) => pushAdmission(r.visitDate));
  emergency.forEach((r) => pushAdmission(r.arrivalDateTime));
  const admissionsTrendData = Object.keys(admissionBuckets).sort().map((k) => ({ name: monthLabel(k), admissions: admissionBuckets[k] }));

  const docComplianceTrendData = buildTrend(docAudits, 'auditDate', 'overallCompliance');

  const emrByDeptData = emrTracker.map((r) => ({ name: r.department, implementation: Number(r.implementationPercentage) || 0 }));

  const auditTrend = buildCountTrend(audits, 'auditDate');
  const capaTrend = buildCountTrend(capas, 'completionDate').length
    ? buildCountTrend(capas, 'completionDate')
    : buildCountTrend(capas, 'targetDate');
  const auditCapaMonths = new Set([...auditTrend.map((d) => d.name), ...capaTrend.map((d) => d.name)]);
  const auditCountMap = {};
  auditTrend.forEach((d) => { auditCountMap[d.name] = d.count; });
  const capaCountMap = {};
  capaTrend.forEach((d) => { capaCountMap[d.name] = d.count; });
  const auditCapaTrendData = Array.from(auditCapaMonths).sort((a, b) => MONTH_LABELS.indexOf(a) - MONTH_LABELS.indexOf(b))
    .map((m) => ({ name: m, Audits: auditCountMap[m] || 0, CAPAs: capaCountMap[m] || 0 }));

  const deptSet = new Set([
    ...Object.keys(deptMap),
    ...emrTracker.map((r) => r.department),
    ...audits.map((r) => r.department),
  ]);
  const tableData = Array.from(deptSet).map((dept) => {
    const deptRecords = allRecords.filter((r) => r.department === dept);
    const dDoc = docAudits.filter((r) => r.department === dept);
    const dEmr = emrTracker.find((r) => r.department === dept);
    const dAudit = audits.filter((r) => r.department === dept);
    const dPending = deptRecords.filter((r) => r.recordStatus !== 'Completed').length;
    const documentationPct = dDoc.length
      ? Math.round(dDoc.reduce((s, r) => s + (Number(r.overallCompliance) || 0), 0) / dDoc.length)
      : 0;
    const emrPct = dEmr ? (Number(dEmr.implementationPercentage) || 0) : 0;
    const auditPct = dAudit.length
      ? Math.round(dAudit.reduce((s, r) => s + (Number(r.complianceScore) || 0), 0) / dAudit.length)
      : 0;
    const compParts = [documentationPct, emrPct, auditPct].filter((v) => v > 0);
    const overallPct = compParts.length
      ? Math.round(compParts.reduce((s, v) => s + v, 0) / compParts.length)
      : 0;
    const status = overallPct >= 90 ? 'Good' : overallPct >= 75 ? 'Watch' : 'Critical';
    return {
      department: dept,
      totalRecords: deptRecords.length,
      documentationPct,
      emrPct,
      auditPct,
      pendingRecords: dPending,
      overallPct,
      status,
    };
  }).sort((a, b) => b.overallPct - a.overallPct);

  const exportToCSV = () => {
    const lines = [];
    lines.push('Medical Records Report');
    lines.push(`Generated,${new Date().toISOString().slice(0, 10)}`);
    lines.push('');
    lines.push('KPI Summary');
    lines.push('KPI,Value');
    kpis.forEach((k) => lines.push(`"${k.label}",${typeof k.value === 'number' ? k.value : k.value}`));
    lines.push('');
    lines.push('Monthly Summary Table');
    lines.push('Department,Total Records,Documentation %,EMR %,Audit %,Pending Records,Overall Compliance %,Status');
    tableData.forEach((r) => lines.push(
      [r.department, r.totalRecords, r.documentationPct, r.emrPct, r.auditPct, r.pendingRecords, r.overallPct, r.status].join(',')
    ));
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Medical_Records_Report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = () => alert('PDF export will be available in a future version.');
  const printReport = () => window.print();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Reports &amp; Analytics</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">
            Live insights across patient records, documentation, quality, management &amp; audit
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportToCSV} className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 text-[10px] font-bold hover:bg-slate-50 transition-colors">Export CSV</button>
          <button onClick={exportToPDF} className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 text-[10px] font-bold hover:bg-slate-50 transition-colors">Export PDF</button>
          <button onClick={printReport} style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }} className="px-3 py-1.5 rounded-lg text-white text-[10px] font-bold hover:brightness-95 shadow-sm transition-all">Print Report</button>
        </div>
      </div>

      <div>
        <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">Key Performance Indicators</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">Analytics &amp; Trends</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-700 mb-4">Patient Record Distribution</h4>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={patientDistributionData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={5} dataKey="value">
                    {patientDistributionData.map((entry, index) => (
                      <Cell key={`cell-prd-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '9px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-700 mb-4">Department-wise Medical Records</h4>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentRecordsData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} interval={0} angle={-30} textAnchor="end" height={60} />
                  <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Bar dataKey="records" fill={hospital?.themeColor || '#3b82f6'} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-700 mb-4">Monthly Patient Admissions</h4>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={admissionsTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                  <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="admissions" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-700 mb-4">Documentation Compliance Trend</h4>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={docComplianceTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="docComplianceGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                  <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.5} fill="url(#docComplianceGrad)" dot={{ r: 3 }} activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-700 mb-4">EMR Implementation by Department</h4>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emrByDeptData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} interval={0} angle={-30} textAnchor="end" height={60} />
                  <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Bar dataKey="implementation" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-700 mb-4">Internal Audit &amp; CAPA Trend</h4>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={auditCapaTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                  <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '9px' }} />
                  <Line type="monotone" dataKey="Audits" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="CAPAs" stroke="#ec4899" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200">
          <h3 className="text-xs font-bold text-slate-800">Monthly Summary Table</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Department', 'Total Records', 'Documentation %', 'EMR %', 'Audit %', 'Pending Records', 'Overall Compliance %', 'Status'].map((h) => (
                  <th key={h} className="px-4 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tableData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-slate-400">No data available</td>
                </tr>
              ) : (
                tableData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-2 font-semibold text-slate-700">{row.department}</td>
                    <td className="px-4 py-2 text-slate-600">{row.totalRecords}</td>
                    <td className="px-4 py-2 text-emerald-600 font-bold">{row.documentationPct}%</td>
                    <td className="px-4 py-2 text-violet-600 font-bold">{row.emrPct}%</td>
                    <td className="px-4 py-2 text-amber-600 font-bold">{row.auditPct}%</td>
                    <td className="px-4 py-2 text-rose-600 font-bold">{row.pendingRecords}</td>
                    <td className="px-4 py-2 text-blue-600 font-bold">{row.overallPct}%</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_SUMMARY[row.status] || STATUS_BADGE_SUMMARY.Good}`}>{row.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {tableData.length} departments
          </span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   PHASE 2 — PATIENT RECORDS (INPATIENT / OUTPATIENT / EMERGENCY)
   ============================================================ */

const LS_KEY_INPATIENT = 'medical_inpatient_records';
const LS_KEY_OUTPATIENT = 'medical_outpatient_records';
const LS_KEY_EMERGENCY = 'medical_emergency_records';

const GENDERS = ['Male', 'Female', 'Other'];
const DEPARTMENTS = [
  'Cardiology', 'Neurology', 'Orthopaedics', 'Pediatrics', 'General Medicine',
  'Diabetology', 'Emergency Medicine', 'Obstetrics & Gynaecology', 'Dermatology',
  'Pulmonology', 'Gastroenterology', 'Nephrology', 'ICU', 'CCU',
];
const CONSULTANTS = [
  'Dr. Arvind Menon', 'Dr. Priya Nair', 'Dr. Suresh Pillai',
  'Dr. Karthik Reddy', 'Dr. Fatima Sheikh', 'Dr. Kavya Menon',
];
const WARDS = [
  'Cardiology Ward A', 'Cardiology Ward B', 'Neurology Ward B', 'Ortho Ward C',
  'Pediatric Ward', 'Medical Ward', 'Surgical Ward', 'ICU', 'CCU', 'Emergency Bay',
];
const TRIAGE_CATEGORIES = ['Red', 'Yellow', 'Green', 'Black'];
const OUTCOMES = ['Admission', 'Discharge', 'Referred', 'Expired'];
const EMR_STATUSES = ['Paper Record', 'Electronic Record', 'Hybrid'];
const RECORD_STATUSES = ['Open', 'Completed', 'Archived'];
const FOLLOW_UP = ['Yes', 'No'];

const STATUS_BADGE_RECORD = {
  Open: 'bg-amber-50 text-amber-700 border-amber-200',
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Archived: 'bg-slate-100 text-slate-600 border-slate-200',
};

const STATUS_BADGE_EMR = {
  'Paper Record': 'bg-amber-50 text-amber-700 border-amber-200',
  'Electronic Record': 'bg-sky-50 text-sky-700 border-sky-200',
  'Hybrid': 'bg-violet-50 text-violet-700 border-violet-200',
};

/* ---- Auto status business logic ---- */
const computeInpatientStatus = (r) => (r.dischargeDate ? 'Completed' : 'Open');
const computeOutpatientStatus = (r) => (r.followUpRequired === 'No' ? 'Completed' : 'Open');
const computeEmergencyStatus = (r) =>
  (r.outcome === 'Discharge' || r.outcome === 'Expired') ? 'Completed' : 'Open';

const computePatientKpis = (inpatient, outpatient, emergency) => {
  const all = [...inpatient, ...outpatient, ...emergency];
  const total = all.length;
  const completed = all.filter((r) => r.recordStatus === 'Completed').length;
  const pending = all.filter((r) => r.recordStatus !== 'Completed').length;
  const emr = all.filter((r) => r.emrStatus === 'Electronic Record' || r.emrStatus === 'Hybrid').length;
  const completionPct = total ? Math.round((completed / total) * 100) : 0;
  return [
    { label: 'Total Medical Records', value: total, color: 'text-blue-600' },
    { label: 'Inpatient Records', value: inpatient.length, color: 'text-emerald-600' },
    { label: 'Outpatient Records', value: outpatient.length, color: 'text-sky-600' },
    { label: 'Emergency Records', value: emergency.length, color: 'text-violet-600' },
    { label: 'Completed Records', value: completed, color: 'text-teal-600' },
    { label: 'Pending Records', value: pending, color: 'text-amber-600' },
    { label: 'EMR Records', value: emr, color: 'text-indigo-600' },
    { label: 'Record Completion %', value: `${completionPct}%`, color: 'text-rose-600' },
  ];
};

const inputCls = (err) =>
  `w-full px-3 py-2 border rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent ${err ? 'border-rose-400' : 'border-slate-200'}`;

const FormField = ({ label, error, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">{label}</label>
    {children}
    {error && <span className="text-[9px] text-rose-500 font-medium">{error}</span>}
  </div>
);

const getMaxNumeric = (records, field, prefix) =>
  records.reduce((m, r) => {
    const n = parseInt((r[field] || '').replace(prefix, ''), 10);
    return (!isNaN(n) && n > m) ? n : m;
  }, 0);

const EMPTY_INPATIENT = {
  id: '', mrdNumber: '', uhID: '', patientName: '', age: '', gender: 'Male', mobileNumber: '',
  consultant: '', department: '', admissionDate: '', dischargeDate: '', primaryDiagnosis: '',
  ward: '', bedNumber: '', physicalFileLocation: '', emrStatus: 'Electronic Record',
  recordCompletionStatus: 'Complete', remarks: '', recordStatus: 'Open',
};

const EMPTY_OUTPATIENT = {
  id: '', opRecordNumber: '', uhID: '', patientName: '', age: '', gender: 'Male',
  department: '', consultant: '', visitDate: '', diagnosis: '', followUpRequired: 'Yes',
  emrStatus: 'Electronic Record', recordStatus: 'Open', remarks: '',
};

const EMPTY_EMERGENCY = {
  id: '', emergencyRecordNumber: '', uhID: '', patientName: '', age: '', gender: 'Male',
  arrivalDateTime: '', triageCategory: 'Yellow', consultant: '', department: '', diagnosis: '',
  outcome: 'Admission', emrStatus: 'Electronic Record', recordStatus: 'Open', remarks: '',
};

/* ============================================================
   PHASE 2 — SEED DATA (10 records each)
   ============================================================ */

const SEED_INPATIENT = [
  { id: 'ip-001', mrdNumber: 'MRD/2026/0001', uhID: 'UHID-000001', patientName: 'Rajesh Kumar', age: 54, gender: 'Male', mobileNumber: '9876543210', consultant: 'Dr. Arvind Menon', department: 'Cardiology', admissionDate: '2026-06-28', dischargeDate: '2026-07-04', primaryDiagnosis: 'Acute Myocardial Infarction', ward: 'Cardiology Ward A', bedNumber: 'C-12', physicalFileLocation: 'Rack-03 / Sec-C', emrStatus: 'Electronic Record', recordCompletionStatus: 'Complete', remarks: 'PTCA done; hemodynamically stable.', recordStatus: 'Completed' },
  { id: 'ip-002', mrdNumber: 'MRD/2026/0002', uhID: 'UHID-000002', patientName: 'Meena Nair', age: 41, gender: 'Female', mobileNumber: '9876543211', consultant: 'Dr. Priya Nair', department: 'Neurology', admissionDate: '2026-07-01', dischargeDate: '2026-07-08', primaryDiagnosis: 'Ischemic Stroke', ward: 'Neurology Ward B', bedNumber: 'N-07', physicalFileLocation: 'Rack-03 / Sec-B', emrStatus: 'Hybrid', recordCompletionStatus: 'Complete', remarks: 'Thrombolysis administered; improving.', recordStatus: 'Completed' },
  { id: 'ip-003', mrdNumber: 'MRD/2026/0003', uhID: 'UHID-000003', patientName: 'Suresh Babu', age: 63, gender: 'Male', mobileNumber: '9876543212', consultant: 'Dr. Suresh Pillai', department: 'Orthopaedics', admissionDate: '2026-06-30', dischargeDate: '2026-07-09', primaryDiagnosis: 'Femoral Neck Fracture', ward: 'Ortho Ward C', bedNumber: 'O-21', physicalFileLocation: 'Rack-04 / Sec-A', emrStatus: 'Paper Record', recordCompletionStatus: 'Complete', remarks: 'Hip hemiarthroplasty done.', recordStatus: 'Completed' },
  { id: 'ip-004', mrdNumber: 'MRD/2026/0004', uhID: 'UHID-000004', patientName: 'Anitha Reddy', age: 29, gender: 'Female', mobileNumber: '9876543213', consultant: 'Dr. Karthik Reddy', department: 'Pediatrics', admissionDate: '2026-07-05', dischargeDate: '', primaryDiagnosis: 'Dengue with Warning Signs', ward: 'Pediatric Ward', bedNumber: 'P-04', physicalFileLocation: 'Rack-02 / Sec-D', emrStatus: 'Electronic Record', recordCompletionStatus: 'In Progress', remarks: 'Observation ongoing; fluids titrated.', recordStatus: 'Open' },
  { id: 'ip-005', mrdNumber: 'MRD/2026/0005', uhID: 'UHID-000005', patientName: 'Joseph Mathew', age: 58, gender: 'Male', mobileNumber: '9876543214', consultant: 'Dr. Arvind Menon', department: 'Cardiology', admissionDate: '2026-07-03', dischargeDate: '2026-07-10', primaryDiagnosis: 'Congestive Heart Failure', ward: 'Cardiology Ward A', bedNumber: 'C-09', physicalFileLocation: 'Rack-03 / Sec-C', emrStatus: 'Hybrid', recordCompletionStatus: 'Complete', remarks: 'Diuresis optimised.', recordStatus: 'Completed' },
  { id: 'ip-006', mrdNumber: 'MRD/2026/0006', uhID: 'UHID-000006', patientName: 'Lakshmi Devi', age: 47, gender: 'Female', mobileNumber: '9876543215', consultant: 'Dr. Priya Nair', department: 'Neurology', admissionDate: '2026-07-06', dischargeDate: '', primaryDiagnosis: 'Epilepsy — Status Epilepticus', ward: 'Neurology Ward B', bedNumber: 'N-11', physicalFileLocation: 'Rack-03 / Sec-B', emrStatus: 'Electronic Record', recordCompletionStatus: 'Pending', remarks: 'EEG planned; on loading dose.', recordStatus: 'Open' },
  { id: 'ip-007', mrdNumber: 'MRD/2026/0007', uhID: 'UHID-000007', patientName: 'Vikram Singh', age: 35, gender: 'Male', mobileNumber: '9876543216', consultant: 'Dr. Suresh Pillai', department: 'Orthopaedics', admissionDate: '2026-07-02', dischargeDate: '2026-07-07', primaryDiagnosis: 'Open Tibial Fracture', ward: 'Ortho Ward C', bedNumber: 'O-15', physicalFileLocation: 'Rack-04 / Sec-A', emrStatus: 'Paper Record', recordCompletionStatus: 'Complete', remarks: 'Debridement and external fixation.', recordStatus: 'Completed' },
  { id: 'ip-008', mrdNumber: 'MRD/2026/0008', uhID: 'UHID-000008', patientName: 'Fatima Begum', age: 66, gender: 'Female', mobileNumber: '9876543217', consultant: 'Dr. Karthik Reddy', department: 'Pediatrics', admissionDate: '2026-07-04', dischargeDate: '2026-07-11', primaryDiagnosis: 'Pneumonia', ward: 'Pediatric Ward', bedNumber: 'P-09', physicalFileLocation: 'Rack-02 / Sec-D', emrStatus: 'Electronic Record', recordCompletionStatus: 'Complete', remarks: 'Course completed; afebrile.', recordStatus: 'Completed' },
  { id: 'ip-009', mrdNumber: 'MRD/2026/0009', uhID: 'UHID-000009', patientName: 'Ravi Shankar', age: 72, gender: 'Male', mobileNumber: '9876543218', consultant: 'Dr. Arvind Menon', department: 'Cardiology', admissionDate: '2026-07-08', dischargeDate: '', primaryDiagnosis: 'Unstable Angina', ward: 'Cardiology Ward A', bedNumber: 'C-03', physicalFileLocation: 'Rack-03 / Sec-C', emrStatus: 'Hybrid', recordCompletionStatus: 'In Progress', remarks: 'Planned coronary angiography.', recordStatus: 'Open' },
  { id: 'ip-010', mrdNumber: 'MRD/2026/0010', uhID: 'UHID-000010', patientName: 'Saritha Menon', age: 38, gender: 'Female', mobileNumber: '9876543219', consultant: 'Dr. Priya Nair', department: 'Neurology', admissionDate: '2026-07-07', dischargeDate: '2026-07-12', primaryDiagnosis: 'Migraine with Aura', ward: 'Neurology Ward B', bedNumber: 'N-02', physicalFileLocation: 'Rack-03 / Sec-B', emrStatus: 'Electronic Record', recordCompletionStatus: 'Complete', remarks: 'Prophylaxis started.', recordStatus: 'Completed' },
];

const SEED_OUTPATIENT = [
  { id: 'op-001', opRecordNumber: 'OP/2026/0001', uhID: 'UHID-000101', patientName: 'Arun Gopal', age: 33, gender: 'Male', department: 'General Medicine', consultant: 'Dr. Fatima Sheikh', visitDate: '2026-07-10', diagnosis: 'Viral Fever', followUpRequired: 'Yes', emrStatus: 'Electronic Record', recordStatus: 'Open', remarks: 'Symptomatic treatment advised.' },
  { id: 'op-002', opRecordNumber: 'OP/2026/0002', uhID: 'UHID-000102', patientName: 'Bindu Thomas', age: 45, gender: 'Female', department: 'Cardiology', consultant: 'Dr. Arvind Menon', visitDate: '2026-07-09', diagnosis: 'Essential Hypertension', followUpRequired: 'No', emrStatus: 'Electronic Record', recordStatus: 'Completed', remarks: 'Medication refilled.' },
  { id: 'op-003', opRecordNumber: 'OP/2026/0003', uhID: 'UHID-000103', patientName: 'Mohammed Ali', age: 52, gender: 'Male', department: 'Diabetology', consultant: 'Dr. Fatima Sheikh', visitDate: '2026-07-08', diagnosis: 'Type 2 Diabetes Mellitus', followUpRequired: 'Yes', emrStatus: 'Hybrid', recordStatus: 'Open', remarks: 'HbA1c review pending.' },
  { id: 'op-004', opRecordNumber: 'OP/2026/0004', uhID: 'UHID-000104', patientName: 'Geetha Raj', age: 29, gender: 'Female', department: 'Obstetrics & Gynaecology', consultant: 'Dr. Priya Nair', visitDate: '2026-07-11', diagnosis: 'Antenatal Visit (28 wks)', followUpRequired: 'Yes', emrStatus: 'Electronic Record', recordStatus: 'Open', remarks: 'Routine ANC; scans normal.' },
  { id: 'op-005', opRecordNumber: 'OP/2026/0005', uhID: 'UHID-000105', patientName: 'Kiran Das', age: 61, gender: 'Male', department: 'Neurology', consultant: 'Dr. Priya Nair', visitDate: '2026-07-07', diagnosis: 'Peripheral Neuropathy', followUpRequired: 'No', emrStatus: 'Paper Record', recordStatus: 'Completed', remarks: 'Stabilised on gabapentin.' },
  { id: 'op-006', opRecordNumber: 'OP/2026/0006', uhID: 'UHID-000106', patientName: 'Nandini Rao', age: 37, gender: 'Female', department: 'Dermatology', consultant: 'Dr. Fatima Sheikh', visitDate: '2026-07-06', diagnosis: 'Atopic Eczema', followUpRequired: 'No', emrStatus: 'Electronic Record', recordStatus: 'Completed', remarks: 'Topical steroids tapered.' },
  { id: 'op-007', opRecordNumber: 'OP/2026/0007', uhID: 'UHID-000107', patientName: 'Sudeep Nair', age: 48, gender: 'Male', department: 'Cardiology', consultant: 'Dr. Arvind Menon', visitDate: '2026-07-10', diagnosis: 'Palpitations — Sinus Tachycardia', followUpRequired: 'Yes', emrStatus: 'Hybrid', recordStatus: 'Open', remarks: 'Holter monitoring advised.' },
  { id: 'op-008', opRecordNumber: 'OP/2026/0008', uhID: 'UHID-000108', patientName: 'Asha Menon', age: 26, gender: 'Female', department: 'General Medicine', consultant: 'Dr. Fatima Sheikh', visitDate: '2026-07-05', diagnosis: 'Urinary Tract Infection', followUpRequired: 'No', emrStatus: 'Electronic Record', recordStatus: 'Completed', remarks: 'Culture sent; symptoms resolved.' },
  { id: 'op-009', opRecordNumber: 'OP/2026/0009', uhID: 'UHID-000109', patientName: 'Thomas Kuriakose', age: 70, gender: 'Male', department: 'Orthopaedics', consultant: 'Dr. Suresh Pillai', visitDate: '2026-07-09', diagnosis: 'Osteoarthritis Knee', followUpRequired: 'Yes', emrStatus: 'Paper Record', recordStatus: 'Open', remarks: 'Physiotherapy referral given.' },
  { id: 'op-010', opRecordNumber: 'OP/2026/0010', uhID: 'UHID-000110', patientName: 'Revathi Pillai', age: 54, gender: 'Female', department: 'Diabetology', consultant: 'Dr. Fatima Sheikh', visitDate: '2026-07-11', diagnosis: 'Diabetic Foot Ulcer', followUpRequired: 'Yes', emrStatus: 'Electronic Record', recordStatus: 'Open', remarks: 'Wound debridement scheduled.' },
];

const SEED_EMERGENCY = [
  { id: 'em-001', emergencyRecordNumber: 'EM/2026/0001', uhID: 'UHID-000201', patientName: 'Sanjay Verma', age: 44, gender: 'Male', arrivalDateTime: '2026-07-10T14:35', triageCategory: 'Red', consultant: 'Dr. Kavya Menon', department: 'Emergency Medicine', diagnosis: 'RTA — Polytrauma', outcome: 'Admission', emrStatus: 'Electronic Record', recordStatus: 'Open', remarks: 'Shifted to ICU; splintage done.' },
  { id: 'em-002', emergencyRecordNumber: 'EM/2026/0002', uhID: 'UHID-000202', patientName: 'Pooja Iyer', age: 28, gender: 'Female', arrivalDateTime: '2026-07-10T16:10', triageCategory: 'Yellow', consultant: 'Dr. Kavya Menon', department: 'Emergency Medicine', diagnosis: 'Acute Bronchial Asthma', outcome: 'Discharge', emrStatus: 'Hybrid', recordStatus: 'Completed', remarks: 'Nebulisation; relieved.' },
  { id: 'em-003', emergencyRecordNumber: 'EM/2026/0003', uhID: 'UHID-000203', patientName: 'Ramesh Babu', age: 60, gender: 'Male', arrivalDateTime: '2026-07-09T22:05', triageCategory: 'Red', consultant: 'Dr. Arvind Menon', department: 'Cardiology', diagnosis: 'Cardiac Arrest', outcome: 'Expired', emrStatus: 'Electronic Record', recordStatus: 'Completed', remarks: 'CPR 35 min; succumbed.' },
  { id: 'em-004', emergencyRecordNumber: 'EM/2026/0004', uhID: 'UHID-000204', patientName: 'Anjali Nair', age: 19, gender: 'Female', arrivalDateTime: '2026-07-11T09:20', triageCategory: 'Green', consultant: 'Dr. Kavya Menon', department: 'Emergency Medicine', diagnosis: 'Sprained Ankle', outcome: 'Discharge', emrStatus: 'Electronic Record', recordStatus: 'Completed', remarks: 'Crepe bandage; analgesics.' },
  { id: 'em-005', emergencyRecordNumber: 'EM/2026/0005', uhID: 'UHID-000205', patientName: 'Imtiaz Khan', age: 51, gender: 'Male', arrivalDateTime: '2026-07-08T03:45', triageCategory: 'Yellow', consultant: 'Dr. Suresh Pillai', department: 'Orthopaedics', diagnosis: 'Fracture Femur', outcome: 'Admission', emrStatus: 'Paper Record', recordStatus: 'Open', remarks: 'Traction applied; OT planned.' },
  { id: 'em-006', emergencyRecordNumber: 'EM/2026/0006', uhID: 'UHID-000206', patientName: 'Deepa Shetty', age: 35, gender: 'Female', arrivalDateTime: '2026-07-11T11:30', triageCategory: 'Green', consultant: 'Dr. Priya Nair', department: 'Neurology', diagnosis: 'Syncope', outcome: 'Referred', emrStatus: 'Hybrid', recordStatus: 'Open', remarks: 'Referred to Neurology OPD.' },
  { id: 'em-007', emergencyRecordNumber: 'EM/2026/0007', uhID: 'UHID-000207', patientName: 'Naveen Kumar', age: 47, gender: 'Male', arrivalDateTime: '2026-07-10T19:50', triageCategory: 'Red', consultant: 'Dr. Arvind Menon', department: 'Cardiology', diagnosis: 'STEMI', outcome: 'Admission', emrStatus: 'Electronic Record', recordStatus: 'Open', remarks: 'Primary PCI done; in CCU.' },
  { id: 'em-008', emergencyRecordNumber: 'EM/2026/0008', uhID: 'UHID-000208', patientName: 'Lakshmi Rao', age: 63, gender: 'Female', arrivalDateTime: '2026-07-09T13:15', triageCategory: 'Yellow', consultant: 'Dr. Kavya Menon', department: 'Emergency Medicine', diagnosis: 'Hypoglycemia', outcome: 'Discharge', emrStatus: 'Electronic Record', recordStatus: 'Completed', remarks: 'IV dextrose; counselled.' },
  { id: 'em-009', emergencyRecordNumber: 'EM/2026/0009', uhID: 'UHID-000209', patientName: 'Vinay Gupta', age: 22, gender: 'Male', arrivalDateTime: '2026-07-11T02:00', triageCategory: 'Black', consultant: 'Dr. Kavya Menon', department: 'Emergency Medicine', diagnosis: 'Cardiopulmonary Arrest', outcome: 'Expired', emrStatus: 'Hybrid', recordStatus: 'Completed', remarks: 'Brought in lifeless; declared.' },
  { id: 'em-010', emergencyRecordNumber: 'EM/2026/0010', uhID: 'UHID-000210', patientName: 'Shobha Nair', age: 56, gender: 'Female', arrivalDateTime: '2026-07-10T08:40', triageCategory: 'Green', consultant: 'Dr. Priya Nair', department: 'Neurology', diagnosis: 'Vertigo', outcome: 'Referred', emrStatus: 'Electronic Record', recordStatus: 'Open', remarks: 'Referred for vestibular eval.' },
];

/* ============================================================
   PHASE 4 — MEDICAL RECORD QUALITY (MRD QUALITY MANAGEMENT)
   ============================================================ */

const ALL_PATIENTS = [
  ...SEED_INPATIENT.map((r) => ({ id: r.id, uhID: r.uhID, patientName: r.patientName, department: r.department, consultant: r.consultant, admissionDate: r.admissionDate, type: 'Inpatient' })),
  ...SEED_OUTPATIENT.map((r) => ({ id: r.id, uhID: r.uhID, patientName: r.patientName, department: r.department, consultant: r.consultant, admissionDate: r.visitDate, type: 'Outpatient' })),
  ...SEED_EMERGENCY.map((r) => ({ id: r.id, uhID: r.uhID, patientName: r.patientName, department: r.department, consultant: r.consultant, admissionDate: r.arrivalDateTime ? r.arrivalDateTime.split('T')[0] : '', type: 'Emergency' })),
];

const LS_KEY_DOC_AUDITS = 'medical_documentation_audits';
const LS_KEY_DEATH_AUDITS = 'medical_death_audits';
const LS_KEY_EMR_TRACKER = 'medical_emr_tracker';

const DOC_AUDIT_STATUSES = ['Open', 'Completed', 'Under Review'];
const DEATH_CATEGORIES = ['Natural', 'Post-operative', 'Unexpected', 'Brought Dead'];
const DEATH_AUDIT_STATUSES = ['Pending', 'Completed', 'Closed'];
const CAPA_OPTIONS = ['Yes', 'No'];
const EMR_IMPL_STATUSES = ['Planning', 'In Progress', 'Completed'];

const STATUS_BADGE_QUALITY = {
  Open: 'bg-amber-50 text-amber-700 border-amber-200',
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Under Review': 'bg-sky-50 text-sky-700 border-sky-200',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Closed: 'bg-slate-100 text-slate-600 border-slate-200',
  Planning: 'bg-rose-50 text-rose-700 border-rose-200',
  'In Progress': 'bg-sky-50 text-sky-700 border-sky-200',
  Yes: 'bg-rose-50 text-rose-700 border-rose-200',
  No: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const EMPTY_DOC_AUDIT = {
  id: '', patientId: '', uhID: '', patientName: '', department: '', consultant: '',
  auditDate: '', auditor: '',
  missingSignature: false, missingDate: false, missingTime: false, missingConsultantNotes: false,
  missingNursingNotes: false, missingDiagnosis: false, missingConsent: false, missingDischargeSummary: false,
  overallCompliance: '', auditStatus: 'Open', remarks: '',
};

const EMPTY_DEATH_AUDIT = {
  id: '', patientId: '', uhID: '', patientName: '', department: '', consultant: '',
  dateOfDeath: '', causeOfDeath: '', deathCategory: 'Natural',
  committeeReviewDate: '', reviewedBy: '', capaRequired: 'No', auditStatus: 'Pending', remarks: '',
};

const EMPTY_EMR_TRACKER = {
  id: '', department: '', totalRecords: '', digitalRecords: '', paperRecords: '', hybridRecords: '',
  externalReportsUploaded: 'No', electronicConsentEnabled: 'No', implementationPercentage: '', implementationStatus: 'Planning', remarks: '',
};

const computeEmrPercentage = (total, digital) => {
  const t = Number(total);
  const d = Number(digital);
  if (!t || t <= 0) return 0;
  return Math.round((d / t) * 1000) / 10;
};

const computeEmrStatus = (pct) => {
  if (pct <= 40) return 'Planning';
  if (pct <= 80) return 'In Progress';
  return 'Completed';
};

const computeQualityKpis = (docAudits, deathAudits, emrTracker) => {
  const totalDocAudits = docAudits.length;
  const avgDocCompliance = totalDocAudits
    ? Math.round(docAudits.reduce((s, r) => s + (Number(r.overallCompliance) || 0), 0) / totalDocAudits)
    : 0;
  const totalDeathAudits = deathAudits.length;
  const capaRequired = deathAudits.filter((r) => r.capaRequired === 'Yes').length;
  const avgEmrImpl = emrTracker.length
    ? Math.round(emrTracker.reduce((s, r) => s + (Number(r.implementationPercentage) || 0), 0) / emrTracker.length)
    : 0;
  const digitalRecords = emrTracker.reduce((s, r) => s + (Number(r.digitalRecords) || 0), 0);
  const openAudits = docAudits.filter((r) => r.auditStatus === 'Open').length;
  const overallQuality = Math.round((avgDocCompliance + avgEmrImpl) / 2) || 0;
  return [
    { label: 'Total Documentation Audits', value: totalDocAudits, color: 'text-blue-600' },
    { label: 'Documentation Compliance %', value: `${avgDocCompliance}%`, color: 'text-emerald-600' },
    { label: 'Death Audits', value: totalDeathAudits, color: 'text-violet-600' },
    { label: 'CAPA Required', value: capaRequired, color: 'text-rose-600' },
    { label: 'EMR Implementation %', value: `${avgEmrImpl}%`, color: 'text-teal-600' },
    { label: 'Digital Records', value: digitalRecords, color: 'text-sky-600' },
    { label: 'Open Audits', value: openAudits, color: 'text-amber-600' },
    { label: 'Overall Medical Record Quality %', value: `${overallQuality}%`, color: 'text-indigo-600' },
  ];
};

const SEED_DOC_AUDITS = [
  { id: 'da-001', patientId: 'ip-001', uhID: 'UHID-000001', patientName: 'Rajesh Kumar', department: 'Cardiology', consultant: 'Dr. Arvind Menon', auditDate: '2026-07-05', auditor: 'Dr. Nandakumar (MRD)', missingSignature: true, missingDate: false, missingTime: false, missingConsultantNotes: false, missingNursingNotes: false, missingDiagnosis: false, missingConsent: false, missingDischargeSummary: false, overallCompliance: 92, auditStatus: 'Open', remarks: 'Signature missing on progress notes.' },
  { id: 'da-002', patientId: 'ip-002', uhID: 'UHID-000002', patientName: 'Meena Nair', department: 'Neurology', consultant: 'Dr. Priya Nair', auditDate: '2026-07-08', auditor: 'Dr. Nandakumar (MRD)', missingSignature: false, missingDate: false, missingTime: false, missingConsultantNotes: true, missingNursingNotes: false, missingDiagnosis: false, missingConsent: false, missingDischargeSummary: false, overallCompliance: 88, auditStatus: 'Under Review', remarks: 'Consultant notes incomplete.' },
  { id: 'da-003', patientId: 'ip-003', uhID: 'UHID-000003', patientName: 'Suresh Babu', department: 'Orthopaedics', consultant: 'Dr. Suresh Pillai', auditDate: '2026-07-07', auditor: 'Dr. Lakshmi (MRD)', missingSignature: false, missingDate: true, missingTime: false, missingConsultantNotes: false, missingNursingNotes: false, missingDiagnosis: false, missingConsent: false, missingDischargeSummary: false, overallCompliance: 90, auditStatus: 'Completed', remarks: 'Operative note date missing.' },
  { id: 'da-004', patientId: 'ip-004', uhID: 'UHID-000004', patientName: 'Anitha Reddy', department: 'Pediatrics', consultant: 'Dr. Karthik Reddy', auditDate: '2026-07-09', auditor: 'Dr. Lakshmi (MRD)', missingSignature: true, missingDate: false, missingTime: true, missingConsultantNotes: false, missingNursingNotes: false, missingDiagnosis: false, missingConsent: false, missingDischargeSummary: false, overallCompliance: 85, auditStatus: 'Open', remarks: 'Time not recorded on vital chart.' },
  { id: 'da-005', patientId: 'ip-005', uhID: 'UHID-000005', patientName: 'Joseph Mathew', department: 'Cardiology', consultant: 'Dr. Arvind Menon', auditDate: '2026-07-10', auditor: 'Dr. Nandakumar (MRD)', missingSignature: false, missingDate: false, missingTime: false, missingConsultantNotes: false, missingNursingNotes: false, missingDiagnosis: false, missingConsent: false, missingDischargeSummary: false, overallCompliance: 98, auditStatus: 'Completed', remarks: 'Fully compliant record.' },
  { id: 'da-006', patientId: 'ip-006', uhID: 'UHID-000006', patientName: 'Lakshmi Devi', department: 'Neurology', consultant: 'Dr. Priya Nair', auditDate: '2026-07-11', auditor: 'Dr. Nandakumar (MRD)', missingSignature: false, missingDate: false, missingTime: false, missingConsultantNotes: false, missingNursingNotes: false, missingDiagnosis: false, missingConsent: true, missingDischargeSummary: true, overallCompliance: 78, auditStatus: 'Under Review', remarks: 'Consent and discharge summary pending.' },
  { id: 'da-007', patientId: 'ip-007', uhID: 'UHID-000007', patientName: 'Vikram Singh', department: 'Orthopaedics', consultant: 'Dr. Suresh Pillai', auditDate: '2026-07-09', auditor: 'Dr. Lakshmi (MRD)', missingSignature: false, missingDate: false, missingTime: false, missingConsultantNotes: false, missingNursingNotes: false, missingDiagnosis: true, missingConsent: false, missingDischargeSummary: false, overallCompliance: 86, auditStatus: 'Open', remarks: 'Provisional diagnosis not documented.' },
  { id: 'da-008', patientId: 'ip-008', uhID: 'UHID-000008', patientName: 'Fatima Begum', department: 'Pediatrics', consultant: 'Dr. Karthik Reddy', auditDate: '2026-07-11', auditor: 'Dr. Lakshmi (MRD)', missingSignature: false, missingDate: false, missingTime: false, missingConsultantNotes: false, missingNursingNotes: true, missingDiagnosis: false, missingConsent: false, missingDischargeSummary: false, overallCompliance: 91, auditStatus: 'Completed', remarks: 'Nursing notes incomplete for one shift.' },
  { id: 'da-009', patientId: 'ip-009', uhID: 'UHID-000009', patientName: 'Ravi Shankar', department: 'Cardiology', consultant: 'Dr. Arvind Menon', auditDate: '2026-07-12', auditor: 'Dr. Nandakumar (MRD)', missingSignature: true, missingDate: false, missingTime: false, missingConsultantNotes: true, missingNursingNotes: false, missingDiagnosis: false, missingConsent: false, missingDischargeSummary: false, overallCompliance: 80, auditStatus: 'Under Review', remarks: 'Signature and consultant note missing.' },
  { id: 'da-010', patientId: 'em-001', uhID: 'UHID-000201', patientName: 'Sanjay Verma', department: 'Emergency Medicine', consultant: 'Dr. Kavya Menon', auditDate: '2026-07-11', auditor: 'Dr. Lakshmi (MRD)', missingSignature: false, missingDate: false, missingTime: true, missingConsultantNotes: false, missingNursingNotes: false, missingDiagnosis: false, missingConsent: false, missingDischargeSummary: true, overallCompliance: 82, auditStatus: 'Open', remarks: 'Time and discharge summary missing in ER record.' },
];

const SEED_DEATH_AUDITS = [
  { id: 'dau-001', patientId: 'em-003', uhID: 'UHID-000203', patientName: 'Ramesh Babu', department: 'Cardiology', consultant: 'Dr. Arvind Menon', dateOfDeath: '2026-07-09', causeOfDeath: 'Acute Myocardial Infarction — Cardiopulmonary Arrest', deathCategory: 'Unexpected', committeeReviewDate: '2026-07-12', reviewedBy: 'Death Review Committee', capaRequired: 'Yes', auditStatus: 'Completed', remarks: 'Delayed reperfusion; CAPA initiated.' },
  { id: 'dau-002', patientId: 'em-009', uhID: 'UHID-000209', patientName: 'Vinay Gupta', department: 'Emergency Medicine', consultant: 'Dr. Kavya Menon', dateOfDeath: '2026-07-11', causeOfDeath: 'Cardiopulmonary Arrest — Brought Dead', deathCategory: 'Brought Dead', committeeReviewDate: '2026-07-13', reviewedBy: 'Dr. Kavya Menon', capaRequired: 'No', auditStatus: 'Pending', remarks: 'Brought in lifeless; no resuscitation started.' },
  { id: 'dau-003', patientId: 'ip-003', uhID: 'UHID-000003', patientName: 'Suresh Babu', department: 'Orthopaedics', consultant: 'Dr. Suresh Pillai', dateOfDeath: '2026-07-09', causeOfDeath: 'Pulmonary Embolism (Post-operative Day 2)', deathCategory: 'Post-operative', committeeReviewDate: '2026-07-11', reviewedBy: 'Dr. Suresh Pillai', capaRequired: 'Yes', auditStatus: 'Completed', remarks: 'DVT prophylaxis gap; CAPA raised.' },
  { id: 'dau-004', patientId: 'ip-001', uhID: 'UHID-000001', patientName: 'Rajesh Kumar', department: 'Cardiology', consultant: 'Dr. Arvind Menon', dateOfDeath: '2026-07-04', causeOfDeath: 'Cardiogenic Shock (Post-PTCA)', deathCategory: 'Post-operative', committeeReviewDate: '2026-07-06', reviewedBy: 'Dr. Arvind Menon', capaRequired: 'No', auditStatus: 'Closed', remarks: 'Reviewed; no system gap identified.' },
  { id: 'dau-005', patientId: 'ip-006', uhID: 'UHID-000006', patientName: 'Lakshmi Devi', department: 'Neurology', consultant: 'Dr. Priya Nair', dateOfDeath: '2026-07-12', causeOfDeath: 'Refractory Status Epilepticus', deathCategory: 'Unexpected', committeeReviewDate: '2026-07-14', reviewedBy: 'Dr. Priya Nair', capaRequired: 'Yes', auditStatus: 'Pending', remarks: 'Airway delay noted; CAPA pending.' },
  { id: 'dau-006', patientId: 'ip-004', uhID: 'UHID-000004', patientName: 'Anitha Reddy', department: 'Pediatrics', consultant: 'Dr. Karthik Reddy', dateOfDeath: '2026-07-09', causeOfDeath: 'Dengue Shock Syndrome', deathCategory: 'Natural', committeeReviewDate: '2026-07-11', reviewedBy: 'Dr. Karthik Reddy', capaRequired: 'No', auditStatus: 'Completed', remarks: 'Natural disease progression; no deficiency.' },
  { id: 'dau-007', patientId: 'ip-009', uhID: 'UHID-000009', patientName: 'Ravi Shankar', department: 'Cardiology', consultant: 'Dr. Arvind Menon', dateOfDeath: '2026-07-09', causeOfDeath: 'Ventricular Fibrillation (Unstable Angina)', deathCategory: 'Unexpected', committeeReviewDate: '2026-07-12', reviewedBy: 'Dr. Arvind Menon', capaRequired: 'Yes', auditStatus: 'Completed', remarks: 'Monitoring gap in high-risk ACS; CAPA raised.' },
  { id: 'dau-008', patientId: 'em-001', uhID: 'UHID-000201', patientName: 'Sanjay Verma', department: 'Emergency Medicine', consultant: 'Dr. Kavya Menon', dateOfDeath: '2026-07-10', causeOfDeath: 'Polytrauma — Road Traffic Accident', deathCategory: 'Unexpected', committeeReviewDate: '2026-07-12', reviewedBy: 'Dr. Kavya Menon', capaRequired: 'No', auditStatus: 'Pending', remarks: 'Trauma care appropriate; under review.' },
  { id: 'dau-009', patientId: 'ip-007', uhID: 'UHID-000007', patientName: 'Vikram Singh', department: 'Orthopaedics', consultant: 'Dr. Suresh Pillai', dateOfDeath: '2026-07-07', causeOfDeath: 'Septic Shock (Post-operative Wound Infection)', deathCategory: 'Post-operative', committeeReviewDate: '2026-07-09', reviewedBy: 'Dr. Suresh Pillai', capaRequired: 'Yes', auditStatus: 'Closed', remarks: 'Infection control CAPA closed.' },
  { id: 'dau-010', patientId: 'em-005', uhID: 'UHID-000205', patientName: 'Imtiaz Khan', department: 'Orthopaedics', consultant: 'Dr. Suresh Pillai', dateOfDeath: '2026-07-08', causeOfDeath: 'Fat Embolism Syndrome (Fracture Femur)', deathCategory: 'Unexpected', committeeReviewDate: '2026-07-10', reviewedBy: 'Dr. Suresh Pillai', capaRequired: 'No', auditStatus: 'Completed', remarks: 'Standard management; no deficiency.' },
];

const SEED_EMR_TRACKER = [
  { id: 'emr-001', department: 'Cardiology', totalRecords: 1240, digitalRecords: 1116, paperRecords: 80, hybridRecords: 44, externalReportsUploaded: 'Yes', electronicConsentEnabled: 'Yes', implementationPercentage: 90, implementationStatus: 'Completed', remarks: 'Fully digital with PACS integration.' },
  { id: 'emr-002', department: 'Neurology', totalRecords: 980, digitalRecords: 833, paperRecords: 98, hybridRecords: 49, externalReportsUploaded: 'Yes', electronicConsentEnabled: 'Yes', implementationPercentage: 85, implementationStatus: 'Completed', remarks: 'Digital consent enabled.' },
  { id: 'emr-003', department: 'Orthopaedics', totalRecords: 1050, digitalRecords: 630, paperRecords: 315, hybridRecords: 105, externalReportsUploaded: 'No', electronicConsentEnabled: 'No', implementationPercentage: 60, implementationStatus: 'In Progress', remarks: 'Migrating paper OT notes to EMR.' },
  { id: 'emr-004', department: 'Pediatrics', totalRecords: 1120, digitalRecords: 896, paperRecords: 140, hybridRecords: 84, externalReportsUploaded: 'Yes', electronicConsentEnabled: 'Yes', implementationPercentage: 80, implementationStatus: 'In Progress', remarks: 'Crossing 80% adoption.' },
  { id: 'emr-005', department: 'General Medicine', totalRecords: 1320, digitalRecords: 528, paperRecords: 660, hybridRecords: 132, externalReportsUploaded: 'No', electronicConsentEnabled: 'No', implementationPercentage: 40, implementationStatus: 'Planning', remarks: 'Early EMR rollout phase.' },
  { id: 'emr-006', department: 'Diabetology', totalRecords: 760, digitalRecords: 380, paperRecords: 300, hybridRecords: 80, externalReportsUploaded: 'No', electronicConsentEnabled: 'No', implementationPercentage: 50, implementationStatus: 'In Progress', remarks: 'OPD digitisation ongoing.' },
  { id: 'emr-007', department: 'Emergency Medicine', totalRecords: 1340, digitalRecords: 1072, paperRecords: 134, hybridRecords: 134, externalReportsUploaded: 'Yes', electronicConsentEnabled: 'Yes', implementationPercentage: 80, implementationStatus: 'In Progress', remarks: 'Triage digital; paper triage slips reducing.' },
  { id: 'emr-008', department: 'Obstetrics & Gynaecology', totalRecords: 890, digitalRecords: 623, paperRecords: 178, hybridRecords: 89, externalReportsUploaded: 'Yes', electronicConsentEnabled: 'Yes', implementationPercentage: 70, implementationStatus: 'In Progress', remarks: 'ANC records digitised.' },
  { id: 'emr-009', department: 'Dermatology', totalRecords: 540, digitalRecords: 162, paperRecords: 324, hybridRecords: 54, externalReportsUploaded: 'No', electronicConsentEnabled: 'No', implementationPercentage: 30, implementationStatus: 'Planning', remarks: 'Minimal EMR adoption.' },
  { id: 'emr-010', department: 'Pulmonology', totalRecords: 610, digitalRecords: 549, paperRecords: 31, hybridRecords: 30, externalReportsUploaded: 'Yes', electronicConsentEnabled: 'Yes', implementationPercentage: 90, implementationStatus: 'Completed', remarks: 'Near-total digital records.' },
];

const DOC_CHECKLIST_FIELDS = [
  { key: 'missingSignature', label: 'Missing Signature' },
  { key: 'missingDate', label: 'Missing Date' },
  { key: 'missingTime', label: 'Missing Time' },
  { key: 'missingConsultantNotes', label: 'Missing Consultant Notes' },
  { key: 'missingNursingNotes', label: 'Missing Nursing Notes' },
  { key: 'missingDiagnosis', label: 'Missing Diagnosis' },
  { key: 'missingConsent', label: 'Missing Consent' },
  { key: 'missingDischargeSummary', label: 'Missing Discharge Summary' },
];

/* ================== CRUD MODULE: DOCUMENTATION QUALITY AUDIT ================== */
const DocumentationAuditModule = ({ hospital, data, setData, allPatients }) => {
  const [search, setSearch] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(EMPTY_DOC_AUDIT);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => `da-${String(getMaxNumeric(data, 'id', 'da-') + 1).padStart(3, '0')}`;

  const openAddModal = () => { setForm({ ...EMPTY_DOC_AUDIT, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const handlePatientChange = (pid) => {
    const p = allPatients.find((x) => x.id === pid);
    if (p) setForm((f) => ({ ...f, patientId: pid, uhID: p.uhID, patientName: p.patientName, department: p.department, consultant: p.consultant }));
    else setForm((f) => ({ ...f, patientId: '', uhID: '', patientName: '', department: '', consultant: '' }));
  };

  const toggleFlag = (key) => setForm((f) => ({ ...f, [key]: !f[key] }));

  const validate = (f) => {
    const e = {};
    if (!f.patientId) e.patientId = 'Patient is required.';
    if (!f.auditDate) e.auditDate = 'Audit date is required.';
    if (!f.auditor.trim()) e.auditor = 'Auditor is required.';
    if (f.overallCompliance === '' || f.overallCompliance === null || f.overallCompliance === undefined) e.overallCompliance = 'Compliance % is required.';
    else { const v = Number(f.overallCompliance); if (isNaN(v) || v < 0 || v > 100) e.overallCompliance = 'Enter a value between 0 and 100.'; }
    if (!f.auditStatus) e.auditStatus = 'Audit status is required.';
    return e;
  };

  const handleSave = (ev) => {
    ev.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const record = { ...form, overallCompliance: Number(form.overallCompliance) };
    if (editingId) setData((prev) => prev.map((r) => (r.id === editingId ? { ...record, id: editingId } : r)));
    else setData((prev) => [...prev, record]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData((prev) => prev.filter((r) => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      r.patientName.toLowerCase().includes(q) ||
      r.uhID.toLowerCase().includes(q) ||
      r.department.toLowerCase().includes(q) ||
      r.consultant.toLowerCase().includes(q) ||
      (r.auditor || '').toLowerCase().includes(q);
    const matchDept = !filterDept || r.department === filterDept;
    const matchStatus = !filterStatus || r.auditStatus === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const TH_COLS = ['Audit ID', 'UHID', 'Patient', 'Department', 'Consultant', 'Audit Date', 'Auditor', 'Compliance %', 'Status', 'Actions'];

  const missingCount = (r) => DOC_CHECKLIST_FIELDS.filter((c) => r[c.key]).length;

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, UHID, department, consultant, auditor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Statuses</option>
          {DOC_AUDIT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button
          onClick={openAddModal}
          style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}
          className="px-3 py-2.5 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Audit
        </button>
      </div>

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
                    No documentation audits found. Add an audit or adjust filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhID}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600">{r.consultant}</td>
                    <td className="px-3 py-3 text-slate-600">{r.auditDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.auditor}</td>
                    <td className="px-3 py-3 text-emerald-600 font-bold">{r.overallCompliance}%</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_QUALITY[r.auditStatus] || STATUS_BADGE_QUALITY.Open}`}>{r.auditStatus}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 rounded-lg hover:bg-sky-50 text-sky-600 transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
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
            Showing {filtered.length} of {data.length} documentation audits
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">{editingId ? 'Edit Documentation Audit' : 'Add Documentation Audit'}</h2>
                <p className="text-[9px] text-slate-400 mt-0.5">{editingId ? `Editing: ${form.id}` : `New: ${form.id}`}</p>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label="Audit ID" error={null}>
                  <input value={form.id} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Patient *" error={errors.patientId}>
                  <select value={form.patientId} onChange={(e) => handlePatientChange(e.target.value)} className={inputCls(errors.patientId)}>
                    <option value="">Select Patient</option>
                    {allPatients.map((p) => <option key={p.id} value={p.id}>{p.patientName} ({p.uhID}) — {p.type}</option>)}
                  </select>
                </FormField>
                <FormField label="UHID" error={null}>
                  <input value={form.uhID} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Patient Name" error={null}>
                  <input value={form.patientName} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Department" error={null}>
                  <input value={form.department} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Consultant" error={null}>
                  <input value={form.consultant} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Audit Date *" error={errors.auditDate}>
                  <input type="date" value={form.auditDate} onChange={(e) => setForm((f) => ({ ...f, auditDate: e.target.value }))} className={inputCls(errors.auditDate)} />
                </FormField>
                <FormField label="Auditor *" error={errors.auditor}>
                  <input value={form.auditor} onChange={(e) => setForm((f) => ({ ...f, auditor: e.target.value }))} placeholder="e.g., Dr. Nandakumar (MRD)" className={inputCls(errors.auditor)} />
                </FormField>
                <FormField label="Overall Compliance % *" error={errors.overallCompliance}>
                  <input type="number" min="0" max="100" value={form.overallCompliance} onChange={(e) => setForm((f) => ({ ...f, overallCompliance: e.target.value }))} placeholder="0–100" className={inputCls(errors.overallCompliance)} />
                </FormField>
                <FormField label="Audit Status" error={null}>
                  <select value={form.auditStatus} onChange={(e) => setForm((f) => ({ ...f, auditStatus: e.target.value }))} className={inputCls(false)}>
                    {DOC_AUDIT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
              </div>

              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Documentation Checklist</span>
                <div className="grid grid-cols-1 gap-2 mt-2 sm:grid-cols-2">
                  {DOC_CHECKLIST_FIELDS.map((c) => (
                    <label key={c.key} className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input type="checkbox" checked={!!form[c.key]} onChange={() => toggleFlag(c.key)} className="w-3.5 h-3.5 accent-sky-500" />
                      {c.label}
                    </label>
                  ))}
                </div>
              </div>

              <FormField label="Remarks" error={null}>
                <textarea value={form.remarks} onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))} rows={2} placeholder="Any additional notes..." className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none" />
              </FormField>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                <button type="submit" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white hover:brightness-95 transition-all shadow-sm">{editingId ? 'Save Changes' : 'Add Audit'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-sm font-extrabold text-slate-900 mb-2">Confirm Delete</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to delete documentation audit{' '}
              <span className="font-bold text-rose-600">{data.find((r) => r.id === deleteConfirmId)?.id || deleteConfirmId}</span>?
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================== CRUD MODULE: DEATH AUDIT REGISTER ================== */
const DeathAuditModule = ({ hospital, data, setData, allPatients }) => {
  const [search, setSearch] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterCategory, setFilterCategory] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(EMPTY_DEATH_AUDIT);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => `dau-${String(getMaxNumeric(data, 'id', 'dau-') + 1).padStart(3, '0')}`;

  const openAddModal = () => { setForm({ ...EMPTY_DEATH_AUDIT, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const handlePatientChange = (pid) => {
    const p = allPatients.find((x) => x.id === pid);
    if (p) setForm((f) => ({ ...f, patientId: pid, uhID: p.uhID, patientName: p.patientName, department: p.department, consultant: p.consultant }));
    else setForm((f) => ({ ...f, patientId: '', uhID: '', patientName: '', department: '', consultant: '' }));
  };

  const validate = (f) => {
    const e = {};
    if (!f.patientId) e.patientId = 'Patient is required.';
    if (!f.dateOfDeath) e.dateOfDeath = 'Date of death is required.';
    if (!f.causeOfDeath.trim()) e.causeOfDeath = 'Cause of death is required.';
    if (!f.deathCategory) e.deathCategory = 'Death category is required.';
    if (!f.auditStatus) e.auditStatus = 'Audit status is required.';
    return e;
  };

  const handleSave = (ev) => {
    ev.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (editingId) setData((prev) => prev.map((r) => (r.id === editingId ? { ...form, id: editingId } : r)));
    else setData((prev) => [...prev, form]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData((prev) => prev.filter((r) => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      r.patientName.toLowerCase().includes(q) ||
      r.uhID.toLowerCase().includes(q) ||
      r.department.toLowerCase().includes(q) ||
      r.consultant.toLowerCase().includes(q) ||
      (r.reviewedBy || '').toLowerCase().includes(q);
    const matchDept = !filterDept || r.department === filterDept;
    const matchCategory = !filterCategory || r.deathCategory === filterCategory;
    const matchStatus = !filterStatus || r.auditStatus === filterStatus;
    return matchSearch && matchDept && matchCategory && matchStatus;
  });

  const TH_COLS = ['Death Audit ID', 'UHID', 'Patient', 'Department', 'Consultant', 'Date of Death', 'Cause', 'Category', 'CAPA', 'Status', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, UHID, department, consultant, reviewed by..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Categories</option>
          {DEATH_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Statuses</option>
          {DEATH_AUDIT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button
          onClick={openAddModal}
          style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}
          className="px-3 py-2.5 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Death Audit
        </button>
      </div>

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
                    No death audits found. Add a death audit or adjust filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhID}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600">{r.consultant}</td>
                    <td className="px-3 py-3 text-slate-600">{r.dateOfDeath}</td>
                    <td className="px-3 py-3 text-slate-600 max-w-[160px] truncate">{r.causeOfDeath}</td>
                    <td className="px-3 py-3 text-slate-600">{r.deathCategory}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_QUALITY[r.capaRequired] || STATUS_BADGE_QUALITY.No}`}>{r.capaRequired}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_QUALITY[r.auditStatus] || STATUS_BADGE_QUALITY.Pending}`}>{r.auditStatus}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 rounded-lg hover:bg-sky-50 text-sky-600 transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
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
            Showing {filtered.length} of {data.length} death audits
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">{editingId ? 'Edit Death Audit' : 'Add Death Audit'}</h2>
                <p className="text-[9px] text-slate-400 mt-0.5">{editingId ? `Editing: ${form.id}` : `New: ${form.id}`}</p>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label="Death Audit ID" error={null}>
                  <input value={form.id} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Patient *" error={errors.patientId}>
                  <select value={form.patientId} onChange={(e) => handlePatientChange(e.target.value)} className={inputCls(errors.patientId)}>
                    <option value="">Select Patient</option>
                    {allPatients.map((p) => <option key={p.id} value={p.id}>{p.patientName} ({p.uhID}) — {p.type}</option>)}
                  </select>
                </FormField>
                <FormField label="UHID" error={null}>
                  <input value={form.uhID} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Patient Name" error={null}>
                  <input value={form.patientName} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Department" error={null}>
                  <input value={form.department} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Consultant" error={null}>
                  <input value={form.consultant} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Date of Death *" error={errors.dateOfDeath}>
                  <input type="date" value={form.dateOfDeath} onChange={(e) => setForm((f) => ({ ...f, dateOfDeath: e.target.value }))} className={inputCls(errors.dateOfDeath)} />
                </FormField>
                <FormField label="Cause of Death *" error={errors.causeOfDeath}>
                  <input value={form.causeOfDeath} onChange={(e) => setForm((f) => ({ ...f, causeOfDeath: e.target.value }))} placeholder="e.g., Cardiopulmonary Arrest" className={inputCls(errors.causeOfDeath)} />
                </FormField>
                <FormField label="Death Category *" error={errors.deathCategory}>
                  <select value={form.deathCategory} onChange={(e) => setForm((f) => ({ ...f, deathCategory: e.target.value }))} className={inputCls(errors.deathCategory)}>
                    {DEATH_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Committee Review Date" error={null}>
                  <input type="date" value={form.committeeReviewDate} onChange={(e) => setForm((f) => ({ ...f, committeeReviewDate: e.target.value }))} className={inputCls(false)} />
                </FormField>
                <FormField label="Reviewed By" error={null}>
                  <input value={form.reviewedBy} onChange={(e) => setForm((f) => ({ ...f, reviewedBy: e.target.value }))} placeholder="e.g., Death Review Committee" className={inputCls(false)} />
                </FormField>
                <FormField label="CAPA Required" error={null}>
                  <select value={form.capaRequired} onChange={(e) => setForm((f) => ({ ...f, capaRequired: e.target.value }))} className={inputCls(false)}>
                    {CAPA_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Audit Status" error={null}>
                  <select value={form.auditStatus} onChange={(e) => setForm((f) => ({ ...f, auditStatus: e.target.value }))} className={inputCls(false)}>
                    {DEATH_AUDIT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
              </div>

              <FormField label="Remarks" error={null}>
                <textarea value={form.remarks} onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))} rows={2} placeholder="Any additional notes..." className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none" />
              </FormField>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                <button type="submit" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white hover:brightness-95 transition-all shadow-sm">{editingId ? 'Save Changes' : 'Add Death Audit'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-sm font-extrabold text-slate-900 mb-2">Confirm Delete</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to delete death audit{' '}
              <span className="font-bold text-rose-600">{data.find((r) => r.id === deleteConfirmId)?.id || deleteConfirmId}</span>?
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================== CRUD MODULE: EMR IMPLEMENTATION TRACKER ================== */
const EmrTrackerModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(EMPTY_EMR_TRACKER);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => `emr-${String(getMaxNumeric(data, 'id', 'emr-') + 1).padStart(3, '0')}`;

  const openAddModal = () => { setForm({ ...EMPTY_EMR_TRACKER, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const handleNumberChange = (field, value) => {
    setForm((f) => {
      const updated = { ...f, [field]: value };
      const pct = computeEmrPercentage(updated.totalRecords, updated.digitalRecords);
      updated.implementationPercentage = pct;
      updated.implementationStatus = computeEmrStatus(pct);
      return updated;
    });
  };

  const validate = (f) => {
    const e = {};
    if (!f.department) e.department = 'Department is required.';
    if (f.totalRecords === '' || f.totalRecords === null) e.totalRecords = 'Total records are required.';
    else if (Number(f.totalRecords) <= 0) e.totalRecords = 'Enter a value greater than 0.';
    if (f.digitalRecords === '' || f.digitalRecords === null) e.digitalRecords = 'Digital records are required.';
    else if (Number(f.digitalRecords) < 0) e.digitalRecords = 'Cannot be negative.';
    else if (f.totalRecords && Number(f.digitalRecords) > Number(f.totalRecords)) e.digitalRecords = 'Cannot exceed total records.';
    return e;
  };

  const handleSave = (ev) => {
    ev.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const record = {
      ...form,
      totalRecords: Number(form.totalRecords),
      digitalRecords: Number(form.digitalRecords),
      paperRecords: Number(form.paperRecords) || 0,
      hybridRecords: Number(form.hybridRecords) || 0,
      implementationPercentage: computeEmrPercentage(form.totalRecords, form.digitalRecords),
      implementationStatus: computeEmrStatus(computeEmrPercentage(form.totalRecords, form.digitalRecords)),
    };
    if (editingId) setData((prev) => prev.map((r) => (r.id === editingId ? { ...record, id: editingId } : r)));
    else setData((prev) => [...prev, record]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData((prev) => prev.filter((r) => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch = r.department.toLowerCase().includes(q) || r.id.toLowerCase().includes(q);
    const matchDept = !filterDept || r.department === filterDept;
    const matchStatus = !filterStatus || r.implementationStatus === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const TH_COLS = ['Tracker ID', 'Department', 'Total', 'Digital', 'Paper', 'Hybrid', 'Ext. Reports', 'E-Consent', 'Impl. %', 'Status', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search department or tracker ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Statuses</option>
          {EMR_IMPL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button
          onClick={openAddModal}
          style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}
          className="px-3 py-2.5 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Tracker
        </button>
      </div>

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
                    No EMR tracker records found. Add a record or adjust filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600">{r.totalRecords}</td>
                    <td className="px-3 py-3 text-emerald-600 font-bold">{r.digitalRecords}</td>
                    <td className="px-3 py-3 text-slate-600">{r.paperRecords}</td>
                    <td className="px-3 py-3 text-slate-600">{r.hybridRecords}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_QUALITY[r.externalReportsUploaded] || STATUS_BADGE_QUALITY.No}`}>{r.externalReportsUploaded}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_QUALITY[r.electronicConsentEnabled] || STATUS_BADGE_QUALITY.No}`}>{r.electronicConsentEnabled}</span>
                    </td>
                    <td className="px-3 py-3 text-teal-600 font-bold">{r.implementationPercentage}%</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_QUALITY[r.implementationStatus] || STATUS_BADGE_QUALITY.Planning}`}>{r.implementationStatus}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 rounded-lg hover:bg-sky-50 text-sky-600 transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
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
            Showing {filtered.length} of {data.length} EMR tracker records
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">{editingId ? 'Edit EMR Tracker' : 'Add EMR Tracker'}</h2>
                <p className="text-[9px] text-slate-400 mt-0.5">{editingId ? `Editing: ${form.id}` : `New: ${form.id}`}</p>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label="Tracker ID" error={null}>
                  <input value={form.id} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Department *" error={errors.department}>
                  <select value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} className={inputCls(errors.department)}>
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </FormField>
                <FormField label="Total Records *" error={errors.totalRecords}>
                  <input type="number" min="0" value={form.totalRecords} onChange={(e) => handleNumberChange('totalRecords', e.target.value)} placeholder="e.g., 1240" className={inputCls(errors.totalRecords)} />
                </FormField>
                <FormField label="Digital Records *" error={errors.digitalRecords}>
                  <input type="number" min="0" value={form.digitalRecords} onChange={(e) => handleNumberChange('digitalRecords', e.target.value)} placeholder="e.g., 1116" className={inputCls(errors.digitalRecords)} />
                </FormField>
                <FormField label="Paper Records" error={null}>
                  <input type="number" min="0" value={form.paperRecords} onChange={(e) => setForm((f) => ({ ...f, paperRecords: e.target.value }))} className={inputCls(false)} />
                </FormField>
                <FormField label="Hybrid Records" error={null}>
                  <input type="number" min="0" value={form.hybridRecords} onChange={(e) => setForm((f) => ({ ...f, hybridRecords: e.target.value }))} className={inputCls(false)} />
                </FormField>
                <FormField label="External Reports Uploaded" error={null}>
                  <select value={form.externalReportsUploaded} onChange={(e) => setForm((f) => ({ ...f, externalReportsUploaded: e.target.value }))} className={inputCls(false)}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </FormField>
                <FormField label="Electronic Consent Enabled" error={null}>
                  <select value={form.electronicConsentEnabled} onChange={(e) => setForm((f) => ({ ...f, electronicConsentEnabled: e.target.value }))} className={inputCls(false)}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </FormField>
                <FormField label="Implementation Percentage (Auto)" error={null}>
                  <input value={form.implementationPercentage !== '' && form.implementationPercentage !== undefined && form.implementationPercentage !== null ? `${form.implementationPercentage}%` : ''} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Implementation Status (Auto)" error={null}>
                  <div className={`flex items-center px-3 py-2 border border-slate-200 rounded-xl text-[10px] font-bold ${STATUS_BADGE_QUALITY[form.implementationStatus] || STATUS_BADGE_QUALITY.Planning}`}>
                    {form.implementationStatus || 'Planning'}
                    <span className="ml-1 text-[8px] font-normal text-slate-400">(auto)</span>
                  </div>
                </FormField>
              </div>

              <FormField label="Remarks" error={null}>
                <textarea value={form.remarks} onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))} rows={2} placeholder="Any additional notes..." className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none" />
              </FormField>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                <button type="submit" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white hover:brightness-95 transition-all shadow-sm">{editingId ? 'Save Changes' : 'Add Tracker'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-sm font-extrabold text-slate-900 mb-2">Confirm Delete</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to delete EMR tracker{' '}
              <span className="font-bold text-rose-600">{data.find((r) => r.id === deleteConfirmId)?.id || deleteConfirmId}</span>?
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PatientRecordsTab = ({ hospital }) => {
  const [inpatient, setInpatient] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_INPATIENT);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch { /* ignore */ } }
    return SEED_INPATIENT;
  });
  const [outpatient, setOutpatient] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_OUTPATIENT);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch { /* ignore */ } }
    return SEED_OUTPATIENT;
  });
  const [emergency, setEmergency] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_EMERGENCY);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch { /* ignore */ } }
    return SEED_EMERGENCY;
  });

  const [activeSub, setActiveSub] = React.useState('inpatient');

  React.useEffect(() => { localStorage.setItem(LS_KEY_INPATIENT, JSON.stringify(inpatient)); }, [inpatient]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_OUTPATIENT, JSON.stringify(outpatient)); }, [outpatient]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_EMERGENCY, JSON.stringify(emergency)); }, [emergency]);

  const kpis = computePatientKpis(inpatient, outpatient, emergency);

  const SUB_TABS = [
    { id: 'inpatient', label: 'Inpatient Records' },
    { id: 'outpatient', label: 'Outpatient Records' },
    { id: 'emergency', label: 'Emergency Records' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Patient Records</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">
            Inpatient, outpatient, and emergency medical record management
          </p>
        </div>
      </div>

      {/* Shared KPI Dashboard */}
      <div>
        <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">
          Medical Records Overview
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {SUB_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveSub(t.id)}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeSub === t.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeSub === 'inpatient' && (
        <InpatientModule hospital={hospital} data={inpatient} setData={setInpatient} />
      )}
      {activeSub === 'outpatient' && (
        <OutpatientModule hospital={hospital} data={outpatient} setData={setOutpatient} />
      )}
      {activeSub === 'emergency' && (
        <EmergencyModule hospital={hospital} data={emergency} setData={setEmergency} />
      )}
    </div>
  );
};

/* ================== CRUD MODULE: INPATIENT MEDICAL RECORDS ================== */
const InpatientModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');
  const [filterEmr, setFilterEmr] = React.useState('');
  const [filterConsultant, setFilterConsultant] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(EMPTY_INPATIENT);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => `ip-${String(getMaxNumeric(data, 'id', 'ip-') + 1).padStart(3, '0')}`;
  const getNextMrd = () => `MRD/2026/${String(getMaxNumeric(data, 'mrdNumber', 'MRD/2026/') + 1).padStart(4, '0')}`;
  const getNextUhID = () => `UHID-${String(getMaxNumeric(data, 'uhID', 'UHID-') + 1).padStart(6, '0')}`;

  const openAddModal = () => {
    setForm({ ...EMPTY_INPATIENT, id: getNextId(), mrdNumber: getNextMrd(), uhID: getNextUhID() });
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
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.patientName.trim()) e.patientName = 'Patient name is required.';
    if (!String(f.age).trim()) e.age = 'Age is required.';
    else if (isNaN(Number(f.age)) || Number(f.age) <= 0) e.age = 'Enter a valid age.';
    if (!f.mobileNumber.trim()) e.mobileNumber = 'Mobile number is required.';
    else if (!/^\d{10}$/.test(f.mobileNumber.trim())) e.mobileNumber = 'Enter a 10-digit mobile number.';
    if (!f.department.trim()) e.department = 'Department is required.';
    if (!f.consultant.trim()) e.consultant = 'Consultant is required.';
    if (!f.admissionDate) e.admissionDate = 'Admission date is required.';
    if (!f.primaryDiagnosis.trim()) e.primaryDiagnosis = 'Primary diagnosis is required.';
    if (!f.bedNumber.trim()) e.bedNumber = 'Bed number is required.';
    if (!f.physicalFileLocation.trim()) e.physicalFileLocation = 'File location is required.';
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const record = { ...form, recordStatus: computeInpatientStatus(form) };
    if (editingId) setData((prev) => prev.map((r) => r.id === editingId ? { ...record, id: editingId } : r));
    else setData((prev) => [...prev, record]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData((prev) => prev.filter((r) => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      r.patientName.toLowerCase().includes(q) ||
      r.uhID.toLowerCase().includes(q) ||
      r.mrdNumber.toLowerCase().includes(q) ||
      r.consultant.toLowerCase().includes(q) ||
      r.department.toLowerCase().includes(q);
    const matchDept = !filterDept || r.department === filterDept;
    const matchStatus = !filterStatus || r.recordStatus === filterStatus;
    const matchEmr = !filterEmr || r.emrStatus === filterEmr;
    const matchConsultant = !filterConsultant || r.consultant === filterConsultant;
    return matchSearch && matchDept && matchStatus && matchEmr && matchConsultant;
  });

  const TH_COLS = ['MRD No', 'UHID', 'Patient', 'Age', 'Gender', 'Department', 'Consultant', 'Admission', 'Discharge', 'Ward / Bed', 'EMR', 'Status', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by patient, UHID, MRD no, consultant, department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filterConsultant} onChange={(e) => setFilterConsultant(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Consultants</option>
          {CONSULTANTS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Statuses</option>
          {RECORD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterEmr} onChange={(e) => setFilterEmr(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All EMR</option>
          {EMR_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button
          onClick={openAddModal}
          style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}
          className="px-3 py-2.5 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Inpatient
        </button>
      </div>

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
                    No inpatient records found. Add a record or adjust filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.mrdNumber}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhID}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                    <td className="px-3 py-3 text-slate-600">{r.age}</td>
                    <td className="px-3 py-3 text-slate-600">{r.gender}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600">{r.consultant}</td>
                    <td className="px-3 py-3 text-slate-600">{r.admissionDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.dischargeDate || '—'}</td>
                    <td className="px-3 py-3 text-slate-600">{r.ward} / {r.bedNumber}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_EMR[r.emrStatus] || STATUS_BADGE_EMR['Paper Record']}`}>{r.emrStatus}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_RECORD[r.recordStatus] || STATUS_BADGE_RECORD.Open}`}>{r.recordStatus}</span>
                    </td>
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
            Showing {filtered.length} of {data.length} inpatient records
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">{editingId ? 'Edit Inpatient Record' : 'Add Inpatient Record'}</h2>
                <p className="text-[9px] text-slate-400 mt-0.5">
                  {editingId ? `Editing: ${form.mrdNumber}` : `New MRD: ${form.mrdNumber}`}
                </p>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label="MRD Number" error={null}>
                  <input value={form.mrdNumber} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="UHID" error={null}>
                  <input value={form.uhID} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Patient Name *" error={errors.patientName}>
                  <input value={form.patientName} onChange={(e) => setForm((f) => ({ ...f, patientName: e.target.value }))} placeholder="e.g., Rajesh Kumar" className={inputCls(errors.patientName)} />
                </FormField>
                <FormField label="Age *" error={errors.age}>
                  <input type="number" min="0" value={form.age} onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))} placeholder="e.g., 54" className={inputCls(errors.age)} />
                </FormField>
                <FormField label="Gender" error={null}>
                  <select value={form.gender} onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))} className={inputCls(false)}>
                    {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </FormField>
                <FormField label="Mobile Number *" error={errors.mobileNumber}>
                  <input value={form.mobileNumber} onChange={(e) => setForm((f) => ({ ...f, mobileNumber: e.target.value }))} placeholder="10-digit number" className={inputCls(errors.mobileNumber)} />
                </FormField>
                <FormField label="Department *" error={errors.department}>
                  <select value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} className={inputCls(errors.department)}>
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </FormField>
                <FormField label="Consultant *" error={errors.consultant}>
                  <select value={form.consultant} onChange={(e) => setForm((f) => ({ ...f, consultant: e.target.value }))} className={inputCls(errors.consultant)}>
                    <option value="">Select Consultant</option>
                    {CONSULTANTS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Admission Date *" error={errors.admissionDate}>
                  <input type="date" value={form.admissionDate} onChange={(e) => setForm((f) => ({ ...f, admissionDate: e.target.value }))} className={inputCls(errors.admissionDate)} />
                </FormField>
                <FormField label="Discharge Date" error={null}>
                  <input type="date" value={form.dischargeDate} onChange={(e) => setForm((f) => ({ ...f, dischargeDate: e.target.value }))} className={inputCls(false)} />
                </FormField>
                <FormField label="Ward" error={null}>
                  <select value={form.ward} onChange={(e) => setForm((f) => ({ ...f, ward: e.target.value }))} className={inputCls(false)}>
                    <option value="">Select Ward</option>
                    {WARDS.map((w) => <option key={w} value={w}>{w}</option>)}
                  </select>
                </FormField>
                <FormField label="Bed Number *" error={errors.bedNumber}>
                  <input value={form.bedNumber} onChange={(e) => setForm((f) => ({ ...f, bedNumber: e.target.value }))} placeholder="e.g., C-12" className={inputCls(errors.bedNumber)} />
                </FormField>
                <FormField label="Physical File Location *" error={errors.physicalFileLocation}>
                  <input value={form.physicalFileLocation} onChange={(e) => setForm((f) => ({ ...f, physicalFileLocation: e.target.value }))} placeholder="e.g., Rack-03 / Sec-C" className={inputCls(errors.physicalFileLocation)} />
                </FormField>
                <FormField label="EMR Status" error={null}>
                  <select value={form.emrStatus} onChange={(e) => setForm((f) => ({ ...f, emrStatus: e.target.value }))} className={inputCls(false)}>
                    {EMR_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
                <FormField label="Record Completion Status" error={null}>
                  <select value={form.recordCompletionStatus} onChange={(e) => setForm((f) => ({ ...f, recordCompletionStatus: e.target.value }))} className={inputCls(false)}>
                    {['Complete', 'In Progress', 'Pending'].map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
                <FormField label="Auto Record Status" error={null}>
                  <div className={`flex items-center px-3 py-2 border border-slate-200 rounded-xl text-[10px] font-bold ${STATUS_BADGE_RECORD[computeInpatientStatus(form)] || STATUS_BADGE_RECORD.Open}`}>
                    {computeInpatientStatus(form)}
                    <span className="ml-1 text-[8px] font-normal text-slate-400">(auto)</span>
                  </div>
                </FormField>
              </div>
              <FormField label="Primary Diagnosis *" error={errors.primaryDiagnosis}>
                <input value={form.primaryDiagnosis} onChange={(e) => setForm((f) => ({ ...f, primaryDiagnosis: e.target.value }))} placeholder="e.g., Acute Myocardial Infarction" className={inputCls(errors.primaryDiagnosis)} />
              </FormField>
              <FormField label="Remarks" error={null}>
                <textarea value={form.remarks} onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))} rows={2} placeholder="Any additional notes..." className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none" />
              </FormField>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white hover:brightness-95 transition-all shadow-sm">
                  {editingId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-sm font-extrabold text-slate-900 mb-2">Confirm Delete</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to delete inpatient record{' '}
              <span className="font-bold text-rose-600">
                {data.find((r) => r.id === deleteConfirmId)?.mrdNumber || deleteConfirmId}
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

/* ================== CRUD MODULE: OUTPATIENT MEDICAL RECORDS ================== */
const OutpatientModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');
  const [filterEmr, setFilterEmr] = React.useState('');
  const [filterConsultant, setFilterConsultant] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(EMPTY_OUTPATIENT);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => `op-${String(getMaxNumeric(data, 'id', 'op-') + 1).padStart(3, '0')}`;
  const getNextOp = () => `OP/2026/${String(getMaxNumeric(data, 'opRecordNumber', 'OP/2026/') + 1).padStart(4, '0')}`;
  const getNextUhID = () => `UHID-${String(getMaxNumeric(data, 'uhID', 'UHID-') + 1).padStart(6, '0')}`;

  const openAddModal = () => {
    setForm({ ...EMPTY_OUTPATIENT, id: getNextId(), opRecordNumber: getNextOp(), uhID: getNextUhID() });
    setEditingId(null);
    setErrors({});
    setIsModalOpen(true);
  };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.patientName.trim()) e.patientName = 'Patient name is required.';
    if (!String(f.age).trim()) e.age = 'Age is required.';
    else if (isNaN(Number(f.age)) || Number(f.age) <= 0) e.age = 'Enter a valid age.';
    if (!f.department.trim()) e.department = 'Department is required.';
    if (!f.consultant.trim()) e.consultant = 'Consultant is required.';
    if (!f.visitDate) e.visitDate = 'Visit date is required.';
    if (!f.diagnosis.trim()) e.diagnosis = 'Diagnosis is required.';
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const record = { ...form, recordStatus: computeOutpatientStatus(form) };
    if (editingId) setData((prev) => prev.map((r) => r.id === editingId ? { ...record, id: editingId } : r));
    else setData((prev) => [...prev, record]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData((prev) => prev.filter((r) => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      r.patientName.toLowerCase().includes(q) ||
      r.uhID.toLowerCase().includes(q) ||
      r.opRecordNumber.toLowerCase().includes(q) ||
      r.consultant.toLowerCase().includes(q) ||
      r.department.toLowerCase().includes(q);
    const matchDept = !filterDept || r.department === filterDept;
    const matchStatus = !filterStatus || r.recordStatus === filterStatus;
    const matchEmr = !filterEmr || r.emrStatus === filterEmr;
    const matchConsultant = !filterConsultant || r.consultant === filterConsultant;
    return matchSearch && matchDept && matchStatus && matchEmr && matchConsultant;
  });

  const TH_COLS = ['OP No', 'UHID', 'Patient', 'Age', 'Gender', 'Department', 'Consultant', 'Visit Date', 'Diagnosis', 'Follow-up', 'EMR', 'Status', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by patient, UHID, OP no, consultant, department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filterConsultant} onChange={(e) => setFilterConsultant(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Consultants</option>
          {CONSULTANTS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Statuses</option>
          {RECORD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterEmr} onChange={(e) => setFilterEmr(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All EMR</option>
          {EMR_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button
          onClick={openAddModal}
          style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}
          className="px-3 py-2.5 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Outpatient
        </button>
      </div>

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
                    No outpatient records found. Add a record or adjust filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.opRecordNumber}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhID}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                    <td className="px-3 py-3 text-slate-600">{r.age}</td>
                    <td className="px-3 py-3 text-slate-600">{r.gender}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600">{r.consultant}</td>
                    <td className="px-3 py-3 text-slate-600">{r.visitDate}</td>
                    <td className="px-3 py-3 text-slate-600 max-w-[160px] truncate">{r.diagnosis}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${r.followUpRequired === 'Yes' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>{r.followUpRequired}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_EMR[r.emrStatus] || STATUS_BADGE_EMR['Paper Record']}`}>{r.emrStatus}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_RECORD[r.recordStatus] || STATUS_BADGE_RECORD.Open}`}>{r.recordStatus}</span>
                    </td>
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
            Showing {filtered.length} of {data.length} outpatient records
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">{editingId ? 'Edit Outpatient Record' : 'Add Outpatient Record'}</h2>
                <p className="text-[9px] text-slate-400 mt-0.5">
                  {editingId ? `Editing: ${form.opRecordNumber}` : `New OP: ${form.opRecordNumber}`}
                </p>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label="OP Record Number" error={null}>
                  <input value={form.opRecordNumber} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="UHID" error={null}>
                  <input value={form.uhID} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Patient Name *" error={errors.patientName}>
                  <input value={form.patientName} onChange={(e) => setForm((f) => ({ ...f, patientName: e.target.value }))} placeholder="e.g., Arun Gopal" className={inputCls(errors.patientName)} />
                </FormField>
                <FormField label="Age *" error={errors.age}>
                  <input type="number" min="0" value={form.age} onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))} placeholder="e.g., 33" className={inputCls(errors.age)} />
                </FormField>
                <FormField label="Gender" error={null}>
                  <select value={form.gender} onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))} className={inputCls(false)}>
                    {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </FormField>
                <FormField label="Department *" error={errors.department}>
                  <select value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} className={inputCls(errors.department)}>
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </FormField>
                <FormField label="Consultant *" error={errors.consultant}>
                  <select value={form.consultant} onChange={(e) => setForm((f) => ({ ...f, consultant: e.target.value }))} className={inputCls(errors.consultant)}>
                    <option value="">Select Consultant</option>
                    {CONSULTANTS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Visit Date *" error={errors.visitDate}>
                  <input type="date" value={form.visitDate} onChange={(e) => setForm((f) => ({ ...f, visitDate: e.target.value }))} className={inputCls(errors.visitDate)} />
                </FormField>
                <FormField label="Follow-up Required" error={null}>
                  <select value={form.followUpRequired} onChange={(e) => setForm((f) => ({ ...f, followUpRequired: e.target.value }))} className={inputCls(false)}>
                    {FOLLOW_UP.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
                <FormField label="EMR Status" error={null}>
                  <select value={form.emrStatus} onChange={(e) => setForm((f) => ({ ...f, emrStatus: e.target.value }))} className={inputCls(false)}>
                    {EMR_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
                <FormField label="Auto Record Status" error={null}>
                  <div className={`flex items-center px-3 py-2 border border-slate-200 rounded-xl text-[10px] font-bold ${STATUS_BADGE_RECORD[computeOutpatientStatus(form)] || STATUS_BADGE_RECORD.Open}`}>
                    {computeOutpatientStatus(form)}
                    <span className="ml-1 text-[8px] font-normal text-slate-400">(auto)</span>
                  </div>
                </FormField>
              </div>
              <FormField label="Diagnosis *" error={errors.diagnosis}>
                <input value={form.diagnosis} onChange={(e) => setForm((f) => ({ ...f, diagnosis: e.target.value }))} placeholder="e.g., Viral Fever" className={inputCls(errors.diagnosis)} />
              </FormField>
              <FormField label="Remarks" error={null}>
                <textarea value={form.remarks} onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))} rows={2} placeholder="Any additional notes..." className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none" />
              </FormField>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white hover:brightness-95 transition-all shadow-sm">
                  {editingId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-sm font-extrabold text-slate-900 mb-2">Confirm Delete</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to delete outpatient record{' '}
              <span className="font-bold text-rose-600">
                {data.find((r) => r.id === deleteConfirmId)?.opRecordNumber || deleteConfirmId}
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

/* ================== CRUD MODULE: EMERGENCY MEDICAL RECORDS ================== */
const EmergencyModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');
  const [filterEmr, setFilterEmr] = React.useState('');
  const [filterConsultant, setFilterConsultant] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(EMPTY_EMERGENCY);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => `em-${String(getMaxNumeric(data, 'id', 'em-') + 1).padStart(3, '0')}`;
  const getNextEm = () => `EM/2026/${String(getMaxNumeric(data, 'emergencyRecordNumber', 'EM/2026/') + 1).padStart(4, '0')}`;
  const getNextUhID = () => `UHID-${String(getMaxNumeric(data, 'uhID', 'UHID-') + 1).padStart(6, '0')}`;

  const openAddModal = () => {
    setForm({ ...EMPTY_EMERGENCY, id: getNextId(), emergencyRecordNumber: getNextEm(), uhID: getNextUhID() });
    setEditingId(null);
    setErrors({});
    setIsModalOpen(true);
  };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.patientName.trim()) e.patientName = 'Patient name is required.';
    if (!String(f.age).trim()) e.age = 'Age is required.';
    else if (isNaN(Number(f.age)) || Number(f.age) <= 0) e.age = 'Enter a valid age.';
    if (!f.arrivalDateTime) e.arrivalDateTime = 'Arrival date/time is required.';
    if (!f.department.trim()) e.department = 'Department is required.';
    if (!f.consultant.trim()) e.consultant = 'Consultant is required.';
    if (!f.diagnosis.trim()) e.diagnosis = 'Diagnosis is required.';
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const record = { ...form, recordStatus: computeEmergencyStatus(form) };
    if (editingId) setData((prev) => prev.map((r) => r.id === editingId ? { ...record, id: editingId } : r));
    else setData((prev) => [...prev, record]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData((prev) => prev.filter((r) => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      r.patientName.toLowerCase().includes(q) ||
      r.uhID.toLowerCase().includes(q) ||
      r.emergencyRecordNumber.toLowerCase().includes(q) ||
      r.consultant.toLowerCase().includes(q) ||
      r.department.toLowerCase().includes(q);
    const matchDept = !filterDept || r.department === filterDept;
    const matchStatus = !filterStatus || r.recordStatus === filterStatus;
    const matchEmr = !filterEmr || r.emrStatus === filterEmr;
    const matchConsultant = !filterConsultant || r.consultant === filterConsultant;
    return matchSearch && matchDept && matchStatus && matchEmr && matchConsultant;
  });

  const TH_COLS = ['EM No', 'UHID', 'Patient', 'Age', 'Gender', 'Triage', 'Department', 'Consultant', 'Arrival', 'Outcome', 'EMR', 'Status', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by patient, UHID, EM no, consultant, department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filterConsultant} onChange={(e) => setFilterConsultant(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Consultants</option>
          {CONSULTANTS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Statuses</option>
          {RECORD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterEmr} onChange={(e) => setFilterEmr(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All EMR</option>
          {EMR_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button
          onClick={openAddModal}
          style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}
          className="px-3 py-2.5 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Emergency
        </button>
      </div>

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
                    No emergency records found. Add a record or adjust filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.emergencyRecordNumber}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhID}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                    <td className="px-3 py-3 text-slate-600">{r.age}</td>
                    <td className="px-3 py-3 text-slate-600">{r.gender}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${
                        r.triageCategory === 'Red' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        r.triageCategory === 'Yellow' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        r.triageCategory === 'Green' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>{r.triageCategory}</span>
                    </td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600">{r.consultant}</td>
                    <td className="px-3 py-3 text-slate-600">{r.arrivalDateTime}</td>
                    <td className="px-3 py-3 text-slate-600">{r.outcome}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_EMR[r.emrStatus] || STATUS_BADGE_EMR['Paper Record']}`}>{r.emrStatus}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_RECORD[r.recordStatus] || STATUS_BADGE_RECORD.Open}`}>{r.recordStatus}</span>
                    </td>
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
            Showing {filtered.length} of {data.length} emergency records
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">{editingId ? 'Edit Emergency Record' : 'Add Emergency Record'}</h2>
                <p className="text-[9px] text-slate-400 mt-0.5">
                  {editingId ? `Editing: ${form.emergencyRecordNumber}` : `New EM: ${form.emergencyRecordNumber}`}
                </p>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label="Emergency Record No" error={null}>
                  <input value={form.emergencyRecordNumber} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="UHID" error={null}>
                  <input value={form.uhID} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Patient Name *" error={errors.patientName}>
                  <input value={form.patientName} onChange={(e) => setForm((f) => ({ ...f, patientName: e.target.value }))} placeholder="e.g., Sanjay Verma" className={inputCls(errors.patientName)} />
                </FormField>
                <FormField label="Age *" error={errors.age}>
                  <input type="number" min="0" value={form.age} onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))} placeholder="e.g., 44" className={inputCls(errors.age)} />
                </FormField>
                <FormField label="Gender" error={null}>
                  <select value={form.gender} onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))} className={inputCls(false)}>
                    {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </FormField>
                <FormField label="Arrival Date/Time *" error={errors.arrivalDateTime}>
                  <input type="datetime-local" value={form.arrivalDateTime} onChange={(e) => setForm((f) => ({ ...f, arrivalDateTime: e.target.value }))} className={inputCls(errors.arrivalDateTime)} />
                </FormField>
                <FormField label="Triage Category" error={null}>
                  <select value={form.triageCategory} onChange={(e) => setForm((f) => ({ ...f, triageCategory: e.target.value }))} className={inputCls(false)}>
                    {TRIAGE_CATEGORIES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </FormField>
                <FormField label="Department *" error={errors.department}>
                  <select value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} className={inputCls(errors.department)}>
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </FormField>
                <FormField label="Consultant *" error={errors.consultant}>
                  <select value={form.consultant} onChange={(e) => setForm((f) => ({ ...f, consultant: e.target.value }))} className={inputCls(errors.consultant)}>
                    <option value="">Select Consultant</option>
                    {CONSULTANTS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Outcome" error={null}>
                  <select value={form.outcome} onChange={(e) => setForm((f) => ({ ...f, outcome: e.target.value }))} className={inputCls(false)}>
                    {OUTCOMES.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </FormField>
                <FormField label="EMR Status" error={null}>
                  <select value={form.emrStatus} onChange={(e) => setForm((f) => ({ ...f, emrStatus: e.target.value }))} className={inputCls(false)}>
                    {EMR_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
                <FormField label="Auto Record Status" error={null}>
                  <div className={`flex items-center px-3 py-2 border border-slate-200 rounded-xl text-[10px] font-bold ${STATUS_BADGE_RECORD[computeEmergencyStatus(form)] || STATUS_BADGE_RECORD.Open}`}>
                    {computeEmergencyStatus(form)}
                    <span className="ml-1 text-[8px] font-normal text-slate-400">(auto)</span>
                  </div>
                </FormField>
              </div>
              <FormField label="Diagnosis *" error={errors.diagnosis}>
                <input value={form.diagnosis} onChange={(e) => setForm((f) => ({ ...f, diagnosis: e.target.value }))} placeholder="e.g., RTA — Polytrauma" className={inputCls(errors.diagnosis)} />
              </FormField>
              <FormField label="Remarks" error={null}>
                <textarea value={form.remarks} onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))} rows={2} placeholder="Any additional notes..." className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none" />
              </FormField>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white hover:brightness-95 transition-all shadow-sm">
                  {editingId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-sm font-extrabold text-slate-900 mb-2">Confirm Delete</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to delete emergency record{' '}
              <span className="font-bold text-rose-600">
                {data.find((r) => r.id === deleteConfirmId)?.emergencyRecordNumber || deleteConfirmId}
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
   PHASE 3 — DISCHARGE SUMMARY MODULE
   ============================================================ */

const DischargeSummaryModule = ({ hospital, data, setData, allPatients }) => {
  const [search, setSearch] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');
  const [filterType, setFilterType] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(EMPTY_SUMMARY);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => `ds-${String(data.reduce((m, r) => { const n = parseInt((r.id || '').replace('ds-', ''), 10); return n > m ? n : m; }, 0) + 1).padStart(3, '0')}`;

  const openAddModal = () => { setForm({ ...EMPTY_SUMMARY, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const computeTat = (dischargeDate, summaryPreparedDate) => {
    if (!dischargeDate || !summaryPreparedDate) return '';
    const d1 = new Date(dischargeDate);
    const d2 = new Date(summaryPreparedDate);
    const diff = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? diff : 0;
  };

  const computeSummaryStatus = (dischargeDate, summaryPreparedDate, tatDays) => {
    if (!dischargeDate || !summaryPreparedDate) return 'Pending';
    const tat = typeof tatDays === 'number' ? tatDays : computeTat(dischargeDate, summaryPreparedDate);
    if (tat <= 3) return 'Completed';
    if (tat > 7) return 'Delayed';
    return 'Pending';
  };

  const validate = (f) => {
    const e = {};
    if (!f.patientId) e.patientId = 'Patient is required.';
    if (!f.patientName.trim()) e.patientName = 'Patient name is required.';
    if (!f.admissionDate) e.admissionDate = 'Admission date is required.';
    if (!f.dischargeDate) e.dischargeDate = 'Discharge date is required.';
    if (!f.primaryDiagnosis.trim()) e.primaryDiagnosis = 'Diagnosis is required.';
    if (!f.summaryPreparedDate) e.summaryPreparedDate = 'Summary date is required.';
    if (!f.preparedBy.trim()) e.preparedBy = 'Prepared by is required.';
    return e;
  };

  const handlePatientChange = (pid) => {
    const p = allPatients.find(x => x.id === pid);
    if (p) {
      setForm(f => ({ ...f, patientId: pid, uhID: p.uhID, patientName: p.patientName, department: p.department, consultant: p.consultant, admissionDate: p.admissionDate }));
    } else {
      setForm(f => ({ ...f, patientId: pid, uhID: '', patientName: '', department: '', consultant: '', admissionDate: '' }));
    }
  };

  const handleDateChange = (field, value) => {
    setForm(f => {
      const updated = { ...f, [field]: value };
      if (updated.dischargeDate && updated.summaryPreparedDate) {
        updated.tatDays = computeTat(updated.dischargeDate, updated.summaryPreparedDate);
        updated.summaryStatus = computeSummaryStatus(updated.dischargeDate, updated.summaryPreparedDate, updated.tatDays);
      }
      return updated;
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const record = { ...form, tatDays: computeTat(form.dischargeDate, form.summaryPreparedDate), summaryStatus: computeSummaryStatus(form.dischargeDate, form.summaryPreparedDate, form.tatDays) };
    if (editingId) setData(prev => prev.map(r => r.id === editingId ? { ...record, id: editingId } : r));
    else setData(prev => [...prev, { ...record, id: getNextId() }]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData(prev => prev.filter(r => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = r.patientName.toLowerCase().includes(q) || r.uhID.toLowerCase().includes(q) || r.primaryDiagnosis.toLowerCase().includes(q) || r.preparedBy.toLowerCase().includes(q);
    const matchStatus = !filterStatus || r.summaryStatus === filterStatus;
    const matchType = !filterType || r.dischargeType === filterType;
    return matchSearch && matchStatus && matchType;
  });

  const TH_COLS = ['Summary ID', 'UHID', 'Patient', 'Department', 'Admission', 'Discharge', 'Diagnosis', 'TAT (days)', 'Status', 'Type', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search patient, UHID, diagnosis, prepared by..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Types</option>
          {DISCHARGE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Statuses</option>
          {['Completed', 'Pending', 'Delayed'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={openAddModal} style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }} className="px-3 py-2.5 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer">
          <Plus className="w-3.5 h-3.5" /> Add Summary
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>{TH_COLS.map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={TH_COLS.length} className="px-4 py-10 text-center text-slate-400">No discharge summary records found.</td></tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhID}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600">{r.admissionDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.dischargeDate}</td>
                    <td className="px-3 py-3 text-slate-600 max-w-[160px] truncate">{r.primaryDiagnosis}</td>
                    <td className="px-3 py-3 text-slate-600">{r.tatDays !== undefined && r.tatDays !== '' ? r.tatDays : '—'}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${
                        r.summaryStatus === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        r.summaryStatus === 'Delayed' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>{r.summaryStatus}</span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{r.dischargeType}</td>
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
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">Showing {filtered.length} of {data.length} discharge summary records</span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">{editingId ? 'Edit Discharge Summary' : 'Add Discharge Summary'}</h2>
                <p className="text-[9px] text-slate-400 mt-0.5">{editingId ? `Editing: ${form.id}` : `New: ${form.id}`}</p>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSave} className="px-6 py-5 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label="Summary ID" error={null}>
                  <input value={form.id} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Patient *" error={errors.patientId}>
                  <select value={form.patientId} onChange={(e) => handlePatientChange(e.target.value)} className={inputCls(errors.patientId)}>
                    <option value="">Select Patient</option>
                    {allPatients.map(p => <option key={p.id} value={p.id}>{p.patientName} ({p.uhID}) — {p.type}</option>)}
                  </select>
                </FormField>
                <FormField label="UHID" error={null}>
                  <input value={form.uhID} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Patient Name" error={null}>
                  <input value={form.patientName} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Department" error={null}>
                  <input value={form.department} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Consultant" error={null}>
                  <input value={form.consultant} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Admission Date *" error={errors.admissionDate}>
                  <input type="date" value={form.admissionDate} onChange={(e) => handleDateChange('admissionDate', e.target.value)} className={inputCls(errors.admissionDate)} />
                </FormField>
                <FormField label="Discharge Date *" error={errors.dischargeDate}>
                  <input type="date" value={form.dischargeDate} onChange={(e) => handleDateChange('dischargeDate', e.target.value)} className={inputCls(errors.dischargeDate)} />
                </FormField>
                <FormField label="Summary Prepared Date *" error={errors.summaryPreparedDate}>
                  <input type="date" value={form.summaryPreparedDate} onChange={(e) => handleDateChange('summaryPreparedDate', e.target.value)} className={inputCls(errors.summaryPreparedDate)} />
                </FormField>
                <FormField label="TAT (days)" error={null}>
                  <input value={form.tatDays !== undefined && form.tatDays !== '' ? form.tatDays : ''} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Summary Status" error={null}>
                  <div className={`flex items-center px-3 py-2 border border-slate-200 rounded-xl text-[10px] font-bold ${
                    form.summaryStatus === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    form.summaryStatus === 'Delayed' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                    'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {form.summaryStatus || 'Pending'}
                    <span className="ml-1 text-[8px] font-normal text-slate-400">(auto)</span>
                  </div>
                </FormField>
                <FormField label="Discharge Type" error={null}>
                  <select value={form.dischargeType} onChange={(e) => setForm((f) => ({ ...f, dischargeType: e.target.value }))} className={inputCls(false)}>
                    {DISCHARGE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </FormField>
                <FormField label="Discharge Condition" error={null}>
                  <select value={form.dischargeCondition} onChange={(e) => setForm((f) => ({ ...f, dischargeCondition: e.target.value }))} className={inputCls(false)}>
                    {DISCHARGE_CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>
              </div>
              <FormField label="Primary Diagnosis *" error={errors.primaryDiagnosis}>
                <input value={form.primaryDiagnosis} onChange={(e) => setForm((f) => ({ ...f, primaryDiagnosis: e.target.value }))} placeholder="Working diagnosis" className={inputCls(errors.primaryDiagnosis)} />
              </FormField>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Prepared By *" error={errors.preparedBy}>
                  <input value={form.preparedBy} onChange={(e) => setForm((f) => ({ ...f, preparedBy: e.target.value }))} placeholder="e.g., Dr. Arvind Menon" className={inputCls(errors.preparedBy)} />
                </FormField>
                <FormField label="Reviewed By" error={null}>
                  <input value={form.reviewedBy} onChange={(e) => setForm((f) => ({ ...f, reviewedBy: e.target.value }))} placeholder="e.g., Dr. Priya Nair" className={inputCls(false)} />
                </FormField>
              </div>
              <FormField label="Remarks" error={null}>
                <textarea value={form.remarks} onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))} rows={2} placeholder="Any additional notes..." className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none" />
              </FormField>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                <button type="submit" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white hover:brightness-95 transition-all shadow-sm">{editingId ? 'Save Changes' : 'Add Summary'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-sm font-extrabold text-slate-900 mb-2">Confirm Delete</h3>
            <p className="text-xs text-slate-500 mb-5">Are you sure you want to delete discharge summary <span className="font-bold text-rose-600">{data.find((r) => r.id === deleteConfirmId)?.id || deleteConfirmId}</span>? This action cannot be undone.</p>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   PHASE 3 — CLINICAL DOCUMENTATION WRAPPER & MODULES
   ============================================================ */

const LS_KEY_ASSESSMENTS = 'clinical_initial_assessments';
const LS_KEY_CONSENTS = 'clinical_consents';
const LS_KEY_SUMMARIES = 'clinical_discharge_summaries';

/* ================== CRUD MODULE: INITIAL ASSESSMENT REGISTER ================== */
const InitialAssessmentModule = ({ hospital, data, setData, allPatients }) => {
  const [search, setSearch] = React.useState('');
  const [filterType, setFilterType] = React.useState('');
  const [filterCategory, setFilterCategory] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(EMPTY_ASSESSMENT);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => `as-${String(getMaxNumeric(data, 'id', 'as-') + 1).padStart(3, '0')}`;

  const openAddModal = () => { setForm({ ...EMPTY_ASSESSMENT, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const handlePatientChange = (pid) => {
    const p = allPatients.find((x) => x.id === pid);
    if (p) setForm((f) => ({ ...f, patientId: pid, uhID: p.uhID, patientName: p.patientName, department: p.department, consultant: p.consultant, admissionDate: p.admissionDate }));
    else setForm((f) => ({ ...f, patientId: '', uhID: '', patientName: '', department: '', consultant: '', admissionDate: '' }));
  };

  const validate = (f) => {
    const e = {};
    if (!f.patientId) e.patientId = 'Patient is required.';
    if (!f.admissionDate) e.admissionDate = 'Admission date is required.';
    if (!f.assessmentDate) e.assessmentDate = 'Assessment date is required.';
    if (!f.provisionalDiagnosis.trim()) e.provisionalDiagnosis = 'Provisional diagnosis is required.';
    if (!f.assessedBy.trim()) e.assessedBy = 'Assessed by is required.';
    return e;
  };

  const handleSave = (ev) => {
    ev.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (editingId) setData((prev) => prev.map((r) => (r.id === editingId ? { ...form, id: editingId } : r)));
    else setData((prev) => [...prev, form]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData((prev) => prev.filter((r) => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      r.patientName.toLowerCase().includes(q) ||
      r.uhID.toLowerCase().includes(q) ||
      r.department.toLowerCase().includes(q) ||
      r.consultant.toLowerCase().includes(q) ||
      (r.provisionalDiagnosis || '').toLowerCase().includes(q);
    const matchType = !filterType || r.assessmentType === filterType;
    const matchCategory = !filterCategory || r.category === filterCategory;
    return matchSearch && matchType && matchCategory;
  });

  const TH_COLS = ['Assessment ID', 'UHID', 'Patient', 'Department', 'Consultant', 'Type', 'Category', 'Assessment Date', 'Risk', 'Actions'];

  const riskBadge = {
    Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Medium: 'bg-sky-50 text-sky-700 border-sky-200',
    High: 'bg-amber-50 text-amber-700 border-amber-200',
    Critical: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, UHID, department, consultant, diagnosis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Types</option>
          {ASSESSMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Categories</option>
          {ASSESSMENT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <button
          onClick={openAddModal}
          style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}
          className="px-3 py-2.5 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Assessment
        </button>
      </div>

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
                    No initial assessments found. Add an assessment or adjust filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhID}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600">{r.consultant}</td>
                    <td className="px-3 py-3 text-slate-600">{r.assessmentType}</td>
                    <td className="px-3 py-3 text-slate-600">{r.category}</td>
                    <td className="px-3 py-3 text-slate-600">{r.assessmentDate}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${riskBadge[r.riskLevel] || riskBadge.Low}`}>{r.riskLevel}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 rounded-lg hover:bg-sky-50 text-sky-600 transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
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
            Showing {filtered.length} of {data.length} initial assessments
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">{editingId ? 'Edit Initial Assessment' : 'Add Initial Assessment'}</h2>
                <p className="text-[9px] text-slate-400 mt-0.5">{editingId ? `Editing: ${form.id}` : `New: ${form.id}`}</p>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label="Assessment ID" error={null}>
                  <input value={form.id} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Patient *" error={errors.patientId}>
                  <select value={form.patientId} onChange={(e) => handlePatientChange(e.target.value)} className={inputCls(errors.patientId)}>
                    <option value="">Select Patient</option>
                    {allPatients.map((p) => <option key={p.id} value={p.id}>{p.patientName} ({p.uhID}) — {p.type}</option>)}
                  </select>
                </FormField>
                <FormField label="UHID" error={null}>
                  <input value={form.uhID} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Patient Name" error={null}>
                  <input value={form.patientName} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Department" error={null}>
                  <input value={form.department} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Consultant" error={null}>
                  <input value={form.consultant} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Admission Date *" error={errors.admissionDate}>
                  <input type="date" value={form.admissionDate} onChange={(e) => setForm((f) => ({ ...f, admissionDate: e.target.value }))} className={inputCls(errors.admissionDate)} />
                </FormField>
                <FormField label="Assessment Type" error={null}>
                  <select value={form.assessmentType} onChange={(e) => setForm((f) => ({ ...f, assessmentType: e.target.value }))} className={inputCls(false)}>
                    {ASSESSMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </FormField>
                <FormField label="Category" error={null}>
                  <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className={inputCls(false)}>
                    {ASSESSMENT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Assessment Date *" error={errors.assessmentDate}>
                  <input type="date" value={form.assessmentDate} onChange={(e) => setForm((f) => ({ ...f, assessmentDate: e.target.value }))} className={inputCls(errors.assessmentDate)} />
                </FormField>
                <FormField label="Risk Level" error={null}>
                  <select value={form.riskLevel} onChange={(e) => setForm((f) => ({ ...f, riskLevel: e.target.value }))} className={inputCls(false)}>
                    {RISK_LEVELS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </FormField>
                <FormField label="Nutritional Status" error={null}>
                  <select value={form.nutritionalStatus} onChange={(e) => setForm((f) => ({ ...f, nutritionalStatus: e.target.value }))} className={inputCls(false)}>
                    {NUTRITIONAL_STATUSES.map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </FormField>
                <FormField label="Assessed By *" error={errors.assessedBy}>
                  <input value={form.assessedBy} onChange={(e) => setForm((f) => ({ ...f, assessedBy: e.target.value }))} placeholder="e.g., Dr. Arvind Menon" className={inputCls(errors.assessedBy)} />
                </FormField>
              </div>

              <FormField label="Presenting Complaints" error={null}>
                <input value={form.presentingComplaints} onChange={(e) => setForm((f) => ({ ...f, presentingComplaints: e.target.value }))} placeholder="Chief complaints" className={inputCls(false)} />
              </FormField>
              <FormField label="Vital Signs" error={null}>
                <input value={form.vitalSigns} onChange={(e) => setForm((f) => ({ ...f, vitalSigns: e.target.value }))} placeholder="BP, HR, Temp..." className={inputCls(false)} />
              </FormField>
              <FormField label="Physical Examination" error={null}>
                <input value={form.physicalExamination} onChange={(e) => setForm((f) => ({ ...f, physicalExamination: e.target.value }))} placeholder="Examination findings" className={inputCls(false)} />
              </FormField>
              <FormField label="Provisional Diagnosis *" error={errors.provisionalDiagnosis}>
                <input value={form.provisionalDiagnosis} onChange={(e) => setForm((f) => ({ ...f, provisionalDiagnosis: e.target.value }))} placeholder="Working diagnosis" className={inputCls(errors.provisionalDiagnosis)} />
              </FormField>
              <FormField label="Treatment Plan" error={null}>
                <input value={form.treatmentPlan} onChange={(e) => setForm((f) => ({ ...f, treatmentPlan: e.target.value }))} placeholder="Planned treatment" className={inputCls(false)} />
              </FormField>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Co-Morbidities" error={null}>
                  <input value={form.coMorbidities} onChange={(e) => setForm((f) => ({ ...f, coMorbidities: e.target.value }))} placeholder="e.g., HTN, DM" className={inputCls(false)} />
                </FormField>
                <FormField label="Allergies" error={null}>
                  <input value={form.allergies} onChange={(e) => setForm((f) => ({ ...f, allergies: e.target.value }))} placeholder="e.g., NKDA" className={inputCls(false)} />
                </FormField>
              </div>
              <FormField label="Remarks" error={null}>
                <textarea value={form.remarks} onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))} rows={2} placeholder="Any additional notes..." className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none" />
              </FormField>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                <button type="submit" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white hover:brightness-95 transition-all shadow-sm">{editingId ? 'Save Changes' : 'Add Assessment'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-sm font-extrabold text-slate-900 mb-2">Confirm Delete</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to delete initial assessment{' '}
              <span className="font-bold text-rose-600">{data.find((r) => r.id === deleteConfirmId)?.id || deleteConfirmId}</span>?
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================== CRUD MODULE: CONSENT MANAGEMENT ================== */
const ConsentModule = ({ hospital, data, setData, allPatients }) => {
  const [search, setSearch] = React.useState('');
  const [filterType, setFilterType] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(EMPTY_CONSENT);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => `cn-${String(getMaxNumeric(data, 'id', 'cn-') + 1).padStart(3, '0')}`;

  const openAddModal = () => { setForm({ ...EMPTY_CONSENT, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const handlePatientChange = (pid) => {
    const p = allPatients.find((x) => x.id === pid);
    if (p) setForm((f) => ({ ...f, patientId: pid, uhID: p.uhID, patientName: p.patientName, department: p.department, consultant: p.consultant }));
    else setForm((f) => ({ ...f, patientId: '', uhID: '', patientName: '', department: '', consultant: '' }));
  };

  const validate = (f) => {
    const e = {};
    if (!f.patientId) e.patientId = 'Patient is required.';
    if (!f.procedureName.trim()) e.procedureName = 'Procedure name is required.';
    if (!f.consentDate) e.consentDate = 'Consent date is required.';
    if (!f.consentStatus) e.consentStatus = 'Consent status is required.';
    return e;
  };

  const handleSave = (ev) => {
    ev.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (editingId) setData((prev) => prev.map((r) => (r.id === editingId ? { ...form, id: editingId } : r)));
    else setData((prev) => [...prev, form]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData((prev) => prev.filter((r) => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      r.patientName.toLowerCase().includes(q) ||
      r.uhID.toLowerCase().includes(q) ||
      r.department.toLowerCase().includes(q) ||
      r.consultant.toLowerCase().includes(q) ||
      (r.procedureName || '').toLowerCase().includes(q);
    const matchType = !filterType || r.consentType === filterType;
    const matchStatus = !filterStatus || r.consentStatus === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const TH_COLS = ['Consent ID', 'UHID', 'Patient', 'Department', 'Consultant', 'Type', 'Procedure', 'Consent Date', 'Status', 'Actions'];

  const consentBadge = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Expired: 'bg-amber-50 text-amber-700 border-amber-200',
    Revoked: 'bg-rose-50 text-rose-700 border-rose-200',
    Pending: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, UHID, department, consultant, procedure..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Types</option>
          {CONSENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Statuses</option>
          {CONSENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button
          onClick={openAddModal}
          style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}
          className="px-3 py-2.5 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Consent
        </button>
      </div>

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
                    No consent records found. Add a consent or adjust filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhID}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600">{r.consultant}</td>
                    <td className="px-3 py-3 text-slate-600">{r.consentType}</td>
                    <td className="px-3 py-3 text-slate-600 max-w-[160px] truncate">{r.procedureName}</td>
                    <td className="px-3 py-3 text-slate-600">{r.consentDate}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${consentBadge[r.consentStatus] || consentBadge.Pending}`}>{r.consentStatus}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 rounded-lg hover:bg-sky-50 text-sky-600 transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
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
            Showing {filtered.length} of {data.length} consent records
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">{editingId ? 'Edit Consent' : 'Add Consent'}</h2>
                <p className="text-[9px] text-slate-400 mt-0.5">{editingId ? `Editing: ${form.id}` : `New: ${form.id}`}</p>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label="Consent ID" error={null}>
                  <input value={form.id} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Patient *" error={errors.patientId}>
                  <select value={form.patientId} onChange={(e) => handlePatientChange(e.target.value)} className={inputCls(errors.patientId)}>
                    <option value="">Select Patient</option>
                    {allPatients.map((p) => <option key={p.id} value={p.id}>{p.patientName} ({p.uhID}) — {p.type}</option>)}
                  </select>
                </FormField>
                <FormField label="UHID" error={null}>
                  <input value={form.uhID} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Patient Name" error={null}>
                  <input value={form.patientName} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Department" error={null}>
                  <input value={form.department} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Consultant" error={null}>
                  <input value={form.consultant} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Consent Type" error={null}>
                  <select value={form.consentType} onChange={(e) => setForm((f) => ({ ...f, consentType: e.target.value }))} className={inputCls(false)}>
                    {CONSENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </FormField>
                <FormField label="Procedure Name *" error={errors.procedureName}>
                  <input value={form.procedureName} onChange={(e) => setForm((f) => ({ ...f, procedureName: e.target.value }))} placeholder="e.g., PTCA" className={inputCls(errors.procedureName)} />
                </FormField>
                <FormField label="Consent Date *" error={errors.consentDate}>
                  <input type="date" value={form.consentDate} onChange={(e) => setForm((f) => ({ ...f, consentDate: e.target.value }))} className={inputCls(errors.consentDate)} />
                </FormField>
                <FormField label="Expiry Date" error={null}>
                  <input type="date" value={form.expiryDate} onChange={(e) => setForm((f) => ({ ...f, expiryDate: e.target.value }))} className={inputCls(false)} />
                </FormField>
                <FormField label="Consent Status" error={null}>
                  <select value={form.consentStatus} onChange={(e) => setForm((f) => ({ ...f, consentStatus: e.target.value }))} className={inputCls(false)}>
                    {CONSENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
                <FormField label="Witness Name" error={null}>
                  <input value={form.witnessName} onChange={(e) => setForm((f) => ({ ...f, witnessName: e.target.value }))} placeholder="e.g., Nurse Lakshmi" className={inputCls(false)} />
                </FormField>
                <FormField label="Witness Role" error={null}>
                  <select value={form.witnessRole} onChange={(e) => setForm((f) => ({ ...f, witnessRole: e.target.value }))} className={inputCls(false)}>
                    {WITNESS_ROLES.map((w) => <option key={w} value={w}>{w}</option>)}
                  </select>
                </FormField>
                <FormField label="Document URL" error={null}>
                  <input value={form.consentDocumentUrl} onChange={(e) => setForm((f) => ({ ...f, consentDocumentUrl: e.target.value }))} placeholder="/consents/cn-xxx.pdf" className={inputCls(false)} />
                </FormField>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
                <label className="flex items-center gap-2 text-[10px] text-slate-700">
                  <input type="checkbox" checked={!!form.patientSignature} onChange={(e) => setForm((f) => ({ ...f, patientSignature: e.target.checked }))} className="w-3.5 h-3.5 accent-sky-500" />
                  Patient Signature
                </label>
                <label className="flex items-center gap-2 text-[10px] text-slate-700">
                  <input type="checkbox" checked={!!form.doctorSignature} onChange={(e) => setForm((f) => ({ ...f, doctorSignature: e.target.checked }))} className="w-3.5 h-3.5 accent-sky-500" />
                  Doctor Signature
                </label>
              </div>

              <FormField label="Remarks" error={null}>
                <textarea value={form.remarks} onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))} rows={2} placeholder="Any additional notes..." className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none" />
              </FormField>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                <button type="submit" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white hover:brightness-95 transition-all shadow-sm">{editingId ? 'Save Changes' : 'Add Consent'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-sm font-extrabold text-slate-900 mb-2">Confirm Delete</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to delete consent{' '}
              <span className="font-bold text-rose-600">{data.find((r) => r.id === deleteConfirmId)?.id || deleteConfirmId}</span>?
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================== CLINICAL DOCUMENTATION WRAPPER ================== */
const ClinicalDocumentationTab = ({ hospital }) => {
  const [assessments, setAssessments] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_ASSESSMENTS);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch { /* ignore */ } }
    return SEED_ASSESSMENTS;
  });
  const [consents, setConsents] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_CONSENTS);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch { /* ignore */ } }
    return SEED_CONSENTS;
  });
  const [summaries, setSummaries] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_SUMMARIES);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch { /* ignore */ } }
    return SEED_SUMMARIES;
  });

  React.useEffect(() => { localStorage.setItem(LS_KEY_ASSESSMENTS, JSON.stringify(assessments)); }, [assessments]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_CONSENTS, JSON.stringify(consents)); }, [consents]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_SUMMARIES, JSON.stringify(summaries)); }, [summaries]);

  const kpis = computeDocKpis(assessments, consents, summaries);

  const [activeSub, setActiveSub] = React.useState('assessment');

  const SUB_TABS = [
    { id: 'assessment', label: 'Initial Assessment Register' },
    { id: 'consent', label: 'Consent Management' },
    { id: 'summary', label: 'Discharge Summary Tracker' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Clinical Documentation</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">
            Initial assessments, consent management, and discharge summary tracking
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">Clinical Documentation Overview</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200">
        {SUB_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveSub(t.id)}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeSub === t.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeSub === 'assessment' && (
        <InitialAssessmentModule hospital={hospital} data={assessments} setData={setAssessments} allPatients={ALL_PATIENTS} />
      )}
      {activeSub === 'consent' && (
        <ConsentModule hospital={hospital} data={consents} setData={setConsents} allPatients={ALL_PATIENTS} />
      )}
      {activeSub === 'summary' && (
        <DischargeSummaryModule hospital={hospital} data={summaries} setData={setSummaries} allPatients={ALL_PATIENTS} />
      )}
    </div>
  );
};

/* ============================================================
   PHASE 5 — RECORD MANAGEMENT CONSTANTS, HELPERS & SEED
   ============================================================ */

const LS_KEY_ISSUE_REGISTER = 'medical_record_issue_register';
const LS_KEY_RETURN_REGISTER = 'medical_record_return_register';
const LS_KEY_ARCHIVE_RETENTION = 'medical_archive_retention';

const RECORD_TYPES = ['Inpatient', 'Outpatient', 'Emergency'];
const RECORD_CONDITIONS = ['Good', 'Damaged', 'Incomplete', 'Missing Pages'];
const RETURN_STATUSES = ['Returned', 'Pending Verification', 'Closed'];
const ARCHIVE_STATUSES = ['Active', 'Archived', 'Due for Disposal', 'Disposed'];

const computeIssueStatus = (rec) => {
  if (rec.status === 'Returned') return 'Returned';
  if (rec.expectedReturnDate && new Date() > new Date(rec.expectedReturnDate)) return 'Overdue';
  return 'Issued';
};

const computeDisposalDate = (archiveDate, retentionYears) => {
  if (!archiveDate || retentionYears === '' || retentionYears === null || retentionYears === undefined) return '';
  const d = new Date(archiveDate);
  if (isNaN(d.getTime())) return '';
  d.setFullYear(d.getFullYear() + Number(retentionYears));
  return d.toISOString().split('T')[0];
};

const computeArchiveStatus = (rec) => {
  if (rec.archiveStatus === 'Disposed') return 'Disposed';
  if (rec.scheduledDisposalDate && new Date() >= new Date(rec.scheduledDisposalDate)) return 'Due for Disposal';
  if (rec.archiveDate && new Date(rec.archiveDate) < new Date(new Date().toDateString())) return 'Archived';
  return 'Active';
};

const computeRecordKpis = (issues, returns, archives) => {
  const totalIssued = issues.length;
  const returned = issues.filter((r) => r.status === 'Returned').length;
  const overdue = issues.filter((r) => computeIssueStatus(r) === 'Overdue').length;
  const activeIssues = issues.filter((r) => r.status === 'Issued').length;
  const returnedRecords = returns.filter((r) => r.returnStatus === 'Returned').length;
  const archivedRecords = archives.filter((r) => r.archiveStatus !== 'Disposed').length;
  const dueForDisposal = archives.filter((r) => computeArchiveStatus(r) === 'Due for Disposal').length;
  const retrievalCompliance = totalIssued ? Math.round((returned / totalIssued) * 100) : 0;
  const archiveCompliance = archives.length ? Math.round(((archives.length - dueForDisposal) / archives.length) * 100) : 0;
  const overall = Math.round((retrievalCompliance + archiveCompliance) / 2) || 0;
  return [
    { label: 'Total Issued Records', value: totalIssued, color: 'text-blue-600' },
    { label: 'Active Issues', value: activeIssues, color: 'text-emerald-600' },
    { label: 'Returned Records', value: returnedRecords, color: 'text-sky-600' },
    { label: 'Overdue Records', value: overdue, color: 'text-rose-600' },
    { label: 'Archived Records', value: archivedRecords, color: 'text-violet-600' },
    { label: 'Due for Disposal', value: dueForDisposal, color: 'text-amber-600' },
    { label: 'Record Retrieval Compliance %', value: `${retrievalCompliance}%`, color: 'text-teal-600' },
    { label: 'Overall Record Management %', value: `${overall}%`, color: 'text-indigo-600' },
  ];
};

const RECORD_MANAGEMENT_PATIENTS = ALL_PATIENTS.map((p) => {
  let mrdNumber = '';
  if (p.type === 'Inpatient') mrdNumber = (SEED_INPATIENT.find((r) => r.id === p.id) || {}).mrdNumber || '';
  else if (p.type === 'Outpatient') mrdNumber = (SEED_OUTPATIENT.find((r) => r.id === p.id) || {}).opRecordNumber || '';
  else mrdNumber = (SEED_EMERGENCY.find((r) => r.id === p.id) || {}).emergencyRecordNumber || '';
  return { ...p, mrdNumber };
});

const STATUS_BADGE_ISSUE = {
  Issued: 'bg-amber-50 text-amber-700 border-amber-200',
  Returned: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Overdue: 'bg-rose-50 text-rose-700 border-rose-200',
};

const STATUS_BADGE_RETURN = {
  Returned: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Pending Verification': 'bg-amber-50 text-amber-700 border-amber-200',
  Closed: 'bg-slate-100 text-slate-600 border-slate-200',
};

const STATUS_BADGE_ARCHIVE = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Archived: 'bg-sky-50 text-sky-700 border-sky-200',
  'Due for Disposal': 'bg-amber-50 text-amber-700 border-amber-200',
  Disposed: 'bg-slate-100 text-slate-600 border-slate-200',
};

const EMPTY_ISSUE = {
  id: '', patientId: '', uhID: '', mrdNumber: '', patientName: '', department: '', consultant: '',
  recordType: 'Inpatient', requestedBy: '', issuedTo: '', issueDate: '', expectedReturnDate: '',
  purpose: '', status: 'Issued', remarks: '',
};

const EMPTY_RETURN = {
  id: '', issueId: '', patientId: '', uhID: '', mrdNumber: '', patientName: '', department: '',
  returnDate: '', receivedBy: '', recordCondition: 'Good', returnStatus: 'Returned', remarks: '',
};

const EMPTY_ARCHIVE = {
  id: '', patientId: '', uhID: '', mrdNumber: '', patientName: '', department: '',
  archiveLocation: '', rack: '', shelf: '', boxNumber: '', archiveDate: '',
  retentionPeriod: '', scheduledDisposalDate: '', archiveStatus: 'Active', remarks: '',
};

const SEED_ISSUES = [
  { id: 'ir-001', patientId: 'ip-001', uhID: 'UHID-000001', mrdNumber: 'MRD/2026/0001', patientName: 'Rajesh Kumar', department: 'Cardiology', consultant: 'Dr. Arvind Menon', recordType: 'Inpatient', requestedBy: 'Dr. Arvind Menon', issuedTo: 'MRD Clerk A', issueDate: '2026-07-01', expectedReturnDate: '2026-07-08', purpose: 'Court case review', status: 'Issued', remarks: 'Requested by medico-legal cell.' },
  { id: 'ir-002', patientId: 'ip-002', uhID: 'UHID-000002', mrdNumber: 'MRD/2026/0002', patientName: 'Meena Nair', department: 'Neurology', consultant: 'Dr. Priya Nair', recordType: 'Inpatient', requestedBy: 'Dr. Priya Nair', issuedTo: 'Dr. Suresh Pillai', issueDate: '2026-06-20', expectedReturnDate: '2026-06-27', purpose: 'Second opinion', status: 'Returned', remarks: 'Returned after review.' },
  { id: 'ir-003', patientId: 'ip-003', uhID: 'UHID-000003', mrdNumber: 'MRD/2026/0003', patientName: 'Suresh Babu', department: 'Orthopaedics', consultant: 'Dr. Suresh Pillai', recordType: 'Inpatient', requestedBy: 'Insurance Desk', issuedTo: 'Insurance Auditor', issueDate: '2026-06-15', expectedReturnDate: '2026-06-22', purpose: 'Insurance claim', status: 'Overdue', remarks: 'Not returned; reminded.' },
  { id: 'ir-004', patientId: 'ip-004', uhID: 'UHID-000004', mrdNumber: 'MRD/2026/0004', patientName: 'Anitha Reddy', department: 'Pediatrics', consultant: 'Dr. Karthik Reddy', recordType: 'Inpatient', requestedBy: 'Dr. Karthik Reddy', issuedTo: 'Nursing Superintendent', issueDate: '2026-07-05', expectedReturnDate: '2026-07-12', purpose: 'Statutory audit', status: 'Issued', remarks: 'Audit review pending.' },
  { id: 'ir-005', patientId: 'ip-005', uhID: 'UHID-000005', mrdNumber: 'MRD/2026/0005', patientName: 'Joseph Mathew', department: 'Cardiology', consultant: 'Dr. Arvind Menon', recordType: 'Inpatient', requestedBy: 'Medicolegal Cell', issuedTo: 'Police Department', issueDate: '2026-06-10', expectedReturnDate: '2026-06-17', purpose: 'MLC investigation', status: 'Overdue', remarks: 'Police custody extended.' },
  { id: 'ir-006', patientId: 'op-001', uhID: 'UHID-000101', mrdNumber: 'OP/2026/0001', patientName: 'Arun Gopal', department: 'General Medicine', consultant: 'Dr. Fatima Sheikh', recordType: 'Outpatient', requestedBy: 'Dr. Fatima Sheikh', issuedTo: 'Research Department', issueDate: '2026-07-08', expectedReturnDate: '2026-07-15', purpose: 'Research study', status: 'Issued', remarks: 'For research review.' },
  { id: 'ir-007', patientId: 'ip-006', uhID: 'UHID-000006', mrdNumber: 'MRD/2026/0006', patientName: 'Lakshmi Devi', department: 'Neurology', consultant: 'Dr. Priya Nair', recordType: 'Inpatient', requestedBy: 'Dr. Priya Nair', issuedTo: 'NABH Audit Team', issueDate: '2026-06-25', expectedReturnDate: '2026-07-02', purpose: 'NABH assessment', status: 'Overdue', remarks: 'Awaiting return.' },
  { id: 'ir-008', patientId: 'em-001', uhID: 'UHID-000201', mrdNumber: 'EM/2026/0001', patientName: 'Sanjay Verma', department: 'Emergency Medicine', consultant: 'Dr. Kavya Menon', recordType: 'Emergency', requestedBy: 'Dr. Kavya Menon', issuedTo: 'MRD Clerk B', issueDate: '2026-07-09', expectedReturnDate: '2026-07-16', purpose: 'Follow-up review', status: 'Issued', remarks: 'Emergency record issued.' },
  { id: 'ir-009', patientId: 'ip-007', uhID: 'UHID-000007', mrdNumber: 'MRD/2026/0007', patientName: 'Vikram Singh', department: 'Orthopaedics', consultant: 'Dr. Suresh Pillai', recordType: 'Inpatient', requestedBy: 'Dr. Suresh Pillai', issuedTo: 'Court', issueDate: '2026-06-18', expectedReturnDate: '2026-06-25', purpose: 'Medico-legal', status: 'Returned', remarks: 'Returned after court.' },
  { id: 'ir-010', patientId: 'ip-008', uhID: 'UHID-000008', mrdNumber: 'MRD/2026/0008', patientName: 'Fatima Begum', department: 'Pediatrics', consultant: 'Dr. Karthik Reddy', recordType: 'Inpatient', requestedBy: 'Dr. Karthik Reddy', issuedTo: 'Quality Department', issueDate: '2026-07-06', expectedReturnDate: '2026-07-13', purpose: 'Quality review', status: 'Issued', remarks: 'For quality check.' },
];

const SEED_RETURNS = [
  { id: 'rt-001', issueId: 'ir-002', patientId: 'ip-002', uhID: 'UHID-000002', mrdNumber: 'MRD/2026/0002', patientName: 'Meena Nair', department: 'Neurology', returnDate: '2026-06-28', receivedBy: 'MRD Clerk A', recordCondition: 'Good', returnStatus: 'Returned', remarks: 'Returned in good condition.' },
  { id: 'rt-002', issueId: 'ir-003', patientId: 'ip-003', uhID: 'UHID-000003', mrdNumber: 'MRD/2026/0003', patientName: 'Suresh Babu', department: 'Orthopaedics', returnDate: '2026-06-29', receivedBy: 'MRD Clerk A', recordCondition: 'Incomplete', returnStatus: 'Pending Verification', remarks: 'Pages missing; verifying.' },
  { id: 'rt-003', issueId: 'ir-009', patientId: 'ip-007', uhID: 'UHID-000007', mrdNumber: 'MRD/2026/0007', patientName: 'Vikram Singh', department: 'Orthopaedics', returnDate: '2026-06-26', receivedBy: 'MRD Clerk B', recordCondition: 'Good', returnStatus: 'Returned', remarks: 'Returned after court.' },
  { id: 'rt-004', issueId: 'ir-005', patientId: 'ip-005', uhID: 'UHID-000005', mrdNumber: 'MRD/2026/0005', patientName: 'Joseph Mathew', department: 'Cardiology', returnDate: '2026-06-20', receivedBy: 'Police Department', recordCondition: 'Missing Pages', returnStatus: 'Closed', remarks: 'Case closed by police.' },
  { id: 'rt-005', issueId: 'ir-001', patientId: 'ip-001', uhID: 'UHID-000001', mrdNumber: 'MRD/2026/0001', patientName: 'Rajesh Kumar', department: 'Cardiology', returnDate: '2026-07-09', receivedBy: 'MRD Clerk A', recordCondition: 'Good', returnStatus: 'Returned', remarks: 'Returned on time.' },
  { id: 'rt-006', issueId: 'ir-004', patientId: 'ip-004', uhID: 'UHID-000004', mrdNumber: 'MRD/2026/0004', patientName: 'Anitha Reddy', department: 'Pediatrics', returnDate: '2026-07-12', receivedBy: 'Nursing Superintendent', recordCondition: 'Good', returnStatus: 'Returned', remarks: 'Returned after audit.' },
  { id: 'rt-007', issueId: 'ir-006', patientId: 'op-001', uhID: 'UHID-000101', mrdNumber: 'OP/2026/0001', patientName: 'Arun Gopal', department: 'General Medicine', returnDate: '2026-07-14', receivedBy: 'Research Department', recordCondition: 'Good', returnStatus: 'Returned', remarks: 'Returned to OPD.' },
  { id: 'rt-008', issueId: 'ir-007', patientId: 'ip-006', uhID: 'UHID-000006', mrdNumber: 'MRD/2026/0006', patientName: 'Lakshmi Devi', department: 'Neurology', returnDate: '2026-07-03', receivedBy: 'NABH Audit Team', recordCondition: 'Damaged', returnStatus: 'Pending Verification', remarks: 'Cover damaged; verifying.' },
  { id: 'rt-009', issueId: 'ir-008', patientId: 'em-001', uhID: 'UHID-000201', mrdNumber: 'EM/2026/0001', patientName: 'Sanjay Verma', department: 'Emergency Medicine', returnDate: '2026-07-15', receivedBy: 'MRD Clerk B', recordCondition: 'Good', returnStatus: 'Returned', remarks: 'Returned to ER.' },
  { id: 'rt-010', issueId: 'ir-010', patientId: 'ip-008', uhID: 'UHID-000008', mrdNumber: 'MRD/2026/0008', patientName: 'Fatima Begum', department: 'Pediatrics', returnDate: '2026-07-13', receivedBy: 'Quality Department', recordCondition: 'Good', returnStatus: 'Closed', remarks: 'Quality review closed.' },
];

const SEED_ARCHIVES = [
  { id: 'ar-001', patientId: 'ip-001', uhID: 'UHID-000001', mrdNumber: 'MRD/2026/0001', patientName: 'Rajesh Kumar', department: 'Cardiology', archiveLocation: 'Central Archive A', rack: 'R-01', shelf: 'S-02', boxNumber: 'B-010', archiveDate: '2026-07-10', retentionPeriod: 7, scheduledDisposalDate: '2033-07-10', archiveStatus: 'Archived', remarks: 'Active retention.' },
  { id: 'ar-002', patientId: 'ip-002', uhID: 'UHID-000002', mrdNumber: 'MRD/2026/0002', patientName: 'Meena Nair', department: 'Neurology', archiveLocation: 'Central Archive A', rack: 'R-01', shelf: 'S-03', boxNumber: 'B-011', archiveDate: '2026-07-09', retentionPeriod: 5, scheduledDisposalDate: '2031-07-09', archiveStatus: 'Archived', remarks: 'Neurology block.' },
  { id: 'ar-003', patientId: 'ip-003', uhID: 'UHID-000003', mrdNumber: 'MRD/2026/0003', patientName: 'Suresh Babu', department: 'Orthopaedics', archiveLocation: 'Central Archive B', rack: 'R-02', shelf: 'S-01', boxNumber: 'B-020', archiveDate: '2026-07-08', retentionPeriod: 3, scheduledDisposalDate: '2029-07-08', archiveStatus: 'Archived', remarks: 'Ortho section.' },
  { id: 'ar-004', patientId: 'ip-004', uhID: 'UHID-000004', mrdNumber: 'MRD/2026/0004', patientName: 'Anitha Reddy', department: 'Pediatrics', archiveLocation: 'Central Archive B', rack: 'R-02', shelf: 'S-04', boxNumber: 'B-021', archiveDate: '2026-07-07', retentionPeriod: 10, scheduledDisposalDate: '2036-07-07', archiveStatus: 'Archived', remarks: 'Pediatric records.' },
  { id: 'ar-005', patientId: 'ip-005', uhID: 'UHID-000005', mrdNumber: 'MRD/2026/0005', patientName: 'Joseph Mathew', department: 'Cardiology', archiveLocation: 'Old Store', rack: 'R-09', shelf: 'S-09', boxNumber: 'B-090', archiveDate: '2021-07-01', retentionPeriod: 5, scheduledDisposalDate: '2026-07-01', archiveStatus: 'Due for Disposal', remarks: 'Retention complete; dispose.' },
  { id: 'ar-006', patientId: 'op-001', uhID: 'UHID-000101', mrdNumber: 'OP/2026/0001', patientName: 'Arun Gopal', department: 'General Medicine', archiveLocation: 'Central Archive C', rack: 'R-03', shelf: 'S-02', boxNumber: 'B-030', archiveDate: '2026-07-06', retentionPeriod: 2, scheduledDisposalDate: '2028-07-06', archiveStatus: 'Archived', remarks: 'OPD records.' },
  { id: 'ar-007', patientId: 'ip-006', uhID: 'UHID-000006', mrdNumber: 'MRD/2026/0006', patientName: 'Lakshmi Devi', department: 'Neurology', archiveLocation: 'Old Store', rack: 'R-08', shelf: 'S-08', boxNumber: 'B-080', archiveDate: '2020-06-15', retentionPeriod: 5, scheduledDisposalDate: '2025-06-15', archiveStatus: 'Due for Disposal', remarks: 'Past retention; dispose.' },
  { id: 'ar-008', patientId: 'em-001', uhID: 'UHID-000201', mrdNumber: 'EM/2026/0001', patientName: 'Sanjay Verma', department: 'Emergency Medicine', archiveLocation: 'Central Archive A', rack: 'R-01', shelf: 'S-05', boxNumber: 'B-015', archiveDate: '2026-07-05', retentionPeriod: 7, scheduledDisposalDate: '2033-07-05', archiveStatus: 'Archived', remarks: 'Emergency archive.' },
  { id: 'ar-009', patientId: 'ip-007', uhID: 'UHID-000007', mrdNumber: 'MRD/2026/0007', patientName: 'Vikram Singh', department: 'Orthopaedics', archiveLocation: 'Central Archive B', rack: 'R-02', shelf: 'S-02', boxNumber: 'B-022', archiveDate: '2026-07-04', retentionPeriod: 1, scheduledDisposalDate: '2027-07-04', archiveStatus: 'Archived', remarks: 'Short retention.' },
  { id: 'ar-010', patientId: 'ip-008', uhID: 'UHID-000008', mrdNumber: 'MRD/2026/0008', patientName: 'Fatima Begum', department: 'Pediatrics', archiveLocation: 'Old Store', rack: 'R-07', shelf: 'S-07', boxNumber: 'B-070', archiveDate: '2019-01-01', retentionPeriod: 5, scheduledDisposalDate: '2024-01-01', archiveStatus: 'Disposed', remarks: 'Disposed after retention.' },
];

/* ================== CRUD MODULE: MEDICAL RECORD ISSUE REGISTER ================== */
const IssueRegisterModule = ({ hospital, data, setData, allPatients }) => {
  const [search, setSearch] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterType, setFilterType] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(EMPTY_ISSUE);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => `ir-${String(getMaxNumeric(data, 'id', 'ir-') + 1).padStart(3, '0')}`;

  const openAddModal = () => { setForm({ ...EMPTY_ISSUE, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const handlePatientChange = (pid) => {
    const p = allPatients.find((x) => x.id === pid);
    if (p) setForm((f) => ({ ...f, patientId: pid, uhID: p.uhID, mrdNumber: p.mrdNumber, patientName: p.patientName, department: p.department, consultant: p.consultant }));
    else setForm((f) => ({ ...f, patientId: '', uhID: '', mrdNumber: '', patientName: '', department: '', consultant: '' }));
  };

  const validate = (f) => {
    const e = {};
    if (!f.patientId) e.patientId = 'Patient is required.';
    if (!f.recordType) e.recordType = 'Record type is required.';
    if (!f.issuedTo.trim()) e.issuedTo = 'Issued to is required.';
    if (!f.issueDate) e.issueDate = 'Issue date is required.';
    if (!f.expectedReturnDate) e.expectedReturnDate = 'Expected return date is required.';
    return e;
  };

  const handleSave = (ev) => {
    ev.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const savedStatus = form.status === 'Returned'
      ? 'Returned'
      : (form.expectedReturnDate && new Date() > new Date(form.expectedReturnDate) ? 'Overdue' : 'Issued');
    const record = { ...form, status: savedStatus };
    if (editingId) setData((prev) => prev.map((r) => (r.id === editingId ? { ...record, id: editingId } : r)));
    else setData((prev) => [...prev, record]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData((prev) => prev.filter((r) => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      r.patientName.toLowerCase().includes(q) ||
      r.uhID.toLowerCase().includes(q) ||
      r.mrdNumber.toLowerCase().includes(q) ||
      r.department.toLowerCase().includes(q) ||
      (r.issuedTo || '').toLowerCase().includes(q);
    const matchDept = !filterDept || r.department === filterDept;
    const matchType = !filterType || r.recordType === filterType;
    const matchStatus = !filterStatus || computeIssueStatus(r) === filterStatus;
    return matchSearch && matchDept && matchType && matchStatus;
  });

  const TH_COLS = ['Issue ID', 'UHID', 'MRD No', 'Patient', 'Department', 'Type', 'Issued To', 'Issue Date', 'Expected Return', 'Status', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, UHID, MRD no, department, issued to..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Types</option>
          {RECORD_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Statuses</option>
          {['Issued', 'Returned', 'Overdue'].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button
          onClick={openAddModal}
          style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}
          className="px-3 py-2.5 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Issue
        </button>
      </div>

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
                    No issue records found. Add an issue or adjust filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhID}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.mrdNumber}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600">{r.recordType}</td>
                    <td className="px-3 py-3 text-slate-600">{r.issuedTo}</td>
                    <td className="px-3 py-3 text-slate-600">{r.issueDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.expectedReturnDate}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_ISSUE[computeIssueStatus(r)] || STATUS_BADGE_ISSUE.Issued}`}>{computeIssueStatus(r)}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 rounded-lg hover:bg-sky-50 text-sky-600 transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
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
            Showing {filtered.length} of {data.length} issue records
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">{editingId ? 'Edit Issue Record' : 'Add Issue Record'}</h2>
                <p className="text-[9px] text-slate-400 mt-0.5">{editingId ? `Editing: ${form.id}` : `New: ${form.id}`}</p>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label="Issue ID" error={null}>
                  <input value={form.id} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Patient *" error={errors.patientId}>
                  <select value={form.patientId} onChange={(e) => handlePatientChange(e.target.value)} className={inputCls(errors.patientId)}>
                    <option value="">Select Patient</option>
                    {allPatients.map((p) => <option key={p.id} value={p.id}>{p.patientName} ({p.uhID}) — {p.type}</option>)}
                  </select>
                </FormField>
                <FormField label="UHID" error={null}>
                  <input value={form.uhID} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="MRD Number" error={null}>
                  <input value={form.mrdNumber} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Patient Name" error={null}>
                  <input value={form.patientName} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Department" error={null}>
                  <input value={form.department} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Record Type *" error={null}>
                  <select value={form.recordType} onChange={(e) => setForm((f) => ({ ...f, recordType: e.target.value }))} className={inputCls(false)}>
                    {RECORD_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </FormField>
                <FormField label="Requested By" error={null}>
                  <input value={form.requestedBy} onChange={(e) => setForm((f) => ({ ...f, requestedBy: e.target.value }))} placeholder="e.g., Dr. Arvind Menon" className={inputCls(false)} />
                </FormField>
                <FormField label="Issued To *" error={errors.issuedTo}>
                  <input value={form.issuedTo} onChange={(e) => setForm((f) => ({ ...f, issuedTo: e.target.value }))} placeholder="e.g., MRD Clerk" className={inputCls(errors.issuedTo)} />
                </FormField>
                <FormField label="Issue Date *" error={errors.issueDate}>
                  <input type="date" value={form.issueDate} onChange={(e) => setForm((f) => ({ ...f, issueDate: e.target.value }))} className={inputCls(errors.issueDate)} />
                </FormField>
                <FormField label="Expected Return Date *" error={errors.expectedReturnDate}>
                  <input type="date" value={form.expectedReturnDate} onChange={(e) => setForm((f) => ({ ...f, expectedReturnDate: e.target.value }))} className={inputCls(errors.expectedReturnDate)} />
                </FormField>
                <FormField label="Status" error={null}>
                  <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className={inputCls(false)}>
                    {['Issued', 'Returned', 'Overdue'].map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
              </div>

              <FormField label="Purpose" error={null}>
                <input value={form.purpose} onChange={(e) => setForm((f) => ({ ...f, purpose: e.target.value }))} placeholder="e.g., Court case review" className={inputCls(false)} />
              </FormField>
              <FormField label="Remarks" error={null}>
                <textarea value={form.remarks} onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))} rows={2} placeholder="Any additional notes..." className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none" />
              </FormField>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                <button type="submit" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white hover:brightness-95 transition-all shadow-sm">{editingId ? 'Save Changes' : 'Add Issue'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-sm font-extrabold text-slate-900 mb-2">Confirm Delete</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to delete issue record{' '}
              <span className="font-bold text-rose-600">{data.find((r) => r.id === deleteConfirmId)?.id || deleteConfirmId}</span>?
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================== CRUD MODULE: MEDICAL RECORD RETURN REGISTER ================== */
const ReturnRegisterModule = ({ hospital, data, setData, issues }) => {
  const [search, setSearch] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');
  const [filterCondition, setFilterCondition] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(EMPTY_RETURN);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => `rt-${String(getMaxNumeric(data, 'id', 'rt-') + 1).padStart(3, '0')}`;

  const openAddModal = () => { setForm({ ...EMPTY_RETURN, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const handleLinkedIssueChange = (iid) => {
    const iss = issues.find((x) => x.id === iid);
    if (iss) setForm((f) => ({ ...f, issueId: iid, patientId: iss.patientId, uhID: iss.uhID, mrdNumber: iss.mrdNumber, patientName: iss.patientName, department: iss.department }));
    else setForm((f) => ({ ...f, issueId: '', patientId: '', uhID: '', mrdNumber: '', patientName: '', department: '' }));
  };

  const validate = (f) => {
    const e = {};
    if (!f.issueId) e.issueId = 'Linked issue is required.';
    if (!f.returnDate) e.returnDate = 'Return date is required.';
    if (!f.receivedBy.trim()) e.receivedBy = 'Received by is required.';
    if (!f.returnStatus) e.returnStatus = 'Return status is required.';
    return e;
  };

  const handleSave = (ev) => {
    ev.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (editingId) setData((prev) => prev.map((r) => (r.id === editingId ? { ...form, id: editingId } : r)));
    else setData((prev) => [...prev, form]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData((prev) => prev.filter((r) => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      r.patientName.toLowerCase().includes(q) ||
      r.uhID.toLowerCase().includes(q) ||
      r.mrdNumber.toLowerCase().includes(q) ||
      (r.department || '').toLowerCase().includes(q);
    const matchStatus = !filterStatus || r.returnStatus === filterStatus;
    const matchCondition = !filterCondition || r.recordCondition === filterCondition;
    return matchSearch && matchStatus && matchCondition;
  });

  const TH_COLS = ['Return ID', 'Linked Issue', 'Patient', 'UHID', 'MRD No', 'Return Date', 'Received By', 'Condition', 'Status', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, UHID, MRD no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>
        <select value={filterCondition} onChange={(e) => setFilterCondition(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Conditions</option>
          {RECORD_CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Statuses</option>
          {RETURN_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button
          onClick={openAddModal}
          style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}
          className="px-3 py-2.5 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Return
        </button>
      </div>

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
                    No return records found. Add a return or adjust filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.issueId}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhID}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.mrdNumber}</td>
                    <td className="px-3 py-3 text-slate-600">{r.returnDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.receivedBy}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_RETURN[r.returnStatus] || STATUS_BADGE_RETURN.Returned}`}>{r.recordCondition}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_RETURN[r.returnStatus] || STATUS_BADGE_RETURN.Returned}`}>{r.returnStatus}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 rounded-lg hover:bg-sky-50 text-sky-600 transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
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
            Showing {filtered.length} of {data.length} return records
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">{editingId ? 'Edit Return Record' : 'Add Return Record'}</h2>
                <p className="text-[9px] text-slate-400 mt-0.5">{editingId ? `Editing: ${form.id}` : `New: ${form.id}`}</p>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label="Return ID" error={null}>
                  <input value={form.id} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Linked Issue *" error={errors.issueId}>
                  <select value={form.issueId} onChange={(e) => handleLinkedIssueChange(e.target.value)} className={inputCls(errors.issueId)}>
                    <option value="">Select Linked Issue</option>
                    {issues.map((i) => <option key={i.id} value={i.id}>{i.id} — {i.patientName}</option>)}
                  </select>
                </FormField>
                <FormField label="Patient" error={null}>
                  <input value={form.patientName} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="UHID" error={null}>
                  <input value={form.uhID} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="MRD Number" error={null}>
                  <input value={form.mrdNumber} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Department" error={null}>
                  <input value={form.department} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Return Date *" error={errors.returnDate}>
                  <input type="date" value={form.returnDate} onChange={(e) => setForm((f) => ({ ...f, returnDate: e.target.value }))} className={inputCls(errors.returnDate)} />
                </FormField>
                <FormField label="Received By *" error={errors.receivedBy}>
                  <input value={form.receivedBy} onChange={(e) => setForm((f) => ({ ...f, receivedBy: e.target.value }))} placeholder="e.g., MRD Clerk" className={inputCls(errors.receivedBy)} />
                </FormField>
                <FormField label="Record Condition" error={null}>
                  <select value={form.recordCondition} onChange={(e) => setForm((f) => ({ ...f, recordCondition: e.target.value }))} className={inputCls(false)}>
                    {RECORD_CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Return Status" error={null}>
                  <select value={form.returnStatus} onChange={(e) => setForm((f) => ({ ...f, returnStatus: e.target.value }))} className={inputCls(false)}>
                    {RETURN_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
              </div>

              <FormField label="Remarks" error={null}>
                <textarea value={form.remarks} onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))} rows={2} placeholder="Any additional notes..." className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none" />
              </FormField>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                <button type="submit" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white hover:brightness-95 transition-all shadow-sm">{editingId ? 'Save Changes' : 'Add Return'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-sm font-extrabold text-slate-900 mb-2">Confirm Delete</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to delete return record{' '}
              <span className="font-bold text-rose-600">{data.find((r) => r.id === deleteConfirmId)?.id || deleteConfirmId}</span>?
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================== CRUD MODULE: ARCHIVE & RETENTION REGISTER ================== */
const ArchiveRetentionModule = ({ hospital, data, setData, allPatients }) => {
  const [search, setSearch] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(EMPTY_ARCHIVE);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => `ar-${String(getMaxNumeric(data, 'id', 'ar-') + 1).padStart(3, '0')}`;

  const openAddModal = () => { setForm({ ...EMPTY_ARCHIVE, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const handlePatientChange = (pid) => {
    const p = allPatients.find((x) => x.id === pid);
    if (p) setForm((f) => ({ ...f, patientId: pid, uhID: p.uhID, mrdNumber: p.mrdNumber, patientName: p.patientName, department: p.department }));
    else setForm((f) => ({ ...f, patientId: '', uhID: '', mrdNumber: '', patientName: '', department: '' }));
  };

  const handleArchiveField = (field, value) => {
    setForm((f) => {
      const updated = { ...f, [field]: value };
      const sd = computeDisposalDate(updated.archiveDate, updated.retentionPeriod);
      updated.scheduledDisposalDate = sd;
      updated.archiveStatus = computeArchiveStatus({ ...updated, scheduledDisposalDate: sd });
      return updated;
    });
  };

  const validate = (f) => {
    const e = {};
    if (!f.patientId) e.patientId = 'Patient is required.';
    if (!f.archiveLocation.trim()) e.archiveLocation = 'Archive location is required.';
    if (!f.archiveDate) e.archiveDate = 'Archive date is required.';
    if (f.retentionPeriod === '' || f.retentionPeriod === null) e.retentionPeriod = 'Retention period is required.';
    else if (Number(f.retentionPeriod) < 0) e.retentionPeriod = 'Cannot be negative.';
    return e;
  };

  const handleSave = (ev) => {
    ev.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const sd = computeDisposalDate(form.archiveDate, form.retentionPeriod);
    const record = { ...form, retentionPeriod: Number(form.retentionPeriod), scheduledDisposalDate: sd, archiveStatus: computeArchiveStatus({ ...form, scheduledDisposalDate: sd }) };
    if (editingId) setData((prev) => prev.map((r) => (r.id === editingId ? { ...record, id: editingId } : r)));
    else setData((prev) => [...prev, record]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData((prev) => prev.filter((r) => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      r.patientName.toLowerCase().includes(q) ||
      r.uhID.toLowerCase().includes(q) ||
      r.mrdNumber.toLowerCase().includes(q) ||
      r.department.toLowerCase().includes(q) ||
      (r.archiveLocation || '').toLowerCase().includes(q);
    const matchDept = !filterDept || r.department === filterDept;
    const matchStatus = !filterStatus || computeArchiveStatus(r) === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const TH_COLS = ['Archive ID', 'UHID', 'MRD No', 'Patient', 'Department', 'Location', 'Archive Date', 'Disposal Date', 'Status', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, UHID, MRD no, department, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Statuses</option>
          {ARCHIVE_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button
          onClick={openAddModal}
          style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}
          className="px-3 py-2.5 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Archive
        </button>
      </div>

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
                    No archive records found. Add an archive or adjust filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhID}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.mrdNumber}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600">{r.archiveLocation}</td>
                    <td className="px-3 py-3 text-slate-600">{r.archiveDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.scheduledDisposalDate}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_ARCHIVE[computeArchiveStatus(r)] || STATUS_BADGE_ARCHIVE.Active}`}>{computeArchiveStatus(r)}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 rounded-lg hover:bg-sky-50 text-sky-600 transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
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
            Showing {filtered.length} of {data.length} archive records
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">{editingId ? 'Edit Archive Record' : 'Add Archive Record'}</h2>
                <p className="text-[9px] text-slate-400 mt-0.5">{editingId ? `Editing: ${form.id}` : `New: ${form.id}`}</p>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label="Archive ID" error={null}>
                  <input value={form.id} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Patient *" error={errors.patientId}>
                  <select value={form.patientId} onChange={(e) => handlePatientChange(e.target.value)} className={inputCls(errors.patientId)}>
                    <option value="">Select Patient</option>
                    {allPatients.map((p) => <option key={p.id} value={p.id}>{p.patientName} ({p.uhID}) — {p.type}</option>)}
                  </select>
                </FormField>
                <FormField label="UHID" error={null}>
                  <input value={form.uhID} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="MRD Number" error={null}>
                  <input value={form.mrdNumber} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Patient Name" error={null}>
                  <input value={form.patientName} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Department" error={null}>
                  <input value={form.department} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Archive Location *" error={errors.archiveLocation}>
                  <input value={form.archiveLocation} onChange={(e) => setForm((f) => ({ ...f, archiveLocation: e.target.value }))} placeholder="e.g., Central Archive A" className={inputCls(errors.archiveLocation)} />
                </FormField>
                <FormField label="Rack" error={null}>
                  <input value={form.rack} onChange={(e) => setForm((f) => ({ ...f, rack: e.target.value }))} placeholder="e.g., R-01" className={inputCls(false)} />
                </FormField>
                <FormField label="Shelf" error={null}>
                  <input value={form.shelf} onChange={(e) => setForm((f) => ({ ...f, shelf: e.target.value }))} placeholder="e.g., S-02" className={inputCls(false)} />
                </FormField>
                <FormField label="Box Number" error={null}>
                  <input value={form.boxNumber} onChange={(e) => setForm((f) => ({ ...f, boxNumber: e.target.value }))} placeholder="e.g., B-010" className={inputCls(false)} />
                </FormField>
                <FormField label="Archive Date *" error={errors.archiveDate}>
                  <input type="date" value={form.archiveDate} onChange={(e) => handleArchiveField('archiveDate', e.target.value)} className={inputCls(errors.archiveDate)} />
                </FormField>
                <FormField label="Retention Period (Years) *" error={errors.retentionPeriod}>
                  <input type="number" min="0" value={form.retentionPeriod} onChange={(e) => handleArchiveField('retentionPeriod', e.target.value)} placeholder="e.g., 7" className={inputCls(errors.retentionPeriod)} />
                </FormField>
                <FormField label="Scheduled Disposal Date (Auto)" error={null}>
                  <input value={form.scheduledDisposalDate || ''} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Archive Status (Auto)" error={null}>
                  <div className={`flex items-center px-3 py-2 border border-slate-200 rounded-xl text-[10px] font-bold ${STATUS_BADGE_ARCHIVE[computeArchiveStatus(form)] || STATUS_BADGE_ARCHIVE.Active}`}>
                    {computeArchiveStatus(form)}
                    <span className="ml-1 text-[8px] font-normal text-slate-400">(auto)</span>
                  </div>
                </FormField>
              </div>

              <FormField label="Remarks" error={null}>
                <textarea value={form.remarks} onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))} rows={2} placeholder="Any additional notes..." className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none" />
              </FormField>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                <button type="submit" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white hover:brightness-95 transition-all shadow-sm">{editingId ? 'Save Changes' : 'Add Archive'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-sm font-extrabold text-slate-900 mb-2">Confirm Delete</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to delete archive record{' '}
              <span className="font-bold text-rose-600">{data.find((r) => r.id === deleteConfirmId)?.id || deleteConfirmId}</span>?
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   PHASE 6 — INTERNAL AUDIT CONSTANTS, HELPERS & SEED
   ============================================================ */

const LS_KEY_INTERNAL_AUDITS = 'medical_internal_audits';
const LS_KEY_CAPA_TRACKER = 'medical_capa_tracker';

const AUDIT_TYPES = ['Routine Audit', 'Documentation Audit', 'Random Audit', 'Death Audit Review', 'Discharge Summary Audit'];
const OBSERVATION_CATEGORIES = ['Critical', 'Major', 'Minor'];
const AUDIT_STATUSES = ['Scheduled', 'In Progress', 'Completed'];
const CAPA_STATUSES = ['Open', 'In Progress', 'Closed', 'Overdue'];

const computeCapaStatus = (rec) => {
  if (rec.completionDate) return 'Closed';
  if (rec.targetDate && new Date() > new Date(rec.targetDate)) return 'Overdue';
  return rec.status;
};

const computeAuditKpis = (audits, capas) => {
  const totalAudits = audits.length;
  const completedAudits = audits.filter((r) => r.auditStatus === 'Completed').length;
  const pendingAudits = audits.filter((r) => r.auditStatus !== 'Completed').length;
  const avgCompliance = totalAudits
    ? Math.round(audits.reduce((s, r) => s + (Number(r.complianceScore) || 0), 0) / totalAudits)
    : 0;
  const totalCapas = capas.length;
  const closedCapas = capas.filter((r) => computeCapaStatus(r) === 'Closed').length;
  const overdueCapas = capas.filter((r) => computeCapaStatus(r) === 'Overdue').length;
  const capaClosureRate = totalCapas ? Math.round((closedCapas / totalCapas) * 100) : 0;
  const overall = Math.round((avgCompliance + capaClosureRate) / 2) || 0;
  return [
    { label: 'Total Audits', value: totalAudits, color: 'text-blue-600' },
    { label: 'Completed Audits', value: completedAudits, color: 'text-emerald-600' },
    { label: 'Pending Audits', value: pendingAudits, color: 'text-amber-600' },
    { label: 'Average Compliance %', value: `${avgCompliance}%`, color: 'text-teal-600' },
    { label: 'Total CAPAs', value: totalCapas, color: 'text-violet-600' },
    { label: 'Closed CAPAs', value: closedCapas, color: 'text-sky-600' },
    { label: 'Overdue CAPAs', value: overdueCapas, color: 'text-rose-600' },
    { label: 'Overall Audit Compliance %', value: `${overall}%`, color: 'text-indigo-600' },
  ];
};

const STATUS_BADGE_AUDIT = {
  Scheduled: 'bg-amber-50 text-amber-700 border-amber-200',
  'In Progress': 'bg-sky-50 text-sky-700 border-sky-200',
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const STATUS_BADGE_OBSERVATION = {
  Critical: 'bg-rose-50 text-rose-700 border-rose-200',
  Major: 'bg-amber-50 text-amber-700 border-amber-200',
  Minor: 'bg-sky-50 text-sky-700 border-sky-200',
};

const STATUS_BADGE_CAPA = {
  Open: 'bg-amber-50 text-amber-700 border-amber-200',
  'In Progress': 'bg-sky-50 text-sky-700 border-sky-200',
  Closed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Overdue: 'bg-rose-50 text-rose-700 border-rose-200',
};

const EMPTY_AUDIT = {
  id: '', auditDate: '', patientId: '', uhID: '', mrdNumber: '', patientName: '', department: '', consultant: '',
  auditType: 'Routine Audit', auditor: '', complianceScore: '', observationCategory: 'Minor',
  auditFindings: '', recommendation: '', targetClosureDate: '', auditStatus: 'Scheduled', remarks: '',
};

const EMPTY_CAPA = {
  id: '', auditId: '', patientId: '', patientName: '', department: '',
  capaDescription: '', rootCause: '', correctiveAction: '', preventiveAction: '',
  responsiblePerson: '', targetDate: '', completionDate: '', status: 'Open', remarks: '',
};

const SEED_AUDITS = [
  { id: 'au-001', auditDate: '2026-07-02', patientId: 'ip-001', uhID: 'UHID-000001', mrdNumber: 'MRD/2026/0001', patientName: 'Rajesh Kumar', department: 'Cardiology', consultant: 'Dr. Arvind Menon', auditType: 'Routine Audit', auditor: 'Dr. Nandakumar (MRD)', complianceScore: 92, observationCategory: 'Minor', auditFindings: 'Minor documentation gap in progress notes', recommendation: 'Staff reorientation', targetClosureDate: '2026-07-09', auditStatus: 'Completed', remarks: 'Minor gaps closed.' },
  { id: 'au-002', auditDate: '2026-07-03', patientId: 'ip-002', uhID: 'UHID-000002', mrdNumber: 'MRD/2026/0002', patientName: 'Meena Nair', department: 'Neurology', consultant: 'Dr. Priya Nair', auditType: 'Documentation Audit', auditor: 'Dr. Nandakumar (MRD)', complianceScore: 88, observationCategory: 'Major', auditFindings: 'Missing consultant notes', recommendation: 'Add consultant note template', targetClosureDate: '2026-07-10', auditStatus: 'In Progress', remarks: 'CAPA in progress.' },
  { id: 'au-003', auditDate: '2026-07-04', patientId: 'ip-003', uhID: 'UHID-000003', mrdNumber: 'MRD/2026/0003', patientName: 'Suresh Babu', department: 'Orthopaedics', consultant: 'Dr. Suresh Pillai', auditType: 'Random Audit', auditor: 'Dr. Lakshmi (MRD)', complianceScore: 90, observationCategory: 'Minor', auditFindings: 'Illegible handwriting', recommendation: 'Dictation training', targetClosureDate: '2026-07-11', auditStatus: 'Completed', remarks: 'Training completed.' },
  { id: 'au-004', auditDate: '2026-07-05', patientId: 'ip-004', uhID: 'UHID-000004', mrdNumber: 'MRD/2026/0004', patientName: 'Anitha Reddy', department: 'Pediatrics', consultant: 'Dr. Karthik Reddy', auditType: 'Death Audit Review', auditor: 'Death Review Committee', complianceScore: 80, observationCategory: 'Major', auditFindings: 'Delayed death audit review', recommendation: 'CAPA raised', targetClosureDate: '2026-07-12', auditStatus: 'In Progress', remarks: 'Under review.' },
  { id: 'au-005', auditDate: '2026-07-06', patientId: 'ip-005', uhID: 'UHID-000005', mrdNumber: 'MRD/2026/0005', patientName: 'Joseph Mathew', department: 'Cardiology', consultant: 'Dr. Arvind Menon', auditType: 'Discharge Summary Audit', auditor: 'Dr. Nandakumar (MRD)', complianceScore: 95, observationCategory: 'Minor', auditFindings: 'Summary TAT met', recommendation: 'Continue practice', targetClosureDate: '2026-07-13', auditStatus: 'Completed', remarks: 'Compliant.' },
  { id: 'au-006', auditDate: '2026-07-07', patientId: 'ip-006', uhID: 'UHID-000006', mrdNumber: 'MRD/2026/0006', patientName: 'Lakshmi Devi', department: 'Neurology', consultant: 'Dr. Priya Nair', auditType: 'Documentation Audit', auditor: 'Dr. Lakshmi (MRD)', complianceScore: 78, observationCategory: 'Critical', auditFindings: 'Missing consent & discharge summary', recommendation: 'Immediate CAPA', targetClosureDate: '2026-07-14', auditStatus: 'In Progress', remarks: 'Critical deficiency.' },
  { id: 'au-007', auditDate: '2026-07-08', patientId: 'ip-007', uhID: 'UHID-000007', mrdNumber: 'MRD/2026/0007', patientName: 'Vikram Singh', department: 'Orthopaedics', consultant: 'Dr. Suresh Pillai', auditType: 'Random Audit', auditor: 'Dr. Nandakumar (MRD)', complianceScore: 85, observationCategory: 'Major', auditFindings: 'Incomplete nursing notes', recommendation: 'Nursing audit', targetClosureDate: '2026-07-15', auditStatus: 'Scheduled', remarks: 'Scheduled.' },
  { id: 'au-008', auditDate: '2026-07-09', patientId: 'ip-008', uhID: 'UHID-000008', mrdNumber: 'MRD/2026/0008', patientName: 'Fatima Begum', department: 'Pediatrics', consultant: 'Dr. Karthik Reddy', auditType: 'Routine Audit', auditor: 'Dr. Lakshmi (MRD)', complianceScore: 91, observationCategory: 'Minor', auditFindings: 'Minor signature delay', recommendation: 'Remind staff', targetClosureDate: '2026-07-16', auditStatus: 'Completed', remarks: 'Resolved.' },
  { id: 'au-009', auditDate: '2026-07-10', patientId: 'ip-009', uhID: 'UHID-000009', mrdNumber: 'MRD/2026/0009', patientName: 'Ravi Shankar', department: 'Cardiology', consultant: 'Dr. Arvind Menon', auditType: 'Death Audit Review', auditor: 'Death Review Committee', complianceScore: 82, observationCategory: 'Major', auditFindings: 'Monitoring gap in high-risk ACS', recommendation: 'CAPA raised', targetClosureDate: '2026-07-17', auditStatus: 'Scheduled', remarks: 'Scheduled review.' },
  { id: 'au-010', auditDate: '2026-07-11', patientId: 'em-001', uhID: 'UHID-000201', mrdNumber: 'EM/2026/0001', patientName: 'Sanjay Verma', department: 'Emergency Medicine', consultant: 'Dr. Kavya Menon', auditType: 'Discharge Summary Audit', auditor: 'Dr. Nandakumar (MRD)', complianceScore: 84, observationCategory: 'Critical', auditFindings: 'Missing time & discharge summary in ER', recommendation: 'ER checklist', targetClosureDate: '2026-07-18', auditStatus: 'In Progress', remarks: 'ER deficiencies.' },
];

const SEED_CAPAS = [
  { id: 'cap-001', auditId: 'au-002', patientId: 'ip-002', patientName: 'Meena Nair', department: 'Neurology', capaDescription: 'Missing consultant notes in record', rootCause: 'Template not used', correctiveAction: 'Add consultant note template', preventiveAction: 'Monthly documentation audit', responsiblePerson: 'Dr. Priya Nair', targetDate: '2026-07-10', completionDate: '2026-07-10', status: 'Closed', remarks: 'Closed on time.' },
  { id: 'cap-002', auditId: 'au-004', patientId: 'ip-004', patientName: 'Anitha Reddy', department: 'Pediatrics', capaDescription: 'Delayed death audit review', rootCause: 'Workload pressure', correctiveAction: 'Assign dedicated reviewer', preventiveAction: 'Weekly death audit huddle', responsiblePerson: 'Dr. Karthik Reddy', targetDate: '2026-07-20', completionDate: '', status: 'In Progress', remarks: 'In progress.' },
  { id: 'cap-003', auditId: 'au-006', patientId: 'ip-006', patientName: 'Lakshmi Devi', department: 'Neurology', capaDescription: 'Missing consent & discharge summary', rootCause: 'Process gap at admission', correctiveAction: 'Consent checklist at admission', preventiveAction: 'Automated alerts', responsiblePerson: 'Dr. Priya Nair', targetDate: '2026-07-09', completionDate: '', status: 'Overdue', remarks: 'Past target date.' },
  { id: 'cap-004', auditId: 'au-001', patientId: 'ip-001', patientName: 'Rajesh Kumar', department: 'Cardiology', capaDescription: 'Minor documentation gap', rootCause: 'Training gap', correctiveAction: 'Staff reorientation', preventiveAction: 'Quarterly training', responsiblePerson: 'Dr. Arvind Menon', targetDate: '2026-07-09', completionDate: '2026-07-09', status: 'Closed', remarks: 'Closed.' },
  { id: 'cap-005', auditId: 'au-003', patientId: 'ip-003', patientName: 'Suresh Babu', department: 'Orthopaedics', capaDescription: 'Illegible handwriting', rootCause: 'Habit', correctiveAction: 'Dictation training', preventiveAction: 'EHR mandate', responsiblePerson: 'Dr. Suresh Pillai', targetDate: '2026-07-11', completionDate: '2026-07-11', status: 'Closed', remarks: 'Closed.' },
  { id: 'cap-006', auditId: 'au-005', patientId: 'ip-005', patientName: 'Joseph Mathew', department: 'Cardiology', capaDescription: 'Summary TAT monitoring', rootCause: 'None', correctiveAction: 'Continue current practice', preventiveAction: 'Dashboard monitoring', responsiblePerson: 'Dr. Arvind Menon', targetDate: '2026-07-13', completionDate: '2026-07-13', status: 'Closed', remarks: 'Closed.' },
  { id: 'cap-007', auditId: 'au-007', patientId: 'ip-007', patientName: 'Vikram Singh', department: 'Orthopaedics', capaDescription: 'Incomplete nursing notes', rootCause: 'Staffing', correctiveAction: 'Nursing documentation audit', preventiveAction: 'Daily sign-off', responsiblePerson: 'Dr. Suresh Pillai', targetDate: '2026-07-15', completionDate: '', status: 'In Progress', remarks: 'In progress.' },
  { id: 'cap-008', auditId: 'au-008', patientId: 'ip-008', patientName: 'Fatima Begum', department: 'Pediatrics', capaDescription: 'Signature delay', rootCause: 'Awareness', correctiveAction: 'Reminders', preventiveAction: 'Documentation checklist', responsiblePerson: 'Dr. Karthik Reddy', targetDate: '2026-07-16', completionDate: '', status: 'In Progress', remarks: 'In progress.' },
  { id: 'cap-009', auditId: 'au-009', patientId: 'ip-009', patientName: 'Ravi Shankar', department: 'Cardiology', capaDescription: 'Monitoring gap in high-risk ACS', rootCause: 'Protocol not followed', correctiveAction: 'Revise ACS protocol', preventiveAction: 'Clinical huddles', responsiblePerson: 'Dr. Arvind Menon', targetDate: '2026-07-08', completionDate: '', status: 'Overdue', remarks: 'Past target date.' },
  { id: 'cap-010', auditId: 'au-010', patientId: 'em-001', patientName: 'Sanjay Verma', department: 'Emergency Medicine', capaDescription: 'Missing time & ER discharge summary', rootCause: 'Process', correctiveAction: 'ER documentation checklist', preventiveAction: 'Time stamping enforced', responsiblePerson: 'Dr. Kavya Menon', targetDate: '2026-07-18', completionDate: '', status: 'In Progress', remarks: 'In progress.' },
];

const InternalAuditModule = ({ hospital, data, setData, allPatients }) => {
  const [search, setSearch] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(EMPTY_AUDIT);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => `au-${String(getMaxNumeric(data, 'id', 'au-') + 1).padStart(3, '0')}`;

  const openAddModal = () => { setForm({ ...EMPTY_AUDIT, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const handlePatientChange = (pid) => {
    const p = allPatients.find((x) => x.id === pid);
    if (p) setForm((f) => ({ ...f, patientId: pid, uhID: p.uhID, mrdNumber: p.mrdNumber || '', patientName: p.patientName, department: p.department, consultant: p.consultant }));
    else setForm((f) => ({ ...f, patientId: '', uhID: '', mrdNumber: '', patientName: '', department: '', consultant: '' }));
  };

  const validate = (f) => {
    const e = {};
    if (!f.patientId) e.patientId = 'Patient is required.';
    if (!f.auditDate) e.auditDate = 'Audit date is required.';
    if (!f.auditor.trim()) e.auditor = 'Auditor is required.';
    if (f.complianceScore === '' || f.complianceScore === null || f.complianceScore === undefined) e.complianceScore = 'Compliance score is required.';
    else { const v = Number(f.complianceScore); if (isNaN(v) || v < 0 || v > 100) e.complianceScore = 'Enter a value between 0 and 100.'; }
    if (!f.auditStatus) e.auditStatus = 'Audit status is required.';
    return e;
  };

  const handleSave = (ev) => {
    ev.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const record = { ...form, complianceScore: Number(form.complianceScore) };
    if (editingId) setData((prev) => prev.map((r) => (r.id === editingId ? { ...record, id: editingId } : r)));
    else setData((prev) => [...prev, record]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData((prev) => prev.filter((r) => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      r.patientName.toLowerCase().includes(q) ||
      r.uhID.toLowerCase().includes(q) ||
      r.department.toLowerCase().includes(q) ||
      (r.consultant || '').toLowerCase().includes(q) ||
      (r.auditor || '').toLowerCase().includes(q);
    const matchDept = !filterDept || r.department === filterDept;
    const matchStatus = !filterStatus || r.auditStatus === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const TH_COLS = ['Audit ID', 'UHID', 'MRD No', 'Patient', 'Department', 'Audit Type', 'Auditor', 'Compliance %', 'Status', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, UHID, department, consultant, auditor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Statuses</option>
          {AUDIT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button
          onClick={openAddModal}
          style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}
          className="px-3 py-2.5 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Audit
        </button>
      </div>

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
                    No audits found. Add an audit or adjust filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhID}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.mrdNumber}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600">{r.auditType}</td>
                    <td className="px-3 py-3 text-slate-600">{r.auditor}</td>
                    <td className="px-3 py-3 text-emerald-600 font-bold">{r.complianceScore}%</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_AUDIT[r.auditStatus] || STATUS_BADGE_AUDIT.Scheduled}`}>{r.auditStatus}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 rounded-lg hover:bg-sky-50 text-sky-600 transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
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
            Showing {filtered.length} of {data.length} audits
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">{editingId ? 'Edit Audit' : 'Add Audit'}</h2>
                <p className="text-[9px] text-slate-400 mt-0.5">{editingId ? `Editing: ${form.id}` : `New: ${form.id}`}</p>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label="Audit ID" error={null}>
                  <input value={form.id} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Patient *" error={errors.patientId}>
                  <select value={form.patientId} onChange={(e) => handlePatientChange(e.target.value)} className={inputCls(errors.patientId)}>
                    <option value="">Select Patient</option>
                    {allPatients.map((p) => <option key={p.id} value={p.id}>{p.patientName} ({p.uhID}) — {p.type}</option>)}
                  </select>
                </FormField>
                <FormField label="UHID" error={null}>
                  <input value={form.uhID} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="MRD Number" error={null}>
                  <input value={form.mrdNumber} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Patient Name" error={null}>
                  <input value={form.patientName} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Department" error={null}>
                  <input value={form.department} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Consultant" error={null}>
                  <input value={form.consultant} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Audit Date *" error={errors.auditDate}>
                  <input type="date" value={form.auditDate} onChange={(e) => setForm((f) => ({ ...f, auditDate: e.target.value }))} className={inputCls(errors.auditDate)} />
                </FormField>
                <FormField label="Audit Type" error={null}>
                  <select value={form.auditType} onChange={(e) => setForm((f) => ({ ...f, auditType: e.target.value }))} className={inputCls(false)}>
                    {AUDIT_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
                <FormField label="Auditor *" error={errors.auditor}>
                  <input value={form.auditor} onChange={(e) => setForm((f) => ({ ...f, auditor: e.target.value }))} placeholder="e.g., Dr. Nandakumar (MRD)" className={inputCls(errors.auditor)} />
                </FormField>
                <FormField label="Compliance Score % *" error={errors.complianceScore}>
                  <input type="number" min="0" max="100" value={form.complianceScore} onChange={(e) => setForm((f) => ({ ...f, complianceScore: e.target.value }))} placeholder="0–100" className={inputCls(errors.complianceScore)} />
                </FormField>
                <FormField label="Observation Category" error={null}>
                  <select value={form.observationCategory} onChange={(e) => setForm((f) => ({ ...f, observationCategory: e.target.value }))} className={inputCls(false)}>
                    {OBSERVATION_CATEGORIES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
                <FormField label="Audit Status" error={null}>
                  <select value={form.auditStatus} onChange={(e) => setForm((f) => ({ ...f, auditStatus: e.target.value }))} className={inputCls(false)}>
                    {AUDIT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Audit Findings" error={null}>
                  <textarea value={form.auditFindings} onChange={(e) => setForm((f) => ({ ...f, auditFindings: e.target.value }))} rows={2} placeholder="Findings..." className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none" />
                </FormField>
                <FormField label="Recommendation" error={null}>
                  <textarea value={form.recommendation} onChange={(e) => setForm((f) => ({ ...f, recommendation: e.target.value }))} rows={2} placeholder="Recommendation..." className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none" />
                </FormField>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label="Target Closure Date" error={null}>
                  <input type="date" value={form.targetClosureDate} onChange={(e) => setForm((f) => ({ ...f, targetClosureDate: e.target.value }))} className={inputCls(false)} />
                </FormField>
                <FormField label="Remarks" error={null}>
                  <input value={form.remarks} onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))} placeholder="Remarks..." className={inputCls(false)} />
                </FormField>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                <button type="submit" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white hover:brightness-95 transition-all shadow-sm">{editingId ? 'Save Changes' : 'Add Audit'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-sm font-extrabold text-slate-900 mb-2">Confirm Delete</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to delete audit{' '}
              <span className="font-bold text-rose-600">{data.find((r) => r.id === deleteConfirmId)?.id || deleteConfirmId}</span>?
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CapaTrackerModule = ({ hospital, data, setData, audits }) => {
  const [search, setSearch] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(EMPTY_CAPA);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => `cap-${String(getMaxNumeric(data, 'id', 'cap-') + 1).padStart(3, '0')}`;

  const openAddModal = () => { setForm({ ...EMPTY_CAPA, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const handleAuditChange = (aid) => {
    const a = audits.find((x) => x.id === aid);
    if (a) setForm((f) => ({ ...f, auditId: aid, patientId: a.patientId, patientName: a.patientName, department: a.department }));
    else setForm((f) => ({ ...f, auditId: '', patientId: '', patientName: '', department: '' }));
  };

  const validate = (f) => {
    const e = {};
    if (!f.auditId) e.auditId = 'Audit is required.';
    if (!f.capaDescription.trim()) e.capaDescription = 'CAPA description is required.';
    if (!f.responsiblePerson.trim()) e.responsiblePerson = 'Responsible person is required.';
    if (!f.targetDate) e.targetDate = 'Target date is required.';
    if (!f.status) e.status = 'Status is required.';
    return e;
  };

  const handleSave = (ev) => {
    ev.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (editingId) setData((prev) => prev.map((r) => (r.id === editingId ? { ...form, id: editingId } : r)));
    else setData((prev) => [...prev, form]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData((prev) => prev.filter((r) => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      (r.patientName || '').toLowerCase().includes(q) ||
      (r.department || '').toLowerCase().includes(q) ||
      (r.responsiblePerson || '').toLowerCase().includes(q) ||
      (r.capaDescription || '').toLowerCase().includes(q);
    const matchDept = !filterDept || r.department === filterDept;
    const matchStatus = !filterStatus || computeCapaStatus(r) === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const TH_COLS = ['CAPA ID', 'Audit ID', 'Patient', 'Department', 'Description', 'Responsible Person', 'Target Date', 'Status', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, department, responsible person, description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
          <option value="">All Statuses</option>
          {CAPA_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button
          onClick={openAddModal}
          style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}
          className="px-3 py-2.5 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add CAPA
        </button>
      </div>

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
                    No CAPA records found. Add a CAPA or adjust filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.auditId}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600 max-w-xs truncate">{r.capaDescription}</td>
                    <td className="px-3 py-3 text-slate-600">{r.responsiblePerson}</td>
                    <td className="px-3 py-3 text-slate-600">{r.targetDate}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_CAPA[computeCapaStatus(r)] || STATUS_BADGE_CAPA.Open}`}>{computeCapaStatus(r)}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 rounded-lg hover:bg-sky-50 text-sky-600 transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
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
            Showing {filtered.length} of {data.length} CAPA records
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">{editingId ? 'Edit CAPA' : 'Add CAPA'}</h2>
                <p className="text-[9px] text-slate-400 mt-0.5">{editingId ? `Editing: ${form.id}` : `New: ${form.id}`}</p>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label="CAPA ID" error={null}>
                  <input value={form.id} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Linked Audit *" error={errors.auditId}>
                  <select value={form.auditId} onChange={(e) => handleAuditChange(e.target.value)} className={inputCls(errors.auditId)}>
                    <option value="">Select Audit</option>
                    {audits.map((a) => <option key={a.id} value={a.id}>{a.id} — {a.patientName} ({a.auditType})</option>)}
                  </select>
                </FormField>
                <FormField label="Patient" error={null}>
                  <input value={form.patientName} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="Department" error={null}>
                  <input value={form.department} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-400 bg-slate-50 cursor-not-allowed" />
                </FormField>
                <FormField label="CAPA Description *" error={errors.capaDescription}>
                  <textarea value={form.capaDescription} onChange={(e) => setForm((f) => ({ ...f, capaDescription: e.target.value }))} rows={2} placeholder="Describe the CAPA..." className={inputCls(errors.capaDescription)} />
                </FormField>
                <FormField label="Root Cause" error={null}>
                  <textarea value={form.rootCause} onChange={(e) => setForm((f) => ({ ...f, rootCause: e.target.value }))} rows={2} placeholder="Root cause..." className={inputCls(false)} />
                </FormField>
                <FormField label="Corrective Action" error={null}>
                  <textarea value={form.correctiveAction} onChange={(e) => setForm((f) => ({ ...f, correctiveAction: e.target.value }))} rows={2} placeholder="Corrective action..." className={inputCls(false)} />
                </FormField>
                <FormField label="Preventive Action" error={null}>
                  <textarea value={form.preventiveAction} onChange={(e) => setForm((f) => ({ ...f, preventiveAction: e.target.value }))} rows={2} placeholder="Preventive action..." className={inputCls(false)} />
                </FormField>
                <FormField label="Responsible Person *" error={errors.responsiblePerson}>
                  <input value={form.responsiblePerson} onChange={(e) => setForm((f) => ({ ...f, responsiblePerson: e.target.value }))} placeholder="e.g., Dr. Priya Nair" className={inputCls(errors.responsiblePerson)} />
                </FormField>
                <FormField label="Target Date *" error={errors.targetDate}>
                  <input type="date" value={form.targetDate} onChange={(e) => setForm((f) => ({ ...f, targetDate: e.target.value }))} className={inputCls(errors.targetDate)} />
                </FormField>
                <FormField label="Completion Date" error={null}>
                  <input type="date" value={form.completionDate} onChange={(e) => setForm((f) => ({ ...f, completionDate: e.target.value }))} className={inputCls(false)} />
                </FormField>
                <FormField label="Status" error={null}>
                  <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className={inputCls(false)}>
                    {CAPA_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
              </div>

              <FormField label="Remarks" error={null}>
                <textarea value={form.remarks} onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))} rows={2} placeholder="Any additional notes..." className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none" />
              </FormField>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                <button type="submit" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white hover:brightness-95 transition-all shadow-sm">{editingId ? 'Save Changes' : 'Add CAPA'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-sm font-extrabold text-slate-900 mb-2">Confirm Delete</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to delete CAPA{' '}
              <span className="font-bold text-rose-600">{data.find((r) => r.id === deleteConfirmId)?.id || deleteConfirmId}</span>?
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 rounded-xl text-[10px] font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MedicalRecordsWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();
  const [activeTab, setActiveTab] = React.useState('dashboard');

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab hospital={hospital} />;
      case 'patient_records':
        return <PatientRecordsTab hospital={hospital} />;
      case 'clinical_documentation':
        return <ClinicalDocumentationTab hospital={hospital} />;
      case 'record_quality':
        return <MedicalRecordQualityTab hospital={hospital} />;
      case 'record_management':
        return <RecordManagementTab hospital={hospital} />;
      case 'audit':
        return <InternalAuditTab hospital={hospital} />;
      case 'reports':
        return <ReportsAnalyticsTab hospital={hospital} />;
      default:
        return <DashboardTab hospital={hospital} />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
          title="Back"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-extrabold text-slate-900">Medical Records Workspace</h1>
          <p className="text-[10px] text-slate-400 font-medium">Patient records, documentation, quality, and compliance</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {renderTab()}
    </div>
  );
};

export default MedicalRecordsWorkspace;

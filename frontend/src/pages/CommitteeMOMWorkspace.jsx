import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  ChevronLeft,
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  CheckSquare,
  Search,
  BarChart3,
  Plus,
  Edit3,
  Trash2,
  X,
  FileDown,
  Download,
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
  { id: 'registry', label: 'Committee Registry', icon: Users },
  { id: 'meetings', label: 'Meeting Management', icon: Calendar },
  { id: 'mom', label: 'Minutes of Meeting', icon: FileText },
  { id: 'action_tracker', label: 'Action Tracker', icon: CheckSquare },
  { id: 'audit', label: 'Internal Audit', icon: Search },
  { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
];

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];

const monthlyMeetingsData = [
  { name: 'Jan', meetings: 4 },
  { name: 'Feb', meetings: 6 },
  { name: 'Mar', meetings: 5 },
  { name: 'Apr', meetings: 8 },
  { name: 'May', meetings: 7 },
  { name: 'Jun', meetings: 9 },
];

const committeeWiseData = [
  { name: 'Medical Audit', value: 12 },
  { name: 'Infection Control', value: 8 },
  { name: 'Pharmacy', value: 6 },
  { name: 'Safety', value: 10 },
  { name: 'Quality', value: 7 },
];

const attendanceTrendData = [
  { name: 'Jan', attendance: 92 },
  { name: 'Feb', attendance: 88 },
  { name: 'Mar', attendance: 95 },
  { name: 'Apr', attendance: 90 },
  { name: 'May', attendance: 94 },
  { name: 'Jun', attendance: 96 },
];

const actionStatusData = [
  { name: 'Jan', pending: 5, closed: 3 },
  { name: 'Feb', pending: 4, closed: 5 },
  { name: 'Mar', pending: 6, closed: 4 },
  { name: 'Apr', pending: 3, closed: 6 },
  { name: 'May', pending: 4, closed: 5 },
  { name: 'Jun', pending: 2, closed: 7 },
];

const momApprovalData = [
  { name: 'Jan', approval: 85 },
  { name: 'Feb', approval: 88 },
  { name: 'Mar', approval: 92 },
  { name: 'Apr', approval: 90 },
  { name: 'May', approval: 94 },
  { name: 'Jun', approval: 96 },
];

const complianceTrendData = [
  { name: 'Jan', compliance: 78 },
  { name: 'Feb', compliance: 82 },
  { name: 'Mar', compliance: 85 },
  { name: 'Apr', compliance: 88 },
  { name: 'May', compliance: 90 },
  { name: 'Jun', compliance: 92 },
];

const monthlySummaryData = [
  { committee: 'Medical Audit Committee', meetings: 4, attendance: 94, pendingActions: 3, completedActions: 8, compliance: 92 },
  { committee: 'Infection Control Committee', meetings: 6, attendance: 91, pendingActions: 5, completedActions: 12, compliance: 88 },
  { committee: 'Pharmacy & Therapeutics', meetings: 3, attendance: 96, pendingActions: 2, completedActions: 6, compliance: 95 },
  { committee: 'Hospital Safety Committee', meetings: 5, attendance: 89, pendingActions: 4, completedActions: 9, compliance: 85 },
  { committee: 'Quality Improvement Committee', meetings: 4, attendance: 93, pendingActions: 3, completedActions: 7, compliance: 90 },
];

const kpiCards = [
  { label: 'Total Committees', value: '24', color: 'text-blue-600' },
  { label: 'Meetings Conducted', value: '156', color: 'text-emerald-600' },
  { label: 'Meetings This Month', value: '12', color: 'text-sky-600' },
  { label: 'Attendance %', value: '93%', color: 'text-violet-600' },
  { label: 'Pending Action Items', value: '18', color: 'text-amber-600' },
  { label: 'Closed Action Items', value: '138', color: 'text-emerald-600' },
  { label: 'MOM Approval %', value: '94%', color: 'text-indigo-600' },
  { label: 'Committee Compliance %', value: '91%', color: 'text-rose-600' },
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
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Committee MOM Workspace</span>
      <h1 className="text-xl font-extrabold text-slate-900 mt-1">Committee MOM — Dashboard</h1>
      <p className="text-xs text-slate-500 mt-2 max-w-2xl leading-relaxed">
        Centralised workspace for hospital committee governance, meeting scheduling, minutes management, and action item tracking in alignment with NABH standards.
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
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Monthly Meetings</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyMeetingsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Bar dataKey="meetings" fill={hospital?.themeColor || '#3b82f6'} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Committee-wise Meetings</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={committeeWiseData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                  {committeeWiseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '9px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Attendance Trend</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} domain={[80, 100]} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Pending vs Closed Actions</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={actionStatusData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '9px' }} />
                <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="closed" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">MOM Approval Trend</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={momApprovalData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} domain={[80, 100]} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="approval" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Committee Compliance Trend</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complianceTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} domain={[70, 100]} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="compliance" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200">
        <h3 className="text-xs font-bold text-slate-800">Monthly Committee Summary</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['Committee', 'Meetings', 'Attendance %', 'Pending Actions', 'Completed Actions', 'Compliance'].map((h) => (
                <th key={h} className="px-4 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {monthlySummaryData.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-4 py-2 font-semibold text-slate-700">{row.committee}</td>
                <td className="px-4 py-2 text-slate-600">{row.meetings}</td>
                <td className="px-4 py-2 text-emerald-600 font-bold">{row.attendance}%</td>
                <td className="px-4 py-2 text-amber-600 font-bold">{row.pendingActions}</td>
                <td className="px-4 py-2 text-blue-600 font-bold">{row.completedActions}</td>
                <td className="px-4 py-2 text-violet-600 font-bold">{row.compliance}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
        <span className="text-[9px] text-slate-400 font-medium">
          Showing {monthlySummaryData.length} committees
        </span>
      </div>
    </div>
  </div>
);

const LS_KEY_REGISTRY = 'committee_registry';

const COMMITTEE_TYPES = [
  'Statutory',
  'NABH Mandated',
  'Clinical',
  'Administrative',
  'Support Services',
  'Patient Care',
];

const MEETING_FREQUENCIES = ['Weekly', 'Monthly', 'Bi-Monthly', 'Quarterly', 'Annual'];

const DEPARTMENTS = [
  'Medical',
  'Nursing',
  'Infection Control',
  'Pharmacy',
  'Quality',
  'Administration',
  'Laboratory',
  'Operations',
];

const COMMITTEE_STATUSES = ['Active', 'Inactive'];

const STATUS_BADGE_REGISTRY = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Inactive: 'bg-rose-50 text-rose-700 border-rose-200',
};

const SEED_COMMITTEES = [
  { id: 'c-001', committeeName: 'Quality Assurance Committee', committeeType: 'NABH Mandated', chairperson: 'Dr. Anil Kumar', secretary: 'Ms. Sunita Rao', memberCount: 12, meetingFrequency: 'Monthly', department: 'Quality', committeeStatus: 'Active', nextMeetingDate: '2026-07-15', remarks: 'Primary NABH governance committee.' },
  { id: 'c-002', committeeName: 'Infection Prevention & Control Committee', committeeType: 'NABH Mandated', chairperson: 'Dr. Meera Nair', secretary: 'Mr. Rajesh Verma', memberCount: 10, meetingFrequency: 'Monthly', department: 'Infection Control', committeeStatus: 'Active', nextMeetingDate: '2026-07-10', remarks: 'Monitors HAI rates and antibiotic policy.' },
  { id: 'c-003', committeeName: 'Pharmacy & Therapeutics Committee', committeeType: 'Statutory', chairperson: 'Dr. Suresh Pillai', secretary: 'Ms. Kavya Menon', memberCount: 9, meetingFrequency: 'Quarterly', department: 'Pharmacy', committeeStatus: 'Active', nextMeetingDate: '2026-09-05', remarks: 'Reviews formulary and drug interactions.' },
  { id: 'c-004', committeeName: 'Blood Transfusion Committee', committeeType: 'Statutory', chairperson: 'Dr. Priya Shankar', secretary: 'Mr. Arjun Das', memberCount: 8, meetingFrequency: 'Quarterly', department: 'Medical', committeeStatus: 'Active', nextMeetingDate: '2026-08-20', remarks: 'Oversees transfusion safety protocols.' },
  { id: 'c-005', committeeName: 'Biomedical Waste Management Committee', committeeType: 'Statutory', chairperson: 'Dr. Ravi Iyer', secretary: 'Ms. Leela Thomas', memberCount: 7, meetingFrequency: 'Bi-Monthly', department: 'Operations', committeeStatus: 'Active', nextMeetingDate: '2026-07-25', remarks: 'Ensures BMW Rules 2016 compliance.' },
  { id: 'c-006', committeeName: 'Fire & Safety Committee', committeeType: 'Statutory', chairperson: 'Mr. Vinod Gupta', secretary: 'Ms. Neha Singh', memberCount: 11, meetingFrequency: 'Quarterly', department: 'Administration', committeeStatus: 'Active', nextMeetingDate: '2026-08-12', remarks: 'Conducts fire drills and risk audits.' },
  { id: 'c-007', committeeName: 'Patient Safety Committee', committeeType: 'NABH Mandated', chairperson: 'Dr. Karthik Reddy', secretary: 'Ms. Deepa Nair', memberCount: 13, meetingFrequency: 'Monthly', department: 'Patient Care', committeeStatus: 'Active', nextMeetingDate: '2026-07-18', remarks: 'Leads incident reporting and RCA.' },
  { id: 'c-008', committeeName: 'Antibiotic Stewardship Committee', committeeType: 'Clinical', chairperson: 'Dr. Arvind Bose', secretary: 'Ms. Shalini George', memberCount: 9, meetingFrequency: 'Monthly', department: 'Pharmacy', committeeStatus: 'Active', nextMeetingDate: '2026-07-22', remarks: 'Drives AMR containment program.' },
  { id: 'c-009', committeeName: 'Medical Records Committee', committeeType: 'NABH Mandated', chairperson: 'Dr. Fatima Sheikh', secretary: 'Mr. Imran Khan', memberCount: 8, meetingFrequency: 'Quarterly', department: 'Administration', committeeStatus: 'Inactive', nextMeetingDate: '2026-10-01', remarks: 'Maintains MRD indices and retention.' },
  { id: 'c-010', committeeName: 'Ethics Committee', committeeType: 'Statutory', chairperson: 'Dr. Lakshmi Devi', secretary: 'Mr. Sajan Mathew', memberCount: 10, meetingFrequency: 'Annual', department: 'Medical', committeeStatus: 'Active', nextMeetingDate: '2026-12-10', remarks: 'Reviews biomedical research protocols.' },
];

const LS_KEY_MEETINGS = 'committee_meetings';

const MEETING_TYPES = ['Board Meeting', 'Monthly Review', 'Emergency Meeting', 'Quarterly Review', 'Annual Review'];

const MEETING_MODES = ['Offline', 'Online', 'Hybrid'];

const MEETING_STATUSES = ['Scheduled', 'Ongoing', 'Completed', 'Cancelled'];

const STATUS_BADGE_MEETINGS = {
  Scheduled: 'bg-sky-50 text-sky-700 border-sky-200',
  Ongoing: 'bg-amber-50 text-amber-700 border-amber-200',
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
};

const calcDurationMinutes = (start, end) => {
  if (!start || !end) return null;
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  if (isNaN(sh) || isNaN(sm) || isNaN(eh) || isNaN(em)) return null;
  let mins = eh * 60 + em - (sh * 60 + sm);
  if (mins < 0) mins += 24 * 60;
  return mins;
};

const formatDuration = (mins) => {
  if (mins === null || isNaN(mins)) return '-';
  if (mins <= 0) return '0m';
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m > 0 ? `${m}m` : ''}`.trim() : `${m}m`;
};

const getMeetingYear = (dateStr) => {
  if (dateStr && /^\d{4}/.test(dateStr)) return dateStr.slice(0, 4);
  return new Date().getFullYear().toString();
};

const SEED_MEETINGS = [
  { id: 'm-001', committee: 'Infection Prevention & Control Committee', meetingTitle: 'Monthly Review', meetingNumber: '2026/IPC-01', meetingType: 'Monthly Review', meetingDate: '2026-07-10', startTime: '10:00', endTime: '11:30', duration: '1h 30m', venue: 'Conference Hall A', meetingMode: 'Offline', chairperson: 'Dr. Meera Nair', secretary: 'Mr. Rajesh Verma', expectedParticipants: 10, meetingStatus: 'Scheduled', agendaSummary: 'HAI rate trends and hand hygiene compliance.', remarks: 'Quarterly antibiogram to be tabled.' },
  { id: 'm-002', committee: 'Pharmacy & Therapeutics Committee', meetingTitle: 'Drug Formulary Review', meetingNumber: '2026/PT-01', meetingType: 'Quarterly Review', meetingDate: '2026-09-05', startTime: '14:00', endTime: '16:00', duration: '2h', venue: 'Pharmacy Seminar Room', meetingMode: 'Hybrid', chairperson: 'Dr. Suresh Pillai', secretary: 'Ms. Kavya Menon', expectedParticipants: 9, meetingStatus: 'Scheduled', agendaSummary: 'Formulary additions and drug interaction review.', remarks: '' },
  { id: 'm-003', committee: 'Fire & Safety Committee', meetingTitle: 'Fire Drill Review', meetingNumber: '2026/FS-01', meetingType: 'Quarterly Review', meetingDate: '2026-08-12', startTime: '09:30', endTime: '11:00', duration: '1h 30m', venue: 'Fire Control Room', meetingMode: 'Offline', chairperson: 'Mr. Vinod Gupta', secretary: 'Ms. Neha Singh', expectedParticipants: 11, meetingStatus: 'Scheduled', agendaSummary: 'Q2 fire drill findings and evacuation readiness.', remarks: '' },
  { id: 'm-004', committee: 'Blood Transfusion Committee', meetingTitle: 'Blood Utilization Review', meetingNumber: '2026/BT-01', meetingType: 'Quarterly Review', meetingDate: '2026-08-20', startTime: '11:00', endTime: '12:30', duration: '1h 30m', venue: 'Blood Bank Meeting Room', meetingMode: 'Offline', chairperson: 'Dr. Priya Shankar', secretary: 'Mr. Arjun Das', expectedParticipants: 8, meetingStatus: 'Scheduled', agendaSummary: 'Transfusion reaction audit and wastage analysis.', remarks: '' },
  { id: 'm-005', committee: 'Quality Assurance Committee', meetingTitle: 'Monthly Quality Indicators', meetingNumber: '2026/QA-01', meetingType: 'Monthly Review', meetingDate: '2026-07-15', startTime: '15:00', endTime: '17:00', duration: '2h', venue: 'Board Room', meetingMode: 'Hybrid', chairperson: 'Dr. Anil Kumar', secretary: 'Ms. Sunita Rao', expectedParticipants: 12, meetingStatus: 'Scheduled', agendaSummary: 'Monthly KPI dashboard and NABH preparedness.', remarks: '' },
  { id: 'm-006', committee: 'Biomedical Waste Management Committee', meetingTitle: 'Waste Compliance Review', meetingNumber: '2026/BWM-01', meetingType: 'Monthly Review', meetingDate: '2026-07-25', startTime: '12:00', endTime: '13:00', duration: '1h', venue: 'Admin Block', meetingMode: 'Offline', chairperson: 'Dr. Ravi Iyer', secretary: 'Ms. Leela Thomas', expectedParticipants: 7, meetingStatus: 'Scheduled', agendaSummary: 'BMW segregation audit and transporter training.', remarks: '' },
  { id: 'm-007', committee: 'Patient Safety Committee', meetingTitle: 'Sentinel Event Review', meetingNumber: '2026/PS-01', meetingType: 'Monthly Review', meetingDate: '2026-07-18', startTime: '10:30', endTime: '12:00', duration: '1h 30m', venue: 'Quality Department', meetingMode: 'Online', chairperson: 'Dr. Karthik Reddy', secretary: 'Ms. Deepa Nair', expectedParticipants: 13, meetingStatus: 'Scheduled', agendaSummary: 'Root cause analysis of recent near-miss events.', remarks: '' },
  { id: 'm-008', committee: 'Ethics Committee', meetingTitle: 'Case Review', meetingNumber: '2026/EC-01', meetingType: 'Annual Review', meetingDate: '2026-12-10', startTime: '11:00', endTime: '13:30', duration: '2h 30m', venue: 'Ethics Cell', meetingMode: 'Offline', chairperson: 'Dr. Lakshmi Devi', secretary: 'Mr. Sajan Mathew', expectedParticipants: 10, meetingStatus: 'Scheduled', agendaSummary: 'Review of pending research protocol applications.', remarks: '' },
  { id: 'm-009', committee: 'Medical Records Committee', meetingTitle: 'Documentation Audit', meetingNumber: '2026/MR-01', meetingType: 'Quarterly Review', meetingDate: '2026-10-01', startTime: '14:30', endTime: '15:30', duration: '1h', venue: 'MRD Section', meetingMode: 'Offline', chairperson: 'Dr. Fatima Sheikh', secretary: 'Mr. Imran Khan', expectedParticipants: 8, meetingStatus: 'Scheduled', agendaSummary: 'Incomplete record rate and coding accuracy.', remarks: 'Committee currently inactive.' },
  { id: 'm-010', committee: 'Antibiotic Stewardship Committee', meetingTitle: 'Antibiotic Usage Review', meetingNumber: '2026/AS-01', meetingType: 'Monthly Review', meetingDate: '2026-07-22', startTime: '13:00', endTime: '14:00', duration: '1h', venue: 'Pharmacy Seminar Room', meetingMode: 'Hybrid', chairperson: 'Dr. Arvind Bose', secretary: 'Ms. Shalini George', expectedParticipants: 9, meetingStatus: 'Scheduled', agendaSummary: 'Monthly consumption indices and resistance patterns.', remarks: '' },
];

const LS_KEY_MOM = 'committee_mom_records';

const MOM_APPROVAL_STATUSES = ['Draft', 'Pending Approval', 'Approved', 'Rejected'];

const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];

const ACTION_STATUSES = ['Not Started', 'In Progress', 'Completed', 'Closed', 'On Hold'];

const ATTACHMENT_TYPES = ['MOM Document', 'Attendance Sheet', 'Agenda PDF', 'Presentation', 'Supporting Documents', 'Meeting Photos'];

const STATUS_BADGE_MOM = {
  Draft: 'bg-slate-100 text-slate-600 border-slate-200',
  'Pending Approval': 'bg-amber-50 text-amber-700 border-amber-200',
  Approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Rejected: 'bg-rose-50 text-rose-700 border-rose-200',
};

const uid = () => Math.random().toString(36).slice(2, 9);

const calcAttendancePct = (total, present) => {
  const t = Number(total) || 0;
  const p = Number(present) || 0;
  return t > 0 ? Math.round((p / t) * 100) : 0;
};

const defaultMomForm = () => ({
  id: '',
  meetingId: '',
  committee: '',
  meetingNumber: '',
  meetingDate: '',
  venue: '',
  preparedBy: '',
  reviewedBy: '',
  approvedBy: '',
  approvalStatus: 'Draft',
  attendance: { totalMembers: 0, membersPresent: 0, membersAbsent: 0, attendancePct: '0%', quorumAchieved: 'No' },
  agenda: [{ id: uid(), point: '' }],
  discussionSummary: '',
  decisions: [{ id: uid(), title: '', description: '', responsibleDepartment: DEPARTMENTS[0], priority: 'Medium', targetDate: '' }],
  actionItems: [{ id: uid(), description: '', assignedTo: '', department: DEPARTMENTS[0], dueDate: '', status: 'Not Started' }],
  attachments: [{ id: uid(), type: ATTACHMENT_TYPES[0], fileName: '' }],
  photos: [{ id: uid(), title: '', caption: '', date: '' }],
});

const SEED_MOMS = [
  {
    id: 'mom-001', meetingId: 'm-001', committee: 'Infection Prevention & Control Committee', meetingNumber: '2026/IPC-01', meetingDate: '2026-07-10', venue: 'Conference Hall A',
    preparedBy: 'Mr. Rajesh Verma', reviewedBy: 'Dr. Meera Nair', approvedBy: 'Dr. Meera Nair', approvalStatus: 'Approved',
    attendance: { totalMembers: 10, membersPresent: 9, membersAbsent: 1, attendancePct: '90%', quorumAchieved: 'Yes' },
    agenda: [{ id: 'ag1', point: 'Review of HAI rates for June 2026' }, { id: 'ag2', point: 'Hand hygiene compliance audit findings' }, { id: 'ag3', point: 'Antibiotic stewardship program update' }],
    discussionSummary: 'Committee reviewed June HAI rates which showed a marginal decline. Hand hygiene compliance improved to 92% across wards. Antibiogram to be shared next quarter.',
    decisions: [{ id: 'dc1', title: 'Strengthen isolation precautions', description: 'Reinforce contact precautions in high-risk wards and step-down units.', responsibleDepartment: 'Infection Control', priority: 'High', targetDate: '2026-07-25' }],
    actionItems: [{ id: 'ai1', description: 'Conduct hand hygiene re-training for nursing staff', assignedTo: 'Mr. Rajesh Verma', department: 'Infection Control', dueDate: '2026-07-20', status: 'In Progress' }],
    attachments: [{ id: 'at1', type: 'Attendance Sheet', fileName: 'ipc_attendance_jul2026.pdf' }, { id: 'at2', type: 'Agenda PDF', fileName: 'ipc_agenda_jul2026.pdf' }],
    photos: [{ id: 'ph1', title: 'IPC Committee Session', caption: 'Committee members reviewing HAI dashboard', date: '2026-07-10' }],
  },
  {
    id: 'mom-002', meetingId: 'm-005', committee: 'Quality Assurance Committee', meetingNumber: '2026/QA-01', meetingDate: '2026-07-15', venue: 'Board Room',
    preparedBy: 'Ms. Sunita Rao', reviewedBy: 'Dr. Anil Kumar', approvedBy: 'Dr. Anil Kumar', approvalStatus: 'Approved',
    attendance: { totalMembers: 12, membersPresent: 11, membersAbsent: 1, attendancePct: '92%', quorumAchieved: 'Yes' },
    agenda: [{ id: 'ag1', point: 'Monthly quality indicator dashboard review' }, { id: 'ag2', point: 'NABH documentation readiness' }, { id: 'ag3', point: 'Patient feedback analysis' }],
    discussionSummary: 'All core quality indicators met targets for the month. NABH documentation readiness assessed at 88%. Patient feedback predominantly positive with two complaints resolved.',
    decisions: [{ id: 'dc1', title: 'Achieve 100% NABH documentation by August', description: 'Close gaps in HR and infection control document files.', responsibleDepartment: 'Quality', priority: 'High', targetDate: '2026-08-15' }],
    actionItems: [{ id: 'ai1', description: 'Complete NABH document indexing and sign-offs', assignedTo: 'Ms. Sunita Rao', department: 'Quality', dueDate: '2026-08-10', status: 'In Progress' }],
    attachments: [{ id: 'at1', type: 'MOM Document', fileName: 'qa_mom_jul2026.pdf' }],
    photos: [],
  },
  {
    id: 'mom-003', meetingId: 'm-007', committee: 'Patient Safety Committee', meetingNumber: '2026/PS-01', meetingDate: '2026-07-18', venue: 'Quality Department',
    preparedBy: 'Ms. Deepa Nair', reviewedBy: 'Dr. Karthik Reddy', approvedBy: 'Dr. Karthik Reddy', approvalStatus: 'Pending Approval',
    attendance: { totalMembers: 13, membersPresent: 12, membersAbsent: 1, attendancePct: '92%', quorumAchieved: 'Yes' },
    agenda: [{ id: 'ag1', point: 'Sentinel event review - medication near miss' }, { id: 'ag2', point: 'Fall prevention update' }, { id: 'ag3', point: 'Adverse event reporting trends' }],
    discussionSummary: 'Root cause analysis completed for a medication near-miss incident. Fall incidents reduced by 15% after bundle implementation. Reporting culture improving.',
    decisions: [{ id: 'dc1', title: 'Implement barcode-assisted medication administration', description: 'Pilot BCMA in ICU and select wards within 6 weeks.', responsibleDepartment: 'Patient Care', priority: 'Critical', targetDate: '2026-08-30' }],
    actionItems: [
      { id: 'ai1', description: 'Deploy BCMA pilot in ICU', assignedTo: 'Ms. Deepa Nair', department: 'Patient Care', dueDate: '2026-08-25', status: 'Not Started' },
      { id: 'ai2', description: 'Train staff on incident reporting portal', assignedTo: 'Dr. Karthik Reddy', department: 'Quality', dueDate: '2026-07-30', status: 'In Progress' },
    ],
    attachments: [{ id: 'at1', type: 'Presentation', fileName: 'ps_sentinel_event.pptx' }],
    photos: [{ id: 'ph1', title: 'RCA Whiteboard', caption: 'Root cause analysis session', date: '2026-07-18' }],
  },
  {
    id: 'mom-004', meetingId: 'm-010', committee: 'Antibiotic Stewardship Committee', meetingNumber: '2026/AS-01', meetingDate: '2026-07-22', venue: 'Pharmacy Seminar Room',
    preparedBy: 'Ms. Shalini George', reviewedBy: 'Dr. Arvind Bose', approvedBy: 'Dr. Arvind Bose', approvalStatus: 'Draft',
    attendance: { totalMembers: 9, membersPresent: 8, membersAbsent: 1, attendancePct: '89%', quorumAchieved: 'Yes' },
    agenda: [{ id: 'ag1', point: 'Monthly antibiotic consumption indices' }, { id: 'ag2', point: 'Resistance pattern review' }, { id: 'ag3', point: 'IV to oral switch policy' }],
    discussionSummary: 'Consumption indices stable month-on-month. Carbapenem use reduced by 8% following pre-authorization. IV to oral switch policy endorsed.',
    decisions: [{ id: 'dc1', title: 'Restrict carbapenem on pre-authorization', description: 'Mandatory infectious disease consult before escalation.', responsibleDepartment: 'Pharmacy', priority: 'High', targetDate: '2026-08-01' }],
    actionItems: [{ id: 'ai1', description: 'Publish updated antibiotic guidelines on intranet', assignedTo: 'Ms. Shalini George', department: 'Pharmacy', dueDate: '2026-07-31', status: 'Not Started' }],
    attachments: [{ id: 'at1', type: 'Supporting Documents', fileName: 'as_resistance_report.pdf' }],
    photos: [],
  },
  {
    id: 'mom-005', meetingId: 'm-003', committee: 'Fire & Safety Committee', meetingNumber: '2026/FS-01', meetingDate: '2026-08-12', venue: 'Fire Control Room',
    preparedBy: 'Ms. Neha Singh', reviewedBy: 'Mr. Vinod Gupta', approvedBy: 'Mr. Vinod Gupta', approvalStatus: 'Draft',
    attendance: { totalMembers: 11, membersPresent: 10, membersAbsent: 1, attendancePct: '91%', quorumAchieved: 'Yes' },
    agenda: [{ id: 'ag1', point: 'Q2 fire drill findings' }, { id: 'ag2', point: 'Evacuation route audit' }, { id: 'ag3', point: 'Fire extinguisher maintenance' }],
    discussionSummary: 'Q2 evacuation drill completed in 4.2 minutes. Minor obstruction noted at east stairwell. All extinguishers inspected; three due for refilling.',
    decisions: [{ id: 'dc1', title: 'Clear east stairwell obstructions', description: 'Relocate stored material away from evacuation route.', responsibleDepartment: 'Administration', priority: 'Medium', targetDate: '2026-08-20' }],
    actionItems: [{ id: 'ai1', description: 'Refill and service 3 expired extinguishers', assignedTo: 'Mr. Vinod Gupta', department: 'Administration', dueDate: '2026-08-15', status: 'Not Started' }],
    attachments: [{ id: 'at1', type: 'Meeting Photos', fileName: 'fire_drill_aug2026.jpg' }],
    photos: [{ id: 'ph1', title: 'Fire Drill', caption: 'Evacuation drill in progress', date: '2026-08-12' }],
  },
];

const LS_KEY_ACTION_TRACKER = 'committee_action_tracker';

const ACTION_TRACKER_STATUSES = ['Pending', 'In Progress', 'Completed', 'Overdue', 'Cancelled'];

const STATUS_BADGE_ACTION = {
  Pending: 'bg-slate-100 text-slate-600 border-slate-200',
  'In Progress': 'bg-sky-50 text-sky-700 border-sky-200',
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Overdue: 'bg-rose-50 text-rose-700 border-rose-200',
  Cancelled: 'bg-amber-50 text-amber-700 border-amber-200',
};

const todayStr = () => new Date().toISOString().slice(0, 10);

const isPastDate = (dateStr) => {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return false;
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return d < t;
};

const mapMomStatus = (status) => {
  switch (status) {
    case 'Not Started': return 'Pending';
    case 'Closed': return 'Completed';
    case 'On Hold': return 'In Progress';
    case 'In Progress':
    case 'Completed': return status;
    default: return 'Pending';
  }
};

const effectiveActionStatus = (item) => {
  const progress = Number(item.progress) || 0;
  if (progress >= 100) return 'Completed';
  if (item.status === 'Cancelled') return 'Cancelled';
  if (isPastDate(item.dueDate) && item.status !== 'Completed') return 'Overdue';
  return item.status || 'Pending';
};

const buildActionSourceMap = (momList) =>
  momList.reduce((map, mom) => {
    (mom.actionItems || []).forEach((a) => {
      const key = `${mom.id}::${a.id}`;
      map.set(key, {
        key,
        momId: mom.id,
        actionId: a.id,
        committee: mom.committee,
        meeting: mom.meetingNumber,
        description: a.description,
        assignedTo: a.assignedTo,
        department: a.department,
        dueDate: a.dueDate,
        baseStatus: mapMomStatus(a.status),
      });
    });
    return map;
  }, new Map());

const reconcileActionTracker = (prev, momList) => {
  const prevItems = (prev && prev.items) || [];
  const deleted = (prev && prev.deleted) || [];
  const sourceMap = buildActionSourceMap(momList);
  const byKey = new Map(prevItems.map((it) => [it.key, it]));

  let changed = false;
  const items = prevItems
    .filter((it) => {
      if (!sourceMap.has(it.key)) { changed = true; return false; }
      return true;
    })
    .map((it) => {
      const s = sourceMap.get(it.key);
      const updated = {
        ...it,
        committee: s.committee,
        meeting: s.meeting,
        description: s.description,
        assignedTo: s.assignedTo,
        department: s.department,
        dueDate: s.dueDate,
      };
      if (
        updated.committee !== it.committee || updated.meeting !== it.meeting ||
        updated.description !== it.description || updated.assignedTo !== it.assignedTo ||
        updated.department !== it.department || updated.dueDate !== it.dueDate
      ) changed = true;
      return updated;
    });

  sourceMap.forEach((s, key) => {
    if (!byKey.has(key) && !deleted.includes(key)) {
      changed = true;
      items.push({
        key,
        momId: s.momId,
        actionId: s.actionId,
        committee: s.committee,
        meeting: s.meeting,
        description: s.description,
        assignedTo: s.assignedTo,
        department: s.department,
        priority: 'Medium',
        dueDate: s.dueDate,
        status: s.baseStatus,
        progress: 0,
        remarks: '',
        lastUpdated: todayStr(),
      });
    }
  });

  return changed ? { items, deleted } : prev;
};

const LS_KEY_AUDITS = 'committee_internal_audits';
const LS_KEY_CAPA = 'committee_capa_records';

const AUDIT_TYPES = ['Routine', 'Surprise', 'NABH', 'Statutory', 'Departmental'];
const AUDIT_STATUSES = ['Completed', 'Pending', 'In Progress', 'Overdue'];
const YES_NO = ['Yes', 'No'];
const CAPA_STATUSES = ['Open', 'In Progress', 'Closed'];

const STATUS_BADGE_AUDIT = {
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  'In Progress': 'bg-sky-50 text-sky-700 border-sky-200',
  Overdue: 'bg-rose-50 text-rose-700 border-rose-200',
};

const STATUS_BADGE_CAPA = {
  Open: 'bg-amber-50 text-amber-700 border-amber-200',
  'In Progress': 'bg-sky-50 text-sky-700 border-sky-200',
  Closed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const meetingLabel = (m) => (m ? `${m.committee} — ${m.meetingTitle} (${m.meetingNumber})` : '');

const SEED_AUDITS = [
  { id: 'a-001', committee: 'Infection Prevention & Control Committee', meetingId: 'm-001', auditDate: '2026-07-11', auditorName: 'Ms. Sunita Rao', auditType: 'Routine', complianceScore: 94, quorumVerified: 'Yes', attendanceVerified: 'Yes', agendaAvailable: 'Yes', momPrepared: 'Yes', momApproved: 'Yes', actionItemsClosed: 100, supportingDocsVerified: 'Yes', overallStatus: 'Completed', remarks: 'All NABH checkpoints met.' },
  { id: 'a-002', committee: 'Quality Assurance Committee', meetingId: 'm-005', auditDate: '2026-07-16', auditorName: 'Dr. Anil Kumar', auditType: 'NABH', complianceScore: 88, quorumVerified: 'Yes', attendanceVerified: 'Yes', agendaAvailable: 'Yes', momPrepared: 'Yes', momApproved: 'Pending', actionItemsClosed: 60, supportingDocsVerified: 'Yes', overallStatus: 'In Progress', remarks: 'Documentation indexing pending.' },
  { id: 'a-003', committee: 'Patient Safety Committee', meetingId: 'm-007', auditDate: '2026-07-19', auditorName: 'Mr. Imran Khan', auditType: 'Routine', complianceScore: 91, quorumVerified: 'Yes', attendanceVerified: 'Yes', agendaAvailable: 'Yes', momPrepared: 'Yes', momApproved: 'Pending', actionItemsClosed: 50, supportingDocsVerified: 'Yes', overallStatus: 'In Progress', remarks: 'BCMA pilot yet to start.' },
  { id: 'a-004', committee: 'Fire & Safety Committee', meetingId: 'm-003', auditDate: '2026-08-13', auditorName: 'Mr. Vinod Gupta', auditType: 'Statutory', complianceScore: 96, quorumVerified: 'Yes', attendanceVerified: 'Yes', agendaAvailable: 'Yes', momPrepared: 'Yes', momApproved: 'Yes', actionItemsClosed: 100, supportingDocsVerified: 'Yes', overallStatus: 'Completed', remarks: 'Drill compliance excellent.' },
  { id: 'a-005', committee: 'Pharmacy & Therapeutics Committee', meetingId: 'm-002', auditDate: '2026-09-06', auditorName: 'Ms. Kavya Menon', auditType: 'Routine', complianceScore: 85, quorumVerified: 'Yes', attendanceVerified: 'No', agendaAvailable: 'Yes', momPrepared: 'Yes', momApproved: 'No', actionItemsClosed: 0, supportingDocsVerified: 'Yes', overallStatus: 'Pending', remarks: 'Attendance register not signed.' },
];

const SEED_CAPA = [
  { id: 'capa-001', auditId: 'a-005', finding: 'Attendance register not signed for P&T meeting', rootCause: 'No designated attendance verifier', correctiveAction: 'Reconcile and sign attendance immediately', preventiveAction: 'Mandate signed register before closure', responsiblePerson: 'Ms. Kavya Menon', targetDate: '2026-09-10', status: 'Open', closureDate: '', effectivenessVerified: 'No', remarks: 'Pending verification.' },
  { id: 'capa-002', auditId: 'a-002', finding: 'NABH documentation 88% ready', rootCause: 'HR files incomplete', correctiveAction: 'Complete HR document indexing', preventiveAction: 'Monthly document readiness review', responsiblePerson: 'Ms. Sunita Rao', targetDate: '2026-08-10', status: 'In Progress', closureDate: '', effectivenessVerified: 'No', remarks: '' },
  { id: 'capa-003', auditId: 'a-003', finding: 'BCMA pilot not started', rootCause: 'Equipment procurement delay', correctiveAction: 'Procure scanners and begin pilot', preventiveAction: 'Pre-approve capital for safety tech', responsiblePerson: 'Dr. Karthik Reddy', targetDate: '2026-08-30', status: 'Open', closureDate: '', effectivenessVerified: 'No', remarks: '' },
  { id: 'capa-004', auditId: 'a-001', finding: 'Minor gap in isolation signage', rootCause: 'Signage wear and tear', correctiveAction: 'Replaced isolation signage', preventiveAction: 'Quarterly signage audit', responsiblePerson: 'Mr. Rajesh Verma', targetDate: '2026-07-20', status: 'Closed', closureDate: '2026-07-18', effectivenessVerified: 'Yes', remarks: 'Verified by IPC nurse.' },
  { id: 'capa-005', auditId: 'a-004', finding: 'Expired extinguisher noted', rootCause: 'Missed maintenance slot', correctiveAction: 'Refilled and serviced extinguishers', preventiveAction: 'Automated maintenance calendar', responsiblePerson: 'Mr. Vinod Gupta', targetDate: '2026-08-15', status: 'Closed', closureDate: '2026-08-14', effectivenessVerified: 'Yes', remarks: 'Fire control room confirmed.' },
];

const parsePct = (val) => {
  if (val === null || val === undefined || val === '') return 0;
  const n = parseFloat(String(val).replace('%', ''));
  return isNaN(n) ? 0 : n;
};

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const monthAbbrFromDate = (dateStr) => {
  if (!dateStr || !/^\d{4}-\d{2}/.test(dateStr)) return null;
  const m = parseInt(dateStr.slice(5, 7), 10);
  return MONTH_ABBR[m - 1] || null;
};

const CommitteeMOMWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Committee Registry state
  const [committees, setCommittees] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_REGISTRY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      } catch (e) {
        /* ignore */
      }
    }
    return SEED_COMMITTEES;
  });
  const [isRegistryModalOpen, setIsRegistryModalOpen] = useState(false);
  const [editingCommitteeId, setEditingCommitteeId] = useState(null);
  const [committeeSearch, setCommitteeSearch] = useState('');
  const [committeeForm, setCommitteeForm] = useState({
    id: '',
    committeeName: '',
    committeeType: 'NABH Mandated',
    chairperson: '',
    secretary: '',
    memberCount: 0,
    meetingFrequency: 'Monthly',
    department: 'Quality',
    committeeStatus: 'Active',
    nextMeetingDate: '',
    remarks: '',
  });
  const [committeeErrors, setCommitteeErrors] = useState({});

  const getNextCommitteeId = () => {
    const maxNum = committees.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `c-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenCommitteeModal = (record = null) => {
    if (record) {
      setCommitteeForm({ ...record });
      setEditingCommitteeId(record.id);
    } else {
      setCommitteeForm({
        id: getNextCommitteeId(),
        committeeName: '',
        committeeType: 'NABH Mandated',
        chairperson: '',
        secretary: '',
        memberCount: 0,
        meetingFrequency: 'Monthly',
        department: 'Quality',
        committeeStatus: 'Active',
        nextMeetingDate: '',
        remarks: '',
      });
      setEditingCommitteeId(null);
    }
    setCommitteeErrors({});
    setIsRegistryModalOpen(true);
  };

  const validateCommitteeForm = (form) => {
    const errors = {};
    if (!form.committeeName.trim()) errors.committeeName = 'Committee name is required.';
    if (!form.chairperson.trim()) errors.chairperson = 'Chairperson is required.';
    if (!form.secretary.trim()) errors.secretary = 'Secretary is required.';
    if (!form.committeeType.trim()) errors.committeeType = 'Committee type is required.';
    if (!form.meetingFrequency.trim()) errors.meetingFrequency = 'Meeting frequency is required.';
    if (!form.department.trim()) errors.department = 'Department is required.';
    if (!form.committeeStatus.trim()) errors.committeeStatus = 'Committee status is required.';
    if (form.memberCount === '' || isNaN(form.memberCount) || Number(form.memberCount) < 0) {
      errors.memberCount = 'Enter a valid member count.';
    }
    return errors;
  };

  const handleSaveCommittee = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateCommitteeForm(committeeForm);
    if (Object.keys(errors).length > 0) {
      setCommitteeErrors(errors);
      return;
    }
    const cleaned = {
      ...committeeForm,
      committeeName: committeeForm.committeeName.trim(),
      chairperson: committeeForm.chairperson.trim(),
      secretary: committeeForm.secretary.trim(),
      memberCount: Number(committeeForm.memberCount) || 0,
    };
    if (editingCommitteeId) {
      setCommittees((prev) => prev.map((r) => (r.id === editingCommitteeId ? { ...cleaned, id: editingCommitteeId } : r)));
    } else {
      setCommittees((prev) => [...prev, cleaned]);
    }
    setIsRegistryModalOpen(false);
    setEditingCommitteeId(null);
    setCommitteeErrors({});
  };

  const handleDeleteCommittee = (id) => {
    const record = committees.find((r) => r.id === id);
    if (window.confirm(`Delete committee "${record ? record.committeeName : id}"? This action cannot be undone.`)) {
      setCommittees((prev) => prev.filter((r) => r.id !== id));
    }
  };

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_REGISTRY, JSON.stringify(committees));
  }, [committees]);

  // Meeting Management state
  const [meetings, setMeetings] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_MEETINGS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      } catch (e) {
        /* ignore */
      }
    }
    return SEED_MEETINGS;
  });
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [editingMeetingId, setEditingMeetingId] = useState(null);
  const [meetingSearch, setMeetingSearch] = useState('');
  const [meetingForm, setMeetingForm] = useState({
    id: '',
    committee: '',
    meetingTitle: '',
    meetingNumber: '',
    meetingType: 'Monthly Review',
    meetingDate: '',
    startTime: '',
    endTime: '',
    duration: '',
    venue: '',
    meetingMode: 'Offline',
    chairperson: '',
    secretary: '',
    expectedParticipants: 0,
    meetingStatus: 'Scheduled',
    agendaSummary: '',
    remarks: '',
  });
  const [meetingErrors, setMeetingErrors] = useState({});

  const committeeOptions = committees.length ? committees.map((c) => c.committeeName) : SEED_COMMITTEES.map((c) => c.committeeName);

  const getNextMeetingId = () => {
    const maxNum = meetings.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `m-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const previewMeetingNumber = (form) => {
    const base = form.committee || 'MTG';
    const seq = meetings.filter((m) => m.committee === form.committee && m.id !== editingMeetingId).length + 1;
    return `${getMeetingYear(form.meetingDate)}/${base.split(' ')[0].toUpperCase().slice(0, 3)}-${String(seq).padStart(2, '0')}`;
  };

  const handleOpenMeetingModal = (record = null) => {
    if (record) {
      setMeetingForm({ ...record });
      setEditingMeetingId(record.id);
    } else {
      const draft = {
        id: getNextMeetingId(),
        committee: committeeOptions[0] || '',
        meetingTitle: '',
        meetingNumber: '',
        meetingType: 'Monthly Review',
        meetingDate: '',
        startTime: '',
        endTime: '',
        duration: '',
        venue: '',
        meetingMode: 'Offline',
        chairperson: '',
        secretary: '',
        expectedParticipants: 0,
        meetingStatus: 'Scheduled',
        agendaSummary: '',
        remarks: '',
      };
      draft.meetingNumber = previewMeetingNumber(draft);
      setMeetingForm(draft);
      setEditingMeetingId(null);
    }
    setMeetingErrors({});
    setIsMeetingModalOpen(true);
  };

  const validateMeetingForm = (form) => {
    const errors = {};
    if (!form.committee.trim()) errors.committee = 'Committee is required.';
    if (!form.meetingTitle.trim()) errors.meetingTitle = 'Meeting title is required.';
    if (!form.meetingType.trim()) errors.meetingType = 'Meeting type is required.';
    if (!form.meetingDate.trim()) errors.meetingDate = 'Meeting date is required.';
    if (!form.startTime.trim()) errors.startTime = 'Start time is required.';
    if (!form.endTime.trim()) errors.endTime = 'End time is required.';
    if (form.startTime && form.endTime) {
      const mins = calcDurationMinutes(form.startTime, form.endTime);
      if (mins === null) errors.endTime = 'Invalid time range.';
      else if (mins <= 0) errors.endTime = 'End time must be after start time.';
    }
    if (!form.venue.trim()) errors.venue = 'Venue is required.';
    if (!form.meetingMode.trim()) errors.meetingMode = 'Meeting mode is required.';
    if (!form.chairperson.trim()) errors.chairperson = 'Chairperson is required.';
    if (!form.secretary.trim()) errors.secretary = 'Secretary is required.';
    if (!form.meetingStatus.trim()) errors.meetingStatus = 'Meeting status is required.';
    if (form.expectedParticipants === '' || isNaN(form.expectedParticipants) || Number(form.expectedParticipants) < 0) {
      errors.expectedParticipants = 'Enter a valid participant count.';
    }
    return errors;
  };

  const handleSaveMeeting = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateMeetingForm(meetingForm);
    if (Object.keys(errors).length > 0) {
      setMeetingErrors(errors);
      return;
    }
    const mins = calcDurationMinutes(meetingForm.startTime, meetingForm.endTime);
    const cleaned = {
      ...meetingForm,
      meetingTitle: meetingForm.meetingTitle.trim(),
      chairperson: meetingForm.chairperson.trim(),
      secretary: meetingForm.secretary.trim(),
      venue: meetingForm.venue.trim(),
      expectedParticipants: Number(meetingForm.expectedParticipants) || 0,
      duration: formatDuration(mins),
    };
    if (!editingMeetingId || !cleaned.meetingNumber) {
      cleaned.meetingNumber = previewMeetingNumber(cleaned);
    }
    if (editingMeetingId) {
      setMeetings((prev) => prev.map((r) => (r.id === editingMeetingId ? { ...cleaned, id: editingMeetingId } : r)));
    } else {
      setMeetings((prev) => [...prev, cleaned]);
    }
    setIsMeetingModalOpen(false);
    setEditingMeetingId(null);
    setMeetingErrors({});
  };

  const handleDeleteMeeting = (id) => {
    const record = meetings.find((r) => r.id === id);
    if (window.confirm(`Delete meeting "${record ? record.meetingTitle : id}"? This action cannot be undone.`)) {
      setMeetings((prev) => prev.filter((r) => r.id !== id));
    }
  };

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_MEETINGS, JSON.stringify(meetings));
  }, [meetings]);

  // Minutes of Meeting state
  const [momRecords, setMomRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_MOM);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      } catch (e) {
        /* ignore */
      }
    }
    return SEED_MOMS;
  });
  const [isMomModalOpen, setIsMomModalOpen] = useState(false);
  const [editingMomId, setEditingMomId] = useState(null);
  const [momSearch, setMomSearch] = useState('');
  const [momForm, setMomForm] = useState(defaultMomForm);
  const [momErrors, setMomErrors] = useState({});

  const getNextMomId = () => {
    const maxNum = momRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `mom-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenMomModal = (record = null) => {
    if (record) {
      setMomForm({
        ...record,
        attendance: { ...record.attendance },
        agenda: record.agenda.map((a) => ({ ...a })),
        decisions: record.decisions.map((d) => ({ ...d })),
        actionItems: record.actionItems.map((a) => ({ ...a })),
        attachments: record.attachments.map((a) => ({ ...a })),
        photos: record.photos.map((p) => ({ ...p })),
      });
      setEditingMomId(record.id);
    } else {
      setMomForm({ ...defaultMomForm(), id: getNextMomId() });
      setEditingMomId(null);
    }
    setMomErrors({});
    setIsMomModalOpen(true);
  };

  const validateMomForm = (form) => {
    const errors = {};
    if (!form.meetingId) errors.meetingId = 'Meeting is required.';
    if (!form.preparedBy.trim()) errors.preparedBy = 'Prepared By is required.';
    if (!form.reviewedBy.trim()) errors.reviewedBy = 'Reviewed By is required.';
    if (!form.approvedBy.trim()) errors.approvedBy = 'Approved By is required.';
    if (!form.approvalStatus.trim()) errors.approvalStatus = 'Approval status is required.';
    const total = Number(form.attendance.totalMembers) || 0;
    const present = Number(form.attendance.membersPresent) || 0;
    if (total <= 0) errors.totalMembers = 'Total members must be greater than 0.';
    if (present > total) errors.membersPresent = 'Members present cannot exceed total members.';
    if (!form.agenda.filter((a) => a.point.trim()).length) errors.agenda = 'Add at least one agenda point.';
    return errors;
  };

  const handleSaveMom = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateMomForm(momForm);
    if (Object.keys(errors).length > 0) {
      setMomErrors(errors);
      return;
    }
    const total = Number(momForm.attendance.totalMembers) || 0;
    const present = Number(momForm.attendance.membersPresent) || 0;
    const cleanedAttendance = {
      totalMembers: total,
      membersPresent: present,
      membersAbsent: Math.max(total - present, 0),
      attendancePct: `${calcAttendancePct(total, present)}%`,
      quorumAchieved: present >= Math.ceil(total / 2) || total === 0 ? (total === 0 ? 'No' : 'Yes') : 'No',
    };
    const cleaned = {
      ...momForm,
      preparedBy: momForm.preparedBy.trim(),
      reviewedBy: momForm.reviewedBy.trim(),
      approvedBy: momForm.approvedBy.trim(),
      agenda: momForm.agenda.filter((a) => a.point.trim()).map((a) => ({ id: a.id || uid(), point: a.point.trim() })),
      decisions: momForm.decisions.filter((d) => d.title.trim() || d.description.trim()).map((d) => ({ ...d, id: d.id || uid() })),
      actionItems: momForm.actionItems.filter((a) => a.description.trim()).map((a) => ({ ...a, id: a.id || uid() })),
      attachments: momForm.attachments.filter((a) => a.fileName.trim()).map((a) => ({ ...a, id: a.id || uid() })),
      photos: momForm.photos.filter((p) => p.title.trim() || p.caption.trim()).map((p) => ({ ...p, id: p.id || uid() })),
      attendance: cleanedAttendance,
    };
    if (editingMomId) {
      setMomRecords((prev) => prev.map((r) => (r.id === editingMomId ? { ...cleaned, id: editingMomId } : r)));
    } else {
      setMomRecords((prev) => [...prev, cleaned]);
    }
    setIsMomModalOpen(false);
    setEditingMomId(null);
    setMomErrors({});
  };

  const handleDeleteMom = (id) => {
    const record = momRecords.find((r) => r.id === id);
    if (window.confirm(`Delete MOM "${record ? record.committee : id}"? This action cannot be undone.`)) {
      setMomRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_MOM, JSON.stringify(momRecords));
  }, [momRecords]);

  // Action Tracker state (sourced from MOM action items)
  const [actionTracker, setActionTracker] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_ACTION_TRACKER);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.items)) return parsed;
      } catch (e) {
        /* ignore */
      }
    }
    return reconcileActionTracker({ items: [], deleted: [] }, momRecords);
  });
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [editingActionKey, setEditingActionKey] = useState(null);
  const [actionSearch, setActionSearch] = useState('');
  const [actionCommitteeFilter, setActionCommitteeFilter] = useState('');
  const [actionStatusFilter, setActionStatusFilter] = useState('');
  const [actionPriorityFilter, setActionPriorityFilter] = useState('');
  const [actionForm, setActionForm] = useState({ status: 'Pending', progress: 0, remarks: '' });

  React.useEffect(() => {
    setActionTracker((prev) => reconcileActionTracker(prev, momRecords));
  }, [momRecords]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_ACTION_TRACKER, JSON.stringify(actionTracker));
  }, [actionTracker]);

  const handleOpenActionModal = (item) => {
    setActionForm({
      status: effectiveActionStatus(item),
      progress: Number(item.progress) || 0,
      remarks: item.remarks || '',
    });
    setEditingActionKey(item.key);
    setIsActionModalOpen(true);
  };

  const handleSaveAction = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setActionTracker((prev) => ({
      ...prev,
      items: prev.items.map((it) => {
        if (it.key !== editingActionKey) return it;
        let status = actionForm.status;
        const progress = Number(actionForm.progress) || 0;
        if (progress >= 100) status = 'Completed';
        return { ...it, status, progress, remarks: actionForm.remarks || '', lastUpdated: todayStr() };
      }),
    }));
    setIsActionModalOpen(false);
    setEditingActionKey(null);
  };

  const handleDeleteAction = (key) => {
    const item = actionTracker.items.find((it) => it.key === key);
    if (window.confirm(`Delete action "${item ? item.description : key}"? This will also remove it from the source MOM.`)) {
      setActionTracker((prev) => ({
        items: prev.items.filter((it) => it.key !== key),
        deleted: prev.deleted.includes(key) ? prev.deleted : [...prev.deleted, key],
      }));
      setMomRecords((prev) => prev.map((mom) => {
        if (mom.id !== item.momId) return mom;
        return { ...mom, actionItems: (mom.actionItems || []).filter((a) => `${mom.id}::${a.id}` !== key) };
      }));
    }
  };

  // Internal Audit state
  const [audits, setAudits] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_AUDITS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      } catch (e) {
        /* ignore */
      }
    }
    return SEED_AUDITS;
  });
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [editingAuditId, setEditingAuditId] = useState(null);
  const [auditSearch, setAuditSearch] = useState('');
  const [auditForm, setAuditForm] = useState({
    id: '', committee: '', meetingId: '', auditDate: '', auditorName: '', auditType: 'Routine',
    complianceScore: 0, quorumVerified: 'Yes', attendanceVerified: 'Yes', agendaAvailable: 'Yes',
    momPrepared: 'Yes', momApproved: 'Yes', actionItemsClosed: 0, supportingDocsVerified: 'Yes',
    overallStatus: 'Pending', remarks: '',
  });
  const [auditErrors, setAuditErrors] = useState({});

  const [capas, setCapas] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_CAPA);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      } catch (e) {
        /* ignore */
      }
    }
    return SEED_CAPA;
  });
  const [isCapaModalOpen, setIsCapaModalOpen] = useState(false);
  const [editingCapaId, setEditingCapaId] = useState(null);
  const [capaSearch, setCapaSearch] = useState('');
  const [capaForm, setCapaForm] = useState({
    id: '', auditId: '', finding: '', rootCause: '', correctiveAction: '', preventiveAction: '',
    responsiblePerson: '', targetDate: '', status: 'Open', closureDate: '', effectivenessVerified: 'No', remarks: '',
  });
  const [capaErrors, setCapaErrors] = useState({});

  const committeeOptionsAudit = committees.length ? committees.map((c) => c.committeeName) : SEED_COMMITTEES.map((c) => c.committeeName);
  const meetingOptionsAudit = meetings.map((m) => ({ id: m.id, label: meetingLabel(m) }));

  const getNextAuditId = () => {
    const maxNum = audits.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `a-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenAuditModal = (record = null) => {
    if (record) {
      setAuditForm({ ...record });
      setEditingAuditId(record.id);
    } else {
      setAuditForm({
        id: getNextAuditId(), committee: committeeOptionsAudit[0] || '', meetingId: meetingOptionsAudit[0] ? meetingOptionsAudit[0].id : '',
        auditDate: '', auditorName: '', auditType: 'Routine', complianceScore: 0, quorumVerified: 'Yes', attendanceVerified: 'Yes',
        agendaAvailable: 'Yes', momPrepared: 'Yes', momApproved: 'Yes', actionItemsClosed: 0, supportingDocsVerified: 'Yes', overallStatus: 'Pending', remarks: '',
      });
      setEditingAuditId(null);
    }
    setAuditErrors({});
    setIsAuditModalOpen(true);
  };

  const validateAuditForm = (form) => {
    const errors = {};
    if (!form.committee.trim()) errors.committee = 'Committee is required.';
    if (!form.meetingId) errors.meetingId = 'Meeting is required.';
    if (!form.auditDate.trim()) errors.auditDate = 'Audit date is required.';
    if (!form.auditorName.trim()) errors.auditorName = 'Auditor name is required.';
    if (form.complianceScore === '' || isNaN(form.complianceScore) || Number(form.complianceScore) < 0 || Number(form.complianceScore) > 100) {
      errors.complianceScore = 'Enter a score between 0 and 100.';
    }
    if (form.actionItemsClosed === '' || isNaN(form.actionItemsClosed) || Number(form.actionItemsClosed) < 0 || Number(form.actionItemsClosed) > 100) {
      errors.actionItemsClosed = 'Enter a value between 0 and 100.';
    }
    if (!form.overallStatus.trim()) errors.overallStatus = 'Overall status is required.';
    return errors;
  };

  const handleSaveAudit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateAuditForm(auditForm);
    if (Object.keys(errors).length > 0) { setAuditErrors(errors); return; }
    const cleaned = {
      ...auditForm,
      auditorName: auditForm.auditorName.trim(),
      complianceScore: Number(auditForm.complianceScore) || 0,
      actionItemsClosed: Number(auditForm.actionItemsClosed) || 0,
    };
    if (editingAuditId) {
      setAudits((prev) => prev.map((r) => (r.id === editingAuditId ? { ...cleaned, id: editingAuditId } : r)));
    } else {
      setAudits((prev) => [...prev, cleaned]);
    }
    setIsAuditModalOpen(false);
    setEditingAuditId(null);
    setAuditErrors({});
  };

  const handleDeleteAudit = (id) => {
    const record = audits.find((r) => r.id === id);
    if (window.confirm(`Delete audit "${record ? record.committee : id}"? Linked CAPAs will remain.`)) {
      setAudits((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const getNextCapaId = () => {
    const maxNum = capas.reduce((max, r) => {
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
      setCapaForm({
        id: getNextCapaId(), auditId: audits[0] ? audits[0].id : '', finding: '', rootCause: '', correctiveAction: '',
        preventiveAction: '', responsiblePerson: '', targetDate: '', status: 'Open', closureDate: '', effectivenessVerified: 'No', remarks: '',
      });
      setEditingCapaId(null);
    }
    setCapaErrors({});
    setIsCapaModalOpen(true);
  };

  const validateCapaForm = (form) => {
    const errors = {};
    if (!form.auditId) errors.auditId = 'Linked audit is required.';
    if (!form.finding.trim()) errors.finding = 'Finding is required.';
    if (!form.rootCause.trim()) errors.rootCause = 'Root cause is required.';
    if (!form.correctiveAction.trim()) errors.correctiveAction = 'Corrective action is required.';
    if (!form.responsiblePerson.trim()) errors.responsiblePerson = 'Responsible person is required.';
    if (!form.status.trim()) errors.status = 'Status is required.';
    if (form.status === 'Closed' && !form.closureDate.trim()) errors.closureDate = 'Closure date is required for closed CAPA.';
    return errors;
  };

  const handleSaveCapa = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateCapaForm(capaForm);
    if (Object.keys(errors).length > 0) { setCapaErrors(errors); return; }
    const cleaned = {
      ...capaForm,
      finding: capaForm.finding.trim(),
      rootCause: capaForm.rootCause.trim(),
      correctiveAction: capaForm.correctiveAction.trim(),
      responsiblePerson: capaForm.responsiblePerson.trim(),
      preventiveAction: capaForm.preventiveAction.trim(),
    };
    if (editingCapaId) {
      setCapas((prev) => prev.map((r) => (r.id === editingCapaId ? { ...cleaned, id: editingCapaId } : r)));
    } else {
      setCapas((prev) => [...prev, cleaned]);
    }
    setIsCapaModalOpen(false);
    setEditingCapaId(null);
    setCapaErrors({});
  };

  const handleDeleteCapa = (id) => {
    const record = capas.find((r) => r.id === id);
    if (window.confirm(`Delete CAPA "${record ? record.finding : id}"?`)) {
      setCapas((prev) => prev.filter((r) => r.id !== id));
    }
  };

  React.useEffect(() => { localStorage.setItem(LS_KEY_AUDITS, JSON.stringify(audits)); }, [audits]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_CAPA, JSON.stringify(capas)); }, [capas]);

  const RegistryTab = () => {
    const filtered = committees.filter((r) => {
      const q = committeeSearch.toLowerCase();
      return (
        r.committeeName.toLowerCase().includes(q) ||
        r.chairperson.toLowerCase().includes(q) ||
        r.secretary.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.committeeType.toLowerCase().includes(q) ||
        r.committeeStatus.toLowerCase().includes(q)
      );
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const totalCommittees = committees.length;
    const activeCommittees = committees.filter((r) => r.committeeStatus === 'Active').length;
    const inactiveCommittees = committees.filter((r) => r.committeeStatus === 'Inactive').length;
    const monthlyMeetings = committees.filter((r) => r.meetingFrequency === 'Monthly').length;
    const quarterlyCommittees = committees.filter((r) => r.meetingFrequency === 'Quarterly').length;
    const annualCommittees = committees.filter((r) => r.meetingFrequency === 'Annual').length;
    const upcomingMeetings = committees.filter((r) => {
      if (!r.nextMeetingDate) return false;
      const d = new Date(r.nextMeetingDate);
      return !isNaN(d.getTime()) && d >= today;
    }).length;
    const committeeCompliance = totalCommittees ? Math.round((activeCommittees / totalCommittees) * 100) : 0;

    const TH_COLS = ['ID', 'Committee Name', 'Type', 'Chairperson', 'Secretary', 'Members', 'Frequency', 'Department', 'Status', 'Next Meeting', 'Actions'];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Committee Registry</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Master list of hospital committees</p>
          </div>
          <button
            onClick={() => handleOpenCommitteeModal()}
            style={{ backgroundColor: hospital.themeColor }}
            className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Committee
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Committees', value: totalCommittees, color: 'text-blue-600' },
            { label: 'Active Committees', value: activeCommittees, color: 'text-emerald-600' },
            { label: 'Inactive Committees', value: inactiveCommittees, color: 'text-rose-600' },
            { label: 'Monthly Meetings Scheduled', value: monthlyMeetings, color: 'text-sky-600' },
            { label: 'Quarterly Committees', value: quarterlyCommittees, color: 'text-violet-600' },
            { label: 'Annual Committees', value: annualCommittees, color: 'text-indigo-600' },
            { label: 'Upcoming Meetings', value: upcomingMeetings, color: 'text-amber-600' },
            { label: 'Committee Compliance %', value: `${committeeCompliance}%`, color: 'text-teal-600' },
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
            placeholder="Search committees by name, chairperson, secretary, department..."
            value={committeeSearch}
            onChange={(e) => setCommitteeSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
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
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.committeeName}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.committeeType}</td>
                    <td className="px-3 py-3 text-slate-600">{r.chairperson}</td>
                    <td className="px-3 py-3 text-slate-600">{r.secretary}</td>
                    <td className="px-3 py-3 text-blue-600 font-bold">{r.memberCount}</td>
                    <td className="px-3 py-3 text-slate-600">{r.meetingFrequency}</td>
                    <td className="px-3 py-3 text-slate-600">{r.department}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_REGISTRY[r.committeeStatus] || STATUS_BADGE_REGISTRY.Active}`}>{r.committeeStatus}</span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{r.nextMeetingDate || '-'}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleOpenCommitteeModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => handleDeleteCommittee(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={TH_COLS.length} className="px-3 py-10 text-center">
                      {committeeSearch ? (
                        <span className="text-[10px] text-slate-400">No committees match your search.</span>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-3xl">📋</span>
                          <span className="text-[10px] text-slate-400 font-medium">No committees registered yet.</span>
                          <button onClick={() => handleOpenCommitteeModal()} style={{ backgroundColor: hospital.themeColor }} className="mt-1 px-3 py-1.5 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all shadow-sm cursor-pointer">Add First Committee</button>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
            <span className="text-[9px] text-slate-400 font-medium">Showing {filtered.length} of {committees.length} committee{committees.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {isRegistryModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingCommitteeId ? 'Edit Committee' : 'Add Committee'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Committee Registry</p>
                </div>
                <button onClick={() => { setIsRegistryModalOpen(false); setEditingCommitteeId(null); setCommitteeErrors({}); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveCommittee} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Committee Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Committee Name *</label>
                      <input type="text" value={committeeForm.committeeName} onChange={(e) => setCommitteeForm({ ...committeeForm, committeeName: e.target.value })} className={`w-full px-3 py-2 border ${committeeErrors.committeeName ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="e.g. Quality Assurance Committee" />
                      {committeeErrors.committeeName && <p className="text-[9px] text-rose-500 mt-1">{committeeErrors.committeeName}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Committee Type *</label>
                      <select value={committeeForm.committeeType} onChange={(e) => setCommitteeForm({ ...committeeForm, committeeType: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {COMMITTEE_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Chairperson *</label>
                      <input type="text" value={committeeForm.chairperson} onChange={(e) => setCommitteeForm({ ...committeeForm, chairperson: e.target.value })} className={`w-full px-3 py-2 border ${committeeErrors.chairperson ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Chairperson name" />
                      {committeeErrors.chairperson && <p className="text-[9px] text-rose-500 mt-1">{committeeErrors.chairperson}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Secretary *</label>
                      <input type="text" value={committeeForm.secretary} onChange={(e) => setCommitteeForm({ ...committeeForm, secretary: e.target.value })} className={`w-full px-3 py-2 border ${committeeErrors.secretary ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Secretary name" />
                      {committeeErrors.secretary && <p className="text-[9px] text-rose-500 mt-1">{committeeErrors.secretary}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Member Count *</label>
                      <input type="number" value={committeeForm.memberCount} onChange={(e) => setCommitteeForm({ ...committeeForm, memberCount: e.target.value === '' ? '' : parseInt(e.target.value) || 0 })} min="0" className={`w-full px-3 py-2 border ${committeeErrors.memberCount ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {committeeErrors.memberCount && <p className="text-[9px] text-rose-500 mt-1">{committeeErrors.memberCount}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Meeting Frequency *</label>
                      <select value={committeeForm.meetingFrequency} onChange={(e) => setCommitteeForm({ ...committeeForm, meetingFrequency: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {MEETING_FREQUENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Department *</label>
                      <select value={committeeForm.department} onChange={(e) => setCommitteeForm({ ...committeeForm, department: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {DEPARTMENTS.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Committee Status *</label>
                      <select value={committeeForm.committeeStatus} onChange={(e) => setCommitteeForm({ ...committeeForm, committeeStatus: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {COMMITTEE_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Next Meeting Date</label>
                      <input type="date" value={committeeForm.nextMeetingDate} onChange={(e) => setCommitteeForm({ ...committeeForm, nextMeetingDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Remarks</p>
                  <textarea value={committeeForm.remarks} onChange={(e) => setCommitteeForm({ ...committeeForm, remarks: e.target.value })} rows="2" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Optional remarks" />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsRegistryModalOpen(false); setEditingCommitteeId(null); setCommitteeErrors({}); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingCommitteeId ? 'Save Changes' : 'Add Committee'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const MeetingTab = () => {
    const filtered = meetings.filter((r) => {
      const q = meetingSearch.toLowerCase();
      return (
        r.committee.toLowerCase().includes(q) ||
        r.meetingTitle.toLowerCase().includes(q) ||
        r.meetingType.toLowerCase().includes(q) ||
        r.meetingStatus.toLowerCase().includes(q) ||
        r.venue.toLowerCase().includes(q) ||
        (r.chairperson || '').toLowerCase().includes(q)
      );
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const totalMeetings = meetings.length;
    const scheduledMeetings = meetings.filter((r) => r.meetingStatus === 'Scheduled').length;
    const completedMeetings = meetings.filter((r) => r.meetingStatus === 'Completed').length;
    const ongoingMeetings = meetings.filter((r) => r.meetingStatus === 'Ongoing').length;
    const cancelledMeetings = meetings.filter((r) => r.meetingStatus === 'Cancelled').length;
    const avgDurationMins = (() => {
      const vals = meetings.map((m) => calcDurationMinutes(m.startTime, m.endTime)).filter((v) => v !== null && !isNaN(v));
      if (!vals.length) return 0;
      return Math.round(vals.reduce((s, v) => s + v, 0) / vals.length);
    })();
    const upcomingMeetings = meetings.filter((r) => {
      if (r.meetingStatus === 'Cancelled') return false;
      if (!r.meetingDate) return false;
      const d = new Date(r.meetingDate);
      return !isNaN(d.getTime()) && d >= today;
    }).length;
    const meetingCompletion = totalMeetings ? Math.round((completedMeetings / totalMeetings) * 100) : 0;

    const TH_COLS = ['ID', 'Committee', 'Title', 'Meeting #', 'Type', 'Date', 'Time', 'Duration', 'Venue', 'Mode', 'Status', 'Actions'];

    const liveDuration = calcDurationMinutes(meetingForm.startTime, meetingForm.endTime);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Meeting Management</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Schedule and track committee meetings</p>
          </div>
          <button
            onClick={() => handleOpenMeetingModal()}
            style={{ backgroundColor: hospital.themeColor }}
            className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Meeting
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Meetings', value: totalMeetings, color: 'text-blue-600' },
            { label: 'Scheduled Meetings', value: scheduledMeetings, color: 'text-sky-600' },
            { label: 'Completed Meetings', value: completedMeetings, color: 'text-emerald-600' },
            { label: 'Ongoing Meetings', value: ongoingMeetings, color: 'text-amber-600' },
            { label: 'Cancelled Meetings', value: cancelledMeetings, color: 'text-rose-600' },
            { label: 'Average Meeting Duration', value: formatDuration(avgDurationMins), color: 'text-violet-600' },
            { label: 'Upcoming Meetings', value: upcomingMeetings, color: 'text-indigo-600' },
            { label: 'Meeting Completion %', value: `${meetingCompletion}%`, color: 'text-teal-600' },
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
            placeholder="Search meetings by committee, title, type, venue..."
            value={meetingSearch}
            onChange={(e) => setMeetingSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
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
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.committee}</td>
                    <td className="px-3 py-3 text-slate-600">{r.meetingTitle}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-violet-600 font-bold">{r.meetingNumber}</td>
                    <td className="px-3 py-3 text-slate-600">{r.meetingType}</td>
                    <td className="px-3 py-3 text-slate-600">{r.meetingDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.startTime}–{r.endTime}</td>
                    <td className="px-3 py-3 text-blue-600 font-bold">{r.duration}</td>
                    <td className="px-3 py-3 text-slate-600">{r.venue}</td>
                    <td className="px-3 py-3 text-slate-600">{r.meetingMode}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_MEETINGS[r.meetingStatus] || STATUS_BADGE_MEETINGS.Scheduled}`}>{r.meetingStatus}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleOpenMeetingModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => handleDeleteMeeting(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={TH_COLS.length} className="px-3 py-10 text-center">
                      {meetingSearch ? (
                        <span className="text-[10px] text-slate-400">No meetings match your search.</span>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-3xl">📅</span>
                          <span className="text-[10px] text-slate-400 font-medium">No meetings scheduled yet.</span>
                          <button onClick={() => handleOpenMeetingModal()} style={{ backgroundColor: hospital.themeColor }} className="mt-1 px-3 py-1.5 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all shadow-sm cursor-pointer">Schedule First Meeting</button>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
            <span className="text-[9px] text-slate-400 font-medium">Showing {filtered.length} of {meetings.length} meeting{meetings.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {isMeetingModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingMeetingId ? 'Edit Meeting' : 'Add Meeting'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Meeting Management</p>
                </div>
                <button onClick={() => { setIsMeetingModalOpen(false); setEditingMeetingId(null); setMeetingErrors({}); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveMeeting} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Meeting Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Committee *</label>
                      <select value={meetingForm.committee} onChange={(e) => setMeetingForm({ ...meetingForm, committee: e.target.value, meetingNumber: previewMeetingNumber({ ...meetingForm, committee: e.target.value }) })} className={`w-full px-3 py-2 border ${meetingErrors.committee ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                        {committeeOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {meetingErrors.committee && <p className="text-[9px] text-rose-500 mt-1">{meetingErrors.committee}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Meeting Title *</label>
                      <input type="text" value={meetingForm.meetingTitle} onChange={(e) => setMeetingForm({ ...meetingForm, meetingTitle: e.target.value })} className={`w-full px-3 py-2 border ${meetingErrors.meetingTitle ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="e.g. Monthly Review" />
                      {meetingErrors.meetingTitle && <p className="text-[9px] text-rose-500 mt-1">{meetingErrors.meetingTitle}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Meeting Number (Auto)</label>
                      <input type="text" value={meetingForm.meetingNumber} readOnly className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-[10px] text-slate-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Meeting Type *</label>
                      <select value={meetingForm.meetingType} onChange={(e) => setMeetingForm({ ...meetingForm, meetingType: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {MEETING_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Meeting Date *</label>
                      <input type="date" value={meetingForm.meetingDate} onChange={(e) => setMeetingForm({ ...meetingForm, meetingDate: e.target.value, meetingNumber: previewMeetingNumber({ ...meetingForm, meetingDate: e.target.value }) })} className={`w-full px-3 py-2 border ${meetingErrors.meetingDate ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {meetingErrors.meetingDate && <p className="text-[9px] text-rose-500 mt-1">{meetingErrors.meetingDate}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Start Time *</label>
                      <input type="time" value={meetingForm.startTime} onChange={(e) => setMeetingForm({ ...meetingForm, startTime: e.target.value })} className={`w-full px-3 py-2 border ${meetingErrors.startTime ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {meetingErrors.startTime && <p className="text-[9px] text-rose-500 mt-1">{meetingErrors.startTime}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">End Time *</label>
                      <input type="time" value={meetingForm.endTime} onChange={(e) => setMeetingForm({ ...meetingForm, endTime: e.target.value })} className={`w-full px-3 py-2 border ${meetingErrors.endTime ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {meetingErrors.endTime && <p className="text-[9px] text-rose-500 mt-1">{meetingErrors.endTime}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Duration (Auto)</label>
                      <input type="text" value={liveDuration !== null ? formatDuration(liveDuration) : (meetingForm.duration || '-')} readOnly className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-[10px] text-slate-600 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Venue *</label>
                      <input type="text" value={meetingForm.venue} onChange={(e) => setMeetingForm({ ...meetingForm, venue: e.target.value })} className={`w-full px-3 py-2 border ${meetingErrors.venue ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="e.g. Conference Hall A" />
                      {meetingErrors.venue && <p className="text-[9px] text-rose-500 mt-1">{meetingErrors.venue}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Meeting Mode *</label>
                      <select value={meetingForm.meetingMode} onChange={(e) => setMeetingForm({ ...meetingForm, meetingMode: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {MEETING_MODES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Chairperson *</label>
                      <input type="text" value={meetingForm.chairperson} onChange={(e) => setMeetingForm({ ...meetingForm, chairperson: e.target.value })} className={`w-full px-3 py-2 border ${meetingErrors.chairperson ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Chairperson name" />
                      {meetingErrors.chairperson && <p className="text-[9px] text-rose-500 mt-1">{meetingErrors.chairperson}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Secretary *</label>
                      <input type="text" value={meetingForm.secretary} onChange={(e) => setMeetingForm({ ...meetingForm, secretary: e.target.value })} className={`w-full px-3 py-2 border ${meetingErrors.secretary ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Secretary name" />
                      {meetingErrors.secretary && <p className="text-[9px] text-rose-500 mt-1">{meetingErrors.secretary}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Expected Participants *</label>
                      <input type="number" value={meetingForm.expectedParticipants} onChange={(e) => setMeetingForm({ ...meetingForm, expectedParticipants: e.target.value === '' ? '' : parseInt(e.target.value) || 0 })} min="0" className={`w-full px-3 py-2 border ${meetingErrors.expectedParticipants ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {meetingErrors.expectedParticipants && <p className="text-[9px] text-rose-500 mt-1">{meetingErrors.expectedParticipants}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Meeting Status *</label>
                      <select value={meetingForm.meetingStatus} onChange={(e) => setMeetingForm({ ...meetingForm, meetingStatus: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {MEETING_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Agenda &amp; Remarks</p>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Agenda Summary</label>
                      <textarea value={meetingForm.agendaSummary} onChange={(e) => setMeetingForm({ ...meetingForm, agendaSummary: e.target.value })} rows="2" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Brief agenda points" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                      <textarea value={meetingForm.remarks} onChange={(e) => setMeetingForm({ ...meetingForm, remarks: e.target.value })} rows="2" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Optional remarks" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsMeetingModalOpen(false); setEditingMeetingId(null); setMeetingErrors({}); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingMeetingId ? 'Save Changes' : 'Add Meeting'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const MOMTab = () => {
    const filtered = momRecords.filter((r) => {
      const q = momSearch.toLowerCase();
      return (
        r.committee.toLowerCase().includes(q) ||
        (r.meetingId || '').toLowerCase().includes(q) ||
        r.meetingNumber.toLowerCase().includes(q) ||
        r.venue.toLowerCase().includes(q) ||
        r.approvalStatus.toLowerCase().includes(q) ||
        (r.preparedBy || '').toLowerCase().includes(q)
      );
    });

    const totalMoms = momRecords.length;
    const draftMoms = momRecords.filter((r) => r.approvalStatus === 'Draft').length;
    const pendingMoms = momRecords.filter((r) => r.approvalStatus === 'Pending Approval').length;
    const approvedMoms = momRecords.filter((r) => r.approvalStatus === 'Approved').length;
    const quorumMoms = momRecords.filter((r) => r.attendance && r.attendance.quorumAchieved === 'Yes').length;
    const openActionItems = momRecords.reduce((s, r) => s + r.actionItems.filter((a) => a.status !== 'Completed' && a.status !== 'Closed').length, 0);
    const attachmentsUploaded = momRecords.reduce((s, r) => s + r.attachments.filter((a) => a.fileName && a.fileName.trim()).length, 0);
    const momCompletion = totalMoms ? Math.round((approvedMoms / totalMoms) * 100) : 0;

    const meetingOptions = meetings.map((m) => ({ id: m.id, label: `${m.committee} — ${m.meetingTitle} (${m.meetingNumber})` }));

    const livePct = calcAttendancePct(momForm.attendance.totalMembers, momForm.attendance.membersPresent);
    const liveAbsent = Math.max((Number(momForm.attendance.totalMembers) || 0) - (Number(momForm.attendance.membersPresent) || 0), 0);

    const updateAttendance = (field, value) =>
      setMomForm((prev) => ({ ...prev, attendance: { ...prev.attendance, [field]: value } }));

    const updateAgenda = (id, field, value) =>
      setMomForm((prev) => ({ ...prev, agenda: prev.agenda.map((a) => (a.id === id ? { ...a, [field]: value } : a)) }));
    const addAgenda = () =>
      setMomForm((prev) => ({ ...prev, agenda: [...prev.agenda, { id: uid(), point: '' }] }));
    const removeAgenda = (id) =>
      setMomForm((prev) => ({ ...prev, agenda: prev.agenda.filter((a) => a.id !== id) }));

    const updateDecision = (id, field, value) =>
      setMomForm((prev) => ({ ...prev, decisions: prev.decisions.map((d) => (d.id === id ? { ...d, [field]: value } : d)) }));
    const addDecision = () =>
      setMomForm((prev) => ({ ...prev, decisions: [...prev.decisions, { id: uid(), title: '', description: '', responsibleDepartment: DEPARTMENTS[0], priority: 'Medium', targetDate: '' }] }));
    const removeDecision = (id) =>
      setMomForm((prev) => ({ ...prev, decisions: prev.decisions.filter((d) => d.id !== id) }));

    const updateAction = (id, field, value) =>
      setMomForm((prev) => ({ ...prev, actionItems: prev.actionItems.map((a) => (a.id === id ? { ...a, [field]: value } : a)) }));
    const addAction = () =>
      setMomForm((prev) => ({ ...prev, actionItems: [...prev.actionItems, { id: uid(), description: '', assignedTo: '', department: DEPARTMENTS[0], dueDate: '', status: 'Not Started' }] }));
    const removeAction = (id) =>
      setMomForm((prev) => ({ ...prev, actionItems: prev.actionItems.filter((a) => a.id !== id) }));

    const updateAttachment = (id, field, value) =>
      setMomForm((prev) => ({ ...prev, attachments: prev.attachments.map((a) => (a.id === id ? { ...a, [field]: value } : a)) }));
    const addAttachment = () =>
      setMomForm((prev) => ({ ...prev, attachments: [...prev.attachments, { id: uid(), type: ATTACHMENT_TYPES[0], fileName: '' }] }));
    const removeAttachment = (id) =>
      setMomForm((prev) => ({ ...prev, attachments: prev.attachments.filter((a) => a.id !== id) }));

    const updatePhoto = (id, field, value) =>
      setMomForm((prev) => ({ ...prev, photos: prev.photos.map((p) => (p.id === id ? { ...p, [field]: value } : p)) }));
    const addPhoto = () =>
      setMomForm((prev) => ({ ...prev, photos: [...prev.photos, { id: uid(), title: '', caption: '', date: '' }] }));
    const removePhoto = (id) =>
      setMomForm((prev) => ({ ...prev, photos: prev.photos.filter((p) => p.id !== id) }));

    const TH_COLS = ['ID', 'Committee', 'Meeting #', 'Date', 'Venue', 'Prepared By', 'Approval', 'Actions'];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Minutes of Meeting</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Digital MOM register linked to committee meetings</p>
          </div>
          <button
            onClick={() => handleOpenMomModal()}
            style={{ backgroundColor: hospital.themeColor }}
            className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add MOM
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total MOMs', value: totalMoms, color: 'text-blue-600' },
            { label: 'Draft MOMs', value: draftMoms, color: 'text-slate-600' },
            { label: 'Pending Approval', value: pendingMoms, color: 'text-amber-600' },
            { label: 'Approved MOMs', value: approvedMoms, color: 'text-emerald-600' },
            { label: 'Meetings with Quorum', value: quorumMoms, color: 'text-violet-600' },
            { label: 'Open Action Items', value: openActionItems, color: 'text-rose-600' },
            { label: 'Attachments Uploaded', value: attachmentsUploaded, color: 'text-indigo-600' },
            { label: 'MOM Completion %', value: `${momCompletion}%`, color: 'text-teal-600' },
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
            placeholder="Search MOMs by committee, meeting number, venue..."
            value={momSearch}
            onChange={(e) => setMomSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
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
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.committee}</td>
                    <td className="px-3 py-3 font-mono text-[9px] text-violet-600 font-bold">{r.meetingNumber}</td>
                    <td className="px-3 py-3 text-slate-600">{r.meetingDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.venue}</td>
                    <td className="px-3 py-3 text-slate-600">{r.preparedBy}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_MOM[r.approvalStatus] || STATUS_BADGE_MOM.Draft}`}>{r.approvalStatus}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleOpenMomModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => handleDeleteMom(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={TH_COLS.length} className="px-3 py-10 text-center">
                      {momSearch ? (
                        <span className="text-[10px] text-slate-400">No MOM records match your search.</span>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-3xl">📝</span>
                          <span className="text-[10px] text-slate-400 font-medium">No minutes of meeting recorded yet.</span>
                          <button onClick={() => handleOpenMomModal()} style={{ backgroundColor: hospital.themeColor }} className="mt-1 px-3 py-1.5 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all shadow-sm cursor-pointer">Add First MOM</button>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
            <span className="text-[9px] text-slate-400 font-medium">Showing {filtered.length} of {momRecords.length} MOM record{momRecords.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {isMomModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[92vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingMomId ? 'Edit MOM' : 'Add MOM'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Minutes of Meeting Register</p>
                </div>
                <button onClick={() => { setIsMomModalOpen(false); setEditingMomId(null); setMomErrors({}); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveMom} className="space-y-5">
                {/* Meeting Link + auto-filled */}
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Meeting Link</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Meeting *</label>
                      <select value={momForm.meetingId} onChange={(e) => {
                        const sel = meetings.find((m) => m.id === e.target.value);
                        setMomForm((prev) => ({
                          ...prev,
                          meetingId: e.target.value,
                          committee: sel ? sel.committee : '',
                          meetingNumber: sel ? sel.meetingNumber : '',
                          meetingDate: sel ? sel.meetingDate : '',
                          venue: sel ? sel.venue : '',
                        }));
                      }} className={`w-full px-3 py-2 border ${momErrors.meetingId ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                        <option value="">Select meeting...</option>
                        {meetingOptions.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
                      </select>
                      {momErrors.meetingId && <p className="text-[9px] text-rose-500 mt-1">{momErrors.meetingId}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Meeting Number (Auto)</label>
                      <input type="text" value={momForm.meetingNumber} readOnly className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-[10px] text-slate-500" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Committee (Auto)</label>
                      <input type="text" value={momForm.committee} readOnly className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-[10px] text-slate-600" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Meeting Date (Auto)</label>
                      <input type="text" value={momForm.meetingDate} readOnly className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-[10px] text-slate-600" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Venue (Auto)</label>
                      <input type="text" value={momForm.venue} readOnly className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-[10px] text-slate-600" />
                    </div>
                  </div>
                </div>

                {/* Approval & Sign-off */}
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Approval &amp; Sign-off</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Prepared By *</label>
                      <input type="text" value={momForm.preparedBy} onChange={(e) => setMomForm({ ...momForm, preparedBy: e.target.value })} className={`w-full px-3 py-2 border ${momErrors.preparedBy ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Prepared by" />
                      {momErrors.preparedBy && <p className="text-[9px] text-rose-500 mt-1">{momErrors.preparedBy}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Reviewed By *</label>
                      <input type="text" value={momForm.reviewedBy} onChange={(e) => setMomForm({ ...momForm, reviewedBy: e.target.value })} className={`w-full px-3 py-2 border ${momErrors.reviewedBy ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Reviewed by" />
                      {momErrors.reviewedBy && <p className="text-[9px] text-rose-500 mt-1">{momErrors.reviewedBy}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Approved By *</label>
                      <input type="text" value={momForm.approvedBy} onChange={(e) => setMomForm({ ...momForm, approvedBy: e.target.value })} className={`w-full px-3 py-2 border ${momErrors.approvedBy ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Approved by" />
                      {momErrors.approvedBy && <p className="text-[9px] text-rose-500 mt-1">{momErrors.approvedBy}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Approval Status *</label>
                      <select value={momForm.approvalStatus} onChange={(e) => setMomForm({ ...momForm, approvalStatus: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {MOM_APPROVAL_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Attendance */}
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Attendance</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Total Members *</label>
                      <input type="number" min="0" value={momForm.attendance.totalMembers} onChange={(e) => updateAttendance('totalMembers', e.target.value === '' ? '' : parseInt(e.target.value) || 0)} className={`w-full px-3 py-2 border ${momErrors.totalMembers ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {momErrors.totalMembers && <p className="text-[9px] text-rose-500 mt-1">{momErrors.totalMembers}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Members Present *</label>
                      <input type="number" min="0" value={momForm.attendance.membersPresent} onChange={(e) => updateAttendance('membersPresent', e.target.value === '' ? '' : parseInt(e.target.value) || 0)} className={`w-full px-3 py-2 border ${momErrors.membersPresent ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {momErrors.membersPresent && <p className="text-[9px] text-rose-500 mt-1">{momErrors.membersPresent}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Members Absent (Auto)</label>
                      <input type="text" value={liveAbsent} readOnly className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-[10px] text-slate-600" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Attendance % (Auto)</label>
                      <input type="text" value={`${livePct}%`} readOnly className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-[10px] text-slate-600" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Quorum Achieved</label>
                      <select value={momForm.attendance.quorumAchieved} onChange={(e) => updateAttendance('quorumAchieved', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {['Yes', 'No'].map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Agenda */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1">Agenda Points</p>
                    <button type="button" onClick={addAgenda} className="px-2 py-1 rounded-lg border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-700 text-[9px] font-bold cursor-pointer flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
                  </div>
                  {momErrors.agenda && <p className="text-[9px] text-rose-500 mb-1">{momErrors.agenda}</p>}
                  <div className="space-y-2">
                    {momForm.agenda.map((a, idx) => (
                      <div key={a.id} className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-slate-400 w-5 shrink-0">{idx + 1}.</span>
                        <input type="text" value={a.point} onChange={(e) => updateAgenda(a.id, 'point', e.target.value)} placeholder="Agenda point" className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                        <button type="button" onClick={() => removeAgenda(a.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors shrink-0"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Discussion Summary */}
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Discussion Summary</p>
                  <textarea value={momForm.discussionSummary} onChange={(e) => setMomForm({ ...momForm, discussionSummary: e.target.value })} rows="3" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Summarise the key discussion..." />
                </div>

                {/* Decisions */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1">Decisions Taken</p>
                    <button type="button" onClick={addDecision} className="px-2 py-1 rounded-lg border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-700 text-[9px] font-bold cursor-pointer flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
                  </div>
                  <div className="space-y-3">
                    {momForm.decisions.map((d) => (
                      <div key={d.id} className="border border-slate-100 rounded-lg p-3 bg-slate-50/40">
                        <div className="flex items-start gap-2">
                          <div className="grid grid-cols-2 gap-2 flex-1">
                            <div className="col-span-2">
                              <input type="text" value={d.title} onChange={(e) => updateDecision(d.id, 'title', e.target.value)} placeholder="Decision title" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                            </div>
                            <div className="col-span-2">
                              <textarea value={d.description} onChange={(e) => updateDecision(d.id, 'description', e.target.value)} rows="2" placeholder="Decision description" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                            </div>
                            <div>
                              <select value={d.responsibleDepartment} onChange={(e) => updateDecision(d.id, 'responsibleDepartment', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                                {DEPARTMENTS.map((c) => <option key={c} value={c}>{c}</option>)}
                              </select>
                            </div>
                            <div>
                              <select value={d.priority} onChange={(e) => updateDecision(d.id, 'priority', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                                {PRIORITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                              </select>
                            </div>
                            <div className="col-span-2">
                              <input type="date" value={d.targetDate} onChange={(e) => updateDecision(d.id, 'targetDate', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                            </div>
                          </div>
                          <button type="button" onClick={() => removeDecision(d.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors shrink-0"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Items */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1">Action Items</p>
                    <button type="button" onClick={addAction} className="px-2 py-1 rounded-lg border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-700 text-[9px] font-bold cursor-pointer flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
                  </div>
                  <div className="space-y-3">
                    {momForm.actionItems.map((a) => (
                      <div key={a.id} className="border border-slate-100 rounded-lg p-3 bg-slate-50/40">
                        <div className="flex items-start gap-2">
                          <div className="grid grid-cols-2 gap-2 flex-1">
                            <div className="col-span-2">
                              <input type="text" value={a.description} onChange={(e) => updateAction(a.id, 'description', e.target.value)} placeholder="Action description" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                            </div>
                            <div>
                              <input type="text" value={a.assignedTo} onChange={(e) => updateAction(a.id, 'assignedTo', e.target.value)} placeholder="Assigned to" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                            </div>
                            <div>
                              <select value={a.department} onChange={(e) => updateAction(a.id, 'department', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                                {DEPARTMENTS.map((c) => <option key={c} value={c}>{c}</option>)}
                              </select>
                            </div>
                            <div>
                              <input type="date" value={a.dueDate} onChange={(e) => updateAction(a.id, 'dueDate', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                            </div>
                            <div>
                              <select value={a.status} onChange={(e) => updateAction(a.id, 'status', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                                {ACTION_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                              </select>
                            </div>
                          </div>
                          <button type="button" onClick={() => removeAction(a.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors shrink-0"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attachments */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1">Attachments (Metadata only)</p>
                    <button type="button" onClick={addAttachment} className="px-2 py-1 rounded-lg border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-700 text-[9px] font-bold cursor-pointer flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
                  </div>
                  <div className="space-y-2">
                    {momForm.attachments.map((a) => (
                      <div key={a.id} className="flex items-center gap-2">
                        <select value={a.type} onChange={(e) => updateAttachment(a.id, 'type', e.target.value)} className="w-44 shrink-0 px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                          {ATTACHMENT_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <input type="text" value={a.fileName} onChange={(e) => updateAttachment(a.id, 'fileName', e.target.value)} placeholder="filename.ext" className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                        <button type="button" onClick={() => removeAttachment(a.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors shrink-0"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meeting Photos */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1">Meeting Photos (Metadata only)</p>
                    <button type="button" onClick={addPhoto} className="px-2 py-1 rounded-lg border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-700 text-[9px] font-bold cursor-pointer flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
                  </div>
                  <div className="space-y-2">
                    {momForm.photos.map((p) => (
                      <div key={p.id} className="flex items-center gap-2">
                        <input type="text" value={p.title} onChange={(e) => updatePhoto(p.id, 'title', e.target.value)} placeholder="Photo title" className="w-40 shrink-0 px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                        <input type="text" value={p.caption} onChange={(e) => updatePhoto(p.id, 'caption', e.target.value)} placeholder="Caption" className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                        <input type="date" value={p.date} onChange={(e) => updatePhoto(p.id, 'date', e.target.value)} className="w-36 shrink-0 px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                        <button type="button" onClick={() => removePhoto(p.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors shrink-0"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsMomModalOpen(false); setEditingMomId(null); setMomErrors({}); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingMomId ? 'Save Changes' : 'Add MOM'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ActionTrackerTab = () => {
    const committeeFilterOptions = Array.from(new Set(actionTracker.items.map((r) => r.committee))).sort();

    const filtered = actionTracker.items.filter((r) => {
      const q = actionSearch.toLowerCase();
      const matchesSearch =
        r.description.toLowerCase().includes(q) ||
        r.committee.toLowerCase().includes(q) ||
        (r.assignedTo || '').toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.meeting.toLowerCase().includes(q);
      const matchesCommittee = !actionCommitteeFilter || r.committee === actionCommitteeFilter;
      const matchesStatus = !actionStatusFilter || effectiveActionStatus(r) === actionStatusFilter;
      const matchesPriority = !actionPriorityFilter || r.priority === actionPriorityFilter;
      return matchesSearch && matchesCommittee && matchesStatus && matchesPriority;
    });

    const total = actionTracker.items.length;
    const byStatus = (s) => actionTracker.items.filter((r) => effectiveActionStatus(r) === s).length;
    const pending = byStatus('Pending');
    const inProgress = byStatus('In Progress');
    const completed = byStatus('Completed');
    const overdue = byStatus('Overdue');
    const critical = actionTracker.items.filter((r) => r.priority === 'Critical').length;
    const avgProgress = total ? Math.round(actionTracker.items.reduce((s, r) => s + (Number(r.progress) || 0), 0) / total) : 0;
    const closureRate = total ? Math.round((completed / total) * 100) : 0;

    const TH_COLS = ['Action ID', 'Committee', 'Meeting', 'Action Description', 'Assigned To', 'Department', 'Priority', 'Target Date', 'Status', 'Progress %', 'Remarks', 'Last Updated', 'Actions'];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Action Tracker</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Auto-synced from Minutes of Meeting action items</p>
          </div>
          <span className="text-[9px] font-bold text-slate-400 bg-slate-100 border border-slate-200 px-2 py-1 rounded-full">Read-only source: MOM</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Action Items', value: total, color: 'text-blue-600' },
            { label: 'Pending', value: pending, color: 'text-slate-600' },
            { label: 'In Progress', value: inProgress, color: 'text-sky-600' },
            { label: 'Completed', value: completed, color: 'text-emerald-600' },
            { label: 'Overdue', value: overdue, color: 'text-rose-600' },
            { label: 'Critical Priority', value: critical, color: 'text-amber-600' },
            { label: 'Average Progress %', value: `${avgProgress}%`, color: 'text-violet-600' },
            { label: 'Action Closure Rate %', value: `${closureRate}%`, color: 'text-teal-600' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search actions..."
              value={actionSearch}
              onChange={(e) => setActionSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            />
          </div>
          <select value={actionCommitteeFilter} onChange={(e) => setActionCommitteeFilter(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
            <option value="">All Committees</option>
            {committeeFilterOptions.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={actionStatusFilter} onChange={(e) => setActionStatusFilter(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
            <option value="">All Statuses</option>
            {ACTION_TRACKER_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={actionPriorityFilter} onChange={(e) => setActionPriorityFilter(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
            <option value="">All Priorities</option>
            {PRIORITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
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
                {filtered.map((r) => {
                  const eff = effectiveActionStatus(r);
                  return (
                    <tr key={r.key} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.actionId}</td>
                      <td className="px-3 py-3 font-semibold text-slate-700">{r.committee}</td>
                      <td className="px-3 py-3 font-mono text-[9px] text-violet-600 font-bold">{r.meeting}</td>
                      <td className="px-3 py-3 text-slate-700 max-w-[200px] truncate" title={r.description}>{r.description}</td>
                      <td className="px-3 py-3 text-slate-600">{r.assignedTo || '-'}</td>
                      <td className="px-3 py-3 text-slate-600">{r.department}</td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${r.priority === 'Critical' ? 'bg-rose-50 text-rose-700 border-rose-200' : r.priority === 'High' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>{r.priority}</span>
                      </td>
                      <td className="px-3 py-3 text-slate-600">{r.dueDate || '-'}</td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_ACTION[eff] || STATUS_BADGE_ACTION.Pending}`}>{eff}</span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-500" style={{ width: `${Math.min(Number(r.progress) || 0, 100)}%` }} />
                          </div>
                          <span className="text-[9px] font-bold text-slate-600">{Number(r.progress) || 0}%</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-slate-600 max-w-[160px] truncate" title={r.remarks}>{r.remarks || '-'}</td>
                      <td className="px-3 py-3 text-slate-500">{r.lastUpdated || '-'}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleOpenActionModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Update"><Edit3 className="w-3 h-3" /></button>
                          <button onClick={() => handleDeleteAction(r.key)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={TH_COLS.length} className="px-3 py-10 text-center">
                      {actionSearch || actionCommitteeFilter || actionStatusFilter || actionPriorityFilter ? (
                        <span className="text-[10px] text-slate-400">No action items match your filters.</span>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-3xl">✅</span>
                          <span className="text-[10px] text-slate-400 font-medium">No action items yet. Add action items in Minutes of Meeting.</span>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
            <span className="text-[9px] text-slate-400 font-medium">Showing {filtered.length} of {actionTracker.items.length} action item{actionTracker.items.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {isActionModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">Update Action</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Action Tracker</p>
                </div>
                <button onClick={() => { setIsActionModalOpen(false); setEditingActionKey(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-1">
                  <p className="text-[9px] text-slate-500"><span className="font-bold text-slate-600">Committee:</span> {actionTracker.items.find((it) => it.key === editingActionKey)?.committee}</p>
                  <p className="text-[9px] text-slate-500"><span className="font-bold text-slate-600">Meeting:</span> {actionTracker.items.find((it) => it.key === editingActionKey)?.meeting}</p>
                  <p className="text-[9px] text-slate-500"><span className="font-bold text-slate-600">Action:</span> {actionTracker.items.find((it) => it.key === editingActionKey)?.description}</p>
                  <p className="text-[9px] text-slate-500"><span className="font-bold text-slate-600">Assigned To:</span> {actionTracker.items.find((it) => it.key === editingActionKey)?.assignedTo}</p>
                  <p className="text-[9px] text-slate-500"><span className="font-bold text-slate-600">Department:</span> {actionTracker.items.find((it) => it.key === editingActionKey)?.department} &nbsp;|&nbsp; <span className="font-bold text-slate-600">Priority:</span> {actionTracker.items.find((it) => it.key === editingActionKey)?.priority} &nbsp;|&nbsp; <span className="font-bold text-slate-600">Target:</span> {actionTracker.items.find((it) => it.key === editingActionKey)?.dueDate}</p>
                  <p className="text-[9px] text-slate-400 italic">These fields are managed in Minutes of Meeting.</p>
                </div>

                <form onSubmit={handleSaveAction} className="space-y-4">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select value={actionForm.status} onChange={(e) => setActionForm({ ...actionForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      {ACTION_TRACKER_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Progress %</label>
                    <input type="number" min="0" max="100" value={actionForm.progress} onChange={(e) => setActionForm({ ...actionForm, progress: e.target.value === '' ? '' : Math.max(0, Math.min(100, parseInt(e.target.value) || 0)) })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                    {Number(actionForm.progress) >= 100 && <p className="text-[9px] text-emerald-600 mt-1">Progress at 100% — status will be set to Completed.</p>}
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                    <textarea value={actionForm.remarks} onChange={(e) => setActionForm({ ...actionForm, remarks: e.target.value })} rows="3" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Remarks" />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onClick={() => { setIsActionModalOpen(false); setEditingActionKey(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                    <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const AuditTab = () => {
    const filteredAudits = audits.filter((r) => {
      const q = auditSearch.toLowerCase();
      return (
        r.committee.toLowerCase().includes(q) ||
        (r.auditorName || '').toLowerCase().includes(q) ||
        r.auditType.toLowerCase().includes(q) ||
        r.overallStatus.toLowerCase().includes(q) ||
        (meetingLabel(meetings.find((m) => m.id === r.meetingId)) || '').toLowerCase().includes(q)
      );
    });

    const filteredCapas = capas.filter((r) => {
      const q = capaSearch.toLowerCase();
      const audit = audits.find((a) => a.id === r.auditId);
      return (
        (r.finding || '').toLowerCase().includes(q) ||
        (r.responsiblePerson || '').toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q) ||
        (audit ? audit.committee.toLowerCase().includes(q) : false)
      );
    });

    const totalAudits = audits.length;
    const completedAudits = audits.filter((r) => r.overallStatus === 'Completed').length;
    const pendingAudits = audits.filter((r) => r.overallStatus === 'Pending').length;
    const avgCompliance = audits.filter((r) => r.overallStatus === 'Completed').length
      ? Math.round(audits.filter((r) => r.overallStatus === 'Completed').reduce((s, r) => s + (Number(r.complianceScore) || 0), 0) / audits.filter((r) => r.overallStatus === 'Completed').length)
      : 0;
    const openCapas = capas.filter((r) => r.status !== 'Closed').length;
    const closedCapas = capas.filter((r) => r.status === 'Closed').length;
    const capaClosure = capas.length ? Math.round((closedCapas / capas.length) * 100) : 0;
    const overallScore = totalAudits ? Math.round(audits.reduce((s, r) => s + (Number(r.complianceScore) || 0), 0) / totalAudits) : 0;

    const auditTH = ['ID', 'Committee', 'Meeting', 'Audit Date', 'Auditor', 'Type', 'Compliance %', 'Status', 'Actions'];
    const capaTH = ['ID', 'Audit', 'Finding', 'Responsible', 'Target Date', 'Status', 'Closure Date', 'Actions'];

    const yesNoSelect = (value, onChange, errKey, baseClass) => (
      <select value={value} onChange={onChange} className={`w-full px-3 py-2 border ${errKey ? 'border-rose-400' : baseClass} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
        {YES_NO.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
    );

    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Internal Audit</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Committee audit register &amp; CAPA tracker</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Audits', value: totalAudits, color: 'text-blue-600' },
            { label: 'Completed Audits', value: completedAudits, color: 'text-emerald-600' },
            { label: 'Pending Audits', value: pendingAudits, color: 'text-amber-600' },
            { label: 'Average Compliance %', value: `${avgCompliance}%`, color: 'text-violet-600' },
            { label: 'Open CAPAs', value: openCapas, color: 'text-sky-600' },
            { label: 'Closed CAPAs', value: closedCapas, color: 'text-teal-600' },
            { label: 'CAPA Closure %', value: `${capaClosure}%`, color: 'text-indigo-600' },
            { label: 'Overall Committee Audit Score', value: `${overallScore}%`, color: 'text-rose-600' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Module 1: Audit Register */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider">Committee Internal Audit Register</h4>
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
                    {auditTH.map((h) => (<th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAudits.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                      <td className="px-3 py-3 font-semibold text-slate-700 max-w-[160px] truncate" title={r.committee}>{r.committee}</td>
                      <td className="px-3 py-3 text-slate-600">{meetingLabel(meetings.find((m) => m.id === r.meetingId)) || '-'}</td>
                      <td className="px-3 py-3 text-slate-600">{r.auditDate}</td>
                      <td className="px-3 py-3 text-slate-600">{r.auditorName}</td>
                      <td className="px-3 py-3 text-violet-600 font-bold">{r.auditType}</td>
                      <td className="px-3 py-3 text-emerald-600 font-bold">{r.complianceScore}%</td>
                      <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_AUDIT[r.overallStatus] || STATUS_BADGE_AUDIT.Pending}`}>{r.overallStatus}</span></td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleOpenAuditModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                          <button onClick={() => handleDeleteAudit(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredAudits.length === 0 && (
                    <tr><td colSpan={auditTH.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{auditSearch ? 'No audits match your search.' : 'No audit records yet.'}</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
              <span className="text-[9px] text-slate-400 font-medium">Showing {filteredAudits.length} of {audits.length} audit record{audits.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        {/* Module 2: CAPA Tracker */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider">CAPA Tracker</h4>
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
                    {capaTH.map((h) => (<th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCapas.map((r) => {
                    const audit = audits.find((a) => a.id === r.auditId);
                    return (
                      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                        <td className="px-3 py-3 text-slate-600">{audit ? `${audit.id} (${audit.committee})` : '-'}</td>
                        <td className="px-3 py-3 text-slate-700 max-w-[200px] truncate" title={r.finding}>{r.finding}</td>
                        <td className="px-3 py-3 text-slate-600">{r.responsiblePerson}</td>
                        <td className="px-3 py-3 text-slate-600">{r.targetDate}</td>
                        <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_CAPA[r.status] || STATUS_BADGE_CAPA.Open}`}>{r.status}</span></td>
                        <td className="px-3 py-3 text-slate-600">{r.closureDate || '-'}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleOpenCapaModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                            <button onClick={() => handleDeleteCapa(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredCapas.length === 0 && (
                    <tr><td colSpan={capaTH.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{capaSearch ? 'No CAPAs match your search.' : 'No CAPA records yet.'}</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
              <span className="text-[9px] text-slate-400 font-medium">Showing {filteredCapas.length} of {capas.length} CAPA record{capas.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        {/* Audit Modal */}
        {isAuditModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingAuditId ? 'Edit Audit' : 'Add Audit'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Committee Internal Audit Register</p>
                </div>
                <button onClick={() => { setIsAuditModalOpen(false); setEditingAuditId(null); setAuditErrors({}); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"><X className="w-4 h-4 text-slate-500" /></button>
              </div>
              <form onSubmit={handleSaveAudit} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Audit Information</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Committee *</label>
                      <select value={auditForm.committee} onChange={(e) => setAuditForm({ ...auditForm, committee: e.target.value })} className={`w-full px-3 py-2 border ${auditErrors.committee ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                        {committeeOptionsAudit.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {auditErrors.committee && <p className="text-[9px] text-rose-500 mt-1">{auditErrors.committee}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Meeting *</label>
                      <select value={auditForm.meetingId} onChange={(e) => setAuditForm({ ...auditForm, meetingId: e.target.value })} className={`w-full px-3 py-2 border ${auditErrors.meetingId ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                        <option value="">Select meeting...</option>
                        {meetingOptionsAudit.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
                      </select>
                      {auditErrors.meetingId && <p className="text-[9px] text-rose-500 mt-1">{auditErrors.meetingId}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Date *</label>
                      <input type="date" value={auditForm.auditDate} onChange={(e) => setAuditForm({ ...auditForm, auditDate: e.target.value })} className={`w-full px-3 py-2 border ${auditErrors.auditDate ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {auditErrors.auditDate && <p className="text-[9px] text-rose-500 mt-1">{auditErrors.auditDate}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Auditor Name *</label>
                      <input type="text" value={auditForm.auditorName} onChange={(e) => setAuditForm({ ...auditForm, auditorName: e.target.value })} className={`w-full px-3 py-2 border ${auditErrors.auditorName ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Auditor name" />
                      {auditErrors.auditorName && <p className="text-[9px] text-rose-500 mt-1">{auditErrors.auditorName}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Type</label>
                      <select value={auditForm.auditType} onChange={(e) => setAuditForm({ ...auditForm, auditType: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {AUDIT_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Compliance Score (%) *</label>
                      <input type="number" min="0" max="100" value={auditForm.complianceScore} onChange={(e) => setAuditForm({ ...auditForm, complianceScore: e.target.value === '' ? '' : parseInt(e.target.value) || 0 })} className={`w-full px-3 py-2 border ${auditErrors.complianceScore ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {auditErrors.complianceScore && <p className="text-[9px] text-rose-500 mt-1">{auditErrors.complianceScore}</p>}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Verification Checklist</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Quorum Verified</label>
                      {yesNoSelect(auditForm.quorumVerified, (e) => setAuditForm({ ...auditForm, quorumVerified: e.target.value }), null, 'border-slate-300')}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Attendance Verified</label>
                      {yesNoSelect(auditForm.attendanceVerified, (e) => setAuditForm({ ...auditForm, attendanceVerified: e.target.value }), null, 'border-slate-300')}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Agenda Available</label>
                      {yesNoSelect(auditForm.agendaAvailable, (e) => setAuditForm({ ...auditForm, agendaAvailable: e.target.value }), null, 'border-slate-300')}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">MOM Prepared</label>
                      {yesNoSelect(auditForm.momPrepared, (e) => setAuditForm({ ...auditForm, momPrepared: e.target.value }), null, 'border-slate-300')}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">MOM Approved</label>
                      {yesNoSelect(auditForm.momApproved, (e) => setAuditForm({ ...auditForm, momApproved: e.target.value }), null, 'border-slate-300')}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Supporting Docs Verified</label>
                      {yesNoSelect(auditForm.supportingDocsVerified, (e) => setAuditForm({ ...auditForm, supportingDocsVerified: e.target.value }), null, 'border-slate-300')}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Action Items Closed (%)</label>
                      <input type="number" min="0" max="100" value={auditForm.actionItemsClosed} onChange={(e) => setAuditForm({ ...auditForm, actionItemsClosed: e.target.value === '' ? '' : parseInt(e.target.value) || 0 })} className={`w-full px-3 py-2 border ${auditErrors.actionItemsClosed ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {auditErrors.actionItemsClosed && <p className="text-[9px] text-rose-500 mt-1">{auditErrors.actionItemsClosed}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Overall Status *</label>
                      <select value={auditForm.overallStatus} onChange={(e) => setAuditForm({ ...auditForm, overallStatus: e.target.value })} className={`w-full px-3 py-2 border ${auditErrors.overallStatus ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                        {AUDIT_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {auditErrors.overallStatus && <p className="text-[9px] text-rose-500 mt-1">{auditErrors.overallStatus}</p>}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Remarks</p>
                  <textarea value={auditForm.remarks} onChange={(e) => setAuditForm({ ...auditForm, remarks: e.target.value })} rows="2" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Optional remarks" />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsAuditModalOpen(false); setEditingAuditId(null); setAuditErrors({}); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingAuditId ? 'Save Changes' : 'Add Audit'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CAPA Modal */}
        {isCapaModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingCapaId ? 'Edit CAPA' : 'Add CAPA'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">CAPA Tracker</p>
                </div>
                <button onClick={() => { setIsCapaModalOpen(false); setEditingCapaId(null); setCapaErrors({}); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"><X className="w-4 h-4 text-slate-500" /></button>
              </div>
              <form onSubmit={handleSaveCapa} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">CAPA Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Linked Audit *</label>
                      <select value={capaForm.auditId} onChange={(e) => setCapaForm({ ...capaForm, auditId: e.target.value })} className={`w-full px-3 py-2 border ${capaErrors.auditId ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                        <option value="">Select audit...</option>
                        {audits.map((a) => <option key={a.id} value={a.id}>{a.id} — {a.committee}</option>)}
                      </select>
                      {capaErrors.auditId && <p className="text-[9px] text-rose-500 mt-1">{capaErrors.auditId}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Responsible Person *</label>
                      <input type="text" value={capaForm.responsiblePerson} onChange={(e) => setCapaForm({ ...capaForm, responsiblePerson: e.target.value })} className={`w-full px-3 py-2 border ${capaErrors.responsiblePerson ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Responsible person" />
                      {capaErrors.responsiblePerson && <p className="text-[9px] text-rose-500 mt-1">{capaErrors.responsiblePerson}</p>}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Finding *</label>
                      <textarea value={capaForm.finding} onChange={(e) => setCapaForm({ ...capaForm, finding: e.target.value })} rows="2" className={`w-full px-3 py-2 border ${capaErrors.finding ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Finding" />
                      {capaErrors.finding && <p className="text-[9px] text-rose-500 mt-1">{capaErrors.finding}</p>}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Root Cause *</label>
                      <textarea value={capaForm.rootCause} onChange={(e) => setCapaForm({ ...capaForm, rootCause: e.target.value })} rows="2" className={`w-full px-3 py-2 border ${capaErrors.rootCause ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Root cause" />
                      {capaErrors.rootCause && <p className="text-[9px] text-rose-500 mt-1">{capaErrors.rootCause}</p>}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Corrective Action *</label>
                      <textarea value={capaForm.correctiveAction} onChange={(e) => setCapaForm({ ...capaForm, correctiveAction: e.target.value })} rows="2" className={`w-full px-3 py-2 border ${capaErrors.correctiveAction ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Corrective action" />
                      {capaErrors.correctiveAction && <p className="text-[9px] text-rose-500 mt-1">{capaErrors.correctiveAction}</p>}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Preventive Action</label>
                      <textarea value={capaForm.preventiveAction} onChange={(e) => setCapaForm({ ...capaForm, preventiveAction: e.target.value })} rows="2" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Preventive action" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Target Date</label>
                      <input type="date" value={capaForm.targetDate} onChange={(e) => setCapaForm({ ...capaForm, targetDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                      <select value={capaForm.status} onChange={(e) => setCapaForm({ ...capaForm, status: e.target.value })} className={`w-full px-3 py-2 border ${capaErrors.status ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                        {CAPA_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {capaErrors.status && <p className="text-[9px] text-rose-500 mt-1">{capaErrors.status}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Closure Date</label>
                      <input type="date" value={capaForm.closureDate} onChange={(e) => setCapaForm({ ...capaForm, closureDate: e.target.value })} className={`w-full px-3 py-2 border ${capaErrors.closureDate ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {capaErrors.closureDate && <p className="text-[9px] text-rose-500 mt-1">{capaErrors.closureDate}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Effectiveness Verified</label>
                      {yesNoSelect(capaForm.effectivenessVerified, (e) => setCapaForm({ ...capaForm, effectivenessVerified: e.target.value }), null, 'border-slate-300')}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                      <textarea value={capaForm.remarks} onChange={(e) => setCapaForm({ ...capaForm, remarks: e.target.value })} rows="2" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Optional remarks" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsCapaModalOpen(false); setEditingCapaId(null); setCapaErrors({}); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingCapaId ? 'Save Changes' : 'Add CAPA'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ReportsTab = () => {
    const totalCommittees = committees.length;
    const totalMeetings = meetings.length;
    const totalMoms = momRecords.length;
    const approvedMoms = momRecords.filter((r) => r.approvalStatus === 'Approved').length;
    const momApprovalPct = totalMoms ? Math.round((approvedMoms / totalMoms) * 100) : 0;
    const attendancePct = totalMoms
      ? Math.round(momRecords.reduce((s, r) => s + parsePct(r.attendance && r.attendance.attendancePct), 0) / totalMoms)
      : 0;
    const totalActions = actionTracker.items.length;
    const completedActions = actionTracker.items.filter((r) => effectiveActionStatus(r) === 'Completed').length;
    const actionClosurePct = totalActions ? Math.round((completedActions / totalActions) * 100) : 0;
    const totalAudits = audits.length;
    const auditCompliancePct = totalAudits
      ? Math.round(audits.reduce((s, r) => s + (Number(r.complianceScore) || 0), 0) / totalAudits)
      : 0;
    const totalCapas = capas.length;
    const closedCapas = capas.filter((r) => r.status === 'Closed').length;
    const capaClosurePct = totalCapas ? Math.round((closedCapas / totalCapas) * 100) : 0;
    const overallPerformancePct = Math.round(
      (momApprovalPct + attendancePct + actionClosurePct + auditCompliancePct + capaClosurePct) / 5
    );

    const kpiData = [
      { label: 'Total Committees', value: totalCommittees, color: 'text-blue-600' },
      { label: 'Total Meetings', value: totalMeetings, color: 'text-sky-600' },
      { label: 'MOM Approval %', value: `${momApprovalPct}%`, color: 'text-emerald-600' },
      { label: 'Attendance Compliance %', value: `${attendancePct}%`, color: 'text-violet-600' },
      { label: 'Action Closure Rate %', value: `${actionClosurePct}%`, color: 'text-teal-600' },
      { label: 'Internal Audit Compliance %', value: `${auditCompliancePct}%`, color: 'text-indigo-600' },
      { label: 'CAPA Closure %', value: `${capaClosurePct}%`, color: 'text-rose-600' },
      { label: 'Overall Committee Performance %', value: `${overallPerformancePct}%`, color: 'text-amber-600' },
    ];

    // Chart 1: Monthly Meetings Trend
    const monthOrder = MONTH_ABBR.slice();
    const monthlyMeetingsMap = meetings.reduce((acc, m) => {
      const key = monthAbbrFromDate(m.meetingDate) || 'Unscheduled';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    const monthlyMeetingsData = monthOrder
      .filter((mo) => monthlyMeetingsMap[mo])
      .map((mo) => ({ name: mo, meetings: monthlyMeetingsMap[mo] }));

    // Chart 2: Committee-wise Meetings
    const committeeMeetingsData = committees
      .map((c) => ({
        name: c.committeeName.length > 18 ? `${c.committeeName.slice(0, 16)}…` : c.committeeName,
        value: meetings.filter((m) => m.committee === c.committeeName).length,
      }))
      .filter((d) => d.value > 0);

    // Chart 3: MOM Approval Status
    const momApprovalData = MOM_APPROVAL_STATUSES.map((s) => ({
      name: s,
      value: momRecords.filter((r) => r.approvalStatus === s).length,
    })).filter((d) => d.value > 0);

    // Chart 4: Action Status Distribution
    const actionStatusData = ACTION_TRACKER_STATUSES.map((s) => ({
      name: s,
      value: actionTracker.items.filter((r) => effectiveActionStatus(r) === s).length,
    })).filter((d) => d.value > 0);

    // Chart 5: Audit Compliance Trend
    const auditComplianceData = audits.map((a) => ({ name: a.id, compliance: Number(a.complianceScore) || 0 }));

    // Chart 6: CAPA Closure Trend (status distribution)
    const capaClosureData = CAPA_STATUSES.map((s) => ({
      name: s,
      value: capas.filter((r) => r.status === s).length,
    })).filter((d) => d.value > 0);

    // Monthly Committee Summary Table
    const summaryRows = committees.map((c) => {
      const cMeetings = meetings.filter((m) => m.committee === c.committeeName).length;
      const cMoms = momRecords.filter((r) => r.committee === c.committeeName);
      const cAttendance = cMoms.length
        ? Math.round(cMoms.reduce((s, r) => s + parsePct(r.attendance && r.attendance.attendancePct), 0) / cMoms.length)
        : 0;
      const cActions = actionTracker.items.filter((r) => r.committee === c.committeeName);
      const cOpen = cActions.filter((r) => effectiveActionStatus(r) !== 'Completed').length;
      const cCompleted = cActions.filter((r) => effectiveActionStatus(r) === 'Completed').length;
      const cAudits = audits.filter((r) => r.committee === c.committeeName);
      const cAudit = cAudits.length
        ? Math.round(cAudits.reduce((s, r) => s + (Number(r.complianceScore) || 0), 0) / cAudits.length)
        : 0;
      const cClosure = cActions.length ? Math.round((cCompleted / cActions.length) * 100) : 0;
      const overall = Math.round(
        (cAttendance + cClosure + cAudit) / 3
      );
      return {
        committee: c.committeeName,
        meetings: cMeetings,
        attendance: cAttendance,
        openActions: cOpen,
        completedActions: cCompleted,
        auditCompliance: cAudit,
        overallPerformance: overall,
      };
    });

    const handleExportCSV = () => {
      const headers = ['Committee', 'Meetings', 'Attendance %', 'Open Actions', 'Completed Actions', 'Audit Compliance %', 'Overall Performance %'];
      const rows = summaryRows.map((r) => [r.committee, r.meetings, r.attendance, r.openActions, r.completedActions, r.auditCompliance, r.overallPerformance]);
      const kpiLine = ['', '', '', '', '', '', ''];
      const kpiLabels = ['Total Committees', 'Total Meetings', 'MOM Approval %', 'Attendance Compliance %', 'Action Closure Rate %', 'Internal Audit Compliance %', 'CAPA Closure %', 'Overall Committee Performance %'];
      const kpiValues = [totalCommittees, totalMeetings, `${momApprovalPct}%`, `${attendancePct}%`, `${actionClosurePct}%`, `${auditCompliancePct}%`, `${capaClosurePct}%`, `${overallPerformancePct}%`];
      const csvContent = [
        ['Committee MOM — Reports & Analytics'],
        ['KPI', ...kpiLabels],
        ['Value', ...kpiValues],
        [],
        headers,
        ...rows,
      ].map((e) => e.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'Committee_MOM_Reports.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const handleExportPDF = () => alert('PDF export will be available in the next version.');
    const handlePrint = () => alert('Print report will be available in the next version.');

    const summaryTH = ['Committee', 'Meetings', 'Attendance %', 'Open Actions', 'Completed Actions', 'Audit Compliance %', 'Overall Performance %'];

    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Reports &amp; Analytics</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Aggregated insights across all committee modules</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleExportCSV} className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 hover:border-slate-300 text-[9px] font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer">
              <FileDown className="w-3.5 h-3.5" /> Export CSV
            </button>
            <button onClick={handleExportPDF} className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 hover:border-slate-300 text-[9px] font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer">
              <Download className="w-3.5 h-3.5" /> Export PDF
            </button>
            <button onClick={handlePrint} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-xl text-white text-[9px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer">
              <Printer className="w-3.5 h-3.5" /> Print Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {kpiData.map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-700 mb-4">Monthly Meetings Trend</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyMeetingsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                  <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Bar dataKey="meetings" fill={hospital.themeColor || '#3b82f6'} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-700 mb-4">Committee-wise Meetings</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={committeeMeetingsData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={3} dataKey="value">
                    {committeeMeetingsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '9px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-700 mb-4">MOM Approval Status</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={momApprovalData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={3} dataKey="value">
                    {momApprovalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '9px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-700 mb-4">Action Status Distribution</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={actionStatusData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                  <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-700 mb-4">Audit Compliance Trend</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={auditComplianceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 100]} style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} width={48} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Bar dataKey="compliance" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-700 mb-4">CAPA Closure Trend</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={capaClosureData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                  <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200">
            <h3 className="text-xs font-bold text-slate-800">Monthly Committee Summary</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {summaryTH.map((h) => (
                    <th key={h} className="px-4 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {summaryRows.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-2 font-semibold text-slate-700">{r.committee}</td>
                    <td className="px-4 py-2 text-slate-600">{r.meetings}</td>
                    <td className="px-4 py-2 text-sky-600 font-bold">{r.attendance}%</td>
                    <td className="px-4 py-2 text-amber-600 font-bold">{r.openActions}</td>
                    <td className="px-4 py-2 text-emerald-600 font-bold">{r.completedActions}</td>
                    <td className="px-4 py-2 text-indigo-600 font-bold">{r.auditCompliance}%</td>
                    <td className="px-4 py-2 text-rose-600 font-bold">{r.overallPerformance}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
            <span className="text-[9px] text-slate-400 font-medium">Showing {summaryRows.length} committees</span>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab hospital={hospital} />;
      case 'registry':
        return <RegistryTab />;
      case 'meetings':
        return <MeetingTab />;
      case 'mom':
        return <MOMTab />;
      case 'action_tracker':
        return <ActionTrackerTab />;
      case 'audit':
        return <AuditTab />;
      case 'reports':
        return <ReportsTab />;
      default:
        return null;
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
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">Committee MOM</h2>
          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">
            Hospital Committee &amp; Minutes of Meeting Management System
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
            Committee MOM — NABH Module
          </p>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto custom-scroll bg-slate-50/40 p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default CommitteeMOMWorkspace;

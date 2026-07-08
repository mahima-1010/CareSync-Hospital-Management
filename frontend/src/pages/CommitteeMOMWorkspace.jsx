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

const CommitteeMOMWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab hospital={hospital} />;
      case 'registry':
        return <PlaceholderTab title="Committee Registry" />;
      case 'meetings':
        return <PlaceholderTab title="Meeting Management" />;
      case 'mom':
        return <PlaceholderTab title="Minutes of Meeting" />;
      case 'action_tracker':
        return <PlaceholderTab title="Action Tracker" />;
      case 'audit':
        return <PlaceholderTab title="Internal Audit" />;
      case 'reports':
        return <PlaceholderTab title="Reports & Analytics" />;
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

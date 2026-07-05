import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  ChevronLeft,
  LayoutDashboard,
  AlertTriangle,
  Beaker,
  TestTube,
  Flame,
  CheckSquare,
  FileText
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
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'risk_assessment', label: 'Laboratory Risk Assessment', icon: AlertTriangle },
  { id: 'equipment_chemical', label: 'Equipment & Chemical Safety', icon: Beaker },
  { id: 'specimen_training', label: 'Specimen Handling & Training', icon: TestTube },
  { id: 'incident_emergency', label: 'Incident & Emergency Management', icon: Flame },
  { id: 'internal_audit', label: 'Internal Audit', icon: CheckSquare },
  { id: 'reports', label: 'Reports & Analytics', icon: FileText },
];

const RECENT_ACTIVITIES = [
  { id: 1, date: '2026-07-01', activity: 'Fire Drill', department: 'Histopathology', performedBy: 'Dr. Sarah Connor', status: 'Completed' },
  { id: 2, date: '2026-07-02', activity: 'Spill Drill', department: 'Biochemistry', performedBy: 'John Doe', status: 'Completed' },
  { id: 3, date: '2026-07-03', activity: 'PPE Audit', department: 'Microbiology', performedBy: 'Jane Smith', status: 'In Progress' },
  { id: 4, date: '2026-07-04', activity: 'Chemical Inspection', department: 'Hematology', performedBy: 'Dr. Bruce Banner', status: 'Completed' },
  { id: 5, date: '2026-07-05', activity: 'Specimen Audit', department: 'Pathology', performedBy: 'Alice Johnson', status: 'Pending' },
  { id: 6, date: '2026-07-05', activity: 'Internal Audit', department: 'Quality Assurance', performedBy: 'Robert King', status: 'Completed' },
  { id: 7, date: '2026-07-06', activity: 'Waste Disposal Audit', department: 'Biomedical Waste', performedBy: 'Emily Clark', status: 'In Progress' },
  { id: 8, date: '2026-07-07', activity: 'Safety Training', department: 'All Staff', performedBy: 'HR & Safety Dept', status: 'Scheduled' },
];

const monthlyComplianceData = [
  { name: 'Jan', compliance: 85 },
  { name: 'Feb', compliance: 88 },
  { name: 'Mar', compliance: 92 },
  { name: 'Apr', compliance: 90 },
  { name: 'May', compliance: 95 },
  { name: 'Jun', compliance: 96 },
];

const riskCategoryData = [
  { name: 'Chemical', value: 35 },
  { name: 'Biological', value: 45 },
  { name: 'Physical', value: 10 },
  { name: 'Ergonomic', value: 10 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const equipmentStatusData = [
  { name: 'Operational', value: 85 },
  { name: 'Maintenance', value: 10 },
  { name: 'Out of Order', value: 5 },
];

const trainingComplianceData = [
  { name: 'Jan', compliance: 70 },
  { name: 'Feb', compliance: 75 },
  { name: 'Mar', compliance: 80 },
  { name: 'Apr', compliance: 85 },
  { name: 'May', compliance: 90 },
  { name: 'Jun', compliance: 92 },
];

const incidentTrendData = [
  { name: 'Jan', incidents: 5 },
  { name: 'Feb', incidents: 3 },
  { name: 'Mar', incidents: 4 },
  { name: 'Apr', incidents: 2 },
  { name: 'May', incidents: 1 },
  { name: 'Jun', incidents: 2 },
];

const auditComplianceData = [
  { name: 'Jan', score: 80 },
  { name: 'Feb', score: 82 },
  { name: 'Mar', score: 85 },
  { name: 'Apr', score: 88 },
  { name: 'May', score: 91 },
  { name: 'Jun', score: 94 },
];

const LaboratorySafetyWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { title: 'Total Risk Assessments', value: '145', color: 'text-blue-600' },
          { title: 'Equipment Compliance %', value: '94%', color: 'text-emerald-600' },
          { title: 'PPE Compliance %', value: '92%', color: 'text-amber-600' },
          { title: 'Specimen Handling Compliance %', value: '96%', color: 'text-violet-600' },
          { title: 'Chemical Safety Compliance %', value: '88%', color: 'text-sky-600' },
          { title: 'Open Incidents', value: '3', color: 'text-rose-600' },
          { title: 'Audit Compliance %', value: '91%', color: 'text-indigo-600' },
          { title: 'Overall Laboratory Safety %', value: '93%', color: 'text-emerald-600' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{kpi.title}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-bold text-slate-800 mb-4">Monthly Safety Compliance Trend</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyComplianceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="compliance" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-bold text-slate-800 mb-4">Risk Category Distribution</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskCategoryData} innerRadius={40} outerRadius={70} dataKey="value">
                  {riskCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-bold text-slate-800 mb-4">Equipment Status</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={equipmentStatusData} outerRadius={70} dataKey="value">
                  {equipmentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#10b981', '#f59e0b', '#ef4444'][index % 3]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-bold text-slate-800 mb-4">Training Compliance</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trainingComplianceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="compliance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-bold text-slate-800 mb-4">Incident Trend</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={incidentTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-bold text-slate-800 mb-4">Audit Compliance Trend</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={auditComplianceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200">
          <h3 className="text-xs font-bold text-slate-800">Recent Laboratory Activities</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Activity</th>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Department</th>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Performed By</th>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {RECENT_ACTIVITIES.map((activity) => (
                <tr key={activity.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-700">{activity.date}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{activity.activity}</td>
                  <td className="px-4 py-3 text-slate-600">{activity.department}</td>
                  <td className="px-4 py-3 text-slate-600">{activity.performedBy}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-[9px] font-bold ${
                      activity.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                      activity.status === 'In Progress' ? 'bg-amber-50 text-amber-700' :
                      activity.status === 'Pending' ? 'bg-rose-50 text-rose-700' :
                      'bg-sky-50 text-sky-700'
                    }`}>
                      {activity.status}
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

  return (
    <div className="fixed inset-0 bg-slate-50 flex flex-col z-50 overflow-hidden">
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-sm font-extrabold text-slate-800">Laboratory Safety Workspace</h1>
            <p className="text-[10px] text-slate-500 font-medium">Laboratory Safety Management System</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-3">
            <div className="space-y-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-bold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-sky-50 text-sky-700'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
                >
                  <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-sky-600' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' ? (
              renderDashboard()
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
                <p className="text-sm font-medium text-slate-500">Phase will be implemented in the next step.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaboratorySafetyWorkspace;

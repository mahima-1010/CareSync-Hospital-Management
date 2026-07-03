#!/usr/bin/env python3
import os

content = r'''import React, { useState, useEffect, useMemo } from 'react';
import { useHospital } from '../context/HospitalContext';
import { ChevronLeft, Plus, X, Edit3, Trash2, Eye, AlertTriangle, Activity, BarChart3, Search, Users, Shield, Clipboard, CheckCircle, TrendingUp, MessageSquare, Award, Gavel, Clock, Filter, Download, ChevronDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const FEEDBACK_TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3' },
  { id: 'complaints', label: 'Complaints', icon: 'Clipboard' },
  { id: 'rca', label: 'RCA', icon: 'Search' },
  { id: 'capa', label: 'CAPA', icon: 'CheckCircle' },
  { id: 'tat', label: 'TAT Tracking', icon: 'Clock' },
  { id: 'analysis', label: 'Monthly Analysis', icon: 'TrendingUp' },
  { id: 'training', label: 'Training', icon: 'Users' }
];

const ICON_MAP = {
  BarChart3, Clipboard, Search, CheckCircle, Clock, TrendingUp, Users, AlertTriangle, Activity, Shield, Award, Gavel, MessageSquare, Plus, X, Edit3, Trash2, Eye, Filter, Download, ChevronDown, ChevronLeft
};

const SAMPLE_COMPLAINTS = [
  { id: 'FB-C-001', date: '2025-05-01', patient: 'Mrs. Sharma', uhid: 'UHID-001', department: 'IPD', details: 'Nurse response was delayed during night shift', category: 'Delay', severity: 'Moderate', assignedTo: 'Ward Sister', status: 'Closed', acknowledgementDate: '2025-05-01', closureDate: '2025-05-03', tatCompliance: 'Yes' },
  { id: 'FB-C-002', date: '2025-05-03', patient: 'Mr. Verma', uhid: 'UHID-045', department: 'OPD', details: 'Billing staff behavior was rude', category: 'Behaviour', severity: 'High', assignedTo: 'Admin Manager', status: 'Under RCA', acknowledgementDate: '2025-05-03', closureDate: '', tatCompliance: 'No' },
  { id: 'FB-C-003', date: '2025-05-05', patient: 'Ms. Patel', uhid: 'UHID-078', department: 'Pharmacy', details: 'Medicine not available in stock', category: 'Service', severity: 'Low', assignedTo: 'Pharmacist', status: 'Open', acknowledgementDate: '2025-05-05', closureDate: '', tatCompliance: 'Pending' },
  { id: 'FB-C-004', date: '2025-05-08', patient: 'Mrs. Singh', uhid: 'UHID-102', department: 'IPD', details: 'Ward cleanliness concerns', category: 'Infrastructure', severity: 'Moderate', assignedTo: 'Housekeeping Supervisor', status: 'In Progress', acknowledgementDate: '2025-05-08', closureDate: '', tatCompliance: 'No' },
  { id: 'FB-C-005', date: '2025-05-10', patient: 'Mr. Kumar', uhid: 'UHID-156', department: 'Radiology', details: 'MRI report delayed by 2 days', category: 'Delay', severity: 'High', assignedTo: 'Radiology Incharge', status: 'Under CAPA', acknowledgementDate: '2025-05-10', closureDate: '', tatCompliance: 'No' }
];

const SAMPLE_RCA = [
  { id: 'RCA-001', complaintId: 'FB-C-001', method: '5 WHY', problemStatement: 'Nurse response delayed during night shift', rootCause: 'Insufficient night shift staffing', findings: 'Only 1 nurse for 20 patients', completedBy: 'Ward Sister', completionDate: '2025-05-03', status: 'Completed' },
  { id: 'RCA-002', complaintId: 'FB-C-002', method: 'Fishbone', problemStatement: 'Billing staff behavior rude', rootCause: 'Lack of soft skills training', findings: 'No recent customer service training', completedBy: 'Admin Manager', completionDate: '2025-05-05', status: 'Completed' },
  { id: 'RCA-003', complaintId: 'FB-C-004', method: '5 WHY', problemStatement: 'Ward cleanliness concerns', rootCause: 'Cleaning staff shortage', findings: '2 staff absent for 3 days', completedBy: 'Housekeeping Supervisor', completionDate: '', status: 'In Progress' }
];

const SAMPLE_CAPA = [
  { id: 'FB-CAPA-001', complaintId: 'FB-C-001', correctiveAction: 'Additional nurse allocated for night shift', preventiveAction: 'Monthly staffing review', owner: 'Ward Sister', targetDate: '2025-06-01', verificationStatus: 'Verified', closureStatus: 'Closed' },
  { id: 'FB-CAPA-002', complaintId: 'FB-C-002', correctiveAction: 'Counseling conducted for billing staff', preventiveAction: 'Quarterly soft skills training', owner: 'Admin Manager', targetDate: '2025-06-15', verificationStatus: 'Pending', closureStatus: 'Open' },
  { id: 'FB-CAPA-003', complaintId: 'FB-C-004', correctiveAction: 'Temporary cleaning staff hired', preventiveAction: 'Backup staff pool maintained', owner: 'Housekeeping Supervisor', targetDate: '2025-06-10', verificationStatus: 'Pending', closureStatus: 'Open' }
];

const SAMPLE_TRAINING = [
  { id: 'FT-001', topic: 'Patient Communication Skills', trainer: 'HR Manager', date: '2025-04-10', participants: 15, completionPct: 100, status: 'Completed' },
  { id: 'FT-002', topic: 'Complaint Handling & Escalation', trainer: 'Quality Manager', date: '2025-05-05', participants: 20, completionPct: 100, status: 'Completed' },
  { id: 'FT-003', topic: 'Soft Skills for Front Desk', trainer: 'External Consultant', date: '2025-06-15', participants: 12, completionPct: 0, status: 'Scheduled' }
];

const FeedbackWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [complaints, setComplaints] = useState(() => { const s = localStorage.getItem('feedback_complaints'); return s ? JSON.parse(s) : SAMPLE_COMPLAINTS; });
  const [rca, setRca] = useState(() => { const s = localStorage.getItem('feedback_rca'); return s ? JSON.parse(s) : SAMPLE_RCA; });
  const [capa, setCapa] = useState(() => { const s = localStorage.getItem('feedback_capa'); return s ? JSON.parse(s) : SAMPLE_CAPA; });
  const [training, setTraining] = useState(() => { const s = localStorage.getItem('feedback_training'); return s ? JSON.parse(s) : SAMPLE_TRAINING; });

  useEffect(() => { localStorage.setItem('feedback_complaints', JSON.stringify(complaints)); }, [complaints]);
  useEffect(() => { localStorage.setItem('feedback_rca', JSON.stringify(rca)); }, [rca]);
  useEffect(() => { localStorage.setItem('feedback_capa', JSON.stringify(capa)); }, [capa]);
  useEffect(() => { localStorage.setItem('feedback_training', JSON.stringify(training)); }, [training]);

  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [editingComplaintId, setEditingComplaintId] = useState(null);
  const [complaintForm, setComplaintForm] = useState({ id: '', date: '', patient: '', uhid: '', department: '', details: '', category: 'Delay', severity: 'Low', assignedTo: '', status: 'Open', acknowledgementDate: '', closureDate: '', tatCompliance: 'Pending' });

  const [isRcaModalOpen, setIsRcaModalOpen] = useState(false);
  const [editingRcaId, setEditingRcaId] = useState(null);
  const [rcaForm, setRcaForm] = useState({ id: '', complaintId: '', method: '5 WHY', problemStatement: '', rootCause: '', findings: '', completedBy: '', completionDate: '', status: 'In Progress' });

  const [isCapaModalOpen, setIsCapaModalOpen] = useState(false);
  const [editingCapaId, setEditingCapaId] = useState(null);
  const [capaForm, setCapaForm] = useState({ id: '', complaintId: '', correctiveAction: '', preventiveAction: '', owner: '', targetDate: '', verificationStatus: 'Pending', closureStatus: 'Open' });

  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);
  const [editingTrainingId, setEditingTrainingId] = useState(null);
  const [trainingForm, setTrainingForm] = useState({ id: '', topic: '', trainer: '', date: '', participants: 0, completionPct: 0, status: 'Scheduled' });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const nextComplaintId = () => {
    const maxNum = complaints.reduce((max, c) => { const num = parseInt(c.id.split('-').pop(), 10); return num > max ? num : max; }, 0);
    return `FB-C-${String(maxNum + 1).padStart(3, '0')}`;
  };
  const nextRcaId = () => {
    const maxNum = rca.reduce((max, r) => { const num = parseInt(r.id.split('-').pop(), 10); return num > max ? num : max; }, 0);
    return `RCA-${String(maxNum + 1).padStart(3, '0')}`;
  };
  const nextCapaId = () => {
    const maxNum = capa.reduce((max, c) => { const num = parseInt(c.id.split('-').pop(), 10); return num > max ? num : max; }, 0);
    return `FB-CAPA-${String(maxNum + 1).padStart(3, '0')}`;
  };
  const nextTrainingId = () => {
    const maxNum = training.reduce((max, t) => { const num = parseInt(t.id.split('-').pop(), 10); return num > max ? num : max; }, 0);
    return `FT-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const calculateTatCompliance = (complaint) => {
    if (complaint.status === 'Closed' && complaint.closureDate && complaint.date) {
      const target = new Date(complaint.date); target.setDate(target.getDate() + 7);
      return new Date(complaint.closureDate) <= target ? 'Yes' : 'No';
    }
    return complaint.tatCompliance || 'Pending';
  };

  const openComplaintModal = (record) => {
    if (record) { setComplaintForm({ ...record, tatCompliance: calculateTatCompliance(record) }); setEditingComplaintId(record.id); }
    else { setComplaintForm({ id: nextComplaintId(), date: new Date().toISOString().split('T')[0], patient: '', uhid: '', department: '', details: '', category: 'Delay', severity: 'Low', assignedTo: '', status: 'Open', acknowledgementDate: '', closureDate: '', tatCompliance: 'Pending' }); setEditingComplaintId(null); }
    setIsComplaintModalOpen(true);
  };
  const saveComplaint = (e) => {
    e.preventDefault();
    const tc = calculateTatCompliance(complaintForm);
    if (editingComplaintId) setComplaints(prev => prev.map(c => c.id === editingComplaintId ? { ...complaintForm, tatCompliance: tc } : c));
    else setComplaints(prev => [...prev, { ...complaintForm, tatCompliance: tc }]);
    setIsComplaintModalOpen(false); setEditingComplaintId(null);
  };
  const deleteComplaint = (id) => { if (confirm('Delete this complaint record?')) setComplaints(prev => prev.filter(c => c.id !== id)); };

  const openRcaModal = (record) => {
    if (record) { setRcaForm({ ...record }); setEditingRcaId(record.id); }
    else { setRcaForm({ id: nextRcaId(), complaintId: '', method: '5 WHY', problemStatement: '', rootCause: '', findings: '', completedBy: '', completionDate: '', status: 'In Progress' }); setEditingRcaId(null); }
    setIsRcaModalOpen(true);
  };
  const saveRca = (e) => {
    e.preventDefault();
    if (editingRcaId) setRca(prev => prev.map(r => r.id === editingRcaId ? { ...rcaForm, id: editingRcaId } : r));
    else setRca(prev => [...prev, rcaForm]);
    setIsRcaModalOpen(false); setEditingRcaId(null);
  };
  const deleteRca = (id) => { if (confirm('Delete this RCA record?')) setRca(prev => prev.filter(r => r.id !== id)); };

  const openCapaModal = (record) => {
    if (record) { setCapaForm({ ...record }); setEditingCapaId(record.id); }
    else { setCapaForm({ id: nextCapaId(), complaintId: '', correctiveAction: '', preventiveAction: '', owner: '', targetDate: '', verificationStatus: 'Pending', closureStatus: 'Open' }); setEditingCapaId(null); }
    setIsCapaModalOpen(true);
  };
  const saveCapa = (e) => {
    e.preventDefault();
    if (editingCapaId) setCapa(prev => prev.map(c => c.id === editingCapaId ? { ...capaForm, id: editingCapaId } : c));
    else setCapa(prev => [...prev, capaForm]);
    setIsCapaModalOpen(false); setEditingCapaId(null);
  };
  const deleteCapa = (id) => { if (confirm('Delete this CAPA record?')) setCapa(prev => prev.filter(c => c.id !== id)); };

  const openTrainingModal = (record) => {
    if (record) { setTrainingForm({ ...record }); setEditingTrainingId(record.id); }
    else { setTrainingForm({ id: nextTrainingId(), topic: '', trainer: '', date: '', participants: 0, completionPct: 0, status: 'Scheduled' }); setEditingTrainingId(null); }
    setIsTrainingModalOpen(true);
  };
  const saveTraining = (e) => {
    e.preventDefault();
    if (editingTrainingId) setTraining(prev => prev.map(t => t.id === editingTrainingId ? { ...trainingForm, id: editingTrainingId } : t));
    else setTraining(prev => [...prev, trainingForm]);
    setIsTrainingModalOpen(false); setEditingTrainingId(null);
  };
  const deleteTraining = (id) => { if (confirm('Delete this training record?')) setTraining(prev => prev.filter(t => t.id !== id)); };

  const dashboardKpi = useMemo(() => {
    const openComplaints = complaints.filter(c => ['Open','In Progress','Under RCA','Under CAPA'].includes(c.status)).length;
    const closedComplaints = complaints.filter(c => c.status === 'Closed').length;
    const seriousComplaints = complaints.filter(c => c.severity === 'High').length;
    const tatCompliant = complaints.filter(c => c.tatCompliance === 'Yes').length;
    const tatCompliancePct = complaints.length > 0 ? Math.round((tatCompliant / complaints.length) * 100) : 0;
    const rcaPending = rca.filter(r => r.status !== 'Completed').length;
    const capaPending = capa.filter(c => c.closureStatus === 'Open').length;
    return { totalComplaints: complaints.length, openComplaints, closedComplaints, seriousComplaints, tatCompliancePct, rcaPending, capaPending };
  }, [complaints, rca, capa]);

  const monthlyComplaintData = useMemo(() => {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return months.map(month => ({ month, Complaints: complaints.filter(c => new Date(c.date).toLocaleString('default',{month:'long'})===month).length, Feedback: 0 }));
  }, [complaints]);

  const categoryData = useMemo(() => {
    const cats = ['Delay','Behaviour','Billing','Clinical','Service','Infrastructure','Other'];
    return cats.map(cat => ({ name: cat, value: complaints.filter(c => c.category === cat).length })).filter(c => c.value > 0);
  }, [complaints]);

  const severityData = useMemo(() => {
    const sevs = ['Low','Moderate','High'];
    return sevs.map(sev => ({ name: sev, value: complaints.filter(c => c.severity === sev).length })).filter(s => s.value > 0);
  }, [complaints]);

  const COLORS = ['#3b82f6','#ef4444','#f59e0b','#10b981','#8b5cf6','#ec4899','#6b7280'];

  const filteredComplaints = useMemo(() => {
    return complaints.filter(c => {
      const ms = !searchTerm || c.patient.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toLowerCase().includes(searchTerm.toLowerCase()) || c.details.toLowerCase().includes(searchTerm.toLowerCase());
      const mc = filterCategory === 'All' || c.category === filterCategory;
      const mse = filterSeverity === 'All' || c.severity === filterSeverity;
      const mst = filterStatus === 'All' || c.status === filterStatus;
      return ms && mc && mse && mst;
    });
  }, [complaints, searchTerm, filterCategory, filterSeverity, filterStatus]);

  const monthlyAnalysisData = useMemo(() => {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return months.map(month => {
      const mc = complaints.filter(c => new Date(c.date).toLocaleString('default',{month:'long'})===month);
      const closed = mc.filter(c => c.status === 'Closed').length;
      const tc = mc.filter(c => c.tatCompliance === 'Yes').length;
      const top = mc.length > 0 ? mc.reduce((a,c)=>{a[c.category]=(a[c.category]||0)+1;return a;},{}) : {};
      const top3 = Object.entries(top).sort((a,b)=>b[1]-a[1]).slice(0,3).map(e=>e[0]).join(',');
      return { month, total: mc.length, closed, tatCompliance: mc.length>0?Math.round(tc/mc.length*100):0, topCategories: top3||'N/A' };
    });
  }, [complaints]);

  const kpisForAnalysis = useMemo(() => {
    const tc = complaints.length;
    const closed = complaints.filter(c => c.status === 'Closed').length;
    const tatComp = complaints.filter(c => c.tatCompliance === 'Yes').length;
    const tatPct = tc > 0 ? Math.round(tatComp/tc*100) : 0;
    const rcaComp = rca.filter(r => r.status === 'Completed').length;
    const rcaPend = rca.filter(r => r.status !== 'Completed').length;
    const capaOpen = capa.filter(c => c.closureStatus === 'Open').length;
    return { totalComplaints: tc, closed, tatPct, rcaCompleted: rcaComp, rcaPending: rcaPend, capaOpen };
  }, [complaints, rca, capa]);

  const KpiCard = ({ title, value, icon: Icon }) => (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{title}</p>
          <p className="text-lg font-extrabold text-slate-900 mt-0.5">{value}</p>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 text-slate-600">
          <Icon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex gap-0 -m-6 min-h-[calc(100vh-4rem)]">
      <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider cursor-pointer transition-colors group"
          >
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">Feedback & Complaints</h2>
          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">Quality Management Module</p>
        </div>
        <nav className="flex-1 overflow-y-auto custom-scroll py-3 px-2 space-y-0.5">
          {FEEDBACK_TABS.map((tab) => {
            const Icon = ICON_MAP[tab.icon];
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={isActive ? { backgroundColor: `${hospital.themeColor}0d`, color: hospital.themeColor } : {}}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                  isActive ? 'border-sky-500/20 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[10px] font-semibold truncate">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <KpiCard title="Total Complaints" value={dashboardKpi.totalComplaints} icon={Clipboard} />
              <KpiCard title="Open Complaints" value={dashboardKpi.openComplaints} icon={AlertTriangle} />
              <KpiCard title="Closed" value={dashboardKpi.closedComplaints} icon={CheckCircle} />
              <KpiCard title="TAT Compliance" value={`${dashboardKpi.tatCompliancePct}%`} icon={Activity} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
                <h3 className="text-xs font-bold text-slate-700 mb-3">Monthly Complaints</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={monthlyComplaintData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="Complaints" fill={hospital.themeColor} radius={[2,2,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
                <h3 className="text-xs font-bold text-slate-700 mb-3">Category Distribution</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={{ fontSize: 9 }}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
                <h3 className="text-xs font-bold text-slate-700 mb-3">Severity Breakdown</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={severityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={{ fontSize: 9 }}>
                      {severityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'complaints' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search complaints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs w-64"
                  />
                </div>
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 text-xs">
                  <option value="All">All Categories</option>
                  {['Delay','Behaviour','Billing','Clinical','Service','Infrastructure','Other'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 text-xs">
                  <option value="All">All Severity</option>
                  {['Low','Moderate','High'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 text-xs">
                  <option value="All">All Status</option>
                  {['Open','In Progress','Under RCA','Under CAPA','Closed'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <button
                onClick={() => openComplaintModal(null)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: hospital.themeColor }}
              >
                <Plus className="w-3.5 h-3.5" /> Add Complaint
              </button>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[10xs]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">ID</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Department</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Category</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Severity</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">TAT</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredComplaints.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/50">
                        <td className="px-3 py-3 font-medium text-slate-700">{c.id}</td>
                        <td className="px-3 py-3 text-slate-700">{c.date}</td>
                        <td className="px-3 py-3 text-slate-700">{c.patient}</td>
                        <td className="px-3 py-3 text-slate-700">{c.department}</td>
                        <td className="px-3 py-3 text-slate-700">{c.category}</td>
                        <td className="px-3 py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[9xs] font-bold ${
                            c.severity === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' : c.severity === 'Moderate' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}>{c.severity}</span>
                        </td>
                        <td className="px-3 py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[9xs] font-bold ${
                            c.status === 'Closed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : c.status === 'Open' ? 'bg-sky-50 text-sky-700 border border-sky-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>{c.status}</span>
                        </td>
                        <td className="px-3 py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[9xs] font-bold ${
                            c.tatCompliance === 'Yes' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : c.tatCompliance === 'No' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}>{c.tatCompliance}</span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => openComplaintModal(c)} className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-sky-700 hover:border-sky-200 hover:bg-sky-50 transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
                            <button onClick={() => deleteComplaint(c.id)} className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-rose-700 hover:border-rose-200 hover:bg-rose-50 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredComplaints.length === 0 && (
                      <tr><td colSpan="9" className="px-3 py-8 text-center text-slate-400 text-xs">No complaints found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rca' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-700">Root Cause Analysis</h3>
              <button
                onClick={() => openRcaModal(null)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10xs] font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: hospital.themeColor }}
              >
                <Plus className="w-3.5 h-3.5" /> Add RCA
              </button>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[10xs]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">ID</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Complaint</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Method</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Root Cause</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Findings</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Completed By</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rca.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50/50">
                        <td className="px-3 py-3 font-medium text-slate-700">{r.id}</td>
                        <td className="px-3 py-3 text-slate-700">{r.complaintId}</td>
                        <td className="px-3 py-3 text-slate-700">{r.method}</td>
                        <td className="px-3 py-3 text-slate-700">{r.rootCause}</td>
                        <td className="px-3 py-3 text-slate-700">{r.findings}</td>
                        <td className="px-3 py-3 text-slate-700">{r.completedBy}</td>
                        <td className="px-3 py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[9xs] font-bold ${
                            r.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>{r.status}</span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => openRcaModal(r)} className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-sky-700 hover:border-sky-200 hover:bg-sky-50 transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
                            <button onClick={() => deleteRca(r.id)} className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-rose-700 hover:border-rose-200 hover:bg-rose-50 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {rca.length === 0 && (
                      <tr><td colSpan="8" className="px-3 py-8 text-center text-slate-400 text-xs">No RCA records found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'capa' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <KpiCard title="Total CAPA" value={capa.length} icon={CheckCircle} />
              <KpiCard title="Open Actions" value={capa.filter(c => c.closureStatus === 'Open').length} icon={AlertTriangle} />
              <KpiCard title="Pending Verification" value={capa.filter(c => c.verificationStatus === 'Pending').length} icon={Clock} />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-700">Corrective & Preventive Actions</h3>
              <button
                onClick={() => openCapaModal(null)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10xs] font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: hospital.themeColor }}
              >
                <Plus className="w-3.5 h-3.5" /> Add CAPA
              </button>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[10xs]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">ID</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Complaint</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Corrective Action</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Preventive Action</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Owner</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Target Date</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Verification</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Closure</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {capa.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/50">
                        <td className="px-3 py-3 font-medium text-slate-700">{c.id}</td>
                        <td className="px-3 py-3 text-slate-700">{c.complaintId}</td>
                        <td className="px-3 py-3 text-slate-700">{c.correctiveAction}</td>
                        <td className="px-3 py-3 text-slate-700">{c.preventiveAction}</td>
                        <td className="px-3 py-3 text-slate-700">{c.owner}</td>
                        <td className="px-3 py-3 text-slate-700">{c.targetDate}</td>
                        <td className="px-3 py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[9xs] font-bold ${
                            c.verificationStatus === 'Verified' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-20...
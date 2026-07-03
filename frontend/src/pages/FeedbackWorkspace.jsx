import React, { useState, useEffect } from 'react';
import { useHospital } from '../context/HospitalContext';
import { ChevronLeft, BarChart3, MessageSquare, Search, CheckCircle, Activity, TrendingUp, Users, Plus, X, Edit3, Trash2, Eye, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const FEEDBACK_TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3' },
  { id: 'complaints', label: 'Complaints', icon: 'MessageSquare' },
  { id: 'rca', label: 'RCA', icon: 'Search' },
  { id: 'capa', label: 'CAPA', icon: 'CheckCircle' },
  { id: 'tat', label: 'TAT', icon: 'Activity' },
  { id: 'analysis', label: 'Analysis', icon: 'TrendingUp' },
  { id: 'training', label: 'Training', icon: 'Users' }
];

const ICON_MAP = {
  BarChart3,
  MessageSquare,
  Search,
  CheckCircle,
  Activity,
  TrendingUp,
  Users,
  Plus,
  X,
  Edit3,
  Trash2,
  Eye,
  AlertTriangle
};

const SAMPLE_COMPLAINTS = [
  { id: 'c1', complaintNo: 'CMP-2025-001', dateReceived: '2025-05-12', patientName: 'Mrs. Sharma', uhid: 'UHID-001', department: 'OPD', category: 'Service Delay', severity: 'Medium', description: 'Patient waited 2 hours for consultant appointment despite scheduled time.', assignedTo: 'Dr. Verma', status: 'Closed', acknowledgementDate: '2025-05-12', closureDate: '2025-05-14', escalationLevel: 'Level 1' },
  { id: 'c2', complaintNo: 'CMP-2025-002', dateReceived: '2025-05-18', patientName: 'Mr. Kumar', uhid: 'UHID-045', department: 'IPD', category: 'Staff Behaviour', severity: 'High', description: 'Nurse was rude and dismissive when patient asked for pain medication.', assignedTo: 'Ward Sister', status: 'Under Investigation', acknowledgementDate: '2025-05-18', closureDate: '', escalationLevel: 'Level 2' },
  { id: 'c3', complaintNo: 'CMP-2025-003', dateReceived: '2025-05-20', patientName: 'Ms. Patel', uhid: 'UHID-089', department: 'Billing', category: 'Billing', severity: 'Low', description: 'Discharge summary contained incorrect charges for pharmacy items.', assignedTo: 'Billing Manager', status: 'Acknowledged', acknowledgementDate: '2025-05-20', closureDate: '', escalationLevel: 'Level 1' },
  { id: 'c4', complaintNo: 'CMP-2025-004', dateReceived: '2025-05-22', patientName: 'Mrs. Iyer', uhid: 'UHID-112', department: 'Emergency', category: 'Clinical Care', severity: 'High', description: 'CT scan report was delayed by 8 hours, affecting treatment decision.', assignedTo: 'Radiology Incharge', status: 'Open', acknowledgementDate: '', closureDate: '', escalationLevel: 'Level 2' },
  { id: 'c5', complaintNo: 'CMP-2025-005', dateReceived: '2025-05-25', patientName: 'Mr. Singh', uhid: 'UHID-156', department: 'Ward', category: 'Patient Safety', severity: 'Critical', description: 'Wet floor in corridor caused patient slip and fall. No signage present.', assignedTo: 'Hospital Administrator', status: 'Escalated', acknowledgementDate: '2025-05-25', closureDate: '', escalationLevel: 'Level 3' }
];

const CATEGORIES = ['Service Delay', 'Staff Behaviour', 'Billing', 'Clinical Care', 'Patient Safety', 'Communication', 'Infrastructure', 'Other'];
const SEVERITIES = ['Low', 'Medium', 'High', 'Critical'];
const STATUSES = ['Open', 'Acknowledged', 'Under Investigation', 'Escalated', 'Closed'];
const ESCALATION_LEVELS = ['Level 1', 'Level 2', 'Level 3'];
const DEPARTMENTS = ['OPD', 'IPD', 'Emergency', 'Ward', 'Billing', 'Radiology', 'Pharmacy', 'Laboratory'];

const RCA_METHODS = ['5 Why', 'Fishbone', 'Incident Analysis'];
const RCA_STATUSES = ['Open', 'In Progress', 'Completed', 'Verified'];

const SAMPLE_RCA = [
  { id: 'r1', rcaId: 'RCA-FB-001', complaintNo: 'CMP-2025-002', method: '5 Why', rootCause: 'Understaffed shift led to high workload and stress among nursing staff.', findings: 'Patient Escalation Level 2. Complaint registered. Root cause identified as systemic understaffing and lack of soft-skills training.', correctiveAction: 'Initiate staff augmentation for night shift. Conduct communication skills workshop for all nursing staff.', owner: 'Dr. Verma', targetDate: '2025-06-10', status: 'Completed' },
  { id: 'r2', rcaId: 'RCA-FB-002', complaintNo: 'CMP-2025-004', method: 'Fishbone', rootCause: 'Radiology reporting backlog due to single radiologist on duty during peak hours.', findings: 'CT scan delayed 8 hours. Treatment decision delayed. Root cause confirmed as staffing gap and PACS load balancing issue.', correctiveAction: 'Approve backup radiologist roster. Schedule PACS performance review with IT.', owner: 'Radiology Incharge', targetDate: '2025-06-15', status: 'In Progress' },
  { id: 'r3', rcaId: 'RCA-FB-003', complaintNo: 'CMP-2025-005', method: 'Incident Analysis', rootCause: 'Housekeeping did not place wet floor signage after cleaning. No supervisory check mechanism exists.', findings: 'Patient fall incident. Wet floor confirmed. Root cause identified as process gap and lack of supervisory verification.', correctiveAction: 'Install wet floor signage racks at all cleaning carts. Introduce supervisor sign-off checklist.', owner: 'Hospital Administrator', targetDate: '2025-05-30', status: 'Open' }
];

const CAPA_STATUSES = ['Open', 'In Progress', 'Completed', 'Verified'];

const SAMPLE_CAPA = [
  { id: 'cap1', capaId: 'CAPA-FB-001', complaintNo: 'CMP-2025-002', correctiveAction: 'Initiate staff augmentation for night shift. Conduct communication skills workshop for all nursing staff.', preventiveAction: 'Introduce monthly soft-skills training. Implement staffing ratio review.', owner: 'Dr. Verma', targetDate: '2025-06-10', status: 'Completed' },
  { id: 'cap2', capaId: 'CAPA-FB-002', complaintNo: 'CMP-2025-004', correctiveAction: 'Approve backup radiologist roster. Schedule PACS performance review with IT.', preventiveAction: 'Establish on-call radiologist pool. Add PACS auto-scaling.', owner: 'Radiology Incharge', targetDate: '2025-06-15', status: 'In Progress' }
];

const TRAINING_STATUSES = ['Scheduled', 'In Progress', 'Completed', 'Overdue'];

const SAMPLE_TRAINING = [
  { id: 'tr1', trainingId: 'TRN-FB-001', topic: 'Communication Skills for Nursing Staff', trainer: 'HR Department', date: '2025-06-15', participants: 20, completionPercentage: 100, status: 'Completed' },
  { id: 'tr2', trainingId: 'TRN-FB-002', topic: 'Radiology Safety & ALARA Principles', trainer: 'RSO / Dr. Mehta', date: '2025-06-20', participants: 12, completionPercentage: 0, status: 'Scheduled' },
  { id: 'tr3', trainingId: 'TRN-FB-003', topic: 'Housekeeping Supervision & Wet Floor Protocols', trainer: 'Facility Manager', date: '2025-05-30', participants: 15, completionPercentage: 85, status: 'In Progress' }
];

const TAT_STATUSES = ['Within TAT', 'Breach'];

const SAMPLE_TAT = [
  { id: 't1', complaintNo: 'CMP-2025-001', targetDays: 7, actualDays: 2, department: 'OPD', owner: 'Dr. Verma', status: 'Within TAT' },
  { id: 't2', complaintNo: 'CMP-2025-002', targetDays: 7, actualDays: 8, department: 'IPD', owner: 'Ward Sister', status: 'Breach' },
  { id: 't3', complaintNo: 'CMP-2025-004', targetDays: 3, actualDays: 1, department: 'Emergency', owner: 'Radiology Incharge', status: 'Within TAT' }
];

const FeedbackWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();
  const [activeTab, setActiveTab] = useState('dashboard');

  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('feedback_complaints');
    return saved ? JSON.parse(saved) : SAMPLE_COMPLAINTS;
  });

  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [editingComplaintId, setEditingComplaintId] = useState(null);
  const [complaintForm, setComplaintForm] = useState({ complaintNo: '', dateReceived: '', patientName: '', uhid: '', department: '', category: '', severity: '', description: '', assignedTo: '', status: 'Open', acknowledgementDate: '', closureDate: '', escalationLevel: 'Level 1' });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [rcaSearchTerm, setRcaSearchTerm] = useState('');
  const [capaSearchTerm, setCapaSearchTerm] = useState('');
  const [trainingSearchTerm, setTrainingSearchTerm] = useState('');
  const [tatSearchTerm, setTatSearchTerm] = useState('');

  useEffect(() => { localStorage.setItem('feedback_complaints', JSON.stringify(complaints)); }, [complaints]);

  const getNextComplaintNo = () => {
    const maxNum = complaints.reduce((max, c) => {
      const match = c.complaintNo?.match(/CMP-2025-(\d+)/);
      return match ? Math.max(max, parseInt(match[1], 10)) : max;
    }, 0);
    return `CMP-2025-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenComplaintModal = (record = null) => {
    if (record) {
      setComplaintForm({ ...record });
      setEditingComplaintId(record.id);
    } else {
      setComplaintForm({ complaintNo: getNextComplaintNo(), dateReceived: new Date().toISOString().split('T')[0], patientName: '', uhid: '', department: '', category: '', severity: '', description: '', assignedTo: '', status: 'Open', acknowledgementDate: '', closureDate: '', escalationLevel: 'Level 1' });
      setEditingComplaintId(null);
    }
    setIsComplaintModalOpen(true);
  };

  const handleSaveComplaint = (e) => {
    e.preventDefault();
    if (editingComplaintId) {
      setComplaints(prev => prev.map(c => c.id === editingComplaintId ? { ...complaintForm, id: editingComplaintId } : c));
    } else {
      setComplaints(prev => [...prev, { ...complaintForm, id: `c${Date.now()}` }]);
    }
    setIsComplaintModalOpen(false);
    setEditingComplaintId(null);
  };

  const handleDeleteComplaint = (id) => {
    if (confirm('Are you sure you want to delete this complaint record?')) {
      setComplaints(prev => prev.filter(c => c.id !== id));
    }
  };

  const [rcaRecords, setRcaRecords] = useState(() => {
    const saved = localStorage.getItem('feedback_rca');
    return saved ? JSON.parse(saved) : SAMPLE_RCA;
  });

  const [isRcaModalOpen, setIsRcaModalOpen] = useState(false);
  const [editingRcaId, setEditingRcaId] = useState(null);
  const [rcaForm, setRcaForm] = useState({ id: '', rcaId: '', complaintNo: '', method: '', rootCause: '', findings: '', correctiveAction: '', owner: '', targetDate: '', status: 'Open' });

  useEffect(() => { localStorage.setItem('feedback_rca', JSON.stringify(rcaRecords)); }, [rcaRecords]);

  const getNextRcaId = () => {
    const maxNum = rcaRecords.reduce((max, r) => {
      const match = r.rcaId?.match(/RCA-FB-(\d+)/);
      return match ? Math.max(max, parseInt(match[1], 10)) : max;
    }, 0);
    return `RCA-FB-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenRcaModal = (record = null) => {
    if (record) {
      setRcaForm({ ...record });
      setEditingRcaId(record.id);
    } else {
      setRcaForm({ id: '', rcaId: getNextRcaId(), complaintNo: '', method: '', rootCause: '', findings: '', correctiveAction: '', owner: '', targetDate: '', status: 'Open' });
      setEditingRcaId(null);
    }
    setIsRcaModalOpen(true);
  };

  const handleSaveRca = (e) => {
    e.preventDefault();
    if (editingRcaId) {
      setRcaRecords(prev => prev.map(r => r.id === editingRcaId ? { ...rcaForm, id: editingRcaId } : r));
    } else {
      setRcaRecords(prev => [...prev, { ...rcaForm, id: `r${Date.now()}` }]);
    }
    setIsRcaModalOpen(false);
    setEditingRcaId(null);
  };

  const handleDeleteRca = (id) => {
    if (confirm('Are you sure you want to delete this RCA record?')) {
      setRcaRecords(prev => prev.filter(r => r.id !== id));
    }
  };

  const [capaRecords, setCapaRecords] = useState(() => {
    const saved = localStorage.getItem('feedback_capa');
    return saved ? JSON.parse(saved) : SAMPLE_CAPA;
  });

  const [isCapaModalOpen, setIsCapaModalOpen] = useState(false);
  const [editingCapaId, setEditingCapaId] = useState(null);
  const [capaForm, setCapaForm] = useState({ id: '', capaId: '', complaintNo: '', correctiveAction: '', preventiveAction: '', owner: '', targetDate: '', status: 'Open' });

  useEffect(() => { localStorage.setItem('feedback_capa', JSON.stringify(capaRecords)); }, [capaRecords]);

  const [trainingRecords, setTrainingRecords] = useState(() => {
    const saved = localStorage.getItem('feedback_training');
    return saved ? JSON.parse(saved) : SAMPLE_TRAINING;
  });

  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);
  const [editingTrainingId, setEditingTrainingId] = useState(null);
  const [trainingForm, setTrainingForm] = useState({ id: '', trainingId: '', topic: '', trainer: '', date: '', participants: 0, completionPercentage: 0, status: 'Scheduled' });

  useEffect(() => { localStorage.setItem('feedback_training', JSON.stringify(trainingRecords)); }, [trainingRecords]);

  const [tatRecords, setTatRecords] = useState(() => {
    const saved = localStorage.getItem('feedback_tat');
    return saved ? JSON.parse(saved) : SAMPLE_TAT;
  });

  const [isTatModalOpen, setIsTatModalOpen] = useState(false);
  const [editingTatId, setEditingTatId] = useState(null);
  const [tatForm, setTatForm] = useState({ id: '', complaintNo: '', targetDays: 7, actualDays: '', department: '', owner: '', status: 'Within TAT' });

  useEffect(() => { localStorage.setItem('feedback_tat', JSON.stringify(tatRecords)); }, [tatRecords]);

  const getNextTatId = () => {
    const maxNum = tatRecords.reduce((max, t) => {
      const match = t.id?.match(/^t(\d+)$/);
      return match ? Math.max(max, parseInt(match[1], 10)) : max;
    }, 0);
    return `t${maxNum + 1}`;
  };

  const handleOpenTatModal = (record = null) => {
    if (record) {
      setTatForm({ ...record });
      setEditingTatId(record.id);
    } else {
      setTatForm({ id: '', complaintNo: '', targetDays: 7, actualDays: '', department: '', owner: '', status: 'Within TAT' });
      setEditingTatId(null);
    }
    setIsTatModalOpen(true);
  };

  const handleSaveTat = (e) => {
    e.preventDefault();
    if (editingTatId) {
      setTatRecords(prev => prev.map(t => t.id === editingTatId ? { ...tatForm, id: editingTatId } : t));
    } else {
      setTatRecords(prev => [...prev, { ...tatForm, id: `t${Date.now()}` }]);
    }
    setIsTatModalOpen(false);
    setEditingTatId(null);
  };

  const handleDeleteTat = (id) => {
    if (confirm('Are you sure you want to delete this TAT record?')) {
      setTatRecords(prev => prev.filter(t => t.id !== id));
    }
  };

  const filteredTatRecords = tatRecords
    .filter(t => tatSearchTerm === '' || t.complaintNo.toLowerCase().includes(tatSearchTerm.toLowerCase()) || t.department.toLowerCase().includes(tatSearchTerm.toLowerCase()) || (t.owner && t.owner.toLowerCase().includes(tatSearchTerm.toLowerCase())));

  const tatKpiData = {
    total: tatRecords.length,
    withinTat: tatRecords.filter(t => t.status === 'Within TAT').length,
    breachedTat: tatRecords.filter(t => t.status === 'Breach').length,
    compliancePct: tatRecords.length > 0 ? Math.round((tatRecords.filter(t => t.status === 'Within TAT').length / tatRecords.length) * 100) : 0
  };

  const tatStatusClass = (status) => {
    if (status === 'Within TAT') return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    if (status === 'Breach') return 'bg-rose-50 text-rose-700 border border-rose-200';
    return 'bg-slate-50 text-slate-700 border border-slate-200';
  };

  const getNextTrainingId = () => {
    const maxNum = trainingRecords.reduce((max, t) => {
      const match = t.trainingId?.match(/TRN-FB-(\d+)/);
      return match ? Math.max(max, parseInt(match[1], 10)) : max;
    }, 0);
    return `TRN-FB-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenTrainingModal = (record = null) => {
    if (record) {
      setTrainingForm({ ...record });
      setEditingTrainingId(record.id);
    } else {
      setTrainingForm({ id: '', trainingId: getNextTrainingId(), topic: '', trainer: '', date: '', participants: 0, completionPercentage: 0, status: 'Scheduled' });
      setEditingTrainingId(null);
    }
    setIsTrainingModalOpen(true);
  };

  const handleSaveTraining = (e) => {
    e.preventDefault();
    if (editingTrainingId) {
      setTrainingRecords(prev => prev.map(t => t.id === editingTrainingId ? { ...trainingForm, id: editingTrainingId } : t));
    } else {
      setTrainingRecords(prev => [...prev, { ...trainingForm, id: `tr${Date.now()}` }]);
    }
    setIsTrainingModalOpen(false);
    setEditingTrainingId(null);
  };

  const handleDeleteTraining = (id) => {
    if (confirm('Are you sure you want to delete this training record?')) {
      setTrainingRecords(prev => prev.filter(t => t.id !== id));
    }
  };

  const filteredTrainingRecords = trainingRecords
    .filter(t => trainingSearchTerm === '' || t.trainingId.toLowerCase().includes(trainingSearchTerm.toLowerCase()) || t.topic.toLowerCase().includes(trainingSearchTerm.toLowerCase()) || t.trainer.toLowerCase().includes(trainingSearchTerm.toLowerCase()));

  const trainingKpiData = {
    total: trainingRecords.length,
    completed: trainingRecords.filter(t => t.status === 'Completed').length,
    scheduled: trainingRecords.filter(t => t.status === 'Scheduled').length,
    avgCompletion: trainingRecords.length > 0 ? Math.round(trainingRecords.reduce((sum, t) => sum + (t.completionPercentage || 0), 0) / trainingRecords.length) : 0
  };

  const getNextCapaId = () => {
    const maxNum = capaRecords.reduce((max, c) => {
      const match = c.capaId?.match(/CAPA-FB-(\d+)/);
      return match ? Math.max(max, parseInt(match[1], 10)) : max;
    }, 0);
    return `CAPA-FB-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenCapaModal = (record = null) => {
    if (record) {
      setCapaForm({ ...record });
      setEditingCapaId(record.id);
    } else {
      setCapaForm({ id: '', capaId: getNextCapaId(), complaintNo: '', correctiveAction: '', preventiveAction: '', owner: '', targetDate: '', status: 'Open' });
      setEditingCapaId(null);
    }
    setIsCapaModalOpen(true);
  };

  const handleSaveCapa = (e) => {
    e.preventDefault();
    if (editingCapaId) {
      setCapaRecords(prev => prev.map(c => c.id === editingCapaId ? { ...capaForm, id: editingCapaId } : c));
    } else {
      setCapaRecords(prev => [...prev, { ...capaForm, id: `cap${Date.now()}` }]);
    }
    setIsCapaModalOpen(false);
    setEditingCapaId(null);
  };

  const handleDeleteCapa = (id) => {
    if (confirm('Are you sure you want to delete this CAPA record?')) {
      setCapaRecords(prev => prev.filter(c => c.id !== id));
    }
  };

  const filteredRcaRecords = rcaRecords
    .filter(r => rcaSearchTerm === '' || r.rcaId.toLowerCase().includes(rcaSearchTerm.toLowerCase()) || r.complaintNo.toLowerCase().includes(rcaSearchTerm.toLowerCase()) || r.owner.toLowerCase().includes(rcaSearchTerm.toLowerCase()));

  const rcaKpiData = {
    total: rcaRecords.length,
    open: rcaRecords.filter(r => r.status === 'Open' || r.status === 'In Progress').length,
    closed: rcaRecords.filter(r => r.status === 'Completed' || r.status === 'Verified').length,
    overdue: rcaRecords.filter(r => {
      if (!r.targetDate || r.status === 'Completed' || r.status === 'Verified') return false;
      return new Date(r.targetDate) < new Date();
    }).length
  };

  const rcaStatusClass = (status) => {
    if (status === 'Completed' || status === 'Verified') return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    if (status === 'Open') return 'bg-rose-50 text-rose-700 border border-rose-200';
    if (status === 'In Progress') return 'bg-amber-50 text-amber-700 border border-amber-200';
    return 'bg-slate-50 text-slate-700 border border-slate-200';
  };

  const filteredCapaRecords = capaRecords
    .filter(c => capaSearchTerm === '' || c.capaId.toLowerCase().includes(capaSearchTerm.toLowerCase()) || c.complaintNo.toLowerCase().includes(capaSearchTerm.toLowerCase()) || c.owner.toLowerCase().includes(capaSearchTerm.toLowerCase()));

  const capaKpiData = {
    total: capaRecords.length,
    open: capaRecords.filter(c => c.status === 'Open').length,
    inProgress: capaRecords.filter(c => c.status === 'In Progress').length,
    closed: capaRecords.filter(c => c.status === 'Completed' || c.status === 'Verified').length
  };

  const capaStatusClass = (status) => {
    if (status === 'Completed' || status === 'Verified') return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    if (status === 'In Progress') return 'bg-amber-50 text-amber-700 border border-amber-200';
    if (status === 'Open') return 'bg-rose-50 text-rose-700 border border-rose-200';
    return 'bg-slate-50 text-slate-700 border border-slate-200';
  };

  const filteredComplaints = complaints
    .filter(c => searchTerm === '' || c.complaintNo.toLowerCase().includes(searchTerm.toLowerCase()) || c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || c.uhid.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(c => filterCategory === 'all' || c.category === filterCategory)
    .filter(c => filterSeverity === 'all' || c.severity === filterSeverity)
    .filter(c => filterStatus === 'all' || c.status === filterStatus);

  const kpiData = {
    total: complaints.length,
    open: complaints.filter(c => c.status === 'Open' || c.status === 'Acknowledged' || c.status === 'Under Investigation').length,
    closed: complaints.filter(c => c.status === 'Closed').length,
    highSeverity: complaints.filter(c => c.severity === 'High' || c.severity === 'Critical').length
  };

  const statusClass = (status) => {
    if (status === 'Closed') return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    if (status === 'Open') return 'bg-rose-50 text-rose-700 border border-rose-200';
    if (status === 'Acknowledged') return 'bg-sky-50 text-sky-700 border border-sky-200';
    if (status === 'Under Investigation') return 'bg-amber-50 text-amber-700 border border-amber-200';
    if (status === 'Escalated') return 'bg-purple-50 text-purple-700 border border-purple-200';
    return 'bg-slate-50 text-slate-700 border border-slate-200';
  };

  const severityClass = (severity) => {
    if (severity === 'Critical') return 'bg-rose-50 text-rose-700 border border-rose-200';
    if (severity === 'High') return 'bg-amber-50 text-amber-700 border border-amber-200';
    if (severity === 'Medium') return 'bg-sky-50 text-sky-700 border border-sky-200';
    return 'bg-slate-50 text-slate-600 border border-slate-200';
  };

  const TabIcon = ({ icon }) => {
    const LucideIcon = ICON_MAP[icon] || BarChart3;
    return <LucideIcon className="w-3.5 h-3.5 shrink-0" />;
  };

  const monthlyComplaintData = complaints.reduce((acc, c) => {
    const month = c.dateReceived ? c.dateReceived.substring(0, 7) : 'Unknown';
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const complaintCategoryData = CATEGORIES.map(cat => ({
    category: cat,
    count: complaints.filter(c => c.category === cat).length
  })).filter(d => d.count > 0);

  const complaintSeverityData = SEVERITIES.map(sev => ({
    severity: sev,
    count: complaints.filter(c => c.severity === sev).length
  })).filter(d => d.count > 0);

  const complaintStatusData = STATUSES.map(st => ({
    status: st,
    count: complaints.filter(c => c.status === st).length
  })).filter(d => d.count > 0);

  const trainingCompletionData = TRAINING_STATUSES.map(st => ({
    status: st,
    count: trainingRecords.filter(t => t.status === st).length
  })).filter(d => d.count > 0);

  const tatComplianceData = TAT_STATUSES.map(st => ({
    status: st,
    count: tatRecords.filter(t => t.status === st).length
  })).filter(d => d.count > 0);

  const totalComplaints = complaints.length;
  const closedComplaints = complaints.filter(c => c.status === 'Closed').length;
  const openComplaints = complaints.filter(c => ['Open', 'Acknowledged', 'Under Investigation', 'Escalated'].includes(c.status)).length;
  const totalRca = rcaRecords.length;
  const openCapa = capaRecords.filter(c => c.status === 'Open').length;
  const totalTraining = trainingRecords.length;
  const tatCompliancePct = tatRecords.length > 0 ? Math.round((tatRecords.filter(t => t.status === 'Within TAT').length / tatRecords.length) * 100) : 0;

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
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">Feedback & Complaints</h2>
          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">Patient Experience Module</p>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scroll py-3 px-2 space-y-0.5">
          {FEEDBACK_TABS.map((tab) => {
            const Icon = ICON_MAP[tab.icon] || BarChart3;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={isActive ? {
                  backgroundColor: `${hospital.themeColor}0d`,
                  borderColor: `${hospital.themeColor}22`,
                  color: hospital.themeColor
                } : {}}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'border-sky-500/20 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[10px] font-semibold truncate">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-100 space-y-1.5">
          <div className="flex items-center gap-2 text-[8px] text-slate-400 font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 inline-block" />
            NABH Standard
          </div>
          <div className="flex items-center gap-2 text-[8px] text-slate-400 font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Hospital Customized
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto custom-scroll bg-slate-50/40 p-6 space-y-5">
        {activeTab === 'dashboard' && (
          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h1 className="text-base font-extrabold text-slate-900">Dashboard</h1>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-1 max-w-2xl">Overview of feedback and complaints metrics for the hospital.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Complaints', value: complaints.length, icon: 'MessageSquare', color: 'text-slate-700' },
                { label: 'Open Complaints', value: complaints.filter(c => ['Open', 'Acknowledged', 'Under Investigation', 'Escalated'].includes(c.status)).length, icon: 'AlertTriangle', color: 'text-amber-600' },
                { label: 'Closed Complaints', value: complaints.filter(c => c.status === 'Closed').length, icon: 'CheckCircle', color: 'text-emerald-600' },
                { label: 'Total RCA', value: rcaRecords.length, icon: 'Search', color: 'text-slate-700' },
                { label: 'Open CAPA', value: capaRecords.filter(c => c.status === 'Open').length, icon: 'AlertTriangle', color: 'text-rose-600' },
                { label: 'Total Training Sessions', value: trainingRecords.length, icon: 'Users', color: 'text-slate-700' },
                { label: 'Total TAT Records', value: tatRecords.length, icon: 'Activity', color: 'text-slate-700' },
                { label: 'TAT Compliance %', value: `${tatRecords.length > 0 ? Math.round((tatRecords.filter(t => t.status === 'Within TAT').length / tatRecords.length) * 100) : 0}%`, icon: 'TrendingUp', color: 'text-amber-600' }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                      <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <TabIcon icon={kpi.icon} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-bold text-slate-800 mb-4">Monthly Complaint Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={Object.entries(monthlyComplaintData).sort((a, b) => a[0].localeCompare(b[0])).map(([month, count]) => ({ month, count }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke={hospital.themeColor || '#0ea5e9'} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-bold text-slate-800 mb-4">Complaint Category Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={complaintCategoryData} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={80} label>
                      {complaintCategoryData.map((entry, index) => (
                        <Cell key={index} fill={['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6366f1', '#ec4899', '#14b8a6'][index % 8]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-bold text-slate-800 mb-4">CAPA Status Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={CAPA_STATUSES.map(s => ({ status: s, count: capaRecords.filter(c => c.status === s).length })).filter(d => d.count > 0)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="status" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill={hospital.themeColor || '#0ea5e9'} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-bold text-slate-800 mb-4">Training Completion Overview</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={trainingCompletionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="status" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill={hospital.themeColor || '#0ea5e9'} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'complaints' && (
          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Feedback & Complaints / Complaints</span>
                  </div>
                  <h1 className="text-base font-extrabold text-slate-900">Complaint Management</h1>
                  <p className="text-[11px] text-slate-500 leading-relaxed max-w-2xl">Register, track, and resolve patient complaints with full audit trail.</p>
                </div>
                <button
                  onClick={() => handleOpenComplaintModal()}
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-3 py-2 rounded-xl text-white font-bold text-[10px] flex items-center gap-1.5 hover:brightness-95 transition-all cursor-pointer shadow-sm btn-primary shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  New Complaint
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Complaints', value: kpiData.total, icon: 'MessageSquare', color: 'text-slate-700' },
                { label: 'Open Complaints', value: kpiData.open, icon: 'AlertTriangle', color: 'text-amber-600' },
                { label: 'Closed Complaints', value: kpiData.closed, icon: 'CheckCircle', color: 'text-emerald-600' },
                { label: 'High Severity', value: kpiData.highSeverity, icon: 'AlertTriangle', color: 'text-rose-600' }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                      <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <TabIcon icon={kpi.icon} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search complaint no, patient name, UHID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>
              <div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:border-sky-400"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:border-sky-400"
                >
                  <option value="all">All Severities</option>
                  {SEVERITIES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:border-sky-400"
                >
                  <option value="all">All Statuses</option>
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Complaint No</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Department</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Category</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Severity</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Assigned To</th>
                      <th className="px-3 py-3 text-center font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredComplaints.length === 0 && (
                      <tr>
                        <td colSpan={9} className="px-3 py-8 text-center text-[10px] text-slate-400">No complaint records found.</td>
                      </tr>
                    )}
                    {filteredComplaints.map(c => (
                      <tr key={c.id} className="hover:bg-slate-50/50">
                        <td className="px-3 py-3 text-slate-700 font-medium">{c.complaintNo}</td>
                        <td className="px-3 py-3 text-slate-700">{c.dateReceived}</td>
                        <td className="px-3 py-3 text-slate-700">{c.patientName}</td>
                        <td className="px-3 py-3 text-slate-700">{c.department}</td>
                        <td className="px-3 py-3 text-slate-700">{c.category}</td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${severityClass(c.severity)}`}>{c.severity}</span>
                        </td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${statusClass(c.status)}`}>{c.status}</span>
                        </td>
                        <td className="px-3 py-3 text-slate-700">{c.assignedTo}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => handleOpenComplaintModal(c)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-slate-600 hover:border-sky-300 hover:text-sky-700 cursor-pointer"><Eye className="w-3 h-3" /></button>
                            <button onClick={() => handleOpenComplaintModal(c)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer"><Edit3 className="w-3 h-3" /></button>
                            <button onClick={() => handleDeleteComplaint(c.id)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-rose-600 hover:border-rose-300 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rca' && (
          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Feedback & Complaints / RCA</span>
                  </div>
                  <h1 className="text-base font-extrabold text-slate-900">Root Cause Analysis</h1>
                  <p className="text-[11px] text-slate-500 leading-relaxed max-w-2xl">Perform and review root cause analysis for complaints and incidents.</p>
                </div>
                <button
                  onClick={() => handleOpenRcaModal()}
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-3 py-2 rounded-xl text-white font-bold text-[10px] flex items-center gap-1.5 hover:brightness-95 transition-all cursor-pointer shadow-sm btn-primary shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add RCA
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total RCA', value: rcaKpiData.total, icon: 'Search', color: 'text-slate-700' },
                { label: 'Open RCA', value: rcaKpiData.open, icon: 'AlertTriangle', color: 'text-amber-600' },
                { label: 'Closed RCA', value: rcaKpiData.closed, icon: 'CheckCircle', color: 'text-emerald-600' },
                { label: 'Overdue RCA', value: rcaKpiData.overdue, icon: 'Activity', color: 'text-rose-600' }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                      <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <TabIcon icon={kpi.icon} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search RCA ID, complaint no, owner..."
                    value={rcaSearchTerm}
                    onChange={(e) => setRcaSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">RCA ID</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Complaint No</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Method</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Owner</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Target Date</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-3 py-3 text-center font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRcaRecords.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-3 py-8 text-center text-[10px] text-slate-400">No RCA records found.</td>
                      </tr>
                    )}
                    {filteredRcaRecords.map(r => (
                      <tr key={r.id} className="hover:bg-slate-50/50">
                        <td className="px-3 py-3 text-slate-700 font-medium">{r.rcaId}</td>
                        <td className="px-3 py-3 text-slate-700">{r.complaintNo}</td>
                        <td className="px-3 py-3 text-slate-700">{r.method}</td>
                        <td className="px-3 py-3 text-slate-700">{r.owner}</td>
                        <td className="px-3 py-3 text-slate-700">{r.targetDate}</td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${rcaStatusClass(r.status)}`}>{r.status}</span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => handleOpenRcaModal(r)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-slate-600 hover:border-sky-300 hover:text-sky-700 cursor-pointer"><Eye className="w-3 h-3" /></button>
                            <button onClick={() => handleOpenRcaModal(r)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer"><Edit3 className="w-3 h-3" /></button>
                            <button onClick={() => handleDeleteRca(r.id)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-rose-600 hover:border-rose-300 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'capa' && (
          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Feedback & Complaints / CAPA</span>
                  </div>
                  <h1 className="text-base font-extrabold text-slate-900">Corrective & Preventive Actions</h1>
                  <p className="text-[11px] text-slate-500 leading-relaxed max-w-2xl">Manage corrective and preventive actions from RCA findings.</p>
                </div>
                <button
                  onClick={() => handleOpenCapaModal()}
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-3 py-2 rounded-xl text-white font-bold text-[10px] flex items-center gap-1.5 hover:brightness-95 transition-all cursor-pointer shadow-sm btn-primary shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add CAPA
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total CAPA', value: capaKpiData.total, icon: 'CheckCircle', color: 'text-slate-700' },
                { label: 'Open CAPA', value: capaKpiData.open, icon: 'AlertTriangle', color: 'text-amber-600' },
                { label: 'In Progress CAPA', value: capaKpiData.inProgress, icon: 'Activity', color: 'text-sky-600' },
                { label: 'Closed CAPA', value: capaKpiData.closed, icon: 'CheckCircle', color: 'text-emerald-600' }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                      <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <TabIcon icon={kpi.icon} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search CAPA ID, complaint no, owner..."
                    value={capaSearchTerm}
                    onChange={(e) => setCapaSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">CAPA ID</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Complaint No</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Owner</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Target Date</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-3 py-3 text-center font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCapaRecords.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-3 py-8 text-center text-[10px] text-slate-400">No CAPA records found.</td>
                      </tr>
                    )}
                    {filteredCapaRecords.map(c => (
                      <tr key={c.id} className="hover:bg-slate-50/50">
                        <td className="px-3 py-3 text-slate-700 font-medium">{c.capaId}</td>
                        <td className="px-3 py-3 text-slate-700">{c.complaintNo}</td>
                        <td className="px-3 py-3 text-slate-700">{c.owner}</td>
                        <td className="px-3 py-3 text-slate-700">{c.targetDate}</td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${capaStatusClass(c.status)}`}>{c.status}</span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => handleOpenCapaModal(c)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-slate-600 hover:border-sky-300 hover:text-sky-700 cursor-pointer"><Eye className="w-3 h-3" /></button>
                            <button onClick={() => handleOpenCapaModal(c)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer"><Edit3 className="w-3 h-3" /></button>
                            <button onClick={() => handleDeleteCapa(c.id)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-rose-600 hover:border-rose-300 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tat' && (
          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Feedback & Complaints / TAT</span>
                  </div>
                  <h1 className="text-base font-extrabold text-slate-900">Turnaround Time</h1>
                  <p className="text-[11px] text-slate-500 leading-relaxed max-w-2xl">Track turnaround time and compliance metrics.</p>
                </div>
                <button
                  onClick={() => handleOpenTatModal()}
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-3 py-2 rounded-xl text-white font-bold text-[10px] flex items-center gap-1.5 hover:brightness-95 transition-all cursor-pointer shadow-sm btn-primary shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add TAT
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Records', value: tatKpiData.total, icon: 'Activity', color: 'text-slate-700' },
                { label: 'Within TAT', value: tatKpiData.withinTat, icon: 'CheckCircle', color: 'text-emerald-600' },
                { label: 'Breached TAT', value: tatKpiData.breachedTat, icon: 'AlertTriangle', color: 'text-rose-600' },
                { label: 'Compliance %', value: `${tatKpiData.compliancePct}%`, icon: 'TrendingUp', color: 'text-amber-600' }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                      <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <TabIcon icon={kpi.icon} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search complaint no, department, owner..."
                    value={tatSearchTerm}
                    onChange={(e) => setTatSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">TAT ID</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Complaint No</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Department</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Target Days</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Actual Days</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Owner</th>
                      <th className="px-3 py-3 text-center font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTatRecords.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-3 py-8 text-center text-[10px] text-slate-400">No TAT records found.</td>
                      </tr>
                    )}
                    {filteredTatRecords.map(t => (
                      <tr key={t.id} className="hover:bg-slate-50/50">
                        <td className="px-3 py-3 text-slate-700 font-medium">{t.id}</td>
                        <td className="px-3 py-3 text-slate-700">{t.complaintNo}</td>
                        <td className="px-3 py-3 text-slate-700">{t.department}</td>
                        <td className="px-3 py-3 text-slate-700">{t.targetDays}</td>
                        <td className="px-3 py-3 text-slate-700">{t.actualDays}</td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${tatStatusClass(t.status)}`}>{t.status}</span>
                        </td>
                        <td className="px-3 py-3 text-slate-700">{t.owner}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => handleOpenTatModal(t)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-slate-600 hover:border-sky-300 hover:text-sky-700 cursor-pointer"><Eye className="w-3 h-3" /></button>
                            <button onClick={() => handleOpenTatModal(t)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer"><Edit3 className="w-3 h-3" /></button>
                            <button onClick={() => handleDeleteTat(t.id)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-rose-600 hover:border-rose-300 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h1 className="text-base font-extrabold text-slate-900">Analysis</h1>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-1 max-w-2xl">Analyze feedback trends, complaints, and quality indicators.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Complaints', value: totalComplaints, icon: 'MessageSquare', color: 'text-slate-700' },
                { label: 'Closed Complaints', value: closedComplaints, icon: 'CheckCircle', color: 'text-emerald-600' },
                { label: 'Open Complaints', value: openComplaints, icon: 'AlertTriangle', color: 'text-rose-600' },
                { label: 'TAT Compliance %', value: `${tatCompliancePct}%`, icon: 'Activity', color: 'text-amber-600' }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                      <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <TabIcon icon={kpi.icon} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-bold text-slate-800 mb-4">Monthly Complaint Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={Object.entries(monthlyComplaintData).sort((a, b) => a[0].localeCompare(b[0])).map(([month, count]) => ({ month, count }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke={hospital.themeColor || '#0ea5e9'} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-bold text-slate-800 mb-4">Complaint Category Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={complaintCategoryData} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={80} label>
                      {complaintCategoryData.map((entry, index) => (
                        <Cell key={index} fill={['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6366f1', '#ec4899', '#14b8a6'][index % 8]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-bold text-slate-800 mb-4">Complaint Severity Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={complaintSeverityData} dataKey="count" nameKey="severity" cx="50%" cy="50%" outerRadius={80} label>
                      {complaintSeverityData.map((entry, index) => (
                        <Cell key={index} fill={['#10b981', '#f59e0b', '#ef4444', '#ec4899'][index % 4]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-bold text-slate-800 mb-4">Complaint Status Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={complaintStatusData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="status" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill={hospital.themeColor || '#0ea5e9'} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-bold text-slate-800 mb-4">Training Completion Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={trainingCompletionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="status" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill={hospital.themeColor || '#0ea5e9'} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-bold text-slate-800 mb-4">TAT Compliance</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={tatComplianceData} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80} label>
                      {tatComplianceData.map((entry, index) => (
                        <Cell key={index} fill={['#10b981', '#ef4444'][index % 2]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'training' && (
          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Feedback & Complaints / Training</span>
                  </div>
                  <h1 className="text-base font-extrabold text-slate-900">Staff Training & Awareness</h1>
                  <p className="text-[11px] text-slate-500 leading-relaxed max-w-2xl">Track training sessions, attendance, and completion rates.</p>
                </div>
                <button
                  onClick={() => handleOpenTrainingModal()}
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-3 py-2 rounded-xl text-white font-bold text-[10px] flex items-center gap-1.5 hover:brightness-95 transition-all cursor-pointer shadow-sm btn-primary shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Training
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Sessions', value: trainingKpiData.total, icon: 'Users', color: 'text-slate-700' },
                { label: 'Completed', value: trainingKpiData.completed, icon: 'CheckCircle', color: 'text-emerald-600' },
                { label: 'Scheduled', value: trainingKpiData.scheduled, icon: 'Activity', color: 'text-sky-600' },
                { label: 'Avg Completion %', value: `${trainingKpiData.avgCompletion}%`, icon: 'TrendingUp', color: 'text-amber-600' }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                      <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <TabIcon icon={kpi.icon} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search training ID, topic, trainer..."
                    value={trainingSearchTerm}
                    onChange={(e) => setTrainingSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Training ID</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Topic</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Trainer</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Participants</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Completion %</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-3 py-3 text-center font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTrainingRecords.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-3 py-8 text-center text-[10px] text-slate-400">No training records found.</td>
                      </tr>
                    )}
                    {filteredTrainingRecords.map(t => (
                      <tr key={t.id} className="hover:bg-slate-50/50">
                        <td className="px-3 py-3 text-slate-700 font-medium">{t.trainingId}</td>
                        <td className="px-3 py-3 text-slate-700">{t.topic}</td>
                        <td className="px-3 py-3 text-slate-700">{t.trainer}</td>
                        <td className="px-3 py-3 text-slate-700">{t.date}</td>
                        <td className="px-3 py-3 text-slate-700">{t.participants}</td>
                        <td className="px-3 py-3 text-slate-700">{t.completionPercentage}%</td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${t.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : t.status === 'Scheduled' ? 'bg-sky-50 text-sky-700 border border-sky-200' : t.status === 'In Progress' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-50 text-slate-700 border border-slate-200'}`}>{t.status}</span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => handleOpenTrainingModal(t)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-slate-600 hover:border-sky-300 hover:text-sky-700 cursor-pointer"><Eye className="w-3 h-3" /></button>
                            <button onClick={() => handleOpenTrainingModal(t)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer"><Edit3 className="w-3 h-3" /></button>
                            <button onClick={() => handleDeleteTraining(t.id)} className="px-2 py-1 rounded border border-slate-200 text-[8px] font-bold text-rose-600 hover:border-rose-300 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {isComplaintModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-5 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800">{editingComplaintId ? 'Edit Complaint' : 'New Complaint'}</h3>
              <button onClick={() => { setIsComplaintModalOpen(false); setEditingComplaintId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
            </div>
            <form onSubmit={handleSaveComplaint} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Complaint No</label>
                  <input type="text" value={complaintForm.complaintNo} onChange={(e) => setComplaintForm({...complaintForm, complaintNo: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Date Received *</label>
                  <input type="date" value={complaintForm.dateReceived} onChange={(e) => setComplaintForm({...complaintForm, dateReceived: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name *</label>
                  <input type="text" value={complaintForm.patientName} onChange={(e) => setComplaintForm({...complaintForm, patientName: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">UHID</label>
                  <input type="text" value={complaintForm.uhid} onChange={(e) => setComplaintForm({...complaintForm, uhid: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Department *</label>
                  <select value={complaintForm.department} onChange={(e) => setComplaintForm({...complaintForm, department: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    <option value="">Select</option>
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Category *</label>
                  <select value={complaintForm.category} onChange={(e) => setComplaintForm({...complaintForm, category: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    <option value="">Select</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Severity *</label>
                  <select value={complaintForm.severity} onChange={(e) => setComplaintForm({...complaintForm, severity: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    <option value="">Select</option>
                    {SEVERITIES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                  <select value={complaintForm.status} onChange={(e) => setComplaintForm({...complaintForm, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Description *</label>
                <textarea value={complaintForm.description} onChange={(e) => setComplaintForm({...complaintForm, description: e.target.value})} rows={3} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Assigned To</label>
                  <input type="text" value={complaintForm.assignedTo} onChange={(e) => setComplaintForm({...complaintForm, assignedTo: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Escalation Level</label>
                  <select value={complaintForm.escalationLevel} onChange={(e) => setComplaintForm({...complaintForm, escalationLevel: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    {ESCALATION_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Acknowledgement Date</label>
                  <input type="date" value={complaintForm.acknowledgementDate} onChange={(e) => setComplaintForm({...complaintForm, acknowledgementDate: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Closure Date</label>
                  <input type="date" value={complaintForm.closureDate} onChange={(e) => setComplaintForm({...complaintForm, closureDate: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => { setIsComplaintModalOpen(false); setEditingComplaintId(null); }} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-[9px] font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="flex-1 px-3 py-2 rounded-lg text-white text-[9px] font-bold">{editingComplaintId ? 'Update' : 'Register Complaint'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isRcaModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-5 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800">{editingRcaId ? 'Edit RCA' : 'New RCA'}</h3>
              <button onClick={() => { setIsRcaModalOpen(false); setEditingRcaId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
            </div>
            <form onSubmit={handleSaveRca} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Complaint No</label>
                  <input type="text" value={rcaForm.complaintNo} onChange={(e) => setRcaForm({...rcaForm, complaintNo: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Method</label>
                  <select value={rcaForm.method} onChange={(e) => setRcaForm({...rcaForm, method: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    <option value="">Select</option>
                    {RCA_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Root Cause</label>
                <textarea value={rcaForm.rootCause} onChange={(e) => setRcaForm({...rcaForm, rootCause: e.target.value})} rows={3} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Findings</label>
                <textarea value={rcaForm.findings} onChange={(e) => setRcaForm({...rcaForm, findings: e.target.value})} rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Corrective Action</label>
                <textarea value={rcaForm.correctiveAction} onChange={(e) => setRcaForm({...rcaForm, correctiveAction: e.target.value})} rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Owner</label>
                  <input type="text" value={rcaForm.owner} onChange={(e) => setRcaForm({...rcaForm, owner: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Target Date</label>
                  <input type="date" value={rcaForm.targetDate} onChange={(e) => setRcaForm({...rcaForm, targetDate: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                <select value={rcaForm.status} onChange={(e) => setRcaForm({...rcaForm, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                  {RCA_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => { setIsRcaModalOpen(false); setEditingRcaId(null); }} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-[9px] font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="flex-1 px-3 py-2 rounded-lg text-white text-[9px] font-bold">{editingRcaId ? 'Update' : 'Create RCA'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isCapaModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-5 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800">{editingCapaId ? 'Edit CAPA' : 'New CAPA'}</h3>
              <button onClick={() => { setIsCapaModalOpen(false); setEditingCapaId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
            </div>
            <form onSubmit={handleSaveCapa} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Complaint No</label>
                  <input type="text" value={capaForm.complaintNo} onChange={(e) => setCapaForm({...capaForm, complaintNo: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                  <select value={capaForm.status} onChange={(e) => setCapaForm({...capaForm, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    {CAPA_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Corrective Action</label>
                <textarea value={capaForm.correctiveAction} onChange={(e) => setCapaForm({...capaForm, correctiveAction: e.target.value})} rows={3} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Preventive Action</label>
                <textarea value={capaForm.preventiveAction} onChange={(e) => setCapaForm({...capaForm, preventiveAction: e.target.value})} rows={3} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Owner</label>
                  <input type="text" value={capaForm.owner} onChange={(e) => setCapaForm({...capaForm, owner: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Target Date</label>
                  <input type="date" value={capaForm.targetDate} onChange={(e) => setCapaForm({...capaForm, targetDate: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => { setIsCapaModalOpen(false); setEditingCapaId(null); }} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-[9px] font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="flex-1 px-3 py-2 rounded-lg text-white text-[9px] font-bold">{editingCapaId ? 'Update' : 'Create CAPA'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isTrainingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-5 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800">{editingTrainingId ? 'Edit Training' : 'New Training'}</h3>
              <button onClick={() => { setIsTrainingModalOpen(false); setEditingTrainingId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
            </div>
            <form onSubmit={handleSaveTraining} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Topic</label>
                  <input type="text" value={trainingForm.topic} onChange={(e) => setTrainingForm({...trainingForm, topic: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Trainer</label>
                  <input type="text" value={trainingForm.trainer} onChange={(e) => setTrainingForm({...trainingForm, trainer: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Date</label>
                  <input type="date" value={trainingForm.date} onChange={(e) => setTrainingForm({...trainingForm, date: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Participants</label>
                  <input type="number" value={trainingForm.participants} onChange={(e) => setTrainingForm({...trainingForm, participants: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Completion Percentage</label>
                  <input type="number" min="0" max="100" value={trainingForm.completionPercentage} onChange={(e) => setTrainingForm({...trainingForm, completionPercentage: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                  <select value={trainingForm.status} onChange={(e) => setTrainingForm({...trainingForm, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    {TRAINING_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => { setIsTrainingModalOpen(false); setEditingTrainingId(null); }} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-[9px] font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="flex-1 px-3 py-2 rounded-lg text-white text-[9px] font-bold">{editingTrainingId ? 'Update' : 'Create Training'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isTatModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-5 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800">{editingTatId ? 'Edit TAT' : 'New TAT'}</h3>
              <button onClick={() => { setIsTatModalOpen(false); setEditingTatId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
            </div>
            <form onSubmit={handleSaveTat} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Complaint No</label>
                  <input type="text" value={tatForm.complaintNo} onChange={(e) => setTatForm({...tatForm, complaintNo: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Department</label>
                  <input type="text" value={tatForm.department} onChange={(e) => setTatForm({...tatForm, department: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Target Days</label>
                  <input type="number" value={tatForm.targetDays} onChange={(e) => setTatForm({...tatForm, targetDays: parseInt(e.target.value) || 0})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Actual Days</label>
                  <input type="number" value={tatForm.actualDays} onChange={(e) => setTatForm({...tatForm, actualDays: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Owner</label>
                  <input type="text" value={tatForm.owner} onChange={(e) => setTatForm({...tatForm, owner: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                  <select value={tatForm.status} onChange={(e) => setTatForm({...tatForm, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    <option value="Within TAT">Within TAT</option>
                    <option value="Breach">Breached TAT</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => { setIsTatModalOpen(false); setEditingTatId(null); }} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-[9px] font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="flex-1 px-3 py-2 rounded-lg text-white text-[9px] font-bold">{editingTatId ? 'Update' : 'Create TAT'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackWorkspace;

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
  FileText,
  Plus,
  Search,
  Edit3,
  Trash2,
  X
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

const LS_KEY_RISK = 'laboratory_risk_assessments';
const LS_KEY_EQUIPMENT = 'laboratory_equipment_safety';
const LS_KEY_CHEMICAL = 'laboratory_chemical_inventory';
const LS_KEY_WASTE = 'laboratory_hazardous_waste';

const LaboratorySafetyWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();
  const [activeTab, setActiveTab] = useState('dashboard');

  const [riskAssessments, setRiskAssessments] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_RISK);
    return saved ? JSON.parse(saved) : [
      { id: 'LR-001', laboratoryArea: 'Specimen Collection', hazardCategory: 'Biological', hazardDescription: 'Exposure to bloodborne pathogens during phlebotomy', probability: 3, severity: 4, riskScore: 12, riskLevel: 'Medium', controlMeasures: 'Use of appropriate PPE, safety needles, biohazard disposal', responsiblePerson: 'John Doe', reviewDate: '2026-08-01', status: 'Completed', remarks: 'Routine review completed' },
      { id: 'LR-002', laboratoryArea: 'Hematology', hazardCategory: 'Biological', hazardDescription: 'Aerosol generation during sample centrifugation', probability: 2, severity: 4, riskScore: 8, riskLevel: 'Medium', controlMeasures: 'Use sealed centrifuge rotors, wait 5 mins before opening', responsiblePerson: 'Jane Smith', reviewDate: '2026-09-15', status: 'Pending', remarks: 'New centrifuge incoming' },
      { id: 'LR-003', laboratoryArea: 'Clinical Biochemistry', hazardCategory: 'Chemical', hazardDescription: 'Handling of corrosive reagents', probability: 2, severity: 5, riskScore: 10, riskLevel: 'Medium', controlMeasures: 'Work in fume hood, wear chemical resistant gloves and goggles', responsiblePerson: 'Alice Johnson', reviewDate: '2026-10-10', status: 'Completed', remarks: 'Fume hood calibrated' },
      { id: 'LR-004', laboratoryArea: 'Microbiology', hazardCategory: 'Biological', hazardDescription: 'Inhalation of infectious aerosols from cultures', probability: 4, severity: 5, riskScore: 20, riskLevel: 'High', controlMeasures: 'All culture work in Class II Biosafety Cabinet, N95 respirators', responsiblePerson: 'Dr. Bruce Banner', reviewDate: '2026-07-20', status: 'Pending', remarks: 'BSC certification pending' },
      { id: 'LR-005', laboratoryArea: 'Waste Storage', hazardCategory: 'Physical', hazardDescription: 'Needlestick injuries from improper sharps disposal', probability: 2, severity: 3, riskScore: 6, riskLevel: 'Low', controlMeasures: 'Puncture-proof sharps containers, regular clearance', responsiblePerson: 'Emily Clark', reviewDate: '2026-12-01', status: 'Completed', remarks: 'No incidents this quarter' },
    ];
  });
  const [isRiskModalOpen, setIsRiskModalOpen] = useState(false);
  const [editingRiskId, setEditingRiskId] = useState(null);
  const [riskForm, setRiskForm] = useState({ id: '', laboratoryArea: 'Specimen Collection', hazardCategory: 'Biological', hazardDescription: '', probability: 1, severity: 1, riskScore: 1, riskLevel: 'Low', controlMeasures: '', responsiblePerson: '', reviewDate: '', status: 'Pending', remarks: '' });
  const [riskSearch, setRiskSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_RISK, JSON.stringify(riskAssessments));
  }, [riskAssessments]);

  const [equipments, setEquipments] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_EQUIPMENT);
    return saved ? JSON.parse(saved) : [
      { id: 'EQ-001', equipmentName: 'Centrifuge', department: 'Hematology', inspectionDate: '2026-01-10', nextInspectionDate: '2026-07-10', calibrationStatus: 'Valid', functionalStatus: 'Operational', inspector: 'John Doe', remarks: 'Routine check pass' },
      { id: 'EQ-002', equipmentName: 'Biosafety Cabinet', department: 'Microbiology', inspectionDate: '2026-02-15', nextInspectionDate: '2026-08-15', calibrationStatus: 'Valid', functionalStatus: 'Operational', inspector: 'Alice Smith', remarks: 'HEPA filter replaced' },
      { id: 'EQ-003', equipmentName: 'Autoclave', department: 'Microbiology', inspectionDate: '2026-03-20', nextInspectionDate: '2026-09-20', calibrationStatus: 'Pending', functionalStatus: 'Needs Maintenance', inspector: 'Bob Jones', remarks: 'Door seal issue' },
      { id: 'EQ-004', equipmentName: 'Chemistry Analyzer', department: 'Clinical Biochemistry', inspectionDate: '2026-04-05', nextInspectionDate: '2026-10-05', calibrationStatus: 'Valid', functionalStatus: 'Operational', inspector: 'Sarah Connor', remarks: '' },
      { id: 'EQ-005', equipmentName: 'Microscope', department: 'Histopathology', inspectionDate: '2026-05-12', nextInspectionDate: '2026-11-12', calibrationStatus: 'Valid', functionalStatus: 'Operational', inspector: 'Eve Davis', remarks: '' },
    ];
  });
  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);
  const [editingEquipmentId, setEditingEquipmentId] = useState(null);
  const [equipmentForm, setEquipmentForm] = useState({ id: '', equipmentName: '', department: 'Hematology', inspectionDate: '', nextInspectionDate: '', calibrationStatus: 'Valid', functionalStatus: 'Operational', inspector: '', remarks: '' });
  const [equipmentSearch, setEquipmentSearch] = useState('');

  const [chemicals, setChemicals] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_CHEMICAL);
    return saved ? JSON.parse(saved) : [
      { id: 'CH-001', chemicalName: 'Formalin (10%)', storageLocation: 'Flammable Cabinet', hazardClass: 'Health Hazard', quantity: '20L', expiryDate: '2027-01-01', msdsAvailable: 'Yes', storageCompliance: 'Compliant', remarks: '' },
      { id: 'CH-002', chemicalName: 'Sulfuric Acid', storageLocation: 'Corrosive Cabinet', hazardClass: 'Corrosive', quantity: '5L', expiryDate: '2026-12-31', msdsAvailable: 'Yes', storageCompliance: 'Compliant', remarks: 'Handle with care' },
      { id: 'CH-003', chemicalName: 'Ethanol', storageLocation: 'Flammable Cabinet', hazardClass: 'Flammable', quantity: '10L', expiryDate: '2027-05-15', msdsAvailable: 'Yes', storageCompliance: 'Compliant', remarks: '' },
      { id: 'CH-004', chemicalName: 'Xylene', storageLocation: 'Flammable Cabinet', hazardClass: 'Health Hazard', quantity: '15L', expiryDate: '2026-11-20', msdsAvailable: 'Yes', storageCompliance: 'Compliant', remarks: 'Use in fume hood' },
      { id: 'CH-005', chemicalName: 'Sodium Hypochlorite', storageLocation: 'General Storage', hazardClass: 'Corrosive', quantity: '25L', expiryDate: '2027-02-28', msdsAvailable: 'No', storageCompliance: 'Non-Compliant', remarks: 'Request MSDS immediately' },
    ];
  });
  const [isChemicalModalOpen, setIsChemicalModalOpen] = useState(false);
  const [editingChemicalId, setEditingChemicalId] = useState(null);
  const [chemicalForm, setChemicalForm] = useState({ id: '', chemicalName: '', storageLocation: '', hazardClass: 'Flammable', quantity: '', expiryDate: '', msdsAvailable: 'Yes', storageCompliance: 'Compliant', remarks: '' });
  const [chemicalSearch, setChemicalSearch] = useState('');

  const [wastes, setWastes] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_WASTE);
    return saved ? JSON.parse(saved) : [
      { id: 'HW-001', wasteCategory: 'Sharps', collectionDate: '2026-07-01', disposalMethod: 'Incineration', quantity: '5kg', responsibleStaff: 'John Doe', disposalStatus: 'Pending', remarks: '' },
      { id: 'HW-002', wasteCategory: 'Biological', collectionDate: '2026-07-02', disposalMethod: 'Autoclaving', quantity: '10kg', responsibleStaff: 'Jane Smith', disposalStatus: 'Completed', remarks: '' },
      { id: 'HW-003', wasteCategory: 'Chemical', collectionDate: '2026-07-03', disposalMethod: 'Chemical Treatment', quantity: '8L', responsibleStaff: 'Alice Smith', disposalStatus: 'Pending', remarks: '' },
      { id: 'HW-004', wasteCategory: 'Biological', collectionDate: '2026-07-04', disposalMethod: 'Incineration', quantity: '12kg', responsibleStaff: 'Bob Jones', disposalStatus: 'Completed', remarks: '' },
      { id: 'HW-005', wasteCategory: 'Chemical', collectionDate: '2026-07-05', disposalMethod: 'Specialized Disposal', quantity: '3L', responsibleStaff: 'Sarah Connor', disposalStatus: 'Pending', remarks: 'Awaiting pickup' },
    ];
  });
  const [isWasteModalOpen, setIsWasteModalOpen] = useState(false);
  const [editingWasteId, setEditingWasteId] = useState(null);
  const [wasteForm, setWasteForm] = useState({ id: '', wasteCategory: 'Biological', collectionDate: '', disposalMethod: '', quantity: '', responsibleStaff: '', disposalStatus: 'Pending', remarks: '' });
  const [wasteSearch, setWasteSearch] = useState('');

  React.useEffect(() => { localStorage.setItem(LS_KEY_EQUIPMENT, JSON.stringify(equipments)); }, [equipments]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_CHEMICAL, JSON.stringify(chemicals)); }, [chemicals]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_WASTE, JSON.stringify(wastes)); }, [wastes]);

  const getNextRiskId = () => {
    const maxNum = riskAssessments.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `LR-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleRiskFormChange = (field, value) => {
    const newForm = { ...riskForm, [field]: value };
    if (field === 'probability' || field === 'severity') {
      const prob = parseInt(newForm.probability, 10) || 1;
      const sev = parseInt(newForm.severity, 10) || 1;
      const score = prob * sev;
      newForm.riskScore = score;
      newForm.riskLevel = score >= 15 ? 'High' : (score >= 8 ? 'Medium' : 'Low');
    }
    setRiskForm(newForm);
  };

  const renderRiskAssessment = () => {
    const filtered = riskAssessments.filter(r => 
      r.laboratoryArea.toLowerCase().includes(riskSearch.toLowerCase()) ||
      r.hazardCategory.toLowerCase().includes(riskSearch.toLowerCase()) ||
      r.hazardDescription.toLowerCase().includes(riskSearch.toLowerCase()) ||
      r.status.toLowerCase().includes(riskSearch.toLowerCase())
    );

    const totalAssessments = riskAssessments.length;
    const highRisk = riskAssessments.filter(r => r.riskLevel === 'High').length;
    const mediumRisk = riskAssessments.filter(r => r.riskLevel === 'Medium').length;
    const lowRisk = riskAssessments.filter(r => r.riskLevel === 'Low').length;
    const completedActions = riskAssessments.filter(r => r.status === 'Completed').length;
    const pendingActions = riskAssessments.filter(r => r.status === 'Pending').length;
    const avgScore = totalAssessments ? (riskAssessments.reduce((s, r) => s + r.riskScore, 0) / totalAssessments).toFixed(1) : 0;
    const compliance = totalAssessments ? Math.round((completedActions / totalAssessments) * 100) : 0;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Laboratory Risk Assessment Register</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Manage and track laboratory hazards and risks</p>
          </div>
          <button
            onClick={() => {
              setRiskForm({ id: getNextRiskId(), laboratoryArea: 'Specimen Collection', hazardCategory: 'Biological', hazardDescription: '', probability: 1, severity: 1, riskScore: 1, riskLevel: 'Low', controlMeasures: '', responsiblePerson: '', reviewDate: '', status: 'Pending', remarks: '' });
              setEditingRiskId(null);
              setIsRiskModalOpen(true);
            }}
            style={{ backgroundColor: hospital?.themeColor || '#0ea5e9' }}
            className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Assessment
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Risk Assessments', value: totalAssessments, color: 'text-blue-600' },
            { label: 'High Risk Areas', value: highRisk, color: 'text-rose-600' },
            { label: 'Medium Risk Areas', value: mediumRisk, color: 'text-amber-600' },
            { label: 'Low Risk Areas', value: lowRisk, color: 'text-emerald-600' },
            { label: 'Completed Mitigation Actions', value: completedActions, color: 'text-emerald-600' },
            { label: 'Pending Actions', value: pendingActions, color: 'text-rose-600' },
            { label: 'Average Risk Score', value: avgScore, color: 'text-violet-600' },
            { label: 'Risk Compliance %', value: `${compliance}%`, color: 'text-sky-600' },
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search assessments..."
            value={riskSearch}
            onChange={(e) => setRiskSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Risk ID', 'Area', 'Hazard', 'Score', 'Level', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.laboratoryArea}</td>
                    <td className="px-3 py-3">
                      <p className="font-semibold text-slate-700">{r.hazardCategory}</p>
                      <p className="text-slate-500 truncate max-w-[150px]" title={r.hazardDescription}>{r.hazardDescription}</p>
                    </td>
                    <td className="px-3 py-3 font-medium text-slate-700">{r.riskScore}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-1 rounded-full text-[9px] font-bold ${
                        r.riskLevel === 'High' ? 'bg-rose-50 text-rose-700' :
                        r.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-700' :
                        'bg-emerald-50 text-emerald-700'
                      }`}>
                        {r.riskLevel}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-1 rounded-full text-[9px] font-bold ${
                        r.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                        'bg-rose-50 text-rose-700'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setRiskForm(r); setEditingRiskId(r.id); setIsRiskModalOpen(true); }}
                          className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => { if (window.confirm('Delete this risk assessment?')) setRiskAssessments(prev => prev.filter(item => item.id !== r.id)); }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-3 py-8 text-center text-slate-500 font-medium">
                      No risk assessments found.
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

  const renderEquipmentChemical = () => {
    const eqFiltered = equipments.filter(r => r.equipmentName.toLowerCase().includes(equipmentSearch.toLowerCase()) || r.department.toLowerCase().includes(equipmentSearch.toLowerCase()));
    const chFiltered = chemicals.filter(r => r.chemicalName.toLowerCase().includes(chemicalSearch.toLowerCase()) || r.hazardClass.toLowerCase().includes(chemicalSearch.toLowerCase()));
    const wsFiltered = wastes.filter(r => r.wasteCategory.toLowerCase().includes(wasteSearch.toLowerCase()) || r.disposalMethod.toLowerCase().includes(wasteSearch.toLowerCase()));

    const totalEq = equipments.length;
    const eqInspected = equipments.filter(r => r.functionalStatus === 'Operational').length;
    const calibCompliance = totalEq ? Math.round((equipments.filter(r => r.calibrationStatus === 'Valid').length / totalEq) * 100) : 0;
    
    const totalChem = chemicals.length;
    const msdsCompliance = totalChem ? Math.round((chemicals.filter(r => r.msdsAvailable === 'Yes').length / totalChem) * 100) : 0;
    
    const totalWaste = wastes.length;
    const safeDisposal = totalWaste ? Math.round((wastes.filter(r => r.disposalStatus === 'Completed').length / totalWaste) * 100) : 0;
    
    const overallSafety = Math.round((calibCompliance + msdsCompliance + safeDisposal) / 3) || 0;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Equipment', value: totalEq, color: 'text-blue-600' },
            { label: 'Equipment Inspected', value: eqInspected, color: 'text-emerald-600' },
            { label: 'Calibration Compliance %', value: `${calibCompliance}%`, color: 'text-indigo-600' },
            { label: 'Total Chemicals', value: totalChem, color: 'text-violet-600' },
            { label: 'MSDS Compliance %', value: `${msdsCompliance}%`, color: 'text-emerald-600' },
            { label: 'Hazardous Waste Records', value: totalWaste, color: 'text-amber-600' },
            { label: 'Safe Disposal Compliance %', value: `${safeDisposal}%`, color: 'text-emerald-600' },
            { label: 'Overall Safety %', value: `${overallSafety}%`, color: 'text-sky-600' },
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Equipment Section */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800">Laboratory Equipment Safety Register</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search equipment..."
                  value={equipmentSearch}
                  onChange={(e) => setEquipmentSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-[10px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <button
                onClick={() => {
                  const maxId = equipments.reduce((max, r) => Math.max(max, parseInt(r.id.split('-')[1], 10)), 0);
                  setEquipmentForm({ id: `EQ-${String(maxId + 1).padStart(3, '0')}`, equipmentName: '', department: 'Hematology', inspectionDate: '', nextInspectionDate: '', calibrationStatus: 'Valid', functionalStatus: 'Operational', inspector: '', remarks: '' });
                  setEditingEquipmentId(null);
                  setIsEquipmentModalOpen(true);
                }}
                className="px-3 py-1.5 bg-sky-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-sky-600"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['ID', 'Name', 'Department', 'Inspection', 'Next Insp.', 'Calibration', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-3 py-2 text-left font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {eqFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-3 py-2 font-mono text-slate-500">{r.id}</td>
                    <td className="px-3 py-2 font-semibold text-slate-700">{r.equipmentName}</td>
                    <td className="px-3 py-2 text-slate-600">{r.department}</td>
                    <td className="px-3 py-2 text-slate-600">{r.inspectionDate}</td>
                    <td className="px-3 py-2 text-slate-600">{r.nextInspectionDate}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded-full font-bold ${r.calibrationStatus === 'Valid' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{r.calibrationStatus}</span>
                    </td>
                    <td className="px-3 py-2 text-slate-600">{r.functionalStatus}</td>
                    <td className="px-3 py-2 flex gap-2">
                      <button onClick={() => { setEquipmentForm(r); setEditingEquipmentId(r.id); setIsEquipmentModalOpen(true); }} className="text-slate-400 hover:text-sky-600"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => { if(window.confirm('Delete?')) setEquipments(prev => prev.filter(x => x.id !== r.id)) }} className="text-slate-400 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
                {eqFiltered.length === 0 && <tr><td colSpan="8" className="px-3 py-4 text-center text-slate-500">No equipment found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chemicals Section */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800">Chemical Inventory & Safety Register</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search chemicals..."
                  value={chemicalSearch}
                  onChange={(e) => setChemicalSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-[10px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <button
                onClick={() => {
                  const maxId = chemicals.reduce((max, r) => Math.max(max, parseInt(r.id.split('-')[1], 10)), 0);
                  setChemicalForm({ id: `CH-${String(maxId + 1).padStart(3, '0')}`, chemicalName: '', storageLocation: '', hazardClass: 'Flammable', quantity: '', expiryDate: '', msdsAvailable: 'Yes', storageCompliance: 'Compliant', remarks: '' });
                  setEditingChemicalId(null);
                  setIsChemicalModalOpen(true);
                }}
                className="px-3 py-1.5 bg-sky-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-sky-600"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['ID', 'Chemical', 'Storage', 'Hazard', 'Qty', 'Expiry', 'MSDS', 'Compliance', 'Actions'].map((h) => (
                    <th key={h} className="px-3 py-2 text-left font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {chFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-3 py-2 font-mono text-slate-500">{r.id}</td>
                    <td className="px-3 py-2 font-semibold text-slate-700">{r.chemicalName}</td>
                    <td className="px-3 py-2 text-slate-600">{r.storageLocation}</td>
                    <td className="px-3 py-2 text-slate-600">{r.hazardClass}</td>
                    <td className="px-3 py-2 text-slate-600">{r.quantity}</td>
                    <td className="px-3 py-2 text-slate-600">{r.expiryDate}</td>
                    <td className="px-3 py-2 font-bold text-slate-600">{r.msdsAvailable}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded-full font-bold ${r.storageCompliance === 'Compliant' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{r.storageCompliance}</span>
                    </td>
                    <td className="px-3 py-2 flex gap-2">
                      <button onClick={() => { setChemicalForm(r); setEditingChemicalId(r.id); setIsChemicalModalOpen(true); }} className="text-slate-400 hover:text-sky-600"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => { if(window.confirm('Delete?')) setChemicals(prev => prev.filter(x => x.id !== r.id)) }} className="text-slate-400 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
                {chFiltered.length === 0 && <tr><td colSpan="9" className="px-3 py-4 text-center text-slate-500">No chemicals found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {/* Waste Section */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800">Hazardous Waste Register</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search waste..."
                  value={wasteSearch}
                  onChange={(e) => setWasteSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-[10px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <button
                onClick={() => {
                  const maxId = wastes.reduce((max, r) => Math.max(max, parseInt(r.id.split('-')[1], 10)), 0);
                  setWasteForm({ id: `HW-${String(maxId + 1).padStart(3, '0')}`, wasteCategory: 'Biological', collectionDate: '', disposalMethod: '', quantity: '', responsibleStaff: '', disposalStatus: 'Pending', remarks: '' });
                  setEditingWasteId(null);
                  setIsWasteModalOpen(true);
                }}
                className="px-3 py-1.5 bg-sky-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-sky-600"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['ID', 'Category', 'Date', 'Method', 'Qty', 'Staff', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-3 py-2 text-left font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {wsFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-3 py-2 font-mono text-slate-500">{r.id}</td>
                    <td className="px-3 py-2 font-semibold text-slate-700">{r.wasteCategory}</td>
                    <td className="px-3 py-2 text-slate-600">{r.collectionDate}</td>
                    <td className="px-3 py-2 text-slate-600">{r.disposalMethod}</td>
                    <td className="px-3 py-2 text-slate-600">{r.quantity}</td>
                    <td className="px-3 py-2 text-slate-600">{r.responsibleStaff}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded-full font-bold ${r.disposalStatus === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{r.disposalStatus}</span>
                    </td>
                    <td className="px-3 py-2 flex gap-2">
                      <button onClick={() => { setWasteForm(r); setEditingWasteId(r.id); setIsWasteModalOpen(true); }} className="text-slate-400 hover:text-sky-600"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => { if(window.confirm('Delete?')) setWastes(prev => prev.filter(x => x.id !== r.id)) }} className="text-slate-400 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
                {wsFiltered.length === 0 && <tr><td colSpan="8" className="px-3 py-4 text-center text-slate-500">No waste records found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

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
            ) : activeTab === 'risk_assessment' ? (
              renderRiskAssessment()
            ) : activeTab === 'equipment_chemical' ? (
              renderEquipmentChemical()
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
                <p className="text-sm font-medium text-slate-500">Phase will be implemented in the next step.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isRiskModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="text-xs font-bold text-slate-800">
                {editingRiskId ? 'Edit Risk Assessment' : 'New Risk Assessment'}
              </h3>
              <button onClick={() => setIsRiskModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Laboratory Area</label>
                  <select
                    value={riskForm.laboratoryArea}
                    onChange={(e) => handleRiskFormChange('laboratoryArea', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {['Specimen Collection', 'Hematology', 'Clinical Biochemistry', 'Microbiology', 'Blood Bank', 'Histopathology', 'Sample Receiving', 'Waste Storage'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Hazard Category</label>
                  <select
                    value={riskForm.hazardCategory}
                    onChange={(e) => handleRiskFormChange('hazardCategory', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {['Biological', 'Chemical', 'Physical', 'Ergonomic', 'Fire', 'Electrical'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Hazard Description</label>
                  <input
                    type="text"
                    value={riskForm.hazardDescription}
                    onChange={(e) => handleRiskFormChange('hazardDescription', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Describe the hazard"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Probability (1-5)</label>
                  <input
                    type="number"
                    min="1" max="5"
                    value={riskForm.probability}
                    onChange={(e) => handleRiskFormChange('probability', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Severity (1-5)</label>
                  <input
                    type="number"
                    min="1" max="5"
                    value={riskForm.severity}
                    onChange={(e) => handleRiskFormChange('severity', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Risk Score (Auto)</label>
                  <input
                    type="number"
                    disabled
                    value={riskForm.riskScore}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-500 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Risk Level (Auto)</label>
                  <input
                    type="text"
                    disabled
                    value={riskForm.riskLevel}
                    className={`w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] font-bold ${
                      riskForm.riskLevel === 'High' ? 'text-rose-600 bg-rose-50' :
                      riskForm.riskLevel === 'Medium' ? 'text-amber-600 bg-amber-50' :
                      'text-emerald-600 bg-emerald-50'
                    }`}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Control Measures</label>
                  <textarea
                    rows="2"
                    value={riskForm.controlMeasures}
                    onChange={(e) => handleRiskFormChange('controlMeasures', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Mitigation steps"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Responsible Person</label>
                  <input
                    type="text"
                    value={riskForm.responsiblePerson}
                    onChange={(e) => handleRiskFormChange('responsiblePerson', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Review Date</label>
                  <input
                    type="date"
                    value={riskForm.reviewDate}
                    onChange={(e) => handleRiskFormChange('reviewDate', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                  <select
                    value={riskForm.status}
                    onChange={(e) => handleRiskFormChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option>Pending</option>
                    <option>Completed</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                  <input
                    type="text"
                    value={riskForm.remarks}
                    onChange={(e) => handleRiskFormChange('remarks', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 border-t border-slate-200 flex justify-end gap-2 shrink-0">
              <button
                onClick={() => setIsRiskModalOpen(false)}
                className="px-3 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!riskForm.hazardDescription || !riskForm.controlMeasures || !riskForm.responsiblePerson) {
                    alert('Please fill in required fields (Hazard Description, Control Measures, Responsible Person).');
                    return;
                  }
                  if (editingRiskId) {
                    setRiskAssessments(prev => prev.map(r => r.id === editingRiskId ? riskForm : r));
                  } else {
                    setRiskAssessments(prev => [...prev, riskForm]);
                  }
                  setIsRiskModalOpen(false);
                }}
                style={{ backgroundColor: hospital?.themeColor || '#0ea5e9' }}
                className="px-3 py-2 rounded-xl text-[10px] font-bold text-white hover:brightness-95 transition-all"
              >
                {editingRiskId ? 'Save Changes' : 'Add Risk Assessment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isEquipmentModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="text-xs font-bold text-slate-800">{editingEquipmentId ? 'Edit Equipment' : 'Add Equipment'}</h3>
              <button onClick={() => setIsEquipmentModalOpen(false)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4 overflow-y-auto grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Equipment Name</label>
                <input type="text" value={equipmentForm.equipmentName} onChange={e => setEquipmentForm({...equipmentForm, equipmentName: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Department</label>
                <input type="text" value={equipmentForm.department} onChange={e => setEquipmentForm({...equipmentForm, department: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Inspector</label>
                <input type="text" value={equipmentForm.inspector} onChange={e => setEquipmentForm({...equipmentForm, inspector: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Inspection Date</label>
                <input type="date" value={equipmentForm.inspectionDate} onChange={e => setEquipmentForm({...equipmentForm, inspectionDate: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Next Inspection Date</label>
                <input type="date" value={equipmentForm.nextInspectionDate} onChange={e => setEquipmentForm({...equipmentForm, nextInspectionDate: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Calibration Status</label>
                <select value={equipmentForm.calibrationStatus} onChange={e => setEquipmentForm({...equipmentForm, calibrationStatus: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
                  <option>Valid</option><option>Pending</option><option>Expired</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Functional Status</label>
                <select value={equipmentForm.functionalStatus} onChange={e => setEquipmentForm({...equipmentForm, functionalStatus: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
                  <option>Operational</option><option>Needs Maintenance</option><option>Out of Order</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                <input type="text" value={equipmentForm.remarks} onChange={e => setEquipmentForm({...equipmentForm, remarks: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
            </div>
            <div className="px-4 py-3 border-t border-slate-200 flex justify-end gap-2">
              <button onClick={() => setIsEquipmentModalOpen(false)} className="px-3 py-2 bg-slate-100 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-slate-200">Cancel</button>
              <button onClick={() => {
                if(!equipmentForm.equipmentName) return alert('Name required');
                if(editingEquipmentId) setEquipments(prev => prev.map(r => r.id === editingEquipmentId ? equipmentForm : r));
                else setEquipments(prev => [...prev, equipmentForm]);
                setIsEquipmentModalOpen(false);
              }} className="px-3 py-2 bg-sky-500 rounded-xl text-[10px] font-bold text-white hover:bg-sky-600">Save</button>
            </div>
          </div>
        </div>
      )}

      {isChemicalModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="text-xs font-bold text-slate-800">{editingChemicalId ? 'Edit Chemical' : 'Add Chemical'}</h3>
              <button onClick={() => setIsChemicalModalOpen(false)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4 overflow-y-auto grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Chemical Name</label>
                <input type="text" value={chemicalForm.chemicalName} onChange={e => setChemicalForm({...chemicalForm, chemicalName: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Storage Location</label>
                <input type="text" value={chemicalForm.storageLocation} onChange={e => setChemicalForm({...chemicalForm, storageLocation: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Hazard Class</label>
                <input type="text" value={chemicalForm.hazardClass} onChange={e => setChemicalForm({...chemicalForm, hazardClass: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Quantity</label>
                <input type="text" value={chemicalForm.quantity} onChange={e => setChemicalForm({...chemicalForm, quantity: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Expiry Date</label>
                <input type="date" value={chemicalForm.expiryDate} onChange={e => setChemicalForm({...chemicalForm, expiryDate: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">MSDS Available</label>
                <select value={chemicalForm.msdsAvailable} onChange={e => setChemicalForm({...chemicalForm, msdsAvailable: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
                  <option>Yes</option><option>No</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Storage Compliance</label>
                <select value={chemicalForm.storageCompliance} onChange={e => setChemicalForm({...chemicalForm, storageCompliance: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
                  <option>Compliant</option><option>Non-Compliant</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                <input type="text" value={chemicalForm.remarks} onChange={e => setChemicalForm({...chemicalForm, remarks: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
            </div>
            <div className="px-4 py-3 border-t border-slate-200 flex justify-end gap-2">
              <button onClick={() => setIsChemicalModalOpen(false)} className="px-3 py-2 bg-slate-100 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-slate-200">Cancel</button>
              <button onClick={() => {
                if(!chemicalForm.chemicalName) return alert('Name required');
                if(editingChemicalId) setChemicals(prev => prev.map(r => r.id === editingChemicalId ? chemicalForm : r));
                else setChemicals(prev => [...prev, chemicalForm]);
                setIsChemicalModalOpen(false);
              }} className="px-3 py-2 bg-sky-500 rounded-xl text-[10px] font-bold text-white hover:bg-sky-600">Save</button>
            </div>
          </div>
        </div>
      )}

      {isWasteModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="text-xs font-bold text-slate-800">{editingWasteId ? 'Edit Waste Record' : 'Add Waste Record'}</h3>
              <button onClick={() => setIsWasteModalOpen(false)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4 overflow-y-auto grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Waste Category</label>
                <input type="text" value={wasteForm.wasteCategory} onChange={e => setWasteForm({...wasteForm, wasteCategory: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Collection Date</label>
                <input type="date" value={wasteForm.collectionDate} onChange={e => setWasteForm({...wasteForm, collectionDate: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Disposal Method</label>
                <input type="text" value={wasteForm.disposalMethod} onChange={e => setWasteForm({...wasteForm, disposalMethod: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Quantity</label>
                <input type="text" value={wasteForm.quantity} onChange={e => setWasteForm({...wasteForm, quantity: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Responsible Staff</label>
                <input type="text" value={wasteForm.responsibleStaff} onChange={e => setWasteForm({...wasteForm, responsibleStaff: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Disposal Status</label>
                <select value={wasteForm.disposalStatus} onChange={e => setWasteForm({...wasteForm, disposalStatus: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
                  <option>Pending</option><option>Completed</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                <input type="text" value={wasteForm.remarks} onChange={e => setWasteForm({...wasteForm, remarks: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
            </div>
            <div className="px-4 py-3 border-t border-slate-200 flex justify-end gap-2">
              <button onClick={() => setIsWasteModalOpen(false)} className="px-3 py-2 bg-slate-100 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-slate-200">Cancel</button>
              <button onClick={() => {
                if(!wasteForm.wasteCategory) return alert('Category required');
                if(editingWasteId) setWastes(prev => prev.map(r => r.id === editingWasteId ? wasteForm : r));
                else setWastes(prev => [...prev, wasteForm]);
                setIsWasteModalOpen(false);
              }} className="px-3 py-2 bg-sky-500 rounded-xl text-[10px] font-bold text-white hover:bg-sky-600">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaboratorySafetyWorkspace;

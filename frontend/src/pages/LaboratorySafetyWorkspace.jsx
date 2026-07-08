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
const LS_KEY_SPECIMEN = 'laboratory_specimen_handling';
const LS_KEY_PPE = 'laboratory_ppe_compliance';
const LS_KEY_TRAINING = 'laboratory_training_records';
const LS_KEY_INCIDENT = 'laboratory_incidents';
const LS_KEY_AUDIT = 'laboratory_internal_audits';
const LS_KEY_CAPA = 'laboratory_capa_records';

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

  const [specimens, setSpecimens] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_SPECIMEN);
    return saved ? JSON.parse(saved) : [
      { id: 'SP-001', patientId: 'P-1001', specimenType: 'Blood', collectionArea: 'OPD Phlebotomy', collectionDateTime: '2026-07-01T08:00', transportCondition: 'Room Temp', receivedBy: 'John Doe', specimenStatus: 'Accepted', remarks: 'Normal' },
      { id: 'SP-002', patientId: 'P-1002', specimenType: 'Urine', collectionArea: 'Ward A', collectionDateTime: '2026-07-02T09:30', transportCondition: 'Room Temp', receivedBy: 'Jane Smith', specimenStatus: 'Accepted', remarks: '' },
      { id: 'SP-003', patientId: 'P-1003', specimenType: 'Sputum', collectionArea: 'Ward B', collectionDateTime: '2026-07-03T10:15', transportCondition: 'Refrigerated', receivedBy: 'Alice Smith', specimenStatus: 'Accepted', remarks: '' },
      { id: 'SP-004', patientId: 'P-1004', specimenType: 'Blood', collectionArea: 'ICU', collectionDateTime: '2026-07-04T11:45', transportCondition: 'Room Temp', receivedBy: 'Bob Jones', specimenStatus: 'Rejected', remarks: 'Hemolyzed' },
      { id: 'SP-005', patientId: 'P-1005', specimenType: 'CSF', collectionArea: 'OT', collectionDateTime: '2026-07-05T14:20', transportCondition: 'STAT', receivedBy: 'Sarah Connor', specimenStatus: 'Accepted', remarks: 'Urgent' },
    ];
  });
  const [isSpecimenModalOpen, setIsSpecimenModalOpen] = useState(false);
  const [editingSpecimenId, setEditingSpecimenId] = useState(null);
  const [specimenForm, setSpecimenForm] = useState({ id: '', patientId: '', specimenType: 'Blood', collectionArea: '', collectionDateTime: '', transportCondition: 'Room Temp', receivedBy: '', specimenStatus: 'Accepted', remarks: '' });
  const [specimenSearch, setSpecimenSearch] = useState('');

  const [ppeRecords, setPpeRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_PPE);
    return saved ? JSON.parse(saved) : [
      { id: 'PPE-001', employeeName: 'John Doe', department: 'Hematology', ppeType: 'Gloves & Lab Coat', complianceStatus: 'Compliant', inspectionDate: '2026-07-01', inspector: 'Alice Smith', remarks: '' },
      { id: 'PPE-002', employeeName: 'Jane Smith', department: 'Microbiology', ppeType: 'N95 & Face Shield', complianceStatus: 'Compliant', inspectionDate: '2026-07-02', inspector: 'Alice Smith', remarks: '' },
      { id: 'PPE-003', employeeName: 'Bob Jones', department: 'Clinical Biochemistry', ppeType: 'Safety Goggles', complianceStatus: 'Non-Compliant', inspectionDate: '2026-07-03', inspector: 'Alice Smith', remarks: 'Not wearing goggles' },
      { id: 'PPE-004', employeeName: 'Sarah Connor', department: 'Histopathology', ppeType: 'Respirator', complianceStatus: 'Compliant', inspectionDate: '2026-07-04', inspector: 'Alice Smith', remarks: '' },
      { id: 'PPE-005', employeeName: 'Eve Davis', department: 'Blood Bank', ppeType: 'Gloves & Lab Coat', complianceStatus: 'Compliant', inspectionDate: '2026-07-05', inspector: 'Alice Smith', remarks: '' },
    ];
  });
  const [isPpeModalOpen, setIsPpeModalOpen] = useState(false);
  const [editingPpeId, setEditingPpeId] = useState(null);
  const [ppeForm, setPpeForm] = useState({ id: '', employeeName: '', department: 'Hematology', ppeType: 'Gloves & Lab Coat', complianceStatus: 'Compliant', inspectionDate: '', inspector: '', remarks: '' });
  const [ppeSearch, setPpeSearch] = useState('');

  const [trainings, setTrainings] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_TRAINING);
    return saved ? JSON.parse(saved) : [
      { id: 'LT-001', employeeName: 'John Doe', department: 'Hematology', trainingTopic: 'Biosafety Cabinet Usage', trainer: 'Dr. Banner', trainingDate: '2026-01-15', validUntil: '2027-01-15', competencyStatus: 'Competent', remarks: '' },
      { id: 'LT-002', employeeName: 'Jane Smith', department: 'Microbiology', trainingTopic: 'Spill Management', trainer: 'Dr. Banner', trainingDate: '2026-02-20', validUntil: '2027-02-20', competencyStatus: 'Competent', remarks: '' },
      { id: 'LT-003', employeeName: 'Bob Jones', department: 'Clinical Biochemistry', trainingTopic: 'Chemical Handling', trainer: 'Alice Smith', trainingDate: '2026-03-10', validUntil: '2027-03-10', competencyStatus: 'Pending', remarks: 'Needs practical test' },
      { id: 'LT-004', employeeName: 'Sarah Connor', department: 'Histopathology', trainingTopic: 'Formalin Safety', trainer: 'Alice Smith', trainingDate: '2026-04-05', validUntil: '2027-04-05', competencyStatus: 'Competent', remarks: '' },
      { id: 'LT-005', employeeName: 'Eve Davis', department: 'Blood Bank', trainingTopic: 'Bloodborne Pathogens', trainer: 'Dr. Banner', trainingDate: '2026-05-12', validUntil: '2027-05-12', competencyStatus: 'Competent', remarks: '' },
    ];
  });
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);
  const [editingTrainingId, setEditingTrainingId] = useState(null);
  const [trainingForm, setTrainingForm] = useState({ id: '', employeeName: '', department: 'Hematology', trainingTopic: '', trainer: '', trainingDate: '', validUntil: '', competencyStatus: 'Competent', remarks: '' });
  const [trainingSearch, setTrainingSearch] = useState('');

  React.useEffect(() => { localStorage.setItem(LS_KEY_SPECIMEN, JSON.stringify(specimens)); }, [specimens]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_PPE, JSON.stringify(ppeRecords)); }, [ppeRecords]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_TRAINING, JSON.stringify(trainings)); }, [trainings]);

  const [incidents, setIncidents] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_INCIDENT);
    return saved ? JSON.parse(saved) : [
      { id: 'IN-001', incidentDate: '2026-06-15', incidentType: 'Chemical Spill', severity: 'High', location: 'Clinical Biochemistry', description: 'Sulfuric acid spill during reagent preparation – 200ml on bench surface', actionTaken: 'Spill kit deployed, area neutralized with sodium bicarbonate, bench decontaminated', responsibleStaff: 'Dr. Sarah Connor', followUpDate: '2026-06-22', followUpStatus: 'Closed', remarks: 'SOP review completed' },
      { id: 'IN-002', incidentDate: '2026-06-20', incidentType: 'Needlestick Injury', severity: 'Critical', location: 'Specimen Collection', description: 'Phlebotomist sustained needlestick from used butterfly needle during disposal', actionTaken: 'Wound washed, PEP initiated, source patient blood drawn for testing', responsibleStaff: 'John Doe', followUpDate: '2026-07-20', followUpStatus: 'Open', remarks: 'Awaiting 4-week serology results' },
      { id: 'IN-003', incidentDate: '2026-06-28', incidentType: 'Equipment Failure', severity: 'Medium', location: 'Hematology', description: 'Centrifuge rotor imbalance caused tube breakage – potential aerosol exposure', actionTaken: 'Lab evacuated for 30 mins, BSC used for cleanup, maintenance called', responsibleStaff: 'Jane Smith', followUpDate: '2026-07-05', followUpStatus: 'Closed', remarks: 'Centrifuge recalibrated' },
      { id: 'IN-004', incidentDate: '2026-07-01', incidentType: 'Biological Exposure', severity: 'High', location: 'Microbiology', description: 'Culture plate dropped outside BSC – potential TB aerosol release', actionTaken: 'Room sealed, UV decontamination run, staff screened', responsibleStaff: 'Dr. Bruce Banner', followUpDate: '2026-07-15', followUpStatus: 'Open', remarks: 'Staff TST testing scheduled' },
      { id: 'IN-005', incidentDate: '2026-07-03', incidentType: 'Fire Incident', severity: 'Low', location: 'Histopathology', description: 'Minor electrical spark from aging tissue processor – no flame produced', actionTaken: 'Equipment unplugged, electrician called, fire extinguisher on standby', responsibleStaff: 'Alice Johnson', followUpDate: '2026-07-10', followUpStatus: 'Open', remarks: 'Replacement processor ordered' },
    ];
  });
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
  const [editingIncidentId, setEditingIncidentId] = useState(null);
  const [incidentForm, setIncidentForm] = useState({ id: '', incidentDate: '', incidentType: 'Chemical Spill', severity: 'Low', location: '', description: '', actionTaken: '', responsibleStaff: '', followUpDate: '', followUpStatus: 'Open', remarks: '' });
  const [incidentSearch, setIncidentSearch] = useState('');

  const [audits, setAudits] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_AUDIT);
    return saved ? JSON.parse(saved) : [
      { id: 'LA-001', auditDate: '2026-01-10', laboratoryArea: 'Microbiology', auditType: 'Routine Safety', auditor: 'Safety Officer', complianceScore: 85, findings: 'Minor issues with waste segregation', observation: 'Sharps container overfilled', status: 'Completed', followUpDate: '2026-01-20', remarks: 'Addressed immediately' },
      { id: 'LA-002', auditDate: '2026-02-15', laboratoryArea: 'Clinical Biochemistry', auditType: 'Chemical Safety', auditor: 'External Auditor', complianceScore: 92, findings: 'Excellent chemical storage', observation: 'All MSDS available and up to date', status: 'Completed', followUpDate: '', remarks: '' },
      { id: 'LA-003', auditDate: '2026-03-05', laboratoryArea: 'Hematology', auditType: 'Equipment Maintenance', auditor: 'Biomedical Eng', complianceScore: 78, findings: 'Some equipment past calibration date', observation: 'Centrifuge #2 needs urgent calibration', status: 'Pending Follow-up', followUpDate: '2026-03-15', remarks: 'Vendor contacted' },
      { id: 'LA-004', auditDate: '2026-04-20', laboratoryArea: 'Specimen Collection', auditType: 'Infection Control', auditor: 'Infection Control Nurse', complianceScore: 88, findings: 'Good hand hygiene practices', observation: 'Some staff wearing jewelry', status: 'Completed', followUpDate: '2026-05-01', remarks: 'Memo sent to staff' },
      { id: 'LA-005', auditDate: '2026-05-12', laboratoryArea: 'Histopathology', auditType: 'Fire Safety', auditor: 'Fire Marshal', complianceScore: 95, findings: 'Fire exits clear', observation: 'Extinguishers inspected recently', status: 'Completed', followUpDate: '', remarks: '' },
    ];
  });
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [editingAuditId, setEditingAuditId] = useState(null);
  const [auditForm, setAuditForm] = useState({ id: '', auditDate: '', laboratoryArea: 'Microbiology', auditType: 'Routine Safety', auditor: '', complianceScore: 100, findings: '', observation: '', status: 'Pending', followUpDate: '', remarks: '' });
  const [auditSearch, setAuditSearch] = useState('');

  const [capas, setCapas] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_CAPA);
    return saved ? JSON.parse(saved) : [
      { id: 'CAPA-001', auditId: 'LA-001', observation: 'Sharps container overfilled', rootCause: 'Staff negligence', correctiveAction: 'Empty container immediately', preventiveAction: 'Retrain staff on waste management', responsiblePerson: 'Lab Manager', targetDate: '2026-01-15', completionDate: '2026-01-12', status: 'Closed', remarks: 'Resolved quickly' },
      { id: 'CAPA-002', auditId: 'LA-003', observation: 'Centrifuge #2 needs urgent calibration', rootCause: 'Vendor delay', correctiveAction: 'Schedule immediate calibration', preventiveAction: 'Set automated reminders 1 month before due date', responsiblePerson: 'Equipment Manager', targetDate: '2026-03-20', completionDate: '', status: 'Open', remarks: 'Awaiting vendor' },
      { id: 'CAPA-003', auditId: 'LA-004', observation: 'Some staff wearing jewelry', rootCause: 'Lack of awareness', correctiveAction: 'Verbal warning to staff', preventiveAction: 'Include jewelry policy in monthly meeting', responsiblePerson: 'HR', targetDate: '2026-05-01', completionDate: '2026-05-01', status: 'Closed', remarks: 'Memo circulated' },
      { id: 'CAPA-004', auditId: 'IN-002', observation: 'Needlestick Injury', rootCause: 'Improper disposal technique', correctiveAction: 'Review PEP protocol', preventiveAction: 'Procure safety engineered needles', responsiblePerson: 'Safety Officer', targetDate: '2026-08-01', completionDate: '', status: 'Open', remarks: 'Budget approved for new needles' },
      { id: 'CAPA-005', auditId: 'IN-004', observation: 'Culture plate dropped', rootCause: 'Rushed work', correctiveAction: 'Decontaminate area', preventiveAction: 'Review workload and staffing levels', responsiblePerson: 'Lab Director', targetDate: '2026-08-15', completionDate: '', status: 'Open', remarks: 'Review ongoing' },
    ];
  });
  const [isCapaModalOpen, setIsCapaModalOpen] = useState(false);
  const [editingCapaId, setEditingCapaId] = useState(null);
  const [capaForm, setCapaForm] = useState({ id: '', auditId: '', observation: '', rootCause: '', correctiveAction: '', preventiveAction: '', responsiblePerson: '', targetDate: '', completionDate: '', status: 'Open', remarks: '' });
  const [capaSearch, setCapaSearch] = useState('');

  React.useEffect(() => { localStorage.setItem(LS_KEY_INCIDENT, JSON.stringify(incidents)); }, [incidents]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_AUDIT, JSON.stringify(audits)); }, [audits]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_CAPA, JSON.stringify(capas)); }, [capas]);

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
      <div className="space-y-5">
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
              <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
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
            className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Risk ID', 'Area', 'Hazard', 'Score', 'Level', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-4 py-3 font-semibold text-slate-700">{r.laboratoryArea}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-700">{r.hazardCategory}</p>
                      <p className="text-slate-500 truncate max-w-[150px]" title={r.hazardDescription}>{r.hazardDescription}</p>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-700">{r.riskScore}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-[9px] font-bold ${
                        r.riskLevel === 'High' ? 'bg-rose-50 text-rose-700' :
                        r.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-700' :
                        'bg-emerald-50 text-emerald-700'
                      }`}>
                        {r.riskLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-[9px] font-bold ${
                        r.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                        'bg-rose-50 text-rose-700'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
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
      <div className="space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
              <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
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
                    <th key={h} className="px-4 py-2 text-left font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {eqFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-2 font-mono text-slate-500">{r.id}</td>
                    <td className="px-4 py-2 font-semibold text-slate-700">{r.equipmentName}</td>
                    <td className="px-4 py-2 text-slate-600">{r.department}</td>
                    <td className="px-4 py-2 text-slate-600">{r.inspectionDate}</td>
                    <td className="px-4 py-2 text-slate-600">{r.nextInspectionDate}</td>
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
                    <th key={h} className="px-4 py-2 text-left font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {chFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-2 font-mono text-slate-500">{r.id}</td>
                    <td className="px-4 py-2 font-semibold text-slate-700">{r.chemicalName}</td>
                    <td className="px-4 py-2 text-slate-600">{r.storageLocation}</td>
                    <td className="px-4 py-2 text-slate-600">{r.hazardClass}</td>
                    <td className="px-4 py-2 text-slate-600">{r.quantity}</td>
                    <td className="px-4 py-2 text-slate-600">{r.expiryDate}</td>
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
                    <th key={h} className="px-4 py-2 text-left font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {wsFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-2 font-mono text-slate-500">{r.id}</td>
                    <td className="px-3 py-2 font-semibold text-slate-700">{r.wasteCategory}</td>
                    <td className="px-4 py-2 text-slate-600">{r.collectionDate}</td>
                    <td className="px-4 py-2 text-slate-600">{r.disposalMethod}</td>
                    <td className="px-4 py-2 text-slate-600">{r.quantity}</td>
                    <td className="px-4 py-2 text-slate-600">{r.responsibleStaff}</td>
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

  const renderInternalAudit = () => {
    const aFiltered = audits.filter(r => r.laboratoryArea.toLowerCase().includes(auditSearch.toLowerCase()) || r.auditType.toLowerCase().includes(auditSearch.toLowerCase()) || r.auditor.toLowerCase().includes(auditSearch.toLowerCase()));
    const cFiltered = capas.filter(r => r.auditId.toLowerCase().includes(capaSearch.toLowerCase()) || r.observation.toLowerCase().includes(capaSearch.toLowerCase()) || r.responsiblePerson.toLowerCase().includes(capaSearch.toLowerCase()));

    const totalAudits = audits.length;
    const completedAudits = audits.filter(r => r.status === 'Completed').length;
    const pendingAudits = audits.filter(r => r.status !== 'Completed').length;
    const avgCompliance = totalAudits ? Math.round(audits.reduce((sum, r) => sum + r.complianceScore, 0) / totalAudits) : 0;
    
    const openCapas = capas.filter(r => r.status === 'Open').length;
    const closedCapas = capas.filter(r => r.status === 'Closed').length;
    
    const auditsWithFollowup = audits.filter(r => r.followUpDate !== '').length;
    const closedCapasWithAudit = capas.filter(c => c.status === 'Closed').length; // approximation for follow-up compliance
    const followUpCompliance = capas.length ? Math.round((closedCapas / capas.length) * 100) : 0;
    
    const overallScore = Math.round((avgCompliance + (followUpCompliance || avgCompliance)) / 2);

    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Laboratory Internal Audit & CAPA</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Manage safety audits, inspections, and corrective & preventive actions</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Audits', value: totalAudits, color: 'text-blue-600' },
            { label: 'Completed Audits', value: completedAudits, color: 'text-emerald-600' },
            { label: 'Pending Audits', value: pendingAudits, color: 'text-amber-600' },
            { label: 'Avg Audit Compliance %', value: `${avgCompliance}%`, color: 'text-sky-600' },
            { label: 'Open CAPAs', value: openCapas, color: 'text-rose-600' },
            { label: 'Closed CAPAs', value: closedCapas, color: 'text-emerald-600' },
            { label: 'Follow-up Compliance %', value: `${followUpCompliance}%`, color: 'text-indigo-600' },
            { label: 'Overall Safety Audit Score', value: `${overallScore}%`, color: 'text-violet-600' },
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Audits Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800">Internal Audit Register</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search audits..."
                  value={auditSearch}
                  onChange={(e) => setAuditSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-[10px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <button
                onClick={() => {
                  const maxId = audits.reduce((max, r) => Math.max(max, parseInt(r.id.split('-')[1], 10)), 0);
                  setAuditForm({ id: `LA-${String(maxId + 1).padStart(3, '0')}`, auditDate: '', laboratoryArea: 'Microbiology', auditType: 'Routine Safety', auditor: '', complianceScore: 100, findings: '', observation: '', status: 'Pending', followUpDate: '', remarks: '' });
                  setEditingAuditId(null);
                  setIsAuditModalOpen(true);
                }}
                className="px-3 py-1.5 bg-sky-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-sky-600"
              >
                <Plus className="w-3.5 h-3.5" /> New Audit
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Audit ID', 'Date', 'Area', 'Type', 'Auditor', 'Score', 'Status', 'Follow-up Date', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-2 text-left font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {aFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-2 font-mono text-slate-500">{r.id}</td>
                    <td className="px-4 py-2 text-slate-600">{r.auditDate}</td>
                    <td className="px-3 py-2 font-semibold text-slate-700">{r.laboratoryArea}</td>
                    <td className="px-4 py-2 text-slate-600">{r.auditType}</td>
                    <td className="px-4 py-2 text-slate-600">{r.auditor}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded-full font-bold ${r.complianceScore >= 90 ? 'bg-emerald-50 text-emerald-700' : r.complianceScore >= 75 ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>
                        {r.complianceScore}%
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded-full font-bold ${r.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{r.status}</span>
                    </td>
                    <td className="px-3 py-2 text-slate-600">{r.followUpDate}</td>
                    <td className="px-3 py-2 flex gap-2">
                      <button onClick={() => { setAuditForm(r); setEditingAuditId(r.id); setIsAuditModalOpen(true); }} className="text-slate-400 hover:text-sky-600"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => { if(window.confirm('Delete this audit?')) setAudits(prev => prev.filter(x => x.id !== r.id)) }} className="text-slate-400 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
                {aFiltered.length === 0 && <tr><td colSpan="9" className="px-3 py-4 text-center text-slate-500">No audits found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {/* CAPA Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800">CAPA Tracker</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search CAPAs..."
                  value={capaSearch}
                  onChange={(e) => setCapaSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-[10px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <button
                onClick={() => {
                  const maxId = capas.reduce((max, r) => Math.max(max, parseInt(r.id.split('-')[1], 10)), 0);
                  setCapaForm({ id: `CAPA-${String(maxId + 1).padStart(3, '0')}`, auditId: '', observation: '', rootCause: '', correctiveAction: '', preventiveAction: '', responsiblePerson: '', targetDate: '', completionDate: '', status: 'Open', remarks: '' });
                  setEditingCapaId(null);
                  setIsCapaModalOpen(true);
                }}
                className="px-3 py-1.5 bg-rose-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-rose-600"
              >
                <Plus className="w-3.5 h-3.5" /> New CAPA
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['CAPA ID', 'Source ID', 'Observation', 'Responsible', 'Target Date', 'Completion Date', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-2 text-left font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-2 font-mono text-slate-500">{r.id}</td>
                    <td className="px-4 py-2 font-mono text-slate-500">{r.auditId}</td>
                    <td className="px-4 py-2 text-slate-700 truncate max-w-[150px]" title={r.observation}>{r.observation}</td>
                    <td className="px-3 py-2 text-slate-600">{r.responsiblePerson}</td>
                    <td className="px-4 py-2 text-slate-600">{r.targetDate}</td>
                    <td className="px-4 py-2 text-slate-600">{r.completionDate}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded-full font-bold ${r.status === 'Closed' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{r.status}</span>
                    </td>
                    <td className="px-3 py-2 flex gap-2">
                      <button onClick={() => { setCapaForm(r); setEditingCapaId(r.id); setIsCapaModalOpen(true); }} className="text-slate-400 hover:text-sky-600"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => { if(window.confirm('Delete this CAPA?')) setCapas(prev => prev.filter(x => x.id !== r.id)) }} className="text-slate-400 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
                {cFiltered.length === 0 && <tr><td colSpan="8" className="px-3 py-4 text-center text-slate-500">No CAPA records found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderIncidentManagement = () => {
    const filtered = incidents.filter(r =>
      r.incidentType.toLowerCase().includes(incidentSearch.toLowerCase()) ||
      r.location.toLowerCase().includes(incidentSearch.toLowerCase()) ||
      r.severity.toLowerCase().includes(incidentSearch.toLowerCase()) ||
      r.followUpStatus.toLowerCase().includes(incidentSearch.toLowerCase())
    );

    const totalIncidents = incidents.length;
    const openIncidents = incidents.filter(r => r.followUpStatus === 'Open').length;
    const closedIncidents = incidents.filter(r => r.followUpStatus === 'Closed').length;
    const criticalCount = incidents.filter(r => r.severity === 'Critical').length;
    const highCount = incidents.filter(r => r.severity === 'High').length;
    const mediumCount = incidents.filter(r => r.severity === 'Medium').length;
    const lowCount = incidents.filter(r => r.severity === 'Low').length;
    const closureRate = totalIncidents ? Math.round((closedIncidents / totalIncidents) * 100) : 0;

    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Incident & Emergency Management Register</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Track and manage laboratory incidents, exposures, spills, and emergency events</p>
          </div>
          <button
            onClick={() => {
              const maxId = incidents.reduce((max, r) => Math.max(max, parseInt(r.id.split('-')[1], 10)), 0);
              setIncidentForm({ id: `IN-${String(maxId + 1).padStart(3, '0')}`, incidentDate: '', incidentType: 'Chemical Spill', severity: 'Low', location: '', description: '', actionTaken: '', responsibleStaff: '', followUpDate: '', followUpStatus: 'Open', remarks: '' });
              setEditingIncidentId(null);
              setIsIncidentModalOpen(true);
            }}
            style={{ backgroundColor: hospital?.themeColor || '#0ea5e9' }}
            className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Report Incident
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Incidents', value: totalIncidents, color: 'text-blue-600' },
            { label: 'Open Incidents', value: openIncidents, color: 'text-rose-600' },
            { label: 'Closed Incidents', value: closedIncidents, color: 'text-emerald-600' },
            { label: 'Critical Severity', value: criticalCount, color: 'text-red-700' },
            { label: 'High Severity', value: highCount, color: 'text-orange-600' },
            { label: 'Medium Severity', value: mediumCount, color: 'text-amber-600' },
            { label: 'Low Severity', value: lowCount, color: 'text-emerald-600' },
            { label: 'Closure Rate %', value: `${closureRate}%`, color: 'text-sky-600' },
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search incidents by type, location, severity, or status..."
            value={incidentSearch}
            onChange={(e) => setIncidentSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Incident ID', 'Date', 'Type', 'Severity', 'Location', 'Description', 'Responsible', 'Follow-Up', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                    <td className="px-4 py-3 text-slate-600">{r.incidentDate}</td>
                    <td className="px-4 py-3 font-semibold text-slate-700">{r.incidentType}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-[9px] font-bold ${
                        r.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                        r.severity === 'High' ? 'bg-orange-50 text-orange-700' :
                        r.severity === 'Medium' ? 'bg-amber-50 text-amber-700' :
                        'bg-emerald-50 text-emerald-700'
                      }`}>
                        {r.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{r.location}</td>
                    <td className="px-4 py-3">
                      <p className="text-slate-500 truncate max-w-[150px]" title={r.description}>{r.description}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{r.responsibleStaff}</td>
                    <td className="px-4 py-3 text-slate-600">{r.followUpDate}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-[9px] font-bold ${
                        r.followUpStatus === 'Closed' ? 'bg-emerald-50 text-emerald-700' :
                        'bg-rose-50 text-rose-700'
                      }`}>
                        {r.followUpStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setIncidentForm(r); setEditingIncidentId(r.id); setIsIncidentModalOpen(true); }}
                          className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => { if (window.confirm('Delete this incident record?')) setIncidents(prev => prev.filter(item => item.id !== r.id)); }}
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
                    <td colSpan="10" className="px-3 py-8 text-center text-slate-500 font-medium">
                      No incident records found.
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

  const renderSpecimenTraining = () => {
    const spFiltered = specimens.filter(r => r.patientId.toLowerCase().includes(specimenSearch.toLowerCase()) || r.specimenType.toLowerCase().includes(specimenSearch.toLowerCase()));
    const ppeFiltered = ppeRecords.filter(r => r.employeeName.toLowerCase().includes(ppeSearch.toLowerCase()) || r.department.toLowerCase().includes(ppeSearch.toLowerCase()));
    const trFiltered = trainings.filter(r => r.employeeName.toLowerCase().includes(trainingSearch.toLowerCase()) || r.trainingTopic.toLowerCase().includes(trainingSearch.toLowerCase()));

    const totalSp = specimens.length;
    const acceptedSp = specimens.filter(r => r.specimenStatus === 'Accepted').length;
    const spAcceptance = totalSp ? Math.round((acceptedSp / totalSp) * 100) : 0;
    
    const totalPpe = ppeRecords.length;
    const ppeCompliance = totalPpe ? Math.round((ppeRecords.filter(r => r.complianceStatus === 'Compliant').length / totalPpe) * 100) : 0;
    
    const totalTr = trainings.length;
    const staffTrained = new Set(trainings.map(r => r.employeeName)).size;
    const compCompliance = totalTr ? Math.round((trainings.filter(r => r.competencyStatus === 'Competent').length / totalTr) * 100) : 0;
    
    const overallCompliance = Math.round((spAcceptance + ppeCompliance + compCompliance) / 3) || 0;

    return (
      <div className="space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Specimens', value: totalSp, color: 'text-blue-600' },
            { label: 'Properly Handled', value: acceptedSp, color: 'text-emerald-600' },
            { label: 'PPE Compliance %', value: `${ppeCompliance}%`, color: 'text-indigo-600' },
            { label: 'Total Training Sessions', value: totalTr, color: 'text-violet-600' },
            { label: 'Staff Trained', value: staffTrained, color: 'text-amber-600' },
            { label: 'Competency %', value: `${compCompliance}%`, color: 'text-emerald-600' },
            { label: 'Specimen Acceptance %', value: `${spAcceptance}%`, color: 'text-sky-600' },
            { label: 'Overall Compliance %', value: `${overallCompliance}%`, color: 'text-emerald-600' },
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Specimen Handling */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800">Specimen Handling Register</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search specimens..."
                  value={specimenSearch}
                  onChange={(e) => setSpecimenSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-[10px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <button
                onClick={() => {
                  const maxId = specimens.reduce((max, r) => Math.max(max, parseInt(r.id.split('-')[1], 10)), 0);
                  setSpecimenForm({ id: `SP-${String(maxId + 1).padStart(3, '0')}`, patientId: '', specimenType: 'Blood', collectionArea: '', collectionDateTime: '', transportCondition: 'Room Temp', receivedBy: '', specimenStatus: 'Accepted', remarks: '' });
                  setEditingSpecimenId(null);
                  setIsSpecimenModalOpen(true);
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
                  {['ID', 'Patient', 'Type', 'Area', 'Collected', 'Transport', 'Received By', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-2 text-left font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {spFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-2 font-mono text-slate-500">{r.id}</td>
                    <td className="px-3 py-2 font-semibold text-slate-700">{r.patientId}</td>
                    <td className="px-3 py-2 text-slate-600">{r.specimenType}</td>
                    <td className="px-3 py-2 text-slate-600">{r.collectionArea}</td>
                    <td className="px-3 py-2 text-slate-600">{r.collectionDateTime}</td>
                    <td className="px-3 py-2 text-slate-600">{r.transportCondition}</td>
                    <td className="px-3 py-2 text-slate-600">{r.receivedBy}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded-full font-bold ${r.specimenStatus === 'Accepted' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{r.specimenStatus}</span>
                    </td>
                    <td className="px-3 py-2 flex gap-2">
                      <button onClick={() => { setSpecimenForm(r); setEditingSpecimenId(r.id); setIsSpecimenModalOpen(true); }} className="text-slate-400 hover:text-sky-600"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => { if(window.confirm('Delete?')) setSpecimens(prev => prev.filter(x => x.id !== r.id)) }} className="text-slate-400 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
                {spFiltered.length === 0 && <tr><td colSpan="9" className="px-3 py-4 text-center text-slate-500">No specimens found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {/* PPE Compliance */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800">PPE Compliance Register</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search PPE records..."
                  value={ppeSearch}
                  onChange={(e) => setPpeSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-[10px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <button
                onClick={() => {
                  const maxId = ppeRecords.reduce((max, r) => Math.max(max, parseInt(r.id.split('-')[1], 10)), 0);
                  setPpeForm({ id: `PPE-${String(maxId + 1).padStart(3, '0')}`, employeeName: '', department: 'Hematology', ppeType: 'Gloves & Lab Coat', complianceStatus: 'Compliant', inspectionDate: '', inspector: '', remarks: '' });
                  setEditingPpeId(null);
                  setIsPpeModalOpen(true);
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
                  {['ID', 'Employee Name', 'Department', 'PPE Type', 'Compliance', 'Date', 'Inspector', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-2 text-left font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ppeFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-2 font-mono text-slate-500">{r.id}</td>
                    <td className="px-3 py-2 font-semibold text-slate-700">{r.employeeName}</td>
                    <td className="px-4 py-2 text-slate-600">{r.department}</td>
                    <td className="px-3 py-2 text-slate-600">{r.ppeType}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded-full font-bold ${r.complianceStatus === 'Compliant' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{r.complianceStatus}</span>
                    </td>
                    <td className="px-4 py-2 text-slate-600">{r.inspectionDate}</td>
                    <td className="px-4 py-2 text-slate-600">{r.inspector}</td>
                    <td className="px-3 py-2 flex gap-2">
                      <button onClick={() => { setPpeForm(r); setEditingPpeId(r.id); setIsPpeModalOpen(true); }} className="text-slate-400 hover:text-sky-600"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => { if(window.confirm('Delete?')) setPpeRecords(prev => prev.filter(x => x.id !== r.id)) }} className="text-slate-400 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
                {ppeFiltered.length === 0 && <tr><td colSpan="8" className="px-3 py-4 text-center text-slate-500">No PPE records found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {/* Training */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800">Laboratory Training Register</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search training..."
                  value={trainingSearch}
                  onChange={(e) => setTrainingSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-[10px] focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <button
                onClick={() => {
                  const maxId = trainings.reduce((max, r) => Math.max(max, parseInt(r.id.split('-')[1], 10)), 0);
                  setTrainingForm({ id: `LT-${String(maxId + 1).padStart(3, '0')}`, employeeName: '', department: 'Hematology', trainingTopic: '', trainer: '', trainingDate: '', validUntil: '', competencyStatus: 'Competent', remarks: '' });
                  setEditingTrainingId(null);
                  setIsTrainingModalOpen(true);
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
                  {['ID', 'Employee', 'Department', 'Topic', 'Trainer', 'Date', 'Valid Until', 'Competency', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-2 text-left font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {trFiltered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-2 font-mono text-slate-500">{r.id}</td>
                    <td className="px-3 py-2 font-semibold text-slate-700">{r.employeeName}</td>
                    <td className="px-4 py-2 text-slate-600">{r.department}</td>
                    <td className="px-3 py-2 text-slate-600">{r.trainingTopic}</td>
                    <td className="px-3 py-2 text-slate-600">{r.trainer}</td>
                    <td className="px-3 py-2 text-slate-600">{r.trainingDate}</td>
                    <td className="px-3 py-2 text-slate-600">{r.validUntil}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded-full font-bold ${r.competencyStatus === 'Competent' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{r.competencyStatus}</span>
                    </td>
                    <td className="px-3 py-2 flex gap-2">
                      <button onClick={() => { setTrainingForm(r); setEditingTrainingId(r.id); setIsTrainingModalOpen(true); }} className="text-slate-400 hover:text-sky-600"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => { if(window.confirm('Delete?')) setTrainings(prev => prev.filter(x => x.id !== r.id)) }} className="text-slate-400 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
                {trFiltered.length === 0 && <tr><td colSpan="9" className="px-3 py-4 text-center text-slate-500">No training records found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.title}</p>
            <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
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

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
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

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
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

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
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

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
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

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
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

  const renderReportsAnalytics = () => {
    const totalRiskAssessments = riskAssessments.length;
    const equipComp = equipments.length ? Math.round((equipments.filter(e => e.calibrationStatus === 'Valid').length / equipments.length) * 100) : 0;
    const chemComp = chemicals.length ? Math.round((chemicals.filter(c => c.storageCompliance === 'Compliant').length / chemicals.length) * 100) : 0;
    const ppeComp = ppeRecords.length ? Math.round((ppeRecords.filter(p => p.complianceStatus === 'Compliant').length / ppeRecords.length) * 100) : 0;
    const trainComp = trainings.length ? Math.round((trainings.filter(t => t.competencyStatus === 'Competent').length / trainings.length) * 100) : 0;
    const incRes = incidents.length ? Math.round((incidents.filter(i => i.followUpStatus === 'Closed').length / incidents.length) * 100) : 0;
    const auditComp = audits.length ? Math.round(audits.reduce((sum, a) => sum + a.complianceScore, 0) / audits.length) : 0;
    const overallScore = Math.round((equipComp + chemComp + ppeComp + trainComp + incRes + auditComp) / 6) || 0;

    const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    const riskCategories = riskAssessments.reduce((acc, r) => { acc[r.hazardCategory] = (acc[r.hazardCategory] || 0) + 1; return acc; }, {});
    const riskData = Object.keys(riskCategories).map(k => ({ name: k, value: riskCategories[k] }));

    const equipmentData = [
      { name: 'Compliant', value: equipments.filter(e => e.calibrationStatus === 'Valid').length },
      { name: 'Non-Compliant', value: equipments.filter(e => e.calibrationStatus !== 'Valid').length }
    ];

    const incidentStatus = incidents.reduce((acc, r) => { acc[r.followUpStatus] = (acc[r.followUpStatus] || 0) + 1; return acc; }, {});
    const incidentData = Object.keys(incidentStatus).map(k => ({ name: k, value: incidentStatus[k] }));

    const trainingPpeData = [
      { name: 'PPE', Compliant: ppeRecords.filter(p => p.complianceStatus === 'Compliant').length, NonCompliant: ppeRecords.filter(p => p.complianceStatus !== 'Compliant').length },
      { name: 'Training', Compliant: trainings.filter(t => t.competencyStatus === 'Competent').length, NonCompliant: trainings.filter(t => t.competencyStatus !== 'Competent').length }
    ];

    const auditData = audits.map(a => ({ name: a.id, compliance: a.complianceScore }));

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const tableData = months.map(m => ({
      month: m,
      risks: totalRiskAssessments,
      equip: equipComp,
      train: trainComp,
      incidents: incidents.length,
      audit: auditComp,
      overall: overallScore
    }));

    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Reports & Analytics</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Comprehensive view of laboratory safety performance and compliance metrics</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => alert("CSV Export placeholder")} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-[10px] font-bold hover:bg-slate-50 transition-colors">Export CSV</button>
            <button onClick={() => alert("PDF Export placeholder")} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-[10px] font-bold hover:bg-slate-50 transition-colors">Export PDF</button>
            <button onClick={() => alert("Print placeholder")} className="px-3 py-1.5 bg-sky-500 text-white rounded-lg text-[10px] font-bold hover:bg-sky-600 transition-colors">Print Report</button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Risk Assessments', value: totalRiskAssessments, color: 'text-blue-600' },
            { label: 'Equip. Compliance %', value: `${equipComp}%`, color: 'text-emerald-600' },
            { label: 'Chem. Compliance %', value: `${chemComp}%`, color: 'text-sky-600' },
            { label: 'PPE Compliance %', value: `${ppeComp}%`, color: 'text-indigo-600' },
            { label: 'Training Compliance %', value: `${trainComp}%`, color: 'text-amber-600' },
            { label: 'Incident Resolution %', value: `${incRes}%`, color: 'text-rose-600' },
            { label: 'Audit Compliance %', value: `${auditComp}%`, color: 'text-teal-600' },
            { label: 'Overall Performance %', value: `${overallScore}%`, color: 'text-violet-600' },
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-700 mb-4">1. Monthly Safety Trend</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyComplianceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                  <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="compliance" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-700 mb-4">2. Risk Category Distribution</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={riskData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                    {riskData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '9px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-700 mb-4">3. Equipment Compliance</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={equipmentData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                  <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-700 mb-4">4. Incident Status</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={incidentData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                    {incidentData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[(index+2) % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '9px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-700 mb-4">5. Training & PPE Compliance</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trainingPpeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                  <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '9px' }} />
                  <Bar dataKey="Compliant" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="NonCompliant" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="text-[10px] font-bold text-slate-700 mb-4">6. Audit Compliance Trend</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={auditData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                  <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="compliance" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
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
                  {['Month', 'Risk Assessments', 'Equipment Compliance %', 'Training Compliance %', 'Incidents', 'Audit Compliance %', 'Overall Performance %'].map((h) => (
                    <th key={h} className="px-4 py-2 text-left font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableData.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50/60">
                    <td className="px-3 py-2 font-semibold text-slate-700">{r.month}</td>
                    <td className="px-3 py-2 text-slate-600">{r.risks}</td>
                    <td className="px-3 py-2 text-slate-600">{r.equip}%</td>
                    <td className="px-3 py-2 text-slate-600">{r.train}%</td>
                    <td className="px-3 py-2 text-slate-600">{r.incidents}</td>
                    <td className="px-3 py-2 text-slate-600">{r.audit}%</td>
                    <td className="px-3 py-2 font-bold text-sky-600">{r.overall}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
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
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">Laboratory Safety</h2>
          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">
            Safety Management Module
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
            Laboratory Safety — Module
          </p>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto custom-scroll bg-slate-50/40 p-6">
        {activeTab === 'dashboard' ? (
          renderDashboard()
        ) : activeTab === 'risk_assessment' ? (
          renderRiskAssessment()
        ) : activeTab === 'equipment_chemical' ? (
          renderEquipmentChemical()
        ) : activeTab === 'specimen_training' ? (
          renderSpecimenTraining()
        ) : activeTab === 'incident_emergency' ? (
          renderIncidentManagement()
        ) : activeTab === 'internal_audit' ? (
          renderInternalAudit()
        ) : activeTab === 'reports' ? (
          renderReportsAnalytics()
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
            <p className="text-sm font-medium text-slate-500">Phase will be implemented in the next step.</p>
          </div>
        )}
      </main>

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

      {isSpecimenModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="text-xs font-bold text-slate-800">{editingSpecimenId ? 'Edit Specimen' : 'Add Specimen'}</h3>
              <button onClick={() => setIsSpecimenModalOpen(false)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4 overflow-y-auto grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient ID</label>
                <input type="text" value={specimenForm.patientId} onChange={e => setSpecimenForm({...specimenForm, patientId: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Specimen Type</label>
                <input type="text" value={specimenForm.specimenType} onChange={e => setSpecimenForm({...specimenForm, specimenType: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Collection Area</label>
                <input type="text" value={specimenForm.collectionArea} onChange={e => setSpecimenForm({...specimenForm, collectionArea: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Date & Time</label>
                <input type="datetime-local" value={specimenForm.collectionDateTime} onChange={e => setSpecimenForm({...specimenForm, collectionDateTime: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Transport Condition</label>
                <input type="text" value={specimenForm.transportCondition} onChange={e => setSpecimenForm({...specimenForm, transportCondition: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Received By</label>
                <input type="text" value={specimenForm.receivedBy} onChange={e => setSpecimenForm({...specimenForm, receivedBy: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Specimen Status</label>
                <select value={specimenForm.specimenStatus} onChange={e => setSpecimenForm({...specimenForm, specimenStatus: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
                  <option>Accepted</option><option>Rejected</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                <input type="text" value={specimenForm.remarks} onChange={e => setSpecimenForm({...specimenForm, remarks: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
            </div>
            <div className="px-4 py-3 border-t border-slate-200 flex justify-end gap-2">
              <button onClick={() => setIsSpecimenModalOpen(false)} className="px-3 py-2 bg-slate-100 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-slate-200">Cancel</button>
              <button onClick={() => {
                if(!specimenForm.patientId) return alert('Patient ID required');
                if(editingSpecimenId) setSpecimens(prev => prev.map(r => r.id === editingSpecimenId ? specimenForm : r));
                else setSpecimens(prev => [...prev, specimenForm]);
                setIsSpecimenModalOpen(false);
              }} className="px-3 py-2 bg-sky-500 rounded-xl text-[10px] font-bold text-white hover:bg-sky-600">Save</button>
            </div>
          </div>
        </div>
      )}

      {isPpeModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="text-xs font-bold text-slate-800">{editingPpeId ? 'Edit PPE Record' : 'Add PPE Record'}</h3>
              <button onClick={() => setIsPpeModalOpen(false)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4 overflow-y-auto grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Employee Name</label>
                <input type="text" value={ppeForm.employeeName} onChange={e => setPpeForm({...ppeForm, employeeName: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Department</label>
                <input type="text" value={ppeForm.department} onChange={e => setPpeForm({...ppeForm, department: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">PPE Type</label>
                <input type="text" value={ppeForm.ppeType} onChange={e => setPpeForm({...ppeForm, ppeType: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Inspection Date</label>
                <input type="date" value={ppeForm.inspectionDate} onChange={e => setPpeForm({...ppeForm, inspectionDate: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Inspector</label>
                <input type="text" value={ppeForm.inspector} onChange={e => setPpeForm({...ppeForm, inspector: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Compliance Status</label>
                <select value={ppeForm.complianceStatus} onChange={e => setPpeForm({...ppeForm, complianceStatus: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
                  <option>Compliant</option><option>Non-Compliant</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                <input type="text" value={ppeForm.remarks} onChange={e => setPpeForm({...ppeForm, remarks: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
            </div>
            <div className="px-4 py-3 border-t border-slate-200 flex justify-end gap-2">
              <button onClick={() => setIsPpeModalOpen(false)} className="px-3 py-2 bg-slate-100 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-slate-200">Cancel</button>
              <button onClick={() => {
                if(!ppeForm.employeeName) return alert('Employee Name required');
                if(editingPpeId) setPpeRecords(prev => prev.map(r => r.id === editingPpeId ? ppeForm : r));
                else setPpeRecords(prev => [...prev, ppeForm]);
                setIsPpeModalOpen(false);
              }} className="px-3 py-2 bg-sky-500 rounded-xl text-[10px] font-bold text-white hover:bg-sky-600">Save</button>
            </div>
          </div>
        </div>
      )}

      {isTrainingModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="text-xs font-bold text-slate-800">{editingTrainingId ? 'Edit Training Record' : 'Add Training Record'}</h3>
              <button onClick={() => setIsTrainingModalOpen(false)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4 overflow-y-auto grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Employee Name</label>
                <input type="text" value={trainingForm.employeeName} onChange={e => setTrainingForm({...trainingForm, employeeName: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Department</label>
                <input type="text" value={trainingForm.department} onChange={e => setTrainingForm({...trainingForm, department: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Training Topic</label>
                <input type="text" value={trainingForm.trainingTopic} onChange={e => setTrainingForm({...trainingForm, trainingTopic: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Trainer</label>
                <input type="text" value={trainingForm.trainer} onChange={e => setTrainingForm({...trainingForm, trainer: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Training Date</label>
                <input type="date" value={trainingForm.trainingDate} onChange={e => setTrainingForm({...trainingForm, trainingDate: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Valid Until</label>
                <input type="date" value={trainingForm.validUntil} onChange={e => setTrainingForm({...trainingForm, validUntil: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Competency Status</label>
                <select value={trainingForm.competencyStatus} onChange={e => setTrainingForm({...trainingForm, competencyStatus: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
                  <option>Competent</option><option>Pending</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                <input type="text" value={trainingForm.remarks} onChange={e => setTrainingForm({...trainingForm, remarks: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px]" />
              </div>
            </div>
            <div className="px-4 py-3 border-t border-slate-200 flex justify-end gap-2">
              <button onClick={() => setIsTrainingModalOpen(false)} className="px-3 py-2 bg-slate-100 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-slate-200">Cancel</button>
              <button onClick={() => {
                if(!trainingForm.employeeName) return alert('Employee Name required');
                if(editingTrainingId) setTrainings(prev => prev.map(r => r.id === editingTrainingId ? trainingForm : r));
                else setTrainings(prev => [...prev, trainingForm]);
                setIsTrainingModalOpen(false);
              }} className="px-3 py-2 bg-sky-500 rounded-xl text-[10px] font-bold text-white hover:bg-sky-600">Save</button>
            </div>
          </div>
        </div>
      )}

      {isIncidentModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="text-xs font-bold text-slate-800">
                {editingIncidentId ? 'Edit Incident Record' : 'Report New Incident'}
              </h3>
              <button onClick={() => setIsIncidentModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Incident Date</label>
                  <input type="date" value={incidentForm.incidentDate} onChange={e => setIncidentForm({...incidentForm, incidentDate: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Incident Type</label>
                  <select value={incidentForm.incidentType} onChange={e => setIncidentForm({...incidentForm, incidentType: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    {['Chemical Spill', 'Needlestick Injury', 'Biological Exposure', 'Equipment Failure', 'Fire Incident', 'Electrical Hazard', 'Slip/Trip/Fall', 'Radiation Exposure', 'Other'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Severity</label>
                  <select value={incidentForm.severity} onChange={e => setIncidentForm({...incidentForm, severity: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    {['Low', 'Medium', 'High', 'Critical'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Location</label>
                  <select value={incidentForm.location} onChange={e => setIncidentForm({...incidentForm, location: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    {['Specimen Collection', 'Hematology', 'Clinical Biochemistry', 'Microbiology', 'Blood Bank', 'Histopathology', 'Sample Receiving', 'Waste Storage'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Description</label>
                  <textarea rows="2" value={incidentForm.description} onChange={e => setIncidentForm({...incidentForm, description: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Describe the incident in detail" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Action Taken</label>
                  <textarea rows="2" value={incidentForm.actionTaken} onChange={e => setIncidentForm({...incidentForm, actionTaken: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Immediate actions taken" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Responsible Staff</label>
                  <input type="text" value={incidentForm.responsibleStaff} onChange={e => setIncidentForm({...incidentForm, responsibleStaff: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Follow-Up Date</label>
                  <input type="date" value={incidentForm.followUpDate} onChange={e => setIncidentForm({...incidentForm, followUpDate: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Follow-Up Status</label>
                  <select value={incidentForm.followUpStatus} onChange={e => setIncidentForm({...incidentForm, followUpStatus: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    <option>Open</option><option>Closed</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                  <input type="text" value={incidentForm.remarks} onChange={e => setIncidentForm({...incidentForm, remarks: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 border-t border-slate-200 flex justify-end gap-2 shrink-0">
              <button onClick={() => setIsIncidentModalOpen(false)} className="px-3 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
              <button
                onClick={() => {
                  if (!incidentForm.description || !incidentForm.responsibleStaff) {
                    alert('Please fill in required fields (Description, Responsible Staff).');
                    return;
                  }
                  if (editingIncidentId) {
                    setIncidents(prev => prev.map(r => r.id === editingIncidentId ? incidentForm : r));
                  } else {
                    setIncidents(prev => [...prev, incidentForm]);
                  }
                  setIsIncidentModalOpen(false);
                }}
                style={{ backgroundColor: hospital?.themeColor || '#0ea5e9' }}
                className="px-3 py-2 rounded-xl text-[10px] font-bold text-white hover:brightness-95 transition-all"
              >
                {editingIncidentId ? 'Save Changes' : 'Report Incident'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isAuditModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="text-xs font-bold text-slate-800">
                {editingAuditId ? 'Edit Internal Audit' : 'New Internal Audit'}
              </h3>
              <button onClick={() => setIsAuditModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Date</label>
                  <input type="date" value={auditForm.auditDate} onChange={e => setAuditForm({...auditForm, auditDate: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Laboratory Area</label>
                  <select value={auditForm.laboratoryArea} onChange={e => setAuditForm({...auditForm, laboratoryArea: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    {['Specimen Collection', 'Hematology', 'Clinical Biochemistry', 'Microbiology', 'Blood Bank', 'Histopathology', 'Sample Receiving', 'Waste Storage'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Type</label>
                  <select value={auditForm.auditType} onChange={e => setAuditForm({...auditForm, auditType: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    {['Routine Safety', 'Chemical Safety', 'Biological Safety', 'Fire Safety', 'Equipment Maintenance', 'Infection Control'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Auditor</label>
                  <input type="text" value={auditForm.auditor} onChange={e => setAuditForm({...auditForm, auditor: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Compliance %</label>
                  <input type="number" min="0" max="100" value={auditForm.complianceScore} onChange={e => setAuditForm({...auditForm, complianceScore: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                  <select value={auditForm.status} onChange={e => setAuditForm({...auditForm, status: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    <option>Completed</option><option>Pending Follow-up</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Observation</label>
                  <textarea rows="2" value={auditForm.observation} onChange={e => setAuditForm({...auditForm, observation: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Specific issues found" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Findings</label>
                  <textarea rows="2" value={auditForm.findings} onChange={e => setAuditForm({...auditForm, findings: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="General audit findings" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Follow-up Date</label>
                  <input type="date" value={auditForm.followUpDate} onChange={e => setAuditForm({...auditForm, followUpDate: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                  <input type="text" value={auditForm.remarks} onChange={e => setAuditForm({...auditForm, remarks: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 border-t border-slate-200 flex justify-end gap-2 shrink-0">
              <button onClick={() => setIsAuditModalOpen(false)} className="px-3 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
              <button
                onClick={() => {
                  if (!auditForm.auditor || !auditForm.auditDate) {
                    alert('Please fill in required fields (Date, Auditor).');
                    return;
                  }
                  if (editingAuditId) {
                    setAudits(prev => prev.map(r => r.id === editingAuditId ? auditForm : r));
                  } else {
                    setAudits(prev => [...prev, auditForm]);
                  }
                  setIsAuditModalOpen(false);
                }}
                className="px-3 py-2 rounded-xl text-[10px] font-bold text-white bg-sky-500 hover:bg-sky-600 transition-all"
              >
                {editingAuditId ? 'Save Changes' : 'Create Audit'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isCapaModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="text-xs font-bold text-slate-800">
                {editingCapaId ? 'Edit CAPA' : 'New CAPA'}
              </h3>
              <button onClick={() => setIsCapaModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Source ID (Audit/Incident)</label>
                  <input type="text" value={capaForm.auditId} onChange={e => setCapaForm({...capaForm, auditId: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="e.g. LA-001" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Responsible Person</label>
                  <input type="text" value={capaForm.responsiblePerson} onChange={e => setCapaForm({...capaForm, responsiblePerson: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Observation</label>
                  <textarea rows="2" value={capaForm.observation} onChange={e => setCapaForm({...capaForm, observation: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Root Cause</label>
                  <textarea rows="2" value={capaForm.rootCause} onChange={e => setCapaForm({...capaForm, rootCause: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Corrective Action</label>
                  <textarea rows="2" value={capaForm.correctiveAction} onChange={e => setCapaForm({...capaForm, correctiveAction: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Preventive Action</label>
                  <textarea rows="2" value={capaForm.preventiveAction} onChange={e => setCapaForm({...capaForm, preventiveAction: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Target Date</label>
                  <input type="date" value={capaForm.targetDate} onChange={e => setCapaForm({...capaForm, targetDate: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Completion Date</label>
                  <input type="date" value={capaForm.completionDate} onChange={e => setCapaForm({...capaForm, completionDate: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                  <select value={capaForm.status} onChange={e => setCapaForm({...capaForm, status: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    <option>Open</option><option>Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                  <input type="text" value={capaForm.remarks} onChange={e => setCapaForm({...capaForm, remarks: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 border-t border-slate-200 flex justify-end gap-2 shrink-0">
              <button onClick={() => setIsCapaModalOpen(false)} className="px-3 py-2 rounded-xl text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
              <button
                onClick={() => {
                  if (!capaForm.auditId || !capaForm.responsiblePerson) {
                    alert('Please fill in required fields (Source ID, Responsible Person).');
                    return;
                  }
                  if (editingCapaId) {
                    setCapas(prev => prev.map(r => r.id === editingCapaId ? capaForm : r));
                  } else {
                    setCapas(prev => [...prev, capaForm]);
                  }
                  setIsCapaModalOpen(false);
                }}
                className="px-3 py-2 rounded-xl text-[10px] font-bold text-white bg-rose-500 hover:bg-rose-600 transition-all"
              >
                {editingCapaId ? 'Save Changes' : 'Create CAPA'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaboratorySafetyWorkspace;

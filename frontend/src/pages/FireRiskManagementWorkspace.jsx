import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  ChevronLeft,
  LayoutDashboard,
  ClipboardList,
  ShieldCheck,
  Flame,
  AlertTriangle,
  ClipboardCheck,
  FileText,
  Plus,
  Edit3,
  Trash2,
  X,
  Search,
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

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const TABS = [
  { id: 'dashboard',    label: 'Dashboard',                         icon: LayoutDashboard },
  { id: 'assessment',   label: 'Fire Risk Assessment',              icon: ClipboardList },
  { id: 'equipment',    label: 'Fire Equipment Management',         icon: ShieldCheck },
  { id: 'training',     label: 'Fire Training & Evacuation',        icon: Flame },
  { id: 'incidents',    label: 'Fire Incidents & Emergency Response', icon: AlertTriangle },
  { id: 'audit',        label: 'Internal Audit',                    icon: ClipboardCheck },
  { id: 'reports',      label: 'Reports & Analytics',               icon: FileText },
];

const LS_KEY_DASHBOARD       = 'fire_dashboard_data';
const LS_KEY_RECENT_ACTIVITY = 'fire_recent_activity';
const LS_KEY_ASSESSMENTS     = 'fire_risk_assessments';

// ── Fire Risk Assessment constants ──
const ASSESSMENT_STATUSES = ['Open', 'In Progress', 'Completed', 'Closed'];
const RISK_AREAS = [
  'ICU', 'OT (Operation Theatre)', 'Electrical Room', 'Pharmacy',
  'Kitchen & Pantry', 'Server Room', 'Laundry', 'Store Room',
  'Generator Room', 'Laboratory', 'Radiology', 'Emergency Ward',
  'Corridor – Ground Floor', 'Corridor – First Floor', 'Other',
];

const getRiskCategory = (score) => {
  if (score <= 3) return 'Low';
  if (score <= 6) return 'Medium';
  return 'High';
};

const ASSESSMENT_SEED = [
  {
    id: 'fra-001',
    assessmentId: 'FRA-001',
    area: 'ICU',
    hazardIdentified: 'Overloaded electrical sockets near ventilators',
    probability: 2,
    severity: 3,
    riskScore: 6,
    riskCategory: 'Medium',
    existingControlMeasures: 'Regular visual inspection; dedicated circuit breakers installed',
    recommendedActions: 'Replace multi-sockets with hospital-grade power strips; add MCB protection',
    responsiblePerson: 'Electrical Supervisor Ramesh',
    targetCompletionDate: '2026-07-15',
    status: 'In Progress',
    remarks: 'Procurement initiated for hospital-grade strips',
  },
  {
    id: 'fra-002',
    assessmentId: 'FRA-002',
    area: 'OT (Operation Theatre)',
    hazardIdentified: 'Flammable anaesthetic gases stored near ignition source',
    probability: 1,
    severity: 3,
    riskScore: 3,
    riskCategory: 'Low',
    existingControlMeasures: 'Gas cylinders stored in ventilated area; No-smoking signage displayed',
    recommendedActions: 'Install gas leak detection sensor; conduct quarterly inspection',
    responsiblePerson: 'OT Nurse Manager Priya',
    targetCompletionDate: '2026-08-01',
    status: 'Open',
    remarks: 'Sensor procurement under approval',
  },
  {
    id: 'fra-003',
    assessmentId: 'FRA-003',
    area: 'Electrical Room',
    hazardIdentified: 'Exposed wiring and accumulation of combustible materials',
    probability: 3,
    severity: 3,
    riskScore: 9,
    riskCategory: 'High',
    existingControlMeasures: 'Room kept locked; quarterly electrical audit conducted',
    recommendedActions: 'Immediate re-wiring; install Class C fire extinguisher; restrict unauthorised entry',
    responsiblePerson: 'Facilities Manager Vijay',
    targetCompletionDate: '2026-07-05',
    status: 'In Progress',
    remarks: 'Priority task – escalated to management',
  },
  {
    id: 'fra-004',
    assessmentId: 'FRA-004',
    area: 'Pharmacy',
    hazardIdentified: 'Storage of flammable solvents without proper ventilation',
    probability: 2,
    severity: 2,
    riskScore: 4,
    riskCategory: 'Medium',
    existingControlMeasures: 'Solvents stored in metal cabinet; No open flame policy enforced',
    recommendedActions: 'Install exhaust ventilation fan; label all containers as flammable',
    responsiblePerson: 'Chief Pharmacist Anita',
    targetCompletionDate: '2026-07-20',
    status: 'Open',
    remarks: '',
  },
  {
    id: 'fra-005',
    assessmentId: 'FRA-005',
    area: 'Kitchen & Pantry',
    hazardIdentified: 'LPG cylinder leak risk and grease accumulation on exhaust hood',
    probability: 2,
    severity: 3,
    riskScore: 6,
    riskCategory: 'Medium',
    existingControlMeasures: 'Daily check of LPG connections; monthly exhaust cleaning schedule',
    recommendedActions: 'Install automatic gas shut-off valve; increase exhaust cleaning frequency to weekly',
    responsiblePerson: 'Kitchen Supervisor Meena',
    targetCompletionDate: '2026-07-10',
    status: 'Completed',
    remarks: 'Auto shut-off valve installed on 2026-06-28',
  },
];

// ── Phase 3: Fire Equipment constants ──
const LS_KEY_EXTINGUISHERS = 'fire_extinguishers';
const LS_KEY_HYDRANTS      = 'fire_hydrant_inspections';
const LS_KEY_ALARMS        = 'fire_alarm_devices';

const EXTINGUISHER_TYPES = ['Water', 'Foam', 'Dry Powder', 'CO2', 'Wet Chemical'];
const EQUIPMENT_STATUS   = ['Functional', 'Needs Repair', 'Out of Service'];
const GAUGE_STATUS       = ['Normal', 'Low Pressure', 'Overcharged'];
const SEAL_STATUS        = ['Intact', 'Broken', 'Missing'];
const CONDITION_STATUS   = ['Good', 'Fair', 'Poor', 'Damaged'];
const HYDRANT_PRESSURE   = ['Optimal', 'Low', 'High', 'Zero'];
const DEVICE_TYPES       = ['Smoke Detector', 'Heat Detector', 'Manual Call Point', 'Fire Bell', 'Strobe Light', 'Control Panel'];
const BATTERY_STATUS     = ['Good', 'Low', 'Replace', 'N/A'];
const TEST_RESULT        = ['Pass', 'Fail', 'Not Tested'];

const EXTINGUISHER_SEED = [
  { id: 'fe-001', equipmentId: 'FE-001', location: 'ICU Corridor', type: 'CO2', capacity: '4.5 kg', mfgDate: '2022-01-10', lastRefill: '2025-01-15', nextRefill: '2026-01-15', pressureGauge: 'Normal', seal: 'Intact', condition: 'Good', status: 'Functional', checkedBy: 'Safety Officer Raj', remarks: 'Routine check' },
  { id: 'fe-002', equipmentId: 'FE-002', location: 'Electrical Room', type: 'CO2', capacity: '2 kg', mfgDate: '2023-05-12', lastRefill: '2026-02-10', nextRefill: '2027-02-10', pressureGauge: 'Normal', seal: 'Intact', condition: 'Good', status: 'Functional', checkedBy: 'Safety Officer Raj', remarks: '' },
  { id: 'fe-003', equipmentId: 'FE-003', location: 'Kitchen', type: 'Wet Chemical', capacity: '6 L', mfgDate: '2021-11-20', lastRefill: '2024-11-20', nextRefill: '2025-11-20', pressureGauge: 'Low Pressure', seal: 'Broken', condition: 'Fair', status: 'Needs Repair', checkedBy: 'Safety Officer Raj', remarks: 'Sent for refill' },
  { id: 'fe-004', equipmentId: 'FE-004', location: 'Pharmacy', type: 'Dry Powder', capacity: '6 kg', mfgDate: '2024-03-05', lastRefill: '2025-03-05', nextRefill: '2026-03-05', pressureGauge: 'Normal', seal: 'Intact', condition: 'Good', status: 'Functional', checkedBy: 'Technician Amit', remarks: 'New installation' },
  { id: 'fe-005', equipmentId: 'FE-005', location: 'OT Corridor', type: 'Foam', capacity: '9 L', mfgDate: '2020-08-15', lastRefill: '2025-08-15', nextRefill: '2026-08-15', pressureGauge: 'Normal', seal: 'Intact', condition: 'Poor', status: 'Out of Service', checkedBy: 'Technician Amit', remarks: 'Body rusted, needs replacement' },
];

const HYDRANT_SEED = [
  { id: 'fh-001', inspectionId: 'FH-001', location: 'Main Entrance', pressure: 'Optimal', hoseCondition: 'Good', valveCondition: 'Good', pumpFunctional: 'Yes', waterAvail: 'Yes', inspectionDate: '2026-06-25', inspector: 'Fire Engineer Suraj', status: 'Functional', remarks: 'Pump pressure verified at 7 bar' },
  { id: 'fh-002', inspectionId: 'FH-002', location: 'Rear Exit Block A', pressure: 'Optimal', hoseCondition: 'Fair', valveCondition: 'Good', pumpFunctional: 'Yes', waterAvail: 'Yes', inspectionDate: '2026-06-25', inspector: 'Fire Engineer Suraj', status: 'Functional', remarks: 'Hose box glass cracked' },
  { id: 'fh-003', inspectionId: 'FH-003', location: 'Basement Parking', pressure: 'Low', hoseCondition: 'Poor', valveCondition: 'Stiff', pumpFunctional: 'Yes', waterAvail: 'Yes', inspectionDate: '2026-06-26', inspector: 'Fire Engineer Suraj', status: 'Needs Repair', remarks: 'Valve difficult to open' },
  { id: 'fh-004', inspectionId: 'FH-004', location: 'Terrace Block B', pressure: 'Optimal', hoseCondition: 'Good', valveCondition: 'Good', pumpFunctional: 'Yes', waterAvail: 'Yes', inspectionDate: '2026-06-26', inspector: 'Fire Engineer Suraj', status: 'Functional', remarks: 'Auto-start tested OK' },
  { id: 'fh-005', inspectionId: 'FH-005', location: 'Utility Block', pressure: 'Zero', hoseCondition: 'Missing', valveCondition: 'Damaged', pumpFunctional: 'No', waterAvail: 'No', inspectionDate: '2026-06-28', inspector: 'Fire Engineer Suraj', status: 'Out of Service', remarks: 'Line isolated for maintenance' },
];

const ALARM_SEED = [
  { id: 'fa-001', deviceId: 'FA-001', zone: 'ICU', deviceType: 'Smoke Detector', funcStatus: 'Functional', batteryStatus: 'Good', testResult: 'Pass', inspectionDate: '2026-06-20', nextInspection: '2026-12-20', checkedBy: 'Tech Vikram', status: 'Functional', remarks: 'Cleaned and tested' },
  { id: 'fa-002', deviceId: 'FA-002', zone: 'Kitchen', deviceType: 'Heat Detector', funcStatus: 'Functional', batteryStatus: 'N/A', testResult: 'Pass', inspectionDate: '2026-06-20', nextInspection: '2026-12-20', checkedBy: 'Tech Vikram', status: 'Functional', remarks: 'Tested with heat gun' },
  { id: 'fa-003', deviceId: 'FA-003', zone: 'Corridor First Floor', deviceType: 'Manual Call Point', funcStatus: 'Faulty', batteryStatus: 'N/A', testResult: 'Fail', inspectionDate: '2026-06-21', nextInspection: '2026-07-21', checkedBy: 'Tech Vikram', status: 'Needs Repair', remarks: 'Glass broken, switch jammed' },
  { id: 'fa-004', deviceId: 'FA-004', zone: 'Server Room', deviceType: 'Smoke Detector', funcStatus: 'Functional', batteryStatus: 'Replace', testResult: 'Pass', inspectionDate: '2026-06-22', nextInspection: '2026-12-22', checkedBy: 'Tech Vikram', status: 'Functional', remarks: 'Low battery alert logged' },
  { id: 'fa-005', deviceId: 'FA-005', zone: 'Main Lobby', deviceType: 'Fire Bell', funcStatus: 'Functional', batteryStatus: 'N/A', testResult: 'Pass', inspectionDate: '2026-06-23', nextInspection: '2026-12-23', checkedBy: 'Tech Vikram', status: 'Functional', remarks: 'Sound level 85dB verified' },
];

// ── Phase 4: Fire Training constants ──
const LS_KEY_TRAINING = 'fire_training_records';
const LS_KEY_DRILLS = 'fire_drill_records';
const LS_KEY_EVACUATIONS = 'fire_evacuation_records';

const TRAINING_TYPES = ['Induction', 'Annual Refresher', 'Specialized Handling', 'Fire Warden Training'];
const DRILL_TYPES = ['Mock Drill', 'Surprise Drill', 'Tabletop Exercise'];
const DRILL_RESULTS = ['Excellent', 'Satisfactory', 'Needs Improvement', 'Failed'];

const TRAINING_SEED = [
  { id: 'ft-001', trainingId: 'FT-001', employeeName: 'Amit Patel', employeeId: 'EMP-102', department: 'Nursing', trainingType: 'Induction', trainer: 'Safety Officer Raj', trainingDate: '2026-05-10', validUntil: '2027-05-10', status: 'Completed', remarks: 'Passed with 95%' },
  { id: 'ft-002', trainingId: 'FT-002', employeeName: 'Dr. Neha Sharma', employeeId: 'EMP-088', department: 'ICU', trainingType: 'Annual Refresher', trainer: 'Safety Officer Raj', trainingDate: '2026-06-15', validUntil: '2027-06-15', status: 'Completed', remarks: '' },
  { id: 'ft-003', trainingId: 'FT-003', employeeName: 'Ravi Kumar', employeeId: 'EMP-145', department: 'Maintenance', trainingType: 'Specialized Handling', trainer: 'Ext. Expert Singh', trainingDate: '2026-06-20', validUntil: '2027-06-20', status: 'Completed', remarks: 'CO2 extinguisher hands-on' },
  { id: 'ft-004', trainingId: 'FT-004', employeeName: 'Sunita Devi', employeeId: 'EMP-201', department: 'Housekeeping', trainingType: 'Induction', trainer: 'Safety Officer Raj', trainingDate: '2026-06-25', validUntil: '2027-06-25', status: 'Completed', remarks: '' },
  { id: 'ft-005', trainingId: 'FT-005', employeeName: 'Vikram Singh', employeeId: 'EMP-055', department: 'Security', trainingType: 'Fire Warden Training', trainer: 'Fire Dept Official', trainingDate: '2026-06-28', validUntil: '2027-06-28', status: 'Completed', remarks: 'Certified Fire Warden' },
];

const DRILL_SEED = [
  { id: 'fd-001', drillId: 'FD-001', drillDate: '2026-03-10', department: 'OPD', participants: '45', drillType: 'Mock Drill', duration: '12 mins', result: 'Satisfactory', conductedBy: 'Safety Officer Raj', remarks: 'Slow response from counter 3' },
  { id: 'fd-002', drillId: 'FD-002', drillDate: '2026-04-15', department: 'Pharmacy', participants: '12', drillType: 'Surprise Drill', duration: '5 mins', result: 'Excellent', conductedBy: 'Safety Officer Raj', remarks: 'Immediate evacuation' },
  { id: 'fd-003', drillId: 'FD-003', drillDate: '2026-05-20', department: 'Laboratory', participants: '18', drillType: 'Mock Drill', duration: '8 mins', result: 'Satisfactory', conductedBy: 'Safety Officer Raj', remarks: 'Chemical spill protocol tested' },
  { id: 'fd-004', drillId: 'FD-004', drillDate: '2026-06-10', department: 'Radiology', participants: '20', drillType: 'Tabletop Exercise', duration: '45 mins', result: 'Excellent', conductedBy: 'Fire Engineer Suraj', remarks: 'Good coordination with IT' },
  { id: 'fd-005', drillId: 'FD-005', drillDate: '2026-06-25', department: 'Kitchen', participants: '15', drillType: 'Surprise Drill', duration: '15 mins', result: 'Needs Improvement', conductedBy: 'Safety Officer Raj', remarks: 'Gas shutoff was delayed' },
];

const EVACUATION_SEED = [
  { id: 'ev-001', evacuationId: 'EV-001', area: 'Block A Ground Floor', drillDate: '2026-01-20', evacuationTime: '4.5', patientsShifted: '12', staffParticipated: '25', observations: 'Smooth movement through exits', improvementActions: 'None', status: 'Completed' },
  { id: 'ev-002', evacuationId: 'EV-002', area: 'ICU', drillDate: '2026-02-15', evacuationTime: '8.25', patientsShifted: '8', staffParticipated: '30', observations: 'Ventilator transfer took time', improvementActions: 'More transit vents needed', status: 'Completed' },
  { id: 'ev-003', evacuationId: 'EV-003', area: 'Maternity Ward', drillDate: '2026-04-10', evacuationTime: '6.75', patientsShifted: '15', staffParticipated: '20', observations: 'Wheelchair shortage at exit', improvementActions: 'Keep 5 extra chairs near stairwell', status: 'Completed' },
  { id: 'ev-004', evacuationId: 'EV-004', area: 'Block B First Floor', drillDate: '2026-05-05', evacuationTime: '5.2', patientsShifted: '22', staffParticipated: '18', observations: 'Exit door 2 was stiff', improvementActions: 'Maintenance requested to oil hinges', status: 'Completed' },
  { id: 'ev-005', evacuationId: 'EV-005', area: 'Emergency Dept', drillDate: '2026-06-18', evacuationTime: '3.8', patientsShifted: '5', staffParticipated: '40', observations: 'Excellent triage during evac', improvementActions: 'Update emergency contacts list', status: 'Completed' },
];

// ─────────────────────────────────────────────
// Sample seed data
// ─────────────────────────────────────────────
const SAMPLE_DASHBOARD_DATA = [
  { id: 'fd-001', month: 'January',  incidents: 2,  drills: 3, equipmentCompliance: 95, highRiskAreas: 4, trainingCompliance: 88, alarmHealth: 97, activeCAPAs: 3, overallCompliance: 92 },
  { id: 'fd-002', month: 'February', incidents: 1,  drills: 2, equipmentCompliance: 96, highRiskAreas: 3, trainingCompliance: 90, alarmHealth: 98, activeCAPAs: 2, overallCompliance: 93 },
  { id: 'fd-003', month: 'March',    incidents: 3,  drills: 4, equipmentCompliance: 94, highRiskAreas: 5, trainingCompliance: 85, alarmHealth: 96, activeCAPAs: 5, overallCompliance: 90 },
  { id: 'fd-004', month: 'April',    incidents: 0,  drills: 3, equipmentCompliance: 97, highRiskAreas: 3, trainingCompliance: 92, alarmHealth: 99, activeCAPAs: 1, overallCompliance: 95 },
  { id: 'fd-005', month: 'May',      incidents: 1,  drills: 4, equipmentCompliance: 98, highRiskAreas: 2, trainingCompliance: 94, alarmHealth: 99, activeCAPAs: 2, overallCompliance: 96 },
  { id: 'fd-006', month: 'June',     incidents: 2,  drills: 3, equipmentCompliance: 96, highRiskAreas: 3, trainingCompliance: 91, alarmHealth: 97, activeCAPAs: 3, overallCompliance: 94 },
];

const SAMPLE_RECENT_ACTIVITY = [
  { id: 'fra-001', date: '2026-06-30', activity: 'Monthly Fire Drill',         location: 'Block A – Ground Floor', conductedBy: 'Safety Officer Rajan',  status: 'Completed' },
  { id: 'fra-002', date: '2026-06-28', activity: 'Fire Extinguisher Inspection', location: 'ICU Corridor',           conductedBy: 'Technician Priya',      status: 'Completed' },
  { id: 'fra-003', date: '2026-06-25', activity: 'Fire Risk Assessment',        location: 'Kitchen & Pantry',        conductedBy: 'Fire Safety Auditor',   status: 'Action Required' },
  { id: 'fra-004', date: '2026-06-22', activity: 'Fire Alarm Testing',          location: 'OT Block',                conductedBy: 'Maintenance Team',      status: 'Completed' },
  { id: 'fra-005', date: '2026-06-20', activity: 'Staff Fire Safety Training',  location: 'Conference Room 1',       conductedBy: 'Safety Officer Rajan',  status: 'Completed' },
  { id: 'fra-006', date: '2026-06-18', activity: 'Evacuation Route Verification', location: 'All Floors',             conductedBy: 'Nurse Supervisor',      status: 'Pending' },
  { id: 'fra-007', date: '2026-06-15', activity: 'CAPA Follow-up',              location: 'Lab Wing',                conductedBy: 'Quality Team',          status: 'In Progress' },
  { id: 'fra-008', date: '2026-06-12', activity: 'Sprinkler System Check',      location: 'Server Room',             conductedBy: 'Maintenance Team',      status: 'Completed' },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
const FireRiskManagementWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();
  const [activeTab, setActiveTab] = useState('dashboard');

  // ── State: Dashboard data (localStorage-backed) ──
  const [dashboardData] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_DASHBOARD);
    return saved ? JSON.parse(saved) : SAMPLE_DASHBOARD_DATA;
  });

  const [recentActivity] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_RECENT_ACTIVITY);
    return saved ? JSON.parse(saved) : SAMPLE_RECENT_ACTIVITY;
  });

  // ── State: Fire Risk Assessments ──
  const [assessments, setAssessments] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_ASSESSMENTS);
    return saved ? JSON.parse(saved) : ASSESSMENT_SEED;
  });
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [editingAssessmentId, setEditingAssessmentId] = useState(null);
  const [assessmentSearch, setAssessmentSearch] = useState('');
  const BLANK_FORM = {
    id: '', assessmentId: '', area: 'ICU', hazardIdentified: '',
    probability: 1, severity: 1, riskScore: 1, riskCategory: 'Low',
    existingControlMeasures: '', recommendedActions: '',
    responsiblePerson: '', targetCompletionDate: '', status: 'Open', remarks: '',
  };
  const [assessmentForm, setAssessmentForm] = useState(BLANK_FORM);

  // ── State: Fire Equipment Management ──
  const [extinguishers, setExtinguishers] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_EXTINGUISHERS);
    return saved ? JSON.parse(saved) : EXTINGUISHER_SEED;
  });
  const [hydrants, setHydrants] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_HYDRANTS);
    return saved ? JSON.parse(saved) : HYDRANT_SEED;
  });
  const [alarms, setAlarms] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_ALARMS);
    return saved ? JSON.parse(saved) : ALARM_SEED;
  });

  const [activeEquipmentSubTab, setActiveEquipmentSubTab] = useState('extinguishers');

  // Modals & Forms
  const [isExtinguisherModalOpen, setIsExtinguisherModalOpen] = useState(false);
  const [editingExtinguisherId, setEditingExtinguisherId] = useState(null);
  const [extinguisherSearch, setExtinguisherSearch] = useState('');
  const BLANK_EXT_FORM = { id: '', equipmentId: '', location: '', type: 'CO2', capacity: '', mfgDate: '', lastRefill: '', nextRefill: '', pressureGauge: 'Normal', seal: 'Intact', condition: 'Good', status: 'Functional', checkedBy: '', remarks: '' };
  const [extinguisherForm, setExtinguisherForm] = useState(BLANK_EXT_FORM);

  const [isHydrantModalOpen, setIsHydrantModalOpen] = useState(false);
  const [editingHydrantId, setEditingHydrantId] = useState(null);
  const [hydrantSearch, setHydrantSearch] = useState('');
  const BLANK_HYD_FORM = { id: '', inspectionId: '', location: '', pressure: 'Optimal', hoseCondition: 'Good', valveCondition: 'Good', pumpFunctional: 'Yes', waterAvail: 'Yes', inspectionDate: '', inspector: '', status: 'Functional', remarks: '' };
  const [hydrantForm, setHydrantForm] = useState(BLANK_HYD_FORM);

  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [editingAlarmId, setEditingAlarmId] = useState(null);
  const [alarmSearch, setAlarmSearch] = useState('');
  const BLANK_ALM_FORM = { id: '', deviceId: '', zone: '', deviceType: 'Smoke Detector', funcStatus: 'Functional', batteryStatus: 'Good', testResult: 'Pass', inspectionDate: '', nextInspection: '', checkedBy: '', status: 'Functional', remarks: '' };
  const [alarmForm, setAlarmForm] = useState(BLANK_ALM_FORM);

  // ── State: Fire Training & Evacuation ──
  const [trainingRecords, setTrainingRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_TRAINING);
    return saved ? JSON.parse(saved) : TRAINING_SEED;
  });
  const [drillRecords, setDrillRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_DRILLS);
    return saved ? JSON.parse(saved) : DRILL_SEED;
  });
  const [evacRecords, setEvacRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_EVACUATIONS);
    return saved ? JSON.parse(saved) : EVACUATION_SEED;
  });

  const [activeTrainingSubTab, setActiveTrainingSubTab] = useState('training');

  // Modals & Forms for Training
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);
  const [editingTrainingId, setEditingTrainingId] = useState(null);
  const [trainingSearch, setTrainingSearch] = useState('');
  const BLANK_TRAIN_FORM = { id: '', trainingId: '', employeeName: '', employeeId: '', department: '', trainingType: 'Induction', trainer: '', trainingDate: '', validUntil: '', status: 'Completed', remarks: '' };
  const [trainingForm, setTrainingForm] = useState(BLANK_TRAIN_FORM);

  const [isDrillModalOpen, setIsDrillModalOpen] = useState(false);
  const [editingDrillId, setEditingDrillId] = useState(null);
  const [drillSearch, setDrillSearch] = useState('');
  const BLANK_DRILL_FORM = { id: '', drillId: '', drillDate: '', department: '', participants: '', drillType: 'Mock Drill', duration: '', result: 'Satisfactory', conductedBy: '', remarks: '' };
  const [drillForm, setDrillForm] = useState(BLANK_DRILL_FORM);

  const [isEvacModalOpen, setIsEvacModalOpen] = useState(false);
  const [editingEvacId, setEditingEvacId] = useState(null);
  const [evacSearch, setEvacSearch] = useState('');
  const BLANK_EVAC_FORM = { id: '', evacuationId: '', area: '', drillDate: '', evacuationTime: '', patientsShifted: '', staffParticipated: '', observations: '', improvementActions: '', status: 'Completed' };
  const [evacForm, setEvacForm] = useState(BLANK_EVAC_FORM);

  // Persist to localStorage
  React.useEffect(() => {
    localStorage.setItem(LS_KEY_DASHBOARD, JSON.stringify(dashboardData));
  }, [dashboardData]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_RECENT_ACTIVITY, JSON.stringify(recentActivity));
  }, [recentActivity]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_ASSESSMENTS, JSON.stringify(assessments));
  }, [assessments]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_EXTINGUISHERS, JSON.stringify(extinguishers));
  }, [extinguishers]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_HYDRANTS, JSON.stringify(hydrants));
  }, [hydrants]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_ALARMS, JSON.stringify(alarms));
  }, [alarms]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_TRAINING, JSON.stringify(trainingRecords));
  }, [trainingRecords]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_DRILLS, JSON.stringify(drillRecords));
  }, [drillRecords]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_EVACUATIONS, JSON.stringify(evacRecords));
  }, [evacRecords]);

  // ── Assessment helpers ──
  const getNextAssessmentId = () => {
    const maxNum = assessments.reduce((max, r) => {
      const match = r.assessmentId.match(/(\d+)$/);
      const num = match ? parseInt(match[1], 10) : 0;
      return num > max ? num : max;
    }, 0);
    const nextNum = String(maxNum + 1).padStart(3, '0');
    return { shortId: `fra-${nextNum}`, assessmentId: `FRA-${nextNum}` };
  };

  const computeRisk = (prob, sev) => {
    const score = prob * sev;
    return { riskScore: score, riskCategory: getRiskCategory(score) };
  };

  const handleOpenAssessmentModal = (record = null) => {
    if (record) {
      setAssessmentForm({ ...record });
      setEditingAssessmentId(record.id);
    } else {
      const { shortId, assessmentId } = getNextAssessmentId();
      setAssessmentForm({ ...BLANK_FORM, id: shortId, assessmentId });
      setEditingAssessmentId(null);
    }
    setIsAssessmentModalOpen(true);
  };

  const handleSaveAssessment = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!assessmentForm.area || !assessmentForm.hazardIdentified || !assessmentForm.responsiblePerson) {
      alert('Area, Hazard Identified, and Responsible Person are required.');
      return;
    }
    const { riskScore, riskCategory } = computeRisk(
      Number(assessmentForm.probability),
      Number(assessmentForm.severity)
    );
    const finalRecord = { ...assessmentForm, riskScore, riskCategory };
    if (editingAssessmentId) {
      setAssessments(prev => prev.map(r => (r.id === editingAssessmentId ? { ...finalRecord, id: editingAssessmentId } : r)));
    } else {
      setAssessments(prev => [...prev, finalRecord]);
    }
    setIsAssessmentModalOpen(false);
    setEditingAssessmentId(null);
    setAssessmentForm(BLANK_FORM);
  };

  const handleDeleteAssessment = (id) => {
    if (window.confirm('Delete this Fire Risk Assessment record? This action cannot be undone.')) {
      setAssessments(prev => prev.filter(r => r.id !== id));
    }
  };

  // ── Equipment Helpers ──
  const getNextExtinguisherId = () => {
    const maxNum = extinguishers.reduce((max, r) => {
      const match = r.equipmentId.match(/(\d+)$/);
      return Math.max(max, match ? parseInt(match[1], 10) : 0);
    }, 0);
    const nextNum = String(maxNum + 1).padStart(3, '0');
    return { shortId: `fe-${nextNum}`, equipmentId: `FE-${nextNum}` };
  };

  const getNextHydrantId = () => {
    const maxNum = hydrants.reduce((max, r) => {
      const match = r.inspectionId.match(/(\d+)$/);
      return Math.max(max, match ? parseInt(match[1], 10) : 0);
    }, 0);
    const nextNum = String(maxNum + 1).padStart(3, '0');
    return { shortId: `fh-${nextNum}`, inspectionId: `FH-${nextNum}` };
  };

  const getNextAlarmId = () => {
    const maxNum = alarms.reduce((max, r) => {
      const match = r.deviceId.match(/(\d+)$/);
      return Math.max(max, match ? parseInt(match[1], 10) : 0);
    }, 0);
    const nextNum = String(maxNum + 1).padStart(3, '0');
    return { shortId: `fa-${nextNum}`, deviceId: `FA-${nextNum}` };
  };

  const handleOpenExtinguisherModal = (record = null) => {
    if (record) { setExtinguisherForm({ ...record }); setEditingExtinguisherId(record.id); }
    else { const ids = getNextExtinguisherId(); setExtinguisherForm({ ...BLANK_EXT_FORM, id: ids.shortId, equipmentId: ids.equipmentId }); setEditingExtinguisherId(null); }
    setIsExtinguisherModalOpen(true);
  };
  const handleSaveExtinguisher = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!extinguisherForm.location || !extinguisherForm.capacity || !extinguisherForm.checkedBy) { alert('Location, Capacity and Checked By are required.'); return; }
    if (editingExtinguisherId) { setExtinguishers(prev => prev.map(r => r.id === editingExtinguisherId ? { ...extinguisherForm, id: editingExtinguisherId } : r)); }
    else { setExtinguishers(prev => [...prev, extinguisherForm]); }
    setIsExtinguisherModalOpen(false); setEditingExtinguisherId(null); setExtinguisherForm(BLANK_EXT_FORM);
  };
  const handleDeleteExtinguisher = (id) => {
    if (window.confirm('Delete this Fire Extinguisher record? This action cannot be undone.')) { setExtinguishers(prev => prev.filter(r => r.id !== id)); }
  };

  const handleOpenHydrantModal = (record = null) => {
    if (record) { setHydrantForm({ ...record }); setEditingHydrantId(record.id); }
    else { const ids = getNextHydrantId(); setHydrantForm({ ...BLANK_HYD_FORM, id: ids.shortId, inspectionId: ids.inspectionId }); setEditingHydrantId(null); }
    setIsHydrantModalOpen(true);
  };
  const handleSaveHydrant = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!hydrantForm.location || !hydrantForm.inspector || !hydrantForm.inspectionDate) { alert('Location, Inspection Date and Inspector are required.'); return; }
    if (editingHydrantId) { setHydrants(prev => prev.map(r => r.id === editingHydrantId ? { ...hydrantForm, id: editingHydrantId } : r)); }
    else { setHydrants(prev => [...prev, hydrantForm]); }
    setIsHydrantModalOpen(false); setEditingHydrantId(null); setHydrantForm(BLANK_HYD_FORM);
  };
  const handleDeleteHydrant = (id) => {
    if (window.confirm('Delete this Fire Hydrant record? This action cannot be undone.')) { setHydrants(prev => prev.filter(r => r.id !== id)); }
  };

  const handleOpenAlarmModal = (record = null) => {
    if (record) { setAlarmForm({ ...record }); setEditingAlarmId(record.id); }
    else { const ids = getNextAlarmId(); setAlarmForm({ ...BLANK_ALM_FORM, id: ids.shortId, deviceId: ids.deviceId }); setEditingAlarmId(null); }
    setIsAlarmModalOpen(true);
  };
  const handleSaveAlarm = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!alarmForm.zone || !alarmForm.checkedBy || !alarmForm.inspectionDate) { alert('Zone, Inspection Date and Checked By are required.'); return; }
    if (editingAlarmId) { setAlarms(prev => prev.map(r => r.id === editingAlarmId ? { ...alarmForm, id: editingAlarmId } : r)); }
    else { setAlarms(prev => [...prev, alarmForm]); }
    setIsAlarmModalOpen(false); setEditingAlarmId(null); setAlarmForm(BLANK_ALM_FORM);
  };
  const handleDeleteAlarm = (id) => {
    if (window.confirm('Delete this Fire Alarm record? This action cannot be undone.')) { setAlarms(prev => prev.filter(r => r.id !== id)); }
  };

  // ── Training Helpers ──
  const getNextTrainingId = () => {
    const maxNum = trainingRecords.reduce((max, r) => {
      const match = r.trainingId.match(/(\d+)$/);
      return Math.max(max, match ? parseInt(match[1], 10) : 0);
    }, 0);
    const nextNum = String(maxNum + 1).padStart(3, '0');
    return { shortId: `ft-${nextNum}`, trainingId: `FT-${nextNum}` };
  };

  const getNextDrillId = () => {
    const maxNum = drillRecords.reduce((max, r) => {
      const match = r.drillId.match(/(\d+)$/);
      return Math.max(max, match ? parseInt(match[1], 10) : 0);
    }, 0);
    const nextNum = String(maxNum + 1).padStart(3, '0');
    return { shortId: `fd-${nextNum}`, drillId: `FD-${nextNum}` };
  };

  const getNextEvacId = () => {
    const maxNum = evacRecords.reduce((max, r) => {
      const match = r.evacuationId.match(/(\d+)$/);
      return Math.max(max, match ? parseInt(match[1], 10) : 0);
    }, 0);
    const nextNum = String(maxNum + 1).padStart(3, '0');
    return { shortId: `ev-${nextNum}`, evacuationId: `EV-${nextNum}` };
  };

  const handleOpenTrainingModal = (record = null) => {
    if (record) { setTrainingForm({ ...record }); setEditingTrainingId(record.id); }
    else { const ids = getNextTrainingId(); setTrainingForm({ ...BLANK_TRAIN_FORM, id: ids.shortId, trainingId: ids.trainingId }); setEditingTrainingId(null); }
    setIsTrainingModalOpen(true);
  };
  const handleSaveTraining = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!trainingForm.employeeName || !trainingForm.employeeId || !trainingForm.trainingDate) { alert('Employee Name, ID and Training Date are required.'); return; }
    if (editingTrainingId) { setTrainingRecords(prev => prev.map(r => r.id === editingTrainingId ? { ...trainingForm, id: editingTrainingId } : r)); }
    else { setTrainingRecords(prev => [...prev, trainingForm]); }
    setIsTrainingModalOpen(false); setEditingTrainingId(null); setTrainingForm(BLANK_TRAIN_FORM);
  };
  const handleDeleteTraining = (id) => {
    if (window.confirm('Delete this Training record? This action cannot be undone.')) { setTrainingRecords(prev => prev.filter(r => r.id !== id)); }
  };

  const handleOpenDrillModal = (record = null) => {
    if (record) { setDrillForm({ ...record }); setEditingDrillId(record.id); }
    else { const ids = getNextDrillId(); setDrillForm({ ...BLANK_DRILL_FORM, id: ids.shortId, drillId: ids.drillId }); setEditingDrillId(null); }
    setIsDrillModalOpen(true);
  };
  const handleSaveDrill = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!drillForm.drillDate || !drillForm.department || !drillForm.conductedBy) { alert('Drill Date, Department and Conducted By are required.'); return; }
    if (editingDrillId) { setDrillRecords(prev => prev.map(r => r.id === editingDrillId ? { ...drillForm, id: editingDrillId } : r)); }
    else { setDrillRecords(prev => [...prev, drillForm]); }
    setIsDrillModalOpen(false); setEditingDrillId(null); setDrillForm(BLANK_DRILL_FORM);
  };
  const handleDeleteDrill = (id) => {
    if (window.confirm('Delete this Drill record? This action cannot be undone.')) { setDrillRecords(prev => prev.filter(r => r.id !== id)); }
  };

  const handleOpenEvacModal = (record = null) => {
    if (record) { setEvacForm({ ...record }); setEditingEvacId(record.id); }
    else { const ids = getNextEvacId(); setEvacForm({ ...BLANK_EVAC_FORM, id: ids.shortId, evacuationId: ids.evacuationId }); setEditingEvacId(null); }
    setIsEvacModalOpen(true);
  };
  const handleSaveEvac = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!evacForm.area || !evacForm.drillDate || !evacForm.evacuationTime) { alert('Area, Drill Date and Evacuation Time are required.'); return; }
    if (editingEvacId) { setEvacRecords(prev => prev.map(r => r.id === editingEvacId ? { ...evacForm, id: editingEvacId } : r)); }
    else { setEvacRecords(prev => [...prev, evacForm]); }
    setIsEvacModalOpen(false); setEditingEvacId(null); setEvacForm(BLANK_EVAC_FORM);
  };
  const handleDeleteEvac = (id) => {
    if (window.confirm('Delete this Evacuation record? This action cannot be undone.')) { setEvacRecords(prev => prev.filter(r => r.id !== id)); }
  };

  // ── KPI derivations ──
  const totalIncidents        = dashboardData.reduce((s, r) => s + (r.incidents || 0), 0);
  const totalDrills           = dashboardData.reduce((s, r) => s + (r.drills || 0), 0);
  const avgEquipCompliance    = dashboardData.length
    ? (dashboardData.reduce((s, r) => s + (r.equipmentCompliance || 0), 0) / dashboardData.length).toFixed(1)
    : 0;
  const maxHighRiskAreas      = dashboardData.length
    ? Math.max(...dashboardData.map(r => r.highRiskAreas || 0))
    : 0;
  const avgTrainingCompliance = dashboardData.length
    ? (dashboardData.reduce((s, r) => s + (r.trainingCompliance || 0), 0) / dashboardData.length).toFixed(1)
    : 0;
  const avgAlarmHealth        = dashboardData.length
    ? (dashboardData.reduce((s, r) => s + (r.alarmHealth || 0), 0) / dashboardData.length).toFixed(1)
    : 0;
  const totalActiveCAPAs      = dashboardData.reduce((s, r) => s + (r.activeCAPAs || 0), 0);
  const avgOverallCompliance  = dashboardData.length
    ? (dashboardData.reduce((s, r) => s + (r.overallCompliance || 0), 0) / dashboardData.length).toFixed(1)
    : 0;

  // ── Chart data ──
  const drillTrendData = dashboardData.map(r => ({
    month: r.month.slice(0, 3),
    drills: r.drills,
  }));

  const incidentTrendData = dashboardData.map(r => ({
    month: r.month.slice(0, 3),
    incidents: r.incidents,
  }));

  const equipmentStatusData = [
    { name: 'Operational',    value: 142, color: '#10b981' },
    { name: 'Due Inspection', value: 18,  color: '#f59e0b' },
    { name: 'Non-Compliant',  value: 7,   color: '#ef4444' },
  ];

  const riskDistributionData = [
    { name: 'Low Risk',    value: 12, color: '#10b981' },
    { name: 'Medium Risk', value: 8,  color: '#f59e0b' },
    { name: 'High Risk',   value: 4,  color: '#ef4444' },
    { name: 'Critical',    value: 1,  color: '#7c3aed' },
  ];

  const trainingComplianceTrend = dashboardData.map(r => ({
    month: r.month.slice(0, 3),
    compliance: r.trainingCompliance,
  }));

  const auditComplianceTrend = dashboardData.map(r => ({
    month: r.month.slice(0, 3),
    compliance: r.overallCompliance,
  }));

  // ── Status badge helper ──
  const STATUS_BADGE = {
    Completed:        'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending:          'bg-amber-50 text-amber-700 border-amber-200',
    'In Progress':    'bg-sky-50 text-sky-700 border-sky-200',
    'Action Required':'bg-rose-50 text-rose-700 border-rose-200',
  };

  // ─────────────────────────────────────────────
  // Tab content renderer
  // ─────────────────────────────────────────────
  const renderContent = () => {
    switch (activeTab) {
      // ═══════════════════════════════════════
      // DASHBOARD
      // ═══════════════════════════════════════
      case 'dashboard':
        return (
          <div className="space-y-4">
            {/* KPI Cards */}
            <div>
              <h3 className="text-xs font-extrabold text-slate-800 mb-3">Fire Risk Management Dashboard</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: 'Total Fire Incidents',           value: totalIncidents,                   color: 'text-rose-600' },
                  { label: 'Fire Drills Conducted',          value: totalDrills,                      color: 'text-amber-600' },
                  { label: 'Fire Equipment Compliance %',    value: `${avgEquipCompliance}%`,          color: 'text-emerald-600' },
                  { label: 'High Risk Areas',                value: maxHighRiskAreas,                 color: 'text-red-600' },
                  { label: 'Fire Training Compliance %',     value: `${avgTrainingCompliance}%`,       color: 'text-blue-600' },
                  { label: 'Fire Alarm Health',              value: `${avgAlarmHealth}%`,              color: 'text-sky-600' },
                  { label: 'Active CAPAs',                   value: totalActiveCAPAs,                 color: 'text-violet-600' },
                  { label: 'Overall Fire Safety Compliance %', value: `${avgOverallCompliance}%`,     color: 'text-indigo-600' },
                ].map((kpi) => (
                  <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                    <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-4">

              {/* Chart 1: Monthly Fire Drill Trend */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-3">Monthly Fire Drill Trend</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={drillTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="drills" fill="#f59e0b" name="Fire Drills" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Chart 2: Fire Incident Trend */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-3">Fire Incident Trend</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={incidentTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="incidents" stroke="#ef4444" name="Fire Incidents" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Chart 3: Fire Equipment Status */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-3">Fire Equipment Status</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={equipmentStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {equipmentStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Chart 4: Fire Risk Distribution */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-3">Fire Risk Distribution</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={riskDistributionData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" tick={{ fontSize: 10 }} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={90} />
                    <Tooltip />
                    <Bar dataKey="value" name="Areas">
                      {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Chart 5: Training Compliance Trend */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-3">Training Compliance Trend</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={trainingComplianceTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} domain={[60, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="compliance" stroke="#3b82f6" name="Training Compliance %" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Chart 6: Fire Audit Compliance Trend */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-3">Fire Audit Compliance Trend</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={auditComplianceTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} domain={[70, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="compliance" stroke="#8b5cf6" name="Audit Compliance %" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Fire Safety Activity Table */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/50">
                <h4 className="text-xs font-extrabold text-slate-800">Recent Fire Safety Activity</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      {['Date', 'Activity', 'Location', 'Conducted By', 'Status'].map((h) => (
                        <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentActivity.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-3 py-3 font-semibold text-slate-700">{r.date}</td>
                        <td className="px-3 py-3 text-slate-600">{r.activity}</td>
                        <td className="px-3 py-3 text-slate-500">{r.location}</td>
                        <td className="px-3 py-3 text-slate-600">{r.conductedBy}</td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Pending}`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {recentActivity.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-3 py-10 text-center text-[10px] text-slate-400">
                          No recent activity records.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                <span className="text-[9px] text-slate-400 font-medium">
                  Showing {recentActivity.length} record{recentActivity.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        );

      // ═══════════════════════════════════════
      // PLACEHOLDER TABS
      // ═══════════════════════════════════════
      case 'assessment': {
        // ── Filtered list ──
        const filteredAssessments = assessments.filter((r) => {
          const q = assessmentSearch.toLowerCase();
          return (
            r.assessmentId.toLowerCase().includes(q) ||
            r.area.toLowerCase().includes(q) ||
            r.hazardIdentified.toLowerCase().includes(q) ||
            r.riskCategory.toLowerCase().includes(q) ||
            r.status.toLowerCase().includes(q) ||
            r.responsiblePerson.toLowerCase().includes(q)
          );
        });

        // ── KPI derivations ──
        const totalAssessments    = assessments.length;
        const highRisk            = assessments.filter(r => r.riskCategory === 'High').length;
        const medRisk             = assessments.filter(r => r.riskCategory === 'Medium').length;
        const lowRisk             = assessments.filter(r => r.riskCategory === 'Low').length;
        const completedActions    = assessments.filter(r => r.status === 'Completed' || r.status === 'Closed').length;
        const pendingActions      = assessments.filter(r => r.status === 'Open' || r.status === 'In Progress').length;
        const avgRiskScore        = totalAssessments
          ? (assessments.reduce((s, r) => s + (r.riskScore || 0), 0) / totalAssessments).toFixed(1)
          : 0;
        const compliancePct       = totalAssessments
          ? ((completedActions / totalAssessments) * 100).toFixed(1)
          : 0;

        // ── Status / Category badge helpers ──
        const RISK_BADGE = {
          Low:    'bg-emerald-50 text-emerald-700 border-emerald-200',
          Medium: 'bg-amber-50 text-amber-700 border-amber-200',
          High:   'bg-rose-50 text-rose-700 border-rose-200',
        };
        const ASSESS_STATUS_BADGE = {
          Open:          'bg-slate-50 text-slate-600 border-slate-200',
          'In Progress': 'bg-sky-50 text-sky-700 border-sky-200',
          Completed:     'bg-emerald-50 text-emerald-700 border-emerald-200',
          Closed:        'bg-violet-50 text-violet-700 border-violet-200',
        };

        const TH_COLS = [
          'Assessment ID', 'Area', 'Hazard Identified', 'Probability',
          'Severity', 'Risk Score', 'Risk Category', 'Responsible Person',
          'Target Date', 'Status', 'Actions',
        ];

        return (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold text-slate-800">Fire Risk Assessment Register</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Identify, evaluate and control fire hazards across all hospital areas</p>
              </div>
              <button
                onClick={() => handleOpenAssessmentModal()}
                style={{ backgroundColor: hospital.themeColor }}
                className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Assessment
              </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Total Assessments',       value: totalAssessments,  color: 'text-blue-600' },
                { label: 'High Risk Areas',          value: highRisk,          color: 'text-rose-600' },
                { label: 'Medium Risk Areas',        value: medRisk,           color: 'text-amber-600' },
                { label: 'Low Risk Areas',           value: lowRisk,           color: 'text-emerald-600' },
                { label: 'Completed Actions',        value: completedActions,  color: 'text-violet-600' },
                { label: 'Pending Actions',          value: pendingActions,    color: 'text-sky-600' },
                { label: 'Average Risk Score',       value: avgRiskScore,      color: 'text-indigo-600' },
                { label: 'Fire Risk Compliance %',   value: `${compliancePct}%`, color: 'text-teal-600' },
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
                placeholder="Search by ID, area, hazard, risk category, status or responsible person…"
                value={assessmentSearch}
                onChange={(e) => setAssessmentSearch(e.target.value)}
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
                        <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAssessments.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-3 py-3 font-mono text-[9px] text-slate-500 whitespace-nowrap">{r.assessmentId}</td>
                        <td className="px-3 py-3 font-semibold text-slate-700 whitespace-nowrap">{r.area}</td>
                        <td className="px-3 py-3 text-slate-600 max-w-[180px] truncate" title={r.hazardIdentified}>{r.hazardIdentified}</td>
                        <td className="px-3 py-3 text-center font-bold text-slate-700">{r.probability}</td>
                        <td className="px-3 py-3 text-center font-bold text-slate-700">{r.severity}</td>
                        <td className="px-3 py-3 text-center">
                          <span className="font-extrabold text-slate-800">{r.riskScore}</span>
                        </td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${RISK_BADGE[r.riskCategory] || RISK_BADGE.Low}`}>
                            {r.riskCategory}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{r.responsiblePerson}</td>
                        <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{r.targetCompletionDate || '—'}</td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${ASSESS_STATUS_BADGE[r.status] || ASSESS_STATUS_BADGE.Open}`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenAssessmentModal(r)}
                              className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                              title="Edit"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteAssessment(r.id)}
                              className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredAssessments.length === 0 && (
                      <tr>
                        <td colSpan={TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">
                          {assessmentSearch ? 'No records match your search.' : 'No fire risk assessments found. Click "Add Assessment" to get started.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                <span className="text-[9px] text-slate-400 font-medium">
                  Showing {filteredAssessments.length} of {assessments.length} record{assessments.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* ── Add / Edit Modal ── */}
            {isAssessmentModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-800">
                        {editingAssessmentId ? 'Edit Fire Risk Assessment' : 'Add Fire Risk Assessment'}
                      </h3>
                      <p className="text-[9px] text-slate-400 mt-0.5">Fire Risk Assessment Form</p>
                    </div>
                    <button
                      onClick={() => { setIsAssessmentModalOpen(false); setEditingAssessmentId(null); setAssessmentForm(BLANK_FORM); }}
                      className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4 text-slate-500" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveAssessment} className="space-y-5">
                    <div className="grid grid-cols-2 gap-3">
                      {/* Assessment ID (read-only) */}
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Assessment ID</label>
                        <input
                          type="text"
                          value={assessmentForm.assessmentId}
                          readOnly
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-500 bg-slate-50 cursor-not-allowed"
                        />
                      </div>

                      {/* Area */}
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Area *</label>
                        <select
                          value={assessmentForm.area}
                          onChange={(e) => setAssessmentForm({ ...assessmentForm, area: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                          required
                        >
                          {RISK_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                      </div>

                      {/* Hazard Identified */}
                      <div className="col-span-2">
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Hazard Identified *</label>
                        <input
                          type="text"
                          value={assessmentForm.hazardIdentified}
                          onChange={(e) => setAssessmentForm({ ...assessmentForm, hazardIdentified: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="Describe the fire hazard identified"
                          required
                        />
                      </div>

                      {/* Probability */}
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Probability (1–3) *</label>
                        <select
                          value={assessmentForm.probability}
                          onChange={(e) => {
                            const prob = Number(e.target.value);
                            const { riskScore, riskCategory } = computeRisk(prob, Number(assessmentForm.severity));
                            setAssessmentForm({ ...assessmentForm, probability: prob, riskScore, riskCategory });
                          }}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                          required
                        >
                          <option value={1}>1 – Low</option>
                          <option value={2}>2 – Medium</option>
                          <option value={3}>3 – High</option>
                        </select>
                      </div>

                      {/* Severity */}
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Severity (1–3) *</label>
                        <select
                          value={assessmentForm.severity}
                          onChange={(e) => {
                            const sev = Number(e.target.value);
                            const { riskScore, riskCategory } = computeRisk(Number(assessmentForm.probability), sev);
                            setAssessmentForm({ ...assessmentForm, severity: sev, riskScore, riskCategory });
                          }}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                          required
                        >
                          <option value={1}>1 – Minor</option>
                          <option value={2}>2 – Moderate</option>
                          <option value={3}>3 – Severe</option>
                        </select>
                      </div>

                      {/* Risk Score (auto-calculated) */}
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Risk Score (auto)</label>
                        <input
                          type="text"
                          value={assessmentForm.riskScore}
                          readOnly
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-500 bg-slate-50 font-bold cursor-not-allowed"
                        />
                      </div>

                      {/* Risk Category (auto-calculated) */}
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Risk Category (auto)</label>
                        <input
                          type="text"
                          value={assessmentForm.riskCategory}
                          readOnly
                          className={`w-full px-3 py-2 border rounded-lg text-[10px] font-bold cursor-not-allowed ${
                            assessmentForm.riskCategory === 'High'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : assessmentForm.riskCategory === 'Medium'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        />
                      </div>

                      {/* Existing Control Measures */}
                      <div className="col-span-2">
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Existing Control Measures</label>
                        <textarea
                          value={assessmentForm.existingControlMeasures}
                          onChange={(e) => setAssessmentForm({ ...assessmentForm, existingControlMeasures: e.target.value })}
                          rows={2}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="Describe existing controls already in place"
                        />
                      </div>

                      {/* Recommended Actions */}
                      <div className="col-span-2">
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Recommended Actions</label>
                        <textarea
                          value={assessmentForm.recommendedActions}
                          onChange={(e) => setAssessmentForm({ ...assessmentForm, recommendedActions: e.target.value })}
                          rows={2}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="Describe recommended corrective/preventive actions"
                        />
                      </div>

                      {/* Responsible Person */}
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Responsible Person *</label>
                        <input
                          type="text"
                          value={assessmentForm.responsiblePerson}
                          onChange={(e) => setAssessmentForm({ ...assessmentForm, responsiblePerson: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="Name of responsible person"
                          required
                        />
                      </div>

                      {/* Target Completion Date */}
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Target Completion Date</label>
                        <input
                          type="date"
                          value={assessmentForm.targetCompletionDate}
                          onChange={(e) => setAssessmentForm({ ...assessmentForm, targetCompletionDate: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      {/* Status */}
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                        <select
                          value={assessmentForm.status}
                          onChange={(e) => setAssessmentForm({ ...assessmentForm, status: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                          {ASSESSMENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>

                      {/* Remarks */}
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                        <input
                          type="text"
                          value={assessmentForm.remarks}
                          onChange={(e) => setAssessmentForm({ ...assessmentForm, remarks: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="Optional remarks"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => { setIsAssessmentModalOpen(false); setEditingAssessmentId(null); setAssessmentForm(BLANK_FORM); }}
                        className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        style={{ backgroundColor: hospital.themeColor }}
                        className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                      >
                        {editingAssessmentId ? 'Save Changes' : 'Add Assessment'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      }

      case 'equipment': {
        const totalExtinguishers = extinguishers.length;
        const totalHydrants = hydrants.length;
        const totalAlarms = alarms.length;
        const functionalExt = extinguishers.filter(r => r.status === 'Functional').length;
        const functionalHyd = hydrants.filter(r => r.status === 'Functional').length;
        const functionalAlm = alarms.filter(r => r.status === 'Functional').length;
        const totalEquip = totalExtinguishers + totalHydrants + totalAlarms;
        const totalFunctional = functionalExt + functionalHyd + functionalAlm;

        const compliancePct = totalEquip ? ((totalFunctional / totalEquip) * 100).toFixed(1) : 0;
        
        // Mock readiness: (functional / total)*100, but using slightly different weighting or just compliancePct for simplicity
        const readinessPct = compliancePct;
        const dueRefill = extinguishers.filter(r => {
          if (!r.nextRefill) return false;
          return new Date(r.nextRefill) <= new Date(); // Mock due logic
        }).length;

        // Sub-tab specific variables
        const filteredExtinguishers = extinguishers.filter(r => {
          const q = extinguisherSearch.toLowerCase();
          return r.equipmentId.toLowerCase().includes(q) || r.location.toLowerCase().includes(q) || r.type.toLowerCase().includes(q) || r.status.toLowerCase().includes(q) || r.checkedBy.toLowerCase().includes(q);
        });
        const filteredHydrants = hydrants.filter(r => {
          const q = hydrantSearch.toLowerCase();
          return r.inspectionId.toLowerCase().includes(q) || r.location.toLowerCase().includes(q) || r.status.toLowerCase().includes(q) || r.inspector.toLowerCase().includes(q);
        });
        const filteredAlarms = alarms.filter(r => {
          const q = alarmSearch.toLowerCase();
          return r.deviceId.toLowerCase().includes(q) || r.zone.toLowerCase().includes(q) || r.deviceType.toLowerCase().includes(q) || r.status.toLowerCase().includes(q) || r.checkedBy.toLowerCase().includes(q);
        });

        const EQUIP_STATUS_BADGE = {
          'Functional': 'bg-emerald-50 text-emerald-700 border-emerald-200',
          'Needs Repair': 'bg-amber-50 text-amber-700 border-amber-200',
          'Out of Service': 'bg-rose-50 text-rose-700 border-rose-200',
        };

        return (
          <div className="space-y-4">
            {/* Header */}
            <div>
              <h3 className="text-xs font-extrabold text-slate-800">Fire Equipment Management</h3>
              <p className="text-[9px] text-slate-400 mt-0.5">Manage extinguishers, hydrants, alarms and smoke detectors</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Total Fire Extinguishers', value: totalExtinguishers,  color: 'text-blue-600' },
                { label: 'Extinguishers Due for Refill', value: dueRefill,          color: 'text-amber-600' },
                { label: 'Total Hydrants',           value: totalHydrants,       color: 'text-indigo-600' },
                { label: 'Functional Hydrants',      value: functionalHyd,       color: 'text-emerald-600' },
                { label: 'Fire Alarm Devices',       value: totalAlarms,         color: 'text-violet-600' },
                { label: 'Functional Alarm Devices', value: functionalAlm,       color: 'text-teal-600' },
                { label: 'Equipment Compliance %',   value: `${compliancePct}%`, color: 'text-emerald-600' },
                { label: 'Equipment Readiness %',    value: `${readinessPct}%`,  color: 'text-sky-600' },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                  <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>

            {/* Sub-tabs for the 3 CRUD modules */}
            <div className="flex items-center gap-2 border-b border-slate-200 mb-4">
              {[
                { id: 'extinguishers', label: 'Fire Extinguishers' },
                { id: 'hydrants', label: 'Hydrant Inspections' },
                { id: 'alarms', label: 'Alarms & Detectors' },
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setActiveEquipmentSubTab(sub.id)}
                  className={`px-4 py-2 text-[10px] font-bold transition-all border-b-2 ${
                    activeEquipmentSubTab === sub.id
                      ? 'border-sky-500 text-sky-700'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* ── Extinguisher Register ── */}
            {activeEquipmentSubTab === 'extinguishers' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search extinguishers..." value={extinguisherSearch} onChange={(e) => setExtinguisherSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <button onClick={() => handleOpenExtinguisherModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 shadow-sm">
                    <Plus className="w-3.5 h-3.5" /> Add Extinguisher
                  </button>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>{['Equip ID', 'Location', 'Type', 'Capacity', 'Last Refill', 'Next Refill', 'Condition', 'Status', 'Actions'].map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredExtinguishers.map(r => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.equipmentId}</td>
                            <td className="px-3 py-3 font-semibold text-slate-700">{r.location}</td>
                            <td className="px-3 py-3 text-slate-600">{r.type}</td>
                            <td className="px-3 py-3 text-slate-600">{r.capacity}</td>
                            <td className="px-3 py-3 text-slate-600">{r.lastRefill}</td>
                            <td className="px-3 py-3 font-bold text-slate-700">{r.nextRefill}</td>
                            <td className="px-3 py-3 text-slate-600">{r.condition}</td>
                            <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${EQUIP_STATUS_BADGE[r.status] || EQUIP_STATUS_BADGE['Functional']}`}>{r.status}</span></td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleOpenExtinguisherModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700"><Edit3 className="w-3 h-3" /></button>
                                <button onClick={() => handleDeleteExtinguisher(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredExtinguishers.length === 0 && <tr><td colSpan={9} className="px-3 py-10 text-center text-[10px] text-slate-400">No fire extinguishers found.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── Hydrant Register ── */}
            {activeEquipmentSubTab === 'hydrants' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search hydrants..." value={hydrantSearch} onChange={(e) => setHydrantSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <button onClick={() => handleOpenHydrantModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 shadow-sm">
                    <Plus className="w-3.5 h-3.5" /> Add Inspection
                  </button>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>{['Insp ID', 'Location', 'Pressure', 'Hose Cond', 'Valve Cond', 'Pump Func', 'Insp Date', 'Status', 'Actions'].map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredHydrants.map(r => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.inspectionId}</td>
                            <td className="px-3 py-3 font-semibold text-slate-700">{r.location}</td>
                            <td className="px-3 py-3 text-slate-600">{r.pressure}</td>
                            <td className="px-3 py-3 text-slate-600">{r.hoseCondition}</td>
                            <td className="px-3 py-3 text-slate-600">{r.valveCondition}</td>
                            <td className="px-3 py-3 text-slate-600">{r.pumpFunctional}</td>
                            <td className="px-3 py-3 text-slate-600">{r.inspectionDate}</td>
                            <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${EQUIP_STATUS_BADGE[r.status] || EQUIP_STATUS_BADGE['Functional']}`}>{r.status}</span></td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleOpenHydrantModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700"><Edit3 className="w-3 h-3" /></button>
                                <button onClick={() => handleDeleteHydrant(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredHydrants.length === 0 && <tr><td colSpan={9} className="px-3 py-10 text-center text-[10px] text-slate-400">No hydrant inspections found.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── Alarm Register ── */}
            {activeEquipmentSubTab === 'alarms' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search alarms..." value={alarmSearch} onChange={(e) => setAlarmSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <button onClick={() => handleOpenAlarmModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 shadow-sm">
                    <Plus className="w-3.5 h-3.5" /> Add Alarm
                  </button>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>{['Device ID', 'Zone', 'Type', 'Func Status', 'Battery', 'Test Result', 'Insp Date', 'Status', 'Actions'].map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredAlarms.map(r => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.deviceId}</td>
                            <td className="px-3 py-3 font-semibold text-slate-700">{r.zone}</td>
                            <td className="px-3 py-3 text-slate-600">{r.deviceType}</td>
                            <td className="px-3 py-3 text-slate-600">{r.funcStatus}</td>
                            <td className="px-3 py-3 text-slate-600">{r.batteryStatus}</td>
                            <td className="px-3 py-3 text-slate-600">{r.testResult}</td>
                            <td className="px-3 py-3 text-slate-600">{r.inspectionDate}</td>
                            <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${EQUIP_STATUS_BADGE[r.status] || EQUIP_STATUS_BADGE['Functional']}`}>{r.status}</span></td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleOpenAlarmModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700"><Edit3 className="w-3 h-3" /></button>
                                <button onClick={() => handleDeleteAlarm(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredAlarms.length === 0 && <tr><td colSpan={9} className="px-3 py-10 text-center text-[10px] text-slate-400">No alarm devices found.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── Extinguisher Modal ── */}
            {isExtinguisherModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-extrabold text-slate-800">{editingExtinguisherId ? 'Edit Extinguisher' : 'Add Extinguisher'}</h3>
                    <button onClick={() => { setIsExtinguisherModalOpen(false); setEditingExtinguisherId(null); setExtinguisherForm(BLANK_EXT_FORM); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
                  </div>
                  <form onSubmit={handleSaveExtinguisher} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Equipment ID</label><input type="text" value={extinguisherForm.equipmentId} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-500 bg-slate-50" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Location *</label><input type="text" value={extinguisherForm.location} onChange={e => setExtinguisherForm({...extinguisherForm, location: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Type *</label><select value={extinguisherForm.type} onChange={e => setExtinguisherForm({...extinguisherForm, type: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{EXTINGUISHER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Capacity *</label><input type="text" value={extinguisherForm.capacity} onChange={e => setExtinguisherForm({...extinguisherForm, capacity: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Mfg Date</label><input type="date" value={extinguisherForm.mfgDate} onChange={e => setExtinguisherForm({...extinguisherForm, mfgDate: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Last Refill Date</label><input type="date" value={extinguisherForm.lastRefill} onChange={e => setExtinguisherForm({...extinguisherForm, lastRefill: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Next Refill Due</label><input type="date" value={extinguisherForm.nextRefill} onChange={e => setExtinguisherForm({...extinguisherForm, nextRefill: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Pressure Gauge</label><select value={extinguisherForm.pressureGauge} onChange={e => setExtinguisherForm({...extinguisherForm, pressureGauge: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{GAUGE_STATUS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Seal Status</label><select value={extinguisherForm.seal} onChange={e => setExtinguisherForm({...extinguisherForm, seal: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{SEAL_STATUS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Physical Condition</label><select value={extinguisherForm.condition} onChange={e => setExtinguisherForm({...extinguisherForm, condition: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{CONDITION_STATUS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label><select value={extinguisherForm.status} onChange={e => setExtinguisherForm({...extinguisherForm, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{EQUIPMENT_STATUS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Checked By *</label><input type="text" value={extinguisherForm.checkedBy} onChange={e => setExtinguisherForm({...extinguisherForm, checkedBy: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label><input type="text" value={extinguisherForm.remarks} onChange={e => setExtinguisherForm({...extinguisherForm, remarks: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button type="button" onClick={() => { setIsExtinguisherModalOpen(false); setEditingExtinguisherId(null); setExtinguisherForm(BLANK_EXT_FORM); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold">Cancel</button>
                      <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 shadow-sm">{editingExtinguisherId ? 'Save Changes' : 'Add Extinguisher'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ── Hydrant Modal ── */}
            {isHydrantModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-extrabold text-slate-800">{editingHydrantId ? 'Edit Hydrant Inspection' : 'Add Hydrant Inspection'}</h3>
                    <button onClick={() => { setIsHydrantModalOpen(false); setEditingHydrantId(null); setHydrantForm(BLANK_HYD_FORM); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
                  </div>
                  <form onSubmit={handleSaveHydrant} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Inspection ID</label><input type="text" value={hydrantForm.inspectionId} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-500 bg-slate-50" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Location *</label><input type="text" value={hydrantForm.location} onChange={e => setHydrantForm({...hydrantForm, location: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Hydrant Pressure</label><select value={hydrantForm.pressure} onChange={e => setHydrantForm({...hydrantForm, pressure: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{HYDRANT_PRESSURE.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Hose Condition</label><select value={hydrantForm.hoseCondition} onChange={e => setHydrantForm({...hydrantForm, hoseCondition: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{CONDITION_STATUS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Valve Condition</label><select value={hydrantForm.valveCondition} onChange={e => setHydrantForm({...hydrantForm, valveCondition: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{CONDITION_STATUS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Pump Functional</label><select value={hydrantForm.pumpFunctional} onChange={e => setHydrantForm({...hydrantForm, pumpFunctional: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500"><option value="Yes">Yes</option><option value="No">No</option></select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Water Availability</label><select value={hydrantForm.waterAvail} onChange={e => setHydrantForm({...hydrantForm, waterAvail: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500"><option value="Yes">Yes</option><option value="No">No</option></select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Inspection Date *</label><input type="date" value={hydrantForm.inspectionDate} onChange={e => setHydrantForm({...hydrantForm, inspectionDate: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Inspector *</label><input type="text" value={hydrantForm.inspector} onChange={e => setHydrantForm({...hydrantForm, inspector: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label><select value={hydrantForm.status} onChange={e => setHydrantForm({...hydrantForm, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{EQUIPMENT_STATUS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label><input type="text" value={hydrantForm.remarks} onChange={e => setHydrantForm({...hydrantForm, remarks: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button type="button" onClick={() => { setIsHydrantModalOpen(false); setEditingHydrantId(null); setHydrantForm(BLANK_HYD_FORM); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold">Cancel</button>
                      <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 shadow-sm">{editingHydrantId ? 'Save Changes' : 'Add Inspection'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ── Alarm Modal ── */}
            {isAlarmModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-extrabold text-slate-800">{editingAlarmId ? 'Edit Alarm Device' : 'Add Alarm Device'}</h3>
                    <button onClick={() => { setIsAlarmModalOpen(false); setEditingAlarmId(null); setAlarmForm(BLANK_ALM_FORM); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
                  </div>
                  <form onSubmit={handleSaveAlarm} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Device ID</label><input type="text" value={alarmForm.deviceId} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-500 bg-slate-50" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Zone / Location *</label><input type="text" value={alarmForm.zone} onChange={e => setAlarmForm({...alarmForm, zone: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Device Type *</label><select value={alarmForm.deviceType} onChange={e => setAlarmForm({...alarmForm, deviceType: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{DEVICE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Functional Status</label><select value={alarmForm.funcStatus} onChange={e => setAlarmForm({...alarmForm, funcStatus: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500"><option value="Functional">Functional</option><option value="Faulty">Faulty</option><option value="Isolated">Isolated</option></select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Battery Status</label><select value={alarmForm.batteryStatus} onChange={e => setAlarmForm({...alarmForm, batteryStatus: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{BATTERY_STATUS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Alarm Test Result</label><select value={alarmForm.testResult} onChange={e => setAlarmForm({...alarmForm, testResult: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{TEST_RESULT.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Inspection Date *</label><input type="date" value={alarmForm.inspectionDate} onChange={e => setAlarmForm({...alarmForm, inspectionDate: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Next Inspection</label><input type="date" value={alarmForm.nextInspection} onChange={e => setAlarmForm({...alarmForm, nextInspection: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Checked By *</label><input type="text" value={alarmForm.checkedBy} onChange={e => setAlarmForm({...alarmForm, checkedBy: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Overall Status</label><select value={alarmForm.status} onChange={e => setAlarmForm({...alarmForm, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{EQUIPMENT_STATUS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label><input type="text" value={alarmForm.remarks} onChange={e => setAlarmForm({...alarmForm, remarks: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button type="button" onClick={() => { setIsAlarmModalOpen(false); setEditingAlarmId(null); setAlarmForm(BLANK_ALM_FORM); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold">Cancel</button>
                      <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 shadow-sm">{editingAlarmId ? 'Save Changes' : 'Add Alarm Device'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      }

      case 'training': {
        const totalTraining = trainingRecords.length;
        const staffTrained = new Set(trainingRecords.map(r => r.employeeId)).size;
        const compliancePct = totalTraining ? '95.5' : '0'; // Mock logic for training compliance based on hospital total staff (assumed 100 for this mock)
        
        const totalDrills = drillRecords.length;
        const successfulDrills = drillRecords.filter(r => r.result === 'Excellent' || r.result === 'Satisfactory').length;
        
        const totalEvacuations = evacRecords.length;
        
        let totalTime = 0;
        evacRecords.forEach(r => {
          totalTime += parseFloat(r.evacuationTime || 0);
        });
        const avgEvacTime = totalEvacuations ? (totalTime / totalEvacuations).toFixed(1) + ' mins' : '0 mins';
        const overallCompliance = ((parseFloat(compliancePct) + (totalDrills ? (successfulDrills / totalDrills) * 100 : 0)) / (totalDrills ? 2 : 1)).toFixed(1);

        const filteredTraining = trainingRecords.filter(r => {
          const q = trainingSearch.toLowerCase();
          return r.trainingId.toLowerCase().includes(q) || r.employeeName.toLowerCase().includes(q) || r.department.toLowerCase().includes(q) || r.trainingType.toLowerCase().includes(q);
        });
        const filteredDrills = drillRecords.filter(r => {
          const q = drillSearch.toLowerCase();
          return r.drillId.toLowerCase().includes(q) || r.department.toLowerCase().includes(q) || r.drillType.toLowerCase().includes(q) || r.result.toLowerCase().includes(q);
        });
        const filteredEvacs = evacRecords.filter(r => {
          const q = evacSearch.toLowerCase();
          return r.evacuationId.toLowerCase().includes(q) || r.area.toLowerCase().includes(q) || r.status.toLowerCase().includes(q);
        });

        const STATUS_BADGE = {
          'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
          'Excellent': 'bg-emerald-50 text-emerald-700 border-emerald-200',
          'Satisfactory': 'bg-blue-50 text-blue-700 border-blue-200',
          'Needs Improvement': 'bg-amber-50 text-amber-700 border-amber-200',
          'Failed': 'bg-rose-50 text-rose-700 border-rose-200',
        };

        return (
          <div className="space-y-4">
            {/* Header */}
            <div>
              <h3 className="text-xs font-extrabold text-slate-800">Fire Training & Evacuation</h3>
              <p className="text-[9px] text-slate-400 mt-0.5">Manage safety training, mock drills, and evacuation exercises</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Total Training Sessions', value: totalTraining,     color: 'text-blue-600' },
                { label: 'Staff Trained',           value: staffTrained,      color: 'text-indigo-600' },
                { label: 'Training Compliance %',   value: `${compliancePct}%`, color: 'text-emerald-600' },
                { label: 'Fire Drills Conducted',   value: totalDrills,       color: 'text-violet-600' },
                { label: 'Successful Fire Drills',  value: successfulDrills,  color: 'text-teal-600' },
                { label: 'Evacuation Drills',       value: totalEvacuations,  color: 'text-amber-600' },
                { label: 'Average Evacuation Time', value: avgEvacTime,       color: 'text-rose-600' },
                { label: 'Overall Compliance %',    value: `${overallCompliance}%`, color: 'text-sky-600' },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                  <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 mb-4">
              {[
                { id: 'training', label: 'Safety Training' },
                { id: 'drills', label: 'Fire Drills' },
                { id: 'evacuations', label: 'Evacuations' },
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setActiveTrainingSubTab(sub.id)}
                  className={`px-4 py-2 text-[10px] font-bold transition-all border-b-2 ${
                    activeTrainingSubTab === sub.id
                      ? 'border-sky-500 text-sky-700'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* ── Training Register ── */}
            {activeTrainingSubTab === 'training' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search training records..." value={trainingSearch} onChange={(e) => setTrainingSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <button onClick={() => handleOpenTrainingModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 shadow-sm">
                    <Plus className="w-3.5 h-3.5" /> Add Training
                  </button>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>{['Train ID', 'Employee Name', 'Emp ID', 'Dept', 'Type', 'Trainer', 'Date', 'Status', 'Actions'].map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredTraining.map(r => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.trainingId}</td>
                            <td className="px-3 py-3 font-semibold text-slate-700">{r.employeeName}</td>
                            <td className="px-3 py-3 text-slate-600">{r.employeeId}</td>
                            <td className="px-3 py-3 text-slate-600">{r.department}</td>
                            <td className="px-3 py-3 text-slate-600">{r.trainingType}</td>
                            <td className="px-3 py-3 text-slate-600">{r.trainer}</td>
                            <td className="px-3 py-3 text-slate-600">{r.trainingDate}</td>
                            <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE['Completed']}`}>{r.status}</span></td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleOpenTrainingModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700"><Edit3 className="w-3 h-3" /></button>
                                <button onClick={() => handleDeleteTraining(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredTraining.length === 0 && <tr><td colSpan={9} className="px-3 py-10 text-center text-[10px] text-slate-400">No training records found.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── Drill Register ── */}
            {activeTrainingSubTab === 'drills' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search drills..." value={drillSearch} onChange={(e) => setDrillSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <button onClick={() => handleOpenDrillModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 shadow-sm">
                    <Plus className="w-3.5 h-3.5" /> Add Drill
                  </button>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>{['Drill ID', 'Date', 'Dept / Area', 'Participants', 'Type', 'Duration', 'Result', 'Conducted By', 'Actions'].map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredDrills.map(r => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.drillId}</td>
                            <td className="px-3 py-3 font-semibold text-slate-700">{r.drillDate}</td>
                            <td className="px-3 py-3 text-slate-600">{r.department}</td>
                            <td className="px-3 py-3 text-slate-600">{r.participants}</td>
                            <td className="px-3 py-3 text-slate-600">{r.drillType}</td>
                            <td className="px-3 py-3 text-slate-600">{r.duration}</td>
                            <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.result] || STATUS_BADGE['Satisfactory']}`}>{r.result}</span></td>
                            <td className="px-3 py-3 text-slate-600">{r.conductedBy}</td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleOpenDrillModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700"><Edit3 className="w-3 h-3" /></button>
                                <button onClick={() => handleDeleteDrill(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredDrills.length === 0 && <tr><td colSpan={9} className="px-3 py-10 text-center text-[10px] text-slate-400">No drill records found.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── Evacuation Register ── */}
            {activeTrainingSubTab === 'evacuations' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search evacuations..." value={evacSearch} onChange={(e) => setEvacSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <button onClick={() => handleOpenEvacModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 shadow-sm">
                    <Plus className="w-3.5 h-3.5" /> Add Evacuation
                  </button>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>{['Evac ID', 'Area', 'Date', 'Evac Time (m)', 'Pts Shifted', 'Staff Part', 'Status', 'Actions'].map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredEvacs.map(r => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.evacuationId}</td>
                            <td className="px-3 py-3 font-semibold text-slate-700">{r.area}</td>
                            <td className="px-3 py-3 text-slate-600">{r.drillDate}</td>
                            <td className="px-3 py-3 text-slate-600">{r.evacuationTime}</td>
                            <td className="px-3 py-3 text-slate-600">{r.patientsShifted}</td>
                            <td className="px-3 py-3 text-slate-600">{r.staffParticipated}</td>
                            <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE['Completed']}`}>{r.status}</span></td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleOpenEvacModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700"><Edit3 className="w-3 h-3" /></button>
                                <button onClick={() => handleDeleteEvac(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredEvacs.length === 0 && <tr><td colSpan={8} className="px-3 py-10 text-center text-[10px] text-slate-400">No evacuation records found.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── Training Modal ── */}
            {isTrainingModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-extrabold text-slate-800">{editingTrainingId ? 'Edit Training Record' : 'Add Training Record'}</h3>
                    <button onClick={() => { setIsTrainingModalOpen(false); setEditingTrainingId(null); setTrainingForm(BLANK_TRAIN_FORM); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
                  </div>
                  <form onSubmit={handleSaveTraining} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Training ID</label><input type="text" value={trainingForm.trainingId} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-500 bg-slate-50" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Employee Name *</label><input type="text" value={trainingForm.employeeName} onChange={e => setTrainingForm({...trainingForm, employeeName: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Employee ID *</label><input type="text" value={trainingForm.employeeId} onChange={e => setTrainingForm({...trainingForm, employeeId: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Department</label><input type="text" value={trainingForm.department} onChange={e => setTrainingForm({...trainingForm, department: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Training Type</label><select value={trainingForm.trainingType} onChange={e => setTrainingForm({...trainingForm, trainingType: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{TRAINING_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Trainer</label><input type="text" value={trainingForm.trainer} onChange={e => setTrainingForm({...trainingForm, trainer: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Training Date *</label><input type="date" value={trainingForm.trainingDate} onChange={e => setTrainingForm({...trainingForm, trainingDate: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Valid Until</label><input type="date" value={trainingForm.validUntil} onChange={e => setTrainingForm({...trainingForm, validUntil: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label><select value={trainingForm.status} onChange={e => setTrainingForm({...trainingForm, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500"><option value="Completed">Completed</option><option value="Pending">Pending</option></select></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label><input type="text" value={trainingForm.remarks} onChange={e => setTrainingForm({...trainingForm, remarks: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button type="button" onClick={() => { setIsTrainingModalOpen(false); setEditingTrainingId(null); setTrainingForm(BLANK_TRAIN_FORM); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold">Cancel</button>
                      <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 shadow-sm">{editingTrainingId ? 'Save Changes' : 'Add Training'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ── Drill Modal ── */}
            {isDrillModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-extrabold text-slate-800">{editingDrillId ? 'Edit Drill Record' : 'Add Drill Record'}</h3>
                    <button onClick={() => { setIsDrillModalOpen(false); setEditingDrillId(null); setDrillForm(BLANK_DRILL_FORM); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
                  </div>
                  <form onSubmit={handleSaveDrill} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Drill ID</label><input type="text" value={drillForm.drillId} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-500 bg-slate-50" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Drill Date *</label><input type="date" value={drillForm.drillDate} onChange={e => setDrillForm({...drillForm, drillDate: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Department / Area *</label><input type="text" value={drillForm.department} onChange={e => setDrillForm({...drillForm, department: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Participants</label><input type="number" value={drillForm.participants} onChange={e => setDrillForm({...drillForm, participants: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Drill Type</label><select value={drillForm.drillType} onChange={e => setDrillForm({...drillForm, drillType: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{DRILL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Duration</label><input type="text" placeholder="e.g. 15 mins" value={drillForm.duration} onChange={e => setDrillForm({...drillForm, duration: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Result</label><select value={drillForm.result} onChange={e => setDrillForm({...drillForm, result: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{DRILL_RESULTS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Conducted By *</label><input type="text" value={drillForm.conductedBy} onChange={e => setDrillForm({...drillForm, conductedBy: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label><input type="text" value={drillForm.remarks} onChange={e => setDrillForm({...drillForm, remarks: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button type="button" onClick={() => { setIsDrillModalOpen(false); setEditingDrillId(null); setDrillForm(BLANK_DRILL_FORM); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold">Cancel</button>
                      <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 shadow-sm">{editingDrillId ? 'Save Changes' : 'Add Drill'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ── Evacuation Modal ── */}
            {isEvacModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-extrabold text-slate-800">{editingEvacId ? 'Edit Evacuation Record' : 'Add Evacuation Record'}</h3>
                    <button onClick={() => { setIsEvacModalOpen(false); setEditingEvacId(null); setEvacForm(BLANK_EVAC_FORM); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
                  </div>
                  <form onSubmit={handleSaveEvac} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Evacuation ID</label><input type="text" value={evacForm.evacuationId} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-500 bg-slate-50" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Area *</label><input type="text" value={evacForm.area} onChange={e => setEvacForm({...evacForm, area: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Drill Date *</label><input type="date" value={evacForm.drillDate} onChange={e => setEvacForm({...evacForm, drillDate: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Evacuation Time (mins) *</label><input type="number" step="0.1" value={evacForm.evacuationTime} onChange={e => setEvacForm({...evacForm, evacuationTime: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Patients Shifted</label><input type="number" value={evacForm.patientsShifted} onChange={e => setEvacForm({...evacForm, patientsShifted: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Staff Participated</label><input type="number" value={evacForm.staffParticipated} onChange={e => setEvacForm({...evacForm, staffParticipated: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label><select value={evacForm.status} onChange={e => setEvacForm({...evacForm, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500"><option value="Completed">Completed</option><option value="Pending">Pending</option></select></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Observations</label><input type="text" value={evacForm.observations} onChange={e => setEvacForm({...evacForm, observations: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Improvement Actions</label><input type="text" value={evacForm.improvementActions} onChange={e => setEvacForm({...evacForm, improvementActions: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button type="button" onClick={() => { setIsEvacModalOpen(false); setEditingEvacId(null); setEvacForm(BLANK_EVAC_FORM); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold">Cancel</button>
                      <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 shadow-sm">{editingEvacId ? 'Save Changes' : 'Add Evacuation'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      }

      case 'incidents':
        return (
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
            <AlertTriangle className="w-12 h-12 text-slate-300" />
            <h3 className="text-sm font-extrabold text-slate-600">Fire Incidents & Emergency Response</h3>
            <p className="text-[10px] text-slate-400">Phase will be implemented in the next step.</p>
          </div>
        );

      case 'audit':
        return (
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
            <ClipboardCheck className="w-12 h-12 text-slate-300" />
            <h3 className="text-sm font-extrabold text-slate-600">Internal Audit</h3>
            <p className="text-[10px] text-slate-400">Phase will be implemented in the next step.</p>
          </div>
        );

      case 'reports':
        return (
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
            <FileText className="w-12 h-12 text-slate-300" />
            <h3 className="text-sm font-extrabold text-slate-600">Reports & Analytics</h3>
            <p className="text-[10px] text-slate-400">Phase will be implemented in the next step.</p>
          </div>
        );

      default:
        return null;
    }
  };

  // ─────────────────────────────────────────────
  // Outer shell (identical structure to other workspaces)
  // ─────────────────────────────────────────────
  return (
    <div className="flex gap-0 -m-6 min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider cursor-pointer transition-colors group"
          >
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Policies Directory
          </button>
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">Fire Risk Management</h2>
          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">Fire Safety Module</p>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scroll py-3 px-2 space-y-0.5">
          {TABS.map(({ id, label, icon: Icon }) => {
            const isActive = id === activeTab;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                style={isActive ? { backgroundColor: `${hospital.themeColor}0d`, borderColor: `${hospital.themeColor}22`, color: hospital.themeColor } : {}}
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
          <p className="text-[9px] text-slate-400 font-medium">
            Fire Risk Management • v1.0
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto custom-scroll p-6 bg-slate-50/30">
        {renderContent()}
      </main>
    </div>
  );
};

export default FireRiskManagementWorkspace;

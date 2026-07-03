import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  ChevronLeft,
  LayoutDashboard,
  BarChart3,
  HeartPulse,
  Clipboard,
  Pill,
  CheckSquare,
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

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'quality', label: 'Quality Indicators', icon: BarChart3 },
  { id: 'practices', label: 'Basic Nursing Practices', icon: HeartPulse },
  { id: 'clinical', label: 'Clinical Nursing Care', icon: Clipboard },
  { id: 'medication', label: 'Medication & Handover', icon: Pill },
  { id: 'audit', label: 'Internal Audit', icon: CheckSquare },
  { id: 'reports', label: 'Reports', icon: FileText },
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const QUALITY_CATEGORIES = ['Medication', 'Patient ID', 'Documentation', 'Handover', 'Safety', 'Other'];
const STATUS_BADGE_QUALITY = {
  Achieved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Partially Achieved': 'bg-amber-50 text-amber-700 border-amber-200',
  'Not Achieved': 'bg-rose-50 text-rose-700 border-rose-200',
};
const LS_KEY_QUALITY = 'nursing_quality_indicators';

const LS_KEY_PATIENT_ID = 'nursing_patient_identification';
const LS_KEY_ASSESSMENTS = 'nursing_assessments';
const LS_KEY_VITAL_SIGNS = 'nursing_vital_signs';

const LS_KEY_FALL_PREVENTION = 'nursing_fall_prevention';
const LS_KEY_PRESSURE_INJURY = 'nursing_pressure_injury';
const LS_KEY_PAIN_MANAGEMENT = 'nursing_pain_management';
const LS_KEY_MEDICATION = 'nursing_medication_administration';
const LS_KEY_HANDOVER = 'nursing_shift_handover';
const LS_KEY_DOCUMENTATION = 'nursing_documentation';
const LS_KEY_NURSING_AUDIT = 'nursing_internal_audits';
const LS_KEY_NURSING_CAPA = 'nursing_capa_records';

const WARDS = ['General Ward', 'ICU', 'CCU', 'NICU', 'Pediatric'];
const YES_NO = ['Yes', 'No'];
const PRACTICE_STATUSES = ['Completed', 'Pending', 'In Progress'];
const CONSCIOUSNESS_LEVELS = ['Alert', 'Confused', 'Drowsy'];
const FALL_RISK_LEVELS = ['Low', 'Medium', 'High'];
const PRESSURE_INJURY_RISK = ['Low', 'Medium', 'High', 'None'];

const NursingOperationsWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();
  const [activeTab, setActiveTab] = useState('dashboard');

  const SAMPLE_NURSING_RECORDS = [
    { id: 'nr-001', month: 'January', activities: 150, compliance: 95, incidents: 2, audits: 4 },
    { id: 'nr-002', month: 'February', activities: 165, compliance: 92, incidents: 3, audits: 3 },
    { id: 'nr-003', month: 'March', activities: 142, compliance: 96, incidents: 1, audits: 5 },
    { id: 'nr-004', month: 'April', activities: 158, compliance: 94, incidents: 2, audits: 4 },
    { id: 'nr-005', month: 'May', activities: 170, compliance: 97, incidents: 0, audits: 3 },
  ];

  const [qualityIndicators, setQualityIndicators] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_QUALITY);
    return saved ? JSON.parse(saved) : [
      { id: 'nq-001', indicatorName: 'Medication Administration Compliance', category: 'Medication', target: 100, actual: 98, month: 'January', year: 2025, status: 'Achieved', responsibleNurse: 'Nurse Sarah', remarks: 'Excellent performance' },
      { id: 'nq-002', indicatorName: 'Patient Identification Compliance', category: 'Patient ID', target: 100, actual: 95, month: 'February', year: 2025, status: 'Achieved', responsibleNurse: 'Nurse Raj', remarks: '' },
      { id: 'nq-003', indicatorName: 'Nursing Documentation Compliance', category: 'Documentation', target: 100, actual: 92, month: 'March', year: 2025, status: 'Partially Achieved', responsibleNurse: 'Nurse Priya', remarks: 'Improving' },
      { id: 'nq-004', indicatorName: 'Shift Handover Compliance', category: 'Handover', target: 100, actual: 96, month: 'April', year: 2025, status: 'Achieved', responsibleNurse: 'Nurse Amit', remarks: '' },
      { id: 'nq-005', indicatorName: 'Infection Control Compliance', category: 'Safety', target: 100, actual: 94, month: 'May', year: 2025, status: 'Partially Achieved', responsibleNurse: 'Nurse Maria', remarks: 'Watch for hand hygiene' },
    ];
  });
  const [isQualityModalOpen, setIsQualityModalOpen] = useState(false);
  const [editingQualityId, setEditingQualityId] = useState(null);
  const [qualityForm, setQualityForm] = useState({ id: '', indicatorName: '', category: 'Medication', target: 100, actual: 0, month: 'January', year: 2025, status: 'Achieved', responsibleNurse: '', remarks: '' });
  const [qualitySearch, setQualitySearch] = useState('');

  const [patientIdentifications, setPatientIdentifications] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_PATIENT_ID);
    return saved ? JSON.parse(saved) : [
      { id: 'pid-001', patientName: 'John Smith', uhid: 'UHID12345', ward: 'General Ward', bedNumber: '101', identificationBandVerified: 'Yes', verificationDate: '2025-01-15', verifiedBy: 'Nurse Sarah', status: 'Completed' },
      { id: 'pid-002', patientName: 'Mary Johnson', uhid: 'UHID12346', ward: 'ICU', bedNumber: '2', identificationBandVerified: 'Yes', verificationDate: '2025-01-16', verifiedBy: 'Nurse Raj', status: 'Completed' },
      { id: 'pid-003', patientName: 'Robert Davis', uhid: 'UHID12347', ward: 'CCU', bedNumber: '5', identificationBandVerified: 'No', verificationDate: '2025-01-17', verifiedBy: 'Nurse Priya', status: 'Pending' },
      { id: 'pid-004', patientName: 'Lisa Anderson', uhid: 'UHID12348', ward: 'NICU', bedNumber: '3', identificationBandVerified: 'Yes', verificationDate: '2025-01-18', verifiedBy: 'Nurse Amit', status: 'Completed' },
      { id: 'pid-005', patientName: 'Michael Clark', uhid: 'UHID12349', ward: 'Pediatric', bedNumber: '8', identificationBandVerified: 'Yes', verificationDate: '2025-01-19', verifiedBy: 'Nurse Maria', status: 'Completed' },
    ];
  });
  const [isPatientIdModalOpen, setIsPatientIdModalOpen] = useState(false);
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [patientIdForm, setPatientIdForm] = useState({ id: '', patientName: '', uhid: '', ward: 'General Ward', bedNumber: '', identificationBandVerified: 'Yes', verificationDate: '', verifiedBy: '', status: 'Completed' });
  const [patientIdSearch, setPatientIdSearch] = useState('');

  const [assessments, setAssessments] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_ASSESSMENTS);
    return saved ? JSON.parse(saved) : [
      { id: 'assess-001', assessmentId: 'AS-001', patientName: 'John Smith', admissionDate: '2025-01-15', assessmentDate: '2025-01-15', consciousnessLevel: 'Alert', fallRisk: 'Low', pressureInjuryRisk: 'Low', painScore: 2, assessedBy: 'Nurse Sarah', status: 'Completed' },
      { id: 'assess-002', assessmentId: 'AS-002', patientName: 'Mary Johnson', admissionDate: '2025-01-16', assessmentDate: '2025-01-16', consciousnessLevel: 'Confused', fallRisk: 'High', pressureInjuryRisk: 'Medium', painScore: 6, assessedBy: 'Nurse Raj', status: 'Completed' },
      { id: 'assess-003', assessmentId: 'AS-003', patientName: 'Robert Davis', admissionDate: '2025-01-17', assessmentDate: '2025-01-17', consciousnessLevel: 'Drowsy', fallRisk: 'Medium', pressureInjuryRisk: 'Low', painScore: 4, assessedBy: 'Nurse Priya', status: 'Pending' },
      { id: 'assess-004', assessmentId: 'AS-004', patientName: 'Lisa Anderson', admissionDate: '2025-01-18', assessmentDate: '2025-01-18', consciousnessLevel: 'Alert', fallRisk: 'Low', pressureInjuryRisk: 'None', painScore: 0, assessedBy: 'Nurse Amit', status: 'Completed' },
      { id: 'assess-005', assessmentId: 'AS-005', patientName: 'Michael Clark', admissionDate: '2025-01-19', assessmentDate: '2025-01-19', consciousnessLevel: 'Alert', fallRisk: 'Low', pressureInjuryRisk: 'Low', painScore: 1, assessedBy: 'Nurse Maria', status: 'Completed' },
    ];
  });
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [editingAssessmentId, setEditingAssessmentId] = useState(null);
  const [assessmentForm, setAssessmentForm] = useState({ id: '', assessmentId: '', patientName: '', admissionDate: '', assessmentDate: '', consciousnessLevel: 'Alert', fallRisk: 'Low', pressureInjuryRisk: 'Low', painScore: 0, assessedBy: '', status: 'Completed' });
  const [assessmentSearch, setAssessmentSearch] = useState('');

  const [vitalSigns, setVitalSigns] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_VITAL_SIGNS);
    return saved ? JSON.parse(saved) : [
      { id: 'vs-001', recordId: 'VS-001', patientName: 'John Smith', temperature: 98.6, pulse: 78, respiratoryRate: 18, bloodPressure: '120/80', spo2: 98, recordedDateTime: '2025-01-15 08:00', recordedBy: 'Nurse Sarah' },
      { id: 'vs-002', recordId: 'VS-002', patientName: 'Mary Johnson', temperature: 99.2, pulse: 92, respiratoryRate: 22, bloodPressure: '130/85', spo2: 96, recordedDateTime: '2025-01-15 08:30', recordedBy: 'Nurse Raj' },
      { id: 'vs-003', recordId: 'VS-003', patientName: 'Robert Davis', temperature: 97.8, pulse: 88, respiratoryRate: 20, bloodPressure: '110/70', spo2: 97, recordedDateTime: '2025-01-15 09:00', recordedBy: 'Nurse Priya' },
      { id: 'vs-004', recordId: 'VS-004', patientName: 'Lisa Anderson', temperature: 98.4, pulse: 72, respiratoryRate: 16, bloodPressure: '115/75', spo2: 99, recordedDateTime: '2025-01-15 09:30', recordedBy: 'Nurse Amit' },
      { id: 'vs-005', recordId: 'VS-005', patientName: 'Michael Clark', temperature: 99.0, pulse: 84, respiratoryRate: 19, bloodPressure: '125/82', spo2: 97, recordedDateTime: '2025-01-15 10:00', recordedBy: 'Nurse Maria' },
    ];
  });
  const [isVitalSignModalOpen, setIsVitalSignModalOpen] = useState(false);
  const [editingVitalSignId, setEditingVitalSignId] = useState(null);
  const [vitalSignForm, setVitalSignForm] = useState({ id: '', recordId: '', patientName: '', temperature: 98.6, pulse: 0, respiratoryRate: 0, bloodPressure: '', spo2: 0, recordedDateTime: '', recordedBy: '' });
  const [vitalSignSearch, setVitalSignSearch] = useState('');

  const [fallPreventions, setFallPreventions] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_FALL_PREVENTION);
    return saved ? JSON.parse(saved) : [
      { id: 'fp-001', patientName: 'John Smith', ward: 'General Ward', fallRiskLevel: 'Low', riskAssessmentDate: '2025-01-15', preventiveMeasures: 'Low bed, call bell within reach', responsibleNurse: 'Nurse Sarah', status: 'Completed' },
      { id: 'fp-002', patientName: 'Mary Johnson', ward: 'ICU', fallRiskLevel: 'High', riskAssessmentDate: '2025-01-16', preventiveMeasures: 'Hourly checks, bed alarm', responsibleNurse: 'Nurse Raj', status: 'Completed' },
      { id: 'fp-003', patientName: 'Robert Davis', ward: 'CCU', fallRiskLevel: 'Medium', riskAssessmentDate: '2025-01-17', preventiveMeasures: 'Assisted ambulation', responsibleNurse: 'Nurse Priya', status: 'In Progress' },
      { id: 'fp-004', patientName: 'Lisa Anderson', ward: 'NICU', fallRiskLevel: 'Low', riskAssessmentDate: '2025-01-18', preventiveMeasures: 'Routine monitoring', responsibleNurse: 'Nurse Amit', status: 'Completed' },
      { id: 'fp-005', patientName: 'Michael Clark', ward: 'Pediatric', fallRiskLevel: 'High', riskAssessmentDate: '2025-01-19', preventiveMeasures: 'Safety vest, frequent rounds', responsibleNurse: 'Nurse Maria', status: 'Pending' },
    ];
  });
  const [isFallPreventionModalOpen, setIsFallPreventionModalOpen] = useState(false);
  const [editingFallPreventionId, setEditingFallPreventionId] = useState(null);
  const [fallPreventionForm, setFallPreventionForm] = useState({ id: '', patientName: '', ward: 'General Ward', fallRiskLevel: 'Low', riskAssessmentDate: '', preventiveMeasures: '', responsibleNurse: '', status: 'Completed' });
  const [fallPreventionSearch, setFallPreventionSearch] = useState('');

  const [pressureInjuries, setPressureInjuries] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_PRESSURE_INJURY);
    return saved ? JSON.parse(saved) : [
      { id: 'pi-001', patientName: 'John Smith', bradenScore: 18, riskLevel: 'Low', skinAssessmentDate: '2025-01-15', repositioningSchedule: 'Every 4 hours', responsibleNurse: 'Nurse Sarah', status: 'Completed' },
      { id: 'pi-002', patientName: 'Mary Johnson', bradenScore: 12, riskLevel: 'High', skinAssessmentDate: '2025-01-16', repositioningSchedule: 'Every 2 hours', responsibleNurse: 'Nurse Raj', status: 'Completed' },
      { id: 'pi-003', patientName: 'Robert Davis', bradenScore: 15, riskLevel: 'Medium', skinAssessmentDate: '2025-01-17', repositioningSchedule: 'Every 3 hours', responsibleNurse: 'Nurse Priya', status: 'In Progress' },
      { id: 'pi-004', patientName: 'Lisa Anderson', bradenScore: 20, riskLevel: 'Low', skinAssessmentDate: '2025-01-18', repositioningSchedule: 'Every 6 hours', responsibleNurse: 'Nurse Amit', status: 'Completed' },
      { id: 'pi-005', patientName: 'Michael Clark', bradenScore: 14, riskLevel: 'High', skinAssessmentDate: '2025-01-19', repositioningSchedule: 'Every 1 hour', responsibleNurse: 'Nurse Maria', status: 'Pending' },
    ];
  });
  const [isPressureInjuryModalOpen, setIsPressureInjuryModalOpen] = useState(false);
  const [editingPressureInjuryId, setEditingPressureInjuryId] = useState(null);
  const [pressureInjuryForm, setPressureInjuryForm] = useState({ id: '', patientName: '', bradenScore: 20, riskLevel: 'Low', skinAssessmentDate: '', repositioningSchedule: '', responsibleNurse: '', status: 'Completed' });
  const [pressureInjurySearch, setPressureInjurySearch] = useState('');

  const [painManagements, setPainManagements] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_PAIN_MANAGEMENT);
    return saved ? JSON.parse(saved) : [
      { id: 'pm-001', patientName: 'John Smith', painScore: 2, painLocation: 'Abdomen', interventionGiven: 'Oral analgesic', reassessmentScore: 1, assessmentDate: '2025-01-15', responsibleNurse: 'Nurse Sarah' },
      { id: 'pm-002', patientName: 'Mary Johnson', painScore: 6, painLocation: 'Lower back', interventionGiven: 'IV analgesic', reassessmentScore: 3, assessmentDate: '2025-01-16', responsibleNurse: 'Nurse Raj' },
      { id: 'pm-003', patientName: 'Robert Davis', painScore: 4, painLocation: 'Leg', interventionGiven: 'Topical gel', reassessmentScore: 2, assessmentDate: '2025-01-17', responsibleNurse: 'Nurse Priya' },
      { id: 'pm-004', patientName: 'Lisa Anderson', painScore: 1, painLocation: 'Headache', interventionGiven: 'Rest and hydration', reassessmentScore: 0, assessmentDate: '2025-01-18', responsibleNurse: 'Nurse Amit' },
      { id: 'pm-005', patientName: 'Michael Clark', painScore: 3, painLocation: 'Chest', interventionGiven: 'Acetaminophen', reassessmentScore: 1, assessmentDate: '2025-01-19', responsibleNurse: 'Nurse Maria' },
    ];
  });
  const [isPainManagementModalOpen, setIsPainManagementModalOpen] = useState(false);
  const [editingPainManagementId, setEditingPainManagementId] = useState(null);
  const [painManagementForm, setPainManagementForm] = useState({ id: '', patientName: '', painScore: 0, painLocation: '', interventionGiven: '', reassessmentScore: 0, assessmentDate: '', responsibleNurse: '' });
  const [painManagementSearch, setPainManagementSearch] = useState('');

  // Medication Administration State
  const [medications, setMedications] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_MEDICATION);
    return saved ? JSON.parse(saved) : [
      { id: 'med-001', patientName: 'John Smith', uhid: 'UHID12345', medicineName: 'Paracetamol', dose: '500 mg', route: 'Oral', administrationTime: '2025-01-15 08:00', administeredBy: 'Nurse Sarah', status: 'Completed' },
      { id: 'med-002', patientName: 'Mary Johnson', uhid: 'UHID12346', medicineName: 'Amoxicillin', dose: '250 mg', route: 'IV', administrationTime: '2025-01-15 09:00', administeredBy: 'Nurse Raj', status: 'Pending' },
      { id: 'med-003', patientName: 'Robert Davis', uhid: 'UHID12347', medicineName: 'Lisinopril', dose: '10 mg', route: 'Oral', administrationTime: '2025-01-15 10:00', administeredBy: 'Nurse Priya', status: 'Completed' },
    ];
  });
  const [isMedicationModalOpen, setIsMedicationModalOpen] = useState(false);
  const [editingMedicationId, setEditingMedicationId] = useState(null);
  const [medicationForm, setMedicationForm] = useState({ id: '', patientName: '', uhid: '', medicineName: '', dose: '', route: '', administrationTime: '', administeredBy: '', status: 'Completed' });
  const [medicationSearch, setMedicationSearch] = useState('');

  // Shift Handover State
  const [handoverRecords, setHandoverRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_HANDOVER);
    return saved ? JSON.parse(saved) : [
      { id: 'handover-001', patientName: 'John Smith', ward: 'General Ward', situation: 'Stable vitals', background: 'Post‑op day 1', assessment: 'No concerns', recommendation: 'Continue monitoring', handoverDateTime: '2025-01-15 07:30', handedOverBy: 'Nurse Sarah', receivedBy: 'Nurse Amit' },
      { id: 'handover-002', patientName: 'Mary Johnson', ward: 'ICU', situation: 'Ventilated', background: 'Respiratory failure', assessment: 'Improving', recommendation: 'Wean when ready', handoverDateTime: '2025-01-15 07:45', handedOverBy: 'Nurse Raj', receivedBy: 'Nurse Amit' },
      { id: 'handover-003', patientName: 'Robert Davis', ward: 'CCU', situation: 'Chest pain', background: 'MI yesterday', assessment: 'Stable', recommendation: 'Monitor enzymes', handoverDateTime: '2025-01-15 08:00', handedOverBy: 'Nurse Priya', receivedBy: 'Nurse Amit' },
    ];
  });
  const [isHandoverModalOpen, setIsHandoverModalOpen] = useState(false);
  const [editingHandoverId, setEditingHandoverId] = useState(null);
  const [handoverForm, setHandoverForm] = useState({ id: '', patientName: '', ward: '', situation: '', background: '', assessment: '', recommendation: '', handoverDateTime: '', handedOverBy: '', receivedBy: '' });
  const [handoverSearch, setHandoverSearch] = useState('');

  // Nursing Documentation State
  const [documentationRecords, setDocumentationRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_DOCUMENTATION);
    return saved ? JSON.parse(saved) : [
      { id: 'doc-001', recordId: 'DOC-001', patientName: 'John Smith', documentationType: 'Progress Note', entryDateTime: '2025-01-15 09:00', recordedBy: 'Nurse Sarah', status: 'Completed', remarks: 'Patient ambulating' },
      { id: 'doc-002', recordId: 'DOC-002', patientName: 'Mary Johnson', documentationType: 'Medication Chart', entryDateTime: '2025-01-15 09:30', recordedBy: 'Nurse Raj', status: 'Pending', remarks: '' },
      { id: 'doc-003', recordId: 'DOC-003', patientName: 'Robert Davis', documentationType: 'Discharge Summary', entryDateTime: '2025-01-15 10:00', recordedBy: 'Nurse Priya', status: 'Completed', remarks: '' },
    ];
  });
  const [isDocumentationModalOpen, setIsDocumentationModalOpen] = useState(false);
  const [editingDocumentationId, setEditingDocumentationId] = useState(null);
  const [documentationForm, setDocumentationForm] = useState({ id: '', recordId: '', patientName: '', documentationType: '', entryDateTime: '', recordedBy: '', status: '', remarks: '' });
  const [documentationSearch, setDocumentationSearch] = useState('');

  // Internal Audit State
  const [nursingAudits, setNursingAudits] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_NURSING_AUDIT);
    return saved ? JSON.parse(saved) : [
      { id: 'naudit-001', auditId: 'AUD-2025-001', auditDate: '2025-01-15', auditType: 'Routine', auditArea: 'Patient Care', auditorName: 'Alice Smith', compliancePercent: 92, findings: 'Minor documentation gaps.', status: 'Completed', followupDate: '2025-02-15' },
      { id: 'naudit-002', auditId: 'AUD-2025-002', auditDate: '2025-01-16', auditType: 'Surprise', auditArea: 'Medication', auditorName: 'Bob Johnson', compliancePercent: 85, findings: 'Medication cart unlocked.', status: 'Action Required', followupDate: '2025-01-20' },
      { id: 'naudit-003', auditId: 'AUD-2025-003', auditDate: '2025-01-18', auditType: 'NABH', auditArea: 'Infection Control', auditorName: 'Dr. Lee', compliancePercent: 98, findings: 'Excellent adherence.', status: 'Completed', followupDate: '' },
    ];
  });
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [editingAuditId, setEditingAuditId] = useState(null);
  const [auditForm, setAuditForm] = useState({ id: '', auditId: '', auditDate: '', auditType: 'Routine', auditArea: 'Patient Care', auditorName: '', compliancePercent: 100, findings: '', status: 'Completed', followupDate: '' });
  const [auditSearch, setAuditSearch] = useState('');

  // CAPA State
  const [nursingCapas, setNursingCapas] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_NURSING_CAPA);
    return saved ? JSON.parse(saved) : [
      { id: 'ncapa-001', capaId: 'CAPA-2025-001', auditId: 'AUD-2025-002', observation: 'Medication cart unlocked.', correctiveAction: 'Locked immediately.', preventiveAction: 'Staff re-training on med safety.', responsiblePerson: 'Bob Johnson', targetDate: '2025-01-20', completionDate: '2025-01-18', status: 'Closed' },
      { id: 'ncapa-002', capaId: 'CAPA-2025-002', auditId: 'AUD-2025-001', observation: 'Missing signatures on charts.', correctiveAction: 'Updated signatures.', preventiveAction: 'Daily chart audits by charge nurse.', responsiblePerson: 'Alice Smith', targetDate: '2025-02-15', completionDate: '', status: 'Open' },
    ];
  });
  const [isCapaModalOpen, setIsCapaModalOpen] = useState(false);
  const [editingCapaId, setEditingCapaId] = useState(null);
  const [capaForm, setCapaForm] = useState({ id: '', capaId: '', auditId: '', observation: '', correctiveAction: '', preventiveAction: '', responsiblePerson: '', targetDate: '', completionDate: '', status: 'Open' });
  const [capaSearch, setCapaSearch] = useState('');

  const getNextQualityId = () => {
    const maxNum = qualityIndicators.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `nq-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const getNextPainManagementId = () => { const maxNum = painManagements.reduce((max, r) => { const parts = r.id.split('-'); const num = parseInt(parts[parts.length - 1], 10); return num > max ? num : max; }, 0); return `pm-${String(maxNum + 1).padStart(3, '0')}`; };

  // Medication Administration helpers
  const getNextMedicationId = () => { const maxNum = medications.reduce((max, r) => { const parts = r.id.split('-'); const num = parseInt(parts[parts.length - 1], 10); return num > max ? num : max; }, 0); return `med-${String(maxNum + 1).padStart(3, '0')}`; };
  const handleOpenMedicationModal = (record = null) => {
    if (record) { setMedicationForm({ ...record }); setEditingMedicationId(record.id); } else { setMedicationForm({ ...medicationForm, id: getNextMedicationId() }); setEditingMedicationId(null); }
    setIsMedicationModalOpen(true);
  };
  const handleSaveMedication = (e) => { if (e && e.preventDefault) e.preventDefault(); if (editingMedicationId) { setMedications(prev => prev.map(r => (r.id === editingMedicationId ? { ...medicationForm, id: editingMedicationId } : r))); } else { setMedications(prev => [...prev, { ...medicationForm }]); } setIsMedicationModalOpen(false); setEditingMedicationId(null); };
  const handleDeleteMedication = (id) => { if (window.confirm('Delete this medication record?')) { setMedications(prev => prev.filter(r => r.id !== id)); } };

  // Shift Handover helpers
  const getNextHandoverId = () => { const maxNum = handoverRecords.reduce((max, r) => { const parts = r.id.split('-'); const num = parseInt(parts[parts.length - 1], 10); return num > max ? num : max; }, 0); return `handover-${String(maxNum + 1).padStart(3, '0')}`; };
  const handleOpenHandoverModal = (record = null) => {
    if (record) { setHandoverForm({ ...record }); setEditingHandoverId(record.id); } else { setHandoverForm({ ...handoverForm, id: getNextHandoverId() }); setEditingHandoverId(null); }
    setIsHandoverModalOpen(true);
  };
  const handleSaveHandover = (e) => { if (e && e.preventDefault) e.preventDefault(); if (editingHandoverId) { setHandoverRecords(prev => prev.map(r => (r.id === editingHandoverId ? { ...handoverForm, id: editingHandoverId } : r))); } else { setHandoverRecords(prev => [...prev, { ...handoverForm }]); } setIsHandoverModalOpen(false); setEditingHandoverId(null); };
  const handleDeleteHandover = (id) => { if (window.confirm('Delete this handover record?')) { setHandoverRecords(prev => prev.filter(r => r.id !== id)); } };

  // Documentation helpers
  const getNextDocumentationId = () => { const maxNum = documentationRecords.reduce((max, r) => { const parts = r.id.split('-'); const num = parseInt(parts[parts.length - 1], 10); return num > max ? num : max; }, 0); return `doc-${String(maxNum + 1).padStart(3, '0')}`; };
  const handleOpenDocumentationModal = (record = null) => {
    if (record) { setDocumentationForm({ ...record }); setEditingDocumentationId(record.id); } else { setDocumentationForm({ ...documentationForm, id: getNextDocumentationId() }); setEditingDocumentationId(null); }
    setIsDocumentationModalOpen(true);
  };
  const handleSaveDocumentation = (e) => { if (e && e.preventDefault) e.preventDefault(); if (editingDocumentationId) { setDocumentationRecords(prev => prev.map(r => (r.id === editingDocumentationId ? { ...documentationForm, id: editingDocumentationId } : r))); } else { setDocumentationRecords(prev => [...prev, { ...documentationForm }]); } setIsDocumentationModalOpen(false); setEditingDocumentationId(null); };
  const handleDeleteDocumentation = (id) => { if (window.confirm('Delete this documentation record?')) { setDocumentationRecords(prev => prev.filter(r => r.id !== id)); } };

  // Internal Audit helpers
  const getNextAuditId = () => { const maxNum = nursingAudits.reduce((max, r) => { const parts = r.id.split('-'); const num = parseInt(parts[parts.length - 1], 10); return num > max ? num : max; }, 0); return `naudit-${String(maxNum + 1).padStart(3, '0')}`; };
  const handleOpenAuditModal = (record = null) => {
    if (record) { setAuditForm({ ...record }); setEditingAuditId(record.id); } else { setAuditForm({ ...auditForm, id: getNextAuditId() }); setEditingAuditId(null); }
    setIsAuditModalOpen(true);
  };
  const handleSaveAudit = (e) => { if (e && e.preventDefault) e.preventDefault(); if (editingAuditId) { setNursingAudits(prev => prev.map(r => (r.id === editingAuditId ? { ...auditForm, id: editingAuditId } : r))); } else { setNursingAudits(prev => [...prev, { ...auditForm }]); } setIsAuditModalOpen(false); setEditingAuditId(null); };
  const handleDeleteAudit = (id) => { if (window.confirm('Delete this audit record?')) { setNursingAudits(prev => prev.filter(r => r.id !== id)); } };

  // CAPA helpers
  const getNextCapaId = () => { const maxNum = nursingCapas.reduce((max, r) => { const parts = r.id.split('-'); const num = parseInt(parts[parts.length - 1], 10); return num > max ? num : max; }, 0); return `ncapa-${String(maxNum + 1).padStart(3, '0')}`; };
  const handleOpenCapaModal = (record = null) => {
    if (record) { setCapaForm({ ...record }); setEditingCapaId(record.id); } else { setCapaForm({ ...capaForm, id: getNextCapaId() }); setEditingCapaId(null); }
    setIsCapaModalOpen(true);
  };
  const handleSaveCapa = (e) => { if (e && e.preventDefault) e.preventDefault(); if (editingCapaId) { setNursingCapas(prev => prev.map(r => (r.id === editingCapaId ? { ...capaForm, id: editingCapaId } : r))); } else { setNursingCapas(prev => [...prev, { ...capaForm }]); } setIsCapaModalOpen(false); setEditingCapaId(null); };
  const handleDeleteCapa = (id) => { if (window.confirm('Delete this CAPA record?')) { setNursingCapas(prev => prev.filter(r => r.id !== id)); } };

  const handleOpenQualityModal = (record = null) => {
    if (record) {
      setQualityForm({ ...record });
      setEditingQualityId(record.id);
    } else {
      setQualityForm({ ...qualityForm, id: getNextQualityId() });
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

  const getNextPatientId = () => {
    const maxNum = patientIdentifications.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `pid-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenPatientIdModal = (record = null) => {
    if (record) {
      setPatientIdForm({ ...record });
      setEditingPatientId(record.id);
    } else {
      setPatientIdForm({ ...patientIdForm, id: getNextPatientId() });
      setEditingPatientId(null);
    }
    setIsPatientIdModalOpen(true);
  };

  const handleSavePatientId = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingPatientId) {
      setPatientIdentifications((prev) =>
        prev.map((r) => (r.id === editingPatientId ? { ...patientIdForm, id: editingPatientId } : r))
      );
    } else {
      setPatientIdentifications((prev) => [...prev, { ...patientIdForm }]);
    }
    setIsPatientIdModalOpen(false);
    setEditingPatientId(null);
  };

  const handleDeletePatientId = (id) => {
    if (window.confirm('Delete this patient identification record?')) {
      setPatientIdentifications((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const getNextAssessmentId = () => {
    const maxNum = assessments.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `assess-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenAssessmentModal = (record = null) => {
    if (record) {
      setAssessmentForm({ ...record });
      setEditingAssessmentId(record.id);
    } else {
      setAssessmentForm({ ...assessmentForm, id: getNextAssessmentId() });
      setEditingAssessmentId(null);
    }
    setIsAssessmentModalOpen(true);
  };

  const handleSaveAssessment = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingAssessmentId) {
      setAssessments((prev) =>
        prev.map((r) => (r.id === editingAssessmentId ? { ...assessmentForm, id: editingAssessmentId } : r))
      );
    } else {
      setAssessments((prev) => [...prev, { ...assessmentForm }]);
    }
    setIsAssessmentModalOpen(false);
    setEditingAssessmentId(null);
  };

  const handleDeleteAssessment = (id) => {
    if (window.confirm('Delete this assessment record?')) {
      setAssessments((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const getNextVitalSignId = () => {
    const maxNum = vitalSigns.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `vs-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenVitalSignModal = (record = null) => {
    if (record) {
      setVitalSignForm({ ...record });
      setEditingVitalSignId(record.id);
    } else {
      setVitalSignForm({ ...vitalSignForm, id: getNextVitalSignId() });
      setEditingVitalSignId(null);
    }
    setIsVitalSignModalOpen(true);
  };

  const handleSaveVitalSign = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingVitalSignId) {
      setVitalSigns((prev) =>
        prev.map((r) => (r.id === editingVitalSignId ? { ...vitalSignForm, id: editingVitalSignId } : r))
      );
    } else {
      setVitalSigns((prev) => [...prev, { ...vitalSignForm }]);
    }
    setIsVitalSignModalOpen(false);
    setEditingVitalSignId(null);
  };

  const handleDeleteVitalSign = (id) => {
    if (window.confirm('Delete this vital sign record?')) {
      setVitalSigns((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const getNextFallPreventionId = () => {
    const maxNum = fallPreventions.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `fp-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenFallPreventionModal = (record = null) => {
    if (record) {
      setFallPreventionForm({ ...record });
      setEditingFallPreventionId(record.id);
    } else {
      setFallPreventionForm({ ...fallPreventionForm, id: getNextFallPreventionId() });
      setEditingFallPreventionId(null);
    }
    setIsFallPreventionModalOpen(true);
  };

  const handleSaveFallPrevention = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingFallPreventionId) {
      setFallPreventions((prev) =>
        prev.map((r) => (r.id === editingFallPreventionId ? { ...fallPreventionForm, id: editingFallPreventionId } : r))
      );
    } else {
      setFallPreventions((prev) => [...prev, { ...fallPreventionForm }]);
    }
    setIsFallPreventionModalOpen(false);
    setEditingFallPreventionId(null);
  };

  const handleDeleteFallPrevention = (id) => {
    if (window.confirm('Delete this fall prevention record?')) {
      setFallPreventions((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const getNextPressureInjuryId = () => {
    const maxNum = pressureInjuries.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `pi-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenPressureInjuryModal = (record = null) => {
    if (record) {
      setPressureInjuryForm({ ...record });
      setEditingPressureInjuryId(record.id);
    } else {
      setPressureInjuryForm({ ...pressureInjuryForm, id: getNextPressureInjuryId() });
      setEditingPressureInjuryId(null);
    }
    setIsPressureInjuryModalOpen(true);
  };

  const handleSavePressureInjury = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingPressureInjuryId) {
      setPressureInjuries((prev) =>
        prev.map((r) => (r.id === editingPressureInjuryId ? { ...pressureInjuryForm, id: editingPressureInjuryId } : r))
      );
    } else {
      setPressureInjuries((prev) => [...prev, { ...pressureInjuryForm }]);
    }
    setIsPressureInjuryModalOpen(false);
    setEditingPressureInjuryId(null);
  };

  const handleDeletePressureInjury = (id) => {
    if (window.confirm('Delete this pressure injury record?')) {
      setPressureInjuries((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleOpenPainManagementModal = (record = null) => {
    if (record) {
      setPainManagementForm({ ...record });
      setEditingPainManagementId(record.id);
    } else {
      setPainManagementForm({ ...painManagementForm, id: getNextPainManagementId() });
      setEditingPainManagementId(null);
    }
    setIsPainManagementModalOpen(true);
  };

  const handleSavePainManagement = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingPainManagementId) {
      setPainManagements((prev) =>
        prev.map((r) => (r.id === editingPainManagementId ? { ...painManagementForm, id: editingPainManagementId } : r))
      );
    } else {
      setPainManagements((prev) => [...prev, { ...painManagementForm }]);
    }
    setIsPainManagementModalOpen(false);
    setEditingPainManagementId(null);
  };

  const handleDeletePainManagement = (id) => {
    if (window.confirm('Delete this pain management record?')) {
      setPainManagements((prev) => prev.filter((r) => r.id !== id));
    }
  };

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_FALL_PREVENTION, JSON.stringify(fallPreventions));
  }, [fallPreventions]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_PRESSURE_INJURY, JSON.stringify(pressureInjuries));
  }, [pressureInjuries]);

  React.useEffect(() => { localStorage.setItem(LS_KEY_PAIN_MANAGEMENT, JSON.stringify(painManagements)); }, [painManagements]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_MEDICATION, JSON.stringify(medications)); }, [medications]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_HANDOVER, JSON.stringify(handoverRecords)); }, [handoverRecords]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_DOCUMENTATION, JSON.stringify(documentationRecords)); }, [documentationRecords]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_NURSING_AUDIT, JSON.stringify(nursingAudits)); }, [nursingAudits]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_NURSING_CAPA, JSON.stringify(nursingCapas)); }, [nursingCapas]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_QUALITY, JSON.stringify(qualityIndicators));
  }, [qualityIndicators]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_PATIENT_ID, JSON.stringify(patientIdentifications));
  }, [patientIdentifications]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_ASSESSMENTS, JSON.stringify(assessments));
  }, [assessments]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_VITAL_SIGNS, JSON.stringify(vitalSigns));
  }, [vitalSigns]);

  const NumField = ({ label, field, form, setForm, step = '1' }) => (
    <div>
      <label className="block text-[9px] font-medium text-slate-600 mb-1">{label}</label>
      <input
        type="number"
        value={form[field]}
        onChange={(e) => setForm({ ...form, [field]: parseFloat(e.target.value) || 0 })}
        step={step}
        min="0"
        max={field === 'target' || field === 'actual' ? '100' : undefined}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
    </div>
  );

  const STATUS_BADGE_PATIENT = {
    Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    'In Progress': 'bg-sky-50 text-sky-700 border-sky-200',
  };

  const nursingRecords = SAMPLE_NURSING_RECORDS;
  const totalNursingRecords = nursingRecords.length;
  const nursingCompliance = totalNursingRecords ? (nursingRecords.reduce((s, r) => s + (r.compliance || 0), 0) / totalNursingRecords).toFixed(1) : 0;
  const activeStaff = 120;
  const pendingAudits = nursingRecords.reduce((s, r) => s + (r.audits || 0), 0) - nursingRecords.filter((r) => r.audits >= 4).length;

  const monthlyActivityData = nursingRecords.map((r) => ({
    month: r.month,
    activities: r.activities,
  }));

  const complianceDistribution = [
    { name: 'High Compliance', value: nursingRecords.filter((r) => r.compliance >= 95).length, color: '#10b981' },
    { name: 'Medium Compliance', value: nursingRecords.filter((r) => r.compliance >= 90 && r.compliance < 95).length, color: '#f59e0b' },
    { name: 'Low Compliance', value: nursingRecords.filter((r) => r.compliance < 90).length, color: '#ef4444' },
  ];

  const QualityTab = () => {
    const filtered = qualityIndicators.filter((r) => {
      const q = qualitySearch.toLowerCase();
      return (
        r.indicatorName.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q)
      );
    });

    const totalIndicators = qualityIndicators.length;
    const achievedIndicators = qualityIndicators.filter((r) => r.status === 'Achieved').length;
    const pendingIndicators = qualityIndicators.filter((r) => r.status !== 'Achieved').length;
    const avgCompliance = totalIndicators ? (qualityIndicators.reduce((s, r) => s + (r.actual || 0), 0) / totalIndicators).toFixed(1) : 0;
    const medCompliance = qualityIndicators.filter((r) => r.category === 'Medication').length ? (qualityIndicators.filter((r) => r.category === 'Medication').reduce((s, r) => s + (r.actual || 0), 0) / qualityIndicators.filter((r) => r.category === 'Medication').length).toFixed(1) : 0;
    const pidCompliance = qualityIndicators.filter((r) => r.category === 'Patient ID').length ? (qualityIndicators.filter((r) => r.category === 'Patient ID').reduce((s, r) => s + (r.actual || 0), 0) / qualityIndicators.filter((r) => r.category === 'Patient ID').length).toFixed(1) : 0;
    const docCompliance = qualityIndicators.filter((r) => r.category === 'Documentation').length ? (qualityIndicators.filter((r) => r.category === 'Documentation').reduce((s, r) => s + (r.actual || 0), 0) / qualityIndicators.filter((r) => r.category === 'Documentation').length).toFixed(1) : 0;
    const handoverCompliance = qualityIndicators.filter((r) => r.category === 'Handover').length ? (qualityIndicators.filter((r) => r.category === 'Handover').reduce((s, r) => s + (r.actual || 0), 0) / qualityIndicators.filter((r) => r.category === 'Handover').length).toFixed(1) : 0;

    const TH_COLS = ['ID', 'Indicator', 'Category', 'Target %', 'Actual %', 'Month', 'Responsible Nurse', 'Status', 'Actions'];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Quality Indicators</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Nursing quality metrics tracking</p>
          </div>
          <button
            onClick={() => handleOpenQualityModal()}
            style={{ backgroundColor: hospital.themeColor }}
            className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Indicator
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Indicators', value: totalIndicators, color: 'text-blue-600' },
            { label: 'Achieved Indicators', value: achievedIndicators, color: 'text-emerald-600' },
            { label: 'Pending Indicators', value: pendingIndicators, color: 'text-amber-600' },
            { label: 'Avg Compliance %', value: `${avgCompliance}%`, color: 'text-violet-600' },
            { label: 'Medication Compliance %', value: `${medCompliance}%`, color: 'text-sky-600' },
            { label: 'Patient ID Compliance %', value: `${pidCompliance}%`, color: 'text-rose-600' },
            { label: 'Documentation Compliance %', value: `${docCompliance}%`, color: 'text-indigo-600' },
            { label: 'Handover Compliance %', value: `${handoverCompliance}%`, color: 'text-orange-600' },
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
            placeholder="Search indicators..."
            value={qualitySearch}
            onChange={(e) => setQualitySearch(e.target.value)}
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
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.indicatorName}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.category}</td>
                    <td className="px-3 py-3 text-slate-600">{r.target}%</td>
                    <td className="px-3 py-3 text-emerald-600 font-bold">{r.actual}%</td>
                    <td className="px-3 py-3 text-slate-600">{r.month} {r.year}</td>
                    <td className="px-3 py-3 text-slate-600">{r.responsibleNurse || '-'}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_QUALITY[r.status] || STATUS_BADGE_QUALITY.Achieved}`}>{r.status}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleOpenQualityModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => handleDeleteQuality(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{qualitySearch ? 'No records match your search.' : 'No quality indicator records yet.'}</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
            <span className="text-[9px] text-slate-400 font-medium">Showing {filtered.length} of {qualityIndicators.length} record{qualityIndicators.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {isQualityModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingQualityId ? 'Edit Indicator' : 'Add Quality Indicator'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Nursing Quality Indicator</p>
                </div>
                <button onClick={() => { setIsQualityModalOpen(false); setEditingQualityId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveQuality} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Indicator Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Indicator Name *</label>
                      <input type="text" value={qualityForm.indicatorName} onChange={(e) => setQualityForm({ ...qualityForm, indicatorName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Category *</label>
                      <select value={qualityForm.category} onChange={(e) => setQualityForm({ ...qualityForm, category: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {QUALITY_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <NumField label="Target (%) *" field="target" form={qualityForm} setForm={setQualityForm} step="0.1" />
                    <NumField label="Actual (%) *" field="actual" form={qualityForm} setForm={setQualityForm} step="0.1" />
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                      <select value={qualityForm.month} onChange={(e) => setQualityForm({ ...qualityForm, month: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                      <input type="number" value={qualityForm.year} onChange={(e) => setQualityForm({ ...qualityForm, year: parseInt(e.target.value) || 2025 })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                      <select value={qualityForm.status} onChange={(e) => setQualityForm({ ...qualityForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        <option value="Achieved">Achieved</option>
                        <option value="Partially Achieved">Partially Achieved</option>
                        <option value="Not Achieved">Not Achieved</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Responsible Nurse</label>
                      <input type="text" value={qualityForm.responsibleNurse} onChange={(e) => setQualityForm({ ...qualityForm, responsibleNurse: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Nurse name" />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Remarks</p>
                  <textarea value={qualityForm.remarks} onChange={(e) => setQualityForm({ ...qualityForm, remarks: e.target.value })} rows="2" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Optional remarks" />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsQualityModalOpen(false); setEditingQualityId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingQualityId ? 'Save Changes' : 'Add Record'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-extrabold text-slate-800 mb-3">Nursing Operations Dashboard</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: 'Total Nursing Records', value: totalNursingRecords, color: 'text-blue-600' },
                  { label: 'Nursing Compliance %', value: `${nursingCompliance}%`, color: 'text-emerald-600' },
                  { label: 'Active Nursing Staff', value: activeStaff, color: 'text-sky-600' },
                  { label: 'Pending Nursing Audits', value: pendingAudits, color: 'text-rose-600' },
                ].map((kpi) => (
                  <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                    <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-3">Monthly Nursing Activities</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={monthlyActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="activities" stroke="#3b82f6" name="Activities" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-3">Nursing Compliance Distribution</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={complianceDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                      {complianceDistribution.map((_, idx) => (
                        <Cell key={`cell-${idx}`} fill={complianceDistribution[idx].color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/50">
                <h4 className="text-xs font-extrabold text-slate-800">Monthly Summary</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      {['Month', 'Activities', 'Compliance %', 'Incidents', 'Audits'].map((h) => (
                        <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {nursingRecords.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-3 py-3 font-semibold text-slate-700">{r.month}</td>
                        <td className="px-3 py-3 text-blue-600 font-bold">{r.activities}</td>
                        <td className="px-3 py-3 text-emerald-600 font-bold">{r.compliance}%</td>
                        <td className="px-3 py-3 text-rose-600 font-bold">{r.incidents}</td>
                        <td className="px-3 py-3 text-violet-600 font-bold">{r.audits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'quality':
        return <QualityTab />;

      case 'practices':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-extrabold text-slate-800 mb-3">Basic Nursing Practices</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: 'Total Patient Identifications', value: patientIdentifications.length, color: 'text-blue-600' },
                  { label: 'Identification Compliance %', value: `${patientIdentifications.length ? (patientIdentifications.filter((r) => r.identificationBandVerified === 'Yes').length / patientIdentifications.length * 100).toFixed(1) : 0}%`, color: 'text-emerald-600' },
                  { label: 'Assessments Completed', value: assessments.filter((r) => r.status === 'Completed').length, color: 'text-violet-600' },
                  { label: 'Pending Assessments', value: assessments.filter((r) => r.status !== 'Completed').length, color: 'text-amber-600' },
                  { label: 'Vital Sign Records', value: vitalSigns.length, color: 'text-sky-600' },
                  { label: 'High Fall Risk', value: assessments.filter((r) => r.fallRisk === 'High').length, color: 'text-rose-600' },
                  { label: 'High Pressure Injury Risk', value: assessments.filter((r) => r.pressureInjuryRisk === 'High').length, color: 'text-indigo-600' },
                  { label: 'Avg Pain Score', value: assessments.length ? (assessments.reduce((s, r) => s + (r.painScore || 0), 0) / assessments.length).toFixed(1) : 0, color: 'text-orange-600' },
                ].map((kpi) => (
                  <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                    <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-extrabold text-slate-800">Patient Identification</h4>
                <button onClick={() => handleOpenPatientIdModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Record</button>
              </div>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input type="text" placeholder="Search patient identifications..." value={patientIdSearch} onChange={(e) => setPatientIdSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['ID', 'Patient', 'UHID', 'Ward', 'Bed', 'Verified', 'Date', 'Status', 'Actions'].map((h) => (
                          <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {patientIdentifications.filter((r) => {
                        const q = patientIdSearch.toLowerCase();
                        return r.patientName.toLowerCase().includes(q) || r.uhid.toLowerCase().includes(q) || r.status.toLowerCase().includes(q);
                      }).map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                          <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                          <td className="px-3 py-3 text-slate-600">{r.uhid}</td>
                          <td className="px-3 py-3 text-violet-600 font-bold">{r.ward}</td>
                          <td className="px-3 py-3 text-slate-600">{r.bedNumber}</td>
                          <td className="px-3 py-3 text-emerald-600 font-bold">{r.identificationBandVerified}</td>
                          <td className="px-3 py-3 text-slate-600">{r.verificationDate}</td>
                          <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_PATIENT[r.status] || STATUS_BADGE_PATIENT.Completed}`}>{r.status}</span></td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenPatientIdModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeletePatientId(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {patientIdentifications.length === 0 && (
                        <tr><td colSpan={9} className="px-3 py-10 text-center text-[10px] text-slate-400">No patient identification records yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-extrabold text-slate-800">Initial Nursing Assessment</h4>
                <button onClick={() => handleOpenAssessmentModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Record</button>
              </div>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input type="text" placeholder="Search assessments..." value={assessmentSearch} onChange={(e) => setAssessmentSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['ID', 'Patient', 'Admission', 'Assessment', 'Consciousness', 'Fall Risk', 'Pressure Risk', 'Pain', 'Status', 'Actions'].map((h) => (
                          <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {assessments.filter((r) => {
                        const q = assessmentSearch.toLowerCase();
                        return r.patientName.toLowerCase().includes(q) || r.status.toLowerCase().includes(q);
                      }).map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                          <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                          <td className="px-3 py-3 text-slate-600">{r.admissionDate}</td>
                          <td className="px-3 py-3 text-slate-600">{r.assessmentDate}</td>
                          <td className="px-3 py-3 text-violet-600 font-bold">{r.consciousnessLevel}</td>
                          <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold ${r.fallRisk === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200' : r.fallRisk === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>{r.fallRisk}</span></td>
                          <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold ${r.pressureInjuryRisk === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200' : r.pressureInjuryRisk === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>{r.pressureInjuryRisk}</span></td>
                          <td className="px-3 py-3 text-emerald-600 font-bold">{r.painScore}</td>
                          <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_PATIENT[r.status] || STATUS_BADGE_PATIENT.Completed}`}>{r.status}</span></td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenAssessmentModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeleteAssessment(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {assessments.length === 0 && (
                        <tr><td colSpan={10} className="px-3 py-10 text-center text-[10px] text-slate-400">No assessment records yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-extrabold text-slate-800">Vital Signs Monitoring</h4>
                <button onClick={() => handleOpenVitalSignModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Record</button>
              </div>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input type="text" placeholder="Search vital signs..." value={vitalSignSearch} onChange={(e) => setVitalSignSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['ID', 'Patient', 'Temp', 'Pulse', 'RR', 'BP', 'SpO₂', 'Recorded', 'Actions'].map((h) => (
                          <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {vitalSigns.filter((r) => {
                        const q = vitalSignSearch.toLowerCase();
                        return r.patientName.toLowerCase().includes(q);
                      }).map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                          <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                          <td className="px-3 py-3 text-rose-600 font-bold">{r.temperature}</td>
                          <td className="px-3 py-3 text-sky-600 font-bold">{r.pulse}</td>
                          <td className="px-3 py-3 text-violet-600 font-bold">{r.respiratoryRate}</td>
                          <td className="px-3 py-3 text-emerald-600 font-bold">{r.bloodPressure}</td>
                          <td className="px-3 py-3 text-amber-600 font-bold">{r.spo2}</td>
                          <td className="px-3 py-3 text-slate-600">{r.recordedDateTime}</td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenVitalSignModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeleteVitalSign(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {vitalSigns.length === 0 && (
                        <tr><td colSpan={9} className="px-3 py-10 text-center text-[10px] text-slate-400">No vital sign records yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'clinical': {
        const totalFallRiskAssessments = fallPreventions.length;
        const highFallRiskPatients = fallPreventions.filter((r) => r.fallRiskLevel === 'High').length;
        const pressureInjuryAssessments = pressureInjuries.length;
        const highPressureInjuryRiskPatients = pressureInjuries.filter((r) => r.riskLevel === 'High').length;
        const totalPainAssessments = painManagements.length;
        const avgPainScore = painManagements.length ? (painManagements.reduce((s, r) => s + (r.painScore || 0), 0) / painManagements.length).toFixed(1) : 0;
        const nursingCareCompliance = fallPreventions.length ? (fallPreventions.filter((r) => r.status === 'Completed').length / fallPreventions.length * 100).toFixed(1) : 0;
        const preventiveCareCompliance = [...fallPreventions, ...pressureInjuries].length ? ([...fallPreventions, ...pressureInjuries].filter((r) => r.status === 'Completed').length / [...fallPreventions, ...pressureInjuries].length * 100).toFixed(1) : 0;
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-extrabold text-slate-800 mb-3">Clinical Nursing Care</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: 'Total Fall Risk Assessments', value: totalFallRiskAssessments, color: 'text-blue-600' },
                  { label: 'High Fall Risk Patients', value: highFallRiskPatients, color: 'text-rose-600' },
                  { label: 'Pressure Injury Assessments', value: pressureInjuryAssessments, color: 'text-violet-600' },
                  { label: 'High Pressure Injury Risk Patients', value: highPressureInjuryRiskPatients, color: 'text-indigo-600' },
                  { label: 'Pain Assessments', value: totalPainAssessments, color: 'text-sky-600' },
                  { label: 'Average Pain Score', value: avgPainScore, color: 'text-orange-600' },
                  { label: 'Nursing Care Compliance %', value: `${nursingCareCompliance}%`, color: 'text-emerald-600' },
                  { label: 'Preventive Care Compliance %', value: `${preventiveCareCompliance}%`, color: 'text-purple-600' },
                ].map((kpi) => (
                  <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                    <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-extrabold text-slate-800">Fall Prevention</h4>
                <button onClick={() => handleOpenFallPreventionModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Record</button>
              </div>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input type="text" placeholder="Search fall prevention records..." value={fallPreventionSearch} onChange={(e) => setFallPreventionSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['ID', 'Patient', 'Ward', 'Fall Risk', 'Risk Date', 'Measures', 'Nurse', 'Status', 'Actions'].map((h) => (
                          <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {fallPreventions.filter((r) => {
                        const q = fallPreventionSearch.toLowerCase();
                        return r.patientName.toLowerCase().includes(q) || r.status.toLowerCase().includes(q);
                      }).map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                          <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                          <td className="px-3 py-3 text-slate-600">{r.ward}</td>
                          <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold ${r.fallRiskLevel === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200' : r.fallRiskLevel === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>{r.fallRiskLevel}</span></td>
                          <td className="px-3 py-3 text-slate-600">{r.riskAssessmentDate}</td>
                          <td className="px-3 py-3 text-slate-600 max-w-48 truncate">{r.preventiveMeasures}</td>
                          <td className="px-3 py-3 text-slate-600">{r.responsibleNurse}</td>
                          <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_PATIENT[r.status] || STATUS_BADGE_PATIENT.Completed}`}>{r.status}</span></td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenFallPreventionModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeleteFallPrevention(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {fallPreventions.length === 0 && (
                        <tr><td colSpan={9} className="px-3 py-10 text-center text-[10px] text-slate-400">No fall prevention records yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-extrabold text-slate-800">Pressure Injury Prevention</h4>
                <button onClick={() => handleOpenPressureInjuryModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Record</button>
              </div>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input type="text" placeholder="Search pressure injury records..." value={pressureInjurySearch} onChange={(e) => setPressureInjurySearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['ID', 'Patient', 'Braden Score', 'Risk Level', 'Skin Date', 'Schedule', 'Nurse', 'Status', 'Actions'].map((h) => (
                          <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {pressureInjuries.filter((r) => {
                        const q = pressureInjurySearch.toLowerCase();
                        return r.patientName.toLowerCase().includes(q) || r.status.toLowerCase().includes(q);
                      }).map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                          <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                          <td className="px-3 py-3 text-sky-600 font-bold">{r.bradenScore}</td>
                          <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold ${r.riskLevel === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200' : r.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>{r.riskLevel}</span></td>
                          <td className="px-3 py-3 text-slate-600">{r.skinAssessmentDate}</td>
                          <td className="px-3 py-3 text-slate-600 max-w-44 truncate">{r.repositioningSchedule}</td>
                          <td className="px-3 py-3 text-slate-600">{r.responsibleNurse}</td>
                          <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_PATIENT[r.status] || STATUS_BADGE_PATIENT.Completed}`}>{r.status}</span></td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenPressureInjuryModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeletePressureInjury(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {pressureInjuries.length === 0 && (
                        <tr><td colSpan={9} className="px-3 py-10 text-center text-[10px] text-slate-400">No pressure injury records yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-extrabold text-slate-800">Pain Assessment &amp; Management</h4>
                <button onClick={() => handleOpenPainManagementModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Record</button>
              </div>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input type="text" placeholder="Search pain management records..." value={painManagementSearch} onChange={(e) => setPainManagementSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['ID', 'Patient', 'Pain Score', 'Location', 'Intervention', 'Reassessment', 'Date', 'Nurse', 'Actions'].map((h) => (
                          <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {painManagements.filter((r) => {
                        const q = painManagementSearch.toLowerCase();
                        return r.patientName.toLowerCase().includes(q);
                      }).map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                          <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                          <td className="px-3 py-3 text-rose-600 font-bold">{r.painScore}</td>
                          <td className="px-3 py-3 text-slate-600">{r.painLocation}</td>
                          <td className="px-3 py-3 text-slate-600 max-w-44 truncate">{r.interventionGiven}</td>
                          <td className="px-3 py-3 text-emerald-600 font-bold">{r.reassessmentScore}</td>
                          <td className="px-3 py-3 text-slate-600">{r.assessmentDate}</td>
                          <td className="px-3 py-3 text-slate-600">{r.responsibleNurse}</td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenPainManagementModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeletePainManagement(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {painManagements.length === 0 && (
                        <tr><td colSpan={9} className="px-3 py-10 text-center text-[10px] text-slate-400">No pain management records yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'medication': {
        // Medication & Handover Tab
        const filteredMeds = medications.filter(r => {
          const q = medicationSearch.toLowerCase();
          return r.patientName.toLowerCase().includes(q) || r.uhid.toLowerCase().includes(q) || r.medicineName.toLowerCase().includes(q) || r.status.toLowerCase().includes(q);
        });
        const filteredHandovers = handoverRecords.filter(r => {
          const q = handoverSearch.toLowerCase();
          return r.patientName.toLowerCase().includes(q) || r.ward.toLowerCase().includes(q) || r.situation.toLowerCase().includes(q) || r.status?.toLowerCase().includes(q);
        });
        const filteredDocs = documentationRecords.filter(r => {
          const q = documentationSearch.toLowerCase();
          return r.patientName.toLowerCase().includes(q) || r.documentationType.toLowerCase().includes(q) || r.status.toLowerCase().includes(q);
        });

        // KPI calculations
        const medCount = medications.length;
        const medCompliance = medCount ? (medications.filter(r => r.status === 'Completed').length / medCount) * 100 : 0;
        const handoverTotal = handoverRecords.length;
        const handoverCompleted = handoverRecords.filter(r => r.status === 'Completed').length;
        const handoverPending = handoverTotal - handoverCompleted;
        const handoverCompliance = handoverTotal ? (handoverCompleted / handoverTotal) * 100 : 0;
        const docCount = documentationRecords.length;
        const docCompliance = docCount ? (documentationRecords.filter(r => r.status === 'Completed').length / docCount) * 100 : 0;
        const overallCompliance = (medCompliance + handoverCompliance + docCompliance) / 3;

        return (
          <div className="space-y-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Medication Administration Records', value: medCount, color: 'text-blue-600' },
                { label: 'Medication Administration Compliance %', value: `${medCompliance.toFixed(1)}%`, color: 'text-emerald-600' },
                { label: 'Shift Handovers Completed', value: handoverCompleted, color: 'text-sky-600' },
                { label: 'Pending Handovers', value: handoverPending, color: 'text-amber-600' },
                { label: 'Nursing Documentation Records', value: docCount, color: 'text-purple-600' },
                { label: 'Documentation Completion %', value: `${docCompliance.toFixed(1)}%`, color: 'text-indigo-600' },
                { label: 'SBAR Compliance %', value: `${handoverCompliance.toFixed(1)}%`, color: 'text-orange-600' },
                { label: 'Overall Medication & Handover Compliance %', value: `${overallCompliance.toFixed(1)}%`, color: 'text-rose-600' },
              ].map(kpi => (
                <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                  <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>

            {/* Medication Administration Section */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50/50">
                <h4 className="text-xs font-extrabold text-slate-800">Medication Administration</h4>
                <button onClick={() => handleOpenMedicationModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm">
                  <Plus className="w-3.5 h-3.5" /> Add Medication
                </button>
              </div>
              <div className="relative px-4 py-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input type="text" placeholder="Search medication..." value={medicationSearch} onChange={e => setMedicationSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Patient Name</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">UHID</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Medicine</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Dose</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Route</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Time</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Administered By</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredMeds.map(r => (
                      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-3 py-3 text-slate-700">{r.patientName}</td>
                        <td className="px-3 py-3 text-slate-700">{r.uhid}</td>
                        <td className="px-3 py-3 text-slate-700">{r.medicineName}</td>
                        <td className="px-3 py-3 text-slate-700">{r.dose}</td>
                        <td className="px-3 py-3 text-slate-700">{r.route}</td>
                        <td className="px-3 py-3 text-slate-700">{r.administrationTime}</td>
                        <td className="px-3 py-3 text-slate-700">{r.administeredBy}</td>
                        <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_QUALITY[r.status] || STATUS_BADGE_QUALITY.Completed}`}>{r.status}</span></td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleOpenMedicationModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700" title="Edit"><Edit3 className="w-3 h-3" /></button>
                            <button onClick={() => handleDeleteMedication(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700" title="Delete"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredMeds.length === 0 && (
                      <tr><td colSpan={9} className="px-3 py-10 text-center text-[10px] text-slate-400">{medicationSearch ? 'No records match your search.' : 'No medication records yet.'}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                <span className="text-[9px] text-slate-400 font-medium">Showing {filteredMeds.length} of {medications.length} medication record{medications.length !== 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Shift Handover Section */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50/50">
                <h4 className="text-xs font-extrabold text-slate-800">Shift Handover (SBAR)</h4>
                <button onClick={() => handleOpenHandoverModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm">
                  <Plus className="w-3.5 h-3.5" /> Add Handover
                </button>
              </div>
              <div className="relative px-4 py-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input type="text" placeholder="Search handovers..." value={handoverSearch} onChange={e => setHandoverSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Patient Name</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Ward</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Situation</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Background</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Assessment</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Recommendation</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Date & Time</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Handed Over By</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Received By</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredHandovers.map(r => (
                      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-3 py-3 text-slate-700">{r.patientName}</td>
                        <td className="px-3 py-3 text-slate-700">{r.ward}</td>
                        <td className="px-3 py-3 text-slate-700">{r.situation}</td>
                        <td className="px-3 py-3 text-slate-700">{r.background}</td>
                        <td className="px-3 py-3 text-slate-700">{r.assessment}</td>
                        <td className="px-3 py-3 text-slate-700">{r.recommendation}</td>
                        <td className="px-3 py-3 text-slate-700">{r.handoverDateTime}</td>
                        <td className="px-3 py-3 text-slate-700">{r.handedOverBy}</td>
                        <td className="px-3 py-3 text-slate-700">{r.receivedBy}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleOpenHandoverModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700" title="Edit"><Edit3 className="w-3 h-3" /></button>
                            <button onClick={() => handleDeleteHandover(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700" title="Delete"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredHandovers.length === 0 && (
                      <tr><td colSpan={10} className="px-3 py-10 text-center text-[10px] text-slate-400">{handoverSearch ? 'No records match your search.' : 'No handover records yet.'}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                <span className="text-[9px] text-slate-400 font-medium">Showing {filteredHandovers.length} of {handoverRecords.length} handover record{handoverRecords.length !== 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Nursing Documentation Section */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50/50">
                <h4 className="text-xs font-extrabold text-slate-800">Nursing Documentation</h4>
                <button onClick={() => handleOpenDocumentationModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm">
                  <Plus className="w-3.5 h-3.5" /> Add Documentation
                </button>
              </div>
              <div className="relative px-4 py-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input type="text" placeholder="Search documentation..." value={documentationSearch} onChange={e => setDocumentationSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Record ID</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Patient Name</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Type</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Entry Date & Time</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Recorded By</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Remarks</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredDocs.map(r => (
                      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-3 py-3 text-slate-700">{r.recordId}</td>
                        <td className="px-3 py-3 text-slate-700">{r.patientName}</td>
                        <td className="px-3 py-3 text-slate-700">{r.documentationType}</td>
                        <td className="px-3 py-3 text-slate-700">{r.entryDateTime}</td>
                        <td className="px-3 py-3 text-slate-700">{r.recordedBy}</td>
                        <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_QUALITY[r.status] || STATUS_BADGE_QUALITY.Completed}`}>{r.status}</span></td>
                        <td className="px-3 py-3 text-slate-700">{r.remarks}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleOpenDocumentationModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700" title="Edit"><Edit3 className="w-3 h-3" /></button>
                            <button onClick={() => handleDeleteDocumentation(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700" title="Delete"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredDocs.length === 0 && (
                      <tr><td colSpan={8} className="px-3 py-10 text-center text-[10px] text-slate-400">{documentationSearch ? 'No records match your search.' : 'No documentation records yet.'}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                <span className="text-[9px] text-slate-400 font-medium">Showing {filteredDocs.length} of {documentationRecords.length} documentation record{documentationRecords.length !== 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Modals */}
            {isMedicationModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-extrabold text-slate-800">{editingMedicationId ? 'Edit Medication' : 'Add Medication'}</h3>
                    <button onClick={() => { setIsMedicationModalOpen(false); setEditingMedicationId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
                  </div>
                  <form onSubmit={handleSaveMedication} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name *</label>
                        <input type="text" value={medicationForm.patientName} onChange={e => setMedicationForm({ ...medicationForm, patientName: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">UHID *</label>
                        <input type="text" value={medicationForm.uhid} onChange={e => setMedicationForm({ ...medicationForm, uhid: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Medicine Name *</label>
                        <input type="text" value={medicationForm.medicineName} onChange={e => setMedicationForm({ ...medicationForm, medicineName: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-5   " />
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Dose *</label>
                        <input type="text" value={medicationForm.dose} onChange={e => setMedicationForm({ ...medicationForm, dose: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Route *</label>
                        <input type="text" value={medicationForm.route} onChange={e => setMedicationForm({ ...medicationForm, route: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Administration Time *</label>
                        <input type="datetime-local" value={medicationForm.administrationTime} onChange={e => setMedicationForm({ ...medicationForm, administrationTime: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Administered By *</label>
                        <input type="text" value={medicationForm.administeredBy} onChange={e => setMedicationForm({ ...medicationForm, administeredBy: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-5   " />
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                        <select value={medicationForm.status} onChange={e => setMedicationForm({ ...medicationForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                          <option>Completed</option>
                          <option>Pending</option>
                          <option>In Progress</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button type="button" onClick={() => { setIsMedicationModalOpen(false); setEditingMedicationId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold">Cancel</button>
                      <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all shadow-sm">{editingMedicationId ? 'Save Changes' : 'Add Record'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {isHandoverModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-extrabold text-slate-800">{editingHandoverId ? 'Edit Handover' : 'Add Handover'}</h3>
                    <button onClick={() => { setIsHandoverModalOpen(false); setEditingHandoverId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
                  </div>
                  <form onSubmit={handleSaveHandover} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name *</label><input type="text" value={handoverForm.patientName} onChange={e => setHandoverForm({ ...handoverForm, patientName: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Ward *</label><input type="text" value={handoverForm.ward} onChange={e => setHandoverForm({ ...handoverForm, ward: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-5   " /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Situation *</label><input type="text" value={handoverForm.situation} onChange={e => setHandoverForm({ ...handoverForm, situation: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-5   " /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Background *</label><input type="text" value={handoverForm.background} onChange={e => setHandoverForm({ ...handoverForm, background: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-5   " /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Assessment *</label><input type="text" value={handoverForm.assessment} onChange={e => setHandoverForm({ ...handoverForm, assessment: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-5   " /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Recommendation *</label><input type="text" value={handoverForm.recommendation} onChange={e => setHandoverForm({ ...handoverForm, recommendation: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-5   " /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Date & Time *</label><input type="datetime-local" value={handoverForm.handoverDateTime} onChange={e => setHandoverForm({ ...handoverForm, handoverDateTime: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-5   " /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Handed Over By *</label><input type="text" value={handoverForm.handedOverBy} onChange={e => setHandoverForm({ ...handoverForm, handedOverBy: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-5   " /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Received By *</label><input type="text" value={handoverForm.receivedBy} onChange={e => setHandoverForm({ ...handoverForm, receivedBy: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-5   " /></div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button type="button" onClick={() => { setIsHandoverModalOpen(false); setEditingHandoverId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold">Cancel</button>
                      <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all shadow-sm">{editingHandoverId ? 'Save Changes' : 'Add Record'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {isDocumentationModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-extrabold text-slate-800">{editingDocumentationId ? 'Edit Documentation' : 'Add Documentation'}</h3>
                    <button onClick={() => { setIsDocumentationModalOpen(false); setEditingDocumentationId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
                  </div>
                  <form onSubmit={handleSaveDocumentation} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Record ID *</label><input type="text" value={documentationForm.recordId} onChange={e => setDocumentationForm({ ...documentationForm, recordId: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-5   " /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name *</label><input type="text" value={documentationForm.patientName} onChange={e => setDocumentationForm({ ...documentationForm, patientName: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-5   " /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Type *</label><input type="text" value={documentationForm.documentationType} onChange={e => setDocumentationForm({ ...documentationForm, documentationType: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-5   " /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Entry Date & Time *</label><input type="datetime-local" value={documentationForm.entryDateTime} onChange={e => setDocumentationForm({ ...documentationForm, entryDateTime: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-5   " /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Recorded By *</label><input type="text" value={documentationForm.recordedBy} onChange={e => setDocumentationForm({ ...documentationForm, recordedBy: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-5   " /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label><select value={documentationForm.status} onChange={e => setDocumentationForm({ ...documentationForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-5   "><option>Completed</option><option>Pending</option><option>In Progress</option></select></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label><textarea value={documentationForm.remarks} onChange={e => setDocumentationForm({ ...documentationForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-5   " /></div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button type="button" onClick={() => { setIsDocumentationModalOpen(false); setEditingDocumentationId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold">Cancel</button>
                      <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all shadow-sm">{editingDocumentationId ? 'Save Changes' : 'Add Record'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {/* End of Modals */}
          </div>
        );
      } // End of medication case

      case 'audit': {
        // Internal Audit Tab
        const filteredAudits = nursingAudits.filter(r => {
          const q = auditSearch.toLowerCase();
          return r.auditId.toLowerCase().includes(q) || r.auditorName.toLowerCase().includes(q) || r.auditArea.toLowerCase().includes(q) || r.status.toLowerCase().includes(q);
        });
        const filteredCapas = nursingCapas.filter(r => {
          const q = capaSearch.toLowerCase();
          return r.capaId.toLowerCase().includes(q) || r.auditId.toLowerCase().includes(q) || r.responsiblePerson.toLowerCase().includes(q) || r.status.toLowerCase().includes(q);
        });

        // KPI calculations
        const totalAudits = nursingAudits.length;
        const completedAudits = nursingAudits.filter(r => r.status === 'Completed' || r.status === 'Closed').length;
        const pendingAudits = totalAudits - completedAudits;
        const avgCompliance = totalAudits ? nursingAudits.reduce((sum, r) => sum + (parseFloat(r.compliancePercent) || 0), 0) / totalAudits : 0;
        
        const openCapas = nursingCapas.filter(r => r.status === 'Open').length;
        const closedCapas = nursingCapas.filter(r => r.status === 'Closed').length;
        
        const totalAuditsWithFollowup = nursingAudits.filter(r => r.followupDate).length;
        const followedUpAudits = nursingCapas.filter(r => r.status === 'Closed').length;
        const followupCompliance = totalAuditsWithFollowup ? (closedCapas / totalAuditsWithFollowup) * 100 : 100;
        
        const overallAuditScore = (avgCompliance + (closedCapas / (openCapas + closedCapas || 1) * 100)) / 2;

        return (
          <div className="space-y-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Total Audits', value: totalAudits, color: 'text-blue-600' },
                { label: 'Completed Audits', value: completedAudits, color: 'text-emerald-600' },
                { label: 'Pending Audits', value: pendingAudits, color: 'text-amber-600' },
                { label: 'Avg Audit Compliance %', value: `${avgCompliance.toFixed(1)}%`, color: 'text-indigo-600' },
                { label: 'Open CAPAs', value: openCapas, color: 'text-rose-600' },
                { label: 'Closed CAPAs', value: closedCapas, color: 'text-emerald-600' },
                { label: 'Follow-up Compliance %', value: `${followupCompliance.toFixed(1)}%`, color: 'text-sky-600' },
                { label: 'Overall Nursing Audit Score', value: `${overallAuditScore.toFixed(1)}%`, color: 'text-purple-600' },
              ].map(kpi => (
                <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                  <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>

            {/* Internal Audits Table */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50/50">
                <h4 className="text-xs font-extrabold text-slate-800">Nursing Internal Audits</h4>
                <button onClick={() => handleOpenAuditModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm">
                  <Plus className="w-3.5 h-3.5" /> Add Audit
                </button>
              </div>
              <div className="relative px-4 py-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input type="text" placeholder="Search audits..." value={auditSearch} onChange={e => setAuditSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Audit ID</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Date</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Type</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Area</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Auditor</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Compliance %</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAudits.map(r => (
                      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-3 py-3 font-mono text-slate-700">{r.auditId}</td>
                        <td className="px-3 py-3 text-slate-700">{r.auditDate}</td>
                        <td className="px-3 py-3 text-slate-700">{r.auditType}</td>
                        <td className="px-3 py-3 text-slate-700">{r.auditArea}</td>
                        <td className="px-3 py-3 text-slate-700">{r.auditorName}</td>
                        <td className="px-3 py-3 font-bold text-slate-700">{r.compliancePercent}%</td>
                        <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_QUALITY[r.status] || STATUS_BADGE_QUALITY.Completed}`}>{r.status}</span></td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleOpenAuditModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700" title="Edit"><Edit3 className="w-3 h-3" /></button>
                            <button onClick={() => handleDeleteAudit(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700" title="Delete"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredAudits.length === 0 && (
                      <tr><td colSpan={8} className="px-3 py-10 text-center text-[10px] text-slate-400">{auditSearch ? 'No audits match your search.' : 'No audit records yet.'}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CAPA Tracker */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mt-4">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50/50">
                <h4 className="text-xs font-extrabold text-slate-800">CAPA Tracker</h4>
                <button onClick={() => handleOpenCapaModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm">
                  <Plus className="w-3.5 h-3.5" /> Add CAPA
                </button>
              </div>
              <div className="relative px-4 py-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input type="text" placeholder="Search CAPA records..." value={capaSearch} onChange={e => setCapaSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">CAPA ID</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Audit ID</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Observation</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Owner</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Target Date</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCapas.map(r => (
                      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-3 py-3 font-mono text-slate-700">{r.capaId}</td>
                        <td className="px-3 py-3 text-slate-700">{r.auditId}</td>
                        <td className="px-3 py-3 text-slate-700 max-w-[200px] truncate">{r.observation}</td>
                        <td className="px-3 py-3 text-slate-700">{r.responsiblePerson}</td>
                        <td className="px-3 py-3 text-slate-700">{r.targetDate}</td>
                        <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${r.status === 'Closed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>{r.status}</span></td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleOpenCapaModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700" title="Edit"><Edit3 className="w-3 h-3" /></button>
                            <button onClick={() => handleDeleteCapa(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700" title="Delete"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredCapas.length === 0 && (
                      <tr><td colSpan={7} className="px-3 py-10 text-center text-[10px] text-slate-400">{capaSearch ? 'No CAPAs match your search.' : 'No CAPA records yet.'}</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modals for Audit & CAPA */}
            {isAuditModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-extrabold text-slate-800">{editingAuditId ? 'Edit Audit' : 'Add Audit'}</h3>
                    <button onClick={() => { setIsAuditModalOpen(false); setEditingAuditId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
                  </div>
                  <form onSubmit={handleSaveAudit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Audit ID *</label><input type="text" value={auditForm.auditId} onChange={e => setAuditForm({ ...auditForm, auditId: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Date *</label><input type="date" value={auditForm.auditDate} onChange={e => setAuditForm({ ...auditForm, auditDate: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Type *</label>
                        <select value={auditForm.auditType} onChange={e => setAuditForm({ ...auditForm, auditType: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                          <option value="Routine">Routine</option><option value="Surprise">Surprise</option><option value="Internal">Internal</option><option value="NABH">NABH</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Area *</label>
                        <select value={auditForm.auditArea} onChange={e => setAuditForm({ ...auditForm, auditArea: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                          <option value="Documentation">Documentation</option><option value="Patient Care">Patient Care</option><option value="Medication">Medication</option><option value="Safety">Safety</option><option value="Infection Control">Infection Control</option>
                        </select>
                      </div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Auditor Name *</label><input type="text" value={auditForm.auditorName} onChange={e => setAuditForm({ ...auditForm, auditorName: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
                      <NumField label="Compliance % *" field="compliancePercent" form={auditForm} setForm={setAuditForm} />
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                        <select value={auditForm.status} onChange={e => setAuditForm({ ...auditForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                          <option value="Completed">Completed</option><option value="Action Required">Action Required</option><option value="In Progress">In Progress</option>
                        </select>
                      </div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Follow-up Date</label><input type="date" value={auditForm.followupDate} onChange={e => setAuditForm({ ...auditForm, followupDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Findings *</label><textarea value={auditForm.findings} onChange={e => setAuditForm({ ...auditForm, findings: e.target.value })} required rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button type="button" onClick={() => { setIsAuditModalOpen(false); setEditingAuditId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold">Cancel</button>
                      <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all shadow-sm">{editingAuditId ? 'Save Changes' : 'Add Audit'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {isCapaModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-extrabold text-slate-800">{editingCapaId ? 'Edit CAPA' : 'Add CAPA'}</h3>
                    <button onClick={() => { setIsCapaModalOpen(false); setEditingCapaId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
                  </div>
                  <form onSubmit={handleSaveCapa} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">CAPA ID *</label><input type="text" value={capaForm.capaId} onChange={e => setCapaForm({ ...capaForm, capaId: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Audit ID *</label><input type="text" value={capaForm.auditId} onChange={e => setCapaForm({ ...capaForm, auditId: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Observation *</label><textarea value={capaForm.observation} onChange={e => setCapaForm({ ...capaForm, observation: e.target.value })} required rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Corrective Action *</label><textarea value={capaForm.correctiveAction} onChange={e => setCapaForm({ ...capaForm, correctiveAction: e.target.value })} required rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Preventive Action *</label><textarea value={capaForm.preventiveAction} onChange={e => setCapaForm({ ...capaForm, preventiveAction: e.target.value })} required rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Responsible Person *</label><input type="text" value={capaForm.responsiblePerson} onChange={e => setCapaForm({ ...capaForm, responsiblePerson: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                        <select value={capaForm.status} onChange={e => setCapaForm({ ...capaForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                          <option value="Open">Open</option><option value="Closed">Closed</option>
                        </select>
                      </div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Target Date *</label><input type="date" value={capaForm.targetDate} onChange={e => setCapaForm({ ...capaForm, targetDate: e.target.value })} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Completion Date</label><input type="date" value={capaForm.completionDate} onChange={e => setCapaForm({ ...capaForm, completionDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button type="button" onClick={() => { setIsCapaModalOpen(false); setEditingCapaId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold">Cancel</button>
                      <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all shadow-sm">{editingCapaId ? 'Save Changes' : 'Add CAPA'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      }
      case 'reports': {
        const totalRecords = qualityIndicators.length + patientIdentifications.length + assessments.length + vitalSigns.length + fallPreventions.length + pressureInjuries.length + painManagements.length + medications.length + handoverRecords.length + documentationRecords.length + nursingAudits.length + nursingCapas.length;
        
        const pidCompliance = patientIdentifications.length ? (patientIdentifications.filter(r => r.identificationBandVerified === 'Yes').length / patientIdentifications.length) * 100 : 0;
        const medCompliance = medications.length ? (medications.filter(r => r.status === 'Completed').length / medications.length) * 100 : 0;
        const docCompliance = documentationRecords.length ? (documentationRecords.filter(r => r.status === 'Completed').length / documentationRecords.length) * 100 : 0;
        
        const clinicalTotal = fallPreventions.length + pressureInjuries.length + painManagements.length;
        const clinicalCompleted = fallPreventions.filter(r => r.status === 'Completed').length + pressureInjuries.filter(r => r.status === 'Completed').length + painManagements.filter(r => r.status === 'Completed').length;
        const clinicalCompliance = clinicalTotal ? (clinicalCompleted / clinicalTotal) * 100 : 0;

        const auditCompliance = nursingAudits.length ? (nursingAudits.reduce((sum, r) => sum + (parseFloat(r.compliancePercent) || 0), 0) / nursingAudits.length) : 0;
        const openCapas = nursingCapas.filter(r => r.status === 'Open').length;
        
        const overallCompliance = (pidCompliance + medCompliance + docCompliance + clinicalCompliance + auditCompliance) / 5;

        if (totalRecords === 0) {
          return (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center">
                <p className="text-[10px] text-slate-400">No data available for reports.</p>
              </div>
            </div>
          );
        }

        const getMonthFromDate = (dateStr) => {
          if (!dateStr) return null;
          const d = new Date(dateStr);
          if (isNaN(d)) return null;
          return MONTHS[d.getMonth()] || null;
        };

        const monthlyData = MONTHS.map((month) => {
          const qRecords = qualityIndicators.filter(r => r.month === month);
          const pidRecords = patientIdentifications.filter(r => getMonthFromDate(r.verificationDate) === month);
          const assessRecords = assessments.filter(r => getMonthFromDate(r.assessmentDate) === month);
          const vsRecords = vitalSigns.filter(r => getMonthFromDate(r.recordedDateTime) === month);
          const fpRecords = fallPreventions.filter(r => getMonthFromDate(r.riskAssessmentDate) === month);
          const piRecords = pressureInjuries.filter(r => getMonthFromDate(r.skinAssessmentDate) === month);
          const pmRecords = painManagements.filter(r => getMonthFromDate(r.assessmentDate) === month);
          const medRecords = medications.filter(r => getMonthFromDate(r.administrationTime) === month);
          const handoverRecs = handoverRecords.filter(r => getMonthFromDate(r.handoverDateTime) === month);
          const docRecords = documentationRecords.filter(r => getMonthFromDate(r.entryDateTime) === month);
          const auditRecs = nursingAudits.filter(r => getMonthFromDate(r.auditDate) === month);
          const capaRecs = nursingCapas.filter(r => getMonthFromDate(r.targetDate) === month);

          const activities = qRecords.length + pidRecords.length + assessRecords.length + vsRecords.length + fpRecords.length + piRecords.length + pmRecords.length + medRecords.length + handoverRecs.length + docRecords.length + auditRecs.length + capaRecs.length;

          const medCount = medRecords.length;
          const medComp = medCount ? (medRecords.filter(r => r.status === 'Completed').length / medCount) * 100 : 0;

          const clinicalRecs = [...fpRecords, ...piRecords, ...pmRecords];
          const clinicalCount = clinicalRecs.length;
          const clinicalComp = clinicalCount ? (clinicalRecs.filter(r => r.status === 'Completed').length / clinicalCount) * 100 : 0;

          const auditCount = auditRecs.length;
          const auditComp = auditCount ? (auditRecs.reduce((sum, r) => sum + (parseFloat(r.compliancePercent) || 0), 0) / auditCount) : 0;

          const docCount = docRecords.length;
          const docComp = docCount ? (docRecords.filter(r => r.status === 'Completed').length / docCount) * 100 : 0;

          const pidCount = pidRecords.length;
          const pidComp = pidCount ? (pidRecords.filter(r => r.identificationBandVerified === 'Yes').length / pidCount) * 100 : 0;

          const overall = (pidComp + medComp + docComp + clinicalComp + auditComp) / 5;

          return {
            month,
            activities,
            medication: medCount,
            clinical: clinicalCount,
            audit: parseFloat(auditComp.toFixed(1)) || 0,
            documentation: parseFloat(docComp.toFixed(1)) || 0,
            overall: parseFloat(overall.toFixed(1)) || 0,
          };
        });

        const qualityDist = [
          { name: 'Achieved', value: qualityIndicators.filter(r => r.status === 'Achieved').length, color: '#10b981' },
          { name: 'Partially', value: qualityIndicators.filter(r => r.status === 'Partially Achieved').length, color: '#f59e0b' },
          { name: 'Not Achieved', value: qualityIndicators.filter(r => r.status === 'Not Achieved').length, color: '#ef4444' }
        ];

        const docVsHandover = [
          { name: 'Documentation', value: documentationRecords.length, color: '#6366f1' },
          { name: 'Handovers', value: handoverRecords.length, color: '#0ea5e9' }
        ];

        const exportToCSV = () => {
          const headers = ['Month', 'Activities', 'Medication', 'Clinical', 'Audit %', 'Documentation %', 'Overall %'];
          const csvRows = [headers.join(',')];
          monthlyData.forEach(row => {
            csvRows.push([row.month, row.activities, row.medication, row.clinical, row.audit, row.documentation, row.overall].join(','));
          });
          const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'nursing_reports.csv';
          a.click();
        };
        const exportToPDF = () => alert('PDF export generated (placeholder).');
        const printReport = () => window.print();

        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-800">Reports & Analytics</h3>
                <p className="text-xs text-slate-500">Comprehensive overview of nursing metrics</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={exportToCSV} className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 text-[10px] font-bold hover:bg-slate-50">Export CSV</button>
                <button onClick={exportToPDF} className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 text-[10px] font-bold hover:bg-slate-50">Export PDF</button>
                <button onClick={printReport} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[10px] font-bold hover:brightness-95 shadow-sm">Print Report</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Total Nursing Records', value: totalRecords, color: 'text-slate-800' },
                { label: 'Patient ID Compliance %', value: `${pidCompliance.toFixed(1)}%`, color: 'text-emerald-600' },
                { label: 'Medication Compliance %', value: `${medCompliance.toFixed(1)}%`, color: 'text-blue-600' },
                { label: 'Documentation Compliance %', value: `${docCompliance.toFixed(1)}%`, color: 'text-indigo-600' },
                { label: 'Clinical Care Compliance %', value: `${clinicalCompliance.toFixed(1)}%`, color: 'text-sky-600' },
                { label: 'Internal Audit Compliance %', value: `${auditCompliance.toFixed(1)}%`, color: 'text-purple-600' },
                { label: 'Open CAPAs', value: openCapas, color: 'text-rose-600' },
                { label: 'Overall Performance %', value: `${overallCompliance.toFixed(1)}%`, color: 'text-emerald-600' },
              ].map(kpi => (
                <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                  <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-4">Monthly Nursing Activity Trend</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Line type="monotone" dataKey="activities" stroke={hospital.themeColor} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-4">Quality Indicator Distribution</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={qualityDist} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {qualityDist.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-4">Medication Administration Trend</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <Tooltip />
                      <Bar dataKey="medication" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-4">Clinical Care Compliance Trend</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <Tooltip />
                      <Bar dataKey="clinical" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-4">Internal Audit Compliance</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="audit" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-4">Documentation vs Handover</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={docVsHandover} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {docVsHandover.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/50">
                <h4 className="text-xs font-extrabold text-slate-800">Monthly Summary</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase">Month</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase">Nursing Activities</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase">Medication Records</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase">Clinical Records</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase">Audit Compliance %</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase">Documentation Compliance %</th>
                      <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase">Overall Performance %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {monthlyData.map(row => (
                      <tr key={row.month} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-3 py-3 font-semibold text-slate-700">{row.month}</td>
                        <td className="px-3 py-3 text-slate-600">{row.activities}</td>
                        <td className="px-3 py-3 text-slate-600">{row.medication}</td>
                        <td className="px-3 py-3 text-slate-600">{row.clinical}</td>
                        <td className="px-3 py-3 text-slate-600">{row.audit}%</td>
                        <td className="px-3 py-3 text-slate-600">{row.documentation}%</td>
                        <td className="px-3 py-3 font-bold text-emerald-600">{row.overall}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }
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
        <h2 className="text-xs font-extrabold text-slate-900 mt-2">Nursing Operations</h2>
        <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">Nursing Management Module</p>
      </div>

      <nav className="flex-1 overflow-y-auto custom-scroll py-3 px-2 space-y-0.5">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = id === activeTab;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={isActive ? { backgroundColor: `${hospital.themeColor}0d`, borderColor: `${hospital.themeColor}22`, color: hospital.themeColor } : {}}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all cursor-pointer ${isActive ? 'border-sky-500/20 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[10px] font-semibold truncate">{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-100">
        <p className="text-[9px] text-slate-400 font-medium">
          Nursing Management • v1.0
        </p>
      </div>
    </aside>

    <main className="flex-1 overflow-y-auto custom-scroll p-6 bg-slate-50/30">
      {renderContent()}
    </main>

    {isPatientIdModalOpen && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800">{editingPatientId ? 'Edit Patient ID' : 'Add Patient Identification'}</h3>
            </div>
            <button onClick={() => { setIsPatientIdModalOpen(false); setEditingPatientId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>
          <form onSubmit={handleSavePatientId} className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name *</label>
                <input type="text" value={patientIdForm.patientName} onChange={(e) => setPatientIdForm({ ...patientIdForm, patientName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">UHID *</label>
                <input type="text" value={patientIdForm.uhid} onChange={(e) => setPatientIdForm({ ...patientIdForm, uhid: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Ward *</label>
                <select value={patientIdForm.ward} onChange={(e) => setPatientIdForm({ ...patientIdForm, ward: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                  {WARDS.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Bed Number *</label>
                <input type="text" value={patientIdForm.bedNumber} onChange={(e) => setPatientIdForm({ ...patientIdForm, bedNumber: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Verified *</label>
                <select value={patientIdForm.identificationBandVerified} onChange={(e) => setPatientIdForm({ ...patientIdForm, identificationBandVerified: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                  {YES_NO.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Verification Date *</label>
                <input type="date" value={patientIdForm.verificationDate} onChange={(e) => setPatientIdForm({ ...patientIdForm, verificationDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Verified By *</label>
                <input type="text" value={patientIdForm.verifiedBy} onChange={(e) => setPatientIdForm({ ...patientIdForm, verifiedBy: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                <select value={patientIdForm.status} onChange={(e) => setPatientIdForm({ ...patientIdForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                  {PRACTICE_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button type="button" onClick={() => { setIsPatientIdModalOpen(false); setEditingPatientId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
              <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingPatientId ? 'Save Changes' : 'Add Record'}</button>
            </div>
          </form>
        </div>
      </div>
    )}

    {isAssessmentModalOpen && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800">{editingAssessmentId ? 'Edit Assessment' : 'Add Assessment'}</h3>
            </div>
            <button onClick={() => { setIsAssessmentModalOpen(false); setEditingAssessmentId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>
          <form onSubmit={handleSaveAssessment} className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Assessment ID *</label>
                <input type="text" value={assessmentForm.assessmentId} onChange={(e) => setAssessmentForm({ ...assessmentForm, assessmentId: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name *</label>
                <input type="text" value={assessmentForm.patientName} onChange={(e) => setAssessmentForm({ ...assessmentForm, patientName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Admission Date *</label>
                <input type="date" value={assessmentForm.admissionDate} onChange={(e) => setAssessmentForm({ ...assessmentForm, admissionDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Assessment Date *</label>
                <input type="date" value={assessmentForm.assessmentDate} onChange={(e) => setAssessmentForm({ ...assessmentForm, assessmentDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Consciousness *</label>
                <select value={assessmentForm.consciousnessLevel} onChange={(e) => setAssessmentForm({ ...assessmentForm, consciousnessLevel: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                  {CONSCIOUSNESS_LEVELS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Fall Risk *</label>
                <select value={assessmentForm.fallRisk} onChange={(e) => setAssessmentForm({ ...assessmentForm, fallRisk: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                  {FALL_RISK_LEVELS.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Pressure Injury Risk *</label>
                <select value={assessmentForm.pressureInjuryRisk} onChange={(e) => setAssessmentForm({ ...assessmentForm, pressureInjuryRisk: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                  {PRESSURE_INJURY_RISK.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <NumField label="Pain Score *" field="painScore" form={assessmentForm} setForm={setAssessmentForm} />
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Assessed By *</label>
                <input type="text" value={assessmentForm.assessedBy} onChange={(e) => setAssessmentForm({ ...assessmentForm, assessedBy: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                <select value={assessmentForm.status} onChange={(e) => setAssessmentForm({ ...assessmentForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                  {PRACTICE_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button type="button" onClick={() => { setIsAssessmentModalOpen(false); setEditingAssessmentId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
              <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingAssessmentId ? 'Save Changes' : 'Add Record'}</button>
            </div>
          </form>
        </div>
      </div>
    )}

    {isVitalSignModalOpen && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800">{editingVitalSignId ? 'Edit Vital Signs' : 'Add Vital Signs'}</h3>
            </div>
            <button onClick={() => { setIsVitalSignModalOpen(false); setEditingVitalSignId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>
          <form onSubmit={handleSaveVitalSign} className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name *</label>
                <input type="text" value={vitalSignForm.patientName} onChange={(e) => setVitalSignForm({ ...vitalSignForm, patientName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
              </div>
              <NumField label="Temperature *" field="temperature" form={vitalSignForm} setForm={setVitalSignForm} step="0.1" />
              <NumField label="Pulse *" field="pulse" form={vitalSignForm} setForm={setVitalSignForm} />
              <NumField label="Respiratory Rate *" field="respiratoryRate" form={vitalSignForm} setForm={setVitalSignForm} />
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Blood Pressure *</label>
                <input type="text" value={vitalSignForm.bloodPressure} onChange={(e) => setVitalSignForm({ ...vitalSignForm, bloodPressure: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
              </div>
              <NumField label="SpO₂ *" field="spo2" form={vitalSignForm} setForm={setVitalSignForm} />
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Recorded By *</label>
                <input type="text" value={vitalSignForm.recordedBy} onChange={(e) => setVitalSignForm({ ...vitalSignForm, recordedBy: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
              </div>
              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Recorded DateTime *</label>
                <input type="datetime-local" value={vitalSignForm.recordedDateTime} onChange={(e) => setVitalSignForm({ ...vitalSignForm, recordedDateTime: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button type="button" onClick={() => { setIsVitalSignModalOpen(false); setEditingVitalSignId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
              <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingVitalSignId ? 'Save Changes' : 'Add Record'}</button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);
};

export default NursingOperationsWorkspace;
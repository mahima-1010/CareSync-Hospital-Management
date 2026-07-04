import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  ChevronLeft,
  LayoutDashboard,
  BarChart3,
  UserPlus,
  CreditCard,
  Users,
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

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'quality', label: 'Quality Indicators', icon: BarChart3 },
  { id: 'registration', label: 'Registration & Admission', icon: UserPlus },
  { id: 'billing', label: 'Billing & Insurance', icon: CreditCard },
  { id: 'services', label: 'Patient Services', icon: Users },
  { id: 'audit', label: 'Internal Audit', icon: ClipboardCheck },
  { id: 'reports', label: 'Reports & Analytics', icon: FileText },
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const LS_KEY_DASHBOARD = 'admission_dashboard_data';
const LS_KEY_QUALITY = 'admission_quality_indicators';
const LS_KEY_OPD_REGISTRATIONS = 'admission_opd_registrations';
const LS_KEY_IPD_ADMISSIONS = 'admission_ipd_admissions';
const LS_KEY_BED_ALLOCATIONS = 'admission_bed_allocations';
const LS_KEY_BILLING = 'admission_billing';
const LS_KEY_TPA_CLAIMS = 'admission_tpa_claims';
const LS_KEY_FINANCIAL_COUNSELLING = 'admission_financial_counselling';
const LS_KEY_INITIAL_ASSESSMENTS = 'admission_initial_assessments';
const LS_KEY_REFERRALS = 'admission_referrals';
const LS_KEY_PATIENT_COMPLAINTS = 'admission_patient_complaints';
const LS_KEY_INTERNAL_AUDITS = 'admission_internal_audits';
const LS_KEY_CAPA_RECORDS = 'admission_capa_records';

const WARD_TYPES = ['General Ward', 'ICU', 'CCU', 'NICU', 'Pediatric', 'Maternity', 'Surgery'];
const REGISTRATION_TYPES = ['New', 'Follow-up', 'Emergency', 'Referral'];
const ADMISSION_SOURCES = ['Emergency', 'Referral', 'Transfer', 'Direct'];
const ADMISSION_TYPES = ['Planned', 'Emergency'];
const REGISTRATION_STATUSES = ['Completed', 'Pending'];
const BED_STATUSES = ['Available', 'Occupied', 'Reserved', 'Maintenance'];

const QUALITY_CATEGORIES = ['Registration Process', 'Patient Flow', 'Billing', 'Documentation', 'Insurance'];

const SAMPLE_QUALITY_RECORDS = [
  { id: 'aq-001', indicatorId: 'AQ-2025-001', indicatorName: 'Registration Accuracy', category: 'Registration Process', target: 100, actual: 98, month: 'January', year: 2025, responsibleDepartment: 'Registration Desk', status: 'Achieved', remarks: 'Minimal errors in patient registration' },
  { id: 'aq-002', indicatorId: 'AQ-2025-002', indicatorName: 'Admission Completion Time', category: 'Patient Flow', target: 30, actual: 28, month: 'February', year: 2025, responsibleDepartment: 'Admission Desk', status: 'Achieved', remarks: 'Within target time consistently' },
  { id: 'aq-003', indicatorId: 'AQ-2025-003', indicatorName: 'Billing Accuracy', category: 'Billing', target: 99, actual: 97, month: 'March', year: 2025, responsibleDepartment: 'Billing', status: 'Achieved', remarks: 'Minor discrepancies noted' },
  { id: 'aq-004', indicatorId: 'AQ-2025-004', indicatorName: 'Insurance Claim Processing', category: 'Insurance', target: 100, actual: 95, month: 'April', year: 2025, responsibleDepartment: 'Insurance Desk', status: 'Pending', remarks: 'Paperwork delays observed' },
  { id: 'aq-005', indicatorId: 'AQ-2025-005', indicatorName: 'Patient Satisfaction Score', category: 'Documentation', target: 95, actual: 96, month: 'May', year: 2025, responsibleDepartment: 'Patient Services', status: 'Achieved', remarks: 'Exceeding target' },
];

const OPD_REGISTRATION_SEED = [
  { id: 'opd-001', registrationNo: 'REG-2025-001', patientName: 'John Smith', uhid: 'UHID12345', registrationType: 'New', age: 45, gender: 'Male', contactNumber: '+1-555-0123', emergencyContact: '+1-555-0124', address: '123 Main St, City', doctorName: 'Dr. Williams', department: 'General Medicine', registrationDate: '2025-01-15', registrationTime: '09:30', status: 'Completed', remarks: '' },
  { id: 'opd-002', registrationNo: 'REG-2025-002', patientName: 'Mary Johnson', uhid: 'UHID12346', registrationType: 'Follow-up', age: 32, gender: 'Female', contactNumber: '+1-555-0125', emergencyContact: '+1-555-0126', address: '456 Oak Ave, Town', doctorName: 'Dr. Brown', department: 'Cardiology', registrationDate: '2025-01-15', registrationTime: '10:15', status: 'Completed', remarks: '' },
  { id: 'opd-003', registrationNo: 'REG-2025-003', patientName: 'Robert Davis', uhid: 'UHID12347', registrationType: 'Emergency', age: 58, gender: 'Male', contactNumber: '+1-555-0127', emergencyContact: '+1-555-0128', address: '789 Pine Rd, Village', doctorName: 'Dr. Lee', department: 'Emergency', registrationDate: '2025-01-16', registrationTime: '08:45', status: 'Completed', remarks: '' },
  { id: 'opd-004', registrationNo: 'REG-2025-004', patientName: 'Lisa Anderson', uhid: 'UHID12348', registrationType: 'Referral', age: 28, gender: 'Female', contactNumber: '+1-555-0129', emergencyContact: '+1-555-0130', address: '321 Elm St, City', doctorName: 'Dr. Miller', department: 'Orthopedics', registrationDate: '2025-01-16', registrationTime: '11:00', status: 'Completed', remarks: '' },
  { id: 'opd-005', registrationNo: 'REG-2025-005', patientName: 'Michael Clark', uhid: 'UHID12349', registrationType: 'New', age: 65, gender: 'Male', contactNumber: '+1-555-0131', emergencyContact: '+1-555-0132', address: '654 Maple Dr, Town', doctorName: 'Dr. Taylor', department: 'Neurology', registrationDate: '2025-01-17', registrationTime: '14:30', status: 'Pending', remarks: 'Awaiting doctor assignment' },
];

const IPD_ADMISSION_SEED = [
  { id: 'ipd-001', admissionNo: 'ADM-2025-001', patientName: 'John Smith', uhid: 'UHID12345', admissionType: 'Emergency', source: 'Emergency', referringDoctor: 'Dr. Williams', admittingDoctor: 'Dr. Williams', department: 'General Medicine', bedRequired: 'General Ward', admissionDate: '2025-01-15', admissionTime: '10:00', diagnosis: 'Pneumonia', status: 'Completed', remarks: '' },
  { id: 'ipd-002', admissionNo: 'ADM-2025-002', patientName: 'Mary Johnson', uhid: 'UHID12346', admissionType: 'Planned', source: 'Referral', referringDoctor: 'Dr. Brown', admittingDoctor: 'Dr. Brown', department: 'Cardiology', bedRequired: 'ICU', admissionDate: '2025-01-16', admissionTime: '09:30', diagnosis: 'Acute MI', status: 'Completed', remarks: '' },
  { id: 'ipd-003', admissionNo: 'ADM-2025-003', patientName: 'Robert Davis', uhid: 'UHID12347', admissionType: 'Emergency', source: 'Emergency', referringDoctor: 'Dr. Lee', admittingDoctor: 'Dr. Lee', department: 'Emergency', bedRequired: 'CCU', admissionDate: '2025-01-17', admissionTime: '08:15', diagnosis: 'Severe Sepsis', status: 'Pending', remarks: 'Bed preparation in progress' },
  { id: 'ipd-004', admissionNo: 'ADM-2025-004', patientName: 'Lisa Anderson', uhid: 'UHID12348', admissionType: 'Planned', source: 'Direct', referringDoctor: '', admittingDoctor: 'Dr. Miller', department: 'Orthopedics', bedRequired: 'General Ward', admissionDate: '2025-01-18', admissionTime: '11:30', diagnosis: 'Hip Fracture', status: 'Completed', remarks: '' },
  { id: 'ipd-005', admissionNo: 'ADM-2025-005', patientName: 'Michael Clark', uhid: 'UHID12349', admissionType: 'Emergency', source: 'Transfer', referringDoctor: 'Dr. Johnson', admittingDoctor: 'Dr. Taylor', department: 'Neurology', bedRequired: 'ICU', admissionDate: '2025-01-19', admissionTime: '15:00', diagnosis: 'Stroke', status: 'Pending', remarks: 'Awaiting ICU bed' },
];

const BED_ALLOCATION_SEED = [
  { id: 'bed-001', bedNo: 'GW-101', ward: 'General Ward', patientName: 'John Smith', uhid: 'UHID12345', admissionNo: 'ADM-2025-001', allocationDate: '2025-01-15', admissionDate: '2025-01-15', dischargeDate: '', status: 'Occupied', allocatedBy: 'Nurse Sarah', remarks: '' },
  { id: 'bed-002', bedNo: 'ICU-02', ward: 'ICU', patientName: 'Mary Johnson', uhid: 'UHID12346', admissionNo: 'ADM-2025-002', allocationDate: '2025-01-16', admissionDate: '2025-01-16', dischargeDate: '', status: 'Occupied', allocatedBy: 'Nurse Raj', remarks: '' },
  { id: 'bed-003', bedNo: 'GW-102', ward: 'General Ward', patientName: '', uhid: '', admissionNo: '', allocationDate: '', admissionDate: '', dischargeDate: '', status: 'Available', allocatedBy: '', remarks: '' },
  { id: 'bed-004', bedNo: 'CCU-05', ward: 'CCU', patientName: 'Robert Davis', uhid: 'UHID12347', admissionNo: 'ADM-2025-003', allocationDate: '2025-01-17', admissionDate: '2025-01-17', dischargeDate: '', status: 'Reserved', allocatedBy: 'Nurse Priya', remarks: 'Awaiting patient transfer' },
  { id: 'bed-005', bedNo: 'NICU-03', ward: 'NICU', patientName: 'Lisa Anderson', uhid: 'UHID12348', admissionNo: 'ADM-2025-004', allocationDate: '2025-01-18', admissionDate: '2025-01-18', dischargeDate: '2025-01-20', status: 'Occupied', allocatedBy: 'Nurse Amit', remarks: '' },
];

const BILLING_SEED = [
  { id: 'bill-001', billId: 'BILL-2025-001', uhid: 'UHID12345', patientName: 'John Smith', billType: 'OPD', amount: 2500, paymentMode: 'Cash', status: 'Paid', billingDate: '2025-01-15', remarks: '' },
  { id: 'bill-002', billId: 'BILL-2025-002', uhid: 'UHID12346', patientName: 'Mary Johnson', billType: 'IPD', amount: 15000, paymentMode: 'Insurance', status: 'Pending', billingDate: '2025-01-16', remarks: 'Awaiting insurance approval' },
  { id: 'bill-003', billId: 'BILL-2025-003', uhid: 'UHID12347', patientName: 'Robert Davis', billType: 'IPD', amount: 18000, paymentMode: 'Credit Card', status: 'Paid', billingDate: '2025-01-17', remarks: '' },
  { id: 'bill-004', billId: 'BILL-2025-004', uhid: 'UHID12348', patientName: 'Lisa Anderson', billType: 'OPD', amount: 3200, paymentMode: 'Cash', status: 'Pending', billingDate: '2025-01-18', remarks: 'Partial payment received' },
  { id: 'bill-005', billId: 'BILL-2025-005', uhid: 'UHID12349', patientName: 'Michael Clark', billType: 'IPD', amount: 12500, paymentMode: 'Insurance', status: 'Paid', billingDate: '2025-01-19', remarks: '' },
];

const TPA_CLAIMS_SEED = [
  { id: 'claim-001', claimId: 'CLAIM-2025-001', uhid: 'UHID12346', patientName: 'Mary Johnson', insuranceCompany: 'Star Health', claimAmount: 15000, approvedAmount: 14500, claimStatus: 'Approved', submissionDate: '2025-01-20', remarks: '' },
  { id: 'claim-002', claimId: 'CLAIM-2025-002', uhid: 'UHID12350', patientName: 'Emma Wilson', insuranceCompany: 'Apollo Munich', claimAmount: 22000, approvedAmount: 20000, claimStatus: 'Partial', submissionDate: '2025-01-21', remarks: 'Pending documents' },
  { id: 'claim-003', claimId: 'CLAIM-2025-003', uhid: 'UHID12351', patientName: 'David Brown', insuranceCompany: 'ICICI Lombard', claimAmount: 8500, approvedAmount: 0, claimStatus: 'Rejected', submissionDate: '2025-01-22', remarks: 'Incomplete documentation' },
  { id: 'claim-004', claimId: 'CLAIM-2025-004', uhid: 'UHID12352', patientName: 'Sarah Miller', insuranceCompany: 'Bajaj Allianz', claimAmount: 18000, approvedAmount: 18000, claimStatus: 'Approved', submissionDate: '2025-01-23', remarks: '' },
  { id: 'claim-005', claimId: 'CLAIM-2025-005', uhid: 'UHID12349', patientName: 'Michael Clark', insuranceCompany: 'Star Health', claimAmount: 12500, approvedAmount: 12000, claimStatus: 'Approved', submissionDate: '2025-01-24', remarks: 'Approved with deduction' },
];

const FINANCIAL_COUNSELLING_SEED = [
  { id: 'fc-001', counsellingId: 'FC-2025-001', uhid: 'UHID12353', patientName: 'Anna Lee', counsellingType: 'Pre-admission', estimatedCost: 25000, counsellor: 'Financial Officer John', status: 'Completed', date: '2025-01-20', remarks: '' },
  { id: 'fc-002', counsellingId: 'FC-2025-002', uhid: 'UHID12354', patientName: 'Tom Wilson', counsellingType: 'Insurance Guidance', estimatedCost: 18000, counsellor: 'Counsellor Mary', status: 'Completed', date: '2025-01-21', remarks: '' },
  { id: 'fc-003', counsellingId: 'FC-2025-003', uhid: 'UHID12355', patientName: 'Nancy Drew', counsellingType: 'Payment Plan', estimatedCost: 35000, counsellor: 'Financial Officer John', status: 'Pending', date: '2025-01-22', remarks: 'Follow-up scheduled' },
  { id: 'fc-004', counsellingId: 'FC-2025-004', uhid: 'UHID12356', patientName: 'Peter Parker', counsellingType: 'Cashless Claim', estimatedCost: 0, counsellor: 'Counsellor Mary', status: 'Completed', date: '2025-01-23', remarks: '' },
  { id: 'fc-005', counsellingId: 'FC-2025-005', uhid: 'UHID12357', patientName: 'Bruce Wayne', counsellingType: 'Package Inquiry', estimatedCost: 50000, counsellor: 'Financial Officer John', status: 'Pending', date: '2025-01-24', remarks: 'Waiting for package details' },
];

const SAMPLE_REGISTRATIONS = [
  { id: 'reg-001', month: 'January', year: 2025, opdRegistrations: 320, ipdAdmissions: 85, avgRegistrationTime: 12, patientSatisfaction: 94, pendingAdmissions: 3, billingCollection: 125000, insuranceCases: 28 },
  { id: 'reg-002', month: 'February', year: 2025, opdRegistrations: 295, ipdAdmissions: 78, avgRegistrationTime: 11, patientSatisfaction: 95, pendingAdmissions: 2, billingCollection: 118000, insuranceCases: 31 },
  { id: 'reg-003', month: 'March', year: 2025, opdRegistrations: 340, ipdAdmissions: 92, avgRegistrationTime: 10, patientSatisfaction: 96, pendingAdmissions: 4, billingCollection: 132000, insuranceCases: 35 },
  { id: 'reg-004', year: 2025, opdRegistrations: 310, ipdAdmissions: 88, avgRegistrationTime: 11, patientSatisfaction: 95, pendingAdmissions: 3, billingCollection: 128000, insuranceCases: 32 },
  { id: 'reg-005', month: 'May', year: 2025, opdRegistrations: 355, ipdAdmissions: 95, avgRegistrationTime: 9, patientSatisfaction: 97, pendingAdmissions: 2, billingCollection: 138000, insuranceCases: 38 },
];

const SAMPLE_DAILY_ADMISSIONS = [
  { day: 'Mon', opd: 65, ipd: 18 },
  { day: 'Tue', opd: 72, ipd: 15 },
  { day: 'Wed', opd: 68, ipd: 22 },
  { day: 'Thu', opd: 75, ipd: 19 },
  { day: 'Fri', opd: 80, ipd: 25 },
  { day: 'Sat', opd: 55, ipd: 12 },
  { day: 'Sun', opd: 45, ipd: 8 },
];

const SAMPLE_RECENT_ACTIVITY = [
  { id: 'act-001', date: '2025-06-15', patient: 'John Smith', uhid: 'UHID12345', registrationType: 'OPD', status: 'Completed' },
  { id: 'act-002', date: '2025-06-15', patient: 'Mary Johnson', uhid: 'UHID12346', registrationType: 'IPD', status: 'Completed' },
  { id: 'act-003', date: '2025-06-14', patient: 'Robert Davis', uhid: 'UHID12347', registrationType: 'OPD', status: 'Completed' },
  { id: 'act-004', date: '2025-06-14', patient: 'Lisa Anderson', uhid: 'UHID12348', registrationType: 'IPD', status: 'Pending' },
  { id: 'act-005', date: '2025-06-13', patient: 'Michael Clark', uhid: 'UHID12349', registrationType: 'OPD', status: 'Completed' },
  { id: 'act-006', date: '2025-06-13', patient: 'Emma Wilson', uhid: 'UHID12350', registrationType: 'IPD', status: 'Completed' },
  { id: 'act-007', date: '2025-06-12', patient: 'David Brown', uhid: 'UHID12351', registrationType: 'OPD', status: 'Completed' },
  { id: 'act-008', date: '2025-06-12', patient: 'Sarah Miller', uhid: 'UHID12352', registrationType: 'IPD', status: 'Pending' },
];

const INITIAL_ASSESSMENTS_SEED = [
  { id: 'assess-001', assessmentId: 'ASSESS-2025-001', uhid: 'UHID12345', patientName: 'John Smith', assessmentType: 'Initial', assessedBy: 'Nurse Sarah', assessmentDate: '2025-01-15', priority: 'High', status: 'Completed', remarks: 'Admitted for pneumonia' },
  { id: 'assess-002', assessmentId: 'ASSESS-2025-002', uhid: 'UHID12346', patientName: 'Mary Johnson', assessmentType: 'Comprehensive', assessedBy: 'Nurse Raj', assessmentDate: '2025-01-16', priority: 'Medium', status: 'Completed', remarks: '' },
  { id: 'assess-003', assessmentId: 'ASSESS-2025-003', uhid: 'UHID12347', patientName: 'Robert Davis', assessmentType: 'Routine', assessedBy: 'Nurse Priya', assessmentDate: '2025-01-17', priority: 'Low', status: 'In Progress', remarks: 'Waiting for lab results' },
  { id: 'assess-004', assessmentId: 'ASSESS-2025-004', uhid: 'UHID12348', patientName: 'Lisa Anderson', assessmentType: 'Initial', assessedBy: 'Nurse Amit', assessmentDate: '2025-01-18', priority: 'High', status: 'Pending', remarks: '' },
  { id: 'assess-005', assessmentId: 'ASSESS-2025-005', uhid: 'UHID12349', patientName: 'Michael Clark', assessmentType: 'Comprehensive', assessedBy: 'Nurse Sarah', assessmentDate: '2025-01-19', priority: 'Medium', status: 'Completed', remarks: 'Neurological assessment done' },
];

const REFERRALS_SEED = [
  { id: 'ref-001', referralId: 'REF-2025-001', uhid: 'UHID12345', patientName: 'John Smith', referralType: 'Internal', referredTo: 'Cardiology', reason: 'Chest pain evaluation', transferDate: '2025-01-15', status: 'Completed', remarks: '' },
  { id: 'ref-002', referralId: 'REF-2025-002', uhid: 'UHID12346', patientName: 'Mary Johnson', referralType: 'External', referredTo: 'City Hospital', reason: 'Specialist consultation', transferDate: '2025-01-16', status: 'Pending', remarks: 'Awaiting approval' },
  { id: 'ref-003', referralId: 'REF-2025-003', uhid: 'UHID12347', patientName: 'Robert Davis', referralType: 'Internal', referredTo: 'Neurology', reason: 'Stroke follow-up', transferDate: '2025-01-17', status: 'Completed', remarks: '' },
  { id: 'ref-004', referralId: 'REF-2025-004', uhid: 'UHID12348', patientName: 'Lisa Anderson', referralType: 'Internal', referredTo: 'Orthopedics', reason: 'Surgical review', transferDate: '2025-01-18', status: 'In Progress', remarks: 'Patient stable' },
  { id: 'ref-005', referralId: 'REF-2025-005', uhid: 'UHID12349', patientName: 'Michael Clark', referralType: 'External', referredTo: 'Rehab Center', reason: 'Post-stroke rehab', transferDate: '2025-01-19', status: 'Pending', remarks: '' },
];

const PATIENT_COMPLAINTS_SEED = [
  { id: 'comp-001', complaintId: 'COMP-2025-001', uhid: 'UHID12345', patientName: 'John Smith', complaintCategory: 'Food Quality', complaintDate: '2025-01-15', assignedTo: 'Dietary Manager', resolutionStatus: 'Resolved', closedDate: '2025-01-16', remarks: 'Menu changed per request' },
  { id: 'comp-002', complaintId: 'COMP-2025-002', uhid: 'UHID12346', patientName: 'Mary Johnson', complaintCategory: 'Nursing Care', complaintDate: '2025-01-16', assignedTo: 'Nurse Raj', resolutionStatus: 'In Progress', closedDate: '', remarks: '' },
  { id: 'comp-003', complaintId: 'COMP-2025-003', uhid: 'UHID12347', patientName: 'Robert Davis', complaintCategory: 'Room Condition', complaintDate: '2025-01-17', assignedTo: 'Maintenance', resolutionStatus: 'Resolved', closedDate: '2025-01-18', remarks: 'AC repaired' },
  { id: 'comp-004', complaintId: 'COMP-2025-004', uhid: 'UHID12348', patientName: 'Lisa Anderson', complaintCategory: 'Billing', complaintDate: '2025-01-18', assignedTo: 'Billing Dept', resolutionStatus: 'Pending', closedDate: '', remarks: 'Insurance claim dispute' },
  { id: 'comp-005', complaintId: 'COMP-2025-005', uhid: 'UHID12349', patientName: 'Michael Clark', complaintCategory: 'Waiting Time', complaintDate: '2025-01-19', assignedTo: 'Outpatient Manager', resolutionStatus: 'Resolved', closedDate: '2025-01-20', remarks: 'Apology issued' },
];

const ASSESSMENT_TYPES = ['Initial', 'Comprehensive', 'Routine', 'Specialist'];
const ASSESSMENT_PRIORITIES = ['High', 'Medium', 'Low'];
const REFERRAL_TYPES = ['Internal', 'External'];
const REFERRAL_STATUSES = ['Completed', 'Pending', 'In Progress'];
const COMPLAINT_CATEGORIES = ['Food Quality', 'Nursing Care', 'Room Condition', 'Billing', 'Waiting Time', 'Other'];
const COMPLAINT_STATUSES = ['Resolved', 'In Progress', 'Pending'];

const AdmissionRegistrationWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();
  const [activeTab, setActiveTab] = useState('dashboard');

  const [dashboardData, setDashboardData] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_DASHBOARD);
    return saved ? JSON.parse(saved) : SAMPLE_REGISTRATIONS;
  });
  const [recentActivity, setRecentActivity] = useState(() => {
    const saved = localStorage.getItem('admission_recent_activity');
    return saved ? JSON.parse(saved) : SAMPLE_RECENT_ACTIVITY;
  });

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_DASHBOARD, JSON.stringify(dashboardData));
  }, [dashboardData]);

  React.useEffect(() => {
    localStorage.setItem('admission_recent_activity', JSON.stringify(recentActivity));
  }, [recentActivity]);

  const [qualityIndicators, setQualityIndicators] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_QUALITY);
    return saved ? JSON.parse(saved) : SAMPLE_QUALITY_RECORDS;
  });
  const [isQualityModalOpen, setIsQualityModalOpen] = useState(false);
  const [editingQualityId, setEditingQualityId] = useState(null);
  const [qualityForm, setQualityForm] = useState({ id: '', indicatorId: '', indicatorName: '', category: 'Registration Process', target: 100, actual: 0, month: 'January', year: 2025, responsibleDepartment: '', status: 'Achieved', remarks: '' });
  const [qualitySearch, setQualitySearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_QUALITY, JSON.stringify(qualityIndicators));
  }, [qualityIndicators]);

  const [opdRegistrations, setOpdRegistrations] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_OPD_REGISTRATIONS);
    return saved ? JSON.parse(saved) : OPD_REGISTRATION_SEED;
  });
  const [isOpdModalOpen, setIsOpdModalOpen] = useState(false);
  const [editingOpdId, setEditingOpdId] = useState(null);
  const [opdForm, setOpdForm] = useState({ id: '', registrationNo: '', patientName: '', uhid: '', registrationType: 'New', age: 0, gender: 'Male', contactNumber: '', emergencyContact: '', address: '', doctorName: '', department: 'General Medicine', registrationDate: '', registrationTime: '', status: 'Completed', remarks: '' });
  const [opdSearch, setOpdSearch] = useState('');

  const [ipdAdmissions, setIpdAdmissions] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_IPD_ADMISSIONS);
    return saved ? JSON.parse(saved) : IPD_ADMISSION_SEED;
  });
  const [isIpdModalOpen, setIsIpdModalOpen] = useState(false);
  const [editingIpdId, setEditingIpdId] = useState(null);
  const [ipdForm, setIpdForm] = useState({ id: '', admissionNo: '', patientName: '', uhid: '', admissionType: 'Emergency', source: 'Emergency', referringDoctor: '', admittingDoctor: '', department: 'General Medicine', bedRequired: 'General Ward', admissionDate: '', admissionTime: '', diagnosis: '', status: 'Completed', remarks: '' });
  const [ipdSearch, setIpdSearch] = useState('');

  const [bedAllocations, setBedAllocations] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_BED_ALLOCATIONS);
    return saved ? JSON.parse(saved) : BED_ALLOCATION_SEED;
  });
  const [isBedModalOpen, setIsBedModalOpen] = useState(false);
  const [editingBedId, setEditingBedId] = useState(null);
  const [bedForm, setBedForm] = useState({ id: '', bedNo: '', ward: 'General Ward', patientName: '', uhid: '', admissionNo: '', allocationDate: '', admissionDate: '', dischargeDate: '', status: 'Available', allocatedBy: '', remarks: '' });
  const [bedSearch, setBedSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_OPD_REGISTRATIONS, JSON.stringify(opdRegistrations));
  }, [opdRegistrations]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_IPD_ADMISSIONS, JSON.stringify(ipdAdmissions));
  }, [ipdAdmissions]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_BED_ALLOCATIONS, JSON.stringify(bedAllocations));
  }, [bedAllocations]);

  const [billingRecords, setBillingRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_BILLING);
    return saved ? JSON.parse(saved) : BILLING_SEED;
  });
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  const [editingBillingId, setEditingBillingId] = useState(null);
  const [billingForm, setBillingForm] = useState({ id: '', billId: '', uhid: '', patientName: '', billType: 'OPD', amount: 0, paymentMode: 'Cash', status: 'Pending', billingDate: '', remarks: '' });
  const [billingSearch, setBillingSearch] = useState('');

  const [tpaClaims, setTpaClaims] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_TPA_CLAIMS);
    return saved ? JSON.parse(saved) : TPA_CLAIMS_SEED;
  });
  const [isTpaModalOpen, setIsTpaModalOpen] = useState(false);
  const [editingTpaId, setEditingTpaId] = useState(null);
  const [tpaForm, setTpaForm] = useState({ id: '', claimId: '', uhid: '', patientName: '', insuranceCompany: 'Star Health', claimAmount: 0, approvedAmount: 0, claimStatus: 'Pending', submissionDate: '', remarks: '' });
  const [tpaSearch, setTpaSearch] = useState('');

  const [financialCounselling, setFinancialCounselling] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_FINANCIAL_COUNSELLING);
    return saved ? JSON.parse(saved) : FINANCIAL_COUNSELLING_SEED;
  });
  const [isFcModalOpen, setIsFcModalOpen] = useState(false);
  const [editingFcId, setEditingFcId] = useState(null);
  const [fcForm, setFcForm] = useState({ id: '', counsellingId: '', uhid: '', patientName: '', counsellingType: 'Pre-admission', estimatedCost: 0, counsellor: '', status: 'Pending', date: '', remarks: '' });
  const [fcSearch, setFcSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_BILLING, JSON.stringify(billingRecords));
  }, [billingRecords]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_TPA_CLAIMS, JSON.stringify(tpaClaims));
  }, [tpaClaims]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_FINANCIAL_COUNSELLING, JSON.stringify(financialCounselling));
  }, [financialCounselling]);

  const totalOpdRegCount = opdRegistrations.length;
  const totalIpdCount = ipdAdmissions.length;
  const bedOccupied = bedAllocations.filter(r => r.status === 'Occupied').length;
  const totalBeds = bedAllocations.length;
  const availableBeds = bedAllocations.filter(r => r.status === 'Available').length;
  const pendingAdmissionsCount = ipdAdmissions.filter(r => r.status === 'Pending').length;
  const avgRegTime = opdRegistrations.length ? opdRegistrations.reduce((s, r) => {
    const [h, m] = (r.registrationTime || '0:0').split(':').map(Number);
    return s + (h * 60 + m);
  }, 0) / opdRegistrations.length / 60 : 0;
  const admissionCompletionPct = ipdAdmissions.length ? (ipdAdmissions.filter(r => r.status === 'Completed').length / ipdAdmissions.length * 100).toFixed(1) : 0;
  const bedAccuracy = bedAllocations.length ? (bedAllocations.filter(r => r.bedNo && r.status === 'Occupied').length / bedAllocations.length * 100).toFixed(1) : 0;

  const REGISTRATION_TABS = ['opd', 'ipd', 'beds'];
  const [activeRegistrationTab, setActiveRegistrationTab] = useState('opd');

  const getNextOpdId = () => {
    const maxNum = opdRegistrations.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `opd-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenOpdModal = (record = null) => {
    if (record) {
      setOpdForm({ ...record });
      setEditingOpdId(record.id);
    } else {
      setOpdForm({ ...opdForm, id: getNextOpdId(), registrationNo: `REG-2025-${String(Date.now()).slice(-3)}`, registrationDate: new Date().toISOString().split('T')[0] });
      setEditingOpdId(null);
    }
    setIsOpdModalOpen(true);
  };

  const handleSaveOpd = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!opdForm.patientName || !opdForm.uhid) {
      alert('Patient Name and UHID are required.');
      return;
    }
    if (editingOpdId) {
      setOpdRegistrations(prev => prev.map(r => (r.id === editingOpdId ? { ...opdForm, id: editingOpdId } : r)));
    } else {
      setOpdRegistrations(prev => [...prev, { ...opdForm }]);
    }
    setIsOpdModalOpen(false);
    setEditingOpdId(null);
  };

  const handleDeleteOpd = (id) => {
    if (window.confirm('Delete this OPD registration record?')) {
      setOpdRegistrations(prev => prev.filter(r => r.id !== id));
    }
  };

  const getNextIpdId = () => {
    const maxNum = ipdAdmissions.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `ipd-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenIpdModal = (record = null) => {
    if (record) {
      setIpdForm({ ...record });
      setEditingIpdId(record.id);
    } else {
      setIpdForm({ ...ipdForm, id: getNextIpdId(), admissionNo: `ADM-2025-${String(Date.now()).slice(-3)}`, admissionDate: new Date().toISOString().split('T')[0] });
      setEditingIpdId(null);
    }
    setIsIpdModalOpen(true);
  };

  const handleSaveIpd = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!ipdForm.patientName || !ipdForm.uhid) {
      alert('Patient Name and UHID are required.');
      return;
    }
    if (editingIpdId) {
      setIpdAdmissions(prev => prev.map(r => (r.id === editingIpdId ? { ...ipdForm, id: editingIpdId } : r)));
    } else {
      setIpdAdmissions(prev => [...prev, { ...ipdForm }]);
    }
    setIsIpdModalOpen(false);
    setEditingIpdId(null);
  };

  const handleDeleteIpd = (id) => {
    if (window.confirm('Delete this IPD admission record?')) {
      setIpdAdmissions(prev => prev.filter(r => r.id !== id));
    }
  };

  const getNextBedId = () => {
    const maxNum = bedAllocations.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `bed-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenBedModal = (record = null) => {
    if (record) {
      setBedForm({ ...record });
      setEditingBedId(record.id);
    } else {
      setBedForm({ ...bedForm, id: getNextBedId(), allocationDate: new Date().toISOString().split('T')[0] });
      setEditingBedId(null);
    }
    setIsBedModalOpen(true);
  };

  const handleSaveBed = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingBedId) {
      setBedAllocations(prev => prev.map(r => (r.id === editingBedId ? { ...bedForm, id: editingBedId } : r)));
    } else {
      setBedAllocations(prev => [...prev, { ...bedForm }]);
    }
    setIsBedModalOpen(false);
    setEditingBedId(null);
  };

  const handleDeleteBed = (id) => {
    if (window.confirm('Delete this bed allocation record?')) {
      setBedAllocations(prev => prev.filter(r => r.id !== id));
    }
  };

  const getTotalBillingAmount = () => billingRecords.reduce((s, r) => s + (r.amount || 0), 0);
  const getPaidBillingAmount = () => billingRecords.filter(r => r.status === 'Paid').reduce((s, r) => s + (r.amount || 0), 0);
  const getPendingBillingAmount = () => billingRecords.filter(r => r.status === 'Pending').reduce((s, r) => s + (r.amount || 0), 0);
  const totalClaimsAmount = tpaClaims.reduce((s, r) => s + (r.claimAmount || 0), 0);
  const pendingClaims = tpaClaims.filter(r => r.claimStatus === 'Pending').length;
  const completedCounselling = financialCounselling.filter(r => r.status === 'Completed').length;

  const getNextBillId = () => {
    const maxNum = billingRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `bill-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenBillingModal = (record = null) => {
    if (record) {
      setBillingForm({ ...record });
      setEditingBillingId(record.id);
    } else {
      setBillingForm({ ...billingForm, id: getNextBillId(), billId: `BILL-2025-${String(Date.now()).slice(-3)}`, billingDate: new Date().toISOString().split('T')[0] });
      setEditingBillingId(null);
    }
    setIsBillingModalOpen(true);
  };

  const handleSaveBilling = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!billingForm.patientName || !billingForm.uhid) {
      alert('Patient Name and UHID are required.');
      return;
    }
    if (editingBillingId) {
      setBillingRecords(prev => prev.map(r => (r.id === editingBillingId ? { ...billingForm, id: editingBillingId } : r)));
    } else {
      setBillingRecords(prev => [...prev, { ...billingForm }]);
    }
    setIsBillingModalOpen(false);
    setEditingBillingId(null);
  };

  const handleDeleteBilling = (id) => {
    if (window.confirm('Delete this billing record?')) {
      setBillingRecords(prev => prev.filter(r => r.id !== id));
    }
  };

  const getNextClaimId = () => {
    const maxNum = tpaClaims.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `claim-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenTpaModal = (record = null) => {
    if (record) {
      setTpaForm({ ...record });
      setEditingTpaId(record.id);
    } else {
      setTpaForm({ ...tpaForm, id: getNextClaimId(), claimId: `CLAIM-2025-${String(Date.now()).slice(-3)}`, submissionDate: new Date().toISOString().split('T')[0] });
      setEditingTpaId(null);
    }
    setIsTpaModalOpen(true);
  };

  const handleSaveTpa = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!tpaForm.patientName || !tpaForm.uhid) {
      alert('Patient Name and UHID are required.');
      return;
    }
    if (editingTpaId) {
      setTpaClaims(prev => prev.map(r => (r.id === editingTpaId ? { ...tpaForm, id: editingTpaId } : r)));
    } else {
      setTpaClaims(prev => [...prev, { ...tpaForm }]);
    }
    setIsTpaModalOpen(false);
    setEditingTpaId(null);
  };

  const handleDeleteTpa = (id) => {
    if (window.confirm('Delete this TPA claim record?')) {
      setTpaClaims(prev => prev.filter(r => r.id !== id));
    }
  };

  const getNextFcId = () => {
    const maxNum = financialCounselling.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `fc-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenFcModal = (record = null) => {
    if (record) {
      setFcForm({ ...record });
      setEditingFcId(record.id);
    } else {
      setFcForm({ ...fcForm, id: getNextFcId(), counsellingId: `FC-2025-${String(Date.now()).slice(-3)}`, date: new Date().toISOString().split('T')[0] });
      setEditingFcId(null);
    }
    setIsFcModalOpen(true);
  };

  const handleSaveFc = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!fcForm.patientName || !fcForm.uhid) {
      alert('Patient Name and UHID are required.');
      return;
    }
    if (editingFcId) {
      setFinancialCounselling(prev => prev.map(r => (r.id === editingFcId ? { ...fcForm, id: editingFcId } : r)));
    } else {
      setFinancialCounselling(prev => [...prev, { ...fcForm }]);
    }
    setIsFcModalOpen(false);
    setEditingFcId(null);
  };

  const handleDeleteFc = (id) => {
    if (window.confirm('Delete this financial counselling record?')) {
      setFinancialCounselling(prev => prev.filter(r => r.id !== id));
    }
  };

  const BILLING_TABS = ['billing', 'claims', 'counselling'];
  const [activeBillingTab, setActiveBillingTab] = useState('billing');

  const [initialAssessments, setInitialAssessments] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_INITIAL_ASSESSMENTS);
    return saved ? JSON.parse(saved) : INITIAL_ASSESSMENTS_SEED;
  });
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [editingAssessmentId, setEditingAssessmentId] = useState(null);
  const [assessmentForm, setAssessmentForm] = useState({ id: '', assessmentId: '', uhid: '', patientName: '', assessmentType: 'Initial', assessedBy: '', assessmentDate: '', priority: 'Medium', status: 'Completed', remarks: '' });
  const [assessmentSearch, setAssessmentSearch] = useState('');

  const [referrals, setReferrals] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_REFERRALS);
    return saved ? JSON.parse(saved) : REFERRALS_SEED;
  });
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [editingReferralId, setEditingReferralId] = useState(null);
  const [referralForm, setReferralForm] = useState({ id: '', referralId: '', uhid: '', patientName: '', referralType: 'Internal', referredTo: '', reason: '', transferDate: '', status: 'Pending', remarks: '' });
  const [referralSearch, setReferralSearch] = useState('');

  const [patientComplaints, setPatientComplaints] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_PATIENT_COMPLAINTS);
    return saved ? JSON.parse(saved) : PATIENT_COMPLAINTS_SEED;
  });
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [editingComplaintId, setEditingComplaintId] = useState(null);
  const [complaintForm, setComplaintForm] = useState({ id: '', complaintId: '', uhid: '', patientName: '', complaintCategory: 'Other', complaintDate: '', assignedTo: '', resolutionStatus: 'Pending', closedDate: '', remarks: '' });
  const [complaintSearch, setComplaintSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_INITIAL_ASSESSMENTS, JSON.stringify(initialAssessments));
  }, [initialAssessments]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_REFERRALS, JSON.stringify(referrals));
  }, [referrals]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_PATIENT_COMPLAINTS, JSON.stringify(patientComplaints));
  }, [patientComplaints]);

  const SERVICE_TABS = ['assessments', 'referrals', 'complaints'];
  const [activeServiceTab, setActiveServiceTab] = useState('assessments');

  const totalAssessments = initialAssessments.length;
  const completedAssessments = initialAssessments.filter(r => r.status === 'Completed').length;
  const totalReferrals = referrals.length;
  const pendingReferrals = referrals.filter(r => r.status === 'Pending').length;
  const totalComplaints = patientComplaints.length;
  const resolvedComplaints = patientComplaints.filter(r => r.resolutionStatus === 'Resolved').length;
  const patientSatisfactionPct = totalComplaints ? ((totalComplaints - resolvedComplaints) / totalComplaints * 100).toFixed(1) : 0;
  const serviceCompliancePct = initialAssessments.length ? ((initialAssessments.filter(r => r.status === 'Completed').length / initialAssessments.length) * 100).toFixed(1) : 0;

  const getNextAssessmentId = () => {
    const maxNum = initialAssessments.reduce((max, r) => {
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
      setAssessmentForm({ ...assessmentForm, id: getNextAssessmentId(), assessmentId: `ASSESS-2025-${String(Date.now()).slice(-3)}` });
      setEditingAssessmentId(null);
    }
    setIsAssessmentModalOpen(true);
  };

  const handleSaveAssessment = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!assessmentForm.patientName || !assessmentForm.uhid) {
      alert('Patient Name and UHID are required.');
      return;
    }
    if (editingAssessmentId) {
      setInitialAssessments(prev => prev.map(r => (r.id === editingAssessmentId ? { ...assessmentForm, id: editingAssessmentId } : r)));
    } else {
      setInitialAssessments(prev => [...prev, { ...assessmentForm }]);
    }
    setIsAssessmentModalOpen(false);
    setEditingAssessmentId(null);
  };

  const handleDeleteAssessment = (id) => {
    if (window.confirm('Delete this assessment record?')) {
      setInitialAssessments(prev => prev.filter(r => r.id !== id));
    }
  };

  const getNextReferralId = () => {
    const maxNum = referrals.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `ref-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenReferralModal = (record = null) => {
    if (record) {
      setReferralForm({ ...record });
      setEditingReferralId(record.id);
    } else {
      setReferralForm({ ...referralForm, id: getNextReferralId(), referralId: `REF-2025-${String(Date.now()).slice(-3)}` });
      setEditingReferralId(null);
    }
    setIsReferralModalOpen(true);
  };

  const handleSaveReferral = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!referralForm.patientName || !referralForm.uhid) {
      alert('Patient Name and UHID are required.');
      return;
    }
    if (editingReferralId) {
      setReferrals(prev => prev.map(r => (r.id === editingReferralId ? { ...referralForm, id: editingReferralId } : r)));
    } else {
      setReferrals(prev => [...prev, { ...referralForm }]);
    }
    setIsReferralModalOpen(false);
    setEditingReferralId(null);
  };

  const handleDeleteReferral = (id) => {
    if (window.confirm('Delete this referral record?')) {
      setReferrals(prev => prev.filter(r => r.id !== id));
    }
  };

  const getNextComplaintId = () => {
    const maxNum = patientComplaints.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `comp-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenComplaintModal = (record = null) => {
    if (record) {
      setComplaintForm({ ...record });
      setEditingComplaintId(record.id);
    } else {
      setComplaintForm({ ...complaintForm, id: getNextComplaintId(), complaintId: `COMP-2025-${String(Date.now()).slice(-3)}` });
      setEditingComplaintId(null);
    }
    setIsComplaintModalOpen(true);
  };

  const handleSaveComplaint = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!complaintForm.patientName || !complaintForm.uhid) {
      alert('Patient Name and UHID are required.');
      return;
    }
    if (editingComplaintId) {
      setPatientComplaints(prev => prev.map(r => (r.id === editingComplaintId ? { ...complaintForm, id: editingComplaintId } : r)));
    } else {
      setPatientComplaints(prev => [...prev, { ...complaintForm }]);
    }
    setIsComplaintModalOpen(false);
    setEditingComplaintId(null);
  };

  const handleDeleteComplaint = (id) => {
    if (window.confirm('Delete this complaint record?')) {
      setPatientComplaints(prev => prev.filter(r => r.id !== id));
    }
  };

  const [internalAudits, setInternalAudits] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_INTERNAL_AUDITS);
    return saved ? JSON.parse(saved) : [
      { id: 'iaudit-001', auditId: 'AUD-2025-001', auditDate: '2025-01-15', auditType: 'Routine', auditArea: 'Registration Desk', auditor: 'Alice Smith', compliancePercent: 95, findings: 'Minor documentation issues.', status: 'Completed', followupDate: '2025-02-15' },
      { id: 'iaudit-002', auditId: 'AUD-2025-002', auditDate: '2025-01-20', auditType: 'Surprise', auditArea: 'IPD Ward', auditor: 'Bob Johnson', compliancePercent: 88, findings: 'Bed allocation delays.', status: 'Action Required', followupDate: '2025-02-10' },
      { id: 'iaudit-003', auditId: 'AUD-2025-003', auditDate: '2025-02-01', auditType: 'NABH', auditArea: 'Billing', auditor: 'Dr. Lee', compliancePercent: 98, findings: 'Excellent compliance.', status: 'Completed', followupDate: '' },
      { id: 'iaudit-004', auditId: 'AUD-2025-004', auditDate: '2025-02-10', auditType: 'Routine', auditArea: 'OPD Registration', auditor: 'Carol Davis', compliancePercent: 92, findings: 'Form delays noted.', status: 'Completed', followupDate: '2025-03-10' },
      { id: 'iaudit-005', auditId: 'AUD-2025-005', auditDate: '2025-02-15', auditType: 'Internal', auditArea: 'Bed Management', auditor: 'David Wilson', compliancePercent: 85, findings: 'Tracking system update needed.', status: 'Pending', followupDate: '' },
    ];
  });
  const [isInternalAuditModalOpen, setIsInternalAuditModalOpen] = useState(false);
  const [editingInternalAuditId, setEditingInternalAuditId] = useState(null);
  const [internalAuditForm, setInternalAuditForm] = useState({ id: '', auditId: '', auditDate: '', auditType: 'Routine', auditArea: 'Registration Desk', auditor: '', compliancePercent: 100, findings: '', status: 'Completed', followupDate: '' });
  const [internalAuditSearch, setInternalAuditSearch] = useState('');

  const [capaRecords, setCapaRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_CAPA_RECORDS);
    return saved ? JSON.parse(saved) : [
      { id: 'icap-001', capaId: 'CAPA-2025-001', auditId: 'AUD-2025-002', observation: 'Bed allocation delays.', correctiveAction: 'Added buffer beds.', preventiveAction: 'Real-time tracking implemented.', responsiblePerson: 'Ward Supervisor', targetDate: '2025-03-10', completionDate: '2025-03-05', status: 'Closed' },
      { id: 'icap-002', capaId: 'CAPA-2025-002', auditId: 'AUD-2025-005', observation: 'Tracking system update needed.', correctiveAction: 'Procure new software.', preventiveAction: 'Monthly audits of system.', responsiblePerson: 'IT Manager', targetDate: '2025-03-30', completionDate: '', status: 'Open' },
      { id: 'icap-003', capaId: 'CAPA-2025-003', auditId: 'AUD-2025-001', observation: 'Documentation gaps.', correctiveAction: 'Re-trained staff.', preventiveAction: 'Weekly checks.', responsiblePerson: 'Quality Officer', targetDate: '2025-04-15', completionDate: '2025-04-10', status: 'Closed' },
      { id: 'icap-004', capaId: 'CAPA-2025-004', auditId: 'AUD-2025-004', observation: 'Form processing delays.', correctiveAction: 'Digital forms.', preventiveAction: 'Process optimization.', responsiblePerson: 'Admin Lead', targetDate: '2025-04-01', completionDate: '', status: 'Open' },
      { id: 'icap-005', capaId: 'CAPA-2025-005', auditId: 'AUD-2025-003', observation: 'Minor compliance issues.', correctiveAction: 'Updated protocols.', preventiveAction: 'Quarterly training.', responsiblePerson: 'Nurse Manager', targetDate: '2025-04-15', completionDate: '2025-04-12', status: 'Closed' },
    ];
  });
  const [isCapaModalOpen, setIsCapaModalOpen] = useState(false);
  const [editingCapaId, setEditingCapaId] = useState(null);
  const [capaForm, setCapaForm] = useState({ id: '', capaId: '', auditId: '', observation: '', correctiveAction: '', preventiveAction: '', responsiblePerson: '', targetDate: '', completionDate: '', status: 'Open' });
  const [capaSearch, setCapaSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_INTERNAL_AUDITS, JSON.stringify(internalAudits));
  }, [internalAudits]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_CAPA_RECORDS, JSON.stringify(capaRecords));
  }, [capaRecords]);

  const AUDIT_TYPES = ['Routine', 'Surprise', 'NABH', 'Internal', 'External'];
  const AUDIT_AREAS = ['Registration Desk', 'IPD Ward', 'Billing', 'Bed Management', 'Patient Services'];
  const CAPA_STATUSES = ['Open', 'Closed', 'In Progress'];

  const totalAudits = internalAudits.length;
  const completedAudits = internalAudits.filter(r => r.status === 'Completed').length;
  const pendingAudits = internalAudits.filter(r => r.status !== 'Completed').length;
  const avgAuditCompliance = internalAudits.length ? (internalAudits.reduce((s, r) => s + (r.compliancePercent || 0), 0) / internalAudits.length).toFixed(1) : 0;
  const openCapas = capaRecords.filter(r => r.status === 'Open').length;
  const closedCapas = capaRecords.filter(r => r.status === 'Closed').length;
  const followupCompliance = internalAudits.filter(r => r.followupDate).length ? (internalAudits.filter(r => r.followupDate && r.status === 'Completed').length / internalAudits.filter(r => r.followupDate).length * 100).toFixed(1) : 0;
  const overallAuditScore = ((parseFloat(avgAuditCompliance) + parseFloat(followupCompliance)) / 2).toFixed(1);

  const getNextInternalAuditId = () => {
    const maxNum = internalAudits.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `iaudit-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenInternalAuditModal = (record = null) => {
    if (record) {
      setInternalAuditForm({ ...record });
      setEditingInternalAuditId(record.id);
    } else {
      setInternalAuditForm({ ...internalAuditForm, id: getNextInternalAuditId(), auditId: `AUD-2025-${String(Date.now()).slice(-3)}` });
      setEditingInternalAuditId(null);
    }
    setIsInternalAuditModalOpen(true);
  };

  const handleSaveInternalAudit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!internalAuditForm.auditor || !internalAuditForm.auditArea) {
      alert('Auditor and Audit Area are required.');
      return;
    }
    if (editingInternalAuditId) {
      setInternalAudits(prev => prev.map(r => (r.id === editingInternalAuditId ? { ...internalAuditForm, id: editingInternalAuditId } : r)));
    } else {
      setInternalAudits(prev => [...prev, { ...internalAuditForm }]);
    }
    setIsInternalAuditModalOpen(false);
    setEditingInternalAuditId(null);
  };

  const handleDeleteInternalAudit = (id) => {
    if (window.confirm('Delete this internal audit record?')) {
      setInternalAudits(prev => prev.filter(r => r.id !== id));
    }
  };

  const getNextCapaId = () => {
    const maxNum = capaRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `icap-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenCapaModal = (record = null) => {
    if (record) {
      setCapaForm({ ...record });
      setEditingCapaId(record.id);
    } else {
      setCapaForm({ ...capaForm, id: getNextCapaId(), capaId: `CAPA-2025-${String(Date.now()).slice(-3)}` });
      setEditingCapaId(null);
    }
    setIsCapaModalOpen(true);
  };

  const handleSaveCapa = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!capaForm.observation || !capaForm.responsiblePerson) {
      alert('Observation and Responsible Person are required.');
      return;
    }
    if (editingCapaId) {
      setCapaRecords(prev => prev.map(r => (r.id === editingCapaId ? { ...capaForm, id: editingCapaId } : r)));
    } else {
      setCapaRecords(prev => [...prev, { ...capaForm }]);
    }
    setIsCapaModalOpen(false);
    setEditingCapaId(null);
  };

  const handleDeleteCapa = (id) => {
    if (window.confirm('Delete this CAPA record?')) {
      setCapaRecords(prev => prev.filter(r => r.id !== id));
    }
  };

  const getNextQualityId = () => {
    const maxNum = qualityIndicators.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `aq-${String(maxNum + 1).padStart(3, '0')}`;
  };

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
      setQualityIndicators(prev => prev.map(r => (r.id === editingQualityId ? { ...qualityForm, id: editingQualityId } : r)));
    } else {
      setQualityIndicators(prev => [...prev, { ...qualityForm }]);
    }
    setIsQualityModalOpen(false);
    setEditingQualityId(null);
  };

  const handleDeleteQuality = (id) => {
    if (window.confirm('Delete this quality indicator record?')) {
      setQualityIndicators(prev => prev.filter(r => r.id !== id));
    }
  };

  const totalIndicators = qualityIndicators.length;
  const achievedIndicators = qualityIndicators.filter(r => r.status === 'Achieved').length;
  const pendingIndicators = qualityIndicators.filter(r => r.status !== 'Achieved').length;
  const avgCompliance = totalIndicators ? (qualityIndicators.reduce((s, r) => s + (r.actual || 0), 0) / totalIndicators).toFixed(1) : 0;
  const registrationAccuracy = qualityIndicators.find(r => r.indicatorName === 'Registration Accuracy');
  const admissionCompletion = qualityIndicators.find(r => r.indicatorName === 'Admission Completion Time');
  const billingAccuracy = qualityIndicators.find(r => r.indicatorName === 'Billing Accuracy');
  const patientSatisfactionInd = qualityIndicators.find(r => r.indicatorName === 'Patient Satisfaction Score');

  const totalOpdRegistrations = dashboardData.reduce((s, r) => s + (r.opdRegistrations || 0), 0);
  const totalIpdAdmissions = dashboardData.reduce((s, r) => s + (r.ipdAdmissions || 0), 0);
  const todaysRegistrations = dashboardData.find(r => r.month === MONTHS[new Date().getMonth()])?.opdRegistrations || 0;
  const pendingAdmissions = dashboardData.reduce((s, r) => s + (r.pendingAdmissions || 0), 0);
  const billingCollection = dashboardData.reduce((s, r) => s + (r.billingCollection || 0), 0);
  const insuranceCases = dashboardData.reduce((s, r) => s + (r.insuranceCases || 0), 0);
  const avgRegistrationTime = dashboardData.length ? (dashboardData.reduce((s, r) => s + (r.avgRegistrationTime || 0), 0) / dashboardData.length).toFixed(1) : 0;
  const patientSatisfaction = dashboardData.length ? (dashboardData.reduce((s, r) => s + (r.patientSatisfaction || 0), 0) / dashboardData.length).toFixed(1) : 0;

  const registrationTrendData = dashboardData.map(r => ({
    month: r.month,
    registrations: r.opdRegistrations || 0,
    ipd: r.ipdAdmissions || 0,
  }));

  const opdIpdDistribution = [
    { name: 'OPD Registrations', value: totalOpdRegistrations, color: '#3b82f6' },
    { name: 'IPD Admissions', value: totalIpdAdmissions, color: '#10b981' },
  ];

  const dailyAdmissionsData = SAMPLE_DAILY_ADMISSIONS;

  const billingTrendData = [
    { month: 'Jan', collection: 125000, insurance: 35000, selfPay: 90000 },
    { month: 'Feb', collection: 118000, insurance: 32000, selfPay: 86000 },
    { month: 'Mar', collection: 132000, insurance: 38000, selfPay: 94000 },
    { month: 'Apr', collection: 128000, insurance: 36000, selfPay: 92000 },
    { month: 'May', collection: 138000, insurance: 42000, selfPay: 96000 },
  ];

  const insuranceSelfPayDistribution = [
    { name: 'Insurance', value: insuranceCases, color: '#8b5cf6' },
    { name: 'Self Pay', value: totalOpdRegistrations - insuranceCases, color: '#06b6d4' },
  ];

  const registrationTimeTrend = dashboardData.map(r => ({
    month: r.month,
    time: r.avgRegistrationTime || 0,
  }));

  const STATUS_BADGE = {
    Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  const STATUS_BADGE_QUALITY = {
    Achieved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    'Below Target': 'bg-rose-50 text-rose-700 border-rose-200',
  };

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

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-extrabold text-slate-800 mb-3">Admission & Registration Dashboard</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: 'Total OPD Registrations', value: totalOpdRegistrations, color: 'text-blue-600' },
                  { label: 'Total IPD Admissions', value: totalIpdAdmissions, color: 'text-emerald-600' },
                  { label: "Today's Registrations", value: todaysRegistrations, color: 'text-sky-600' },
                  { label: 'Pending Admissions', value: pendingAdmissions, color: 'text-amber-600' },
                  { label: 'Billing Collection', value: `$${billingCollection.toLocaleString()}`, color: 'text-violet-600' },
                  { label: 'Insurance Cases', value: insuranceCases, color: 'text-indigo-600' },
                  { label: 'Avg Registration Time', value: `${avgRegistrationTime} min`, color: 'text-rose-600' },
                  { label: 'Patient Satisfaction %', value: `${patientSatisfaction}%`, color: 'text-orange-600' },
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
                <h4 className="text-xs font-extrabold text-slate-800 mb-3">Monthly Registration Trend</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={registrationTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="registrations" stroke="#3b82f6" name="Registrations" />
                    <Line type="monotone" dataKey="ipd" stroke="#10b981" name="IPD Admissions" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-3">OPD vs IPD Distribution</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={opdIpdDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {opdIpdDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-3">Daily Admissions</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={dailyAdmissionsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="opd" fill="#3b82f6" name="OPD" />
                    <Bar dataKey="ipd" fill="#10b981" name="IPD" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-3">Billing Collection Trend</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={billingTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="collection" fill="#8b5cf6" name="Total Collection" />
                    <Bar dataKey="insurance" fill="#06b6d4" name="Insurance" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-3">Insurance vs Self Pay</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={insuranceSelfPayDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {insuranceSelfPayDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-3">Registration Time Trend</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={registrationTimeTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="time" stroke="#ef4444" name="Avg Time (min)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/50">
                <h4 className="text-xs font-extrabold text-slate-800">Recent Activity</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      {['Date', 'Patient', 'UHID', 'Registration Type', 'Status'].map((h) => (
                        <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentActivity.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-3 py-3 font-semibold text-slate-700">{r.date}</td>
                        <td className="px-3 py-3 text-slate-600">{r.patient}</td>
                        <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhid}</td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${r.registrationType === 'OPD' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                            {r.registrationType}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Completed}`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {recentActivity.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-3 py-10 text-center text-[10px] text-slate-400">
                          No recent activity records yet.
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

      case 'quality':
        const filteredQuality = qualityIndicators.filter((r) => {
          const q = qualitySearch.toLowerCase();
          return (
            r.indicatorName.toLowerCase().includes(q) ||
            r.category.toLowerCase().includes(q) ||
            r.status.toLowerCase().includes(q) ||
            (r.responsibleDepartment && r.responsibleDepartment.toLowerCase().includes(q))
          );
        });

const regAccuracy = registrationAccuracy?.actual || 0;
         const admCompletion = admissionCompletion?.actual || 0;
         const billAccuracy = billingAccuracy?.actual || 0;
         const patSatisfaction = patientSatisfactionInd?.actual || 0;

        const TH_COLS = ['ID', 'Indicator', 'Category', 'Target %', 'Actual %', 'Month', 'Responsible Dept', 'Status', 'Actions'];

        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold text-slate-800">Quality Indicators</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Admission & Registration quality metrics tracking</p>
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
                { label: 'Total Quality Indicators', value: totalIndicators, color: 'text-blue-600' },
                { label: 'Achieved Indicators', value: achievedIndicators, color: 'text-emerald-600' },
                { label: 'Pending Indicators', value: pendingIndicators, color: 'text-amber-600' },
                { label: 'Average Compliance %', value: `${avgCompliance}%`, color: 'text-sky-600' },
                { label: 'Registration Accuracy %', value: `${regAccuracy}%`, color: 'text-indigo-600' },
                { label: 'Admission Completion %', value: `${admCompletion}%`, color: 'text-purple-600' },
                { label: 'Billing Accuracy %', value: `${billAccuracy}%`, color: 'text-violet-600' },
                { label: 'Patient Satisfaction %', value: `${patSatisfaction}%`, color: 'text-orange-600' },
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
                    {filteredQuality.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                        <td className="px-3 py-3 font-semibold text-slate-700">{r.indicatorName}</td>
                        <td className="px-3 py-3 text-violet-600 font-bold">{r.category}</td>
                        <td className="px-3 py-3 text-slate-600">{r.target}%</td>
                        <td className="px-3 py-3 text-emerald-600 font-bold">{r.actual}%</td>
                        <td className="px-3 py-3 text-slate-600">{r.month} {r.year}</td>
                        <td className="px-3 py-3 text-slate-600">{r.responsibleDepartment || '-'}</td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_QUALITY[r.status] || STATUS_BADGE_QUALITY.Achieved}`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenQualityModal(r)}
                              className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                              title="Edit"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteQuality(r.id)}
                              className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredQuality.length === 0 && (
                      <tr>
                        <td colSpan={TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">
                          {qualitySearch ? 'No records match your search.' : 'No quality indicator records yet.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                <span className="text-[9px] text-slate-400 font-medium">
                  Showing {filteredQuality.length} of {qualityIndicators.length} record{qualityIndicators.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        );

      case 'registration':
        const filteredOpd = opdRegistrations.filter((r) => {
          const q = opdSearch.toLowerCase();
          return (
            r.patientName.toLowerCase().includes(q) ||
            r.uhid.toLowerCase().includes(q) ||
            r.registrationNo.toLowerCase().includes(q) ||
            r.doctorName.toLowerCase().includes(q)
          );
        });

        const filteredIpd = ipdAdmissions.filter((r) => {
          const q = ipdSearch.toLowerCase();
          return (
            r.patientName.toLowerCase().includes(q) ||
            r.uhid.toLowerCase().includes(q) ||
            r.admissionNo.toLowerCase().includes(q) ||
            r.diagnosis.toLowerCase().includes(q)
          );
        });

        const filteredBed = bedAllocations.filter((r) => {
          const q = bedSearch.toLowerCase();
          return (
            r.bedNo.toLowerCase().includes(q) ||
            r.patientName.toLowerCase().includes(q) ||
            r.ward.toLowerCase().includes(q) ||
            r.status.toLowerCase().includes(q)
          );
        });

        const STATUS_BADGE_BED = {
          Available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          Occupied: 'bg-rose-50 text-rose-700 border-rose-200',
          Reserved: 'bg-amber-50 text-amber-700 border-amber-200',
          Maintenance: 'bg-slate-50 text-slate-700 border-slate-200',
        };

        const OPD_TH_COLS = ['Reg No', 'Patient', 'UHID', 'Type', 'Doctor', 'Department', 'Date', 'Time', 'Status', 'Actions'];
        const IPD_TH_COLS = ['Admission No', 'Patient', 'UHID', 'Type', 'Source', 'Ward', 'Doctor', 'Diagnosis', 'Status', 'Actions'];
        const BED_TH_COLS = ['Bed No', 'Ward', 'Patient', 'UHID', 'Admission No', 'Allocation Date', 'Status', 'Actions'];

        const RegistrationTabContent = () => (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold text-slate-800">Registration & Admission</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Patient registration, admission, and bed allocation management</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Total OPD Registrations', value: totalOpdRegCount, color: 'text-blue-600' },
                { label: 'Total IPD Admissions', value: totalIpdCount, color: 'text-emerald-600' },
                { label: 'Bed Occupancy %', value: `${totalBeds ? (bedOccupied / totalBeds * 100).toFixed(1) : 0}%`, color: 'text-sky-600' },
                { label: 'Available Beds', value: availableBeds, color: 'text-violet-600' },
                { label: 'Pending Admissions', value: pendingAdmissionsCount, color: 'text-amber-600' },
                { label: 'Average Registration Time', value: `${avgRegTime.toFixed(1)} hrs`, color: 'text-rose-600' },
                { label: 'Admission Completion %', value: `${admissionCompletionPct}%`, color: 'text-indigo-600' },
                { label: 'Bed Allocation Accuracy %', value: `${bedAccuracy}%`, color: 'text-orange-600' },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                  <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 border-b border-slate-200 pb-2 mb-3">
              {REGISTRATION_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveRegistrationTab(tab)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${activeRegistrationTab === tab ? 'text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                  style={activeRegistrationTab === tab ? { backgroundColor: hospital.themeColor } : {}}
                >
                  {tab === 'opd' ? 'OPD Registration' : tab === 'ipd' ? 'IPD Admission' : 'Bed Allocation'}
                </button>
              ))}
            </div>

            {activeRegistrationTab === 'opd' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-800">OPD Registrations</h4>
                  <button
                    onClick={() => handleOpenOpdModal()}
                    style={{ backgroundColor: hospital.themeColor }}
                    className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Registration
                  </button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search OPD registrations..."
                    value={opdSearch}
                    onChange={(e) => setOpdSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  />
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          {OPD_TH_COLS.map((h) => (
                            <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredOpd.map((r) => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.registrationNo}</td>
                            <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhid}</td>
                            <td className="px-3 py-3 text-slate-600">{r.registrationType}</td>
                            <td className="px-3 py-3 text-slate-600">{r.doctorName}</td>
                            <td className="px-3 py-3 text-slate-600">{r.department}</td>
                            <td className="px-3 py-3 text-slate-600">{r.registrationDate}</td>
                            <td className="px-3 py-3 text-slate-600">{r.registrationTime}</td>
                            <td className="px-3 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Completed}`}>{r.status}</span>
                            </td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleOpenOpdModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                                <button onClick={() => handleDeleteOpd(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredOpd.length === 0 && (
                          <tr><td colSpan={OPD_TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{opdSearch ? 'No records match your search.' : 'No OPD registration records yet.'}</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeRegistrationTab === 'ipd' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-800">IPD Admissions</h4>
                  <button
                    onClick={() => handleOpenIpdModal()}
                    style={{ backgroundColor: hospital.themeColor }}
                    className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Admission
                  </button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search IPD admissions..."
                    value={ipdSearch}
                    onChange={(e) => setIpdSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  />
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          {IPD_TH_COLS.map((h) => (
                            <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredIpd.map((r) => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.admissionNo}</td>
                            <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhid}</td>
                            <td className="px-3 py-3 text-slate-600">{r.admissionType}</td>
                            <td className="px-3 py-3 text-slate-600">{r.source}</td>
                            <td className="px-3 py-3 text-slate-600">{r.bedRequired}</td>
                            <td className="px-3 py-3 text-slate-600">{r.admittingDoctor}</td>
                            <td className="px-3 py-3 text-slate-600 max-w-[150px] truncate">{r.diagnosis}</td>
                            <td className="px-3 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Completed}`}>{r.status}</span>
                            </td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleOpenIpdModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                                <button onClick={() => handleDeleteIpd(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredIpd.length === 0 && (
                          <tr><td colSpan={IPD_TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{ipdSearch ? 'No records match your search.' : 'No IPD admission records yet.'}</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeRegistrationTab === 'beds' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-800">Bed Allocations</h4>
                  <button
                    onClick={() => handleOpenBedModal()}
                    style={{ backgroundColor: hospital.themeColor }}
                    className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Allocate Bed
                  </button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search bed allocations..."
                    value={bedSearch}
                    onChange={(e) => setBedSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  />
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          {BED_TH_COLS.map((h) => (
                            <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredBed.map((r) => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.bedNo}</td>
                            <td className="px-3 py-3 font-semibold text-slate-700">{r.ward}</td>
                            <td className="px-3 py-3 text-slate-600">{r.patientName || '-'}</td>
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhid || '-'}</td>
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.admissionNo || '-'}</td>
                            <td className="px-3 py-3 text-slate-600">{r.allocationDate || '-'}</td>
                            <td className="px-3 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_BED[r.status] || STATUS_BADGE_BED.Available}`}>{r.status}</span>
                            </td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleOpenBedModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                                <button onClick={() => handleDeleteBed(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredBed.length === 0 && (
                          <tr><td colSpan={BED_TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{bedSearch ? 'No records match your search.' : 'No bed allocation records yet.'}</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
</div>
            )}

          </div>
        );
        return RegistrationTabContent();

      case 'billing':
        const filteredBilling = billingRecords.filter((r) => {
          const q = billingSearch.toLowerCase();
          return (
            r.billId.toLowerCase().includes(q) ||
            r.patientName.toLowerCase().includes(q) ||
            r.uhid.toLowerCase().includes(q) ||
            r.billType.toLowerCase().includes(q) ||
            r.status.toLowerCase().includes(q)
          );
        });

        const filteredTpa = tpaClaims.filter((r) => {
          const q = tpaSearch.toLowerCase();
          return (
            r.claimId.toLowerCase().includes(q) ||
            r.patientName.toLowerCase().includes(q) ||
            r.uhid.toLowerCase().includes(q) ||
            r.insuranceCompany.toLowerCase().includes(q) ||
            r.claimStatus.toLowerCase().includes(q)
          );
        });

        const filteredFc = financialCounselling.filter((r) => {
          const q = fcSearch.toLowerCase();
          return (
            r.counsellingId.toLowerCase().includes(q) ||
            r.patientName.toLowerCase().includes(q) ||
            r.uhid.toLowerCase().includes(q) ||
            r.counsellingType.toLowerCase().includes(q) ||
            r.status.toLowerCase().includes(q)
          );
        });

        const STATUS_BADGE_BILLING = {
          Paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          Pending: 'bg-amber-50 text-amber-700 border-amber-200',
        };

        const STATUS_BADGE_CLAIM = {
          Approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          Pending: 'bg-amber-50 text-amber-700 border-amber-200',
          Partial: 'bg-sky-50 text-sky-700 border-sky-200',
          Rejected: 'bg-rose-50 text-rose-700 border-rose-200',
        };

        const BILLING_TH_COLS = ['Bill ID', 'Patient', 'UHID', 'Type', 'Amount', 'Payment Mode', 'Status', 'Date', 'Actions'];
        const CLAIMS_TH_COLS = ['Claim ID', 'Patient', 'UHID', 'Insurance', 'Claim Amount', 'Approved Amount', 'Status', 'Date', 'Actions'];
        const FC_TH_COLS = ['Counselling ID', 'Patient', 'UHID', 'Type', 'Est. Cost', 'Counsellor', 'Status', 'Date', 'Actions'];

        const BillingTabContent = () => (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold text-slate-800">Billing & Insurance</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Patient billing, insurance claims, and financial counselling</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Total Billing Amount', value: `$${getTotalBillingAmount().toLocaleString()}`, color: 'text-blue-600' },
                { label: 'Paid Amount', value: `$${getPaidBillingAmount().toLocaleString()}`, color: 'text-emerald-600' },
                { label: 'Pending Billing', value: `$${getPendingBillingAmount().toLocaleString()}`, color: 'text-amber-600' },
                { label: 'Total Claims', value: `$${totalClaimsAmount.toLocaleString()}`, color: 'text-violet-600' },
                { label: 'Pending Claims', value: pendingClaims, color: 'text-rose-600' },
                { label: 'Completed Counselling', value: completedCounselling, color: 'text-sky-600' },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                  <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 border-b border-slate-200 pb-2 mb-3">
              {BILLING_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveBillingTab(tab)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${activeBillingTab === tab ? 'text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                  style={activeBillingTab === tab ? { backgroundColor: hospital.themeColor } : {}}
                >
                  {tab === 'billing' ? 'Billing Records' : tab === 'claims' ? 'Insurance Claims' : 'Financial Counselling'}
                </button>
              ))}
            </div>

            {activeBillingTab === 'billing' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-800">Billing Records</h4>
                  <button
                    onClick={() => handleOpenBillingModal()}
                    style={{ backgroundColor: hospital.themeColor }}
                    className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Billing
                  </button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search billing records..."
                    value={billingSearch}
                    onChange={(e) => setBillingSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  />
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          {BILLING_TH_COLS.map((h) => (
                            <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredBilling.map((r) => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.billId}</td>
                            <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhid}</td>
                            <td className="px-3 py-3 text-slate-600">{r.billType}</td>
                            <td className="px-3 py-3 text-slate-600">${(r.amount || 0).toLocaleString()}</td>
                            <td className="px-3 py-3 text-slate-600">{r.paymentMode}</td>
                            <td className="px-3 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_BILLING[r.status] || STATUS_BADGE_BILLING.Pending}`}>{r.status}</span>
                            </td>
                            <td className="px-3 py-3 text-slate-600">{r.billingDate}</td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleOpenBillingModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                                <button onClick={() => handleDeleteBilling(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredBilling.length === 0 && (
                          <tr><td colSpan={BILLING_TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{billingSearch ? 'No records match your search.' : 'No billing records yet.'}</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeBillingTab === 'claims' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-800">Insurance Claims</h4>
                  <button
                    onClick={() => handleOpenTpaModal()}
                    style={{ backgroundColor: hospital.themeColor }}
                    className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Claim
                  </button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search claims..."
                    value={tpaSearch}
                    onChange={(e) => setTpaSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  />
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          {CLAIMS_TH_COLS.map((h) => (
                            <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredTpa.map((r) => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.claimId}</td>
                            <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhid}</td>
                            <td className="px-3 py-3 text-slate-600">{r.insuranceCompany}</td>
                            <td className="px-3 py-3 text-slate-600">${(r.claimAmount || 0).toLocaleString()}</td>
                            <td className="px-3 py-3 text-slate-600">${(r.approvedAmount || 0).toLocaleString()}</td>
                            <td className="px-3 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_CLAIM[r.claimStatus] || STATUS_BADGE_CLAIM.Pending}`}>{r.claimStatus}</span>
                            </td>
                            <td className="px-3 py-3 text-slate-600">{r.submissionDate}</td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleOpenTpaModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                                <button onClick={() => handleDeleteTpa(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredTpa.length === 0 && (
                          <tr><td colSpan={CLAIMS_TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{tpaSearch ? 'No records match your search.' : 'No claims records yet.'}</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeBillingTab === 'counselling' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-800">Financial Counselling</h4>
                  <button
                    onClick={() => handleOpenFcModal()}
                    style={{ backgroundColor: hospital.themeColor }}
                    className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Counselling
                  </button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search counselling records..."
                    value={fcSearch}
                    onChange={(e) => setFcSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  />
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          {FC_TH_COLS.map((h) => (
                            <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredFc.map((r) => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.counsellingId}</td>
                            <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhid}</td>
                            <td className="px-3 py-3 text-slate-600">{r.counsellingType}</td>
                            <td className="px-3 py-3 text-slate-600">${(r.estimatedCost || 0).toLocaleString()}</td>
                            <td className="px-3 py-3 text-slate-600">{r.counsellor}</td>
                            <td className="px-3 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Pending}`}>{r.status}</span>
                            </td>
                            <td className="px-3 py-3 text-slate-600">{r.date}</td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleOpenFcModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                                <button onClick={() => handleDeleteFc(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredFc.length === 0 && (
                          <tr><td colSpan={FC_TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{fcSearch ? 'No records match your search.' : 'No financial counselling records yet.'}</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

          </div>
        );
        return BillingTabContent();

      case 'services':
        const filteredAssessments = initialAssessments.filter((r) => {
          const q = assessmentSearch.toLowerCase();
          return (
            r.assessmentId.toLowerCase().includes(q) ||
            r.patientName.toLowerCase().includes(q) ||
            r.uhid.toLowerCase().includes(q) ||
            r.assessmentType.toLowerCase().includes(q) ||
            r.status.toLowerCase().includes(q)
          );
        });

        const filteredReferrals = referrals.filter((r) => {
          const q = referralSearch.toLowerCase();
          return (
            r.referralId.toLowerCase().includes(q) ||
            r.patientName.toLowerCase().includes(q) ||
            r.uhid.toLowerCase().includes(q) ||
            r.referralType.toLowerCase().includes(q) ||
            r.status.toLowerCase().includes(q)
          );
        });

        const filteredComplaints = patientComplaints.filter((r) => {
          const q = complaintSearch.toLowerCase();
          return (
            r.complaintId.toLowerCase().includes(q) ||
            r.patientName.toLowerCase().includes(q) ||
            r.uhid.toLowerCase().includes(q) ||
            r.complaintCategory.toLowerCase().includes(q) ||
            r.resolutionStatus.toLowerCase().includes(q)
          );
        });

        const ASSESSMENT_TH_COLS = ['Assessment ID', 'Patient', 'UHID', 'Type', 'Assessed By', 'Date', 'Priority', 'Status', 'Actions'];
        const REFERRAL_TH_COLS = ['Referral ID', 'Patient', 'UHID', 'Type', 'Referred To', 'Reason', 'Date', 'Status', 'Actions'];
        const COMPLAINT_TH_COLS = ['Complaint ID', 'Patient', 'UHID', 'Category', 'Date', 'Assigned To', 'Status', 'Closed Date', 'Actions'];

        const ServicesTabContent = () => (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold text-slate-800">Patient Services</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Initial assessments, referrals, and patient complaints management</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Total Initial Assessments', value: totalAssessments, color: 'text-blue-600' },
                { label: 'Completed Assessments', value: completedAssessments, color: 'text-emerald-600' },
                { label: 'Total Referrals', value: totalReferrals, color: 'text-sky-600' },
                { label: 'Pending Referrals', value: pendingReferrals, color: 'text-amber-600' },
                { label: 'Total Complaints', value: totalComplaints, color: 'text-violet-600' },
                { label: 'Resolved Complaints', value: resolvedComplaints, color: 'text-rose-600' },
                { label: 'Patient Satisfaction %', value: `${(100 - parseFloat(patientSatisfactionPct)).toFixed(1)}%`, color: 'text-indigo-600' },
                { label: 'Service Compliance %', value: `${serviceCompliancePct}%`, color: 'text-orange-600' },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                  <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 border-b border-slate-200 pb-2 mb-3">
              {SERVICE_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveServiceTab(tab)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${activeServiceTab === tab ? 'text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                  style={activeServiceTab === tab ? { backgroundColor: hospital.themeColor } : {}}
                >
                  {tab === 'assessments' ? 'Initial Assessments' : tab === 'referrals' ? 'Referrals' : 'Complaints'}
                </button>
              ))}
            </div>

            {activeServiceTab === 'assessments' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-800">Initial Assessments</h4>
                  <button
                    onClick={() => handleOpenAssessmentModal()}
                    style={{ backgroundColor: hospital.themeColor }}
                    className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Assessment
                  </button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search assessments..."
                    value={assessmentSearch}
                    onChange={(e) => setAssessmentSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  />
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          {ASSESSMENT_TH_COLS.map((h) => (
                            <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredAssessments.map((r) => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.assessmentId}</td>
                            <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhid}</td>
                            <td className="px-3 py-3 text-slate-600">{r.assessmentType}</td>
                            <td className="px-3 py-3 text-slate-600">{r.assessedBy}</td>
                            <td className="px-3 py-3 text-slate-600">{r.assessmentDate}</td>
                            <td className="px-3 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${r.priority === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200' : r.priority === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>{r.priority}</span>
                            </td>
                            <td className="px-3 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Pending}`}>{r.status}</span>
                            </td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleOpenAssessmentModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                                <button onClick={() => handleDeleteAssessment(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredAssessments.length === 0 && (
                          <tr><td colSpan={ASSESSMENT_TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{assessmentSearch ? 'No records match your search.' : 'No assessment records yet.'}</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeServiceTab === 'referrals' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-800">Referral Registry</h4>
                  <button
                    onClick={() => handleOpenReferralModal()}
                    style={{ backgroundColor: hospital.themeColor }}
                    className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Referral
                  </button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search referrals..."
                    value={referralSearch}
                    onChange={(e) => setReferralSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  />
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          {REFERRAL_TH_COLS.map((h) => (
                            <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredReferrals.map((r) => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.referralId}</td>
                            <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhid}</td>
                            <td className="px-3 py-3 text-slate-600">{r.referralType}</td>
                            <td className="px-3 py-3 text-slate-600">{r.referredTo}</td>
                            <td className="px-3 py-3 text-slate-600 max-w-[150px] truncate">{r.reason}</td>
                            <td className="px-3 py-3 text-slate-600">{r.transferDate}</td>
                            <td className="px-3 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Pending}`}>{r.status}</span>
                            </td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleOpenReferralModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                                <button onClick={() => handleDeleteReferral(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredReferrals.length === 0 && (
                          <tr><td colSpan={REFERRAL_TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{referralSearch ? 'No records match your search.' : 'No referral records yet.'}</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeServiceTab === 'complaints' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-800">Patient Complaints & Grievances</h4>
                  <button
                    onClick={() => handleOpenComplaintModal()}
                    style={{ backgroundColor: hospital.themeColor }}
                    className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Complaint
                  </button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search complaints..."
                    value={complaintSearch}
                    onChange={(e) => setComplaintSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  />
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          {COMPLAINT_TH_COLS.map((h) => (
                            <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredComplaints.map((r) => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.complaintId}</td>
                            <td className="px-3 py-3 font-semibold text-slate-700">{r.patientName}</td>
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.uhid}</td>
                            <td className="px-3 py-3 text-slate-600">{r.complaintCategory}</td>
                            <td className="px-3 py-3 text-slate-600">{r.complaintDate}</td>
                            <td className="px-3 py-3 text-slate-600">{r.assignedTo}</td>
                            <td className="px-3 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.resolutionStatus] || STATUS_BADGE.Pending}`}>{r.resolutionStatus}</span>
                            </td>
                            <td className="px-3 py-3 text-slate-600">{r.closedDate || '-'}</td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleOpenComplaintModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                                <button onClick={() => handleDeleteComplaint(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredComplaints.length === 0 && (
                          <tr><td colSpan={COMPLAINT_TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{complaintSearch ? 'No records match your search.' : 'No complaint records yet.'}</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

          </div>
        );
        return ServicesTabContent();

      case 'audit':
        const filteredInternalAudits = internalAudits.filter((r) => {
          const q = internalAuditSearch.toLowerCase();
          return (
            r.auditId.toLowerCase().includes(q) ||
            r.auditArea.toLowerCase().includes(q) ||
            r.auditor.toLowerCase().includes(q) ||
            r.status.toLowerCase().includes(q)
          );
        });

        const filteredCapas = capaRecords.filter((r) => {
          const q = capaSearch.toLowerCase();
          return (
            r.capaId.toLowerCase().includes(q) ||
            r.auditId.toLowerCase().includes(q) ||
            r.observation.toLowerCase().includes(q) ||
            r.responsiblePerson.toLowerCase().includes(q) ||
            r.status.toLowerCase().includes(q)
          );
        });

        const AUDIT_TH_COLS = ['Audit ID', 'Date', 'Type', 'Area', 'Auditor', 'Compliance %', 'Findings', 'Status', 'Follow-up Date', 'Actions'];
        const CAPA_TH_COLS = ['CAPA ID', 'Audit ID', 'Observation', 'Corrective Action', 'Responsible Person', 'Target Date', 'Completion Date', 'Status', 'Actions'];

        const AuditTabContent = () => (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold text-slate-800">Internal Audit</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Audit and CAPA tracking for admission processes</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Total Audits', value: totalAudits, color: 'text-blue-600' },
                { label: 'Completed Audits', value: completedAudits, color: 'text-emerald-600' },
                { label: 'Pending Audits', value: pendingAudits, color: 'text-amber-600' },
                { label: 'Avg Audit Compliance %', value: `${avgAuditCompliance}%`, color: 'text-sky-600' },
                { label: 'Open CAPAs', value: openCapas, color: 'text-rose-600' },
                { label: 'Closed CAPAs', value: closedCapas, color: 'text-violet-600' },
                { label: 'Follow-up Compliance %', value: `${followupCompliance}%`, color: 'text-indigo-600' },
                { label: 'Overall Audit Score', value: `${overallAuditScore}%`, color: 'text-orange-600' },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                  <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 border-b border-slate-200 pb-2 mb-3">
              <button
                onClick={() => setActiveTab('audit')}
                className="px-4 py-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer text-white"
                style={{ backgroundColor: hospital.themeColor }}
              >
                Audits
              </button>
              <button
                onClick={() => setActiveTab('capa')}
                className="px-4 py-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer text-slate-600 hover:bg-slate-100"
              >
                CAPA Tracker
              </button>
            </div>

            <div>
              <h4 className="text-xs font-extrabold text-slate-800 mb-3">Internal Audits</h4>
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => handleOpenInternalAuditModal()}
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Audit
                </button>

                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search audits..."
                    value={internalAuditSearch}
                    onChange={(e) => setInternalAuditSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {AUDIT_TH_COLS.map((h) => (
                          <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredInternalAudits.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.auditId}</td>
                          <td className="px-3 py-3 text-slate-600">{r.auditDate}</td>
                          <td className="px-3 py-3 text-slate-600">{r.auditType}</td>
                          <td className="px-3 py-3 text-slate-600">{r.auditArea}</td>
                          <td className="px-3 py-3 text-slate-600">{r.auditor}</td>
                          <td className="px-3 py-3 text-slate-600">{r.compliancePercent}%</td>
                          <td className="px-3 py-3 text-slate-600 max-w-[150px] truncate" title={r.findings}>{r.findings}</td>
                          <td className="px-3 py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Pending}`}>{r.status}</span>
                          </td>
                          <td className="px-3 py-3 text-slate-600">{r.followupDate || '-'}</td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenInternalAuditModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeleteInternalAudit(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredInternalAudits.length === 0 && (
                        <tr><td colSpan={AUDIT_TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{internalAuditSearch ? 'No records match your search.' : 'No audit records yet.'}</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
        return AuditTabContent();

      case 'capa':
        const CapaTabContent = () => (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold text-slate-800">CAPA Tracker</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Corrective and Preventive Action tracking</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Total Audits', value: totalAudits, color: 'text-blue-600' },
                { label: 'Completed Audits', value: completedAudits, color: 'text-emerald-600' },
                { label: 'Pending Audits', value: pendingAudits, color: 'text-amber-600' },
                { label: 'Avg Audit Compliance %', value: `${avgAuditCompliance}%`, color: 'text-sky-600' },
                { label: 'Open CAPAs', value: openCapas, color: 'text-rose-600' },
                { label: 'Closed CAPAs', value: closedCapas, color: 'text-violet-600' },
                { label: 'Follow-up Compliance %', value: `${followupCompliance}%`, color: 'text-indigo-600' },
                { label: 'Overall Audit Score', value: `${overallAuditScore}%`, color: 'text-orange-600' },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                  <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 border-b border-slate-200 pb-2 mb-3">
              <button
                onClick={() => setActiveTab('audit')}
                className="px-4 py-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer text-slate-600 hover:bg-slate-100"
              >
                Audits
              </button>
              <button
                onClick={() => setActiveTab('capa')}
                className="px-4 py-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer text-white"
                style={{ backgroundColor: hospital.themeColor }}
              >
                CAPA Tracker
              </button>
            </div>

            <div>
              <h4 className="text-xs font-extrabold text-slate-800 mb-3">CAPA Records</h4>
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => handleOpenCapaModal()}
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add CAPA
                </button>

                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search CAPA..."
                    value={capaSearch}
                    onChange={(e) => setCapaSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {CAPA_TH_COLS.map((h) => (
                          <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCapas.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.capaId}</td>
                          <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.auditId}</td>
                          <td className="px-3 py-3 text-slate-600 max-w-[150px] truncate" title={r.observation}>{r.observation}</td>
                          <td className="px-3 py-3 text-slate-600 max-w-[150px] truncate" title={r.correctiveAction}>{r.correctiveAction}</td>
                          <td className="px-3 py-3 text-slate-600">{r.responsiblePerson}</td>
                          <td className="px-3 py-3 text-slate-600">{r.targetDate}</td>
                          <td className="px-3 py-3 text-slate-600">{r.completionDate || '-'}</td>
                          <td className="px-3 py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_QUALITY[r.status] || STATUS_BADGE_QUALITY.Achieved}`}>{r.status}</span>
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenCapaModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeleteCapa(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredCapas.length === 0 && (
                        <tr><td colSpan={CAPA_TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">{capaSearch ? 'No records match your search.' : 'No CAPA records yet.'}</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
        return CapaTabContent();

      case 'reports':
        const regTrend = dashboardData.map(r => ({
          month: r.month || '',
          registrations: r.opdRegistrations || 0,
          admissions: r.ipdAdmissions || 0,
        }));

        const opdVipdDist = [
          { name: 'OPD Registrations', value: totalOpdRegistrations, color: '#3b82f6' },
          { name: 'IPD Admissions', value: dashboardData.reduce((s, r) => s + (r.ipdAdmissions || 0), 0), color: '#10b981' },
        ];

        const billingTrend = [
          { month: 'Jan', collection: 125000, claims: 35000, paid: 90000 },
          { month: 'Feb', collection: 118000, claims: 32000, paid: 86000 },
          { month: 'Mar', collection: 132000, claims: 38000, paid: 94000 },
        ];

        const claimStatusDist = [
          { name: 'Approved', value: tpaClaims.filter(r => r.claimStatus === 'Approved').length, color: '#10b981' },
          { name: 'Pending', value: tpaClaims.filter(r => r.claimStatus === 'Pending').length, color: '#f59e0b' },
          { name: 'Rejected', value: tpaClaims.filter(r => r.claimStatus === 'Rejected').length, color: '#ef4444' },
        ];

        const serviceTrend = initialAssessments.map((r, i) => ({
          month: `Record ${i + 1}`,
          completed: initialAssessments.slice(0, i + 1).filter(a => a.status === 'Completed').length,
        }));

        const auditTrend = internalAudits.map((r, i) => ({
          month: `Audit ${i + 1}`,
          compliance: r.compliancePercent || 0,
        }));

        const totalRegistrations = totalOpdRegistrations + dashboardData.reduce((s, r) => s + (r.ipdAdmissions || 0), 0);
        const billingCollectionPercent = dashboardData.reduce((s, r) => s + (r.billingCollection || 0), 0) / totalRegistrations || 0;
        const insuranceClaimSuccess = tpaClaims.length ? (tpaClaims.filter(r => r.claimStatus === 'Approved').reduce((s, r) => s + (r.claimAmount || 0), 0) / totalClaimsAmount * 100).toFixed(1) : 0;
        const serviceCompliancePercent = initialAssessments.length ? (completedAssessments / initialAssessments.length * 100).toFixed(1) : 0;
        const auditCompliancePercent = avgAuditCompliance;
        const overallPerformance = ((parseFloat(serviceCompliancePercent) + parseFloat(auditCompliancePercent)) / 2).toFixed(1);

        const monthlySummary = dashboardData.map(r => ({
          month: r.month,
          registrations: r.opdRegistrations || 0,
          admissions: r.ipdAdmissions || 0,
          billing: r.billingCollection || 0,
          claims: r.insuranceCases || 0,
          audit: r.avgRegistrationTime || 0,
          performance: r.patientSatisfaction || 0,
        }));

        const ReportsTabContent = () => (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold text-slate-800">Reports & Analytics</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Comprehensive admission department reporting</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Export CSV</button>
                <button className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Export PDF</button>
                <button className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Print</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Total Registrations', value: totalRegistrations, color: 'text-blue-600' },
                { label: 'Total Admissions', value: dashboardData.reduce((s, r) => s + (r.ipdAdmissions || 0), 0), color: 'text-emerald-600' },
                { label: 'Billing Collection %', value: `${parseFloat(billingCollectionPercent).toFixed(1)}%`, color: 'text-sky-600' },
                { label: 'Insurance Claim Success %', value: `${insuranceClaimSuccess}%`, color: 'text-violet-600' },
                { label: 'Patient Service Compliance %', value: `${serviceCompliancePercent}%`, color: 'text-rose-600' },
                { label: 'Internal Audit Compliance %', value: `${auditCompliancePercent}%`, color: 'text-indigo-600' },
                { label: 'Open CAPAs', value: openCapas, color: 'text-amber-600' },
                { label: 'Overall Performance %', value: `${overallPerformance}%`, color: 'text-orange-600' },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                  <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-4">Monthly Registration Trend</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={regTrend}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="registrations" stroke={hospital.themeColor} strokeWidth={3} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="admissions" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-4">OPD vs IPD Distribution</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={opdVipdDist} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {opdVipdDist.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-4">Billing Collection Trend</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={billingTrend}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <Tooltip />
                      <Bar dataKey="collection" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="claims" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-4">Insurance Claims Status</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={claimStatusDist} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {claimStatusDist.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-4">Patient Services Compliance</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={serviceTrend}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <Tooltip />
                      <Bar dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-4">Internal Audit Compliance Trend</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={auditTrend}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="compliance" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <h4 className="text-xs font-extrabold text-slate-800 p-4 border-b border-slate-200">Monthly Summary</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      {['Month', 'Registrations', 'Admissions', 'Billing Collection', 'Claims Approved', 'Audit Compliance %', 'Overall Performance %'].map((h) => (
                        <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {monthlySummary.map((r) => (
                      <tr key={r.month} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-3 py-3 font-semibold text-slate-700">{r.month}</td>
                        <td className="px-3 py-3 text-blue-600 font-bold">{r.registrations}</td>
                        <td className="px-3 py-3 text-emerald-600 font-bold">{r.admissions}</td>
                        <td className="px-3 py-3 text-violet-600 font-bold">${r.billing.toLocaleString()}</td>
                        <td className="px-3 py-3 text-cyan-600 font-bold">{r.claims}</td>
                        <td className="px-3 py-3 text-indigo-600 font-bold">{r.audit}%</td>
                        <td className="px-3 py-3 text-orange-600 font-bold">{r.performance}%</td>
                      </tr>
                    ))}
                    {monthlySummary.length === 0 && (
                      <tr><td colSpan={7} className="px-3 py-10 text-center text-[10px] text-slate-400">No monthly summary data available.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        return ReportsTabContent();

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
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">Admission & Registration</h2>
          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">Patient Flow Management</p>
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
            Admission Management • v1.0
          </p>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto custom-scroll p-6 bg-slate-50/30">
        {renderContent()}
      </main>

      {isQualityModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">{editingQualityId ? 'Edit Indicator' : 'Add Quality Indicator'}</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Admission & Registration Quality Indicator</p>
              </div>
              <button onClick={() => { setIsQualityModalOpen(false); setEditingQualityId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveQuality} className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Indicator Name *</label>
                  <select
                    value={qualityForm.indicatorName}
                    onChange={(e) => setQualityForm({ ...qualityForm, indicatorName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  >
                    <option value="">Select Indicator</option>
                    {SAMPLE_QUALITY_RECORDS.map((r) => (
                      <option key={r.indicatorName} value={r.indicatorName}>{r.indicatorName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Category *</label>
                  <select
                    value={qualityForm.category}
                    onChange={(e) => setQualityForm({ ...qualityForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {QUALITY_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <NumField label="Target (%) *" field="target" form={qualityForm} setForm={setQualityForm} step="0.1" />
                <NumField label="Actual (%) *" field="actual" form={qualityForm} setForm={setQualityForm} step="0.1" />
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                  <select
                    value={qualityForm.month}
                    onChange={(e) => setQualityForm({ ...qualityForm, month: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                  <input
                    type="number"
                    value={qualityForm.year}
                    onChange={(e) => setQualityForm({ ...qualityForm, year: parseInt(e.target.value) || 2025 })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Responsible Department</label>
                  <input
                    type="text"
                    value={qualityForm.responsibleDepartment}
                    onChange={(e) => setQualityForm({ ...qualityForm, responsibleDepartment: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Department name"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                  <select
                    value={qualityForm.status}
                    onChange={(e) => setQualityForm({ ...qualityForm, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Achieved">Achieved</option>
                    <option value="Pending">Pending</option>
                    <option value="Below Target">Below Target</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                <textarea
                  value={qualityForm.remarks}
                  onChange={(e) => setQualityForm({ ...qualityForm, remarks: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Optional remarks"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setIsQualityModalOpen(false); setEditingQualityId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingQualityId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
</form>
           </div>
         </div>
       )}

       {isOpdModalOpen && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
             <div className="flex items-center justify-between mb-5">
               <div>
                 <h3 className="text-sm font-extrabold text-slate-800">{editingOpdId ? 'Edit OPD Registration' : 'Add OPD Registration'}</h3>
                 <p className="text-[9px] text-slate-400 mt-0.5">Outpatient Registration Form</p>
               </div>
               <button onClick={() => { setIsOpdModalOpen(false); setEditingOpdId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                 <X className="w-4 h-4 text-slate-500" />
               </button>
             </div>
             <form onSubmit={handleSaveOpd} className="space-y-5">
               <div className="grid grid-cols-2 gap-3">
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name *</label>
                   <input type="text" value={opdForm.patientName} onChange={(e) => setOpdForm({ ...opdForm, patientName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">UHID *</label>
                   <input type="text" value={opdForm.uhid} onChange={(e) => setOpdForm({ ...opdForm, uhid: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Registration Type</label>
                   <select value={opdForm.registrationType} onChange={(e) => setOpdForm({ ...opdForm, registrationType: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                     {REGISTRATION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                   </select>
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Department</label>
                   <select value={opdForm.department} onChange={(e) => setOpdForm({ ...opdForm, department: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                     <option value="General Medicine">General Medicine</option>
                     <option value="Cardiology">Cardiology</option>
                     <option value="Orthopedics">Orthopedics</option>
                     <option value="Pediatrics">Pediatrics</option>
                     <option value="Emergency">Emergency</option>
                     <option value="Neurology">Neurology</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Doctor Name</label>
                   <input type="text" value={opdForm.doctorName} onChange={(e) => setOpdForm({ ...opdForm, doctorName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Registration Date</label>
                   <input type="date" value={opdForm.registrationDate} onChange={(e) => setOpdForm({ ...opdForm, registrationDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Registration Time</label>
                   <input type="time" value={opdForm.registrationTime} onChange={(e) => setOpdForm({ ...opdForm, registrationTime: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                   <select value={opdForm.status} onChange={(e) => setOpdForm({ ...opdForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                     {REGISTRATION_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                   </select>
                 </div>
               </div>
               <div>
                 <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                 <textarea value={opdForm.remarks} onChange={(e) => setOpdForm({ ...opdForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Optional remarks" />
               </div>
               <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                 <button type="button" onClick={() => { setIsOpdModalOpen(false); setEditingOpdId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                 <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingOpdId ? 'Save Changes' : 'Add Record'}</button>
               </div>
             </form>
           </div>
         </div>
       )}

       {isIpdModalOpen && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
             <div className="flex items-center justify-between mb-5">
               <div>
                 <h3 className="text-sm font-extrabold text-slate-800">{editingIpdId ? 'Edit IPD Admission' : 'Add IPD Admission'}</h3>
                 <p className="text-[9px] text-slate-400 mt-0.5">Inpatient Admission Form</p>
               </div>
               <button onClick={() => { setIsIpdModalOpen(false); setEditingIpdId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                 <X className="w-4 h-4 text-slate-500" />
               </button>
             </div>
             <form onSubmit={handleSaveIpd} className="space-y-5">
               <div className="grid grid-cols-2 gap-3">
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name *</label>
                   <input type="text" value={ipdForm.patientName} onChange={(e) => setIpdForm({ ...ipdForm, patientName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">UHID *</label>
                   <input type="text" value={ipdForm.uhid} onChange={(e) => setIpdForm({ ...ipdForm, uhid: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Admission Type</label>
                   <select value={ipdForm.admissionType} onChange={(e) => setIpdForm({ ...ipdForm, admissionType: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                     {ADMISSION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                   </select>
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Source</label>
                   <select value={ipdForm.source} onChange={(e) => setIpdForm({ ...ipdForm, source: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                     {ADMISSION_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
                   </select>
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Bed Required</label>
                   <select value={ipdForm.bedRequired} onChange={(e) => setIpdForm({ ...ipdForm, bedRequired: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                     {WARD_TYPES.map((w) => <option key={w} value={w}>{w}</option>)}
                   </select>
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Admission Date</label>
                   <input type="date" value={ipdForm.admissionDate} onChange={(e) => setIpdForm({ ...ipdForm, admissionDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Admitting Doctor</label>
                   <input type="text" value={ipdForm.admittingDoctor} onChange={(e) => setIpdForm({ ...ipdForm, admittingDoctor: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Diagnosis</label>
                   <input type="text" value={ipdForm.diagnosis} onChange={(e) => setIpdForm({ ...ipdForm, diagnosis: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                   <select value={ipdForm.status} onChange={(e) => setIpdForm({ ...ipdForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                     {REGISTRATION_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                   </select>
                 </div>
               </div>
               <div>
                 <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                 <textarea value={ipdForm.remarks} onChange={(e) => setIpdForm({ ...ipdForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Optional remarks" />
               </div>
               <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                 <button type="button" onClick={() => { setIsIpdModalOpen(false); setEditingIpdId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                 <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingIpdId ? 'Save Changes' : 'Add Record'}</button>
               </div>
             </form>
           </div>
         </div>
       )}

       {isBedModalOpen && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
             <div className="flex items-center justify-between mb-5">
               <div>
                 <h3 className="text-sm font-extrabold text-slate-800">{editingBedId ? 'Edit Bed Allocation' : 'Allocate Bed'}</h3>
                 <p className="text-[9px] text-slate-400 mt-0.5">Bed Allocation Form</p>
               </div>
               <button onClick={() => { setIsBedModalOpen(false); setEditingBedId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                 <X className="w-4 h-4 text-slate-500" />
               </button>
             </div>
             <form onSubmit={handleSaveBed} className="space-y-5">
               <div className="grid grid-cols-2 gap-3">
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Bed No *</label>
                   <input type="text" value={bedForm.bedNo} onChange={(e) => setBedForm({ ...bedForm, bedNo: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Ward *</label>
                   <select value={bedForm.ward} onChange={(e) => setBedForm({ ...bedForm, ward: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required>
                     {WARD_TYPES.map((w) => <option key={w} value={w}>{w}</option>)}
                   </select>
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name</label>
                   <input type="text" value={bedForm.patientName} onChange={(e) => setBedForm({ ...bedForm, patientName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">UHID</label>
                   <input type="text" value={bedForm.uhid} onChange={(e) => setBedForm({ ...bedForm, uhid: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Admission No</label>
                   <input type="text" value={bedForm.admissionNo} onChange={(e) => setBedForm({ ...bedForm, admissionNo: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Allocation Date</label>
                   <input type="date" value={bedForm.allocationDate} onChange={(e) => setBedForm({ ...bedForm, allocationDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                   <select value={bedForm.status} onChange={(e) => setBedForm({ ...bedForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                     {BED_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                   </select>
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Allocated By</label>
                   <input type="text" value={bedForm.allocatedBy} onChange={(e) => setBedForm({ ...bedForm, allocatedBy: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                 </div>
                 <div>
                   <label className="block text-[9px] font-medium text-slate-600 mb-1">Discharge Date</label>
                   <input type="date" value={bedForm.dischargeDate} onChange={(e) => setBedForm({ ...bedForm, dischargeDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                 </div>
               </div>
               <div>
                 <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                 <textarea value={bedForm.remarks} onChange={(e) => setBedForm({ ...bedForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Optional remarks" />
               </div>
               <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
<button type="button" onClick={() => { setIsBedModalOpen(false); setEditingBedId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingBedId ? 'Save Changes' : 'Add Record'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isBillingModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingBillingId ? 'Edit Billing' : 'Add Billing'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Billing Record Form</p>
                </div>
                <button onClick={() => { setIsBillingModalOpen(false); setEditingBillingId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <form onSubmit={handleSaveBilling} className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name *</label>
                    <input type="text" value={billingForm.patientName} onChange={(e) => setBillingForm({ ...billingForm, patientName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">UHID *</label>
                    <input type="text" value={billingForm.uhid} onChange={(e) => setBillingForm({ ...billingForm, uhid: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Bill Type</label>
                    <select value={billingForm.billType} onChange={(e) => setBillingForm({ ...billingForm, billType: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      <option value="OPD">OPD</option>
                      <option value="IPD">IPD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Amount ($)</label>
                    <input type="number" value={billingForm.amount} onChange={(e) => setBillingForm({ ...billingForm, amount: parseFloat(e.target.value) || 0 })} min="0" step="0.01" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Payment Mode</label>
                    <select value={billingForm.paymentMode} onChange={(e) => setBillingForm({ ...billingForm, paymentMode: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                      <option value="Insurance">Insurance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select value={billingForm.status} onChange={(e) => setBillingForm({ ...billingForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      {REGISTRATION_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Billing Date</label>
                    <input type="date" value={billingForm.billingDate} onChange={(e) => setBillingForm({ ...billingForm, billingDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                  <textarea value={billingForm.remarks} onChange={(e) => setBillingForm({ ...billingForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Optional remarks" />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsBillingModalOpen(false); setEditingBillingId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingBillingId ? 'Save Changes' : 'Add Record'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isTpaModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingTpaId ? 'Edit Claim' : 'Add Claim'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Insurance Claim Form</p>
                </div>
                <button onClick={() => { setIsTpaModalOpen(false); setEditingTpaId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <form onSubmit={handleSaveTpa} className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name *</label>
                    <input type="text" value={tpaForm.patientName} onChange={(e) => setTpaForm({ ...tpaForm, patientName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">UHID *</label>
                    <input type="text" value={tpaForm.uhid} onChange={(e) => setTpaForm({ ...tpaForm, uhid: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Insurance Company</label>
                    <select value={tpaForm.insuranceCompany} onChange={(e) => setTpaForm({ ...tpaForm, insuranceCompany: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      <option value="Star Health">Star Health</option>
                      <option value="Apollo Munich">Apollo Munich</option>
                      <option value="ICICI Lombard">ICICI Lombard</option>
                      <option value="Bajaj Allianz">Bajaj Allianz</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Claim Amount ($)</label>
                    <input type="number" value={tpaForm.claimAmount} onChange={(e) => setTpaForm({ ...tpaForm, claimAmount: parseFloat(e.target.value) || 0 })} min="0" step="0.01" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Approved Amount ($)</label>
                    <input type="number" value={tpaForm.approvedAmount} onChange={(e) => setTpaForm({ ...tpaForm, approvedAmount: parseFloat(e.target.value) || 0 })} min="0" step="0.01" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Claim Status</label>
                    <select value={tpaForm.claimStatus} onChange={(e) => setTpaForm({ ...tpaForm, claimStatus: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Partial">Partial</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Submission Date</label>
                    <input type="date" value={tpaForm.submissionDate} onChange={(e) => setTpaForm({ ...tpaForm, submissionDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                  <textarea value={tpaForm.remarks} onChange={(e) => setTpaForm({ ...tpaForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Optional remarks" />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsTpaModalOpen(false); setEditingTpaId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingTpaId ? 'Save Changes' : 'Add Record'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isFcModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingFcId ? 'Edit Counselling' : 'Add Counselling'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Financial Counselling Form</p>
                </div>
                <button onClick={() => { setIsFcModalOpen(false); setEditingFcId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <form onSubmit={handleSaveFc} className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name *</label>
                    <input type="text" value={fcForm.patientName} onChange={(e) => setFcForm({ ...fcForm, patientName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">UHID *</label>
                    <input type="text" value={fcForm.uhid} onChange={(e) => setFcForm({ ...fcForm, uhid: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Counselling Type</label>
                    <select value={fcForm.counsellingType} onChange={(e) => setFcForm({ ...fcForm, counsellingType: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      <option value="Pre-admission">Pre-admission</option>
                      <option value="Insurance Guidance">Insurance Guidance</option>
                      <option value="Payment Plan">Payment Plan</option>
                      <option value="Cashless Claim">Cashless Claim</option>
                      <option value="Package Inquiry">Package Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Estimated Cost ($)</label>
                    <input type="number" value={fcForm.estimatedCost} onChange={(e) => setFcForm({ ...fcForm, estimatedCost: parseFloat(e.target.value) || 0 })} min="0" step="0.01" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Counsellor</label>
                    <input type="text" value={fcForm.counsellor} onChange={(e) => setFcForm({ ...fcForm, counsellor: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select value={fcForm.status} onChange={(e) => setFcForm({ ...fcForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      {REGISTRATION_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Date</label>
                    <input type="date" value={fcForm.date} onChange={(e) => setFcForm({ ...fcForm, date: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                  <textarea value={fcForm.remarks} onChange={(e) => setFcForm({ ...fcForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Optional remarks" />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsFcModalOpen(false); setEditingFcId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingFcId ? 'Save Changes' : 'Add Record'}</button>
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
                  <p className="text-[9px] text-slate-400 mt-0.5">Initial Assessment Form</p>
                </div>
                <button onClick={() => { setIsAssessmentModalOpen(false); setEditingAssessmentId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <form onSubmit={handleSaveAssessment} className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name *</label>
                    <input type="text" value={assessmentForm.patientName} onChange={(e) => setAssessmentForm({ ...assessmentForm, patientName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">UHID *</label>
                    <input type="text" value={assessmentForm.uhid} onChange={(e) => setAssessmentForm({ ...assessmentForm, uhid: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Assessment Type</label>
                    <select value={assessmentForm.assessmentType} onChange={(e) => setAssessmentForm({ ...assessmentForm, assessmentType: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      {ASSESSMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Assessed By</label>
                    <input type="text" value={assessmentForm.assessedBy} onChange={(e) => setAssessmentForm({ ...assessmentForm, assessedBy: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Assessment Date</label>
                    <input type="date" value={assessmentForm.assessmentDate} onChange={(e) => setAssessmentForm({ ...assessmentForm, assessmentDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Priority</label>
                    <select value={assessmentForm.priority} onChange={(e) => setAssessmentForm({ ...assessmentForm, priority: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      {ASSESSMENT_PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select value={assessmentForm.status} onChange={(e) => setAssessmentForm({ ...assessmentForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      {REFERRAL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                  <textarea value={assessmentForm.remarks} onChange={(e) => setAssessmentForm({ ...assessmentForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Optional remarks" />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsAssessmentModalOpen(false); setEditingAssessmentId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingAssessmentId ? 'Save Changes' : 'Add Record'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isReferralModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingReferralId ? 'Edit Referral' : 'Add Referral'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Referral & Transfer Form</p>
                </div>
                <button onClick={() => { setIsReferralModalOpen(false); setEditingReferralId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <form onSubmit={handleSaveReferral} className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name *</label>
                    <input type="text" value={referralForm.patientName} onChange={(e) => setReferralForm({ ...referralForm, patientName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">UHID *</label>
                    <input type="text" value={referralForm.uhid} onChange={(e) => setReferralForm({ ...referralForm, uhid: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Referral Type</label>
                    <select value={referralForm.referralType} onChange={(e) => setReferralForm({ ...referralForm, referralType: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      {REFERRAL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Referred To</label>
                    <input type="text" value={referralForm.referredTo} onChange={(e) => setReferralForm({ ...referralForm, referredTo: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Reason</label>
                    <input type="text" value={referralForm.reason} onChange={(e) => setReferralForm({ ...referralForm, reason: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Transfer Date</label>
                    <input type="date" value={referralForm.transferDate} onChange={(e) => setReferralForm({ ...referralForm, transferDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select value={referralForm.status} onChange={(e) => setReferralForm({ ...referralForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      {REFERRAL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                  <textarea value={referralForm.remarks} onChange={(e) => setReferralForm({ ...referralForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Optional remarks" />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsReferralModalOpen(false); setEditingReferralId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingReferralId ? 'Save Changes' : 'Add Record'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isComplaintModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingComplaintId ? 'Edit Complaint' : 'Add Complaint'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Patient Complaint Form</p>
                </div>
                <button onClick={() => { setIsComplaintModalOpen(false); setEditingComplaintId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <form onSubmit={handleSaveComplaint} className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Name *</label>
                    <input type="text" value={complaintForm.patientName} onChange={(e) => setComplaintForm({ ...complaintForm, patientName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">UHID *</label>
                    <input type="text" value={complaintForm.uhid} onChange={(e) => setComplaintForm({ ...complaintForm, uhid: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Complaint Category</label>
                    <select value={complaintForm.complaintCategory} onChange={(e) => setComplaintForm({ ...complaintForm, complaintCategory: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      {COMPLAINT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Complaint Date</label>
                    <input type="date" value={complaintForm.complaintDate} onChange={(e) => setComplaintForm({ ...complaintForm, complaintDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Assigned To</label>
                    <input type="text" value={complaintForm.assignedTo} onChange={(e) => setComplaintForm({ ...complaintForm, assignedTo: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Resolution Status</label>
                    <select value={complaintForm.resolutionStatus} onChange={(e) => setComplaintForm({ ...complaintForm, resolutionStatus: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      {COMPLAINT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Closed Date</label>
                    <input type="date" value={complaintForm.closedDate} onChange={(e) => setComplaintForm({ ...complaintForm, closedDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                  <textarea value={complaintForm.remarks} onChange={(e) => setComplaintForm({ ...complaintForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Optional remarks" />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsComplaintModalOpen(false); setEditingComplaintId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingComplaintId ? 'Save Changes' : 'Add Record'}</button>
                </div>
              </form>
            </div>
</div>
         )}

        {isInternalAuditModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingInternalAuditId ? 'Edit Audit' : 'Add Audit'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Internal Audit Form</p>
                </div>
                <button onClick={() => { setIsInternalAuditModalOpen(false); setEditingInternalAuditId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <form onSubmit={handleSaveInternalAudit} className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit ID *</label>
                    <input type="text" value={internalAuditForm.auditId} onChange={(e) => setInternalAuditForm({ ...internalAuditForm, auditId: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Date *</label>
                    <input type="date" value={internalAuditForm.auditDate} onChange={(e) => setInternalAuditForm({ ...internalAuditForm, auditDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Type</label>
                    <select value={internalAuditForm.auditType} onChange={(e) => setInternalAuditForm({ ...internalAuditForm, auditType: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      {AUDIT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Area *</label>
                    <select value={internalAuditForm.auditArea} onChange={(e) => setInternalAuditForm({ ...internalAuditForm, auditArea: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required>
                      {AUDIT_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Auditor *</label>
                    <input type="text" value={internalAuditForm.auditor} onChange={(e) => setInternalAuditForm({ ...internalAuditForm, auditor: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Compliance %</label>
                    <input type="number" value={internalAuditForm.compliancePercent} onChange={(e) => setInternalAuditForm({ ...internalAuditForm, compliancePercent: parseFloat(e.target.value) || 0 })} min="0" max="100" step="0.1" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select value={internalAuditForm.status} onChange={(e) => setInternalAuditForm({ ...internalAuditForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      <option value="Completed">Completed</option>
                      <option value="Action Required">Action Required</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Follow-up Date</label>
                    <input type="date" value={internalAuditForm.followupDate} onChange={(e) => setInternalAuditForm({ ...internalAuditForm, followupDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-medium text-slate-600 mb-1">Findings</label>
                  <textarea value={internalAuditForm.findings} onChange={(e) => setInternalAuditForm({ ...internalAuditForm, findings: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Audit findings" />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsInternalAuditModalOpen(false); setEditingInternalAuditId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingInternalAuditId ? 'Save Changes' : 'Add Record'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isCapaModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingCapaId ? 'Edit CAPA' : 'Add CAPA'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">CAPA Form</p>
                </div>
                <button onClick={() => { setIsCapaModalOpen(false); setEditingCapaId(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <form onSubmit={handleSaveCapa} className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">CAPA ID *</label>
                    <input type="text" value={capaForm.capaId} onChange={(e) => setCapaForm({ ...capaForm, capaId: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit ID *</label>
                    <input type="text" value={capaForm.auditId} onChange={(e) => setCapaForm({ ...capaForm, auditId: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Observation *</label>
                    <input type="text" value={capaForm.observation} onChange={(e) => setCapaForm({ ...capaForm, observation: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Corrective Action *</label>
                    <input type="text" value={capaForm.correctiveAction} onChange={(e) => setCapaForm({ ...capaForm, correctiveAction: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Preventive Action *</label>
                    <input type="text" value={capaForm.preventiveAction} onChange={(e) => setCapaForm({ ...capaForm, preventiveAction: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Responsible Person *</label>
                    <input type="text" value={capaForm.responsiblePerson} onChange={(e) => setCapaForm({ ...capaForm, responsiblePerson: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Target Date</label>
                    <input type="date" value={capaForm.targetDate} onChange={(e) => setCapaForm({ ...capaForm, targetDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Completion Date</label>
                    <input type="date" value={capaForm.completionDate} onChange={(e) => setCapaForm({ ...capaForm, completionDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select value={capaForm.status} onChange={(e) => setCapaForm({ ...capaForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                      {CAPA_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsCapaModalOpen(false); setEditingCapaId(null); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingCapaId ? 'Save Changes' : 'Add Record'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

export default AdmissionRegistrationWorkspace;


import React, { useState, useEffect } from 'react';
import { useHospital } from '../context/HospitalContext';
import { ChevronLeft, Edit3, Save, BookOpen, Shield, Users, Activity, FileText, Award, Layers, AlertTriangle, Settings, Clipboard, Trash2, CheckCircle, MessageSquare, BarChart3, TrendingUp, Search, Plus, X, ChevronRight, Download, Upload, Eye, Filter, Calendar, Folder, Clock } from 'lucide-react';

const RADIOLOGY_MODULES = [
  { id: 'overview', label: 'Overview', icon: 'BookOpen' },
  { id: 'policies', label: 'Policies & SOPs', icon: 'FileText' },
  { id: 'radiation-safety', label: 'Radiation Safety', icon: 'Shield' },
  { id: 'equipment', label: 'Equipment Management', icon: 'Settings' },
  { id: 'staff-training', label: 'Staff & Training', icon: 'Users' },
  { id: 'quality', label: 'Quality Indicators', icon: 'BarChart3' },
  { id: 'audits', label: 'Internal Audits', icon: 'Search' },
  { id: 'capa', label: 'CAPA', icon: 'AlertTriangle' },
  { id: 'statutory', label: 'Statutory Compliance', icon: 'Award' },
  { id: 'evidence', label: 'Evidence Repository', icon: 'Folder' },
  { id: 'reports', label: 'Reports', icon: 'Download' }
];

const DEFAULT_RADIOLOGY_MODULES = [
  { id: 'overview', label: 'Overview', objective: 'Holistic view of radiology compliance.', clauses: ['Review KPIs', 'Monitor incidents', 'Track CAPA'] },
  { id: 'patient-id', label: 'Patient Identification', objective: 'Ensure correct patient identification before imaging.', clauses: ['Two-identifier check', ' wristband verification', 'Consent confirmation'] },
  { id: 'investigation-request', label: 'Investigation Request', objective: 'Standardized request validation.', clauses: ['Clinician authorization', 'Required fields check', 'Priority tagging'] },
  { id: 'patient-prep', label: 'Patient Preparation', objective: 'Safe preparation protocols.', clauses: ['Fasting checks', 'Allergy verification', 'Pregnancy screening'] },
  { id: 'imaging-workflow', label: 'Imaging Workflow', objective: 'End-to-end imaging process control.', clauses: ['Schedule adherence', 'Technologist handover', 'Image quality check'] },
  { id: 'reporting-tat', label: 'Reporting & TAT', objective: 'Timely and accurate reporting.', clauses: ['Radiologist sign-off', 'TAT targets', 'Addendum protocol'] },
  { id: 'radiation-safety', label: 'Radiation Safety', objective: 'ALARA compliance and dose monitoring.', clauses: ['TLD monitoring', 'Area surveys', 'Pregnancy protection'] },
  { id: 'staff-mgmt', label: 'Staff Management', objective: 'Qualified staff deployment.', clauses: ['Radiographer staffing', 'After-hours cover', 'Registry checks'] },
  { id: 'equipment-mgmt', label: 'Equipment Management', objective: 'Equipment reliability and safety.', clauses: ['PPM schedule', 'Calibration records', 'Breakdown response'] },
  { id: 'infection-control', label: 'Infection Control', objective: 'Prevent HAIs in imaging.', clauses: ['Room turnover', 'High-level disinfection', 'Water line cleaning'] },
  { id: 'bmw', label: 'Biomedical Waste', objective: 'Safe BMW handling.', clauses: ['Color-coded bins', 'Sharps protocol', 'Waste tracking'] },
  { id: 'incident-reporting', label: 'Incident Reporting', objective: 'Rapid reporting and RCA.', clauses: ['Near-miss capture', 'Radiology-specific RCA', 'Staff support'] },
  { id: 'qa', label: 'Quality Assurance', objective: 'Continuous quality improvement.', clauses: ['Image QA', 'Mammography audit', 'Equipment QC'] },
  { id: 'compliance', label: 'Compliance', objective: 'Regulatory adherence.', clauses: ['AERB rules', 'NABH standards', 'Hospital policies'] }
];

const ICON_MAP = {
  BookOpen, Shield, Users, Activity, FileText, Award, Layers,
  AlertTriangle, Settings, Clipboard, Trash2, CheckCircle, MessageSquare,
  BarChart3, TrendingUp, Search, Plus, X, ChevronRight, Download, Upload, Eye, Filter, Calendar, Folder
};

const ICON_MAP_RAD = { BookOpen: BookOpen, Shield: Shield, Users: Users, Activity: Activity, FileText: FileText, Award: Award, Layers: Layers, AlertTriangle: AlertTriangle, Settings: Settings, Clipboard: Clipboard, Trash2: Trash2, CheckCircle: CheckCircle };

const SAMPLE_POLICIES = [
  { id: 'p1', title: 'Radiation Protection Policy', code: 'POL-RAD-001', version: '1.0', status: 'Published', effectiveDate: '2024-01-01', reviewDate: '2026-01-01', category: 'Radiation Safety' },
  { id: 'p2', title: 'MRI Safety Protocol', code: 'POL-RAD-002', version: '2.1', status: 'Published', effectiveDate: '2024-03-15', reviewDate: '2025-03-15', category: 'Safety' },
  { id: 'p3', title: 'CT Scan Protocol', code: 'POL-RAD-003', version: '1.2', status: 'Draft', effectiveDate: '2024-06-01', reviewDate: '2025-06-01', category: 'Procedure' },
  { id: 'p4', title: 'AERB Compliance Guidelines', code: 'POL-RAD-004', version: '1.0', status: 'Published', effectiveDate: '2024-02-01', reviewDate: '2026-02-01', category: 'Statutory' }
];

const SAMPLE_INCIDENTS = [
  { id: 'i1', date: '2025-05-12', type: 'Overexposure', patient: 'Mrs. Sharma', modality: 'CT Scan', severity: 'Moderate', action: 'Retraining conducted' },
  { id: 'i2', date: '2025-05-18', type: 'Equipment Fault', patient: 'N/A', modality: 'MRI', severity: 'Minor', action: 'Service called' }
];

const SAMPLE_EQUIPMENT = [
  { id: 'e1', name: 'CT Scanner - 128 Slice', model: 'SOMATOM Definition', location: 'Radiology Floor 1', ppmDue: '2025-06-01', calibrationDue: '2025-07-01', status: 'Operational' },
  { id: 'e2', name: 'MRI - 1.5T', model: 'MAGNETOM Aera', location: 'Radiology Floor 2', ppmDue: '2025-06-15', calibrationDue: '2025-08-01', status: 'Operational' },
  { id: 'e3', name: 'X-Ray - Digital', model: 'Mobile Star', location: 'Radiology Floor 1', ppmDue: '2025-05-01', calibrationDue: '2025-06-01', status: 'Under Maintenance' }
];

const SAMPLE_TRAINING = [
  { id: 't1', topic: 'Radiation Safety Refresher', trainer: 'RSO', date: '2025-04-10', attendees: 8, certificate: true, expiry: '2026-04-10' },
  { id: 't2', topic: 'MRI Access & Safety', trainer: 'Radiologist', date: '2025-04-20', attendees: 6, certificate: true, expiry: '2026-04-20' }
];

const SAMPLE_AUDITS = [
  { id: 'au1', title: 'Radiation Safety Audit', date: '2025-05-01', auditor: 'RSO', score: 88, status: 'Completed' },
  { id: 'au2', title: 'Equipment Calibration Audit', date: '2025-05-15', auditor: 'Biomedical Engineer', score: 95, status: 'Completed' }
];

const SAMPLE_CAPA = [
  { id: 'c1', issue: 'CT scanner calibration overdue', rootCause: 'Scheduling lapse', correctiveAction: 'Calibration completed immediately', preventiveAction: 'Automated reminder system set up', responsible: 'Biomedical Engineer', dueDate: '2025-06-01', status: 'Open' },
  { id: 'c2', issue: 'Staff dosimeter not worn', rootCause: 'Lack of awareness', correctiveAction: 'Counseling conducted', preventiveAction: 'Monthly compliance checks', responsible: 'Radiology Incharge', dueDate: '2025-05-30', status: 'Closed' }
];

const SAMPLE_STATUTORY = [
  { id: 's1', requirement: 'AERB License Renewal', authority: 'AERB', dueDate: '2025-12-31', status: 'Compliant', lastInspection: '2024-12-01' },
  { id: 's2', requirement: 'Radiation Worker Registration', authority: 'AERB', dueDate: '2025-09-30', status: 'Compliant', lastInspection: '2024-09-15' },
  { id: 's3', requirement: 'NABH Diagnostic Accreditation', authority: 'NABH', dueDate: '2026-03-01', status: 'In Progress', lastInspection: '2025-03-01' }
];

const EVIDENCE_FOLDERS = [
  { id: 'ef1', name: 'Policies & SOPs', files: 4 },
  { id: 'ef2', name: 'Audit Reports', files: 6 },
  { id: 'ef3', name: 'CAPA Records', files: 3 },
  { id: 'ef4', name: 'Training Records', files: 5 },
  { id: 'ef5', name: 'Equipment Calibration', files: 8 },
  { id: 'ef6', name: 'AERB Inspections', files: 4 },
  { id: 'ef7', name: 'Radiation Monitoring', files: 12 },
  { id: 'ef8', name: 'Incident Reports', files: 2 }
];

const RadiologyWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();
  const [activeTab, setActiveTab] = useState('overview');

  const [policies, setPolicies] = useState(() => {
    const saved = localStorage.getItem('rad_policies');
    return saved ? JSON.parse(saved) : SAMPLE_POLICIES;
  });
  const [incidents, setIncidents] = useState(() => { const s = localStorage.getItem('rad_incidents'); return s ? JSON.parse(s) : SAMPLE_INCIDENTS; });
  const [equipment, setEquipment] = useState(() => { const s = localStorage.getItem('rad_equipment'); return s ? JSON.parse(s) : SAMPLE_EQUIPMENT; });
  const [isAddEquipModalOpen, setIsAddEquipModalOpen] = useState(false);
  const [equipFormData, setEquipFormData] = useState({
    name: '', type: '', manufacturer: '', model: '', serialNumber: '', installationDate: '', location: '', status: 'Operational'
  });
  const [training, setTraining] = useState(() => { const s = localStorage.getItem('rad_training'); return s ? JSON.parse(s) : SAMPLE_TRAINING; });
  const [staffDirectory, setStaffDirectory] = useState(() => {
    const s = localStorage.getItem('rad_staff');
    return s ? JSON.parse(s) : [
      { id: 'st1', name: 'Dr. Rajesh Kumar', designation: 'Radiologist', qualification: 'MD Radiology', registrationNo: 'DMC/R/12345', aerbRegNo: 'AERB/RW/001', joinDate: '2020-04-01', status: 'Active' },
      { id: 'st2', name: 'Dr. Sneha Patel', designation: 'Radiologist', qualification: 'MD Radiology', registrationNo: 'DMC/R/12890', aerbRegNo: 'AERB/RW/012', joinDate: '2021-06-15', status: 'Active' },
      { id: 'st3', name: 'Ms. Priya Sharma', designation: 'Senior Radiographer', qualification: 'B.Sc. Radiology', registrationNo: 'DMC/R/15670', aerbRegNo: 'AERB/RW/023', joinDate: '2019-02-10', status: 'Active' },
      { id: 'st4', name: 'Mr. Amit Verma', designation: 'Radiographer', qualification: 'Diploma in Radiology', registrationNo: 'DMC/R/18900', aerbRegNo: 'AERB/RW/034', joinDate: '2022-01-20', status: 'Active' },
      { id: 'st5', name: 'Mr. Ravi Singh', designation: 'Radiography Technician', qualification: 'ITI Radiology', registrationNo: 'DMC/R/21050', aerbRegNo: 'AERB/RW/045', joinDate: '2023-07-01', status: 'Active' },
      { id: 'st6', name: 'Ms. Lisa Thomas', designation: 'Radiographer', qualification: 'B.Sc. Medical Imaging', registrationNo: 'DMC/R/19560', aerbRegNo: 'AERB/RW/056', joinDate: '2021-11-15', status: 'On Leave' }
    ];
  });
  const [qualificationRecords, setQualificationRecords] = useState(() => {
    const s = localStorage.getItem('rad_qualifications');
    return s ? JSON.parse(s) : [
      { id: 'q1', staff: 'Dr. Rajesh Kumar', qualification: 'MD Radiology', institution: 'AIIMS New Delhi', year: '2018', renewalDue: '2028-01-01', status: 'Valid' },
      { id: 'q2', staff: 'Dr. Sneha Patel', qualification: 'MD Radiology', institution: 'PGIMER Chandigarh', year: '2020', renewalDue: '2030-06-01', status: 'Valid' },
      { id: 'q3', staff: 'Ms. Priya Sharma', qualification: 'B.Sc. Radiology', institution: 'SAIT Bangalore', year: '2017', renewalDue: '2027-12-31', status: 'Valid' },
      { id: 'q4', staff: 'Mr. Amit Verma', qualification: 'Diploma in Radiology', institution: 'ITI Mumbai', year: '2019', renewalDue: '2026-03-01', status: 'Renewal Due' },
      { id: 'q5', staff: 'Mr. Ravi Singh', qualification: 'ITI Radiology', institution: 'Govt. ITI Delhi', year: '2021', renewalDue: '2028-05-01', status: 'Valid' }
    ];
  });
  const [radSafetyTraining, setRadSafetyTraining] = useState(() => {
    const s = localStorage.getItem('rad_safety_training');
    return s ? JSON.parse(s) : [
      { id: 'rst1', topic: 'Radiation Protection & ALARA Principles', trainer: 'Dr. Mehta (RSO)', date: '2025-01-15', duration: '4 hours', attendees: 12, mode: 'In-person', compliance: '100%' },
      { id: 'rst2', topic: 'CT Scan Safety & Protocols', trainer: 'Dr. Rajesh Kumar', date: '2025-02-10', duration: '3 hours', attendees: 8, mode: 'In-person', compliance: '100%' },
      { id: 'rst3', topic: 'MRI Safety & Ferromagnetic Screening', trainer: 'Dr. Sneha Patel', date: '2025-03-05', duration: '3 hours', attendees: 7, mode: 'In-person', compliance: '86%' },
      { id: 'rst4', topic: 'X-Ray & Portable Radiography Safety', trainer: 'Ms. Priya Sharma', date: '2025-04-20', duration: '2 hours', attendees: 10, mode: 'Hybrid', compliance: '100%' },
      { id: 'rst5', topic: 'AERB Regulatory Updates 2025', trainer: 'External Expert', date: '2025-05-10', duration: '6 hours', attendees: 15, mode: 'In-person', compliance: '93%' }
    ];
  });
  const [certTracker, setCertTracker] = useState(() => {
    const s = localStorage.getItem('rad_cert_tracker');
    return s ? JSON.parse(s) : [
      { id: 'ct1', staff: 'Dr. Rajesh Kumar', certificate: 'CT Scan Certification', issuedBy: 'AERB', issueDate: '2024-01-01', expiryDate: '2027-01-01', status: 'Valid' },
      { id: 'ct2', staff: 'Dr. Sneha Patel', certificate: 'MRI Safety Certification', issuedBy: 'Siemens', issueDate: '2024-02-01', expiryDate: '2026-02-01', status: 'Expiring Soon' },
      { id: 'ct3', staff: 'Ms. Priya Sharma', certificate: 'Digital Radiography Cert.', issuedBy: 'Radiological Society', issueDate: '2023-06-01', expiryDate: '2026-06-01', status: 'Valid' },
      { id: 'ct4', staff: 'Mr. Amit Verma', certificate: 'Radiation Protection Badge', issuedBy: 'AERB', issueDate: '2024-01-15', expiryDate: '2025-07-15', status: 'Expired' },
      { id: 'ct5', staff: 'Mr. Ravi Singh', certificate: 'Ultrasound Scanner Operation', issuedBy: 'Philips', issueDate: '2024-03-01', expiryDate: '2027-03-01', status: 'Valid' }
    ];
  });
  const [trainingCalendar, setTrainingCalendar] = useState(() => {
    const s = localStorage.getItem('rad_training_calendar');
    return s ? JSON.parse(s) : [
      { id: 'tc1', event: 'Annual Radiation Safety Refresher', date: '2025-06-15', time: '10:00 AM', trainer: 'Dr. Mehta (RSO)', venue: 'Seminar Hall', attendees: 20, status: 'Scheduled' },
      { id: 'tc2', event: 'CT Scan Protocol Workshop', date: '2025-06-20', time: '02:00 PM', trainer: 'Dr. Rajesh Kumar', venue: 'Radiology Conf. Room', attendees: 10, status: 'Scheduled' },
      { id: 'tc3', event: 'MRI Safety Advanced Training', date: '2025-07-05', time: '10:00 AM', trainer: 'External Expert', venue: 'Auditorium', attendees: 15, status: 'Scheduled' },
      { id: 'tc4', event: 'BMW & Infection Control', date: '2025-05-28', time: '11:00 AM', trainer: 'Infection Control Nurse', venue: 'Training Room', attendees: 25, status: 'Completed' },
      { id: 'tc5', event: 'AERB Regulatory Compliance Workshop', date: '2025-08-10', time: '09:00 AM', trainer: 'AERB Representative', venue: 'Seminar Hall', attendees: 30, status: 'Scheduled' }
    ];
  });

  useEffect(() => { localStorage.setItem('rad_staff', JSON.stringify(staffDirectory)); }, [staffDirectory]);
  useEffect(() => { localStorage.setItem('rad_qualifications', JSON.stringify(qualificationRecords)); }, [qualificationRecords]);
  useEffect(() => { localStorage.setItem('rad_safety_training', JSON.stringify(radSafetyTraining)); }, [radSafetyTraining]);
  useEffect(() => { localStorage.setItem('rad_cert_tracker', JSON.stringify(certTracker)); }, [certTracker]);
  useEffect(() => { localStorage.setItem('rad_training_calendar', JSON.stringify(trainingCalendar)); }, [trainingCalendar]);

  const staffKpiData = {
    totalStaff: staffDirectory.length,
    activeStaff: staffDirectory.filter(s => s.status === 'Active').length,
    totalTraining: radSafetyTraining.length,
    avgCompliance: Math.round(radSafetyTraining.reduce((a, b) => a + parseFloat(b.compliance), 0) / radSafetyTraining.length),
    validCerts: certTracker.filter(c => c.status === 'Valid').length,
    expiringCerts: certTracker.filter(c => c.status === 'Expiring Soon' || c.status === 'Expired').length,
    upcomingTraining: trainingCalendar.filter(t => t.status === 'Scheduled').length
  };

  const STAFF_TRAINING_TABS = [
    { id: 'staff-dashboard', label: 'Dashboard', icon: 'BookOpen' },
    { id: 'staff-directory', label: 'Staff Directory', icon: 'Users' },
    { id: 'qualifications', label: 'Qualification Tracking', icon: 'Award' },
    { id: 'rad-safety-training', label: 'Radiation Safety Training', icon: 'Shield' },
    { id: 'cert-tracker', label: 'Certification Tracker', icon: 'CheckCircle' },
    { id: 'training-calendar', label: 'Training Calendar', icon: 'Calendar' }
  ];
  const [audits, setAudits] = useState(() => { const s = localStorage.getItem('rad_audits'); return s ? JSON.parse(s) : SAMPLE_AUDITS; });
  const [capa, setCapa] = useState(() => { const s = localStorage.getItem('rad_capa'); return s ? JSON.parse(s) : SAMPLE_CAPA; });
  const [statutory, setStatutory] = useState(() => { const s = localStorage.getItem('rad_statutory'); return s ? JSON.parse(s) : SAMPLE_STATUTORY; });
  const [auditTemplates, setAuditTemplates] = useState(() => {
    const s = localStorage.getItem('rad_audit_templates');
    return s ? JSON.parse(s) : [
      { id: 'at1', name: 'Radiation Safety Audit', basedOn: 'NAHB/AERB', lastUpdated: '2025-01-01', sections: 12 },
      { id: 'at2', name: 'Equipment Calibration Audit', basedOn: 'ISO 13485', lastUpdated: '2025-02-01', sections: 8 },
      { id: 'at3', name: 'Infection Control Audit', basedOn: 'NABH', lastUpdated: '2025-03-01', sections: 10 }
    ];
  });
  const [auditSchedule, setAuditSchedule] = useState(() => {
    const s = localStorage.getItem('rad_audit_schedule');
    return s ? JSON.parse(s) : [
      { id: 'as1', audit: 'Q2 Radiation Safety Audit', scheduledDate: '2025-06-15', auditor: 'RSO / Dr. Mehta', status: 'Scheduled' },
      { id: 'as2', audit: 'Equipment PPM Audit', scheduledDate: '2025-06-20', auditor: 'Biomedical Engineer', status: 'Scheduled' },
      { id: 'as3', audit: 'Monthly Radiation Monitoring Audit', scheduledDate: '2025-05-30', auditor: 'RSO', status: 'Completed' }
    ];
  });
  const [auditFindings, setAuditFindings] = useState(() => {
    const s = localStorage.getItem('rad_audit_findings');
    return s ? JSON.parse(s) : [
      { id: 'af1', audit: 'Radiation Safety Audit', finding: 'TLD badge not worn by 1 staff member', severity: 'Minor', date: '2025-05-01', status: 'Open' },
      { id: 'af2', audit: 'Equipment Calibration Audit', finding: 'X-ray unit kVp deviation 2% from baseline', severity: 'Major', date: '2025-05-15', status: 'Under CAPA' },
      { id: 'af3', audit: 'Infection Control Audit', finding: 'Hand hygiene compliance at 78% vs target 95%', severity: 'Major', date: '2025-05-28', status: 'Closed' }
    ];
  });
  const [nonConformities, setNonConformities] = useState(() => {
    const s = localStorage.getItem('rad_non_conformities');
    return s ? JSON.parse(s) : [
      { id: 'nc1', ncrNo: 'NCR-RAD-001', severity: 'Major', description: 'CT scanner calibration overdue by 15 days', rootCause: 'Scheduling lapse in PPM', correctiveAction: 'Immediate calibration completed', preventiveAction: 'Automated reminder 30 days before due', responsible: 'Biomedical Engineer', dueDate: '2025-06-10', status: 'Open' },
      { id: 'nc2', ncrNo: 'NCR-RAD-002', severity: 'Minor', description: 'Lead apron storage area shows minor tear', rootCause: 'Normal wear and tear', correctiveAction: 'Damaged aprons replaced', preventiveAction: 'Quarterly inspection checklist introduced', responsible: 'Radiology Incharge', dueDate: '2025-06-25', status: 'Closed' }
    ];
  });
  const [customized, setCustomized] = useState(() => {
    const saved = localStorage.getItem('rad_custom_policies');
    return saved ? JSON.parse(saved) : {};
  });
  const [activePolicyModuleId, setActivePolicyModuleId] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [activeRadTab, setActiveRadTab] = useState('dashboard');
  const [activeEquipTab, setActiveEquipTab] = useState('equip-dashboard');
  const [activeAuditTab, setActiveAuditTab] = useState('audit-dashboard');
  const [activeStaffTab, setActiveStaffTab] = useState('staff-dashboard');

  const [tldBadges, setTldBadges] = useState(() => {
    const s = localStorage.getItem('rad_tld_badges');
    return s ? JSON.parse(s) : [
      { id: 't1', staff: 'Dr. Rajesh Kumar', designation: 'Radiologist', badgeNo: 'TLD-001', issueDate: '2025-01-01', dueDate: '2025-07-01', status: 'Active', lastReading: '0.12 mSv', cumulative: '1.45 mSv' },
      { id: 't2', staff: 'Ms. Priya Sharma', designation: 'Radiographer', badgeNo: 'TLD-002', issueDate: '2025-01-01', dueDate: '2025-07-01', status: 'Active', lastReading: '0.08 mSv', cumulative: '0.92 mSv' },
      { id: 't3', staff: 'Mr. Amit Verma', designation: 'Radiographer', badgeNo: 'TLD-003', issueDate: '2025-01-01', dueDate: '2025-06-01', status: 'Active', lastReading: '0.15 mSv', cumulative: '1.80 mSv' },
      { id: 't4', staff: 'Dr. Sneha Patel', designation: 'Radiologist', badgeNo: 'TLD-004', issueDate: '2025-02-01', dueDate: '2025-08-01', status: 'Active', lastReading: '0.10 mSv', cumulative: '1.20 mSv' },
      { id: 't5', staff: 'Mr. Ravi Singh', designation: 'Technician', badgeNo: 'TLD-005', issueDate: '2024-12-01', dueDate: '2025-06-01', status: 'Overdue', lastReading: '0.22 mSv', cumulative: '2.10 mSv' }
    ];
  });
  const [monitoringRecords, setMonitoringRecords] = useState(() => {
    const s = localStorage.getItem('rad_monitoring');
    return s ? JSON.parse(s) : [
      { id: 'm1', date: '2025-05-01', staff: 'Dr. Rajesh Kumar', area: 'CT Scan Room', reading: '0.02 mSv/hr', type: 'Area Monitoring', status: 'Normal' },
      { id: 'm2', date: '2025-05-01', staff: 'Ms. Priya Sharma', area: 'X-Ray Room 1', reading: '0.01 mSv/hr', type: 'Personal Monitoring', status: 'Normal' },
      { id: 'm3', date: '2025-05-02', staff: 'Mr. Amit Verma', area: 'MRI Control Room', reading: '0.05 mSv/hr', type: 'Area Monitoring', status: 'Normal' },
      { id: 'm4', date: '2025-05-05', staff: 'Dr. Sneha Patel', area: 'Interventional Suite', reading: '0.18 mSv/hr', type: 'Personal Monitoring', status: 'Alert' },
      { id: 'm5', date: '2025-05-10', staff: 'Mr. Ravi Singh', area: 'CT Scan Room', reading: '0.25 mSv/hr', type: 'Area Monitoring', status: 'Alert' }
    ];
  });
  const [radSafetyAudits, setRadSafetyAudits] = useState(() => {
    const s = localStorage.getItem('rad_rad_audits');
    return s ? JSON.parse(s) : [
      { id: 'ra1', title: 'Quarterly Radiation Safety Audit', date: '2025-04-01', auditor: 'RSO / Dr. Mehta', scope: 'All imaging rooms', findings: 2, status: 'Completed', score: 88 },
      { id: 'ra2', title: 'TLD Badge Compliance Audit', date: '2025-03-15', auditor: 'RSO / Dr. Mehta', scope: 'All radiation workers', findings: 1, status: 'Completed', score: 95 },
      { id: 'ra3', title: 'AERB Inspection Preparation', date: '2025-05-01', auditor: 'Internal Team', scope: 'Full department', findings: 3, status: 'In Progress', score: 0 }
    ];
  });
  const [aerDocs, setAerDocs] = useState(() => {
    const s = localStorage.getItem('rad_aer_docs');
    return s ? JSON.parse(s) : [
      { id: 'a1', title: 'AERB License - Radiology Department', documentNo: 'AERB/RAD/2024/001', issueDate: '2024-01-01', expiryDate: '2026-01-01', status: 'Valid' },
      { id: 'a2', title: 'Radiation Worker Registration Certificate', documentNo: 'AERB/RW/2024/045', issueDate: '2024-02-01', expiryDate: '2026-02-01', status: 'Valid' },
      { id: 'a3', title: 'RSO Appointment Letter', documentNo: 'ADM/RSO/2024/01', issueDate: '2024-01-15', expiryDate: '2027-01-15', status: 'Valid' },
      { id: 'a4', title: 'Equipment Type Approval Certificate - CT Scanner', documentNo: 'AERB/ETA/CT/2023/012', issueDate: '2023-06-01', expiryDate: '2026-06-01', status: 'Valid' },
      { id: 'a5', title: 'Equipment Type Approval Certificate - MRI', documentNo: 'AERB/ETA/MRI/2023/008', issueDate: '2023-05-15', expiryDate: '2026-05-15', status: 'Valid' },
      { id: 'a6', title: 'Radiation Safety Manual', documentNo: 'RAD/RSM/2024/001', issueDate: '2024-01-01', expiryDate: '2027-01-01', status: 'Valid' }
    ];
  });
  const [calibrationRecords, setCalibrationRecords] = useState(() => {
    const s = localStorage.getItem('rad_calibration');
    return s ? JSON.parse(s) : [
      { id: 'cal1', equipment: 'CT Scanner - 128 Slice', type: 'CTDI Phantom', calibrationDate: '2025-04-01', nextDue: '2026-04-01', agency: 'AERB Approved Lab', certificate: 'CERT/CT/2025/001', status: 'Valid' },
      { id: 'cal2', equipment: 'MRI - 1.5T', type: 'Magnetic Field Mapping', calibrationDate: '2025-03-15', nextDue: '2026-03-15', agency: 'Siemens Service', certificate: 'CERT/MRI/2025/003', status: 'Valid' },
      { id: 'cal3', equipment: 'X-Ray - Digital', type: 'kVp / mA Accuracy', calibrationDate: '2025-02-10', nextDue: '2025-08-10', agency: 'Biomedical Eng.', certificate: 'CERT/XRAY/2025/012', status: 'Due Soon' },
      { id: 'cal4', equipment: 'Digital Mammography', type: 'Density Control', calibrationDate: '2024-12-01', nextDue: '2025-06-01', agency: 'GE Healthcare', certificate: 'CERT/MAMMO/2024/005', status: 'Overdue' },
      { id: 'cal5', equipment: 'Ultrasound - 4D', type: 'Output Power / B-Mode', calibrationDate: '2025-05-01', nextDue: '2026-05-01', agency: 'Philips Service', certificate: 'CERT/USG/2025/008', status: 'Valid' }
    ];
  });
  const [isAddCalibModalOpen, setIsAddCalibModalOpen] = useState(false);
  const [calibFormData, setCalibFormData] = useState({
    equipment: '', type: '', calibrationDate: '', nextDue: '', agency: '', certificate: '', status: 'Valid', remarks: ''
  });
  const [maintenanceRecords, setMaintenanceRecords] = useState(() => {
    const s = localStorage.getItem('rad_maintenance');
    return s ? JSON.parse(s) : [
      { id: 'mnt1', equipment: 'CT Scanner - 128 Slice', type: 'Preventive Maintenance', scheduledDate: '2025-06-01', completedDate: '2025-06-01', technician: 'Mr. Ramesh (Biomedical)', status: 'Completed', remarks: 'Routine PPM  all parameters normal' },
      { id: 'mnt2', equipment: 'MRI - 1.5T', type: 'Preventive Maintenance', scheduledDate: '2025-06-15', completedDate: '', technician: 'Siemens Service Eng.', status: 'Scheduled', remarks: 'Annual PPM  cryogen top-up required' },
      { id: 'mnt3', equipment: 'X-Ray - Digital', type: 'Tube Replacement', scheduledDate: '2025-05-20', completedDate: '2025-05-20', technician: 'Biomedical Team', status: 'Completed', remarks: 'X-ray tube replaced after 120k exposures' },
      { id: 'mnt4', equipment: 'Digital Mammography', type: 'Compression Pad Replacement', scheduledDate: '2025-05-10', completedDate: '2025-05-10', technician: 'GE Service', status: 'Completed', remarks: 'Routine maintenance' }
    ];
  });
  const [isAddMaintenanceModalOpen, setIsAddMaintenanceModalOpen] = useState(false);
  const [maintenanceFormData, setMaintenanceFormData] = useState({
    equipment: '', type: '', scheduledDate: '', nextDue: '', technician: '', status: 'Scheduled', remarks: ''
  });
  const [breakdownRecords, setBreakdownRecords] = useState(() => {
    const s = localStorage.getItem('rad_breakdown');
    return s ? JSON.parse(s) : [
      { id: 'bd1', equipment: 'CT Scanner - 128 Slice', breakdownDate: '2025-04-10', reportedBy: 'Mr. Amit Verma', faultDescription: 'Gantry rotation error  intermittent stoppage during helical scan', actionTaken: 'Encoder calibration performed; gantry bearing inspected', resolvedDate: '2025-04-11', downtimeHours: 8, status: 'Resolved' },
      { id: 'bd2', equipment: 'X-Ray - Digital', breakdownDate: '2025-03-22', reportedBy: 'Ms. Priya Sharma', faultDescription: 'Flat panel detector dead pixels  image artifacts in chest X-rays', actionTaken: 'Detector replaced under warranty', resolvedDate: '2025-03-24', downtimeHours: 24, status: 'Resolved' },
      { id: 'bd3', equipment: 'MRI - 1.5T', breakdownDate: '2025-05-28', reportedBy: 'Dr. Rajesh Kumar', faultDescription: 'Gradient coil overheating  scan aborted mid-sequence', actionTaken: 'Cooling system serviced; gradient coil checked', resolvedDate: '', downtimeHours: 4, status: 'Open' },
      { id: 'bd4', equipment: 'Ultrasound - 4D', breakdownDate: '2025-02-15', reportedBy: 'Ms. Lisa Thomas', faultDescription: 'Transducer cable fraying  intermittent signal loss', actionTaken: 'Transducer replaced', resolvedDate: '2025-02-15', downtimeHours: 2, status: 'Resolved' }
    ];
  });
  const [isAddBreakdownModalOpen, setIsAddBreakdownModalOpen] = useState(false);
  const [breakdownFormData, setBreakdownFormData] = useState({
    equipment: '', breakdownDate: '', faultDescription: '', reportedBy: '', severity: 'Medium', downtimeHours: '', status: 'Open', remarks: ''
  });

  const [capaItems, setCapaItems] = useState(() => {
    const s = localStorage.getItem('rad_capa_items');
    return s ? JSON.parse(s) : [
      { id: 'capa1', source: 'Radiation Safety Audit', issue: 'Monthly TLD report not submitted to RSO within due date', rootCause: 'Administrative delay in report consolidation', correctiveAction: 'Report submitted to RSO with explanation', preventiveAction: 'Automated monthly reminder set for TLD submission', responsible: 'Radiology Incharge', dueDate: '2025-06-15', status: 'Open', createdAt: '2025-05-20' },
      { id: 'capa2', source: 'Equipment Calibration Audit', issue: 'X-Ray unit kVp calibration shows 2% deviation from baseline', rootCause: 'Aging X-ray tube', correctiveAction: 'Calibration completed immediately by vendor', preventiveAction: 'Pre-book calibration slot 30 days before expiry', responsible: 'Biomedical Engineer', dueDate: '2025-06-10', status: 'Investigation', createdAt: '2025-05-15' },
      { id: 'capa3', source: 'Infection Control Audit', issue: 'Hand hygiene compliance observed at 78% vs target 95%', rootCause: 'Staff not practicing during high workload', correctiveAction: 'Refresher training conducted for all staff', preventiveAction: 'Hand hygiene posters placed at all entry points; monthly audits', responsible: 'Infection Control Nurse', dueDate: '2025-06-20', status: 'Corrective Action', createdAt: '2025-05-28' },
      { id: 'capa4', source: 'Radiology Incident Report', issue: 'CT scanner gantry rotation error during helical scan', rootCause: 'Encoder calibration drift', correctiveAction: 'Encoder recalibrated; gantry bearing inspected', preventiveAction: 'Weekly functional check added to PPM schedule', responsible: 'Biomedical Engineer', dueDate: '2025-06-05', status: 'Preventive Action', createdAt: '2025-04-10' },
      { id: 'capa5', source: 'Staff Observation', issue: 'One radiographer overdue for annual dosimeter reading', rootCause: 'Lack of awareness on submission deadline', correctiveAction: 'Dosimeter reading completed; counseling done', preventiveAction: 'Automated alerts 15 days before due date', responsible: 'Radiology Incharge', dueDate: '2025-05-30', status: 'Verification', createdAt: '2025-05-20' },
      { id: 'capa6', source: 'Infection Control Audit', issue: 'Lead apron storage area shows minor tear on 2 aprons', rootCause: 'Normal wear and tear; no periodic inspection schedule', correctiveAction: 'Damaged aprons replaced', preventiveAction: 'Quarterly apron inspection checklist introduced', responsible: 'Radiology Incharge', dueDate: '2025-06-25', status: 'Closed', createdAt: '2025-05-28' }
    ];
  });
  const [selectedCapa, setSelectedCapa] = useState(null);

  useEffect(() => { localStorage.setItem('rad_capa_items', JSON.stringify(capaItems)); }, [capaItems]);
  useEffect(() => { localStorage.setItem('rad_maintenance', JSON.stringify(maintenanceRecords)); }, [maintenanceRecords]);
  useEffect(() => { localStorage.setItem('rad_breakdown', JSON.stringify(breakdownRecords)); }, [breakdownRecords]);

  const equipKpiData = {
    totalEquipment: equipment.length,
    calibrationDue: calibrationRecords.filter(c => c.status === 'Due Soon' || c.status === 'Overdue').length,
    maintenanceDue: maintenanceRecords.filter(m => m.status === 'Scheduled' || m.status === 'Overdue').length,
    downtimeHours: breakdownRecords.reduce((sum, b) => sum + (b.downtimeHours || 0), 0)
  };

  const EQUIP_SAFETY_TABS = [
    { id: 'equip-dashboard', label: 'Dashboard', icon: 'BookOpen' },
    { id: 'inventory', label: 'Equipment Inventory', icon: 'Settings' },
    { id: 'calibration', label: 'Calibration Register', icon: 'CheckCircle' },
    { id: 'maintenance', label: 'Preventive Maintenance', icon: 'Clipboard' },
    { id: 'breakdown', label: 'Breakdown Register', icon: 'AlertTriangle' }
  ];

  useEffect(() => { localStorage.setItem('rad_tld_badges', JSON.stringify(tldBadges)); }, [tldBadges]);
  useEffect(() => { localStorage.setItem('rad_monitoring', JSON.stringify(monitoringRecords)); }, [monitoringRecords]);
  useEffect(() => { localStorage.setItem('rad_rad_audits', JSON.stringify(radSafetyAudits)); }, [radSafetyAudits]);
  useEffect(() => { localStorage.setItem('rad_aer_docs', JSON.stringify(aerDocs)); }, [aerDocs]);

  const radKpiData = {
    totalStaffMonitored: tldBadges.length,
    activeBadges: tldBadges.filter(b => b.status === 'Active').length,
    exposureAlerts: monitoringRecords.filter(r => r.status === 'Alert').length,
    openFindings: radSafetyAudits.filter(a => a.findings > 0 && a.status !== 'Closed').length
  };

  const RADIOLOGY_SAFETY_TABS = [
    { id: 'dashboard', label: 'Dashboard', icon: 'BookOpen' },
    { id: 'tld-badges', label: 'TLD Badge Register', icon: 'Clipboard' },
    { id: 'monitoring', label: 'Radiation Monitoring', icon: 'Activity' },
    { id: 'audits', label: 'Radiation Safety Audits', icon: 'Search' },
    { id: 'aer-docs', label: 'AERB Documents', icon: 'FileText' }
  ];

  useEffect(() => { localStorage.setItem('rad_custom_policies', JSON.stringify(customized)); }, [customized]);

  useEffect(() => { localStorage.setItem('rad_policies', JSON.stringify(policies)); }, [policies]);
  useEffect(() => { localStorage.setItem('rad_incidents', JSON.stringify(incidents)); }, [incidents]);
  useEffect(() => { localStorage.setItem('rad_equipment', JSON.stringify(equipment)); }, [equipment]);
  useEffect(() => { localStorage.setItem('rad_calibration', JSON.stringify(calibrationRecords)); }, [calibrationRecords]);
  useEffect(() => { localStorage.setItem('rad_training', JSON.stringify(training)); }, [training]);
  useEffect(() => { localStorage.setItem('rad_audit_templates', JSON.stringify(auditTemplates)); }, [auditTemplates]);
  useEffect(() => { localStorage.setItem('rad_audit_schedule', JSON.stringify(auditSchedule)); }, [auditSchedule]);
  useEffect(() => { localStorage.setItem('rad_audit_findings', JSON.stringify(auditFindings)); }, [auditFindings]);
  useEffect(() => { localStorage.setItem('rad_non_conformities', JSON.stringify(nonConformities)); }, [nonConformities]);

  const auditKpiData = {
    totalTemplates: auditTemplates.length,
    scheduled: auditSchedule.filter(a => a.status === 'Scheduled').length,
    completed: auditSchedule.filter(a => a.status === 'Completed').length,
    openFindings: auditFindings.filter(f => f.status === 'Open').length,
    underCapa: auditFindings.filter(f => f.status === 'Under CAPA').length,
    closedFindings: auditFindings.filter(f => f.status === 'Closed').length,
    totalNC: nonConformities.length,
    openNC: nonConformities.filter(n => n.status === 'Open').length,
    closedNC: nonConformities.filter(n => n.status === 'Closed').length,
    complianceRate: 87
  };

  const AUDIT_TABS = [
    { id: 'audit-dashboard', label: 'Dashboard', icon: 'BookOpen' },
    { id: 'audit-templates', label: 'Audit Templates', icon: 'FileText' },
    { id: 'audit-schedule', label: 'Audit Schedule', icon: 'Calendar' },
    { id: 'audit-findings', label: 'Findings', icon: 'Search' },
    { id: 'non-conformities', label: 'Non-Conformities', icon: 'AlertTriangle' }
  ];

  useEffect(() => { localStorage.setItem('rad_audits', JSON.stringify(audits)); }, [audits]);
  useEffect(() => { localStorage.setItem('rad_capa', JSON.stringify(capa)); }, [capa]);
  useEffect(() => { localStorage.setItem('rad_statutory', JSON.stringify(statutory)); }, [statutory]);

  const kpiData = {
    totalIncidents: incidents.length,
    equipmentOperational: equipment.filter(e => e.status === 'Operational').length,
    equipmentTotal: equipment.length,
    trainingCompleted: training.length,
    auditScore: audits.length > 0 ? Math.round(audits.reduce((a, b) => a + b.score, 0) / audits.length) : 0,
    openCapa: capa.filter(c => c.status === 'Open').length,
    statutoryCompliant: statutory.filter(s => s.status === 'Compliant').length,
    statutoryTotal: statutory.length
  };

  const TabIcon = ({ icon }) => {
    const LucideIcon = ICON_MAP[icon] || BookOpen;
    return <LucideIcon className="w-3.5 h-3.5 shrink-0" />;
  };

  const activePolicyModule = DEFAULT_RADIOLOGY_MODULES.find(m => m.id === activePolicyModuleId);
  const customData = customized[activePolicyModuleId];
  const displayClauses = customData?.clauses || (activePolicyModule?.clauses || []);
  const isCustomized = !!customData;

  const handleStartEdit = () => {
    setEditContent(displayClauses.join('\n'));
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const updatedClauses = editContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    const updated = { ...customized, [activePolicyModuleId]: { clauses: updatedClauses } };
    setCustomized(updated);
    setIsEditing(false);
  };

  const handleResetToDefault = () => {
    if (window.confirm(`Reset "${activePolicyModule?.label}" to the NABH standard template? Your customizations will be lost.`)) {
      const updated = { ...customized };
      delete updated[activePolicyModuleId];
      setCustomized(updated);
      setIsEditing(false);
    }
  };

  const [aerLicenses, setAerLicenses] = useState(() => {
    const s = localStorage.getItem("rad_aer_licenses");
    return s ? JSON.parse(s) : [
      { id: "aer1", name: "AERB Radiology Department License", no: "AERB/RAD-2024/001", issued: "2024-01-01", expiry: "2026-01-01", status: "Valid" },
      { id: "aer2", name: "Radiation Worker Registration", no: "AERB/RW-2024/045", issued: "2024-02-01", expiry: "2026-02-01", status: "Valid" },
      { id: "aer3", name: "CT Scanner Type Approval", no: "AERB/ETA/CT/2023/012", issued: "2023-06-01", expiry: "2026-06-01", status: "Expiring Soon" },
      { id: "aer4", name: "MRI Type Approval", no: "AERB/ETA/MRI/2023/008", issued: "2023-05-15", expiry: "2026-05-15", status: "Valid" },
      { id: "aer5", name: "X-Ray Type Approval", no: "AERB/ETA/XRAY/2023/015", issued: "2023-07-01", expiry: "2025-07-01", status: "Overdue" }
    ];
  });
  const [pcpndtRegs, setPcpndtRegs] = useState(() => {
    const s = localStorage.getItem("rad_pcpndt_regs");
    return s ? JSON.parse(s) : [
      { id: "pcp1", center: "Radiology Prenatal Imaging Center", registration: "DL/PC/2024/001", issued: "2024-03-01", expiry: "2026-03-01", status: "Valid" },
      { id: "pcp2", name: "Genetic Clinic Registration", registration: "DL/GC/2024/007", issued: "2024-04-15", expiry: "2026-04-15", status: "Valid" },
      { id: "pcp3", name: "Ultrasound Machine Registration", registration: "DL/USG/2023/012", issued: "2024-05-20", expiry: "2025-05-20", status: "Expiring Soon" }
    ];
  });
  const [vendorAgreements, setVendorAgreements] = useState(() => {
    const s = localStorage.getItem("rad_vendor_agreements");
    return s ? JSON.parse(s) : [
      { id: "v1", vendor: "Siemens Healthineers", type: "Annual Maintenance Contract", equipment: "CT Scanner", start: "2024-06-01", expiry: "2026-06-01", status: "Valid" },
      { id: "v2", vendor: "Siemens Healthineers", type: "Annual Maintenance Contract", equipment: "MRI - 1.5T", start: "2024-06-01", expiry: "2025-06-01", status: "Expiring Soon" },
      { id: "v3", vendor: "Philips Healthcare", type: "Service Agreement", equipment: "Ultrasound", start: "2024-07-01", expiry: "2025-07-01", status: "Valid" },
      { id: "v4", vendor: "GE Healthcare", type: "Calibration Agreement", equipment: "Mammography", start: "2024-05-15", expiry: "2025-12-15", status: "Valid" },
      { id: "v5", vendor: "Carestream", type: "Reagent Supply", equipment: "X-Ray Films", start: "2024-01-01", expiry: "2025-05-30", status: "Overdue" }
    ];
  });
  const [regDocuments, setRegDocuments] = useState(() => {
    const s = localStorage.getItem("rad_reg_documents");
    return s ? JSON.parse(s) : [
      { id: "rd1", name: "AERB License - Radiology Department", no: "AERB/RAD/2024/001", issued: "2024-01-01", expiry: "2026-01-01", status: "Valid" },
      { id: "rd2", name: "Radiation Worker Registration Certificate", no: "AERB/RW/2024/045", issued: "2024-02-01", expiry: "2026-02-01", status: "Valid" },
      { id: "rd3", name: "RSO Appointment Letter", no: "ADM/RSO/2024/01", issued: "2024-01-15", expiry: "2027-01-15", status: "Valid" },
      { id: "rd4", name: "CPMNDT Registration Certificate", no: "DL/PC/2024/001", issued: "2024-03-01", expiry: "2026-03-01", status: "Valid" },
      { id: "rd5", name: "PCPNDT Operational Guidelines", no: "MOHFW/PCP/2024/001", issued: "2024-01-01", expiry: "2027-01-01", status: "Valid" },
      { id: "rd6", name: "Radiation Safety Manual", no: "RAD/RSM/2024/001", issued: "2024-01-01", expiry: "2027-01-01", status: "Valid" },
      { id: "rd7", name: "MRI Safety SOP", no: "POL-RAD-002", issued: "2024-03-15", expiry: "2027-03-15", status: "Valid" },
      { id: "rd8", name: "AERB Inspection Report 2024", no: "AERB/INS/2024/003", issued: "2024-12-01", expiry: "2029-12-01", status: "Valid" }
    ];
  });

  useEffect(() => { localStorage.setItem("rad_aer_licenses", JSON.stringify(aerLicenses)); }, [aerLicenses]);
  useEffect(() => { localStorage.setItem("rad_pcpndt_regs", JSON.stringify(pcpndtRegs)); }, [pcpndtRegs]);
  useEffect(() => { localStorage.setItem("rad_vendor_agreements", JSON.stringify(vendorAgreements)); }, [vendorAgreements]);
  useEffect(() => { localStorage.setItem("rad_statutory", JSON.stringify(statutory)); }, [statutory]);
  useEffect(() => { localStorage.setItem("rad_reg_documents", JSON.stringify(regDocuments)); }, [regDocuments]);

  const statutoryKpiData = {
    totalLicenses: aerLicenses.length,
    validLicenses: aerLicenses.filter(l => l.status === "Valid").length,
    expiringLicenses: aerLicenses.filter(l => l.status === "Expiring Soon").length,
    overdueLicenses: aerLicenses.filter(l => l.status === "Overdue").length,
    totalPCPNDT: pcpndtRegs.length,
    compliantPCPNDT: pcpndtRegs.filter(p => p.status === "Valid").length,
    totalVendor: vendorAgreements.length,
    activeVendor: vendorAgreements.filter(v => v.status === "Valid").length,
    totalRegDocs: regDocuments.length,
    compliantDocs: regDocuments.filter(d => d.status === "Valid").length
  };

  const isExpiringSoon = (dateStr) => {
    const today = new Date();
    const target = new Date(dateStr);
    const diffDays = (target - today) / (1000 * 60 * 60 * 24);
    return diffDays > 0 && diffDays <= 90;
  };
  const isOverdue = (dateStr) => new Date(dateStr) < new Date();

  const statusClass = (status) => {
    if (status === "Valid" || status === "Compliant") return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    if (status === "Expiring Soon") return "bg-amber-50 text-amber-700 border border-amber-200";
    return "bg-rose-50 text-rose-700 border border-rose-200";
  };

  const [evidenceFiles, setEvidenceFiles] = useState(() => {
    const s = localStorage.getItem('rad_evidence_files');
    return s ? JSON.parse(s) : [
      { id: 'ev1', name: 'AERB License Renewal 2025', folder: 'AERB Documents', type: 'PDF', size: '2.4 MB', date: '2025-05-20', tags: ['License', 'AERB', 'Renewal'], linkedTo: 'Statutory Compliance', uploadedBy: 'Radiology Incharge' },
      { id: 'ev2', name: 'CT Scanner Calibration Cert', folder: 'Calibration Certificates', type: 'PDF', size: '1.1 MB', date: '2025-05-15', tags: ['Calibration', 'CT', 'AERB'], linkedTo: 'Equipment Management', uploadedBy: 'Biomedical Engineer' },
      { id: 'ev3', name: 'Radiation Safety Audit May 2025', folder: 'Audit Reports', type: 'PDF', size: '4.2 MB', date: '2025-05-30', tags: ['Audit', 'Radiation', 'Monthly'], linkedTo: 'Internal Audits', uploadedBy: 'RSO / Dr. Mehta' },
      { id: 'ev4', name: 'Area Monitoring Report CT Room', folder: 'Radiation Monitoring', type: 'Excel', size: '856 KB', date: '2025-05-28', tags: ['Monitoring', 'Area', 'CT'], linkedTo: 'Radiation Safety', uploadedBy: 'Radiation Safety Officer' },
      { id: 'ev5', name: 'ALARA Training Attendance May', folder: 'Training Records', type: 'PDF', size: '1.5 MB', date: '2025-05-10', tags: ['Training', 'ALARA', 'Attendance'], linkedTo: 'Staff & Training', uploadedBy: 'Infection Control Nurse' },
      { id: 'ev6', name: 'CAPA Root Cause Analysis - kVp', folder: 'CAPA Evidence', type: 'PDF', size: '3.6 MB', date: '2025-05-18', tags: ['CAPA', 'Root Cause', 'Equipment'], linkedTo: 'CAPA Management', uploadedBy: 'Biomedical Engineer' },
      { id: 'ev7', name: 'MRI Type Approval Certificate', folder: 'AERB Documents', type: 'PDF', size: '1.8 MB', date: '2025-04-12', tags: ['MRI', 'Type Approval', 'AERB'], linkedTo: 'Statutory Compliance', uploadedBy: 'Radiology Incharge' },
      { id: 'ev8', name: 'Mammography QC Test Results', folder: 'Calibration Certificates', type: 'Excel', size: '920 KB', date: '2025-05-22', tags: ['Mammography', 'QC', 'Calibration'], linkedTo: 'Equipment Management', uploadedBy: 'Biomedical Engineer' },
      { id: 'ev9', name: 'Quarterly NABH Mock Audit', folder: 'Audit Reports', type: 'PDF', size: '5.1 MB', date: '2025-05-25', tags: ['NABH', 'Mock Audit', 'Quarterly'], linkedTo: 'Internal Audits', uploadedBy: 'Quality Manager' },
      { id: 'ev10', name: 'Personal Dosimeter Reading Apr', folder: 'Radiation Monitoring', type: 'PDF', size: '640 KB', date: '2025-04-30', tags: ['Dosimeter', 'Personal', 'TLD'], linkedTo: 'Radiation Safety', uploadedBy: 'RSO' },
      { id: 'ev11', name: 'CT Safety Certification 2025', folder: 'Training Records', type: 'PDF', size: '2.2 MB', date: '2025-04-05', tags: ['CT', 'Certification', 'Safety'], linkedTo: 'Staff & Training', uploadedBy: 'Dr. Rajesh Kumar' },
      { id: 'ev12', name: 'CAPA Verification Report - Aprons', folder: 'CAPA Evidence', type: 'PDF', size: '1.9 MB', date: '2025-05-05', tags: ['CAPA', 'Verification', 'Infection Control'], linkedTo: 'CAPA Management', uploadedBy: 'Radiology Incharge' }
    ];
  });

  const [evidenceFolders] = useState([
    { id: 'aer_docs', name: 'AERB Documents', icon: 'Shield', color: 'text-amber-600', count: 2 },
    { id: 'calibration', name: 'Calibration Certificates', icon: 'CheckCircle', color: 'text-emerald-600', count: 2 },
    { id: 'audit_reports', name: 'Audit Reports', icon: 'FileText', color: 'text-blue-600', count: 2 },
    { id: 'rad_monitoring', name: 'Radiation Monitoring', icon: 'Activity', color: 'text-purple-600', count: 2 },
    { id: 'training', name: 'Training Records', icon: 'Users', color: 'text-sky-600', count: 2 },
    { id: 'capa_evidence', name: 'CAPA Evidence', icon: 'AlertTriangle', color: 'text-rose-600', count: 2 }
  ]);

  const [activeEvidenceFolder, setActiveEvidenceFolder] = useState('all');
  const [evidenceSearch, setEvidenceSearch] = useState('');
  const [evidenceFilterType, setEvidenceFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => { localStorage.setItem('rad_evidence_files', JSON.stringify(evidenceFiles)); }, [evidenceFiles]);

  const [reports, setReports] = useState(() => {
    const s = localStorage.getItem('rad_reports');
    return s ? JSON.parse(s) : [
      { id: 'r1', name: 'Monthly Radiology Report', category: 'Operations', date: '2025-05-01', author: 'Radiology Incharge', pages: 24, status: 'Published', type: 'Monthly', tags: ['Monthly', 'Operations', 'Summary'], summary: 'Comprehensive monthly summary covering patient volumes, TAT compliance, equipment uptime, staffing, and key quality indicators for the radiology department.' },
      { id: 'r2', name: 'Radiation Safety Report', category: 'Compliance', date: '2025-05-15', author: 'RSO / Dr. Mehta', pages: 18, status: 'Published', type: 'Monthly', tags: ['Radiation', 'Safety', 'AERB', 'TLD'], summary: 'Radiation exposure monitoring, TLD badge compliance status, area monitoring results, ALARA adherence, and AERB regulatory compliance for the reporting period.' },
      { id: 'r3', name: 'Equipment Performance Report', category: 'Operations', date: '2025-05-20', author: 'Biomedical Engineer', pages: 32, status: 'Published', type: 'Quarterly', tags: ['Equipment', 'PPM', 'Calibration', 'Downtime'], summary: 'Equipment uptime analysis, preventive maintenance adherence, calibration status, breakdown history, and vendor performance metrics across all radiology modalities.' },
      { id: 'r4', name: 'Internal Audit Report', category: 'Compliance', date: '2025-05-30', author: 'Quality Manager', pages: 45, status: 'Draft', type: 'Quarterly', tags: ['Audit', 'NABH', 'Findings', 'CAPA'], summary: 'Internal audit findings against NABH standards, non-conformities identified, CAPA status, corrective actions taken, and overall compliance score for the quarter.' },
      { id: 'r5', name: 'CAPA Report', category: 'Quality', date: '2025-05-28', author: 'Radiology Incharge', pages: 16, status: 'Published', type: 'Monthly', tags: ['CAPA', 'Corrective', 'Preventive', 'Verification'], summary: 'CAPA register status, open investigations, corrective and preventive actions implemented, verification results, effectiveness checks, and closure timeline.' },
      { id: 'r6', name: 'Quality Indicator Report', category: 'Quality', date: '2025-05-25', author: 'Quality Manager', pages: 28, status: 'Published', type: 'Monthly', tags: ['QPI', 'Quality', 'Performance', 'Targets'], summary: 'Department-wise quality performance metrics, target vs actual comparison, trend analysis, re-do rates, error rates, waiting times, and TAT compliance across modalities.' }
    ];
  });

  const [selectedReport, setSelectedReport] = useState(null);
  const [reportFormat, setReportFormat] = useState('pdf');
  const [reportViewMode, setReportViewMode] = useState('overview');

  useEffect(() => { localStorage.setItem('rad_reports', JSON.stringify(reports)); }, [reports]);

  const reportCategories = ['All', 'Operations', 'Compliance', 'Quality'];
  const [filterCategory, setFilterCategory] = useState('All');
  const [reportSearch, setReportSearch] = useState('');

  const filteredReports = reports
    .filter(r => filterCategory === 'All' || r.category === filterCategory)
    .filter(r => reportSearch === '' || r.name.toLowerCase().includes(reportSearch.toLowerCase()) || r.tags.some(t => t.toLowerCase().includes(reportSearch.toLowerCase())));

  const statusConfig = {
    Published: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
    Draft: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
    'In Review': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' }
  };

  const categoryIcons = {
    Operations: <Settings className="w-4 h-4 text-sky-600" />,
    Compliance: <Shield className="w-4 h-4 text-emerald-600" />,
    Quality: <CheckCircle className="w-4 h-4 text-purple-600" />
  };

  const previewCharts = {
    'r1': { title: 'Patient Volume Trend', data: 'Jan: 1,240  Feb: 1,180  Mar: 1,310  Apr: 1,275  May: 1,340', trend: 'up' },
    'r2': { title: 'Radiation Exposure (mSv)', data: 'Staff Avg: 1.85  Patient Avg: 0.42  Area Max: 0.18', trend: 'down' },
    'r3': { title: 'Equipment Uptime %', data: 'CT Scanner: 97.2%  MRI: 96.8%  X-Ray: 94.5%  USG: 98.1%', trend: 'stable' },
    'r4': { title: 'Audit Compliance Score', data: 'Overall: 87%  Up from 82% last quarter', trend: 'up' },
    'r5': { title: 'CAPA Closure Rate', data: 'Total: 24  Closed: 18  Open: 6  Avg Closure: 18 days', trend: 'up' },
    'r6': { title: 'Quality Indicators', data: 'Error Rate: 1.8%  Re-Do: 3.2%  Safety: 96.4%  Wait: 24 min', trend: 'up' }
  };

  const relatedEvidence = {
    'r1': ['ev3', 'ev11'],
    'r2': ['ev4', 'ev10'],
    'r3': ['ev2', 'ev8'],
    'r4': ['ev9'],
    'r5': ['ev6', 'ev12'],
    'r6': ['ev5']
  };

  const getRelatedFiles = (reportId) => {
    const ids = relatedEvidence[reportId] || [];
    return evidenceFiles.filter(f => ids.includes(f.id));
  };

  const handleExport = (report, format) => {
    alert(`Exporting "${report.name}" as ${format.toUpperCase()}...\n\nIn production, this would trigger a real download.`);
  };

  const handleSendForReview = (reportId) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'In Review' } : r));
    alert('Report sent for review.');
  };

  const handlePublish = (reportId) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'Published' } : r));
    alert('Report published successfully.');
  };

  const folderMap = {
    'AERB Documents': 'aer_docs',
    'Calibration Certificates': 'calibration',
    'Audit Reports': 'audit_reports',
    'Radiation Monitoring': 'rad_monitoring',
    'Training Records': 'training',
    'CAPA Evidence': 'capa_evidence'
  };

  const filteredFiles = evidenceFiles
    .filter(f => activeEvidenceFolder === 'all' || f.folder === activeEvidenceFolder)
    .filter(f => evidenceSearch === '' || f.name.toLowerCase().includes(evidenceSearch.toLowerCase()) || f.tags.some(t => t.toLowerCase().includes(evidenceSearch.toLowerCase())))
    .filter(f => evidenceFilterType === 'all' || f.type === evidenceFilterType)
    .sort((a, b) => sortBy === 'date' ? new Date(b.date) - new Date(a.date) : a.name.localeCompare(b.name));

  const folderFileCounts = {
    'AERB Documents': evidenceFiles.filter(f => f.folder === 'AERB Documents').length,
    'Calibration Certificates': evidenceFiles.filter(f => f.folder === 'Calibration Certificates').length,
    'Audit Reports': evidenceFiles.filter(f => f.folder === 'Audit Reports').length,
    'Radiation Monitoring': evidenceFiles.filter(f => f.folder === 'Radiation Monitoring').length,
    'Training Records': evidenceFiles.filter(f => f.folder === 'Training Records').length,
    'CAPA Evidence': evidenceFiles.filter(f => f.folder === 'CAPA Evidence').length
  };

  const typeIcons = {
    PDF: <FileText className="w-4 h-4 text-rose-500" />,
    Excel: <FileText className="w-4 h-4 text-emerald-500" />,
    Word: <FileText className="w-4 h-4 text-blue-500" />,
    Image: <FileText className="w-4 h-4 text-purple-500" />
  };

  // ── AERB Document Modal State ──────────────────────────────────────────────
  const [isAddAerDocModalOpen, setIsAddAerDocModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedAerDoc, setSelectedAerDoc] = useState(null);
  const [aerDocFormData, setAerDocFormData] = useState({
    title: '', documentNo: '', issueDate: '', expiryDate: '', status: 'Valid', file: null
  });

  const handleUploadAerDoc = (e) => {
    e.preventDefault();
    const fileUrl = aerDocFormData.file ? URL.createObjectURL(aerDocFormData.file) : null;
    const newDoc = {
      id: `a${Date.now()}`,
      title: aerDocFormData.title,
      documentNo: aerDocFormData.documentNo,
      issueDate: aerDocFormData.issueDate,
      expiryDate: aerDocFormData.expiryDate,
      status: aerDocFormData.status,
      fileUrl
    };
    setAerDocs(prev => [...prev, newDoc]);
    setAerDocFormData({ title: '', documentNo: '', issueDate: '', expiryDate: '', status: 'Valid', file: null });
    setIsAddAerDocModalOpen(false);
  };
  // ──────────────────────────────────────────────────────────────────────────

  const handleAddEquipment = (e) => {
    e.preventDefault();
    const newEquip = {
      id: `e${Date.now()}`,
      name: equipFormData.name,
      type: equipFormData.type,
      manufacturer: equipFormData.manufacturer,
      model: equipFormData.model,
      serialNumber: equipFormData.serialNumber,
      installationDate: equipFormData.installationDate,
      ppmDue: '',
      calibrationDue: '',
      location: equipFormData.location,
      status: equipFormData.status
    };
    setEquipment(prev => [...prev, newEquip]);
    setEquipFormData({ name: '', type: '', manufacturer: '', model: '', serialNumber: '', installationDate: '', location: '', status: 'Operational' });
    setIsAddEquipModalOpen(false);
  };
  // ── Add Calibration Modal State ───────────────────────────────────────
  const handleAddCalibration = (e) => {
    e.preventDefault();
    const newCalib = {
      id: `cal${Date.now()}`,
      equipment: calibFormData.equipment,
      type: calibFormData.type,
      calibrationDate: calibFormData.calibrationDate,
      nextDue: calibFormData.nextDue,
      agency: calibFormData.agency,
      certificate: calibFormData.certificate,
      status: calibFormData.status,
      remarks: calibFormData.remarks
    };
    setCalibrationRecords(prev => [...prev, newCalib]);
    setCalibFormData({ equipment: '', type: '', calibrationDate: '', nextDue: '', agency: '', certificate: '', status: 'Valid', remarks: '' });
    setIsAddCalibModalOpen(false);
  };
  // ──────────────────────────────────────────────────────────────────────────
  const [isAddAuditModalOpen, setIsAddAuditModalOpen] = useState(false);
  const [auditFormData, setAuditFormData] = useState({
    title: '', date: '', auditor: '', scope: '', findings: 0, status: 'Planned', remarks: ''
  });

  const handleAddAudit = (e) => {
    e.preventDefault();
    const newAudit = {
      id: `ra${Date.now()}`,
      title: auditFormData.title,
      date: auditFormData.date,
      auditor: auditFormData.auditor,
      scope: auditFormData.scope,
      findings: Number(auditFormData.findings),
      status: auditFormData.status,
      remarks: auditFormData.remarks,
      score: 0
    };
    setRadSafetyAudits(prev => [...prev, newAudit]);
    setAuditFormData({ title: '', date: '', auditor: '', scope: '', findings: 0, status: 'Planned', remarks: '' });
    setIsAddAuditModalOpen(false);
  };
  // ── Maintenance Modal State ───────────────────────────────────────────
  const handleAddMaintenance = (e) => {
    e.preventDefault();
    const newMaintenance = {
      id: `mnt${Date.now()}`,
      equipment: maintenanceFormData.equipment,
      type: maintenanceFormData.type,
      scheduledDate: maintenanceFormData.scheduledDate,
      nextDue: maintenanceFormData.nextDue,
      technician: maintenanceFormData.technician,
      status: maintenanceFormData.status,
      remarks: maintenanceFormData.remarks,
      completedDate: ''
    };
    setMaintenanceRecords(prev => [...prev, newMaintenance]);
    setMaintenanceFormData({ equipment: '', type: '', scheduledDate: '', nextDue: '', technician: '', status: 'Scheduled', remarks: '' });
    setIsAddMaintenanceModalOpen(false);
  };
  // ── Breakdown Modal State ───────────────────────────────────────────────
  const handleAddBreakdown = (e) => {
    e.preventDefault();
    const newBreakdown = {
      id: `bd${Date.now()}`,
      equipment: breakdownFormData.equipment,
      breakdownDate: breakdownFormData.breakdownDate,
      reportedBy: breakdownFormData.reportedBy,
      faultDescription: breakdownFormData.faultDescription,
      severity: breakdownFormData.severity,
      downtimeHours: Number(breakdownFormData.downtimeHours) || 0,
      status: breakdownFormData.status,
      remarks: breakdownFormData.remarks,
      actionTaken: '',
      resolvedDate: ''
    };
    setBreakdownRecords(prev => [...prev, newBreakdown]);
    setBreakdownFormData({ equipment: '', breakdownDate: '', faultDescription: '', reportedBy: '', severity: 'Medium', downtimeHours: '', status: 'Open', remarks: '' });
    setIsAddBreakdownModalOpen(false);
  };
  // ──────────────────────────────────────────────────────────────────────────

  return (
    <div className="flex gap-0 -m-6 min-h-[calc(100vh-4rem)]">
      <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider cursor-pointer transition-colors group">
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Policies Directory
          </button>
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">Radiology</h2>
          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">NABH Compliance Module</p>
        </div>
        <nav className="flex-1 overflow-y-auto custom-scroll py-3 px-2 space-y-0.5">
          {RADIOLOGY_MODULES.map((mod) => {
            const Icon = ICON_MAP[mod.icon] || BookOpen;
            const isActive = mod.id === activeTab;
            return (
              <button key={mod.id} onClick={() => setActiveTab(mod.id)}
                style={isActive ? { backgroundColor: `${hospital.themeColor}0d`, borderColor: `${hospital.themeColor}22`, color: hospital.themeColor } : {}}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all duration-150 cursor-pointer ${isActive ? 'border-sky-500/20 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[10px] font-semibold truncate">{mod.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-slate-100 space-y-1.5">
          <div className="flex items-center gap-2 text-[8px] text-slate-400 font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 inline-block" /> NABH Standard
          </div>
          <div className="flex items-center gap-2 text-[8px] text-slate-400 font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Hospital Customized
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto custom-scroll bg-slate-50/40 p-6 space-y-5">
        {activeTab === 'overview' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Safety Incidents', value: kpiData.totalIncidents, icon: 'AlertTriangle', color: 'text-rose-600' },
                { label: 'Equipment Operational', value: `${kpiData.equipmentOperational}/${kpiData.equipmentTotal}`, icon: 'Settings', color: 'text-sky-600' },
                { label: 'Training Completed', value: kpiData.trainingCompleted, icon: 'Users', color: 'text-emerald-600' },
                { label: 'Audit Score', value: `${kpiData.auditScore}%`, icon: 'CheckCircle', color: 'text-amber-600' },
                { label: 'Open CAPA', value: kpiData.openCapa, icon: 'AlertTriangle', color: 'text-orange-600' },
                { label: 'Statutory Compliance', value: `${kpiData.statutoryCompliant}/${kpiData.statutoryTotal}`, icon: 'Award', color: 'text-blue-600' }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                      <p className="text-xl font-extrabold text-slate-900 mt-1">{kpi.value}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <TabIcon icon={kpi.icon} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3 mb-4">Department Performance Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Radiation Safety Trend', 'Equipment Uptime', 'Quality Metrics'].map((title, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 h-40 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-[10px] font-bold text-slate-400">{title}</p>
                      <p className="text-[9px] text-slate-400 mt-1">Chart placeholder</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="flex gap-0 -m-6 min-h-[calc(100vh-4rem)]">
            <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col">
              <div className="p-4 border-b border-slate-100">
                <h2 className="text-xs font-extrabold text-slate-900 mt-1">Policies & SOPs</h2>
                <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">NABH Standard Modules</p>
              </div>
              <nav className="flex-1 overflow-y-auto custom-scroll py-3 px-2 space-y-0.5">
                {DEFAULT_RADIOLOGY_MODULES.map((mod) => {
                  const Icon = ICON_MAP_RAD[mod.icon] || BookOpen;
                  const isActive = mod.id === activePolicyModuleId;
                  const isModCustomized = !!customized[mod.id];
                  return (
                    <button key={mod.id} onClick={() => { setActivePolicyModuleId(mod.id); setIsEditing(false); }}
                      style={isActive ? { backgroundColor: `${hospital.themeColor}0d`, borderColor: `${hospital.themeColor}22`, color: hospital.themeColor } : {}}
                      className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl border text-left transition-all duration-150 cursor-pointer ${isActive ? 'border-sky-500/20 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
                      <div className="flex items-center gap-2 min-w-0">
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-[10px] font-semibold truncate">{mod.label}</span>
                      </div>
                      {isModCustomized && <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500" title="Customized" />}
                    </button>
                  );
                })}
              </nav>
              <div className="p-3 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center gap-2 text-[8px] text-slate-400 font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 inline-block" /> NABH Standard
                </div>
                <div className="flex items-center gap-2 text-[8px] text-slate-400 font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Hospital Customized
                </div>
              </div>
            </aside>

            <main className="flex-1 overflow-y-auto custom-scroll bg-slate-50/40 p-6 space-y-5">
              {activePolicyModule && (
                <>
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                            Radiology / {activePolicyModule.label}
                          </span>
                          {isCustomized ? (
                            <span className="px-2 py-0.5 rounded-full text-[8px] font-bold border bg-emerald-50 border-emerald-200 text-emerald-700 uppercase tracking-wider">Hospital Customized</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[8px] font-bold border bg-sky-50 border-sky-200 text-sky-700 uppercase tracking-wider">NABH Standard</span>
                          )}
                        </div>
                        <h1 className="text-base font-extrabold text-slate-900">{activePolicyModule.label} Policy</h1>
                        <p className="text-[11px] text-slate-500 leading-relaxed max-w-2xl">
                          <span className="font-bold text-slate-600">Objective: </span>{activePolicyModule.objective}
                        </p>
                      </div>
                      {!isEditing ? (
                        <div className="flex items-center gap-2 shrink-0">
                          {isCustomized && (
                            <button onClick={handleResetToDefault} className="px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-500 hover:text-rose-600 text-[10px] font-bold cursor-pointer transition-all">Reset to NABH</button>
                          )}
                          <button onClick={handleStartEdit} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white font-bold text-[10px] flex items-center gap-1.5 hover:brightness-95 transition-all cursor-pointer shadow-sm btn-primary">
                            <Edit3 className="w-3.5 h-3.5" /> Customize SOP
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 shrink-0">
                          <button onClick={() => setIsEditing(false)} className="px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-500 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                          <button onClick={handleSaveEdit} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white font-bold text-[10px] flex items-center gap-1.5 hover:brightness-95 transition-all cursor-pointer shadow-sm btn-primary">
                            <Save className="w-3.5 h-3.5" /> Save Changes
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {!isEditing && (
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3">Policy Clauses & Guidelines</h3>
                      <ol className="space-y-3">
                        {displayClauses.map((clause, idx) => (
                          <li key={idx} className="flex gap-3">
                            <span style={{ backgroundColor: `${hospital.themeColor}0d`, color: hospital.themeColor }} className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-extrabold mt-0.5 border border-slate-100">{idx + 1}</span>
                            <p className="text-xs text-slate-700 leading-relaxed">{clause}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {isEditing && (
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                      <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Customize Policy Clauses</h3>
                        <p className="text-[9px] text-slate-400 mt-1">Enter each policy clause on a new line. All edits override the NABH standard template for this hospital.</p>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 rounded-t-xl px-4 py-1.5 flex items-center gap-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Edit Clauses  one per line</span>
                      </div>
                      <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={12} className="w-full px-4 py-3 rounded-b-xl border border-slate-200 border-t-0 text-slate-900 text-xs leading-relaxed font-sans focus:outline-none focus:border-sky-400 custom-scroll resize-none" />
                      <p className="text-[9px] text-slate-400 font-medium">Tip: Each line becomes one numbered policy clause. Empty lines are ignored.</p>
                    </div>
                  )}

                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-wrap items-center gap-6 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    <div><span className="block text-[8px] mb-0.5">Module Scope</span><span className="text-slate-600">Radiology Department</span></div>
                    <div><span className="block text-[8px] mb-0.5">Compliance Framework</span><span className="text-slate-600">NABH / AERB / MoHFW</span></div>
                    <div><span className="block text-[8px] mb-0.5">Review Cycle</span><span className="text-slate-600">Every 3 years / Post-incident</span></div>
                    <div><span className="block text-[8px] mb-0.5">Status</span><span className={isCustomized ? 'text-emerald-600' : 'text-sky-600'}>{isCustomized ? 'Hospital Customized' : 'NABH Standard Template'}</span></div>
                  </div>
                </>
              )}
            </main>
          </div>
        )}

        {activeTab === 'radiation-safety' && (
          <div className="flex gap-0 -m-6 min-h-[calc(100vh-4rem)]">
            <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col">
              <div className="p-4 border-b border-slate-100">
                <button onClick={() => setActiveTab('overview')} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider cursor-pointer transition-colors group">
                  <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  Back
                </button>
                <h2 className="text-xs font-extrabold text-slate-900 mt-2">Radiation Safety</h2>
                <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">TLD & AERB Compliance</p>
              </div>
              <nav className="flex-1 overflow-y-auto custom-scroll py-3 px-2 space-y-0.5">
                {RADIOLOGY_SAFETY_TABS.map((tab) => {
                  const Icon = ICON_MAP[tab.icon] || BookOpen;
                  const isActive = tab.id === activeRadTab;
                  return (
                    <button key={tab.id} onClick={() => setActiveRadTab(tab.id)}
                      style={isActive ? { backgroundColor: `${hospital.themeColor}0d`, borderColor: `${hospital.themeColor}22`, color: hospital.themeColor } : {}}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all duration-150 cursor-pointer ${isActive ? 'border-sky-500/20 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="text-[10px] font-semibold truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            <main className="flex-1 overflow-y-auto custom-scroll bg-slate-50/40 p-6 space-y-5">
              {activeRadTab === 'dashboard' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Total Staff Monitored', value: radKpiData.totalStaffMonitored, icon: 'Users', color: 'text-sky-600' },
                      { label: 'Active TLD Badges', value: radKpiData.activeBadges, icon: 'Shield', color: 'text-emerald-600' },
                      { label: 'Radiation Exposure Alerts', value: radKpiData.exposureAlerts, icon: 'AlertTriangle', color: 'text-rose-600' },
                      { label: 'Open Safety Findings', value: radKpiData.openFindings, icon: 'Search', color: 'text-amber-600' }
                    ].map((kpi, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                            <p className="text-xl font-extrabold text-slate-900 mt-1">{kpi.value}</p>
                          </div>
                          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                            <span className={kpi.color}><strong>{kpi.icon === 'Users' ? '' : kpi.icon === 'Shield' ? '' : kpi.icon === 'AlertTriangle' ? '' : ''}</strong></span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3 mb-4">Radiation Safety Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Staff Exposure Trend', 'Area Monitoring Trend', 'Audit Compliance Trend'].map((title, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 h-40 flex items-center justify-center">
                          <div className="text-center">
                            <BarChart3 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                            <p className="text-[10px] font-bold text-slate-400">{title}</p>
                            <p className="text-[9px] text-slate-400 mt-1">Chart placeholder</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeRadTab === 'tld-badges' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800">TLD Badge Register</h3>
                    <button style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1"><Plus className="w-3 h-3" /> Add Badge</button>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-[10px]">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Staff Name</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Designation</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Badge No.</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Issue Date</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Due Date</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Last Reading</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Cumulative</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Status</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {tldBadges.map(badge => (
                            <tr key={badge.id} className="hover:bg-slate-50/50">
                              <td className="px-4 py-3 text-slate-700 font-medium">{badge.staff}</td>
                              <td className="px-4 py-3 text-slate-700">{badge.designation}</td>
                              <td className="px-4 py-3 text-slate-700 font-mono">{badge.badgeNo}</td>
                              <td className="px-4 py-3 text-slate-700">{badge.issueDate}</td>
                              <td className="px-4 py-3 text-slate-700">{badge.dueDate}</td>
                              <td className="px-4 py-3 text-slate-700">{badge.lastReading}</td>
                              <td className="px-4 py-3 text-slate-700">{badge.cumulative}</td>
                              <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-[8px] font-bold ${badge.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : badge.status === 'Overdue' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>{badge.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeRadTab === 'monitoring' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800">Radiation Monitoring Records</h3>
                    <button style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1"><Plus className="w-3 h-3" /> Record Reading</button>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-[10px]">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Date</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Staff</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Area</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Reading</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Type</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Status</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {monitoringRecords.map(rec => (
                            <tr key={rec.id} className="hover:bg-slate-50/50">
                              <td className="px-4 py-3 text-slate-700">{rec.date}</td>
                              <td className="px-4 py-3 text-slate-700 font-medium">{rec.staff}</td>
                              <td className="px-4 py-3 text-slate-700">{rec.area}</td>
                              <td className="px-4 py-3 text-slate-700 font-mono">{rec.reading}</td>
                              <td className="px-4 py-3 text-slate-700">{rec.type}</td>
                              <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-[8px] font-bold ${rec.status === 'Normal' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>{rec.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeRadTab === 'audits' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800">Radiation Safety Audits</h3>
                    <button onClick={() => setIsAddAuditModalOpen(true)} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1"><Plus className="w-3 h-3" /> New Audit</button>
                  </div>
                  <div className="space-y-3">
                    {radSafetyAudits.map(audit => (
                      <div key={audit.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{audit.title}</h4>
                          <p className="text-[9px] text-slate-500">Date: {audit.date}  Auditor: {audit.auditor}  Scope: {audit.scope}</p>
                          <p className="text-[9px] text-slate-500">Findings: {audit.findings}  Status: {audit.status}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {audit.score > 0 && <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${audit.score >= 80 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>{audit.score}%</span>}
                          <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${audit.status === 'Completed' ? 'bg-sky-50 text-sky-700 border border-sky-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>{audit.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeRadTab === 'aer-docs' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800">AERB Compliance Documents</h3>
                    <button onClick={() => setIsAddAerDocModalOpen(true)} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1"><Upload className="w-3 h-3" /> Upload Document</button>
                  </div>
                  <div className="space-y-3">
                    {aerDocs.map(doc => (
                      <div key={doc.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-slate-50 border border-slate-100"><FileText className="w-4 h-4 text-slate-500" /></div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-800">{doc.title}</h4>
                            <p className="text-[9px] text-slate-500 font-mono">Doc No: {doc.documentNo}</p>
                            <p className="text-[9px] text-slate-500">Issue: {doc.issueDate}  Expiry: {doc.expiryDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${doc.status === 'Valid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : doc.status === 'Expiring Soon' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>{doc.status}</span>
                          <button onClick={() => { setSelectedAerDoc(doc); setViewModalOpen(true); }} className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500"><Eye className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
        )}

        {activeTab === 'equipment' && (
          <div className="flex gap-0 -m-6 min-h-[calc(100vh-4rem)]">
            <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col">
              <div className="p-4 border-b border-slate-100">
                <button onClick={() => setActiveTab('overview')} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider cursor-pointer transition-colors group">
                  <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  Back
                </button>
                <h2 className="text-xs font-extrabold text-slate-900 mt-2">Equipment Management</h2>
                <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">Maintenance & Calibration</p>
              </div>
              <nav className="flex-1 overflow-y-auto custom-scroll py-3 px-2 space-y-0.5">
                {EQUIP_SAFETY_TABS.map((tab) => {
                  const Icon = ICON_MAP[tab.icon] || BookOpen;
                  const isActive = tab.id === activeEquipTab;
                  return (
                    <button key={tab.id} onClick={() => setActiveEquipTab(tab.id)}
                      style={isActive ? { backgroundColor: `${hospital.themeColor}0d`, borderColor: `${hospital.themeColor}22`, color: hospital.themeColor } : {}}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all duration-150 cursor-pointer ${isActive ? 'border-sky-500/20 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="text-[10px] font-semibold truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            <main className="flex-1 overflow-y-auto custom-scroll bg-slate-50/40 p-6 space-y-5">
              {activeEquipTab === 'equip-dashboard' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Total Equipment', value: equipKpiData.totalEquipment, icon: 'Settings', color: 'text-sky-600' },
                      { label: 'Calibration Due', value: equipKpiData.calibrationDue, icon: 'CheckCircle', color: 'text-amber-600' },
                      { label: 'Maintenance Due', value: equipKpiData.maintenanceDue, icon: 'Clipboard', color: 'text-orange-600' },
                      { label: 'Downtime Hours', value: equipKpiData.downtimeHours, icon: 'AlertTriangle', color: 'text-rose-600' }
                    ].map((kpi, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                            <p className="text-xl font-extrabold text-slate-900 mt-1">{kpi.value}</p>
                          </div>
                          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                            <span className={kpi.color}><strong>{kpi.icon === 'Settings' ? '' : kpi.icon === 'CheckCircle' ? '' : kpi.icon === 'Clipboard' ? '' : ''}</strong></span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3 mb-4">Equipment Performance Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Calibration Compliance', 'PPM Adherence', 'Downtime Trend'].map((title, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 h-40 flex items-center justify-center">
                          <div className="text-center">
                            <BarChart3 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                            <p className="text-[10px] font-bold text-slate-400">{title}</p>
                            <p className="text-[9px] text-slate-400 mt-1">Chart placeholder</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeEquipTab === 'inventory' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800">Equipment Inventory</h3>
                    <button onClick={() => setIsAddEquipModalOpen(true)} style={{ backgroundColor: hospital.themeColor }} className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2"><Plus className="w-3.5 h-3.5" /> Add Equipment</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {equipment.map(eq => (
                      <div key={eq.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs font-bold text-slate-800">{eq.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${eq.status === 'Operational' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>{eq.status}</span>
                        </div>
                        <p className="text-[9px] text-slate-500">Model: {eq.model} {eq.manufacturer && `(${eq.manufacturer})`}</p>
                        <p className="text-[9px] text-slate-500">Location: {eq.location}</p>
                        {eq.installationDate && <p className="text-[9px] text-slate-500">Installed: {eq.installationDate}</p>}
                        <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[9px]">
                          <div><span className="text-slate-400">PPM Due:</span> <span className="font-bold text-slate-700">{eq.ppmDue}</span></div>
                          <div><span className="text-slate-400">Calibration:</span> <span className="font-bold text-slate-700">{eq.calibrationDue}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeEquipTab === 'calibration' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800">Calibration Register</h3>
                    <button onClick={() => setIsAddCalibModalOpen(true)} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1"><Plus className="w-3 h-3" /> Add Record</button>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-[10px]">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Equipment</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Type</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Calibration Date</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Next Due</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Agency</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Certificate No.</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Status</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Remarks</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {calibrationRecords.map(rec => (
                            <tr key={rec.id} className="hover:bg-slate-50/50">
                              <td className="px-4 py-3 text-slate-700 font-medium">{rec.equipment}</td>
                              <td className="px-4 py-3 text-slate-700">{rec.type}</td>
                              <td className="px-4 py-3 text-slate-700">{rec.calibrationDate}</td>
                              <td className="px-4 py-3 text-slate-700">{rec.nextDue}</td>
                              <td className="px-4 py-3 text-slate-700">{rec.agency}</td>
                              <td className="px-4 py-3 text-slate-700 font-mono">{rec.certificate}</td>
                              <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-[8px] font-bold ${rec.status === 'Valid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : rec.status === 'Due Soon' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>{rec.status}</span></td>
                              <td className="px-4 py-3 text-slate-600 max-w-[200px] truncate">{rec.remarks}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeEquipTab === 'maintenance' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800">Preventive Maintenance Register</h3>
                    <button onClick={() => setIsAddMaintenanceModalOpen(true)} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1"><Plus className="w-3 h-3" /> Schedule PPM</button>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-[10px]">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Equipment</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Type</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Scheduled Date</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Completed Date</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Technician</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Status</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Remarks</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {maintenanceRecords.map(mnt => (
                            <tr key={mnt.id} className="hover:bg-slate-50/50">
                              <td className="px-4 py-3 text-slate-700 font-medium">{mnt.equipment}</td>
                              <td className="px-4 py-3 text-slate-700">{mnt.type}</td>
                              <td className="px-4 py-3 text-slate-700">{mnt.scheduledDate}</td>
                              <td className="px-4 py-3 text-slate-700">{mnt.completedDate || ''}</td>
                              <td className="px-4 py-3 text-slate-700">{mnt.technician}</td>
                              <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-[8px] font-bold ${mnt.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : mnt.status === 'Scheduled' ? 'bg-sky-50 text-sky-700 border border-sky-200' : mnt.status === 'Overdue' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>{mnt.status}</span></td>
                              <td className="px-4 py-3 text-slate-600 max-w-[200px] truncate">{mnt.remarks}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeEquipTab === 'breakdown' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800">Breakdown Register</h3>
                    <button onClick={() => setIsAddBreakdownModalOpen(true)} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1"><Plus className="w-3 h-3" /> Report Breakdown</button>
                  </div>
                  <div className="space-y-3">
                    {breakdownRecords.map(bd => (
                      <div key={bd.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs font-bold text-slate-800">{bd.equipment}</h4>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${bd.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>{bd.status}</span>
                            <span className="px-2 py-1 rounded-full text-[8px] font-bold bg-slate-100 text-slate-700 border border-slate-200">{bd.downtimeHours} hrs downtime</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-500 mb-1"><strong>Fault:</strong> {bd.faultDescription}</p>
                        <p className="text-[10px] text-slate-500 mb-1"><strong>Action:</strong> {bd.actionTaken}</p>
                        <p className="text-[10px] text-slate-400">Reported by {bd.reportedBy} on {bd.breakdownDate} {bd.resolvedDate ? ` Resolved: ${bd.resolvedDate}` : ''}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
        )}

        {activeTab === 'staff-training' && (
          <div className="flex gap-0 -m-6 min-h-[calc(100vh-4rem)]">
            <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col">
              <div className="p-4 border-b border-slate-100">
                <button onClick={() => setActiveTab('overview')} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider cursor-pointer transition-colors group">
                  <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  Back
                </button>
                <h2 className="text-xs font-extrabold text-slate-900 mt-2">Staff & Training</h2>
                <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">Qualification & Compliance</p>
              </div>
              <nav className="flex-1 overflow-y-auto custom-scroll py-3 px-2 space-y-0.5">
                {STAFF_TRAINING_TABS.map((tab) => {
                  const Icon = ICON_MAP[tab.icon] || BookOpen;
                  const isActive = tab.id === activeStaffTab;
                  return (
                    <button key={tab.id} onClick={() => setActiveStaffTab(tab.id)}
                      style={isActive ? { backgroundColor: `${hospital.themeColor}0d`, borderColor: `${hospital.themeColor}22`, color: hospital.themeColor } : {}}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all duration-150 cursor-pointer ${isActive ? 'border-sky-500/20 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="text-[10px] font-semibold truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
              <div className="p-3 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center gap-2 text-[8px] text-slate-400 font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 inline-block" /> NABH Standard
                </div>
                <div className="flex items-center gap-2 text-[8px] text-slate-400 font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Hospital Customized
                </div>
              </div>
            </aside>

            <main className="flex-1 overflow-y-auto custom-scroll bg-slate-50/40 p-6 space-y-5">
              {activeStaffTab === 'staff-dashboard' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Total Staff', value: staffKpiData.totalStaff, icon: 'Users', color: 'text-sky-600' },
                      { label: 'Active Staff', value: staffKpiData.activeStaff, icon: 'CheckCircle', color: 'text-emerald-600' },
                      { label: 'Training Sessions', value: staffKpiData.totalTraining, icon: 'BookOpen', color: 'text-blue-600' },
                      { label: 'Avg Compliance', value: `${staffKpiData.avgCompliance}%`, icon: 'Shield', color: 'text-amber-600' }
                    ].map((kpi, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                            <p className="text-xl font-extrabold text-slate-900 mt-1">{kpi.value}</p>
                          </div>
                          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                            <span className={kpi.color}><strong>{kpi.icon === 'Users' ? '' : kpi.icon === 'CheckCircle' ? '' : kpi.icon === 'BookOpen' ? '' : ''}</strong></span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3 mb-4">Training Completion Rate</h3>
                      <div className="space-y-3">
                        {radSafetyTraining.map(t => (
                          <div key={t.id} className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="text-[10px] font-bold text-slate-700">{t.topic}</p>
                              <p className="text-[9px] text-slate-400">Date: {t.date}</p>
                            </div>
                            <div className="w-24">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[8px] font-bold text-slate-500">Compliance</span>
                                <span className="text-[8px] font-bold text-slate-700">{t.compliance}</span>
                              </div>
                              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-sky-500 rounded-full" style={{ width: t.compliance }}></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3 mb-4">Certificate Status</h3>
                      <div className="space-y-3">
                        {[
                          { label: 'Valid Certificates', value: staffKpiData.validCerts, color: 'bg-emerald-500' },
                          { label: 'Expiring / Expired', value: staffKpiData.expiringCerts, color: 'bg-rose-500' }
                        ].map((stat, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-700">{stat.label}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${(stat.value / certTracker.length) * 100}%` }}></div>
                              </div>
                              <span className="text-[10px] font-extrabold text-slate-900 w-6 text-right">{stat.value}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStaffTab === 'staff-directory' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800">Staff Directory</h3>
                    <button style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1"><Plus className="w-3 h-3" /> Add Staff</button>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-[10px]">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Name</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Designation</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Qualification</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">DMC Reg. No.</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">AERB Reg. No.</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Join Date</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Status</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {staffDirectory.map(staff => (
                            <tr key={staff.id} className="hover:bg-slate-50/50">
                              <td className="px-4 py-3 text-slate-700 font-medium">{staff.name}</td>
                              <td className="px-4 py-3 text-slate-700">{staff.designation}</td>
                              <td className="px-4 py-3 text-slate-700">{staff.qualification}</td>
                              <td className="px-4 py-3 text-slate-700 font-mono text-[9px]">{staff.registrationNo}</td>
                              <td className="px-4 py-3 text-slate-700 font-mono text-[9px]">{staff.aerbRegNo}</td>
                              <td className="px-4 py-3 text-slate-700">{staff.joinDate}</td>
                              <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-[8px] font-bold ${staff.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>{staff.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeStaffTab === 'qualifications' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800">Qualification Tracking</h3>
                    <button style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1"><Plus className="w-3 h-3" /> Add Qualification</button>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-[10px]">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Staff Name</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Qualification</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Institution</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Year</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Renewal Due</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Status</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {qualificationRecords.map(rec => (
                            <tr key={rec.id} className="hover:bg-slate-50/50">
                              <td className="px-4 py-3 text-slate-700 font-medium">{rec.staff}</td>
                              <td className="px-4 py-3 text-slate-700">{rec.qualification}</td>
                              <td className="px-4 py-3 text-slate-700">{rec.institution}</td>
                              <td className="px-4 py-3 text-slate-700">{rec.year}</td>
                              <td className="px-4 py-3 text-slate-700">{rec.renewalDue}</td>
                              <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-[8px] font-bold ${rec.status === 'Valid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : rec.status === 'Renewal Due' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>{rec.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeStaffTab === 'rad-safety-training' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800">Radiation Safety Training</h3>
                    <button style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1"><Plus className="w-3 h-3" /> Schedule Training</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {radSafetyTraining.map(t => (
                      <div key={t.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs font-bold text-slate-800">{t.topic}</h4>
                          <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${parseFloat(t.compliance) >= 95 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : parseFloat(t.compliance) >= 85 ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>{t.compliance} Compliance</span>
                        </div>
                        <p className="text-[9px] text-slate-500 mb-1">Trainer: {t.trainer}</p>
                        <p className="text-[9px] text-slate-500 mb-1">Date: {t.date}  Duration: {t.duration}</p>
                        <p className="text-[9px] text-slate-500">Mode: {t.mode}  Attendees: {t.attendees}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeStaffTab === 'cert-tracker' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800">Certification Tracker</h3>
                    <div className="flex gap-3">
                      <div className="text-[9px] font-bold text-slate-500">Valid: <span className="text-emerald-600">{staffKpiData.validCerts}</span></div>
                      <div className="text-[9px] font-bold text-slate-500">Expiring/Expired: <span className="text-rose-600">{staffKpiData.expiringCerts}</span></div>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-[10px]">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Staff Name</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Certificate</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Issued By</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Issue Date</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Expiry Date</th><th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Status</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {certTracker.map(cert => (
                            <tr key={cert.id} className="hover:bg-slate-50/50">
                              <td className="px-4 py-3 text-slate-700 font-medium">{cert.staff}</td>
                              <td className="px-4 py-3 text-slate-700">{cert.certificate}</td>
                              <td className="px-4 py-3 text-slate-700">{cert.issuedBy}</td>
                              <td className="px-4 py-3 text-slate-700">{cert.issueDate}</td>
                              <td className="px-4 py-3 text-slate-700">{cert.expiryDate}</td>
                              <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-[8px] font-bold ${cert.status === 'Valid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : cert.status === 'Expiring Soon' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>{cert.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeStaffTab === 'training-calendar' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800">Training Calendar</h3>
                    <button style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1"><Plus className="w-3 h-3" /> Schedule Event</button>
                  </div>
                  <div className="space-y-3">
                    {trainingCalendar.map(evt => (
                      <div key={evt.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                            <Calendar className="w-4 h-4 text-slate-500" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-800">{evt.event}</h4>
                            <p className="text-[9px] text-slate-500">Trainer: {evt.trainer}</p>
                            <p className="text-[9px] text-slate-500">Date: {evt.date} at {evt.time}  Venue: {evt.venue}</p>
                            <p className="text-[9px] text-slate-500">Attendees: {evt.attendees}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${evt.status === 'Scheduled' ? 'bg-sky-50 text-sky-700 border border-sky-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>{evt.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
        )}

        {activeTab === 'quality' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Reporting Error %', value: '1.8%', icon: 'AlertTriangle', color: 'text-rose-600', target: '< 2%', status: 'good' },
                { label: 'Re-Do Investigation %', value: '3.2%', icon: 'Activity', color: 'text-amber-600', target: '< 3%', status: 'warning' },
                { label: 'Safety Compliance %', value: '96.4%', icon: 'Shield', color: 'text-emerald-600', target: '> 95%', status: 'good' },
                { label: 'Avg Waiting Time', value: '24 min', icon: 'Users', color: 'text-sky-600', target: '< 30 min', status: 'good' },
                { label: 'Avg Reporting Time', value: '2.4 hrs', icon: 'FileText', color: 'text-blue-600', target: '< 4 hrs', status: 'good' }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                    <span className={`px-1.5 py-0.5 rounded text-[7px] font-bold ${kpi.status === 'good' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{kpi.target}</span>
                  </div>
                  <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                  <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${kpi.status === 'good' ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: kpi.status === 'good' ? '88%' : '72%' }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3 mb-4">Monthly Trend Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'Reporting Error %', data: 'Jan: 2.1%  Feb: 1.9%  Mar: 2.3%  Apr: 1.8%  May: 1.6%', trend: 'down' },
                  { title: 'Re-Do Investigation %', data: 'Jan: 2.8%  Feb: 3.0%  Mar: 3.5%  Apr: 3.2%  May: 3.1%', trend: 'stable' },
                  { title: 'Safety Compliance %', data: 'Jan: 94%  Feb: 95%  Mar: 96%  Apr: 96.4%  May: 96.8%', trend: 'up' }
                ].map((chart, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 h-40 flex flex-col items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-[10px] font-bold text-slate-700">{chart.title}</p>
                      <p className="text-[9px] text-slate-500 mt-2 leading-relaxed">{chart.data}</p>
                      <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[8px] font-bold ${chart.trend === 'up' ? 'bg-emerald-50 text-emerald-700' : chart.trend === 'down' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}`}>{chart.trend === 'up' ? ' Improving' : chart.trend === 'down' ? ' Declining' : ' Stable'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3 mb-4">Monthly Comparison Charts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Waiting Time vs Target', data: 'Jan: 28min | Feb: 26min | Mar: 25min | Apr: 24min | May: 24min' },
                  { title: 'Reporting TAT vs Target', data: 'Jan: 3.2hrs | Feb: 3.0hrs | Mar: 2.8hrs | Apr: 2.6hrs | May: 2.4hrs' }
                ].map((chart, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 h-32 flex flex-col items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                      <p className="text-[9px] font-bold text-slate-700">{chart.title}</p>
                      <p className="text-[8px] text-slate-500 mt-1">{chart.data}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3 mb-4">Department-wise Performance</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { dept: 'CT Scan', errorRate: '1.4%', redoRate: '2.8%', compliance: '97%', waiting: '22 min', tat: '2.1 hrs', score: 94 },
                  { dept: 'MRI', errorRate: '0.8%', redoRate: '1.5%', compliance: '98%', waiting: '18 min', tat: '1.8 hrs', score: 97 },
                  { dept: 'General X-Ray', errorRate: '2.5%', redoRate: '4.2%', compliance: '94%', waiting: '30 min', tat: '3.2 hrs', score: 88 },
                  { dept: 'Ultrasound', errorRate: '1.2%', redoRate: '2.1%', compliance: '96%', waiting: '25 min', tat: '2.5 hrs', score: 93 },
                  { dept: 'Mammography', errorRate: '2.0%', redoRate: '3.8%', compliance: '95%', waiting: '28 min', tat: '2.8 hrs', score: 90 },
                  { dept: 'Interventional', errorRate: '0.5%', redoRate: '1.0%', compliance: '99%', waiting: '35 min', tat: '3.5 hrs', score: 96 }
                ].map((dept, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold text-slate-800">{dept.dept}</h4>
                      <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${dept.score >= 95 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : dept.score >= 90 ? 'bg-sky-50 text-sky-700 border border-sky-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>{dept.score}%</span>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { label: 'Error %', value: dept.errorRate },
                        { label: 'Re-Do %', value: dept.redoRate },
                        { label: 'Safety', value: dept.compliance },
                        { label: 'Wait', value: dept.waiting },
                        { label: 'TAT', value: dept.tat }
                      ].map((metric, j) => (
                        <div key={j} className="flex items-center justify-between text-[9px]">
                          <span className="text-slate-500">{metric.label}</span>
                          <span className="font-bold text-slate-700">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audits' && (
          <div className="flex gap-0 -m-6 min-h-[calc(100vh-4rem)]">
            <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col">
              <div className="p-4 border-b border-slate-100">
                <button onClick={() => setActiveTab('overview')} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider cursor-pointer transition-colors group">
                  <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  Back
                </button>
                <h2 className="text-xs font-extrabold text-slate-900 mt-2">Internal Audits</h2>
                <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">NABH Compliance</p>
              </div>
              <nav className="flex-1 overflow-y-auto custom-scroll py-3 px-2 space-y-0.5">
                {AUDIT_TABS.map((tab) => {
                  const Icon = ICON_MAP[tab.icon] || BookOpen;
                  const isActive = tab.id === activeAuditTab;
                  return (
                    <button key={tab.id} onClick={() => setActiveAuditTab(tab.id)}
                      style={isActive ? { backgroundColor: `${hospital.themeColor}0d`, borderColor: `${hospital.themeColor}22`, color: hospital.themeColor } : {}}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all duration-150 cursor-pointer ${isActive ? 'border-sky-500/20 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="text-[10px] font-semibold truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
              <div className="p-3 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center gap-2 text-[8px] text-slate-400 font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 inline-block" /> NABH Standard
                </div>
                <div className="flex items-center gap-2 text-[8px] text-slate-400 font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Hospital Customized
                </div>
              </div>
            </aside>

            <main className="flex-1 overflow-y-auto custom-scroll bg-slate-50/40 p-6 space-y-5">
              {activeAuditTab === 'audit-dashboard' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Compliance Rate', value: `${auditKpiData.complianceRate}%`, icon: 'CheckCircle', color: 'text-emerald-600' },
                      { label: 'Open Findings', value: auditKpiData.openFindings, icon: 'AlertTriangle', color: 'text-amber-600' },
                      { label: 'Under CAPA', value: auditKpiData.underCapa, icon: 'Activity', color: 'text-blue-600' },
                      { label: 'Closed Findings', value: auditKpiData.closedFindings, icon: 'Shield', color: 'text-sky-600' }
                    ].map((kpi, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                            <p className="text-xl font-extrabold text-slate-900 mt-1">{kpi.value}</p>
                          </div>
                          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                            <span className={kpi.color}><strong>{kpi.icon === 'CheckCircle' ? '' : kpi.icon === 'AlertTriangle' ? '' : kpi.icon === 'Activity' ? '' : ''}</strong></span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3 mb-4">Audit Score Trend (Last 6 Months)</h3>
                      <div className="space-y-3">
                        {[
                          { month: 'Jan 2025', score: 82 },
                          { month: 'Feb 2025', score: 85 },
                          { month: 'Mar 2025', score: 83 },
                          { month: 'Apr 2025', score: 88 },
                          { month: 'May 2025', score: 87 },
                          { month: 'Jun 2025', score: 89 }
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="text-[9px] font-bold text-slate-500 w-16">{item.month}</span>
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-sky-500 rounded-full transition-all" style={{ width: `${item.score}%` }}></div>
                            </div>
                            <span className={`text-[9px] font-extrabold w-10 text-right ${item.score >= 85 ? 'text-emerald-600' : 'text-amber-600'}`}>{item.score}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3 mb-4">Compliance % Trend</h3>
                      <div className="space-y-3">
                        {[
                          { month: 'Jan 2025', compliance: 78 },
                          { month: 'Feb 2025', compliance: 82 },
                          { month: 'Mar 2025', compliance: 80 },
                          { month: 'Apr 2025', compliance: 85 },
                          { month: 'May 2025', compliance: 87 },
                          { month: 'Jun 2025', compliance: 87 }
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="text-[9px] font-bold text-slate-500 w-16">{item.month}</span>
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${item.compliance}%` }}></div>
                            </div>
                            <span className={`text-[9px] font-extrabold w-10 text-right ${item.compliance >= 85 ? 'text-emerald-600' : 'text-amber-600'}`}>{item.compliance}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeAuditTab === 'audit-templates' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800">Audit Templates</h3>
                    <button style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1"><Plus className="w-3 h-3" /> New Template</button>
                  </div>
                  <div className="space-y-3">
                    {auditTemplates.map(t => (
                      <div key={t.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{t.name}</h4>
                          <p className="text-[9px] text-slate-500">Based on: {t.basedOn}</p>
                          <p className="text-[9px] text-slate-500">Last Updated: {t.lastUpdated}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-1 rounded-full text-[8px] font-bold bg-sky-50 text-sky-700 border border-sky-200">{t.sections} Sections</span>
                          <button className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500"><FileText className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeAuditTab === 'audit-schedule' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800">Audit Schedule</h3>
                    <button style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1"><Plus className="w-3 h-3" /> Schedule Audit</button>
                  </div>
                  <div className="space-y-3">
                    {auditSchedule.map(item => (
                      <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{item.audit}</h4>
                          <p className="text-[9px] text-slate-500">Date: {item.scheduledDate}  Auditor: {item.auditor}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${item.status === 'Scheduled' ? 'bg-sky-50 text-sky-700 border border-sky-200' : item.status === 'In Progress' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeAuditTab === 'audit-findings' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800">Audit Findings</h3>
                    <div className="flex gap-3">
                      <div className="text-[9px] font-bold text-slate-500">Open: <span className="text-rose-600">{auditKpiData.openFindings}</span></div>
                      <div className="text-[9px] font-bold text-slate-500">Under CAPA: <span className="text-amber-600">{auditKpiData.underCapa}</span></div>
                      <div className="text-[9px] font-bold text-slate-500">Closed: <span className="text-emerald-600">{auditKpiData.closedFindings}</span></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {auditFindings.map(f => (
                      <div key={f.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-xs font-bold text-slate-800">{f.audit}</h4>
                            <span className={`px-1.5 py-0.5 rounded text-[7px] font-bold ${f.severity === 'Major' ? 'bg-rose-50 text-rose-700' : f.severity === 'Minor' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>{f.severity}</span>
                          </div>
                          <p className="text-[10px] text-slate-700 mb-1">{f.finding}</p>
                          <p className="text-[9px] text-slate-400">Date: {f.date}  Status: {f.status}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${f.status === 'Open' ? 'bg-rose-50 text-rose-700 border border-rose-200' : f.status === 'Under CAPA' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>{f.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeAuditTab === 'non-conformities' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800">Non-Conformities (NCR)</h3>
                    <div className="flex gap-3">
                      <div className="text-[9px] font-bold text-slate-500">Open: <span className="text-rose-600">{auditKpiData.openNC}</span></div>
                      <div className="text-[9px] font-bold text-slate-500">Closed: <span className="text-emerald-600">{auditKpiData.closedNC}</span></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {nonConformities.map(nc => (
                      <div key={nc.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-slate-800">{nc.ncrNo}</h4>
                            <span className={`px-1.5 py-0.5 rounded text-[7px] font-bold ${nc.severity === 'Major' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}`}>{nc.severity}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${nc.status === 'Open' ? 'bg-rose-50 text-rose-700 border border-rose-200' : nc.status === 'Under Verification' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>{nc.status}</span>
                        </div>
                        <p className="text-[10px] text-slate-700 mb-2">{nc.description}</p>
                        <p className="text-[9px] text-slate-500 mb-1"><strong>Root Cause:</strong> {nc.rootCause}</p>
                        <p className="text-[9px] text-slate-500 mb-1"><strong>Corrective Action:</strong> {nc.correctiveAction}</p>
                        <p className="text-[9px] text-slate-500 mb-1"><strong>Preventive Action:</strong> {nc.preventiveAction}</p>
                        <p className="text-[9px] text-slate-400">Responsible: {nc.responsible}  Due: {nc.dueDate}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
        )}

        {activeTab === 'capa' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Open CAPA', value: capaItems.filter(c => c.status === 'Open').length, color: 'text-amber-600' },
                { label: 'Under Investigation', value: capaItems.filter(c => c.status === 'Investigation').length, color: 'text-blue-600' },
                { label: 'Under Verification', value: capaItems.filter(c => c.status === 'Verification').length, color: 'text-purple-600' },
                { label: 'Closed CAPA', value: capaItems.filter(c => c.status === 'Closed').length, color: 'text-emerald-600' }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                  <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-4">
              {[
                { id: 'Open', label: 'Open', color: 'bg-amber-50 border-amber-200', headerColor: 'text-amber-700', items: capaItems.filter(c => c.status === 'Open') },
                { id: 'Investigation', label: 'Investigation', color: 'bg-sky-50 border-sky-200', headerColor: 'text-sky-700', items: capaItems.filter(c => c.status === 'Investigation') },
                { id: 'Corrective Action', label: 'Corrective Action', color: 'bg-blue-50 border-blue-200', headerColor: 'text-blue-700', items: capaItems.filter(c => c.status === 'Corrective Action') },
                { id: 'Preventive Action', label: 'Preventive Action', color: 'bg-purple-50 border-purple-200', headerColor: 'text-purple-700', items: capaItems.filter(c => c.status === 'Preventive Action') },
                { id: 'Verification', label: 'Verification', color: 'bg-indigo-50 border-indigo-200', headerColor: 'text-indigo-700', items: capaItems.filter(c => c.status === 'Verification') }
               ].filter(col => col.items.length > 0 || true).map((col) => (
                 <div key={col.id} className={`flex flex-col rounded-2xl border ${col.color} min-h-[400px]`}>
                   <div className={`px-3 py-2.5 border-b font-bold text-[10px] uppercase tracking-wider ${col.headerColor}`}>
                     <div className="flex items-center justify-between">
                       <span>{col.label}</span>
                       <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-white/60`}>{col.items.length}</span>
                     </div>
                   </div>
                   <div className="flex-1 overflow-y-auto custom-scroll p-2 space-y-2">
                     {col.items.map(item => {
                        return (
                        <div key={item.id} onClick={() => setSelectedCapa(selectedCapa?.id === item.id ? null : item)}
                          className={`bg-white rounded-xl p-3 shadow-sm border border-slate-200 cursor-pointer transition-all hover:shadow-md ${selectedCapa?.id === item.id ? 'ring-2 ring-sky-400' : ''}`}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[8px] font-bold text-slate-400 font-mono">{item.source}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[7px] font-bold ${isOverdue ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>Due: {item.dueDate}</span>
                          </div>
                          <h4 className="text-[10px] font-bold text-slate-800 leading-snug mb-2">{item.issue}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-[8px] text-slate-500">Owner: {item.responsible}</span>
                            {item.status === 'Closed' ? (
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                            )}
                          </div>
                        </div>
                      );})}

                      {col.items.length === 0 && (
                       <div className="text-center py-6">
                         <p className="text-[9px] text-slate-400">No items</p>
                       </div>
                     )}
                   </div>
                 </div>
               ))}
            </div>

            {selectedCapa && (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xs font-bold text-slate-800">CAPA Details</h3>
                      <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${selectedCapa.status === 'Closed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>{selectedCapa.status}</span>
                    </div>
                    <p className="text-[9px] text-slate-500 font-mono">Source: {selectedCapa.source}  Created: {selectedCapa.createdAt}</p>
                  </div>
                  <button onClick={() => setSelectedCapa(null)} className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500"><X className="w-3.5 h-3.5" /></button>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Issue</span>
                    <p className="text-xs text-slate-800 mt-1">{selectedCapa.issue}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Root Cause</span>
                    <p className="text-xs text-slate-800 mt-1">{selectedCapa.rootCause}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Corrective Action</span>
                      <p className="text-xs text-slate-800 mt-1">{selectedCapa.correctiveAction}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Preventive Action</span>
                      <p className="text-xs text-slate-800 mt-1">{selectedCapa.preventiveAction}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-[9px] text-slate-600 pt-2 border-t border-slate-100">
                    <div><span className="text-slate-400">Responsible:</span> <span className="font-bold">{selectedCapa.responsible}</span></div>
                    <div><span className="text-slate-400">Due Date:</span> <span className="font-bold">{selectedCapa.dueDate}</span></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'statutory' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'AERB Valid', value: statutoryKpiData.validLicenses, color: 'text-emerald-600' },
                { label: 'AERB Expiring Soon', value: statutoryKpiData.expiringLicenses, color: 'text-amber-600' },
                { label: 'AERB Overdue', value: statutoryKpiData.overdueLicenses, color: 'text-rose-600' },
                { label: 'PCPNDT Compliant', value: `${statutoryKpiData.compliantPCPNDT}/${statutoryKpiData.totalPCPNDT}`, color: 'text-blue-600' }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                      <p className={`text-xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-lg">{(idx === 0 ? '' : idx === 1 ? '' : idx === 2 ? '' : '')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3">AERB License & Certificates</h3>
                  <button style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
                </div>
                <div className="space-y-3">
                  {aerLicenses.map(lic => (
                    <div key={lic.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-bold text-slate-800">{lic.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${statusClass(lic.status)}`}>{lic.status}</span>
                      </div>
                      <p className="text-[9px] text-slate-500">No: {lic.no}</p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                        <div>
                          <span className="text-[8px] font-bold text-slate-400">ISSUED: </span>
                          <span className="text-[9px] text-slate-600 font-medium">{lic.issued}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div>
                            <span className="text-[8px] font-bold text-slate-400">EXPIRY: </span>
                            <span className={`text-[9px] font-bold ${lic.status === 'Overdue' ? 'text-rose-600' : lic.status === 'Expiring Soon' ? 'text-amber-600' : 'text-slate-700'}`}>{lic.expiry}</span>
                          </div>
                          {lic.status !== 'Valid' && (
                            <span className={`px-1.5 py-0.5 rounded text-[7px] font-bold ${lic.status === 'Overdue' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}`}>
                              {lic.status === 'Overdue' ? ' EXPIRED' : 'Expiring Soon'}
                            </span>
                          )}
                        </div>
                      </div>
                      {lic.status !== 'Valid' && (
                        <button onClick={() => setAerLicenses(prev => prev.map(l => l.id === lic.id ? { ...l, status: 'Valid', expiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] } : l))} className="mt-2 w-full px-2 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-700 text-[8px] font-bold hover:bg-emerald-50 cursor-pointer transition-colors">
                           Mark Renewed
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3">PCPNDT Compliance</h3>
                  <button style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
                </div>
                <div className="space-y-3">
                  {pcpndtRegs.map(pcp => (
                    <div key={pcp.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-bold text-slate-800">{pcp.center}</h4>
                        <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${statusClass(pcp.status)}`}>{pcp.status}</span>
                      </div>
                      <p className="text-[9px] text-slate-500">Reg: {pcp.registration}</p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                        <span className="text-[9px] text-slate-500">Issued: {pcp.issued}</span>
                        <span className={`text-[9px] font-bold ${pcp.status === 'Expiring Soon' ? 'text-amber-600' : 'text-slate-700'}`}>Expiry: {pcp.expiry}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3">Vendor Agreements & Contracts</h3>
                  <button style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
                </div>
                <div className="space-y-3">
                  {vendorAgreements.map(v => (
                    <div key={v.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-800">{v.type}</h4>
                          <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${statusClass(v.status)}`}>{v.status}</span>
                        </div>
                      </div>
                      <p className="text-[9px] text-slate-500">Vendor: {v.vendor}  Equipment: {v.equipment}</p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                        <span className="text-[9px] text-slate-500">From: {v.start}</span>
                        <span className={`text-[9px] font-bold ${v.status === 'Expiring Soon' || v.status === 'Overdue' ? 'text-amber-600' : 'text-slate-700'}`}>Expires: {v.expiry}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3">Regulatory Documents</h3>
                  <button style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1"><Upload className="w-3 h-3" /> Upload</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {regDocuments.map(doc => (
                    <div key={doc.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded-lg bg-white border border-slate-100 shrink-0"><FileText className="w-3.5 h-3.5 text-slate-500" /></div>
                        <div className="min-w-0">
                          <h4 className="text-[10px] font-bold text-slate-800 leading-snug">{doc.name}</h4>
                          <p className="text-[8px] text-slate-400 font-mono mt-0.5">{doc.no}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className={`px-2 py-1 rounded-full text-[8px] font-bold ${statusClass(doc.status)}`}>{doc.status}</span>
                            <span className="text-[8px] text-slate-400">Exp: {doc.expiry}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {[
              ...aerLicenses.filter(l => l.status !== 'Valid').map(l => ({ kind: 'AERB', title: l.name, date: l.expiry, status: l.status })),
              ...pcpndtRegs.filter(p => p.status !== 'Valid').map(p => ({ kind: 'PCPNDT', title: p.center, date: p.expiry, status: p.status })),
              ...vendorAgreements.filter(v => v.status !== 'Valid').map(v => ({ kind: 'Vendor', title: `${v.type} - ${v.equipment}`, date: v.expiry, status: v.status }))
            ].filter(Boolean).length > 0 && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <h3 className="text-xs font-extrabold text-rose-800">Compliance Alerts</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    ...aerLicenses.filter(l => l.status !== 'Valid').map(l => ({ kind: 'AERB', title: l.name, date: l.expiry, status: l.status })),
                    ...pcpndtRegs.filter(p => p.status !== 'Valid').map(p => ({ kind: 'PCPNDT', title: p.center, date: p.expiry, status: p.status })),
                    ...vendorAgreements.filter(v => v.status !== 'Valid').map(v => ({ kind: 'Vendor', title: `${v.type} - ${v.equipment}`, date: v.expiry, status: v.status }))
                  ].map((alert, i) => (
                    <div key={i} className="bg-white border border-rose-100 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[8px] font-black uppercase tracking-wider text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded">{alert.kind}</span>
                        <span className={`px-2 py-1 rounded-full text-[7px] font-bold ${alert.status === 'Overdue' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>{alert.status}</span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-800">{alert.title}</p>
                      <p className="text-[9px] text-slate-500 mt-1">Due: {alert.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'evidence' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800">Evidence Repository</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input value={evidenceSearch} onChange={e => setEvidenceSearch(e.target.value)} placeholder="Search files, tags..." className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-[10px] text-slate-700 placeholder:text-slate-400 w-56" />
                </div>
                <select value={evidenceFilterType} onChange={e => setEvidenceFilterType(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-[10px] font-bold text-slate-600 cursor-pointer">
                  <option value="all">All Types</option>
                  <option value="PDF">PDF</option>
                  <option value="Excel">Excel</option>
                  <option value="Word">Word</option>
                  <option value="Image">Image</option>
                </select>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-[10px] font-bold text-slate-600 cursor-pointer">
                  <option value="date">Sort: Newest</option>
                  <option value="name">Sort: Name A-Z</option>
                </select>
                <button style={{ backgroundColor: hospital.themeColor }} className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2"><Upload className="w-3.5 h-3.5" /> Upload File</button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
              <button onClick={() => setActiveEvidenceFolder('all')} className={`bg-white border rounded-2xl p-3 shadow-sm flex flex-col items-center justify-center gap-1.5 transition-all hover:border-sky-300 cursor-pointer min-h-[90px] ${activeEvidenceFolder === 'all' ? 'border-sky-300 bg-sky-50/40' : 'border-slate-200'}`}>
                <Folder className="w-6 h-6 text-sky-600" />
                <span className="text-[9px] font-bold text-slate-700">All Files</span>
                <span className="text-[8px] text-slate-400 font-bold">{evidenceFiles.length}</span>
              </button>
              {evidenceFolders.map(folder => (
                <button key={folder.id} onClick={() => setActiveEvidenceFolder(folder.name)} className={`bg-white border rounded-2xl p-3 shadow-sm flex flex-col items-center justify-center gap-1.5 transition-all hover:border-sky-300 cursor-pointer min-h-[90px] ${activeEvidenceFolder === folder.name ? 'border-sky-300 bg-sky-50/40' : 'border-slate-200'}`}>
                  <Folder className={`w-6 h-6 ${folder.color}`} />
                  <span className="text-[9px] font-bold text-slate-700 text-center leading-tight">{folder.name}</span>
                  <span className="text-[8px] text-slate-400 font-bold">{folderFileCounts[folder.name] || 0}</span>
                </button>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {activeEvidenceFolder === 'all' ? 'All Files' : activeEvidenceFolder}  {filteredFiles.length} items
                </h3>
                <div className="flex items-center gap-2 text-[9px] text-slate-400 font-bold">
                  <span className="px-2 py-1 rounded-lg bg-slate-50 border border-slate-200">{evidenceFilterType === 'all' ? 'All Types' : evidenceFilterType}</span>
                  {sortBy === 'date' ? 'Newest first' : 'A  Z'}
                </div>
              </div>
              {filteredFiles.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {filteredFiles.map(file => (
                    <div key={file.id} onClick={() => setSelectedFile(selectedFile?.id === file.id ? null : file)} className={`px-5 py-3 flex items-center justify-between hover:bg-slate-50/50 cursor-pointer transition-colors ${selectedFile?.id === file.id ? 'bg-sky-50/60' : ''}`}>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                          {typeIcons[file.type] || <FileText className="w-4 h-4 text-slate-500" />}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[10px] font-bold text-slate-800 truncate">{file.name}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[8px] font-mono text-slate-400">{file.type}  {file.size}</span>
                            <span className="text-[8px] text-slate-400"></span>
                            <span className="text-[8px] text-slate-400">{file.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {file.tags.map((tag, i) => (
                              <span key={i} className="px-1.5 py-0.5 rounded text-[7px] font-bold bg-sky-50 text-sky-700 border border-sky-100">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 ml-4">
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Linked: {file.linkedTo}</span>
                        <span className="text-[8px] text-slate-400">By {file.uploadedBy}</span>
                        <button className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-[9px] font-bold text-slate-600 flex items-center gap-1 hover:border-sky-300 hover:text-sky-700 cursor-pointer"><Eye className="w-3 h-3" /> View</button>
                        <button className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-[9px] font-bold text-slate-600 flex items-center gap-1 hover:border-emerald-300 hover:text-emerald-700 cursor-pointer"><Download className="w-3 h-3" /> Download</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 flex flex-col items-center justify-center">
                  <Folder className="w-10 h-10 text-slate-300 mb-3" />
                  <p className="text-[10px] font-bold text-slate-500">No files found</p>
                  <p className="text-[9px] text-slate-400 mt-1">Try a different search or filter</p>
                </div>
              )}
            </div>

            {selectedFile && (
              <div className="bg-white border border-sky-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-sky-50 border border-sky-100">
                      {typeIcons[selectedFile.type] || <FileText className="w-5 h-5 text-sky-600" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xs font-bold text-slate-800">{selectedFile.name}</h3>
                        <span className={`px-2 py-0.5 rounded text-[7px] font-bold ${selectedFile.type === 'PDF' ? 'bg-rose-50 text-rose-700 border border-rose-200' : selectedFile.type === 'Excel' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>{selectedFile.type}</span>
                      </div>
                      <p className="text-[9px] text-slate-500 font-mono">Size: {selectedFile.size}  Date: {selectedFile.date}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedFile(null)} className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500"><X className="w-3.5 h-3.5" /></button>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Tags</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      {selectedFile.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 rounded-lg text-[8px] font-bold bg-sky-50 text-sky-700 border border-sky-100">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Linked Module</span>
                      <p className="text-xs text-slate-800 mt-1 font-medium">{selectedFile.linkedTo}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Uploaded By</span>
                      <p className="text-xs text-slate-800 mt-1 font-medium">{selectedFile.uploadedBy}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Location</span>
                    <p className="text-xs text-slate-700 mt-1">Radiology / Evidence Repository / <span className="font-bold text-slate-900">{selectedFile.folder}</span></p>
                  </div>
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                    <button className="px-3 py-2 rounded-xl border border-slate-200 text-[9px] font-bold text-slate-600 flex items-center gap-1.5 hover:border-sky-300 hover:text-sky-700 cursor-pointer"><Eye className="w-3.5 h-3.5" /> Preview</button>
                    <button className="px-3 py-2 rounded-xl border border-slate-200 text-[9px] font-bold text-slate-600 flex items-center gap-1.5 hover:border-emerald-300 hover:text-emerald-700 cursor-pointer"><Download className="w-3.5 h-3.5" /> Download</button>
                    <button className="px-3 py-2 rounded-xl border border-slate-200 text-[9px] font-bold text-slate-600 flex items-center gap-1.5 hover:border-amber-300 hover:text-amber-700 cursor-pointer"><Upload className="w-3.5 h-3.5" /> Replace</button>
                    <button style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[9px] font-bold flex items-center gap-1.5 hover:brightness-95 cursor-pointer"><Plus className="w-3.5 h-3.5" /> Link to CAPA / Audit</button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3 mb-4">Quick Upload Zone</h3>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-sky-300 hover:bg-sky-50/10 transition-all cursor-pointer">
                <Upload className="w-8 h-8 text-slate-300" />
                <p className="text-[10px] font-bold text-slate-500">Drag and drop files here, or click to browse</p>
                <p className="text-[9px] text-slate-400">Supports PDF, DOCX, Images, Excel  Max 25 MB per file  Auto-detect tags</p>
                <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
                  {['AERB Documents', 'Calibration Certificates', 'Audit Reports', 'Radiation Monitoring', 'Training Records', 'CAPA Evidence'].map(folder => (
                    <button key={folder} onClick={(e) => { e.stopPropagation(); alert(`Upload to: ${folder}`); }} className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[8px] font-bold text-slate-600 hover:border-sky-300 hover:text-sky-700 cursor-pointer transition-colors">{folder}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'reports' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800">Report Library</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input value={reportSearch} onChange={e => setReportSearch(e.target.value)} placeholder="Search reports..." className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-[10px] text-slate-700 placeholder:text-slate-400 w-48" />
                </div>
                <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-[10px] font-bold text-slate-600 cursor-pointer">
                  {reportCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredReports.map(report => {
                const sc = statusConfig[report.status] || statusConfig['Draft'];
                const icon = categoryIcons[report.category] || <FileText className="w-4 h-4 text-slate-500" />;
                const isSelected = selectedReport?.id === report.id;
                return (
                  <div key={report.id} onClick={() => setSelectedReport(isSelected ? null : report)} className={`bg-white border rounded-2xl p-4 shadow-sm cursor-pointer transition-all hover:shadow-md ${isSelected ? 'border-sky-300 ring-1 ring-sky-200' : 'border-slate-200'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 shrink-0">{icon}</div>
                        <div className="min-w-0">
                          <h4 className="text-[11px] font-bold text-slate-800 leading-snug">{report.name}</h4>
                          <p className="text-[8px] text-slate-400 font-mono mt-0.5">{report.type} Report  {report.pages} pages</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-[8px] font-bold border shrink-0 ${sc.bg} ${sc.text} ${sc.border}`}>{report.status}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                      {report.tags.map((tag, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded text-[7px] font-bold bg-slate-100 text-slate-600 border border-slate-200">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="text-[9px] text-slate-500">
                        <span className="font-bold text-slate-700">{report.author}</span>  {report.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={(e) => { e.stopPropagation(); handleExport(report, 'pdf'); }} className="px-2 py-1 rounded-lg border border-slate-200 text-[8px] font-bold text-slate-600 flex items-center gap-1 hover:border-sky-300 hover:text-sky-700 cursor-pointer"><Download className="w-3 h-3" /> PDF</button>
                        <button onClick={(e) => { e.stopPropagation(); handleExport(report, 'excel'); }} className="px-2 py-1 rounded-lg border border-slate-200 text-[8px] font-bold text-slate-600 flex items-center gap-1 hover:border-emerald-300 hover:text-emerald-700 cursor-pointer"><Download className="w-3 h-3" /> Excel</button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredReports.length === 0 && (
                <div className="col-span-full py-10 flex flex-col items-center justify-center">
                  <FileText className="w-10 h-10 text-slate-300 mb-3" />
                  <p className="text-[10px] font-bold text-slate-500">No reports found</p>
                  <p className="text-[9px] text-slate-400 mt-1">Try a different filter or search</p>
                </div>
              )}
            </div>

            {selectedReport && (
              <div className="bg-white border border-sky-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xs font-bold text-slate-800">{selectedReport.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold border ${(statusConfig[selectedReport.status] || statusConfig['Draft']).bg} ${(statusConfig[selectedReport.status] || statusConfig['Draft']).text} ${(statusConfig[selectedReport.status] || statusConfig['Draft']).border}`}>{selectedReport.status}</span>
                      <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-slate-100 text-slate-600 border border-slate-200">{selectedReport.type}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[9px] text-slate-500">
                      <span>Author: <span className="font-bold text-slate-700">{selectedReport.author}</span></span>
                      <span>Date: <span className="font-bold text-slate-700">{selectedReport.date}</span></span>
                      <span>Pages: <span className="font-bold text-slate-700">{selectedReport.pages}</span></span>
                      <span>Category: <span className="font-bold text-slate-700">{selectedReport.category}</span></span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedReport(null)} className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 shrink-0"><X className="w-3.5 h-3.5" /></button>
                </div>

                <div className="border-b border-slate-100 px-6 py-2 flex items-center gap-2">
                  {['overview', 'preview', 'related'].map(mode => (
                    <button key={mode} onClick={() => setReportViewMode(mode)} className={`px-3 py-1.5 rounded-lg text-[9px] font-bold capitalize cursor-pointer transition-colors ${reportViewMode === mode ? 'bg-sky-50 text-sky-700 border border-sky-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
                      {mode === 'overview' ? 'Overview' : mode === 'preview' ? 'Report Preview' : 'Related Evidence'}
                    </button>
                  ))}
                  <div className="flex-1" />
                  <select value={reportFormat} onChange={e => setReportFormat(e.target.value)} className="px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-[9px] font-bold text-slate-600 cursor-pointer mr-2">
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="word">Word</option>
                  </select>
                  <button onClick={() => handleExport(selectedReport, reportFormat)} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1.5 hover:brightness-95 cursor-pointer shadow-sm">
                    <Download className="w-3 h-3" /> Download
                  </button>
                  {selectedReport.status === 'Draft' && (
                    <button onClick={() => handleSendForReview(selectedReport.id)} className="px-3 py-1.5 rounded-lg border border-slate-200 text-[9px] font-bold text-slate-600 hover:border-sky-300 hover:text-sky-700 cursor-pointer">Send for Review</button>
                  )}
                  {selectedReport.status === 'In Review' && (
                    <button onClick={() => handlePublish(selectedReport.id)} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1.5 hover:brightness-95 cursor-pointer shadow-sm">
                      <CheckCircle className="w-3 h-3" /> Publish
                    </button>
                  )}
                </div>

                <div className="p-6">
                  {reportViewMode === 'overview' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                          { label: 'Report ID', value: selectedReport.id.toUpperCase(), color: 'text-slate-700' },
                          { label: 'Category', value: selectedReport.category, color: 'text-sky-600' },
                          { label: 'Type', value: selectedReport.type, color: 'text-purple-600' },
                          { label: 'Pages', value: selectedReport.pages, color: 'text-amber-600' }
                        ].map((kpi, idx) => (
                          <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                            <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                            <p className={`text-sm font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="bg-white border border-slate-200 rounded-xl p-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2 mb-3">Summary</h4>
                        <p className="text-xs text-slate-700 leading-relaxed">{selectedReport.summary}</p>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-xl p-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2 mb-3">Tags</h4>
                        <div className="flex items-center gap-2 flex-wrap">
                          {selectedReport.tags.map((tag, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-lg text-[9px] font-bold bg-sky-50 text-sky-700 border border-sky-100">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {reportViewMode === 'preview' && (
                    <div className="space-y-4">
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">{selectedReport.name}</h4>
                          <span className="text-[9px] font-bold text-slate-400">Generated: {selectedReport.date}</span>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-lg p-5 min-h-[300px]">
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-xs font-bold text-slate-800 mb-2">Executive Summary</h5>
                              <p className="text-[11px] text-slate-600 leading-relaxed">{selectedReport.summary}</p>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-bold text-slate-600">{previewCharts[selectedReport.id]?.title || 'Key Metrics'}</span>
                                <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${previewCharts[selectedReport.id]?.trend === 'up' ? 'bg-emerald-50 text-emerald-700' : previewCharts[selectedReport.id]?.trend === 'down' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}`}>
                                  {previewCharts[selectedReport.id]?.trend === 'up' ? ' Improving' : previewCharts[selectedReport.id]?.trend === 'down' ? ' Declining' : ' Stable'}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-700 font-mono bg-white border border-slate-200 rounded-lg px-4 py-3">{previewCharts[selectedReport.id]?.data || 'No data available'}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              {[1, 2, 3, 4].map(section => (
                                <div key={section} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                                    <span className="text-[9px] font-bold text-slate-600">Section {section} of {selectedReport.pages}</span>
                                  </div>
                                  <div className="space-y-1.5">
                                    {[1, 2, 3].map(line => (
                                      <div key={line} className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-slate-300 rounded-full" style={{ width: `${Math.max(40, Math.min(95, 60 + Math.random() * 30))}%` }}></div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="bg-white border border-slate-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-bold text-slate-600">Document Outline</span>
                                <span className="text-[9px] font-bold text-slate-400">{selectedReport.pages} pages</span>
                              </div>
                              <div className="space-y-2">
                                {Array.from({ length: Math.min(selectedReport.pages, 8) }, (_, i) => (
                                  <div key={i} className="flex items-center gap-3">
                                    <span className="text-[9px] font-bold text-slate-400 w-8">p.{i + 1}</span>
                                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                      <div className="h-full bg-sky-200 rounded-full" style={{ width: `${70 + Math.random() * 25}%` }}></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {reportViewMode === 'related' && (
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">Linked Evidence Files</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {getRelatedFiles(selectedReport.id).length > 0 ? (
                          getRelatedFiles(selectedReport.id).map(file => (
                            <div key={file.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-white border border-slate-100 shrink-0">
                                  {typeIcons[file.type] || <FileText className="w-4 h-4 text-slate-500" />}
                                </div>
                                <div className="min-w-0">
                                  <h5 className="text-[10px] font-bold text-slate-800 truncate">{file.name}</h5>
                                  <p className="text-[8px] text-slate-400 mt-0.5">v{file.type}  {file.size}  {file.date}</p>
                                  <div className="flex items-center gap-1 mt-1 flex-wrap">
                                    {file.tags.slice(0, 3).map((tag, i) => (
                                      <span key={i} className="px-1.5 py-0.5 rounded text-[7px] font-bold bg-sky-50 text-sky-700 border border-sky-100">{tag}</span>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 ml-auto shrink-0">
                                  <button className="px-2 py-1 rounded-lg border border-slate-200 text-[8px] font-bold text-slate-600 hover:border-sky-300 hover:text-sky-700 cursor-pointer"><Eye className="w-3 h-3" /></button>
                                  <button className="px-2 py-1 rounded-lg border border-slate-200 text-[8px] font-bold text-slate-600 hover:border-emerald-300 hover:text-emerald-700 cursor-pointer"><Download className="w-3 h-3" /></button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-full py-6 flex flex-col items-center justify-center">
                            <Folder className="w-8 h-8 text-slate-300 mb-2" />
                            <p className="text-[9px] font-bold text-slate-500">No linked evidence files</p>
                            <p className="text-[8px] text-slate-400 mt-1">Evidence can be linked to reports from the Evidence Repository</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Upload AERB Document Modal ─────────────────────────────────── */}
        {isAddAerDocModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl shadow-lg p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-sky-600" />
                  Upload AERB Document
                </h3>
                <button
                  onClick={() => setIsAddAerDocModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleUploadAerDoc} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Title</label>
                  <input type="text" placeholder="Document Title" value={aerDocFormData.title}
                    onChange={(e) => setAerDocFormData({ ...aerDocFormData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Document Number</label>
                  <input type="text" placeholder="e.g. AERB/RAD/2024/001" value={aerDocFormData.documentNo}
                    onChange={(e) => setAerDocFormData({ ...aerDocFormData, documentNo: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Issue Date</label>
                    <input type="date" value={aerDocFormData.issueDate}
                      onChange={(e) => setAerDocFormData({ ...aerDocFormData, issueDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Expiry Date</label>
                    <input type="date" value={aerDocFormData.expiryDate}
                      onChange={(e) => setAerDocFormData({ ...aerDocFormData, expiryDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">File Upload</label>
                  <input type="file" onChange={(e) => setAerDocFormData({ ...aerDocFormData, file: e.target.files[0] })}
                    className="w-full text-[10px] text-slate-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Status</label>
                  <select value={aerDocFormData.status}
                    onChange={(e) => setAerDocFormData({ ...aerDocFormData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400">
                    <option value="Valid">Valid</option>
                    <option value="Expiring Soon">Expiring Soon</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setIsAddAerDocModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-[10px] font-bold hover:bg-slate-50 transition-all cursor-pointer">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }}
                    className="px-4 py-2 rounded-xl text-white text-[10px] font-bold hover:opacity-90 transition-all cursor-pointer">Upload</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── View AERB Document Modal ───────────────────────────────────── */}
        {viewModalOpen && selectedAerDoc && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 w-full max-w-3xl rounded-2xl shadow-lg p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-sky-600" />
                  {selectedAerDoc.title}
                </h3>
                <button
                  onClick={() => { setViewModalOpen(false); setSelectedAerDoc(null); }}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-[10px]">
                <div><span className="font-bold text-slate-400 uppercase tracking-wider">Document No</span><p className="font-mono text-slate-700 mt-1">{selectedAerDoc.documentNo}</p></div>
                <div><span className="font-bold text-slate-400 uppercase tracking-wider">Status</span><p className={`mt-1 inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${selectedAerDoc.status === 'Valid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : selectedAerDoc.status === 'Expiring Soon' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>{selectedAerDoc.status}</p></div>
                <div><span className="font-bold text-slate-400 uppercase tracking-wider">Issue Date</span><p className="text-slate-700 mt-1">{selectedAerDoc.issueDate}</p></div>
                <div><span className="font-bold text-slate-400 uppercase tracking-wider">Expiry Date</span><p className="text-slate-700 mt-1">{selectedAerDoc.expiryDate}</p></div>
              </div>
              <div className="min-h-[40vh] rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
                {selectedAerDoc.fileUrl ? (
                  <iframe src={selectedAerDoc.fileUrl} className="w-full h-[40vh]" title={selectedAerDoc.title} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-[40vh] text-slate-400">
                    <FileText className="w-12 h-12 mb-3 text-slate-300" />
                    <p className="text-xs font-medium">No document preview available</p>
                    <p className="text-[10px] mt-1">Upload a file to enable preview</p>
                  </div>
                )}
              </div>
              <div className="flex justify-end pt-1">
                <button onClick={() => { setViewModalOpen(false); setSelectedAerDoc(null); }}
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-4 py-2 rounded-xl text-white text-[10px] font-bold hover:opacity-90 transition-all cursor-pointer">Close</button>
              </div>
            </div>
          </div>
        )}

        {/* ── New Radiation Safety Audit Modal ─────────────────────────── */}
        {isAddAuditModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 w-full max-w-lg rounded-2xl shadow-lg p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Search className="w-4 h-4 text-sky-600" />
                  New Radiation Safety Audit
                </h3>
                <button
                  onClick={() => setIsAddAuditModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleAddAudit} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Audit Title</label>
                  <input type="text" placeholder="e.g. Quarterly Radiation Safety Audit" value={auditFormData.title}
                    onChange={(e) => setAuditFormData({ ...auditFormData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Audit Date</label>
                    <input type="date" value={auditFormData.date}
                      onChange={(e) => setAuditFormData({ ...auditFormData, date: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Status</label>
                    <select value={auditFormData.status}
                      onChange={(e) => setAuditFormData({ ...auditFormData, status: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400">
                      <option value="Planned">Planned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Auditor</label>
                  <input type="text" placeholder="e.g. RSO / Dr. Mehta" value={auditFormData.auditor}
                    onChange={(e) => setAuditFormData({ ...auditFormData, auditor: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Scope</label>
                  <input type="text" placeholder="e.g. All imaging rooms" value={auditFormData.scope}
                    onChange={(e) => setAuditFormData({ ...auditFormData, scope: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Findings Count</label>
                  <input type="number" min="0" value={auditFormData.findings}
                    onChange={(e) => setAuditFormData({ ...auditFormData, findings: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Remarks</label>
                  <textarea rows={2} placeholder="Any additional remarks or observations..." value={auditFormData.remarks}
                    onChange={(e) => setAuditFormData({ ...auditFormData, remarks: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400 resize-none" />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setIsAddAuditModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-[10px] font-bold hover:bg-slate-50 transition-all cursor-pointer">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }}
                    className="px-4 py-2 rounded-xl text-white text-[10px] font-bold hover:opacity-90 transition-all cursor-pointer">Save Audit</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── Add Equipment Modal ───────────────────────────────────────────── */}
        {isAddEquipModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 w-full max-w-lg rounded-2xl shadow-lg p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-sky-600" />
                  Add Equipment
                </h3>
                <button
                  onClick={() => setIsAddEquipModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleAddEquipment} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Equipment Name</label>
                  <input type="text" placeholder="e.g. CT Scanner - 128 Slice" value={equipFormData.name}
                    onChange={(e) => setEquipFormData({ ...equipFormData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Equipment Type</label>
                  <input type="text" placeholder="e.g. CT Scanner" value={equipFormData.type}
                    onChange={(e) => setEquipFormData({ ...equipFormData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Manufacturer</label>
                  <input type="text" placeholder="e.g. Siemens" value={equipFormData.manufacturer}
                    onChange={(e) => setEquipFormData({ ...equipFormData, manufacturer: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Model Number</label>
                    <input type="text" placeholder="e.g. SOMATOM Definition" value={equipFormData.model}
                      onChange={(e) => setEquipFormData({ ...equipFormData, model: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Serial Number</label>
                    <input type="text" placeholder="e.g. SN-12345" value={equipFormData.serialNumber}
                      onChange={(e) => setEquipFormData({ ...equipFormData, serialNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Installation Date</label>
                  <input type="date" value={equipFormData.installationDate}
                    onChange={(e) => setEquipFormData({ ...equipFormData, installationDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Location</label>
                  <input type="text" placeholder="e.g. Radiology Floor 1" value={equipFormData.location}
                    onChange={(e) => setEquipFormData({ ...equipFormData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Status</label>
                  <select value={equipFormData.status}
                    onChange={(e) => setEquipFormData({ ...equipFormData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400">
                    <option value="Operational">Operational</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setIsAddEquipModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-[10px] font-bold hover:bg-slate-50 transition-all cursor-pointer">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }}
                    className="px-4 py-2 rounded-xl text-white text-[10px] font-bold hover:opacity-90 transition-all cursor-pointer">Save Equipment</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── Add Calibration Record Modal ────────────────────────────────── */}
        {isAddCalibModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 w-full max-w-lg rounded-2xl shadow-lg p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-600" />
                  Add Calibration Record
                </h3>
                <button
                  onClick={() => setIsAddCalibModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleAddCalibration} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Equipment</label>
                  <select value={calibFormData.equipment}
                    onChange={(e) => setCalibFormData({ ...calibFormData, equipment: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required>
                    <option value="">Select Equipment</option>
                    {equipment.map(eq => (
                      <option key={eq.id} value={eq.name}>{eq.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Calibration Type</label>
                  <input type="text" placeholder="e.g. CTDI Phantom" value={calibFormData.type}
                    onChange={(e) => setCalibFormData({ ...calibFormData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Calibration Date</label>
                    <input type="date" value={calibFormData.calibrationDate}
                      onChange={(e) => setCalibFormData({ ...calibFormData, calibrationDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Next Due Date</label>
                    <input type="date" value={calibFormData.nextDue}
                      onChange={(e) => setCalibFormData({ ...calibFormData, nextDue: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Calibration Agency</label>
                  <input type="text" placeholder="e.g. AERB Approved Lab" value={calibFormData.agency}
                    onChange={(e) => setCalibFormData({ ...calibFormData, agency: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Certificate Number</label>
                  <input type="text" placeholder="e.g. CERT/CT/2025/001" value={calibFormData.certificate}
                    onChange={(e) => setCalibFormData({ ...calibFormData, certificate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Status</label>
                  <select value={calibFormData.status}
                    onChange={(e) => setCalibFormData({ ...calibFormData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400">
                    <option value="Valid">Valid</option>
                    <option value="Due Soon">Due Soon</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Remarks</label>
                  <textarea rows={2} placeholder="Any additional remarks..." value={calibFormData.remarks}
                    onChange={(e) => setCalibFormData({ ...calibFormData, remarks: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400 resize-none" />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setIsAddCalibModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-[10px] font-bold hover:bg-slate-50 transition-all cursor-pointer">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }}
                    className="px-4 py-2 rounded-xl text-white text-[10px] font-bold hover:opacity-90 transition-all cursor-pointer">Save Record</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── Schedule PPM Modal ──────────────────────────────────────────────── */}
        {isAddMaintenanceModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 w-full max-w-lg rounded-2xl shadow-lg p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Clipboard className="w-4 h-4 text-sky-600" />
                  Schedule PPM
                </h3>
                <button
                  onClick={() => setIsAddMaintenanceModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleAddMaintenance} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Equipment</label>
                  <select value={maintenanceFormData.equipment}
                    onChange={(e) => setMaintenanceFormData({ ...maintenanceFormData, equipment: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required>
                    <option value="">Select Equipment</option>
                    {equipment.map(eq => (
                      <option key={eq.id} value={eq.name}>{eq.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Maintenance Type</label>
                  <input type="text" placeholder="e.g. Preventive Maintenance" value={maintenanceFormData.type}
                    onChange={(e) => setMaintenanceFormData({ ...maintenanceFormData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Scheduled Date</label>
                    <input type="date" value={maintenanceFormData.scheduledDate}
                      onChange={(e) => setMaintenanceFormData({ ...maintenanceFormData, scheduledDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Next Due Date</label>
                    <input type="date" value={maintenanceFormData.nextDue}
                      onChange={(e) => setMaintenanceFormData({ ...maintenanceFormData, nextDue: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Technician / Vendor</label>
                  <input type="text" placeholder="e.g. Biomedical Team" value={maintenanceFormData.technician}
                    onChange={(e) => setMaintenanceFormData({ ...maintenanceFormData, technician: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Status</label>
                  <select value={maintenanceFormData.status}
                    onChange={(e) => setMaintenanceFormData({ ...maintenanceFormData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400">
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Remarks</label>
                  <textarea rows={2} placeholder="Any additional remarks..." value={maintenanceFormData.remarks}
                    onChange={(e) => setMaintenanceFormData({ ...maintenanceFormData, remarks: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400 resize-none" />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setIsAddMaintenanceModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-[10px] font-bold hover:bg-slate-50 transition-all cursor-pointer">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }}
                    className="px-4 py-2 rounded-xl text-white text-[10px] font-bold hover:opacity-90 transition-all cursor-pointer">Save Record</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── Report Breakdown Modal ─────────────────────────────────────────── */}
        {isAddBreakdownModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 w-full max-w-lg rounded-2xl shadow-lg p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-sky-600" />
                  Report Breakdown
                </h3>
                <button
                  onClick={() => setIsAddBreakdownModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleAddBreakdown} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Equipment</label>
                  <select value={breakdownFormData.equipment}
                    onChange={(e) => setBreakdownFormData({ ...breakdownFormData, equipment: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required>
                    <option value="">Select Equipment</option>
                    {equipment.map(eq => (
                      <option key={eq.id} value={eq.name}>{eq.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Breakdown Date</label>
                    <input type="date" value={breakdownFormData.breakdownDate}
                      onChange={(e) => setBreakdownFormData({ ...breakdownFormData, breakdownDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Downtime Hours</label>
                    <input type="number" min="0" value={breakdownFormData.downtimeHours}
                      onChange={(e) => setBreakdownFormData({ ...breakdownFormData, downtimeHours: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Fault / Issue Description</label>
                  <textarea rows={2} placeholder="Describe the fault or issue..." value={breakdownFormData.faultDescription}
                    onChange={(e) => setBreakdownFormData({ ...breakdownFormData, faultDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400 resize-none" required />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Reported By</label>
                  <input type="text" placeholder="e.g. Technician Name" value={breakdownFormData.reportedBy}
                    onChange={(e) => setBreakdownFormData({ ...breakdownFormData, reportedBy: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Severity</label>
                    <select value={breakdownFormData.severity}
                      onChange={(e) => setBreakdownFormData({ ...breakdownFormData, severity: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Status</label>
                    <select value={breakdownFormData.status}
                      onChange={(e) => setBreakdownFormData({ ...breakdownFormData, status: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400" required>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Remarks</label>
                  <textarea rows={2} placeholder="Any additional remarks..." value={breakdownFormData.remarks}
                    onChange={(e) => setBreakdownFormData({ ...breakdownFormData, remarks: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-400 resize-none" />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setIsAddBreakdownModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-[10px] font-bold hover:bg-slate-50 transition-all cursor-pointer">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }}
                    className="px-4 py-2 rounded-xl text-white text-[10px] font-bold hover:opacity-90 transition-all cursor-pointer">Save Record</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default RadiologyWorkspace;

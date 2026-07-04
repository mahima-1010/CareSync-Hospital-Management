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

// ── Phase 5: Fire Incidents constants ──
const LS_KEY_INCIDENTS = 'fire_incidents';
const LS_KEY_NEARMISS = 'fire_near_miss';
const LS_KEY_EMERGENCY = 'fire_emergency_response';

const INCIDENT_TYPES = ['Electrical Fire', 'Chemical Fire', 'Gas Leak', 'Equipment Fire', 'Other'];
const SEVERITY_LEVELS = ['Low', 'Medium', 'High'];
const INCIDENT_STATUS = ['Open', 'Under Investigation', 'Closed'];

const INCIDENT_SEED = [
  { id: 'fi-001', incidentId: 'FI-001', incidentDate: '2025-11-12', incidentTime: '14:30', area: 'Electrical Room', incidentType: 'Electrical Fire', severity: 'High', rootCause: 'Short circuit', immediateActionTaken: 'Power isolated, fire extinguished', reportedBy: 'Tech Ramesh', status: 'Closed', remarks: 'Panel replaced' },
  { id: 'fi-002', incidentId: 'FI-002', incidentDate: '2026-02-15', incidentTime: '09:15', area: 'Kitchen', incidentType: 'Gas Leak', severity: 'Medium', rootCause: 'Valve failure', immediateActionTaken: 'Main valve shut off', reportedBy: 'Chef Kumar', status: 'Closed', remarks: 'Valve serviced' },
  { id: 'fi-003', incidentId: 'FI-003', incidentDate: '2026-04-10', incidentTime: '18:45', area: 'Server Room', incidentType: 'Equipment Fire', severity: 'Medium', rootCause: 'UPS overheating', immediateActionTaken: 'Activated gas suppression', reportedBy: 'IT Staff', status: 'Closed', remarks: 'Cooling improved' },
  { id: 'fi-004', incidentId: 'FI-004', incidentDate: '2026-06-05', incidentTime: '11:20', area: 'Pharmacy', incidentType: 'Chemical Fire', severity: 'Low', rootCause: 'Spilled solvent', immediateActionTaken: 'Cleaned up, area ventilated', reportedBy: 'Pharmacist Priya', status: 'Closed', remarks: 'SOP updated' },
  { id: 'fi-005', incidentId: 'FI-005', incidentDate: '2026-07-02', incidentTime: '15:00', area: 'Laundry', incidentType: 'Electrical Fire', severity: 'High', rootCause: 'Overloaded circuit', immediateActionTaken: 'Evacuated area, extinguisher used', reportedBy: 'Staff Sunita', status: 'Open', remarks: 'Pending electrical audit' },
];

const NEARMISS_SEED = [
  { id: 'nm-001', nearMissId: 'NM-001', date: '2026-01-20', area: 'ICU Corridor', hazard: 'Blocked fire exit', potentialConsequence: 'Delayed evacuation', reportedBy: 'Nurse Anjali', correctiveAction: 'Cleared boxes', status: 'Closed', remarks: 'Daily checks enforced' },
  { id: 'nm-002', nearMissId: 'NM-002', date: '2026-03-05', area: 'OT 3', hazard: 'Frayed wire near oxygen line', potentialConsequence: 'Explosion', reportedBy: 'Tech Vikram', correctiveAction: 'Replaced wire immediately', status: 'Closed', remarks: 'Checked all OTs' },
  { id: 'nm-003', nearMissId: 'NM-003', date: '2026-05-12', area: 'Generator Room', hazard: 'Diesel spill', potentialConsequence: 'Fire hazard', reportedBy: 'Maint. Staff', correctiveAction: 'Sand applied, cleaned', status: 'Closed', remarks: 'Drip tray installed' },
  { id: 'nm-004', nearMissId: 'NM-004', date: '2026-06-18', area: 'Basement', hazard: 'Smoking in non-smoking zone', potentialConsequence: 'Accidental fire', reportedBy: 'Security Guard', correctiveAction: 'Warning issued', status: 'Closed', remarks: 'Increased patrols' },
  { id: 'nm-005', nearMissId: 'NM-005', date: '2026-07-01', area: 'Lab', hazard: 'Chemicals stored near heat source', potentialConsequence: 'Chemical fire', reportedBy: 'Lab Tech', correctiveAction: 'Relocated chemicals', status: 'Closed', remarks: 'Training provided' },
];

const EMERGENCY_SEED = [
  { id: 'er-001', responseId: 'ER-001', incidentId: 'FI-001', responseStartTime: '14:32', responseEndTime: '14:45', teamLeader: 'Safety Officer Raj', fireBrigadeInformed: 'No', patientsEvacuated: '0', staffInvolved: '5', outcome: 'Controlled', remarks: 'Quick response' },
  { id: 'er-002', responseId: 'ER-002', incidentId: 'FI-002', responseStartTime: '09:16', responseEndTime: '09:30', teamLeader: 'Safety Officer Raj', fireBrigadeInformed: 'No', patientsEvacuated: '0', staffInvolved: '3', outcome: 'Controlled', remarks: '' },
  { id: 'er-003', responseId: 'ER-003', incidentId: 'FI-003', responseStartTime: '18:46', responseEndTime: '19:00', teamLeader: 'Fire Engineer Suraj', fireBrigadeInformed: 'No', patientsEvacuated: '0', staffInvolved: '4', outcome: 'Controlled', remarks: '' },
  { id: 'er-004', responseId: 'ER-004', incidentId: 'FI-004', responseStartTime: '11:22', responseEndTime: '11:35', teamLeader: 'Safety Officer Raj', fireBrigadeInformed: 'No', patientsEvacuated: '0', staffInvolved: '2', outcome: 'Controlled', remarks: '' },
  { id: 'er-005', responseId: 'ER-005', incidentId: 'FI-005', responseStartTime: '15:02', responseEndTime: '15:25', teamLeader: 'Fire Engineer Suraj', fireBrigadeInformed: 'Yes', patientsEvacuated: '10', staffInvolved: '8', outcome: 'Controlled', remarks: 'Fire brigade arrived in 12 mins' },
];

// ── Phase 6: Internal Audit constants ──
const LS_KEY_AUDITS = 'fire_internal_audits';
const LS_KEY_CAPAS  = 'fire_capa_records';

const AUDIT_TYPES = ['Routine Inspection', 'Surprise Audit', 'Statutory Compliance', 'Third-Party Audit'];
const AUDIT_STATUS = ['Pending', 'Completed', 'Follow-up Required'];
const CAPA_STATUS = ['Open', 'In Progress', 'Closed'];

const AUDIT_SEED = [
  { id: 'fa-001', auditId: 'FA-001', auditDate: '2026-01-15', auditArea: 'Basement Parking', auditType: 'Routine Inspection', auditor: 'Safety Officer Raj', compliance: 85, findings: 'Minor blockage near exit', observation: 'Extinguishers need refilling', status: 'Follow-up Required', followUpDate: '2026-02-15', remarks: 'Notified maintenance' },
  { id: 'fa-002', auditId: 'FA-002', auditDate: '2026-03-10', auditArea: 'ICU Wing', auditType: 'Surprise Audit', auditor: 'Chief Fire Warden', compliance: 98, findings: 'All systems functional', observation: 'Staff well trained', status: 'Completed', followUpDate: '', remarks: 'Excellent performance' },
  { id: 'fa-003', auditId: 'FA-003', auditDate: '2026-04-20', auditArea: 'Entire Hospital', auditType: 'Statutory Compliance', auditor: 'External Agency', compliance: 92, findings: 'Alarm system needs testing', observation: 'Documentation is up to date', status: 'Follow-up Required', followUpDate: '2026-05-20', remarks: 'Certificate renewed conditionally' },
  { id: 'fa-004', auditId: 'FA-004', auditDate: '2026-06-05', auditArea: 'Kitchen', auditType: 'Routine Inspection', auditor: 'Safety Officer Raj', compliance: 95, findings: 'Grease buildup in exhaust', observation: 'Cleaned immediately', status: 'Completed', followUpDate: '', remarks: 'Routine cleaning schedule updated' },
  { id: 'fa-005', auditId: 'FA-005', auditDate: '2026-07-02', auditArea: 'Pharmacy', auditType: 'Third-Party Audit', auditor: 'Fire Dept Inspector', compliance: 90, findings: 'Missing signage', observation: 'Exit signs to be installed', status: 'Pending', followUpDate: '2026-07-15', remarks: 'Signs ordered' },
];

const CAPA_SEED = [
  { id: 'capa-001', capaId: 'CAPA-001', auditId: 'FA-001', observation: 'Extinguishers need refilling', rootCause: 'Missed schedule', correctiveAction: 'Refill extinguishers immediately', preventiveAction: 'Automate reminders', responsiblePerson: 'Maint Head', targetDate: '2026-02-01', completionDate: '2026-01-30', status: 'Closed', remarks: 'Resolved' },
  { id: 'capa-002', capaId: 'CAPA-002', auditId: 'FA-003', observation: 'Alarm system needs testing', rootCause: 'Panel fault', correctiveAction: 'Repair panel', preventiveAction: 'Quarterly maintenance contract', responsiblePerson: 'IT/Maint', targetDate: '2026-05-15', completionDate: '2026-05-10', status: 'Closed', remarks: 'AMC signed' },
  { id: 'capa-003', capaId: 'CAPA-003', auditId: 'FA-005', observation: 'Missing signage', rootCause: 'Renovation removed old signs', correctiveAction: 'Install new signs', preventiveAction: 'Post-renovation checklist', responsiblePerson: 'Facility Mgr', targetDate: '2026-07-15', completionDate: '', status: 'In Progress', remarks: 'Signs arrived, pending install' },
  { id: 'capa-004', capaId: 'CAPA-004', auditId: 'FA-001', observation: 'Minor blockage near exit', rootCause: 'Housekeeping stored boxes', correctiveAction: 'Clear boxes', preventiveAction: 'Staff training on exit routes', responsiblePerson: 'Housekeeping Sup', targetDate: '2026-01-20', completionDate: '2026-01-16', status: 'Closed', remarks: 'Cleared' },
  { id: 'capa-005', capaId: 'CAPA-005', auditId: 'FA-003', observation: 'Hydrant pressure low', rootCause: 'Leak in underground pipe', correctiveAction: 'Fix leak', preventiveAction: 'Pressure monitoring system', responsiblePerson: 'Plumber', targetDate: '2026-05-25', completionDate: '', status: 'Open', remarks: 'Contractor engaged' },
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

  // ── State: Fire Incidents & Emergency Response ──
  const [incidents, setIncidents] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_INCIDENTS);
    return saved ? JSON.parse(saved) : INCIDENT_SEED;
  });
  const [nearMisses, setNearMisses] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_NEARMISS);
    return saved ? JSON.parse(saved) : NEARMISS_SEED;
  });
  const [emergencyResponses, setEmergencyResponses] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_EMERGENCY);
    return saved ? JSON.parse(saved) : EMERGENCY_SEED;
  });

  const [activeIncidentSubTab, setActiveIncidentSubTab] = useState('incidents');

  // Modals & Forms for Incidents
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
  const [editingIncidentId, setEditingIncidentId] = useState(null);
  const [incidentSearch, setIncidentSearch] = useState('');
  const BLANK_INCIDENT_FORM = { id: '', incidentId: '', incidentDate: '', incidentTime: '', area: '', incidentType: 'Electrical Fire', severity: 'Medium', rootCause: '', immediateActionTaken: '', reportedBy: '', status: 'Open', remarks: '' };
  const [incidentForm, setIncidentForm] = useState(BLANK_INCIDENT_FORM);

  const [isNearMissModalOpen, setIsNearMissModalOpen] = useState(false);
  const [editingNearMissId, setEditingNearMissId] = useState(null);
  const [nearMissSearch, setNearMissSearch] = useState('');
  const BLANK_NEARMISS_FORM = { id: '', nearMissId: '', date: '', area: '', hazard: '', potentialConsequence: '', reportedBy: '', correctiveAction: '', status: 'Open', remarks: '' };
  const [nearMissForm, setNearMissForm] = useState(BLANK_NEARMISS_FORM);

  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [editingEmergencyId, setEditingEmergencyId] = useState(null);
  const [emergencySearch, setEmergencySearch] = useState('');
  const BLANK_EMERGENCY_FORM = { id: '', responseId: '', incidentId: '', responseStartTime: '', responseEndTime: '', teamLeader: '', fireBrigadeInformed: 'No', patientsEvacuated: '', staffInvolved: '', outcome: 'Controlled', remarks: '' };
  const [emergencyForm, setEmergencyForm] = useState(BLANK_EMERGENCY_FORM);

  // ── State: Internal Audit & CAPA ──
  const [audits, setAudits] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_AUDITS);
    return saved ? JSON.parse(saved) : AUDIT_SEED;
  });
  const [capas, setCapas] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_CAPAS);
    return saved ? JSON.parse(saved) : CAPA_SEED;
  });

  const [activeAuditSubTab, setActiveAuditSubTab] = useState('audits');

  // Modals & Forms for Internal Audit
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [editingAuditId, setEditingAuditId] = useState(null);
  const [auditSearch, setAuditSearch] = useState('');
  const BLANK_AUDIT_FORM = { id: '', auditId: '', auditDate: '', auditArea: '', auditType: 'Routine Inspection', auditor: '', compliance: '', findings: '', observation: '', status: 'Pending', followUpDate: '', remarks: '' };
  const [auditForm, setAuditForm] = useState(BLANK_AUDIT_FORM);

  const [isCapaModalOpen, setIsCapaModalOpen] = useState(false);
  const [editingCapaId, setEditingCapaId] = useState(null);
  const [capaSearch, setCapaSearch] = useState('');
  const BLANK_CAPA_FORM = { id: '', capaId: '', auditId: '', observation: '', rootCause: '', correctiveAction: '', preventiveAction: '', responsiblePerson: '', targetDate: '', completionDate: '', status: 'Open', remarks: '' };
  const [capaForm, setCapaForm] = useState(BLANK_CAPA_FORM);

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

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_INCIDENTS, JSON.stringify(incidents));
  }, [incidents]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_NEARMISS, JSON.stringify(nearMisses));
  }, [nearMisses]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_EMERGENCY, JSON.stringify(emergencyResponses));
  }, [emergencyResponses]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_AUDITS, JSON.stringify(audits));
  }, [audits]);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_CAPAS, JSON.stringify(capas));
  }, [capas]);

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

  // ── Incident Helpers ──
  const getNextIncidentId = () => {
    const maxNum = incidents.reduce((max, r) => {
      const match = r.incidentId.match(/(\d+)$/);
      return Math.max(max, match ? parseInt(match[1], 10) : 0);
    }, 0);
    const nextNum = String(maxNum + 1).padStart(3, '0');
    return { shortId: `fi-${nextNum}`, incidentId: `FI-${nextNum}` };
  };

  const getNextNearMissId = () => {
    const maxNum = nearMisses.reduce((max, r) => {
      const match = r.nearMissId.match(/(\d+)$/);
      return Math.max(max, match ? parseInt(match[1], 10) : 0);
    }, 0);
    const nextNum = String(maxNum + 1).padStart(3, '0');
    return { shortId: `nm-${nextNum}`, nearMissId: `NM-${nextNum}` };
  };

  const getNextEmergencyId = () => {
    const maxNum = emergencyResponses.reduce((max, r) => {
      const match = r.responseId.match(/(\d+)$/);
      return Math.max(max, match ? parseInt(match[1], 10) : 0);
    }, 0);
    const nextNum = String(maxNum + 1).padStart(3, '0');
    return { shortId: `er-${nextNum}`, responseId: `ER-${nextNum}` };
  };

  const handleOpenIncidentModal = (record = null) => {
    if (record) { setIncidentForm({ ...record }); setEditingIncidentId(record.id); }
    else { const ids = getNextIncidentId(); setIncidentForm({ ...BLANK_INCIDENT_FORM, id: ids.shortId, incidentId: ids.incidentId }); setEditingIncidentId(null); }
    setIsIncidentModalOpen(true);
  };
  const handleSaveIncident = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!incidentForm.incidentDate || !incidentForm.area || !incidentForm.incidentType) { alert('Incident Date, Area and Incident Type are required.'); return; }
    if (editingIncidentId) { setIncidents(prev => prev.map(r => r.id === editingIncidentId ? { ...incidentForm, id: editingIncidentId } : r)); }
    else { setIncidents(prev => [...prev, incidentForm]); }
    setIsIncidentModalOpen(false); setEditingIncidentId(null); setIncidentForm(BLANK_INCIDENT_FORM);
  };
  const handleDeleteIncident = (id) => {
    if (window.confirm('Delete this Fire Incident? This action cannot be undone.')) { setIncidents(prev => prev.filter(r => r.id !== id)); }
  };

  const handleOpenNearMissModal = (record = null) => {
    if (record) { setNearMissForm({ ...record }); setEditingNearMissId(record.id); }
    else { const ids = getNextNearMissId(); setNearMissForm({ ...BLANK_NEARMISS_FORM, id: ids.shortId, nearMissId: ids.nearMissId }); setEditingNearMissId(null); }
    setIsNearMissModalOpen(true);
  };
  const handleSaveNearMiss = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!nearMissForm.date || !nearMissForm.area || !nearMissForm.hazard) { alert('Date, Area and Hazard are required.'); return; }
    if (editingNearMissId) { setNearMisses(prev => prev.map(r => r.id === editingNearMissId ? { ...nearMissForm, id: editingNearMissId } : r)); }
    else { setNearMisses(prev => [...prev, nearMissForm]); }
    setIsNearMissModalOpen(false); setEditingNearMissId(null); setNearMissForm(BLANK_NEARMISS_FORM);
  };
  const handleDeleteNearMiss = (id) => {
    if (window.confirm('Delete this Near Miss record? This action cannot be undone.')) { setNearMisses(prev => prev.filter(r => r.id !== id)); }
  };

  const handleOpenEmergencyModal = (record = null) => {
    if (record) { setEmergencyForm({ ...record }); setEditingEmergencyId(record.id); }
    else { const ids = getNextEmergencyId(); setEmergencyForm({ ...BLANK_EMERGENCY_FORM, id: ids.shortId, responseId: ids.responseId }); setEditingEmergencyId(null); }
    setIsEmergencyModalOpen(true);
  };
  const handleSaveEmergency = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!emergencyForm.incidentId || !emergencyForm.responseStartTime) { alert('Incident ID and Response Start Time are required.'); return; }
    if (editingEmergencyId) { setEmergencyResponses(prev => prev.map(r => r.id === editingEmergencyId ? { ...emergencyForm, id: editingEmergencyId } : r)); }
    else { setEmergencyResponses(prev => [...prev, emergencyForm]); }
    setIsEmergencyModalOpen(false); setEditingEmergencyId(null); setEmergencyForm(BLANK_EMERGENCY_FORM);
  };
  const handleDeleteEmergency = (id) => {
    if (window.confirm('Delete this Emergency Response record? This action cannot be undone.')) { setEmergencyResponses(prev => prev.filter(r => r.id !== id)); }
  };

  // ── Internal Audit Helpers ──
  const getNextAuditId = () => {
    const maxNum = audits.reduce((max, r) => {
      const match = r.auditId.match(/(\d+)$/);
      return Math.max(max, match ? parseInt(match[1], 10) : 0);
    }, 0);
    const nextNum = String(maxNum + 1).padStart(3, '0');
    return { shortId: `fa-${nextNum}`, auditId: `FA-${nextNum}` };
  };

  const getNextCapaId = () => {
    const maxNum = capas.reduce((max, r) => {
      const match = r.capaId.match(/(\d+)$/);
      return Math.max(max, match ? parseInt(match[1], 10) : 0);
    }, 0);
    const nextNum = String(maxNum + 1).padStart(3, '0');
    return { shortId: `capa-${nextNum}`, capaId: `CAPA-${nextNum}` };
  };

  const handleOpenAuditModal = (record = null) => {
    if (record) { setAuditForm({ ...record }); setEditingAuditId(record.id); }
    else { const ids = getNextAuditId(); setAuditForm({ ...BLANK_AUDIT_FORM, id: ids.shortId, auditId: ids.auditId }); setEditingAuditId(null); }
    setIsAuditModalOpen(true);
  };
  const handleSaveAudit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!auditForm.auditDate || !auditForm.auditArea || !auditForm.auditor) { alert('Audit Date, Audit Area, and Auditor are required.'); return; }
    if (editingAuditId) { setAudits(prev => prev.map(r => r.id === editingAuditId ? { ...auditForm, id: editingAuditId } : r)); }
    else { setAudits(prev => [...prev, auditForm]); }
    setIsAuditModalOpen(false); setEditingAuditId(null); setAuditForm(BLANK_AUDIT_FORM);
  };
  const handleDeleteAudit = (id) => {
    if (window.confirm('Delete this Audit record? This action cannot be undone.')) { setAudits(prev => prev.filter(r => r.id !== id)); }
  };

  const handleOpenCapaModal = (record = null) => {
    if (record) { setCapaForm({ ...record }); setEditingCapaId(record.id); }
    else { const ids = getNextCapaId(); setCapaForm({ ...BLANK_CAPA_FORM, id: ids.shortId, capaId: ids.capaId }); setEditingCapaId(null); }
    setIsCapaModalOpen(true);
  };
  const handleSaveCapa = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!capaForm.auditId || !capaForm.observation || !capaForm.responsiblePerson) { alert('Audit ID, Observation, and Responsible Person are required.'); return; }
    if (editingCapaId) { setCapas(prev => prev.map(r => r.id === editingCapaId ? { ...capaForm, id: editingCapaId } : r)); }
    else { setCapas(prev => [...prev, capaForm]); }
    setIsCapaModalOpen(false); setEditingCapaId(null); setCapaForm(BLANK_CAPA_FORM);
  };
  const handleDeleteCapa = (id) => {
    if (window.confirm('Delete this CAPA record? This action cannot be undone.')) { setCapas(prev => prev.filter(r => r.id !== id)); }
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

      case 'incidents': {
        const totalIncidents = incidents.length;
        const highSeverity = incidents.filter(r => r.severity === 'High').length;
        const totalNearMisses = nearMisses.length;
        const openIncidents = incidents.filter(r => r.status === 'Open' || r.status === 'Under Investigation').length;
        const closedIncidents = incidents.filter(r => r.status === 'Closed').length;
        
        let totalResponseTime = 0;
        let validResponseCount = 0;
        emergencyResponses.forEach(r => {
          if (r.responseStartTime && r.responseEndTime) {
            const startParts = r.responseStartTime.split(':').map(Number);
            const endParts = r.responseEndTime.split(':').map(Number);
            const diff = (endParts[0] * 60 + endParts[1]) - (startParts[0] * 60 + startParts[1]);
            if (diff > 0) { totalResponseTime += diff; validResponseCount++; }
          }
        });
        const avgResponseTime = validResponseCount ? Math.round(totalResponseTime / validResponseCount) + ' mins' : '0 mins';
        
        const totalResponses = emergencyResponses.length;
        const successfulResponses = emergencyResponses.filter(r => r.outcome === 'Controlled').length;
        const responseSuccessPct = totalResponses ? Math.round((successfulResponses / totalResponses) * 100) : 0;
        const overallCompliance = (totalIncidents ? Math.round((closedIncidents / totalIncidents) * 100) : 100);

        const filteredIncidents = incidents.filter(r => {
          const q = incidentSearch.toLowerCase();
          return r.incidentId.toLowerCase().includes(q) || r.area.toLowerCase().includes(q) || r.incidentType.toLowerCase().includes(q) || r.status.toLowerCase().includes(q);
        });
        const filteredNearMisses = nearMisses.filter(r => {
          const q = nearMissSearch.toLowerCase();
          return r.nearMissId.toLowerCase().includes(q) || r.area.toLowerCase().includes(q) || r.hazard.toLowerCase().includes(q);
        });
        const filteredEmergencies = emergencyResponses.filter(r => {
          const q = emergencySearch.toLowerCase();
          return r.responseId.toLowerCase().includes(q) || r.incidentId.toLowerCase().includes(q) || r.teamLeader.toLowerCase().includes(q);
        });

        const STATUS_BADGE = {
          'Closed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
          'Controlled': 'bg-emerald-50 text-emerald-700 border-emerald-200',
          'Open': 'bg-rose-50 text-rose-700 border-rose-200',
          'Under Investigation': 'bg-amber-50 text-amber-700 border-amber-200',
          'High': 'bg-rose-50 text-rose-700 border-rose-200',
          'Medium': 'bg-amber-50 text-amber-700 border-amber-200',
          'Low': 'bg-emerald-50 text-emerald-700 border-emerald-200',
        };

        return (
          <div className="space-y-4">
            {/* Header */}
            <div>
              <h3 className="text-xs font-extrabold text-slate-800">Fire Incidents & Emergency Response</h3>
              <p className="text-[9px] text-slate-400 mt-0.5">Track fire incidents, near misses, and emergency responses</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Total Fire Incidents',       value: totalIncidents,     color: 'text-rose-600' },
                { label: 'High Severity Incidents',    value: highSeverity,       color: 'text-red-600' },
                { label: 'Near Miss Reports',          value: totalNearMisses,    color: 'text-amber-600' },
                { label: 'Open Incidents',             value: openIncidents,      color: 'text-orange-600' },
                { label: 'Closed Incidents',           value: closedIncidents,    color: 'text-emerald-600' },
                { label: 'Average Response Time',      value: avgResponseTime,    color: 'text-blue-600' },
                { label: 'Emergency Response Success %', value: `${responseSuccessPct}%`, color: 'text-teal-600' },
                { label: 'Overall Compliance %',       value: `${overallCompliance}%`, color: 'text-sky-600' },
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
                { id: 'incidents', label: 'Fire Incidents' },
                { id: 'nearmiss', label: 'Near Misses' },
                { id: 'emergency', label: 'Emergency Responses' },
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setActiveIncidentSubTab(sub.id)}
                  className={`px-4 py-2 text-[10px] font-bold transition-all border-b-2 ${
                    activeIncidentSubTab === sub.id
                      ? 'border-sky-500 text-sky-700'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* ── Fire Incident Register ── */}
            {activeIncidentSubTab === 'incidents' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search incidents..." value={incidentSearch} onChange={(e) => setIncidentSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <button onClick={() => handleOpenIncidentModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 shadow-sm">
                    <Plus className="w-3.5 h-3.5" /> Report Incident
                  </button>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>{['Incident ID', 'Date & Time', 'Area', 'Type', 'Severity', 'Root Cause', 'Reported By', 'Status', 'Actions'].map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredIncidents.map(r => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.incidentId}</td>
                            <td className="px-3 py-3 font-semibold text-slate-700">{r.incidentDate} <span className="text-slate-400 font-normal">{r.incidentTime}</span></td>
                            <td className="px-3 py-3 text-slate-600">{r.area}</td>
                            <td className="px-3 py-3 text-slate-600">{r.incidentType}</td>
                            <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.severity] || STATUS_BADGE['Medium']}`}>{r.severity}</span></td>
                            <td className="px-3 py-3 text-slate-600 truncate max-w-[120px]" title={r.rootCause}>{r.rootCause}</td>
                            <td className="px-3 py-3 text-slate-600">{r.reportedBy}</td>
                            <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE['Open']}`}>{r.status}</span></td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleOpenIncidentModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700"><Edit3 className="w-3 h-3" /></button>
                                <button onClick={() => handleDeleteIncident(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredIncidents.length === 0 && <tr><td colSpan={9} className="px-3 py-10 text-center text-[10px] text-slate-400">No fire incidents found.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── Near Miss Register ── */}
            {activeIncidentSubTab === 'nearmiss' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search near misses..." value={nearMissSearch} onChange={(e) => setNearMissSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <button onClick={() => handleOpenNearMissModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 shadow-sm">
                    <Plus className="w-3.5 h-3.5" /> Report Near Miss
                  </button>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>{['Near Miss ID', 'Date', 'Area', 'Hazard', 'Potential Consequence', 'Corrective Action', 'Reported By', 'Status', 'Actions'].map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredNearMisses.map(r => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.nearMissId}</td>
                            <td className="px-3 py-3 font-semibold text-slate-700">{r.date}</td>
                            <td className="px-3 py-3 text-slate-600">{r.area}</td>
                            <td className="px-3 py-3 text-slate-600">{r.hazard}</td>
                            <td className="px-3 py-3 text-slate-600">{r.potentialConsequence}</td>
                            <td className="px-3 py-3 text-slate-600 truncate max-w-[120px]" title={r.correctiveAction}>{r.correctiveAction}</td>
                            <td className="px-3 py-3 text-slate-600">{r.reportedBy}</td>
                            <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE['Open']}`}>{r.status}</span></td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleOpenNearMissModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700"><Edit3 className="w-3 h-3" /></button>
                                <button onClick={() => handleDeleteNearMiss(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredNearMisses.length === 0 && <tr><td colSpan={9} className="px-3 py-10 text-center text-[10px] text-slate-400">No near miss records found.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── Emergency Response Log ── */}
            {activeIncidentSubTab === 'emergency' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search responses..." value={emergencySearch} onChange={(e) => setEmergencySearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <button onClick={() => handleOpenEmergencyModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 shadow-sm">
                    <Plus className="w-3.5 h-3.5" /> Log Response
                  </button>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>{['Response ID', 'Incident ID', 'Start Time', 'End Time', 'Team Leader', 'FB Informed', 'Outcome', 'Actions'].map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredEmergencies.map(r => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.responseId}</td>
                            <td className="px-3 py-3 font-semibold text-slate-700">{r.incidentId}</td>
                            <td className="px-3 py-3 text-slate-600">{r.responseStartTime}</td>
                            <td className="px-3 py-3 text-slate-600">{r.responseEndTime}</td>
                            <td className="px-3 py-3 text-slate-600">{r.teamLeader}</td>
                            <td className="px-3 py-3 text-slate-600">{r.fireBrigadeInformed}</td>
                            <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.outcome] || STATUS_BADGE['Closed']}`}>{r.outcome}</span></td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleOpenEmergencyModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700"><Edit3 className="w-3 h-3" /></button>
                                <button onClick={() => handleDeleteEmergency(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredEmergencies.length === 0 && <tr><td colSpan={8} className="px-3 py-10 text-center text-[10px] text-slate-400">No emergency responses logged.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── Incident Modal ── */}
            {isIncidentModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-extrabold text-slate-800">{editingIncidentId ? 'Edit Incident' : 'Report Incident'}</h3>
                    <button onClick={() => { setIsIncidentModalOpen(false); setEditingIncidentId(null); setIncidentForm(BLANK_INCIDENT_FORM); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
                  </div>
                  <form onSubmit={handleSaveIncident} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Incident ID</label><input type="text" value={incidentForm.incidentId} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-500 bg-slate-50" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Incident Date *</label><input type="date" value={incidentForm.incidentDate} onChange={e => setIncidentForm({...incidentForm, incidentDate: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Incident Time</label><input type="time" value={incidentForm.incidentTime} onChange={e => setIncidentForm({...incidentForm, incidentTime: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Area / Location *</label><input type="text" value={incidentForm.area} onChange={e => setIncidentForm({...incidentForm, area: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Incident Type *</label><select value={incidentForm.incidentType} onChange={e => setIncidentForm({...incidentForm, incidentType: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{INCIDENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Severity</label><select value={incidentForm.severity} onChange={e => setIncidentForm({...incidentForm, severity: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{SEVERITY_LEVELS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Reported By</label><input type="text" value={incidentForm.reportedBy} onChange={e => setIncidentForm({...incidentForm, reportedBy: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label><select value={incidentForm.status} onChange={e => setIncidentForm({...incidentForm, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{INCIDENT_STATUS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Root Cause</label><input type="text" value={incidentForm.rootCause} onChange={e => setIncidentForm({...incidentForm, rootCause: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Immediate Action Taken</label><input type="text" value={incidentForm.immediateActionTaken} onChange={e => setIncidentForm({...incidentForm, immediateActionTaken: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label><input type="text" value={incidentForm.remarks} onChange={e => setIncidentForm({...incidentForm, remarks: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button type="button" onClick={() => { setIsIncidentModalOpen(false); setEditingIncidentId(null); setIncidentForm(BLANK_INCIDENT_FORM); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold">Cancel</button>
                      <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 shadow-sm">{editingIncidentId ? 'Save Changes' : 'Report Incident'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ── Near Miss Modal ── */}
            {isNearMissModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-extrabold text-slate-800">{editingNearMissId ? 'Edit Near Miss' : 'Report Near Miss'}</h3>
                    <button onClick={() => { setIsNearMissModalOpen(false); setEditingNearMissId(null); setNearMissForm(BLANK_NEARMISS_FORM); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
                  </div>
                  <form onSubmit={handleSaveNearMiss} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Near Miss ID</label><input type="text" value={nearMissForm.nearMissId} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-500 bg-slate-50" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Date *</label><input type="date" value={nearMissForm.date} onChange={e => setNearMissForm({...nearMissForm, date: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Area *</label><input type="text" value={nearMissForm.area} onChange={e => setNearMissForm({...nearMissForm, area: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Hazard *</label><input type="text" value={nearMissForm.hazard} onChange={e => setNearMissForm({...nearMissForm, hazard: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Potential Consequence</label><input type="text" value={nearMissForm.potentialConsequence} onChange={e => setNearMissForm({...nearMissForm, potentialConsequence: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Corrective Action</label><input type="text" value={nearMissForm.correctiveAction} onChange={e => setNearMissForm({...nearMissForm, correctiveAction: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Reported By</label><input type="text" value={nearMissForm.reportedBy} onChange={e => setNearMissForm({...nearMissForm, reportedBy: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label><select value={nearMissForm.status} onChange={e => setNearMissForm({...nearMissForm, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500"><option value="Open">Open</option><option value="Closed">Closed</option></select></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label><input type="text" value={nearMissForm.remarks} onChange={e => setNearMissForm({...nearMissForm, remarks: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button type="button" onClick={() => { setIsNearMissModalOpen(false); setEditingNearMissId(null); setNearMissForm(BLANK_NEARMISS_FORM); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold">Cancel</button>
                      <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 shadow-sm">{editingNearMissId ? 'Save Changes' : 'Report Near Miss'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ── Emergency Response Modal ── */}
            {isEmergencyModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-extrabold text-slate-800">{editingEmergencyId ? 'Edit Emergency Response' : 'Log Emergency Response'}</h3>
                    <button onClick={() => { setIsEmergencyModalOpen(false); setEditingEmergencyId(null); setEmergencyForm(BLANK_EMERGENCY_FORM); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
                  </div>
                  <form onSubmit={handleSaveEmergency} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Response ID</label><input type="text" value={emergencyForm.responseId} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-500 bg-slate-50" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Incident ID *</label><input type="text" value={emergencyForm.incidentId} onChange={e => setEmergencyForm({...emergencyForm, incidentId: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Start Time *</label><input type="time" value={emergencyForm.responseStartTime} onChange={e => setEmergencyForm({...emergencyForm, responseStartTime: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">End Time</label><input type="time" value={emergencyForm.responseEndTime} onChange={e => setEmergencyForm({...emergencyForm, responseEndTime: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Team Leader</label><input type="text" value={emergencyForm.teamLeader} onChange={e => setEmergencyForm({...emergencyForm, teamLeader: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Fire Brigade Informed</label><select value={emergencyForm.fireBrigadeInformed} onChange={e => setEmergencyForm({...emergencyForm, fireBrigadeInformed: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500"><option value="Yes">Yes</option><option value="No">No</option></select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Patients Evacuated</label><input type="number" value={emergencyForm.patientsEvacuated} onChange={e => setEmergencyForm({...emergencyForm, patientsEvacuated: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Staff Involved</label><input type="number" value={emergencyForm.staffInvolved} onChange={e => setEmergencyForm({...emergencyForm, staffInvolved: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Outcome</label><select value={emergencyForm.outcome} onChange={e => setEmergencyForm({...emergencyForm, outcome: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500"><option value="Controlled">Controlled</option><option value="Escalated">Escalated</option><option value="Ongoing">Ongoing</option></select></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label><input type="text" value={emergencyForm.remarks} onChange={e => setEmergencyForm({...emergencyForm, remarks: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button type="button" onClick={() => { setIsEmergencyModalOpen(false); setEditingEmergencyId(null); setEmergencyForm(BLANK_EMERGENCY_FORM); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold">Cancel</button>
                      <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 shadow-sm">{editingEmergencyId ? 'Save Changes' : 'Log Response'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      }

      case 'audit': {
        const totalAudits = audits.length;
        const completedAudits = audits.filter(a => a.status === 'Completed').length;
        const pendingAudits = audits.filter(a => a.status === 'Pending').length;
        const avgAuditCompliance = audits.length ? Math.round(audits.reduce((sum, a) => sum + (parseFloat(a.compliance) || 0), 0) / audits.length) : 0;
        
        const openCapas = capas.filter(c => c.status === 'Open' || c.status === 'In Progress').length;
        const closedCapas = capas.filter(c => c.status === 'Closed').length;
        const followUpCompliance = capas.length ? Math.round((closedCapas / capas.length) * 100) : 0;
        const overallScore = Math.round((avgAuditCompliance + followUpCompliance) / 2) || 0;

        const auditKpis = [
          { label: 'Total Audits', value: totalAudits, icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Completed Audits', value: completedAudits, icon: ClipboardCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pending Audits', value: pendingAudits, icon: Search, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Avg Compliance %', value: `${avgAuditCompliance}%`, icon: ShieldCheck, color: 'text-sky-600', bg: 'bg-sky-50' },
          { label: 'Open CAPAs', value: openCapas, icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Closed CAPAs', value: closedCapas, icon: ClipboardList, color: 'text-teal-600', bg: 'bg-teal-50' },
          { label: 'Follow-up Compl. %', value: `${followUpCompliance}%`, icon: Flame, color: 'text-fuchsia-600', bg: 'bg-fuchsia-50' },
          { label: 'Overall Score', value: `${overallScore}%`, icon: LayoutDashboard, color: 'text-violet-600', bg: 'bg-violet-50' },
        ];

        const filteredAudits = audits.filter(a => Object.values(a).join(' ').toLowerCase().includes(auditSearch.toLowerCase()));
        const filteredCapas = capas.filter(c => Object.values(c).join(' ').toLowerCase().includes(capaSearch.toLowerCase()));

        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800">Internal Audit & CAPA</h2>
                <p className="text-xs text-slate-500 mt-1">Manage fire safety audits, statutory compliance, and corrective actions.</p>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-4 gap-4">
              {auditKpis.map((kpi, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.bg}`}>
                    <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</p>
                    <p className="text-xl font-extrabold text-slate-800">{kpi.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200">
              {[
                { id: 'audits', label: 'Internal Audits' },
                { id: 'capas', label: 'CAPA Tracker' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveAuditSubTab(tab.id)}
                  style={activeAuditSubTab === tab.id ? { color: hospital.themeColor, borderBottomColor: hospital.themeColor } : {}}
                  className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors ${
                    activeAuditSubTab === tab.id
                      ? 'border-sky-500 text-sky-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content: Audits */}
            {activeAuditSubTab === 'audits' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search audits..." value={auditSearch} onChange={(e) => setAuditSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <button onClick={() => handleOpenAuditModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 shadow-sm">
                    <Plus className="w-3.5 h-3.5" /> New Audit
                  </button>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>{['Audit ID', 'Date', 'Area', 'Type', 'Auditor', 'Compliance', 'Status', 'Actions'].map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredAudits.map(r => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.auditId}</td>
                            <td className="px-3 py-3 font-semibold text-slate-700">{r.auditDate}</td>
                            <td className="px-3 py-3 text-slate-600">{r.auditArea}</td>
                            <td className="px-3 py-3 text-slate-600">{r.auditType}</td>
                            <td className="px-3 py-3 text-slate-600">{r.auditor}</td>
                            <td className="px-3 py-3 font-bold text-slate-700">{r.compliance}%</td>
                            <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE['Pending']}`}>{r.status}</span></td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleOpenAuditModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700"><Edit3 className="w-3 h-3" /></button>
                                <button onClick={() => handleDeleteAudit(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredAudits.length === 0 && <tr><td colSpan={8} className="px-3 py-10 text-center text-[10px] text-slate-400">No audits found.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Content: CAPAs */}
            {activeAuditSubTab === 'capas' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search CAPAs..." value={capaSearch} onChange={(e) => setCapaSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <button onClick={() => handleOpenCapaModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 shadow-sm">
                    <Plus className="w-3.5 h-3.5" /> New CAPA
                  </button>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>{['CAPA ID', 'Audit ID', 'Observation', 'Action', 'Responsible', 'Target', 'Status', 'Actions'].map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredCapas.map(r => (
                          <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.capaId}</td>
                            <td className="px-3 py-3 font-semibold text-slate-700">{r.auditId}</td>
                            <td className="px-3 py-3 text-slate-600 truncate max-w-[120px]" title={r.observation}>{r.observation}</td>
                            <td className="px-3 py-3 text-slate-600 truncate max-w-[120px]" title={r.correctiveAction}>{r.correctiveAction}</td>
                            <td className="px-3 py-3 text-slate-600">{r.responsiblePerson}</td>
                            <td className="px-3 py-3 text-slate-600">{r.targetDate}</td>
                            <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE['Pending']}`}>{r.status}</span></td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleOpenCapaModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700"><Edit3 className="w-3 h-3" /></button>
                                <button onClick={() => handleDeleteCapa(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredCapas.length === 0 && <tr><td colSpan={8} className="px-3 py-10 text-center text-[10px] text-slate-400">No CAPA records found.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── Audit Modal ── */}
            {isAuditModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-extrabold text-slate-800">{editingAuditId ? 'Edit Audit' : 'New Audit'}</h3>
                    <button onClick={() => { setIsAuditModalOpen(false); setEditingAuditId(null); setAuditForm(BLANK_AUDIT_FORM); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
                  </div>
                  <form onSubmit={handleSaveAudit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Audit ID</label><input type="text" value={auditForm.auditId} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-500 bg-slate-50" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Date *</label><input type="date" value={auditForm.auditDate} onChange={e => setAuditForm({...auditForm, auditDate: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Area *</label><input type="text" value={auditForm.auditArea} onChange={e => setAuditForm({...auditForm, auditArea: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Type</label><select value={auditForm.auditType} onChange={e => setAuditForm({...auditForm, auditType: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{AUDIT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Auditor *</label><input type="text" value={auditForm.auditor} onChange={e => setAuditForm({...auditForm, auditor: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Compliance %</label><input type="number" min="0" max="100" value={auditForm.compliance} onChange={e => setAuditForm({...auditForm, compliance: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label><select value={auditForm.status} onChange={e => setAuditForm({...auditForm, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{AUDIT_STATUS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Follow-up Date</label><input type="date" value={auditForm.followUpDate} onChange={e => setAuditForm({...auditForm, followUpDate: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Findings</label><input type="text" value={auditForm.findings} onChange={e => setAuditForm({...auditForm, findings: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Observation</label><input type="text" value={auditForm.observation} onChange={e => setAuditForm({...auditForm, observation: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label><input type="text" value={auditForm.remarks} onChange={e => setAuditForm({...auditForm, remarks: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button type="button" onClick={() => { setIsAuditModalOpen(false); setEditingAuditId(null); setAuditForm(BLANK_AUDIT_FORM); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold">Cancel</button>
                      <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 shadow-sm">{editingAuditId ? 'Save Changes' : 'Save Audit'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ── CAPA Modal ── */}
            {isCapaModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-extrabold text-slate-800">{editingCapaId ? 'Edit CAPA' : 'New CAPA'}</h3>
                    <button onClick={() => { setIsCapaModalOpen(false); setEditingCapaId(null); setCapaForm(BLANK_CAPA_FORM); }} className="p-1.5 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4 text-slate-500" /></button>
                  </div>
                  <form onSubmit={handleSaveCapa} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">CAPA ID</label><input type="text" value={capaForm.capaId} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-500 bg-slate-50" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Audit ID *</label><input type="text" value={capaForm.auditId} onChange={e => setCapaForm({...capaForm, auditId: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Responsible Person *</label><input type="text" value={capaForm.responsiblePerson} onChange={e => setCapaForm({...capaForm, responsiblePerson: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Target Date</label><input type="date" value={capaForm.targetDate} onChange={e => setCapaForm({...capaForm, targetDate: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Completion Date</label><input type="date" value={capaForm.completionDate} onChange={e => setCapaForm({...capaForm, completionDate: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div><label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label><select value={capaForm.status} onChange={e => setCapaForm({...capaForm, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500">{CAPA_STATUS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Observation *</label><input type="text" value={capaForm.observation} onChange={e => setCapaForm({...capaForm, observation: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Root Cause</label><input type="text" value={capaForm.rootCause} onChange={e => setCapaForm({...capaForm, rootCause: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Corrective Action</label><input type="text" value={capaForm.correctiveAction} onChange={e => setCapaForm({...capaForm, correctiveAction: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Preventive Action</label><input type="text" value={capaForm.preventiveAction} onChange={e => setCapaForm({...capaForm, preventiveAction: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                      <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label><input type="text" value={capaForm.remarks} onChange={e => setCapaForm({...capaForm, remarks: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] focus:ring-2 focus:ring-sky-500" /></div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button type="button" onClick={() => { setIsCapaModalOpen(false); setEditingCapaId(null); setCapaForm(BLANK_CAPA_FORM); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold">Cancel</button>
                      <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 shadow-sm">{editingCapaId ? 'Save Changes' : 'Save CAPA'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      }

      case 'reports': {
        const totalAssessments = assessments.length;
        const totalEquip = extinguishers.length + hydrants.length + alarms.length;
        const funcEquip = extinguishers.filter(e => e.status === 'Functional').length +
                          hydrants.filter(h => h.status === 'Functional').length +
                          alarms.filter(a => a.status === 'Functional').length;
        const equipCompliance = totalEquip ? Math.round((funcEquip / totalEquip) * 100) : 0;
        
        const goodDrills = drillRecords.filter(d => ['Satisfactory', 'Excellent'].includes(d.result)).length;
        const drillCompliance = drillRecords.length ? Math.round((goodDrills / drillRecords.length) * 100) : 0;
        
        const goodTraining = trainingRecords.filter(t => t.status === 'Completed').length;
        const trainingCompliance = trainingRecords.length ? Math.round((goodTraining / trainingRecords.length) * 100) : 0;

        const resolvedIncidents = incidents.filter(i => i.status === 'Closed').length;
        const incidentResolution = incidents.length ? Math.round((resolvedIncidents / incidents.length) * 100) : 0;

        const auditComplianceAvg = audits.length ? Math.round(audits.reduce((sum, a) => sum + (parseFloat(a.compliance) || 0), 0) / audits.length) : 0;
        const openCapas = capas.filter(c => c.status !== 'Closed').length;
        
        const overallPerformance = Math.round((equipCompliance + drillCompliance + trainingCompliance + incidentResolution + auditComplianceAvg) / 5) || 0;

        const reportKpis = [
          { label: 'Total Risk Assessments', value: totalAssessments, icon: ClipboardList, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Equipment Compliance %', value: `${equipCompliance}%`, icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Fire Drill Compliance %', value: `${drillCompliance}%`, icon: LayoutDashboard, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Training Compliance %', value: `${trainingCompliance}%`, icon: Flame, color: 'text-sky-600', bg: 'bg-sky-50' },
          { label: 'Incident Resolution %', value: `${incidentResolution}%`, icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Audit Compliance %', value: `${auditComplianceAvg}%`, icon: ClipboardCheck, color: 'text-teal-600', bg: 'bg-teal-50' },
          { label: 'Open CAPAs', value: openCapas, icon: FileText, color: 'text-fuchsia-600', bg: 'bg-fuchsia-50' },
          { label: 'Overall Performance %', value: `${overallPerformance}%`, icon: ShieldCheck, color: 'text-violet-600', bg: 'bg-violet-50' },
        ];

        // Chart Data
        const drillTrend = dashboardData.map(r => ({ month: r.month.slice(0, 3), drills: r.drills }));
        
        const riskCats = assessments.reduce((acc, a) => {
          acc[a.riskCategory] = (acc[a.riskCategory] || 0) + 1;
          return acc;
        }, {});
        const riskCategoryData = Object.keys(riskCats).map(k => ({ name: k, value: riskCats[k] }));
        const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#7c3aed'];

        const equipTrend = dashboardData.map(r => ({ month: r.month.slice(0, 3), compliance: r.equipmentCompliance }));
        
        const incStatus = incidents.reduce((acc, i) => {
          acc[i.status] = (acc[i.status] || 0) + 1;
          return acc;
        }, {});
        const incidentStatusData = Object.keys(incStatus).map(k => ({ name: k, value: incStatus[k] }));

        const trainingTrend = dashboardData.map(r => ({ month: r.month.slice(0, 3), compliance: r.trainingCompliance }));
        const auditTrend = dashboardData.map(r => ({ month: r.month.slice(0, 3), compliance: r.overallCompliance }));

        // Export Actions
        const handleExportCSV = () => {
          const headers = ['Month', 'Risk Assessments', 'Fire Drills', 'Equipment Compliance %', 'Fire Incidents', 'Audit Compliance %', 'Overall Performance %'];
          const rows = dashboardData.map(r => [
            r.month, r.highRiskAreas, r.drills, r.equipmentCompliance, r.incidents, r.overallCompliance, Math.round((r.equipmentCompliance + r.overallCompliance) / 2)
          ]);
          const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join("\\n");
          const encodedUri = encodeURI(csvContent);
          const link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          link.setAttribute("download", "fire_safety_report.csv");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };

        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800">Reports & Analytics</h2>
                <p className="text-xs text-slate-500 mt-1">Comprehensive fire safety performance metrics and compliance history.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={handleExportCSV} className="px-3 py-2 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold rounded-xl hover:bg-slate-50 transition-colors">Export CSV</button>
                <button onClick={() => alert('PDF Export functionality placeholder')} className="px-3 py-2 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold rounded-xl hover:bg-slate-50 transition-colors">Export PDF</button>
                <button onClick={() => alert('Print functionality placeholder')} className="px-3 py-2 bg-slate-800 text-white text-[10px] font-bold rounded-xl hover:bg-slate-700 transition-colors">Print Report</button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {reportKpis.map((kpi, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.bg}`}>
                    <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</p>
                    <p className="text-xl font-extrabold text-slate-800">{kpi.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-3">Monthly Fire Drill Trend</h4>
                <ResponsiveContainer width="100%" height={200}><LineChart data={drillTrend}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} /><YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} /><Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} /><Line type="monotone" dataKey="drills" stroke={hospital.themeColor} strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} /></LineChart></ResponsiveContainer>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-3">Fire Risk Category Distribution</h4>
                <ResponsiveContainer width="100%" height={200}><PieChart><Pie data={riskCategoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">{riskCategoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}</Pie><Tooltip /><Legend wrapperStyle={{ fontSize: '10px' }} /></PieChart></ResponsiveContainer>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-3">Equipment Compliance Trend</h4>
                <ResponsiveContainer width="100%" height={200}><BarChart data={equipTrend}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} /><YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} /><Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} /><Bar dataKey="compliance" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} /></BarChart></ResponsiveContainer>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-3">Incident Status</h4>
                <ResponsiveContainer width="100%" height={200}><PieChart><Pie data={incidentStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">{incidentStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}</Pie><Tooltip /><Legend wrapperStyle={{ fontSize: '10px' }} /></PieChart></ResponsiveContainer>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-3">Training Compliance Trend</h4>
                <ResponsiveContainer width="100%" height={200}><BarChart data={trainingTrend}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} /><YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} /><Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} /><Bar dataKey="compliance" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} /></BarChart></ResponsiveContainer>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <h4 className="text-xs font-extrabold text-slate-800 mb-3">Audit Compliance Trend</h4>
                <ResponsiveContainer width="100%" height={200}><LineChart data={auditTrend}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} /><YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} /><Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} /><Line type="monotone" dataKey="compliance" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} /></LineChart></ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mt-6">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-xs font-extrabold text-slate-800">Monthly Summary Table</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      {['Month', 'Risk Assessments', 'Fire Drills', 'Equipment Compliance %', 'Fire Incidents', 'Audit Compliance %', 'Overall Performance %'].map(h => <th key={h} className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dashboardData.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-4 py-3 font-semibold text-slate-700">{r.month}</td>
                        <td className="px-4 py-3 text-slate-600">{r.highRiskAreas}</td>
                        <td className="px-4 py-3 text-slate-600">{r.drills}</td>
                        <td className="px-4 py-3 font-bold text-slate-700">{r.equipmentCompliance}%</td>
                        <td className="px-4 py-3 text-slate-600">{r.incidents}</td>
                        <td className="px-4 py-3 text-slate-600">{r.overallCompliance}%</td>
                        <td className="px-4 py-3 font-bold" style={{ color: hospital.themeColor }}>{Math.round((r.equipmentCompliance + r.overallCompliance) / 2)}%</td>
                      </tr>
                    ))}
                    {dashboardData.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-400">No monthly data available.</td></tr>}
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

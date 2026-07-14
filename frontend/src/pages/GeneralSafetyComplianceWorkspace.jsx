import React, { useState, useEffect } from 'react';
import { useHospital } from '../context/HospitalContext';
import { ChevronLeft, LayoutDashboard, Building2, Wrench, ShieldCheck, LifeBuoy,
  ClipboardCheck, BarChart3, Plus, Edit3, Trash2, X, Search,
  FileDown, Download, Printer } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'facility_assets', label: 'Facility Assets', icon: Building2 },
  { id: 'equip_utilities', label: 'Equipment & Utilities', icon: Wrench },
  { id: 'safety_compliance', label: 'Safety Compliance', icon: ShieldCheck },
  { id: 'support_services', label: 'Support Services', icon: LifeBuoy },
  { id: 'audit', label: 'Internal Audit', icon: ClipboardCheck },
  { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
];

const kpiCards = [
  { label: 'Total Assets', value: '1,284', color: 'text-blue-600' },
  { label: 'Active Equipment', value: '1,096', color: 'text-emerald-600' },
  { label: 'Safety Compliance %', value: '93%', color: 'text-teal-600' },
  { label: 'Fire Safety Compliance', value: '95%', color: 'text-rose-600' },
  { label: 'Electrical Compliance', value: '89%', color: 'text-amber-600' },
  { label: 'Biomedical Waste Compliance', value: '91%', color: 'text-violet-600' },
  { label: 'Pending Audits', value: '6', color: 'text-orange-600' },
  { label: 'Overall Safety Score', value: '92%', color: 'text-sky-600' },
];

const assetDistributionData = [
  { name: 'Medical Equipment', value: 540 },
  { name: 'Electrical Systems', value: 210 },
  { name: 'Fire Safety Systems', value: 165 },
  { name: 'Civil / Building', value: 245 },
  { name: 'Support Utilities', value: 124 },
];

const departmentAssetsData = [
  { name: 'Critical Care', assets: 218 }, { name: 'OT / Surgery', assets: 196 },
  { name: 'Radiology', assets: 142 }, { name: 'Emergency', assets: 158 },
  { name: 'Wards', assets: 312 }, { name: 'Laboratory', assets: 134 },
  { name: 'Support Services', assets: 124 },
];

const monthlySafetyComplianceData = [
  { name: 'Jan', compliance: 88 }, { name: 'Feb', compliance: 89 },
  { name: 'Mar', compliance: 90 }, { name: 'Apr', compliance: 91 },
  { name: 'May', compliance: 92 }, { name: 'Jun', compliance: 93 },
];

const fireSafetyTrendData = [
  { name: 'Jan', score: 90 }, { name: 'Feb', score: 91 },
  { name: 'Mar', score: 92 }, { name: 'Apr', score: 94 },
  { name: 'May', score: 95 }, { name: 'Jun', score: 96 },
];

const equipmentCategoryData = [
  { name: 'Ventilators', value: 84 }, { name: 'Monitors', value: 156 },
  { name: 'Infusion Pumps', value: 98 }, { name: 'Imaging', value: 62 },
  { name: 'Sterilizers', value: 47 }, { name: 'Other', value: 253 },
];

const complianceScoreTrendData = [
  { name: 'Fire', score: 95 }, { name: 'Electrical', score: 89 },
  { name: 'Biomedical Waste', score: 91 }, { name: 'Structural', score: 94 },
  { name: 'Water & Sanitation', score: 90 }, { name: 'Infection Control', score: 93 },
];

const monthlySummaryData = [
  { department: 'Critical Care', assets: 218, compliance: 94, pendingIssues: 4, audits: 3, overallScore: 95, status: 'Good' },
  { department: 'OT / Surgery', assets: 196, compliance: 96, pendingIssues: 2, audits: 4, overallScore: 96, status: 'Good' },
  { department: 'Radiology', assets: 142, compliance: 88, pendingIssues: 6, audits: 2, overallScore: 87, status: 'Watch' },
  { department: 'Emergency', assets: 158, compliance: 92, pendingIssues: 5, audits: 3, overallScore: 91, status: 'Good' },
  { department: 'Wards', assets: 312, compliance: 90, pendingIssues: 9, audits: 3, overallScore: 89, status: 'Watch' },
  { department: 'Laboratory', assets: 134, compliance: 93, pendingIssues: 3, audits: 2, overallScore: 92, status: 'Good' },
  { department: 'Support Services', assets: 124, compliance: 85, pendingIssues: 11, audits: 1, overallScore: 82, status: 'Critical' },
];

const STATUS_BADGE_SUMMARY = {
  Good: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Watch: 'bg-amber-50 text-amber-700 border-amber-200',
  Critical: 'bg-rose-50 text-rose-700 border-rose-200',
};

const LS_KEY_HOSPITAL_FURNITURE = 'general_hospital_furniture';
const LS_KEY_GENERAL_FURNITURE = 'general_furniture';
const LS_KEY_IT_EQUIPMENT = 'general_it_equipment';

const HOSPITAL_DEPARTMENTS = [
  'Administration', 'Blood Bank', 'Cardiology', 'CSSD', 'Emergency',
  'ICU', 'Laboratory', 'Nephrology', 'Neurology', 'OBG', 'OT',
  'Orthopaedics', 'Pediatrics', 'Pharmacy', 'Radiology', 'Ward',
];

const HOSPITAL_FURNITURE_CATEGORIES = [
  'Patient Bed', 'Overbed Table', 'Bedside Locker', 'Patient Monitor Stand',
  'IV Stand', 'Stretcher', 'Wheelchair', 'Examination Couch', 'Doctor Stool',
  'Nurse Station Workstation',
];

const GENERAL_FURNITURE_CATEGORIES = [
  'Office Chair', 'Office Desk', 'Bookshelf', 'Visitor Sofa',
  'Conference Table', 'Filing Cabinet', 'Whiteboard Stand', 'Notice Board',
  'Reception Counter', 'Waiting Bench',
];

const IT_EQUIPMENT_TYPES = [
  'Desktop', 'Laptop', 'Printer', 'Scanner', 'Server', 'Switch',
  'Router', 'UPS', 'Biometric Device', 'IP Camera',
];

const IT_OPERATING_SYSTEMS = [
  'Windows 11 Pro', 'Windows 10 Pro', 'Ubuntu 22.04', 'RHEL 9',
  'macOS Sonoma', 'None',
];

const ASSET_CONDITIONS = ['Excellent', 'Good', 'Fair', 'Poor'];
const ASSET_STATUSES = ['Active', 'Under Repair', 'Condemned'];

const STATUS_BADGE_ASSET = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Under Repair': 'bg-amber-50 text-amber-700 border-amber-200',
  Condemned: 'bg-rose-50 text-rose-700 border-rose-200',
};

const CONDITION_BADGE = {
  Excellent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Good: 'bg-sky-50 text-sky-700 border-sky-200',
  Fair: 'bg-amber-50 text-amber-700 border-amber-200',
  Poor: 'bg-rose-50 text-rose-700 border-rose-200',
};

const SEED_HOSPITAL_FURNITURE = [
  { id: 'hf-001', furnitureName: 'Electric Patient Bed', furnitureCategory: 'Patient Bed', department: 'ICU', location: 'ICU-01', manufacturer: 'Hill-Rom', purchaseDate: '2022-03-15', warrantyExpiry: '2027-03-14', assetCondition: 'Excellent', assetStatus: 'Active', vendor: 'MediTech Supplies', assetTag: 'AST-HF-001', remarks: '5-function electric bed with side rails.' },
  { id: 'hf-002', furnitureName: 'Overbed Table', furnitureCategory: 'Overbed Table', department: 'Ward', location: 'WARD-2-A', manufacturer: 'Invacare', purchaseDate: '2021-07-20', warrantyExpiry: '2024-07-19', assetCondition: 'Good', assetStatus: 'Active', vendor: 'Hospital Essentials', assetTag: 'AST-HF-002', remarks: 'Height adjustable overbed table.' },
  { id: 'hf-003', furnitureName: 'Bedside Locker', furnitureCategory: 'Bedside Locker', department: 'Ward', location: 'WARD-3-B', manufacturer: 'Paramount', purchaseDate: '2020-11-05', warrantyExpiry: '2023-11-04', assetCondition: 'Fair', assetStatus: 'Under Repair', vendor: 'MediTech Supplies', assetTag: 'AST-HF-003', remarks: 'Drawer lock needs replacement.' },
  { id: 'hf-004', furnitureName: 'Patient Monitor Stand', furnitureCategory: 'Patient Monitor Stand', department: 'Critical Care', location: 'CCU-01', manufacturer: 'Nihon Kohden', purchaseDate: '2023-01-10', warrantyExpiry: '2028-01-09', assetCondition: 'Excellent', assetStatus: 'Active', vendor: 'Cardio Systems', assetTag: 'AST-HF-004', remarks: 'Mobile stand with IV pole attachment.' },
  { id: 'hf-005', furnitureName: 'IV Stand', furnitureCategory: 'IV Stand', department: 'Emergency', location: 'ER-05', manufacturer: 'Romsons', purchaseDate: '2019-05-22', warrantyExpiry: '2022-05-21', assetCondition: 'Poor', assetStatus: 'Condemned', vendor: 'Hospital Essentials', assetTag: 'AST-HF-005', remarks: 'Base cracked, replaced with new unit.' },
  { id: 'hf-006', furnitureName: 'Stretcher', furnitureCategory: 'Stretcher', department: 'Emergency', location: 'ER-03', manufacturer: 'Stryker', purchaseDate: '2022-09-01', warrantyExpiry: '2027-08-31', assetCondition: 'Good', assetStatus: 'Active', vendor: 'MediTech Supplies', assetTag: 'AST-HF-006', remarks: 'Hydraulic stretcher with brake system.' },
  { id: 'hf-007', furnitureName: 'Wheelchair', furnitureCategory: 'Wheelchair', department: 'Outpatient', location: 'OPD-01', manufacturer: 'Karma Healthcare', purchaseDate: '2021-12-10', warrantyExpiry: '2024-12-09', assetCondition: 'Good', assetStatus: 'Active', vendor: 'Mobility Aids Co', assetTag: 'AST-HF-007', remarks: 'Foldable wheelchair with armrests.' },
  { id: 'hf-008', furnitureName: 'Examination Couch', furnitureCategory: 'Examination Couch', department: 'OPD', location: 'OPD-02', manufacturer: 'Pluto', purchaseDate: '2020-06-18', warrantyExpiry: '2023-06-17', assetCondition: 'Fair', assetStatus: 'Under Repair', vendor: 'Hospital Essentials', assetTag: 'AST-HF-008', remarks: 'Upholstery torn, scheduled for repair.' },
  { id: 'hf-009', furnitureName: 'Doctor Stool', furnitureCategory: 'Doctor Stool', department: 'OT', location: 'OT-01', manufacturer: 'Jajisan', purchaseDate: '2023-04-05', warrantyExpiry: '2026-04-04', assetCondition: 'Excellent', assetStatus: 'Active', vendor: 'Surgical Solutions', assetTag: 'AST-HF-009', remarks: 'Height-adjustable revolving stool.' },
  { id: 'hf-010', furnitureName: 'Nurse Station Workstation', furnitureCategory: 'Nurse Station Workstation', department: 'Nursing', location: 'NURSE-01', manufacturer: 'Herman Miller', purchaseDate: '2022-02-28', warrantyExpiry: '2027-02-27', assetCondition: 'Excellent', assetStatus: 'Active', vendor: 'Office Interiors', assetTag: 'AST-HF-010', remarks: 'Ergonomic workstation with storage.' },
];

const SEED_GENERAL_FURNITURE = [
  { id: 'gf-001', furnitureName: 'Ergonomic Office Chair', category: 'Office Chair', department: 'Administration', location: 'ADMIN-01', quantity: 20, purchaseDate: '2022-08-15', condition: 'Excellent', status: 'Active', vendor: 'Office Interiors', assetTag: 'AST-GF-001', remarks: 'Mesh back with lumbar support.' },
  { id: 'gf-002', furnitureName: 'Executive Desk', category: 'Office Desk', department: 'Administration', location: 'ADMIN-02', quantity: 5, purchaseDate: '2021-03-20', condition: 'Good', status: 'Active', vendor: 'Office Interiors', assetTag: 'AST-GF-002', remarks: 'L-shaped executive desk.' },
  { id: 'gf-003', furnitureName: 'Visitor Sofa Set', category: 'Visitor Sofa', department: 'Reception', location: 'RECEP-01', quantity: 8, purchaseDate: '2020-11-10', condition: 'Fair', status: 'Active', vendor: 'Comfort Furniture', assetTag: 'AST-GF-003', remarks: '3-seater sofa set for waiting area.' },
  { id: 'gf-004', furnitureName: 'Conference Table', category: 'Conference Table', department: 'Board Room', location: 'BOARD-01', quantity: 1, purchaseDate: '2019-06-25', condition: 'Good', status: 'Active', vendor: 'Office Interiors', assetTag: 'AST-GF-004', remarks: '12-seater conference table.' },
  { id: 'gf-005', furnitureName: 'Filing Cabinet', category: 'Filing Cabinet', department: 'Records', location: 'REC-01', quantity: 10, purchaseDate: '2021-09-14', condition: 'Good', status: 'Active', vendor: 'Storage Solutions', assetTag: 'AST-GF-005', remarks: '4-drawer steel filing cabinet.' },
  { id: 'gf-006', furnitureName: 'Bookshelf', category: 'Bookshelf', department: 'Library', location: 'LIB-01', quantity: 6, purchaseDate: '2020-04-30', condition: 'Fair', status: 'Under Repair', vendor: 'Comfort Furniture', assetTag: 'AST-GF-006', remarks: 'One shelf broken, awaiting repair.' },
  { id: 'gf-007', furnitureName: 'Whiteboard Stand', category: 'Whiteboard Stand', department: 'Training', location: 'TRN-01', quantity: 3, purchaseDate: '2022-01-20', condition: 'Excellent', status: 'Active', vendor: 'Office Interiors', assetTag: 'AST-GF-007', remarks: 'Mobile whiteboard stand with marker tray.' },
  { id: 'gf-008', furnitureName: 'Notice Board', category: 'Notice Board', department: 'Administration', location: 'ADMIN-03', quantity: 4, purchaseDate: '2019-12-05', condition: 'Poor', status: 'Condemned', vendor: 'Storage Solutions', assetTag: 'AST-GF-008', remarks: 'Frame rusted, needs replacement.' },
  { id: 'gf-009', furnitureName: 'Reception Counter', category: 'Reception Counter', department: 'Reception', location: 'RECEP-02', quantity: 1, purchaseDate: '2021-07-18', condition: 'Good', status: 'Active', vendor: 'Custom Interiors', assetTag: 'AST-GF-009', remarks: 'Curved front reception counter.' },
  { id: 'gf-010', furnitureName: 'Waiting Bench', category: 'Waiting Bench', department: 'Outpatient', location: 'OPD-WAIT', quantity: 12, purchaseDate: '2020-10-08', condition: 'Fair', status: 'Active', vendor: 'Comfort Furniture', assetTag: 'AST-GF-010', remarks: '3-seater steel waiting bench.' },
];

const SEED_IT_EQUIPMENT = [
  { id: 'ie-001', equipmentName: 'HP ProDesk 400', equipmentType: 'Desktop', department: 'Billing', location: 'BILL-01', serialNumber: 'HP-2022-001', assetTag: 'AST-IE-001', purchaseDate: '2022-05-10', warrantyExpiry: '2025-05-09', operatingSystem: 'Windows 11 Pro', assignedTo: 'Mr. Ramesh K', condition: 'Excellent', status: 'Active', vendor: 'HP India', remarks: 'i5-12400, 16GB RAM, 512GB SSD.' },
  { id: 'ie-002', equipmentName: 'Dell Latitude 5540', equipmentType: 'Laptop', department: 'Administration', location: 'ADMIN-04', serialNumber: 'DELL-2023-002', assetTag: 'AST-IE-002', purchaseDate: '2023-02-15', warrantyExpiry: '2026-02-14', operatingSystem: 'Windows 11 Pro', assignedTo: 'Ms. Priya S', condition: 'Excellent', status: 'Active', vendor: 'Dell Technologies', remarks: 'i7-1355U, 16GB RAM.' },
  { id: 'ie-003', equipmentName: 'Canon imageRUNNER 2625i', equipmentType: 'Printer', department: 'Records', location: 'REC-02', serialNumber: 'CANON-2021-003', assetTag: 'AST-IE-003', purchaseDate: '2021-08-20', warrantyExpiry: '2024-08-19', operatingSystem: 'None', assignedTo: 'Records Dept', condition: 'Good', status: 'Active', vendor: 'Canon India', remarks: 'Multifunction laser printer.' },
  { id: 'ie-004', equipmentName: 'Fujitsu ScanSnap iX1600', equipmentType: 'Scanner', department: 'Laboratory', location: 'LAB-01', serialNumber: 'FUJ-2022-004', assetTag: 'AST-IE-004', purchaseDate: '2022-11-05', warrantyExpiry: '2025-11-04', operatingSystem: 'None', assignedTo: 'Lab Admin', condition: 'Good', status: 'Active', vendor: 'Fujitsu India', remarks: 'ADF duplex scanner.' },
  { id: 'ie-005', equipmentName: 'Dell PowerEdge R740', equipmentType: 'Server', department: 'IT', location: 'SERVER-RM-01', serialNumber: 'DELL-2021-005', assetTag: 'AST-IE-005', purchaseDate: '2021-04-12', warrantyExpiry: '2026-04-11', operatingSystem: 'RHEL 9', assignedTo: 'IT Infrastructure', condition: 'Excellent', status: 'Active', vendor: 'Dell Technologies', remarks: 'Xeon Gold, 64GB RAM, 2x1TB SSD.' },
  { id: 'ie-006', equipmentName: 'Cisco Catalyst 2960X', equipmentType: 'Switch', department: 'IT', location: 'NETWORK-RM-01', serialNumber: 'CISCO-2020-006', assetTag: 'AST-IE-006', purchaseDate: '2020-09-30', warrantyExpiry: '2025-09-29', operatingSystem: 'None', assignedTo: 'IT Infrastructure', condition: 'Good', status: 'Active', vendor: 'Cisco Systems', remarks: '24-port Gigabit managed switch.' },
  { id: 'ie-007', equipmentName: 'Cisco ISR 1100', equipmentType: 'Router', department: 'IT', location: 'NETWORK-RM-02', serialNumber: 'CISCO-2020-007', assetTag: 'AST-IE-007', purchaseDate: '2020-09-30', warrantyExpiry: '2025-09-29', operatingSystem: 'None', assignedTo: 'IT Infrastructure', condition: 'Good', status: 'Active', vendor: 'Cisco Systems', remarks: 'Dual-WAN secure router.' },
  { id: 'ie-008', equipmentName: 'APC Smart-UPS 3000VA', equipmentType: 'UPS', department: 'IT', location: 'UPS-RM-01', serialNumber: 'APC-2022-008', assetTag: 'AST-IE-008', purchaseDate: '2022-07-18', warrantyExpiry: '2027-07-17', operatingSystem: 'None', assignedTo: 'IT Infrastructure', condition: 'Excellent', status: 'Active', vendor: 'Schneider Electric', remarks: 'Online double-conversion UPS.' },
  { id: 'ie-009', equipmentName: 'ZKTeco Biometric Terminal', equipmentType: 'Biometric Device', department: 'HR', location: 'HR-01', serialNumber: 'ZKT-2023-009', assetTag: 'AST-IE-009', purchaseDate: '2023-06-22', warrantyExpiry: '2026-06-21', operatingSystem: 'None', assignedTo: 'HR Department', condition: 'Excellent', status: 'Active', vendor: 'ZKTeco India', remarks: 'Fingerprint + face recognition terminal.' },
  { id: 'ie-010', equipmentName: 'Hikvision DS-2CD2143G2', equipmentType: 'IP Camera', department: 'Security', location: 'SEC-01', serialNumber: 'HIK-2023-010', assetTag: 'AST-IE-010', purchaseDate: '2023-03-14', warrantyExpiry: '2026-03-13', operatingSystem: 'None', assignedTo: 'Security', condition: 'Good', status: 'Active', vendor: 'Hikvision India', remarks: '4MP IR dome IP camera.' },
];

// ===== PHASE 3: EQUIPMENT & UTILITIES =====
const LS_KEY_HOSPITAL_MACHINERY = 'general_hospital_machinery';
const LS_KEY_GAS_PIPELINE = 'general_gas_pipeline';
const LS_KEY_STP_ETP = 'general_stp_etp';

const MACHINE_CATEGORIES = [
  'Life Support', 'Diagnostic Imaging', 'Surgical', 'Monitoring',
  'Therapeutic', 'Sterilization', 'Laboratory', 'Support',
];

const MACHINE_CONDITIONS = ['Excellent', 'Good', 'Fair', 'Poor'];
const MACHINE_STATUSES = ['Active', 'Under Maintenance', 'Out of Service', 'Condemned'];

const GAS_TYPES = ['Oxygen', 'Medical Air', 'Vacuum', 'Nitrous Oxide', 'Carbon Dioxide'];
const GAS_SOURCES = ['Manifold A', 'Manifold B', 'Manifold C', 'Air Compressor Plant', 'Vacuum Pump 1', 'Vacuum Pump 2', 'N2O Bank', 'CO2 Cylinder Bank', 'Central Plant'];
const ALARM_STATUSES = ['Normal', 'Active'];
const PIPELINE_STATUSES = ['Operational', 'Under Maintenance', 'Fault', 'Shutdown'];
const COMPLIANCE_STATUSES = ['Compliant', 'Observation', 'Critical'];

const PLANT_TYPES = ['STP', 'ETP'];
const WATER_QUALITY = ['Excellent', 'Good', 'Acceptable', 'Poor'];

const STATUS_BADGE_MACHINE = {
  'Active': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Under Maintenance': 'bg-amber-50 text-amber-700 border-amber-200',
  'Out of Service': 'bg-orange-50 text-orange-700 border-orange-200',
  'Condemned': 'bg-rose-50 text-rose-700 border-rose-200',
};

const STATUS_BADGE_PIPELINE = {
  'Operational': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Under Maintenance': 'bg-amber-50 text-amber-700 border-amber-200',
  'Fault': 'bg-rose-50 text-rose-700 border-rose-200',
  'Shutdown': 'bg-slate-50 text-slate-700 border-slate-200',
};

const STATUS_BADGE_COMPLIANCE = {
  'Compliant': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Observation': 'bg-amber-50 text-amber-700 border-amber-200',
  'Critical': 'bg-rose-50 text-rose-700 border-rose-200',
};

const STATUS_BADGE_WATER = {
  'Excellent': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Good': 'bg-sky-50 text-sky-700 border-sky-200',
  'Acceptable': 'bg-amber-50 text-amber-700 border-amber-200',
  'Poor': 'bg-rose-50 text-rose-700 border-rose-200',
};

const ACCEPTABLE_PRESSURE_MIN = 2.0;
const ACCEPTABLE_PRESSURE_MAX = 7.0;
const PH_MIN = 6.0;
const PH_MAX = 9.0;
const BOD_LIMIT = 30;
const COD_LIMIT = 250;

const SEED_HOSPITAL_MACHINERY = [
  { id: 'hm-001', equipmentName: 'Dräger Evita V800 Ventilator', equipmentCategory: 'Life Support', department: 'Critical Care', location: 'ICU-VENT-01', manufacturer: 'Dräger', modelNumber: 'Evita V800', serialNumber: 'DRG-2021-001', purchaseDate: '2021-04-12', warrantyExpiry: '2026-04-11', lastPreventiveMaintenance: '2026-07-05', nextPreventiveMaintenance: '2026-07-25', equipmentCondition: 'Excellent', equipmentStatus: 'Active', vendor: 'Medtronic India', assetTag: 'AST-HM-001', remarks: 'ICU invasive ventilator with neonatal option.' },
  { id: 'hm-002', equipmentName: 'Philips IntelliVue MX750 Monitor', equipmentCategory: 'Monitoring', department: 'Cardiology', location: 'CARD-MON-03', manufacturer: 'Philips', modelNumber: 'IntelliVue MX750', serialNumber: 'PHL-2022-002', purchaseDate: '2022-06-20', warrantyExpiry: '2027-06-19', lastPreventiveMaintenance: '2026-07-10', nextPreventiveMaintenance: '2026-07-20', equipmentCondition: 'Good', equipmentStatus: 'Active', vendor: 'Philips Healthcare', assetTag: 'AST-HM-002', remarks: 'Multi-parameter patient monitor under scheduled PM.' },
  { id: 'hm-003', equipmentName: 'Siemens SOMATOM CT Scanner', equipmentCategory: 'Diagnostic Imaging', department: 'Radiology', location: 'RAD-CT-01', manufacturer: 'Siemens', modelNumber: 'SOMATOM go.Now', serialNumber: 'SIE-2020-003', purchaseDate: '2020-09-01', warrantyExpiry: '2025-08-31', lastPreventiveMaintenance: '2026-06-15', nextPreventiveMaintenance: '2026-09-15', equipmentCondition: 'Good', equipmentStatus: 'Active', vendor: 'Siemens Healthineers', assetTag: 'AST-HM-003', remarks: '64-slice CT with annual service contract.' },
  { id: 'hm-004', equipmentName: 'Fresenius 4008S Dialysis Machine', equipmentCategory: 'Therapeutic', department: 'Nephrology', location: 'NEP-DIAL-02', manufacturer: 'Fresenius', modelNumber: '4008S', serialNumber: 'FRN-2021-004', purchaseDate: '2021-11-11', warrantyExpiry: '2026-11-10', lastPreventiveMaintenance: '2026-07-01', nextPreventiveMaintenance: '2026-08-01', equipmentCondition: 'Excellent', equipmentStatus: 'Active', vendor: 'Fresenius Medical', assetTag: 'AST-HM-004', remarks: 'Hemodialysis machine with RO water connection.' },
  { id: 'hm-005', equipmentName: 'Maquet Alphaclass OT Table', equipmentCategory: 'Surgical', department: 'OT', location: 'OT-TBL-01', manufacturer: 'Maquet', modelNumber: 'Alphaclass', serialNumber: 'MAQ-2019-005', purchaseDate: '2019-03-03', warrantyExpiry: '2024-03-02', lastPreventiveMaintenance: '2026-05-20', nextPreventiveMaintenance: '2026-08-20', equipmentCondition: 'Fair', equipmentStatus: 'Active', vendor: 'Getinge India', assetTag: 'AST-HM-005', remarks: 'Hydraulic OT table, hydraulic seal serviced.' },
  { id: 'hm-006', equipmentName: 'BPL Cardiart 9108 ECG', equipmentCategory: 'Diagnostic', department: 'Cardiology', location: 'CARD-ECG-02', manufacturer: 'BPL', modelNumber: 'Cardiart 9108', serialNumber: 'BPL-2022-006', purchaseDate: '2022-02-18', warrantyExpiry: '2027-02-17', lastPreventiveMaintenance: '2026-04-10', nextPreventiveMaintenance: '2026-10-10', equipmentCondition: 'Good', equipmentStatus: 'Active', vendor: 'BPL Medical', assetTag: 'AST-HM-006', remarks: '12-lead interpretive ECG machine.' },
  { id: 'hm-007', equipmentName: 'ZOLL X Series Defibrillator', equipmentCategory: 'Life Support', department: 'Emergency', location: 'ER-DEF-01', manufacturer: 'ZOLL', modelNumber: 'X Series', serialNumber: 'ZOL-2023-007', purchaseDate: '2023-07-07', warrantyExpiry: '2028-07-06', lastPreventiveMaintenance: '2026-07-08', nextPreventiveMaintenance: '2026-07-22', equipmentCondition: 'Excellent', equipmentStatus: 'Active', vendor: 'ZOLL Medical', assetTag: 'AST-HM-007', remarks: 'Defibrillator/monitor under PM window.' },
  { id: 'hm-008', equipmentName: 'B. Braun Infusomat Space Pump', equipmentCategory: 'Therapeutic', department: 'ICU', location: 'ICU-INF-04', manufacturer: 'B. Braun', modelNumber: 'Infusomat Space', serialNumber: 'BRN-2021-008', purchaseDate: '2021-12-12', warrantyExpiry: '2026-12-11', lastPreventiveMaintenance: '2026-03-15', nextPreventiveMaintenance: '2026-09-15', equipmentCondition: 'Good', equipmentStatus: 'Active', vendor: 'B. Braun', assetTag: 'AST-HM-008', remarks: 'Volumetric infusion pump with syringe module.' },
  { id: 'hm-009', equipmentName: 'Allengers 500mA X-Ray', equipmentCategory: 'Diagnostic Imaging', department: 'Radiology', location: 'RAD-XR-02', manufacturer: 'Allengers', modelNumber: '500 mA', serialNumber: 'ALG-2018-009', purchaseDate: '2018-05-05', warrantyExpiry: '2023-05-04', lastPreventiveMaintenance: '2025-12-10', nextPreventiveMaintenance: '2026-02-10', equipmentCondition: 'Poor', equipmentStatus: 'Out of Service', vendor: 'Allengers', assetTag: 'AST-HM-009', remarks: 'Tube expired, awaiting condemnation board approval.' },
  { id: 'hm-010', equipmentName: 'M9 B-Class Autoclave', equipmentCategory: 'Sterilization', department: 'CSSD', location: 'CSSD-AUT-01', manufacturer: 'M9', modelNumber: 'B-class 23L', serialNumber: 'M9-2020-010', purchaseDate: '2020-10-10', warrantyExpiry: '2025-10-09', lastPreventiveMaintenance: '2026-06-25', nextPreventiveMaintenance: '2026-12-25', equipmentCondition: 'Fair', equipmentStatus: 'Active', vendor: 'M9 Equipments', assetTag: 'AST-HM-010', remarks: '23L B-class steam sterilizer with vacuum.' },
];

const SEED_GAS_PIPELINE = [
  { id: 'gp-001', gasType: 'Oxygen', department: 'Critical Care', supplySource: 'Manifold A', pressureReading: '4.2', alarmStatus: 'Normal', pipelineStatus: 'Operational', inspectionDate: '2026-07-01', nextInspectionDate: '2026-10-01', engineer: 'Er. Anil Kumar', complianceStatus: 'Compliant', remarks: 'Oxygen manifold pressure within range.' },
  { id: 'gp-002', gasType: 'Medical Air', department: 'Critical Care', supplySource: 'Air Compressor Plant', pressureReading: '5.0', alarmStatus: 'Normal', pipelineStatus: 'Operational', inspectionDate: '2026-07-02', nextInspectionDate: '2026-10-02', engineer: 'Er. Sunil Rao', complianceStatus: 'Compliant', remarks: 'Medical air plant dew point normal.' },
  { id: 'gp-003', gasType: 'Vacuum', department: 'OT', supplySource: 'Vacuum Pump 1', pressureReading: '-0.55', alarmStatus: 'Normal', pipelineStatus: 'Operational', inspectionDate: '2026-07-03', nextInspectionDate: '2026-10-03', engineer: 'Er. Anil Kumar', complianceStatus: 'Compliant', remarks: 'Suction vacuum stable.' },
  { id: 'gp-004', gasType: 'Nitrous Oxide', department: 'OT', supplySource: 'N2O Bank', pressureReading: '4.0', alarmStatus: 'Normal', pipelineStatus: 'Operational', inspectionDate: '2026-07-04', nextInspectionDate: '2026-10-04', engineer: 'Er. Sunil Rao', complianceStatus: 'Compliant', remarks: 'N2O pipeline pressure nominal.' },
  { id: 'gp-005', gasType: 'Carbon Dioxide', department: 'Radiology', supplySource: 'CO2 Cylinder Bank', pressureReading: '3.8', alarmStatus: 'Normal', pipelineStatus: 'Operational', inspectionDate: '2026-07-05', nextInspectionDate: '2026-10-05', engineer: 'Er. Priya Menon', complianceStatus: 'Compliant', remarks: 'CO2 for angio suite normal.' },
  { id: 'gp-006', gasType: 'Oxygen', department: 'Emergency', supplySource: 'Manifold B', pressureReading: '1.2', alarmStatus: 'Active', pipelineStatus: 'Fault', inspectionDate: '2026-07-06', nextInspectionDate: '2026-07-20', engineer: 'Er. Anil Kumar', complianceStatus: 'Critical', remarks: 'Low pressure alarm active, manifold B isolation valve faulty.' },
  { id: 'gp-007', gasType: 'Medical Air', department: 'Ward', supplySource: 'Air Compressor 2', pressureReading: '8.5', alarmStatus: 'Normal', pipelineStatus: 'Fault', inspectionDate: '2026-07-07', nextInspectionDate: '2026-07-25', engineer: 'Er. Sunil Rao', complianceStatus: 'Critical', remarks: 'Compressor over-pressure, regulator out of acceptable range.' },
  { id: 'gp-008', gasType: 'Vacuum', department: 'ICU', supplySource: 'Vacuum Pump 2', pressureReading: '-0.40', alarmStatus: 'Normal', pipelineStatus: 'Operational', inspectionDate: '2026-07-08', nextInspectionDate: '2026-10-08', engineer: 'Er. Priya Menon', complianceStatus: 'Compliant', remarks: 'Secondary vacuum pump normal.' },
  { id: 'gp-009', gasType: 'Oxygen', department: 'MICU', supplySource: 'Manifold C', pressureReading: '4.4', alarmStatus: 'Normal', pipelineStatus: 'Operational', inspectionDate: '2026-07-09', nextInspectionDate: '2026-10-09', engineer: 'Er. Anil Kumar', complianceStatus: 'Compliant', remarks: 'MICU oxygen supply stable.' },
  { id: 'gp-010', gasType: 'Nitrous Oxide', department: 'Dental', supplySource: 'N2O Bank 2', pressureReading: '3.9', alarmStatus: 'Normal', pipelineStatus: 'Observation', inspectionDate: '2026-07-10', nextInspectionDate: '2026-10-10', engineer: 'Er. Sunil Rao', complianceStatus: 'Observation', remarks: 'Minor regulator noise, monitor closely.' },
];

const SEED_STP_ETP = [
  { id: 'st-001', plantType: 'STP', readingDate: '2026-07-10', operator: 'Ravi Sharma', phLevel: '7.2', bod: '18', cod: '120', tds: '600', flowRate: '45', waterQuality: 'Good', complianceStatus: 'Compliant', remarks: 'Treated effluent within CPCB norms.' },
  { id: 'st-002', plantType: 'STP', readingDate: '2026-07-11', operator: 'Ravi Sharma', phLevel: '7.5', bod: '22', cod: '140', tds: '650', flowRate: '48', waterQuality: 'Good', complianceStatus: 'Compliant', remarks: 'STP running at design capacity.' },
  { id: 'st-003', plantType: 'ETP', readingDate: '2026-07-11', operator: 'Suresh Patil', phLevel: '7.0', bod: '16', cod: '110', tds: '580', flowRate: '30', waterQuality: 'Excellent', complianceStatus: 'Compliant', remarks: 'ETP for lab/kitchen waste compliant.' },
  { id: 'st-004', plantType: 'STP', readingDate: '2026-07-12', operator: 'Ravi Sharma', phLevel: '9.6', bod: '35', cod: '260', tds: '700', flowRate: '50', waterQuality: 'Poor', complianceStatus: 'Critical', remarks: 'High pH and BOD, aeration blower underperforming.' },
  { id: 'st-005', plantType: 'ETP', readingDate: '2026-07-12', operator: 'Suresh Patil', phLevel: '6.8', bod: '28', cod: '240', tds: '620', flowRate: '32', waterQuality: 'Acceptable', complianceStatus: 'Compliant', remarks: 'Near upper BOD limit, under watch.' },
  { id: 'st-006', plantType: 'STP', readingDate: '2026-07-13', operator: 'Ravi Sharma', phLevel: '7.1', bod: '20', cod: '130', tds: '610', flowRate: '46', waterQuality: 'Good', complianceStatus: 'Compliant', remarks: 'Routine readings normal.' },
  { id: 'st-007', plantType: 'STP', readingDate: '2026-07-13', operator: 'Amit Verma', phLevel: '8.2', bod: '25', cod: '200', tds: '640', flowRate: '44', waterQuality: 'Acceptable', complianceStatus: 'Observation', remarks: 'COD trending up, increase dosing.' },
  { id: 'st-008', plantType: 'ETP', readingDate: '2026-07-14', operator: 'Suresh Patil', phLevel: '6.2', bod: '19', cod: '150', tds: '590', flowRate: '31', waterQuality: 'Good', complianceStatus: 'Compliant', remarks: 'ETP neutralised effluent acceptable.' },
  { id: 'st-009', plantType: 'STP', readingDate: '2026-07-14', operator: 'Amit Verma', phLevel: '9.4', bod: '30', cod: '280', tds: '720', flowRate: '49', waterQuality: 'Poor', complianceStatus: 'Critical', remarks: 'High pH and COD beyond limit, MPCB notice risk.' },
  { id: 'st-010', plantType: 'ETP', readingDate: '2026-07-09', operator: 'Ravi Sharma', phLevel: '7.3', bod: '17', cod: '115', tds: '600', flowRate: '29', waterQuality: 'Excellent', complianceStatus: 'Compliant', remarks: 'ETP fully compliant.' },
];

const EMPTY_MACHINERY = {
  id: '', equipmentName: '', equipmentCategory: '', department: '', location: '',
  manufacturer: '', modelNumber: '', serialNumber: '', purchaseDate: '',
  warrantyExpiry: '', lastPreventiveMaintenance: '', nextPreventiveMaintenance: '',
  equipmentCondition: 'Excellent', equipmentStatus: 'Active', vendor: '', assetTag: '', remarks: '',
};

const EMPTY_GAS = {
  id: '', gasType: '', department: '', supplySource: '', pressureReading: '',
  alarmStatus: 'Normal', pipelineStatus: 'Operational', inspectionDate: '',
  nextInspectionDate: '', engineer: '', complianceStatus: 'Compliant', remarks: '',
};

const EMPTY_STP = {
  id: '', plantType: '', readingDate: '', operator: '', phLevel: '', bod: '',
  cod: '', tds: '', flowRate: '', waterQuality: 'Acceptable', complianceStatus: 'Compliant', remarks: '',
};

const validateMachinery = (form) => {
  const errors = {};
  if (!form.equipmentName.trim()) errors.equipmentName = 'Equipment Name is required';
  if (!form.equipmentCategory) errors.equipmentCategory = 'Category is required';
  if (!form.department) errors.department = 'Department is required';
  if (!form.location.trim()) errors.location = 'Location is required';
  if (!form.purchaseDate) errors.purchaseDate = 'Purchase Date is required';
  if (!form.equipmentCondition) errors.equipmentCondition = 'Condition is required';
  if (!form.equipmentStatus) errors.equipmentStatus = 'Status is required';
  if (form.lastPreventiveMaintenance && form.nextPreventiveMaintenance && form.nextPreventiveMaintenance <= form.lastPreventiveMaintenance) {
    errors.nextPreventiveMaintenance = 'Next Preventive Maintenance must be later than Last Preventive Maintenance';
  }
  return errors;
};

const validateGas = (form) => {
  const errors = {};
  if (!form.gasType) errors.gasType = 'Gas Type is required';
  if (!form.department) errors.department = 'Department is required';
  if (!form.supplySource.trim()) errors.supplySource = 'Supply Source is required';
  if (form.pressureReading === '' || isNaN(parseFloat(form.pressureReading))) errors.pressureReading = 'Valid Pressure Reading is required';
  if (!form.pipelineStatus) errors.pipelineStatus = 'Pipeline Status is required';
  if (!form.complianceStatus) errors.complianceStatus = 'Compliance Status is required';
  return errors;
};

const validateStp = (form) => {
  const errors = {};
  if (!form.plantType) errors.plantType = 'Plant Type is required';
  if (!form.readingDate) errors.readingDate = 'Reading Date is required';
  if (!form.operator.trim()) errors.operator = 'Operator is required';
  if (form.phLevel === '' || isNaN(parseFloat(form.phLevel))) errors.phLevel = 'Valid pH Level is required';
  if (form.bod === '' || isNaN(parseFloat(form.bod))) errors.bod = 'Valid BOD is required';
  if (form.cod === '' || isNaN(parseFloat(form.cod))) errors.cod = 'Valid COD is required';
  if (form.tds === '' || isNaN(parseFloat(form.tds))) errors.tds = 'Valid TDS is required';
  if (form.flowRate === '' || isNaN(parseFloat(form.flowRate))) errors.flowRate = 'Valid Flow Rate is required';
  if (!form.waterQuality) errors.waterQuality = 'Water Quality is required';
  if (!form.complianceStatus) errors.complianceStatus = 'Compliance Status is required';
  return errors;
};

const getToday = () => new Date().toISOString().slice(0, 10);

const computeMachineStatus = (form) => {
  const today = getToday();
  const last = form.lastPreventiveMaintenance;
  const next = form.nextPreventiveMaintenance;
  if (last && next && today >= last && today <= next) {
    return 'Under Maintenance';
  }
  return form.equipmentStatus;
};

const computeGasCompliance = (form) => {
  const pressure = parseFloat(form.pressureReading);
  const alarmActive = form.alarmStatus === 'Active';
  const pressureOut = !isNaN(pressure) && (pressure < ACCEPTABLE_PRESSURE_MIN || pressure > ACCEPTABLE_PRESSURE_MAX);
  if (alarmActive || pressureOut) return 'Critical';
  return form.complianceStatus;
};

const computeStpCompliance = (form) => {
  const ph = parseFloat(form.phLevel);
  const bod = parseFloat(form.bod);
  const cod = parseFloat(form.cod);
  const phOut = !isNaN(ph) && (ph < PH_MIN || ph > PH_MAX);
  const bodOut = !isNaN(bod) && bod > BOD_LIMIT;
  const codOut = !isNaN(cod) && cod > COD_LIMIT;
  if (phOut || bodOut || codOut) return 'Critical';
  return form.complianceStatus;
};

const getNextId = (records, prefix) => {
  const maxNum = records.reduce((max, r) => {
    const parts = r.id.split('-');
    const num = parseInt(parts[parts.length - 1], 10);
    return num > max ? num : max;
  }, 0);
  return `${prefix}-${String(maxNum + 1).padStart(3, '0')}`;
};

// ===== PHASE 4: SAFETY COMPLIANCE =====
const LS_KEY_ELECTRICAL_SAFETY = 'general_electrical_safety';
const LS_KEY_FIRE_SAFETY = 'general_fire_safety';
const LS_KEY_BIOMEDICAL_WASTE = 'general_biomedical_waste';

const EARTHING_STATUSES = ['OK', 'Faulty'];
const PANEL_CONDITIONS = ['Excellent', 'Good', 'Fair', 'Poor'];
const POWER_STATUSES = ['OK', 'Faulty'];
const FIRE_SYSTEM_STATUSES = ['Pass', 'Fail'];
const YES_NO_OPTIONS = ['Yes', 'No'];
const FIRE_EQUIPMENT_TYPES = ['ABC Extinguisher', 'CO2 Extinguisher', 'DCP Extinguisher', 'Water Extinguisher', 'Foam Extinguisher', 'Clean Agent Extinguisher'];
const WASTE_CATEGORIES = ['General Waste', 'Infectious Waste', 'Sharps', 'Pathological', 'Pharmaceutical', 'Chemical', 'Radioactive', 'Cytotoxic'];
const SEGREGATION_STATUSES = ['Compliant', 'Non-Compliant'];

const ACCEPTABLE_VOLTAGE_MIN = 200;
const ACCEPTABLE_VOLTAGE_MAX = 250;
const ACCEPTABLE_CURRENT_MIN = 0;
const ACCEPTABLE_CURRENT_MAX = 100;

const STATUS_BADGE_EARTH = { 'OK': 'bg-emerald-50 text-emerald-700 border-emerald-200', 'Faulty': 'bg-rose-50 text-rose-700 border-rose-200' };
const STATUS_BADGE_PASS = { 'Pass': 'bg-emerald-50 text-emerald-700 border-emerald-200', 'Fail': 'bg-rose-50 text-rose-700 border-rose-200' };
const STATUS_BADGE_YESNO = { 'Yes': 'bg-emerald-50 text-emerald-700 border-emerald-200', 'No': 'bg-rose-50 text-rose-700 border-rose-200' };

const SEED_ELECTRICAL_SAFETY = [
  { id: 'es-001', department: 'ICU', location: 'ICU-PNL-01', equipment: 'Main LT Panel', inspectionDate: '2026-06-12', engineer: 'Er. Anil Kumar', earthingStatus: 'OK', panelCondition: 'Good', generatorStatus: 'OK', upsStatus: 'OK', voltageReading: '230', currentReading: '45', inspectionResult: 'Compliant', observation: '', nextInspectionDate: '2026-12-12', remarks: 'Routine electrical safety inspection passed.' },
  { id: 'es-002', department: 'OT', location: 'OT-PNL-02', equipment: 'OT Power Panel', inspectionDate: '2026-06-15', engineer: 'Er. Sunil Rao', earthingStatus: 'OK', panelCondition: 'Good', generatorStatus: 'OK', upsStatus: 'OK', voltageReading: '232', currentReading: '50', inspectionResult: 'Compliant', observation: '', nextInspectionDate: '2026-12-15', remarks: 'OT panel within safe parameters.' },
  { id: 'es-003', department: 'Radiology', location: 'RAD-PNL-01', equipment: 'Imaging UPS Feed', inspectionDate: '2026-06-18', engineer: 'Er. Priya Menon', earthingStatus: 'OK', panelCondition: 'Good', generatorStatus: 'OK', upsStatus: 'OK', voltageReading: '228', currentReading: '38', inspectionResult: 'Compliant', observation: '', nextInspectionDate: '2026-12-18', remarks: 'Imaging suite earthing verified.' },
  { id: 'es-004', department: 'Emergency', location: 'ER-PNL-01', equipment: 'ER Distribution Board', inspectionDate: '2026-06-20', engineer: 'Er. Anil Kumar', earthingStatus: 'Faulty', panelCondition: 'Fair', generatorStatus: 'OK', upsStatus: 'OK', voltageReading: '235', currentReading: '48', inspectionResult: 'Critical', observation: 'Earthing continuity failed, isolation transformer required.', nextInspectionDate: '2026-07-20', remarks: 'Critical: earthing fault detected.' },
  { id: 'es-005', department: 'Ward', location: 'WARD-PNL-03', equipment: 'Ward DB-3', inspectionDate: '2026-06-22', engineer: 'Er. Sunil Rao', earthingStatus: 'OK', panelCondition: 'Poor', generatorStatus: 'OK', upsStatus: 'OK', voltageReading: '240', currentReading: '55', inspectionResult: 'Critical', observation: 'Panel busbar deteriorated, replacement recommended.', nextInspectionDate: '2026-07-22', remarks: 'Critical: panel condition poor.' },
  { id: 'es-006', department: 'CSSD', location: 'CSSD-PNL-01', equipment: 'Sterilizer Feed', inspectionDate: '2026-06-25', engineer: 'Er. Priya Menon', earthingStatus: 'OK', panelCondition: 'Good', generatorStatus: 'OK', upsStatus: 'OK', voltageReading: '415', currentReading: '80', inspectionResult: 'Compliant', observation: '', nextInspectionDate: '2026-12-25', remarks: 'Three-phase sterilizer feed nominal.' },
  { id: 'es-007', department: 'Laboratory', location: 'LAB-PNL-01', equipment: 'Lab DB', inspectionDate: '2026-06-28', engineer: 'Er. Anil Kumar', earthingStatus: 'OK', panelCondition: 'Good', generatorStatus: 'OK', upsStatus: 'OK', voltageReading: '226', currentReading: '30', inspectionResult: 'Compliant', observation: '', nextInspectionDate: '2026-12-28', remarks: 'Lab distribution board compliant.' },
  { id: 'es-008', department: 'Cardiology', location: 'CARD-PNL-01', equipment: 'Cath Lab Feed', inspectionDate: '2026-07-01', engineer: 'Er. Sunil Rao', earthingStatus: 'OK', panelCondition: 'Fair', generatorStatus: 'OK', upsStatus: 'OK', voltageReading: '233', currentReading: '60', inspectionResult: 'Observation', observation: 'Minor voltage fluctuation noted during load.', nextInspectionDate: '2026-10-01', remarks: 'Monitor voltage stability.' },
  { id: 'es-009', department: 'Pharmacy', location: 'PHARM-PNL-01', equipment: 'Cold Chain Feed', inspectionDate: '2026-07-03', engineer: 'Er. Priya Menon', earthingStatus: 'OK', panelCondition: 'Good', generatorStatus: 'OK', upsStatus: 'OK', voltageReading: '270', currentReading: '42', inspectionResult: 'Critical', observation: 'Voltage 270V exceeds 250V limit, stabilizer faulty.', nextInspectionDate: '2026-08-03', remarks: 'Critical: voltage above acceptable range.' },
  { id: 'es-010', department: 'Nephrology', location: 'NEP-PNL-01', equipment: 'Dialysis Feed', inspectionDate: '2026-07-05', engineer: 'Er. Anil Kumar', earthingStatus: 'OK', panelCondition: 'Good', generatorStatus: 'Faulty', upsStatus: 'OK', voltageReading: '231', currentReading: '120', inspectionResult: 'Critical', observation: 'Current 120A above 100A limit; generator auto-start failed.', nextInspectionDate: '2026-08-05', remarks: 'Critical: current above acceptable range.' },
];

const SEED_FIRE_SAFETY = [
  { id: 'fs-001', department: 'ICU', fireExtinguisherId: 'FE-ICU-01', equipmentType: 'ABC Extinguisher', inspectionDate: '2026-06-10', fireAlarmStatus: 'Pass', hydrantStatus: 'Pass', sprinklerStatus: 'Pass', emergencyExitStatus: 'Pass', fireDrillConducted: 'Yes', inspector: 'Insp. Ramesh', complianceStatus: 'Compliant', observation: '', nextInspectionDate: '2026-12-10', remarks: 'All fire systems functional.' },
  { id: 'fs-002', department: 'OT', fireExtinguisherId: 'FE-OT-02', equipmentType: 'CO2 Extinguisher', inspectionDate: '2026-06-12', fireAlarmStatus: 'Pass', hydrantStatus: 'Pass', sprinklerStatus: 'Pass', emergencyExitStatus: 'Pass', fireDrillConducted: 'Yes', inspector: 'Insp. Suresh', complianceStatus: 'Compliant', observation: '', nextInspectionDate: '2026-12-12', remarks: 'OT fire safety compliant.' },
  { id: 'fs-003', department: 'Emergency', fireExtinguisherId: 'FE-ER-03', equipmentType: 'ABC Extinguisher', inspectionDate: '2026-06-14', fireAlarmStatus: 'Pass', hydrantStatus: 'Pass', sprinklerStatus: 'Pass', emergencyExitStatus: 'Pass', fireDrillConducted: 'Yes', inspector: 'Insp. Ramesh', complianceStatus: 'Compliant', observation: '', nextInspectionDate: '2026-12-14', remarks: 'ER fire systems verified.' },
  { id: 'fs-004', department: 'Ward', fireExtinguisherId: 'FE-WARD-04', equipmentType: 'Water Extinguisher', inspectionDate: '2026-06-16', fireAlarmStatus: 'Fail', hydrantStatus: 'Pass', sprinklerStatus: 'Pass', emergencyExitStatus: 'Pass', fireDrillConducted: 'No', inspector: 'Insp. Suresh', complianceStatus: 'Critical', observation: 'Fire alarm panel fault in Ward block.', nextInspectionDate: '2026-07-16', remarks: 'Critical: fire alarm failed.' },
  { id: 'fs-005', department: 'Radiology', fireExtinguisherId: 'FE-RAD-05', equipmentType: 'CO2 Extinguisher', inspectionDate: '2026-06-18', fireAlarmStatus: 'Pass', hydrantStatus: 'Fail', sprinklerStatus: 'Pass', emergencyExitStatus: 'Pass', fireDrillConducted: 'No', inspector: 'Insp. Ramesh', complianceStatus: 'Critical', observation: 'Hydrant valve leaking, maintenance raised.', nextInspectionDate: '2026-07-18', remarks: 'Critical: hydrant failed.' },
  { id: 'fs-006', department: 'Laboratory', fireExtinguisherId: 'FE-LAB-06', equipmentType: 'DCP Extinguisher', inspectionDate: '2026-06-20', fireAlarmStatus: 'Pass', hydrantStatus: 'Pass', sprinklerStatus: 'Fail', emergencyExitStatus: 'Pass', fireDrillConducted: 'Yes', inspector: 'Insp. Suresh', complianceStatus: 'Critical', observation: 'Sprinkler head blocked in lab.', nextInspectionDate: '2026-07-20', remarks: 'Critical: sprinkler failed.' },
  { id: 'fs-007', department: 'CSSD', fireExtinguisherId: 'FE-CSSD-07', equipmentType: 'Foam Extinguisher', inspectionDate: '2026-06-22', fireAlarmStatus: 'Pass', hydrantStatus: 'Pass', sprinklerStatus: 'Pass', emergencyExitStatus: 'Fail', fireDrillConducted: 'No', inspector: 'Insp. Ramesh', complianceStatus: 'Critical', observation: 'Emergency exit sign not illuminated.', nextInspectionDate: '2026-07-22', remarks: 'Critical: emergency exit failed.' },
  { id: 'fs-008', department: 'Cardiology', fireExtinguisherId: 'FE-CARD-08', equipmentType: 'Clean Agent Extinguisher', inspectionDate: '2026-06-24', fireAlarmStatus: 'Pass', hydrantStatus: 'Pass', sprinklerStatus: 'Pass', emergencyExitStatus: 'Pass', fireDrillConducted: 'Yes', inspector: 'Insp. Suresh', complianceStatus: 'Compliant', observation: '', nextInspectionDate: '2026-12-24', remarks: 'Cath lab fire safety compliant.' },
  { id: 'fs-009', department: 'Pharmacy', fireExtinguisherId: 'FE-PHARM-09', equipmentType: 'ABC Extinguisher', inspectionDate: '2026-06-26', fireAlarmStatus: 'Pass', hydrantStatus: 'Pass', sprinklerStatus: 'Pass', emergencyExitStatus: 'Pass', fireDrillConducted: 'Yes', inspector: 'Insp. Ramesh', complianceStatus: 'Observation', observation: 'Fire drill pending for pharmacy staff.', nextInspectionDate: '2026-10-26', remarks: 'Schedule pharmacy fire drill.' },
  { id: 'fs-010', department: 'Nephrology', fireExtinguisherId: 'FE-NEP-10', equipmentType: 'CO2 Extinguisher', inspectionDate: '2026-06-28', fireAlarmStatus: 'Pass', hydrantStatus: 'Pass', sprinklerStatus: 'Pass', emergencyExitStatus: 'Pass', fireDrillConducted: 'Yes', inspector: 'Insp. Suresh', complianceStatus: 'Compliant', observation: '', nextInspectionDate: '2026-12-28', remarks: 'Nephrology fire systems compliant.' },
];

const SEED_BIOMEDICAL_WASTE = [
  { id: 'bw-001', department: 'ICU', wasteCategory: 'Infectious Waste', collectionDate: '2026-07-01', collectedBy: 'Raju Patil', segregationStatus: 'Compliant', storageStatus: 'Compliant', transportationStatus: 'Compliant', disposalVendor: 'BioCare Disposal', weight: '45', manifestNumber: 'BM-2026-001', complianceStatus: 'Compliant', observation: '', remarks: 'Infectious waste handled per BMW rules.' },
  { id: 'bw-002', department: 'OT', wasteCategory: 'Sharps', collectionDate: '2026-07-01', collectedBy: 'Raju Patil', segregationStatus: 'Compliant', storageStatus: 'Compliant', transportationStatus: 'Compliant', disposalVendor: 'BioCare Disposal', weight: '12', manifestNumber: 'BM-2026-002', complianceStatus: 'Compliant', observation: '', remarks: 'Sharps disposed in puncture-proof containers.' },
  { id: 'bw-003', department: 'Emergency', wasteCategory: 'Pathological', collectionDate: '2026-07-02', collectedBy: 'Manoj Kumar', segregationStatus: 'Compliant', storageStatus: 'Compliant', transportationStatus: 'Compliant', disposalVendor: 'GreenMed Waste', weight: '22', manifestNumber: 'BM-2026-003', complianceStatus: 'Compliant', observation: '', remarks: 'Pathological waste segregated correctly.' },
  { id: 'bw-004', department: 'Ward', wasteCategory: 'General Waste', collectionDate: '2026-07-02', collectedBy: 'Manoj Kumar', segregationStatus: 'Non-Compliant', storageStatus: 'Compliant', transportationStatus: 'Compliant', disposalVendor: 'GreenMed Waste', weight: '60', manifestNumber: 'BM-2026-004', complianceStatus: 'Critical', observation: 'Sharps found mixed with general waste.', remarks: 'Critical: segregation non-compliant.' },
  { id: 'bw-005', department: 'Radiology', wasteCategory: 'Chemical', collectionDate: '2026-07-03', collectedBy: 'Suresh Patil', segregationStatus: 'Compliant', storageStatus: 'Non-Compliant', transportationStatus: 'Compliant', disposalVendor: 'BioCare Disposal', weight: '18', manifestNumber: 'BM-2026-005', complianceStatus: 'Critical', observation: 'Chemical waste stored beyond 24h limit.', remarks: 'Critical: storage non-compliant.' },
  { id: 'bw-006', department: 'Laboratory', wasteCategory: 'Infectious Waste', collectionDate: '2026-07-03', collectedBy: 'Suresh Patil', segregationStatus: 'Compliant', storageStatus: 'Compliant', transportationStatus: 'Non-Compliant', disposalVendor: 'GreenMed Waste', weight: '30', manifestNumber: 'BM-2026-006', complianceStatus: 'Critical', observation: 'Transport vehicle delayed, SLA breached.', remarks: 'Critical: transportation non-compliant.' },
  { id: 'bw-007', department: 'CSSD', wasteCategory: 'Pharmaceutical', collectionDate: '2026-07-04', collectedBy: 'Raju Patil', segregationStatus: 'Compliant', storageStatus: 'Compliant', transportationStatus: 'Compliant', disposalVendor: 'BioCare Disposal', weight: '15', manifestNumber: 'BM-2026-007', complianceStatus: 'Compliant', observation: '', remarks: 'Pharmaceutical waste compliant.' },
  { id: 'bw-008', department: 'Cardiology', wasteCategory: 'Cytotoxic', collectionDate: '2026-07-04', collectedBy: 'Manoj Kumar', segregationStatus: 'Compliant', storageStatus: 'Compliant', transportationStatus: 'Compliant', disposalVendor: 'GreenMed Waste', weight: '9', manifestNumber: 'BM-2026-008', complianceStatus: 'Compliant', observation: '', remarks: 'Cytotoxic waste handled in yellow bins.' },
  { id: 'bw-009', department: 'Pharmacy', wasteCategory: 'Pharmaceutical', collectionDate: '2026-07-05', collectedBy: 'Suresh Patil', segregationStatus: 'Compliant', storageStatus: 'Compliant', transportationStatus: 'Compliant', disposalVendor: 'BioCare Disposal', weight: '25', manifestNumber: 'BM-2026-009', complianceStatus: 'Observation', observation: 'Manifest documentation pending upload.', remarks: 'Upload manifest to portal.' },
  { id: 'bw-010', department: 'Nephrology', wasteCategory: 'Infectious Waste', collectionDate: '2026-07-05', collectedBy: 'Raju Patil', segregationStatus: 'Compliant', storageStatus: 'Compliant', transportationStatus: 'Compliant', disposalVendor: 'GreenMed Waste', weight: '38', manifestNumber: 'BM-2026-010', complianceStatus: 'Compliant', observation: '', remarks: 'Infectious waste compliant.' },
];

const EMPTY_ELECTRICAL = {
  id: '', department: '', location: '', equipment: '', inspectionDate: '', engineer: '',
  earthingStatus: 'OK', panelCondition: 'Good', generatorStatus: 'OK', upsStatus: 'OK',
  voltageReading: '', currentReading: '', inspectionResult: 'Compliant', observation: '',
  nextInspectionDate: '', remarks: '',
};

const EMPTY_FIRE = {
  id: '', department: '', fireExtinguisherId: '', equipmentType: '', inspectionDate: '',
  fireAlarmStatus: 'Pass', hydrantStatus: 'Pass', sprinklerStatus: 'Pass', emergencyExitStatus: 'Pass',
  fireDrillConducted: 'No', inspector: '', complianceStatus: 'Compliant', observation: '',
  nextInspectionDate: '', remarks: '',
};

const EMPTY_BIOMEDICAL = {
  id: '', department: '', wasteCategory: '', collectionDate: '', collectedBy: '',
  segregationStatus: 'Compliant', storageStatus: 'Compliant', transportationStatus: 'Compliant',
  disposalVendor: '', weight: '', manifestNumber: '', complianceStatus: 'Compliant', observation: '', remarks: '',
};

const validateElectrical = (form) => {
  const errors = {};
  if (!form.department) errors.department = 'Department is required';
  if (!form.location.trim()) errors.location = 'Location is required';
  if (!form.equipment.trim()) errors.equipment = 'Equipment is required';
  if (!form.inspectionDate) errors.inspectionDate = 'Inspection Date is required';
  if (!form.engineer.trim()) errors.engineer = 'Engineer is required';
  if (form.voltageReading === '' || isNaN(parseFloat(form.voltageReading))) errors.voltageReading = 'Valid Voltage Reading is required';
  if (form.currentReading === '' || isNaN(parseFloat(form.currentReading))) errors.currentReading = 'Valid Current Reading is required';
  if (!form.earthingStatus) errors.earthingStatus = 'Earthing Status is required';
  if (!form.panelCondition) errors.panelCondition = 'Panel Condition is required';
  return errors;
};

const validateFire = (form) => {
  const errors = {};
  if (!form.department) errors.department = 'Department is required';
  if (!form.fireExtinguisherId.trim()) errors.fireExtinguisherId = 'Fire Extinguisher ID is required';
  if (!form.equipmentType) errors.equipmentType = 'Equipment Type is required';
  if (!form.inspectionDate) errors.inspectionDate = 'Inspection Date is required';
  if (!form.inspector.trim()) errors.inspector = 'Inspector is required';
  return errors;
};

const validateBiomedical = (form) => {
  const errors = {};
  if (!form.department) errors.department = 'Department is required';
  if (!form.wasteCategory) errors.wasteCategory = 'Waste Category is required';
  if (!form.collectionDate) errors.collectionDate = 'Collection Date is required';
  if (!form.collectedBy.trim()) errors.collectedBy = 'Collected By is required';
  if (!form.disposalVendor.trim()) errors.disposalVendor = 'Disposal Vendor is required';
  if (form.weight === '' || isNaN(parseFloat(form.weight))) errors.weight = 'Valid Weight is required';
  if (!form.manifestNumber.trim()) errors.manifestNumber = 'Manifest Number is required';
  return errors;
};

const computeElectricalResult = (form) => {
  const voltage = parseFloat(form.voltageReading);
  const current = parseFloat(form.currentReading);
  const voltageOut = !isNaN(voltage) && (voltage < ACCEPTABLE_VOLTAGE_MIN || voltage > ACCEPTABLE_VOLTAGE_MAX);
  const currentOut = !isNaN(current) && (current < ACCEPTABLE_CURRENT_MIN || current > ACCEPTABLE_CURRENT_MAX);
  if (form.earthingStatus === 'Faulty' || form.panelCondition === 'Poor' || voltageOut || currentOut) return 'Critical';
  return form.inspectionResult;
};

const computeFireCompliance = (form) => {
  if ([form.fireAlarmStatus, form.hydrantStatus, form.sprinklerStatus, form.emergencyExitStatus].includes('Fail')) return 'Critical';
  return form.complianceStatus;
};

const computeBiomedicalCompliance = (form) => {
  if ([form.segregationStatus, form.storageStatus, form.transportationStatus].includes('Non-Compliant')) return 'Critical';
  return form.complianceStatus;
};

// ===== PHASE 5: SUPPORT SERVICES =====
const LS_KEY_LAUNDRY = 'general_laundry_management';
const LS_KEY_LINEN_INVENTORY = 'general_linen_inventory';
const LS_KEY_LINEN_CONDEMNATION = 'general_linen_condemnation';

const LAUNDRY_STATUSES = ['Pending', 'Processing', 'Completed', 'Delayed'];
const LAUNDRY_TYPES = ['In-house', 'Outsourced', 'Third-party Contractor'];
const WASH_CYCLES = ['Normal', 'Hot Wash', 'Thermal Disinfection', 'Chemical Disinfection', 'Standard'];
const LINEN_CATEGORIES = ['Bed Sheet', 'Pillow Cover', 'Blanket', 'OT Linen', 'Patient Gown', 'Curtains'];
const INVENTORY_STATUSES = ['Available', 'Low Stock', 'Out of Stock'];
const CONDEMN_REASONS = ['Damaged', 'Torn', 'Stained', 'Worn Out'];
const DISPOSAL_METHODS = ['Incineration', 'Authorized Vendor', 'Landfill', 'Recycling', 'Autoclave'];
const CONDEMN_STATUSES = ['Pending', 'Approved', 'Disposed'];

// ===== PHASE 6: INTERNAL AUDIT =====
const LS_KEY_INTERNAL_AUDIT = 'general_internal_audits';
const LS_KEY_CAPA_TRACKER = 'general_capa_tracker';

const AUDIT_AREAS = ['Facility Assets', 'Equipment & Utilities', 'Safety Compliance', 'Support Services', 'Infection Control', 'Pharmacy', 'Laboratory', 'Radiology'];
const AUDIT_RESULTS = ['Compliant', 'Observation', 'Critical'];
const CAPA_RISK_LEVELS = ['Low', 'Medium', 'High', 'Critical'];
const CAPA_STATUSES = ['Open', 'In Progress', 'Closed', 'Overdue'];
const CAPA_EFFECTIVENESS = ['Yes', 'No'];

const STATUS_BADGE_AUDIT = {
  'Compliant': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Observation': 'bg-amber-50 text-amber-700 border-amber-200',
  'Critical': 'bg-rose-50 text-rose-700 border-rose-200',
};

const STATUS_BADGE_CAPA = {
  'Open': 'bg-slate-50 text-slate-700 border-slate-200',
  'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
  'Closed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Overdue': 'bg-rose-50 text-rose-700 border-rose-200',
};

const RISK_BADGE = {
  'Low': 'bg-sky-50 text-sky-700 border-sky-200',
  'Medium': 'bg-amber-50 text-amber-700 border-amber-200',
  'High': 'bg-orange-50 text-orange-700 border-orange-200',
  'Critical': 'bg-rose-50 text-rose-700 border-rose-200',
};

const STATUS_BADGE_LAUNDRY = {
  'Pending': 'bg-slate-50 text-slate-700 border-slate-200',
  'Processing': 'bg-amber-50 text-amber-700 border-amber-200',
  'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Delayed': 'bg-rose-50 text-rose-700 border-rose-200',
};

const STATUS_BADGE_INVENTORY = {
  'Available': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Low Stock': 'bg-amber-50 text-amber-700 border-amber-200',
  'Out of Stock': 'bg-rose-50 text-rose-700 border-rose-200',
};

const STATUS_BADGE_CONDEMN = {
  'Pending': 'bg-slate-50 text-slate-700 border-slate-200',
  'Approved': 'bg-amber-50 text-amber-700 border-amber-200',
  'Disposed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const SEED_LAUNDRY = [
  { id: 'lm-001', department: 'ICU', collectionDate: '2026-07-12', collectionTime: '08:30', collectedBy: 'Raju Patil', laundryVendor: 'CleanCare Laundry Services', laundryType: 'Outsourced', soiledLinenQuantity: 120, cleanLinenQuantity: 118, washCycle: 'Thermal Disinfection', deliveryDate: '2026-07-12', deliveryTime: '16:00', laundryStatus: 'Completed', remarks: 'ICU soiled linen collected and returned clean.' },
  { id: 'lm-002', department: 'OT', collectionDate: '2026-07-13', collectionTime: '09:00', collectedBy: 'Suresh Kumar', laundryVendor: 'MediLinen Pvt Ltd', laundryType: 'Third-party Contractor', soiledLinenQuantity: 80, cleanLinenQuantity: 78, washCycle: 'Standard', deliveryDate: '2026-07-13', deliveryTime: '17:00', laundryStatus: 'Completed', remarks: 'OT linen processed and delivered.' },
  { id: 'lm-003', department: 'Ward', collectionDate: '2026-07-14', collectionTime: '07:45', collectedBy: 'Raju Patil', laundryVendor: 'In-house Laundry', laundryType: 'In-house', soiledLinenQuantity: 200, cleanLinenQuantity: 0, washCycle: 'Normal', deliveryDate: '2026-07-14', deliveryTime: '18:00', laundryStatus: 'Processing', remarks: 'Bulk ward linen under wash cycle.' },
  { id: 'lm-004', department: 'Emergency', collectionDate: '2026-07-10', collectionTime: '10:15', collectedBy: 'Manoj Kumar', laundryVendor: 'CleanCare Laundry Services', laundryType: 'Outsourced', soiledLinenQuantity: 60, cleanLinenQuantity: 0, washCycle: 'Hot Wash', deliveryDate: '2026-07-11', deliveryTime: '12:00', laundryStatus: 'Delayed', remarks: 'Delivery overdue beyond committed date.' },
  { id: 'lm-005', department: 'CSSD', collectionDate: '2026-07-09', collectionTime: '11:00', collectedBy: 'Suresh Kumar', laundryVendor: 'MediLinen Pvt Ltd', laundryType: 'Third-party Contractor', soiledLinenQuantity: 45, cleanLinenQuantity: 0, washCycle: 'Thermal Disinfection', deliveryDate: '2026-07-12', deliveryTime: '15:00', laundryStatus: 'Delayed', remarks: 'Vendor delayed pickup, flagged overdue.' },
  { id: 'lm-006', department: 'Pediatrics', collectionDate: '2026-07-14', collectionTime: '08:00', collectedBy: 'Raju Patil', laundryVendor: 'In-house Laundry', laundryType: 'In-house', soiledLinenQuantity: 90, cleanLinenQuantity: 0, washCycle: 'Normal', deliveryDate: '2026-07-14', deliveryTime: '19:00', laundryStatus: 'Pending', remarks: 'Awaiting collection slot.' },
  { id: 'lm-007', department: 'Cardiology', collectionDate: '2026-07-13', collectionTime: '14:00', collectedBy: 'Manoj Kumar', laundryVendor: 'CleanCare Laundry Services', laundryType: 'Outsourced', soiledLinenQuantity: 70, cleanLinenQuantity: 68, washCycle: 'Chemical Disinfection', deliveryDate: '2026-07-13', deliveryTime: '20:00', laundryStatus: 'Completed', remarks: 'Cath lab linen disinfected and returned.' },
  { id: 'lm-008', department: 'Nephrology', collectionDate: '2026-07-11', collectionTime: '09:30', collectedBy: 'Suresh Kumar', laundryVendor: 'MediLinen Pvt Ltd', laundryType: 'Third-party Contractor', soiledLinenQuantity: 55, cleanLinenQuantity: 0, washCycle: 'Hot Wash', deliveryDate: '2026-07-12', deliveryTime: '14:00', laundryStatus: 'Delayed', remarks: 'Dialysis linen delivery breached SLA.' },
  { id: 'lm-009', department: 'Radiology', collectionDate: '2026-07-14', collectionTime: '10:00', collectedBy: 'Raju Patil', laundryVendor: 'In-house Laundry', laundryType: 'In-house', soiledLinenQuantity: 30, cleanLinenQuantity: 0, washCycle: 'Normal', deliveryDate: '2026-07-14', deliveryTime: '17:00', laundryStatus: 'Processing', remarks: 'Imaging suite linen in process.' },
  { id: 'lm-010', department: 'OBG', collectionDate: '2026-07-12', collectionTime: '08:15', collectedBy: 'Manoj Kumar', laundryVendor: 'CleanCare Laundry Services', laundryType: 'Outsourced', soiledLinenQuantity: 100, cleanLinenQuantity: 98, washCycle: 'Thermal Disinfection', deliveryDate: '2026-07-12', deliveryTime: '18:30', laundryStatus: 'Completed', remarks: 'Maternity ward linen returned clean.' },
];

const SEED_LINEN_INVENTORY = [
  { id: 'li-001', department: 'ICU', linenCategory: 'Bed Sheet', quantityAvailable: 340, minimumStock: 100, lastUpdated: '2026-07-13', inventoryStatus: 'Available', remarks: 'Adequate stock for critical care.' },
  { id: 'li-002', department: 'Ward', linenCategory: 'Pillow Cover', quantityAvailable: 80, minimumStock: 100, lastUpdated: '2026-07-13', inventoryStatus: 'Low Stock', remarks: 'Replenishment requisition raised.' },
  { id: 'li-003', department: 'OT', linenCategory: 'OT Linen', quantityAvailable: 0, minimumStock: 50, lastUpdated: '2026-07-12', inventoryStatus: 'Out of Stock', remarks: 'Emergency stock-out, urgent refill needed.' },
  { id: 'li-004', department: 'Emergency', linenCategory: 'Patient Gown', quantityAvailable: 150, minimumStock: 60, lastUpdated: '2026-07-14', inventoryStatus: 'Available', remarks: 'Healthy buffer maintained.' },
  { id: 'li-005', department: 'Pediatrics', linenCategory: 'Blanket', quantityAvailable: 45, minimumStock: 50, lastUpdated: '2026-07-13', inventoryStatus: 'Low Stock', remarks: 'Below minimum, order pending.' },
  { id: 'li-006', department: 'CSSD', linenCategory: 'Curtains', quantityAvailable: 30, minimumStock: 20, lastUpdated: '2026-07-11', inventoryStatus: 'Available', remarks: 'Sufficient for partition use.' },
  { id: 'li-007', department: 'Cardiology', linenCategory: 'Bed Sheet', quantityAvailable: 220, minimumStock: 80, lastUpdated: '2026-07-14', inventoryStatus: 'Available', remarks: 'Well stocked.' },
  { id: 'li-008', department: 'Nephrology', linenCategory: 'Patient Gown', quantityAvailable: 0, minimumStock: 40, lastUpdated: '2026-07-12', inventoryStatus: 'Out of Stock', remarks: 'Stock-out reported to supply.' },
  { id: 'li-009', department: 'Radiology', linenCategory: 'Pillow Cover', quantityAvailable: 60, minimumStock: 50, lastUpdated: '2026-07-13', inventoryStatus: 'Available', remarks: 'Normal levels.' },
  { id: 'li-010', department: 'OBG', linenCategory: 'Blanket', quantityAvailable: 35, minimumStock: 40, lastUpdated: '2026-07-14', inventoryStatus: 'Low Stock', remarks: 'Monitor and refill.' },
];

const SEED_LINEN_CONDEMNATION = [
  { id: 'lc-001', department: 'ICU', linenCategory: 'Bed Sheet', quantity: 25, reason: 'Damaged', condemnationDate: '2026-07-10', approvedBy: 'Dr. Anil Mehta', disposalMethod: 'Incineration', status: 'Approved', remarks: 'Torn beyond repair, approved for disposal.' },
  { id: 'lc-002', department: 'Ward', linenCategory: 'Pillow Cover', quantity: 40, reason: 'Torn', condemnationDate: '2026-07-08', approvedBy: 'Matron S. Rao', disposalMethod: 'Authorized Vendor', status: 'Disposed', remarks: 'Disposed via authorized linen vendor.' },
  { id: 'lc-003', department: 'OT', linenCategory: 'OT Linen', quantity: 15, reason: 'Stained', condemnationDate: '2026-07-11', approvedBy: 'Dr. Priya Nair', disposalMethod: 'Autoclave', status: 'Pending', remarks: 'Awaiting infection control approval.' },
  { id: 'lc-004', department: 'Emergency', linenCategory: 'Patient Gown', quantity: 30, reason: 'Worn Out', condemnationDate: '2026-07-09', approvedBy: 'Dr. Anil Mehta', disposalMethod: 'Incineration', status: 'Approved', remarks: 'Approved for incineration.' },
  { id: 'lc-005', department: 'Pediatrics', linenCategory: 'Blanket', quantity: 20, reason: 'Damaged', condemnationDate: '2026-07-12', approvedBy: 'Matron S. Rao', disposalMethod: 'Authorized Vendor', status: 'Pending', remarks: 'Pending disposal authorization.' },
  { id: 'lc-006', department: 'CSSD', linenCategory: 'Curtains', quantity: 10, reason: 'Stained', condemnationDate: '2026-07-10', approvedBy: 'Dr. Priya Nair', disposalMethod: 'Incineration', status: 'Disposed', remarks: 'Disposed through incineration.' },
  { id: 'lc-007', department: 'Cardiology', linenCategory: 'Bed Sheet', quantity: 18, reason: 'Torn', condemnationDate: '2026-07-13', approvedBy: 'Dr. Anil Mehta', disposalMethod: 'Authorized Vendor', status: 'Approved', remarks: 'Approved for vendor handover.' },
  { id: 'lc-008', department: 'Nephrology', linenCategory: 'Patient Gown', quantity: 22, reason: 'Worn Out', condemnationDate: '2026-07-11', approvedBy: 'Matron S. Rao', disposalMethod: 'Landfill', status: 'Pending', remarks: 'Pending disposal scheduling.' },
  { id: 'lc-009', department: 'Radiology', linenCategory: 'Pillow Cover', quantity: 12, reason: 'Stained', condemnationDate: '2026-07-12', approvedBy: 'Dr. Priya Nair', disposalMethod: 'Incineration', status: 'Disposed', remarks: 'Incinerated as per BMW norms.' },
   { id: 'lc-010', department: 'OBG', linenCategory: 'Blanket', quantity: 16, reason: 'Damaged', condemnationDate: '2026-07-13', approvedBy: 'Dr. Anil Mehta', disposalMethod: 'Authorized Vendor', status: 'Approved', remarks: 'Approved for handover.' },
 ];

const SEED_INTERNAL_AUDIT = [
  { id: 'ia-001', auditDate: '2026-07-01', department: 'ICU', auditArea: 'Safety Compliance', auditor: 'Dr. Anil Mehta', complianceScore: 92, auditResult: 'Compliant', majorFindings: 'None', minorFindings: 'Minor documentation delay', recommendations: 'Streamline record-keeping process', nextAuditDate: '2026-10-01', remarks: 'Routine audit completed satisfactorily.' },
  { id: 'ia-002', auditDate: '2026-07-02', department: 'OT', auditArea: 'Equipment & Utilities', auditor: 'Insp. Suresh', complianceScore: 88, auditResult: 'Observation', majorFindings: 'One sterilizer calibration overdue', minorFindings: 'Two maintenance logs pending', recommendations: 'Schedule immediate sterilizer calibration', nextAuditDate: '2026-10-02', remarks: 'Sterilizer PM window approaching.' },
  { id: 'ia-003', auditDate: '2026-07-03', department: 'Emergency', auditArea: 'Facility Assets', auditor: 'Er. Priya Menon', complianceScore: 65, auditResult: 'Critical', majorFindings: 'Fire exit blocked, emergency lighting faulty', minorFindings: 'Evacuation plan outdated', recommendations: 'Unblock fire exits, replace emergency lights', nextAuditDate: '2026-07-17', remarks: 'Critical safety deficiencies identified.' },
  { id: 'ia-004', auditDate: '2026-07-04', department: 'Ward', auditArea: 'Support Services', auditor: 'Matron S. Rao', complianceScore: 78, auditResult: 'Observation', majorFindings: 'Housekeeping schedule irregular', minorFindings: 'Linen storage area needs reorganization', recommendations: 'Revise housekeeping SOPs', nextAuditDate: '2026-10-04', remarks: 'Support services need process improvement.' },
  { id: 'ia-005', auditDate: '2026-07-05', department: 'Cardiology', auditArea: 'Equipment & Utilities', auditor: 'Dr. Ramesh K', complianceScore: 95, auditResult: 'Compliant', majorFindings: 'None', minorFindings: 'None', recommendations: 'Continue current practices', nextAuditDate: '2026-10-05', remarks: 'Excellent equipment maintenance standards.' },
  { id: 'ia-006', auditDate: '2026-07-06', department: 'Radiology', auditArea: 'Safety Compliance', auditor: 'Er. Sunil Rao', complianceScore: 55, auditResult: 'Critical', majorFindings: 'Lead shielding inadequate in CT room', minorFindings: 'Radiation badges not updated', recommendations: 'Install additional lead shielding, update badge program', nextAuditDate: '2026-07-20', remarks: 'Radiation safety non-compliance.' },
  { id: 'ia-007', auditDate: '2026-07-07', department: 'Laboratory', auditArea: 'Support Services', auditor: 'Dr. Priya Nair', complianceScore: 85, auditResult: 'Observation', majorFindings: 'Chemical storage labeling incomplete', minorFindings: 'Waste segregation bins unclear', recommendations: 'Update SDS labels, replace bin signage', nextAuditDate: '2026-10-07', remarks: 'Laboratory safety protocols need refinement.' },
  { id: 'ia-008', auditDate: '2026-07-08', department: 'Nephrology', auditArea: 'Equipment & Utilities', auditor: 'Er. Anil Kumar', complianceScore: 72, auditResult: 'Observation', majorFindings: 'Dialysis water quality monitoring delayed', minorFindings: 'Reverse osmosis membrane replacement pending', recommendations: 'Accelerate membrane replacement schedule', nextAuditDate: '2026-10-08', remarks: 'Water treatment system needs attention.' },
  { id: 'ia-009', auditDate: '2026-07-09', department: 'Pharmacy', auditArea: 'Safety Compliance', auditor: 'Insp. Ramesh', complianceScore: 90, auditResult: 'Compliant', majorFindings: 'None', minorFindings: 'Temperature log gap of 2 hours', recommendations: 'Ensure continuous temperature monitoring', nextAuditDate: '2026-10-09', remarks: 'Overall compliant with minor observation.' },
  { id: 'ia-010', auditDate: '2026-07-10', department: 'CSSD', auditArea: 'Facility Assets', auditor: 'Dr. Anil Mehta', complianceScore: 68, auditResult: 'Critical', majorFindings: 'Autoclave door seal damaged', minorFindings: 'Sterilization indicator chart missing', recommendations: 'Replace autoclave door seal immediately', nextAuditDate: '2026-07-24', remarks: 'Critical: CSSD sterilization compromised.' },
];

const SEED_CAPA_TRACKER = [
  { id: 'cp-001', linkedAudit: 'ia-003', department: 'Emergency', finding: 'Fire exit blocked by storage', riskLevel: 'Critical', assignedTo: 'Er. Anil Kumar', targetDate: '2026-07-15', completionDate: '', status: 'Open', effectivenessVerified: 'No', remarks: 'Immediate action required.' },
  { id: 'cp-002', linkedAudit: 'ia-003', department: 'Emergency', finding: 'Emergency lighting faulty', riskLevel: 'High', assignedTo: 'Er. Sunil Rao', targetDate: '2026-07-18', completionDate: '', status: 'Open', effectivenessVerified: 'No', remarks: 'Replace all faulty emergency lights.' },
  { id: 'cp-003', linkedAudit: 'ia-006', department: 'Radiology', finding: 'Lead shielding inadequate', riskLevel: 'Critical', assignedTo: 'Er. Priya Menon', targetDate: '2026-07-20', completionDate: '', status: 'In Progress', effectivenessVerified: 'No', remarks: 'Additional shielding being procured.' },
  { id: 'cp-004', linkedAudit: 'ia-002', department: 'OT', finding: 'Sterilizer calibration overdue', riskLevel: 'High', assignedTo: 'Biomedical Dept', targetDate: '2026-07-22', completionDate: '2026-07-10', status: 'Closed', effectivenessVerified: 'Yes', remarks: 'Calibration completed successfully.' },
  { id: 'cp-005', linkedAudit: 'ia-010', department: 'CSSD', finding: 'Autoclave door seal damaged', riskLevel: 'Critical', assignedTo: 'Maintenance Dept', targetDate: '2026-07-14', completionDate: '', status: 'Overdue', effectivenessVerified: 'No', remarks: 'Urgent replacement needed.' },
  { id: 'cp-006', linkedAudit: 'ia-004', department: 'Ward', finding: 'Housekeeping schedule irregular', riskLevel: 'Medium', assignedTo: 'Matron S. Rao', targetDate: '2026-07-25', completionDate: '', status: 'In Progress', effectivenessVerified: 'No', remarks: 'New schedule under review.' },
  { id: 'cp-007', linkedAudit: 'ia-007', department: 'Laboratory', finding: 'Chemical storage labeling incomplete', riskLevel: 'Medium', assignedTo: 'Lab Admin', targetDate: '2026-07-28', completionDate: '', status: 'Open', effectivenessVerified: 'No', remarks: 'Update all SDS labels.' },
  { id: 'cp-008', linkedAudit: 'ia-008', department: 'Nephrology', finding: 'Dialysis water quality monitoring delayed', riskLevel: 'High', assignedTo: 'Er. Anil Kumar', targetDate: '2026-07-30', completionDate: '', status: 'In Progress', effectivenessVerified: 'No', remarks: 'Monitoring protocol being revised.' },
  { id: 'cp-009', linkedAudit: 'ia-001', department: 'ICU', finding: 'Documentation delay in record-keeping', riskLevel: 'Low', assignedTo: 'Nursing Supervisor', targetDate: '2026-08-01', completionDate: '', status: 'Open', effectivenessVerified: 'No', remarks: 'Digital records system being implemented.' },
  { id: 'cp-010', linkedAudit: 'ia-009', department: 'Pharmacy', finding: 'Temperature log gap of 2 hours', riskLevel: 'Low', assignedTo: 'Pharmacy Dept', targetDate: '2026-07-12', completionDate: '2026-07-11', status: 'Closed', effectivenessVerified: 'Yes', remarks: 'Automated logging system installed.' },
];

const EMPTY_LAUNDRY = {
  id: '', department: '', collectionDate: '', collectionTime: '', collectedBy: '',
  laundryVendor: '', laundryType: 'In-house', soiledLinenQuantity: 0, cleanLinenQuantity: 0,
  washCycle: 'Normal', deliveryDate: '', deliveryTime: '', laundryStatus: 'Pending', remarks: '',
};

const EMPTY_LINEN_INVENTORY = {
  id: '', department: '', linenCategory: '', quantityAvailable: 0,
  minimumStock: 0, lastUpdated: '', inventoryStatus: 'Available', remarks: '',
};

const EMPTY_LINEN_CONDEMNATION = {
  id: '', department: '', linenCategory: '', quantity: 0, reason: 'Damaged',
  condemnationDate: '', approvedBy: '', disposalMethod: 'Incineration', status: 'Pending', remarks: '',
};

const EMPTY_INTERNAL_AUDIT = {
  id: '', auditDate: '', department: '', auditArea: '', auditor: '',
  complianceScore: 0, auditResult: 'Compliant', majorFindings: '', minorFindings: '',
  recommendations: '', nextAuditDate: '', remarks: '',
};

const EMPTY_CAPA = {
  id: '', linkedAudit: '', department: '', finding: '', riskLevel: 'Medium',
  assignedTo: '', targetDate: '', completionDate: '', status: 'Open',
  effectivenessVerified: 'No', remarks: '',
};

const validateInternalAudit = (form) => {
  const errors = {};
  if (!form.auditDate) errors.auditDate = 'Audit Date is required';
  if (!form.department) errors.department = 'Department is required';
  if (!form.auditArea) errors.auditArea = 'Audit Area is required';
  if (!form.auditor.trim()) errors.auditor = 'Auditor is required';
  if (form.complianceScore === '' || isNaN(parseInt(form.complianceScore))) errors.complianceScore = 'Valid Compliance Score is required';
  if (!form.majorFindings.trim()) errors.majorFindings = 'Major Findings is required';
  if (!form.minorFindings.trim()) errors.minorFindings = 'Minor Findings is required';
  if (!form.nextAuditDate) errors.nextAuditDate = 'Next Audit Date is required';
  return errors;
};

const validateCapa = (form) => {
  const errors = {};
  if (!form.linkedAudit) errors.linkedAudit = 'Linked Audit is required';
  if (!form.department) errors.department = 'Department is required';
  if (!form.finding.trim()) errors.finding = 'Finding is required';
  if (!form.riskLevel) errors.riskLevel = 'Risk Level is required';
  if (!form.assignedTo.trim()) errors.assignedTo = 'Assigned To is required';
  if (!form.targetDate) errors.targetDate = 'Target Date is required';
  return errors;
};

const computeAuditResult = (form) => {
  const score = parseInt(form.complianceScore);
  if (isNaN(score)) return form.auditResult;
  if (score < 70) return 'Critical';
  if (score <= 89) return 'Observation';
  return 'Compliant';
};

const computeCapaStatus = (form) => {
  const today = getToday();
  const target = form.targetDate;
  const completion = form.completionDate;
  if (completion) return 'Closed';
  if (target && today > target) return 'Overdue';
  return form.status;
};

const validateLaundry = (form) => {
  const errors = {};
  if (!form.department) errors.department = 'Department is required';
  if (!form.collectionDate) errors.collectionDate = 'Collection Date is required';
  if (!form.collectedBy.trim()) errors.collectedBy = 'Collected By is required';
  if (!form.laundryVendor.trim()) errors.laundryVendor = 'Laundry Vendor is required';
  if (!form.laundryType) errors.laundryType = 'Laundry Type is required';
  if (form.soiledLinenQuantity === '' || isNaN(parseInt(form.soiledLinenQuantity))) errors.soiledLinenQuantity = 'Valid Soiled Linen Quantity is required';
  if (!form.washCycle) errors.washCycle = 'Wash Cycle is required';
  if (!form.deliveryDate) errors.deliveryDate = 'Delivery Date is required';
  return errors;
};

const validateLinenInventory = (form) => {
  const errors = {};
  if (!form.department) errors.department = 'Department is required';
  if (!form.linenCategory) errors.linenCategory = 'Linen Category is required';
  if (form.quantityAvailable === '' || isNaN(parseInt(form.quantityAvailable))) errors.quantityAvailable = 'Valid Quantity Available is required';
  if (form.minimumStock === '' || isNaN(parseInt(form.minimumStock))) errors.minimumStock = 'Valid Minimum Stock is required';
  if (!form.lastUpdated) errors.lastUpdated = 'Last Updated is required';
  return errors;
};

const validateCondemnation = (form) => {
  const errors = {};
  if (!form.department) errors.department = 'Department is required';
  if (!form.linenCategory) errors.linenCategory = 'Linen Category is required';
  if (form.quantity === '' || isNaN(parseInt(form.quantity))) errors.quantity = 'Valid Quantity is required';
  if (!form.reason) errors.reason = 'Reason is required';
  if (!form.condemnationDate) errors.condemnationDate = 'Condemnation Date is required';
  if (!form.approvedBy.trim()) errors.approvedBy = 'Approved By is required';
  if (!form.disposalMethod) errors.disposalMethod = 'Disposal Method is required';
  return errors;
};

const computeLaundryStatus = (form) => {
  const today = getToday();
  if (form.laundryStatus === 'Completed') return 'Completed';
  if (form.deliveryDate && today > form.deliveryDate) return 'Delayed';
  return form.laundryStatus;
};

const computeInventoryStatus = (form) => {
  const qty = parseInt(form.quantityAvailable) || 0;
  if (qty === 0) return 'Out of Stock';
  const min = parseInt(form.minimumStock) || 0;
  if (qty <= min) return 'Low Stock';
  return 'Available';
};

const TextField = ({ label, field, form, setForm, required, placeholder }) => (
  <div>
    <label className="Block text-[9px] font-medium text-slate-600 mb-1">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <input
      type="text"
      value={form[field] || ''}
      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
      placeholder={placeholder || ''}
      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
    />
  </div>
);

const DateField = ({ label, field, form, setForm, required }) => (
  <div>
    <label className="Block text-[9px] font-medium text-slate-600 mb-1">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <input
      type="date"
      value={form[field] || ''}
      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
    />
  </div>
);

const SelectField = ({ label, field, form, setForm, options, required }) => (
  <div>
    <label className="Block text-[9px] font-medium text-slate-600 mb-1">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <select
      value={form[field] || ''}
      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const NumField = ({ label, field, form, setForm }) => (
  <div>
    <label className="Block text-[9px] font-medium text-slate-600 mb-1">{label}</label>
    <input
      type="number"
      value={form[field] || 0}
      onChange={(e) => setForm({ ...form, [field]: parseInt(e.target.value) || 0 })}
      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
    />
  </div>
);

const PlaceholderTab = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[320px] bg-white border border-slate-200 rounded-2xl shadow-sm p-10 text-center">
    <span className="text-3xl mb-4">🚧</span>
    <h2 className="text-base font-extrabold text-slate-800 mb-2">{title}</h2>
    <p className="text-xs text-slate-400 font-medium">This module will be implemented in the next phase.</p>
  </div>
);

const DashboardTab = ({ hospital }) => (
  <div className="space-y-5">
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">General Safety &amp; Compliance Workspace</span>
      <h1 className="text-xl font-extrabold text-slate-900 mt-1">General Safety &amp; Compliance — Dashboard</h1>
      <p className="text-xs text-slate-500 mt-2 max-w-2xl leading-relaxed">
        Centralised hospital safety and compliance management system for tracking facility assets,
        equipment and utilities, fire and electrical safety, biomedical waste handling, support
        services, and internal audits in alignment with NABH and statutory requirements.
      </p>
    </div>
    <div>
      <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">Key Performance Indicators</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpiCards.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{kpi.label}</span>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>
    </div>
    <div>
      <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">Analytics &amp; Trends</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Asset Distribution</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={assetDistributionData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                  {assetDistributionData.map((entry, index) => (<Cell key={`cell-asset-${index}`} fill={COLORS[index % COLORS.length]} />))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '9px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Department-wise Assets</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentAssetsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Bar dataKey="assets" fill={hospital?.themeColor || '#3b82f6'} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Monthly Safety Compliance</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySafetyComplianceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} domain={[80, 100]} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="compliance" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Fire Safety Trend</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fireSafetyTrendData}>
                <defs>
                  <linearGradient id="fireGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} domain={[80, 100]} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="score" stroke="#ef4444" strokeWidth={2.5} fill="url(#fireGrad)" dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Equipment Category Distribution</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={equipmentCategoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                  {equipmentCategoryData.map((entry, index) => (<Cell key={`cell-equip-${index}`} fill={COLORS[index % COLORS.length]} />))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '9px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Compliance Score Trend</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complianceScoreTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} domain={[80, 100]} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Bar dataKey="score" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200">
        <h3 className="text-xs font-bold text-slate-800">Monthly Safety &amp; Compliance Summary</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['Department', 'Assets', 'Compliance %', 'Pending Issues', 'Audits', 'Overall Score', 'Status'].map((h) => (
                <th key={h} className="px-4 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {monthlySummaryData.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-4 py-2 font-semibold text-slate-700">{row.department}</td>
                <td className="px-4 py-2 text-slate-600">{row.assets}</td>
                <td className="px-4 py-2 text-emerald-600 font-bold">{row.compliance}%</td>
                <td className="px-4 py-2 text-amber-600 font-bold">{row.pendingIssues}</td>
                <td className="px-4 py-2 text-violet-600 font-bold">{row.audits}</td>
                <td className="px-4 py-2 text-blue-600 font-bold">{row.overallScore}%</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_SUMMARY[row.status] || STATUS_BADGE_SUMMARY.Good}`}>{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
        <span className="text-[9px] text-slate-400 font-medium">Showing {monthlySummaryData.length} departments</span>
      </div>
    </div>
  </div>
);

const EMPTY_HOSPITAL_FURNITURE = {
  id: '', furnitureName: '', furnitureCategory: '', department: '', location: '',
  manufacturer: '', purchaseDate: '', warrantyExpiry: '', assetCondition: 'Good',
  assetStatus: 'Active', vendor: '', assetTag: '', remarks: '',
};

const EMPTY_GENERAL_FURNITURE = {
  id: '', furnitureName: '', category: '', department: '', location: '', quantity: 1,
  purchaseDate: '', condition: 'Good', status: 'Active', vendor: '', assetTag: '', remarks: '',
};

const EMPTY_IT_EQUIPMENT = {
  id: '', equipmentName: '', equipmentType: '', department: '', location: '',
  serialNumber: '', assetTag: '', purchaseDate: '', warrantyExpiry: '',
  operatingSystem: 'None', assignedTo: '', condition: 'Good', status: 'Active',
  vendor: '', remarks: '',
};

const validateHospitalFurniture = (form) => {
  const errors = {};
  if (!form.furnitureName.trim()) errors.furnitureName = 'Furniture Name is required';
  if (!form.furnitureCategory) errors.furnitureCategory = 'Category is required';
  if (!form.department) errors.department = 'Department is required';
  if (!form.location.trim()) errors.location = 'Location is required';
  if (!form.purchaseDate) errors.purchaseDate = 'Purchase Date is required';
  if (!form.assetCondition) errors.assetCondition = 'Condition is required';
  if (!form.assetStatus) errors.assetStatus = 'Status is required';
  return errors;
};

const validateGeneralFurniture = (form) => {
  const errors = {};
  if (!form.furnitureName.trim()) errors.furnitureName = 'Furniture Name is required';
  if (!form.category) errors.category = 'Category is required';
  if (!form.department) errors.department = 'Department is required';
  if (!form.location.trim()) errors.location = 'Location is required';
  if (!form.purchaseDate) errors.purchaseDate = 'Purchase Date is required';
  if (!form.condition) errors.condition = 'Condition is required';
  if (!form.status) errors.status = 'Status is required';
  return errors;
};

const validateITEquipment = (form) => {
  const errors = {};
  if (!form.equipmentName.trim()) errors.equipmentName = 'Equipment Name is required';
  if (!form.equipmentType) errors.equipmentType = 'Type is required';
  if (!form.department) errors.department = 'Department is required';
  if (!form.location.trim()) errors.location = 'Location is required';
  if (!form.purchaseDate) errors.purchaseDate = 'Purchase Date is required';
  if (!form.condition) errors.condition = 'Condition is required';
  if (!form.status) errors.status = 'Status is required';
  return errors;
};

const Modal = ({ hospital, isOpen, editingRecord, form, setForm, errors, onClose, onSave, title, subtitle, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-extrabold text-slate-800">{title}</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">{subtitle}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>
        <form onSubmit={onSave} className="space-y-5">
          {children}
          {Object.keys(errors).length > 0 && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3">
              <p className="text-[9px] font-bold text-rose-700 mb-1">Please fix the following errors:</p>
              <ul className="list-disc list-inside text-[9px] text-rose-600 space-y-0.5">
                {Object.entries(errors).map(([k, v]) => v ? <li key={k}>{k}: {v}</li> : null)}
              </ul>
            </div>
          )}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
            <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">
              {editingRecord ? 'Save Changes' : 'Add Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const GeneralSafetyComplianceWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();
  const [activeTab, setActiveTab] = useState('dashboard');

  const [hospitalFurniture, setHospitalFurniture] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_HOSPITAL_FURNITURE);
    return saved ? JSON.parse(saved) : SEED_HOSPITAL_FURNITURE;
  });
  const [isHFModalOpen, setIsHFModalOpen] = useState(false);
  const [editingHFId, setEditingHFId] = useState(null);
  const [hfForm, setHFForm] = useState({ ...EMPTY_HOSPITAL_FURNITURE });
  const [hfSearch, setHfSearch] = useState('');
  const [hfFilter, setHfFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem(LS_KEY_HOSPITAL_FURNITURE, JSON.stringify(hospitalFurniture));
  }, [hospitalFurniture]);

  const getNextHFId = () => getNextId(hospitalFurniture, 'hf');

  const handleOpenHFModal = (record = null) => {
    if (record) {
      setHFForm({ ...record });
      setEditingHFId(record.id);
    } else {
      setHFForm({ ...EMPTY_HOSPITAL_FURNITURE, id: getNextHFId() });
      setEditingHFId(null);
    }
    setIsHFModalOpen(true);
  };

  const handleSaveHF = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateHospitalFurniture(hfForm);
    if (Object.keys(errors).length > 0) return;
    if (editingHFId) {
      setHospitalFurniture((prev) => prev.map((r) => (r.id === editingHFId ? { ...hfForm, id: editingHFId } : r)));
    } else {
      setHospitalFurniture((prev) => [...prev, { ...hfForm }]);
    }
    setIsHFModalOpen(false);
    setEditingHFId(null);
  };

  const handleDeleteHF = (id) => {
    if (window.confirm('Delete this hospital furniture record?')) {
      setHospitalFurniture((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const [generalFurniture, setGeneralFurniture] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_GENERAL_FURNITURE);
    return saved ? JSON.parse(saved) : SEED_GENERAL_FURNITURE;
  });
  const [isGFModalOpen, setIsGFModalOpen] = useState(false);
  const [editingGFId, setEditingGFId] = useState(null);
  const [gfForm, setGFForm] = useState({ ...EMPTY_GENERAL_FURNITURE });
  const [gfSearch, setGfSearch] = useState('');
  const [gfFilter, setGfFilter] = useState('All');
  const [gfDeptFilter, setGfDeptFilter] = useState('All');
  const [gfCategoryFilter, setGfCategoryFilter] = useState('All');
  const [gfConditionFilter, setGfConditionFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem(LS_KEY_GENERAL_FURNITURE, JSON.stringify(generalFurniture));
  }, [generalFurniture]);

  const getNextGFId = () => getNextId(generalFurniture, 'gf');

  const handleOpenGFModal = (record = null) => {
    if (record) {
      setGFForm({ ...record });
      setEditingGFId(record.id);
    } else {
      setGFForm({ ...EMPTY_GENERAL_FURNITURE, id: getNextGFId() });
      setEditingGFId(null);
    }
    setIsGFModalOpen(true);
  };

  const handleSaveGF = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateGeneralFurniture(gfForm);
    if (Object.keys(errors).length > 0) return;
    if (editingGFId) {
      setGeneralFurniture((prev) => prev.map((r) => (r.id === editingGFId ? { ...gfForm, id: editingGFId } : r)));
    } else {
      setGeneralFurniture((prev) => [...prev, { ...gfForm }]);
    }
    setIsGFModalOpen(false);
    setEditingGFId(null);
  };

  const handleDeleteGF = (id) => {
    if (window.confirm('Delete this general furniture record?')) {
      setGeneralFurniture((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const [itEquipment, setItEquipment] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_IT_EQUIPMENT);
    return saved ? JSON.parse(saved) : SEED_IT_EQUIPMENT;
  });
  const [isIEModalOpen, setIsIEModalOpen] = useState(false);
  const [editingIEId, setEditingIEId] = useState(null);
  const [ieForm, setIEForm] = useState({ ...EMPTY_IT_EQUIPMENT });
  const [ieSearch, setIeSearch] = useState('');
  const [ieFilter, setIeFilter] = useState('All');
  const [ieDeptFilter, setIeDeptFilter] = useState('All');
  const [ieTypeFilter, setIeTypeFilter] = useState('All');
  const [ieConditionFilter, setIeConditionFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem(LS_KEY_IT_EQUIPMENT, JSON.stringify(itEquipment));
  }, [itEquipment]);

  const getNextIEId = () => getNextId(itEquipment, 'ie');

  const handleOpenIEModal = (record = null) => {
    if (record) {
      setIEForm({ ...record });
      setEditingIEId(record.id);
    } else {
      setIEForm({ ...EMPTY_IT_EQUIPMENT, id: getNextIEId() });
      setEditingIEId(null);
    }
    setIsIEModalOpen(true);
  };

  const handleSaveIE = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateITEquipment(ieForm);
    if (Object.keys(errors).length > 0) return;
    if (editingIEId) {
      setItEquipment((prev) => prev.map((r) => (r.id === editingIEId ? { ...ieForm, id: editingIEId } : r)));
    } else {
      setItEquipment((prev) => [...prev, { ...ieForm }]);
    }
    setIsIEModalOpen(false);
    setEditingIEId(null);
  };

  const handleDeleteIE = (id) => {
    if (window.confirm('Delete this IT equipment record?')) {
      setItEquipment((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // ===== PHASE 3: EQUIPMENT & UTILITIES =====
  const [machinery, setMachinery] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_HOSPITAL_MACHINERY);
    return saved ? JSON.parse(saved) : SEED_HOSPITAL_MACHINERY;
  });
  const [isMachineryModalOpen, setIsMachineryModalOpen] = useState(false);
  const [editingMachineryId, setEditingMachineryId] = useState(null);
  const [machineryForm, setMachineryForm] = useState({ ...EMPTY_MACHINERY });
  const [machinerySearch, setMachinerySearch] = useState('');
  const [machineryDeptFilter, setMachineryDeptFilter] = useState('All');
  const [machineryCatFilter, setMachineryCatFilter] = useState('All');
  const [machineryStatusFilter, setMachineryStatusFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem(LS_KEY_HOSPITAL_MACHINERY, JSON.stringify(machinery));
  }, [machinery]);

  const getNextMachineryId = () => getNextId(machinery, 'hm');

  const handleOpenMachineryModal = (record = null) => {
    if (record) {
      setMachineryForm({ ...record });
      setEditingMachineryId(record.id);
    } else {
      setMachineryForm({ ...EMPTY_MACHINERY, id: getNextMachineryId() });
      setEditingMachineryId(null);
    }
    setIsMachineryModalOpen(true);
  };

  const handleSaveMachinery = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateMachinery(machineryForm);
    if (Object.keys(errors).length > 0) return;
    const finalForm = { ...machineryForm, equipmentStatus: computeMachineStatus(machineryForm) };
    if (editingMachineryId) {
      setMachinery((prev) => prev.map((r) => (r.id === editingMachineryId ? { ...finalForm, id: editingMachineryId } : r)));
    } else {
      setMachinery((prev) => [...prev, { ...finalForm }]);
    }
    setIsMachineryModalOpen(false);
    setEditingMachineryId(null);
  };

  const handleDeleteMachinery = (id) => {
    if (window.confirm('Delete this hospital machinery record?')) {
      setMachinery((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const [gas, setGas] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_GAS_PIPELINE);
    return saved ? JSON.parse(saved) : SEED_GAS_PIPELINE;
  });
  const [isGasModalOpen, setIsGasModalOpen] = useState(false);
  const [editingGasId, setEditingGasId] = useState(null);
  const [gasForm, setGasForm] = useState({ ...EMPTY_GAS });
  const [gasSearch, setGasSearch] = useState('');
  const [gasTypeFilter, setGasTypeFilter] = useState('All');
  const [gasComplianceFilter, setGasComplianceFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem(LS_KEY_GAS_PIPELINE, JSON.stringify(gas));
  }, [gas]);

  const getNextGasId = () => getNextId(gas, 'gp');

  const handleOpenGasModal = (record = null) => {
    if (record) {
      setGasForm({ ...record });
      setEditingGasId(record.id);
    } else {
      setGasForm({ ...EMPTY_GAS, id: getNextGasId() });
      setEditingGasId(null);
    }
    setIsGasModalOpen(true);
  };

  const handleSaveGas = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateGas(gasForm);
    if (Object.keys(errors).length > 0) return;
    const finalForm = { ...gasForm, complianceStatus: computeGasCompliance(gasForm) };
    if (editingGasId) {
      setGas((prev) => prev.map((r) => (r.id === editingGasId ? { ...finalForm, id: editingGasId } : r)));
    } else {
      setGas((prev) => [...prev, { ...finalForm }]);
    }
    setIsGasModalOpen(false);
    setEditingGasId(null);
  };

  const handleDeleteGas = (id) => {
    if (window.confirm('Delete this gas pipeline record?')) {
      setGas((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const [stp, setStp] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_STP_ETP);
    return saved ? JSON.parse(saved) : SEED_STP_ETP;
  });
  const [isStpModalOpen, setIsStpModalOpen] = useState(false);
  const [editingStpId, setEditingStpId] = useState(null);
  const [stpForm, setStpForm] = useState({ ...EMPTY_STP });
  const [stpSearch, setStpSearch] = useState('');
  const [stpPlantFilter, setStpPlantFilter] = useState('All');
  const [stpComplianceFilter, setStpComplianceFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem(LS_KEY_STP_ETP, JSON.stringify(stp));
  }, [stp]);

  const getNextStpId = () => getNextId(stp, 'st');

  const handleOpenStpModal = (record = null) => {
    if (record) {
      setStpForm({ ...record });
      setEditingStpId(record.id);
    } else {
      setStpForm({ ...EMPTY_STP, id: getNextStpId() });
      setEditingStpId(null);
    }
    setIsStpModalOpen(true);
  };

  const handleSaveStp = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateStp(stpForm);
    if (Object.keys(errors).length > 0) return;
    const finalForm = { ...stpForm, complianceStatus: computeStpCompliance(stpForm) };
    if (editingStpId) {
      setStp((prev) => prev.map((r) => (r.id === editingStpId ? { ...finalForm, id: editingStpId } : r)));
    } else {
      setStp((prev) => [...prev, { ...finalForm }]);
    }
    setIsStpModalOpen(false);
    setEditingStpId(null);
  };

  const handleDeleteStp = (id) => {
    if (window.confirm('Delete this STP/ETP record?')) {
      setStp((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // ===== PHASE 4: SAFETY COMPLIANCE =====
  const [electrical, setElectrical] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_ELECTRICAL_SAFETY);
    return saved ? JSON.parse(saved) : SEED_ELECTRICAL_SAFETY;
  });
  const [isElectricalModalOpen, setIsElectricalModalOpen] = useState(false);
  const [editingElectricalId, setEditingElectricalId] = useState(null);
  const [electricalForm, setElectricalForm] = useState({ ...EMPTY_ELECTRICAL });
  const [electricalErrors, setElectricalErrors] = useState({});
  const [electricalSearch, setElectricalSearch] = useState('');
  const [electricalDeptFilter, setElectricalDeptFilter] = useState('All');
  const [electricalResultFilter, setElectricalResultFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem(LS_KEY_ELECTRICAL_SAFETY, JSON.stringify(electrical));
  }, [electrical]);

  const getNextElectricalId = () => getNextId(electrical, 'es');

  const handleOpenElectricalModal = (record = null) => {
    setElectricalErrors({});
    if (record) {
      setElectricalForm({ ...record });
      setEditingElectricalId(record.id);
    } else {
      setElectricalForm({ ...EMPTY_ELECTRICAL, id: getNextElectricalId() });
      setEditingElectricalId(null);
    }
    setIsElectricalModalOpen(true);
  };

  const handleSaveElectrical = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateElectrical(electricalForm);
    if (Object.keys(errors).length > 0) {
      setElectricalErrors(errors);
      return;
    }
    const finalForm = { ...electricalForm, inspectionResult: computeElectricalResult(electricalForm) };
    if (editingElectricalId) {
      setElectrical((prev) => prev.map((r) => (r.id === editingElectricalId ? { ...finalForm, id: editingElectricalId } : r)));
    } else {
      setElectrical((prev) => [...prev, { ...finalForm }]);
    }
    setIsElectricalModalOpen(false);
    setEditingElectricalId(null);
  };

  const handleDeleteElectrical = (id) => {
    if (window.confirm('Delete this electrical safety record?')) {
      setElectrical((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const [fire, setFire] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_FIRE_SAFETY);
    return saved ? JSON.parse(saved) : SEED_FIRE_SAFETY;
  });
  const [isFireModalOpen, setIsFireModalOpen] = useState(false);
  const [editingFireId, setEditingFireId] = useState(null);
  const [fireForm, setFireForm] = useState({ ...EMPTY_FIRE });
  const [fireErrors, setFireErrors] = useState({});
  const [fireSearch, setFireSearch] = useState('');
  const [fireDeptFilter, setFireDeptFilter] = useState('All');
  const [fireTypeFilter, setFireTypeFilter] = useState('All');
  const [fireComplianceFilter, setFireComplianceFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem(LS_KEY_FIRE_SAFETY, JSON.stringify(fire));
  }, [fire]);

  const getNextFireId = () => getNextId(fire, 'fs');

  const handleOpenFireModal = (record = null) => {
    setFireErrors({});
    if (record) {
      setFireForm({ ...record });
      setEditingFireId(record.id);
    } else {
      setFireForm({ ...EMPTY_FIRE, id: getNextFireId() });
      setEditingFireId(null);
    }
    setIsFireModalOpen(true);
  };

  const handleSaveFire = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateFire(fireForm);
    if (Object.keys(errors).length > 0) {
      setFireErrors(errors);
      return;
    }
    const finalForm = { ...fireForm, complianceStatus: computeFireCompliance(fireForm) };
    if (editingFireId) {
      setFire((prev) => prev.map((r) => (r.id === editingFireId ? { ...finalForm, id: editingFireId } : r)));
    } else {
      setFire((prev) => [...prev, { ...finalForm }]);
    }
    setIsFireModalOpen(false);
    setEditingFireId(null);
  };

  const handleDeleteFire = (id) => {
    if (window.confirm('Delete this fire safety record?')) {
      setFire((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const [biomedical, setBiomedical] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_BIOMEDICAL_WASTE);
    return saved ? JSON.parse(saved) : SEED_BIOMEDICAL_WASTE;
  });
  const [isBiomedicalModalOpen, setIsBiomedicalModalOpen] = useState(false);
  const [editingBiomedicalId, setEditingBiomedicalId] = useState(null);
  const [biomedicalForm, setBiomedicalForm] = useState({ ...EMPTY_BIOMEDICAL });
  const [biomedicalErrors, setBiomedicalErrors] = useState({});
  const [biomedicalSearch, setBiomedicalSearch] = useState('');
  const [biomedicalDeptFilter, setBiomedicalDeptFilter] = useState('All');
  const [biomedicalCategoryFilter, setBiomedicalCategoryFilter] = useState('All');
  const [biomedicalComplianceFilter, setBiomedicalComplianceFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem(LS_KEY_BIOMEDICAL_WASTE, JSON.stringify(biomedical));
  }, [biomedical]);

  const getNextBiomedicalId = () => getNextId(biomedical, 'bw');

  const handleOpenBiomedicalModal = (record = null) => {
    setBiomedicalErrors({});
    if (record) {
      setBiomedicalForm({ ...record });
      setEditingBiomedicalId(record.id);
    } else {
      setBiomedicalForm({ ...EMPTY_BIOMEDICAL, id: getNextBiomedicalId() });
      setEditingBiomedicalId(null);
    }
    setIsBiomedicalModalOpen(true);
  };

  const handleSaveBiomedical = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateBiomedical(biomedicalForm);
    if (Object.keys(errors).length > 0) {
      setBiomedicalErrors(errors);
      return;
    }
    const finalForm = { ...biomedicalForm, complianceStatus: computeBiomedicalCompliance(biomedicalForm) };
    if (editingBiomedicalId) {
      setBiomedical((prev) => prev.map((r) => (r.id === editingBiomedicalId ? { ...finalForm, id: editingBiomedicalId } : r)));
    } else {
      setBiomedical((prev) => [...prev, { ...finalForm }]);
    }
    setIsBiomedicalModalOpen(false);
    setEditingBiomedicalId(null);
  };

  const handleDeleteBiomedical = (id) => {
    if (window.confirm('Delete this biomedical waste record?')) {
      setBiomedical((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // ===== PHASE 5: SUPPORT SERVICES =====
  const [laundry, setLaundry] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_LAUNDRY);
    return saved ? JSON.parse(saved) : SEED_LAUNDRY;
  });
  const [isLaundryModalOpen, setIsLaundryModalOpen] = useState(false);
  const [editingLaundryId, setEditingLaundryId] = useState(null);
  const [laundryForm, setLaundryForm] = useState({ ...EMPTY_LAUNDRY });
  const [laundryErrors, setLaundryErrors] = useState({});
  const [laundrySearch, setLaundrySearch] = useState('');
  const [laundryDeptFilter, setLaundryDeptFilter] = useState('All');
  const [laundryStatusFilter, setLaundryStatusFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem(LS_KEY_LAUNDRY, JSON.stringify(laundry));
  }, [laundry]);

  const getNextLaundryId = () => getNextId(laundry, 'lm');

  const handleOpenLaundryModal = (record = null) => {
    setLaundryErrors({});
    if (record) {
      setLaundryForm({ ...record });
      setEditingLaundryId(record.id);
    } else {
      setLaundryForm({ ...EMPTY_LAUNDRY, id: getNextLaundryId() });
      setEditingLaundryId(null);
    }
    setIsLaundryModalOpen(true);
  };

  const handleSaveLaundry = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateLaundry(laundryForm);
    if (Object.keys(errors).length > 0) {
      setLaundryErrors(errors);
      return;
    }
    const finalForm = { ...laundryForm, laundryStatus: computeLaundryStatus(laundryForm) };
    if (editingLaundryId) {
      setLaundry((prev) => prev.map((r) => (r.id === editingLaundryId ? { ...finalForm, id: editingLaundryId } : r)));
    } else {
      setLaundry((prev) => [...prev, { ...finalForm }]);
    }
    setIsLaundryModalOpen(false);
    setEditingLaundryId(null);
  };

  const handleDeleteLaundry = (id) => {
    if (window.confirm('Delete this laundry record?')) {
      setLaundry((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const [linenInventory, setLinenInventory] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_LINEN_INVENTORY);
    return saved ? JSON.parse(saved) : SEED_LINEN_INVENTORY;
  });
  const [isLinenModalOpen, setIsLinenModalOpen] = useState(false);
  const [editingLinenId, setEditingLinenId] = useState(null);
  const [linenForm, setLinenForm] = useState({ ...EMPTY_LINEN_INVENTORY });
  const [linenErrors, setLinenErrors] = useState({});
  const [linenSearch, setLinenSearch] = useState('');
  const [linenDeptFilter, setLinenDeptFilter] = useState('All');
  const [linenCatFilter, setLinenCatFilter] = useState('All');
  const [linenStatusFilter, setLinenStatusFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem(LS_KEY_LINEN_INVENTORY, JSON.stringify(linenInventory));
  }, [linenInventory]);

  const getNextLinenId = () => getNextId(linenInventory, 'li');

  const handleOpenLinenModal = (record = null) => {
    setLinenErrors({});
    if (record) {
      setLinenForm({ ...record });
      setEditingLinenId(record.id);
    } else {
      setLinenForm({ ...EMPTY_LINEN_INVENTORY, id: getNextLinenId() });
      setEditingLinenId(null);
    }
    setIsLinenModalOpen(true);
  };

  const handleSaveLinen = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateLinenInventory(linenForm);
    if (Object.keys(errors).length > 0) {
      setLinenErrors(errors);
      return;
    }
    const finalForm = { ...linenForm, inventoryStatus: computeInventoryStatus(linenForm) };
    if (editingLinenId) {
      setLinenInventory((prev) => prev.map((r) => (r.id === editingLinenId ? { ...finalForm, id: editingLinenId } : r)));
    } else {
      setLinenInventory((prev) => [...prev, { ...finalForm }]);
    }
    setIsLinenModalOpen(false);
    setEditingLinenId(null);
  };

  const handleDeleteLinen = (id) => {
    if (window.confirm('Delete this linen inventory record?')) {
      setLinenInventory((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const [condemnation, setCondemnation] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_LINEN_CONDEMNATION);
    return saved ? JSON.parse(saved) : SEED_LINEN_CONDEMNATION;
  });
  const [isCondemnModalOpen, setIsCondemnModalOpen] = useState(false);
  const [editingCondemnId, setEditingCondemnId] = useState(null);
  const [condemnForm, setCondemnForm] = useState({ ...EMPTY_LINEN_CONDEMNATION });
  const [condemnErrors, setCondemnErrors] = useState({});
  const [condemnSearch, setCondemnSearch] = useState('');
  const [condemnDeptFilter, setCondemnDeptFilter] = useState('All');
  const [condemnCatFilter, setCondemnCatFilter] = useState('All');
  const [condemnStatusFilter, setCondemnStatusFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem(LS_KEY_LINEN_CONDEMNATION, JSON.stringify(condemnation));
  }, [condemnation]);

  const getNextCondemnId = () => getNextId(condemnation, 'lc');

  const handleOpenCondemnModal = (record = null) => {
    setCondemnErrors({});
    if (record) {
      setCondemnForm({ ...record });
      setEditingCondemnId(record.id);
    } else {
      setCondemnForm({ ...EMPTY_LINEN_CONDEMNATION, id: getNextCondemnId() });
      setEditingCondemnId(null);
    }
    setIsCondemnModalOpen(true);
  };

  const handleSaveCondemn = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateCondemnation(condemnForm);
    if (Object.keys(errors).length > 0) {
      setCondemnErrors(errors);
      return;
    }
    const finalForm = { ...condemnForm };
    if (editingCondemnId) {
      setCondemnation((prev) => prev.map((r) => (r.id === editingCondemnId ? { ...finalForm, id: editingCondemnId } : r)));
    } else {
      setCondemnation((prev) => [...prev, { ...finalForm }]);
    }
    setIsCondemnModalOpen(false);
    setEditingCondemnId(null);
  };

  const handleDeleteCondemn = (id) => {
    if (window.confirm('Delete this linen condemnation record?')) {
      setCondemnation((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // ===== PHASE 6: INTERNAL AUDIT =====
  const [internalAudits, setInternalAudits] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_INTERNAL_AUDIT);
    return saved ? JSON.parse(saved) : SEED_INTERNAL_AUDIT;
  });
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [editingAuditId, setEditingAuditId] = useState(null);
  const [auditForm, setAuditForm] = useState({ ...EMPTY_INTERNAL_AUDIT });
  const [auditErrors, setAuditErrors] = useState({});
  const [auditSearch, setAuditSearch] = useState('');
  const [auditDeptFilter, setAuditDeptFilter] = useState('All');
  const [auditResultFilter, setAuditResultFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem(LS_KEY_INTERNAL_AUDIT, JSON.stringify(internalAudits));
  }, [internalAudits]);

  const getNextAuditId = () => getNextId(internalAudits, 'ia');

  const handleOpenAuditModal = (record = null) => {
    setAuditErrors({});
    if (record) {
      setAuditForm({ ...record });
      setEditingAuditId(record.id);
    } else {
      setAuditForm({ ...EMPTY_INTERNAL_AUDIT, id: getNextAuditId() });
      setEditingAuditId(null);
    }
    setIsAuditModalOpen(true);
  };

  const handleSaveAudit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateInternalAudit(auditForm);
    if (Object.keys(errors).length > 0) {
      setAuditErrors(errors);
      return;
    }
    const finalForm = { ...auditForm, auditResult: computeAuditResult(auditForm) };
    if (editingAuditId) {
      setInternalAudits((prev) => prev.map((r) => (r.id === editingAuditId ? { ...finalForm, id: editingAuditId } : r)));
    } else {
      setInternalAudits((prev) => [...prev, { ...finalForm }]);
    }
    setIsAuditModalOpen(false);
    setEditingAuditId(null);
  };

  const handleDeleteAudit = (id) => {
    if (window.confirm('Delete this internal audit record?')) {
      setInternalAudits((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const [capa, setCapa] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_CAPA_TRACKER);
    return saved ? JSON.parse(saved) : SEED_CAPA_TRACKER;
  });
  const [isCapaModalOpen, setIsCapaModalOpen] = useState(false);
  const [editingCapaId, setEditingCapaId] = useState(null);
  const [capaForm, setCapaForm] = useState({ ...EMPTY_CAPA });
  const [capaErrors, setCapaErrors] = useState({});
  const [capaSearch, setCapaSearch] = useState('');
  const [capaDeptFilter, setCapaDeptFilter] = useState('All');
  const [capaRiskFilter, setCapaRiskFilter] = useState('All');
  const [capaStatusFilter, setCapaStatusFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem(LS_KEY_CAPA_TRACKER, JSON.stringify(capa));
  }, [capa]);

  const getNextCapaId = () => getNextId(capa, 'cp');

  const handleOpenCapaModal = (record = null) => {
    setCapaErrors({});
    if (record) {
      setCapaForm({ ...record });
      setEditingCapaId(record.id);
    } else {
      setCapaForm({ ...EMPTY_CAPA, id: getNextCapaId() });
      setEditingCapaId(null);
    }
    setIsCapaModalOpen(true);
  };

  const handleSaveCapa = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateCapa(capaForm);
    if (Object.keys(errors).length > 0) {
      setCapaErrors(errors);
      return;
    }
    const finalForm = { ...capaForm, status: computeCapaStatus(capaForm) };
    if (editingCapaId) {
      setCapa((prev) => prev.map((r) => (r.id === editingCapaId ? { ...finalForm, id: editingCapaId } : r)));
    } else {
      setCapa((prev) => [...prev, { ...finalForm }]);
    }
    setIsCapaModalOpen(false);
    setEditingCapaId(null);
  };

  const handleDeleteCapa = (id) => {
    if (window.confirm('Delete this CAPA record?')) {
      setCapa((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const filterRecords = (records, search, filter) => {
    let result = records;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((r) =>
        Object.values(r).some((v) => String(v).toLowerCase().includes(q))
      );
    }
    if (filter !== 'All') {
      result = result.filter((r) => r.assetStatus === filter || r.status === filter || r.condition === filter);
    }
    return result;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab hospital={hospital} />;
      case 'facility_assets': {
        const filteredGeneralFurniture = generalFurniture.filter((r) => {
          const q = gfSearch.toLowerCase();
          const matchesSearch = gfSearch ? Object.values(r).some((v) => String(v || '').toLowerCase().includes(q)) : true;
          const matchesDept = gfDeptFilter === 'All' || r.department === gfDeptFilter;
          const matchesCat = gfCategoryFilter === 'All' || r.category === gfCategoryFilter;
          const matchesCond = gfConditionFilter === 'All' || r.condition === gfConditionFilter;
          const matchesStatus = gfFilter === 'All' || r.status === gfFilter;
          return matchesSearch && matchesDept && matchesCat && matchesCond && matchesStatus;
        });
        const filteredItEquipment = itEquipment.filter((r) => {
          const q = ieSearch.toLowerCase();
          const matchesSearch = ieSearch ? Object.values(r).some((v) => String(v).toLowerCase().includes(q)) : true;
          const matchesDept = ieDeptFilter === 'All' || r.department === ieDeptFilter;
          const matchesType = ieTypeFilter === 'All' || r.equipmentType === ieTypeFilter;
          const matchesCond = ieConditionFilter === 'All' || r.condition === ieConditionFilter;
          const matchesStatus = ieFilter === 'All' || r.status === ieFilter;
          return matchesSearch && matchesDept && matchesType && matchesCond && matchesStatus;
        });
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold text-slate-800">Facility Assets</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Hospital furniture, general furniture, and IT equipment</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Total Assets', value: hospitalFurniture.length + generalFurniture.length + itEquipment.length, color: 'text-blue-600' },
                { label: 'Hospital Furniture', value: hospitalFurniture.length, color: 'text-emerald-600' },
                { label: 'General Furniture', value: generalFurniture.length, color: 'text-amber-600' },
                { label: 'IT Equipment', value: itEquipment.length, color: 'text-violet-600' },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                  <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Hospital Furniture</h4>
                  <button onClick={() => handleOpenHFModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1 hover:brightness-95 transition-all shadow-sm cursor-pointer">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="p-3">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search hospital furniture..." value={hfSearch} onChange={(e) => setHfSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <div className="mb-3">
                    <select value={hfFilter} onChange={(e) => setHfFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Statuses</option>
                      {ASSET_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['ID', 'Name', 'Category', 'Department', 'Location', 'Condition', 'Status', 'Actions'].map((h) => (
                          <th key={h} className="px-3 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filterRecords(hospitalFurniture, hfSearch, hfFilter).map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-2 font-mono text-[9px] text-slate-500">{r.id}</td>
                          <td className="px-3 py-2 font-semibold text-slate-700">{r.furnitureName}</td>
                          <td className="px-3 py-2 text-slate-600">{r.furnitureCategory}</td>
                          <td className="px-3 py-2 text-slate-600">{r.department}</td>
                          <td className="px-3 py-2 text-slate-600">{r.location}</td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${CONDITION_BADGE[r.assetCondition] || CONDITION_BADGE.Good}`}>{r.assetCondition}</span></td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_ASSET[r.assetStatus] || STATUS_BADGE_ASSET.Active}`}>{r.assetStatus}</span></td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenHFModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeleteHF(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filterRecords(hospitalFurniture, hfSearch, hfFilter).length === 0 && (
                        <tr><td colSpan={8} className="px-3 py-10 text-center text-[10px] text-slate-400">No hospital furniture records found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                  <span className="text-[9px] text-slate-400 font-medium">Showing {filterRecords(hospitalFurniture, hfSearch, hfFilter).length} of {hospitalFurniture.length} records</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">General Furniture</h4>
                  <button onClick={() => handleOpenGFModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1 hover:brightness-95 transition-all shadow-sm cursor-pointer">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="p-3">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search general furniture..." value={gfSearch} onChange={(e) => setGfSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                    <select value={gfDeptFilter} onChange={(e) => setGfDeptFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Departments</option>
                      {HOSPITAL_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <select value={gfCategoryFilter} onChange={(e) => setGfCategoryFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Categories</option>
                      {GENERAL_FURNITURE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select value={gfConditionFilter} onChange={(e) => setGfConditionFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Conditions</option>
                      {ASSET_CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select value={gfFilter} onChange={(e) => setGfFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Statuses</option>
                      {ASSET_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['ID', 'Name', 'Category', 'Department', 'Location', 'Qty', 'Condition', 'Status', 'Actions'].map((h) => (
                          <th key={h} className="px-3 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredGeneralFurniture.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-2 font-mono text-[9px] text-slate-500">{r.id}</td>
                          <td className="px-3 py-2 font-semibold text-slate-700">{r.furnitureName}</td>
                          <td className="px-3 py-2 text-slate-600">{r.category}</td>
                          <td className="px-3 py-2 text-slate-600">{r.department}</td>
                          <td className="px-3 py-2 text-slate-600">{r.location}</td>
                          <td className="px-3 py-2 text-slate-600">{r.quantity}</td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${CONDITION_BADGE[r.condition] || CONDITION_BADGE.Good}`}>{r.condition}</span></td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_ASSET[r.status] || STATUS_BADGE_ASSET.Active}`}>{r.status}</span></td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenGFModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeleteGF(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredGeneralFurniture.length === 0 && (
                        <tr><td colSpan={9} className="px-3 py-10 text-center text-[10px] text-slate-400">No general furniture records found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                  <span className="text-[9px] text-slate-400 font-medium">Showing {filteredGeneralFurniture.length} of {generalFurniture.length} records</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">IT Equipment</h4>
                  <button onClick={() => handleOpenIEModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1 hover:brightness-95 transition-all shadow-sm cursor-pointer">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="p-3">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search IT equipment..." value={ieSearch} onChange={(e) => setIeSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                    <select value={ieDeptFilter} onChange={(e) => setIeDeptFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Departments</option>
                      {HOSPITAL_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <select value={ieTypeFilter} onChange={(e) => setIeTypeFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Types</option>
                      {IT_EQUIPMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <select value={ieConditionFilter} onChange={(e) => setIeConditionFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Conditions</option>
                      {ASSET_CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select value={ieFilter} onChange={(e) => setIeFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Statuses</option>
                      {ASSET_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['ID', 'Name', 'Type', 'Department', 'Location', 'Condition', 'Status', 'Actions'].map((h) => (
                          <th key={h} className="px-3 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredItEquipment.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-2 font-mono text-[9px] text-slate-500">{r.id}</td>
                          <td className="px-3 py-2 font-semibold text-slate-700">{r.equipmentName}</td>
                          <td className="px-3 py-2 text-slate-600">{r.equipmentType}</td>
                          <td className="px-3 py-2 text-slate-600">{r.department}</td>
                          <td className="px-3 py-2 text-slate-600">{r.location}</td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${CONDITION_BADGE[r.condition] || CONDITION_BADGE.Good}`}>{r.condition}</span></td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_ASSET[r.status] || STATUS_BADGE_ASSET.Active}`}>{r.status}</span></td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenIEModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeleteIE(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredItEquipment.length === 0 && (
                        <tr><td colSpan={8} className="px-3 py-10 text-center text-[10px] text-slate-400">No IT equipment records found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                  <span className="text-[9px] text-slate-400 font-medium">Showing {filteredItEquipment.length} of {itEquipment.length} records</span>
                </div>
              </div>
            </div>
          </div>
        );
      }
      case 'equip_utilities': {
        const today = getToday();
        const activeMachinery = machinery.filter((r) => r.equipmentStatus === 'Active').length;
        const maintenanceMachinery = machinery.filter((r) => r.equipmentStatus === 'Under Maintenance').length;
        const gasCompliant = gas.filter((r) => r.complianceStatus === 'Compliant').length;
        const gasCompliancePct = gas.length ? Math.round((gasCompliant / gas.length) * 100) : 0;
        const stpCompliant = stp.filter((r) => r.complianceStatus === 'Compliant').length;
        const stpCompliancePct = stp.length ? Math.round((stpCompliant / stp.length) * 100) : 0;
        const operationalGas = gas.filter((r) => r.pipelineStatus === 'Operational').length;
        const operationalStp = stp.filter((r) => ['Excellent', 'Good', 'Acceptable'].includes(r.waterQuality)).length;
        const utilityOperational = operationalGas + operationalStp;
        const pendingMaintenance = machinery.filter((r) => r.nextPreventiveMaintenance && r.nextPreventiveMaintenance < today).length;
        const overallCompliancePct = (gas.length + stp.length) ? Math.round(((gasCompliant + stpCompliant) / (gas.length + stp.length)) * 100) : 0;

        const equipmentKpis = [
          { label: 'Total Equipment', value: machinery.length, color: 'text-blue-600' },
          { label: 'Active Machinery', value: activeMachinery, color: 'text-emerald-600' },
          { label: 'Equipment Under Maintenance', value: maintenanceMachinery, color: 'text-amber-600' },
          { label: 'Gas Pipeline Compliance %', value: `${gasCompliancePct}%`, color: 'text-teal-600' },
          { label: 'STP Compliance %', value: `${stpCompliancePct}%`, color: 'text-violet-600' },
          { label: 'Utility Systems Operational', value: utilityOperational, color: 'text-sky-600' },
          { label: 'Pending Maintenance', value: pendingMaintenance, color: 'text-orange-600' },
          { label: 'Overall Utility Compliance %', value: `${overallCompliancePct}%`, color: 'text-rose-600' },
        ];

        const filteredMachinery = machinery.filter((r) => {
          const q = machinerySearch.toLowerCase();
          const matchesSearch = machinerySearch
            ? [r.equipmentName, r.department, r.assetTag].some((v) => String(v || '').toLowerCase().includes(q))
            : true;
          const matchesDept = machineryDeptFilter === 'All' || r.department === machineryDeptFilter;
          const matchesCat = machineryCatFilter === 'All' || r.equipmentCategory === machineryCatFilter;
          const matchesStatus = machineryStatusFilter === 'All' || r.equipmentStatus === machineryStatusFilter;
          return matchesSearch && matchesDept && matchesCat && matchesStatus;
        });

        const filteredGas = gas.filter((r) => {
          const q = gasSearch.toLowerCase();
          const matchesSearch = gasSearch ? String(r.engineer || '').toLowerCase().includes(q) : true;
          const matchesType = gasTypeFilter === 'All' || r.gasType === gasTypeFilter;
          const matchesCompliance = gasComplianceFilter === 'All' || r.complianceStatus === gasComplianceFilter;
          return matchesSearch && matchesType && matchesCompliance;
        });

        const filteredStp = stp.filter((r) => {
          const q = stpSearch.toLowerCase();
          const matchesSearch = stpSearch ? String(r.operator || '').toLowerCase().includes(q) : true;
          const matchesPlant = stpPlantFilter === 'All' || r.plantType === stpPlantFilter;
          const matchesCompliance = stpComplianceFilter === 'All' || r.complianceStatus === stpComplianceFilter;
          return matchesSearch && matchesPlant && matchesCompliance;
        });

        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold text-slate-800">Equipment &amp; Utilities</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Hospital machinery, medical gas plant, and STP/ETP monitoring</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {equipmentKpis.map((kpi) => (
                <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{kpi.label}</span>
                  <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Hospital Machinery */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Hospital Machinery</h4>
                  <button onClick={() => handleOpenMachineryModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1 hover:brightness-95 transition-all shadow-sm cursor-pointer">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="p-3">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search by Equipment Name, Department or Asset Tag..." value={machinerySearch} onChange={(e) => setMachinerySearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                    <select value={machineryDeptFilter} onChange={(e) => setMachineryDeptFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Departments</option>
                      {HOSPITAL_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <select value={machineryCatFilter} onChange={(e) => setMachineryCatFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Categories</option>
                      {MACHINE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select value={machineryStatusFilter} onChange={(e) => setMachineryStatusFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Statuses</option>
                      {MACHINE_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['Asset ID', 'Equipment Name', 'Category', 'Department', 'Condition', 'Status', 'Next PM', 'Actions'].map((h) => (
                          <th key={h} className="px-3 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredMachinery.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-2 font-mono text-[9px] text-slate-500">{r.id}</td>
                          <td className="px-3 py-2 font-semibold text-slate-700">{r.equipmentName}</td>
                          <td className="px-3 py-2 text-slate-600">{r.equipmentCategory}</td>
                          <td className="px-3 py-2 text-slate-600">{r.department}</td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${CONDITION_BADGE[r.equipmentCondition] || CONDITION_BADGE.Good}`}>{r.equipmentCondition}</span></td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_MACHINE[r.equipmentStatus] || STATUS_BADGE_MACHINE.Active}`}>{r.equipmentStatus}</span></td>
                          <td className="px-3 py-2 text-slate-600">{r.nextPreventiveMaintenance || '—'}</td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenMachineryModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeleteMachinery(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredMachinery.length === 0 && (
                        <tr><td colSpan={8} className="px-3 py-10 text-center text-[10px] text-slate-400">No hospital machinery records found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                  <span className="text-[9px] text-slate-400 font-medium">Showing {filteredMachinery.length} of {machinery.length} records</span>
                </div>
              </div>

              {/* Gas Pipeline / Medical Gas Plant */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Gas Pipeline / Medical Gas Plant</h4>
                  <button onClick={() => handleOpenGasModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1 hover:brightness-95 transition-all shadow-sm cursor-pointer">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="p-3">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search by Engineer..." value={gasSearch} onChange={(e) => setGasSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <select value={gasTypeFilter} onChange={(e) => setGasTypeFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Gas Types</option>
                      {GAS_TYPES.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <select value={gasComplianceFilter} onChange={(e) => setGasComplianceFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Compliance</option>
                      {COMPLIANCE_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['Record ID', 'Gas Type', 'Department', 'Pressure', 'Alarm', 'Pipeline', 'Compliance', 'Actions'].map((h) => (
                          <th key={h} className="px-3 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredGas.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-2 font-mono text-[9px] text-slate-500">{r.id}</td>
                          <td className="px-3 py-2 font-semibold text-slate-700">{r.gasType}</td>
                          <td className="px-3 py-2 text-slate-600">{r.department}</td>
                          <td className="px-3 py-2 text-slate-600">{r.pressureReading}</td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${r.alarmStatus === 'Active' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>{r.alarmStatus}</span></td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_PIPELINE[r.pipelineStatus] || STATUS_BADGE_PIPELINE.Operational}`}>{r.pipelineStatus}</span></td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_COMPLIANCE[r.complianceStatus] || STATUS_BADGE_COMPLIANCE.Compliant}`}>{r.complianceStatus}</span></td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenGasModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeleteGas(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredGas.length === 0 && (
                        <tr><td colSpan={8} className="px-3 py-10 text-center text-[10px] text-slate-400">No gas pipeline records found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                  <span className="text-[9px] text-slate-400 font-medium">Showing {filteredGas.length} of {gas.length} records</span>
                </div>
              </div>

              {/* STP / ETP Monitoring */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">STP / ETP Monitoring</h4>
                  <button onClick={() => handleOpenStpModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1 hover:brightness-95 transition-all shadow-sm cursor-pointer">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="p-3">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search by Operator..." value={stpSearch} onChange={(e) => setStpSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <select value={stpPlantFilter} onChange={(e) => setStpPlantFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Plant Types</option>
                      {PLANT_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <select value={stpComplianceFilter} onChange={(e) => setStpComplianceFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Compliance</option>
                      {COMPLIANCE_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['Record ID', 'Plant', 'Reading Date', 'Operator', 'pH', 'BOD', 'COD', 'Quality', 'Compliance', 'Actions'].map((h) => (
                          <th key={h} className="px-3 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredStp.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-2 font-mono text-[9px] text-slate-500">{r.id}</td>
                          <td className="px-3 py-2 font-semibold text-slate-700">{r.plantType}</td>
                          <td className="px-3 py-2 text-slate-600">{r.readingDate}</td>
                          <td className="px-3 py-2 text-slate-600">{r.operator}</td>
                          <td className="px-3 py-2 text-slate-600">{r.phLevel}</td>
                          <td className="px-3 py-2 text-slate-600">{r.bod}</td>
                          <td className="px-3 py-2 text-slate-600">{r.cod}</td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_WATER[r.waterQuality] || STATUS_BADGE_WATER.Acceptable}`}>{r.waterQuality}</span></td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_COMPLIANCE[r.complianceStatus] || STATUS_BADGE_COMPLIANCE.Compliant}`}>{r.complianceStatus}</span></td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenStpModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeleteStp(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredStp.length === 0 && (
                        <tr><td colSpan={10} className="px-3 py-10 text-center text-[10px] text-slate-400">No STP/ETP records found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                  <span className="text-[9px] text-slate-400 font-medium">Showing {filteredStp.length} of {stp.length} records</span>
                </div>
              </div>
            </div>
          </div>
        );
      }
      case 'safety_compliance': {
        const today = getToday();
        const electricalCritical = electrical.filter((r) => r.inspectionResult === 'Critical').length;
        const fireCritical = fire.filter((r) => r.complianceStatus === 'Critical').length;
        const bmCritical = biomedical.filter((r) => r.complianceStatus === 'Critical').length;
        const criticalFindings = electricalCritical + fireCritical + bmCritical;

        const electricalCompliant = electrical.filter((r) => r.inspectionResult === 'Compliant').length;
        const electricalCompliancePct = electrical.length ? Math.round((electricalCompliant / electrical.length) * 100) : 0;
        const fireCompliant = fire.filter((r) => r.complianceStatus === 'Compliant').length;
        const fireCompliancePct = fire.length ? Math.round((fireCompliant / fire.length) * 100) : 0;
        const bmCompliant = biomedical.filter((r) => r.complianceStatus === 'Compliant').length;
        const bmCompliancePct = biomedical.length ? Math.round((bmCompliant / biomedical.length) * 100) : 0;

        const totalRecords = electrical.length + fire.length + biomedical.length;
        const totalCompliant = electricalCompliant + fireCompliant + bmCompliant;
        const overallCompliancePct = totalRecords ? Math.round((totalCompliant / totalRecords) * 100) : 0;

        const pendingInspections = [...electrical, ...fire].filter((r) => r.nextInspectionDate && r.nextInspectionDate > today).length;
        const completedInspections = electrical.length + fire.length;

        const highRiskAreas = new Set([
          ...electrical.filter((r) => r.inspectionResult === 'Critical').map((r) => r.department),
          ...fire.filter((r) => r.complianceStatus === 'Critical').map((r) => r.department),
          ...biomedical.filter((r) => r.complianceStatus === 'Critical').map((r) => r.department),
        ]).size;

        const safetyKpis = [
          { label: 'Electrical Inspections', value: electrical.length, color: 'text-blue-600' },
          { label: 'Fire Safety Compliance %', value: `${fireCompliancePct}%`, color: 'text-rose-600' },
          { label: 'Biomedical Waste Compliance %', value: `${bmCompliancePct}%`, color: 'text-violet-600' },
          { label: 'Critical Findings', value: criticalFindings, color: 'text-rose-600' },
          { label: 'Pending Inspections', value: pendingInspections, color: 'text-amber-600' },
          { label: 'Completed Inspections', value: completedInspections, color: 'text-emerald-600' },
          { label: 'Overall Safety Compliance %', value: `${overallCompliancePct}%`, color: 'text-teal-600' },
          { label: 'High Risk Areas', value: highRiskAreas, color: 'text-orange-600' },
        ];

        const filteredElectrical = electrical.filter((r) => {
          const q = electricalSearch.toLowerCase();
          const matchesSearch = electricalSearch ? [r.department, r.engineer].some((v) => String(v || '').toLowerCase().includes(q)) : true;
          const matchesDept = electricalDeptFilter === 'All' || r.department === electricalDeptFilter;
          const matchesResult = electricalResultFilter === 'All' || r.inspectionResult === electricalResultFilter;
          return matchesSearch && matchesDept && matchesResult;
        });

        const filteredFire = fire.filter((r) => {
          const q = fireSearch.toLowerCase();
          const matchesSearch = fireSearch ? [r.department, r.inspector].some((v) => String(v || '').toLowerCase().includes(q)) : true;
          const matchesDept = fireDeptFilter === 'All' || r.department === fireDeptFilter;
          const matchesType = fireTypeFilter === 'All' || r.equipmentType === fireTypeFilter;
          const matchesCompliance = fireComplianceFilter === 'All' || r.complianceStatus === fireComplianceFilter;
          return matchesSearch && matchesDept && matchesType && matchesCompliance;
        });

        const filteredBiomedical = biomedical.filter((r) => {
          const q = biomedicalSearch.toLowerCase();
          const matchesSearch = biomedicalSearch ? [r.department, r.wasteCategory, r.manifestNumber].some((v) => String(v || '').toLowerCase().includes(q)) : true;
          const matchesDept = biomedicalDeptFilter === 'All' || r.department === biomedicalDeptFilter;
          const matchesCategory = biomedicalCategoryFilter === 'All' || r.wasteCategory === biomedicalCategoryFilter;
          const matchesCompliance = biomedicalComplianceFilter === 'All' || r.complianceStatus === biomedicalComplianceFilter;
          return matchesSearch && matchesDept && matchesCategory && matchesCompliance;
        });

        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold text-slate-800">Safety Compliance</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Electrical safety, fire safety, and biomedical waste management</p>
              </div>
            </div>
            <div>
              <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">Safety KPI Dashboard</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {safetyKpis.map((kpi) => (
                  <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{kpi.label}</span>
                    <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Electrical Safety */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Electrical Safety</h4>
                  <button onClick={() => handleOpenElectricalModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1 hover:brightness-95 transition-all shadow-sm cursor-pointer">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="p-3">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search by Department or Engineer..." value={electricalSearch} onChange={(e) => setElectricalSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <select value={electricalDeptFilter} onChange={(e) => setElectricalDeptFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Departments</option>
                      {HOSPITAL_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <select value={electricalResultFilter} onChange={(e) => setElectricalResultFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Results</option>
                      {COMPLIANCE_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['ID', 'Department', 'Equipment', 'Inspection Date', 'Engineer', 'Earthing', 'Panel', 'Voltage', 'Result', 'Actions'].map((h) => (
                          <th key={h} className="px-3 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredElectrical.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-2 font-mono text-[9px] text-slate-500">{r.id}</td>
                          <td className="px-3 py-2 font-semibold text-slate-700">{r.department}</td>
                          <td className="px-3 py-2 text-slate-600">{r.equipment}</td>
                          <td className="px-3 py-2 text-slate-600">{r.inspectionDate}</td>
                          <td className="px-3 py-2 text-slate-600">{r.engineer}</td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_EARTH[r.earthingStatus] || STATUS_BADGE_EARTH.OK}`}>{r.earthingStatus}</span></td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${CONDITION_BADGE[r.panelCondition] || CONDITION_BADGE.Good}`}>{r.panelCondition}</span></td>
                          <td className="px-3 py-2 text-slate-600">{r.voltageReading}V</td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_COMPLIANCE[r.inspectionResult] || STATUS_BADGE_COMPLIANCE.Compliant}`}>{r.inspectionResult}</span></td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenElectricalModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeleteElectrical(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredElectrical.length === 0 && (
                        <tr><td colSpan={10} className="px-3 py-10 text-center text-[10px] text-slate-400">No electrical safety records found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                  <span className="text-[9px] text-slate-400 font-medium">Showing {filteredElectrical.length} of {electrical.length} records</span>
                </div>
              </div>

              {/* Fire Safety */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Fire Safety</h4>
                  <button onClick={() => handleOpenFireModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1 hover:brightness-95 transition-all shadow-sm cursor-pointer">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="p-3">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search by Department or Inspector..." value={fireSearch} onChange={(e) => setFireSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                    <select value={fireDeptFilter} onChange={(e) => setFireDeptFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Departments</option>
                      {HOSPITAL_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <select value={fireTypeFilter} onChange={(e) => setFireTypeFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Equipment Types</option>
                      {FIRE_EQUIPMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <select value={fireComplianceFilter} onChange={(e) => setFireComplianceFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Compliance</option>
                      {COMPLIANCE_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['ID', 'Department', 'Ext. ID', 'Type', 'Inspection Date', 'Inspector', 'Alarm', 'Hydrant', 'Sprinkler', 'Exit', 'Drill', 'Result', 'Actions'].map((h) => (
                          <th key={h} className="px-3 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredFire.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-2 font-mono text-[9px] text-slate-500">{r.id}</td>
                          <td className="px-3 py-2 font-semibold text-slate-700">{r.department}</td>
                          <td className="px-3 py-2 text-slate-600">{r.fireExtinguisherId}</td>
                          <td className="px-3 py-2 text-slate-600">{r.equipmentType}</td>
                          <td className="px-3 py-2 text-slate-600">{r.inspectionDate}</td>
                          <td className="px-3 py-2 text-slate-600">{r.inspector}</td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_PASS[r.fireAlarmStatus] || STATUS_BADGE_PASS.Pass}`}>{r.fireAlarmStatus}</span></td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_PASS[r.hydrantStatus] || STATUS_BADGE_PASS.Pass}`}>{r.hydrantStatus}</span></td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_PASS[r.sprinklerStatus] || STATUS_BADGE_PASS.Pass}`}>{r.sprinklerStatus}</span></td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_PASS[r.emergencyExitStatus] || STATUS_BADGE_PASS.Pass}`}>{r.emergencyExitStatus}</span></td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_YESNO[r.fireDrillConducted] || STATUS_BADGE_YESNO.No}`}>{r.fireDrillConducted}</span></td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_COMPLIANCE[r.complianceStatus] || STATUS_BADGE_COMPLIANCE.Compliant}`}>{r.complianceStatus}</span></td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenFireModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeleteFire(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredFire.length === 0 && (
                        <tr><td colSpan={13} className="px-3 py-10 text-center text-[10px] text-slate-400">No fire safety records found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                  <span className="text-[9px] text-slate-400 font-medium">Showing {filteredFire.length} of {fire.length} records</span>
                </div>
              </div>

              {/* Biomedical Waste Management */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Biomedical Waste Management</h4>
                  <button onClick={() => handleOpenBiomedicalModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1 hover:brightness-95 transition-all shadow-sm cursor-pointer">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="p-3">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search by Department, Waste Category or Manifest Number..." value={biomedicalSearch} onChange={(e) => setBiomedicalSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                    <select value={biomedicalDeptFilter} onChange={(e) => setBiomedicalDeptFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Departments</option>
                      {HOSPITAL_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <select value={biomedicalCategoryFilter} onChange={(e) => setBiomedicalCategoryFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Categories</option>
                      {WASTE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select value={biomedicalComplianceFilter} onChange={(e) => setBiomedicalComplianceFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Compliance</option>
                      {COMPLIANCE_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['ID', 'Department', 'Category', 'Collected By', 'Weight', 'Manifest', 'Segregation', 'Storage', 'Transport', 'Result', 'Actions'].map((h) => (
                          <th key={h} className="px-3 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredBiomedical.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-2 font-mono text-[9px] text-slate-500">{r.id}</td>
                          <td className="px-3 py-2 font-semibold text-slate-700">{r.department}</td>
                          <td className="px-3 py-2 text-slate-600">{r.wasteCategory}</td>
                          <td className="px-3 py-2 text-slate-600">{r.collectedBy}</td>
                          <td className="px-3 py-2 text-slate-600">{r.weight} kg</td>
                          <td className="px-3 py-2 font-mono text-[9px] text-slate-500">{r.manifestNumber}</td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${r.segregationStatus === 'Non-Compliant' ? STATUS_BADGE_COMPLIANCE.Critical : STATUS_BADGE_COMPLIANCE.Compliant}`}>{r.segregationStatus}</span></td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${r.storageStatus === 'Non-Compliant' ? STATUS_BADGE_COMPLIANCE.Critical : STATUS_BADGE_COMPLIANCE.Compliant}`}>{r.storageStatus}</span></td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${r.transportationStatus === 'Non-Compliant' ? STATUS_BADGE_COMPLIANCE.Critical : STATUS_BADGE_COMPLIANCE.Compliant}`}>{r.transportationStatus}</span></td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_COMPLIANCE[r.complianceStatus] || STATUS_BADGE_COMPLIANCE.Compliant}`}>{r.complianceStatus}</span></td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenBiomedicalModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeleteBiomedical(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredBiomedical.length === 0 && (
                        <tr><td colSpan={11} className="px-3 py-10 text-center text-[10px] text-slate-400">No biomedical waste records found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                  <span className="text-[9px] text-slate-400 font-medium">Showing {filteredBiomedical.length} of {biomedical.length} records</span>
                </div>
              </div>
            </div>
          </div>
        );
      }
      case 'support_services': {
        const today = getToday();
        const completedLaundry = laundry.filter((r) => r.laundryStatus === 'Completed').length;
        const delayedLaundry = laundry.filter((r) => r.laundryStatus === 'Delayed').length;
        const totalLinenStock = linenInventory.reduce((sum, r) => sum + (parseInt(r.quantityAvailable) || 0), 0);
        const lowStockItems = linenInventory.filter((r) => r.inventoryStatus === 'Low Stock').length;
        const condemnedLinen = condemnation.reduce((sum, r) => sum + (parseInt(r.quantity) || 0), 0);
        const disposalPending = condemnation.filter((r) => r.status !== 'Disposed').length;
        const overallLaundryCompliance = laundry.length ? Math.round((completedLaundry / laundry.length) * 100) : 0;

        const supportKpis = [
          { label: 'Total Laundry Orders', value: laundry.length, color: 'text-blue-600' },
          { label: 'Completed Laundry', value: completedLaundry, color: 'text-emerald-600' },
          { label: 'Delayed Laundry', value: delayedLaundry, color: 'text-rose-600' },
          { label: 'Total Linen Stock', value: totalLinenStock, color: 'text-violet-600' },
          { label: 'Low Stock Items', value: lowStockItems, color: 'text-amber-600' },
          { label: 'Condemned Linen', value: condemnedLinen, color: 'text-orange-600' },
          { label: 'Disposal Pending', value: disposalPending, color: 'text-teal-600' },
          { label: 'Overall Laundry Compliance %', value: `${overallLaundryCompliance}%`, color: 'text-sky-600' },
        ];

        const filteredLaundry = laundry.filter((r) => {
          const q = laundrySearch.toLowerCase();
          const matchesSearch = laundrySearch
            ? [r.department, r.laundryVendor, r.collectedBy, r.laundryType].some((v) => String(v || '').toLowerCase().includes(q))
            : true;
          const matchesDept = laundryDeptFilter === 'All' || r.department === laundryDeptFilter;
          const matchesStatus = laundryStatusFilter === 'All' || r.laundryStatus === laundryStatusFilter;
          return matchesSearch && matchesDept && matchesStatus;
        });

        const filteredLinen = linenInventory.filter((r) => {
          const q = linenSearch.toLowerCase();
          const matchesSearch = linenSearch
            ? [r.department, r.linenCategory].some((v) => String(v || '').toLowerCase().includes(q))
            : true;
          const matchesDept = linenDeptFilter === 'All' || r.department === linenDeptFilter;
          const matchesCat = linenCatFilter === 'All' || r.linenCategory === linenCatFilter;
          const matchesStatus = linenStatusFilter === 'All' || r.inventoryStatus === linenStatusFilter;
          return matchesSearch && matchesDept && matchesCat && matchesStatus;
        });

        const filteredCondemnation = condemnation.filter((r) => {
          const q = condemnSearch.toLowerCase();
          const matchesSearch = condemnSearch
            ? [r.department, r.linenCategory, r.approvedBy].some((v) => String(v || '').toLowerCase().includes(q))
            : true;
          const matchesDept = condemnDeptFilter === 'All' || r.department === condemnDeptFilter;
          const matchesCat = condemnCatFilter === 'All' || r.linenCategory === condemnCatFilter;
          const matchesStatus = condemnStatusFilter === 'All' || r.status === condemnStatusFilter;
          return matchesSearch && matchesDept && matchesCat && matchesStatus;
        });

        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold text-slate-800">Support Services</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Laundry management, linen inventory, and linen condemnation register</p>
              </div>
            </div>
            <div>
              <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">Support Services KPI Dashboard</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {supportKpis.map((kpi) => (
                  <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{kpi.label}</span>
                    <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Laundry Management */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Laundry Management</h4>
                  <button onClick={() => handleOpenLaundryModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1 hover:brightness-95 transition-all shadow-sm cursor-pointer">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="p-3">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search by Department or Laundry Vendor..." value={laundrySearch} onChange={(e) => setLaundrySearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <select value={laundryDeptFilter} onChange={(e) => setLaundryDeptFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Departments</option>
                      {HOSPITAL_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <select value={laundryStatusFilter} onChange={(e) => setLaundryStatusFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Laundry Status</option>
                      {LAUNDRY_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['Laundry ID', 'Department', 'Collection Date', 'Vendor', 'Type', 'Soiled', 'Clean', 'Delivery Date', 'Status', 'Actions'].map((h) => (
                          <th key={h} className="px-3 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLaundry.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-2 font-mono text-[9px] text-slate-500">{r.id}</td>
                          <td className="px-3 py-2 font-semibold text-slate-700">{r.department}</td>
                          <td className="px-3 py-2 text-slate-600">{r.collectionDate} {r.collectionTime || ''}</td>
                          <td className="px-3 py-2 text-slate-600">{r.laundryVendor}</td>
                          <td className="px-3 py-2 text-slate-600">{r.laundryType}</td>
                          <td className="px-3 py-2 text-slate-600">{r.soiledLinenQuantity}</td>
                          <td className="px-3 py-2 text-slate-600">{r.cleanLinenQuantity}</td>
                          <td className="px-3 py-2 text-slate-600">{r.deliveryDate || '—'}</td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_LAUNDRY[r.laundryStatus] || STATUS_BADGE_LAUNDRY.Pending}`}>{r.laundryStatus}</span></td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenLaundryModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeleteLaundry(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredLaundry.length === 0 && (
                        <tr><td colSpan={10} className="px-3 py-10 text-center text-[10px] text-slate-400">No laundry records found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                  <span className="text-[9px] text-slate-400 font-medium">Showing {filteredLaundry.length} of {laundry.length} records</span>
                </div>
              </div>

              {/* Linen Inventory */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Linen Inventory</h4>
                  <button onClick={() => handleOpenLinenModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1 hover:brightness-95 transition-all shadow-sm cursor-pointer">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="p-3">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search by Department or Linen Category..." value={linenSearch} onChange={(e) => setLinenSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                    <select value={linenDeptFilter} onChange={(e) => setLinenDeptFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Departments</option>
                      {HOSPITAL_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <select value={linenCatFilter} onChange={(e) => setLinenCatFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Linen Categories</option>
                      {LINEN_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select value={linenStatusFilter} onChange={(e) => setLinenStatusFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Inventory Status</option>
                      {INVENTORY_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['Inventory ID', 'Department', 'Linen Category', 'Qty Available', 'Min Stock', 'Last Updated', 'Status', 'Actions'].map((h) => (
                          <th key={h} className="px-3 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLinen.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-2 font-mono text-[9px] text-slate-500">{r.id}</td>
                          <td className="px-3 py-2 font-semibold text-slate-700">{r.department}</td>
                          <td className="px-3 py-2 text-slate-600">{r.linenCategory}</td>
                          <td className="px-3 py-2 text-slate-600">{r.quantityAvailable}</td>
                          <td className="px-3 py-2 text-slate-600">{r.minimumStock}</td>
                          <td className="px-3 py-2 text-slate-600">{r.lastUpdated || '—'}</td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_INVENTORY[r.inventoryStatus] || STATUS_BADGE_INVENTORY.Available}`}>{r.inventoryStatus}</span></td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenLinenModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeleteLinen(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredLinen.length === 0 && (
                        <tr><td colSpan={8} className="px-3 py-10 text-center text-[10px] text-slate-400">No linen inventory records found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                  <span className="text-[9px] text-slate-400 font-medium">Showing {filteredLinen.length} of {linenInventory.length} records</span>
                </div>
              </div>

              {/* Linen Condemnation Register */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Linen Condemnation Register</h4>
                  <button onClick={() => handleOpenCondemnModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1 hover:brightness-95 transition-all shadow-sm cursor-pointer">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="p-3">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search by Department, Linen Category or Approved By..." value={condemnSearch} onChange={(e) => setCondemnSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                    <select value={condemnDeptFilter} onChange={(e) => setCondemnDeptFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Departments</option>
                      {HOSPITAL_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <select value={condemnCatFilter} onChange={(e) => setCondemnCatFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Linen Categories</option>
                      {LINEN_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select value={condemnStatusFilter} onChange={(e) => setCondemnStatusFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Status</option>
                      {CONDEMN_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['Condemn ID', 'Department', 'Linen Category', 'Qty', 'Reason', 'Date', 'Approved By', 'Method', 'Status', 'Actions'].map((h) => (
                          <th key={h} className="px-3 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCondemnation.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-2 font-mono text-[9px] text-slate-500">{r.id}</td>
                          <td className="px-3 py-2 font-semibold text-slate-700">{r.department}</td>
                          <td className="px-3 py-2 text-slate-600">{r.linenCategory}</td>
                          <td className="px-3 py-2 text-slate-600">{r.quantity}</td>
                          <td className="px-3 py-2 text-slate-600">{r.reason}</td>
                          <td className="px-3 py-2 text-slate-600">{r.condemnationDate}</td>
                          <td className="px-3 py-2 text-slate-600">{r.approvedBy}</td>
                          <td className="px-3 py-2 text-slate-600">{r.disposalMethod}</td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_CONDEMN[r.status] || STATUS_BADGE_CONDEMN.Pending}`}>{r.status}</span></td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenCondemnModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeleteCondemn(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredCondemnation.length === 0 && (
                        <tr><td colSpan={10} className="px-3 py-10 text-center text-[10px] text-slate-400">No linen condemnation records found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                  <span className="text-[9px] text-slate-400 font-medium">Showing {filteredCondemnation.length} of {condemnation.length} records</span>
                </div>
              </div>
            </div>
          </div>
        );
      }
      case 'audit': {
        const today = getToday();
        const totalAudits = internalAudits.length;
        const compliantAudits = internalAudits.filter((r) => r.auditResult === 'Compliant').length;
        const criticalAudits = internalAudits.filter((r) => r.auditResult === 'Critical').length;
        const observationAudits = internalAudits.filter((r) => r.auditResult === 'Observation').length;
        const avgCompliance = totalAudits ? Math.round(internalAudits.reduce((sum, r) => sum + (parseInt(r.complianceScore) || 0), 0) / totalAudits) : 0;
        const totalCapa = capa.length;
        const closedCapa = capa.filter((r) => r.status === 'Closed').length;
        const overdueCapa = capa.filter((r) => r.status === 'Overdue').length;
        const overallCompliance = totalAudits ? Math.round((compliantAudits / totalAudits) * 100) : 0;

        const auditKpis = [
          { label: 'Total Audits', value: totalAudits, color: 'text-blue-600' },
          { label: 'Completed Audits', value: compliantAudits, color: 'text-emerald-600' },
          { label: 'Critical Findings', value: criticalAudits, color: 'text-rose-600' },
          { label: 'Average Compliance %', value: `${avgCompliance}%`, color: 'text-amber-600' },
          { label: 'Total CAPAs', value: totalCapa, color: 'text-violet-600' },
          { label: 'Closed CAPAs', value: closedCapa, color: 'text-teal-600' },
          { label: 'Overdue CAPAs', value: overdueCapa, color: 'text-orange-600' },
          { label: 'Overall Audit Compliance %', value: `${overallCompliance}%`, color: 'text-sky-600' },
        ];

        const filteredAudits = internalAudits.filter((r) => {
          const q = auditSearch.toLowerCase();
          const matchesSearch = auditSearch ? [r.department, r.auditor, r.auditArea, r.auditResult, r.majorFindings, r.minorFindings].some((v) => String(v || '').toLowerCase().includes(q)) : true;
          const matchesDept = auditDeptFilter === 'All' || r.department === auditDeptFilter;
          const matchesResult = auditResultFilter === 'All' || r.auditResult === auditResultFilter;
          return matchesSearch && matchesDept && matchesResult;
        });

        const filteredCapa = capa.filter((r) => {
          const q = capaSearch.toLowerCase();
          const matchesSearch = capaSearch ? [r.department, r.finding, r.assignedTo, r.linkedAudit].some((v) => String(v || '').toLowerCase().includes(q)) : true;
          const matchesDept = capaDeptFilter === 'All' || r.department === capaDeptFilter;
          const matchesRisk = capaRiskFilter === 'All' || r.riskLevel === capaRiskFilter;
          const matchesStatus = capaStatusFilter === 'All' || r.status === capaStatusFilter;
          return matchesSearch && matchesDept && matchesRisk && matchesStatus;
        });

        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold text-slate-800">Internal Audit</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">General Safety Internal Audit and CAPA Tracker</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {auditKpis.map((kpi) => (
                <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{kpi.label}</span>
                  <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-6">
              {/* General Safety Internal Audit */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">General Safety Internal Audit</h4>
                  <button onClick={() => handleOpenAuditModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1 hover:brightness-95 transition-all shadow-sm cursor-pointer">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="p-3">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search by Department, Auditor, Area or Findings..." value={auditSearch} onChange={(e) => setAuditSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                    <select value={auditDeptFilter} onChange={(e) => setAuditDeptFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Departments</option>
                      {HOSPITAL_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <select value={auditResultFilter} onChange={(e) => setAuditResultFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Results</option>
                      {AUDIT_RESULTS.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['Audit ID', 'Date', 'Department', 'Audit Area', 'Auditor', 'Score %', 'Result', 'Actions'].map((h) => (
                          <th key={h} className="px-3 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAudits.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-2 font-mono text-[9px] text-slate-500">{r.id}</td>
                          <td className="px-3 py-2 text-slate-600">{r.auditDate}</td>
                          <td className="px-3 py-2 font-semibold text-slate-700">{r.department}</td>
                          <td className="px-3 py-2 text-slate-600">{r.auditArea}</td>
                          <td className="px-3 py-2 text-slate-600">{r.auditor}</td>
                          <td className="px-3 py-2 text-slate-600 font-bold">{r.complianceScore}%</td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_AUDIT[r.auditResult] || STATUS_BADGE_AUDIT.Compliant}`}>{r.auditResult}</span></td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenAuditModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeleteAudit(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredAudits.length === 0 && (
                        <tr><td colSpan={8} className="px-3 py-10 text-center text-[10px] text-slate-400">No internal audit records found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                  <span className="text-[9px] text-slate-400 font-medium">Showing {filteredAudits.length} of {internalAudits.length} records</span>
                </div>
              </div>

              {/* CAPA Tracker */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">CAPA Tracker</h4>
                  <button onClick={() => handleOpenCapaModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-1.5 rounded-lg text-white text-[9px] font-bold flex items-center gap-1 hover:brightness-95 transition-all shadow-sm cursor-pointer">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="p-3">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input type="text" placeholder="Search by Department, Finding, Assigned To or Linked Audit..." value={capaSearch} onChange={(e) => setCapaSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                    <select value={capaDeptFilter} onChange={(e) => setCapaDeptFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Departments</option>
                      {HOSPITAL_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <select value={capaRiskFilter} onChange={(e) => setCapaRiskFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Risk Levels</option>
                      {CAPA_RISK_LEVELS.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <select value={capaStatusFilter} onChange={(e) => setCapaStatusFilter(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] text-slate-700 bg-white">
                      <option value="All">All Statuses</option>
                      {CAPA_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {['CAPA ID', 'Linked Audit', 'Department', 'Finding', 'Risk Level', 'Assigned To', 'Target Date', 'Status', 'Actions'].map((h) => (
                          <th key={h} className="px-3 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCapa.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-3 py-2 font-mono text-[9px] text-slate-500">{r.id}</td>
                          <td className="px-3 py-2 text-slate-600">{r.linkedAudit}</td>
                          <td className="px-3 py-2 font-semibold text-slate-700">{r.department}</td>
                          <td className="px-3 py-2 text-slate-600">{r.finding}</td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${RISK_BADGE[r.riskLevel] || RISK_BADGE.Medium}`}>{r.riskLevel}</span></td>
                          <td className="px-3 py-2 text-slate-600">{r.assignedTo}</td>
                          <td className="px-3 py-2 text-slate-600">{r.targetDate}</td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_CAPA[r.status] || STATUS_BADGE_CAPA.Open}`}>{r.status}</span></td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleOpenCapaModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                              <button onClick={() => handleDeleteCapa(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredCapa.length === 0 && (
                        <tr><td colSpan={9} className="px-3 py-10 text-center text-[10px] text-slate-400">No CAPA records found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
                  <span className="text-[9px] text-slate-400 font-medium">Showing {filteredCapa.length} of {capa.length} records</span>
                </div>
              </div>
            </div>
          </div>
        );
      }
      case 'reports':
        return <ReportsTab hospital={hospital} />;
      default:
        return <PlaceholderTab title={TABS.find((t) => t.id === activeTab)?.label || ''} />;
    }
  };

  const ReportsTab = ({ hospital }) => {
    const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthKeyToLabel = (key) => {
      if (!key || key.length < 7) return key || '';
      const m = parseInt(key.slice(5, 7), 10);
      const y = key.slice(2, 4);
      if (isNaN(m) || m < 1 || m > 12) return key;
      return `${MONTH_LABELS[m - 1]} '${y}`;
    };

    const totalAssets = hospitalFurniture.length + generalFurniture.length + itEquipment.length;
    const activeAssets = hospitalFurniture.filter((r) => r.assetStatus === 'Active').length
      + generalFurniture.filter((r) => r.status === 'Active').length
      + itEquipment.filter((r) => r.status === 'Active').length;
    const equipmentCompliance = machinery.length ? Math.round((machinery.filter((r) => r.equipmentStatus === 'Active').length / machinery.length) * 100) : 0;
    const electricalCompliance = electrical.length ? Math.round((electrical.filter((r) => r.inspectionResult === 'Compliant').length / electrical.length) * 100) : 0;
    const fireCompliance = fire.length ? Math.round((fire.filter((r) => r.complianceStatus === 'Compliant').length / fire.length) * 100) : 0;
    const bmCompliance = biomedical.length ? Math.round((biomedical.filter((r) => r.complianceStatus === 'Compliant').length / biomedical.length) * 100) : 0;
    const auditCompliance = internalAudits.length ? Math.round((internalAudits.filter((r) => r.auditResult === 'Compliant').length / internalAudits.length) * 100) : 0;
    const overallSafetyCompliance = Math.round((equipmentCompliance + electricalCompliance + fireCompliance + bmCompliance + auditCompliance) / 5);

    const kpiData = [
      { label: 'Total Assets', value: totalAssets, color: 'text-blue-600' },
      { label: 'Active Assets', value: activeAssets, color: 'text-emerald-600' },
      { label: 'Equipment Compliance %', value: `${equipmentCompliance}%`, color: 'text-sky-600' },
      { label: 'Electrical Safety Compliance %', value: `${electricalCompliance}%`, color: 'text-amber-600' },
      { label: 'Fire Safety Compliance %', value: `${fireCompliance}%`, color: 'text-rose-600' },
      { label: 'Biomedical Waste Compliance %', value: `${bmCompliance}%`, color: 'text-violet-600' },
      { label: 'Internal Audit Compliance %', value: `${auditCompliance}%`, color: 'text-teal-600' },
      { label: 'Overall General Safety Compliance %', value: `${overallSafetyCompliance}%`, color: 'text-orange-600' },
    ];

    const assetDistributionData = [
      { name: 'Hospital Furniture', value: hospitalFurniture.length },
      { name: 'General Furniture', value: generalFurniture.length },
      { name: 'IT Equipment', value: itEquipment.length },
    ];

    const deptUtilsMap = {};
    machinery.forEach((r) => { deptUtilsMap[r.department] = (deptUtilsMap[r.department] || 0) + 1; });
    gas.forEach((r) => { deptUtilsMap[r.department] = (deptUtilsMap[r.department] || 0) + 1; });
    stp.forEach((r) => { deptUtilsMap[r.department] = (deptUtilsMap[r.department] || 0) + 1; });
    const deptUtilsData = Object.keys(deptUtilsMap).map((name) => ({ name, count: deptUtilsMap[name] }));

    const safetyByMonth = {};
    electrical.forEach((r) => {
      if (r.inspectionDate) {
        const k = r.inspectionDate.slice(0, 7);
        if (!safetyByMonth[k]) safetyByMonth[k] = { electrical: 0, fire: 0, biomedical: 0, elecTotal: 0, fireTotal: 0, bmTotal: 0 };
        safetyByMonth[k].elecTotal += 1;
        if (r.inspectionResult === 'Compliant') safetyByMonth[k].electrical += 1;
      }
    });
    fire.forEach((r) => {
      if (r.inspectionDate) {
        const k = r.inspectionDate.slice(0, 7);
        if (!safetyByMonth[k]) safetyByMonth[k] = { electrical: 0, fire: 0, biomedical: 0, elecTotal: 0, fireTotal: 0, bmTotal: 0 };
        safetyByMonth[k].fireTotal += 1;
        if (r.complianceStatus === 'Compliant') safetyByMonth[k].fire += 1;
      }
    });
    biomedical.forEach((r) => {
      if (r.collectionDate) {
        const k = r.collectionDate.slice(0, 7);
        if (!safetyByMonth[k]) safetyByMonth[k] = { electrical: 0, fire: 0, biomedical: 0, elecTotal: 0, fireTotal: 0, bmTotal: 0 };
        safetyByMonth[k].bmTotal += 1;
        if (r.complianceStatus === 'Compliant') safetyByMonth[k].biomedical += 1;
      }
    });
    const monthlySafetyComplianceData = Object.keys(safetyByMonth)
      .sort()
      .map((k) => ({
        name: monthKeyToLabel(k),
        electrical: safetyByMonth[k].elecTotal ? Math.round((safetyByMonth[k].electrical / safetyByMonth[k].elecTotal) * 100) : 0,
        fire: safetyByMonth[k].fireTotal ? Math.round((safetyByMonth[k].fire / safetyByMonth[k].fireTotal) * 100) : 0,
        biomedical: safetyByMonth[k].bmTotal ? Math.round((safetyByMonth[k].biomedical / safetyByMonth[k].bmTotal) * 100) : 0,
      }));

    const supportByMonth = {};
    laundry.forEach((r) => {
      if (r.collectionDate) {
        const k = r.collectionDate.slice(0, 7);
        if (!supportByMonth[k]) supportByMonth[k] = { completed: 0, total: 0, linenAvailable: 0, linenTotal: 0 };
        supportByMonth[k].total += 1;
        if (r.laundryStatus === 'Completed') supportByMonth[k].completed += 1;
      }
    });
    linenInventory.forEach((r) => {
      if (r.lastUpdated) {
        const k = r.lastUpdated.slice(0, 7);
        if (!supportByMonth[k]) supportByMonth[k] = { completed: 0, total: 0, linenAvailable: 0, linenTotal: 0 };
        supportByMonth[k].linenTotal += 1;
        if (r.inventoryStatus === 'Available') supportByMonth[k].linenAvailable += 1;
      }
    });
    const supportServicesData = Object.keys(supportByMonth)
      .sort()
      .map((k) => ({
        name: monthKeyToLabel(k),
        laundryCompletion: supportByMonth[k].total ? Math.round((supportByMonth[k].completed / supportByMonth[k].total) * 100) : 0,
        linenAvailability: supportByMonth[k].linenTotal ? Math.round((supportByMonth[k].linenAvailable / supportByMonth[k].linenTotal) * 100) : 0,
      }));

    const openCapa = capa.filter((r) => r.status === 'Open').length;
    const closedCapa = capa.filter((r) => r.status === 'Closed').length;
    const overdueCapa = capa.filter((r) => r.status === 'Overdue').length;
    const criticalFindings = internalAudits.filter((r) => r.auditResult === 'Critical').length;
    const auditCapaData = [
      { name: 'Open', value: openCapa },
      { name: 'Closed', value: closedCapa },
      { name: 'Overdue', value: overdueCapa },
      { name: 'Critical Findings', value: criticalFindings },
    ];

    const overallByMonth = {};
    const allRecords = [
      ...electrical.map((r) => ({ ...r, date: r.inspectionDate, compliant: r.inspectionResult === 'Compliant' })),
      ...fire.map((r) => ({ ...r, date: r.inspectionDate, compliant: r.complianceStatus === 'Compliant' })),
      ...biomedical.map((r) => ({ ...r, date: r.collectionDate, compliant: r.complianceStatus === 'Compliant' })),
    ];
    allRecords.forEach((r) => {
      if (r.date) {
        const k = r.date.slice(0, 7);
        if (!overallByMonth[k]) overallByMonth[k] = { total: 0, compliant: 0 };
        overallByMonth[k].total += 1;
        if (r.compliant) overallByMonth[k].compliant += 1;
      }
    });
    const overallComplianceTrendData = Object.keys(overallByMonth)
      .sort()
      .map((k) => ({
        name: monthKeyToLabel(k),
        compliance: overallByMonth[k].total ? Math.round((overallByMonth[k].compliant / overallByMonth[k].total) * 100) : 0,
      }));

    const deptList = Array.from(new Set([
      ...hospitalFurniture.map((r) => r.department),
      ...generalFurniture.map((r) => r.department),
      ...itEquipment.map((r) => r.department),
      ...machinery.map((r) => r.department),
      ...gas.map((r) => r.department),
      ...stp.map((r) => r.department),
      ...electrical.map((r) => r.department),
      ...fire.map((r) => r.department),
      ...biomedical.map((r) => r.department),
      ...laundry.map((r) => r.department),
      ...linenInventory.map((r) => r.department),
      ...internalAudits.map((r) => r.department),
    ]));

    const summaryRows = deptList
      .map((dept) => {
        const assets = hospitalFurniture.filter((r) => r.department === dept).length
          + generalFurniture.filter((r) => r.department === dept).length
          + itEquipment.filter((r) => r.department === dept).length;
        const equipDept = machinery.filter((r) => r.department === dept);
        const equipCompliance = equipDept.length ? Math.round((equipDept.filter((r) => r.equipmentStatus === 'Active').length / equipDept.length) * 100) : 0;
        const elecDept = electrical.filter((r) => r.department === dept);
        const fireDept = fire.filter((r) => r.department === dept);
        const bmDept = biomedical.filter((r) => r.department === dept);
        const safetyTotal = elecDept.length + fireDept.length + bmDept.length;
        const safetyCompliant = elecDept.filter((r) => r.inspectionResult === 'Compliant').length
          + fireDept.filter((r) => r.complianceStatus === 'Compliant').length
          + bmDept.filter((r) => r.complianceStatus === 'Compliant').length;
        const safetyCompliance = safetyTotal ? Math.round((safetyCompliant / safetyTotal) * 100) : 0;
        const laundryDept = laundry.filter((r) => r.department === dept);
        const laundryCompleted = laundryDept.filter((r) => r.laundryStatus === 'Completed').length;
        const laundryCompliance = laundryDept.length ? Math.round((laundryCompleted / laundryDept.length) * 100) : 0;
        const auditDept = internalAudits.filter((r) => r.department === dept);
        const auditCompliance = auditDept.length ? Math.round((auditDept.filter((r) => r.auditResult === 'Compliant').length / auditDept.length) * 100) : 0;
        const overall = Math.round((equipCompliance + safetyCompliance + laundryCompliance + auditCompliance) / 4);
        const status = overall >= 90 ? 'Good' : overall >= 75 ? 'Watch' : 'Critical';
        return { department: dept, assets, equipCompliance, safetyCompliance, laundryCompliance, auditCompliance, overall, status };
      })
      .sort((a, b) => a.department.localeCompare(b.department));

    const STATUS_BADGE = {
      Good: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      Watch: 'bg-amber-50 text-amber-700 border-amber-200',
      Critical: 'bg-rose-50 text-rose-700 border-rose-200',
    };

    const handleExportCSV = () => {
      const kpiLabels = kpiData.map((k) => k.label);
      const kpiValues = kpiData.map((k) => k.value);
      const headers = ['Department', 'Assets', 'Equipment Compliance %', 'Safety Compliance %', 'Laundry Compliance %', 'Audit Compliance %', 'Overall Compliance %', 'Status'];
      const rows = summaryRows.map((r) => [r.department, r.assets, r.equipCompliance, r.safetyCompliance, r.laundryCompliance, r.auditCompliance, r.overall, r.status]);
      const csvContent = [
        ['General Safety & Compliance — Reports & Analytics'],
        ['KPI', 'Value'],
        ...kpiLabels.map((l, i) => [l, kpiValues[i]]),
        [],
        headers,
        ...rows,
      ].map((e) => e.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'General_Safety_Compliance_Report.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const handleExportPDF = () => alert('PDF export will be available in the next version.');
    const handlePrint = () => window.print();

    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Reports &amp; Analytics</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Aggregated safety and compliance insights across all modules</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleExportCSV} className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 hover:border-slate-300 text-[9px] font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer">
              <FileDown className="w-3.5 h-3.5" /> Export CSV
            </button>
            <button onClick={handleExportPDF} className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 hover:border-slate-300 text-[9px] font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer">
              <Download className="w-3.5 h-3.5" /> Export PDF
            </button>
            <button onClick={handlePrint} style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }} className="px-3 py-1.5 rounded-xl text-white text-[9px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer">
              <Printer className="w-3.5 h-3.5" /> Print Report
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">Key Performance Indicators</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {kpiData.map((kpi) => (
              <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{kpi.label}</span>
                <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">Analytics &amp; Trends</h2>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h4 className="text-[10px] font-bold text-slate-700 mb-4">Facility Asset Distribution</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={assetDistributionData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                      {assetDistributionData.map((entry, index) => (<Cell key={`cell-asset-${index}`} fill={COLORS[index % COLORS.length]} />))}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                    <Legend wrapperStyle={{ fontSize: '9px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h4 className="text-[10px] font-bold text-slate-700 mb-4">Equipment & Utilities by Department</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deptUtilsData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                    <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                    <Bar dataKey="count" fill={hospital?.themeColor || '#3b82f6'} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h4 className="text-[10px] font-bold text-slate-700 mb-4">Monthly Safety Compliance Trend</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlySafetyComplianceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 100]} style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                    <Legend wrapperStyle={{ fontSize: '9px' }} />
                    <Line type="monotone" dataKey="electrical" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} name="Electrical" />
                    <Line type="monotone" dataKey="fire" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} name="Fire" />
                    <Line type="monotone" dataKey="biomedical" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} name="Biomedical" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h4 className="text-[10px] font-bold text-slate-700 mb-4">Support Services Performance</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={supportServicesData}>
                    <defs>
                      <linearGradient id="supGrad1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="supGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 100]} style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                    <Legend wrapperStyle={{ fontSize: '9px' }} />
                    <Area type="monotone" dataKey="laundryCompletion" stroke="#10b981" strokeWidth={2} fill="url(#supGrad1)" name="Laundry Completion" />
                    <Area type="monotone" dataKey="linenAvailability" stroke="#06b6d4" strokeWidth={2} fill="url(#supGrad2)" name="Linen Availability" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h4 className="text-[10px] font-bold text-slate-700 mb-4">Audit & CAPA Status</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={auditCapaData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                    <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h4 className="text-[10px] font-bold text-slate-700 mb-4">Overall Compliance Trend</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={overallComplianceTrendData}>
                    <defs>
                      <linearGradient id="overallGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 100]} style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="compliance" stroke="#3b82f6" strokeWidth={3} fill="url(#overallGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200">
            <h3 className="text-xs font-bold text-slate-800">Monthly General Safety Summary</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Department', 'Assets', 'Equipment Compliance %', 'Safety Compliance %', 'Laundry Compliance %', 'Audit Compliance %', 'Overall Compliance %', 'Status'].map((h) => (
                    <th key={h} className="px-4 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {summaryRows.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-2 font-semibold text-slate-700">{row.department}</td>
                    <td className="px-4 py-2 text-slate-600">{row.assets}</td>
                    <td className="px-4 py-2 text-blue-600 font-bold">{row.equipCompliance}%</td>
                    <td className="px-4 py-2 text-emerald-600 font-bold">{row.safetyCompliance}%</td>
                    <td className="px-4 py-2 text-violet-600 font-bold">{row.laundryCompliance}%</td>
                    <td className="px-4 py-2 text-amber-600 font-bold">{row.auditCompliance}%</td>
                    <td className="px-4 py-2 text-slate-900 font-bold">{row.overall}%</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[row.status] || STATUS_BADGE.Good}`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
            <span className="text-[9px] text-slate-400 font-medium">Showing {summaryRows.length} departments</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-0 -m-6 min-h-[calc(100vh-4rem)]">
      <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider cursor-pointer transition-colors group">
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Policies Directory
          </button>
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">General Safety & Compliance</h2>
          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">NABH Compliance Module</p>
        </div>
        <nav className="flex-1 overflow-y-auto custom-scroll py-3 px-2 space-y-0.5">
          {TABS.map(({ id, label, icon: Icon }) => {
            const isActive = id === activeTab;
            return (
              <button key={id} onClick={() => setActiveTab(id)} style={isActive ? { backgroundColor: `${hospital.themeColor}0d`, borderColor: `${hospital.themeColor}22`, color: hospital.themeColor } : {}} className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all cursor-pointer ${isActive ? 'border-sky-500/20 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[10px] font-semibold truncate">{label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-slate-100">
          <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">General Safety — NABH Module</p>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto custom-scroll bg-slate-50/40 p-6">
        {renderContent()}
      </main>
      {isHFModalOpen && (
        <Modal hospital={hospital} isOpen={isHFModalOpen} editingRecord={!!editingHFId} form={hfForm} setForm={setHFForm} errors={{}} onClose={() => { setIsHFModalOpen(false); setEditingHFId(null); }} onSave={handleSaveHF} title={editingHFId ? 'Edit Hospital Furniture' : 'Add Hospital Furniture'} subtitle="Facility Assets — Hospital Furniture">
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Basic Information</p><div className="grid grid-cols-2 gap-3">
            <TextField label="Furniture Name" field="furnitureName" form={hfForm} setForm={setHFForm} required placeholder="e.g. Electric Patient Bed" />
            <SelectField label="Category" field="furnitureCategory" form={hfForm} setForm={setHFForm} options={HOSPITAL_FURNITURE_CATEGORIES} required />
            <SelectField label="Department" field="department" form={hfForm} setForm={setHFForm} options={HOSPITAL_DEPARTMENTS} required />
            <TextField label="Location" field="location" form={hfForm} setForm={setHFForm} required placeholder="e.g. ICU-01" />
            <TextField label="Manufacturer" field="manufacturer" form={hfForm} setForm={setHFForm} placeholder="e.g. Hill-Rom" />
            <TextField label="Vendor" field="vendor" form={hfForm} setForm={setHFForm} />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Dates & Warranty</p><div className="grid grid-cols-2 gap-3">
            <DateField label="Purchase Date" field="purchaseDate" form={hfForm} setForm={setHFForm} required />
            <DateField label="Warranty Expiry" field="warrantyExpiry" form={hfForm} setForm={setHFForm} />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Condition & Status</p><div className="grid grid-cols-2 gap-3">
            <SelectField label="Condition" field="assetCondition" form={hfForm} setForm={setHFForm} options={ASSET_CONDITIONS} required />
            <SelectField label="Status" field="assetStatus" form={hfForm} setForm={setHFForm} options={ASSET_STATUSES} required />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Tags & Remarks</p><div className="grid grid-cols-2 gap-3">
            <TextField label="Asset Tag" field="assetTag" form={hfForm} setForm={setHFForm} placeholder="e.g. AST-HF-001" />
            <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
              <textarea value={hfForm.remarks || ''} onChange={(e) => setHFForm({ ...hfForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none" />
            </div>
          </div></div>
        </Modal>
      )}
      {isGFModalOpen && (
        <Modal hospital={hospital} isOpen={isGFModalOpen} editingRecord={!!editingGFId} form={gfForm} setForm={setGFForm} errors={{}} onClose={() => { setIsGFModalOpen(false); setEditingGFId(null); }} onSave={handleSaveGF} title={editingGFId ? 'Edit General Furniture' : 'Add General Furniture'} subtitle="Facility Assets — General Furniture">
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Basic Information</p><div className="grid grid-cols-2 gap-3">
            <TextField label="Furniture Name" field="furnitureName" form={gfForm} setForm={setGFForm} required placeholder="e.g. Ergonomic Office Chair" />
            <SelectField label="Category" field="category" form={gfForm} setForm={setGFForm} options={GENERAL_FURNITURE_CATEGORIES} required />
            <SelectField label="Department" field="department" form={gfForm} setForm={setGFForm} options={HOSPITAL_DEPARTMENTS} required />
            <TextField label="Location" field="location" form={gfForm} setForm={setGFForm} required placeholder="e.g. ADMIN-01" />
            <NumField label="Quantity" field="quantity" form={gfForm} setForm={setGFForm} />
            <TextField label="Vendor" field="vendor" form={gfForm} setForm={setGFForm} />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Dates & Condition</p><div className="grid grid-cols-2 gap-3">
            <DateField label="Purchase Date" field="purchaseDate" form={gfForm} setForm={setGFForm} required />
            <SelectField label="Condition" field="condition" form={gfForm} setForm={setGFForm} options={ASSET_CONDITIONS} required />
            <SelectField label="Status" field="status" form={gfForm} setForm={setGFForm} options={ASSET_STATUSES} required />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Tags & Remarks</p><div className="grid grid-cols-2 gap-3">
            <TextField label="Asset Tag" field="assetTag" form={gfForm} setForm={setGFForm} placeholder="e.g. AST-GF-001" />
            <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
              <textarea value={gfForm.remarks || ''} onChange={(e) => setGFForm({ ...gfForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none" />
            </div>
          </div></div>
        </Modal>
      )}
      {isIEModalOpen && (
        <Modal hospital={hospital} isOpen={isIEModalOpen} editingRecord={!!editingIEId} form={ieForm} setForm={setIEForm} errors={{}} onClose={() => { setIsIEModalOpen(false); setEditingIEId(null); }} onSave={handleSaveIE} title={editingIEId ? 'Edit IT Equipment' : 'Add IT Equipment'} subtitle="Facility Assets — IT Equipment">
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Basic Information</p><div className="grid grid-cols-2 gap-3">
            <TextField label="Equipment Name" field="equipmentName" form={ieForm} setForm={setIEForm} required placeholder="e.g. HP ProDesk 400" />
            <SelectField label="Equipment Type" field="equipmentType" form={ieForm} setForm={setIEForm} options={IT_EQUIPMENT_TYPES} required />
            <SelectField label="Department" field="department" form={ieForm} setForm={setIEForm} options={HOSPITAL_DEPARTMENTS} required />
            <TextField label="Location" field="location" form={ieForm} setForm={setIEForm} required placeholder="e.g. BILL-01" />
            <TextField label="Serial Number" field="serialNumber" form={ieForm} setForm={setIEForm} placeholder="e.g. HP-2022-001" />
            <TextField label="Asset Tag" field="assetTag" form={ieForm} setForm={setIEForm} placeholder="e.g. AST-IE-001" />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Purchase & Warranty</p><div className="grid grid-cols-2 gap-3">
            <DateField label="Purchase Date" field="purchaseDate" form={ieForm} setForm={setIEForm} required />
            <DateField label="Warranty Expiry" field="warrantyExpiry" form={ieForm} setForm={setIEForm} />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">System & Assignment</p><div className="grid grid-cols-2 gap-3">
            <SelectField label="Operating System" field="operatingSystem" form={ieForm} setForm={setIEForm} options={IT_OPERATING_SYSTEMS} />
            <TextField label="Assigned To" field="assignedTo" form={ieForm} setForm={setIEForm} placeholder="e.g. Mr. Ramesh K" />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Condition & Status</p><div className="grid grid-cols-2 gap-3">
            <SelectField label="Condition" field="condition" form={ieForm} setForm={setIEForm} options={ASSET_CONDITIONS} required />
            <SelectField label="Status" field="status" form={ieForm} setForm={setIEForm} options={ASSET_STATUSES} required />
            <TextField label="Vendor" field="vendor" form={ieForm} setForm={setIEForm} />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Remarks</p>
            <div className="grid grid-cols-1 gap-3">
              <textarea value={ieForm.remarks || ''} onChange={(e) => setIEForm({ ...ieForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none" placeholder="Additional remarks..." />
            </div>
          </div>
        </Modal>
      )}
      {isMachineryModalOpen && (
        <Modal hospital={hospital} isOpen={isMachineryModalOpen} editingRecord={!!editingMachineryId} form={machineryForm} setForm={setMachineryForm} errors={{}} onClose={() => { setIsMachineryModalOpen(false); setEditingMachineryId(null); }} onSave={handleSaveMachinery} title={editingMachineryId ? 'Edit Hospital Machinery' : 'Add Hospital Machinery'} subtitle="Equipment & Utilities — Hospital Machinery">
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Basic Information</p><div className="grid grid-cols-2 gap-3">
            <TextField label="Equipment Name" field="equipmentName" form={machineryForm} setForm={setMachineryForm} required placeholder="e.g. Dräger Evita V800 Ventilator" />
            <SelectField label="Equipment Category" field="equipmentCategory" form={machineryForm} setForm={setMachineryForm} options={MACHINE_CATEGORIES} required />
            <SelectField label="Department" field="department" form={machineryForm} setForm={setMachineryForm} options={HOSPITAL_DEPARTMENTS} required />
            <TextField label="Location" field="location" form={machineryForm} setForm={setMachineryForm} required placeholder="e.g. ICU-VENT-01" />
            <TextField label="Manufacturer" field="manufacturer" form={machineryForm} setForm={setMachineryForm} placeholder="e.g. Dräger" />
            <TextField label="Model Number" field="modelNumber" form={machineryForm} setForm={setMachineryForm} placeholder="e.g. Evita V800" />
            <TextField label="Serial Number" field="serialNumber" form={machineryForm} setForm={setMachineryForm} placeholder="e.g. DRG-2021-001" />
            <TextField label="Asset Tag" field="assetTag" form={machineryForm} setForm={setMachineryForm} placeholder="e.g. AST-HM-001" />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Dates & Maintenance</p><div className="grid grid-cols-2 gap-3">
            <DateField label="Purchase Date" field="purchaseDate" form={machineryForm} setForm={setMachineryForm} required />
            <DateField label="Warranty Expiry" field="warrantyExpiry" form={machineryForm} setForm={setMachineryForm} />
            <DateField label="Last Preventive Maintenance" field="lastPreventiveMaintenance" form={machineryForm} setForm={setMachineryForm} />
            <DateField label="Next Preventive Maintenance" field="nextPreventiveMaintenance" form={machineryForm} setForm={setMachineryForm} />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Condition & Status</p><div className="grid grid-cols-2 gap-3">
            <SelectField label="Equipment Condition" field="equipmentCondition" form={machineryForm} setForm={setMachineryForm} options={MACHINE_CONDITIONS} required />
            <SelectField label="Equipment Status" field="equipmentStatus" form={machineryForm} setForm={setMachineryForm} options={MACHINE_STATUSES} required />
            <TextField label="Vendor" field="vendor" form={machineryForm} setForm={setMachineryForm} />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Remarks</p>
            <div className="grid grid-cols-1 gap-3">
              <textarea value={machineryForm.remarks || ''} onChange={(e) => setMachineryForm({ ...machineryForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none" placeholder="Additional remarks..." />
            </div>
          </div>
        </Modal>
      )}
      {isGasModalOpen && (
        <Modal hospital={hospital} isOpen={isGasModalOpen} editingRecord={!!editingGasId} form={gasForm} setForm={setGasForm} errors={{}} onClose={() => { setIsGasModalOpen(false); setEditingGasId(null); }} onSave={handleSaveGas} title={editingGasId ? 'Edit Gas Pipeline' : 'Add Gas Pipeline'} subtitle="Equipment & Utilities — Gas Pipeline / Medical Gas Plant">
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Supply Details</p><div className="grid grid-cols-2 gap-3">
            <SelectField label="Gas Type" field="gasType" form={gasForm} setForm={setGasForm} options={GAS_TYPES} required />
            <SelectField label="Department" field="department" form={gasForm} setForm={setGasForm} options={HOSPITAL_DEPARTMENTS} required />
            <TextField label="Supply Source" field="supplySource" form={gasForm} setForm={setGasForm} required placeholder="e.g. Manifold A" />
            <TextField label="Pressure Reading (bar)" field="pressureReading" form={gasForm} setForm={setGasForm} required placeholder="e.g. 4.2" />
            <TextField label="Engineer" field="engineer" form={gasForm} setForm={setGasForm} placeholder="e.g. Er. Anil Kumar" />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Status & Compliance</p><div className="grid grid-cols-2 gap-3">
            <SelectField label="Alarm Status" field="alarmStatus" form={gasForm} setForm={setGasForm} options={ALARM_STATUSES} />
            <SelectField label="Pipeline Status" field="pipelineStatus" form={gasForm} setForm={setGasForm} options={PIPELINE_STATUSES} required />
            <SelectField label="Compliance Status" field="complianceStatus" form={gasForm} setForm={setGasForm} options={COMPLIANCE_STATUSES} required />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Inspection</p><div className="grid grid-cols-2 gap-3">
            <DateField label="Inspection Date" field="inspectionDate" form={gasForm} setForm={setGasForm} />
            <DateField label="Next Inspection Date" field="nextInspectionDate" form={gasForm} setForm={setGasForm} />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Remarks</p>
            <div className="grid grid-cols-1 gap-3">
              <textarea value={gasForm.remarks || ''} onChange={(e) => setGasForm({ ...gasForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none" placeholder="Additional remarks..." />
            </div>
          </div>
        </Modal>
      )}
      {isStpModalOpen && (
        <Modal hospital={hospital} isOpen={isStpModalOpen} editingRecord={!!editingStpId} form={stpForm} setForm={setStpForm} errors={{}} onClose={() => { setIsStpModalOpen(false); setEditingStpId(null); }} onSave={handleSaveStp} title={editingStpId ? 'Edit STP/ETP' : 'Add STP/ETP'} subtitle="Equipment & Utilities — STP / ETP Monitoring">
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reading Details</p><div className="grid grid-cols-2 gap-3">
            <SelectField label="Plant Type" field="plantType" form={stpForm} setForm={setStpForm} options={PLANT_TYPES} required />
            <DateField label="Reading Date" field="readingDate" form={stpForm} setForm={setStpForm} required />
            <TextField label="Operator" field="operator" form={stpForm} setForm={setStpForm} required placeholder="e.g. Ravi Sharma" />
            <TextField label="pH Level" field="phLevel" form={stpForm} setForm={setStpForm} placeholder="e.g. 7.2" />
            <TextField label="BOD (mg/L)" field="bod" form={stpForm} setForm={setStpForm} placeholder="e.g. 18" />
            <TextField label="COD (mg/L)" field="cod" form={stpForm} setForm={setStpForm} placeholder="e.g. 120" />
            <TextField label="TDS (mg/L)" field="tds" form={stpForm} setForm={setStpForm} placeholder="e.g. 600" />
            <TextField label="Flow Rate (m³/day)" field="flowRate" form={stpForm} setForm={setStpForm} placeholder="e.g. 45" />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Quality & Compliance</p><div className="grid grid-cols-2 gap-3">
            <SelectField label="Water Quality" field="waterQuality" form={stpForm} setForm={setStpForm} options={WATER_QUALITY} required />
            <SelectField label="Compliance Status" field="complianceStatus" form={stpForm} setForm={setStpForm} options={COMPLIANCE_STATUSES} required />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Remarks</p>
            <div className="grid grid-cols-1 gap-3">
              <textarea value={stpForm.remarks || ''} onChange={(e) => setStpForm({ ...stpForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none" placeholder="Additional remarks..." />
            </div>
          </div>
        </Modal>
      )}
      {isElectricalModalOpen && (
        <Modal hospital={hospital} isOpen={isElectricalModalOpen} editingRecord={!!editingElectricalId} form={electricalForm} setForm={setElectricalForm} errors={electricalErrors} onClose={() => { setIsElectricalModalOpen(false); setEditingElectricalId(null); }} onSave={handleSaveElectrical} title={editingElectricalId ? 'Edit Electrical Safety' : 'Add Electrical Safety'} subtitle="Safety Compliance — Electrical Safety">
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Inspection Details</p><div className="grid grid-cols-2 gap-3">
            <SelectField label="Department" field="department" form={electricalForm} setForm={setElectricalForm} options={HOSPITAL_DEPARTMENTS} required />
            <TextField label="Location" field="location" form={electricalForm} setForm={setElectricalForm} required placeholder="e.g. ICU-PNL-01" />
            <TextField label="Equipment" field="equipment" form={electricalForm} setForm={setElectricalForm} required placeholder="e.g. Main LT Panel" />
            <TextField label="Engineer" field="engineer" form={electricalForm} setForm={setElectricalForm} required placeholder="e.g. Er. Anil Kumar" />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">System Status</p><div className="grid grid-cols-2 gap-3">
            <SelectField label="Earthing Status" field="earthingStatus" form={electricalForm} setForm={setElectricalForm} options={EARTHING_STATUSES} required />
            <SelectField label="Panel Condition" field="panelCondition" form={electricalForm} setForm={setElectricalForm} options={PANEL_CONDITIONS} required />
            <SelectField label="Generator Status" field="generatorStatus" form={electricalForm} setForm={setElectricalForm} options={POWER_STATUSES} />
            <SelectField label="UPS Status" field="upsStatus" form={electricalForm} setForm={setElectricalForm} options={POWER_STATUSES} />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Readings & Result</p><div className="grid grid-cols-2 gap-3">
            <TextField label="Voltage Reading (V)" field="voltageReading" form={electricalForm} setForm={setElectricalForm} required placeholder="e.g. 230" />
            <TextField label="Current Reading (A)" field="currentReading" form={electricalForm} setForm={setElectricalForm} required placeholder="e.g. 45" />
            <SelectField label="Inspection Result" field="inspectionResult" form={electricalForm} setForm={setElectricalForm} options={COMPLIANCE_STATUSES} required />
            <TextField label="Observation" field="observation" form={electricalForm} setForm={setElectricalForm} placeholder="e.g. Earthing fault detected" />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Schedule & Remarks</p><div className="grid grid-cols-2 gap-3">
            <DateField label="Inspection Date" field="inspectionDate" form={electricalForm} setForm={setElectricalForm} required />
            <DateField label="Next Inspection Date" field="nextInspectionDate" form={electricalForm} setForm={setElectricalForm} />
            <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
              <textarea value={electricalForm.remarks || ''} onChange={(e) => setElectricalForm({ ...electricalForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none" placeholder="Additional remarks..." />
            </div>
          </div></div>
        </Modal>
      )}
      {isFireModalOpen && (
        <Modal hospital={hospital} isOpen={isFireModalOpen} editingRecord={!!editingFireId} form={fireForm} setForm={setFireForm} errors={fireErrors} onClose={() => { setIsFireModalOpen(false); setEditingFireId(null); }} onSave={handleSaveFire} title={editingFireId ? 'Edit Fire Safety' : 'Add Fire Safety'} subtitle="Safety Compliance — Fire Safety">
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Inspection Details</p><div className="grid grid-cols-2 gap-3">
            <SelectField label="Department" field="department" form={fireForm} setForm={setFireForm} options={HOSPITAL_DEPARTMENTS} required />
            <TextField label="Fire Extinguisher ID" field="fireExtinguisherId" form={fireForm} setForm={setFireForm} required placeholder="e.g. FE-ICU-01" />
            <SelectField label="Equipment Type" field="equipmentType" form={fireForm} setForm={setFireForm} options={FIRE_EQUIPMENT_TYPES} required />
            <TextField label="Inspector" field="inspector" form={fireForm} setForm={setFireForm} required placeholder="e.g. Insp. Ramesh" />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">System Checks</p><div className="grid grid-cols-2 gap-3">
            <SelectField label="Fire Alarm Status" field="fireAlarmStatus" form={fireForm} setForm={setFireForm} options={FIRE_SYSTEM_STATUSES} />
            <SelectField label="Hydrant Status" field="hydrantStatus" form={fireForm} setForm={setFireForm} options={FIRE_SYSTEM_STATUSES} />
            <SelectField label="Sprinkler Status" field="sprinklerStatus" form={fireForm} setForm={setFireForm} options={FIRE_SYSTEM_STATUSES} />
            <SelectField label="Emergency Exit Status" field="emergencyExitStatus" form={fireForm} setForm={setFireForm} options={FIRE_SYSTEM_STATUSES} />
            <SelectField label="Fire Drill Conducted" field="fireDrillConducted" form={fireForm} setForm={setFireForm} options={YES_NO_OPTIONS} />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Result & Schedule</p><div className="grid grid-cols-2 gap-3">
            <SelectField label="Compliance Status" field="complianceStatus" form={fireForm} setForm={setFireForm} options={COMPLIANCE_STATUSES} required />
            <TextField label="Observation" field="observation" form={fireForm} setForm={setFireForm} placeholder="e.g. Fire alarm panel fault" />
            <DateField label="Inspection Date" field="inspectionDate" form={fireForm} setForm={setFireForm} required />
            <DateField label="Next Inspection Date" field="nextInspectionDate" form={fireForm} setForm={setFireForm} />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Remarks</p>
            <div className="grid grid-cols-1 gap-3">
              <textarea value={fireForm.remarks || ''} onChange={(e) => setFireForm({ ...fireForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none" placeholder="Additional remarks..." />
            </div>
          </div>
        </Modal>
      )}
      {isBiomedicalModalOpen && (
        <Modal hospital={hospital} isOpen={isBiomedicalModalOpen} editingRecord={!!editingBiomedicalId} form={biomedicalForm} setForm={setBiomedicalForm} errors={biomedicalErrors} onClose={() => { setIsBiomedicalModalOpen(false); setEditingBiomedicalId(null); }} onSave={handleSaveBiomedical} title={editingBiomedicalId ? 'Edit Biomedical Waste' : 'Add Biomedical Waste'} subtitle="Safety Compliance — Biomedical Waste Management">
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Record Details</p><div className="grid grid-cols-2 gap-3">
            <SelectField label="Department" field="department" form={biomedicalForm} setForm={setBiomedicalForm} options={HOSPITAL_DEPARTMENTS} required />
            <SelectField label="Waste Category" field="wasteCategory" form={biomedicalForm} setForm={setBiomedicalForm} options={WASTE_CATEGORIES} required />
            <TextField label="Collected By" field="collectedBy" form={biomedicalForm} setForm={setBiomedicalForm} required placeholder="e.g. Raju Patil" />
            <TextField label="Disposal Vendor" field="disposalVendor" form={biomedicalForm} setForm={setBiomedicalForm} required placeholder="e.g. BioCare Disposal" />
            <TextField label="Weight (kg)" field="weight" form={biomedicalForm} setForm={setBiomedicalForm} required placeholder="e.g. 45" />
            <TextField label="Manifest Number" field="manifestNumber" form={biomedicalForm} setForm={setBiomedicalForm} required placeholder="e.g. BM-2026-001" />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Compliance Checks</p><div className="grid grid-cols-2 gap-3">
            <SelectField label="Segregation Status" field="segregationStatus" form={biomedicalForm} setForm={setBiomedicalForm} options={SEGREGATION_STATUSES} required />
            <SelectField label="Storage Status" field="storageStatus" form={biomedicalForm} setForm={setBiomedicalForm} options={SEGREGATION_STATUSES} required />
            <SelectField label="Transportation Status" field="transportationStatus" form={biomedicalForm} setForm={setBiomedicalForm} options={SEGREGATION_STATUSES} required />
            <SelectField label="Compliance Status" field="complianceStatus" form={biomedicalForm} setForm={setBiomedicalForm} options={COMPLIANCE_STATUSES} required />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Observation & Remarks</p><div className="grid grid-cols-2 gap-3">
            <TextField label="Observation" field="observation" form={biomedicalForm} setForm={setBiomedicalForm} placeholder="e.g. Sharps mixed with general waste" />
            <DateField label="Collection Date" field="collectionDate" form={biomedicalForm} setForm={setBiomedicalForm} required />
            <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
              <textarea value={biomedicalForm.remarks || ''} onChange={(e) => setBiomedicalForm({ ...biomedicalForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none" placeholder="Additional remarks..." />
            </div>
          </div></div>
        </Modal>
      )}
      {isLaundryModalOpen && (
        <Modal hospital={hospital} isOpen={isLaundryModalOpen} editingRecord={!!editingLaundryId} form={laundryForm} setForm={setLaundryForm} errors={laundryErrors} onClose={() => { setIsLaundryModalOpen(false); setEditingLaundryId(null); }} onSave={handleSaveLaundry} title={editingLaundryId ? 'Edit Laundry Record' : 'Add Laundry Record'} subtitle="Support Services — Laundry Management">
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Collection Details</p><div className="grid grid-cols-2 gap-3">
            <SelectField label="Department" field="department" form={laundryForm} setForm={setLaundryForm} options={HOSPITAL_DEPARTMENTS} required />
            <DateField label="Collection Date" field="collectionDate" form={laundryForm} setForm={setLaundryForm} required />
            <TextField label="Collection Time" field="collectionTime" form={laundryForm} setForm={setLaundryForm} placeholder="e.g. 08:30" />
            <TextField label="Collected By" field="collectedBy" form={laundryForm} setForm={setLaundryForm} required placeholder="e.g. Raju Patil" />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Vendor & Process</p><div className="grid grid-cols-2 gap-3">
            <TextField label="Laundry Vendor" field="laundryVendor" form={laundryForm} setForm={setLaundryForm} required placeholder="e.g. CleanCare Laundry Services" />
            <SelectField label="Laundry Type" field="laundryType" form={laundryForm} setForm={setLaundryForm} options={LAUNDRY_TYPES} required />
            <SelectField label="Wash Cycle" field="washCycle" form={laundryForm} setForm={setLaundryForm} options={WASH_CYCLES} required />
            <div className="col-span-2 grid grid-cols-2 gap-3">
              <NumField label="Soiled Linen Quantity" field="soiledLinenQuantity" form={laundryForm} setForm={setLaundryForm} />
              <NumField label="Clean Linen Quantity" field="cleanLinenQuantity" form={laundryForm} setForm={setLaundryForm} />
            </div>
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Delivery & Status</p><div className="grid grid-cols-2 gap-3">
            <DateField label="Delivery Date" field="deliveryDate" form={laundryForm} setForm={setLaundryForm} required />
            <TextField label="Delivery Time" field="deliveryTime" form={laundryForm} setForm={setLaundryForm} placeholder="e.g. 16:00" />
            <SelectField label="Laundry Status" field="laundryStatus" form={laundryForm} setForm={setLaundryForm} options={LAUNDRY_STATUSES} required />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Remarks</p>
            <div className="grid grid-cols-1 gap-3">
              <textarea value={laundryForm.remarks || ''} onChange={(e) => setLaundryForm({ ...laundryForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none" placeholder="Additional remarks..." />
            </div>
          </div>
        </Modal>
      )}
      {isLinenModalOpen && (
        <Modal hospital={hospital} isOpen={isLinenModalOpen} editingRecord={!!editingLinenId} form={linenForm} setForm={setLinenForm} errors={linenErrors} onClose={() => { setIsLinenModalOpen(false); setEditingLinenId(null); }} onSave={handleSaveLinen} title={editingLinenId ? 'Edit Linen Inventory' : 'Add Linen Inventory'} subtitle="Support Services — Linen Inventory">
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Item Details</p><div className="grid grid-cols-2 gap-3">
            <SelectField label="Department" field="department" form={linenForm} setForm={setLinenForm} options={HOSPITAL_DEPARTMENTS} required />
            <SelectField label="Linen Category" field="linenCategory" form={linenForm} setForm={setLinenForm} options={LINEN_CATEGORIES} required />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Stock Levels</p><div className="grid grid-cols-2 gap-3">
            <NumField label="Quantity Available" field="quantityAvailable" form={linenForm} setForm={setLinenForm} />
            <NumField label="Minimum Stock" field="minimumStock" form={linenForm} setForm={setLinenForm} />
            <DateField label="Last Updated" field="lastUpdated" form={linenForm} setForm={setLinenForm} required />
            <SelectField label="Inventory Status" field="inventoryStatus" form={linenForm} setForm={setLinenForm} options={INVENTORY_STATUSES} required />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Remarks</p>
            <div className="grid grid-cols-1 gap-3">
              <textarea value={linenForm.remarks || ''} onChange={(e) => setLinenForm({ ...linenForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none" placeholder="Additional remarks..." />
            </div>
          </div>
        </Modal>
      )}
      {isCondemnModalOpen && (
        <Modal hospital={hospital} isOpen={isCondemnModalOpen} editingRecord={!!editingCondemnId} form={condemnForm} setForm={setCondemnForm} errors={condemnErrors} onClose={() => { setIsCondemnModalOpen(false); setEditingCondemnId(null); }} onSave={handleSaveCondemn} title={editingCondemnId ? 'Edit Condemnation Record' : 'Add Condemnation Record'} subtitle="Support Services — Linen Condemnation Register">
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Condemnation Details</p><div className="grid grid-cols-2 gap-3">
            <SelectField label="Department" field="department" form={condemnForm} setForm={setCondemnForm} options={HOSPITAL_DEPARTMENTS} required />
            <SelectField label="Linen Category" field="linenCategory" form={condemnForm} setForm={setCondemnForm} options={LINEN_CATEGORIES} required />
            <NumField label="Quantity" field="quantity" form={condemnForm} setForm={setCondemnForm} />
            <SelectField label="Reason" field="reason" form={condemnForm} setForm={setCondemnForm} options={CONDEMN_REASONS} required />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Approval & Disposal</p><div className="grid grid-cols-2 gap-3">
            <DateField label="Condemnation Date" field="condemnationDate" form={condemnForm} setForm={setCondemnForm} required />
            <TextField label="Approved By" field="approvedBy" form={condemnForm} setForm={setCondemnForm} required placeholder="e.g. Dr. Anil Mehta" />
            <SelectField label="Disposal Method" field="disposalMethod" form={condemnForm} setForm={setCondemnForm} options={DISPOSAL_METHODS} required />
            <SelectField label="Status" field="status" form={condemnForm} setForm={setCondemnForm} options={CONDEMN_STATUSES} required />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Remarks</p>
            <div className="grid grid-cols-1 gap-3">
              <textarea value={condemnForm.remarks || ''} onChange={(e) => setCondemnForm({ ...condemnForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none" placeholder="Additional remarks..." />
            </div>
          </div>
        </Modal>
      )}
      {isAuditModalOpen && (
        <Modal hospital={hospital} isOpen={isAuditModalOpen} editingRecord={!!editingAuditId} form={auditForm} setForm={setAuditForm} errors={auditErrors} onClose={() => { setIsAuditModalOpen(false); setEditingAuditId(null); }} onSave={handleSaveAudit} title={editingAuditId ? 'Edit Internal Audit' : 'Add Internal Audit'} subtitle="Internal Audit — General Safety Internal Audit">
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Audit Details</p><div className="grid grid-cols-2 gap-3">
            <DateField label="Audit Date" field="auditDate" form={auditForm} setForm={setAuditForm} required />
            <SelectField label="Department" field="department" form={auditForm} setForm={setAuditForm} options={HOSPITAL_DEPARTMENTS} required />
            <SelectField label="Audit Area" field="auditArea" form={auditForm} setForm={setAuditForm} options={AUDIT_AREAS} required />
            <TextField label="Auditor" field="auditor" form={auditForm} setForm={setAuditForm} required placeholder="e.g. Dr. Anil Mehta" />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Scoring & Result</p><div className="grid grid-cols-2 gap-3">
            <TextField label="Compliance Score (%)" field="complianceScore" form={auditForm} setForm={setAuditForm} required placeholder="e.g. 92" />
            <SelectField label="Audit Result" field="auditResult" form={auditForm} setForm={setAuditForm} options={AUDIT_RESULTS} required />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Findings & Recommendations</p><div className="grid grid-cols-1 gap-3">
            <TextField label="Major Findings" field="majorFindings" form={auditForm} setForm={setAuditForm} required placeholder="e.g. Fire exit blocked" />
            <TextField label="Minor Findings" field="minorFindings" form={auditForm} setForm={setAuditForm} required placeholder="e.g. Documentation delay" />
            <TextField label="Recommendations" field="recommendations" form={auditForm} setForm={setAuditForm} placeholder="e.g. Schedule immediate calibration" />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Schedule & Remarks</p><div className="grid grid-cols-2 gap-3">
            <DateField label="Next Audit Date" field="nextAuditDate" form={auditForm} setForm={setAuditForm} required />
            <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
              <textarea value={auditForm.remarks || ''} onChange={(e) => setAuditForm({ ...auditForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none" placeholder="Additional remarks..." />
            </div>
          </div></div>
        </Modal>
      )}
      {isCapaModalOpen && (
        <Modal hospital={hospital} isOpen={isCapaModalOpen} editingRecord={!!editingCapaId} form={capaForm} setForm={setCapaForm} errors={capaErrors} onClose={() => { setIsCapaModalOpen(false); setEditingCapaId(null); }} onSave={handleSaveCapa} title={editingCapaId ? 'Edit CAPA' : 'Add CAPA'} subtitle="Internal Audit — CAPA Tracker">
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">CAPA Details</p><div className="grid grid-cols-2 gap-3">
            <SelectField label="Linked Audit" field="linkedAudit" form={capaForm} setForm={setCapaForm} options={internalAudits.map((a) => a.id)} required />
            <SelectField label="Department" field="department" form={capaForm} setForm={setCapaForm} options={HOSPITAL_DEPARTMENTS} required />
            <TextField label="Finding" field="finding" form={capaForm} setForm={setCapaForm} required placeholder="e.g. Fire exit blocked" />
            <SelectField label="Risk Level" field="riskLevel" form={capaForm} setForm={setCapaForm} options={CAPA_RISK_LEVELS} required />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Assignment & Dates</p><div className="grid grid-cols-2 gap-3">
            <TextField label="Assigned To" field="assignedTo" form={capaForm} setForm={setCapaForm} required placeholder="e.g. Er. Anil Kumar" />
            <DateField label="Target Date" field="targetDate" form={capaForm} setForm={setCapaForm} required />
            <DateField label="Completion Date" field="completionDate" form={capaForm} setForm={setCapaForm} />
            <SelectField label="Status" field="status" form={capaForm} setForm={setCapaForm} options={CAPA_STATUSES} required />
          </div></div>
          <div><p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Effectiveness & Remarks</p><div className="grid grid-cols-2 gap-3">
            <SelectField label="Effectiveness Verified" field="effectivenessVerified" form={capaForm} setForm={setCapaForm} options={CAPA_EFFECTIVENESS} required />
            <div className="col-span-2"><label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
              <textarea value={capaForm.remarks || ''} onChange={(e) => setCapaForm({ ...capaForm, remarks: e.target.value })} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none" placeholder="Additional remarks..." />
            </div>
          </div></div>
        </Modal>
      )}
    </div>
  );
};

export default GeneralSafetyComplianceWorkspace;
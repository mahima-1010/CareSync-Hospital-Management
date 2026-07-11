import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  ChevronLeft,
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarClock,
  Star,
  ClipboardCheck,
  BarChart3,
  Plus,
  Edit3,
  Trash2,
  X,
  Search,
  FileDown,
  Download,
  Printer,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthKeyToLabel = (key) => {
  if (!key || key.length < 7) return key || '';
  const m = parseInt(key.slice(5, 7), 10);
  const y = key.slice(2, 4);
  if (isNaN(m) || m < 1 || m > 12) return key;
  return `${MONTH_LABELS[m - 1]} '${y}`;
};

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'employee_master', label: 'Employee Master', icon: Users },
  { id: 'training', label: 'Training & Competency', icon: GraduationCap },
  { id: 'attendance', label: 'Attendance & Leave', icon: CalendarClock },
  { id: 'perf_review', label: 'Performance Review', icon: Star },
  { id: 'goal_tracker', label: 'Goal Tracker', icon: Star },
  { id: 'promotion', label: 'Promotion & Career Progression', icon: Star },
  { id: 'audit', label: 'Internal Audit', icon: ClipboardCheck },
  { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
];

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];

const departmentEmployeesData = [
  { name: 'Medical', value: 120 },
  { name: 'Nursing', value: 210 },
  { name: 'Allied Health', value: 90 },
  { name: 'Administration', value: 60 },
  { name: 'Support', value: 45 },
];

const categoryDistributionData = [
  { name: 'Doctors', value: 80 },
  { name: 'Nurses', value: 210 },
  { name: 'Allied Health', value: 90 },
  { name: 'Administrative', value: 60 },
];

const joiningTrendData = [
  { name: 'Jan', joined: 12 },
  { name: 'Feb', joined: 9 },
  { name: 'Mar', joined: 14 },
  { name: 'Apr', joined: 8 },
  { name: 'May', joined: 11 },
  { name: 'Jun', joined: 13 },
];

const trainingComplianceData = [
  { name: 'Jan', compliance: 86 },
  { name: 'Feb', compliance: 88 },
  { name: 'Mar', compliance: 90 },
  { name: 'Apr', compliance: 91 },
  { name: 'May', compliance: 93 },
  { name: 'Jun', compliance: 94 },
];

const leaveStatusData = [
  { name: 'Approved', value: 18 },
  { name: 'Pending', value: 5 },
  { name: 'Rejected', value: 2 },
  { name: 'Availed', value: 27 },
];

const hrComplianceTrendData = [
  { name: 'Jan', compliance: 88 },
  { name: 'Feb', compliance: 89 },
  { name: 'Mar', compliance: 91 },
  { name: 'Apr', compliance: 92 },
  { name: 'May', compliance: 93 },
  { name: 'Jun', compliance: 94 },
];

const monthlySummaryData = [
  { department: 'Cardiology', employees: 45, trainingsCompleted: 38, leaveRequests: 3, compliance: 96, status: 'Good' },
  { department: 'Nursing', employees: 210, trainingsCompleted: 180, leaveRequests: 12, compliance: 92, status: 'Good' },
  { department: 'Radiology', employees: 30, trainingsCompleted: 26, leaveRequests: 2, compliance: 90, status: 'Good' },
  { department: 'Pharmacy', employees: 25, trainingsCompleted: 22, leaveRequests: 1, compliance: 88, status: 'Watch' },
  { department: 'Administration', employees: 60, trainingsCompleted: 50, leaveRequests: 4, compliance: 95, status: 'Good' },
];

const kpiCards = [
  { label: 'Total Employees', value: '525', color: 'text-blue-600' },
  { label: 'Doctors', value: '80', color: 'text-emerald-600' },
  { label: 'Nurses', value: '210', color: 'text-sky-600' },
  { label: 'Allied Health Professionals', value: '90', color: 'text-violet-600' },
  { label: 'Administrative Staff', value: '60', color: 'text-indigo-600' },
  { label: 'Active Employees', value: '498', color: 'text-teal-600' },
  { label: 'Employees on Leave', value: '27', color: 'text-amber-600' },
  { label: 'Overall HR Compliance %', value: '94%', color: 'text-rose-600' },
];

const STATUS_BADGE_SUMMARY = {
  Good: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Watch: 'bg-amber-50 text-amber-700 border-amber-200',
  Critical: 'bg-rose-50 text-rose-700 border-rose-200',
};

const PlaceholderTab = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[320px] bg-white border border-slate-200 rounded-2xl shadow-sm p-10 text-center">
    <span className="text-3xl mb-4">🚧</span>
    <h2 className="text-base font-extrabold text-slate-800 mb-2">{title}</h2>
    <p className="text-xs text-slate-400 font-medium">
      This module will be implemented in the next phase.
    </p>
  </div>
);

const DashboardTab = ({ hospital }) => (
  <div className="space-y-5">
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">HR Records Workspace</span>
      <h1 className="text-xl font-extrabold text-slate-900 mt-1">HR Records — Dashboard</h1>
      <p className="text-xs text-slate-500 mt-2 max-w-2xl leading-relaxed">
        Centralised hospital human resource management system for employee records, training and competency, attendance and leave, performance appraisal, and internal audit in alignment with NABH standards.
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
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Department-wise Employees</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={departmentEmployeesData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                  {departmentEmployeesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '9px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Employee Category Distribution</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryDistributionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Bar dataKey="value" fill={hospital?.themeColor || '#3b82f6'} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Monthly Joining Trend</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={joiningTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Bar dataKey="joined" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Training Compliance Trend</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trainingComplianceData}>
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
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">Leave Status Distribution</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={leaveStatusData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                  {leaveStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '9px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-700 mb-4">HR Compliance Trend</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hrComplianceTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                <YAxis style={{ fontSize: '9px' }} tickLine={false} axisLine={false} domain={[80, 100]} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="compliance" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200">
        <h3 className="text-xs font-bold text-slate-800">Monthly HR Summary</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['Department', 'Employees', 'Trainings Completed', 'Leave Requests', 'Compliance %', 'Status'].map((h) => (
                <th key={h} className="px-4 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {monthlySummaryData.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-4 py-2 font-semibold text-slate-700">{row.department}</td>
                <td className="px-4 py-2 text-slate-600">{row.employees}</td>
                <td className="px-4 py-2 text-blue-600 font-bold">{row.trainingsCompleted}</td>
                <td className="px-4 py-2 text-amber-600 font-bold">{row.leaveRequests}</td>
                <td className="px-4 py-2 text-emerald-600 font-bold">{row.compliance}%</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_SUMMARY[row.status] || STATUS_BADGE_SUMMARY.Good}`}>{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
        <span className="text-[9px] text-slate-400 font-medium">
          Showing {monthlySummaryData.length} departments
        </span>
      </div>
    </div>
  </div>
);

const LS_KEY_EMPLOYEES = 'hr_employee_master';

const GENDERS = ['Male', 'Female', 'Other'];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const MARITAL_STATUS = ['Single', 'Married', 'Divorced', 'Widowed'];
const DEPARTMENTS = [
  'Medical', 'Nursing', 'Pharmacy', 'Radiology', 'Laboratory', 'Cardiology',
  'Neurology', 'Orthopaedics', 'Pediatrics', 'General Medicine', 'Operation Theatre',
  'ICU', 'Emergency', 'Nephrology', 'OBG', 'Administration', 'HR', 'IT',
  'Biomedical Engineering', 'Housekeeping',
];
const DESIGNATIONS = [
  'Consultant', 'Senior Consultant', 'Resident Medical Officer', 'Medical Officer',
  'Staff Nurse', 'Senior Staff Nurse', 'Nursing Superintendent',
  'Lab Technician', 'Radiology Technician', 'OT Technician', 'Dialysis Technician',
  'Pharmacist', 'Senior Pharmacist', 'Admin Officer', 'Receptionist',
  'HR Executive', 'HR Manager', 'Biomedical Engineer', 'IT Administrator', 'Housekeeping Supervisor',
];
const EMPLOYEE_CATEGORIES = ['Doctor', 'Nurse', 'Technician', 'Administrative', 'Support Staff', 'Management'];
const EMPLOYMENT_TYPES = ['Permanent', 'Contract', 'Visiting Consultant', 'Intern', 'Trainee'];
const EMPLOYMENT_STATUSES = ['Active', 'On Leave', 'Resigned', 'Suspended', 'Retired'];
const SHIFTS = ['Day', 'Evening', 'Night', 'Rotational'];

const STATUS_BADGE_EMP = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'On Leave': 'bg-amber-50 text-amber-700 border-amber-200',
  Resigned: 'bg-rose-50 text-rose-700 border-rose-200',
  Suspended: 'bg-rose-50 text-rose-700 border-rose-200',
  Retired: 'bg-slate-100 text-slate-600 border-slate-200',
};

const EMPLOYEE_DOCUMENTS = [
  'Aadhaar',
  'PAN',
  'Resume',
  'Qualification Certificate',
  'Registration Certificate',
  'Appointment Letter',
  'Experience Certificate',
];

const calcGross = (basic, hra, other) =>
  (Number(basic) || 0) + (Number(hra) || 0) + (Number(other) || 0);

const SEED_EMPLOYEES = [
  { id: 'emp-001', employeeCode: 'EMP-0001', fullName: 'Dr. Arvind Menon', gender: 'Male', dateOfBirth: '1979-04-12', mobileNumber: '9845012301', email: 'arvind.menon@carehosp.in', bloodGroup: 'B+', maritalStatus: 'Married', photograph: '', department: 'Cardiology', designation: 'Consultant', employeeCategory: 'Doctor', employmentType: 'Permanent', joiningDate: '2008-06-01', shift: 'Day', reportingManager: 'Dr. Meera Nair', employmentStatus: 'Active', qualification: 'MBBS MD (Cardiology)', experience: 17, specialization: 'Interventional Cardiology', medicalRegistrationNumber: 'KMC12345', registrationValidTill: '2027-05-30', basicSalary: 250000, hra: 50000, otherAllowances: 40000, grossSalary: 340000, bankName: 'SBI', accountNumber: '1029384756', ifscCode: 'SBIN0001234', emergencyContactName: 'Lakshmi Menon', emergencyRelationship: 'Spouse', emergencyContactNumber: '9845012302' },
  { id: 'emp-002', employeeCode: 'EMP-0002', fullName: 'Dr. Priya Nair', gender: 'Female', dateOfBirth: '1981-09-23', mobileNumber: '9845012303', email: 'priya.nair@carehosp.in', bloodGroup: 'O+', maritalStatus: 'Married', photograph: '', department: 'Neurology', designation: 'Senior Consultant', employeeCategory: 'Doctor', employmentType: 'Permanent', joiningDate: '2010-02-15', shift: 'Day', reportingManager: 'Dr. Anil Kumar', employmentStatus: 'Active', qualification: 'MBBS MD DM', experience: 14, specialization: 'Epilepsy & Stroke', medicalRegistrationNumber: 'KMC23456', registrationValidTill: '2026-12-31', basicSalary: 220000, hra: 44000, otherAllowances: 36000, grossSalary: 300000, bankName: 'Canara', accountNumber: '2039485761', ifscCode: 'CNRB0002345', emergencyContactName: 'Rajesh Nair', emergencyRelationship: 'Spouse', emergencyContactNumber: '9845012304' },
  { id: 'emp-003', employeeCode: 'EMP-0003', fullName: 'Dr. Suresh Pillai', gender: 'Male', dateOfBirth: '1977-01-05', mobileNumber: '9845012305', email: 'suresh.pillai@carehosp.in', bloodGroup: 'A+', maritalStatus: 'Married', photograph: '', department: 'Orthopaedics', designation: 'Consultant', employeeCategory: 'Doctor', employmentType: 'Permanent', joiningDate: '2006-08-20', shift: 'Day', reportingManager: 'Dr. Anil Kumar', employmentStatus: 'Active', qualification: 'MBBS MS Ortho', experience: 19, specialization: 'Joint Replacement', medicalRegistrationNumber: 'KMC34567', registrationValidTill: '2027-08-19', basicSalary: 210000, hra: 42000, otherAllowances: 38000, grossSalary: 290000, bankName: 'HDFC', accountNumber: '3049586712', ifscCode: 'HDFC0003456', emergencyContactName: 'Meera Pillai', emergencyRelationship: 'Spouse', emergencyContactNumber: '9845012306' },
  { id: 'emp-004', employeeCode: 'EMP-0004', fullName: 'Dr. Karthik Reddy', gender: 'Male', dateOfBirth: '1986-11-30', mobileNumber: '9845012307', email: 'karthik.reddy@carehosp.in', bloodGroup: 'B+', maritalStatus: 'Single', photograph: '', department: 'Pediatrics', designation: 'Resident Medical Officer', employeeCategory: 'Doctor', employmentType: 'Permanent', joiningDate: '2015-07-10', shift: 'Rotational', reportingManager: 'Dr. Anil Kumar', employmentStatus: 'Active', qualification: 'MBBS MD Pediatrics', experience: 9, specialization: 'Neonatal Care', medicalRegistrationNumber: 'KMC45678', registrationValidTill: '2028-06-30', basicSalary: 150000, hra: 30000, otherAllowances: 25000, grossSalary: 205000, bankName: 'Axis', accountNumber: '4059687123', ifscCode: 'UTIB0004567', emergencyContactName: 'Sunita Reddy', emergencyRelationship: 'Mother', emergencyContactNumber: '9845012308' },
  { id: 'emp-005', employeeCode: 'EMP-0005', fullName: 'Dr. Fatima Sheikh', gender: 'Female', dateOfBirth: '1983-06-18', mobileNumber: '9845012309', email: 'fatima.sheikh@carehosp.in', bloodGroup: 'AB+', maritalStatus: 'Married', photograph: '', department: 'General Medicine', designation: 'Medical Officer', employeeCategory: 'Doctor', employmentType: 'Permanent', joiningDate: '2012-03-01', shift: 'Day', reportingManager: 'Dr. Anil Kumar', employmentStatus: 'On Leave', qualification: 'MBBS', experience: 12, specialization: 'General Medicine', medicalRegistrationNumber: 'KMC56789', registrationValidTill: '2027-03-01', basicSalary: 160000, hra: 32000, otherAllowances: 28000, grossSalary: 220000, bankName: 'ICICI', accountNumber: '5069781234', ifscCode: 'ICIC0005678', emergencyContactName: 'Imran Sheikh', emergencyRelationship: 'Spouse', emergencyContactNumber: '9845012310' },
  { id: 'emp-006', employeeCode: 'EMP-0006', fullName: 'Deepa Nair', gender: 'Female', dateOfBirth: '1992-02-14', mobileNumber: '9845012311', email: 'deepa.nair@carehosp.in', bloodGroup: 'O+', maritalStatus: 'Married', photograph: '', department: 'ICU', designation: 'Staff Nurse', employeeCategory: 'Nurse', employmentType: 'Permanent', joiningDate: '2015-05-20', shift: 'Night', reportingManager: 'Nursing Superintendent', employmentStatus: 'Active', qualification: 'GNM', experience: 10, specialization: 'Critical Care', medicalRegistrationNumber: '', registrationValidTill: '', basicSalary: 28000, hra: 7000, otherAllowances: 5000, grossSalary: 40000, bankName: 'SBI', accountNumber: '6079812345', ifscCode: 'SBIN0006789', emergencyContactName: 'Rajeev Nair', emergencyRelationship: 'Spouse', emergencyContactNumber: '9845012312' },
  { id: 'emp-007', employeeCode: 'EMP-0007', fullName: 'Leela Thomas', gender: 'Female', dateOfBirth: '1990-07-09', mobileNumber: '9845012313', email: 'leela.thomas@carehosp.in', bloodGroup: 'B+', maritalStatus: 'Single', photograph: '', department: 'Medical Ward', designation: 'Staff Nurse', employeeCategory: 'Nurse', employmentType: 'Permanent', joiningDate: '2014-09-12', shift: 'Day', reportingManager: 'Nursing Superintendent', employmentStatus: 'Active', qualification: 'BSc Nursing', experience: 11, specialization: 'General Ward', medicalRegistrationNumber: '', registrationValidTill: '', basicSalary: 27000, hra: 6500, otherAllowances: 4500, grossSalary: 38000, bankName: 'Canara', accountNumber: '7089123456', ifscCode: 'CNRB0007890', emergencyContactName: 'Thomas K', emergencyRelationship: 'Father', emergencyContactNumber: '9845012314' },
  { id: 'emp-008', employeeCode: 'EMP-0008', fullName: 'Neha Singh', gender: 'Female', dateOfBirth: '1988-12-25', mobileNumber: '9845012315', email: 'neha.singh@carehosp.in', bloodGroup: 'A+', maritalStatus: 'Married', photograph: '', department: 'Surgical Ward', designation: 'Senior Staff Nurse', employeeCategory: 'Nurse', employmentType: 'Permanent', joiningDate: '2011-11-01', shift: 'Evening', reportingManager: 'Nursing Superintendent', employmentStatus: 'Active', qualification: 'GNM', experience: 13, specialization: 'Post-Op Care', medicalRegistrationNumber: '', registrationValidTill: '', basicSalary: 32000, hra: 8000, otherAllowances: 6000, grossSalary: 46000, bankName: 'HDFC', accountNumber: '8091234567', ifscCode: 'HDFC0008901', emergencyContactName: 'Vinod Singh', emergencyRelationship: 'Spouse', emergencyContactNumber: '9845012316' },
  { id: 'emp-009', employeeCode: 'EMP-0009', fullName: 'Shalini George', gender: 'Female', dateOfBirth: '1993-03-30', mobileNumber: '9845012317', email: 'shalini.george@carehosp.in', bloodGroup: 'O-', maritalStatus: 'Single', photograph: '', department: 'OBG', designation: 'Staff Nurse', employeeCategory: 'Nurse', employmentType: 'Contract', joiningDate: '2018-01-15', shift: 'Day', reportingManager: 'Nursing Superintendent', employmentStatus: 'Active', qualification: 'BSc Nursing', experience: 7, specialization: 'Labour Room', medicalRegistrationNumber: '', registrationValidTill: '', basicSalary: 26000, hra: 6000, otherAllowances: 4000, grossSalary: 36000, bankName: 'Axis', accountNumber: '9102345678', ifscCode: 'UTIB0009012', emergencyContactName: 'George M', emergencyRelationship: 'Father', emergencyContactNumber: '9845012318' },
  { id: 'emp-010', employeeCode: 'EMP-0010', fullName: 'Kavya Menon', gender: 'Female', dateOfBirth: '1991-05-17', mobileNumber: '9845012319', email: 'kavya.menon@carehosp.in', bloodGroup: 'B+', maritalStatus: 'Married', photograph: '', department: 'Emergency', designation: 'Staff Nurse', employeeCategory: 'Nurse', employmentType: 'Permanent', joiningDate: '2013-06-22', shift: 'Rotational', reportingManager: 'Nursing Superintendent', employmentStatus: 'Active', qualification: 'GNM', experience: 12, specialization: 'Trauma Care', medicalRegistrationNumber: '', registrationValidTill: '', basicSalary: 30000, hra: 7500, otherAllowances: 5500, grossSalary: 43000, bankName: 'ICICI', accountNumber: '1123456789', ifscCode: 'ICIC0001123', emergencyContactName: 'Arun Menon', emergencyRelationship: 'Spouse', emergencyContactNumber: '9845012320' },
  { id: 'emp-011', employeeCode: 'EMP-0011', fullName: 'Sunita Rao', gender: 'Female', dateOfBirth: '1980-10-08', mobileNumber: '9845012321', email: 'sunita.rao@carehosp.in', bloodGroup: 'AB+', maritalStatus: 'Married', photograph: '', department: 'Operation Theatre', designation: 'Nursing Superintendent', employeeCategory: 'Nurse', employmentType: 'Permanent', joiningDate: '2004-04-10', shift: 'Day', reportingManager: 'HR Manager', employmentStatus: 'Active', qualification: 'MSc Nursing', experience: 21, specialization: 'OT Management', medicalRegistrationNumber: '', registrationValidTill: '', basicSalary: 45000, hra: 11000, otherAllowances: 9000, grossSalary: 65000, bankName: 'SBI', accountNumber: '2134567890', ifscCode: 'SBIN0002134', emergencyContactName: 'Ravi Rao', emergencyRelationship: 'Spouse', emergencyContactNumber: '9845012322' },
  { id: 'emp-012', employeeCode: 'EMP-0012', fullName: 'Imran Khan', gender: 'Male', dateOfBirth: '1990-08-11', mobileNumber: '9845012323', email: 'imran.khan@carehosp.in', bloodGroup: 'B+', maritalStatus: 'Married', photograph: '', department: 'Laboratory', designation: 'Lab Technician', employeeCategory: 'Technician', employmentType: 'Permanent', joiningDate: '2013-02-18', shift: 'Day', reportingManager: 'Lab Manager', employmentStatus: 'Active', qualification: 'DMLT', experience: 12, specialization: 'Biochemistry', medicalRegistrationNumber: '', registrationValidTill: '', basicSalary: 22000, hra: 5000, otherAllowances: 3000, grossSalary: 30000, bankName: 'Canara', accountNumber: '3145678901', ifscCode: 'CNRB0003145', emergencyContactName: 'Nazia Khan', emergencyRelationship: 'Spouse', emergencyContactNumber: '9845012324' },
  { id: 'emp-013', employeeCode: 'EMP-0013', fullName: 'Arjun Das', gender: 'Male', dateOfBirth: '1989-04-03', mobileNumber: '9845012325', email: 'arjun.das@carehosp.in', bloodGroup: 'O+', maritalStatus: 'Single', photograph: '', department: 'Radiology', designation: 'Radiology Technician', employeeCategory: 'Technician', employmentType: 'Permanent', joiningDate: '2014-07-25', shift: 'Rotational', reportingManager: 'Radiology HOD', employmentStatus: 'Active', qualification: 'DRT', experience: 11, specialization: 'CT/MRI', medicalRegistrationNumber: '', registrationValidTill: '', basicSalary: 24000, hra: 5500, otherAllowances: 3500, grossSalary: 33000, bankName: 'HDFC', accountNumber: '4156789012', ifscCode: 'HDFC0004156', emergencyContactName: 'Das P', emergencyRelationship: 'Father', emergencyContactNumber: '9845012326' },
  { id: 'emp-014', employeeCode: 'EMP-0014', fullName: 'Sajan Mathew', gender: 'Male', dateOfBirth: '1987-09-19', mobileNumber: '9845012327', email: 'sajan.mathew@carehosp.in', bloodGroup: 'A+', maritalStatus: 'Married', photograph: '', department: 'Operation Theatre', designation: 'OT Technician', employeeCategory: 'Technician', employmentType: 'Permanent', joiningDate: '2012-10-05', shift: 'Rotational', reportingManager: 'OT Incharge', employmentStatus: 'Active', qualification: 'BSc OT Technology', experience: 13, specialization: 'Sterilization', medicalRegistrationNumber: '', registrationValidTill: '', basicSalary: 23000, hra: 5000, otherAllowances: 3000, grossSalary: 31000, bankName: 'Axis', accountNumber: '5167890123', ifscCode: 'UTIB0005167', emergencyContactName: 'Anju Mathew', emergencyRelationship: 'Spouse', emergencyContactNumber: '9845012328' },
  { id: 'emp-015', employeeCode: 'EMP-0015', fullName: 'Vinod Gupta', gender: 'Male', dateOfBirth: '1986-01-27', mobileNumber: '9845012329', email: 'vinod.gupta@carehosp.in', bloodGroup: 'B+', maritalStatus: 'Married', photograph: '', department: 'Nephrology', designation: 'Dialysis Technician', employeeCategory: 'Technician', employmentType: 'Permanent', joiningDate: '2011-03-14', shift: 'Day', reportingManager: 'Nephrology HOD', employmentStatus: 'Active', qualification: 'Dialysis Technology', experience: 14, specialization: 'Hemodialysis', medicalRegistrationNumber: '', registrationValidTill: '', basicSalary: 25000, hra: 5500, otherAllowances: 3500, grossSalary: 34000, bankName: 'ICICI', accountNumber: '6178901234', ifscCode: 'ICIC0006178', emergencyContactName: 'Pooja Gupta', emergencyRelationship: 'Spouse', emergencyContactNumber: '9845012330' },
  { id: 'emp-016', employeeCode: 'EMP-0016', fullName: 'Kavitha R', gender: 'Female', dateOfBirth: '1991-06-12', mobileNumber: '9845012331', email: 'kavitha.r@carehosp.in', bloodGroup: 'O+', maritalStatus: 'Married', photograph: '', department: 'Pharmacy', designation: 'Pharmacist', employeeCategory: 'Technician', employmentType: 'Permanent', joiningDate: '2014-05-09', shift: 'Day', reportingManager: 'Pharmacy HOD', employmentStatus: 'Active', qualification: 'BPharm', experience: 11, specialization: 'Dispensing', medicalRegistrationNumber: 'REG/PH/001', registrationValidTill: '2027-05-08', basicSalary: 26000, hra: 6000, otherAllowances: 4000, grossSalary: 36000, bankName: 'SBI', accountNumber: '7189012345', ifscCode: 'SBIN0007189', emergencyContactName: 'Ramesh', emergencyRelationship: 'Spouse', emergencyContactNumber: '9845012332' },
  { id: 'emp-017', employeeCode: 'EMP-0017', fullName: 'Anitha B', gender: 'Female', dateOfBirth: '1988-11-02', mobileNumber: '9845012333', email: 'anitha.b@carehosp.in', bloodGroup: 'B+', maritalStatus: 'Married', photograph: '', department: 'Pharmacy', designation: 'Senior Pharmacist', employeeCategory: 'Technician', employmentType: 'Permanent', joiningDate: '2010-08-17', shift: 'Day', reportingManager: 'Pharmacy HOD', employmentStatus: 'Active', qualification: 'MPharm', experience: 15, specialization: 'Clinical Pharmacy', medicalRegistrationNumber: 'REG/PH/002', registrationValidTill: '2028-07-15', basicSalary: 32000, hra: 8000, otherAllowances: 6000, grossSalary: 46000, bankName: 'Canara', accountNumber: '8190123456', ifscCode: 'CNRB0008190', emergencyContactName: 'Bharath', emergencyRelationship: 'Spouse', emergencyContactNumber: '9845012334' },
  { id: 'emp-018', employeeCode: 'EMP-0018', fullName: 'Mohammed F', gender: 'Male', dateOfBirth: '1992-03-21', mobileNumber: '9845012335', email: 'mohammed.f@carehosp.in', bloodGroup: 'A+', maritalStatus: 'Single', photograph: '', department: 'Pharmacy', designation: 'Pharmacist', employeeCategory: 'Technician', employmentType: 'Contract', joiningDate: '2017-09-01', shift: 'Day', reportingManager: 'Pharmacy HOD', employmentStatus: 'Active', qualification: 'BPharm', experience: 8, specialization: 'Inventory', medicalRegistrationNumber: 'REG/PH/003', registrationValidTill: '2026-11-30', basicSalary: 24000, hra: 5500, otherAllowances: 3500, grossSalary: 33000, bankName: 'HDFC', accountNumber: '9201234567', ifscCode: 'HDFC0009201', emergencyContactName: 'Firoz', emergencyRelationship: 'Father', emergencyContactNumber: '9845012336' },
  { id: 'emp-019', employeeCode: 'EMP-0019', fullName: 'Rahul Verma', gender: 'Male', dateOfBirth: '1985-07-14', mobileNumber: '9845012337', email: 'rahul.verma@carehosp.in', bloodGroup: 'B+', maritalStatus: 'Married', photograph: '', department: 'Administration', designation: 'Admin Officer', employeeCategory: 'Administrative', employmentType: 'Permanent', joiningDate: '2009-12-01', shift: 'Day', reportingManager: 'CEO', employmentStatus: 'Active', qualification: 'BBA', experience: 16, specialization: 'Front Office', medicalRegistrationNumber: '', registrationValidTill: '', basicSalary: 35000, hra: 8000, otherAllowances: 7000, grossSalary: 50000, bankName: 'Axis', accountNumber: '1212345678', ifscCode: 'UTIB0001212', emergencyContactName: 'Neha Verma', emergencyRelationship: 'Spouse', emergencyContactNumber: '9845012338' },
  { id: 'emp-020', employeeCode: 'EMP-0020', fullName: 'Pooja Sharma', gender: 'Female', dateOfBirth: '1994-02-09', mobileNumber: '9845012339', email: 'pooja.sharma@carehosp.in', bloodGroup: 'O+', maritalStatus: 'Single', photograph: '', department: 'Administration', designation: 'Receptionist', employeeCategory: 'Administrative', employmentType: 'Contract', joiningDate: '2019-04-22', shift: 'Day', reportingManager: 'Admin Officer', employmentStatus: 'Resigned', qualification: 'BA', experience: 6, specialization: 'Reception', medicalRegistrationNumber: '', registrationValidTill: '', basicSalary: 18000, hra: 4000, otherAllowances: 2000, grossSalary: 24000, bankName: 'ICICI', accountNumber: '2223456789', ifscCode: 'ICIC0002223', emergencyContactName: 'Sharma J', emergencyRelationship: 'Father', emergencyContactNumber: '9845012340' },
  { id: 'emp-021', employeeCode: 'EMP-0021', fullName: 'Sneha Iyer', gender: 'Female', dateOfBirth: '1992-09-25', mobileNumber: '9845012341', email: 'sneha.iyer@carehosp.in', bloodGroup: 'B+', maritalStatus: 'Married', photograph: '', department: 'HR', designation: 'HR Executive', employeeCategory: 'Administrative', employmentType: 'Permanent', joiningDate: '2016-06-15', shift: 'Day', reportingManager: 'HR Manager', employmentStatus: 'Active', qualification: 'MBA HR', experience: 9, specialization: 'Recruitment', medicalRegistrationNumber: '', registrationValidTill: '', basicSalary: 30000, hra: 7000, otherAllowances: 5000, grossSalary: 42000, bankName: 'SBI', accountNumber: '3234567890', ifscCode: 'SBIN0003234', emergencyContactName: 'Kiran Iyer', emergencyRelationship: 'Spouse', emergencyContactNumber: '9845012342' },
  { id: 'emp-022', employeeCode: 'EMP-0022', fullName: 'Mahesh Rao', gender: 'Male', dateOfBirth: '1983-12-03', mobileNumber: '9845012343', email: 'mahesh.rao@carehosp.in', bloodGroup: 'A+', maritalStatus: 'Married', photograph: '', department: 'HR', designation: 'HR Manager', employeeCategory: 'Administrative', employmentType: 'Permanent', joiningDate: '2007-10-18', shift: 'Day', reportingManager: 'CEO', employmentStatus: 'Active', qualification: 'MBA HR', experience: 18, specialization: 'HR Operations', medicalRegistrationNumber: '', registrationValidTill: '', basicSalary: 55000, hra: 13000, otherAllowances: 12000, grossSalary: 80000, bankName: 'Canara', accountNumber: '4245678901', ifscCode: 'CNRB0004245', emergencyContactName: 'Lakshmi Rao', emergencyRelationship: 'Spouse', emergencyContactNumber: '9845012344' },
  { id: 'emp-023', employeeCode: 'EMP-0023', fullName: 'Aravind K', gender: 'Male', dateOfBirth: '1989-05-28', mobileNumber: '9845012345', email: 'aravind.k@carehosp.in', bloodGroup: 'O+', maritalStatus: 'Married', photograph: '', department: 'Biomedical Engineering', designation: 'Biomedical Engineer', employeeCategory: 'Technician', employmentType: 'Permanent', joiningDate: '2013-11-20', shift: 'Day', reportingManager: 'Engineering Head', employmentStatus: 'Active', qualification: 'BE Biomedical', experience: 12, specialization: 'Equipment Maintenance', medicalRegistrationNumber: '', registrationValidTill: '', basicSalary: 38000, hra: 9000, otherAllowances: 7000, grossSalary: 54000, bankName: 'HDFC', accountNumber: '5256789012', ifscCode: 'HDFC0005256', emergencyContactName: 'Divya K', emergencyRelationship: 'Spouse', emergencyContactNumber: '9845012346' },
  { id: 'emp-024', employeeCode: 'EMP-0024', fullName: 'Naveen P', gender: 'Male', dateOfBirth: '1990-03-16', mobileNumber: '9845012347', email: 'naveen.p@carehosp.in', bloodGroup: 'B+', maritalStatus: 'Single', photograph: '', department: 'IT', designation: 'IT Administrator', employeeCategory: 'Administrative', employmentType: 'Permanent', joiningDate: '2015-08-05', shift: 'Rotational', reportingManager: 'IT Head', employmentStatus: 'Active', qualification: 'BCA', experience: 10, specialization: 'Systems & Network', medicalRegistrationNumber: '', registrationValidTill: '', basicSalary: 36000, hra: 8000, otherAllowances: 6000, grossSalary: 50000, bankName: 'Axis', accountNumber: '6267890123', ifscCode: 'UTIB0006267', emergencyContactName: 'Prakash', emergencyRelationship: 'Father', emergencyContactNumber: '9845012348' },
  { id: 'emp-025', employeeCode: 'EMP-0025', fullName: 'Manjunath G', gender: 'Male', dateOfBirth: '1982-07-07', mobileNumber: '9845012349', email: 'manjunath.g@carehosp.in', bloodGroup: 'O+', maritalStatus: 'Married', photograph: '', department: 'Housekeeping', designation: 'Housekeeping Supervisor', employeeCategory: 'Support Staff', employmentType: 'Permanent', joiningDate: '2006-09-12', shift: 'Day', reportingManager: 'Facility Manager', employmentStatus: 'Active', qualification: 'SSLC', experience: 19, specialization: 'Housekeeping Ops', medicalRegistrationNumber: '', registrationValidTill: '', basicSalary: 20000, hra: 4000, otherAllowances: 3000, grossSalary: 27000, bankName: 'SBI', accountNumber: '7278901234', ifscCode: 'SBIN0007278', emergencyContactName: 'Lakshmi G', emergencyRelationship: 'Spouse', emergencyContactNumber: '9845012350' },
];



const LS_KEY_TRAINING = 'hr_training_register';
const LS_KEY_CERT = 'hr_certification_tracker';
const LS_KEY_COMPETENCY = 'hr_competency_assessments';

const TRAINING_CATEGORIES = ['Induction', 'Clinical', 'Fire Safety', 'Infection Control', 'BLS/ACLS', 'Quality', 'Radiation Safety', 'Data Privacy', 'Behavioral', 'Other'];
const TRAINING_MODES = ['Offline', 'Online', 'Hybrid'];
const YES_NO = ['Yes', 'No'];
const ATTENDANCE_STATUS = ['Present', 'Absent', 'Partial'];
const CERT_STATUSES = ['Active', 'Expired', 'Revoked', 'Pending'];
const ASSESSMENT_TYPES = ['Technical', 'Clinical', 'Communication', 'Safety', 'Leadership', 'Annual'];
const COMPETENCY_LEVELS = ['Novice', 'Competent', 'Proficient', 'Expert'];
const ASSESSMENT_STATUSES = ['Completed', 'Pending', 'In Progress'];

const todayStr = () => new Date().toISOString().slice(0, 10);

const isPastDate = (dateStr) => {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return false;
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return d < t;
};

const effectiveCertStatus = (cert) => {
  if (cert.certificationStatus === 'Revoked') return 'Revoked';
  if (isPastDate(cert.expiryDate)) return 'Expired';
  return cert.certificationStatus || 'Active';
};

const STATUS_BADGE_TRAINING = {
  Present: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Absent: 'bg-rose-50 text-rose-700 border-rose-200',
  Partial: 'bg-amber-50 text-amber-700 border-amber-200',
};

const STATUS_BADGE_CERT = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Expired: 'bg-rose-50 text-rose-700 border-rose-200',
  Revoked: 'bg-slate-100 text-slate-600 border-slate-200',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
};

const STATUS_BADGE_COMP = {
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  'In Progress': 'bg-sky-50 text-sky-700 border-sky-200',
};

const SEED_TRAININGS = [
  { id: 'tr-001', employeeId: 'emp-006', department: 'ICU', trainingTitle: 'BLS / ACLS', trainingCategory: 'BLS/ACLS', trainer: 'Dr. Karthik Reddy', trainingDate: '2026-06-10', durationHours: 8, trainingMode: 'Offline', mandatory: 'Yes', attendanceStatus: 'Present', score: 92, certificateIssued: 'Yes', remarks: 'Hands-on CPR certified.' },
  { id: 'tr-002', employeeId: 'emp-007', department: 'Medical Ward', trainingTitle: 'Infection Control', trainingCategory: 'Infection Control', trainer: 'Dr. Meera Nair', trainingDate: '2026-05-22', durationHours: 4, trainingMode: 'Hybrid', mandatory: 'Yes', attendanceStatus: 'Present', score: 88, certificateIssued: 'Yes', remarks: '' },
  { id: 'tr-003', employeeId: 'emp-012', department: 'Laboratory', trainingTitle: 'Quality Management', trainingCategory: 'Quality', trainer: 'Ms. Sunita Rao', trainingDate: '2026-06-01', durationHours: 6, trainingMode: 'Online', mandatory: 'No', attendanceStatus: 'Present', score: 95, certificateIssued: 'No', remarks: '' },
  { id: 'tr-004', employeeId: 'emp-013', department: 'Radiology', trainingTitle: 'Radiation Safety', trainingCategory: 'Radiation Safety', trainer: 'Dr. Suresh Pillai', trainingDate: '2026-04-15', durationHours: 5, trainingMode: 'Offline', mandatory: 'Yes', attendanceStatus: 'Present', score: 90, certificateIssued: 'Yes', remarks: '' },
  { id: 'tr-005', employeeId: 'emp-016', department: 'Pharmacy', trainingTitle: 'Pharmacovigilance', trainingCategory: 'Clinical', trainer: 'Dr. Arvind Bose', trainingDate: '2026-06-18', durationHours: 4, trainingMode: 'Online', mandatory: 'No', attendanceStatus: 'Present', score: 85, certificateIssued: 'No', remarks: '' },
  { id: 'tr-006', employeeId: 'emp-001', department: 'Cardiology', trainingTitle: 'Clinical Governance', trainingCategory: 'Clinical', trainer: 'Dr. Anil Kumar', trainingDate: '2026-03-12', durationHours: 3, trainingMode: 'Offline', mandatory: 'No', attendanceStatus: 'Present', score: 97, certificateIssued: 'No', remarks: '' },
  { id: 'tr-007', employeeId: 'emp-010', department: 'Emergency', trainingTitle: 'Fire Safety & Evacuation', trainingCategory: 'Fire Safety', trainer: 'Mr. Vinod Gupta', trainingDate: '2026-05-30', durationHours: 2, trainingMode: 'Offline', mandatory: 'Yes', attendanceStatus: 'Present', score: 100, certificateIssued: 'Yes', remarks: 'Drill participated.' },
  { id: 'tr-008', employeeId: 'emp-008', department: 'Surgical Ward', trainingTitle: 'Hand Hygiene', trainingCategory: 'Infection Control', trainer: 'Dr. Meera Nair', trainingDate: '2026-06-05', durationHours: 2, trainingMode: 'Hybrid', mandatory: 'Yes', attendanceStatus: 'Absent', score: 0, certificateIssued: 'No', remarks: 'Was on approved leave.' },
  { id: 'tr-009', employeeId: 'emp-021', department: 'HR', trainingTitle: 'POSH & Workplace Ethics', trainingCategory: 'Behavioral', trainer: 'Mr. Mahesh Rao', trainingDate: '2026-04-20', durationHours: 3, trainingMode: 'Online', mandatory: 'No', attendanceStatus: 'Present', score: 91, certificateIssued: 'No', remarks: '' },
  { id: 'tr-010', employeeId: 'emp-023', department: 'Biomedical Engineering', trainingTitle: 'Biomedical Equipment Safety', trainingCategory: 'Radiation Safety', trainer: 'Mr. Vinod Gupta', trainingDate: '2026-06-25', durationHours: 5, trainingMode: 'Offline', mandatory: 'Yes', attendanceStatus: 'Present', score: 89, certificateIssued: 'Yes', remarks: '' },
];

const SEED_CERTS = [
  { id: 'cert-001', employeeId: 'emp-001', certificationName: 'MD (General Medicine)', issuingAuthority: 'Medical Council of India', issueDate: '2018-06-01', expiryDate: '2027-05-30', renewalRequired: 'No', certificationStatus: 'Active', documentPlaceholder: 'md_cert.pdf', remarks: '' },
  { id: 'cert-002', employeeId: 'emp-002', certificationName: 'DM Neurology', issuingAuthority: 'Medical Council of India', issueDate: '2015-09-01', expiryDate: '2026-12-31', renewalRequired: 'No', certificationStatus: 'Active', documentPlaceholder: 'dm_cert.pdf', remarks: '' },
  { id: 'cert-003', employeeId: 'emp-003', certificationName: 'MS Orthopaedics', issuingAuthority: 'Medical Council of India', issueDate: '2012-08-01', expiryDate: '2026-05-15', renewalRequired: 'No', certificationStatus: 'Active', documentPlaceholder: 'ms_cert.pdf', remarks: 'Renewal due.' },
  { id: 'cert-004', employeeId: 'emp-006', certificationName: 'GNM Nursing', issuingAuthority: 'Karnataka Nursing Council', issueDate: '2014-05-01', expiryDate: '2027-04-30', renewalRequired: 'No', certificationStatus: 'Active', documentPlaceholder: 'gnm_cert.pdf', remarks: '' },
  { id: 'cert-005', employeeId: 'emp-012', certificationName: 'DMLT', issuingAuthority: 'Paramedical Council', issueDate: '2013-02-01', expiryDate: '2027-01-31', renewalRequired: 'No', certificationStatus: 'Active', documentPlaceholder: 'dmlt_cert.pdf', remarks: '' },
  { id: 'cert-006', employeeId: 'emp-016', certificationName: 'BPharm', issuingAuthority: 'Pharmacy Council of India', issueDate: '2016-05-01', expiryDate: '2027-04-30', renewalRequired: 'No', certificationStatus: 'Active', documentPlaceholder: 'bpharm_cert.pdf', remarks: '' },
  { id: 'cert-007', employeeId: 'emp-017', certificationName: 'MPharm', issuingAuthority: 'Pharmacy Council of India', issueDate: '2012-08-01', expiryDate: '2027-07-15', renewalRequired: 'No', certificationStatus: 'Active', documentPlaceholder: 'mpharm_cert.pdf', remarks: '' },
  { id: 'cert-008', employeeId: 'emp-013', certificationName: 'Diploma in Radiology Technology', issuingAuthority: 'Paramedical Council', issueDate: '2014-07-01', expiryDate: '2026-06-30', renewalRequired: 'No', certificationStatus: 'Active', documentPlaceholder: 'drt_cert.pdf', remarks: 'Expired — renewal initiated.' },
  { id: 'cert-009', employeeId: 'emp-023', certificationName: 'BE Biomedical Engineering', issuingAuthority: 'VTU', issueDate: '2011-05-01', expiryDate: '2027-05-30', renewalRequired: 'No', certificationStatus: 'Active', documentPlaceholder: 'be_cert.pdf', remarks: '' },
  { id: 'cert-010', employeeId: 'emp-024', certificationName: 'BCA', issuingAuthority: 'University of Mysore', issueDate: '2012-03-01', expiryDate: '2027-02-28', renewalRequired: 'No', certificationStatus: 'Active', documentPlaceholder: 'bca_cert.pdf', remarks: '' },
];

const SEED_COMPETENCY = [
  { id: 'comp-001', employeeId: 'emp-006', department: 'ICU', assessmentType: 'Clinical', assessmentDate: '2026-06-10', evaluator: 'Nursing Superintendent', score: 88, competencyLevel: 'Competent', nextAssessmentDate: '2027-06-10', status: 'Completed', remarks: '' },
  { id: 'comp-002', employeeId: 'emp-007', department: 'Medical Ward', assessmentType: 'Clinical', assessmentDate: '2026-05-22', evaluator: 'Nursing Superintendent', score: 92, competencyLevel: 'Proficient', nextAssessmentDate: '2027-05-22', status: 'Completed', remarks: '' },
  { id: 'comp-003', employeeId: 'emp-012', department: 'Laboratory', assessmentType: 'Technical', assessmentDate: '2026-06-01', evaluator: 'Lab Manager', score: 90, competencyLevel: 'Competent', nextAssessmentDate: '2027-06-01', status: 'Completed', remarks: '' },
  { id: 'comp-004', employeeId: 'emp-013', department: 'Radiology', assessmentType: 'Technical', assessmentDate: '2026-04-15', evaluator: 'Radiology HOD', score: 85, competencyLevel: 'Competent', nextAssessmentDate: '2027-04-15', status: 'Completed', remarks: '' },
  { id: 'comp-005', employeeId: 'emp-016', department: 'Pharmacy', assessmentType: 'Technical', assessmentDate: '2026-06-18', evaluator: 'Pharmacy HOD', score: 80, competencyLevel: 'Competent', nextAssessmentDate: '2027-06-18', status: 'Completed', remarks: '' },
  { id: 'comp-006', employeeId: 'emp-001', department: 'Cardiology', assessmentType: 'Clinical', assessmentDate: '2026-03-12', evaluator: 'Dr. Anil Kumar', score: 95, competencyLevel: 'Expert', nextAssessmentDate: '2027-03-12', status: 'Completed', remarks: '' },
  { id: 'comp-007', employeeId: 'emp-010', department: 'Emergency', assessmentType: 'Safety', assessmentDate: '2026-05-30', evaluator: 'Mr. Vinod Gupta', score: 78, competencyLevel: 'Proficient', nextAssessmentDate: '2026-11-30', status: 'Pending', remarks: 'Re-assessment scheduled.' },
  { id: 'comp-008', employeeId: 'emp-008', department: 'Surgical Ward', assessmentType: 'Clinical', assessmentDate: '2026-06-05', evaluator: 'Nursing Superintendent', score: 70, competencyLevel: 'Novice', nextAssessmentDate: '2026-12-05', status: 'Pending', remarks: 'Needs mentoring.' },
  { id: 'comp-009', employeeId: 'emp-021', department: 'HR', assessmentType: 'Communication', assessmentDate: '2026-04-20', evaluator: 'Mr. Mahesh Rao', score: 88, competencyLevel: 'Competent', nextAssessmentDate: '2027-04-20', status: 'Completed', remarks: '' },
  { id: 'comp-010', employeeId: 'emp-023', department: 'Biomedical Engineering', assessmentType: 'Technical', assessmentDate: '2026-06-25', evaluator: 'Engineering Head', score: 91, competencyLevel: 'Proficient', nextAssessmentDate: '2027-06-25', status: 'Completed', remarks: '' },
];

const LS_KEY_ATTENDANCE = 'hr_attendance_register';
const LS_KEY_LEAVE = 'hr_leave_management';
const LS_KEY_SHIFT = 'hr_shift_roster';

const SHIFTS_LIST = ['Morning', 'Evening', 'Night', 'Rotational'];
const ATTENDANCE_STATUSES = ['Present', 'Absent', 'Half Day', 'Late', 'Work From Home'];
const LEAVE_TYPES = ['Casual Leave', 'Sick Leave', 'Earned Leave', 'Maternity Leave', 'Paternity Leave', 'Comp Off'];
const LEAVE_STATUSES = ['Pending', 'Approved', 'Rejected'];
const ROSTER_STATUSES = ['Active', 'Inactive', 'On Leave'];

const calcWorkingHours = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  const [inH, inM] = checkIn.split(':').map(Number);
  const [outH, outM] = checkOut.split(':').map(Number);
  const inMin = inH * 60 + inM;
  const outMin = outH * 60 + outM;
  if (outMin < inMin) return 0;
  return Math.round(((outMin - inMin) / 60) * 100) / 100;
};

const calcOvertime = (workingHours) => {
  const wh = Number(workingHours) || 0;
  return Math.round((wh - 8) * 100) / 100;
};

const calcLeaveDays = (fromDate, toDate) => {
  if (!fromDate || !toDate) return 0;
  const from = new Date(fromDate);
  const to = new Date(toDate);
  const diff = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
  return diff > 0 ? diff : 0;
};

const SEED_ATTENDANCE = [
  { id: 'att-001', employeeId: 'emp-001', department: 'Cardiology', attendanceDate: '2026-07-07', shift: 'Morning', checkInTime: '08:55', checkOutTime: '17:05', workingHours: 8.17, overtimeHours: 0.17, attendanceStatus: 'Present', remarks: '' },
  { id: 'att-002', employeeId: 'emp-002', department: 'Neurology', attendanceDate: '2026-07-07', shift: 'Morning', checkInTime: '09:10', checkOutTime: '17:00', workingHours: 7.83, overtimeHours: 0, attendanceStatus: 'Late', remarks: 'Traffic delay' },
  { id: 'att-003', employeeId: 'emp-003', department: 'Orthopaedics', attendanceDate: '2026-07-07', shift: 'Morning', checkInTime: '08:45', checkOutTime: '17:30', workingHours: 8.75, overtimeHours: 0.75, attendanceStatus: 'Present', remarks: '' },
  { id: 'att-004', employeeId: 'emp-004', department: 'Pediatrics', attendanceDate: '2026-07-07', shift: 'Evening', checkInTime: '14:00', checkOutTime: '22:00', workingHours: 8, overtimeHours: 0, attendanceStatus: 'Present', remarks: '' },
  { id: 'att-005', employeeId: 'emp-005', department: 'General Medicine', attendanceDate: '2026-07-07', shift: 'Morning', checkInTime: '', checkOutTime: '', workingHours: 0, overtimeHours: 0, attendanceStatus: 'Absent', remarks: 'Approved leave' },
  { id: 'att-006', employeeId: 'emp-006', department: 'ICU', attendanceDate: '2026-07-07', shift: 'Night', checkInTime: '21:45', checkOutTime: '06:15', workingHours: 8.5, overtimeHours: 0.5, attendanceStatus: 'Present', remarks: '' },
  { id: 'att-007', employeeId: 'emp-007', department: 'Medical Ward', attendanceDate: '2026-07-07', shift: 'Morning', checkInTime: '08:50', checkOutTime: '13:00', workingHours: 4.17, overtimeHours: 0, attendanceStatus: 'Half Day', remarks: 'Personal work' },
  { id: 'att-008', employeeId: 'emp-008', department: 'Surgical Ward', attendanceDate: '2026-07-07', shift: 'Evening', checkInTime: '13:55', checkOutTime: '22:10', workingHours: 8.25, overtimeHours: 0.25, attendanceStatus: 'Present', remarks: '' },
  { id: 'att-009', employeeId: 'emp-009', department: 'OBG', attendanceDate: '2026-07-07', shift: 'Morning', checkInTime: '09:05', checkOutTime: '17:00', workingHours: 7.92, overtimeHours: 0, attendanceStatus: 'Late', remarks: '' },
  { id: 'att-010', employeeId: 'emp-010', department: 'Emergency', attendanceDate: '2026-07-07', shift: 'Rotational', checkInTime: '07:50', checkOutTime: '15:50', workingHours: 8, overtimeHours: 0, attendanceStatus: 'Present', remarks: '' },
  { id: 'att-011', employeeId: 'emp-011', department: 'Operation Theatre', attendanceDate: '2026-07-07', shift: 'Morning', checkInTime: '08:40', checkOutTime: '17:20', workingHours: 8.67, overtimeHours: 0.67, attendanceStatus: 'Present', remarks: '' },
  { id: 'att-012', employeeId: 'emp-012', department: 'Laboratory', attendanceDate: '2026-07-07', shift: 'Morning', checkInTime: '09:00', checkOutTime: '17:00', workingHours: 8, overtimeHours: 0, attendanceStatus: 'Present', remarks: '' },
  { id: 'att-013', employeeId: 'emp-013', department: 'Radiology', attendanceDate: '2026-07-07', shift: 'Night', checkInTime: '21:50', checkOutTime: '06:05', workingHours: 8.25, overtimeHours: 0.25, attendanceStatus: 'Present', remarks: '' },
  { id: 'att-014', employeeId: 'emp-014', department: 'Operation Theatre', attendanceDate: '2026-07-07', shift: 'Evening', checkInTime: '', checkOutTime: '', workingHours: 0, overtimeHours: 0, attendanceStatus: 'Absent', remarks: 'Sick leave' },
  { id: 'att-015', employeeId: 'emp-015', department: 'Nephrology', attendanceDate: '2026-07-07', shift: 'Morning', checkInTime: '08:58', checkOutTime: '17:02', workingHours: 8.07, overtimeHours: 0.07, attendanceStatus: 'Present', remarks: '' },
];

const SEED_LEAVES = [
  { id: 'leave-001', employeeId: 'emp-005', department: 'General Medicine', leaveType: 'Sick Leave', fromDate: '2026-07-05', toDate: '2026-07-07', totalLeaveDays: 3, reason: 'Viral fever', approvalStatus: 'Approved', approvedBy: 'Dr. Anil Kumar', remarks: '' },
  { id: 'leave-002', employeeId: 'emp-014', department: 'Operation Theatre', leaveType: 'Sick Leave', fromDate: '2026-07-07', toDate: '2026-07-07', totalLeaveDays: 1, reason: 'Dental procedure', approvalStatus: 'Pending', approvedBy: '', remarks: '' },
  { id: 'leave-003', employeeId: 'emp-020', department: 'Administration', leaveType: 'Casual Leave', fromDate: '2026-07-08', toDate: '2026-07-09', totalLeaveDays: 2, reason: 'Personal work', approvalStatus: 'Pending', approvedBy: '', remarks: '' },
  { id: 'leave-004', employeeId: 'emp-006', department: 'ICU', leaveType: 'Earned Leave', fromDate: '2026-07-10', toDate: '2026-07-12', totalLeaveDays: 3, reason: 'Family function', approvalStatus: 'Approved', approvedBy: 'Nursing Superintendent', remarks: '' },
  { id: 'leave-005', employeeId: 'emp-009', department: 'OBG', leaveType: 'Casual Leave', fromDate: '2026-07-07', toDate: '2026-07-07', totalLeaveDays: 1, reason: 'Bank work', approvalStatus: 'Approved', approvedBy: 'HR Manager', remarks: '' },
  { id: 'leave-006', employeeId: 'emp-015', department: 'Nephrology', leaveType: 'Comp Off', fromDate: '2026-07-11', toDate: '2026-07-11', totalLeaveDays: 1, reason: 'Compensatory off', approvalStatus: 'Approved', approvedBy: 'Nephrology HOD', remarks: '' },
  { id: 'leave-007', employeeId: 'emp-008', department: 'Surgical Ward', leaveType: 'Sick Leave', fromDate: '2026-07-06', toDate: '2026-07-08', totalLeaveDays: 3, reason: 'High fever', approvalStatus: 'Rejected', approvedBy: 'Nursing Superintendent', remarks: 'Insufficient documentation' },
  { id: 'leave-008', employeeId: 'emp-021', department: 'HR', leaveType: 'Earned Leave', fromDate: '2026-07-14', toDate: '2026-07-16', totalLeaveDays: 3, reason: 'Vacation', approvalStatus: 'Pending', approvedBy: '', remarks: '' },
  { id: 'leave-009', employeeId: 'emp-022', department: 'HR', leaveType: 'Casual Leave', fromDate: '2026-07-07', toDate: '2026-07-07', totalLeaveDays: 1, reason: 'Personal', approvalStatus: 'Approved', approvedBy: 'CEO', remarks: '' },
  { id: 'leave-010', employeeId: 'emp-023', department: 'Biomedical Engineering', leaveType: 'Earned Leave', fromDate: '2026-07-15', toDate: '2026-07-17', totalLeaveDays: 3, reason: 'Family event', approvalStatus: 'Pending', approvedBy: '', remarks: '' },
];

const SEED_SHIFTS = [
  { id: 'shift-001', employeeId: 'emp-001', department: 'Cardiology', shift: 'Morning', startTime: '08:00', endTime: '16:00', weeklyOff: 'Sunday', effectiveFrom: '2026-01-01', status: 'Active' },
  { id: 'shift-002', employeeId: 'emp-002', department: 'Neurology', shift: 'Morning', startTime: '08:00', endTime: '16:00', weeklyOff: 'Sunday', effectiveFrom: '2026-01-01', status: 'Active' },
  { id: 'shift-003', employeeId: 'emp-003', department: 'Orthopaedics', shift: 'Morning', startTime: '08:00', endTime: '16:00', weeklyOff: 'Sunday', effectiveFrom: '2026-01-01', status: 'Active' },
  { id: 'shift-004', employeeId: 'emp-004', department: 'Pediatrics', shift: 'Evening', startTime: '14:00', endTime: '22:00', weeklyOff: 'Sunday', effectiveFrom: '2026-01-01', status: 'Active' },
  { id: 'shift-005', employeeId: 'emp-005', department: 'General Medicine', shift: 'Morning', startTime: '08:00', endTime: '16:00', weeklyOff: 'Sunday', effectiveFrom: '2026-01-01', status: 'Active' },
  { id: 'shift-006', employeeId: 'emp-006', department: 'ICU', shift: 'Night', startTime: '21:00', endTime: '06:00', weeklyOff: 'Sunday', effectiveFrom: '2026-01-01', status: 'Active' },
  { id: 'shift-007', employeeId: 'emp-007', department: 'Medical Ward', shift: 'Morning', startTime: '08:00', endTime: '16:00', weeklyOff: 'Sunday', effectiveFrom: '2026-01-01', status: 'Active' },
  { id: 'shift-008', employeeId: 'emp-008', department: 'Surgical Ward', shift: 'Evening', startTime: '14:00', endTime: '22:00', weeklyOff: 'Sunday', effectiveFrom: '2026-01-01', status: 'Active' },
  { id: 'shift-009', employeeId: 'emp-009', department: 'OBG', shift: 'Morning', startTime: '08:00', endTime: '16:00', weeklyOff: 'Sunday', effectiveFrom: '2026-01-01', status: 'Active' },
  { id: 'shift-010', employeeId: 'emp-010', department: 'Emergency', shift: 'Rotational', startTime: '07:00', endTime: '15:00', weeklyOff: 'Sunday', effectiveFrom: '2026-01-01', status: 'Active' },
];

const STATUS_BADGE_ATTENDANCE = {
  Present: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Absent: 'bg-rose-50 text-rose-700 border-rose-200',
  'Half Day': 'bg-amber-50 text-amber-700 border-amber-200',
  Late: 'bg-orange-50 text-orange-700 border-orange-200',
  'Work From Home': 'bg-sky-50 text-sky-700 border-sky-200',
};

const STATUS_BADGE_LEAVE = {
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Rejected: 'bg-rose-50 text-rose-700 border-rose-200',
};

const STATUS_BADGE_SHIFT = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Inactive: 'bg-slate-100 text-slate-600 border-slate-200',
  'On Leave': 'bg-amber-50 text-amber-700 border-amber-200',
};

const LS_KEY_PERFORMANCE = 'hr_performance_reviews';
const LS_KEY_GOALS = 'hr_goal_tracker';
const LS_KEY_PROMOTIONS = 'hr_promotions';
const LS_KEY_AUDITS = 'hr_internal_audits';
const LS_KEY_CAPA = 'hr_capa_tracker';

const AUDIT_TYPES = ['NABH', 'Internal', 'Regulatory', 'Statutory', 'Fire Safety', 'Infection Control', 'Clinical Audit', 'Documentation Review'];
const AUDIT_STATUSES = ['Scheduled', 'Completed', 'Pending'];
const OBSERVATION_CATEGORIES = ['Critical', 'Major', 'Minor'];
const CAPA_STATUSES = ['Open', 'In Progress', 'Closed', 'Overdue'];

const RATING_SCALE = [1, 2, 3, 4, 5];
const REVIEW_STATUSES = ['Completed', 'Pending', 'In Progress'];
const GOAL_STATUSES = ['Not Started', 'In Progress', 'Completed', 'On Hold'];
const PROMOTION_STATUSES = ['Pending', 'Approved', 'Rejected'];

const calcOverallRating = (technical, communication, teamwork, patientCare, documentation, attendanceScore) => {
  const t = Number(technical) || 0;
  const c = Number(communication) || 0;
  const tw = Number(teamwork) || 0;
  const p = Number(patientCare) || 0;
  const d = Number(documentation) || 0;
  const a = Number(attendanceScore) || 0;
  const sum = t + c + tw + p + d + a;
  const count = 6;
  return Math.round((sum / (count * 5)) * 100) / 100;
};

const calcGoalStatus = (progress) => {
  const p = Number(progress) || 0;
  if (p >= 100) return 'Completed';
  if (p > 0) return 'In Progress';
  return 'Not Started';
};

const SEED_PERFORMANCE = [
  { id: 'perf-001', employeeId: 'emp-001', department: 'Cardiology', reviewer: 'Dr. Anil Kumar', reviewPeriod: '2026-Q2', technicalSkills: 5, communication: 4, teamwork: 5, patientCare: 5, documentation: 4, attendanceScore: 98, overallRating: 4.83, reviewStatus: 'Completed', comments: 'Excellent performance' },
  { id: 'perf-002', employeeId: 'emp-002', department: 'Neurology', reviewer: 'Dr. Anil Kumar', reviewPeriod: '2026-Q2', technicalSkills: 5, communication: 5, teamwork: 4, patientCare: 5, documentation: 5, attendanceScore: 100, overallRating: 4.92, reviewStatus: 'Completed', comments: 'Outstanding' },
  { id: 'perf-003', employeeId: 'emp-006', department: 'ICU', reviewer: 'Nursing Superintendent', reviewPeriod: '2026-Q2', technicalSkills: 4, communication: 4, teamwork: 5, patientCare: 5, documentation: 3, attendanceScore: 95, overallRating: 4.33, reviewStatus: 'Completed', comments: 'Good' },
  { id: 'perf-004', employeeId: 'emp-007', department: 'Medical Ward', reviewer: 'Nursing Superintendent', reviewPeriod: '2026-Q2', technicalSkills: 3, communication: 4, teamwork: 4, patientCare: 4, documentation: 3, attendanceScore: 90, overallRating: 3.67, reviewStatus: 'Completed', comments: 'Satisfactory' },
  { id: 'perf-005', employeeId: 'emp-012', department: 'Laboratory', reviewer: 'Lab Manager', reviewPeriod: '2026-Q2', technicalSkills: 4, communication: 3, teamwork: 4, patientCare: 4, documentation: 4, attendanceScore: 92, overallRating: 3.83, reviewStatus: 'Completed', comments: '' },
  { id: 'perf-006', employeeId: 'emp-013', department: 'Radiology', reviewer: 'Radiology HOD', reviewPeriod: '2026-Q2', technicalSkills: 4, communication: 4, teamwork: 3, patientCare: 4, documentation: 4, attendanceScore: 88, overallRating: 3.67, reviewStatus: 'Pending', comments: 'Awaiting finalization' },
  { id: 'perf-007', employeeId: 'emp-016', department: 'Pharmacy', reviewer: 'Pharmacy HOD', reviewPeriod: '2026-Q2', technicalSkills: 4, communication: 4, teamwork: 5, patientCare: 4, documentation: 4, attendanceScore: 96, overallRating: 4.17, reviewStatus: 'In Progress', comments: 'Under review' },
  { id: 'perf-008', employeeId: 'emp-010', department: 'Emergency', reviewer: 'Dr. Anil Kumar', reviewPeriod: '2026-Q2', technicalSkills: 5, communication: 5, teamwork: 5, patientCare: 5, documentation: 4, attendanceScore: 100, overallRating: 4.83, reviewStatus: 'Completed', comments: 'Excellent' },
  { id: 'perf-009', employeeId: 'emp-021', department: 'HR', reviewer: 'HR Manager', reviewPeriod: '2026-Q2', technicalSkills: 4, communication: 5, teamwork: 4, patientCare: 3, documentation: 5, attendanceScore: 94, overallRating: 4.17, reviewStatus: 'Completed', comments: '' },
  { id: 'perf-010', employeeId: 'emp-023', department: 'Biomedical Engineering', reviewer: 'Engineering Head', reviewPeriod: '2026-Q2', technicalSkills: 4, communication: 3, teamwork: 4, patientCare: 3, documentation: 4, attendanceScore: 90, overallRating: 3.5, reviewStatus: 'Pending', comments: '' },
];

const SEED_GOALS = [
  { id: 'goal-001', employeeId: 'emp-001', department: 'Cardiology', goalTitle: 'Research Publication', goalDescription: 'Publish 2 research papers in cardiology', startDate: '2026-01-01', targetDate: '2026-12-31', progress: 50, status: 'In Progress', remarks: '' },
  { id: 'goal-002', employeeId: 'emp-002', department: 'Neurology', goalTitle: 'Workshop Conduct', goalDescription: 'Conduct 3 neurology workshops', startDate: '2026-01-01', targetDate: '2026-06-30', progress: 100, status: 'Completed', remarks: 'All completed' },
  { id: 'goal-003', employeeId: 'emp-006', department: 'ICU', goalTitle: 'Certification in Critical Care', goalDescription: 'Complete advanced critical care certification', startDate: '2026-02-01', targetDate: '2026-08-31', progress: 75, status: 'In Progress', remarks: '' },
  { id: 'goal-004', employeeId: 'emp-007', department: 'Medical Ward', goalTitle: 'Nurse Training Program', goalDescription: 'Complete mentorship training', startDate: '2026-03-01', targetDate: '2026-09-30', progress: 30, status: 'In Progress', remarks: '' },
  { id: 'goal-005', employeeId: 'emp-012', department: 'Laboratory', goalTitle: 'Lab Accreditation', goalDescription: 'Lead lab accreditation process', startDate: '2026-01-01', targetDate: '2026-12-31', progress: 60, status: 'In Progress', remarks: '' },
  { id: 'goal-006', employeeId: 'emp-013', department: 'Radiology', goalTitle: 'New Equipment Training', goalDescription: 'Complete training on new MRI equipment', startDate: '2026-04-01', targetDate: '2026-10-31', progress: 0, status: 'Not Started', remarks: 'Equipment pending' },
  { id: 'goal-007', employeeId: 'emp-016', department: 'Pharmacy', goalTitle: 'Inventory Management', goalDescription: 'Reduce inventory wastage by 15%', startDate: '2026-01-01', targetDate: '2026-06-30', progress: 100, status: 'Completed', remarks: 'Target achieved' },
  { id: 'goal-008', employeeId: 'emp-010', department: 'Emergency', goalTitle: 'Trauma Protocol Update', goalDescription: 'Update emergency trauma protocols', startDate: '2026-02-01', targetDate: '2026-05-31', progress: 100, status: 'Completed', remarks: '' },
  { id: 'goal-009', employeeId: 'emp-021', department: 'HR', goalTitle: 'Employee Engagement', goalDescription: 'Increase engagement score by 10%', startDate: '2026-01-01', targetDate: '2026-12-31', progress: 45, status: 'In Progress', remarks: '' },
  { id: 'goal-010', employeeId: 'emp-023', department: 'Biomedical Engineering', goalTitle: 'Equipment Maintenance', goalDescription: 'Reduce equipment downtime by 20%', startDate: '2026-01-01', targetDate: '2026-12-31', progress: 20, status: 'In Progress', remarks: '' },
];

const SEED_PROMOTIONS = [
  { id: 'promo-001', employeeId: 'emp-001', department: 'Cardiology', currentDesignation: 'Consultant', recommendedDesignation: 'Senior Consultant', promotionDate: '2026-04-01', salaryRevision: 150000, promotionStatus: 'Approved', remarks: '' },
  { id: 'promo-002', employeeId: 'emp-002', department: 'Neurology', currentDesignation: 'Senior Consultant', recommendedDesignation: 'HOD Neurology', promotionDate: '2026-04-01', salaryRevision: 200000, promotionStatus: 'Approved', remarks: '' },
  { id: 'promo-003', employeeId: 'emp-006', department: 'ICU', currentDesignation: 'Staff Nurse', recommendedDesignation: 'Senior Staff Nurse', promotionDate: '2026-07-01', salaryRevision: 5000, promotionStatus: 'Pending', remarks: '' },
  { id: 'promo-004', employeeId: 'emp-011', department: 'Operation Theatre', currentDesignation: 'Nursing Superintendent', recommendedDesignation: 'Deputy Nursing Director', promotionDate: '2026-07-01', salaryRevision: 30000, promotionStatus: 'Pending', remarks: '' },
  { id: 'promo-005', employeeId: 'emp-022', department: 'HR', currentDesignation: 'HR Manager', recommendedDesignation: 'Senior HR Manager', promotionDate: '2026-07-01', salaryRevision: 25000, promotionStatus: 'Rejected', remarks: 'Budget constraints' },
];

const SEED_AUDITS = [
  { id: 'aud-001', auditDate: '2026-06-15', auditType: 'NABH', department: 'Cardiology', auditor: 'Dr. Anil Kumar', scope: 'Clinical protocols & documentation', complianceScore: 92, findings: 'Minor documentation gaps in consent forms', observationCategory: 'Minor', critical: 0, major: 1, minor: 3, recommendation: 'Update consent form checklist', targetClosureDate: '2026-07-15', auditStatus: 'Completed', remarks: '' },
  { id: 'aud-002', auditDate: '2026-06-20', auditType: 'Internal', department: 'ICU', auditor: 'Nursing Superintendent', scope: 'Infection control practices', complianceScore: 88, findings: 'Hand hygiene compliance needs improvement', observationCategory: 'Major', critical: 0, major: 2, minor: 2, recommendation: 'Conduct weekly hand hygiene audits', targetClosureDate: '2026-07-20', auditStatus: 'Completed', remarks: '' },
  { id: 'aud-003', auditDate: '2026-07-01', auditType: 'Fire Safety', department: 'Hospital', auditor: 'Mr. Vinod Gupta', scope: 'Fire safety equipment & evacuation routes', complianceScore: 95, findings: 'All fire extinguishers serviced, exits clear', observationCategory: 'Minor', critical: 0, major: 0, minor: 1, recommendation: 'Schedule next drill in Q3', targetClosureDate: '2026-08-01', auditStatus: 'Completed', remarks: '' },
  { id: 'aud-004', auditDate: '2026-07-05', auditType: 'Clinical Audit', department: 'Emergency', auditor: 'Dr. Karthik Reddy', scope: 'Trauma protocol adherence', complianceScore: 78, findings: 'Delays in triage documentation during peak hours', observationCategory: 'Major', critical: 1, major: 2, minor: 1, recommendation: 'Deploy additional documentation staff during peak hours', targetClosureDate: '2026-08-05', auditStatus: 'Pending', remarks: '' },
  { id: 'aud-005', auditDate: '2026-07-08', auditType: 'Infection Control', department: 'Operation Theatre', scope: 'Sterilization protocols', complianceScore: 97, findings: 'Excellent sterilization compliance', observationCategory: 'Minor', critical: 0, major: 0, minor: 1, recommendation: 'Continue current practices', targetClosureDate: '2026-08-08', auditStatus: 'Scheduled', remarks: '' },
  { id: 'aud-006', auditDate: '2026-07-10', auditType: 'Documentation Review', department: 'Pharmacy', auditor: 'Ms. Sunita Rao', scope: 'Drug dispensing records', complianceScore: 85, findings: 'Batch numbers occasionally missing in dispensing logs', observationCategory: 'Major', critical: 0, major: 1, minor: 4, recommendation: 'Implement barcode scanning for batch tracking', targetClosureDate: '2026-08-10', auditStatus: 'Scheduled', remarks: '' },
  { id: 'aud-007', auditDate: '2026-07-12', auditType: 'NABH', department: 'Laboratory', auditor: 'Lab Manager', scope: 'Sample handling & reporting timelines', complianceScore: 90, findings: 'Reporting delays for stat samples during night shift', observationCategory: 'Minor', critical: 0, major: 1, minor: 2, recommendation: 'Review night shift staffing levels', targetClosureDate: '2026-08-12', auditStatus: 'Pending', remarks: '' },
  { id: 'aud-008', auditDate: '2026-07-14', auditType: 'Regulatory', department: 'Radiology', auditor: 'Dr. Suresh Pillai', scope: 'Radiation safety & PPE compliance', complianceScore: 82, findings: 'Lead apron storage inconsistent across rooms', observationCategory: 'Major', critical: 1, major: 1, minor: 2, recommendation: 'Standardize lead apron racks in all X-ray rooms', targetClosureDate: '2026-08-14', auditStatus: 'Pending', remarks: '' },
  { id: 'aud-009', auditDate: '2026-07-16', auditType: 'Internal', department: 'Nursing', auditor: 'Nursing Superintendent', scope: 'Medication administration records', complianceScore: 94, findings: 'MAR charts generally well maintained', observationCategory: 'Minor', critical: 0, major: 0, minor: 2, recommendation: 'Share best practices across units', targetClosureDate: '2026-08-16', auditStatus: 'Scheduled', remarks: '' },
  { id: 'aud-010', auditDate: '2026-07-18', auditType: 'Statutory', department: 'Administration', auditor: 'Mr. Mahesh Rao', scope: 'Employee statutory compliance records', complianceScore: 91, findings: 'PF and ESI records up to date', observationCategory: 'Minor', critical: 0, major: 0, minor: 1, recommendation: 'Maintain digital backup of all statutory filings', targetClosureDate: '2026-08-18', auditStatus: 'Pending', remarks: '' },
];

const SEED_CAPA = [
  { id: 'capa-001', linkedAudit: 'aud-001', department: 'Cardiology', capaDescription: 'Update consent form checklist to capture all required fields', rootCause: 'Checklist not revised after NABH 2023 updates', correctiveAction: 'Revise and reprint consent form checklist', preventiveAction: 'Annual review of consent forms by quality team', responsiblePerson: 'Dr. Arvind Menon', targetDate: '2026-07-15', completionDate: '', status: 'Open', remarks: '' },
  { id: 'capa-002', linkedAudit: 'aud-002', department: 'ICU', capaDescription: 'Improve hand hygiene compliance during shift changes', rootCause: 'Lack of supervision during high-traffic periods', correctiveAction: 'Deploy hand hygiene auditors during shift changes', preventiveAction: 'Monthly hand hygiene training sessions', responsiblePerson: 'Deepa Nair', targetDate: '2026-07-20', completionDate: '', status: 'In Progress', remarks: '' },
  { id: 'capa-003', linkedAudit: 'aud-004', department: 'Emergency', capaDescription: 'Reduce triage documentation delays', rootCause: 'Insufficient documentation staff during peak hours', correctiveAction: 'Add one floating documentation assistant per shift', preventiveAction: 'Cross-train senior nurses in documentation', responsiblePerson: 'Kavya Menon', targetDate: '2026-08-05', completionDate: '', status: 'Overdue', remarks: '' },
  { id: 'capa-004', linkedAudit: 'aud-004', department: 'Emergency', capaDescription: 'Ensure all trauma kits are checked and restocked daily', rootCause: 'No daily checklist sign-off', correctiveAction: 'Introduce daily checklist with nurse incharge sign-off', preventiveAction: 'Weekly audit of trauma kit readiness', responsiblePerson: 'Kavya Menon', targetDate: '2026-08-05', completionDate: '', status: 'Open', remarks: '' },
  { id: 'capa-005', linkedAudit: 'aud-006', department: 'Pharmacy', capaDescription: 'Implement barcode scanning for batch tracking', rootCause: 'Manual entry prone to omission', correctiveAction: 'Purchase and install barcode scanners', preventiveAction: 'Monthly calibration and spot-checks', responsiblePerson: 'Kavitha R', targetDate: '2026-08-10', completionDate: '', status: 'Open', remarks: '' },
  { id: 'capa-006', linkedAudit: 'aud-007', department: 'Laboratory', capaDescription: 'Address night shift stat sample reporting delays', rootCause: 'Only one lab technician on night shift', correctiveAction: 'Add second technician for night shift', preventiveAction: 'Establish turnaround time KPIs and monthly review', responsiblePerson: 'Imran Khan', targetDate: '2026-08-12', completionDate: '', status: 'In Progress', remarks: '' },
  { id: 'capa-007', linkedAudit: 'aud-008', department: 'Radiology', capaDescription: 'Standardize lead apron storage in all X-ray rooms', rootCause: 'No standard operating procedure for storage', correctiveAction: 'Install lead apron racks and label storage areas', preventiveAction: 'Add storage check to quarterly safety audit', responsiblePerson: 'Arjun Das', targetDate: '2026-08-14', completionDate: '', status: 'Open', remarks: '' },
  { id: 'capa-008', linkedAudit: 'aud-008', department: 'Radiology', capaDescription: 'Ensure radiation badges are worn at all times in controlled areas', rootCause: 'Intermittent non-compliance by visitors', correctiveAction: 'Place badge dispensers at all controlled area entrances', preventiveAction: 'Monthly badge compliance audit', responsiblePerson: 'Arjun Das', targetDate: '2026-08-14', completionDate: '2026-07-20', status: 'Closed', remarks: '' },
  { id: 'capa-009', linkedAudit: 'aud-009', department: 'Nursing', capaDescription: 'Share best practices for MAR chart maintenance across units', rootCause: 'Best practices not documented or shared', correctiveAction: 'Create and distribute MAR chart best practice guide', preventiveAction: 'Quarterly MAR chart review meetings', responsiblePerson: 'Sunita Rao', targetDate: '2026-08-16', completionDate: '', status: 'Open', remarks: '' },
  { id: 'capa-010', linkedAudit: 'aud-010', department: 'Administration', capaDescription: 'Maintain digital backup of all statutory filings', rootCause: 'Physical copies only, risk of loss', correctiveAction: 'Scan and upload all statutory filings to cloud', preventiveAction: 'Monthly backup verification by HR executive', responsiblePerson: 'Sneha Iyer', targetDate: '2026-08-18', completionDate: '', status: 'In Progress', remarks: '' },
];

const HRRecordsWorkspace = ({ onBack }) => {
  const { hospital } = useHospital();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Employee Master state
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_EMPLOYEES);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      } catch (e) {
        /* ignore */
      }
    }
    return SEED_EMPLOYEES;
  });
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [employeeDeptFilter, setEmployeeDeptFilter] = useState('');
  const [employeeDesigFilter, setEmployeeDesigFilter] = useState('');
  const [employeeCatFilter, setEmployeeCatFilter] = useState('');
  const [employeeTypeFilter, setEmployeeTypeFilter] = useState('');
  const [employeeStatusFilter, setEmployeeStatusFilter] = useState('');
  const [employeeForm, setEmployeeForm] = useState({
    id: '', employeeCode: '', fullName: '', gender: 'Male', dateOfBirth: '', mobileNumber: '', email: '',
    bloodGroup: 'O+', maritalStatus: 'Single', photograph: '', department: 'Medical', designation: 'Consultant',
    employeeCategory: 'Doctor', employmentType: 'Permanent', joiningDate: '', shift: 'Day', reportingManager: '',
    employmentStatus: 'Active', qualification: '', experience: 0, specialization: '', medicalRegistrationNumber: '',
    registrationValidTill: '', basicSalary: 0, hra: 0, otherAllowances: 0, grossSalary: 0, bankName: '', accountNumber: '',
    ifscCode: '', emergencyContactName: '', emergencyRelationship: '', emergencyContactNumber: '',
  });
  const [employeeErrors, setEmployeeErrors] = useState({});

  const getNextEmployeeId = () => {
    const maxNum = employees.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `emp-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const getNextEmployeeCode = () => {
    const maxNum = employees.reduce((max, r) => {
      const m = /EMP-(\d+)/.exec(r.employeeCode || '');
      const num = m ? parseInt(m[1], 10) : 0;
      return num > max ? num : max;
    }, 0);
    return `EMP-${String(maxNum + 1).padStart(4, '0')}`;
  };

  const handleOpenEmployeeModal = (record = null) => {
    if (record) {
      setEmployeeForm({ ...record });
      setEditingEmployeeId(record.id);
    } else {
      setEmployeeForm({
        id: getNextEmployeeId(), employeeCode: getNextEmployeeCode(), fullName: '', gender: 'Male', dateOfBirth: '',
        mobileNumber: '', email: '', bloodGroup: 'O+', maritalStatus: 'Single', photograph: '', department: 'Medical',
        designation: 'Consultant', employeeCategory: 'Doctor', employmentType: 'Permanent', joiningDate: '', shift: 'Day',
        reportingManager: '', employmentStatus: 'Active', qualification: '', experience: 0, specialization: '',
        medicalRegistrationNumber: '', registrationValidTill: '', basicSalary: 0, hra: 0, otherAllowances: 0, grossSalary: 0,
        bankName: '', accountNumber: '', ifscCode: '', emergencyContactName: '', emergencyRelationship: '', emergencyContactNumber: '',
      });
      setEditingEmployeeId(null);
    }
    setEmployeeErrors({});
    setIsEmployeeModalOpen(true);
  };

  const validateEmployeeForm = (form) => {
    const errors = {};
    if (!form.fullName.trim()) errors.fullName = 'Full name is required.';
    if (!/^\d{10}$/.test(form.mobileNumber.trim())) errors.mobileNumber = 'Enter a valid 10-digit mobile number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Enter a valid email address.';
    if (!form.department.trim()) errors.department = 'Department is required.';
    if (!form.designation.trim()) errors.designation = 'Designation is required.';
    if (!form.employeeCategory.trim()) errors.employeeCategory = 'Employee category is required.';
    if (!form.employmentType.trim()) errors.employmentType = 'Employment type is required.';
    if (!form.joiningDate.trim()) errors.joiningDate = 'Joining date is required.';
    if (!form.employmentStatus.trim()) errors.employmentStatus = 'Employment status is required.';
    if (form.basicSalary === '' || isNaN(form.basicSalary) || Number(form.basicSalary) < 0) errors.basicSalary = 'Enter a valid basic salary.';
    return errors;
  };

  const handleSaveEmployee = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateEmployeeForm(employeeForm);
    if (Object.keys(errors).length > 0) {
      setEmployeeErrors(errors);
      return;
    }
    const gross = calcGross(employeeForm.basicSalary, employeeForm.hra, employeeForm.otherAllowances);
    const cleaned = {
      ...employeeForm,
      fullName: employeeForm.fullName.trim(),
      email: employeeForm.email.trim(),
      reportingManager: employeeForm.reportingManager.trim(),
      basicSalary: Number(employeeForm.basicSalary) || 0,
      hra: Number(employeeForm.hra) || 0,
      otherAllowances: Number(employeeForm.otherAllowances) || 0,
      grossSalary: gross,
      experience: Number(employeeForm.experience) || 0,
    };
    if (editingEmployeeId) {
      setEmployees((prev) => prev.map((r) => (r.id === editingEmployeeId ? { ...cleaned, id: editingEmployeeId } : r)));
    } else {
      setEmployees((prev) => [...prev, cleaned]);
    }
    setIsEmployeeModalOpen(false);
    setEditingEmployeeId(null);
    setEmployeeErrors({});
  };

  const handleDeleteEmployee = (id) => {
    const record = employees.find((r) => r.id === id);
    if (window.confirm(`Delete employee "${record ? record.fullName : id}"? This action cannot be undone.`)) {
      setEmployees((prev) => prev.filter((r) => r.id !== id));
    }
  };

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_EMPLOYEES, JSON.stringify(employees));
  }, [employees]);

  const EmployeeMasterTab = () => {
    const filtered = employees.filter((r) => {
      const q = employeeSearch.toLowerCase();
      const matchesSearch =
        r.id.toLowerCase().includes(q) ||
        r.fullName.toLowerCase().includes(q) ||
        r.mobileNumber.includes(q) ||
        r.department.toLowerCase().includes(q);
      const matchesDept = !employeeDeptFilter || r.department === employeeDeptFilter;
      const matchesDesig = !employeeDesigFilter || r.designation === employeeDesigFilter;
      const matchesCat = !employeeCatFilter || r.employeeCategory === employeeCatFilter;
      const matchesType = !employeeTypeFilter || r.employmentType === employeeTypeFilter;
      const matchesStatus = !employeeStatusFilter || r.employmentStatus === employeeStatusFilter;
      return matchesSearch && matchesDept && matchesDesig && matchesCat && matchesType && matchesStatus;
    });

    const total = employees.length;
    const doctors = employees.filter((r) => r.employeeCategory === 'Doctor').length;
    const nurses = employees.filter((r) => r.employeeCategory === 'Nurse').length;
    const allied = employees.filter((r) => r.employeeCategory === 'Technician').length;
    const admin = employees.filter((r) => r.employeeCategory === 'Administrative').length;
    const active = employees.filter((r) => r.employmentStatus === 'Active').length;
    const onLeave = employees.filter((r) => r.employmentStatus === 'On Leave').length;
    const overallCompliance = total ? Math.round((active / total) * 100) : 0;

    const liveGross = calcGross(employeeForm.basicSalary, employeeForm.hra, employeeForm.otherAllowances);

    const TH_COLS = ['Employee ID', 'Code', 'Full Name', 'Department', 'Designation', 'Category', 'Status', 'Actions'];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Employee Master</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Hospital employee records &amp; directory</p>
          </div>
          <button
            onClick={() => handleOpenEmployeeModal()}
            style={{ backgroundColor: hospital.themeColor }}
            className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Employee
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Employees', value: total, color: 'text-blue-600' },
            { label: 'Doctors', value: doctors, color: 'text-emerald-600' },
            { label: 'Nurses', value: nurses, color: 'text-sky-600' },
            { label: 'Allied Health Professionals', value: allied, color: 'text-violet-600' },
            { label: 'Administrative Staff', value: admin, color: 'text-indigo-600' },
            { label: 'Active Employees', value: active, color: 'text-teal-600' },
            { label: 'Employees on Leave', value: onLeave, color: 'text-amber-600' },
            { label: 'Overall HR Compliance %', value: `${overallCompliance}%`, color: 'text-rose-600' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID, name, mobile, department..."
              value={employeeSearch}
              onChange={(e) => setEmployeeSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            />
          </div>
          <select value={employeeDeptFilter} onChange={(e) => setEmployeeDeptFilter(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
            <option value="">All Departments</option>
            {DEPARTMENTS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={employeeDesigFilter} onChange={(e) => setEmployeeDesigFilter(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
            <option value="">All Designations</option>
            {DESIGNATIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={employeeCatFilter} onChange={(e) => setEmployeeCatFilter(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
            <option value="">All Categories</option>
            {EMPLOYEE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={employeeTypeFilter} onChange={(e) => setEmployeeTypeFilter(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
            <option value="">All Types</option>
            {EMPLOYMENT_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={employeeStatusFilter} onChange={(e) => setEmployeeStatusFilter(e.target.value)} className="px-3 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400">
            <option value="">All Statuses</option>
            {EMPLOYMENT_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
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
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.employeeCode}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.fullName}</td>
                    <td className="px-3 py-3 text-slate-600">{r.department}</td>
                    <td className="px-3 py-3 text-violet-600 font-bold">{r.designation}</td>
                    <td className="px-3 py-3 text-slate-600">{r.employeeCategory}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_EMP[r.employmentStatus] || STATUS_BADGE_EMP.Active}`}>{r.employmentStatus}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleOpenEmployeeModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => handleDeleteEmployee(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={TH_COLS.length} className="px-3 py-10 text-center">
                      {employeeSearch || employeeDeptFilter || employeeDesigFilter || employeeCatFilter || employeeTypeFilter || employeeStatusFilter ? (
                        <span className="text-[10px] text-slate-400">No employees match your search/filters.</span>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-3xl">👥</span>
                          <span className="text-[10px] text-slate-400 font-medium">No employees registered yet.</span>
                          <button onClick={() => handleOpenEmployeeModal()} style={{ backgroundColor: hospital.themeColor }} className="mt-1 px-3 py-1.5 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all shadow-sm cursor-pointer">Add First Employee</button>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
            <span className="text-[9px] text-slate-400 font-medium">Showing {filtered.length} of {employees.length} employee{employees.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {isEmployeeModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[92vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingEmployeeId ? 'Edit Employee' : 'Add Employee'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Employee Master</p>
                </div>
                <button onClick={() => { setIsEmployeeModalOpen(false); setEditingEmployeeId(null); setEmployeeErrors({}); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveEmployee} className="space-y-5">
                {/* Section 1: Basic Information */}
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Basic Information</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Employee ID (Auto)</label>
                      <input type="text" value={employeeForm.id} readOnly className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-[10px] text-slate-500" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Employee Code (Auto)</label>
                      <input type="text" value={employeeForm.employeeCode} readOnly className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-[10px] text-slate-500" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Full Name *</label>
                      <input type="text" value={employeeForm.fullName} onChange={(e) => setEmployeeForm({ ...employeeForm, fullName: e.target.value })} className={`w-full px-3 py-2 border ${employeeErrors.fullName ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Full name" />
                      {employeeErrors.fullName && <p className="text-[9px] text-rose-500 mt-1">{employeeErrors.fullName}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Gender</label>
                      <select value={employeeForm.gender} onChange={(e) => setEmployeeForm({ ...employeeForm, gender: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {GENDERS.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Date of Birth</label>
                      <input type="date" value={employeeForm.dateOfBirth} onChange={(e) => setEmployeeForm({ ...employeeForm, dateOfBirth: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Mobile Number *</label>
                      <input type="text" value={employeeForm.mobileNumber} onChange={(e) => setEmployeeForm({ ...employeeForm, mobileNumber: e.target.value })} className={`w-full px-3 py-2 border ${employeeErrors.mobileNumber ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="10-digit mobile" />
                      {employeeErrors.mobileNumber && <p className="text-[9px] text-rose-500 mt-1">{employeeErrors.mobileNumber}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Email *</label>
                      <input type="text" value={employeeForm.email} onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })} className={`w-full px-3 py-2 border ${employeeErrors.email ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="email@hospital.in" />
                      {employeeErrors.email && <p className="text-[9px] text-rose-500 mt-1">{employeeErrors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Blood Group</label>
                      <select value={employeeForm.bloodGroup} onChange={(e) => setEmployeeForm({ ...employeeForm, bloodGroup: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {BLOOD_GROUPS.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Marital Status</label>
                      <select value={employeeForm.maritalStatus} onChange={(e) => setEmployeeForm({ ...employeeForm, maritalStatus: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {MARITAL_STATUS.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Photograph</label>
                      <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-2xl">👤</div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Employment Details */}
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Employment Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Department *</label>
                      <select value={employeeForm.department} onChange={(e) => setEmployeeForm({ ...employeeForm, department: e.target.value })} className={`w-full px-3 py-2 border ${employeeErrors.department ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                        {DEPARTMENTS.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {employeeErrors.department && <p className="text-[9px] text-rose-500 mt-1">{employeeErrors.department}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Designation *</label>
                      <select value={employeeForm.designation} onChange={(e) => setEmployeeForm({ ...employeeForm, designation: e.target.value })} className={`w-full px-3 py-2 border ${employeeErrors.designation ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                        {DESIGNATIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {employeeErrors.designation && <p className="text-[9px] text-rose-500 mt-1">{employeeErrors.designation}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Employee Category *</label>
                      <select value={employeeForm.employeeCategory} onChange={(e) => setEmployeeForm({ ...employeeForm, employeeCategory: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {EMPLOYEE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Employment Type *</label>
                      <select value={employeeForm.employmentType} onChange={(e) => setEmployeeForm({ ...employeeForm, employmentType: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {EMPLOYMENT_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Joining Date *</label>
                      <input type="date" value={employeeForm.joiningDate} onChange={(e) => setEmployeeForm({ ...employeeForm, joiningDate: e.target.value })} className={`w-full px-3 py-2 border ${employeeErrors.joiningDate ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {employeeErrors.joiningDate && <p className="text-[9px] text-rose-500 mt-1">{employeeErrors.joiningDate}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Shift</label>
                      <select value={employeeForm.shift} onChange={(e) => setEmployeeForm({ ...employeeForm, shift: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {SHIFTS.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Reporting Manager</label>
                      <input type="text" value={employeeForm.reportingManager} onChange={(e) => setEmployeeForm({ ...employeeForm, reportingManager: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Reporting manager" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Employment Status *</label>
                      <select value={employeeForm.employmentStatus} onChange={(e) => setEmployeeForm({ ...employeeForm, employmentStatus: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {EMPLOYMENT_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 3: Professional Details */}
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Professional Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Qualification</label>
                      <input type="text" value={employeeForm.qualification} onChange={(e) => setEmployeeForm({ ...employeeForm, qualification: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="e.g. MBBS" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Experience (Years)</label>
                      <input type="number" min="0" value={employeeForm.experience} onChange={(e) => setEmployeeForm({ ...employeeForm, experience: e.target.value === '' ? '' : parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Specialization</label>
                      <input type="text" value={employeeForm.specialization} onChange={(e) => setEmployeeForm({ ...employeeForm, specialization: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Specialization" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Medical Registration Number</label>
                      <input type="text" value={employeeForm.medicalRegistrationNumber} onChange={(e) => setEmployeeForm({ ...employeeForm, medicalRegistrationNumber: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Clinical staff only" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Registration Valid Till</label>
                      <input type="date" value={employeeForm.registrationValidTill} onChange={(e) => setEmployeeForm({ ...employeeForm, registrationValidTill: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                    </div>
                  </div>
                </div>

                {/* Section 4: Payroll Information */}
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Payroll Information</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Basic Salary *</label>
                      <input type="number" min="0" value={employeeForm.basicSalary} onChange={(e) => setEmployeeForm({ ...employeeForm, basicSalary: e.target.value === '' ? '' : parseInt(e.target.value) || 0 })} className={`w-full px-3 py-2 border ${employeeErrors.basicSalary ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {employeeErrors.basicSalary && <p className="text-[9px] text-rose-500 mt-1">{employeeErrors.basicSalary}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">HRA</label>
                      <input type="number" min="0" value={employeeForm.hra} onChange={(e) => setEmployeeForm({ ...employeeForm, hra: e.target.value === '' ? '' : parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Other Allowances</label>
                      <input type="number" min="0" value={employeeForm.otherAllowances} onChange={(e) => setEmployeeForm({ ...employeeForm, otherAllowances: e.target.value === '' ? '' : parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Gross Salary (Auto)</label>
                      <input type="text" value={`₹${liveGross.toLocaleString('en-IN')}`} readOnly className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-[10px] text-emerald-700 font-bold" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Bank Name</label>
                      <input type="text" value={employeeForm.bankName} onChange={(e) => setEmployeeForm({ ...employeeForm, bankName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Bank name" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Account Number</label>
                      <input type="text" value={employeeForm.accountNumber} onChange={(e) => setEmployeeForm({ ...employeeForm, accountNumber: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Account number" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">IFSC Code</label>
                      <input type="text" value={employeeForm.ifscCode} onChange={(e) => setEmployeeForm({ ...employeeForm, ifscCode: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="IFSC code" />
                    </div>
                  </div>
                </div>

                {/* Section 5: Emergency Contact */}
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Emergency Contact</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Contact Name</label>
                      <input type="text" value={employeeForm.emergencyContactName} onChange={(e) => setEmployeeForm({ ...employeeForm, emergencyContactName: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Contact name" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Relationship</label>
                      <input type="text" value={employeeForm.emergencyRelationship} onChange={(e) => setEmployeeForm({ ...employeeForm, emergencyRelationship: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Relationship" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Contact Number</label>
                      <input type="text" value={employeeForm.emergencyContactNumber} onChange={(e) => setEmployeeForm({ ...employeeForm, emergencyContactNumber: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Contact number" />
                    </div>
                  </div>
                </div>

                {/* Section 6: Documents */}
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Documents (Placeholders)</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {EMPLOYEE_DOCUMENTS.map((doc) => (
                      <div key={doc} className="flex items-center gap-2 px-3 py-2 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
                        <span className="text-slate-300">📄</span>
                        <span className="text-[9px] text-slate-500 font-medium">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsEmployeeModalOpen(false); setEditingEmployeeId(null); setEmployeeErrors({}); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingEmployeeId ? 'Save Changes' : 'Add Employee'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const [trainings, setTrainings] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_TRAINING);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch (e) { } }
    return SEED_TRAININGS;
  });
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);
  const [editingTrainingId, setEditingTrainingId] = useState(null);
  const [trainingSearch, setTrainingSearch] = useState('');
  const [trainingForm, setTrainingForm] = useState({ id: '', employeeId: '', department: '', trainingTitle: '', trainingCategory: '', trainer: '', trainingDate: '', durationHours: '', trainingMode: 'Offline', mandatory: 'No', attendanceStatus: 'Present', score: '', certificateIssued: 'No', remarks: '' });
  const [trainingErrors, setTrainingErrors] = useState({});

  const [certs, setCerts] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_CERT);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch (e) { } }
    return SEED_CERTS;
  });
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingCertId, setEditingCertId] = useState(null);
  const [certSearch, setCertSearch] = useState('');
  const [certForm, setCertForm] = useState({ id: '', employeeId: '', department: '', certificationName: '', issuingAuthority: '', issueDate: '', expiryDate: '', renewalRequired: 'No', certificationStatus: 'Active', documentPlaceholder: '', remarks: '' });
  const [certErrors, setCertErrors] = useState({});

  const [competencies, setCompetencies] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_COMPETENCY);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch (e) { } }
    return SEED_COMPETENCY;
  });
  const [isCompModalOpen, setIsCompModalOpen] = useState(false);
  const [editingCompId, setEditingCompId] = useState(null);
  const [compSearch, setCompSearch] = useState('');
  const [compForm, setCompForm] = useState({ id: '', employeeId: '', department: '', assessmentType: '', assessmentDate: '', evaluator: '', score: '', competencyLevel: 'Competent', nextAssessmentDate: '', status: 'Pending', remarks: '' });
  const [compErrors, setCompErrors] = useState({});

  const getNextTrainingId = () => {
    const maxNum = trainings.reduce((max, r) => { const parts = r.id.split('-'); const num = parseInt(parts[parts.length - 1], 10); return num > max ? num : max; }, 0);
    return `tr-${String(maxNum + 1).padStart(3, '0')}`;
  };
  const getNextCertId = () => {
    const maxNum = certs.reduce((max, r) => { const parts = r.id.split('-'); const num = parseInt(parts[parts.length - 1], 10); return num > max ? num : max; }, 0);
    return `cert-${String(maxNum + 1).padStart(3, '0')}`;
  };
  const getNextCompId = () => {
    const maxNum = competencies.reduce((max, r) => { const parts = r.id.split('-'); const num = parseInt(parts[parts.length - 1], 10); return num > max ? num : max; }, 0);
    return `comp-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const getEmployeeById = (id) => employees.find((e) => e.id === id);

  const handleEmployeeSelectTraining = (empId) => {
    const emp = getEmployeeById(empId);
    setTrainingForm((prev) => ({ ...prev, employeeId: empId, department: emp ? emp.department : '' }));
  };
  const handleEmployeeSelectCert = (empId) => {
    const emp = getEmployeeById(empId);
    setCertForm((prev) => ({ ...prev, employeeId: empId, department: emp ? emp.department : '' }));
  };
  const handleEmployeeSelectComp = (empId) => {
    const emp = getEmployeeById(empId);
    setCompForm((prev) => ({ ...prev, employeeId: empId, department: emp ? emp.department : '' }));
  };

  const validateTrainingForm = (form) => {
    const errors = {};
    if (!form.employeeId) errors.employeeId = 'Employee is required.';
    if (!form.department.trim()) errors.department = 'Department is required.';
    if (!form.trainingTitle.trim()) errors.trainingTitle = 'Training title is required.';
    if (!form.trainingCategory.trim()) errors.trainingCategory = 'Training category is required.';
    if (!form.trainer.trim()) errors.trainer = 'Trainer is required.';
    if (!form.trainingDate) errors.trainingDate = 'Training date is required.';
    if (form.durationHours === '' || isNaN(form.durationHours) || Number(form.durationHours) <= 0) errors.durationHours = 'Enter valid duration.';
    if (!form.trainingMode) errors.trainingMode = 'Training mode is required.';
    if (!form.mandatory) errors.mandatory = 'Mandatory flag is required.';
    if (!form.attendanceStatus) errors.attendanceStatus = 'Attendance status is required.';
    if (form.score === '' || isNaN(form.score) || Number(form.score) < 0 || Number(form.score) > 100) errors.score = 'Enter valid score (0-100).';
    if (!form.certificateIssued) errors.certificateIssued = 'Certificate status is required.';
    return errors;
  };
  const validateCertForm = (form) => {
    const errors = {};
    if (!form.employeeId) errors.employeeId = 'Employee is required.';
    if (!form.certificationName.trim()) errors.certificationName = 'Certification name is required.';
    if (!form.issuingAuthority.trim()) errors.issuingAuthority = 'Issuing authority is required.';
    if (!form.issueDate) errors.issueDate = 'Issue date is required.';
    if (!form.expiryDate) errors.expiryDate = 'Expiry date is required.';
    if (!form.renewalRequired) errors.renewalRequired = 'Renewal required is required.';
    return errors;
  };
  const validateCompForm = (form) => {
    const errors = {};
    if (!form.employeeId) errors.employeeId = 'Employee is required.';
    if (!form.department.trim()) errors.department = 'Department is required.';
    if (!form.assessmentType.trim()) errors.assessmentType = 'Assessment type is required.';
    if (!form.assessmentDate) errors.assessmentDate = 'Assessment date is required.';
    if (!form.evaluator.trim()) errors.evaluator = 'Evaluator is required.';
    if (form.score === '' || isNaN(form.score) || Number(form.score) < 0 || Number(form.score) > 100) errors.score = 'Enter valid score (0-100).';
    if (!form.competencyLevel) errors.competencyLevel = 'Competency level is required.';
    if (!form.nextAssessmentDate) errors.nextAssessmentDate = 'Next assessment date is required.';
    if (!form.status) errors.status = 'Status is required.';
    return errors;
  };

  const handleOpenTrainingModal = (record = null) => {
    if (record) { setTrainingForm({ ...record }); setEditingTrainingId(record.id); }
    else { setTrainingForm({ id: getNextTrainingId(), employeeId: '', department: '', trainingTitle: '', trainingCategory: '', trainer: '', trainingDate: '', durationHours: '', trainingMode: 'Offline', mandatory: 'No', attendanceStatus: 'Present', score: '', certificateIssued: 'No', remarks: '' }); setEditingTrainingId(null); }
    setTrainingErrors({}); setIsTrainingModalOpen(true);
  };
  const handleSaveTraining = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateTrainingForm(trainingForm);
    if (Object.keys(errors).length > 0) { setTrainingErrors(errors); return; }
    const cleaned = { ...trainingForm, department: trainingForm.department.trim(), trainingTitle: trainingForm.trainingTitle.trim(), trainingCategory: trainingForm.trainingCategory.trim(), trainer: trainingForm.trainer.trim(), durationHours: Number(trainingForm.durationHours) || 0, score: Number(trainingForm.score) || 0, remarks: trainingForm.remarks.trim() };
    if (editingTrainingId) setTrainings((prev) => prev.map((r) => (r.id === editingTrainingId ? { ...cleaned, id: editingTrainingId } : r)));
    else setTrainings((prev) => [...prev, cleaned]);
    setIsTrainingModalOpen(false); setEditingTrainingId(null); setTrainingErrors({});
  };
  const handleDeleteTraining = (id) => {
    const record = trainings.find((r) => r.id === id);
    if (window.confirm(`Delete training record "${record ? record.trainingTitle : id}"? This action cannot be undone.`)) setTrainings((prev) => prev.filter((r) => r.id !== id));
  };

  const handleOpenCertModal = (record = null) => {
    if (record) { setCertForm({ ...record }); setEditingCertId(record.id); }
    else { setCertForm({ id: getNextCertId(), employeeId: '', certificationName: '', issuingAuthority: '', issueDate: '', expiryDate: '', renewalRequired: 'No', certificationStatus: 'Active', documentPlaceholder: '', remarks: '' }); setEditingCertId(null); }
    setCertErrors({}); setIsCertModalOpen(true);
  };
  const handleSaveCert = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateCertForm(certForm);
    if (Object.keys(errors).length > 0) { setCertErrors(errors); return; }
    const cleaned = { ...certForm, certificationName: certForm.certificationName.trim(), issuingAuthority: certForm.issuingAuthority.trim(), documentPlaceholder: certForm.documentPlaceholder.trim(), remarks: certForm.remarks.trim(), department: certForm.department.trim() };
    if (isPastDate(cleaned.expiryDate)) cleaned.certificationStatus = 'Expired';
    if (editingCertId) setCerts((prev) => prev.map((r) => (r.id === editingCertId ? { ...cleaned, id: editingCertId } : r)));
    else setCerts((prev) => [...prev, cleaned]);
    setIsCertModalOpen(false); setEditingCertId(null); setCertErrors({});
  };
  const handleDeleteCert = (id) => {
    const record = certs.find((r) => r.id === id);
    if (window.confirm(`Delete certification record "${record ? record.certificationName : id}"? This action cannot be undone.`)) setCerts((prev) => prev.filter((r) => r.id !== id));
  };

  const handleOpenCompModal = (record = null) => {
    if (record) { setCompForm({ ...record }); setEditingCompId(record.id); }
    else { setCompForm({ id: getNextCompId(), employeeId: '', department: '', assessmentType: '', assessmentDate: '', evaluator: '', score: '', competencyLevel: 'Competent', nextAssessmentDate: '', status: 'Pending', remarks: '' }); setEditingCompId(null); }
    setCompErrors({}); setIsCompModalOpen(true);
  };
  const handleSaveComp = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateCompForm(compForm);
    if (Object.keys(errors).length > 0) { setCompErrors(errors); return; }
    const cleaned = { ...compForm, department: compForm.department.trim(), assessmentType: compForm.assessmentType.trim(), evaluator: compForm.evaluator.trim(), score: Number(compForm.score) || 0, remarks: compForm.remarks.trim() };
    if (editingCompId) setCompetencies((prev) => prev.map((r) => (r.id === editingCompId ? { ...cleaned, id: editingCompId } : r)));
    else setCompetencies((prev) => [...prev, cleaned]);
    setIsCompModalOpen(false); setEditingCompId(null); setCompErrors({});
  };
  const handleDeleteComp = (id) => {
    const record = competencies.find((r) => r.id === id);
    if (window.confirm(`Delete competency assessment "${record ? record.assessmentType : id}"? This action cannot be undone.`)) setCompetencies((prev) => prev.filter((r) => r.id !== id));
  };

  React.useEffect(() => { localStorage.setItem(LS_KEY_TRAINING, JSON.stringify(trainings)); }, [trainings]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_CERT, JSON.stringify(certs)); }, [certs]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_COMPETENCY, JSON.stringify(competencies)); }, [competencies]);

  const [attendances, setAttendances] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_ATTENDANCE);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch (e) { } }
    return SEED_ATTENDANCE;
  });
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [editingAttendanceId, setEditingAttendanceId] = useState(null);
  const [attendanceSearch, setAttendanceSearch] = useState('');
  const [attendanceForm, setAttendanceForm] = useState({ id: '', employeeId: '', department: '', attendanceDate: '', shift: 'Morning', checkInTime: '', checkOutTime: '', workingHours: 0, overtimeHours: 0, attendanceStatus: 'Present', remarks: '' });
  const [attendanceErrors, setAttendanceErrors] = useState({});

  const [leaves, setLeaves] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_LEAVE);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch (e) { } }
    return SEED_LEAVES;
  });
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [editingLeaveId, setEditingLeaveId] = useState(null);
  const [leaveSearch, setLeaveSearch] = useState('');
  const [leaveForm, setLeaveForm] = useState({ id: '', employeeId: '', department: '', leaveType: 'Casual Leave', fromDate: '', toDate: '', totalLeaveDays: 0, reason: '', approvalStatus: 'Pending', approvedBy: '', remarks: '' });
  const [leaveErrors, setLeaveErrors] = useState({});

  const [shifts, setShifts] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_SHIFT);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch (e) { } }
    return SEED_SHIFTS;
  });
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [editingShiftId, setEditingShiftId] = useState(null);
  const [shiftSearch, setShiftSearch] = useState('');
  const [shiftForm, setShiftForm] = useState({ id: '', employeeId: '', department: '', shift: 'Morning', startTime: '', endTime: '', weeklyOff: 'Sunday', effectiveFrom: '', status: 'Active' });
  const [shiftErrors, setShiftErrors] = useState({});

  const getNextAttendanceId = () => {
    const maxNum = attendances.reduce((max, r) => { const parts = r.id.split('-'); const num = parseInt(parts[parts.length - 1], 10); return num > max ? num : max; }, 0);
    return `att-${String(maxNum + 1).padStart(3, '0')}`;
  };
  const getNextLeaveId = () => {
    const maxNum = leaves.reduce((max, r) => { const parts = r.id.split('-'); const num = parseInt(parts[parts.length - 1], 10); return num > max ? num : max; }, 0);
    return `leave-${String(maxNum + 1).padStart(3, '0')}`;
  };
  const getNextShiftId = () => {
    const maxNum = shifts.reduce((max, r) => { const parts = r.id.split('-'); const num = parseInt(parts[parts.length - 1], 10); return num > max ? num : max; }, 0);
    return `shift-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleEmployeeSelectAttendance = (empId) => {
    const emp = getEmployeeById(empId);
    setAttendanceForm((prev) => ({ ...prev, employeeId: empId, department: emp ? emp.department : '' }));
  };
  const handleEmployeeSelectLeave = (empId) => {
    const emp = getEmployeeById(empId);
    setLeaveForm((prev) => ({ ...prev, employeeId: empId, department: emp ? emp.department : '' }));
  };
  const handleEmployeeSelectShift = (empId) => {
    const emp = getEmployeeById(empId);
    setShiftForm((prev) => ({ ...prev, employeeId: empId, department: emp ? emp.department : '' }));
  };

  const validateAttendanceForm = (form) => {
    const errors = {};
    if (!form.employeeId) errors.employeeId = 'Employee is required.';
    if (!form.department.trim()) errors.department = 'Department is required.';
    if (!form.attendanceDate) errors.attendanceDate = 'Attendance date is required.';
    if (!form.shift) errors.shift = 'Shift is required.';
    if (!form.checkInTime) errors.checkInTime = 'Check-in time is required.';
    if (!form.checkOutTime) errors.checkOutTime = 'Check-out time is required.';
    if (!form.attendanceStatus) errors.attendanceStatus = 'Attendance status is required.';
    return errors;
  };
  const validateLeaveForm = (form) => {
    const errors = {};
    if (!form.employeeId) errors.employeeId = 'Employee is required.';
    if (!form.department.trim()) errors.department = 'Department is required.';
    if (!form.leaveType) errors.leaveType = 'Leave type is required.';
    if (!form.fromDate) errors.fromDate = 'From date is required.';
    if (!form.toDate) errors.toDate = 'To date is required.';
    if (form.fromDate && form.toDate && form.toDate < form.fromDate) errors.toDate = 'To date cannot be before from date.';
    if (!form.reason.trim()) errors.reason = 'Reason is required.';
    if (!form.approvalStatus) errors.approvalStatus = 'Approval status is required.';
    return errors;
  };
  const validateShiftForm = (form) => {
    const errors = {};
    if (!form.employeeId) errors.employeeId = 'Employee is required.';
    if (!form.department.trim()) errors.department = 'Department is required.';
    if (!form.shift) errors.shift = 'Shift is required.';
    if (!form.startTime) errors.startTime = 'Start time is required.';
    if (!form.endTime) errors.endTime = 'End time is required.';
    if (!form.weeklyOff) errors.weeklyOff = 'Weekly off is required.';
    if (!form.effectiveFrom) errors.effectiveFrom = 'Effective from date is required.';
    if (!form.status) errors.status = 'Status is required.';
    return errors;
  };

  const handleOpenAttendanceModal = (record = null) => {
    if (record) { setAttendanceForm({ ...record }); setEditingAttendanceId(record.id); }
    else { setAttendanceForm({ id: getNextAttendanceId(), employeeId: '', department: '', attendanceDate: '', shift: 'Morning', checkInTime: '', checkOutTime: '', workingHours: 0, overtimeHours: 0, attendanceStatus: 'Present', remarks: '' }); setEditingAttendanceId(null); }
    setAttendanceErrors({}); setIsAttendanceModalOpen(true);
  };
  const handleSaveAttendance = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateAttendanceForm(attendanceForm);
    if (Object.keys(errors).length > 0) { setAttendanceErrors(errors); return; }
    const workingHours = calcWorkingHours(attendanceForm.checkInTime, attendanceForm.checkOutTime);
    const overtimeHours = calcOvertime(workingHours);
    const cleaned = { ...attendanceForm, department: attendanceForm.department.trim(), workingHours, overtimeHours, remarks: attendanceForm.remarks.trim() };
    if (editingAttendanceId) setAttendances((prev) => prev.map((r) => (r.id === editingAttendanceId ? { ...cleaned, id: editingAttendanceId } : r)));
    else setAttendances((prev) => [...prev, cleaned]);
    setIsAttendanceModalOpen(false); setEditingAttendanceId(null); setAttendanceErrors({});
  };
  const handleDeleteAttendance = (id) => {
    const record = attendances.find((r) => r.id === id);
    if (window.confirm(`Delete attendance record "${record ? record.id : id}"? This action cannot be undone.`)) setAttendances((prev) => prev.filter((r) => r.id !== id));
  };

  const handleOpenLeaveModal = (record = null) => {
    if (record) { setLeaveForm({ ...record }); setEditingLeaveId(record.id); }
    else { setLeaveForm({ id: getNextLeaveId(), employeeId: '', department: '', leaveType: 'Casual Leave', fromDate: '', toDate: '', totalLeaveDays: 0, reason: '', approvalStatus: 'Pending', approvedBy: '', remarks: '' }); setEditingLeaveId(null); }
    setLeaveErrors({}); setIsLeaveModalOpen(true);
  };
  const handleSaveLeave = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateLeaveForm(leaveForm);
    if (Object.keys(errors).length > 0) { setLeaveErrors(errors); return; }
    const totalLeaveDays = calcLeaveDays(leaveForm.fromDate, leaveForm.toDate);
    const cleaned = { ...leaveForm, department: leaveForm.department.trim(), totalLeaveDays, reason: leaveForm.reason.trim(), approvedBy: leaveForm.approvedBy.trim(), remarks: leaveForm.remarks.trim() };
    if (editingLeaveId) setLeaves((prev) => prev.map((r) => (r.id === editingLeaveId ? { ...cleaned, id: editingLeaveId } : r)));
    else setLeaves((prev) => [...prev, cleaned]);
    setIsLeaveModalOpen(false); setEditingLeaveId(null); setLeaveErrors({});
  };
  const handleDeleteLeave = (id) => {
    const record = leaves.find((r) => r.id === id);
    if (window.confirm(`Delete leave record "${record ? record.id : id}"? This action cannot be undone.`)) setLeaves((prev) => prev.filter((r) => r.id !== id));
  };

  const handleOpenShiftModal = (record = null) => {
    if (record) { setShiftForm({ ...record }); setEditingShiftId(record.id); }
    else { setShiftForm({ id: getNextShiftId(), employeeId: '', department: '', shift: 'Morning', startTime: '', endTime: '', weeklyOff: 'Sunday', effectiveFrom: '', status: 'Active' }); setEditingShiftId(null); }
    setShiftErrors({}); setIsShiftModalOpen(true);
  };
  const handleSaveShift = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateShiftForm(shiftForm);
    if (Object.keys(errors).length > 0) { setShiftErrors(errors); return; }
    const cleaned = { ...shiftForm, department: shiftForm.department.trim(), weeklyOff: shiftForm.weeklyOff.trim() };
    if (editingShiftId) setShifts((prev) => prev.map((r) => (r.id === editingShiftId ? { ...cleaned, id: editingShiftId } : r)));
    else setShifts((prev) => [...prev, cleaned]);
    setIsShiftModalOpen(false); setEditingShiftId(null); setShiftErrors({});
  };
  const handleDeleteShift = (id) => {
    const record = shifts.find((r) => r.id === id);
    if (window.confirm(`Delete shift roster "${record ? record.id : id}"? This action cannot be undone.`)) setShifts((prev) => prev.filter((r) => r.id !== id));
  };

  React.useEffect(() => { localStorage.setItem(LS_KEY_ATTENDANCE, JSON.stringify(attendances)); }, [attendances]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_LEAVE, JSON.stringify(leaves)); }, [leaves]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_SHIFT, JSON.stringify(shifts)); }, [shifts]);

  const [performances, setPerformances] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_PERFORMANCE);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch (e) { } }
    return SEED_PERFORMANCE;
  });
  const [isPerfModalOpen, setIsPerfModalOpen] = useState(false);
  const [editingPerfId, setEditingPerfId] = useState(null);
  const [perfSearch, setPerfSearch] = useState('');
  const [perfForm, setPerfForm] = useState({ id: '', employeeId: '', department: '', reviewer: '', reviewPeriod: '', technicalSkills: 3, communication: 3, teamwork: 3, patientCare: 3, documentation: 3, attendanceScore: 90, overallRating: 3, reviewStatus: 'Pending', comments: '' });
  const [perfErrors, setPerfErrors] = useState({});

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_GOALS);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch (e) { } }
    return SEED_GOALS;
  });
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [goalSearch, setGoalSearch] = useState('');
  const [goalForm, setGoalForm] = useState({ id: '', employeeId: '', department: '', goalTitle: '', goalDescription: '', startDate: '', targetDate: '', progress: 0, status: 'Not Started', remarks: '' });
  const [goalErrors, setGoalErrors] = useState({});

  const [promotions, setPromotions] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_PROMOTIONS);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch (e) { } }
    return SEED_PROMOTIONS;
  });
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [editingPromoId, setEditingPromoId] = useState(null);
  const [promoSearch, setPromoSearch] = useState('');
  const [promoForm, setPromoForm] = useState({ id: '', employeeId: '', department: '', currentDesignation: '', recommendedDesignation: '', promotionDate: '', salaryRevision: 0, promotionStatus: 'Pending', remarks: '' });
  const [promoErrors, setPromoErrors] = useState({});

  const getNextPerfId = () => {
    const maxNum = performances.reduce((max, r) => { const parts = r.id.split('-'); const num = parseInt(parts[parts.length - 1], 10); return num > max ? num : max; }, 0);
    return `perf-${String(maxNum + 1).padStart(3, '0')}`;
  };
  const getNextGoalId = () => {
    const maxNum = goals.reduce((max, r) => { const parts = r.id.split('-'); const num = parseInt(parts[parts.length - 1], 10); return num > max ? num : max; }, 0);
    return `goal-${String(maxNum + 1).padStart(3, '0')}`;
  };
  const getNextPromoId = () => {
    const maxNum = promotions.reduce((max, r) => { const parts = r.id.split('-'); const num = parseInt(parts[parts.length - 1], 10); return num > max ? num : max; }, 0);
    return `promo-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleEmployeeSelectPerf = (empId) => {
    const emp = getEmployeeById(empId);
    setPerfForm((prev) => ({ ...prev, employeeId: empId, department: emp ? emp.department : '' }));
  };
  const handleEmployeeSelectGoal = (empId) => {
    const emp = getEmployeeById(empId);
    setGoalForm((prev) => ({ ...prev, employeeId: empId, department: emp ? emp.department : '' }));
  };
  const handleEmployeeSelectPromo = (empId) => {
    const emp = getEmployeeById(empId);
    setPromoForm((prev) => ({ ...prev, employeeId: empId, department: emp ? emp.department : '', currentDesignation: emp ? emp.designation : '' }));
  };

  const validatePerfForm = (form) => {
    const errors = {};
    if (!form.employeeId) errors.employeeId = 'Employee is required.';
    if (!form.department.trim()) errors.department = 'Department is required.';
    if (!form.reviewer.trim()) errors.reviewer = 'Reviewer is required.';
    if (!form.reviewPeriod) errors.reviewPeriod = 'Review period is required.';
    if (!form.reviewStatus) errors.reviewStatus = 'Review status is required.';
    return errors;
  };
  const validateGoalForm = (form) => {
    const errors = {};
    if (!form.employeeId) errors.employeeId = 'Employee is required.';
    if (!form.department.trim()) errors.department = 'Department is required.';
    if (!form.goalTitle.trim()) errors.goalTitle = 'Goal title is required.';
    if (!form.startDate) errors.startDate = 'Start date is required.';
    if (!form.targetDate) errors.targetDate = 'Target date is required.';
    if (form.startDate && form.targetDate && form.targetDate < form.startDate) errors.targetDate = 'Target date cannot be before start date.';
    return errors;
  };
  const validatePromoForm = (form) => {
    const errors = {};
    if (!form.employeeId) errors.employeeId = 'Employee is required.';
    if (!form.department.trim()) errors.department = 'Department is required.';
    if (!form.currentDesignation.trim()) errors.currentDesignation = 'Current designation is required.';
    if (!form.recommendedDesignation.trim()) errors.recommendedDesignation = 'Recommended designation is required.';
    if (!form.promotionDate) errors.promotionDate = 'Promotion date is required.';
    if (!form.promotionStatus) errors.promotionStatus = 'Promotion status is required.';
    return errors;
  };

  const handleOpenPerfModal = (record = null) => {
    if (record) { setPerfForm({ ...record }); setEditingPerfId(record.id); }
    else { setPerfForm({ id: getNextPerfId(), employeeId: '', department: '', reviewer: '', reviewPeriod: '', technicalSkills: 3, communication: 3, teamwork: 3, patientCare: 3, documentation: 3, attendanceScore: 90, overallRating: 3, reviewStatus: 'Pending', comments: '' }); setEditingPerfId(null); }
    setPerfErrors({}); setIsPerfModalOpen(true);
  };
  const handleSavePerf = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validatePerfForm(perfForm);
    if (Object.keys(errors).length > 0) { setPerfErrors(errors); return; }
    const overallRating = calcOverallRating(perfForm.technicalSkills, perfForm.communication, perfForm.teamwork, perfForm.patientCare, perfForm.documentation, perfForm.attendanceScore);
    const cleaned = { ...perfForm, department: perfForm.department.trim(), reviewer: perfForm.reviewer.trim(), reviewPeriod: perfForm.reviewPeriod.trim(), comments: perfForm.comments.trim(), overallRating };
    if (editingPerfId) setPerformances((prev) => prev.map((r) => (r.id === editingPerfId ? { ...cleaned, id: editingPerfId } : r)));
    else setPerformances((prev) => [...prev, cleaned]);
    setIsPerfModalOpen(false); setEditingPerfId(null); setPerfErrors({});
  };
  const handleDeletePerf = (id) => {
    const record = performances.find((r) => r.id === id);
    if (window.confirm(`Delete performance review "${record ? record.id : id}"? This action cannot be undone.`)) setPerformances((prev) => prev.filter((r) => r.id !== id));
  };

  const handleOpenGoalModal = (record = null) => {
    if (record) { setGoalForm({ ...record }); setEditingGoalId(record.id); }
    else { setGoalForm({ id: getNextGoalId(), employeeId: '', department: '', goalTitle: '', goalDescription: '', startDate: '', targetDate: '', progress: 0, status: 'Not Started', remarks: '' }); setEditingGoalId(null); }
    setGoalErrors({}); setIsGoalModalOpen(true);
  };
  const handleSaveGoal = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateGoalForm(goalForm);
    if (Object.keys(errors).length > 0) { setGoalErrors(errors); return; }
    const status = calcGoalStatus(goalForm.progress);
    const cleaned = { ...goalForm, department: goalForm.department.trim(), goalTitle: goalForm.goalTitle.trim(), goalDescription: goalForm.goalDescription.trim(), remarks: goalForm.remarks.trim(), status };
    if (editingGoalId) setGoals((prev) => prev.map((r) => (r.id === editingGoalId ? { ...cleaned, id: editingGoalId } : r)));
    else setGoals((prev) => [...prev, cleaned]);
    setIsGoalModalOpen(false); setEditingGoalId(null); setGoalErrors({});
  };
  const handleDeleteGoal = (id) => {
    const record = goals.find((r) => r.id === id);
    if (window.confirm(`Delete goal "${record ? record.id : id}"? This action cannot be undone.`)) setGoals((prev) => prev.filter((r) => r.id !== id));
  };

  const handleOpenPromoModal = (record = null) => {
    if (record) { setPromoForm({ ...record }); setEditingPromoId(record.id); }
    else { setPromoForm({ id: getNextPromoId(), employeeId: '', department: '', currentDesignation: '', recommendedDesignation: '', promotionDate: '', salaryRevision: 0, promotionStatus: 'Pending', remarks: '' }); setEditingPromoId(null); }
    setPromoErrors({}); setIsPromoModalOpen(true);
  };
  const handleSavePromo = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validatePromoForm(promoForm);
    if (Object.keys(errors).length > 0) { setPromoErrors(errors); return; }
    const cleaned = { ...promoForm, department: promoForm.department.trim(), currentDesignation: promoForm.currentDesignation.trim(), recommendedDesignation: promoForm.recommendedDesignation.trim(), remarks: promoForm.remarks.trim() };
    if (editingPromoId) setPromotions((prev) => prev.map((r) => (r.id === editingPromoId ? { ...cleaned, id: editingPromoId } : r)));
    else setPromotions((prev) => [...prev, cleaned]);
    setIsPromoModalOpen(false); setEditingPromoId(null); setPromoErrors({});
  };
  const handleDeletePromo = (id) => {
    const record = promotions.find((r) => r.id === id);
    if (window.confirm(`Delete promotion record "${record ? record.id : id}"? This action cannot be undone.`)) setPromotions((prev) => prev.filter((r) => r.id !== id));
  };

  React.useEffect(() => { localStorage.setItem(LS_KEY_PERFORMANCE, JSON.stringify(performances)); }, [performances]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_GOALS, JSON.stringify(goals)); }, [goals]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_PROMOTIONS, JSON.stringify(promotions)); }, [promotions]);

  const [audits, setAudits] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_AUDITS);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch (e) { } }
    return SEED_AUDITS;
  });
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [editingAuditId, setEditingAuditId] = useState(null);
  const [auditSearch, setAuditSearch] = useState('');
  const [auditForm, setAuditForm] = useState({ id: '', auditDate: '', auditType: 'Internal', department: 'Medical', auditor: '', scope: '', complianceScore: '', findings: '', observationCategory: 'Minor', critical: 0, major: 0, minor: 0, recommendation: '', targetClosureDate: '', auditStatus: 'Pending', remarks: '' });
  const [auditErrors, setAuditErrors] = useState({});

  const [capas, setCapas] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_CAPA);
    if (saved) { try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length) return p; } catch (e) { } }
    return SEED_CAPA;
  });
  const [isCapaModalOpen, setIsCapaModalOpen] = useState(false);
  const [editingCapaId, setEditingCapaId] = useState(null);
  const [capaSearch, setCapaSearch] = useState('');
  const [capaForm, setCapaForm] = useState({ id: '', linkedAudit: '', department: '', capaDescription: '', rootCause: '', correctiveAction: '', preventiveAction: '', responsiblePerson: '', targetDate: '', completionDate: '', status: 'Open', remarks: '' });
  const [capaErrors, setCapaErrors] = useState({});

  const getNextAuditId = () => {
    const maxNum = audits.reduce((max, r) => { const parts = r.id.split('-'); const num = parseInt(parts[parts.length - 1], 10); return num > max ? num : max; }, 0);
    return `aud-${String(maxNum + 1).padStart(3, '0')}`;
  };
  const getNextCapaId = () => {
    const maxNum = capas.reduce((max, r) => { const parts = r.id.split('-'); const num = parseInt(parts[parts.length - 1], 10); return num > max ? num : max; }, 0);
    return `capa-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const validateAuditForm = (form) => {
    const errors = {};
    if (!form.auditDate) errors.auditDate = 'Audit date is required.';
    if (!form.auditType) errors.auditType = 'Audit type is required.';
    if (!form.department.trim()) errors.department = 'Department is required.';
    if (!form.auditor.trim()) errors.auditor = 'Auditor is required.';
    if (!form.scope.trim()) errors.scope = 'Scope is required.';
    if (form.complianceScore === '' || isNaN(form.complianceScore) || Number(form.complianceScore) < 0 || Number(form.complianceScore) > 100) errors.complianceScore = 'Enter valid compliance score (0-100).';
    if (!form.findings.trim()) errors.findings = 'Findings are required.';
    if (!form.observationCategory) errors.observationCategory = 'Observation category is required.';
    if (!form.recommendation.trim()) errors.recommendation = 'Recommendation is required.';
    if (!form.targetClosureDate) errors.targetClosureDate = 'Target closure date is required.';
    if (!form.auditStatus) errors.auditStatus = 'Audit status is required.';
    return errors;
  };

  const validateCapaForm = (form) => {
    const errors = {};
    if (!form.linkedAudit) errors.linkedAudit = 'Linked audit is required.';
    if (!form.department.trim()) errors.department = 'Department is required.';
    if (!form.capaDescription.trim()) errors.capaDescription = 'CAPA description is required.';
    if (!form.rootCause.trim()) errors.rootCause = 'Root cause is required.';
    if (!form.correctiveAction.trim()) errors.correctiveAction = 'Corrective action is required.';
    if (!form.preventiveAction.trim()) errors.preventiveAction = 'Preventive action is required.';
    if (!form.responsiblePerson.trim()) errors.responsiblePerson = 'Responsible person is required.';
    if (!form.targetDate) errors.targetDate = 'Target date is required.';
    if (!form.status) errors.status = 'Status is required.';
    return errors;
  };

  const handleOpenAuditModal = (record = null) => {
    if (record) { setAuditForm({ ...record }); setEditingAuditId(record.id); }
    else { setAuditForm({ id: getNextAuditId(), auditDate: '', auditType: 'Internal', department: 'Medical', auditor: '', scope: '', complianceScore: '', findings: '', observationCategory: 'Minor', critical: 0, major: 0, minor: 0, recommendation: '', targetClosureDate: '', auditStatus: 'Pending', remarks: '' }); setEditingAuditId(null); }
    setAuditErrors({}); setIsAuditModalOpen(true);
  };
  const handleSaveAudit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateAuditForm(auditForm);
    if (Object.keys(errors).length > 0) { setAuditErrors(errors); return; }
    const cleaned = { ...auditForm, department: auditForm.department.trim(), auditor: auditForm.auditor.trim(), scope: auditForm.scope.trim(), findings: auditForm.findings.trim(), recommendation: auditForm.recommendation.trim(), remarks: auditForm.remarks.trim(), complianceScore: Number(auditForm.complianceScore) || 0, critical: Number(auditForm.critical) || 0, major: Number(auditForm.major) || 0, minor: Number(auditForm.minor) || 0 };
    if (editingAuditId) setAudits((prev) => prev.map((r) => (r.id === editingAuditId ? { ...cleaned, id: editingAuditId } : r)));
    else setAudits((prev) => [...prev, cleaned]);
    setIsAuditModalOpen(false); setEditingAuditId(null); setAuditErrors({});
  };
  const handleDeleteAudit = (id) => {
    const record = audits.find((r) => r.id === id);
    if (window.confirm(`Delete audit record "${record ? record.id : id}"? This action cannot be undone.`)) setAudits((prev) => prev.filter((r) => r.id !== id));
  };

  const handleOpenCapaModal = (record = null) => {
    if (record) { setCapaForm({ ...record }); setEditingCapaId(record.id); }
    else { setCapaForm({ id: getNextCapaId(), linkedAudit: '', department: '', capaDescription: '', rootCause: '', correctiveAction: '', preventiveAction: '', responsiblePerson: '', targetDate: '', completionDate: '', status: 'Open', remarks: '' }); setEditingCapaId(null); }
    setCapaErrors({}); setIsCapaModalOpen(true);
  };
  const handleSaveCapa = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = validateCapaForm(capaForm);
    if (Object.keys(errors).length > 0) { setCapaErrors(errors); return; }
    let status = capaForm.status;
    if (capaForm.completionDate) {
      status = 'Closed';
    } else if (capaForm.targetDate && new Date(capaForm.targetDate) < new Date(todayStr()) && !capaForm.completionDate) {
      status = 'Overdue';
    }
    const cleaned = { ...capaForm, linkedAudit: capaForm.linkedAudit, department: capaForm.department.trim(), capaDescription: capaForm.capaDescription.trim(), rootCause: capaForm.rootCause.trim(), correctiveAction: capaForm.correctiveAction.trim(), preventiveAction: capaForm.preventiveAction.trim(), responsiblePerson: capaForm.responsiblePerson.trim(), remarks: capaForm.remarks.trim(), status };
    if (editingCapaId) setCapas((prev) => prev.map((r) => (r.id === editingCapaId ? { ...cleaned, id: editingCapaId } : r)));
    else setCapas((prev) => [...prev, cleaned]);
    setIsCapaModalOpen(false); setEditingCapaId(null); setCapaErrors({});
  };
  const handleDeleteCapa = (id) => {
    const record = capas.find((r) => r.id === id);
    if (window.confirm(`Delete CAPA record "${record ? record.id : id}"? This action cannot be undone.`)) setCapas((prev) => prev.filter((r) => r.id !== id));
  };

  React.useEffect(() => { localStorage.setItem(LS_KEY_AUDITS, JSON.stringify(audits)); }, [audits]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_CAPA, JSON.stringify(capas)); }, [capas]);

  const AuditTab = ({ hospital }) => {
    const STATUS_BADGE_AUDIT = {
      Scheduled: 'bg-sky-50 text-sky-700 border-sky-200',
      Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    };
    const STATUS_BADGE_CAPA = {
      Open: 'bg-amber-50 text-amber-700 border-amber-200',
      'In Progress': 'bg-sky-50 text-sky-700 border-sky-200',
      Closed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      Overdue: 'bg-rose-50 text-rose-700 border-rose-200',
    };

    const totalAudits = audits.length;
    const completedAudits = audits.filter((a) => a.auditStatus === 'Completed').length;
    const pendingAudits = audits.filter((a) => a.auditStatus === 'Pending').length;
    const scheduledAudits = audits.filter((a) => a.auditStatus === 'Scheduled').length;
    const avgCompliance = totalAudits ? Math.round(audits.reduce((s, a) => s + (Number(a.complianceScore) || 0), 0) / totalAudits) : 0;
    const totalCritical = audits.reduce((s, a) => s + (Number(a.critical) || 0), 0);
    const totalMajor = audits.reduce((s, a) => s + (Number(a.major) || 0), 0);
    const totalMinor = audits.reduce((s, a) => s + (Number(a.minor) || 0), 0);

    const totalCapas = capas.length;
    const capaOpen = capas.filter((c) => c.status === 'Open').length;
    const capaInProgress = capas.filter((c) => c.status === 'In Progress').length;
    const capaClosed = capas.filter((c) => c.status === 'Closed').length;
    const capaOverdue = capas.filter((c) => c.status === 'Overdue').length;

    const auditMatches = (r) => {
      const q = auditSearch.toLowerCase();
      return (
        r.id.toLowerCase().includes(q) ||
        r.auditType.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.auditor.toLowerCase().includes(q) ||
        r.findings.toLowerCase().includes(q) ||
        r.observationCategory.toLowerCase().includes(q) ||
        r.auditStatus.toLowerCase().includes(q)
      );
    };

    const capaMatches = (r) => {
      const q = capaSearch.toLowerCase();
      const linked = audits.find((a) => a.id === r.linkedAudit);
      return (
        r.id.toLowerCase().includes(q) ||
        (linked ? linked.auditType.toLowerCase().includes(q) : false) ||
        r.department.toLowerCase().includes(q) ||
        r.capaDescription.toLowerCase().includes(q) ||
        r.responsiblePerson.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q)
      );
    };

    return (
      <div className="space-y-8">
        {/* Module 1: HR Internal Audit */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-extrabold text-slate-800">HR Internal Audit</h3>
              <p className="text-[9px] text-slate-400 mt-0.5">Hospital audits, findings &amp; compliance</p>
            </div>
            <button
              onClick={() => handleOpenAuditModal()}
              style={{ backgroundColor: hospital.themeColor }}
              className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Audit
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Total Audits', value: totalAudits, color: 'text-blue-600' },
              { label: 'Completed', value: completedAudits, color: 'text-emerald-600' },
              { label: 'Pending', value: pendingAudits, color: 'text-amber-600' },
              { label: 'Scheduled', value: scheduledAudits, color: 'text-sky-600' },
              { label: 'Avg Compliance %', value: `${avgCompliance}%`, color: 'text-teal-600' },
              { label: 'Critical Findings', value: totalCritical, color: 'text-rose-600' },
              { label: 'Major Findings', value: totalMajor, color: 'text-violet-600' },
              { label: 'Minor Findings', value: totalMinor, color: 'text-indigo-600' },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by ID, type, department, auditor, findings..."
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-[10px]">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {['ID', 'Audit Type', 'Department', 'Auditor', 'Date', 'Compliance %', 'Observation', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {audits.filter(auditMatches).map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                      <td className="px-3 py-3 font-semibold text-slate-700">{r.auditType}</td>
                      <td className="px-3 py-3 text-slate-600">{r.department}</td>
                      <td className="px-3 py-3 text-slate-600">{r.auditor}</td>
                      <td className="px-3 py-3 text-slate-600">{r.auditDate}</td>
                      <td className="px-3 py-3 text-emerald-600 font-bold">{r.complianceScore}%</td>
                      <td className="px-3 py-3 text-slate-600">{r.observationCategory}</td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_AUDIT[r.auditStatus] || STATUS_BADGE_AUDIT.Pending}`}>{r.auditStatus}</span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleOpenAuditModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                          <button onClick={() => handleDeleteAudit(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {audits.filter(auditMatches).length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-3 py-10 text-center">
                        {auditSearch ? (
                          <span className="text-[10px] text-slate-400">No audit records match your search.</span>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-2">
                            <span className="text-3xl">🔍</span>
                            <span className="text-[10px] text-slate-400 font-medium">No audit records registered yet.</span>
                            <button onClick={() => handleOpenAuditModal()} style={{ backgroundColor: hospital.themeColor }} className="mt-1 px-3 py-1.5 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all shadow-sm cursor-pointer">Add First Audit</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
              <span className="text-[9px] text-slate-400 font-medium">Showing {audits.filter(auditMatches).length} of {audits.length} audit{audits.length !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {isAuditModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[92vh] overflow-y-auto custom-scroll">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800">{editingAuditId ? 'Edit Audit' : 'Add Audit'}</h3>
                    <p className="text-[9px] text-slate-400 mt-0.5">HR Internal Audit</p>
                  </div>
                  <button onClick={() => { setIsAuditModalOpen(false); setEditingAuditId(null); setAuditErrors({}); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>

                <form onSubmit={handleSaveAudit} className="space-y-5">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Audit Details</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Date *</label>
                        <input type="date" value={auditForm.auditDate} onChange={(e) => setAuditForm({ ...auditForm, auditDate: e.target.value })} className={`w-full px-3 py-2 border ${auditErrors.auditDate ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                        {auditErrors.auditDate && <p className="text-[9px] text-rose-500 mt-1">{auditErrors.auditDate}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Type *</label>
                        <select value={auditForm.auditType} onChange={(e) => setAuditForm({ ...auditForm, auditType: e.target.value })} className={`w-full px-3 py-2 border ${auditErrors.auditType ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                          {AUDIT_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                        {auditErrors.auditType && <p className="text-[9px] text-rose-500 mt-1">{auditErrors.auditType}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Department *</label>
                        <input type="text" value={auditForm.department} onChange={(e) => setAuditForm({ ...auditForm, department: e.target.value })} className={`w-full px-3 py-2 border ${auditErrors.department ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Department" />
                        {auditErrors.department && <p className="text-[9px] text-rose-500 mt-1">{auditErrors.department}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Auditor *</label>
                        <input type="text" value={auditForm.auditor} onChange={(e) => setAuditForm({ ...auditForm, auditor: e.target.value })} className={`w-full px-3 py-2 border ${auditErrors.auditor ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Auditor" />
                        {auditErrors.auditor && <p className="text-[9px] text-rose-500 mt-1">{auditErrors.auditor}</p>}
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Scope *</label>
                        <input type="text" value={auditForm.scope} onChange={(e) => setAuditForm({ ...auditForm, scope: e.target.value })} className={`w-full px-3 py-2 border ${auditErrors.scope ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Audit scope" />
                        {auditErrors.scope && <p className="text-[9px] text-rose-500 mt-1">{auditErrors.scope}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Compliance Score (0-100) *</label>
                        <input type="number" min="0" max="100" value={auditForm.complianceScore} onChange={(e) => setAuditForm({ ...auditForm, complianceScore: e.target.value === '' ? '' : parseInt(e.target.value) || 0 })} className={`w-full px-3 py-2 border ${auditErrors.complianceScore ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                        {auditErrors.complianceScore && <p className="text-[9px] text-rose-500 mt-1">{auditErrors.complianceScore}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Observation Category *</label>
                        <select value={auditForm.observationCategory} onChange={(e) => setAuditForm({ ...auditForm, observationCategory: e.target.value })} className={`w-full px-3 py-2 border ${auditErrors.observationCategory ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                          {OBSERVATION_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                        {auditErrors.observationCategory && <p className="text-[9px] text-rose-500 mt-1">{auditErrors.observationCategory}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Critical</label>
                        <input type="number" min="0" value={auditForm.critical} onChange={(e) => setAuditForm({ ...auditForm, critical: e.target.value === '' ? '' : parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Major</label>
                        <input type="number" min="0" value={auditForm.major} onChange={(e) => setAuditForm({ ...auditForm, major: e.target.value === '' ? '' : parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Minor</label>
                        <input type="number" min="0" value={auditForm.minor} onChange={(e) => setAuditForm({ ...auditForm, minor: e.target.value === '' ? '' : parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Findings *</label>
                        <input type="text" value={auditForm.findings} onChange={(e) => setAuditForm({ ...auditForm, findings: e.target.value })} className={`w-full px-3 py-2 border ${auditErrors.findings ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Findings" />
                        {auditErrors.findings && <p className="text-[9px] text-rose-500 mt-1">{auditErrors.findings}</p>}
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Recommendation *</label>
                        <input type="text" value={auditForm.recommendation} onChange={(e) => setAuditForm({ ...auditForm, recommendation: e.target.value })} className={`w-full px-3 py-2 border ${auditErrors.recommendation ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Recommendation" />
                        {auditErrors.recommendation && <p className="text-[9px] text-rose-500 mt-1">{auditErrors.recommendation}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Target Closure Date *</label>
                        <input type="date" value={auditForm.targetClosureDate} onChange={(e) => setAuditForm({ ...auditForm, targetClosureDate: e.target.value })} className={`w-full px-3 py-2 border ${auditErrors.targetClosureDate ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                        {auditErrors.targetClosureDate && <p className="text-[9px] text-rose-500 mt-1">{auditErrors.targetClosureDate}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Status *</label>
                        <select value={auditForm.auditStatus} onChange={(e) => setAuditForm({ ...auditForm, auditStatus: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                          {AUDIT_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                        <input type="text" value={auditForm.remarks} onChange={(e) => setAuditForm({ ...auditForm, remarks: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Remarks" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onClick={() => { setIsAuditModalOpen(false); setEditingAuditId(null); setAuditErrors({}); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                    <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingAuditId ? 'Save Changes' : 'Add Audit'}</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Module 2: CAPA Tracker */}
        <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-extrabold text-slate-800">CAPA Tracker</h3>
              <p className="text-[9px] text-slate-400 mt-0.5">Corrective &amp; preventive action follow-ups</p>
            </div>
            <button
              onClick={() => handleOpenCapaModal()}
              style={{ backgroundColor: hospital.themeColor }}
              className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add CAPA
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Total CAPAs', value: totalCapas, color: 'text-blue-600' },
              { label: 'Open', value: capaOpen, color: 'text-amber-600' },
              { label: 'In Progress', value: capaInProgress, color: 'text-sky-600' },
              { label: 'Closed', value: capaClosed, color: 'text-emerald-600' },
              { label: 'Overdue', value: capaOverdue, color: 'text-rose-600' },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by ID, description, department, responsible person..."
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
                    {['ID', 'Linked Audit', 'Department', 'Description', 'Responsible', 'Target Date', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {capas.filter(capaMatches).map((r) => {
                    const linked = audits.find((a) => a.id === r.linkedAudit);
                    return (
                      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                        <td className="px-3 py-3 font-semibold text-slate-700">{linked ? linked.auditType : r.linkedAudit}</td>
                        <td className="px-3 py-3 text-slate-600">{r.department}</td>
                        <td className="px-3 py-3 text-slate-600">{r.capaDescription}</td>
                        <td className="px-3 py-3 text-slate-600">{r.responsiblePerson}</td>
                        <td className="px-3 py-3 text-slate-600">{r.targetDate}</td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_CAPA[r.status] || STATUS_BADGE_CAPA.Open}`}>{r.status}</span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleOpenCapaModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                            <button onClick={() => handleDeleteCapa(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {capas.filter(capaMatches).length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-3 py-10 text-center">
                        {capaSearch ? (
                          <span className="text-[10px] text-slate-400">No CAPA records match your search.</span>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-2">
                            <span className="text-3xl">🛠️</span>
                            <span className="text-[10px] text-slate-400 font-medium">No CAPA records registered yet.</span>
                            <button onClick={() => handleOpenCapaModal()} style={{ backgroundColor: hospital.themeColor }} className="mt-1 px-3 py-1.5 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all shadow-sm cursor-pointer">Add First CAPA</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
              <span className="text-[9px] text-slate-400 font-medium">Showing {capas.filter(capaMatches).length} of {capas.length} CAPA{capas.length !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {isCapaModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[92vh] overflow-y-auto custom-scroll">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800">{editingCapaId ? 'Edit CAPA' : 'Add CAPA'}</h3>
                    <p className="text-[9px] text-slate-400 mt-0.5">CAPA Tracker</p>
                  </div>
                  <button onClick={() => { setIsCapaModalOpen(false); setEditingCapaId(null); setCapaErrors({}); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>

                <form onSubmit={handleSaveCapa} className="space-y-5">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">CAPA Details</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Linked Audit *</label>
                        <select value={capaForm.linkedAudit} onChange={(e) => setCapaForm({ ...capaForm, linkedAudit: e.target.value })} className={`w-full px-3 py-2 border ${capaErrors.linkedAudit ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                          <option value="">Select Audit</option>
                          {audits.map((a) => (
                            <option key={a.id} value={a.id}>{a.id} — {a.auditType} ({a.department})</option>
                          ))}
                        </select>
                        {capaErrors.linkedAudit && <p className="text-[9px] text-rose-500 mt-1">{capaErrors.linkedAudit}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Department *</label>
                        <input type="text" value={capaForm.department} onChange={(e) => setCapaForm({ ...capaForm, department: e.target.value })} className={`w-full px-3 py-2 border ${capaErrors.department ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Department" />
                        {capaErrors.department && <p className="text-[9px] text-rose-500 mt-1">{capaErrors.department}</p>}
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">CAPA Description *</label>
                        <input type="text" value={capaForm.capaDescription} onChange={(e) => setCapaForm({ ...capaForm, capaDescription: e.target.value })} className={`w-full px-3 py-2 border ${capaErrors.capaDescription ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="CAPA description" />
                        {capaErrors.capaDescription && <p className="text-[9px] text-rose-500 mt-1">{capaErrors.capaDescription}</p>}
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Root Cause *</label>
                        <input type="text" value={capaForm.rootCause} onChange={(e) => setCapaForm({ ...capaForm, rootCause: e.target.value })} className={`w-full px-3 py-2 border ${capaErrors.rootCause ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Root cause" />
                        {capaErrors.rootCause && <p className="text-[9px] text-rose-500 mt-1">{capaErrors.rootCause}</p>}
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Corrective Action *</label>
                        <input type="text" value={capaForm.correctiveAction} onChange={(e) => setCapaForm({ ...capaForm, correctiveAction: e.target.value })} className={`w-full px-3 py-2 border ${capaErrors.correctiveAction ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Corrective action" />
                        {capaErrors.correctiveAction && <p className="text-[9px] text-rose-500 mt-1">{capaErrors.correctiveAction}</p>}
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Preventive Action *</label>
                        <input type="text" value={capaForm.preventiveAction} onChange={(e) => setCapaForm({ ...capaForm, preventiveAction: e.target.value })} className={`w-full px-3 py-2 border ${capaErrors.preventiveAction ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Preventive action" />
                        {capaErrors.preventiveAction && <p className="text-[9px] text-rose-500 mt-1">{capaErrors.preventiveAction}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Responsible Person *</label>
                        <input type="text" value={capaForm.responsiblePerson} onChange={(e) => setCapaForm({ ...capaForm, responsiblePerson: e.target.value })} className={`w-full px-3 py-2 border ${capaErrors.responsiblePerson ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Responsible person" />
                        {capaErrors.responsiblePerson && <p className="text-[9px] text-rose-500 mt-1">{capaErrors.responsiblePerson}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Target Date *</label>
                        <input type="date" value={capaForm.targetDate} onChange={(e) => setCapaForm({ ...capaForm, targetDate: e.target.value })} className={`w-full px-3 py-2 border ${capaErrors.targetDate ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                        {capaErrors.targetDate && <p className="text-[9px] text-rose-500 mt-1">{capaErrors.targetDate}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Completion Date</label>
                        <input type="date" value={capaForm.completionDate} onChange={(e) => setCapaForm({ ...capaForm, completionDate: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                        <select value={capaForm.status} onChange={(e) => setCapaForm({ ...capaForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                          {CAPA_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                        <input type="text" value={capaForm.remarks} onChange={(e) => setCapaForm({ ...capaForm, remarks: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Remarks" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onClick={() => { setIsCapaModalOpen(false); setEditingCapaId(null); setCapaErrors({}); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                    <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingCapaId ? 'Save Changes' : 'Add CAPA'}</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const TrainingTab = ({ hospital, employees }) => {
    const filtered = trainings.filter((r) => {
      const q = trainingSearch.toLowerCase();
      const emp = getEmployeeById(r.employeeId);
      const empName = emp ? emp.fullName.toLowerCase() : '';
      const matchesSearch =
        r.id.toLowerCase().includes(q) ||
        r.trainingTitle.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.trainer.toLowerCase().includes(q) ||
        empName.includes(q) ||
        r.trainingCategory.toLowerCase().includes(q);
      return matchesSearch;
    });

    const total = trainings.length;
    const completed = trainings.filter((r) => r.attendanceStatus === 'Present').length;
    const mandatoryCount = trainings.filter((r) => r.mandatory === 'Yes').length;
    const certIssued = trainings.filter((r) => r.certificateIssued === 'Yes').length;
    const totalHours = trainings.reduce((sum, r) => sum + (Number(r.durationHours) || 0), 0);
    const avgScore = total ? Math.round(trainings.reduce((sum, r) => sum + (Number(r.score) || 0), 0) / total) : 0;
    const attendanceRate = total ? Math.round((completed / total) * 100) : 0;
    const compliance = total ? Math.round((mandatoryCount / total) * 100) : 0;

    return (
      <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Training Register</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Employee training records &amp; compliance</p>
          </div>
          <button
            onClick={() => handleOpenTrainingModal()}
            style={{ backgroundColor: hospital.themeColor }}
            className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Training
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Trainings', value: total, color: 'text-blue-600' },
            { label: 'Completed', value: completed, color: 'text-emerald-600' },
            { label: 'Mandatory', value: mandatoryCount, color: 'text-violet-600' },
            { label: 'Certificates Issued', value: certIssued, color: 'text-sky-600' },
            { label: 'Training Hours', value: totalHours, color: 'text-indigo-600' },
            { label: 'Average Score', value: avgScore, color: 'text-teal-600' },
            { label: 'Attendance Rate', value: `${attendanceRate}%`, color: 'text-amber-600' },
            { label: 'Compliance %', value: `${compliance}%`, color: 'text-rose-600' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID, employee, department, training..."
              value={trainingSearch}
              onChange={(e) => setTrainingSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['ID', 'Employee', 'Department', 'Training Title', 'Category', 'Date', 'Mode', 'Attendance', 'Score', 'Actions'].map((h) => (
                    <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((r) => {
                  const emp = getEmployeeById(r.employeeId);
                  return (
                    <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                      <td className="px-3 py-3 font-semibold text-slate-700">{emp ? emp.fullName : r.employeeId}</td>
                      <td className="px-3 py-3 text-slate-600">{r.department}</td>
                      <td className="px-3 py-3 font-semibold text-slate-700">{r.trainingTitle}</td>
                      <td className="px-3 py-3 text-slate-600">{r.trainingCategory}</td>
                      <td className="px-3 py-3 text-slate-600">{r.trainingDate}</td>
                      <td className="px-3 py-3">
                        <span className="px-2 py-0.5 rounded-full text-[8px] font-bold border bg-slate-50 text-slate-600 border-slate-200">{r.trainingMode}</span>
                      </td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_TRAINING[r.attendanceStatus] || STATUS_BADGE_TRAINING.Present}`}>{r.attendanceStatus}</span>
                      </td>
                      <td className="px-3 py-3 text-slate-700">{r.score}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleOpenTrainingModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                          <button onClick={() => handleDeleteTraining(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-3 py-10 text-center">
                      {trainingSearch ? (
                        <span className="text-[10px] text-slate-400">No training records match your search.</span>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-3xl">🎓</span>
                          <span className="text-[10px] text-slate-400 font-medium">No training records registered yet.</span>
                          <button onClick={() => handleOpenTrainingModal()} style={{ backgroundColor: hospital.themeColor }} className="mt-1 px-3 py-1.5 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all shadow-sm cursor-pointer">Add First Training</button>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
            <span className="text-[9px] text-slate-400 font-medium">Showing {filtered.length} of {trainings.length} training{trainings.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {isTrainingModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[92vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingTrainingId ? 'Edit Training Record' : 'Add Training Record'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Training Register</p>
                </div>
                <button onClick={() => { setIsTrainingModalOpen(false); setEditingTrainingId(null); setTrainingErrors({}); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveTraining} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Training Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Employee *</label>
                      <select value={trainingForm.employeeId} onChange={(e) => handleEmployeeSelectTraining(e.target.value)} className={`w-full px-3 py-2 border ${trainingErrors.employeeId ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (
                          <option key={emp.id} value={emp.id}>{emp.fullName} ({emp.employeeCode})</option>
                        ))}
                      </select>
                      {trainingErrors.employeeId && <p className="text-[9px] text-rose-500 mt-1">{trainingErrors.employeeId}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Department *</label>
                      <input type="text" value={trainingForm.department} onChange={(e) => setTrainingForm({ ...trainingForm, department: e.target.value })} className={`w-full px-3 py-2 border ${trainingErrors.department ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Department" />
                      {trainingErrors.department && <p className="text-[9px] text-rose-500 mt-1">{trainingErrors.department}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Training Title *</label>
                      <input type="text" value={trainingForm.trainingTitle} onChange={(e) => setTrainingForm({ ...trainingForm, trainingTitle: e.target.value })} className={`w-full px-3 py-2 border ${trainingErrors.trainingTitle ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Training title" />
                      {trainingErrors.trainingTitle && <p className="text-[9px] text-rose-500 mt-1">{trainingErrors.trainingTitle}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Training Category *</label>
                      <select value={trainingForm.trainingCategory} onChange={(e) => setTrainingForm({ ...trainingForm, trainingCategory: e.target.value })} className={`w-full px-3 py-2 border ${trainingErrors.trainingCategory ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                        <option value="">Select Category</option>
                        {TRAINING_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {trainingErrors.trainingCategory && <p className="text-[9px] text-rose-500 mt-1">{trainingErrors.trainingCategory}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Trainer *</label>
                      <input type="text" value={trainingForm.trainer} onChange={(e) => setTrainingForm({ ...trainingForm, trainer: e.target.value })} className={`w-full px-3 py-2 border ${trainingErrors.trainer ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Trainer" />
                      {trainingErrors.trainer && <p className="text-[9px] text-rose-500 mt-1">{trainingErrors.trainer}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Training Date *</label>
                      <input type="date" value={trainingForm.trainingDate} onChange={(e) => setTrainingForm({ ...trainingForm, trainingDate: e.target.value })} className={`w-full px-3 py-2 border ${trainingErrors.trainingDate ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {trainingErrors.trainingDate && <p className="text-[9px] text-rose-500 mt-1">{trainingErrors.trainingDate}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Duration (Hours) *</label>
                      <input type="number" min="0" value={trainingForm.durationHours} onChange={(e) => setTrainingForm({ ...trainingForm, durationHours: e.target.value })} className={`w-full px-3 py-2 border ${trainingErrors.durationHours ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {trainingErrors.durationHours && <p className="text-[9px] text-rose-500 mt-1">{trainingErrors.durationHours}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Training Mode *</label>
                      <select value={trainingForm.trainingMode} onChange={(e) => setTrainingForm({ ...trainingForm, trainingMode: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {TRAINING_MODES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Mandatory *</label>
                      <select value={trainingForm.mandatory} onChange={(e) => setTrainingForm({ ...trainingForm, mandatory: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {YES_NO.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Attendance Status *</label>
                      <select value={trainingForm.attendanceStatus} onChange={(e) => setTrainingForm({ ...trainingForm, attendanceStatus: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {ATTENDANCE_STATUS.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Score (0-100) *</label>
                      <input type="number" min="0" max="100" value={trainingForm.score} onChange={(e) => setTrainingForm({ ...trainingForm, score: e.target.value })} className={`w-full px-3 py-2 border ${trainingErrors.score ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {trainingErrors.score && <p className="text-[9px] text-rose-500 mt-1">{trainingErrors.score}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Certificate Issued *</label>
                      <select value={trainingForm.certificateIssued} onChange={(e) => setTrainingForm({ ...trainingForm, certificateIssued: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {YES_NO.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                      <input type="text" value={trainingForm.remarks} onChange={(e) => setTrainingForm({ ...trainingForm, remarks: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Remarks" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsTrainingModalOpen(false); setEditingTrainingId(null); setTrainingErrors({}); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingTrainingId ? 'Save Changes' : 'Add Training'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Certification Tracker</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Certification lifecycle, expiry &amp; renewal</p>
          </div>
          <button
            onClick={() => handleOpenCertModal()}
            style={{ backgroundColor: hospital.themeColor }}
            className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Certification
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { label: 'Total Certifications', value: certs.length, color: 'text-blue-600' },
            { label: 'Active', value: certs.filter((c) => effectiveCertStatus(c) === 'Active').length, color: 'text-emerald-600' },
            { label: 'Expired', value: certs.filter((c) => effectiveCertStatus(c) === 'Expired').length, color: 'text-rose-600' },
            { label: 'Pending', value: certs.filter((c) => effectiveCertStatus(c) === 'Pending').length, color: 'text-amber-600' },
            { label: 'Revoked', value: certs.filter((c) => effectiveCertStatus(c) === 'Revoked').length, color: 'text-slate-600' },
            { label: 'Renewal Required', value: certs.filter((c) => c.renewalRequired === 'Yes').length, color: 'text-violet-600' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID, employee, department, certification..."
              value={certSearch}
              onChange={(e) => setCertSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['ID', 'Employee', 'Department', 'Certification', 'Issuing Authority', 'Issue Date', 'Expiry Date', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {certs.filter((r) => {
                  const q = certSearch.toLowerCase();
                  const emp = getEmployeeById(r.employeeId);
                  const empName = emp ? emp.fullName.toLowerCase() : '';
                  const dept = emp ? emp.department.toLowerCase() : '';
                  return (
                    r.id.toLowerCase().includes(q) ||
                    r.certificationName.toLowerCase().includes(q) ||
                    r.issuingAuthority.toLowerCase().includes(q) ||
                    empName.includes(q) ||
                    dept.includes(q) ||
                    effectiveCertStatus(r).toLowerCase().includes(q)
                  );
                }).map((r) => {
                  const emp = getEmployeeById(r.employeeId);
                  const status = effectiveCertStatus(r);
                  return (
                    <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                      <td className="px-3 py-3 font-semibold text-slate-700">{emp ? emp.fullName : r.employeeId}</td>
                      <td className="px-3 py-3 text-slate-600">{emp ? emp.department : r.department}</td>
                      <td className="px-3 py-3 font-semibold text-slate-700">{r.certificationName}</td>
                      <td className="px-3 py-3 text-slate-600">{r.issuingAuthority}</td>
                      <td className="px-3 py-3 text-slate-600">{r.issueDate}</td>
                      <td className="px-3 py-3 text-slate-600">{r.expiryDate}</td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_CERT[status] || STATUS_BADGE_CERT.Active}`}>{status}</span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleOpenCertModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                          <button onClick={() => handleDeleteCert(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {certs.filter((r) => {
                  const q = certSearch.toLowerCase();
                  const emp = getEmployeeById(r.employeeId);
                  const empName = emp ? emp.fullName.toLowerCase() : '';
                  const dept = emp ? emp.department.toLowerCase() : '';
                  return (
                    r.id.toLowerCase().includes(q) ||
                    r.certificationName.toLowerCase().includes(q) ||
                    r.issuingAuthority.toLowerCase().includes(q) ||
                    empName.includes(q) ||
                    dept.includes(q) ||
                    effectiveCertStatus(r).toLowerCase().includes(q)
                  );
                }).length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-3 py-10 text-center">
                      {certSearch ? (
                        <span className="text-[10px] text-slate-400">No certification records match your search.</span>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-3xl">🏆</span>
                          <span className="text-[10px] text-slate-400 font-medium">No certification records registered yet.</span>
                          <button onClick={() => handleOpenCertModal()} style={{ backgroundColor: hospital.themeColor }} className="mt-1 px-3 py-1.5 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all shadow-sm cursor-pointer">Add First Certification</button>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
            <span className="text-[9px] text-slate-400 font-medium">Showing {certs.filter((r) => {
              const q = certSearch.toLowerCase();
              const emp = getEmployeeById(r.employeeId);
              const empName = emp ? emp.fullName.toLowerCase() : '';
              const dept = emp ? emp.department.toLowerCase() : '';
              return (
                r.id.toLowerCase().includes(q) ||
                r.certificationName.toLowerCase().includes(q) ||
                r.issuingAuthority.toLowerCase().includes(q) ||
                empName.includes(q) ||
                dept.includes(q) ||
                effectiveCertStatus(r).toLowerCase().includes(q)
              );
            }).length} of {certs.length} certification{certs.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {isCertModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[92vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingCertId ? 'Edit Certification' : 'Add Certification'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Certification Tracker</p>
                </div>
                <button onClick={() => { setIsCertModalOpen(false); setEditingCertId(null); setCertErrors({}); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveCert} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Certification Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Employee *</label>
                      <select value={certForm.employeeId} onChange={(e) => handleEmployeeSelectCert(e.target.value)} className={`w-full px-3 py-2 border ${certErrors.employeeId ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (
                          <option key={emp.id} value={emp.id}>{emp.fullName} ({emp.employeeCode})</option>
                        ))}
                      </select>
                      {certErrors.employeeId && <p className="text-[9px] text-rose-500 mt-1">{certErrors.employeeId}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Department</label>
                      <input type="text" value={certForm.department} onChange={(e) => setCertForm({ ...certForm, department: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Auto-filled on employee select" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Certification Name *</label>
                      <input type="text" value={certForm.certificationName} onChange={(e) => setCertForm({ ...certForm, certificationName: e.target.value })} className={`w-full px-3 py-2 border ${certErrors.certificationName ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Certification name" />
                      {certErrors.certificationName && <p className="text-[9px] text-rose-500 mt-1">{certErrors.certificationName}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Issuing Authority *</label>
                      <input type="text" value={certForm.issuingAuthority} onChange={(e) => setCertForm({ ...certForm, issuingAuthority: e.target.value })} className={`w-full px-3 py-2 border ${certErrors.issuingAuthority ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Issuing authority" />
                      {certErrors.issuingAuthority && <p className="text-[9px] text-rose-500 mt-1">{certErrors.issuingAuthority}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Issue Date *</label>
                      <input type="date" value={certForm.issueDate} onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })} className={`w-full px-3 py-2 border ${certErrors.issueDate ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {certErrors.issueDate && <p className="text-[9px] text-rose-500 mt-1">{certErrors.issueDate}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Expiry Date *</label>
                      <input type="date" value={certForm.expiryDate} onChange={(e) => setCertForm({ ...certForm, expiryDate: e.target.value })} className={`w-full px-3 py-2 border ${certErrors.expiryDate ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {certErrors.expiryDate && <p className="text-[9px] text-rose-500 mt-1">{certErrors.expiryDate}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Renewal Required *</label>
                      <select value={certForm.renewalRequired} onChange={(e) => setCertForm({ ...certForm, renewalRequired: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {YES_NO.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Certification Status</label>
                      <select value={certForm.certificationStatus} onChange={(e) => setCertForm({ ...certForm, certificationStatus: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {CERT_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Document Placeholder</label>
                      <input type="text" value={certForm.documentPlaceholder} onChange={(e) => setCertForm({ ...certForm, documentPlaceholder: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="e.g. cert.pdf" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                      <input type="text" value={certForm.remarks} onChange={(e) => setCertForm({ ...certForm, remarks: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Remarks" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsCertModalOpen(false); setEditingCertId(null); setCertErrors({}); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingCertId ? 'Save Changes' : 'Add Certification'}</button>
                </div>
               </form>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Competency Assessment</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Employee competency evaluations & levels</p>
          </div>
          <button
            onClick={() => handleOpenCompModal()}
            style={{ backgroundColor: hospital.themeColor }}
            className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Assessment
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Assessments', value: competencies.length, color: 'text-blue-600' },
            { label: 'Completed', value: competencies.filter((c) => c.status === 'Completed').length, color: 'text-emerald-600' },
            { label: 'Pending', value: competencies.filter((c) => c.status === 'Pending').length, color: 'text-amber-600' },
            { label: 'In Progress', value: competencies.filter((c) => c.status === 'In Progress').length, color: 'text-sky-600' },
            { label: 'Average Score', value: competencies.length ? Math.round(competencies.reduce((sum, c) => sum + (Number(c.score) || 0), 0) / competencies.length) : 0, color: 'text-teal-600' },
            { label: 'Experts', value: competencies.filter((c) => c.competencyLevel === 'Expert').length, color: 'text-violet-600' },
            { label: 'Proficient', value: competencies.filter((c) => c.competencyLevel === 'Proficient').length, color: 'text-indigo-600' },
            { label: 'Novice', value: competencies.filter((c) => c.competencyLevel === 'Novice').length, color: 'text-rose-600' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID, employee, department, type..."
              value={compSearch}
              onChange={(e) => setCompSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['ID', 'Employee', 'Department', 'Type', 'Date', 'Evaluator', 'Score', 'Level', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {competencies.filter((r) => {
                  const q = compSearch.toLowerCase();
                  const emp = getEmployeeById(r.employeeId);
                  const empName = emp ? emp.fullName.toLowerCase() : '';
                  const dept = emp ? emp.department.toLowerCase() : '';
                  return (
                    r.id.toLowerCase().includes(q) ||
                    r.assessmentType.toLowerCase().includes(q) ||
                    r.evaluator.toLowerCase().includes(q) ||
                    empName.includes(q) ||
                    dept.includes(q) ||
                    r.status.toLowerCase().includes(q) ||
                    r.competencyLevel.toLowerCase().includes(q)
                  );
                }).map((r) => {
                  const emp = getEmployeeById(r.employeeId);
                  return (
                    <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                      <td className="px-3 py-3 font-semibold text-slate-700">{emp ? emp.fullName : r.employeeId}</td>
                      <td className="px-3 py-3 text-slate-600">{r.department}</td>
                      <td className="px-3 py-3 text-slate-600">{r.assessmentType}</td>
                      <td className="px-3 py-3 text-slate-600">{r.assessmentDate}</td>
                      <td className="px-3 py-3 text-slate-600">{r.evaluator}</td>
                      <td className="px-3 py-3 text-slate-700">{r.score}</td>
                      <td className="px-3 py-3">
                        <span className="px-2 py-0.5 rounded-full text-[8px] font-bold border bg-slate-50 text-slate-600 border-slate-200">{r.competencyLevel}</span>
                      </td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_COMP[r.status] || STATUS_BADGE_COMP.Completed}`}>{r.status}</span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleOpenCompModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                          <button onClick={() => handleDeleteComp(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {competencies.filter((r) => {
                  const q = compSearch.toLowerCase();
                  const emp = getEmployeeById(r.employeeId);
                  const empName = emp ? emp.fullName.toLowerCase() : '';
                  const dept = emp ? emp.department.toLowerCase() : '';
                  return (
                    r.id.toLowerCase().includes(q) ||
                    r.assessmentType.toLowerCase().includes(q) ||
                    r.evaluator.toLowerCase().includes(q) ||
                    empName.includes(q) ||
                    dept.includes(q) ||
                    r.status.toLowerCase().includes(q) ||
                    r.competencyLevel.toLowerCase().includes(q)
                  );
                }).length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-3 py-10 text-center">
                      {compSearch ? (
                        <span className="text-[10px] text-slate-400">No competency assessments match your search.</span>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-3xl">📊</span>
                          <span className="text-[10px] text-slate-400 font-medium">No competency assessments registered yet.</span>
                          <button onClick={() => handleOpenCompModal()} style={{ backgroundColor: hospital.themeColor }} className="mt-1 px-3 py-1.5 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all shadow-sm cursor-pointer">Add First Assessment</button>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
            <span className="text-[9px] text-slate-400 font-medium">Showing {competencies.filter((r) => {
              const q = compSearch.toLowerCase();
              const emp = getEmployeeById(r.employeeId);
              const empName = emp ? emp.fullName.toLowerCase() : '';
              const dept = emp ? emp.department.toLowerCase() : '';
              return (
                r.id.toLowerCase().includes(q) ||
                r.assessmentType.toLowerCase().includes(q) ||
                r.evaluator.toLowerCase().includes(q) ||
                empName.includes(q) ||
                dept.includes(q) ||
                r.status.toLowerCase().includes(q) ||
                r.competencyLevel.toLowerCase().includes(q)
              );
            }).length} of {competencies.length} assessment{competencies.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {isCompModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[92vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingCompId ? 'Edit Assessment' : 'Add Assessment'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Competency Assessment</p>
                </div>
                <button onClick={() => { setIsCompModalOpen(false); setEditingCompId(null); setCompErrors({}); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveComp} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Assessment Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Employee *</label>
                      <select value={compForm.employeeId} onChange={(e) => handleEmployeeSelectComp(e.target.value)} className={`w-full px-3 py-2 border ${compErrors.employeeId ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (
                          <option key={emp.id} value={emp.id}>{emp.fullName} ({emp.employeeCode})</option>
                        ))}
                      </select>
                      {compErrors.employeeId && <p className="text-[9px] text-rose-500 mt-1">{compErrors.employeeId}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Department *</label>
                      <input type="text" value={compForm.department} onChange={(e) => setCompForm({ ...compForm, department: e.target.value })} className={`w-full px-3 py-2 border ${compErrors.department ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Auto-filled on employee select" />
                      {compErrors.department && <p className="text-[9px] text-rose-500 mt-1">{compErrors.department}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Assessment Type *</label>
                      <select value={compForm.assessmentType} onChange={(e) => setCompForm({ ...compForm, assessmentType: e.target.value })} className={`w-full px-3 py-2 border ${compErrors.assessmentType ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                        <option value="">Select Type</option>
                        {ASSESSMENT_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {compErrors.assessmentType && <p className="text-[9px] text-rose-500 mt-1">{compErrors.assessmentType}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Assessment Date *</label>
                      <input type="date" value={compForm.assessmentDate} onChange={(e) => setCompForm({ ...compForm, assessmentDate: e.target.value })} className={`w-full px-3 py-2 border ${compErrors.assessmentDate ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {compErrors.assessmentDate && <p className="text-[9px] text-rose-500 mt-1">{compErrors.assessmentDate}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Evaluator *</label>
                      <input type="text" value={compForm.evaluator} onChange={(e) => setCompForm({ ...compForm, evaluator: e.target.value })} className={`w-full px-3 py-2 border ${compErrors.evaluator ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Evaluator" />
                      {compErrors.evaluator && <p className="text-[9px] text-rose-500 mt-1">{compErrors.evaluator}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Score (0-100) *</label>
                      <input type="number" min="0" max="100" value={compForm.score} onChange={(e) => setCompForm({ ...compForm, score: e.target.value })} className={`w-full px-3 py-2 border ${compErrors.score ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {compErrors.score && <p className="text-[9px] text-rose-500 mt-1">{compErrors.score}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Competency Level *</label>
                      <select value={compForm.competencyLevel} onChange={(e) => setCompForm({ ...compForm, competencyLevel: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {COMPETENCY_LEVELS.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Next Assessment Date *</label>
                      <input type="date" value={compForm.nextAssessmentDate} onChange={(e) => setCompForm({ ...compForm, nextAssessmentDate: e.target.value })} className={`w-full px-3 py-2 border ${compErrors.nextAssessmentDate ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {compErrors.nextAssessmentDate && <p className="text-[9px] text-rose-500 mt-1">{compErrors.nextAssessmentDate}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                      <select value={compForm.status} onChange={(e) => setCompForm({ ...compForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {ASSESSMENT_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                      <input type="text" value={compForm.remarks} onChange={(e) => setCompForm({ ...compForm, remarks: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Remarks" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsCompModalOpen(false); setEditingCompId(null); setCompErrors({}); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingCompId ? 'Save Changes' : 'Add Assessment'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      </>
    );
  };

  const ShiftRosterTab = ({ hospital, employees }) => {
    const filtered = shifts.filter((r) => {
      const q = shiftSearch.toLowerCase();
      const emp = getEmployeeById(r.employeeId);
      const empName = emp ? emp.fullName.toLowerCase() : '';
      return (
        r.id.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.shift.toLowerCase().includes(q) ||
        r.weeklyOff.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q) ||
        empName.includes(q)
      );
    });

    const total = shifts.length;
    const active = shifts.filter((r) => r.status === 'Active').length;
    const inactive = shifts.filter((r) => r.status === 'Inactive').length;
    const onLeave = shifts.filter((r) => r.status === 'On Leave').length;
    const morning = shifts.filter((r) => r.shift === 'Morning').length;
    const evening = shifts.filter((r) => r.shift === 'Evening').length;
    const night = shifts.filter((r) => r.shift === 'Night').length;
    const rotational = shifts.filter((r) => r.shift === 'Rotational').length;
    const coverage = total ? Math.round(((morning + evening + night + rotational) / total) * 100) : 0;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Shift Roster</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Shift assignments, timings & weekly off</p>
          </div>
          <button onClick={() => handleOpenShiftModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer">
            <Plus className="w-3.5 h-3.5" /> Add Roster
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Roster', value: total, color: 'text-blue-600' },
            { label: 'Active', value: active, color: 'text-emerald-600' },
            { label: 'Inactive', value: inactive, color: 'text-slate-600' },
            { label: 'On Leave', value: onLeave, color: 'text-amber-600' },
            { label: 'Morning', value: morning, color: 'text-yellow-600' },
            { label: 'Evening', value: evening, color: 'text-orange-600' },
            { label: 'Night', value: night, color: 'text-indigo-600' },
            { label: 'Shift Coverage %', value: `${coverage}%`, color: 'text-teal-600' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input type="text" placeholder="Search by ID, employee, department, shift..." value={shiftSearch} onChange={(e) => setShiftSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['ID', 'Employee', 'Department', 'Shift', 'Start Time', 'End Time', 'Weekly Off', 'Effective From', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((r) => {
                  const emp = getEmployeeById(r.employeeId);
                  return (
                    <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                      <td className="px-3 py-3 font-semibold text-slate-700">{emp ? emp.fullName : r.employeeId}</td>
                      <td className="px-3 py-3 text-slate-600">{r.department}</td>
                      <td className="px-3 py-3 text-slate-600">{r.shift}</td>
                      <td className="px-3 py-3 text-slate-600">{r.startTime}</td>
                      <td className="px-3 py-3 text-slate-600">{r.endTime}</td>
                      <td className="px-3 py-3 text-slate-600">{r.weeklyOff}</td>
                      <td className="px-3 py-3 text-slate-600">{r.effectiveFrom}</td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_SHIFT[r.status] || STATUS_BADGE_SHIFT.Active}`}>{r.status}</span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleOpenShiftModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                          <button onClick={() => handleDeleteShift(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-3 py-10 text-center">
                      {shiftSearch ? (
                        <span className="text-[10px] text-slate-400">No shift roster records match your search.</span>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-3xl">📋</span>
                          <span className="text-[10px] text-slate-400 font-medium">No shift roster records registered yet.</span>
                          <button onClick={() => handleOpenShiftModal()} style={{ backgroundColor: hospital.themeColor }} className="mt-1 px-3 py-1.5 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all shadow-sm cursor-pointer">Add First Roster</button>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
            <span className="text-[9px] text-slate-400 font-medium">Showing {filtered.length} of {shifts.length} record{shifts.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {isShiftModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[92vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingShiftId ? 'Edit Roster' : 'Add Roster'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Shift Roster</p>
                </div>
                <button onClick={() => { setIsShiftModalOpen(false); setEditingShiftId(null); setShiftErrors({}); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveShift} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Roster Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Employee *</label>
                      <select value={shiftForm.employeeId} onChange={(e) => handleEmployeeSelectShift(e.target.value)} className={`w-full px-3 py-2 border ${shiftErrors.employeeId ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (<option key={emp.id} value={emp.id}>{emp.fullName} ({emp.employeeCode})</option>))}
                      </select>
                      {shiftErrors.employeeId && <p className="text-[9px] text-rose-500 mt-1">{shiftErrors.employeeId}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Department *</label>
                      <input type="text" value={shiftForm.department} onChange={(e) => setShiftForm({ ...shiftForm, department: e.target.value })} className={`w-full px-3 py-2 border ${shiftErrors.department ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Auto-filled on employee select" />
                      {shiftErrors.department && <p className="text-[9px] text-rose-500 mt-1">{shiftErrors.department}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Shift *</label>
                      <select value={shiftForm.shift} onChange={(e) => setShiftForm({ ...shiftForm, shift: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {SHIFTS_LIST.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Start Time *</label>
                      <input type="time" value={shiftForm.startTime} onChange={(e) => setShiftForm({ ...shiftForm, startTime: e.target.value })} className={`w-full px-3 py-2 border ${shiftErrors.startTime ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {shiftErrors.startTime && <p className="text-[9px] text-rose-500 mt-1">{shiftErrors.startTime}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">End Time *</label>
                      <input type="time" value={shiftForm.endTime} onChange={(e) => setShiftForm({ ...shiftForm, endTime: e.target.value })} className={`w-full px-3 py-2 border ${shiftErrors.endTime ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {shiftErrors.endTime && <p className="text-[9px] text-rose-500 mt-1">{shiftErrors.endTime}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Weekly Off *</label>
                      <select value={shiftForm.weeklyOff} onChange={(e) => setShiftForm({ ...shiftForm, weeklyOff: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {shiftErrors.weeklyOff && <p className="text-[9px] text-rose-500 mt-1">{shiftErrors.weeklyOff}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Effective From *</label>
                      <input type="date" value={shiftForm.effectiveFrom} onChange={(e) => setShiftForm({ ...shiftForm, effectiveFrom: e.target.value })} className={`w-full px-3 py-2 border ${shiftErrors.effectiveFrom ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {shiftErrors.effectiveFrom && <p className="text-[9px] text-rose-500 mt-1">{shiftErrors.effectiveFrom}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Status *</label>
                      <select value={shiftForm.status} onChange={(e) => setShiftForm({ ...shiftForm, status: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {ROSTER_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsShiftModalOpen(false); setEditingShiftId(null); setShiftErrors({}); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingShiftId ? 'Save Changes' : 'Add Roster'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const AttendanceTab = ({ hospital, employees }) => {
    const filtered = attendances.filter((r) => {
      const q = attendanceSearch.toLowerCase();
      const emp = getEmployeeById(r.employeeId);
      const empName = emp ? emp.fullName.toLowerCase() : '';
      return (
        r.id.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.shift.toLowerCase().includes(q) ||
        r.attendanceStatus.toLowerCase().includes(q) ||
        empName.includes(q) ||
        r.remarks.toLowerCase().includes(q)
      );
    });

    const total = attendances.length;
    const present = attendances.filter((r) => r.attendanceStatus === 'Present').length;
    const absent = attendances.filter((r) => r.attendanceStatus === 'Absent').length;
    const late = attendances.filter((r) => r.attendanceStatus === 'Late').length;
    const halfDay = attendances.filter((r) => r.attendanceStatus === 'Half Day').length;
    const wfh = attendances.filter((r) => r.attendanceStatus === 'Work From Home').length;
    const avgWorkingHours = total ? (attendances.reduce((sum, r) => sum + (Number(r.workingHours) || 0), 0) / total).toFixed(2) : 0;
    const avgOvertime = total ? (attendances.reduce((sum, r) => sum + (Number(r.overtimeHours) || 0), 0) / total).toFixed(2) : 0;
    const compliance = total ? Math.round((present / total) * 100) : 0;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Attendance Register</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Daily attendance, check-in/out & working hours</p>
          </div>
          <button onClick={() => handleOpenAttendanceModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer">
            <Plus className="w-3.5 h-3.5" /> Add Attendance
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Records', value: total, color: 'text-blue-600' },
            { label: 'Present', value: present, color: 'text-emerald-600' },
            { label: 'Absent', value: absent, color: 'text-rose-600' },
            { label: 'Late', value: late, color: 'text-orange-600' },
            { label: 'Half Day', value: halfDay, color: 'text-amber-600' },
            { label: 'Work From Home', value: wfh, color: 'text-sky-600' },
            { label: 'Avg Working Hours', value: avgWorkingHours, color: 'text-teal-600' },
            { label: 'Attendance Compliance %', value: `${compliance}%`, color: 'text-violet-600' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input type="text" placeholder="Search by ID, employee, department, status..." value={attendanceSearch} onChange={(e) => setAttendanceSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['ID', 'Employee', 'Department', 'Date', 'Shift', 'Check-In', 'Check-Out', 'Working Hrs', 'Overtime', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((r) => {
                  const emp = getEmployeeById(r.employeeId);
                  return (
                    <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                      <td className="px-3 py-3 font-semibold text-slate-700">{emp ? emp.fullName : r.employeeId}</td>
                      <td className="px-3 py-3 text-slate-600">{r.department}</td>
                      <td className="px-3 py-3 text-slate-600">{r.attendanceDate}</td>
                      <td className="px-3 py-3 text-slate-600">{r.shift}</td>
                      <td className="px-3 py-3 text-slate-600">{r.checkInTime}</td>
                      <td className="px-3 py-3 text-slate-600">{r.checkOutTime}</td>
                      <td className="px-3 py-3 text-slate-700">{r.workingHours}</td>
                      <td className="px-3 py-3 text-slate-700">{r.overtimeHours}</td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_ATTENDANCE[r.attendanceStatus] || STATUS_BADGE_ATTENDANCE.Present}`}>{r.attendanceStatus}</span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleOpenAttendanceModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                          <button onClick={() => handleDeleteAttendance(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={11} className="px-3 py-10 text-center">
                      {attendanceSearch ? (
                        <span className="text-[10px] text-slate-400">No attendance records match your search.</span>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-3xl">📅</span>
                          <span className="text-[10px] text-slate-400 font-medium">No attendance records registered yet.</span>
                          <button onClick={() => handleOpenAttendanceModal()} style={{ backgroundColor: hospital.themeColor }} className="mt-1 px-3 py-1.5 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all shadow-sm cursor-pointer">Add First Attendance</button>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
            <span className="text-[9px] text-slate-400 font-medium">Showing {filtered.length} of {attendances.length} record{attendances.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {isAttendanceModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[92vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingAttendanceId ? 'Edit Attendance' : 'Add Attendance'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Attendance Register</p>
                </div>
                <button onClick={() => { setIsAttendanceModalOpen(false); setEditingAttendanceId(null); setAttendanceErrors({}); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveAttendance} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Attendance Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Employee *</label>
                      <select value={attendanceForm.employeeId} onChange={(e) => handleEmployeeSelectAttendance(e.target.value)} className={`w-full px-3 py-2 border ${attendanceErrors.employeeId ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (<option key={emp.id} value={emp.id}>{emp.fullName} ({emp.employeeCode})</option>))}
                      </select>
                      {attendanceErrors.employeeId && <p className="text-[9px] text-rose-500 mt-1">{attendanceErrors.employeeId}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Department *</label>
                      <input type="text" value={attendanceForm.department} onChange={(e) => setAttendanceForm({ ...attendanceForm, department: e.target.value })} className={`w-full px-3 py-2 border ${attendanceErrors.department ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Auto-filled on employee select" />
                      {attendanceErrors.department && <p className="text-[9px] text-rose-500 mt-1">{attendanceErrors.department}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Attendance Date *</label>
                      <input type="date" value={attendanceForm.attendanceDate} onChange={(e) => setAttendanceForm({ ...attendanceForm, attendanceDate: e.target.value })} className={`w-full px-3 py-2 border ${attendanceErrors.attendanceDate ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {attendanceErrors.attendanceDate && <p className="text-[9px] text-rose-500 mt-1">{attendanceErrors.attendanceDate}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Shift *</label>
                      <select value={attendanceForm.shift} onChange={(e) => setAttendanceForm({ ...attendanceForm, shift: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {SHIFTS_LIST.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Check-In Time *</label>
                      <input type="time" value={attendanceForm.checkInTime} onChange={(e) => setAttendanceForm({ ...attendanceForm, checkInTime: e.target.value })} className={`w-full px-3 py-2 border ${attendanceErrors.checkInTime ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {attendanceErrors.checkInTime && <p className="text-[9px] text-rose-500 mt-1">{attendanceErrors.checkInTime}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Check-Out Time *</label>
                      <input type="time" value={attendanceForm.checkOutTime} onChange={(e) => setAttendanceForm({ ...attendanceForm, checkOutTime: e.target.value })} className={`w-full px-3 py-2 border ${attendanceErrors.checkOutTime ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {attendanceErrors.checkOutTime && <p className="text-[9px] text-rose-500 mt-1">{attendanceErrors.checkOutTime}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Working Hours (Auto)</label>
                      <input type="text" value={calcWorkingHours(attendanceForm.checkInTime, attendanceForm.checkOutTime)} readOnly className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-[10px] text-slate-500" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Overtime Hours (Auto)</label>
                      <input type="text" value={calcOvertime(calcWorkingHours(attendanceForm.checkInTime, attendanceForm.checkOutTime))} readOnly className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-[10px] text-slate-500" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Attendance Status *</label>
                      <select value={attendanceForm.attendanceStatus} onChange={(e) => setAttendanceForm({ ...attendanceForm, attendanceStatus: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {ATTENDANCE_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                      <input type="text" value={attendanceForm.remarks} onChange={(e) => setAttendanceForm({ ...attendanceForm, remarks: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Remarks" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsAttendanceModalOpen(false); setEditingAttendanceId(null); setAttendanceErrors({}); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingAttendanceId ? 'Save Changes' : 'Add Attendance'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const LeaveTab = ({ hospital, employees }) => {
    const filtered = leaves.filter((r) => {
      const q = leaveSearch.toLowerCase();
      const emp = getEmployeeById(r.employeeId);
      const empName = emp ? emp.fullName.toLowerCase() : '';
      return (
        r.id.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.leaveType.toLowerCase().includes(q) ||
        r.reason.toLowerCase().includes(q) ||
        r.approvalStatus.toLowerCase().includes(q) ||
        empName.includes(q) ||
        r.remarks.toLowerCase().includes(q)
      );
    });

    const total = leaves.length;
    const pending = leaves.filter((r) => r.approvalStatus === 'Pending').length;
    const approved = leaves.filter((r) => r.approvalStatus === 'Approved').length;
    const rejected = leaves.filter((r) => r.approvalStatus === 'Rejected').length;
    const totalDays = leaves.reduce((sum, r) => sum + (Number(r.totalLeaveDays) || 0), 0);
    const approvedDays = leaves.filter((r) => r.approvalStatus === 'Approved').reduce((sum, r) => sum + (Number(r.totalLeaveDays) || 0), 0);
    const casual = leaves.filter((r) => r.leaveType === 'Casual Leave').length;
    const sick = leaves.filter((r) => r.leaveType === 'Sick Leave').length;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Leave Management</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Leave requests, approvals & tracking</p>
          </div>
          <button onClick={() => handleOpenLeaveModal()} style={{ backgroundColor: hospital.themeColor }} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer">
            <Plus className="w-3.5 h-3.5" /> Add Leave
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Requests', value: total, color: 'text-blue-600' },
            { label: 'Pending', value: pending, color: 'text-amber-600' },
            { label: 'Approved', value: approved, color: 'text-emerald-600' },
            { label: 'Rejected', value: rejected, color: 'text-rose-600' },
            { label: 'Total Leave Days', value: totalDays, color: 'text-violet-600' },
            { label: 'Approved Days', value: approvedDays, color: 'text-indigo-600' },
            { label: 'Casual Leaves', value: casual, color: 'text-teal-600' },
            { label: 'Sick Leaves', value: sick, color: 'text-orange-600' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
              <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input type="text" placeholder="Search by ID, employee, department, type..." value={leaveSearch} onChange={(e) => setLeaveSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['ID', 'Employee', 'Department', 'Leave Type', 'From', 'To', 'Days', 'Reason', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((r) => {
                  const emp = getEmployeeById(r.employeeId);
                  return (
                    <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                      <td className="px-3 py-3 font-semibold text-slate-700">{emp ? emp.fullName : r.employeeId}</td>
                      <td className="px-3 py-3 text-slate-600">{r.department}</td>
                      <td className="px-3 py-3 text-slate-600">{r.leaveType}</td>
                      <td className="px-3 py-3 text-slate-600">{r.fromDate}</td>
                      <td className="px-3 py-3 text-slate-600">{r.toDate}</td>
                      <td className="px-3 py-3 text-slate-700">{r.totalLeaveDays}</td>
                      <td className="px-3 py-3 text-slate-600">{r.reason}</td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_LEAVE[r.approvalStatus] || STATUS_BADGE_LEAVE.Pending}`}>{r.approvalStatus}</span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleOpenLeaveModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                          <button onClick={() => handleDeleteLeave(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-3 py-10 text-center">
                      {leaveSearch ? (
                        <span className="text-[10px] text-slate-400">No leave records match your search.</span>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-3xl">🏖️</span>
                          <span className="text-[10px] text-slate-400 font-medium">No leave records registered yet.</span>
                          <button onClick={() => handleOpenLeaveModal()} style={{ backgroundColor: hospital.themeColor }} className="mt-1 px-3 py-1.5 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all shadow-sm cursor-pointer">Add First Leave</button>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
            <span className="text-[9px] text-slate-400 font-medium">Showing {filtered.length} of {leaves.length} leave{leaves.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {isLeaveModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[92vh] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">{editingLeaveId ? 'Edit Leave' : 'Add Leave'}</h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Leave Management</p>
                </div>
                <button onClick={() => { setIsLeaveModalOpen(false); setEditingLeaveId(null); setLeaveErrors({}); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSaveLeave} className="space-y-5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Leave Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Employee *</label>
                      <select value={leaveForm.employeeId} onChange={(e) => handleEmployeeSelectLeave(e.target.value)} className={`w-full px-3 py-2 border ${leaveErrors.employeeId ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (<option key={emp.id} value={emp.id}>{emp.fullName} ({emp.employeeCode})</option>))}
                      </select>
                      {leaveErrors.employeeId && <p className="text-[9px] text-rose-500 mt-1">{leaveErrors.employeeId}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Department *</label>
                      <input type="text" value={leaveForm.department} onChange={(e) => setLeaveForm({ ...leaveForm, department: e.target.value })} className={`w-full px-3 py-2 border ${leaveErrors.department ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Auto-filled on employee select" />
                      {leaveErrors.department && <p className="text-[9px] text-rose-500 mt-1">{leaveErrors.department}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Leave Type *</label>
                      <select value={leaveForm.leaveType} onChange={(e) => setLeaveForm({ ...leaveForm, leaveType: e.target.value })} className={`w-full px-3 py-2 border ${leaveErrors.leaveType ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                        {LEAVE_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {leaveErrors.leaveType && <p className="text-[9px] text-rose-500 mt-1">{leaveErrors.leaveType}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">From Date *</label>
                      <input type="date" value={leaveForm.fromDate} onChange={(e) => setLeaveForm({ ...leaveForm, fromDate: e.target.value })} className={`w-full px-3 py-2 border ${leaveErrors.fromDate ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {leaveErrors.fromDate && <p className="text-[9px] text-rose-500 mt-1">{leaveErrors.fromDate}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">To Date *</label>
                      <input type="date" value={leaveForm.toDate} onChange={(e) => setLeaveForm({ ...leaveForm, toDate: e.target.value })} className={`w-full px-3 py-2 border ${leaveErrors.toDate ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                      {leaveErrors.toDate && <p className="text-[9px] text-rose-500 mt-1">{leaveErrors.toDate}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Total Leave Days (Auto)</label>
                      <input type="text" value={calcLeaveDays(leaveForm.fromDate, leaveForm.toDate)} readOnly className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-[10px] text-slate-500" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Reason *</label>
                      <input type="text" value={leaveForm.reason} onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })} className={`w-full px-3 py-2 border ${leaveErrors.reason ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Reason" />
                      {leaveErrors.reason && <p className="text-[9px] text-rose-500 mt-1">{leaveErrors.reason}</p>}
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Approval Status *</label>
                      <select value={leaveForm.approvalStatus} onChange={(e) => setLeaveForm({ ...leaveForm, approvalStatus: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        {LEAVE_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Approved By</label>
                      <input type="text" value={leaveForm.approvedBy} onChange={(e) => setLeaveForm({ ...leaveForm, approvedBy: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Approved by" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                      <input type="text" value={leaveForm.remarks} onChange={(e) => setLeaveForm({ ...leaveForm, remarks: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Remarks" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => { setIsLeaveModalOpen(false); setEditingLeaveId(null); setLeaveErrors({}); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                  <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingLeaveId ? 'Save Changes' : 'Add Leave'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const STATUS_BADGE_REVIEW = {
    Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    'In Progress': 'bg-sky-50 text-sky-700 border-sky-200',
  };
  const STATUS_BADGE_GOAL = {
    'Not Started': 'bg-slate-100 text-slate-600 border-slate-200',
    'In Progress': 'bg-sky-50 text-sky-700 border-sky-200',
    Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'On Hold': 'bg-amber-50 text-amber-700 border-amber-200',
  };
  const STATUS_BADGE_PROMO = {
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Rejected: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const PerformanceTab = ({ hospital, employees }) => {
    const completedReviews = performances.filter((r) => r.reviewStatus === 'Completed').length;
    const avgRating = performances.length ? Math.round((performances.reduce((s, r) => s + (Number(r.overallRating) || 0), 0) / performances.length) * 100) / 100 : 0;
    const goalsCompleted = goals.filter((g) => g.status === 'Completed').length;
    const approvedPromos = promotions.filter((p) => p.promotionStatus === 'Approved').length;
    const appraisedEmployees = new Set(performances.map((r) => r.employeeId)).size;

    const kpiCards = [
      { label: 'Total Performance Reviews', value: performances.length, color: 'text-blue-600' },
      { label: 'Completed Reviews', value: completedReviews, color: 'text-emerald-600' },
      { label: 'Avg Overall Rating', value: avgRating, color: 'text-sky-600' },
      { label: 'Total Goals', value: goals.length, color: 'text-violet-600' },
      { label: 'Goals Completed', value: goalsCompleted, color: 'text-indigo-600' },
      { label: 'Total Promotions', value: promotions.length, color: 'text-teal-600' },
      { label: 'Approved Promotions', value: approvedPromos, color: 'text-amber-600' },
      { label: 'Employees Appraised', value: appraisedEmployees, color: 'text-rose-600' },
    ];

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Performance &amp; Appraisal</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Employee performance reviews, goal tracking &amp; career progression</p>
          </div>
        </div>

        <div>
          <h2 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">Key Performance Indicators</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {kpiCards.map((kpi) => (
              <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
                <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Module 1: Performance Review */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-extrabold text-slate-800">Performance Review</h3>
              <p className="text-[9px] text-slate-400 mt-0.5">Employee performance appraisals &amp; ratings</p>
            </div>
            <button
              onClick={() => handleOpenPerfModal()}
              style={{ backgroundColor: hospital.themeColor }}
              className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Review
            </button>
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by ID, employee, department, reviewer..."
                value={perfSearch}
                onChange={(e) => setPerfSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-[10px]">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {['ID', 'Employee', 'Department', 'Reviewer', 'Period', 'Overall Rating', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {performances.filter((r) => {
                    const q = perfSearch.toLowerCase();
                    const emp = getEmployeeById(r.employeeId);
                    const empName = emp ? emp.fullName.toLowerCase() : '';
                    return (
                      r.id.toLowerCase().includes(q) ||
                      r.reviewer.toLowerCase().includes(q) ||
                      r.reviewPeriod.toLowerCase().includes(q) ||
                      empName.includes(q) ||
                      r.department.toLowerCase().includes(q)
                    );
                  }).map((r) => {
                    const emp = getEmployeeById(r.employeeId);
                    return (
                      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                        <td className="px-3 py-3 font-semibold text-slate-700">{emp ? emp.fullName : r.employeeId}</td>
                        <td className="px-3 py-3 text-slate-600">{r.department}</td>
                        <td className="px-3 py-3 text-slate-600">{r.reviewer}</td>
                        <td className="px-3 py-3 text-slate-600">{r.reviewPeriod}</td>
                        <td className="px-3 py-3 text-emerald-600 font-bold">{r.overallRating}</td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_REVIEW[r.reviewStatus] || STATUS_BADGE_REVIEW.Pending}`}>{r.reviewStatus}</span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleOpenPerfModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                            <button onClick={() => handleDeletePerf(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {performances.filter((r) => {
                    const q = perfSearch.toLowerCase();
                    const emp = getEmployeeById(r.employeeId);
                    const empName = emp ? emp.fullName.toLowerCase() : '';
                    return (
                      r.id.toLowerCase().includes(q) ||
                      r.reviewer.toLowerCase().includes(q) ||
                      r.reviewPeriod.toLowerCase().includes(q) ||
                      empName.includes(q) ||
                      r.department.toLowerCase().includes(q)
                    );
                  }).length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-3 py-10 text-center">
                        {perfSearch ? (
                          <span className="text-[10px] text-slate-400">No performance reviews match your search.</span>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-2">
                            <span className="text-3xl">⭐</span>
                            <span className="text-[10px] text-slate-400 font-medium">No performance reviews registered yet.</span>
                            <button onClick={() => handleOpenPerfModal()} style={{ backgroundColor: hospital.themeColor }} className="mt-1 px-3 py-1.5 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all shadow-sm cursor-pointer">Add First Review</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
              <span className="text-[9px] text-slate-400 font-medium">Showing {performances.filter((r) => {
                const q = perfSearch.toLowerCase();
                const emp = getEmployeeById(r.employeeId);
                const empName = emp ? emp.fullName.toLowerCase() : '';
                return (
                  r.id.toLowerCase().includes(q) ||
                  r.reviewer.toLowerCase().includes(q) ||
                  r.reviewPeriod.toLowerCase().includes(q) ||
                  empName.includes(q) ||
                  r.department.toLowerCase().includes(q)
                );
              }).length} of {performances.length} review{performances.length !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {isPerfModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[92vh] overflow-y-auto custom-scroll">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800">{editingPerfId ? 'Edit Performance Review' : 'Add Performance Review'}</h3>
                    <p className="text-[9px] text-slate-400 mt-0.5">Performance Review</p>
                  </div>
                  <button onClick={() => { setIsPerfModalOpen(false); setEditingPerfId(null); setPerfErrors({}); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>

                <form onSubmit={handleSavePerf} className="space-y-5">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Review Details</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Employee *</label>
                        <select value={perfForm.employeeId} onChange={(e) => handleEmployeeSelectPerf(e.target.value)} className={`w-full px-3 py-2 border ${perfErrors.employeeId ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                          <option value="">Select Employee</option>
                          {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>{emp.fullName} ({emp.employeeCode})</option>
                          ))}
                        </select>
                        {perfErrors.employeeId && <p className="text-[9px] text-rose-500 mt-1">{perfErrors.employeeId}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Department *</label>
                        <input type="text" value={perfForm.department} onChange={(e) => setPerfForm({ ...perfForm, department: e.target.value })} className={`w-full px-3 py-2 border ${perfErrors.department ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Auto-filled on employee select" />
                        {perfErrors.department && <p className="text-[9px] text-rose-500 mt-1">{perfErrors.department}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Reviewer *</label>
                        <input type="text" value={perfForm.reviewer} onChange={(e) => setPerfForm({ ...perfForm, reviewer: e.target.value })} className={`w-full px-3 py-2 border ${perfErrors.reviewer ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Reviewer" />
                        {perfErrors.reviewer && <p className="text-[9px] text-rose-500 mt-1">{perfErrors.reviewer}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Review Period *</label>
                        <input type="text" value={perfForm.reviewPeriod} onChange={(e) => setPerfForm({ ...perfForm, reviewPeriod: e.target.value })} className={`w-full px-3 py-2 border ${perfErrors.reviewPeriod ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="e.g. 2026-Q2" />
                        {perfErrors.reviewPeriod && <p className="text-[9px] text-rose-500 mt-1">{perfErrors.reviewPeriod}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Technical Skills *</label>
                        <select value={Number(perfForm.technicalSkills)} onChange={(e) => setPerfForm({ ...perfForm, technicalSkills: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                          {RATING_SCALE.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Communication *</label>
                        <select value={Number(perfForm.communication)} onChange={(e) => setPerfForm({ ...perfForm, communication: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                          {RATING_SCALE.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Teamwork *</label>
                        <select value={Number(perfForm.teamwork)} onChange={(e) => setPerfForm({ ...perfForm, teamwork: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                          {RATING_SCALE.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Patient Care *</label>
                        <select value={Number(perfForm.patientCare)} onChange={(e) => setPerfForm({ ...perfForm, patientCare: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                          {RATING_SCALE.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Documentation *</label>
                        <select value={Number(perfForm.documentation)} onChange={(e) => setPerfForm({ ...perfForm, documentation: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                          {RATING_SCALE.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Attendance Score (0-100) *</label>
                        <input type="number" min="0" max="100" value={perfForm.attendanceScore} onChange={(e) => setPerfForm({ ...perfForm, attendanceScore: e.target.value === '' ? '' : parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Review Status *</label>
                        <select value={perfForm.reviewStatus} onChange={(e) => setPerfForm({ ...perfForm, reviewStatus: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                          {REVIEW_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Overall Rating (Auto)</label>
                        <input type="text" value={calcOverallRating(perfForm.technicalSkills, perfForm.communication, perfForm.teamwork, perfForm.patientCare, perfForm.documentation, perfForm.attendanceScore)} readOnly className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-[10px] text-emerald-700 font-bold" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Comments</label>
                        <input type="text" value={perfForm.comments} onChange={(e) => setPerfForm({ ...perfForm, comments: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Comments" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onClick={() => { setIsPerfModalOpen(false); setEditingPerfId(null); setPerfErrors({}); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                    <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingPerfId ? 'Save Changes' : 'Add Review'}</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Module 2: Goal Tracker */}
        <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-extrabold text-slate-800">Goal Tracker</h3>
              <p className="text-[9px] text-slate-400 mt-0.5">Employee goals, targets &amp; progress monitoring</p>
            </div>
            <button
              onClick={() => handleOpenGoalModal()}
              style={{ backgroundColor: hospital.themeColor }}
              className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Goal
            </button>
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by ID, employee, department, goal..."
                value={goalSearch}
                onChange={(e) => setGoalSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-[10px]">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {['ID', 'Employee', 'Department', 'Goal Title', 'Start Date', 'Target Date', 'Progress', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {goals.filter((r) => {
                    const q = goalSearch.toLowerCase();
                    const emp = getEmployeeById(r.employeeId);
                    const empName = emp ? emp.fullName.toLowerCase() : '';
                    return (
                      r.id.toLowerCase().includes(q) ||
                      r.goalTitle.toLowerCase().includes(q) ||
                      empName.includes(q) ||
                      r.department.toLowerCase().includes(q) ||
                      r.status.toLowerCase().includes(q)
                    );
                  }).map((r) => {
                    const emp = getEmployeeById(r.employeeId);
                    return (
                      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                        <td className="px-3 py-3 font-semibold text-slate-700">{emp ? emp.fullName : r.employeeId}</td>
                        <td className="px-3 py-3 text-slate-600">{r.department}</td>
                        <td className="px-3 py-3 font-semibold text-slate-700">{r.goalTitle}</td>
                        <td className="px-3 py-3 text-slate-600">{r.startDate}</td>
                        <td className="px-3 py-3 text-slate-600">{r.targetDate}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-sky-500 rounded-full" style={{ width: `${r.progress}%` }}></div>
                            </div>
                            <span className="text-[9px] font-bold text-slate-600">{r.progress}%</span>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_GOAL[r.status] || STATUS_BADGE_GOAL['Not Started']}`}>{r.status}</span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleOpenGoalModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                            <button onClick={() => handleDeleteGoal(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {goals.filter((r) => {
                    const q = goalSearch.toLowerCase();
                    const emp = getEmployeeById(r.employeeId);
                    const empName = emp ? emp.fullName.toLowerCase() : '';
                    return (
                      r.id.toLowerCase().includes(q) ||
                      r.goalTitle.toLowerCase().includes(q) ||
                      empName.includes(q) ||
                      r.department.toLowerCase().includes(q) ||
                      r.status.toLowerCase().includes(q)
                    );
                  }).length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-3 py-10 text-center">
                        {goalSearch ? (
                          <span className="text-[10px] text-slate-400">No goals match your search.</span>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-2">
                            <span className="text-3xl">🎯</span>
                            <span className="text-[10px] text-slate-400 font-medium">No goals registered yet.</span>
                            <button onClick={() => handleOpenGoalModal()} style={{ backgroundColor: hospital.themeColor }} className="mt-1 px-3 py-1.5 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all shadow-sm cursor-pointer">Add First Goal</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
              <span className="text-[9px] text-slate-400 font-medium">Showing {goals.filter((r) => {
                const q = goalSearch.toLowerCase();
                const emp = getEmployeeById(r.employeeId);
                const empName = emp ? emp.fullName.toLowerCase() : '';
                return (
                  r.id.toLowerCase().includes(q) ||
                  r.goalTitle.toLowerCase().includes(q) ||
                  empName.includes(q) ||
                  r.department.toLowerCase().includes(q) ||
                  r.status.toLowerCase().includes(q)
                );
              }).length} of {goals.length} goal{goals.length !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {isGoalModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[92vh] overflow-y-auto custom-scroll">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800">{editingGoalId ? 'Edit Goal' : 'Add Goal'}</h3>
                    <p className="text-[9px] text-slate-400 mt-0.5">Goal Tracker</p>
                  </div>
                  <button onClick={() => { setIsGoalModalOpen(false); setEditingGoalId(null); setGoalErrors({}); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>

                <form onSubmit={handleSaveGoal} className="space-y-5">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Goal Details</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Employee *</label>
                        <select value={goalForm.employeeId} onChange={(e) => handleEmployeeSelectGoal(e.target.value)} className={`w-full px-3 py-2 border ${goalErrors.employeeId ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                          <option value="">Select Employee</option>
                          {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>{emp.fullName} ({emp.employeeCode})</option>
                          ))}
                        </select>
                        {goalErrors.employeeId && <p className="text-[9px] text-rose-500 mt-1">{goalErrors.employeeId}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Department *</label>
                        <input type="text" value={goalForm.department} onChange={(e) => setGoalForm({ ...goalForm, department: e.target.value })} className={`w-full px-3 py-2 border ${goalErrors.department ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Auto-filled on employee select" />
                        {goalErrors.department && <p className="text-[9px] text-rose-500 mt-1">{goalErrors.department}</p>}
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Goal Title *</label>
                        <input type="text" value={goalForm.goalTitle} onChange={(e) => setGoalForm({ ...goalForm, goalTitle: e.target.value })} className={`w-full px-3 py-2 border ${goalErrors.goalTitle ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Goal title" />
                        {goalErrors.goalTitle && <p className="text-[9px] text-rose-500 mt-1">{goalErrors.goalTitle}</p>}
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Goal Description</label>
                        <input type="text" value={goalForm.goalDescription} onChange={(e) => setGoalForm({ ...goalForm, goalDescription: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Description" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Start Date *</label>
                        <input type="date" value={goalForm.startDate} onChange={(e) => setGoalForm({ ...goalForm, startDate: e.target.value })} className={`w-full px-3 py-2 border ${goalErrors.startDate ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                        {goalErrors.startDate && <p className="text-[9px] text-rose-500 mt-1">{goalErrors.startDate}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Target Date *</label>
                        <input type="date" value={goalForm.targetDate} onChange={(e) => setGoalForm({ ...goalForm, targetDate: e.target.value })} className={`w-full px-3 py-2 border ${goalErrors.targetDate ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                        {goalErrors.targetDate && <p className="text-[9px] text-rose-500 mt-1">{goalErrors.targetDate}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Progress (%) *</label>
                        <input type="number" min="0" max="100" value={goalForm.progress} onChange={(e) => setGoalForm({ ...goalForm, progress: e.target.value === '' ? '' : parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Status (Auto)</label>
                        <input type="text" value={calcGoalStatus(goalForm.progress)} readOnly className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-[10px] text-emerald-700 font-bold" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                        <input type="text" value={goalForm.remarks} onChange={(e) => setGoalForm({ ...goalForm, remarks: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Remarks" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onClick={() => { setIsGoalModalOpen(false); setEditingGoalId(null); setGoalErrors({}); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                    <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingGoalId ? 'Save Changes' : 'Add Goal'}</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Module 3: Promotion & Career Progression */}
        <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-extrabold text-slate-800">Promotion &amp; Career Progression</h3>
              <p className="text-[9px] text-slate-400 mt-0.5">Employee promotions, designations &amp; salary revisions</p>
            </div>
            <button
              onClick={() => handleOpenPromoModal()}
              style={{ backgroundColor: hospital.themeColor }}
              className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Promotion
            </button>
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by ID, employee, department, designation..."
                value={promoSearch}
                onChange={(e) => setPromoSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-[10px]">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {['ID', 'Employee', 'Department', 'Current Designation', 'Recommended', 'Promotion Date', 'Salary Revision', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {promotions.filter((r) => {
                    const q = promoSearch.toLowerCase();
                    const emp = getEmployeeById(r.employeeId);
                    const empName = emp ? emp.fullName.toLowerCase() : '';
                    return (
                      r.id.toLowerCase().includes(q) ||
                      r.currentDesignation.toLowerCase().includes(q) ||
                      r.recommendedDesignation.toLowerCase().includes(q) ||
                      empName.includes(q) ||
                      r.department.toLowerCase().includes(q) ||
                      r.promotionStatus.toLowerCase().includes(q)
                    );
                  }).map((r) => {
                    const emp = getEmployeeById(r.employeeId);
                    return (
                      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                        <td className="px-3 py-3 font-semibold text-slate-700">{emp ? emp.fullName : r.employeeId}</td>
                        <td className="px-3 py-3 text-slate-600">{r.department}</td>
                        <td className="px-3 py-3 text-violet-600 font-bold">{r.currentDesignation}</td>
                        <td className="px-3 py-3 font-semibold text-slate-700">{r.recommendedDesignation}</td>
                        <td className="px-3 py-3 text-slate-600">{r.promotionDate}</td>
                        <td className="px-3 py-3 text-emerald-600 font-bold">₹{(Number(r.salaryRevision) || 0).toLocaleString('en-IN')}</td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE_PROMO[r.promotionStatus] || STATUS_BADGE_PROMO.Pending}`}>{r.promotionStatus}</span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleOpenPromoModal(r)} className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors" title="Edit"><Edit3 className="w-3 h-3" /></button>
                            <button onClick={() => handleDeletePromo(r.id)} className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors" title="Delete"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {promotions.filter((r) => {
                    const q = promoSearch.toLowerCase();
                    const emp = getEmployeeById(r.employeeId);
                    const empName = emp ? emp.fullName.toLowerCase() : '';
                    return (
                      r.id.toLowerCase().includes(q) ||
                      r.currentDesignation.toLowerCase().includes(q) ||
                      r.recommendedDesignation.toLowerCase().includes(q) ||
                      empName.includes(q) ||
                      r.department.toLowerCase().includes(q) ||
                      r.promotionStatus.toLowerCase().includes(q)
                    );
                  }).length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-3 py-10 text-center">
                        {promoSearch ? (
                          <span className="text-[10px] text-slate-400">No promotion records match your search.</span>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-2">
                            <span className="text-3xl">📈</span>
                            <span className="text-[10px] text-slate-400 font-medium">No promotion records registered yet.</span>
                            <button onClick={() => handleOpenPromoModal()} style={{ backgroundColor: hospital.themeColor }} className="mt-1 px-3 py-1.5 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all shadow-sm cursor-pointer">Add First Promotion</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
              <span className="text-[9px] text-slate-400 font-medium">Showing {promotions.filter((r) => {
                const q = promoSearch.toLowerCase();
                const emp = getEmployeeById(r.employeeId);
                const empName = emp ? emp.fullName.toLowerCase() : '';
                return (
                  r.id.toLowerCase().includes(q) ||
                  r.currentDesignation.toLowerCase().includes(q) ||
                  r.recommendedDesignation.toLowerCase().includes(q) ||
                  empName.includes(q) ||
                  r.department.toLowerCase().includes(q) ||
                  r.promotionStatus.toLowerCase().includes(q)
                );
              }).length} of {promotions.length} promotion{promotions.length !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {isPromoModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[92vh] overflow-y-auto custom-scroll">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800">{editingPromoId ? 'Edit Promotion' : 'Add Promotion'}</h3>
                    <p className="text-[9px] text-slate-400 mt-0.5">Promotion &amp; Career Progression</p>
                  </div>
                  <button onClick={() => { setIsPromoModalOpen(false); setEditingPromoId(null); setPromoErrors({}); }} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>

                <form onSubmit={handleSavePromo} className="space-y-5">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Promotion Details</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Employee *</label>
                        <select value={promoForm.employeeId} onChange={(e) => handleEmployeeSelectPromo(e.target.value)} className={`w-full px-3 py-2 border ${promoErrors.employeeId ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`}>
                          <option value="">Select Employee</option>
                          {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>{emp.fullName} ({emp.employeeCode})</option>
                          ))}
                        </select>
                        {promoErrors.employeeId && <p className="text-[9px] text-rose-500 mt-1">{promoErrors.employeeId}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Department *</label>
                        <input type="text" value={promoForm.department} onChange={(e) => setPromoForm({ ...promoForm, department: e.target.value })} className={`w-full px-3 py-2 border ${promoErrors.department ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Auto-filled on employee select" />
                        {promoErrors.department && <p className="text-[9px] text-rose-500 mt-1">{promoErrors.department}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Current Designation *</label>
                        <input type="text" value={promoForm.currentDesignation} onChange={(e) => setPromoForm({ ...promoForm, currentDesignation: e.target.value })} className={`w-full px-3 py-2 border ${promoErrors.currentDesignation ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Auto-filled on employee select" />
                        {promoErrors.currentDesignation && <p className="text-[9px] text-rose-500 mt-1">{promoErrors.currentDesignation}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Recommended Designation *</label>
                        <input type="text" value={promoForm.recommendedDesignation} onChange={(e) => setPromoForm({ ...promoForm, recommendedDesignation: e.target.value })} className={`w-full px-3 py-2 border ${promoErrors.recommendedDesignation ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} placeholder="Recommended designation" />
                        {promoErrors.recommendedDesignation && <p className="text-[9px] text-rose-500 mt-1">{promoErrors.recommendedDesignation}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Promotion Date *</label>
                        <input type="date" value={promoForm.promotionDate} onChange={(e) => setPromoForm({ ...promoForm, promotionDate: e.target.value })} className={`w-full px-3 py-2 border ${promoErrors.promotionDate ? 'border-rose-400' : 'border-slate-300'} rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500`} />
                        {promoErrors.promotionDate && <p className="text-[9px] text-rose-500 mt-1">{promoErrors.promotionDate}</p>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Salary Revision (₹)</label>
                        <input type="number" min="0" value={promoForm.salaryRevision} onChange={(e) => setPromoForm({ ...promoForm, salaryRevision: e.target.value === '' ? '' : parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Promotion Status *</label>
                        <select value={promoForm.promotionStatus} onChange={(e) => setPromoForm({ ...promoForm, promotionStatus: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500">
                          {PROMOTION_STATUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[9px] font-medium text-slate-600 mb-1">Remarks</label>
                        <input type="text" value={promoForm.remarks} onChange={(e) => setPromoForm({ ...promoForm, remarks: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Remarks" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onClick={() => { setIsPromoModalOpen(false); setEditingPromoId(null); setPromoErrors({}); }} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all">Cancel</button>
                    <button type="submit" style={{ backgroundColor: hospital.themeColor }} className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm">{editingPromoId ? 'Save Changes' : 'Add Promotion'}</button>
                  </div>
                </form>
              </div>
            </div>
          )}
         </div>
       </div>
     );
    };

    const ReportsTab = ({ hospital }) => {
      // ── KPI Calculations (all dynamic from module data) ──
      const totalEmployees = employees.length;
      const activeEmployees = employees.filter((e) => e.employmentStatus === 'Active').length;

      const totalTrainings = trainings.length;
      const trainingCompleted = trainings.filter((t) => t.attendanceStatus === 'Present').length;
      const trainingCompliance = totalTrainings ? Math.round((trainingCompleted / totalTrainings) * 100) : 0;

      const totalAttendances = attendances.length;
      const attendedCount = attendances.filter((a) => a.attendanceStatus && a.attendanceStatus !== 'Absent').length;
      const attendancePct = totalAttendances ? Math.round((attendedCount / totalAttendances) * 100) : 0;

      const avgPerformance = performances.length
        ? Math.round((performances.reduce((s, p) => s + (Number(p.overallRating) || 0), 0) / performances.length) * 100) / 100
        : 0;

      const avgAuditCompliance = audits.length
        ? Math.round(audits.reduce((s, a) => s + (Number(a.complianceScore) || 0), 0) / audits.length)
        : 0;

      const totalCapas = capas.length;
      const capaClosed = capas.filter((c) => c.status === 'Closed').length;
      const capaClosure = totalCapas ? Math.round((capaClosed / totalCapas) * 100) : 0;

      const overallHrCompliance = Math.round((trainingCompliance + attendancePct + avgAuditCompliance + capaClosure) / 4);

      const kpiData = [
        { label: 'Total Employees', value: totalEmployees, color: 'text-blue-600' },
        { label: 'Active Employees', value: activeEmployees, color: 'text-emerald-600' },
        { label: 'Training Compliance %', value: `${trainingCompliance}%`, color: 'text-sky-600' },
        { label: 'Attendance %', value: `${attendancePct}%`, color: 'text-teal-600' },
        { label: 'Average Performance Rating', value: avgPerformance, color: 'text-violet-600' },
        { label: 'Internal Audit Compliance %', value: `${avgAuditCompliance}%`, color: 'text-indigo-600' },
        { label: 'CAPA Closure %', value: `${capaClosure}%`, color: 'text-amber-600' },
        { label: 'Overall HR Compliance %', value: `${overallHrCompliance}%`, color: 'text-rose-600' },
      ];

      // ── Chart 1: Department-wise Employees (Bar) ──
      const deptCounts = {};
      employees.forEach((e) => {
        deptCounts[e.department] = (deptCounts[e.department] || 0) + 1;
      });
      const departmentEmployeesChart = Object.keys(deptCounts)
        .map((name) => ({ name, value: deptCounts[name] }))
        .sort((a, b) => b.value - a.value);

      // ── Chart 2: Employee Category Distribution (Pie) ──
      const catCounts = {};
      employees.forEach((e) => {
        catCounts[e.employeeCategory] = (catCounts[e.employeeCategory] || 0) + 1;
      });
      const categoryDistributionChart = Object.keys(catCounts).map((name) => ({ name, value: catCounts[name] }));

      // ── Chart 3: Monthly Attendance Trend (Line) ──
      const attByMonth = {};
      attendances.forEach((a) => {
        if (a.attendanceDate) {
          const k = a.attendanceDate.slice(0, 7);
          if (!attByMonth[k]) attByMonth[k] = { attended: 0, total: 0 };
          attByMonth[k].total += 1;
          if (a.attendanceStatus && a.attendanceStatus !== 'Absent') attByMonth[k].attended += 1;
        }
      });
      const attendanceTrendChart = Object.keys(attByMonth)
        .sort()
        .map((k) => ({
          name: monthKeyToLabel(k),
          attendance: attByMonth[k].total ? Math.round((attByMonth[k].attended / attByMonth[k].total) * 100) : 0,
        }));

      // ── Chart 4: Training Completion Trend (Area) ──
      const trainByMonth = {};
      trainings.forEach((t) => {
        if (t.trainingDate) {
          const k = t.trainingDate.slice(0, 7);
          if (!trainByMonth[k]) trainByMonth[k] = { completed: 0, total: 0 };
          trainByMonth[k].total += 1;
          if (t.attendanceStatus === 'Present') trainByMonth[k].completed += 1;
        }
      });
      const trainingTrendChart = Object.keys(trainByMonth)
        .sort()
        .map((k) => ({
          name: monthKeyToLabel(k),
          completion: trainByMonth[k].total ? Math.round((trainByMonth[k].completed / trainByMonth[k].total) * 100) : 0,
        }));

      // ── Chart 5: Performance Rating Distribution (Bar) ──
      const ratingBuckets = [
        { name: '1.0–2.0', low: 1, high: 2 },
        { name: '2.0–3.0', low: 2, high: 3 },
        { name: '3.0–4.0', low: 3, high: 4 },
        { name: '4.0–5.0', low: 4, high: 5.01 },
      ];
      const performanceDistributionChart = ratingBuckets.map((b) => ({
        name: b.name,
        count: performances.filter((p) => {
          const r = Number(p.overallRating) || 0;
          return r >= b.low && r < b.high;
        }).length,
      }));

      // ── Chart 6: Internal Audit & CAPA Compliance (Area/Line) ──
      const auditByMonth = {};
      audits.forEach((a) => {
        if (a.auditDate) {
          const k = a.auditDate.slice(0, 7);
          if (!auditByMonth[k]) auditByMonth[k] = { scores: [], auditIds: [] };
          auditByMonth[k].scores.push(Number(a.complianceScore) || 0);
          auditByMonth[k].auditIds.push(a.id);
        }
      });
      const auditCapaChart = Object.keys(auditByMonth)
        .sort()
        .map((k) => {
          const scores = auditByMonth[k].scores;
          const avg = scores.length ? Math.round(scores.reduce((s, x) => s + x, 0) / scores.length) : 0;
          const related = capas.filter((c) => auditByMonth[k].auditIds.includes(c.linkedAudit));
          const closed = related.filter((c) => c.status === 'Closed').length;
          const closure = related.length ? Math.round((closed / related.length) * 100) : 0;
          return { name: monthKeyToLabel(k), auditCompliance: avg, capaClosure: closure };
        });

      // ── Monthly Summary Table (per department) ──
      const deptList = Array.from(new Set(employees.map((e) => e.department)));
      const summaryRows = deptList
        .map((dept) => {
          const dTrainings = trainings.filter((t) => t.department === dept);
          const trainPct = dTrainings.length
            ? Math.round((dTrainings.filter((t) => t.attendanceStatus === 'Present').length / dTrainings.length) * 100)
            : 0;
          const dAtt = attendances.filter((a) => a.department === dept);
          const attPct = dAtt.length
            ? Math.round((dAtt.filter((a) => a.attendanceStatus && a.attendanceStatus !== 'Absent').length / dAtt.length) * 100)
            : 0;
          const dPerf = performances.filter((p) => p.department === dept);
          const perfRating = dPerf.length
            ? Math.round((dPerf.reduce((s, p) => s + (Number(p.overallRating) || 0), 0) / dPerf.length) * 100) / 100
            : 0;
          const dAudits = audits.filter((a) => a.department === dept);
          const auditPct = dAudits.length
            ? Math.round(dAudits.reduce((s, a) => s + (Number(a.complianceScore) || 0), 0) / dAudits.length)
            : 0;
          const overall = Math.round((trainPct + attPct + perfRating * 20 + auditPct) / 4);
          const status = overall >= 90 ? 'Good' : overall >= 75 ? 'Watch' : 'Critical';
          return {
            department: dept,
            employees: employees.filter((e) => e.department === dept).length,
            trainingPct: trainPct,
            attendancePct: attPct,
            perfRating,
            auditPct,
            overall,
            status,
          };
        })
        .sort((a, b) => a.department.localeCompare(b.department));

      const STATUS_BADGE = {
        Good: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        Watch: 'bg-amber-50 text-amber-700 border-amber-200',
        Critical: 'bg-rose-50 text-rose-700 border-rose-200',
      };

      // ── Export Handlers (CareSync standard) ──
      const handleExportCSV = () => {
        const kpiLabels = kpiData.map((k) => k.label);
        const kpiValues = kpiData.map((k) => k.value);
        const headers = ['Department', 'Employees', 'Training %', 'Attendance %', 'Performance Rating', 'Audit Compliance %', 'Overall Compliance %', 'Status'];
        const rows = summaryRows.map((r) => [r.department, r.employees, r.trainingPct, r.attendancePct, r.perfRating, r.auditPct, r.overall, r.status]);
        const csvContent = [
          ['HR Records — Reports & Analytics'],
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
        link.setAttribute('download', 'HR_Records_Report.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      const handleExportPDF = () => alert('PDF export will be available in the next version.');
      const handlePrint = () => alert('Print report will be available in the next version.');

      return (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-extrabold text-slate-800">Reports &amp; Analytics</h3>
              <p className="text-[9px] text-slate-400 mt-0.5">Aggregated HR insights across all modules</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 hover:border-slate-300 text-[9px] font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5" /> Export CSV
              </button>
              <button
                onClick={handleExportPDF}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 hover:border-slate-300 text-[9px] font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Export PDF
              </button>
              <button
                onClick={handlePrint}
                style={{ backgroundColor: hospital.themeColor }}
                className="px-3 py-1.5 rounded-xl text-white text-[9px] font-bold flex items-center gap-1.5 hover:brightness-95 transition-all shadow-sm cursor-pointer"
              >
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
                <h4 className="text-[10px] font-bold text-slate-700 mb-4">Department-wise Employees</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentEmployeesChart} layout="vertical" margin={{ left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                      <XAxis type="number" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                      <YAxis type="category" dataKey="name" width={90} style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                      <Bar dataKey="value" fill={hospital?.themeColor || '#3b82f6'} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h4 className="text-[10px] font-bold text-slate-700 mb-4">Employee Category Distribution</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryDistributionChart} cx="50%" cy="50%" outerRadius={70} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                        {categoryDistributionChart.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                      <Legend wrapperStyle={{ fontSize: '9px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h4 className="text-[10px] font-bold text-slate-700 mb-4">Monthly Attendance Trend</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={attendanceTrendChart}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                      <YAxis domain={[0, 100]} style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                      <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h4 className="text-[10px] font-bold text-slate-700 mb-4">Training Completion Trend</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trainingTrendChart}>
                      <defs>
                        <linearGradient id="trainGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                      <YAxis domain={[0, 100]} style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                      <Area type="monotone" dataKey="completion" stroke="#3b82f6" strokeWidth={3} fill="url(#trainGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h4 className="text-[10px] font-bold text-slate-700 mb-4">Performance Rating Distribution</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceDistributionChart}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                      <YAxis allowDecimals={false} style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                      <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h4 className="text-[10px] font-bold text-slate-700 mb-4">Internal Audit &amp; CAPA Compliance</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={auditCapaChart}>
                      <defs>
                        <linearGradient id="auditGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                      <YAxis domain={[0, 100]} style={{ fontSize: '9px' }} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                      <Legend wrapperStyle={{ fontSize: '9px' }} />
                      <Area type="monotone" dataKey="auditCompliance" stroke="#f59e0b" strokeWidth={3} fill="url(#auditGrad)" />
                      <Line type="monotone" dataKey="capaClosure" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200">
              <h3 className="text-xs font-bold text-slate-800">Monthly Department Summary</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px]">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {['Department', 'Employees', 'Training %', 'Attendance %', 'Performance Rating', 'Audit Compliance %', 'Overall Compliance %', 'Status'].map((h) => (
                      <th key={h} className="px-4 py-2 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {summaryRows.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-2 font-semibold text-slate-700">{row.department}</td>
                      <td className="px-4 py-2 text-slate-600">{row.employees}</td>
                      <td className="px-4 py-2 text-blue-600 font-bold">{row.trainingPct}%</td>
                      <td className="px-4 py-2 text-emerald-600 font-bold">{row.attendancePct}%</td>
                      <td className="px-4 py-2 text-violet-600 font-bold">{row.perfRating}</td>
                      <td className="px-4 py-2 text-amber-600 font-bold">{row.auditPct}%</td>
                      <td className="px-4 py-2 text-teal-600 font-bold">{row.overall}%</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[row.status] || STATUS_BADGE.Good}`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
              <span className="text-[9px] text-slate-400 font-medium">
                Showing {summaryRows.length} departments
              </span>
            </div>
          </div>
        </div>
      );
    };

    const renderContent = () => {
      switch (activeTab) {
        case 'dashboard':
          return <DashboardTab hospital={hospital} />;
        case 'employee_master':
          return <EmployeeMasterTab />;
        case 'training':
          return <TrainingTab hospital={hospital} employees={employees} />;
        case 'attendance':
          return (
            <div className="space-y-8">
              <AttendanceTab hospital={hospital} employees={employees} />
              <div className="mt-8 pt-6 border-t border-slate-200">
                <LeaveTab hospital={hospital} employees={employees} />
              </div>
              <div className="mt-8 pt-6 border-t border-slate-200">
                <ShiftRosterTab hospital={hospital} employees={employees} />
              </div>
            </div>
          );
        case 'perf_review':
        case 'goal_tracker':
        case 'promotion':
          return <PerformanceTab hospital={hospital} employees={employees} />;
        case 'audit':
          return <AuditTab hospital={hospital} />;
        case 'reports':
          return <ReportsTab hospital={hospital} />;
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
          <h2 className="text-xs font-extrabold text-slate-900 mt-2">HR Records</h2>
          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-widest font-bold">
            Hospital Human Resource Management System
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
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all cursor-pointer ${isActive
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
            HR Records — NABH Module
          </p>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto custom-scroll bg-slate-50/40 p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default HRRecordsWorkspace;

const fs = require('fs');
const path = 'C:/Users/user/Desktop/hospital/frontend/src/pages/RadiologyWorkspace.jsx';
const lines = fs.readFileSync(path, 'utf8').split('\n');

// Find main return (outermost)
let mainReturn = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === 'return (') {
    mainReturn = i;
    break;
  }
}
if (mainReturn === -1) {
  console.log('Main return not found');
  process.exit(1);
}
console.log('Main return at line:', mainReturn + 1);

const hooks = [
  '  const [aerLicenses, setAerLicenses] = useState(() => {',
  '    const s = localStorage.getItem("rad_aer_licenses");',
  '    return s ? JSON.parse(s) : [',
  '      { id: "aer1", name: "AERB Radiology Department License", no: "AERB/RAD-2024/001", issued: "2024-01-01", expiry: "2026-01-01", status: "Valid" },',
  '      { id: "aer2", name: "Radiation Worker Registration", no: "AERB/RW-2024/045", issued: "2024-02-01", expiry: "2026-02-01", status: "Valid" },',
  '      { id: "aer3", name: "CT Scanner Type Approval", no: "AERB/ETA/CT/2023/012", issued: "2023-06-01", expiry: "2026-06-01", status: "Expiring Soon" },',
  '      { id: "aer4", name: "MRI Type Approval", no: "AERB/ETA/MRI/2023/008", issued: "2023-05-15", expiry: "2026-05-15", status: "Valid" },',
  '      { id: "aer5", name: "X-Ray Type Approval", no: "AERB/ETA/XRAY/2023/015", issued: "2023-07-01", expiry: "2025-07-01", status: "Overdue" }',
  '    ];',
  '  });',
  '  const [pcpndtRegs, setPcpndtRegs] = useState(() => {',
  '    const s = localStorage.getItem("rad_pcpndt_regs");',
  '    return s ? JSON.parse(s) : [',
  '      { id: "pcp1", center: "Radiology Prenatal Imaging Center", registration: "DL/PC/2024/001", issued: "2024-03-01", expiry: "2026-03-01", status: "Valid" },',
  '      { id: "pcp2", name: "Genetic Clinic Registration", registration: "DL/GC/2024/007", issued: "2024-04-15", expiry: "2026-04-15", status: "Valid" },',
  '      { id: "pcp3", name: "Ultrasound Machine Registration", registration: "DL/USG/2023/012", issued: "2024-05-20", expiry: "2025-05-20", status: "Expiring Soon" }',
  '    ];',
  '  });',
  '  const [vendorAgreements, setVendorAgreements] = useState(() => {',
  '    const s = localStorage.getItem("rad_vendor_agreements");',
  '    return s ? JSON.parse(s) : [',
  '      { id: "v1", vendor: "Siemens Healthineers", type: "Annual Maintenance Contract", equipment: "CT Scanner", start: "2024-06-01", expiry: "2026-06-01", status: "Valid" },',
  '      { id: "v2", vendor: "Siemens Healthineers", type: "Annual Maintenance Contract", equipment: "MRI - 1.5T", start: "2024-06-01", expiry: "2025-06-01", status: "Expiring Soon" },',
  '      { id: "v3", vendor: "Philips Healthcare", type: "Service Agreement", equipment: "Ultrasound", start: "2024-07-01", expiry: "2025-07-01", status: "Valid" },',
  '      { id: "v4", vendor: "GE Healthcare", type: "Calibration Agreement", equipment: "Mammography", start: "2024-05-15", expiry: "2025-12-15", status: "Valid" },',
  '      { id: "v5", vendor: "Carestream", type: "Reagent Supply", equipment: "X-Ray Films", start: "2024-01-01", expiry: "2025-05-30", status: "Overdue" }',
  '    ];',
  '  });',
  '  const [regDocuments, setRegDocuments] = useState(() => {',
  '    const s = localStorage.getItem("rad_reg_documents");',
  '    return s ? JSON.parse(s) : [',
  '      { id: "rd1", name: "AERB License - Radiology Department", no: "AERB/RAD/2024/001", issued: "2024-01-01", expiry: "2026-01-01", status: "Valid" },',
  '      { id: "rd2", name: "Radiation Worker Registration Certificate", no: "AERB/RW/2024/045", issued: "2024-02-01", expiry: "2026-02-01", status: "Valid" },',
  '      { id: "rd3", name: "RSO Appointment Letter", no: "ADM/RSO/2024/01", issued: "2024-01-15", expiry: "2027-01-15", status: "Valid" },',
  '      { id: "rd4", name: "CPMNDT Registration Certificate", no: "DL/PC/2024/001", issued: "2024-03-01", expiry: "2026-03-01", status: "Valid" },',
  '      { id: "rd5", name: "PCPNDT Operational Guidelines", no: "MOHFW/PCP/2024/001", issued: "2024-01-01", expiry: "2027-01-01", status: "Valid" },',
  '      { id: "rd6", name: "Radiation Safety Manual", no: "RAD/RSM/2024/001", issued: "2024-01-01", expiry: "2027-01-01", status: "Valid" },',
  '      { id: "rd7", name: "MRI Safety SOP", no: "POL-RAD-002", issued: "2024-03-15", expiry: "2027-03-15", status: "Valid" },',
  '      { id: "rd8", name: "AERB Inspection Report 2024", no: "AERB/INS/2024/003", issued: "2024-12-01", expiry: "2029-12-01", status: "Valid" }',
  '    ];',
  '  });',
  '',
  '  useEffect(() => { localStorage.setItem("rad_aer_licenses", JSON.stringify(aerLicenses)); }, [aerLicenses]);',
  '  useEffect(() => { localStorage.setItem("rad_pcpndt_regs", JSON.stringify(pcpndtRegs)); }, [pcpndtRegs]);',
  '  useEffect(() => { localStorage.setItem("rad_vendor_agreements", JSON.stringify(vendorAgreements)); }, [vendorAgreements]);',
  '  useEffect(() => { localStorage.setItem("rad_statutory", JSON.stringify(statutory)); }, [statutory]);',
  '  useEffect(() => { localStorage.setItem("rad_reg_documents", JSON.stringify(regDocuments)); }, [regDocuments]);',
  '',
  '  const statutoryKpiData = {',
  '    totalLicenses: aerLicenses.length,',
  '    validLicenses: aerLicenses.filter(l => l.status === "Valid").length,',
  '    expiringLicenses: aerLicenses.filter(l => l.status === "Expiring Soon").length,',
  '    overdueLicenses: aerLicenses.filter(l => l.status === "Overdue").length,',
  '    totalPCPNDT: pcpndtRegs.length,',
  '    compliantPCPNDT: pcpndtRegs.filter(p => p.status === "Valid").length,',
  '    totalVendor: vendorAgreements.length,',
  '    activeVendor: vendorAgreements.filter(v => v.status === "Valid").length,',
  '    totalRegDocs: regDocuments.length,',
  '    compliantDocs: regDocuments.filter(d => d.status === "Valid").length',
  '  };',
  '',
  '  const isExpiringSoon = (dateStr) => {',
  '    const today = new Date();',
  '    const target = new Date(dateStr);',
  '    const diffDays = (target - today) / (1000 * 60 * 60 * 24);',
  '    return diffDays > 0 && diffDays <= 90;',
  '  };',
  '  const isOverdue = (dateStr) => new Date(dateStr) < new Date();',
  '',
  '  const statusClass = (status) => {',
  '    if (status === "Valid" || status === "Compliant") return "bg-emerald-50 text-emerald-700 border border-emerald-200";',
  '    if (status === "Expiring Soon") return "bg-amber-50 text-amber-700 border border-amber-200";',
  '    return "bg-rose-50 text-rose-700 border border-rose-200";',
  '  };',
  '',
];

lines.splice(mainReturn, 0, ...hooks);

fs.writeFileSync(path, lines.join('\n'));

const newLines = fs.readFileSync(path, 'utf8').split('\n');
console.log('New total lines:', newLines.length);

// Verify aerLicenses is now before the first return
const firstReturn = newLines.findIndex(l => l.trim() === 'return (');
const aerLicensesLine = newLines.findIndex(l => l.includes('const [aerLicenses'));

console.log('First return at:', firstReturn + 1);
console.log('aerLicenses at:', aerLicensesLine + 1);
console.log('Hooks before return:', aerLicensesLine < firstReturn);

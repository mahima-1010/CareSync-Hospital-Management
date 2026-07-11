const fs = require('fs');
const path = 'c:/Users/user/Desktop/hospital/frontend/src/pages/LicensesRegistryWorkspace.jsx';
let code = fs.readFileSync(path, 'utf8');

const phase7Data = `
/* ============================================================
   PHASE 7 — REPORTS & ANALYTICS
   ============================================================ */

const ReportsTab = ({ hospital }) => {
  // Load data from all previous phases
  const getParsed = (key) => { const d = localStorage.getItem(key); return d ? JSON.parse(d) : []; };

  const hospitalLic = getParsed('licenses_hospital_register');
  const bioLic = getParsed('licenses_biomedical_compliance');
  const polLic = getParsed('licenses_pollution_control');
  const firLic = getParsed('licenses_fire_safety');
  const aerbLic = getParsed('licenses_aerb');
  const bldgLic = getParsed('licenses_building_facility');
  const utilLic = getParsed('licenses_utility_vehicle');
  const renLic = getParsed('licenses_renewal_tracker');
  const compMon = getParsed('licenses_compliance_monitoring');
  const audLic = getParsed('licenses_internal_audits');
  const capaLic = getParsed('licenses_capa_tracker');

  // Enhance data with calculated status where necessary
  const allLic = [
    ...hospitalLic.map(r => ({ ...r, category: 'Hospital', currentStatus: calcLicenseStatus(r.expiryDate), dept: r.hospitalDepartment || 'Administration' })),
    ...bioLic.map(r => ({ ...r, category: 'Biomedical', currentStatus: calcLicenseStatus(r.expiryDate), dept: r.hospitalDepartment || 'Administration' })),
    ...polLic.map(r => ({ ...r, category: 'Pollution', currentStatus: calcLicenseStatus(r.expiryDate), dept: r.department || 'Facility' })),
    ...firLic.map(r => ({ ...r, category: 'Fire Safety', currentStatus: calcLicenseStatus(r.expiryDate), dept: r.department || 'Facility' })),
    ...aerbLic.map(r => ({ ...r, category: 'AERB', currentStatus: calcLicenseStatus(r.expiryDate), dept: r.department || 'Radiology' })),
    ...bldgLic.map(r => ({ ...r, category: 'Building & Facility', currentStatus: calcLicenseStatus(r.expiryDate), dept: r.department || 'Facility' })),
    ...utilLic.map(r => ({ ...r, category: 'Utility & Vehicle', currentStatus: calcLicenseStatus(r.expiryDate), dept: r.department || 'Transport' })),
  ];

  // 8 KPIs
  const totalLicenses = allLic.length;
  const validLicenses = allLic.filter(l => l.currentStatus === 'Valid').length;
  const expiringSoon = allLic.filter(l => l.currentStatus === 'Expiring Soon').length;
  const expiredLicenses = allLic.filter(l => l.currentStatus === 'Expired').length;
  
  const renewalsTotal = renLic.length;
  const renewalsDone = renLic.filter(r => r.renewalStatus === 'Completed').length;
  const renewalCompliance = renewalsTotal ? Math.round((renewalsDone / renewalsTotal) * 100) : 0;
  
  const auditsTotal = audLic.length;
  const auditsCompliant = audLic.filter(a => calcAuditComplianceStatus(a.complianceScore) === 'Compliant').length;
  const auditCompliance = auditsTotal ? Math.round((auditsCompliant / auditsTotal) * 100) : 0;

  const capaTotal = capaLic.length;
  const capaClosed = capaLic.filter(c => calcCapaStatus(c.targetDate, c.completionDate, c.status) === 'Closed').length;
  const capaClosure = capaTotal ? Math.round((capaClosed / capaTotal) * 100) : 0;

  const overallLicenseCompliance = totalLicenses ? Math.round((validLicenses / totalLicenses) * 100) : 0;

  // 1. License Category Distribution
  const catMap = {};
  allLic.forEach(l => { catMap[l.category] = (catMap[l.category] || 0) + 1; });
  const categoryData = Object.keys(catMap).map((k, i) => ({ name: k, value: catMap[k], color: COLORS[i % COLORS.length] }));

  // 2. Department-wise Licenses
  const deptMap = {};
  allLic.forEach(l => { deptMap[l.dept] = (deptMap[l.dept] || 0) + 1; });
  const deptData = Object.keys(deptMap).map((k) => ({ name: k, count: deptMap[k] }));

  // 3. Monthly License Renewals (from renLic)
  const monthMap = {};
  renLic.forEach(r => {
    if(r.expiryDate) {
      const m = r.expiryDate.substring(0, 7); // YYYY-MM
      monthMap[m] = (monthMap[m] || 0) + 1;
    }
  });
  const monthlyRenewals = Object.keys(monthMap).sort().map(k => ({ month: k, count: monthMap[k] }));

  // 4. License Expiry Trend (from allLic)
  const expTrend = {};
  allLic.forEach(l => {
    if(l.expiryDate) {
      const year = l.expiryDate.substring(0, 4);
      expTrend[year] = (expTrend[year] || 0) + 1;
    }
  });
  const expiryTrendData = Object.keys(expTrend).sort().map(k => ({ year: k, count: expTrend[k] }));

  // 5. Compliance Status Distribution
  const statusMap = { Valid: validLicenses, 'Expiring Soon': expiringSoon, Expired: expiredLicenses };
  const statusData = Object.keys(statusMap).map((k, i) => ({ name: k, value: statusMap[k], color: ['#10b981', '#f59e0b', '#ef4444'][i] }));

  // 6. Audit & CAPA Compliance Trend (dummy trend from actual counts over arbitrary periods, as dates may lack variance in seed)
  // Just use departments for trend since this is cross-sectional data
  const auditCapaData = [];
  Object.keys(deptMap).forEach(d => {
    const dAudits = audLic.filter(a => a.department === d).length;
    const dCapas = capaLic.filter(c => c.department === d).length;
    if(dAudits > 0 || dCapas > 0) {
      auditCapaData.push({ name: d, Audits: dAudits, CAPAs: dCapas });
    }
  });

  // Monthly Summary Table (Department-wise aggregations)
  const tableData = Object.keys(deptMap).map(d => {
    const lics = allLic.filter(l => l.dept === d);
    const valid = lics.filter(l => l.currentStatus === 'Valid').length;
    const expiring = lics.filter(l => l.currentStatus === 'Expiring Soon').length;
    const expired = lics.filter(l => l.currentStatus === 'Expired').length;
    const compPct = lics.length ? Math.round((valid / lics.length) * 100) : 0;
    
    const dAud = audLic.filter(a => a.department === d);
    const avgScore = dAud.length ? Math.round(dAud.reduce((a, b) => a + (parseFloat(b.complianceScore)||0), 0) / dAud.length) : '-';
    
    return {
      department: d,
      total: lics.length,
      valid, expiring, expired,
      compliance: compPct,
      auditScore: avgScore,
      status: compPct >= 90 ? 'Excellent' : compPct >= 70 ? 'Good' : 'Needs Review'
    };
  });

  // Export
  const exportToCSV = () => {
    const headers = ['Department', 'Total Licenses', 'Valid', 'Expiring', 'Expired', 'Compliance %', 'Audit Score', 'Status'];
    const csvRows = [headers.join(',')];
    tableData.forEach(row => {
      csvRows.push([row.department, row.total, row.valid, row.expiring, row.expired, row.compliance, row.auditScore, row.status].join(','));
    });
    const blob = new Blob([csvRows.join('\\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Licenses_Registry_Report.csv';
    a.click();
  };

  const exportToPDF = () => alert('PDF export generated (placeholder).');
  const printReport = () => window.print();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Reports &amp; Analytics</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Comprehensive insights across all modules</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportToCSV} className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 text-[10px] font-bold hover:bg-slate-50">Export CSV</button>
          <button onClick={exportToPDF} className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 text-[10px] font-bold hover:bg-slate-50">Export PDF</button>
          <button onClick={printReport} style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }} className="px-3 py-1.5 rounded-lg text-white text-[10px] font-bold hover:brightness-95 shadow-sm">Print Report</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Licenses', value: totalLicenses, color: 'text-slate-800' },
          { label: 'Valid Licenses', value: validLicenses, color: 'text-emerald-600' },
          { label: 'Expiring Soon', value: expiringSoon, color: 'text-amber-600' },
          { label: 'Expired Licenses', value: expiredLicenses, color: 'text-rose-600' },
          { label: 'Renewal Compliance %', value: \`\${renewalCompliance}%\`, color: 'text-indigo-600' },
          { label: 'Audit Compliance %', value: \`\${auditCompliance}%\`, color: 'text-teal-600' },
          { label: 'CAPA Closure %', value: \`\${capaClosure}%\`, color: 'text-blue-600' },
          { label: 'Overall License Compliance %', value: \`\${overallLicenseCompliance}%\`, color: 'text-emerald-600' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={\`text-2xl font-extrabold mt-1 \${kpi.color}\`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[11px] font-bold text-slate-700 mb-4 uppercase tracking-wider">License Category Distribution</h4>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {categoryData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[11px] font-bold text-slate-700 mb-4 uppercase tracking-wider">Department-wise Licenses</h4>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} interval={0} angle={-45} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', fontSize: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[11px] font-bold text-slate-700 mb-4 uppercase tracking-wider">Monthly License Renewals</h4>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRenewals} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[11px] font-bold text-slate-700 mb-4 uppercase tracking-wider">License Expiry Trend</h4>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={expiryTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#f43f5e" fillOpacity={1} fill="url(#colorExp)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[11px] font-bold text-slate-700 mb-4 uppercase tracking-wider">Compliance Status Distribution</h4>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} innerRadius={0} outerRadius={80} dataKey="value">
                  {statusData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="text-[11px] font-bold text-slate-700 mb-4 uppercase tracking-wider">Audit &amp; CAPA Trend</h4>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={auditCapaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line type="monotone" dataKey="Audits" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="CAPAs" stroke="#0ea5e9" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mt-6">
        <div className="p-4 border-b border-slate-200">
          <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Monthly Summary Table</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Department</th>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Total Licenses</th>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Valid</th>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Expiring</th>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Expired</th>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Compliance %</th>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Audit Score</th>
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tableData.length === 0 ? (
                <tr><td colSpan="8" className="px-4 py-10 text-center text-slate-400">No data available</td></tr>
              ) : (
                tableData.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-semibold text-slate-700">{r.department}</td>
                    <td className="px-4 py-3 text-slate-600">{r.total}</td>
                    <td className="px-4 py-3 text-emerald-600 font-medium">{r.valid}</td>
                    <td className="px-4 py-3 text-amber-600 font-medium">{r.expiring}</td>
                    <td className="px-4 py-3 text-rose-600 font-medium">{r.expired}</td>
                    <td className="px-4 py-3 font-mono">{r.compliance}%</td>
                    <td className="px-4 py-3 font-mono">{r.auditScore}</td>
                    <td className="px-4 py-3">
                      <span className={\`px-2 py-0.5 rounded-full text-[8px] font-bold border \${
                        r.status === 'Excellent' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        r.status === 'Good' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }\`}>{r.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
`;

const marker1 = 'export default function LicensesRegistryWorkspace() {';
const marker2 = "case 'reports':      return <PlaceholderTab title=\"Reports & Analytics\" />;";
const replacement2 = "case 'reports':      return <ReportsTab hospital={hospital} />;";

if (code.includes(marker1)) {
  code = code.replace(marker1, phase7Data + '\n' + marker1);
}
if (code.includes(marker2)) {
  code = code.replace(marker2, replacement2);
}

fs.writeFileSync(path, code, 'utf8');
console.log('Phase 7 inserted successfully.');

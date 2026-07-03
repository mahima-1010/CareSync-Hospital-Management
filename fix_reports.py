with open('frontend/src/pages/EndoscopyWorkspace.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# New ReportsTab component
new_reports_tab = '''const ReportsTab = ({
  hospital,
  qualityIndicators,
  procedureRecords,
  reprocessingRecords,
  sedationRecords,
  radiationRecords,
}) => {
  const handleExportCSV = () => {
    alert('Export CSV functionality will be implemented here.');
  };

  const handleExportPDF = () => {
    alert('Export PDF functionality will be implemented here.');
  };

  const handlePrintReport = () => {
    alert('Print Report functionality will be implemented here.');
  };

  const totalQuality = qualityIndicators.length;
  const totalProcedure = procedureRecords.length;
  const totalReprocessing = reprocessingRecords.length;
  const totalSedation = sedationRecords.length;
  const totalRadiation = radiationRecords.length;
  const avgComplication = totalQuality ? (qualityIndicators.reduce((s, r) => s + (r.complicationRate || 0), 0) / totalQuality).toFixed(1) : 0;
  const avgReprocessingCompliance = totalReprocessing ? (reprocessingRecords.reduce((s, r) => s + (r.highLevelDisinfectionCompliance || 0), 0) / totalReprocessing).toFixed(1) : 0;
  const avgPatientSatisfaction = totalQuality ? (qualityIndicators.reduce((s, r) => s + (r.patientSatisfaction || 0), 0) / totalQuality).toFixed(1) : 0;

  const procedureTrendData = MONTHS.map((month) => {
    const record = procedureRecords.find((r) => r.month === month);
    return { month, procedures: record ? record.procedureCount : 0 };
  }).filter((d) => d.procedures > 0 || procedureRecords.some((r) => r.month === d.month));

  const procedureTypeData = [
    { name: 'Diagnostic', value: procedureRecords.reduce((s, r) => s + (r.diagnosticProcedures || 0), 0), color: '#3b82f6' },
    { name: 'Therapeutic', value: procedureRecords.reduce((s, r) => s + (r.therapeuticProcedures || 0), 0), color: '#10b981' },
    { name: 'Emergency', value: procedureRecords.reduce((s, r) => s + (r.emergencyProcedures || 0), 0), color: '#ef4444' },
  ].filter((d) => d.value > 0);

  const reprocessingComplianceData = MONTHS.map((month) => {
    const record = reprocessingRecords.find((r) => r.month === month);
    return { month, compliance: record ? record.highLevelDisinfectionCompliance : 0 };
  }).filter((d) => d.compliance > 0 || reprocessingRecords.some((r) => r.month === d.month));

  const sedationComplianceData = MONTHS.map((month) => {
    const record = sedationRecords.find((r) => r.month === month);
    return { month, compliance: record ? record.postSedationRecovery : 0 };
  }).filter((d) => d.compliance > 0 || sedationRecords.some((r) => r.month === d.month));

  const radiationComplianceData = radiationRecords.map((r) => ({
    month: r.month,
    compliance: r.leadApronCompliance,
  }));

  const monthlySummaryData = MONTHS.map((month) => {
    const quality = qualityIndicators.find((r) => r.month === month);
    const procedure = procedureRecords.find((r) => r.month === month);
    const reprocessing = reprocessingRecords.find((r) => r.month === month);
    const sedation = sedationRecords.find((r) => r.month === month);
    const radiation = radiationRecords.find((r) => r.month === month);
    return {
      month,
      totalProcedures: procedure ? procedure.procedureCount : '-',
      complicationRate: quality ? `${quality.complicationRate}%` : '-',
      reprocessingCompliance: reprocessing ? `${reprocessing.highLevelDisinfectionCompliance}%` : '-',
      sedationCompliance: sedation ? `${sedation.postSedationRecovery}%` : '-',
      radiationCompliance: radiation ? `${radiation.leadApronCompliance}%` : '-',
      patientSatisfaction: quality ? `${quality.patientSatisfaction}%` : '-',
      status: quality ? quality.status : (procedure ? procedure.status : '-'),
    };
  }).filter((d) => {
    return qualityIndicators.some((r) => r.month === d.month) ||
      procedureRecords.some((r) => r.month === d.month) ||
      reprocessingRecords.some((r) => r.month === d.month) ||
      sedationRecords.some((r) => r.month === d.month) ||
      radiationRecords.some((r) => r.month === d.month);
  });

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Reports &amp; Analytics</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Endoscopy Department consolidated analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
          >
            Export CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
          >
            Export PDF
          </button>
          <button
            onClick={handlePrintReport}
            style={{ backgroundColor: hospital.themeColor }}
            className="px-3 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
          >
            Print Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Quality Records', value: totalQuality, color: 'text-blue-600' },
          { label: 'Total Procedure Records', value: totalProcedure, color: 'text-rose-600' },
          { label: 'Total Reprocessing Records', value: totalReprocessing, color: 'text-amber-600' },
          { label: 'Total Sedation Records', value: totalSedation, color: 'text-emerald-600' },
          { label: 'Total Radiation Records', value: totalRadiation, color: 'text-purple-600' },
          { label: 'Average Complication Rate %', value: `${avgComplication}%`, color: 'text-cyan-600' },
          { label: 'Avg Reprocessing Compliance %', value: `${avgReprocessingCompliance}%`, color: 'text-orange-600' },
          { label: 'Avg Patient Satisfaction %', value: `${avgPatientSatisfaction}%`, color: 'text-lime-600' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={`text-2xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h4 className="text-xs font-extrabold text-slate-800 mb-4">Monthly Procedure Trend</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={procedureTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="procedures" stroke="#3b82f6" name="Total Procedures" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h4 className="text-xs font-extrabold text-slate-800 mb-4">Procedure Type Distribution</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={procedureTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {procedureTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
             <h4 className="text-xs font-extrabold text-slate-800 mb-4">Reprocessing Compliance</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reprocessingComplianceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="compliance" fill="#10b981" name="HLD Compliance %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h4 className="text-xs font-extrabold text-slate-800 mb-4">Sedation Compliance Trend</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sedationComplianceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="compliance" stroke="#f59e0b" name="Post-Sedation Recovery %" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h4 className="text-xs font-extrabold text-slate-800 mb-4">Radiation Safety Compliance</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={radiationComplianceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="compliance" fill="#8b5cf6" name="Lead Apron %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h4 className="text-xs font-extrabold text-slate-800 mb-4">Monthly Endoscopy Summary</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySummaryData.map((d) => ({
                ...d,
                complicationRate: typeof d.complicationRate === 'string' ? parseFloat(d.complicationRate) || 0 : 0,
                patientSatisfaction: typeof d.patientSatisfaction === 'string' ? parseFloat(d.patientSatisfaction) || 0 : 0,
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalProcedures" stroke="#3b82f6" name="Total Procedures" strokeWidth={2} />
                <Line type="monotone" dataKey="complicationRate" stroke="#ef4444" name="Complication Rate %" strokeWidth={2} />
                <Line type="monotone" dataKey="patientSatisfaction" stroke="#10b981" name="Patient Satisfaction %" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h4 className="text-xs font-extrabold text-slate-800">Monthly Summary</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Month</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Total Procedures</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Complication Rate</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Reprocessing Compliance</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Sedation Compliance</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Radiation Compliance</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Patient Satisfaction</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {monthlySummaryData.map((row) => (
                  <tr key={row.month} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-3 font-semibold text-slate-700 whitespace-nowrap">{row.month}</td>
                    <td className="px-3 py-3 text-slate-600">{row.totalProcedures}</td>
                    <td className="px-3 py-3 text-rose-600 font-bold">{row.complicationRate}</td>
                    <td className="px-3 py-3 text-emerald-600 font-bold">{row.reprocessingCompliance}</td>
                    <td className="px-3 py-3 text-amber-600 font-bold">{row.sedationCompliance}</td>
                    <td className="px-3 py-3 text-blue-600 font-bold">{row.radiationCompliance}</td>
                    <td className="px-3 py-3 text-purple-600 font-bold">{row.patientSatisfaction}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[row.status] || STATUS_BADGE.Active}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {monthlySummaryData.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-3 py-10 text-center text-[10px] text-slate-400">
                      No data available for monthly summary.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};'''

# Find the old ReportsTab and replace it
old_start = 'const ReportsTab = ({'
old_end = 'const EndoscopyWorkspace = ({ onBack }) => {'

start_idx = content.find(old_start)
end_idx = content.find(old_end)

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_reports_tab + '\n\n' + content[end_idx:]
    print('ReportsTab replaced successfully')
else:
    print(f'ERROR: Could not find ReportsTab boundaries (start={start_idx}, end={end_idx})')

with open('frontend/src/pages/EndoscopyWorkspace.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

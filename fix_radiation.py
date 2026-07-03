with open('frontend/src/pages/EndoscopyWorkspace.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace audit constants with radiation constants
content = content.replace('const LS_KEY_RADIATION = \'endoscopy_radiation_safety\';', 'const LS_KEY_RADIATION = \'endoscopy_radiation_safety\';')

old_audit_form = '''const EMPTY_AUDIT_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  auditArea: '',
  complianceScore: 100,
  findings: 0,
  correctiveAction: '',
  auditor: '',
  auditDate: '',
  status: 'Active',
};

const SAMPLE_AUDIT_RECORDS = [
  { id: 'eau-001', month: 'January',  year: 2025, auditArea: 'Triage Area', complianceScore: 94, findings: 3, correctiveAction: 'Updated triage protocol', auditor: 'Dr. Sharma', auditDate: '2025-01-20', status: 'Active' },
  { id: 'eau-002', month: 'February', year: 2025, auditArea: 'Medication Storage', complianceScore: 88, findings: 5, correctiveAction: 'Rearranged stock', auditor: 'Dr. Patel', auditDate: '2025-02-18', status: 'Active' },
  { id: 'eau-003', month: 'March',    year: 2025, auditArea: 'Crash Cart', complianceScore: 98, findings: 1, correctiveAction: 'Replaced expired items', auditor: 'Dr. Kumar', auditDate: '2025-03-15', status: 'Active' },
  { id: 'eau-004', month: 'April',    year: 2025, auditArea: 'Ambulance Bay', complianceScore: 91, findings: 4, correctiveAction: 'Scheduled maintenance', auditor: 'Dr. Singh', auditDate: '2025-04-22', status: 'Pending' },
  { id: 'eau-005', month: 'May',      year: 2025, auditArea: 'Endoscopy Waiting Area', complianceScore: 96, findings: 2, correctiveAction: 'Added seating', auditor: 'Dr. Reddy', auditDate: '2025-05-10', status: 'Active' },
];'''

new_radiation_form = '''const EMPTY_RADIATION_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  ercpProcedures: 0,
  leadApronCompliance: 100,
  thyroidShieldCompliance: 100,
  dosimeterBadgeCompliance: 100,
  averageFluoroscopyTime: 0,
  radiationExposureIncidents: 0,
  status: 'Active',
};

const SAMPLE_RADIATION_RECORDS = [
  { id: 'ers-001', month: 'January',  year: 2025, ercpProcedures: 15, leadApronCompliance: 98, thyroidShieldCompliance: 96, dosimeterBadgeCompliance: 100, averageFluoroscopyTime: 12, radiationExposureIncidents: 0, status: 'Active' },
  { id: 'ers-002', month: 'February', year: 2025, ercpProcedures: 14, leadApronCompliance: 97, thyroidShieldCompliance: 95, dosimeterBadgeCompliance: 99, averageFluoroscopyTime: 14, radiationExposureIncidents: 0, status: 'Active' },
  { id: 'ers-003', month: 'March',    year: 2025, ercpProcedures: 16, leadApronCompliance: 99, thyroidShieldCompliance: 98, dosimeterBadgeCompliance: 100, averageFluoroscopyTime: 11, radiationExposureIncidents: 1, status: 'Active' },
  { id: 'ers-004', month: 'April',    year: 2025, ercpProcedures: 13, leadApronCompliance: 96, thyroidShieldCompliance: 94, dosimeterBadgeCompliance: 98, averageFluoroscopyTime: 15, radiationExposureIncidents: 0, status: 'Active' },
  { id: 'ers-005', month: 'May',      year: 2025, ercpProcedures: 15, leadApronCompliance: 100, thyroidShieldCompliance: 97, dosimeterBadgeCompliance: 100, averageFluoroscopyTime: 10, radiationExposureIncidents: 0, status: 'Active' },
];'''

content = content.replace(old_audit_form, new_radiation_form)

# 2. Replace RadiationTab component
old_radiation_tab = '''const RadiationTab = ({
  hospital,
  auditRecords,
  searchQuery,
  setSearchQuery,
  handleOpenAuditModal,
  handleDeleteAudit,
}) => {
  const filtered = auditRecords.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.month.toLowerCase().includes(q) ||
      String(r.year).includes(q) ||
      r.auditArea.toLowerCase().includes(q) ||
      r.auditor.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalRecords = auditRecords.length;
  const avgCompliance = totalRecords ? (auditRecords.reduce((s, r) => s + (r.complianceScore || 0), 0) / totalRecords).toFixed(1) : 0;
  const openFindings = auditRecords.reduce((s, r) => s + (r.findings || 0), 0);
  const closedFindings = auditRecords.filter((r) => r.status === 'Active').length;

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Audit ID', 'Month', 'Audit Area', 'Compliance %',
    'Findings', 'Corrective Action', 'Auditor',
    'Audit Date', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Audit Checklist</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Endoscopy Department audit records</p>
        </div>
        <button
          onClick={() => handleOpenAuditModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Audit
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Audits', value: totalRecords, color: 'text-blue-600' },
          { label: 'Average Compliance %', value: `${avgCompliance}%`, color: 'text-rose-600' },
          { label: 'Open Findings', value: openFindings, color: 'text-amber-600' },
          { label: 'Closed Findings', value: closedFindings, color: 'text-emerald-600' },
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
          placeholder="Search by month, year, audit area, auditor, or status…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {TH_COLS.map((h) => (
                  <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                  <td className="px-3 py-3 font-semibold text-slate-700 whitespace-nowrap">{r.month} {r.year}</td>
                  <td className="px-3 py-3 text-slate-600">{r.auditArea}</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.complianceScore}%</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.findings}</td>
                  <td className="px-3 py-3 text-slate-600">{r.correctiveAction}</td>
                  <td className="px-3 py-3 text-slate-600">{r.auditor}</td>
                  <td className="px-3 py-3 text-slate-600">{r.auditDate}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Active}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenAuditModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteAudit(r.id)}
                        className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">
                    {searchQuery ? 'No records match your search.' : 'No audit records yet. Click "Add Audit" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {auditRecords.length} record{auditRecords.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};'''

new_radiation_tab = '''const RadiationTab = ({
  hospital,
  radiationRecords,
  searchQuery,
  setSearchQuery,
  handleOpenRadiationModal,
  handleDeleteRadiation,
}) => {
  const filtered = radiationRecords.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.month.toLowerCase().includes(q) ||
      String(r.year).includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalRecords = radiationRecords.length;
  const totalERCP = radiationRecords.reduce((s, r) => s + (r.ercpProcedures || 0), 0);
  const avgLeadApron = totalRecords ? (radiationRecords.reduce((s, r) => s + (r.leadApronCompliance || 0), 0) / totalRecords).toFixed(1) : 0;
  const avgDosimeter = totalRecords ? (radiationRecords.reduce((s, r) => s + (r.dosimeterBadgeCompliance || 0), 0) / totalRecords).toFixed(1) : 0;
  const totalIncidents = radiationRecords.reduce((s, r) => s + (r.radiationExposureIncidents || 0), 0);

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'ERCP Procedures', 'Lead Apron', 'Thyroid Shield',
    'Dosimeter Badge', 'Fluoroscopy Time', 'Radiation Incidents', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Radiation Safety (ERCP)</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Endoscopy Department ERCP radiation safety metrics</p>
        </div>
        <button
          onClick={() => handleOpenRadiationModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Radiation Record
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total ERCP Procedures', value: totalERCP, color: 'text-blue-600' },
          { label: 'Lead Apron %', value: `${avgLeadApron}%`, color: 'text-rose-600' },
          { label: 'Dosimeter Badge %', value: `${avgDosimeter}%`, color: 'text-amber-600' },
          { label: 'Radiation Incidents', value: totalIncidents, color: 'text-emerald-600' },
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
          placeholder="Search by month, year, or status…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[10px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {TH_COLS.map((h) => (
                  <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.id}</td>
                  <td className="px-3 py-3 font-semibold text-slate-700 whitespace-nowrap">{r.month} {r.year}</td>
                  <td className="px-3 py-3 text-slate-600">{r.ercpProcedures}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.leadApronCompliance}%</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.thyroidShieldCompliance}%</td>
                  <td className="px-3 py-3 text-purple-600 font-bold">{r.dosimeterBadgeCompliance}%</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.averageFluoroscopyTime} min</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.radiationExposureIncidents}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Active}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenRadiationModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteRadiation(r.id)}
                        className="px-2 py-1 rounded border border-slate-200 text-rose-500 hover:border-rose-300 hover:text-rose-700 cursor-pointer transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={TH_COLS.length} className="px-3 py-10 text-center text-[10px] text-slate-400">
                    {searchQuery ? 'No records match your search.' : 'No radiation records yet. Click "Add Radiation Record" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {radiationRecords.length} record{radiationRecords.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};'''

if old_radiation_tab in content:
    content = content.replace(old_radiation_tab, new_radiation_tab)
    print('RadiationTab replaced successfully')
else:
    print('ERROR: Could not find old RadiationTab')

with open('frontend/src/pages/EndoscopyWorkspace.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

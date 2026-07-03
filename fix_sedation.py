import re

with open('frontend/src/pages/EndoscopyWorkspace.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Sedation constants before NumField
sedation_consts = '''
const LS_KEY_SEDATION = 'endoscopy_sedation_safety';

const EMPTY_SEDATION_FORM = {
  id: '',
  month: 'January',
  year: new Date().getFullYear(),
  sedationType: 'Conscious Sedation',
  totalSedationCases: 0,
  preSedationAssessment: 100,
  intraProcedureMonitoring: 100,
  postSedationRecovery: 100,
  sedationComplications: 0,
  recoveryTime: 0,
  status: 'Active',
};

const SAMPLE_SEDATION_RECORDS = [
  { id: 'ese-001', month: 'January',  year: 2025, sedationType: 'Conscious Sedation', totalSedationCases: 45, preSedationAssessment: 98, intraProcedureMonitoring: 100, postSedationRecovery: 97, sedationComplications: 1, recoveryTime: 45, status: 'Active' },
  { id: 'ese-002', month: 'February', year: 2025, sedationType: 'Deep Sedation', totalSedationCases: 38, preSedationAssessment: 97, intraProcedureMonitoring: 99, postSedationRecovery: 96, sedationComplications: 2, recoveryTime: 60, status: 'Active' },
  { id: 'ese-003', month: 'March',    year: 2025, sedationType: 'Conscious Sedation', totalSedationCases: 50, preSedationAssessment: 99, intraProcedureMonitoring: 100, postSedationRecovery: 98, sedationComplications: 0, recoveryTime: 40, status: 'Active' },
  { id: 'ese-004', month: 'April',    year: 2025, sedationType: 'Moderate Sedation', totalSedationCases: 42, preSedationAssessment: 96, intraProcedureMonitoring: 98, postSedationRecovery: 95, sedationComplications: 1, recoveryTime: 50, status: 'Active' },
  { id: 'ese-005', month: 'May',      year: 2025, sedationType: 'Conscious Sedation', totalSedationCases: 48, preSedationAssessment: 100, intraProcedureMonitoring: 100, postSedationRecovery: 99, sedationComplications: 0, recoveryTime: 42, status: 'Active' },
];

'''

content = content.replace(
    'const NumField = ({ label, field, form, setForm, step = \'1\' }) => (',
    sedation_consts + 'const NumField = ({ label, field, form, setForm, step = \'1\' }) => ('
)

# 2. Replace SedationTab component
old_sedation_tab = '''const SedationTab = ({
  hospital,
  ambulanceRecords,
  searchQuery,
  setSearchQuery,
  handleOpenAmbulanceModal,
  handleDeleteAmbulance,
}) => {
  const filtered = ambulanceRecords.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.month.toLowerCase().includes(q) ||
      String(r.year).includes(q) ||
      r.ambulanceId.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalRecords = ambulanceRecords.length;
  const avgResponse = totalRecords ? (ambulanceRecords.reduce((s, r) => s + (r.responseTime || 0), 0) / totalRecords).toFixed(1) : 0;
  const avgVehicle = totalRecords ? (ambulanceRecords.reduce((s, r) => s + (r.vehicleReadiness || 0), 0) / totalRecords).toFixed(1) : 0;
  const totalCases = ambulanceRecords.reduce((s, r) => s + (r.casesTransported || 0), 0);

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'Ambulance ID', 'Response Time',
    'Dispatch Time', 'Arrival Time', 'Cases Transported',
    'Vehicle Readiness', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Ambulance</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Endoscopy Department ambulance metrics</p>
        </div>
        <button
          onClick={() => handleOpenAmbulanceModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Ambulance Record
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Ambulance Records', value: totalRecords, color: 'text-blue-600' },
          { label: 'Average Response Time', value: `${avgResponse} min`, color: 'text-rose-600' },
          { label: 'Vehicle Readiness %', value: `${avgVehicle}%`, color: 'text-amber-600' },
          { label: 'Cases Transported', value: totalCases, color: 'text-emerald-600' },
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
          placeholder="Search by month, year, ambulance ID, or status…"
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
                  <td className="px-3 py-3 font-mono text-slate-600">{r.ambulanceId}</td>
                  <td className="px-3 py-3 text-slate-600">{r.responseTime} min</td>
                  <td className="px-3 py-3 text-slate-600">{r.dispatchTime}</td>
                  <td className="px-3 py-3 text-slate-600">{r.arrivalTime}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.casesTransported}</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.vehicleReadiness}%</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Active}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenAmbulanceModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteAmbulance(r.id)}
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
                    {searchQuery ? 'No records match your search.' : 'No ambulance records yet. Click "Add Ambulance Record" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {ambulanceRecords.length} record{ambulanceRecords.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};'''

new_sedation_tab = '''const SedationTab = ({
  hospital,
  sedationRecords,
  searchQuery,
  setSearchQuery,
  handleOpenSedationModal,
  handleDeleteSedation,
}) => {
  const filtered = sedationRecords.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.month.toLowerCase().includes(q) ||
      String(r.year).includes(q) ||
      r.sedationType.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const totalRecords = sedationRecords.length;
  const totalCases = sedationRecords.reduce((s, r) => s + (r.totalSedationCases || 0), 0);
  const avgPreSedation = totalRecords ? (sedationRecords.reduce((s, r) => s + (r.preSedationAssessment || 0), 0) / totalRecords).toFixed(1) : 0;
  const avgRecovery = totalRecords ? (sedationRecords.reduce((s, r) => s + (r.postSedationRecovery || 0), 0) / totalRecords).toFixed(1) : 0;
  const totalComplications = sedationRecords.reduce((s, r) => s + (r.sedationComplications || 0), 0);

  const STATUS_BADGE = {
    Active:   'bg-emerald-50 text-emerald-700 border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border-slate-200',
    Pending:  'bg-amber-50 text-amber-700 border-amber-200',
  };

  const TH_COLS = [
    'Record ID', 'Month', 'Sedation Type', 'Total Cases', 'Pre-Sedation', 'Monitoring', 'Recovery', 'Complications', 'Recovery Time', 'Status', 'Actions',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Sedation Safety</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Endoscopy Department sedation safety metrics</p>
        </div>
        <button
          onClick={() => handleOpenSedationModal()}
          style={{ backgroundColor: hospital.themeColor }}
          className="px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add Sedation Record
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Sedation Cases', value: totalCases, color: 'text-blue-600' },
          { label: 'Pre-Sedation %', value: `${avgPreSedation}%`, color: 'text-rose-600' },
          { label: 'Post-Sedation Recovery %', value: `${avgRecovery}%`, color: 'text-amber-600' },
          { label: 'Sedation Complications', value: totalComplications, color: 'text-emerald-600' },
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
          placeholder="Search by month, year, type, or status…"
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
                  <td className="px-3 py-3 text-slate-600">{r.sedationType}</td>
                  <td className="px-3 py-3 text-slate-600">{r.totalSedationCases}</td>
                  <td className="px-3 py-3 text-emerald-600 font-bold">{r.preSedationAssessment}%</td>
                  <td className="px-3 py-3 text-blue-600 font-bold">{r.intraProcedureMonitoring}%</td>
                  <td className="px-3 py-3 text-purple-600 font-bold">{r.postSedationRecovery}%</td>
                  <td className="px-3 py-3 text-rose-600 font-bold">{r.sedationComplications}</td>
                  <td className="px-3 py-3 text-amber-600 font-bold">{r.recoveryTime} min</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${STATUS_BADGE[r.status] || STATUS_BADGE.Active}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenSedationModal(r)}
                        className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700 cursor-pointer transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteSedation(r.id)}
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
                    {searchQuery ? 'No records match your search.' : 'No sedation records yet. Click "Add Sedation Record" to begin.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
          <span className="text-[9px] text-slate-400 font-medium">
            Showing {filtered.length} of {sedationRecords.length} record{sedationRecords.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};'''

if old_sedation_tab in content:
    content = content.replace(old_sedation_tab, new_sedation_tab)
    print('SedationTab replaced successfully')
else:
    print('ERROR: Could not find old SedationTab')

with open('frontend/src/pages/EndoscopyWorkspace.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

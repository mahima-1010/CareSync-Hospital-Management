const fs = require('fs');
const path = 'c:/Users/user/Desktop/hospital/frontend/src/pages/LicensesRegistryWorkspace.jsx';
let code = fs.readFileSync(path, 'utf8');

const phase6Data = `
/* ============================================================
   PHASE 6 — INTERNAL AUDIT CONSTANTS & SEED
   ============================================================ */

const LS_KEY_AUDITS = 'licenses_internal_audits';
const LS_KEY_CAPA = 'licenses_capa_tracker';

const AUDIT_TYPES = ['Internal Audit', 'External Audit', 'Surprise Inspection'];
const OBSERVATION_CATEGORIES = ['Critical', 'Major', 'Minor'];
const AUDIT_STATUSES = ['Scheduled', 'Completed', 'Pending'];
const CAPA_STATUSES = ['Open', 'In Progress', 'Closed', 'Overdue'];

const SEED_AUDITS = Array.from({ length: 10 }, (_, i) => ({
  id: \`aud-\${String(i + 1).padStart(3, '0')}\`,
  auditDate: \`2023-10-\${String((i % 28) + 1).padStart(2, '0')}\`,
  auditType: AUDIT_TYPES[i % AUDIT_TYPES.length],
  licenseCategory: LICENSE_CATEGORIES[i % LICENSE_CATEGORIES.length],
  licenseName: \`License \${100 + i}\`,
  department: HOSPITAL_DEPARTMENTS[i % HOSPITAL_DEPARTMENTS.length],
  auditor: \`Auditor \${String.fromCharCode(65 + i)}\`,
  complianceScore: 95 - (i * 3), // range 95 down to 68
  auditFindings: \`Findings details \${i + 1}\`,
  observationCategory: OBSERVATION_CATEGORIES[i % OBSERVATION_CATEGORIES.length],
  recommendation: 'Fix minor gaps',
  targetClosureDate: \`2024-01-\${String((i % 28) + 1).padStart(2, '0')}\`,
  auditStatus: AUDIT_STATUSES[i % AUDIT_STATUSES.length],
  remarks: '',
}));

const SEED_CAPAS = Array.from({ length: 10 }, (_, i) => ({
  id: \`cap-\${String(i + 1).padStart(3, '0')}\`,
  linkedAudit: \`aud-\${String(i + 1).padStart(3, '0')}\`,
  department: HOSPITAL_DEPARTMENTS[(i + 1) % HOSPITAL_DEPARTMENTS.length],
  capaDescription: \`Fix findings from audit \${i + 1}\`,
  rootCause: 'Lack of training',
  correctiveAction: 'Conducted training',
  preventiveAction: 'Updated SOP',
  responsiblePerson: \`Mgr \${String.fromCharCode(75 + i)}\`,
  targetDate: \`2024-02-\${String((i % 28) + 1).padStart(2, '0')}\`,
  completionDate: i % 2 === 0 ? \`2024-01-\${String((i % 28) + 1).padStart(2, '0')}\` : '',
  status: i % 2 === 0 ? 'Closed' : 'In Progress',
  remarks: '',
}));

const BLANK_AUDIT_FORM = {
  id: '', auditDate: '', auditType: AUDIT_TYPES[0], licenseCategory: LICENSE_CATEGORIES[0],
  licenseName: '', department: HOSPITAL_DEPARTMENTS[0], auditor: '', complianceScore: '',
  auditFindings: '', observationCategory: OBSERVATION_CATEGORIES[0], recommendation: '',
  targetClosureDate: '', auditStatus: AUDIT_STATUSES[0], remarks: ''
};

const BLANK_CAPA_FORM = {
  id: '', linkedAudit: '', department: HOSPITAL_DEPARTMENTS[0], capaDescription: '',
  rootCause: '', correctiveAction: '', preventiveAction: '', responsiblePerson: '',
  targetDate: '', completionDate: '', status: CAPA_STATUSES[0], remarks: ''
};

/* ============================================================
   PHASE 6 — INTERNAL AUDIT HELPERS
   ============================================================ */

const calcAuditComplianceStatus = (score) => {
  const s = parseFloat(score);
  if (isNaN(s)) return 'Non-Compliant';
  if (s >= 90) return 'Compliant';
  if (s >= 70) return 'Needs Improvement';
  return 'Non-Compliant';
};

const calcCapaStatus = (targetDate, completionDate, currentStatus) => {
  if (completionDate) return 'Closed';
  if (targetDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDate);
    if (!isNaN(target.getTime()) && today > target) return 'Overdue';
  }
  return currentStatus || 'Open';
};

const AUDIT_COMPLIANCE_BADGE = {
  'Compliant': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Needs Improvement': 'bg-amber-50 text-amber-700 border-amber-200',
  'Non-Compliant': 'bg-rose-50 text-rose-700 border-rose-200',
};

const CAPA_STATUS_BADGE = {
  'Open': 'bg-blue-50 text-blue-700 border-blue-200',
  'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
  'Closed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Overdue': 'bg-rose-50 text-rose-700 border-rose-200',
};

/* ============================================================
   PHASE 6 — MAIN COMPONENTS
   ============================================================ */

const InternalAuditTab = ({ hospital }) => {
  const [auditRecords, setAuditRecords] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_AUDITS);
    return saved ? JSON.parse(saved) : SEED_AUDITS;
  });
  const [capaRecords, setCapaRecords] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_CAPA);
    return saved ? JSON.parse(saved) : SEED_CAPAS;
  });

  React.useEffect(() => { localStorage.setItem(LS_KEY_AUDITS, JSON.stringify(auditRecords)); }, [auditRecords]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_CAPA, JSON.stringify(capaRecords)); }, [capaRecords]);

  const allAudits = auditRecords.map(r => ({ ...r, autoCompliance: calcAuditComplianceStatus(r.complianceScore) }));
  const allCapas = capaRecords.map(r => ({ ...r, autoStatus: calcCapaStatus(r.targetDate, r.completionDate, r.status) }));
  
  const totalAudits = allAudits.length;
  const completedAudits = allAudits.filter(r => r.auditStatus === 'Completed').length;
  const pendingAudits = allAudits.filter(r => r.auditStatus === 'Pending' || r.auditStatus === 'Scheduled').length;
  const avgCompliance = totalAudits ? Math.round(allAudits.reduce((acc, r) => acc + (parseFloat(r.complianceScore) || 0), 0) / totalAudits) : 0;
  
  const totalCapas = allCapas.length;
  const closedCapas = allCapas.filter(r => r.autoStatus === 'Closed').length;
  const overdueCapas = allCapas.filter(r => r.autoStatus === 'Overdue').length;
  
  const compliants = allAudits.filter(r => r.autoCompliance === 'Compliant').length;
  const licenseCompliancePct = totalAudits ? Math.round((compliants / totalAudits) * 100) : 0;

  const kpis = [
    { label: 'Total Audits',           value: totalAudits,     color: 'text-blue-600' },
    { label: 'Completed Audits',       value: completedAudits, color: 'text-emerald-600' },
    { label: 'Pending Audits',         value: pendingAudits,   color: 'text-amber-600' },
    { label: 'Average Compliance %',   value: \`\${avgCompliance}%\`, color: 'text-teal-600' },
    { label: 'Total CAPAs',            value: totalCapas,      color: 'text-violet-600' },
    { label: 'Closed CAPAs',           value: closedCapas,     color: 'text-emerald-600' },
    { label: 'Overdue CAPAs',          value: overdueCapas,    color: 'text-rose-600' },
    { label: 'License Compliance %',   value: \`\${licenseCompliancePct}%\`, color: 'text-sky-600' },
  ];

  const [activeSubTab, setActiveSubTab] = React.useState('aud');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Internal Audit &amp; CAPA</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Manage compliance audits and corrective/preventive actions</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</p>
            <p className={\`text-2xl font-extrabold mt-1 \${kpi.color}\`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {[
          { id: 'aud', label: 'License Compliance Audit' },
          { id: 'cap', label: 'CAPA Tracker' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveSubTab(t.id)}
            className={\`px-4 py-2 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-colors \${
              activeSubTab === t.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-700'
            }\`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeSubTab === 'aud' && <ComplianceAuditModule hospital={hospital} data={allAudits} setData={setAuditRecords} />}
      {activeSubTab === 'cap' && <CapaTrackerModule hospital={hospital} data={allCapas} setData={setCapaRecords} audits={allAudits} />}
    </div>
  );
};

/* ================== CRUD MODULE: LICENSE COMPLIANCE AUDIT ================== */
const ComplianceAuditModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');
  const [filterObs, setFilterObs] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_AUDIT_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('aud-', ''), 10); return n > m ? n : m; }, 0);
    return \`aud-\${String(max + 1).padStart(3, '0')}\`;
  };

  const openAddModal = () => { setForm({ ...BLANK_AUDIT_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.auditDate) e.auditDate = 'Req';
    if (!f.licenseName.trim()) e.licenseName = 'Req';
    if (!f.auditor.trim()) e.auditor = 'Req';
    if (f.complianceScore === '') e.complianceScore = 'Req';
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const toSave = { ...form };
    delete toSave.autoCompliance;
    if (editingId) setData(prev => prev.map(r => r.id === editingId ? { ...toSave, id: editingId } : r));
    else setData(prev => [...prev, { ...toSave }]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData(prev => prev.filter(r => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = r.id.toLowerCase().includes(q) || r.licenseName.toLowerCase().includes(q) || r.auditor.toLowerCase().includes(q);
    const matchDept = !filterDept || r.department === filterDept;
    const matchStatus = !filterStatus || r.auditStatus === filterStatus;
    const matchObs = !filterObs || r.observationCategory === filterObs;
    return matchSearch && matchDept && matchStatus && matchObs;
  });

  const TH_COLS = ['Audit ID', 'License Name', 'Dept', 'Date', 'Auditor', 'Score (%)', 'Observation', 'Status', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search ID, license, auditor..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Departments</option>
          {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterObs} onChange={(e) => setFilterObs(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Observations</option>
          {OBSERVATION_CATEGORIES.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Statuses</option>
          {AUDIT_STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={openAddModal} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}>
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>{TH_COLS.map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={TH_COLS.length} className="px-4 py-10 text-center text-slate-400">No records found.</td></tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-3 py-3 font-mono text-slate-700">{r.id}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.licenseName}</td>
                    <td className="px-3 py-3 text-slate-600">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600">{r.auditDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.auditor}</td>
                    <td className="px-3 py-3">
                      <span className={\`px-2 py-0.5 rounded-full text-[8px] font-bold border \${AUDIT_COMPLIANCE_BADGE[r.autoCompliance]}\`}>{r.complianceScore}% ({r.autoCompliance})</span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{r.observationCategory}</td>
                    <td className="px-3 py-3 text-slate-600">{r.auditStatus}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 text-sky-600 hover:bg-sky-50 rounded"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5">
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit Audit Record' : 'Add Audit Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <input type="date" value={form.auditDate} onChange={e => setForm({...form, auditDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <select value={form.auditType} onChange={e => setForm({...form, auditType: e.target.value})} className="border p-2 rounded text-[10px]">
                {AUDIT_TYPES.map(d => <option key={d}>{d}</option>)}
              </select>
              <select value={form.licenseCategory} onChange={e => setForm({...form, licenseCategory: e.target.value})} className="border p-2 rounded text-[10px]">
                {LICENSE_CATEGORIES.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.licenseName} onChange={e => setForm({...form, licenseName: e.target.value})} placeholder="License Name *" className="border p-2 rounded text-[10px]" />
              <select value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="border p-2 rounded text-[10px]">
                {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.auditor} onChange={e => setForm({...form, auditor: e.target.value})} placeholder="Auditor *" className="border p-2 rounded text-[10px]" />
              <input type="number" min="0" max="100" value={form.complianceScore} onChange={e => setForm({...form, complianceScore: e.target.value})} placeholder="Score (0-100) *" className="border p-2 rounded text-[10px]" />
              <select value={form.observationCategory} onChange={e => setForm({...form, observationCategory: e.target.value})} className="border p-2 rounded text-[10px]">
                {OBSERVATION_CATEGORIES.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.auditFindings} onChange={e => setForm({...form, auditFindings: e.target.value})} placeholder="Findings" className="border p-2 rounded text-[10px]" />
              <input value={form.recommendation} onChange={e => setForm({...form, recommendation: e.target.value})} placeholder="Recommendation" className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.targetClosureDate} onChange={e => setForm({...form, targetClosureDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <select value={form.auditStatus} onChange={e => setForm({...form, auditStatus: e.target.value})} className="border p-2 rounded text-[10px]">
                {AUDIT_STATUSES.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})} placeholder="Remarks" className="border p-2 rounded text-[10px] col-span-2" />
              <div className="col-span-2 flex justify-end gap-2 mt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-[10px]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white p-5 rounded-2xl w-full max-w-sm">
            <h3 className="font-bold mb-2">Confirm Delete</h3>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-rose-500 text-white rounded text-[10px]">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================== CRUD MODULE: CAPA TRACKER ================== */
const CapaTrackerModule = ({ hospital, data, setData, audits }) => {
  const [search, setSearch] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_CAPA_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('cap-', ''), 10); return n > m ? n : m; }, 0);
    return \`cap-\${String(max + 1).padStart(3, '0')}\`;
  };

  const openAddModal = () => { setForm({ ...BLANK_CAPA_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.linkedAudit.trim()) e.linkedAudit = 'Req';
    if (!f.capaDescription.trim()) e.capaDescription = 'Req';
    if (!f.responsiblePerson.trim()) e.responsiblePerson = 'Req';
    if (!f.targetDate) e.targetDate = 'Req';
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const toSave = { ...form };
    delete toSave.autoStatus;
    if (editingId) setData(prev => prev.map(r => r.id === editingId ? { ...toSave, id: editingId } : r));
    else setData(prev => [...prev, { ...toSave }]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData(prev => prev.filter(r => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = r.id.toLowerCase().includes(q) || r.capaDescription.toLowerCase().includes(q) || r.responsiblePerson.toLowerCase().includes(q);
    const matchDept = !filterDept || r.department === filterDept;
    const matchStatus = !filterStatus || r.autoStatus === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const TH_COLS = ['CAPA ID', 'Linked Audit', 'Dept', 'Description', 'Person', 'Target Date', 'Completion', 'Status', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search ID, desc, person..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Departments</option>
          {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Statuses</option>
          {CAPA_STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={openAddModal} className="px-3 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5" style={{ backgroundColor: hospital?.themeColor || '#3b82f6' }}>
          <Plus className="w-3.5 h-3.5" /> Add Record
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>{TH_COLS.map(h => <th key={h} className="px-3 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={TH_COLS.length} className="px-4 py-10 text-center text-slate-400">No records found.</td></tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="px-3 py-3 font-mono text-slate-700">{r.id}</td>
                    <td className="px-3 py-3 text-slate-600">{r.linkedAudit}</td>
                    <td className="px-3 py-3 text-slate-600">{r.department}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.capaDescription}</td>
                    <td className="px-3 py-3 text-slate-600">{r.responsiblePerson}</td>
                    <td className="px-3 py-3 text-slate-600">{r.targetDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.completionDate || '-'}</td>
                    <td className="px-3 py-3">
                      <span className={\`px-2 py-0.5 rounded-full text-[8px] font-bold border \${CAPA_STATUS_BADGE[r.autoStatus] || CAPA_STATUS_BADGE.Open}\`}>{r.autoStatus}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => openEditModal(r)} className="p-1.5 text-sky-600 hover:bg-sky-50 rounded"><Edit3 className="w-3 h-3" /></button>
                        <button onClick={() => setDeleteConfirmId(r.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5">
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit CAPA Record' : 'Add CAPA Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <select value={form.linkedAudit} onChange={e => setForm({...form, linkedAudit: e.target.value})} className="border p-2 rounded text-[10px]">
                <option value="">Select Audit...</option>
                {audits.map(a => <option key={a.id} value={a.id}>{a.id} - {a.licenseName}</option>)}
              </select>
              <select value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="border p-2 rounded text-[10px]">
                {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.capaDescription} onChange={e => setForm({...form, capaDescription: e.target.value})} placeholder="CAPA Description *" className="border p-2 rounded text-[10px]" />
              <input value={form.rootCause} onChange={e => setForm({...form, rootCause: e.target.value})} placeholder="Root Cause" className="border p-2 rounded text-[10px]" />
              <input value={form.correctiveAction} onChange={e => setForm({...form, correctiveAction: e.target.value})} placeholder="Corrective Action" className="border p-2 rounded text-[10px]" />
              <input value={form.preventiveAction} onChange={e => setForm({...form, preventiveAction: e.target.value})} placeholder="Preventive Action" className="border p-2 rounded text-[10px]" />
              <input value={form.responsiblePerson} onChange={e => setForm({...form, responsiblePerson: e.target.value})} placeholder="Responsible Person *" className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.targetDate} onChange={e => setForm({...form, targetDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.completionDate} onChange={e => setForm({...form, completionDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="border p-2 rounded text-[10px]">
                {CAPA_STATUSES.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})} placeholder="Remarks" className="border p-2 rounded text-[10px] col-span-2" />
              <div className="col-span-2 flex justify-end gap-2 mt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-[10px]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white p-5 rounded-2xl w-full max-w-sm">
            <h3 className="font-bold mb-2">Confirm Delete</h3>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 bg-slate-100 rounded text-[10px]">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-rose-500 text-white rounded text-[10px]">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
`;

const marker1 = 'export default function LicensesRegistryWorkspace() {';
const marker2 = "case 'audit':        return <PlaceholderTab title=\"Internal Audit\" />;";
const replacement2 = "case 'audit':        return <InternalAuditTab hospital={hospital} />;";

if (code.includes(marker1)) {
  code = code.replace(marker1, phase6Data + '\n' + marker1);
}
if (code.includes(marker2)) {
  code = code.replace(marker2, replacement2);
}

fs.writeFileSync(path, code, 'utf8');
console.log('Phase 6 inserted successfully.');

const fs = require('fs');
const path = 'c:/Users/user/Desktop/hospital/frontend/src/pages/LicensesRegistryWorkspace.jsx';
let code = fs.readFileSync(path, 'utf8');

const phase5Data = `
/* ============================================================
   PHASE 5 — RENEWAL & COMPLIANCE TRACKER CONSTANTS & SEED
   ============================================================ */

const LS_KEY_RENEWAL = 'licenses_renewal_tracker';
const LS_KEY_COMPLIANCE = 'licenses_compliance_monitoring';
const LS_KEY_REMINDER = 'licenses_reminder_scheduler';

const RENEWAL_STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed', 'Overdue'];
const COMPLIANCE_AREAS = [
  'General Hospital Rules',
  'Fire Safety Standard',
  'Biomedical Waste Standard',
  'AERB Radiation Safety',
  'Pharmacy Storage Standard',
  'OT Sterilization',
];

const REMINDER_TYPES = ['Email', 'SMS', 'System Push', 'Meeting'];
const NOTIFICATION_STATUS = ['Pending', 'Sent', 'Acknowledged', 'Completed'];

const SEED_RENEWAL = Array.from({ length: 15 }, (_, i) => ({
  id: \`ren-\${String(i + 1).padStart(3, '0')}\`,
  licenseCategory: LICENSE_CATEGORIES[i % LICENSE_CATEGORIES.length],
  licenseName: \`License Name \${i + 1}\`,
  referenceLicense: \`LIC-REF-\${2000 + i}\`,
  department: HOSPITAL_DEPARTMENTS[i % HOSPITAL_DEPARTMENTS.length],
  expiryDate: \`2024-\${String((i % 12) + 1).padStart(2, '0')}-15\`,
  renewBefore: \`2024-\${String((i % 12) + 1).padStart(2, '0')}-01\`,
  renewalDate: '',
  renewalStatus: RENEWAL_STATUS_OPTIONS[i % RENEWAL_STATUS_OPTIONS.length],
  responsiblePerson: \`Admin \${String.fromCharCode(65 + i)}\`,
  documentUpload: '',
  remarks: '',
}));

const SEED_COMPLIANCE = Array.from({ length: 10 }, (_, i) => ({
  id: \`cmp-\${String(i + 1).padStart(3, '0')}\`,
  department: HOSPITAL_DEPARTMENTS[(i + 2) % HOSPITAL_DEPARTMENTS.length],
  complianceArea: COMPLIANCE_AREAS[i % COMPLIANCE_AREAS.length],
  inspectionDate: \`2023-11-\${String((i % 28) + 1).padStart(2, '0')}\`,
  complianceScore: 95 - (i * 4), // ranging down to around 55
  observation: i % 3 === 0 ? 'Minor deviation found' : 'All good',
  responsibleOfficer: \`Officer \${String.fromCharCode(75 + i)}\`,
  targetClosureDate: \`2024-02-\${String((i % 28) + 1).padStart(2, '0')}\`,
  remarks: '',
}));

const SEED_REMINDER = Array.from({ length: 10 }, (_, i) => ({
  id: \`rem-\${String(i + 1).padStart(3, '0')}\`,
  license: \`Reference License \${1000 + i}\`,
  reminderType: REMINDER_TYPES[i % REMINDER_TYPES.length],
  reminderDate: \`2024-03-\${String((i % 28) + 1).padStart(2, '0')}\`,
  responsiblePerson: \`Admin \${String.fromCharCode(80 + i)}\`,
  notificationStatus: NOTIFICATION_STATUS[i % NOTIFICATION_STATUS.length],
  remarks: '',
}));

const BLANK_RENEWAL_FORM = {
  id: '', licenseCategory: LICENSE_CATEGORIES[0], licenseName: '', referenceLicense: '',
  department: HOSPITAL_DEPARTMENTS[0], expiryDate: '', renewBefore: '', renewalDate: '',
  renewalStatus: RENEWAL_STATUS_OPTIONS[0], responsiblePerson: '', documentUpload: '', remarks: ''
};

const BLANK_COMPLIANCE_FORM = {
  id: '', department: HOSPITAL_DEPARTMENTS[0], complianceArea: COMPLIANCE_AREAS[0],
  inspectionDate: '', complianceScore: '', observation: '', responsibleOfficer: '',
  targetClosureDate: '', remarks: ''
};

const BLANK_REMINDER_FORM = {
  id: '', license: '', reminderType: REMINDER_TYPES[0], reminderDate: '',
  responsiblePerson: '', notificationStatus: NOTIFICATION_STATUS[0], remarks: ''
};

/* ============================================================
   PHASE 5 — RENEWAL & COMPLIANCE HELPERS
   ============================================================ */

const calcRenewalTrackerStatus = (expiryDate) => {
  if (!expiryDate) return 'Valid';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  if (isNaN(expiry.getTime())) return 'Valid';
  if (today > expiry) return 'Overdue';
  const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  if (diffDays <= 30) return 'Pending Renewal';
  return 'Valid';
};

const calcComplianceStatus = (score) => {
  const s = parseFloat(score);
  if (isNaN(s)) return 'Non-Compliant';
  if (s >= 90) return 'Compliant';
  if (s >= 70) return 'Partially Compliant';
  return 'Non-Compliant';
};

const COMPLIANCE_BADGE_STYLE = {
  'Compliant': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Partially Compliant': 'bg-amber-50 text-amber-700 border-amber-200',
  'Non-Compliant': 'bg-rose-50 text-rose-700 border-rose-200',
};

const RENEWAL_STATUS_BADGE = {
  'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
  'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
  'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Overdue': 'bg-rose-50 text-rose-700 border-rose-200',
  'Pending Renewal': 'bg-orange-50 text-orange-700 border-orange-200',
  'Valid': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

/* ============================================================
   PHASE 5 — MAIN COMPONENTS
   ============================================================ */

const RenewalTrackerTab = ({ hospital }) => {
  const [renewalRecords, setRenewalRecords] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_RENEWAL);
    return saved ? JSON.parse(saved) : SEED_RENEWAL;
  });
  const [compRecords, setCompRecords] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_COMPLIANCE);
    return saved ? JSON.parse(saved) : SEED_COMPLIANCE;
  });
  const [remRecords, setRemRecords] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_REMINDER);
    return saved ? JSON.parse(saved) : SEED_REMINDER;
  });

  React.useEffect(() => { localStorage.setItem(LS_KEY_RENEWAL, JSON.stringify(renewalRecords)); }, [renewalRecords]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_COMPLIANCE, JSON.stringify(compRecords)); }, [compRecords]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_REMINDER, JSON.stringify(remRecords)); }, [remRecords]);

  const allRenewals = renewalRecords.map(r => ({ ...r, autoStatus: calcRenewalTrackerStatus(r.expiryDate) }));
  const allComp = compRecords.map(r => ({ ...r, autoStatus: calcComplianceStatus(r.complianceScore) }));
  
  const totalRenewals = allRenewals.length;
  const pendingRenewals = allRenewals.filter(r => r.renewalStatus === 'Pending' || r.autoStatus === 'Pending Renewal').length;
  const completedRenewals = allRenewals.filter(r => r.renewalStatus === 'Completed').length;
  const overdueRenewals = allRenewals.filter(r => r.renewalStatus === 'Overdue' || r.autoStatus === 'Overdue').length;

  const compliants = allComp.filter(r => r.autoStatus === 'Compliant').length;
  const nonCompliants = allComp.filter(r => r.autoStatus === 'Non-Compliant').length;
  const compliancePct = allComp.length ? Math.round((compliants / allComp.length) * 100) : 0;
  
  const reminderNotifs = remRecords.filter(r => r.notificationStatus === 'Sent' || r.notificationStatus === 'Pending').length;
  const overallHealth = totalRenewals ? Math.round(((totalRenewals - overdueRenewals) / totalRenewals) * 100) : 0;

  const kpis = [
    { label: 'Total Licenses (Renewals)', value: totalRenewals, color: 'text-blue-600' },
    { label: 'Renewals Pending',          value: pendingRenewals, color: 'text-amber-600' },
    { label: 'Renewals Completed',        value: completedRenewals, color: 'text-emerald-600' },
    { label: 'Overdue Renewals',          value: overdueRenewals, color: 'text-rose-600' },
    { label: 'Compliance %',              value: \`\${compliancePct}%\`, color: 'text-teal-600' },
    { label: 'Non-Compliant Licenses',    value: nonCompliants, color: 'text-rose-600' },
    { label: 'Reminder Notifications',    value: reminderNotifs, color: 'text-sky-600' },
    { label: 'Overall License Health',    value: \`\${overallHealth}%\`, color: 'text-violet-600' },
  ];

  const [activeSubTab, setActiveSubTab] = React.useState('ren');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Renewal &amp; Compliance Tracker</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Track renewals, monitor compliance, and schedule reminders</p>
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
          { id: 'ren', label: 'Renewal Tracker' },
          { id: 'cmp', label: 'Compliance Monitoring' },
          { id: 'rem', label: 'Renewal Reminders' },
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

      {activeSubTab === 'ren' && <RenewalTrackerModule hospital={hospital} data={allRenewals} setData={setRenewalRecords} />}
      {activeSubTab === 'cmp' && <ComplianceMonitoringModule hospital={hospital} data={allComp} setData={setCompRecords} />}
      {activeSubTab === 'rem' && <ReminderSchedulerModule hospital={hospital} data={remRecords} setData={setRemRecords} />}
    </div>
  );
};

/* ================== CRUD MODULE: RENEWAL TRACKER ================== */
const RenewalTrackerModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterCat, setFilterCat] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_RENEWAL_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('ren-', ''), 10); return n > m ? n : m; }, 0);
    return \`ren-\${String(max + 1).padStart(3, '0')}\`;
  };

  const openAddModal = () => { setForm({ ...BLANK_RENEWAL_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.licenseName.trim()) e.licenseName = 'Req';
    if (!f.referenceLicense.trim()) e.referenceLicense = 'Req';
    if (!f.expiryDate) e.expiryDate = 'Req';
    if (!f.renewBefore) e.renewBefore = 'Req';
    if (!f.responsiblePerson.trim()) e.responsiblePerson = 'Req';
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    // Clean out computed properties so they aren't stored in localStorage
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
    const matchSearch = r.licenseName.toLowerCase().includes(q) || r.referenceLicense.toLowerCase().includes(q) || r.responsiblePerson.toLowerCase().includes(q);
    const matchCat = !filterCat || r.licenseCategory === filterCat;
    const matchDept = !filterDept || r.department === filterDept;
    const matchStatus = !filterStatus || r.renewalStatus === filterStatus;
    return matchSearch && matchCat && matchDept && matchStatus;
  });

  const TH_COLS = ['Ref', 'License Name', 'Category', 'Dept', 'Expiry', 'Auto Status', 'Renewal Status', 'Officer', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search license, ref, officer..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Categories</option>
          {LICENSE_CATEGORIES.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Departments</option>
          {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Statuses</option>
          {RENEWAL_STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
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
                    <td className="px-3 py-3 font-mono text-[9px] text-slate-500">{r.referenceLicense}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.licenseName}</td>
                    <td className="px-3 py-3 text-slate-600">{r.licenseCategory}</td>
                    <td className="px-3 py-3 text-slate-600">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600">{r.expiryDate}</td>
                    <td className="px-3 py-3">
                      <span className={\`px-2 py-0.5 rounded-full text-[8px] font-bold border \${RENEWAL_STATUS_BADGE[r.autoStatus] || RENEWAL_STATUS_BADGE.Valid}\`}>{r.autoStatus}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={\`px-2 py-0.5 rounded-full text-[8px] font-bold border \${RENEWAL_STATUS_BADGE[r.renewalStatus] || RENEWAL_STATUS_BADGE.Valid}\`}>{r.renewalStatus}</span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{r.responsiblePerson}</td>
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
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit Renewal Record' : 'Add Renewal Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <select value={form.licenseCategory} onChange={e => setForm({...form, licenseCategory: e.target.value})} className="border p-2 rounded text-[10px]">
                {LICENSE_CATEGORIES.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.licenseName} onChange={e => setForm({...form, licenseName: e.target.value})} placeholder="License Name *" className="border p-2 rounded text-[10px]" />
              <input value={form.referenceLicense} onChange={e => setForm({...form, referenceLicense: e.target.value})} placeholder="Reference License *" className="border p-2 rounded text-[10px]" />
              <select value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="border p-2 rounded text-[10px]">
                {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
              <input type="date" value={form.expiryDate} onChange={e => setForm({...form, expiryDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.renewBefore} onChange={e => setForm({...form, renewBefore: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.renewalDate} onChange={e => setForm({...form, renewalDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <select value={form.renewalStatus} onChange={e => setForm({...form, renewalStatus: e.target.value})} className="border p-2 rounded text-[10px]">
                {RENEWAL_STATUS_OPTIONS.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.responsiblePerson} onChange={e => setForm({...form, responsiblePerson: e.target.value})} placeholder="Responsible Person *" className="border p-2 rounded text-[10px]" />
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

/* ================== CRUD MODULE: COMPLIANCE MONITORING ================== */
const ComplianceMonitoringModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_COMPLIANCE_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('cmp-', ''), 10); return n > m ? n : m; }, 0);
    return \`cmp-\${String(max + 1).padStart(3, '0')}\`;
  };

  const openAddModal = () => { setForm({ ...BLANK_COMPLIANCE_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.inspectionDate) e.inspectionDate = 'Req';
    if (f.complianceScore === '') e.complianceScore = 'Req';
    if (!f.responsibleOfficer.trim()) e.responsibleOfficer = 'Req';
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
    const matchSearch = r.complianceArea.toLowerCase().includes(q) || r.responsibleOfficer.toLowerCase().includes(q);
    const matchDept = !filterDept || r.department === filterDept;
    const matchStatus = !filterStatus || r.autoStatus === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const TH_COLS = ['Department', 'Area', 'Inspection', 'Score (%)', 'Status', 'Closure Date', 'Officer', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search area, officer..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Departments</option>
          {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Statuses</option>
          {Object.keys(COMPLIANCE_BADGE_STYLE).map(s => <option key={s}>{s}</option>)}
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
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.department}</td>
                    <td className="px-3 py-3 text-slate-600">{r.complianceArea}</td>
                    <td className="px-3 py-3 text-slate-600">{r.inspectionDate}</td>
                    <td className="px-3 py-3 font-mono text-slate-600">{r.complianceScore}%</td>
                    <td className="px-3 py-3">
                      <span className={\`px-2 py-0.5 rounded-full text-[8px] font-bold border \${COMPLIANCE_BADGE_STYLE[r.autoStatus] || COMPLIANCE_BADGE_STYLE.Compliant}\`}>{r.autoStatus}</span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{r.targetClosureDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.responsibleOfficer}</td>
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
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit Compliance Record' : 'Add Compliance Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <select value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="border p-2 rounded text-[10px]">
                {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
              <select value={form.complianceArea} onChange={e => setForm({...form, complianceArea: e.target.value})} className="border p-2 rounded text-[10px]">
                {COMPLIANCE_AREAS.map(d => <option key={d}>{d}</option>)}
              </select>
              <input type="date" value={form.inspectionDate} onChange={e => setForm({...form, inspectionDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="number" min="0" max="100" value={form.complianceScore} onChange={e => setForm({...form, complianceScore: e.target.value})} placeholder="Score (0-100) *" className="border p-2 rounded text-[10px]" />
              <input value={calcComplianceStatus(form.complianceScore)} disabled className="border p-2 rounded text-[10px] bg-slate-50 cursor-not-allowed" title="Auto calculated" />
              <input type="date" value={form.targetClosureDate} onChange={e => setForm({...form, targetClosureDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input value={form.observation} onChange={e => setForm({...form, observation: e.target.value})} placeholder="Observation" className="border p-2 rounded text-[10px]" />
              <input value={form.responsibleOfficer} onChange={e => setForm({...form, responsibleOfficer: e.target.value})} placeholder="Responsible Officer *" className="border p-2 rounded text-[10px]" />
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

/* ================== CRUD MODULE: RENEWAL REMINDER SCHEDULER ================== */
const ReminderSchedulerModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterType, setFilterType] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_REMINDER_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('rem-', ''), 10); return n > m ? n : m; }, 0);
    return \`rem-\${String(max + 1).padStart(3, '0')}\`;
  };

  const openAddModal = () => { setForm({ ...BLANK_REMINDER_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.license.trim()) e.license = 'Req';
    if (!f.reminderDate) e.reminderDate = 'Req';
    if (!f.responsiblePerson.trim()) e.responsiblePerson = 'Req';
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (editingId) setData(prev => prev.map(r => r.id === editingId ? { ...form, id: editingId } : r));
    else setData(prev => [...prev, { ...form }]);
    closeModal();
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    setData(prev => prev.filter(r => r.id !== deleteConfirmId));
    setDeleteConfirmId(null);
  };

  const filtered = data.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = r.license.toLowerCase().includes(q) || r.responsiblePerson.toLowerCase().includes(q);
    const matchType = !filterType || r.reminderType === filterType;
    const matchStatus = !filterStatus || r.notificationStatus === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const TH_COLS = ['License', 'Type', 'Reminder Date', 'Status', 'Person', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search license, person..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Types</option>
          {REMINDER_TYPES.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Statuses</option>
          {NOTIFICATION_STATUS.map(s => <option key={s}>{s}</option>)}
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
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.license}</td>
                    <td className="px-3 py-3 text-slate-600">{r.reminderType}</td>
                    <td className="px-3 py-3 text-slate-600">{r.reminderDate}</td>
                    <td className="px-3 py-3">
                      <span className={\`px-2 py-0.5 rounded-full text-[8px] font-bold border \${
                        r.notificationStatus === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        r.notificationStatus === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        r.notificationStatus === 'Sent' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }\`}>{r.notificationStatus}</span>
                    </td>
                    <td className="px-3 py-3 text-slate-600">{r.responsiblePerson}</td>
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
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit Reminder Record' : 'Add Reminder Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <input value={form.license} onChange={e => setForm({...form, license: e.target.value})} placeholder="License *" className="border p-2 rounded text-[10px]" />
              <select value={form.reminderType} onChange={e => setForm({...form, reminderType: e.target.value})} className="border p-2 rounded text-[10px]">
                {REMINDER_TYPES.map(d => <option key={d}>{d}</option>)}
              </select>
              <input type="date" value={form.reminderDate} onChange={e => setForm({...form, reminderDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <select value={form.notificationStatus} onChange={e => setForm({...form, notificationStatus: e.target.value})} className="border p-2 rounded text-[10px]">
                {NOTIFICATION_STATUS.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.responsiblePerson} onChange={e => setForm({...form, responsiblePerson: e.target.value})} placeholder="Responsible Person *" className="border p-2 rounded text-[10px]" />
              <input value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})} placeholder="Remarks" className="border p-2 rounded text-[10px]" />
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
const marker2 = "case 'renewal':      return <PlaceholderTab title=\"Renewal & Compliance Tracker\" />;";
const replacement2 = "case 'renewal':      return <RenewalTrackerTab hospital={hospital} />;";

if (code.includes(marker1)) {
  code = code.replace(marker1, phase5Data + '\n' + marker1);
}
if (code.includes(marker2)) {
  code = code.replace(marker2, replacement2);
}

fs.writeFileSync(path, code, 'utf8');
console.log('Phase 5 inserted successfully.');

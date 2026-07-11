const fs = require('fs');
const path = 'c:/Users/user/Desktop/hospital/frontend/src/pages/LicensesRegistryWorkspace.jsx';
let code = fs.readFileSync(path, 'utf8');

const phase3Data = `
/* ============================================================
   PHASE 3 — REGULATORY & ENVIRONMENTAL COMPLIANCE CONSTANTS & SEED
   ============================================================ */

const LS_KEY_BIOMEDICAL = 'licenses_biomedical_compliance';
const LS_KEY_POLLUTION = 'licenses_pollution_control';
const LS_KEY_FIRE = 'licenses_fire_safety';

const POLLUTION_COMPLIANCE_TYPES = [
  'Air Pollution',
  'Water Pollution',
  'Environmental Clearance',
  'PCB Authorization',
];

const SEED_BIOMEDICAL = Array.from({ length: 10 }, (_, i) => ({
  id: \`bio-\${String(i + 1).padStart(3, '0')}\`,
  authorizationNumber: \`BMW/KA/2023/\${1000 + i}\`,
  hospitalDepartment: HOSPITAL_DEPARTMENTS[i % HOSPITAL_DEPARTMENTS.length],
  pollutionControlBoard: 'State PCB',
  vendorName: \`BioSafe Solutions Pvt Ltd\`,
  vendorAgreementNumber: \`V-AGR-\${2020 + i}-00\${i+1}\`,
  authorizationDate: \`2023-01-\${String((i % 28) + 1).padStart(2, '0')}\`,
  expiryDate: \`2025-12-\${String((i % 28) + 1).padStart(2, '0')}\`,
  renewBefore: \`2025-10-\${String((i % 28) + 1).padStart(2, '0')}\`,
  responsibleOfficer: \`Officer \${String.fromCharCode(65 + i)}\`,
  agreementDocument: '',
  remarks: i === 0 ? 'Renewal due soon' : '',
}));

const SEED_POLLUTION = Array.from({ length: 10 }, (_, i) => ({
  id: \`pol-\${String(i + 1).padStart(3, '0')}\`,
  complianceType: POLLUTION_COMPLIANCE_TYPES[i % POLLUTION_COMPLIANCE_TYPES.length],
  authority: LICENSING_AUTHORITIES[i % LICENSING_AUTHORITIES.length],
  certificateNumber: \`PCB/CERT/\${2021 + (i % 3)}/\${5000 + i}\`,
  issueDate: \`2021-03-\${String((i % 28) + 1).padStart(2, '0')}\`,
  expiryDate: \`2026-03-\${String((i % 28) + 1).padStart(2, '0')}\`,
  renewBefore: \`2026-01-\${String((i % 28) + 1).padStart(2, '0')}\`,
  responsibleOfficer: \`Officer \${String.fromCharCode(75 + i)}\`,
  documentUpload: '',
  remarks: '',
}));

const SEED_FIRE = Array.from({ length: 10 }, (_, i) => ({
  id: \`fir-\${String(i + 1).padStart(3, '0')}\`,
  fireNocNumber: \`FIRE/NOC/\${2022 + (i % 2)}/\${8000 + i}\`,
  issuingAuthority: 'State Fire Department',
  issueDate: \`2022-05-\${String((i % 28) + 1).padStart(2, '0')}\`,
  expiryDate: \`2024-05-\${String((i % 28) + 1).padStart(2, '0')}\`,
  renewBefore: \`2024-03-\${String((i % 28) + 1).padStart(2, '0')}\`,
  inspectionDate: \`2023-11-\${String((i % 28) + 1).padStart(2, '0')}\`,
  responsibleOfficer: \`Safety Officer \${i + 1}\`,
  certificateUpload: '',
  remarks: i === 2 ? 'Requires updated fire extinguishers' : '',
}));

const BLANK_BIO_FORM = {
  id: '', authorizationNumber: '', hospitalDepartment: HOSPITAL_DEPARTMENTS[0],
  pollutionControlBoard: 'State PCB', vendorName: '', vendorAgreementNumber: '',
  authorizationDate: '', expiryDate: '', renewBefore: '', responsibleOfficer: '',
  agreementDocument: '', remarks: ''
};

const BLANK_POL_FORM = {
  id: '', complianceType: POLLUTION_COMPLIANCE_TYPES[0], authority: LICENSING_AUTHORITIES[0],
  certificateNumber: '', issueDate: '', expiryDate: '', renewBefore: '',
  responsibleOfficer: '', documentUpload: '', remarks: ''
};

const BLANK_FIR_FORM = {
  id: '', fireNocNumber: '', issuingAuthority: 'State Fire Department',
  issueDate: '', expiryDate: '', renewBefore: '', inspectionDate: '',
  responsibleOfficer: '', certificateUpload: '', remarks: ''
};

/* ============================================================
   PHASE 3 — REGULATORY COMPONENTS
   ============================================================ */

const RegEnvTab = ({ hospital }) => {
  const [bioLicenses, setBioLicenses] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_BIOMEDICAL);
    return saved ? JSON.parse(saved) : SEED_BIOMEDICAL;
  });
  const [polLicenses, setPolLicenses] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_POLLUTION);
    return saved ? JSON.parse(saved) : SEED_POLLUTION;
  });
  const [firLicenses, setFirLicenses] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_FIRE);
    return saved ? JSON.parse(saved) : SEED_FIRE;
  });

  React.useEffect(() => { localStorage.setItem(LS_KEY_BIOMEDICAL, JSON.stringify(bioLicenses)); }, [bioLicenses]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_POLLUTION, JSON.stringify(polLicenses)); }, [polLicenses]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_FIRE, JSON.stringify(firLicenses)); }, [firLicenses]);

  const allBio = bioLicenses.map(r => ({ ...r, currentStatus: calcLicenseStatus(r.expiryDate) }));
  const allPol = polLicenses.map(r => ({ ...r, currentStatus: calcLicenseStatus(r.expiryDate) }));
  const allFir = firLicenses.map(r => ({ ...r, currentStatus: calcLicenseStatus(r.expiryDate) }));

  const allRecords = [...allBio, ...allPol, ...allFir];
  const totalRecords = allRecords.length;
  const bioValid = allBio.filter(r => r.currentStatus === 'Valid').length;
  const polValid = allPol.filter(r => r.currentStatus === 'Valid').length;
  const firValid = allFir.filter(r => r.currentStatus === 'Valid').length;
  const expiringSoon = allRecords.filter(r => r.currentStatus === 'Expiring Soon').length;
  const expired = allRecords.filter(r => r.currentStatus === 'Expired').length;
  const totalValid = bioValid + polValid + firValid;
  const compliancePct = totalRecords ? Math.round((totalValid / totalRecords) * 100) : 0;
  const renewalsDue = allRecords.filter(r => isRenewalDueThisMonth(r.expiryDate)).length;

  const kpis = [
    { label: 'Total Compliance Records', value: totalRecords, color: 'text-blue-600' },
    { label: 'Biomedical Waste Valid',   value: bioValid,     color: 'text-emerald-600' },
    { label: 'Pollution Control Valid',  value: polValid,     color: 'text-emerald-600' },
    { label: 'Fire NOC Valid',           value: firValid,     color: 'text-emerald-600' },
    { label: 'Expiring Soon',            value: expiringSoon, color: 'text-amber-600' },
    { label: 'Expired',                  value: expired,      color: 'text-rose-600' },
    { label: 'Compliance %',             value: \`\${compliancePct}%\`, color: 'text-teal-600' },
    { label: 'Renewals Due',             value: renewalsDue,  color: 'text-violet-600' },
  ];

  const [activeSubTab, setActiveSubTab] = React.useState('bio');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Regulatory &amp; Environmental Compliance</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">Biomedical waste, pollution control, and fire safety</p>
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
          { id: 'bio', label: 'Biomedical Waste' },
          { id: 'pol', label: 'Pollution Control' },
          { id: 'fir', label: 'Fire & Safety' },
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

      {activeSubTab === 'bio' && <BioMedicalWasteModule hospital={hospital} data={allBio} setData={setBioLicenses} />}
      {activeSubTab === 'pol' && <PollutionControlModule hospital={hospital} data={allPol} setData={setPolLicenses} />}
      {activeSubTab === 'fir' && <FireSafetyModule hospital={hospital} data={allFir} setData={setFirLicenses} />}
    </div>
  );
};

/* ================== CRUD MODULE: BIOMEDICAL WASTE ================== */
const BioMedicalWasteModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_BIO_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('bio-', ''), 10); return n > m ? n : m; }, 0);
    return \`bio-\${String(max + 1).padStart(3, '0')}\`;
  };

  const openAddModal = () => { setForm({ ...BLANK_BIO_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.authorizationNumber.trim()) e.authorizationNumber = 'Req';
    if (!f.hospitalDepartment.trim()) e.hospitalDepartment = 'Req';
    if (!f.pollutionControlBoard.trim()) e.pollutionControlBoard = 'Req';
    if (!f.vendorName.trim()) e.vendorName = 'Req';
    if (!f.vendorAgreementNumber.trim()) e.vendorAgreementNumber = 'Req';
    if (!f.authorizationDate) e.authorizationDate = 'Req';
    if (!f.expiryDate) e.expiryDate = 'Req';
    if (!f.renewBefore) e.renewBefore = 'Req';
    if (!f.responsibleOfficer.trim()) e.responsibleOfficer = 'Req';
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
    const matchSearch = r.authorizationNumber.toLowerCase().includes(q) || r.vendorName.toLowerCase().includes(q) || r.responsibleOfficer.toLowerCase().includes(q);
    const matchDept = !filterDept || r.hospitalDepartment === filterDept;
    const matchStatus = !filterStatus || r.currentStatus === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const TH_COLS = ['Auth Number', 'Department', 'Vendor', 'Auth Date', 'Expiry', 'Status', 'Officer', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search auth #, vendor, officer..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Departments</option>
          {HOSPITAL_DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Statuses</option>
          {['Valid', 'Expiring Soon', 'Expired'].map(s => <option key={s} value={s}>{s}</option>)}
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
                    <td className="px-3 py-3 font-mono text-slate-700">{r.authorizationNumber}</td>
                    <td className="px-3 py-3 text-slate-600">{r.hospitalDepartment}</td>
                    <td className="px-3 py-3 text-slate-600">{r.vendorName}</td>
                    <td className="px-3 py-3 text-slate-600">{r.authorizationDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.expiryDate}</td>
                    <td className="px-3 py-3">
                      <span className={\`px-2 py-0.5 rounded-full text-[8px] font-bold border \${STATUS_BADGE_LICENSE[r.currentStatus] || STATUS_BADGE_LICENSE.Valid}\`}>{r.currentStatus}</span>
                    </td>
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
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit BMW Record' : 'Add BMW Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <input value={form.authorizationNumber} onChange={e => setForm({...form, authorizationNumber: e.target.value})} placeholder="Auth Number *" className="border p-2 rounded text-[10px]" />
              <select value={form.hospitalDepartment} onChange={e => setForm({...form, hospitalDepartment: e.target.value})} className="border p-2 rounded text-[10px]">
                {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.pollutionControlBoard} onChange={e => setForm({...form, pollutionControlBoard: e.target.value})} placeholder="PCB *" className="border p-2 rounded text-[10px]" />
              <input value={form.vendorName} onChange={e => setForm({...form, vendorName: e.target.value})} placeholder="Vendor Name *" className="border p-2 rounded text-[10px]" />
              <input value={form.vendorAgreementNumber} onChange={e => setForm({...form, vendorAgreementNumber: e.target.value})} placeholder="Agreement Number *" className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.authorizationDate} onChange={e => setForm({...form, authorizationDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.expiryDate} onChange={e => setForm({...form, expiryDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.renewBefore} onChange={e => setForm({...form, renewBefore: e.target.value})} className="border p-2 rounded text-[10px]" />
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

/* ================== CRUD MODULE: POLLUTION CONTROL ================== */
const PollutionControlModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterType, setFilterType] = React.useState('');
  const [filterAuth, setFilterAuth] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_POL_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('pol-', ''), 10); return n > m ? n : m; }, 0);
    return \`pol-\${String(max + 1).padStart(3, '0')}\`;
  };

  const openAddModal = () => { setForm({ ...BLANK_POL_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.complianceType.trim()) e.complianceType = 'Req';
    if (!f.authority.trim()) e.authority = 'Req';
    if (!f.certificateNumber.trim()) e.certificateNumber = 'Req';
    if (!f.issueDate) e.issueDate = 'Req';
    if (!f.expiryDate) e.expiryDate = 'Req';
    if (!f.renewBefore) e.renewBefore = 'Req';
    if (!f.responsibleOfficer.trim()) e.responsibleOfficer = 'Req';
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
    const matchSearch = r.certificateNumber.toLowerCase().includes(q) || r.responsibleOfficer.toLowerCase().includes(q);
    const matchType = !filterType || r.complianceType === filterType;
    const matchAuth = !filterAuth || r.authority === filterAuth;
    const matchStatus = !filterStatus || r.currentStatus === filterStatus;
    return matchSearch && matchType && matchAuth && matchStatus;
  });

  const TH_COLS = ['Cert Number', 'Type', 'Authority', 'Issue Date', 'Expiry', 'Status', 'Officer', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search cert #, officer..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Types</option>
          {POLLUTION_COMPLIANCE_TYPES.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterAuth} onChange={(e) => setFilterAuth(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Authorities</option>
          {LICENSING_AUTHORITIES.map(a => <option key={a}>{a}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Statuses</option>
          {['Valid', 'Expiring Soon', 'Expired'].map(s => <option key={s}>{s}</option>)}
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
                    <td className="px-3 py-3 font-mono text-slate-700">{r.certificateNumber}</td>
                    <td className="px-3 py-3 text-slate-600">{r.complianceType}</td>
                    <td className="px-3 py-3 text-slate-600">{r.authority}</td>
                    <td className="px-3 py-3 text-slate-600">{r.issueDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.expiryDate}</td>
                    <td className="px-3 py-3">
                      <span className={\`px-2 py-0.5 rounded-full text-[8px] font-bold border \${STATUS_BADGE_LICENSE[r.currentStatus] || STATUS_BADGE_LICENSE.Valid}\`}>{r.currentStatus}</span>
                    </td>
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
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit Pollution Record' : 'Add Pollution Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <input value={form.certificateNumber} onChange={e => setForm({...form, certificateNumber: e.target.value})} placeholder="Cert Number *" className="border p-2 rounded text-[10px]" />
              <select value={form.complianceType} onChange={e => setForm({...form, complianceType: e.target.value})} className="border p-2 rounded text-[10px]">
                {POLLUTION_COMPLIANCE_TYPES.map(d => <option key={d}>{d}</option>)}
              </select>
              <select value={form.authority} onChange={e => setForm({...form, authority: e.target.value})} className="border p-2 rounded text-[10px]">
                {LICENSING_AUTHORITIES.map(d => <option key={d}>{d}</option>)}
              </select>
              <input type="date" value={form.issueDate} onChange={e => setForm({...form, issueDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.expiryDate} onChange={e => setForm({...form, expiryDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.renewBefore} onChange={e => setForm({...form, renewBefore: e.target.value})} className="border p-2 rounded text-[10px]" />
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

/* ================== CRUD MODULE: FIRE & SAFETY ================== */
const FireSafetyModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_FIR_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('fir-', ''), 10); return n > m ? n : m; }, 0);
    return \`fir-\${String(max + 1).padStart(3, '0')}\`;
  };

  const openAddModal = () => { setForm({ ...BLANK_FIR_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.fireNocNumber.trim()) e.fireNocNumber = 'Req';
    if (!f.issuingAuthority.trim()) e.issuingAuthority = 'Req';
    if (!f.issueDate) e.issueDate = 'Req';
    if (!f.expiryDate) e.expiryDate = 'Req';
    if (!f.renewBefore) e.renewBefore = 'Req';
    if (!f.inspectionDate) e.inspectionDate = 'Req';
    if (!f.responsibleOfficer.trim()) e.responsibleOfficer = 'Req';
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
    const matchSearch = r.fireNocNumber.toLowerCase().includes(q) || r.issuingAuthority.toLowerCase().includes(q) || r.responsibleOfficer.toLowerCase().includes(q);
    const matchStatus = !filterStatus || r.currentStatus === filterStatus;
    return matchSearch && matchStatus;
  });

  const TH_COLS = ['NOC Number', 'Authority', 'Issue Date', 'Expiry', 'Inspection', 'Status', 'Officer', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search NOC #, authority, officer..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Statuses</option>
          {['Valid', 'Expiring Soon', 'Expired'].map(s => <option key={s}>{s}</option>)}
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
                    <td className="px-3 py-3 font-mono text-slate-700">{r.fireNocNumber}</td>
                    <td className="px-3 py-3 text-slate-600">{r.issuingAuthority}</td>
                    <td className="px-3 py-3 text-slate-600">{r.issueDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.expiryDate}</td>
                    <td className="px-3 py-3 text-slate-600">{r.inspectionDate}</td>
                    <td className="px-3 py-3">
                      <span className={\`px-2 py-0.5 rounded-full text-[8px] font-bold border \${STATUS_BADGE_LICENSE[r.currentStatus] || STATUS_BADGE_LICENSE.Valid}\`}>{r.currentStatus}</span>
                    </td>
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
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit Fire Safety Record' : 'Add Fire Safety Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <input value={form.fireNocNumber} onChange={e => setForm({...form, fireNocNumber: e.target.value})} placeholder="NOC Number *" className="border p-2 rounded text-[10px]" />
              <input value={form.issuingAuthority} onChange={e => setForm({...form, issuingAuthority: e.target.value})} placeholder="Authority *" className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.issueDate} onChange={e => setForm({...form, issueDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.expiryDate} onChange={e => setForm({...form, expiryDate: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.renewBefore} onChange={e => setForm({...form, renewBefore: e.target.value})} className="border p-2 rounded text-[10px]" />
              <input type="date" value={form.inspectionDate} onChange={e => setForm({...form, inspectionDate: e.target.value})} className="border p-2 rounded text-[10px]" />
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
`;

const marker1 = 'export default function LicensesRegistryWorkspace() {';
const marker2 = "case 'reg_env':      return <PlaceholderTab title=\"Regulatory & Environmental Compliance\" />;";
const replacement2 = "case 'reg_env':      return <RegEnvTab hospital={hospital} />;";

if (code.includes(marker1)) {
  code = code.replace(marker1, phase3Data + '\n' + marker1);
}
if (code.includes(marker2)) {
  code = code.replace(marker2, replacement2);
}

fs.writeFileSync(path, code, 'utf8');
console.log('Phase 3 inserted successfully.');

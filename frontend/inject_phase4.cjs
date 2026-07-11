const fs = require('fs');
const path = 'c:/Users/user/Desktop/hospital/frontend/src/pages/LicensesRegistryWorkspace.jsx';
let code = fs.readFileSync(path, 'utf8');

const phase4Data = `
/* ============================================================
   PHASE 4 — EQUIPMENT & FACILITY LICENSES CONSTANTS & SEED
   ============================================================ */

const LS_KEY_AERB = 'licenses_aerb';
const LS_KEY_BUILDING_FACILITY = 'licenses_building_facility';
const LS_KEY_UTILITY_VEHICLE = 'licenses_utility_vehicle';

const EQUIPMENT_TYPES = [
  'CT Scanner',
  'MRI',
  'X-Ray',
  'C-Arm',
  'Cath Lab',
  'Mammography',
  'Fluoroscopy'
];

const AERB_APPROVAL_TYPES = [
  'Type Approval',
  'Layout Approval',
  'Equipment Registration'
];

const FACILITY_TYPES = [
  'Building',
  'Lift',
  'Boiler',
  'DG Set',
  'Diesel Storage',
  'Medical Gas System'
];

const VEHICLE_UTILITY_TYPES = [
  'Ambulance',
  'Commercial Vehicle Permit',
  'Driver License',
  'Pollution Certificate',
  'Wireless Certificate'
];

const SEED_AERB = Array.from({ length: 10 }, (_, i) => ({
  id: \`aerb-\${String(i + 1).padStart(3, '0')}\`,
  equipmentName: \`\${EQUIPMENT_TYPES[i % EQUIPMENT_TYPES.length]} Machine \${i + 1}\`,
  equipmentType: EQUIPMENT_TYPES[i % EQUIPMENT_TYPES.length],
  department: HOSPITAL_DEPARTMENTS[i % HOSPITAL_DEPARTMENTS.length],
  aerbApprovalType: AERB_APPROVAL_TYPES[i % AERB_APPROVAL_TYPES.length],
  approvalNumber: \`AERB/\${2020 + (i % 3)}/\${1000 + i}\`,
  issueDate: \`2021-02-\${String((i % 28) + 1).padStart(2, '0')}\`,
  expiryDate: \`2026-02-\${String((i % 28) + 1).padStart(2, '0')}\`,
  renewBefore: \`2025-12-\${String((i % 28) + 1).padStart(2, '0')}\`,
  responsibleOfficer: \`Rad Officer \${String.fromCharCode(65 + i)}\`,
  documentUpload: '',
  remarks: i === 1 ? 'Needs QA test' : '',
}));

const SEED_BUILDING = Array.from({ length: 10 }, (_, i) => ({
  id: \`bldg-\${String(i + 1).padStart(3, '0')}\`,
  facility: FACILITY_TYPES[i % FACILITY_TYPES.length],
  licenseType: \`Safety Certificate\`,
  licenseNumber: \`BLDG/SAF/\${2022 + (i % 2)}/\${5000 + i}\`,
  authority: 'Municipal Corp',
  issueDate: \`2022-04-\${String((i % 28) + 1).padStart(2, '0')}\`,
  expiryDate: \`2027-04-\${String((i % 28) + 1).padStart(2, '0')}\`,
  renewBefore: \`2027-02-\${String((i % 28) + 1).padStart(2, '0')}\`,
  responsibleOfficer: \`Facility Mgr \${String.fromCharCode(75 + i)}\`,
  documentUpload: '',
  remarks: '',
}));

const SEED_UTILITY = Array.from({ length: 10 }, (_, i) => ({
  id: \`util-\${String(i + 1).padStart(3, '0')}\`,
  vehicleUtility: VEHICLE_UTILITY_TYPES[i % VEHICLE_UTILITY_TYPES.length],
  registrationNumber: \`KA 01 \${String.fromCharCode(65 + i)} \${1000 + i}\`,
  licenseType: 'Commercial Permit',
  authority: 'RTO',
  issueDate: \`2023-01-\${String((i % 28) + 1).padStart(2, '0')}\`,
  expiryDate: \`2024-12-\${String((i % 28) + 1).padStart(2, '0')}\`,
  renewBefore: \`2024-11-\${String((i % 28) + 1).padStart(2, '0')}\`,
  responsibleOfficer: \`Fleet Admin \${i + 1}\`,
  documentUpload: '',
  remarks: i === 3 ? 'Valid across state' : '',
}));

const BLANK_AERB_FORM = {
  id: '', equipmentName: '', equipmentType: EQUIPMENT_TYPES[0], department: HOSPITAL_DEPARTMENTS[0],
  aerbApprovalType: AERB_APPROVAL_TYPES[0], approvalNumber: '', issueDate: '', expiryDate: '',
  renewBefore: '', responsibleOfficer: '', documentUpload: '', remarks: ''
};

const BLANK_BUILDING_FORM = {
  id: '', facility: FACILITY_TYPES[0], licenseType: '', licenseNumber: '', authority: '',
  issueDate: '', expiryDate: '', renewBefore: '', responsibleOfficer: '', documentUpload: '', remarks: ''
};

const BLANK_UTILITY_FORM = {
  id: '', vehicleUtility: VEHICLE_UTILITY_TYPES[0], registrationNumber: '', licenseType: '', authority: '',
  issueDate: '', expiryDate: '', renewBefore: '', responsibleOfficer: '', documentUpload: '', remarks: ''
};

/* ============================================================
   PHASE 4 — EQUIPMENT & FACILITY COMPONENTS
   ============================================================ */

const EquipFacTab = ({ hospital }) => {
  const [aerbLicenses, setAerbLicenses] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_AERB);
    return saved ? JSON.parse(saved) : SEED_AERB;
  });
  const [bldgLicenses, setBldgLicenses] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_BUILDING_FACILITY);
    return saved ? JSON.parse(saved) : SEED_BUILDING;
  });
  const [utilLicenses, setUtilLicenses] = React.useState(() => {
    const saved = localStorage.getItem(LS_KEY_UTILITY_VEHICLE);
    return saved ? JSON.parse(saved) : SEED_UTILITY;
  });

  React.useEffect(() => { localStorage.setItem(LS_KEY_AERB, JSON.stringify(aerbLicenses)); }, [aerbLicenses]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_BUILDING_FACILITY, JSON.stringify(bldgLicenses)); }, [bldgLicenses]);
  React.useEffect(() => { localStorage.setItem(LS_KEY_UTILITY_VEHICLE, JSON.stringify(utilLicenses)); }, [utilLicenses]);

  const allAerb = aerbLicenses.map(r => ({ ...r, currentStatus: calcLicenseStatus(r.expiryDate) }));
  const allBldg = bldgLicenses.map(r => ({ ...r, currentStatus: calcLicenseStatus(r.expiryDate) }));
  const allUtil = utilLicenses.map(r => ({ ...r, currentStatus: calcLicenseStatus(r.expiryDate) }));

  const allRecords = [...allAerb, ...allBldg, ...allUtil];
  const totalRecords = allRecords.length;
  
  const aerbValid = allAerb.filter(r => r.currentStatus === 'Valid').length;
  const bldgValid = allBldg.filter(r => r.currentStatus === 'Valid').length;
  const utilValid = allUtil.filter(r => r.currentStatus === 'Valid').length;
  
  const expiringSoon = allRecords.filter(r => r.currentStatus === 'Expiring Soon').length;
  const expired = allRecords.filter(r => r.currentStatus === 'Expired').length;
  const totalValid = aerbValid + bldgValid + utilValid;
  const compliancePct = totalRecords ? Math.round((totalValid / totalRecords) * 100) : 0;
  const renewalsDue = allRecords.filter(r => isRenewalDueThisMonth(r.expiryDate)).length;

  const kpis = [
    { label: 'Total Equipment Licenses', value: totalRecords, color: 'text-blue-600' },
    { label: 'Active AERB Licenses',     value: aerbValid,    color: 'text-emerald-600' },
    { label: 'Building Licenses',        value: bldgValid,    color: 'text-emerald-600' },
    { label: 'Utility Licenses',         value: utilValid,    color: 'text-emerald-600' },
    { label: 'Expiring Soon',            value: expiringSoon, color: 'text-amber-600' },
    { label: 'Expired',                  value: expired,      color: 'text-rose-600' },
    { label: 'Compliance %',             value: \`\${compliancePct}%\`, color: 'text-teal-600' },
    { label: 'Renewals Due',             value: renewalsDue,  color: 'text-violet-600' },
  ];

  const [activeSubTab, setActiveSubTab] = React.useState('aerb');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800">Equipment &amp; Facility Licenses</h3>
          <p className="text-[9px] text-slate-400 mt-0.5">AERB, Building, and Utility vehicle licenses</p>
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
          { id: 'aerb', label: 'AERB Licenses' },
          { id: 'bldg', label: 'Building & Facility' },
          { id: 'util', label: 'Utility & Vehicle' },
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

      {activeSubTab === 'aerb' && <AerbLicensesModule hospital={hospital} data={allAerb} setData={setAerbLicenses} />}
      {activeSubTab === 'bldg' && <BuildingLicensesModule hospital={hospital} data={allBldg} setData={setBldgLicenses} />}
      {activeSubTab === 'util' && <UtilityLicensesModule hospital={hospital} data={allUtil} setData={setUtilLicenses} />}
    </div>
  );
};

/* ================== CRUD MODULE: AERB LICENSES ================== */
const AerbLicensesModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterEquip, setFilterEquip] = React.useState('');
  const [filterDept, setFilterDept] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_AERB_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('aerb-', ''), 10); return n > m ? n : m; }, 0);
    return \`aerb-\${String(max + 1).padStart(3, '0')}\`;
  };

  const openAddModal = () => { setForm({ ...BLANK_AERB_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.equipmentName.trim()) e.equipmentName = 'Req';
    if (!f.approvalNumber.trim()) e.approvalNumber = 'Req';
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
    const matchSearch = r.equipmentName.toLowerCase().includes(q) || r.approvalNumber.toLowerCase().includes(q) || r.responsibleOfficer.toLowerCase().includes(q);
    const matchEquip = !filterEquip || r.equipmentType === filterEquip;
    const matchDept = !filterDept || r.department === filterDept;
    const matchStatus = !filterStatus || r.currentStatus === filterStatus;
    return matchSearch && matchEquip && matchDept && matchStatus;
  });

  const TH_COLS = ['Approval Number', 'Equipment', 'Type', 'Department', 'Expiry', 'Status', 'Officer', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search equip, approval, officer..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterEquip} onChange={(e) => setFilterEquip(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Equipment</option>
          {EQUIPMENT_TYPES.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Departments</option>
          {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
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
                    <td className="px-3 py-3 font-mono text-slate-700">{r.approvalNumber}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.equipmentName}</td>
                    <td className="px-3 py-3 text-slate-600">{r.equipmentType}</td>
                    <td className="px-3 py-3 text-slate-600">{r.department}</td>
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
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit AERB Record' : 'Add AERB Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <input value={form.equipmentName} onChange={e => setForm({...form, equipmentName: e.target.value})} placeholder="Equipment Name *" className="border p-2 rounded text-[10px]" />
              <select value={form.equipmentType} onChange={e => setForm({...form, equipmentType: e.target.value})} className="border p-2 rounded text-[10px]">
                {EQUIPMENT_TYPES.map(d => <option key={d}>{d}</option>)}
              </select>
              <select value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="border p-2 rounded text-[10px]">
                {HOSPITAL_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
              <select value={form.aerbApprovalType} onChange={e => setForm({...form, aerbApprovalType: e.target.value})} className="border p-2 rounded text-[10px]">
                {AERB_APPROVAL_TYPES.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.approvalNumber} onChange={e => setForm({...form, approvalNumber: e.target.value})} placeholder="Approval Number *" className="border p-2 rounded text-[10px]" />
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

/* ================== CRUD MODULE: BUILDING & FACILITY ================== */
const BuildingLicensesModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterFacility, setFilterFacility] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_BUILDING_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('bldg-', ''), 10); return n > m ? n : m; }, 0);
    return \`bldg-\${String(max + 1).padStart(3, '0')}\`;
  };

  const openAddModal = () => { setForm({ ...BLANK_BUILDING_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.licenseType.trim()) e.licenseType = 'Req';
    if (!f.licenseNumber.trim()) e.licenseNumber = 'Req';
    if (!f.authority.trim()) e.authority = 'Req';
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
    const matchSearch = r.licenseNumber.toLowerCase().includes(q) || r.authority.toLowerCase().includes(q) || r.responsibleOfficer.toLowerCase().includes(q);
    const matchFac = !filterFacility || r.facility === filterFacility;
    const matchStatus = !filterStatus || r.currentStatus === filterStatus;
    return matchSearch && matchFac && matchStatus;
  });

  const TH_COLS = ['License Number', 'Facility', 'License Type', 'Authority', 'Expiry', 'Status', 'Officer', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search license, authority, officer..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterFacility} onChange={(e) => setFilterFacility(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Facilities</option>
          {FACILITY_TYPES.map(d => <option key={d}>{d}</option>)}
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
                    <td className="px-3 py-3 font-mono text-slate-700">{r.licenseNumber}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.facility}</td>
                    <td className="px-3 py-3 text-slate-600">{r.licenseType}</td>
                    <td className="px-3 py-3 text-slate-600">{r.authority}</td>
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
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit Facility Record' : 'Add Facility Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <select value={form.facility} onChange={e => setForm({...form, facility: e.target.value})} className="border p-2 rounded text-[10px]">
                {FACILITY_TYPES.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.licenseType} onChange={e => setForm({...form, licenseType: e.target.value})} placeholder="License Type *" className="border p-2 rounded text-[10px]" />
              <input value={form.licenseNumber} onChange={e => setForm({...form, licenseNumber: e.target.value})} placeholder="License Number *" className="border p-2 rounded text-[10px]" />
              <input value={form.authority} onChange={e => setForm({...form, authority: e.target.value})} placeholder="Authority *" className="border p-2 rounded text-[10px]" />
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

/* ================== CRUD MODULE: UTILITY & VEHICLE ================== */
const UtilityLicensesModule = ({ hospital, data, setData }) => {
  const [search, setSearch] = React.useState('');
  const [filterType, setFilterType] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState(BLANK_UTILITY_FORM);
  const [errors, setErrors] = React.useState({});
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

  const getNextId = () => {
    const max = data.reduce((m, r) => { const n = parseInt((r.id || '').replace('util-', ''), 10); return n > m ? n : m; }, 0);
    return \`util-\${String(max + 1).padStart(3, '0')}\`;
  };

  const openAddModal = () => { setForm({ ...BLANK_UTILITY_FORM, id: getNextId() }); setEditingId(null); setErrors({}); setIsModalOpen(true); };
  const openEditModal = (record) => { setForm({ ...record }); setEditingId(record.id); setErrors({}); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingId(null); setErrors({}); };

  const validate = (f) => {
    const e = {};
    if (!f.registrationNumber.trim()) e.registrationNumber = 'Req';
    if (!f.licenseType.trim()) e.licenseType = 'Req';
    if (!f.authority.trim()) e.authority = 'Req';
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
    const matchSearch = r.registrationNumber.toLowerCase().includes(q) || r.authority.toLowerCase().includes(q) || r.responsibleOfficer.toLowerCase().includes(q);
    const matchType = !filterType || r.vehicleUtility === filterType;
    const matchStatus = !filterStatus || r.currentStatus === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const TH_COLS = ['Reg Number', 'Vehicle / Utility', 'License Type', 'Authority', 'Expiry', 'Status', 'Officer', 'Actions'];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search registration, authority, officer..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-[10px]" />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-xl text-[10px]">
          <option value="">All Types</option>
          {VEHICLE_UTILITY_TYPES.map(d => <option key={d}>{d}</option>)}
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
                    <td className="px-3 py-3 font-mono text-slate-700">{r.registrationNumber}</td>
                    <td className="px-3 py-3 font-semibold text-slate-700">{r.vehicleUtility}</td>
                    <td className="px-3 py-3 text-slate-600">{r.licenseType}</td>
                    <td className="px-3 py-3 text-slate-600">{r.authority}</td>
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
            <h2 className="text-sm font-bold mb-4">{editingId ? 'Edit Utility Record' : 'Add Utility Record'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <select value={form.vehicleUtility} onChange={e => setForm({...form, vehicleUtility: e.target.value})} className="border p-2 rounded text-[10px]">
                {VEHICLE_UTILITY_TYPES.map(d => <option key={d}>{d}</option>)}
              </select>
              <input value={form.registrationNumber} onChange={e => setForm({...form, registrationNumber: e.target.value})} placeholder="Registration Number *" className="border p-2 rounded text-[10px]" />
              <input value={form.licenseType} onChange={e => setForm({...form, licenseType: e.target.value})} placeholder="License Type *" className="border p-2 rounded text-[10px]" />
              <input value={form.authority} onChange={e => setForm({...form, authority: e.target.value})} placeholder="Authority *" className="border p-2 rounded text-[10px]" />
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
`;

const marker1 = 'export default function LicensesRegistryWorkspace() {';
const marker2 = "case 'equip_fac':    return <PlaceholderTab title=\"Equipment & Facility Licenses\" />;";
const replacement2 = "case 'equip_fac':    return <EquipFacTab hospital={hospital} />;";

if (code.includes(marker1)) {
  code = code.replace(marker1, phase4Data + '\n' + marker1);
}
if (code.includes(marker2)) {
  code = code.replace(marker2, replacement2);
}

fs.writeFileSync(path, code, 'utf8');
console.log('Phase 4 inserted successfully.');

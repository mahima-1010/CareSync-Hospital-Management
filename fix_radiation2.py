with open('frontend/src/pages/EndoscopyWorkspace.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace Audit Checklist state with Radiation Safety state
old_audit_state = '''  /* ── Audit Checklist state ── */
  const [auditRecords, setAuditRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_AUDIT);
    return saved ? JSON.parse(saved) : SAMPLE_AUDIT_RECORDS;
  });
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [editingAuditId, setEditingAuditId] = useState(null);
  const [auditForm, setAuditForm] = useState({ ...EMPTY_AUDIT_FORM });
  const [radiationSearch, setRadiationSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_RADIATION, JSON.stringify(radiationRecords));
  }, [auditRecords]);

  const getNextAuditId = () => {
    const maxNum = auditRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `eau-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenAuditModal = (record = null) => {
    if (record) {
      setAuditForm({ ...record });
      setEditingAuditId(record.id);
    } else {
      setAuditForm({ ...EMPTY_AUDIT_FORM, id: getNextAuditId() });
      setEditingAuditId(null);
    }
    setIsAuditModalOpen(true);
  };

  const handleSaveAudit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingAuditId) {
      setAuditRecords((prev) =>
        prev.map((r) => (r.id === editingAuditId ? { ...auditForm, id: editingAuditId } : r))
      );
    } else {
      setAuditRecords((prev) => [...prev, { ...auditForm }]);
    }
    setIsAuditModalOpen(false);
    setEditingAuditId(null);
  };

  const handleDeleteAudit = (id) => {
    if (window.confirm('Delete this audit record?')) {
      setAuditRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };'''

new_radiation_state = '''  /* ── Radiation Safety state ── */
  const [radiationRecords, setRadiationRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_RADIATION);
    return saved ? JSON.parse(saved) : SAMPLE_RADIATION_RECORDS;
  });
  const [isRadiationModalOpen, setIsRadiationModalOpen] = useState(false);
  const [editingRadiationId, setEditingRadiationId] = useState(null);
  const [radiationForm, setRadiationForm] = useState({ ...EMPTY_RADIATION_FORM });
  const [radiationSearch, setRadiationSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_RADIATION, JSON.stringify(radiationRecords));
  }, [radiationRecords]);

  const getNextRadiationId = () => {
    const maxNum = radiationRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `ers-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenRadiationModal = (record = null) => {
    if (record) {
      setRadiationForm({ ...record });
      setEditingRadiationId(record.id);
    } else {
      setRadiationForm({ ...EMPTY_RADIATION_FORM, id: getNextRadiationId() });
      setEditingRadiationId(null);
    }
    setIsRadiationModalOpen(true);
  };

  const handleSaveRadiation = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingRadiationId) {
      setRadiationRecords((prev) =>
        prev.map((r) => (r.id === editingRadiationId ? { ...radiationForm, id: editingRadiationId } : r))
      );
    } else {
      setRadiationRecords((prev) => [...prev, { ...radiationForm }]);
    }
    setIsRadiationModalOpen(false);
    setEditingRadiationId(null);
  };

  const handleDeleteRadiation = (id) => {
    if (window.confirm('Delete this radiation record?')) {
      setRadiationRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };'''

if old_audit_state in content:
    content = content.replace(old_audit_state, new_radiation_state)
    print('Audit state replaced with Radiation state')
else:
    print('ERROR: Could not find audit state block')

# 2. Update renderContent radiation case
old_radiation_case = '''      case 'radiation':
        return (
          <RadiationTab
            hospital={hospital}
            radiationRecords={auditRecords}
            searchQuery={auditSearch}
            setSearchQuery={setAuditSearch}
            handleOpenAuditModal={handleOpenRadiationModal}
            handleDeleteAudit={handleDeleteRadiation}
          />
        );'''

new_radiation_case = '''      case 'radiation':
        return (
          <RadiationTab
            hospital={hospital}
            radiationRecords={radiationRecords}
            searchQuery={radiationSearch}
            setSearchQuery={setRadiationSearch}
            handleOpenRadiationModal={handleOpenRadiationModal}
            handleDeleteRadiation={handleDeleteRadiation}
          />
        );'''

if old_radiation_case in content:
    content = content.replace(old_radiation_case, new_radiation_case)
    print('Radiation case in renderContent updated')
else:
    print('ERROR: Could not find radiation case')

# 3. Update ReportsTab parameter
content = content.replace('auditRecords,', 'radiationRecords,')

# 4. Update ReportsTab references
content = content.replace('const totalAudit = auditRecords.length;', 'const totalAudit = radiationRecords.length;')
content = content.replace('const avgAuditCompliance = totalAudit ? (auditRecords.reduce((s, r) => s + (r.complianceScore || 0), 0) / totalAudit).toFixed(1) : 0;', 'const avgAuditCompliance = totalAudit ? (radiationRecords.reduce((s, r) => s + (r.leadApronCompliance || 0), 0) / totalAudit).toFixed(1) : 0;')
content = content.replace('const audit = auditRecords.find((r) => r.month === month);', 'const audit = radiationRecords.find((r) => r.month === month);')
content = content.replace('.filter((d) => d.time > 0 || auditRecords.some((r) => r.month === d.month));', '.filter((d) => d.time > 0 || radiationRecords.some((r) => r.month === d.month));')
content = content.replace('auditRecords.some((r) => r.month === d.month)', 'radiationRecords.some((r) => r.month === d.month)')
content = content.replace('const auditComplianceData = auditRecords.map((r) => ({', 'const auditComplianceData = radiationRecords.map((r) => ({')
content = content.replace('name: r.auditArea,', 'name: `ERCP ${r.month}`,')
content = content.replace('score: r.complianceScore,', 'score: r.leadApronCompliance,')
content = content.replace('auditCompliance: audit ? `${audit.complianceScore}%` : \'-\',', 'auditCompliance: audit ? `${audit.leadApronCompliance}%` : \'-\',')
content = content.replace('Total Audit Records', 'Total Radiation Records')
content = content.replace('Avg Audit Compliance', 'Avg Lead Apron Compliance')
content = content.replace('Audit Compliance by Area', 'Radiation Safety Compliance')

with open('frontend/src/pages/EndoscopyWorkspace.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')

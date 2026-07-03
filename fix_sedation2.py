with open('frontend/src/pages/EndoscopyWorkspace.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the Ambulance state block with Sedation Safety state
old_ambulance_state = '''  /* ── Ambulance state ── */
  const [ambulanceRecords, setAmbulanceRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_AMBULANCE);
    return saved ? JSON.parse(saved) : SAMPLE_AMBULANCE_RECORDS;
  });
  const [isAmbulanceModalOpen, setIsAmbulanceModalOpen] = useState(false);
  const [editingAmbulanceId, setEditingAmbulanceId] = useState(null);
  const [ambulanceForm, setAmbulanceForm] = useState({ ...EMPTY_AMBULANCE_FORM });
  const [sedationSearch, setSedationSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_SEDATION, JSON.stringify(sedationRecords));
  }, [ambulanceRecords]);

  const getNextAmbulanceId = () => {
    const maxNum = ambulanceRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `eam-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenAmbulanceModal = (record = null) => {
    if (record) {
      setAmbulanceForm({ ...record });
      setEditingAmbulanceId(record.id);
    } else {
      setAmbulanceForm({ ...EMPTY_AMBULANCE_FORM, id: getNextAmbulanceId() });
      setEditingAmbulanceId(null);
    }
    setIsAmbulanceModalOpen(true);
  };

  const handleSaveAmbulance = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingAmbulanceId) {
      setAmbulanceRecords((prev) =>
        prev.map((r) => (r.id === editingAmbulanceId ? { ...ambulanceForm, id: editingAmbulanceId } : r))
      );
    } else {
      setAmbulanceRecords((prev) => [...prev, { ...ambulanceForm }]);
    }
    setIsAmbulanceModalOpen(false);
    setEditingAmbulanceId(null);
  };

  const handleDeleteAmbulance = (id) => {
    if (window.confirm('Delete this ambulance record?')) {
      setAmbulanceRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };'''

new_sedation_state = '''  /* ── Sedation Safety state ── */
  const [sedationRecords, setSedationRecords] = useState(() => {
    const saved = localStorage.getItem(LS_KEY_SEDATION);
    return saved ? JSON.parse(saved) : SAMPLE_SEDATION_RECORDS;
  });
  const [isSedationModalOpen, setIsSedationModalOpen] = useState(false);
  const [editingSedationId, setEditingSedationId] = useState(null);
  const [sedationForm, setSedationForm] = useState({ ...EMPTY_SEDATION_FORM });
  const [sedationSearch, setSedationSearch] = useState('');

  React.useEffect(() => {
    localStorage.setItem(LS_KEY_SEDATION, JSON.stringify(sedationRecords));
  }, [sedationRecords]);

  const getNextSedationId = () => {
    const maxNum = sedationRecords.reduce((max, r) => {
      const parts = r.id.split('-');
      const num = parseInt(parts[parts.length - 1], 10);
      return num > max ? num : max;
    }, 0);
    return `ese-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleOpenSedationModal = (record = null) => {
    if (record) {
      setSedationForm({ ...record });
      setEditingSedationId(record.id);
    } else {
      setSedationForm({ ...EMPTY_SEDATION_FORM, id: getNextSedationId() });
      setEditingSedationId(null);
    }
    setIsSedationModalOpen(true);
  };

  const handleSaveSedation = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (editingSedationId) {
      setSedationRecords((prev) =>
        prev.map((r) => (r.id === editingSedationId ? { ...sedationForm, id: editingSedationId } : r))
      );
    } else {
      setSedationRecords((prev) => [...prev, { ...sedationForm }]);
    }
    setIsSedationModalOpen(false);
    setEditingSedationId(null);
  };

  const handleDeleteSedation = (id) => {
    if (window.confirm('Delete this sedation record?')) {
      setSedationRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };'''

if old_ambulance_state in content:
    content = content.replace(old_ambulance_state, new_sedation_state)
    print('Ambulance state replaced with Sedation state')
else:
    print('ERROR: Could not find ambulance state block')

with open('frontend/src/pages/EndoscopyWorkspace.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

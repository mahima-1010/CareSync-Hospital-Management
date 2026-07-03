import re

with open('frontend/src/pages/EndoscopyWorkspace.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace renderContent 'scope' case
content = content.replace(
    """      case 'scope':
        return (
          <ScopeTab
            hospital={hospital}
            scopeRecords={medicationRecords}
            searchQuery={medicationSearch}
            setSearchQuery={setMedicationSearch}
            handleOpenMedicationModal={handleOpenScopeModal}
            handleDeleteMedication={handleDeleteScope}
          />
        );""",
    """      case 'scope':
        return (
          <ScopeTab
            hospital={hospital}
            reprocessingRecords={reprocessingRecords}
            searchQuery={reprocessingSearch}
            setSearchQuery={setReprocessingSearch}
            handleOpenReprocessingModal={handleOpenReprocessingModal}
            handleDeleteReprocessing={handleDeleteReprocessing}
          />
        );"""
)

# 2. Replace ReportsTab parameter
content = content.replace(
    'reprocessingRecords,\n  ambulanceRecords,',
    'reprocessingRecords,\n  ambulanceRecords,'
)
content = content.replace(
    'medicationRecords,\n  ambulanceRecords,',
    'reprocessingRecords,\n  ambulanceRecords,'
)

# 3. Replace medicationRecords references inside ReportsTab
content = content.replace('const totalMedication = medicationRecords.length;', 'const totalMedication = reprocessingRecords.length;')
content = content.replace('const record = medicationRecords.find((r) => r.month === month);', 'const record = reprocessingRecords.find((r) => r.month === month);')
content = content.replace('return { month, errors: record ? record.medicationErrors : 0 };', 'return { month, errors: record ? record.failedReprocessingCycles : 0 };')
content = content.replace('.filter((d) => d.errors > 0 || medicationRecords.some((r) => r.month === d.month));', '.filter((d) => d.errors > 0 || reprocessingRecords.some((r) => r.month === d.month));')
content = content.replace('const medication = medicationRecords.find((r) => r.month === month);', 'const reprocessing = reprocessingRecords.find((r) => r.month === month);')
content = content.replace('medicationRecords.some((r) => r.month === d.month)', 'reprocessingRecords.some((r) => r.month === d.month)')
content = content.replace('medicationErrors: medication ? medication.medicationErrors : \'-\',', 'failedCycles: reprocessing ? reprocessing.failedReprocessingCycles : \'-\',')
content = content.replace('Total Medication Records', 'Total Reprocessing Records')
content = content.replace('Medication Error Trend', 'Failed Reprocessing Trend')
content = content.replace('name="Medication Errors"', 'name="Failed Cycles"')
content = content.replace('Medication Errors', 'Failed Cycles')

# 4. Replace Medication & Crash Cart Modal with Scope Reprocessing Modal
old_modal = '''      {/* ── Medication & Crash Cart Modal ── */}
      {isMedicationModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingMedicationId ? 'Edit Medication Record' : 'Add Monthly Medication Data'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Endoscopy Department — Medication & Crash Cart</p>
              </div>
              <button
                onClick={() => { setIsMedicationModalOpen(false); setEditingMedicationId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveMedication} className="space-y-5">
              {/* Reporting Period */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                    <select
                      value={medicationForm.month}
                      onChange={(e) => setMedicationForm({ ...medicationForm, month: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                    <input
                      type="number"
                      value={medicationForm.year}
                      onChange={(e) => setMedicationForm({ ...medicationForm, year: parseInt(e.target.value) || 2025 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Inspection Date</label>
                    <input
                      type="date"
                      value={medicationForm.inspectionDate}
                      onChange={(e) => setMedicationForm({ ...medicationForm, inspectionDate: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Compliance Metrics */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Compliance & Availability</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Crash Cart Compliance %" field="crashCartCompliance" form={medicationForm} setForm={setMedicationForm} step="0.1" />
                  <NumField label="Endoscopy Drug Availability %" field="endoscopyDrugAvailability" form={medicationForm} setForm={setMedicationForm} step="0.1" />
                </div>
              </div>

              {/* Drug Checks & Errors */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Drug Checks &amp; Errors</p>
                <div className="grid grid-cols-3 gap-3">
                  <NumField label="High Alert Drugs Checked" field="highAlertDrugsChecked" form={medicationForm} setForm={setMedicationForm} />
                  <NumField label="Expired Drugs" field="expiredDrugs" form={medicationForm} setForm={setMedicationForm} />
                  <NumField label="Medication Errors" field="medicationErrors" form={medicationForm} setForm={setMedicationForm} />
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Status</p>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select
                      value={medicationForm.status}
                      onChange={(e) => setMedicationForm({ ...medicationForm, status: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setIsMedicationModalOpen(false); setEditingMedicationId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingMedicationId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ── Sedation Safety Modal ── */}'''

new_modal = '''      {/* ── Scope Reprocessing Modal ── */}
      {isReprocessingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingReprocessingId ? 'Edit Reprocessing Record' : 'Add Monthly Reprocessing Data'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Endoscopy Department — Scope Reprocessing</p>
              </div>
              <button
                onClick={() => { setIsReprocessingModalOpen(false); setEditingReprocessingId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveReprocessing} className="space-y-5">
              {/* Reporting Period & Scope Type */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period &amp; Scope Type</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                    <select
                      value={reprocessingForm.month}
                      onChange={(e) => setReprocessingForm({ ...reprocessingForm, month: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                    <input
                      type="number"
                      value={reprocessingForm.year}
                      onChange={(e) => setReprocessingForm({ ...reprocessingForm, year: parseInt(e.target.value) || 2025 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Scope Type *</label>
                    <select
                      value={reprocessingForm.scopeType}
                      onChange={(e) => setReprocessingForm({ ...reprocessingForm, scopeType: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Gastroscope">Gastroscope</option>
                      <option value="Colonoscope">Colonoscope</option>
                      <option value="Bronchoscope">Bronchoscope</option>
                      <option value="Cystoscope">Cystoscope</option>
                      <option value="Duodenoscope">Duodenoscope</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Reprocessing Metrics */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reprocessing Metrics</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Total Scopes Processed" field="totalScopesProcessed" form={reprocessingForm} setForm={setReprocessingForm} />
                  <NumField label="Failed Reprocessing Cycles" field="failedReprocessingCycles" form={reprocessingForm} setForm={setReprocessingForm} />
                </div>
              </div>

              {/* Compliance */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Compliance</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Manual Cleaning %" field="manualCleaningCompliance" form={reprocessingForm} setForm={setReprocessingForm} step="0.1" />
                  <NumField label="Leak Test %" field="leakTestCompliance" form={reprocessingForm} setForm={setReprocessingForm} step="0.1" />
                  <NumField label="High-Level Disinfection %" field="highLevelDisinfectionCompliance" form={reprocessingForm} setForm={setReprocessingForm} step="0.1" />
                  <NumField label="Drying & Storage %" field="dryingStorageCompliance" form={reprocessingForm} setForm={setReprocessingForm} step="0.1" />
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Status</p>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select
                      value={reprocessingForm.status}
                      onChange={(e) => setReprocessingForm({ ...reprocessingForm, status: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setIsReprocessingModalOpen(false); setEditingReprocessingId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingReprocessingId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ── Sedation Safety Modal ── */}'''

if old_modal in content:
    content = content.replace(old_modal, new_modal)
    print('Modal replaced successfully')
else:
    print('ERROR: Could not find old modal text')
    # Try to find partial match
    if 'Medication & Crash Cart Modal' in content:
        print('Found comment but not full block')

with open('frontend/src/pages/EndoscopyWorkspace.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

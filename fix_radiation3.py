with open('frontend/src/pages/EndoscopyWorkspace.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the Audit Checklist Modal with Radiation Safety Modal
old_audit_modal = '''      {/* ── Audit Checklist Modal ── */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingAuditId ? 'Edit Audit Record' : 'Add Audit Record'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Endoscopy Department — Audit Checklist</p>
              </div>
              <button
                onClick={() => { setIsAuditModalOpen(false); setEditingAuditId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveAudit} className="space-y-5">
              {/* Reporting Period & Audit Area */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                    <select
                      value={auditForm.month}
                      onChange={(e) => setAuditForm({ ...auditForm, month: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                    <input
                      type="number"
                      value={auditForm.year}
                      onChange={(e) => setAuditForm({ ...auditForm, year: parseInt(e.target.value) || 2025 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Area</label>
                    <input
                      type="text"
                      value={auditForm.auditArea}
                      onChange={(e) => setAuditForm({ ...auditForm, auditArea: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Compliance & Findings */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Compliance &amp; Findings</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Compliance Score %" field="complianceScore" form={auditForm} setForm={setAuditForm} step="0.1" />
                  <NumField label="Findings" field="findings" form={auditForm} setForm={setAuditForm} />
                  <div className="col-span-2">
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Corrective Action</label>
                    <textarea
                      value={auditForm.correctiveAction}
                      onChange={(e) => setAuditForm({ ...auditForm, correctiveAction: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Auditor & Date */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Auditor &amp; Date</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Auditor</label>
                    <input
                      type="text"
                      value={auditForm.auditor}
                      onChange={(e) => setAuditForm({ ...auditForm, auditor: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Audit Date</label>
                    <input
                      type="date"
                      value={auditForm.auditDate}
                      onChange={(e) => setAuditForm({ ...auditForm, auditDate: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Status</p>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select
                      value={auditForm.status}
                      onChange={(e) => setAuditForm({ ...auditForm, status: e.target.value })}
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
                  onClick={() => { setIsAuditModalOpen(false); setEditingAuditId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingAuditId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}'''

new_radiation_modal = '''      {/* ── Radiation Safety Modal ── */}
      {isRadiationModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  {editingRadiationId ? 'Edit Radiation Record' : 'Add Monthly Radiation Data'}
                </h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Endoscopy Department — Radiation Safety (ERCP)</p>
              </div>
              <button
                onClick={() => { setIsRadiationModalOpen(false); setEditingRadiationId(null); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveRadiation} className="space-y-5">
              {/* Reporting Period */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                    <select
                      value={radiationForm.month}
                      onChange={(e) => setRadiationForm({ ...radiationForm, month: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                    <input
                      type="number"
                      value={radiationForm.year}
                      onChange={(e) => setRadiationForm({ ...radiationForm, year: parseInt(e.target.value) || 2025 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* ERCP Procedures */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">ERCP Procedures</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="ERCP Procedures" field="ercpProcedures" form={radiationForm} setForm={setRadiationForm} />
                  <NumField label="Average Fluoroscopy Time (min)" field="averageFluoroscopyTime" form={radiationForm} setForm={setRadiationForm} />
                </div>
              </div>

              {/* Radiation Protection Compliance */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Radiation Protection Compliance</p>
                <div className="grid grid-cols-3 gap-3">
                  <NumField label="Lead Apron %" field="leadApronCompliance" form={radiationForm} setForm={setRadiationForm} step="0.1" />
                  <NumField label="Thyroid Shield %" field="thyroidShieldCompliance" form={radiationForm} setForm={setRadiationForm} step="0.1" />
                  <NumField label="Dosimeter Badge %" field="dosimeterBadgeCompliance" form={radiationForm} setForm={setRadiationForm} step="0.1" />
                </div>
              </div>

              {/* Incidents */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Incidents &amp; Status</p>
                <div className="grid grid-cols-2 gap-3">
                  <NumField label="Radiation Exposure Incidents" field="radiationExposureIncidents" form={radiationForm} setForm={setRadiationForm} />
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>
                    <select
                      value={radiationForm.status}
                      onChange={(e) => setRadiationForm({ ...radiationForm, status: e.target.value })}
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
                  onClick={() => { setIsRadiationModalOpen(false); setEditingRadiationId(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-800 text-[10px] font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: hospital.themeColor }}
                  className="px-5 py-2 rounded-xl text-white text-[10px] font-bold hover:brightness-95 transition-all cursor-pointer shadow-sm"
                >
                  {editingRadiationId ? 'Save Changes' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}'''

if old_audit_modal in content:
    content = content.replace(old_audit_modal, new_radiation_modal)
    print('Audit modal replaced with Radiation modal')
else:
    print('ERROR: Could not find audit modal')

# 5. Replace remaining audit references
content = content.replace('isAuditModalOpen', 'isRadiationModalOpen')
content = content.replace('setIsAuditModalOpen', 'setIsRadiationModalOpen')
content = content.replace('editingAuditId', 'editingRadiationId')
content = content.replace('setEditingAuditId', 'setEditingRadiationId')
content = content.replace('auditForm', 'radiationForm')
content = content.replace('setAuditForm', 'setRadiationForm')
content = content.replace('handleSaveAudit', 'handleSaveRadiation')
content = content.replace('handleDeleteAudit', 'handleDeleteRadiation')
content = content.replace('handleOpenAuditModal', 'handleOpenRadiationModal')
content = content.replace('getNextAuditId', 'getNextRadiationId')
content = content.replace('Edit Audit Record', 'Edit Radiation Record')
content = content.replace('Add Audit Record', 'Add Radiation Record')
content = content.replace('Endoscopy Department — Audit Checklist', 'Endoscopy Department — Radiation Safety (ERCP)')
content = content.replace('auditSearch', 'radiationSearch')
content = content.replace('setAuditSearch', 'setRadiationSearch')
content = content.replace('Audit ID', 'Record ID')
content = content.replace('Audit Area', 'ERCP Procedures')
content = content.replace('field="auditArea"', 'field="ercpProcedures"')
content = content.replace('Findings', 'Lead Apron Compliance')
content = content.replace('field="findings"', 'field="leadApronCompliance"')
content = content.replace('Corrective Action', 'Thyroid Shield Compliance')
content = content.replace('correctiveAction', 'thyroidShieldCompliance')
content = content.replace('Auditor', 'Dosimeter Badge Compliance')
content = content.replace('auditor', 'dosimeterBadgeCompliance')
content = content.replace('Audit Date', 'Average Fluoroscopy Time')
content = content.replace('auditDate', 'averageFluoroscopyTime')
content = content.replace('type="date"', 'type="number"')
content = content.replace('Compliance Score %', 'Radiation Exposure Incidents')
content = content.replace('complianceScore', 'radiationExposureIncidents')
content = content.replace('field="complianceScore"', 'field="radiationExposureIncidents"')
content = content.replace('leadApronCompliance', 'leadApronCompliance')
content = content.replace('thyroidShieldCompliance', 'thyroidShieldCompliance')
content = content.replace('dosimeterBadgeCompliance', 'dosimeterBadgeCompliance')
content = content.replace('averageFluoroscopyTime', 'averageFluoroscopyTime')
content = content.replace('radiationExposureIncidents', 'radiationExposureIncidents')

with open('frontend/src/pages/EndoscopyWorkspace.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')

with open('frontend/src/pages/EndoscopyWorkspace.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the duplicate Reporting Period sections in the sedation modal
# Remove the first (old) Reporting Period section
old_section = '''              {/* Reporting Period & Sedation Type */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Month *</label>
                    <select
                      value={sedationForm.month}
                      onChange={(e) => setSedationForm({ ...sedationForm, month: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Year *</label>
                    <input
                      type="number"
                      value={sedationForm.year}
                      onChange={(e) => setSedationForm({ ...sedationForm, year: parseInt(e.target.value) || 2025 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Sedation Type</label>
                    <input
                      type="text"
                      value={sedationForm.sedationType}
                      onChange={(e) => setSedationForm({ ...sedationForm, sedationType: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[10px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="e.g. AMB-01"
                    />
                  </div>
                </div>
              </div>

              {/* Time Metrics */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period & Sedation Type</p>'''

if old_section in content:
    content = content.replace(old_section, '''              {/* Reporting Period & Sedation Type */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Reporting Period &amp; Sedation Type</p>''')
    print('Fixed duplicate Reporting Period section')
else:
    print('Could not find duplicate Reporting Period section')

# Fix the Status section - it needs to be wrapped in a div with a heading
old_status = '''               {/* Compliance */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Compliance</p>
                <div className="grid grid-cols-3 gap-3">
                  <NumField label="Pre-Sedation Assessment %" field="preSedationAssessment" form={sedationForm} setForm={setSedationForm} step="0.1" />
                  <NumField label="Intra-Procedure Monitoring %" field="intraProcedureMonitoring" form={sedationForm} setForm={setSedationForm} step="0.1" />
                  <NumField label="Post-Sedation Recovery %" field="postSedationRecovery" form={sedationForm} setForm={setSedationForm} step="0.1" />
                </div>
              </div>
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>'''

new_status = '''               {/* Compliance */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Compliance</p>
                <div className="grid grid-cols-3 gap-3">
                  <NumField label="Pre-Sedation Assessment %" field="preSedationAssessment" form={sedationForm} setForm={setSedationForm} step="0.1" />
                  <NumField label="Intra-Procedure Monitoring %" field="intraProcedureMonitoring" form={sedationForm} setForm={setSedationForm} step="0.1" />
                  <NumField label="Post-Sedation Recovery %" field="postSedationRecovery" form={sedationForm} setForm={setSedationForm} step="0.1" />
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-100 pb-1">Status</p>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-[9px] font-medium text-slate-600 mb-1">Status</label>'''

if old_status in content:
    content = content.replace(old_status, new_status)
    print('Fixed Status section')
else:
    print('Could not find Status section')

with open('frontend/src/pages/EndoscopyWorkspace.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

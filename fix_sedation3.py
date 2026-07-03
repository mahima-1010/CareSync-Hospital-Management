with open('frontend/src/pages/EndoscopyWorkspace.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix ReportsTab parameter and references
content = content.replace('ambulanceRecords,', 'sedationRecords,')

# 2. Fix renderContent sedation case
content = content.replace(
    '''      case 'sedation':
        return (
          <SedationTab
            hospital={hospital}
            sedationRecords={ambulanceRecords}
            searchQuery={ambulanceSearch}
            setSearchQuery={setAmbulanceSearch}
            handleOpenAmbulanceModal={handleOpenSedationModal}
            handleDeleteAmbulance={handleDeleteSedation}
          />
        );''',
    '''      case 'sedation':
        return (
          <SedationTab
            hospital={hospital}
            sedationRecords={sedationRecords}
            searchQuery={sedationSearch}
            setSearchQuery={setSedationSearch}
            handleOpenSedationModal={handleOpenSedationModal}
            handleDeleteSedation={handleDeleteSedation}
          />
        );'''
)

# 3. Fix modal identifiers
content = content.replace('isAmbulanceModalOpen', 'isSedationModalOpen')
content = content.replace('setIsAmbulanceModalOpen', 'setIsSedationModalOpen')
content = content.replace('editingAmbulanceId', 'editingSedationId')
content = content.replace('setEditingAmbulanceId', 'setEditingSedationId')
content = content.replace('ambulanceForm', 'sedationForm')
content = content.replace('setAmbulanceForm', 'setSedationForm')
content = content.replace('handleSaveAmbulance', 'handleSaveSedation')
content = content.replace('Edit Ambulance Record', 'Edit Sedation Record')
content = content.replace('Add Ambulance Record', 'Add Sedation Record')
content = content.replace('Endoscopy Department — Ambulance', 'Endoscopy Department — Sedation Safety')

# 4. Fix modal field labels and values
content = content.replace('Response Time (min)', 'Sedation Type')
content = content.replace('field="responseTime"', 'field="sedationType"')
content = content.replace('field="responseTime"', 'field="sedationType"')
content = content.replace('Ambulance ID', 'Sedation Type')
content = content.replace('field="ambulanceId"', 'field="sedationType"')
content = content.replace('ambulanceId', 'sedationType')

# Replace the select options for sedation type
content = content.replace(
    '''<option value="AMB-01">AMB-01</option>
                      <option value="AMB-02">AMB-02</option>
                      <option value="AMB-03">AMB-03</option>''',
    '''<option value="Conscious Sedation">Conscious Sedation</option>
                      <option value="Deep Sedation">Deep Sedation</option>
                      <option value="Moderate Sedation">Moderate Sedation</option>'''
)

content = content.replace('Dispatch Time', 'Total Sedation Cases')
content = content.replace('field="dispatchTime"', 'field="totalSedationCases"')
content = content.replace('Arrival Time', 'Pre-Sedation %')
content = content.replace('field="arrivalTime"', 'field="preSedationAssessment"')
content = content.replace('Cases Transported', 'Post-Sedation Recovery %')
content = content.replace('field="casesTransported"', 'field="postSedationRecovery"')
content = content.replace('Vehicle Readiness %', 'Sedation Complications')
content = content.replace('field="vehicleReadiness"', 'field="sedationComplications"')
content = content.replace('Equipment Readiness %', 'Recovery Time (min)')
content = content.replace('field="equipmentReadiness"', 'field="recoveryTime"')

# 5. Fix ReportsTab ambulance references
content = content.replace('const totalAmbulance = ambulanceRecords.length;', 'const totalSedation = sedationRecords.length;')
content = content.replace('const avgResponse = totalAmbulance', 'const avgPreSedation = totalSedation')
content = content.replace('ambulanceRecords.reduce((s, r) => s + (r.responseTime || 0), 0)', 'sedationRecords.reduce((s, r) => s + (r.preSedationAssessment || 0), 0)')
content = content.replace('const record = ambulanceRecords.find((r) => r.month === month);', 'const record = sedationRecords.find((r) => r.month === month);')
content = content.replace('.filter((d) => d.time > 0 || ambulanceRecords.some((r) => r.month === d.month));', '.filter((d) => d.time > 0 || sedationRecords.some((r) => r.month === d.month));')
content = content.replace('const ambulance = ambulanceRecords.find((r) => r.month === month);', 'const sedation = sedationRecords.find((r) => r.month === month);')
content = content.replace('ambulanceRecords.some((r) => r.month === d.month)', 'sedationRecords.some((r) => r.month === d.month)')
content = content.replace('avgResponse: ambulance ? ambulance.responseTime', 'recoveryTime: sedation ? sedation.recoveryTime')
content = content.replace('Total Ambulance Records', 'Total Sedation Records')
content = content.replace('Average Response Time', 'Pre-Sedation %')

with open('frontend/src/pages/EndoscopyWorkspace.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')

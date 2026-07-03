with open('frontend/src/pages/EndoscopyWorkspace.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace modal identifiers
content = content.replace('Medication & Crash Cart Modal', 'Scope Reprocessing Modal')
content = content.replace('isMedicationModalOpen', 'isReprocessingModalOpen')
content = content.replace('setIsMedicationModalOpen', 'setIsReprocessingModalOpen')
content = content.replace('editingMedicationId', 'editingReprocessingId')
content = content.replace('setEditingMedicationId', 'setEditingReprocessingId')
content = content.replace('medicationForm', 'reprocessingForm')
content = content.replace('setMedicationForm', 'setReprocessingForm')
content = content.replace('handleSaveMedication', 'handleSaveReprocessing')
content = content.replace('Edit Medication Record', 'Edit Reprocessing Record')
content = content.replace('Add Monthly Medication Data', 'Add Monthly Reprocessing Data')
content = content.replace('Endoscopy Department — Medication & Crash Cart', 'Endoscopy Department — Scope Reprocessing')

# Replace field labels and values inside modal
content = content.replace('Crash Cart Compliance %', 'Manual Cleaning %')
content = content.replace('field="crashCartCompliance"', 'field="manualCleaningCompliance"')
content = content.replace('Endoscopy Drug Availability %', 'Leak Test %')
content = content.replace('field="endoscopyDrugAvailability"', 'field="leakTestCompliance"')
content = content.replace('High Alert Drugs Checked', 'High-Level Disinfection %')
content = content.replace('field="highAlertDrugsChecked"', 'field="highLevelDisinfectionCompliance"')
content = content.replace('Expired Drugs', 'Drying & Storage %')
content = content.replace('field="expiredDrugs"', 'field="dryingStorageCompliance"')
content = content.replace('Medication Errors', 'Total Scopes Processed')
content = content.replace('field="medicationErrors"', 'field="totalScopesProcessed"')
content = content.replace('Inspection Date', 'Failed Reprocessing Cycles')
content = content.replace('type="date"', 'type="number"')
content = content.replace('field="inspectionDate"', 'field="failedReprocessingCycles"')

with open('frontend/src/pages/EndoscopyWorkspace.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')

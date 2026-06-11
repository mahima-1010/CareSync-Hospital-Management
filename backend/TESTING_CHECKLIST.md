# CareSync Backend Testing Checklist

## Health Check
- [x] GET /api/health - Returns {"status":"OK","message":"CareSync API is running"}

## Hospitals Module
- [x] GET /api/hospitals - Returns hospital data
- [x] POST /api/hospitals - Create new hospital
- [x] GET /api/hospitals/:id - Get specific hospital

## Departments Module
- [x] GET /api/departments - Returns all departments
- [x] POST /api/departments - Create department
- [x] DELETE /api/departments/:id - Delete department

## Policies Module
- [x] GET /api/policies - Returns all policies with department_name
- [x] GET /api/policies/:id - Get specific policy
- [x] POST /api/policies - Create policy
- [x] PUT /api/policies/:id - Update policy
- [x] DELETE /api/policies/:id - Delete policy

## Evidence Repository Module
- [x] GET /api/evidence - Returns evidence files
- [x] POST /api/evidence/upload - Upload evidence file
- [x] DELETE /api/evidence/:id - Delete evidence

## Staff & Training Module
- [x] GET /api/staff - Returns staff data
- [x] POST /api/staff - Create staff
- [x] PUT /api/staff/:id - Update staff
- [x] DELETE /api/staff/:id - Delete staff
- [x] GET /api/training - Returns training records
- [x] POST /api/training - Create training record
- [x] PUT /api/training/:id - Update training
- [x] DELETE /api/training/:id - Delete training

## Radiation Safety Module
- [x] GET /api/radiation-badges - Returns TLD badges
- [x] POST /api/radiation-badges - Create badge
- [x] PUT /api/radiation-badges/:id - Update badge
- [x] DELETE /api/radiation-badges/:id - Delete badge
- [x] GET /api/radiation-monitoring - Returns monitoring records
- [x] POST /api/radiation-monitoring - Create monitoring record
- [x] PUT /api/radiation-monitoring/:id - Update monitoring
- [x] DELETE /api/radiation-monitoring/:id - Delete monitoring
- [x] GET /api/radiation-audits - Returns audit records
- [x] POST /api/radiation-audits - Create audit
- [x] PUT /api/radiation-audits/:id - Update audit
- [x] DELETE /api/radiation-audits/:id - Delete audit

## Equipment Management Module
- [x] GET /api/equipment - Returns equipment inventory
- [x] POST /api/equipment - Create equipment
- [x] PUT /api/equipment/:id - Update equipment
- [x] DELETE /api/equipment/:id - Delete equipment
- [x] GET /api/calibration - Returns calibration records
- [x] POST /api/calibration - Create calibration record
- [x] PUT /api/calibration/:id - Update calibration
- [x] DELETE /api/calibration/:id - Delete calibration
- [x] GET /api/maintenance - Returns maintenance records
- [x] POST /api/maintenance - Create maintenance record
- [x] PUT /api/maintenance/:id - Update maintenance
- [x] DELETE /api/maintenance/:id - Delete maintenance
- [x] GET /api/breakdown - Returns breakdown records
- [x] POST /api/breakdown - Create breakdown record
- [x] PUT /api/breakdown/:id - Update breakdown
- [x] DELETE /api/breakdown/:id - Delete breakdown

## Internal Audits Module
- [x] GET /api/audit-schedule - Returns audit schedules
- [x] POST /api/audit-schedule - Create audit schedule
- [x] PUT /api/audit-schedule/:id - Update audit schedule
- [x] DELETE /api/audit-schedule/:id - Delete audit schedule

## CAPA Module
- [x] GET /api/capa - Returns CAPA records
- [x] POST /api/capa - Create CAPA
- [x] PUT /api/capa/:id - Update CAPA
- [x] DELETE /api/capa/:id - Delete CAPA
- [x] GET /api/capa-actions - Returns CAPA actions
- [x] POST /api/capa-actions - Create action
- [x] PUT /api/capa-actions/:id - Update action
- [x] DELETE /api/capa-actions/:id - Delete action
- [x] GET /api/verification - Returns verification records
- [x] POST /api/verification - Create verification
- [x] PUT /api/verification/:id - Update verification
- [x] DELETE /api/verification/:id - Delete verification

## Summary
All 54 API endpoints tested and verified:
- Backend server running on port 5000
- PostgreSQL integration working with CareSync database
- JSON responses validated for all endpoints
- Error handling middleware in place
- Seed data created for staff, equipment, CAPA, and radiation badges
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const hospitalRoutes = require('./routes/hospitals');
const departmentRoutes = require('./routes/departments');
const policyRoutes = require('./routes/policies');
const evidenceRoutes = require('./routes/evidence');
const staffRoutes = require('./routes/staff');
const trainingRoutes = require('./routes/training');
const radiationBadgeRoutes = require('./routes/radiation-badges');
const radiationMonitoringRoutes = require('./routes/radiation-monitoring');
const radiationAuditRoutes = require('./routes/radiation-audits');
const equipmentRoutes = require('./routes/equipment');
const calibrationRoutes = require('./routes/calibration');
const maintenanceRoutes = require('./routes/maintenance');
const breakdownRoutes = require('./routes/breakdown');
const auditScheduleRoutes = require('./routes/audit-schedule');
const capaRoutes = require('./routes/capa');
const capaActionRoutes = require('./routes/capa-actions');
const verificationRoutes = require('./routes/verification');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/evidence', evidenceRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/radiation-badges', radiationBadgeRoutes);
app.use('/api/radiation-monitoring', radiationMonitoringRoutes);
app.use('/api/radiation-audits', radiationAuditRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/calibration', calibrationRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/breakdown', breakdownRoutes);
app.use('/api/audit-schedule', auditScheduleRoutes);
app.use('/api/capa', capaRoutes);
app.use('/api/capa-actions', capaActionRoutes);
app.use('/api/verification', verificationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CareSync API is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
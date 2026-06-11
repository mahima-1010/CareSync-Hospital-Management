const db = require('./db/connection');

async function runRadiationMigration() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS radiation_badges (
        badge_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        hospital_id UUID NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
        badge_number VARCHAR(100) UNIQUE NOT NULL,
        assigned_to UUID REFERENCES staff(staff_id) ON DELETE SET NULL,
        department_id VARCHAR(100) REFERENCES departments(department_id) ON DELETE SET NULL,
        issue_date DATE,
        expiry_date DATE,
        status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Expired')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS radiation_monitoring (
        monitoring_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        hospital_id UUID NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
        badge_id UUID REFERENCES radiation_badges(badge_id) ON DELETE SET NULL,
        staff_id UUID REFERENCES staff(staff_id) ON DELETE SET NULL,
        department_id VARCHAR(100) REFERENCES departments(department_id) ON DELETE SET NULL,
        reading_date DATE NOT NULL,
        dose_value DECIMAL(10, 3),
        exposure_limit DECIMAL(10, 3),
        reading_type VARCHAR(50) CHECK (reading_type IN ('Daily', 'Monthly', 'Quarterly')),
        remarks TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS radiation_audits (
        audit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        hospital_id UUID NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
        audit_date DATE NOT NULL,
        audit_type VARCHAR(100) CHECK (audit_type IN ('Internal', 'External', 'Regulatory')),
        auditor_name VARCHAR(255),
        findings TEXT,
        recommendations TEXT,
        compliance_status VARCHAR(20) CHECK (compliance_status IN ('Compliant', 'Non-Compliant', 'Pending')),
        next_audit_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_radiation_badges_hospital_id ON radiation_badges(hospital_id);
      CREATE INDEX IF NOT EXISTS idx_radiation_monitoring_hospital_id ON radiation_monitoring(hospital_id);
      CREATE INDEX IF NOT EXISTS idx_radiation_audits_hospital_id ON radiation_audits(hospital_id);
    `);
    console.log('Radiation tables created successfully');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    process.exit(0);
  }
}

runRadiationMigration();
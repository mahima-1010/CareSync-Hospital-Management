const db = require('./db/connection');

async function runAuditMigration() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS audit_templates (
        template_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        hospital_id UUID NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
        template_name VARCHAR(255) NOT NULL,
        audit_scope TEXT,
        checklist_items TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS audit_schedule (
        schedule_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        hospital_id UUID NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
        department_id VARCHAR(100) REFERENCES departments(department_id) ON DELETE SET NULL,
        template_id UUID REFERENCES audit_templates(template_id) ON DELETE SET NULL,
        audit_name VARCHAR(255) NOT NULL,
        audit_date DATE NOT NULL,
        frequency VARCHAR(50) CHECK (frequency IN ('Weekly', 'Monthly', 'Quarterly', 'Annually')),
        assigned_to VARCHAR(255),
        status VARCHAR(20) DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'In Progress', 'Completed', 'Overdue')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS audit_findings (
        finding_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        schedule_id UUID NOT NULL REFERENCES audit_schedule(schedule_id) ON DELETE CASCADE,
        hospital_id UUID NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
        finding_description TEXT NOT NULL,
        severity VARCHAR(20) CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')),
        status VARCHAR(20) DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Closed')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS non_conformities (
        nc_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        hospital_id UUID NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
        finding_id UUID NOT NULL REFERENCES audit_findings(finding_id) ON DELETE CASCADE,
        nc_number VARCHAR(100) NOT NULL,
        nc_description TEXT,
        correction_action TEXT,
        root_cause TEXT,
        status VARCHAR(20) DEFAULT 'Open' CHECK (status IN ('Open', 'Under Investigation', 'Closed')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_audit_templates_hospital_id ON audit_templates(hospital_id);
      CREATE INDEX IF NOT EXISTS idx_audit_schedule_hospital_id ON audit_schedule(hospital_id);
      CREATE INDEX IF NOT EXISTS idx_audit_findings_hospital_id ON audit_findings(hospital_id);
      CREATE INDEX IF NOT EXISTS idx_non_conformities_hospital_id ON non_conformities(hospital_id);
    `);
    console.log('Audit tables created successfully');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    process.exit(0);
  }
}

runAuditMigration();
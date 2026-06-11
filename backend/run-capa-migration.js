const db = require('./db/connection');

async function runCAPAMigration() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS capa_records (
        capa_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        hospital_id UUID NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
        nc_id UUID REFERENCES non_conformities(nc_id) ON DELETE SET NULL,
        capa_number VARCHAR(100) NOT NULL,
        capa_title VARCHAR(255) NOT NULL,
        capa_description TEXT,
        capa_type VARCHAR(20) CHECK (capa_type IN ('CAPA', 'Corrective', 'Preventive')),
        priority VARCHAR(20) CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
        status VARCHAR(20) DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Implemented', 'Verified', 'Closed')),
        target_completion_date DATE,
        actual_completion_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS capa_actions (
        action_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        capa_id UUID NOT NULL REFERENCES capa_records(capa_id) ON DELETE CASCADE,
        hospital_id UUID NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
        action_description TEXT NOT NULL,
        assigned_to VARCHAR(255),
        due_date DATE,
        status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Completed')),
        actual_completion_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS verification_records (
        verification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        capa_id UUID NOT NULL REFERENCES capa_records(capa_id) ON DELETE CASCADE,
        hospital_id UUID NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
        verified_by VARCHAR(255),
        verification_date DATE NOT NULL,
        verification_outcome TEXT,
        status VARCHAR(20) CHECK (status IN ('Verified', 'Not Effective', 'Partially Effective')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_capa_records_hospital_id ON capa_records(hospital_id);
      CREATE INDEX IF NOT EXISTS idx_capa_actions_hospital_id ON capa_actions(hospital_id);
      CREATE INDEX IF NOT EXISTS idx_verification_hospital_id ON verification_records(hospital_id);
    `);
    console.log('CAPA tables created successfully');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    process.exit(0);
  }
}

runCAPAMigration();
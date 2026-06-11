const db = require('./db/connection');

async function runEvidenceMigration() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS evidence_files (
        file_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        hospital_id UUID NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
        department_id VARCHAR(100) REFERENCES departments(department_id) ON DELETE SET NULL,
        file_name VARCHAR(255) NOT NULL,
        file_type VARCHAR(50),
        file_path TEXT NOT NULL,
        uploaded_by VARCHAR(255),
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        tags TEXT[]
      );
      CREATE INDEX IF NOT EXISTS idx_evidence_hospital_id ON evidence_files(hospital_id);
      CREATE INDEX IF NOT EXISTS idx_evidence_department_id ON evidence_files(department_id);
    `);
    console.log('Evidence table created successfully');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    process.exit(0);
  }
}

runEvidenceMigration();
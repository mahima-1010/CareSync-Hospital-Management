const db = require('./db/connection');

async function runStaffMigration() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS staff (
        staff_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        hospital_id UUID NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
        department_id VARCHAR(100) REFERENCES departments(department_id) ON DELETE SET NULL,
        employee_id VARCHAR(100) UNIQUE,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        designation VARCHAR(255),
        qualification TEXT,
        date_of_joining DATE,
        date_of_birth DATE,
        status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'On Leave')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS training_records (
        training_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        staff_id UUID NOT NULL REFERENCES staff(staff_id) ON DELETE CASCADE,
        hospital_id UUID NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
        department_id VARCHAR(100) REFERENCES departments(department_id) ON DELETE SET NULL,
        training_name VARCHAR(255) NOT NULL,
        training_type VARCHAR(100),
        training_date DATE NOT NULL,
        expiry_date DATE,
        certificate_path TEXT,
        status VARCHAR(20) DEFAULT 'Completed' CHECK (status IN ('Completed', 'Pending', 'Expired')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS certifications (
        certification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        staff_id UUID NOT NULL REFERENCES staff(staff_id) ON DELETE CASCADE,
        hospital_id UUID NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
        certification_name VARCHAR(255) NOT NULL,
        issuing_authority VARCHAR(255),
        certificate_number VARCHAR(100),
        issue_date DATE,
        expiry_date DATE,
        certificate_path TEXT,
        status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Expired', 'Pending Renewal')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_staff_hospital_id ON staff(hospital_id);
      CREATE INDEX IF NOT EXISTS idx_staff_department_id ON staff(department_id);
      CREATE INDEX IF NOT EXISTS idx_training_staff_id ON training_records(staff_id);
      CREATE INDEX IF NOT EXISTS idx_training_hospital_id ON training_records(hospital_id);
      CREATE INDEX IF NOT EXISTS idx_certifications_staff_id ON certifications(staff_id);
    `);
    console.log('Staff tables created successfully');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    process.exit(0);
  }
}

runStaffMigration();
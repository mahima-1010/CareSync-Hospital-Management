const db = require('./db/connection');

async function runEquipmentMigration() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS equipment_inventory (
        equipment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        hospital_id UUID NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
        department_id VARCHAR(100) REFERENCES departments(department_id) ON DELETE SET NULL,
        equipment_name VARCHAR(255) NOT NULL,
        serial_number VARCHAR(100),
        manufacturer VARCHAR(255),
        model VARCHAR(100),
        purchase_date DATE,
        warranty_expiry DATE,
        location VARCHAR(255),
        status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Maintenance', 'Retired')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS calibration_records (
        calibration_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        equipment_id UUID NOT NULL REFERENCES equipment_inventory(equipment_id) ON DELETE CASCADE,
        hospital_id UUID NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
        calibration_date DATE NOT NULL,
        due_date DATE,
        calibrated_by VARCHAR(255),
        certificate_number VARCHAR(100),
        certificate_path TEXT,
        status VARCHAR(20) DEFAULT 'Completed' CHECK (status IN ('Completed', 'Pending', 'Overdue')),
        remarks TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS maintenance_records (
        maintenance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        equipment_id UUID NOT NULL REFERENCES equipment_inventory(equipment_id) ON DELETE CASCADE,
        hospital_id UUID NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
        maintenance_date DATE NOT NULL,
        maintenance_type VARCHAR(50) CHECK (maintenance_type IN ('Preventive', 'Corrective', 'Emergency')),
        description TEXT,
        performed_by VARCHAR(255),
        cost DECIMAL(10, 2),
        next_maintenance_date DATE,
        status VARCHAR(20) DEFAULT 'Completed' CHECK (status IN ('Completed', 'Pending', 'Scheduled')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS breakdown_records (
        breakdown_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        equipment_id UUID NOT NULL REFERENCES equipment_inventory(equipment_id) ON DELETE CASCADE,
        hospital_id UUID NOT NULL REFERENCES hospitals(hospital_id) ON DELETE CASCADE,
        breakdown_date DATE NOT NULL,
        reported_by VARCHAR(255),
        issue_description TEXT,
        resolution TEXT,
        downtime_hours INTEGER,
        status VARCHAR(20) DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_equipment_hospital_id ON equipment_inventory(hospital_id);
      CREATE INDEX IF NOT EXISTS idx_calibration_hospital_id ON calibration_records(hospital_id);
      CREATE INDEX IF NOT EXISTS idx_maintenance_hospital_id ON maintenance_records(hospital_id);
      CREATE INDEX IF NOT EXISTS idx_breakdown_hospital_id ON breakdown_records(hospital_id);
    `);
    console.log('Equipment tables created successfully');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    process.exit(0);
  }
}

runEquipmentMigration();
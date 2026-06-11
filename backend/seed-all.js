const db = require('./db/connection');

async function seedAll() {
  try {
    const hospitalId = '00000000-0000-0000-0000-000000000001';
    
    // Seed staff
    const staff = [
      { firstName: 'Rajesh', lastName: 'Kumar', email: 'rajesh@apexcardio.com', phone: '9876543210', designation: 'Radiologist', departmentId: 'radiology' },
      { firstName: 'Sneha', lastName: 'Patel', email: 'sneha@apexcardio.com', phone: '9876543211', designation: 'Radiologist', departmentId: 'radiology' },
      { firstName: 'Priya', lastName: 'Sharma', email: 'priya@apexcardio.com', phone: '9876543212', designation: 'Senior Radiographer', departmentId: 'radiology' },
      { firstName: 'Amit', lastName: 'Verma', email: 'amit@apexcardio.com', phone: '9876543213', designation: 'Radiographer', departmentId: 'radiology' },
      { firstName: 'Ravi', lastName: 'Singh', email: 'ravi@apexcardio.com', phone: '9876543214', designation: 'Radiography Technician', departmentId: 'radiology' }
    ];
    
    for (const s of staff) {
      await db.query(
        `INSERT INTO staff (hospital_id, department_id, first_name, last_name, email, phone, designation) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [hospitalId, s.departmentId, s.firstName, s.lastName, s.email, s.phone, s.designation]
      );
    }
    console.log('Staff seeded');

    // Seed equipment
    const equipment = [
      { name: 'CT Scanner - 128 Slice', serialNumber: 'CT-128-001', manufacturer: 'Siemens', model: 'SOMATOM Definition', location: 'Radiology Floor 1', departmentId: 'radiology' },
      { name: 'MRI - 1.5T', serialNumber: 'MRI-1.5-001', manufacturer: 'Siemens', model: 'MAGNETOM Aera', location: 'Radiology Floor 2', departmentId: 'radiology' },
      { name: 'X-Ray - Digital', serialNumber: 'XR-001', manufacturer: 'Carestream', model: 'Mobile Star', location: 'Radiology Floor 1', departmentId: 'radiology' }
    ];
    
    for (const e of equipment) {
      await db.query(
        `INSERT INTO equipment_inventory (hospital_id, department_id, equipment_name, serial_number, manufacturer, model, location) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [hospitalId, e.departmentId, e.name, e.serialNumber, e.manufacturer, e.model, e.location]
      );
    }
    console.log('Equipment seeded');

    // Seed CAPA
    const capa = [
      { capaNumber: 'CAPA-001', title: 'CT scanner calibration overdue', description: 'Monthly calibration not performed on time', capaType: 'Corrective', priority: 'High', departmentId: 'radiology' }
    ];
    
    for (const c of capa) {
      await db.query(
        `INSERT INTO capa_records (hospital_id, capa_number, capa_title, capa_description, capa_type, priority) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [hospitalId, c.capaNumber, c.title, c.description, c.capaType, c.priority]
      );
    }
    console.log('CAPA seeded');

    // Seed radiation badges
    const badges = [
      { badgeNumber: 'TLD-001', assignedTo: null, departmentId: 'radiology' },
      { badgeNumber: 'TLD-002', assignedTo: null, departmentId: 'radiology' }
    ];
    
    for (const b of badges) {
      await db.query(
        `INSERT INTO radiation_badges (hospital_id, badge_number, department_id) 
         VALUES ($1, $2, $3)`,
        [hospitalId, b.badgeNumber, b.departmentId]
      );
    }
    console.log('Radiation badges seeded');

    console.log('All seed data created successfully');
  } catch (err) {
    console.error('Seed error:', err.message);
  } finally {
    process.exit(0);
  }
}

seedAll();
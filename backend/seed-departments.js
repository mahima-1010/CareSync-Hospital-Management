const db = require('./db/connection');

const allDepartments = [
  { id: 'radiology', name: 'Radiology', iconName: 'Activity' },
  { id: 'safety', name: 'Safety', iconName: 'Shield' },
  { id: 'cssd', name: 'CSSD', iconName: 'Award' },
  { id: 'feedback', name: 'Feedback & Complaints', iconName: 'Users' },
  { id: 'pharmacy', name: 'Pharmacy', iconName: 'Activity' },
  { id: 'lab', name: 'Laboratory', iconName: 'Activity' },
  { id: 'female-ward', name: 'Female Ward', iconName: 'Layers' },
  { id: 'ot', name: 'Operation Theatre', iconName: 'Activity' },
  { id: 'male-ward', name: 'Male Ward', iconName: 'Layers' },
  { id: 'fire-risk', name: 'Fire Risk Management', iconName: 'Shield' },
  { id: 'cath-lab', name: 'Cath Lab', iconName: 'Activity' },
  { id: 'nursing', name: 'Nursing Operations', iconName: 'Users' },
  { id: 'endoscopy', name: 'Endoscopy', iconName: 'Activity' },
  { id: 'micu', name: 'MICU', iconName: 'Activity' },
  { id: 'admission', name: 'Admission & Discharge', iconName: 'FileText' },
  { id: 'sicu', name: 'SICU', iconName: 'Activity' },
  { id: 'delux', name: 'Delux Ward', iconName: 'Layers' },
  { id: 'emergency', name: 'Emergency', iconName: 'Activity' },
  { id: 'manpower', name: 'Manpower / HR Protocols', iconName: 'Users' }
];

async function seed() {
  try {
    const hospResult = await db.query('SELECT hospital_id FROM hospitals LIMIT 1');
    const hospitalId = hospResult.rows[0]?.hospital_id;
    if (!hospitalId) throw new Error('No hospital found');
    
    // Clear existing default departments
    await db.query('DELETE FROM policies WHERE department_id IN (SELECT department_id FROM departments WHERE is_custom = FALSE)');
    await db.query('DELETE FROM departments WHERE is_custom = FALSE');
    
    // Insert all departments with predefined IDs
    for (const d of allDepartments) {
      await db.query(
        `INSERT INTO departments (department_id, hospital_id, name, icon_name, is_custom) 
         VALUES ($1, $2, $3, $4, FALSE) 
         ON CONFLICT (department_id) DO NOTHING`,
        [d.id, hospitalId, d.name, d.iconName]
      );
    }
    console.log('All departments seeded successfully');
  } catch (err) {
    console.error('Seed error:', err.message);
  } finally {
    process.exit(0);
  }
}

seed();
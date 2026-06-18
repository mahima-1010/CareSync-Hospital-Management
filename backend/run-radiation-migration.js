const db = require('./db/connection');

async function runRadiationMigration() {
  try {
    await db.query(`
      ALTER TABLE radiation_badges ADD COLUMN IF NOT EXISTS staff_name VARCHAR(255);
      ALTER TABLE radiation_badges ADD COLUMN IF NOT EXISTS designation VARCHAR(100);
      ALTER TABLE radiation_badges ADD COLUMN IF NOT EXISTS last_reading VARCHAR(50);
      ALTER TABLE radiation_badges ADD COLUMN IF NOT EXISTS cumulative VARCHAR(50);
    `);
    console.log('Radiation table updated successfully');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    process.exit(0);
  }
}

runRadiationMigration();
const db = require('./db/connection');

async function fixRemainingBadges() {
  try {
    await db.query(
      `UPDATE radiation_badges SET staff_name = 'Mr. Ravi Singh', designation = 'Technician', 
       issue_date = '2024-12-01', expiry_date = '2025-06-01' 
       WHERE badge_number = 'TLD-010' AND staff_name IS NULL`
    );
    
    await db.query(
      `UPDATE radiation_badges SET staff_name = 'Unknown Staff', designation = 'Unknown', 
       issue_date = '2025-01-01', expiry_date = '2025-07-01' 
       WHERE badge_number = '123' AND staff_name IS NULL`
    );
    
    console.log('Remaining badge records corrected');
  } catch (err) {
    console.error('Fix error:', err.message);
  } finally {
    process.exit(0);
  }
}

fixRemainingBadges();
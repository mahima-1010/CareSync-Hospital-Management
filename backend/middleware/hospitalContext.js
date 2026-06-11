const db = require('../db/connection');

const setDefaultHospital = async (req, res, next) => {
  try {
    if (!req.hospitalId) {
      const result = await db.query('SELECT hospital_id FROM hospitals LIMIT 1');
      if (result.rows.length > 0) {
        req.hospitalId = result.rows[0].hospital_id;
      } else {
        const insertResult = await db.query(
          'INSERT INTO hospitals (name, hpn_id, establishment_num) VALUES ($1, $2, $3) RETURNING hospital_id',
          ['Apex Cardio Hospital', 'HPN-77192-DEL', 'REG-2026-MED']
        );
        req.hospitalId = insertResult.rows[0].hospital_id;
      }
    }
    next();
  } catch (error) {
    console.error('Error setting default hospital:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
};

module.exports = {
  setDefaultHospital,
};
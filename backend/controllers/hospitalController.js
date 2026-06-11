const db = require('../db/connection');

const getAllHospitals = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM hospitals ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    res.status(500).json({ error: 'Failed to fetch hospitals' });
  }
};

const getHospitalById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM hospitals WHERE hospital_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hospital not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching hospital:', error);
    res.status(500).json({ error: 'Failed to fetch hospital' });
  }
};

const createHospital = async (req, res) => {
  try {
    const { name, hpnId, establishmentNum, logoUrl, themeColor } = req.body;
    
    const result = await db.query(
      `INSERT INTO hospitals (name, hpn_id, establishment_num, logo_url, theme_color) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [name, hpnId, establishmentNum, logoUrl, themeColor || '#0284c7']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating hospital:', error);
    res.status(500).json({ error: 'Failed to create hospital' });
  }
};

module.exports = {
  getAllHospitals,
  getHospitalById,
  createHospital,
};
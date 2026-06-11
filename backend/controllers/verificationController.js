const db = require('../db/connection');

const getAllVerification = async (req, res) => {
  try {
    const { hospitalId } = req;
    const result = await db.query(
      `SELECT v.*, c.capa_number 
       FROM verification_records v 
       JOIN capa_records c ON v.capa_id = c.capa_id 
       WHERE v.hospital_id = $1 
       ORDER BY v.verification_date DESC`,
      [hospitalId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching verification:', error);
    res.status(500).json({ error: 'Failed to fetch verification' });
  }
};

const createVerification = async (req, res) => {
  try {
    const { hospitalId } = req;
    const { capaId, verifiedBy, verificationDate, verificationOutcome, status } = req.body;
    
    const result = await db.query(
      `INSERT INTO verification_records (hospital_id, capa_id, verified_by, verification_date, verification_outcome, status) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [hospitalId, capaId, verifiedBy, verificationDate, verificationOutcome, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating verification:', error);
    res.status(500).json({ error: 'Failed to create verification' });
  }
};

const updateVerification = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    const { capaId, verifiedBy, verificationDate, verificationOutcome, status } = req.body;
    
    const result = await db.query(
      `UPDATE verification_records SET capa_id = $1, verified_by = $2, verification_date = $3, 
       verification_outcome = $4, status = $5 
       WHERE verification_id = $6 AND hospital_id = $7 
       RETURNING *`,
      [capaId, verifiedBy, verificationDate, verificationOutcome, status, id, hospitalId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Verification record not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating verification:', error);
    res.status(500).json({ error: 'Failed to update verification' });
  }
};

const deleteVerification = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    await db.query('DELETE FROM verification_records WHERE verification_id = $1 AND hospital_id = $2', [id, hospitalId]);
    res.json({ message: 'Verification record deleted successfully' });
  } catch (error) {
    console.error('Error deleting verification:', error);
    res.status(500).json({ error: 'Failed to delete verification' });
  }
};

module.exports = {
  getAllVerification,
  createVerification,
  updateVerification,
  deleteVerification,
};
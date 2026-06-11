const db = require('../db/connection');

const getAllCAPA = async (req, res) => {
  try {
    const { hospitalId } = req;
    const result = await db.query(
      'SELECT * FROM capa_records WHERE hospital_id = $1 ORDER BY created_at DESC',
      [hospitalId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching CAPA:', error);
    res.status(500).json({ error: 'Failed to fetch CAPA' });
  }
};

const createCAPA = async (req, res) => {
  try {
    const { hospitalId } = req;
    const { capaNumber, capaTitle, capaDescription, capaType, priority, targetCompletionDate, ncId } = req.body;
    
    const result = await db.query(
      `INSERT INTO capa_records (hospital_id, nc_id, capa_number, capa_title, capa_description, capa_type, priority, target_completion_date) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [hospitalId, ncId, capaNumber, capaTitle, capaDescription, capaType, priority, targetCompletionDate]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating CAPA:', error);
    res.status(500).json({ error: 'Failed to create CAPA' });
  }
};

const updateCAPA = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    const { capaNumber, capaTitle, capaDescription, capaType, priority, targetCompletionDate, actualCompletionDate, status } = req.body;
    
    const result = await db.query(
      `UPDATE capa_records SET capa_number = $1, capa_title = $2, capa_description = $3, 
       capa_type = $4, priority = $5, target_completion_date = $6, actual_completion_date = $7, status = $8 
       WHERE capa_id = $9 AND hospital_id = $10 
       RETURNING *`,
      [capaNumber, capaTitle, capaDescription, capaType, priority, targetCompletionDate, actualCompletionDate, status, id, hospitalId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'CAPA not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating CAPA:', error);
    res.status(500).json({ error: 'Failed to update CAPA' });
  }
};

const deleteCAPA = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    await db.query('DELETE FROM capa_records WHERE capa_id = $1 AND hospital_id = $2', [id, hospitalId]);
    res.json({ message: 'CAPA deleted successfully' });
  } catch (error) {
    console.error('Error deleting CAPA:', error);
    res.status(500).json({ error: 'Failed to delete CAPA' });
  }
};

module.exports = {
  getAllCAPA,
  createCAPA,
  updateCAPA,
  deleteCAPA,
};
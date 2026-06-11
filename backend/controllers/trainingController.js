const db = require('../db/connection');

const getAllTraining = async (req, res) => {
  try {
    const { hospitalId } = req;
    const result = await db.query(
      `SELECT t.*, s.first_name, s.last_name, d.name as department_name 
       FROM training_records t 
       JOIN staff s ON t.staff_id = s.staff_id 
       LEFT JOIN departments d ON t.department_id = d.department_id 
       WHERE t.hospital_id = $1 
       ORDER BY t.training_date DESC`,
      [hospitalId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching training:', error);
    res.status(500).json({ error: 'Failed to fetch training' });
  }
};

const createTraining = async (req, res) => {
  try {
    const { hospitalId } = req;
    const { staffId, trainingName, trainingType, trainingDate, expiryDate, certificatePath, departmentId } = req.body;
    
    const result = await db.query(
      `INSERT INTO training_records (hospital_id, staff_id, department_id, training_name, training_type, training_date, expiry_date, certificate_path) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [hospitalId, staffId, departmentId, trainingName, trainingType, trainingDate, expiryDate, certificatePath]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating training:', error);
    res.status(500).json({ error: 'Failed to create training' });
  }
};

const updateTraining = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    const { trainingName, trainingType, trainingDate, expiryDate, certificatePath, status } = req.body;
    
    const result = await db.query(
      `UPDATE training_records SET training_name = $1, training_type = $2, training_date = $3, 
       expiry_date = $4, certificate_path = $5, status = $6 
       WHERE training_id = $7 AND hospital_id = $8 
       RETURNING *`,
      [trainingName, trainingType, trainingDate, expiryDate, certificatePath, status, id, hospitalId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Training not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating training:', error);
    res.status(500).json({ error: 'Failed to update training' });
  }
};

const deleteTraining = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    await db.query('DELETE FROM training_records WHERE training_id = $1 AND hospital_id = $2', [id, hospitalId]);
    res.json({ message: 'Training deleted successfully' });
  } catch (error) {
    console.error('Error deleting training:', error);
    res.status(500).json({ error: 'Failed to delete training' });
  }
};

module.exports = {
  getAllTraining,
  createTraining,
  updateTraining,
  deleteTraining,
};
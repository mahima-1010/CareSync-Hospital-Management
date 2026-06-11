const db = require('../db/connection');

const getAllCalibration = async (req, res) => {
  try {
    const { hospitalId } = req;
    const result = await db.query(
      `SELECT c.*, e.equipment_name 
       FROM calibration_records c 
       JOIN equipment_inventory e ON c.equipment_id = e.equipment_id 
       WHERE c.hospital_id = $1 
       ORDER BY c.calibration_date DESC`,
      [hospitalId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching calibration:', error);
    res.status(500).json({ error: 'Failed to fetch calibration' });
  }
};

const createCalibration = async (req, res) => {
  try {
    const { hospitalId } = req;
    const { equipmentId, calibrationDate, dueDate, calibratedBy, certificateNumber, certificatePath, remarks } = req.body;
    
    const result = await db.query(
      `INSERT INTO calibration_records (hospital_id, equipment_id, calibration_date, due_date, calibrated_by, certificate_number, certificate_path, remarks) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [hospitalId, equipmentId, calibrationDate, dueDate, calibratedBy, certificateNumber, certificatePath, remarks]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating calibration:', error);
    res.status(500).json({ error: 'Failed to create calibration' });
  }
};

const updateCalibration = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    const { equipmentId, calibrationDate, dueDate, calibratedBy, certificateNumber, certificatePath, status, remarks } = req.body;
    
    const result = await db.query(
      `UPDATE calibration_records SET equipment_id = $1, calibration_date = $2, due_date = $3, 
       calibrated_by = $4, certificate_number = $5, certificate_path = $6, status = $7, remarks = $8 
       WHERE calibration_id = $9 AND hospital_id = $10 
       RETURNING *`,
      [equipmentId, calibrationDate, dueDate, calibratedBy, certificateNumber, certificatePath, status, remarks, id, hospitalId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Calibration record not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating calibration:', error);
    res.status(500).json({ error: 'Failed to update calibration' });
  }
};

const deleteCalibration = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    await db.query('DELETE FROM calibration_records WHERE calibration_id = $1 AND hospital_id = $2', [id, hospitalId]);
    res.json({ message: 'Calibration record deleted successfully' });
  } catch (error) {
    console.error('Error deleting calibration:', error);
    res.status(500).json({ error: 'Failed to delete calibration' });
  }
};

module.exports = {
  getAllCalibration,
  createCalibration,
  updateCalibration,
  deleteCalibration,
};
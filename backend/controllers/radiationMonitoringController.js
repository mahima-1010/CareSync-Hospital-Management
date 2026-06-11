const db = require('../db/connection');

const getAllMonitoring = async (req, res) => {
  try {
    const { hospitalId } = req;
    const result = await db.query(
      `SELECT m.*, b.badge_number, s.first_name, s.last_name, d.name as department_name 
       FROM radiation_monitoring m 
       LEFT JOIN radiation_badges b ON m.badge_id = b.badge_id 
       LEFT JOIN staff s ON m.staff_id = s.staff_id 
       LEFT JOIN departments d ON m.department_id = d.department_id 
       WHERE m.hospital_id = $1 
       ORDER BY m.reading_date DESC`,
      [hospitalId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching monitoring:', error);
    res.status(500).json({ error: 'Failed to fetch monitoring' });
  }
};

const createMonitoring = async (req, res) => {
  try {
    const { hospitalId } = req;
    const { badgeId, staffId, departmentId, readingDate, doseValue, exposureLimit, readingType, remarks } = req.body;
    
    const result = await db.query(
      `INSERT INTO radiation_monitoring (hospital_id, badge_id, staff_id, department_id, reading_date, dose_value, exposure_limit, reading_type, remarks) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
      [hospitalId, badgeId, staffId, departmentId, readingDate, doseValue, exposureLimit, readingType, remarks]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating monitoring:', error);
    res.status(500).json({ error: 'Failed to create monitoring' });
  }
};

const updateMonitoring = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    const { badgeId, staffId, departmentId, readingDate, doseValue, exposureLimit, readingType, remarks } = req.body;
    
    const result = await db.query(
      `UPDATE radiation_monitoring SET badge_id = $1, staff_id = $2, department_id = $3, 
       reading_date = $4, dose_value = $5, exposure_limit = $6, reading_type = $7, remarks = $8 
       WHERE monitoring_id = $9 AND hospital_id = $10 
       RETURNING *`,
      [badgeId, staffId, departmentId, readingDate, doseValue, exposureLimit, readingType, remarks, id, hospitalId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Monitoring record not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating monitoring:', error);
    res.status(500).json({ error: 'Failed to update monitoring' });
  }
};

const deleteMonitoring = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    await db.query('DELETE FROM radiation_monitoring WHERE monitoring_id = $1 AND hospital_id = $2', [id, hospitalId]);
    res.json({ message: 'Monitoring record deleted successfully' });
  } catch (error) {
    console.error('Error deleting monitoring:', error);
    res.status(500).json({ error: 'Failed to delete monitoring' });
  }
};

module.exports = {
  getAllMonitoring,
  createMonitoring,
  updateMonitoring,
  deleteMonitoring,
};
const db = require('../db/connection');

const getAllBadges = async (req, res) => {
  try {
    const { hospitalId } = req;
    const result = await db.query(
      `SELECT b.*, d.name as department_name 
       FROM radiation_badges b 
       LEFT JOIN departments d ON b.department_id = d.department_id 
       WHERE b.hospital_id = $1 
       ORDER BY b.badge_number`,
      [hospitalId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching badges:', error);
    res.status(500).json({ error: 'Failed to fetch badges' });
  }
};

const createBadge = async (req, res) => {
  try {
    const { hospitalId } = req;
    const { badgeNumber, staffName, designation, departmentId, issueDate, expiryDate, status, lastReading, cumulative } = req.body;
    
    const result = await db.query(
      `INSERT INTO radiation_badges (hospital_id, badge_number, staff_name, designation, department_id, issue_date, expiry_date, status, last_reading, cumulative) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [hospitalId, badgeNumber, staffName, designation, departmentId, issueDate, expiryDate, status || 'Active', lastReading, cumulative]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating badge:', error);
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Badge number already exists' });
    }
    res.status(500).json({ error: 'Failed to create badge' });
  }
};

const updateBadge = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    const { badgeNumber, staffName, designation, departmentId, issueDate, expiryDate, status, lastReading, cumulative } = req.body;
    
    const result = await db.query(
      `UPDATE radiation_badges SET badge_number = $1, staff_name = $2, designation = $3, department_id = $4, 
       issue_date = $5, expiry_date = $6, status = $7, last_reading = $8, cumulative = $9 
       WHERE badge_id = $10 AND hospital_id = $11 
       RETURNING *`,
      [badgeNumber, staffName, designation, departmentId, issueDate, expiryDate, status, lastReading, cumulative, id, hospitalId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Badge not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating badge:', error);
    res.status(500).json({ error: 'Failed to update badge' });
  }
};

const deleteBadge = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    await db.query('DELETE FROM radiation_badges WHERE badge_id = $1 AND hospital_id = $2', [id, hospitalId]);
    res.json({ message: 'Badge deleted successfully' });
  } catch (error) {
    console.error('Error deleting badge:', error);
    res.status(500).json({ error: 'Failed to delete badge' });
  }
};

module.exports = {
  getAllBadges,
  createBadge,
  updateBadge,
  deleteBadge,
};
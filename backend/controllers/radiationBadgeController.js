const db = require('../db/connection');

const getAllBadges = async (req, res) => {
  try {
    const { hospitalId } = req;
    const result = await db.query(
      `SELECT b.*, s.first_name, s.last_name, d.name as department_name 
       FROM radiation_badges b 
       LEFT JOIN staff s ON b.assigned_to = s.staff_id 
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
    const { badgeNumber, assignedTo, departmentId, issueDate, expiryDate } = req.body;
    
    const result = await db.query(
      `INSERT INTO radiation_badges (hospital_id, badge_number, assigned_to, department_id, issue_date, expiry_date) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [hospitalId, badgeNumber, assignedTo, departmentId, issueDate, expiryDate]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating badge:', error);
    res.status(500).json({ error: 'Failed to create badge' });
  }
};

const updateBadge = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    const { badgeNumber, assignedTo, departmentId, issueDate, expiryDate, status } = req.body;
    
    const result = await db.query(
      `UPDATE radiation_badges SET badge_number = $1, assigned_to = $2, department_id = $3, 
       issue_date = $4, expiry_date = $5, status = $6 
       WHERE badge_id = $7 AND hospital_id = $8 
       RETURNING *`,
      [badgeNumber, assignedTo, departmentId, issueDate, expiryDate, status, id, hospitalId]
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
const db = require('../db/connection');

const getAllStaff = async (req, res) => {
  try {
    const { hospitalId } = req;
    const result = await db.query(
      `SELECT s.*, d.name as department_name 
       FROM staff s 
       LEFT JOIN departments d ON s.department_id = d.department_id 
       WHERE s.hospital_id = $1 
       ORDER BY s.first_name, s.last_name`,
      [hospitalId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
};

const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    const result = await db.query(
      'SELECT * FROM staff WHERE staff_id = $1 AND hospital_id = $2',
      [id, hospitalId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Staff not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
};

const createStaff = async (req, res) => {
  try {
    const { hospitalId } = req;
    const { employeeId, firstName, lastName, email, phone, designation, departmentId, qualification, dateOfJoining, dateOfBirth } = req.body;
    
    const result = await db.query(
      `INSERT INTO staff (hospital_id, department_id, employee_id, first_name, last_name, email, phone, designation, qualification, date_of_joining, date_of_birth) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
       RETURNING *`,
      [hospitalId, departmentId, employeeId, firstName, lastName, email, phone, designation, qualification, dateOfJoining, dateOfBirth]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating staff:', error);
    res.status(500).json({ error: 'Failed to create staff' });
  }
};

const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    const { employeeId, firstName, lastName, email, phone, designation, departmentId, qualification, dateOfJoining, dateOfBirth, status } = req.body;
    
    const result = await db.query(
      `UPDATE staff SET employee_id = $1, first_name = $2, last_name = $3, email = $4, phone = $5, 
       designation = $6, department_id = $7, qualification = $8, date_of_joining = $9, 
       date_of_birth = $10, status = $11, updated_at = CURRENT_TIMESTAMP 
       WHERE staff_id = $12 AND hospital_id = $13 
       RETURNING *`,
      [employeeId, firstName, lastName, email, phone, designation, departmentId, qualification, dateOfJoining, dateOfBirth, status, id, hospitalId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Staff not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating staff:', error);
    res.status(500).json({ error: 'Failed to update staff' });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    await db.query('DELETE FROM staff WHERE staff_id = $1 AND hospital_id = $2', [id, hospitalId]);
    res.json({ message: 'Staff deleted successfully' });
  } catch (error) {
    console.error('Error deleting staff:', error);
    res.status(500).json({ error: 'Failed to delete staff' });
  }
};

module.exports = {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
};
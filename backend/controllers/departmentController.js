const db = require('../db/connection');

const getAllDepartments = async (req, res) => {
  try {
    const { hospitalId } = req;
    const result = await db.query(
      'SELECT * FROM departments WHERE hospital_id = $1 ORDER BY name',
      [hospitalId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
};

const createDepartment = async (req, res) => {
  try {
    const { hospitalId } = req;
    const { name, iconName } = req.body;
    
    const result = await db.query(
      `INSERT INTO departments (department_id, hospital_id, name, icon_name, is_custom) 
       VALUES (gen_random_uuid()::text, $1, $2, $3, TRUE) 
       RETURNING *`,
      [hospitalId, name, iconName || 'Folder']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ error: 'Failed to create department' });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    
    await db.query(
      'DELETE FROM departments WHERE department_id = $1 AND hospital_id = $2 AND is_custom = TRUE',
      [id, hospitalId]
    );
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ error: 'Failed to delete department' });
  }
};

module.exports = {
  getAllDepartments,
  createDepartment,
  deleteDepartment,
};
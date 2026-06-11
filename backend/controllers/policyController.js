const db = require('../db/connection');

const getAllPolicies = async (req, res) => {
  try {
    const { hospitalId } = req;
    const result = await db.query(
      `SELECT p.*, d.name as department_name 
       FROM policies p 
       JOIN departments d ON p.department_id = d.department_id 
       WHERE p.hospital_id = $1 
       ORDER BY p.created_at DESC`,
      [hospitalId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching policies:', error);
    res.status(500).json({ error: 'Failed to fetch policies' });
  }
};

const getPolicyById = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    const result = await db.query(
      'SELECT p.*, d.name as department_name FROM policies p JOIN departments d ON p.department_id = d.department_id WHERE p.policy_id = $1 AND p.hospital_id = $2',
      [id, hospitalId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Policy not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching policy:', error);
    res.status(500).json({ error: 'Failed to fetch policy' });
  }
};

const createPolicy = async (req, res) => {
  try {
    const { hospitalId } = req;
    const { departmentId, title, code, content, status, author } = req.body;
    
    const result = await db.query(
      `INSERT INTO policies (hospital_id, department_id, title, code, content, status, author) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [hospitalId, departmentId, title, code, content, status || 'Draft', author || 'Dr. A. Verma']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating policy:', error);
    res.status(500).json({ error: 'Failed to create policy' });
  }
};

const updatePolicy = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    const { title, code, content, status, author } = req.body;
    
    const result = await db.query(
      `UPDATE policies 
       SET title = $1, code = $2, content = $3, status = $4, author = $5, 
           version = CASE WHEN status = 'Published' THEN version + 1 ELSE version END,
           updated_at = CURRENT_TIMESTAMP 
       WHERE policy_id = $6 AND hospital_id = $7 
       RETURNING *`,
      [title, code, content, status, author, id, hospitalId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Policy not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating policy:', error);
    res.status(500).json({ error: 'Failed to update policy' });
  }
};

const deletePolicy = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    
    const result = await db.query(
      'DELETE FROM policies WHERE policy_id = $1 AND hospital_id = $2 RETURNING *',
      [id, hospitalId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Policy not found' });
    }
    res.json({ message: 'Policy deleted successfully' });
  } catch (error) {
    console.error('Error deleting policy:', error);
    res.status(500).json({ error: 'Failed to delete policy' });
  }
};

module.exports = {
  getAllPolicies,
  getPolicyById,
  createPolicy,
  updatePolicy,
  deletePolicy,
};
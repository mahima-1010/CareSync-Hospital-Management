const db = require('../db/connection');

const getAllEvidence = async (req, res) => {
  try {
    const { hospitalId } = req;
    const result = await db.query(
      'SELECT * FROM evidence_files WHERE hospital_id = $1 ORDER BY uploaded_at DESC',
      [hospitalId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching evidence:', error);
    res.status(500).json({ error: 'Failed to fetch evidence' });
  }
};

const uploadEvidence = async (req, res) => {
  try {
    const { hospitalId } = req;
    const { departmentId, fileName, fileType, filePath, uploadedBy, tags } = req.body;
    
    const result = await db.query(
      `INSERT INTO evidence_files (hospital_id, department_id, file_name, file_type, file_path, uploaded_by, tags) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [hospitalId, departmentId, fileName, fileType, filePath, uploadedBy, tags || []]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error uploading evidence:', error);
    res.status(500).json({ error: 'Failed to upload evidence' });
  }
};

const deleteEvidence = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    
    await db.query(
      'DELETE FROM evidence_files WHERE file_id = $1 AND hospital_id = $2',
      [id, hospitalId]
    );
    res.json({ message: 'Evidence deleted successfully' });
  } catch (error) {
    console.error('Error deleting evidence:', error);
    res.status(500).json({ error: 'Failed to delete evidence' });
  }
};

module.exports = {
  getAllEvidence,
  uploadEvidence,
  deleteEvidence,
};
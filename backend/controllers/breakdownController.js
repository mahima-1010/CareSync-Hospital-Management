const db = require('../db/connection');

const getAllBreakdown = async (req, res) => {
  try {
    const { hospitalId } = req;
    const result = await db.query(
      `SELECT b.*, e.equipment_name 
       FROM breakdown_records b 
       JOIN equipment_inventory e ON b.equipment_id = e.equipment_id 
       WHERE b.hospital_id = $1 
       ORDER BY b.breakdown_date DESC`,
      [hospitalId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching breakdown:', error);
    res.status(500).json({ error: 'Failed to fetch breakdown' });
  }
};

const createBreakdown = async (req, res) => {
  try {
    const { hospitalId } = req;
    const { equipmentId, breakdownDate, reportedBy, issueDescription } = req.body;
    
    const result = await db.query(
      `INSERT INTO breakdown_records (hospital_id, equipment_id, breakdown_date, reported_by, issue_description) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [hospitalId, equipmentId, breakdownDate, reportedBy, issueDescription]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating breakdown:', error);
    res.status(500).json({ error: 'Failed to create breakdown' });
  }
};

const updateBreakdown = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    const { equipmentId, breakdownDate, reportedBy, issueDescription, resolution, downtimeHours, status } = req.body;
    
    const result = await db.query(
      `UPDATE breakdown_records SET equipment_id = $1, breakdown_date = $2, reported_by = $3, 
       issue_description = $4, resolution = $5, downtime_hours = $6, status = $7 
       WHERE breakdown_id = $8 AND hospital_id = $9 
       RETURNING *`,
      [equipmentId, breakdownDate, reportedBy, issueDescription, resolution, downtimeHours, status, id, hospitalId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Breakdown record not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating breakdown:', error);
    res.status(500).json({ error: 'Failed to update breakdown' });
  }
};

const deleteBreakdown = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    await db.query('DELETE FROM breakdown_records WHERE breakdown_id = $1 AND hospital_id = $2', [id, hospitalId]);
    res.json({ message: 'Breakdown record deleted successfully' });
  } catch (error) {
    console.error('Error deleting breakdown:', error);
    res.status(500).json({ error: 'Failed to delete breakdown' });
  }
};

module.exports = {
  getAllBreakdown,
  createBreakdown,
  updateBreakdown,
  deleteBreakdown,
};
const db = require('../db/connection');

const getAllActions = async (req, res) => {
  try {
    const { hospitalId } = req;
    const result = await db.query(
      `SELECT a.*, c.capa_number 
       FROM capa_actions a 
       JOIN capa_records c ON a.capa_id = c.capa_id 
       WHERE a.hospital_id = $1 
       ORDER BY a.due_date`,
      [hospitalId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching CAPA actions:', error);
    res.status(500).json({ error: 'Failed to fetch CAPA actions' });
  }
};

const createAction = async (req, res) => {
  try {
    const { hospitalId } = req;
    const { capaId, actionDescription, assignedTo, dueDate } = req.body;
    
    const result = await db.query(
      `INSERT INTO capa_actions (hospital_id, capa_id, action_description, assigned_to, due_date) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [hospitalId, capaId, actionDescription, assignedTo, dueDate]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating CAPA action:', error);
    res.status(500).json({ error: 'Failed to create CAPA action' });
  }
};

const updateAction = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    const { capaId, actionDescription, assignedTo, dueDate, status, actualCompletionDate } = req.body;
    
    const result = await db.query(
      `UPDATE capa_actions SET capa_id = $1, action_description = $2, assigned_to = $3, 
       due_date = $4, status = $5, actual_completion_date = $6 
       WHERE action_id = $7 AND hospital_id = $8 
       RETURNING *`,
      [capaId, actionDescription, assignedTo, dueDate, status, actualCompletionDate, id, hospitalId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'CAPA action not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating CAPA action:', error);
    res.status(500).json({ error: 'Failed to update CAPA action' });
  }
};

const deleteAction = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    await db.query('DELETE FROM capa_actions WHERE action_id = $1 AND hospital_id = $2', [id, hospitalId]);
    res.json({ message: 'CAPA action deleted successfully' });
  } catch (error) {
    console.error('Error deleting CAPA action:', error);
    res.status(500).json({ error: 'Failed to delete CAPA action' });
  }
};

module.exports = {
  getAllActions,
  createAction,
  updateAction,
  deleteAction,
};
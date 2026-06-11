const db = require('../db/connection');

const getAllSchedules = async (req, res) => {
  try {
    const { hospitalId } = req;
    const result = await db.query(
      `SELECT s.*, d.name as department_name, t.template_name 
       FROM audit_schedule s 
       LEFT JOIN departments d ON s.department_id = d.department_id 
       LEFT JOIN audit_templates t ON s.template_id = t.template_id 
       WHERE s.hospital_id = $1 
       ORDER BY s.audit_date DESC`,
      [hospitalId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching audit schedules:', error);
    res.status(500).json({ error: 'Failed to fetch audit schedules' });
  }
};

const createSchedule = async (req, res) => {
  try {
    const { hospitalId } = req;
    const { auditName, auditDate, departmentId, templateId, frequency, assignedTo } = req.body;
    
    const result = await db.query(
      `INSERT INTO audit_schedule (hospital_id, department_id, template_id, audit_name, audit_date, frequency, assigned_to) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [hospitalId, departmentId, templateId, auditName, auditDate, frequency, assignedTo]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating audit schedule:', error);
    res.status(500).json({ error: 'Failed to create audit schedule' });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    const { auditName, auditDate, departmentId, templateId, frequency, assignedTo, status } = req.body;
    
    const result = await db.query(
      `UPDATE audit_schedule SET 
       audit_name = COALESCE($1, audit_name), 
       audit_date = COALESCE($2, audit_date), 
       department_id = COALESCE($3, department_id), 
       template_id = $4,
       frequency = $5, 
       assigned_to = $6, 
       status = COALESCE($7, status) 
       WHERE schedule_id = $8 AND hospital_id = $9 
       RETURNING *`,
      [auditName, auditDate, departmentId, templateId, frequency, assignedTo, status, id, hospitalId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Audit schedule not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating audit schedule:', error);
    res.status(500).json({ error: 'Failed to update audit schedule' });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    await db.query('DELETE FROM audit_schedule WHERE schedule_id = $1 AND hospital_id = $2', [id, hospitalId]);
    res.json({ message: 'Audit schedule deleted successfully' });
  } catch (error) {
    console.error('Error deleting audit schedule:', error);
    res.status(500).json({ error: 'Failed to delete audit schedule' });
  }
};

module.exports = {
  getAllSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
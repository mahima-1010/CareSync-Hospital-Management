const db = require('../db/connection');

const getAllAudits = async (req, res) => {
  try {
    const { hospitalId } = req;
    const result = await db.query(
      'SELECT * FROM radiation_audits WHERE hospital_id = $1 ORDER BY audit_date DESC',
      [hospitalId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching radiation audits:', error);
    res.status(500).json({ error: 'Failed to fetch radiation audits' });
  }
};

const createAudit = async (req, res) => {
  try {
    const { hospitalId } = req;
    const { auditDate, auditType, auditorName, findings, recommendations, complianceStatus, nextAuditDate } = req.body;
    
    const result = await db.query(
      `INSERT INTO radiation_audits (hospital_id, audit_date, audit_type, auditor_name, findings, recommendations, compliance_status, next_audit_date) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [hospitalId, auditDate, auditType, auditorName, findings, recommendations, complianceStatus, nextAuditDate]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating radiation audit:', error);
    res.status(500).json({ error: 'Failed to create radiation audit' });
  }
};

const updateAudit = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    const { auditDate, auditType, auditorName, findings, recommendations, complianceStatus, nextAuditDate } = req.body;
    
    const result = await db.query(
      `UPDATE radiation_audits SET audit_date = $1, audit_type = $2, auditor_name = $3, 
       findings = $4, recommendations = $5, compliance_status = $6, next_audit_date = $7 
       WHERE audit_id = $8 AND hospital_id = $9 
       RETURNING *`,
      [auditDate, auditType, auditorName, findings, recommendations, complianceStatus, nextAuditDate, id, hospitalId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Radiation audit not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating radiation audit:', error);
    res.status(500).json({ error: 'Failed to update radiation audit' });
  }
};

const deleteAudit = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    await db.query('DELETE FROM radiation_audits WHERE audit_id = $1 AND hospital_id = $2', [id, hospitalId]);
    res.json({ message: 'Radiation audit deleted successfully' });
  } catch (error) {
    console.error('Error deleting radiation audit:', error);
    res.status(500).json({ error: 'Failed to delete radiation audit' });
  }
};

module.exports = {
  getAllAudits,
  createAudit,
  updateAudit,
  deleteAudit,
};
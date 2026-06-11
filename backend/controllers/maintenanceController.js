const db = require('../db/connection');

const getAllMaintenance = async (req, res) => {
  try {
    const { hospitalId } = req;
    const result = await db.query(
      `SELECT m.*, e.equipment_name 
       FROM maintenance_records m 
       JOIN equipment_inventory e ON m.equipment_id = e.equipment_id 
       WHERE m.hospital_id = $1 
       ORDER BY m.maintenance_date DESC`,
      [hospitalId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching maintenance:', error);
    res.status(500).json({ error: 'Failed to fetch maintenance' });
  }
};

const createMaintenance = async (req, res) => {
  try {
    const { hospitalId } = req;
    const { equipmentId, maintenanceDate, maintenanceType, description, performedBy, cost, nextMaintenanceDate } = req.body;
    
    const result = await db.query(
      `INSERT INTO maintenance_records (hospital_id, equipment_id, maintenance_date, maintenance_type, description, performed_by, cost, next_maintenance_date) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [hospitalId, equipmentId, maintenanceDate, maintenanceType, description, performedBy, cost, nextMaintenanceDate]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating maintenance:', error);
    res.status(500).json({ error: 'Failed to create maintenance' });
  }
};

const updateMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    const { equipmentId, maintenanceDate, maintenanceType, description, performedBy, cost, nextMaintenanceDate, status } = req.body;
    
    const result = await db.query(
      `UPDATE maintenance_records SET equipment_id = $1, maintenance_date = $2, maintenance_type = $3, 
       description = $4, performed_by = $5, cost = $6, next_maintenance_date = $7, status = $8 
       WHERE maintenance_id = $9 AND hospital_id = $10 
       RETURNING *`,
      [equipmentId, maintenanceDate, maintenanceType, description, performedBy, cost, nextMaintenanceDate, status, id, hospitalId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Maintenance record not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating maintenance:', error);
    res.status(500).json({ error: 'Failed to update maintenance' });
  }
};

const deleteMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    await db.query('DELETE FROM maintenance_records WHERE maintenance_id = $1 AND hospital_id = $2', [id, hospitalId]);
    res.json({ message: 'Maintenance record deleted successfully' });
  } catch (error) {
    console.error('Error deleting maintenance:', error);
    res.status(500).json({ error: 'Failed to delete maintenance' });
  }
};

module.exports = {
  getAllMaintenance,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
};
const db = require('../db/connection');

const getAllEquipment = async (req, res) => {
  try {
    const { hospitalId } = req;
    const result = await db.query(
      `SELECT e.*, d.name as department_name 
       FROM equipment_inventory e 
       LEFT JOIN departments d ON e.department_id = d.department_id 
       WHERE e.hospital_id = $1 
       ORDER BY e.equipment_name`,
      [hospitalId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
};

const createEquipment = async (req, res) => {
  try {
    const { hospitalId } = req;
    const { equipmentName, serialNumber, manufacturer, model, purchaseDate, warrantyExpiry, departmentId, location } = req.body;
    
    const result = await db.query(
      `INSERT INTO equipment_inventory (hospital_id, department_id, equipment_name, serial_number, manufacturer, model, purchase_date, warranty_expiry, location) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
      [hospitalId, departmentId, equipmentName, serialNumber, manufacturer, model, purchaseDate, warrantyExpiry, location]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating equipment:', error);
    res.status(500).json({ error: 'Failed to create equipment' });
  }
};

const updateEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    const { equipmentName, serialNumber, manufacturer, model, purchaseDate, warrantyExpiry, departmentId, location, status } = req.body;
    
    const result = await db.query(
      `UPDATE equipment_inventory SET equipment_name = $1, serial_number = $2, manufacturer = $3, 
       model = $4, purchase_date = $5, warranty_expiry = $6, department_id = $7, location = $8, status = $9 
       WHERE equipment_id = $10 AND hospital_id = $11 
       RETURNING *`,
      [equipmentName, serialNumber, manufacturer, model, purchaseDate, warrantyExpiry, departmentId, location, status, id, hospitalId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Equipment not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating equipment:', error);
    res.status(500).json({ error: 'Failed to update equipment' });
  }
};

const deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const { hospitalId } = req;
    await db.query('DELETE FROM equipment_inventory WHERE equipment_id = $1 AND hospital_id = $2', [id, hospitalId]);
    res.json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    console.error('Error deleting equipment:', error);
    res.status(500).json({ error: 'Failed to delete equipment' });
  }
};

module.exports = {
  getAllEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
};
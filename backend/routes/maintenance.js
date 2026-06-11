const express = require('express');
const {
  getAllMaintenance,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
} = require('../controllers/maintenanceController');
const { setDefaultHospital } = require('../middleware/hospitalContext');

const router = express.Router();

router.get('/', setDefaultHospital, getAllMaintenance);
router.post('/', setDefaultHospital, createMaintenance);
router.put('/:id', setDefaultHospital, updateMaintenance);
router.delete('/:id', setDefaultHospital, deleteMaintenance);

module.exports = router;
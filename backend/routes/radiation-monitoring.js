const express = require('express');
const {
  getAllMonitoring,
  createMonitoring,
  updateMonitoring,
  deleteMonitoring,
} = require('../controllers/radiationMonitoringController');
const { setDefaultHospital } = require('../middleware/hospitalContext');

const router = express.Router();

router.get('/', setDefaultHospital, getAllMonitoring);
router.post('/', setDefaultHospital, createMonitoring);
router.put('/:id', setDefaultHospital, updateMonitoring);
router.delete('/:id', setDefaultHospital, deleteMonitoring);

module.exports = router;
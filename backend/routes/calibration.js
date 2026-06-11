const express = require('express');
const {
  getAllCalibration,
  createCalibration,
  updateCalibration,
  deleteCalibration,
} = require('../controllers/calibrationController');
const { setDefaultHospital } = require('../middleware/hospitalContext');

const router = express.Router();

router.get('/', setDefaultHospital, getAllCalibration);
router.post('/', setDefaultHospital, createCalibration);
router.put('/:id', setDefaultHospital, updateCalibration);
router.delete('/:id', setDefaultHospital, deleteCalibration);

module.exports = router;
const express = require('express');
const {
  getAllSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} = require('../controllers/auditScheduleController');
const { setDefaultHospital } = require('../middleware/hospitalContext');

const router = express.Router();

router.get('/', setDefaultHospital, getAllSchedules);
router.post('/', setDefaultHospital, createSchedule);
router.put('/:id', setDefaultHospital, updateSchedule);
router.delete('/:id', setDefaultHospital, deleteSchedule);

module.exports = router;
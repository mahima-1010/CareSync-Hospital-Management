const express = require('express');
const {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
} = require('../controllers/staffController');
const { setDefaultHospital } = require('../middleware/hospitalContext');

const router = express.Router();

router.get('/', setDefaultHospital, getAllStaff);
router.get('/:id', setDefaultHospital, getStaffById);
router.post('/', setDefaultHospital, createStaff);
router.put('/:id', setDefaultHospital, updateStaff);
router.delete('/:id', setDefaultHospital, deleteStaff);

module.exports = router;
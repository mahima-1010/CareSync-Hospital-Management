const express = require('express');
const {
  getAllDepartments,
  createDepartment,
  deleteDepartment,
} = require('../controllers/departmentController');
const { setDefaultHospital } = require('../middleware/hospitalContext');

const router = express.Router();

router.get('/', setDefaultHospital, getAllDepartments);
router.post('/', setDefaultHospital, createDepartment);
router.delete('/:id', setDefaultHospital, deleteDepartment);

module.exports = router;
const express = require('express');
const {
  getAllBreakdown,
  createBreakdown,
  updateBreakdown,
  deleteBreakdown,
} = require('../controllers/breakdownController');
const { setDefaultHospital } = require('../middleware/hospitalContext');

const router = express.Router();

router.get('/', setDefaultHospital, getAllBreakdown);
router.post('/', setDefaultHospital, createBreakdown);
router.put('/:id', setDefaultHospital, updateBreakdown);
router.delete('/:id', setDefaultHospital, deleteBreakdown);

module.exports = router;
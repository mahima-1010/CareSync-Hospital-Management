const express = require('express');
const {
  getAllCAPA,
  createCAPA,
  updateCAPA,
  deleteCAPA,
} = require('../controllers/CAPAController');
const { setDefaultHospital } = require('../middleware/hospitalContext');

const router = express.Router();

router.get('/', setDefaultHospital, getAllCAPA);
router.post('/', setDefaultHospital, createCAPA);
router.put('/:id', setDefaultHospital, updateCAPA);
router.delete('/:id', setDefaultHospital, deleteCAPA);

module.exports = router;
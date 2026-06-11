const express = require('express');
const {
  getAllHospitals,
  getHospitalById,
  createHospital,
} = require('../controllers/hospitalController');

const router = express.Router();

router.get('/', getAllHospitals);
router.get('/:id', getHospitalById);
router.post('/', createHospital);

module.exports = router;
const express = require('express');
const {
  getAllTraining,
  createTraining,
  updateTraining,
  deleteTraining,
} = require('../controllers/trainingController');
const { setDefaultHospital } = require('../middleware/hospitalContext');

const router = express.Router();

router.get('/', setDefaultHospital, getAllTraining);
router.post('/', setDefaultHospital, createTraining);
router.put('/:id', setDefaultHospital, updateTraining);
router.delete('/:id', setDefaultHospital, deleteTraining);

module.exports = router;
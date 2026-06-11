const express = require('express');
const {
  getAllVerification,
  createVerification,
  updateVerification,
  deleteVerification,
} = require('../controllers/verificationController');
const { setDefaultHospital } = require('../middleware/hospitalContext');

const router = express.Router();

router.get('/', setDefaultHospital, getAllVerification);
router.post('/', setDefaultHospital, createVerification);
router.put('/:id', setDefaultHospital, updateVerification);
router.delete('/:id', setDefaultHospital, deleteVerification);

module.exports = router;
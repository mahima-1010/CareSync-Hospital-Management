const express = require('express');
const {
  getAllEvidence,
  uploadEvidence,
  deleteEvidence,
} = require('../controllers/evidenceController');
const { setDefaultHospital } = require('../middleware/hospitalContext');

const router = express.Router();

router.get('/', setDefaultHospital, getAllEvidence);
router.post('/upload', setDefaultHospital, uploadEvidence);
router.delete('/:id', setDefaultHospital, deleteEvidence);

module.exports = router;
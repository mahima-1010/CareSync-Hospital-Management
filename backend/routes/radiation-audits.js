const express = require('express');
const {
  getAllAudits,
  createAudit,
  updateAudit,
  deleteAudit,
} = require('../controllers/radiationAuditController');
const { setDefaultHospital } = require('../middleware/hospitalContext');

const router = express.Router();

router.get('/', setDefaultHospital, getAllAudits);
router.post('/', setDefaultHospital, createAudit);
router.put('/:id', setDefaultHospital, updateAudit);
router.delete('/:id', setDefaultHospital, deleteAudit);

module.exports = router;
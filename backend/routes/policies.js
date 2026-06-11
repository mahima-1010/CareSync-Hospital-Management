const express = require('express');
const {
  getAllPolicies,
  getPolicyById,
  createPolicy,
  updatePolicy,
  deletePolicy,
} = require('../controllers/policyController');
const { setDefaultHospital } = require('../middleware/hospitalContext');

const router = express.Router();

router.get('/', setDefaultHospital, getAllPolicies);
router.get('/:id', setDefaultHospital, getPolicyById);
router.post('/', setDefaultHospital, createPolicy);
router.put('/:id', setDefaultHospital, updatePolicy);
router.delete('/:id', setDefaultHospital, deletePolicy);

module.exports = router;
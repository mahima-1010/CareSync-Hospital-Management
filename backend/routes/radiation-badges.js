const express = require('express');
const {
  getAllBadges,
  createBadge,
  updateBadge,
  deleteBadge,
} = require('../controllers/radiationBadgeController');
const { setDefaultHospital } = require('../middleware/hospitalContext');

const router = express.Router();

router.get('/', setDefaultHospital, getAllBadges);
router.post('/', setDefaultHospital, createBadge);
router.put('/:id', setDefaultHospital, updateBadge);
router.delete('/:id', setDefaultHospital, deleteBadge);

module.exports = router;
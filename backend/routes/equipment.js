const express = require('express');
const {
  getAllEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} = require('../controllers/equipmentController');
const { setDefaultHospital } = require('../middleware/hospitalContext');

const router = express.Router();

router.get('/', setDefaultHospital, getAllEquipment);
router.post('/', setDefaultHospital, createEquipment);
router.put('/:id', setDefaultHospital, updateEquipment);
router.delete('/:id', setDefaultHospital, deleteEquipment);

module.exports = router;
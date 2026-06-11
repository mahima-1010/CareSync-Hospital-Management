const express = require('express');
const {
  getAllActions,
  createAction,
  updateAction,
  deleteAction,
} = require('../controllers/CAPAActionController');
const { setDefaultHospital } = require('../middleware/hospitalContext');

const router = express.Router();

router.get('/', setDefaultHospital, getAllActions);
router.post('/', setDefaultHospital, createAction);
router.put('/:id', setDefaultHospital, updateAction);
router.delete('/:id', setDefaultHospital, deleteAction);

module.exports = router;
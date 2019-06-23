const express = require('express');
const router = express.Router();

const SchoolClassController = require('../controllers/SchoolClassController');

router.get('/', SchoolClassController.getAll);

router.get('/:id', SchoolClassController.getByID);

router.post('/', SchoolClassController.create);

router.put('/:id', SchoolClassController.update);

router.delete('/:id', SchoolClassController.delete);

module.exports = router;
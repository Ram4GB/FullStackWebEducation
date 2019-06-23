const express = require('express');
const router = express.Router();

const StudentController = require('../controllers/StudentController');

router.post('/students', StudentController.excelToJSON);



module.exports = router;
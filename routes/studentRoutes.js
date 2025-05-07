const express = require('express');
const router = express.Router();
const { uploadStudentData, viewStudentData } = require('../controllers/studentController');

router.post('/upload', uploadStudentData);         // <== THIS MUST EXIST
router.get('/view/:ipfsHash', viewStudentData);

module.exports = router;

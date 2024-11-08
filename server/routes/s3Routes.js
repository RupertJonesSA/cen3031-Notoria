const express = require('express');
const router = express.Router();
const {uploadS3, listS3, deleteS3, downloadS3} = require('../constrollers/s3Controller');

router.post('/upload', uploadS3);
router.get('/list', listS3);
router.get('/download', downloadS3);
router.delete('/delete', deleteS3);

module.exports = router;
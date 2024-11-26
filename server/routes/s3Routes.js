const express = require('express');
const router = express.Router();
const {uploadS3, listS3, getS3, deleteS3, downloadS3, saveS3} = require('../constrollers/s3Controller');

router.get('/getFile', getS3);
router.post('/upload', uploadS3);
router.get('/list', listS3);
router.get('/download', downloadS3);
router.delete('/delete', deleteS3);
router.post('/save', saveS3);

module.exports = router;

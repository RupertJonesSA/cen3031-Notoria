const express = require('express');
const router = express.Router();
const { AISummary } = require('../constrollers/gptController');

router.post('/summary', AISummary);

module.exports = router;
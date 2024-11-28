const express = require("express");
const router = express.Router();
const { AISummary } = require("../controllers/gptController");

router.post("/summary", AISummary);

module.exports = router;

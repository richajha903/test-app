const express = require("express");

const router = express.Router();

const {
  getQuestions,
  validateAnswer,
} = require("../controllers/question-controller");

// GET /questions
router.get("/", getQuestions);

// POST /questions/validate-answer
router.post("/validate-answer", validateAnswer);

module.exports = router;

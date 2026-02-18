const express = require("express");
const router = express.Router();

const { showAllQuiz, showQuiz, showAttempts } = require("../controllers/quizController");
const authMiddleware = require("../middleware/authMiddleware");

// apply middleware to all routes
router.use(authMiddleware);

// routes
router.get("/", showAllQuiz);
router.get("/:quiz_id/results", showAttempts); // specific first
router.get("/:quiz_id", showQuiz);             // dynamic last

module.exports = router;
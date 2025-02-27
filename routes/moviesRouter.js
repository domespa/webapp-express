const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

// Index
router.get("/", movieController.index);

// Show
router.get("/:id", movieController.show);

// Store review
router.post("/:id/reviews", movieController.storeReview);

module.exports = router;

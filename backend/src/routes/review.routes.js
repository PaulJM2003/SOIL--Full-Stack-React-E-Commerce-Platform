const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");

router.post("/", reviewController.createReview);
router.get("/:product_id", reviewController.getReviews);
router.put("/:review_id", reviewController.updateReview);
router.delete("/:review_id", reviewController.deleteReview);

module.exports = router;

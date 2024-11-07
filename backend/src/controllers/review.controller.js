const db = require("../database");
const Review = db.Review;

exports.createReview = async (req, res) => {
  const { user_id, product_id, rating, review_text } = req.body;
  console.log("Creating review with data:", { user_id, product_id, rating, review_text }); // Debug

  try {
    const existingReview = await Review.findOne({ where: { user_id, product_id } });
    if (existingReview) {
      console.log("Review already exists for this user and product."); // Debug
      return res.status(400).json({ message: "User has already reviewed this product." });
    }

    const review = await Review.create({ user_id, product_id, rating, review_text });
    console.log("Review created successfully:", review); // Debug
    res.status(201).json(review);
  } catch (error) {
    console.error("Error creating review:", error); // Debug
    res.status(500).json({ message: "Failed to create review", error });
  }
};

exports.getReviews = async (req, res) => {
const { product_id } = req.params;
console.log("Fetching reviews for product_id:", product_id); // Debug

try {
  const reviews = await Review.findAll({ where: { product_id } });
  console.log("Fetched reviews:", reviews); // Debug
  res.status(200).json(reviews);
} catch (error) {
  console.error("Failed to fetch reviews:", error); // Debug
  res.status(500).json({ message: "Failed to fetch reviews", error });
}
};


exports.updateReview = async (req, res) => {
  const { review_id } = req.params;
  const { rating, review_text } = req.body;

  try {
    const review = await Review.findByPk(review_id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.rating = rating;
    review.review_text = review_text;

    await review.save();

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Failed to update review", error });
  }
};

exports.deleteReview = async (req, res) => {
  const { review_id } = req.params;

  try {
    const review = await Review.findByPk(review_id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await review.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review", error });
  }
};
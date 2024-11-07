const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLFloat } = require("graphql");
const db = require("../database");

const reviewType = new GraphQLObjectType({
  name: "Review",
  fields: {
    review_id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    product_id: { type: GraphQLInt },
    rating: { type: GraphQLInt },
    review_text: { type: GraphQLString },
  },
});

const createReview = async (parent, args) => {
  try {
    console.log("Creating review:", args);
    const existingReview = await db.Review.findOne({ where: { user_id: args.user_id, product_id: args.product_id } });
    if (existingReview) throw new Error("User has already reviewed this product.");
    const review = await db.Review.create(args);
    console.log("Review created:", review);
    return review;
  } catch (error) {
    console.error("Error in createReview:", error);
    throw new Error("Failed to create review.");
  }
};

const getReviews = async () => {
  try {
    console.log("Fetching all reviews...");
    const reviews = await db.Review.findAll();
    console.log("Fetched reviews:", reviews);
    return reviews;
  } catch (error) {
    console.error("Error in getReviews:", error);
    throw new Error("Failed to fetch reviews.");
  }
};

const getReviewById = async (parent, args) => {
  try {
    console.log("Fetching review by ID:", args.id);
    const review = await db.Review.findByPk(args.id);
    console.log("Fetched review:", review);
    return review;
  } catch (error) {
    console.error("Error in getReviewById:", error);
    throw new Error("Failed to fetch review.");
  }
};

module.exports = {
  reviewType,
  createReview,
  getReviews,
  getReviewById,
};

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
    const existingReview = await db.Review.findOne({ where: { user_id: args.user_id, product_id: args.product_id } });
    if (existingReview) throw new Error("User has already reviewed this product.");
    return await db.Review.create(args);
  } catch (error) {
    console.error("Error in createReview:", error);
    throw new Error("Failed to create review.");
  }
};

const getReviews = async () => {
  try {
    return await db.Review.findAll();
  } catch (error) {
    console.error("Error in getReviews:", error);
    throw new Error("Failed to fetch reviews.");
  }
};

const getReviewById = async (parent, args) => {
  try {
    return await db.Review.findByPk(args.id);
  } catch (error) {
    console.error("Error in getReviewById:", error);
    throw new Error("Failed to fetch review.");
  }
};

const getLatestReview = async () => {
  try {
    return await db.Review.findOne({ order: [['createdAt', 'DESC']] });
  } catch (error) {
    console.error("Error in getLatestReview:", error);
    throw new Error("Failed to fetch latest review.");
  }
};

const getReviewsByProduct = async () => {
  try {
    const results = await db.Review.findAll({
      attributes: [
        'product_id',
        [db.sequelize.fn('COUNT', db.sequelize.col('product_id')), 'review_count'],
        [db.sequelize.fn('AVG', db.sequelize.col('rating')), 'avg_rating']
      ],
      group: ['product_id']
    });
    return results;
  } catch (error) {
    console.error("Error in getReviewsByProduct:", error);
    throw new Error("Failed to fetch reviews by product.");
  }
};

const reviewByProductType = new GraphQLObjectType({
  name: "ReviewByProduct",
  fields: {
    product_id: { type: GraphQLInt },
    review_count: { type: GraphQLInt },
    avg_rating: { type: GraphQLFloat },
  },
});

const updateReview = async (parent, args) => {
  try {
    const review = await db.Review.findByPk(args.review_id);
    if (!review) throw new Error("Review not found");
    await review.update(args);
    return review;
  } catch (error) {
    console.error("Error in updateReview:", error);
    throw new Error("Failed to update review.");
  }
};

const deleteReview = async (parent, args) => {
  try {
    const review = await db.Review.findByPk(args.review_id);
    if (!review) throw new Error("Review not found");

    // Instead of deleting, update the review text
    await review.update({ review_text: "[**** This review has been deleted by the admin ***]" });

    return review;
  } catch (error) {
    console.error("Error in deleteReview:", error);
    throw new Error("Failed to delete review.");
  }
};
const getLatestReviews = async () => {
  try {
    return await db.Review.findAll({
      limit: 2,
      order: [['createdAt', 'DESC']],
    });
  } catch (error) {
    console.error("Error in getLatestReviews:", error);
    throw new Error("Failed to fetch latest reviews.");
  }
};

module.exports = {
  reviewType,
  reviewByProductType,
  createReview,
  getReviews,
  getReviewById,
  getLatestReviews,
  getReviewsByProduct,
  updateReview,
  deleteReview,
};



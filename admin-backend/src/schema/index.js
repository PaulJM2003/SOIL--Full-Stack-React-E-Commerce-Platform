const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const userSchema = require("./user.schema");
const reviewSchema = require("./review.schema");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(userSchema.userType),
      resolve: userSchema.getAllUsers,
    },
    user: {
      type: userSchema.userType,
      args: { id: { type: GraphQLInt } },
      resolve: userSchema.getUserById,
    },
    reviews: {
      type: new GraphQLList(reviewSchema.reviewType),
      resolve: reviewSchema.getReviews,
    },
    review: {
      type: reviewSchema.reviewType,
      args: { id: { type: GraphQLInt } },
      resolve: reviewSchema.getReviewById,
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: userSchema.userType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
      },
      resolve: userSchema.createUser,
    },
    deleteUser: {
      type: userSchema.userType,
      args: { id: { type: GraphQLInt } },
      resolve: userSchema.deleteUser,
    },
    createReview: {
      type: reviewSchema.reviewType,
      args: {
        user_id: { type: GraphQLInt },
        product_id: { type: GraphQLInt },
        rating: { type: GraphQLInt },
        review_text: { type: GraphQLString },
      },
      resolve: reviewSchema.createReview,
    },
    deleteReview: {
      type: reviewSchema.reviewType,
      args: { review_id: { type: GraphQLInt } },
      resolve: reviewSchema.deleteReview,
    },
  },
});

// Export only the GraphQL schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

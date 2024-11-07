import axios from "axios";
const API_HOST = "http://localhost:4000/graphql";

// Helper function to send GraphQL requests with error handling
async function sendGraphQLRequest(query, variables) {
  try {
    const response = await axios.post(API_HOST, {
      query,
      variables,
    });
    return response.data.data;
  } catch (error) {
    console.error("GraphQL Request Error:", error);
    throw new Error("Failed to fetch data from the server.");
  }
}

// Function to fetch all users
async function getUsers() {
  const query = `
    query {
      users {
        SID
        username
        email
        Name
      }
    }
  `;
  const data = await sendGraphQLRequest(query);
  return data.users;
}

// Function to fetch a user by ID
async function getUserById(id) {
  const query = `
    query User($id: Int!) {
      user(id: $id) {
        SID
        username
        email
        Name
      }
    }
  `;
  const variables = { id: parseInt(id) };
  const data = await sendGraphQLRequest(query, variables);
  return data.user;
}

// Function to fetch all reviews
async function getReviews() {
  const query = `
    query {
      reviews {
        review_id
        user_id
        product_id
        rating
        review_text
      }
    }
  `;
  const data = await sendGraphQLRequest(query);
  return data.reviews;
}

// Function to fetch a review by ID
async function getReviewById(id) {
  const query = `
    query Review($id: Int!) {
      review(id: $id) {
        review_id
        user_id
        product_id
        rating
        review_text
      }
    }
  `;
  const variables = { id: parseInt(id) };
  const data = await sendGraphQLRequest(query, variables);
  return data.review;
}

// Function to delete a user by ID
async function deleteUser(id) {
  const query = `
    mutation DeleteUser($id: Int!) {
      deleteUser(id: $id) {
        SID
      }
    }
  `;
  const variables = { id: parseInt(id) };
  const data = await sendGraphQLRequest(query, variables);
  return data.deleteUser;
}

// Function to delete a review by ID (soft delete by updating review text)
async function deleteReview(id) {
  const query = `
    mutation DeleteReview($review_id: Int!) {
      deleteReview(review_id: $review_id) {
        review_id
        review_text
      }
    }
  `;
  const variables = { review_id: parseInt(id) };
  const data = await sendGraphQLRequest(query, variables);
  return data.deleteReview;
}

// Function to fetch the total number of users
async function getTotalUsers() {
  const query = `
    query {
      users {
        SID
      }
    }
  `;
  const data = await sendGraphQLRequest(query);
  return data.users.length;
}

// Function to fetch the total number of reviews
async function getTotalReviews() {
  const query = `
    query {
      reviews {
        review_id
      }
    }
  `;
  const data = await sendGraphQLRequest(query);
  return data.reviews.length;
}

// Function to fetch the latest two reviews
async function getLatestReviews() {
  const query = `
    query {
      latestReviews {
        review_id
        user_id
        product_id
        rating
        review_text
      }
    }
  `;
  const data = await sendGraphQLRequest(query);
  return data.latestReviews;
}

// Function to get reviews grouped by product with count and average rating
async function getReviewsByProduct() {
  const query = `
    query {
      reviewsByProduct {
        product_id
        review_count
        avg_rating
      }
    }
  `;
  const data = await sendGraphQLRequest(query);
  return data.reviewsByProduct;
}

export {
  getUsers,
  getUserById,
  getReviews,
  deleteUser,
  getReviewById,
  deleteReview,
  getTotalUsers,
  getTotalReviews,
  getLatestReviews,
  getReviewsByProduct,
};


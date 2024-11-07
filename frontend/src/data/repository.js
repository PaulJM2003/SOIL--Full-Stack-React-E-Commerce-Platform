// Importing the axios library for making HTTP requests
import axios from "axios";
// Define the base URL for the API
const API_HOST = "http://localhost:4000";
// Define a key for storing user data in local storage
const USER_KEY = "user";
/**
 * Function to authenticate a user by sending their username and password to the server.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Object} - The authenticated user data.
 */
async function confID(username, password) {
  // Send a POST request to the login endpoint with the username and password
  const response = await axios.post(API_HOST + "/api/profiles/login", {
    username,
    password,
  });
  // Get the user data from the response
  const user = response.data;
  // If the user data is not null, save it to local storage
  if (user !== null) personSet(user);
  // Return the user data
  return user;
}
/**
 * Function to create a new user account by sending user data to the server.
 * @param {Object} user - The user data to be created.
 * @returns {Object} - The created user data.
 * @throws {Error} - Throws an error if user creation fails.
 */
async function makeAcc(user) {
  try {
    // Send a POST request to the profiles endpoint with the user data
    const response = await axios.post(`${API_HOST}/api/profiles`, user);
    // Return the created user data
    return response.data;
  } catch (error) {
    // If there is a validation error (status 400), throw a specific error message
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data.message);
    }
    // For other errors, throw a generic user creation error message
    throw new Error("User creation error has occurred");
  }
}

/**
 * Function to update an existing user account by sending updated data to the server.
 * @param {string} userId - The ID of the user to be updated.
 * @param {Object} userData - The updated user data.
 * @returns {Object} - The updated user data.
 * @throws {Error} - Throws an error if user update fails.
 */
async function Accupdate(userId, userData) {
  try {
    // Send a PUT request to the specific user's endpoint with the updated data
    const response = await axios.put(
      `${API_HOST}/api/profiles/${userId}`,
      userData
    );

    // Return the updated user data
    return response.data;
  } catch (error) {
    // If the user is not found (status 404), throw a specific error message
    if (error.response && error.response.status === 404) {
      throw new Error("USER HAS NOT BEEN FOUND");
    }
    // For other errors, throw a generic user update error message
    throw new Error("User update error has occurred");
  }
}

/**
 * Function to find a user by their ID.
 * @param {string} id - The ID of the user to be found.
 * @returns {Object} - The found user data.
 */
async function IDfind(id) {
  // Send a GET request to the specific user's endpoint to retrieve their data
  const response = await axios.get(API_HOST + `/api/profiles/${id}`);
  return response.data;
}

/**
 * Function to delete a user account by their ID.
 * @param {string} id - The ID of the user to be deleted.
 * @returns {Object} - The response data from the delete operation.
 */
async function Accdisposal(id) {
  // Send a DELETE request to the specific user's endpoint to delete their account
  const response = await axios.delete(API_HOST + `/api/profiles/${id}`);
  return response.data;
}

/**
 * Function to verify a user's password.
 * @param {string} userId - The ID of the user.
 * @param {string} password - The password to be verified.
 * @returns {Object} - The response data from the password verification.
 */
async function confpsswd(userId, password) {
  // Send a POST request to the password verification endpoint with the user ID and password
  const response = await axios.post(API_HOST + "/api/profiles/conf-psswd", {
    userId,
    password,
  });
  return response.data;
}

/**
 * Function to save user data to local storage.
 * @param {Object} user - The user data to be saved.
 */
function personSet(user) {
  // Save the user data to local storage as a JSON string
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Function to remove user data from local storage.
 */
function personRemoval() {
  // Remove the user data from local storage
  localStorage.removeItem(USER_KEY);
}

/**
 * Function to retrieve user data from local storage.
 * @returns {Object|null} - The retrieved user data, or null if not found.
 */
function personGet() {
  // Retrieve the user data from local storage and parse it as a JSON object
  return JSON.parse(localStorage.getItem(USER_KEY));
}

/**
 * Function to update a user's password.
 * @param {string} userId - The ID of the user.
 * @param {string} currentPassword - The current password of the user.
 * @param {string} newPassword - The new password to be set.
 * @returns {Object} - The response data from the password update operation.
 */
async function updatepsswd(userId, currentPassword, newPassword) {
  // Send a PUT request to the update-psswd endpoint with the current and new passwords
  const response = await axios.put(
    `${API_HOST}/api/profiles/${userId}/update-psswd`,
    {
      currentPassword,
      newPassword,
    }
  );
  return response.data;
}

// New functions for reviews

async function createReview(reviewData) {
  const response = await axios.post(`${API_HOST}/api/reviews`, reviewData);
  return response.data;
}

async function getReviews(productId) {
  const response = await axios.get(`${API_HOST}/api/reviews/${productId}`);
  return response.data;
}

async function updateReview(reviewId, reviewData) {
  const response = await axios.put(`${API_HOST}/api/reviews/${reviewId}`, reviewData);
  return response.data;
}

async function deleteReview(reviewId) {
  const response = await axios.delete(`${API_HOST}/api/reviews/${reviewId}`);
  return response.data;
}

export {
  confID,
  IDfind,
  makeAcc,
  Accupdate,
  Accdisposal,
  personGet,
  personSet,
  personRemoval,
  confpsswd,
  updatepsswd,
  createReview,
  getReviews,
  updateReview,
  deleteReview
};

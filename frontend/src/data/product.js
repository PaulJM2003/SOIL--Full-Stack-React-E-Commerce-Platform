// Importing the axios library for making HTTP requests
import axios from "axios";
// Define the base URL for the API
const API_HOST = "http://localhost:4000";

// Function to fetch all products from the server
export async function getAllProducts() {
  // Send a GET request to the products endpoint
  const response = await axios.get(API_HOST + "/api/products");
  // Return the product data from the response
  return response.data;
}

export async function getEnrichedProductById(productId) {
  // Send a GET request to the products endpoint
  const response = await axios.get(API_HOST + "/api/products/fullProduct/" + productId);
  // Return the product data from the response
  return response.data;
}
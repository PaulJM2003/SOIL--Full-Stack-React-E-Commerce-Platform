// Load environment variables from a .env file into process.env
require("dotenv").config();
// Import the Express framework
const express = require("express");
// Import the CORS middleware to enable Cross-Origin Resource Sharing
const cors = require("cors");
// Import the database configuration and synchronization function
const db = require("./src/database");
// Synchronize the database models with the database
db.sync();
// Create a new Express application
const app = express();
// Middleware to parse incoming JSON requests
app.use(express.json());
// Middleware to enable CORS
app.use(cors({
  origin: "*"
}));
// Define a route for the root URL
app.get("/", (req, res) => {
  // Send a JSON response indicating that the server is running
  res.json({ message: "The Server is Running" });
});
// Import the user routes from the routes module
const userRoutes = require("./src/routes/user.routes");
// Use the user routes for any requests that start with /api/profiles
app.use("/api/profiles", userRoutes);
const reviewRoutes = require("./src/routes/review.routes");
// Use the review routes for any requests that start with /api/reviews
app.use("/api/reviews", reviewRoutes);

// Use the product routes for any requests that start with /api/products
const productRoutes = require("./src/routes/product.routes");
app.use("/api/products", productRoutes);

// Use the order routes for any requests that start with /api/orders
const orderRoutes = require("./src/routes/order.routes");
app.use("/api/orders", orderRoutes);

// Use the cart routes for any requests that start with /api/cart
const cartRoutes = require("./src/routes/cart.routes");
app.use("/api/cart", cartRoutes);

// Define the port the server will listen on, defaulting to 4000 if not specified in the environment variables
const PORT = process.env.PORT || 4000;
// Start the server and listen on the specified port
app.listen(PORT, () => {
  // Log a message to the console indicating that the server is running
  console.log(`The Server is up and running: port ${PORT}.`);
});
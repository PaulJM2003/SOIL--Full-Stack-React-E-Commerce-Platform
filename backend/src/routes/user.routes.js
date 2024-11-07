// Import the Express framework
const express = require("express");

// Import the user controller which contains the logic for handling user-related requests
const profiles = require("../controllers/user.controller"); // Adjust the path as necessary

// Create a new router object
const router = express.Router();

// Define the routes and map them to controller functions

// Route to get all profiles
// This route will call the findALL function in the user controller to retrieve all user profiles
router.get("/", profiles.findALL);

// Route to get a single user by ID
// This route will call the IDfind function in the user controller to retrieve a specific user by their ID
router.get("/:id", profiles.IDfind);

// Route for user login
// This route will call the login function in the user controller to authenticate a user
router.post("/login", profiles.login);

// Route to create a new user
// This route will call the makeAcc function in the user controller to create a new user account
router.post("/", profiles.makeAcc);

// Route to update a user
// This route will call the AccUpdate function in the user controller to update an existing user's details
router.put("/:id", profiles.AccUpdate);

// Route to delete a user
// This route will call the Accdisposal function in the user controller to delete a user by their ID
router.delete("/:id", profiles.Accdisposal);

// Route to confirm the user's password
// This route will call the confpsswd function in the user controller to verify the user's password
router.post("/conf-psswd", profiles.confpsswd);

// Route to change a user's password
// This route will call the updatepsswd function in the user controller to update a user's password
router.put("/:id/update-psswd", profiles.updatepsswd);

// Export the router object to be used in other parts of the application
module.exports = router;

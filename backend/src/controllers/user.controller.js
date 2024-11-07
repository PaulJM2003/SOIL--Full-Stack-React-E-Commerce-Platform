// Import the database configuration
const db = require("../database"); // Ensure the path is correct

// Import the argon2 library for password hashing
const argon2 = require("argon2");

// Function to update a user in the database
exports.AccUpdate = async (req, res) => {
  const id = req.params.id; // Get the user ID from the request parameters
  try {
    // Find the user by primary key (ID)
    const user = await db.user.findByPk(id);
    if (!user) {
      // If user is not found, send a 404 response
      return res.status(404).send({ message: "Profile has not been found!" });
    }
    // Update the user with the data from the request body
    const updatedUser = await user.update(req.body);
    // Send the updated user data as JSON response
    res.json(updatedUser);
  } catch (error) {
    // Handle any errors that occur during the update process
    res.status(500).send({ message: "Error while updating the profile with id=" + id });
  }
};

// Function to select a user by ID from the database
exports.IDfind = async (req, res) => {
  try {
    // Find the user by primary key (ID)
    const user = await db.user.findByPk(req.params.id);
    if (user) {
      // If user is found, send the user data as JSON response
      res.json(user);
    } else {
      // If user is not found, send a 404 response
      res.status(404).send({ message: "The user cannot be found" });
    }
  } catch (error) {
    // Handle any errors that occur during the fetch process
    res.status(500).send({ message: "Error while fetching the user" });
  }
};

// Function for user login
exports.login = async (req, res) => {
  try {
    // Find the user by username
    const user = await db.user.findOne({
      where: { username: req.body.username },
    });
    // Verify the user's password
    if (user && (await argon2.verify(user.psswd, req.body.password))) {
      // If password is correct, send the user data as JSON response
      res.json(user);
    } else {
      // If credentials are invalid, send a 401 response
      res.status(401).send({ message: "Invalid entry" });
    }
  } catch (error) {
    // Handle any errors that occur during the login process
    res.status(500).send({ message: "Error while logging in" });
  }
};

// Function to select all profiles from the database
exports.findALL = async (req, res) => {
  try {
    // Find all users in the database
    const profiles = await db.user.findAll();
    // Send the profiles data as JSON response
    res.json(profiles);
  } catch (error) {
    // Handle any errors that occur during the fetch process
    res.status(500).send({ message: "Unable to get Profiles" });
  }
};

// Function to create a new user in the database
exports.makeAcc = async (req, res) => {
  try {
    const { username, email, password, name } = req.body; // Change 'Name' to 'name'

    // Check if username or email already exists
    const existingUserByUsername = await db.user.findOne({
      where: { username },
    });
    const existingUserByEmail = await db.user.findOne({ where: { email } });

    if (existingUserByUsername) {
      // If username already exists, send a 400 response
      return res.status(400).json({ message: "Username already exists" });
    } else if (existingUserByEmail) {
      // If email already exists, send a 400 response
      return res.status(400).json({ message: "Email already used" });
    }

    // Hash the user's password
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
    });

    // Create a new user in the database
    const user = await db.user.create({
      username,
      email,
      psswd: hash,
      Name: name, // Ensure the 'Name' field is populated correctly
    });

    // Send the created user data as JSON response with status 201 (Created)
    res.status(201).json(user);
  } catch (error) {
    // Handle any errors that occur during the account creation process
    console.error("Error while making the profile:", error.message);
    res.status(500).json({ message: "Error has occurred while attempting to create profile for the user" });
  }
};

// Function to update a user's password
exports.updatepsswd = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the request parameters
    const { currentPassword, newPassword } = req.body; // Get the current and new password from the request body

    // Find the user by ID
    const user = await db.user.findByPk(userId);
    if (!user) {
      // If user is not found, send a 404 response
      return res.status(404).send({ message: "Profile was not found!!!" });
    }

    // Verify the current password
    const isMatch = await argon2.verify(user.psswd, currentPassword);
    if (!isMatch) {
      // If the current password is incorrect, send a 400 response
      return res.status(400).send({ message: "Password was incorrect." });
    }

    // Hash the new password
    const hash = await argon2.hash(newPassword, { type: argon2.argon2id });

    // Update the user's password
    user.psswd = hash;
    await user.save();

    // Send a success message
    res.status(200).send({ message: "Password has been updated" });
  } catch (error) {
    // Handle any errors that occur during the password update process
    res.status(500).send({ message: "Error while updating the password" });
  }
};

// Function to confirm a user's password
exports.confpsswd = async (req, res) => {
  try {
    const { userId, password } = req.body; // Get the user ID and password from the request body

    // Find the user by ID
    const user = await db.user.findByPk(userId);
    if (!user) {
      // If user is not found, send a 404 response
      return res.status(404).json({ message: "Profile has not been found!!!" });
    }

    // Verify the password
    const isMatch = await argon2.verify(user.psswd, password);
    if (isMatch) {
      // If the password is correct, send a success message
      res.status(200).json({ message: "Password was verified" });
    } else {
      // If the password is incorrect, send a 400 response
      res.status(400).json({ message: "Incorrect password" });
    }
  } catch (error) {
    // Handle any errors that occur during the password verification process
    console.error("Error for verifying the password:", error.message);
    res.status(500).json({ message: "Error has occurred while verifying the password" });
  }
};

// Function to delete a user from the database
exports.Accdisposal = async (req, res) => {
  const id = req.params.id; // Get the user ID from the request parameters
  try {
    // Delete the user by ID
    const deleteCount = await db.user.destroy({
      where: { SID: id },
    });
    if (deleteCount > 0) {
      // If deletion is successful, send a success message
      res.send({ message: "Profile has been deleted!!!" });
    } else {
      // If user is not found, send a 404 response
      res.status(404).send({ message: "Profile has not been found!!!" });
    }
  } catch (error) {
    // Handle any errors that occur during the deletion process
    res.status(500).send({ message: "Cannot delete profile with provided id=" + id });
  }
};



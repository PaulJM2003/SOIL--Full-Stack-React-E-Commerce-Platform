const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
const db = require("../database");
const argon2 = require("argon2");

const userType = new GraphQLObjectType({
  name: "User",
  fields: {
    SID: { type: GraphQLInt },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    Name: { type: GraphQLString },
  },
});

const getAllUsers = async () => {
  try {
    console.log("Fetching all users...");
    const users = await db.Profile.findAll();
    console.log("Fetched users:", users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Could not fetch users");
  }
};

const getUserById = async (parent, { id }) => {
  if (!id) throw new Error("ID is required to fetch a user.");
  const user = await db.Profile.findByPk(id);
  if (!user) throw new Error("User not found.");
  return user;
};


const createUser = async (parent, args) => {
  try {
    const hash = await argon2.hash(args.password, { type: argon2.argon2id });
    const user = await db.Profile.create({
      username: args.username,
      email: args.email,
      psswd: hash,
      Name: args.name,
    });
    console.log("User created:", user);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

const updateUser = async (parent, args) => {
  try {
    const user = await db.Profile.findByPk(args.id);
    if (!user) throw new Error("User not found");
    await user.update(args);
    console.log("User updated:", user);
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};

const deleteUser = async (parent, args) => {
  try {
    const user = await db.Profile.findByPk(args.id);
    if (!user) throw new Error("User not found");
    await user.destroy();
    console.log("User deleted:", user);
    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
};

const login = async (parent, args) => {
  try {
    const user = await db.Profile.findOne({ where: { username: args.username } });
    if (user && (await argon2.verify(user.psswd, args.password))) {
      console.log("User login successful:", user);
      return user;
    } else {
      console.error("Invalid credentials");
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Error in login:", error);
    throw new Error("Login failed");
  }
};

module.exports = {
  userType,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
};

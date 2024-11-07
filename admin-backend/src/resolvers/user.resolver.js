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
  return await db.Profile.findAll();
};

const getUserById = async (parent, args) => {
  return await db.Profile.findByPk(args.id);
};

const createUser = async (parent, args) => {
  const hash = await argon2.hash(args.password, { type: argon2.argon2id });
  return await db.Profile.create({
    username: args.username,
    email: args.email,
    psswd: hash,
    Name: args.name,
  });
};

const updateUser = async (parent, args) => {
  const user = await db.Profile.findByPk(args.id);
  if (!user) throw new Error("User not found");
  await user.update(args);
  return user;
};

const deleteUser = async (parent, args) => {
  const user = await db.Profile.findByPk(args.id);
  if (!user) throw new Error("User not found");
  await user.destroy();
  return user;
};

const login = async (parent, args) => {
  const user = await db.Profile.findOne({ where: { username: args.username } });
  if (user && (await argon2.verify(user.psswd, args.password))) {
    return user;
  } else {
    throw new Error("Invalid credentials");
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

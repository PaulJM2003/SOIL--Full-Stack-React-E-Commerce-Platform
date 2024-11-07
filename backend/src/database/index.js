// Import the necessary modules from the sequelize package
const { Sequelize, DataTypes } = require("sequelize");
// Import the configuration file for database connection settings
const config = require("./config.js");

// Initialize an empty object to hold the database-related properties and methods
const db = {
  Op: Sequelize.Op, // Store Sequelize's Op (Operators) in db for easy access
};

db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
  dialectOptions: {
    ssl: {
      require: config.SSL,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000, // Connection attempt timeout (in milliseconds)
    idle: 10000, // How long a connection can be idle before being released
  },
});

// Import the user model and initialize it with the Sequelize instance and data types
db.user = require("./models/user")(db.sequelize, DataTypes);
db.product = require("./models/product.js").default(db.sequelize, DataTypes);
db.Review = require("./models/review")(db.sequelize, DataTypes);
db.cartItem = require("./models/cartItem.js").default(db.sequelize, DataTypes, db.product);
db.cart = require("./models/cart.js").default(db.sequelize, DataTypes, db.cartItem);
db.order = require("./models/order.js").default(db.sequelize, DataTypes, db.cart);
db.productImage = require("./models/productImage.js").default(db.sequelize, DataTypes, db.product);

// Define relationships
db.user.hasMany(db.Review, { foreignKey: "user_id", sourceKey: "SID" });
db.Review.belongsTo(db.user, { foreignKey: "user_id", targetKey: "SID" });

// Define the relationship between Review and Product
db.product.hasMany(db.Review, { foreignKey: "product_id", sourceKey: "productID" });
db.Review.belongsTo(db.product, { foreignKey: "product_id", targetKey: "productID" });

/**
 * Function to synchronize the database models with the database.
 * This function ensures that the database tables are created or updated to match the models.
 */
db.sync = async () => {
  try {
    if (process.env.DROPDB) {
      await db.sequelize.drop();
    }
    // Synchronize the database models with the database
    await db.sequelize.sync({ force: true }); // Only for development
    console.log("Database has been synced");

    // Call the seedData function to populate the database with initial data
    await seedData();
  } catch (error) {
    // Log any errors that occur during the synchronization process
    console.error("Failure in syncing:", error);
  }
};

/**
 * Function to seed the database with initial data.
 * This function checks if there are any users in the database and adds default users if none exist.
 */
async function seedData() {
  try {
    console.log("Seeding the database with initial data");

    require("./prefill_data/prefill_products.js").addPrefillProducts(db);

    // Count the number of users in the database
    const count = await db.user.count();

    // If there are users in the database, do not add any initial data
    if (count > 0) return;

    // Import the argon2 library for password hashing
    const argon2 = require("argon2");

    // Hash the password for the first user using argon2
    let hash = await argon2.hash("Abc123$$", { type: argon2.argon2id });
    // Create the first user with the hashed password
    await db.user.create({
      username: "Paul",
      email: "paul@example.com",
      psswd: hash,
      Name: "Paul",
    });

    // Hash the password for the second user using argon2
    hash = await argon2.hash("Qwe123$$", { type: argon2.argon2id });
    // Create the second user with the hashed password
    await db.user.create({
      username: "Disha",
      email: "disha@example.com",
      psswd: hash,
      Name: "Disha",
    });

    console.log("Data has been added successfully");
  } catch (error) {
    // Log any errors that occur during the data seeding process
    console.error("Failed to add the data:", error);
  }
}

// Export the db object to be used in other parts of the application
module.exports = db;

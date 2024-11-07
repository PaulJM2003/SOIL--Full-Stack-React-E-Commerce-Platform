const { Sequelize, DataTypes } = require("sequelize");
// Use this path if index.js is in the root directory
const config = require("./config");

const db = {
  Op: Sequelize.Op,
};

db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
  logging: console.log, // Enable detailed SQL query logging
  dialectOptions: {
    ssl: {
      require: true, // Set to true to enforce SSL
      rejectUnauthorized: false // Use false if the certificate is self-signed
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,  // Connection attempt timeout (in milliseconds)
    idle: 10000      // How long a connection can be idle before being released
  }
});

db.Profile = require("../database/models/user")(db.sequelize, DataTypes);
db.Review = require("../database/models/review")(db.sequelize, DataTypes);

// Define associations
db.Profile.hasMany(db.Review, { foreignKey: "user_id", sourceKey: "SID" });
db.Review.belongsTo(db.Profile, { foreignKey: "user_id", targetKey: "SID" });

db.sync = async () => {
  try {
    console.log("Attempting to sync the database...");
    await db.sequelize.sync();
    console.log("Database has been synced successfully.");
  } catch (error) {
    console.error("Failure in syncing database:", error);
  }
};

// Test the connection
(async () => {
  try {
    console.log("Authenticating database connection...");
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = db;







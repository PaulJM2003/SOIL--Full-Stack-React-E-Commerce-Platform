// Export an object containing the database configuration settings
module.exports = {
  // The hostname of the database server, obtained from environment variables
  HOST: process.env.DB_HOST,

  // The username for connecting to the database, obtained from environment variables
  USER: process.env.DB_USER,

  // The password for connecting to the database, obtained from environment variables
  PASSWORD: process.env.DB_PASSWORD,

  // The name of the database, obtained from environment variables
  DB: process.env.DB_NAME,

  // The type of database dialect is obtained from environment variables
  DIALECT: process.env.DB_DIALECT,

  SSL: true
};

  
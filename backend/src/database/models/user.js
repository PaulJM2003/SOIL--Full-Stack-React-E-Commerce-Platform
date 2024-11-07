// Export a function to define the Profile model in Sequelize
module.exports = (sequelize, DataTypes) => {
  // Define the Profile model
  const Profile = sequelize.define(
    "Profile", // The name of the model
    {
      // Define the attributes (columns) of the Profile model

      // SID (Student ID) is an integer that auto-increments and serves as the primary key
      SID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      
      // Username is a string of maximum length 100, must be unique and not null
      username: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
      },
      
      // Email is a string of maximum length 100, must be unique and not null
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
      },
      
      // Password is a string of maximum length 100, must not be null
      psswd: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      
      // Name is a string of maximum length 100, must not be null
      Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      // Specify additional options for the model

      // Define the table name for the model
      tableName: "profiles",

      // Enable timestamps (createdAt and updatedAt) for the model
      timestamps: true,
    }
  );

  // Return the defined model
  return Profile;
};

  
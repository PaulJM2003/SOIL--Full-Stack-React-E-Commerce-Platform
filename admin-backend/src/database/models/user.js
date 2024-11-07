module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define(
      "Profile",
      {
        SID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING(100),
          unique: true,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(100),
          unique: true,
          allowNull: false,
        },
        psswd: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        Name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      {
        tableName: "profiles",
        timestamps: true,
      }
    );
  
    return Profile;
  };
  
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
      "Review",
      {
          review_id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true,
          },
          user_id: {
              type: DataTypes.INTEGER,
              allowNull: false,
              references: {
                  model: "profiles",
                  key: "SID",
              },
          },
          product_id: {
              type: DataTypes.INTEGER,
              allowNull: false,
              // references: {
              //     model: "product", // Ensure this matches the model name
              //     key: "productID",
              // },
          },
          rating: {
              type: DataTypes.INTEGER,
              allowNull: false,
              validate: {
                  min: 1,
                  max: 5,
              },
          },
          review_text: {
              type: DataTypes.TEXT,
              allowNull: false,
          },
      },
      {
          tableName: "reviews",
          timestamps: true,
      }
  );

  return Review;
};

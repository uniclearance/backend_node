"use strict";
const { Model } = require("sequelize");
const randomNumberGenerator = require("../utils/randomNumberGenerator");
module.exports = (sequelize, DataTypes) => {
  class PasswordRestOtp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
    }
  }
  PasswordRestOtp.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
      },
      otp: {
        type: DataTypes.STRING,
        defaultValue: randomNumberGenerator(),
      },
    },
    {
      sequelize,
      modelName: "PasswordRestOtp",
      
    }
  );
  return PasswordRestOtp;
};

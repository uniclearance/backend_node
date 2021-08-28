"use strict";
const { UUIDV4 } = require("sequelize");
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Student, DepartmentAdmin }) {
      this.hasOne(Student, { as: "student", foreignKey: "userId" });
      this.hasOne(DepartmentAdmin, {
        foreignKey: "departmentId",
        as: "department",
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined, password: undefined };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.getDataValue("password"));
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  User.addHook("beforeCreate", (user) => {
    user.password = bcrypt.hashSync(user.password, 10);
  });
  return User;
};

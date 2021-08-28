"use strict";
const { Model } = require("sequelize");
const { v4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class LibraryClearance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Student }) {
      this.belongsTo(Student, { foreignKey: "studentId", as: "student" });
    }
    toJSON() {
      return { ...this.get(), id: undefined, studentId: undefined };
    }
  }
  LibraryClearance.init(
    {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false,
        defaultValue: v4().slice(0, 8).toLocaleUpperCase(),
      },
    },
    {
      sequelize,
      modelName: "LibraryClearance",
      tableName: "libraryClearances",
    }
  );
  return LibraryClearance;
};

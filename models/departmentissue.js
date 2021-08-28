"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DepartmentIssue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Department, User }) {
      this.belongsTo(User, { foreignKey: "studentId", as: "student" });
      this.belongsTo(Department, {
        foreignKey: "departmentId",
        as: "department",
      });
    }
  }
  DepartmentIssue.init(
    {
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isCleared: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "departmentIssues",
      modelName: "DepartmentIssue",
    }
  );
  return DepartmentIssue;
};

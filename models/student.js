"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Department }) {
      this.belongsTo(User, { as: "user", foreignKey: "userId" });
      this.belongsTo(Department, {
        foreignKey: "departmentId",
        as: "department",
      });
    }
    hasIssue(){

    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        departmentId: undefined,
        userId: undefined,
      };
    }
  }
  Student.init(
    {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      studentId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "students",
      modelName: "Student",
    }
  );
  return Student;
};

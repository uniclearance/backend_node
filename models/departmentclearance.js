const { v4 } = require("uuid");

("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DepartmentClearance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Student, Department }) {
      // define association here
      this.belongsTo(Student, { foreignKey: "studentId", as: "student" });
      this.belongsTo(Department, {
        foreignKey: "departmentId",
        as: "department",
      });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        studentId: undefined,
        departmentId: undefined,
      };
    }
  }
  DepartmentClearance.init(
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
        allowNull: false,
        defaultValue: v4().slice(0, 8).toLocaleUpperCase(),
      },
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "departmentClearances",
      modelName: "DepartmentClearance",
    }
  );
  return DepartmentClearance;
};

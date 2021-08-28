"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Student, DepartmentAdmin }) {
      this.hasMany(Student, { foreignKey: "departmentId", as: "students" });
      this.hasMany(DepartmentAdmin, {
        foreignKey: "departmentId",
        as: "admins",
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Department.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "departments",
      modelName: "Department",
    }
  );
  return Department;
};

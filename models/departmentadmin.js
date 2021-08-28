"use strict";
const { Model } = require("sequelize");
const config = require("../config");
module.exports = (sequelize, DataTypes) => {
  class DepartmentAdmin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Department }) {
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
      this.belongsTo(Department, {
        foreignKey: "departmentId",
        as: "department",
      });
    }
    toJSON() {
      return {
        ...this.get(),
        userId: undefined,
        departmentId: undefined,
        id: undefined,
      };
    }
  }
  DepartmentAdmin.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: config.subAdminType.admin,
      },
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      tableName: "departmentAdmins",
      modelName: "DepartmentAdmin",
    }
  );
  return DepartmentAdmin;
};

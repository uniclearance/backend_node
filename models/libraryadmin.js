"use strict";
const { Model } = require("sequelize");
const config = require("../config");
module.exports = (sequelize, DataTypes) => {
  class LibraryAdmin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
    }
    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined };
    }
  }
  LibraryAdmin.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: config.subAdminType.admin,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      tableName: "libraryAdmins",
      modelName: "LibraryAdmin",
    }
  );
  return LibraryAdmin;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LibraryIssue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Student }) {
      this.belongsTo(Student, { foreignKey: "studentId", as: "student" });
    }
    toJSON(){
      return {...this.get(),id:undefined,studentId:undefined}
    }
  }
  LibraryIssue.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      resolved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "LibraryIssue",
      tableName: "libraryIssues",
    }
  );
  return LibraryIssue;
};

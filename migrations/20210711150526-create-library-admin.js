'use strict';

const config = require("../config");

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('libraryAdmins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      type: {
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:config.subAdminType.admin
      },
      userId:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      uuid:{
        type: DataTypes.UUID,
        allowNull:false,
        defaultValue:DataTypes.UUIDV4
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('libraryAdmins');
  }
};
const {v4} = require("uuid")

'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('departmentClearances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type:DataTypes.UUID,
        allowNull:false,
        defaultValue:DataTypes.UUIDV4
      
      },
      token:{
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:v4().toString().slice(0,8)
    },
      studentId: {
        type:DataTypes.INTEGER,
        allowNull:false
      },
      departmentId: {
        type:DataTypes.INTEGER,
        allowNull:false
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
    await queryInterface.dropTable('departmentClearances');
  }
};
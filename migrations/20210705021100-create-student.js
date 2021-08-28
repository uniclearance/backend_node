'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    uuid:{
      type:DataTypes.UUID,
      allowNull:false,
      defaultValue:DataTypes.UUIDV4
    },
     studentId:{
      type:DataTypes.STRING,
      allowNull:false
    },   
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    departmentId:{
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
    await queryInterface.dropTable('students');
  }
};
'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('departmentIssues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      departmentId: {
        type:DataTypes.TEXT,
        allowNull:false
      },
      uuid: {
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false
      },
      detail: {
        type:DataTypes.STRING,
        allowNull:false
      },
      studentId: {
        type:DataTypes.INTEGER,
        allowNull:false
      },
      isCleared: {
        type:DataTypes.BOOLEAN,
        defaultValue:false
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
    await queryInterface.dropTable('departmentIssues');
  }
};
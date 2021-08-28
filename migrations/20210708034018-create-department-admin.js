'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('departmentAdmins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type:DataTypes.INTEGER,
        allowNull:false
      },
      departmentId: {
        type:DataTypes.INTEGER,
        allowNull:false
      },
      uuid:{
        type:DataTypes.UUID,
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
    await queryInterface.dropTable('departmentAdmins');
  }
};
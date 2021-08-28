'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('libraryClearances', {
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
      studentId: {
        type:DataTypes.INTEGER,
        allowNull:false
      },
      token: {
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:DataTypes.UUIDV4.toString().slice(0,8)
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
    await queryInterface.dropTable('libraryClearances');
  }
};
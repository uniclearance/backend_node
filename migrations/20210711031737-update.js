'use strict';

const config = require("../config");

module.exports = {
  up: async (queryInterface, DataTypes) => {
    queryInterface.addColumn('departmentAdmins','type',{
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue:config.subAdminType.admin
    })
  },

  down: async (queryInterface, DataTypes) => {
   queryInterface.removeColumn('departmentAdmins','type')
  }
};

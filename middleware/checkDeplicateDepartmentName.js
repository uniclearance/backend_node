const { Department } = require("../models");

module.exports = async (req, res, next) => {
  const { name } = req.body;
  if (name) {
    const department = await Department.findOne({ where: { name } });
    if (department)
      return res.status(401).json({
        status: "error",
        message: "Department with the same name exist",
      });
  }

  return next();
};

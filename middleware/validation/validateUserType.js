const config = require("../../config");

module.exports = (req, res, next) => {
  const { role } = req.body;
  const roles = [
    config.userTypes.superadmin,
    config.userTypes.student,
    config.userTypes.libraryAdmin,
    config.userTypes.hostelAdmin,
    config.userTypes.FinanceAdmin,
  ];
  if (!roles.includes(role)) {
    return res.status(400).json({
      role: [`${role} is not a valid role`],
    });
  }
  next()
};

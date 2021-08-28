const validator = require("../../utils/validator");

const createDepartmentValidator = (req, res, next) => {
  const rule = {
    name: "required|string",
  };
  validator(req.body, rule, {}, (err, status) => {
    if (!status) return res.status(400).json(err.errors);
    next();
  });
};

module.exports = createDepartmentValidator;

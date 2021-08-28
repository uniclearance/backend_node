const validator = require("../../utils/validator");

const createAdminsValidator = (req, res, next) => {
  const rules = {
    fullname: "required|string",
    password: "required|string|min:6",
    username: "required|string|min:8",
    type: "required|string",
  };
  validator(req.body, rules, {}, (err, status) => {
    if (!status) return res.status(500).json(err.errors);
    next();
  });
};

module.exports = createAdminsValidator;

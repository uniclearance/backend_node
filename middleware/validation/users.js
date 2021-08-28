const validator = require("../../utils/validator");

const createUserValidator = (req, res, next) => {
  const rule = {
    fullname: "required|string",
    password: "required|string|min:6|confirmed",
    role: "required|string",
    username: "required|string|min:8",
  };
  validator(req.body, rule, {}, (err, status) => {
    if (!status) return res.status(400).json(err.errors);
    next();
  });
};

module.exports = createUserValidator;

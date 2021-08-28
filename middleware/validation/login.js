const validator = require("../../utils/validator");

const loginValidatation = (req, res, next) => {
  const rule = {
    username: "required|string",
    password: "required|string",
  };
  validator(req.body, rule, {}, (err, status) => {
    if (!status) return res.status(400).json(err.errors);

    next();
  });
};

module.exports = loginValidatation;

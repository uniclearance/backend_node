const validator = require("../../utils/validator");

module.exports = (req, res, next) => {
  const rule = {
    password: "required|string|confirmed",
  };
  validator(req.body, rule, {}, (err, status) => {
    if (!status) return res.status(400).json(err.errors);
    next();
  });
};

const validator = require("../../utils/validator");

module.exports = (req, res, next) => {
  const rules = {
    email: "required|email",
    username: "required|string",
  };

  validator(req.body, rules, {}, (err, status) => {
    if (!status) return res.status(400).json(err.errors);
    next();
  });
};

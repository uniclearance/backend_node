const validator = require("../../utils/validator");

const issuesValidator = (req, res, next) => {
  const rule = {
    detail: "required|string",
  };
  validator(req.body, rule, {}, (err, status) => {
    if (!status) return res.status(400).json(err.errors);
    next();
  });
};

module.exports = issuesValidator;

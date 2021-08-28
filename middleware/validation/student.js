const validator = require("../../utils/validator");

const createStudentValidator = (req, res, next) => {
  const rules = {
    fullname: "required|string",
    password: "required|string|min:6",
    username: "required|string|min:8",
    studentId: "required|string|min:8",
    departmentId: "required|string",
  };
  validator(req.body, rules, {}, (err, status) => {
    if (!status) return res.status(500).json(err.errors);
    next();
  });
};

module.exports = createStudentValidator;

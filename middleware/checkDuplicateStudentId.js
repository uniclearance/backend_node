const { Student } = require("../models");

module.exports = async (req, res, next) => {
  if (req.body.studentId) {
    const student = await Student.findOne({
      where: { studentId: req.body.studentId },
    });
    if (student)
      return res
        .status(401)
        .json({
          status: "error",
          message: "Student with this student id already exists",
        });
  }
  next();
};

const { DepartmentClearance, Student } = require("../models");

module.exports = async (req, res, next) => {
  const user = req.user;
  try {
    const student = await Student.findOne({
      where: { userId: user.dataValues.id },
    });
    if (!student)
      return res
        .status(404)
        .json({
          message:
            "Sorry, there is a problem with your student profile. Contact your department administrator",
        });
    const clearance = await DepartmentClearance.findOne({
      studentId: student.id,
      departpmentId: student.dataValues.departpmentId,
    });
    if (clearance)
      return res
        .status(401)
        .json({ message: "You have already cleared yourself" });
    req.student = student;
    next();
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occued" });
    console.log(error);
  }
};

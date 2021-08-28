const { Department, Student, User } = require("../models");
const config = require("../config");

//Get all students
const index = async (req, res) => {
  try {
    const students = await Student.findAll({ include: ["department", "user"] });
    res.json(students);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unexpected error occured",
    });
    console.log(error);
  }
};

//Create a student
const createUser = async (req, res) => {
  const { username, fullname, password, studentId, departmentId } = req.body;
  try {
    const department = await Department.findOne({
      where: { uuid: departmentId },
    });
    if (!department)
      return res.status(500).json({
        status: "error",
        message: "Department does not exist",
      });
    const user = await User.create({
      username,
      password,
      fullname,
      role: config.userTypes.student,
    });
    const student = await Student.create({
      userId: user.id,
      studentId,
      departmentId: department.id,
    });
    res.status(201).json({
      status: "success",
      data: {
        ...student.dataValues,
        id: undefined,
        userId: undefined,
        departmentId: undefined,
        user: {
          ...user.dataValues,
          password: undefined,
          id: undefined,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unexpected error occured",
    });
    console.log(error);
  }
};

//Update a student by super admin

const update = async (req, res) => {
  const { studentUid } = req.params;
  const { username, fullname, studentId, departmentId } = req.body;
  try {
    let student = await Student.findOne({ where: { uuid: studentUid } });
    if (!student)
      return res.status(404).json({ message: "User does not exist" });
    let user = await User.findOne({ where: { id: student.userId } });
    let department = {};
    if (departmentId) {
      department = await Department.findOne({ where: { uuid: departmentId } });
    } else {
      department = {};
    }

    if (!department)
      return res.status(404).json({ message: "Department deoes not exist" });
    user = await User.update(
      {
        username: username || user.username,
        fullname: fullname || user.fullname,
      },
      { where: { id: user.id } }
    );

    await Student.update(
      {
        studentId: studentId || student.studentId,
        departmentId: departmentId || department.id,
      },
      { where: { id: student.id } }
    );

    student = await Student.findOne({
      where: { id: student.id },
      include: ["department", "user"],
    });
    res.json({
      status: "success",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unexpected error occured",
    });
    console.log(error);
  }
};

// Delete User by admins

const destroy = async (req, res) => {
  const { studentUid } = req.params;
  try {
    let student = await Student.findOne({ where: { uuid: studentUid } });
    if (!student)
      return res.status(404).json({ message: "User does not exist" });
    await User.destroy({ where: { id: student.id } });
    res.json({
      status: "success",
      message: "You have succesfully deleted a student",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unexpected error occured",
    });
    console.log(error);
  }
};

module.exports = {
  createUser,
  index,
  update,
  destroy,
};

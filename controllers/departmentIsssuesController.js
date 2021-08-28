const { DepartmentIssue, Student, Department } = require("../models");
const config = require("../config");

//Get all issues
const index = async (req, res) => {
  try {
    const departments = await DepartmentIssue.findAll({
      include: ["student", "department"],
    });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occued" });
    console.log(error);
  }
};

//Student issues by uid
const studentIssues = async (req, res) => {
  const { studentUid } = req.params;
  try {
    const student = await Student.findOne({ where: { uuid: studentUid } });
    if (!student)
      return res.status(404).json({ message: "Student does not exist" });
    const issues = await DepartmentIssue.findAll({
      where: { studentId: student.uuid },
      include: ["student", "department"],
    });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occued" });
    console.log(error);
  }
};

const create = async (req, res) => {
  const { studentId, departmentUid } = req.params;
  const { detail } = req.body;
  try {
    const student = await Student.findOne({ where: { uuid: studentId } });
    if (!student)
      return res.status(404).json({ message: "Student does not exist" });
    const department = Department.findOne({ where: { uuid: departmentUid } });
    if (!department)
      return res.status(403).json({ message: "Department does not exist" });
    if (student.dataValues.id !== department.id)
      return res
        .status(403)
        .json({
          message: "Student does not belong to the specified department",
        });
    //Create issue
    let issue = await DepartmentIssue.create({
      detail,
      studentId: student.id,
      departmentId: department.id,
    });
    //Get full json query
    issue = DepartmentIssue.findOne({
      where: { id: issue.id },
      include: ["student", "department"],
    });
    res.status(201).json({
      status: "success",
      data: issue,
    });
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occued" });
    console.log(error);
  }
};

const changeAsCleared = async (req, res) => {
  const { issueUid } = req.params;
  try {
    let issue = await DepartmentIssue.findOne({ where: { uuid: issueUid } });
    if (!issue) return res.status(404).json({ message: "Issue is not found" });
    await DepartmentIssue.update({
      isCleared: !issue.isCleared,
    });
    issue = DepartmentIssue.findOne({
      where: { id: issue.id },
      include: ["student", "department"],
    });

    res.status(201).json({
      status: "success",
      data: issue,
    });
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occued" });
    console.log(error);
  }
};

module.exports = {
  index,
  create,
  changeAsCleared,
  studentIssues,
};

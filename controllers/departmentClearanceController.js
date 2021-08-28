const { DepartmentClearance, Department } = require("../models");

//Get all clearance - No filteration

const index = async (req, res) => {
  try {
    const clearances = await DepartmentClearance.findAll({
      include: ["student", "department"],
    });
    res.json(clearances);
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occued" });
    console.log(error);
  }
};

//Get a particular departments clearances
const getDepartmentClearances = async (req, res) => {
  const { departmentId } = req.params;
  try {
    const department = await Department.findOne({
      where: { uuid: departmentId },
    });
    if (!department)
      return res.status(404).json({ message: "Department does not exist" });
    const clearances = await DepartmentClearance.findAll({
      where: { departmentId: department.id },
      include: ["student"],
    });
    res.json(clearances);
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occued" });
    console.log(error);
  }
};

// Clear student
const clearStudent = async (req, res) => {
  const student = req.student;
  try {
    const cleared = await DepartmentClearance.create({
      studentId: student.dataValues.id,
      departmentId: student.dataValues.departmentId,
    });
    return res.status(201).json({ status: "success", data: cleared });
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occued" });
    console.log(error);
  }
};

// Delete clearance
const deleteClearance = async (req, res) => {
  const { clearanceId } = req.params;
  try {
    const clearance = await DepartmentClearance.findOne({
      where: { uuid: clearanceId },
    });
    if (!clearance)
      return res
        .status(404)
        .json({ message: "Department clearance does not exist" });
    await DepartmentClearance.destroy({ where: { id: clearance.id } });
    res.json({
      status: "success",
      message: "You have succesfully deleted department clearance",
    });
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occued" });
    console.log(error);
  }
};

module.exports = {
  index,
  getDepartmentClearances,
  clearStudent,
  deleteClearance,
};

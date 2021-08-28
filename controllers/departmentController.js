const { Department } = require("../models");

const index = async (req, res) => {
  try {
    const departments = await Department.findAll({
      attributes: ["uuid", "name"],
    });
    res.json({ departments });
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occued" });
    console.log(error);
  }
};

const indexWithStudents = async (req, res) => {
  try {
    const departments = await Department.findAll({
      attributes: ["uuid", "name"],
      include: ["admins", "students"],
    });
    res.json({ departments });
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occued" });
    console.log(error);
  }
};

const create = async (req, res) => {
  const { name } = req.body;
  try {
    const department = await Department.create({ name });
    res.status(201).json({ status: "success", data: department });
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occued" });
    console.log(error);
  }
};

const update = async (req, res) => {
  const { name } = req.body;
  const { departmentUid } = req.params;
  try {
    let department = await Department.findOne({
      where: { uuid: departmentUid },
    });
    if (!department)
      return res.status(401).json({ message: "Department does not exist" });
    await Department.update(
      {
        name: name || department.name,
      },
      { where: { id: department.id } }
    );
    department = await Department.findOne({ where: { id: department.id } });
    res.status(201).json({ status: "success", data: department });
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occued" });
    console.log(error);
  }
};

const destroy = async (req, res) => {
  const { departmentUid } = req.params;
  try {
    const department = await Department.findOne({
      where: { uuid: departmentUid },
    });
    if (!department)
      return res.status(401).json({ message: "Department does not exist" });
    await Department.destroy({ where: { id: department.id } });
    res
      .status(201)
      .json({
        status: "success",
        message: "You have successfully deleted a department",
        data: department,
      });
  } catch (error) {
    res.status(500).json({ message: "Unexpected error occued" });
    console.log(error);
  }
};

module.exports = { create, index, indexWithStudents, update, destroy };

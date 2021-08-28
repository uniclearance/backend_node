const { User } = require("../models");

const create = async (req, res) => {
  const { fullname, username, password, role } = req.body;

  try {
    user = await User.create({
      fullname,
      password,
      role,
      username,
    });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get all users
const index = async (req, res) => {
  try {
    users = await User.findAll({ include: "student" });
    res.json({ users });
  } catch (error) {
    res.status(500).json("An error occurred");
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await User.destroy({ where: { uuid: userId } });
    res.json({
      status: "ok",
      message: "You have successfully deleted user",
    });
  } catch (error) {
    res.status(500).json("An error occurred");
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  const { username, fullname } = req.body;
  console.log(req.user.dataValues);
  const user = req.user;
  user.fullname = fullname || user.dataValues.fullname;
  user.username = username || user.dataValues.username;
  try {
    await user.save();
    res.json({
      status: "success",
      message: "You have succesfully updated",
    });
  } catch (error) {}
};

module.exports = {
  create,
  index,
  deleteUser,
  updateUser,
};

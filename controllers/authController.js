const Jwt = require("jsonwebtoken");
const config = require("../config");
const { Student,Department } = require("../models");

const login = async (req, res) => {
  const token = Jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 1000000 * 1000, //Just a very large number
      sub: req.user.uuid,
    },
    config.appSecrete
  );
  
  const student = await Student.findOne({ where: { userId: req.user.id },include:["department"] });

  const data = {
    user: req.user,
    student,
  };
  res.json({
    status: "ok",
    token,
    data,
  });
};

module.exports = { login };

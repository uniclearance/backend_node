const Jwt = require("jsonwebtoken");
const config = require("../config");
const { Student } = require("../models");

const login = async (req, res) => {
  const token = Jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 1000000 * 1000, //Just a very large number
      sub: req.user.uuid,
    },
    config.appSecrete
  );
  const student = await Student.findOne({ where: { userId: req.user.id } });
  res.json({
    status: "ok",
    token,
    data: req.user,
    student,
  });
};

module.exports = { login };

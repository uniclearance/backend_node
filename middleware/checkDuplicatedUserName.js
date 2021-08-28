const { User } = require("../models");

module.exports = async (req, res, next) => {
  const username = req.body.username;
  if (username) {
    const user = await User.findOne({ where: { username } });
    if (user)
      return res.status(401).json({
        status: "error",
        message: "User with the same username exist",
      });
  }

  return next();
};

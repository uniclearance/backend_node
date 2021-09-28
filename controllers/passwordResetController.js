const { User, PasswordRestOtp } = require("../models");
const verifyEmail = async (req, res) => {
  const { email, username } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({
        detail: "User with username does not exist",
      });
    }

    const otp = await PasswordRestOtp.create({
      userId: user.dataValues.id,
    });
    //Todo: Send email

    res.status(200).json({
      status: "ok",
      message: "A 6 random digit has been sent to your email",
      token: otp.uuid,
    });
  } catch (error) {
    res.status(500).json({ detail: "Unexpected error occured" });
    console.log(error);
  }
};

const verifyOtp = async (req, res) => {
  const { token } = req.params;
  const { otp } = req.body;
  try {
    const passwordRestOtp = await PasswordRestOtp.findOne({
      where: { uuid: token, otp },
    });
    if (!passwordRestOtp) {
      return res.status(401).json({
        detail: "unvalid otp code",
      });
    }
    res.status(200).json({
      message: "Otp has been verified successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ detail: "Unexpected error occued" });
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const passwordRestOtp = await PasswordRestOtp.findOne({
      where: { uuid: token },
    });
    if (!passwordRestOtp)
      return res.status(401).json({ detail: "Invalid password reset session" });
    let user = await User.findOne({ where: { id: passwordRestOtp.userId } });
    if (!user)
      return res.status(401).json({ detail: "Invalid password reset session" });
    user = await user.setPassword(password);

    if (!user)
      return res.status.json({
        detail: "An error occured while trying to reset user password",
      });
    res.status(200).json({
      message: "You have succefully reset your password",
    });
  } catch (error) {
    res.status(500).json({ detail: "Unexpected error occued" });
    console.log(error);
  }
};

module.exports = { verifyEmail, verifyOtp, resetPassword };

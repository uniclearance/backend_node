const router = require("express").Router();
const controller = require("../controllers/passwordResetController");
const verifyEmailValidator = require("../middleware/validation/verifyEmailValidation");
const otpValidation = require("../middleware/validation/VerifyOtpCodeValidation");
const resetPasswordValidation = require("../middleware/validation/resetPasswordValidation");
router.post("/verify_email", verifyEmailValidator, controller.verifyEmail);
router.post("/verify_otp/:token", otpValidation, controller.verifyOtp);
router.post(
  "/reset/:token",
  resetPasswordValidation,
  controller.resetPassword
);
module.exports = router;

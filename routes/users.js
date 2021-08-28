var express = require("express");
const passport = require("passport");
var router = express.Router();
const usersController = require("../controllers/usersController");
const createUserValidator = require("../middleware/validation/users");
const superUserAdminOnly = require("../middleware/permissions/studentsOnly");
const checkDuplicatedUserName = require("../middleware/checkDuplicatedUserName");
const validateUserType = require("../middleware/validation/validateUserType");

/* GET users listing. */
router
  .route("/")
  .get(usersController.index)
  // .post(passport.authenticate("jwt",{session:false}),superUserAdminOnly,checkDuplicatedUserName,createUserValidator,usersController.create)
  .post(checkDuplicatedUserName,
    validateUserType,
    createUserValidator, usersController.create);
router
  .route("/:userId")
  .delete(
    passport.authenticate("jwt", { session: false }),
    superUserAdminOnly,
    usersController.deleteUser
  );

router.patch(
  "/update_cur_user",
  passport.authenticate("jwt", { session: false }),
  checkDuplicatedUserName,
  usersController.updateUser
);
module.exports = router;

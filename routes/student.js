const express = require("express");
const router = express.Router();
const superAdminOnly = require("../middleware/permissions/superAdminOnly");
const passport = require("passport");
const studentController = require("../controllers/studentsController");
const checkDuplicatedUserName = require("../middleware/checkDuplicatedUserName");
const checkDuplicateStudentId = require("../middleware/checkDuplicateStudentId");
const createStudentValidator = require("../middleware/validation/student");

router
  .route("/")
  .get(studentController.index)
  .post(
    passport.authenticate("jwt", { session: false }),
    superAdminOnly,
    createStudentValidator,
    checkDuplicatedUserName,
    checkDuplicateStudentId,
    studentController.createUser
  );
router
  .route("/:studentUid")
  .patch(
    passport.authenticate("jwt", { session: false }),
    superAdminOnly,
    checkDuplicateStudentId,
    checkDuplicatedUserName,
    studentController.update
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    superAdminOnly,
    studentController.destroy
  );
module.exports = router;

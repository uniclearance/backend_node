const express = require("express");
const passport = require("passport");
const router = express.Router();
const departmentAdminPermission = require("../middleware/permissions/departmentAdminsOnly");
const issuesValidator = require("../middleware/validation/issuesValidator");
const controller = require("../controllers/departmentIsssuesController");

router
  .route("/")
  .post(
    passport.authenticate("jwt", { session: false }),
    departmentAdminPermission,
    issuesValidator,
    controller.create
  )
  .get(controller.index);

router.get("/student/issues/:studentUid", controller.studentIssues);

router.patch(
  "toggle_is_cleared/",
  passport.authenticate("jwt", { session: false }),
  departmentAdminPermission,
  controller.changeAsCleared
);

module.exports = router;

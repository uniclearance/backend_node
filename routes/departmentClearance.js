const express = require("express");
const passport = require("passport");
const router = express.Router();
const controller = require("../controllers/departmentClearanceController");
const checkForDuplicateDepartmentClearance = require("../middleware/checkForDuplicateDepartmentClearance");
const checkForDepartmentIssues = require("../middleware/permissions/checkForDepartmentIssues");
const departmentAdminsOnly = require("../middleware/permissions/departmentAdminsOnly");
const studentsOnly = require("../middleware/permissions/studentsOnly");

//Get all clearance - No filteration
router.get("/", controller.index);

//Get a particular departments clearances
router.get("/department/:departmentId", controller.getDepartmentClearances);

//Clear student
// - Check whether student has already cleared him/herself
// - student only permission
// - Append student model to request
// - Check for department issues
// - Clear student
router.post(
  "/clear_student",
  passport.authenticate("jwt", { session: false }),
  studentsOnly,
  checkForDuplicateDepartmentClearance,
  checkForDepartmentIssues,
  controller.clearStudent
);

//Delete clearance

router.delete(
  "/:departmentId",
  passport.authenticate("jwt", { session: false }),
  departmentAdminsOnly,
  controller.deleteClearance
);

module.exports = router;

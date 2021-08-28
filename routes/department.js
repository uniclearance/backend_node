const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");
const passport = require("passport");
const superAdminOnly = require("../middleware/permissions/superAdminOnly");
const createDepartmentValidator = require("../middleware/validation/department");
const checkDeplicateDepartmentName = require("../middleware/checkDeplicateDepartmentName");

router
  .route("/")
  .get(departmentController.index)
  .post(
    passport.authenticate("jwt", { session: false }),
    superAdminOnly,
    createDepartmentValidator,
    checkDeplicateDepartmentName,
    departmentController.create
  );

router.get("/with_info", departmentController.indexWithStudents);

router
  .route("/:departmentUid")
  .patch(
    passport.authenticate("jwt", { session: false }),
    superAdminOnly,
    checkDeplicateDepartmentName,
    departmentController.update
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    superAdminOnly,
    departmentController.destroy
  );
router.get("/with_students", departmentController.indexWithStudents);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controllers/departmentAdminController");
const passport = require("passport");
const departmentSuperAdminPermission = require("../middleware/permissions/departmentSuperAdminORSiteSuperAdminOnly");
const createUserValidator = require("../middleware/validation/users");
const checkDuplicatedUserName = require("../middleware/checkDuplicatedUserName");

router.route("/").get(controller.index);

router.get("/department_admins/:departmentId", controller.getDepartmentAdmins);

router.post(
  "/create_admin/:departmentId",
  passport.authenticate("jwt", { session: false }),
  departmentSuperAdminPermission,
  createUserValidator,
  checkDuplicatedUserName,
  controller.create
);

router
  .route("/:adminId")

  .delete(
    passport.authenticate("jwt", { session: false }),
    departmentSuperAdminPermission,
    controller.deleteDepartentAdmin
  );

module.exports = router;

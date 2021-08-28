const express = require("express");
const passport = require("passport");
const router = express.Router();
const controller = require("../controllers/libraryIssuesController");
const issuesValidator = require("../middleware/validation/issuesValidator");
const librayAdminOnly = require("../middleware/permissions/libraryAdmin");

router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    librayAdminOnly,
    controller.index
  )

  router
  .post(
    "/:studentId",
    passport.authenticate("jwt", { session: false }),
    librayAdminOnly,
    issuesValidator,
    controller.create
  );

router.get(
  "/:adminId",
  passport.authenticate("jwt", { session: false }),
  librayAdminOnly,
  controller.retreive
);
router.delete(
  "/:issueId",
  passport.authenticate("jwt", { session: false }),
  librayAdminOnly,
  controller.deleteIssue
);
router.patch(
  "/:issueId",
  passport.authenticate("jwt", { session: false }),
  librayAdminOnly,
  controller.update
);
module.exports = router;

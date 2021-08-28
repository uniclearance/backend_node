const express = require("express");
const passport = require("passport");
const controller = require("../controllers/libraryClearanceController");
const libraryAdmin = require("../middleware/permissions/libraryAdmin");
const studentsOnly = require("../middleware/permissions/studentsOnly");

const router = express.Router();

router
  .route("/")
  .get(controller.index)
  .post(
    passport.authenticate("jwt", { session: false }),
    studentsOnly,
    controller.slefClear
  );

// router.get(
//   "/clear",
//   passport.authenticate("jwt", { session: false }),
//   studentsOnly,
//   controller.slefClear
// );

router.delete(
  "/delete/:clearanceId",
  passport.authenticate("jwt", { session: false }),
  libraryAdmin,
  controller.remove
);

router.post(
  "/:studentUid",
  passport.authenticate("jwt", { session: false }),
  libraryAdmin,
  controller.create
);

module.exports = router;

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const studentsRouter = require("./routes/student");
const departmentsRouter = require("./routes/department");
const departmentIssuesRouter = require("./routes/departmentIssues");
const departmentAdminRouter = require("./routes/departmentAdmin");
const departmentClearanceRouter = require("./routes/departmentClearance");
const libraryAdminRouter = require("./routes/libraryAdmin");
const libraryClearanceRouter= require("./routes/libraryClearance")
const libraryIssuesRouter = require("./routes/libraryIssues")

var app = express();
require("./passport");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use("/libary_clearance",libraryClearanceRouter)
app.use("/library_issues",libraryIssuesRouter)
app.use("/users", usersRouter);
app.use("/department_admins", departmentAdminRouter);
app.use("/department_clearance", departmentClearanceRouter);
app.use("/department_issues", departmentIssuesRouter);
app.use("/library_admin", libraryAdminRouter);
app.use("/auth", authRouter);
app.use("/students", studentsRouter);
app.use("/departments", departmentsRouter);
app.use("/", indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

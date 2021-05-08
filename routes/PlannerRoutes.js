const express = require("express");
const controller = require("../controllers/PlannerController.js");
const router = express.Router();
const auth = require("../auth/auth.js");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
const user = require("../models/userModel.js");
const planner = require("../models/plannerModel.js");

router.get("/", controller.landing_page);

router.get("/planner", ensureLoggedIn("/login"), controller.goals_list);

router.get("/modify", function (req, res) {
  res.send("<h1><h1>Modify Goal</h1></h1>");
});
//---------------------------------------------------------------------------
//router.get("/add", controller.add_goal);
//router.get("/new", ensureLoggedIn("/login"), controller.add_goal);
router.get("/new/:name/:dayId", ensureLoggedIn("/login"), controller.add_goal);
router.post("/new/:name/:dayId", ensureLoggedIn("/login"), controller.post_add_goal);
//---------------------------------------------------------------------------
//user registration routes
router.get("/register", controller.show_register_page);
router.post("/register", controller.post_new_user);
//---------------------------------------------------------------------------
//login route GET
router.get("/login", controller.show_login_page);
//---------------------------------------------------------------------------
//login route POST
router.post("/login", auth.authorize("/login"), controller.post_login);
//---------------------------------------------------------------------------
router.get("/logout", controller.logout);
//---------------------------------------------------------------------------
router.get("/setAchievement/:name/:dayId", controller.set_Achievement);
router.post("/setAchievement/:name/:dayId", controller.post_set_Achievement);
//---------------------------------------------------------------------------
router.get("/notAchieved", ensureLoggedIn("/login"), controller.get_notAchievedGoals);
//---------------------------------------------------------------------------
router.use(function (req, res) {
  res.status(404);
  res.type("text/plain");
  res.send("404 Not found.");
});

router.use(function (err, req, res, next) {
  res.status(500);
  res.type("text/plain");
  res.send("Internal Server Error.");
});

module.exports = router;

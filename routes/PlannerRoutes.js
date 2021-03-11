const express = require("express");
const controller = require("../controllers/PlannerController.js");
const router = express.Router();

router.get("/", controller.landing_page);

router.get("/planner", controller.goals_list);

router.get("/modify", function (req, res) {
  res.send("<h1><h1>Modify Goal</h1></h1>");
});

router.get("/add", controller.add_goal);

router.get("/actual", controller.enter_actualAchievement);

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

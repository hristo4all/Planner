exports.landing_page = function (req, res) {
  res.send("<h1>Welcome to my Application.</h1>");
};
const guestbookDAO = require("../models/plannerModel");
const db = new guestbookDAO();
db.init();
exports.goals_list = function (req, res) {
  db.getAllEntries()
    .then((list) => {
      res.render("planner", {
        title: "Planner",
        weeks: list,
      });
      console.log("promise resolved");
      console.log(list);
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.modifyGoal_page = function (req, res) {
  res.send("<h1>Modify Goal.</h1>");
};
exports.add_goal = function (req, res) {
  res.render("newGoal", {
    title: "Add Goal",
  });
};
exports.enter_actualAchievement = function (req, res) {
  res.render("actualAchievement", {
    title: "Enter Actual Achievement",
  });
};

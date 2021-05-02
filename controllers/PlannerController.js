exports.landing_page = function (req, res) {
  res.render("landingPage", {
    title: "Welcome Page",
    Home: 'class="current"',
  });
};
//rename
const guestbookDAO = require("../models/plannerModel");
const db = new guestbookDAO();
db.resetDB();
db.init();
exports.goals_list = function (req, res) {
  //-----------------------------------------------------------------------
  // find today's date
  var date = new Date();
  var today =
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  //-----------------------------------------------------------------------
  //get monday

  //-----------------------------------------------------------------------
  db.getAllEntries()
    .then((list) => {
      res.render("planner", {
        title: "Planner",
        today: today,
        exercises: list,
        PlannerNav: 'class="current"',
      });
      console.log("promise resolved");
      //console.log(list);
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
    NewGoal: 'class="current"',
  });
};
exports.enter_actualAchievement = function (req, res) {
  res.render("actualAchievement", {
    title: "Enter Actual Achievement",
  });
};

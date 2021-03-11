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
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

/*exports.goals_list = function (req, res) {
  res.render("planner", {
    title: "Planner",
  });
};*/

exports.modifyGoal_page = function (req, res) {
  res.send("<h1>Modify Goal.</h1>");
};
exports.addGoal_page = function (req, res) {
  res.send("<h1>Add Goal to Planner.</h1>");
};

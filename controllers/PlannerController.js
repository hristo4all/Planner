exports.landing_page = function (req, res) {
  res.send("<h1>Welcome to my Application.</h1>");
};

exports.goals_list = function (req, res) {
  res.render("planner", {
    title: "Planner",
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

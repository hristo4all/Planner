const guestbookDAO = require("../models/plannerModel");
const userDao = require("../models/userModel");
const db = new guestbookDAO();
db.init();
//-----------------------------------------------------------------------------------------
exports.landing_page = function (req, res) {
  res.render("landingPage", {
    title: "Welcome Page",
    Home: 'class="current"',
    user: req.user,
  });
};
//-----------------------------------------------------------------------------------------
//rename

//-----------------------------------------------------------------------------------------
//get all entries from the database
exports.goals_list = function (req, res) {
  //-----------------------------------------------------------------------
  // find today's date
  var date = new Date();
  var today =
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  //-----------------------------------------------------------------------

  db.getAllEntries()
    .then((list) => {
      res.render("planner", {
        title: "Planner",
        today: today,
        exercises: list,
        PlannerNav: 'class="current"',
        user: req.user,
      });
      console.log("promise resolved");
      //console.log(list);
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
  //-----------------------------------------------------------------------
};
//-----------------------------------------------------------------------------------------
exports.show_register_page = function (req, res) {
  res.render("register", {
    title: "Register",
    register: 'class="current"',
  });
};
//-----------------------------------------------------------------------------------------
//User registration POST

exports.post_new_user = function (req, res) {
  const user = req.body.username;
  const password = req.body.pass;
  //console.log("register user", user, "password", password);

  if (!user || !password) {
    res.status(401).send("no user or no password supplied");
    return;
  }

  userDao.lookup(user, function (err, u) {
    if (u) {
      res.status(401).send("User exists:");
      return;
    }
    userDao.create(user, password);
    res.redirect("/");
  });
};
//-----------------------------------------------------------------------------------------
//login GET
exports.show_login_page = function (req, res) {
  res.render("login", { title: "Login" });
};
//-----------------------------------------------------------------------------------------
//login POST
exports.post_login = function (req, res) {
  console.log("serializeUser wrote: ", req.session.passport.user);
  res.redirect("/");
};
//-----------------------------------------------------------------------------------------
exports.show_user_entries = function (req, res) {
  let user = req.params.author;
  db.getAllEntries(user)
    .then((list) => {
      res.render("planner", {
        title: "Planner",
        today: today,
        exercises: list,
        user: req.user,
        PlannerNav: 'class="current"',
        user: req.user,
      });
      console.log("promise resolved");
      //console.log(list);
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
};
//-----------------------------------------------------------------------------------------
exports.logout = function (req, res) {
  req.logout();
  res.redirect("/");
};
//-----------------------------------------------------------------------------------------
exports.modifyGoal_page = function (req, res) {
  res.send("<h1>Modify Goal.</h1>");
};
//-----------------------------------------------------------------------------------------
exports.add_goal = function (req, res) {
  res.render("newGoal", {
    title: "Add Goal",
    NewGoal: 'class="current"',
  });
};

//-----------------------------------------------------------------------------------------
exports.enter_actualAchievement = function (req, res) {
  res.render("actualAchievement", {
    title: "Enter Actual Achievement",
  });
};
//-----------------------------------------------------------------------------------------
exports.show_new_entries = function (req, res) {
  res.render("newEntry", {
    title: "Guest Book",
    user: req.user,
  });
};

//const guestbookDAO = require("../models/plannerModel");
const userDao = require("../models/userModel");
const db = require("../models/plannerModel");

//-----------------------------------------------------------------------------------------
var today = db.formatDate(new Date());

//var daysOfMonth = [];
/*var test;
test = db.getAllEntriesWithoutFormatting();
console.log("---------------------------------------");
console.log("");
console.log("---------------------------------------");
let daysOfMonth = db.getAllEntries();
daysOfMonth.then(function(days){
  console.log(days.length);
  let lastDay = db.getDayById(days.length);
console.log("===============================")
lastDay.then(function(result) {
  console.log(result)
  var test = result;
  console.log(Object.getOwnPropertyNames(test));
})
})
console.log("==============================================================")
var x = new Promise((resolve,object)=>{
  resolve(db.getAllEntries());
});
console.log(x);
//var lastDayOfMonth = db.getDayById(days.length).then(console.log(lastDayOfMonth));

//db.init(); */
//test = new Date(Date.UTC())
let test = db.doInit();
test.then(function(result) {
  if(result){
    db.init();
  }
  else{
    console.log("no need for init()");
  }
})
//db.init();

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
  //var today = db.formatDate(new Date());
  //-----------------------------------------------------------------------

  db.getAllEntries()
    .then((list) => {
      res.render("planner", {
        title: "Monthly Planner",
        today: today,
        days: list,
        PlannerNav: 'class="current"',
        user: req.user,
      });
      console.log("Controller goalsList promise resolved");
      //console.log(list);
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });

  //-----------------------------------------------------------------------
  //var firstDay = new Date();
  //var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
  //console.log("next week is ");
  //console.log(nextWeek);
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
  db.getEntriesByUser(user)
    .then((list) => {
      res.render("planner", {
        title: "Planner",
        today: today,
        exercises: list,
        user: req.user,
        PlannerNav: 'class="current"',
      });
      console.log("promise resolved");
      console.log(list);
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
  let id = req.params.dayId;
  console.log("this is the day ID: " +id);
  db.getDayById(id)
    .then((day) => {
      res.render("newGoal", {
        title: "Set Goal",
        dayV: day,
        PlannerNav: 'class="current"',
      });
      console.log("Controller promise resolved");
      console.log(day);
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
};
exports.post_add_goal = function (req, res) {
  console.log("this is POST");
  console.log(req.body.goal );
  //console.log("this is the req dayIn: "+req.params.dayId);
  db.setGoal(req.params.dayId,req.body.goal,req.user.user);
  res.redirect('/planner');
};

//-----------------------------------------------------------------------------------------
exports.set_Achievement = function (req, res) {
  console.log("GET ACHIEVEMENT")
  let id = req.params.dayId;
  console.log("this is the day ID: " +id);
  db.getDayById(id)
    .then((day) => {
      res.render("setAchievement", {
        title: "Set Achievement",
        day: day,
        formatted: db.formatDate(day.date),
        PlannerNav: 'class="current"',
      });
      console.log("set achievement Controller promise resolved");
      console.log(day);
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
};
exports.post_set_Achievement = function (req, res) {
  console.log("this is SET ACHIEVEMENT POST");
  console.log(req.body.achievement );
  console.log(req.params.dayId);
  //console.log("this is the req dayIn: "+req.params.dayId);
  db.setAchievement(req.params.dayId,req.body.achievement );
  res.redirect('/planner');
};
//-----------------------------------------------------------------------------------------
exports.get_notAchievedGoals = function (req, res) {
  db.getNotAchievedGoals(req.user.user).then((notAchievedGoals) => {
    res.render("notAchievedGoals", {
      title: " List of Not achieved Goals",
      days: notAchievedGoals,
      today:today,
      notAchieved: 'class="current"',
    });
    console.log("set achievement Controller promise resolved");
    console.log(notAchievedGoals);
  })
  .catch((err) => {
    console.log("Error: ");
    console.log(JSON.stringify(err));
  });
};
exports.get_achievedGoals = function (req, res) {
  db.getAchievedGoals(req.user.user).then((notAchievedGoals) => {
    res.render("achievedGoals", {
      title: " List of Achieved Goals",
      days: notAchievedGoals,
      today:today,
      achieved: 'class="current"',
    });
    console.log("set achievement Controller promise resolved");
    console.log(notAchievedGoals);
  })
  .catch((err) => {
    console.log("Error: ");
    console.log(JSON.stringify(err));
  });
};
//-----------------------------------------------------------------------------------------
exports.delete_Goal = function (req, res) {
db.deleteGoal(req.params.dayId);
res.redirect("/planner");
};
//-----------------------------------------------------------------------------------------
exports.delete_Achievement = function (req, res) {
  db.deleteAchievement(req.params.dayId);
  res.redirect("/planner");
  };
  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
exports.mark_Completed_Goal = function (req, res) {
  db.markGoal(req.params.dayId);
  res.redirect("/planner");
  };
  //-----------------------------------------------------------------------------------------


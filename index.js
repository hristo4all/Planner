//------------------------------------------------------------------------------------------------------------
const express = require("express");
const router = require("./routes/PlannerRoutes");
const path = require("path");
const mustache = require("mustache-express");
//const bodyParser = require("body-parser");
const auth = require("./auth/auth");
const passport = require("passport");
const session = require("express-session");
//------------------------------------------------------------------------------------------------------------
const app = express();
//------------------------------------------------------------------------------------------------------------
const public = path.join(__dirname, "public");
console.log("public is:", public);
app.use(express.static("public"));
//------------------------------------------------------------------------------------------------------------
app.engine("mustache", mustache());
app.set("view engine", "mustache");
//------------------------------------------------------------------------------------------------------------
app.use(express.urlencoded({ extended: false }));
//------------------------------------------------------------------------------------------------------------
app.use(
  session({
    secret: "dont tell anyone",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// initialize authentication with passport
auth.init();
//------------------------------------------------------------------------------------------------------------
app.use("/", router);

app.listen(3000, () => {
  console.log("Server started on port 3000. Ctrl^c to quit.");
});
//------------------------------------------------------------------------------------------------------------
/*
app.get("/", function (req, res) {
  res.send("Hello! Welcome to my application.");
});
app.get("/planner", function (req, res) {
  res.send("<h1>Planner</h1>");
});

app.get("/ModifyGoal", function (req, res) {
  res.send("<h1>Modify Goal</h1>");
});

app.get("/addGoal", function (req, res) {
  res.send("<h1>Add Goal to Planner</h1>");
});

app.use(function (req, res) {
  res.status(404);
  res.send("Oops! We didn't find what you are looking for.");
});*/

const express = require("express");
const app = express();
const mustache = require("mustache-express");

app.listen(3000, () => {
  console.log("Server started on port 3000. Ctrl^c to quit.");
});

const router = require("./routes/PlannerRoutes");
app.use("/", router);

app.engine("mustache", mustache());
app.set("view engine", "mustache");
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

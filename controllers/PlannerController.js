exports.landing_page = function (req, res) {
  res.send("<h1>Welcome to my Application.</h1>");
};

exports.goals_list = function (req, res) {
  res.render("planner", {
    title: "Planner",
    weeks: [
      {
        weekNo: 1,
        days: [
          {
            day: "Monday",
            exercise: "20 x Squats",
            actualAchievement: "done",
          },
          {
            day: "Tuesday",
            exercise: "4 x Dumbell Press",
            actualAchievement: "2x",
          },
          {
            day: "Wednessday",
            exercise: "4 x bicep curl",
            actualAchievement: "3x",
          },
          {
            day: "Thursday",
            exercise: "3 x Shoulder Press",
            actualAchievement: "done",
          },
          {
            day: "Friday",
            exercise: "4 x Leg Press",
            actualAchievement: "2x",
          },
          {
            day: "Saturday",
            exercise: "30 x crunches",
            actualAchievement: "done",
          },
          {
            day: "Sunday",
            exercise: "4 x Bench Press",
            actualAchievement: "done",
          },
        ],
      },
      {
        weekNo: 2,
        days: [
          {
            day: "Monday",
            exercise: "Fuck you",
            actualAchievement: "done",
          },
          {
            day: "Tuesday",
            exercise: "4 x Dumbell Press",
            actualAchievement: "2x",
          },
          {
            day: "Wednessday",
            exercise: "4 x bicep curl",
            actualAchievement: "3x",
          },
          {
            day: "Thursday",
            exercise: "3 x Shoulder Press",
            actualAchievement: "done",
          },
          {
            day: "Friday",
            exercise: "4 x Leg Press",
            actualAchievement: "2x",
          },
          {
            day: "Saturday",
            exercise: "30 x crunches",
            actualAchievement: "done",
          },
          {
            day: "Sunday",
            exercise: "4 x Bench Press",
            actualAchievement: "done",
          },
        ],
      },
    ],
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

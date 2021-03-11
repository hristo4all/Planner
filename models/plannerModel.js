const nedb = require("nedb");

class Planner {
  constructor(dbFilePath) {
    if (dbFilePath) {
      this.db = new nedb({ filename: dbFilePath, autoload: true });
      console.log("DB connected to " + dbFilePath);
    } else {
      this.db = new nedb();
    }
  }
  init() {
    this.db.insert({
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
    });
    //for later debugging
    console.log("Week 1 record inserted");

    this.db.insert({
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
    });
    //for later debugging
    console.log("Week 2 record inserted");
  }
  getAllEntries() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
      //use the find() function of the database to get the data,
      //error first callback function, err for error, entries for data
      this.db.find({ weekNo: 1 }, function (err, entries) {
        //if error occurs reject Promise
        if (err) {
          reject(err);
          //if no error resolve the promise & return the data
        } else {
          resolve(entries);
          //to see what the returned data looks like
          console.log("function all() returns: ", entries);
        }
      });
    });
  }
}
module.exports = Planner;

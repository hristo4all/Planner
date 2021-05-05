const nedb = require("nedb");

class Planner {
  constructor(dbFilePath) {
    if (dbFilePath) {
      this.db = new nedb({
        filename: dbFilePath,
        autoload: true,
        corruptAlertThreshold: 1,
      });
      console.log("DB connected to " + dbFilePath);
    } else {
      this.db = new nedb();
    }
  }

  init() {
    this.db.remove({}, { multi: true }, function (err, numRemoved) {});
    //-----------------------------------------------------------------------
    // get this week's monday date
    function getMonday(d) {
      d = new Date(d);
      var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
      return new Date(d.setDate(diff));
    }

    // add a day to a date
    function addDay(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
    //-----------------------------------------------------------------------
    var monday = getMonday(new Date());
    console.log(monday);
    //----------------------------------------------------------------------
    var exercises = [
      {
        day: "Monday",
        exercise: "20 x Squats",
        actualAchievement: "done",
        user: "",
        exdate: monday,
      },
      {
        day: "Tuesday",
        exercise: "4 x Dumbell Press",
        actualAchievement: "2x",
        user: "",
        exdate: addDay(monday, 1),
      },
      {
        day: "Wednessday",
        exercise: "",
        actualAchievement: "",
        user: "",
        exdate: addDay(monday, 2),
      },
      {
        day: "Thursday",
        exercise: "3 x Shoulder Press",
        actualAchievement: "done",
        user: "",
        exdate: addDay(monday, 3),
      },
      {
        day: "Friday",
        exercise: "",
        actualAchievement: "",
        user: "",
        exdate: addDay(monday, 4),
      },
      {
        day: "Saturday",
        exercise: "30 x crunches",
        actualAchievement: "done",
        user: "",
        exdate: addDay(monday, 5),
      },
      {
        day: "Sunday",
        exercise: "",
        actualAchievement: "",
        user: "",
        exdate: addDay(monday, 6),
      },
    ];
    console.log("Inserted into db: ");
    console.log(exercises);
    //----------------------------------------------------------------------
    this.db.insert(exercises);

    //for later debugging
    console.log("Exercises record inserted");
  }
  resetDB() {
    this.db.remove({}, { multi: true }, function (err, numRemoved) {});
  }

  getAllEntries() {
    //-----------------------------------------------------------------------
    //format a date for displaying
    function formatDate(date) {
      return (
        date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
      );
    }
    //-----------------------------------------------------------------------
    //loop thorugh the collection and format the date.
    function myFunction(item, index, arr) {
      arr[index].exdate = formatDate(item.exdate);
    }
    //-----------------------------------------------------------------------
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
      //use the find() function of the database to get the data,
      //error first callback function, err for error, entries for data
      this.db.find({}, function (err, entries) {
        //if error occurs reject Promise
        if (err) {
          reject(err);
          //if no error resolve the promise & return the data
        } else {
          entries.forEach(myFunction);
          entries.sort((a, b) => {
            return a.exdate > b.exdate ? 1 : a.exdate < b.exdate ? -1 : 0;
          });
          resolve(entries);
          //to see what the returned data looks like
          console.log("function all() returns: ", entries);
        }
      });
    });
  }
  getEntriesByDay(dayIn) {
    console.log("this is getEntriesByDay");
    return new Promise((resolve, reject) => {
      this.db.find({ day: dayIn }, function (err, day) {
        if (err) {
          console.log("error occured");
          reject(err);
        } else {
          resolve(day);
        }
      });
    });
  }
  createGoal(dayIn) {
    var goal = {
      day: dayIn.day,
      exercise: dayIn.exercise,
      actualAchievement: dayIn.actualAchievement,
      user: dayIn.user,
      exdate: dayIn.exdate,
    };
    console.log("goal created");
    console.log(goal);
    /*db.update(
      { day: dayIn },
      { $set: { exercise: exerciseIn } },
      { multi: true },
      function (err, numReplaced) {
        console.log(err);
      }
    );*/
    this.db.insert(goal, function (err, doc) {
      if (err) {
        console.log("Error inserting document", subject);
      }
    });
  }
}
const dao = new Planner("planner.db");
//dao.init();
module.exports = dao;

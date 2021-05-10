const nedb = require("nedb");
var moment = require("moment");
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
    console.log("Planner init() called");
    //reset the database
    //this.db.remove({}, { multi: true }, function (err, numRemoved) {});
    //-----------------------------------------------------------------------
    /* Get all days and dates within a months
     * @param {int} The month number, 0 based
     * @param {int} The year, not zero based, required to account for leap years
     * @return {Date[]} List with date objects for each day of the month
     */
    function getDaysInMonthUTC(month, year) {
      
      //var date =new Date(Date.UTC(2021,7,1));
      //month=7;
      var date = new Date(Date.UTC(year, month, 1));
      var days = [];
        while (date.getUTCMonth() === month) {
          days.push(new Date(date));
          date.setUTCDate(date.getUTCDate() + 1);
        }
      //console.log("days:");
      //console.log(days);
      return days;
    }

    var date = new Date();
    var month = date.getUTCMonth();
    var year = date.getUTCFullYear();

    var dates = getDaysInMonthUTC(month, year);
      var dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      //=================================================================
      var objDays = []; // array to hold the day object
      var x; //counter
      for (x = 0; x < dates.length; x++) {
        var day = {
          name: dayNames[dates[x].getUTCDay()],
          goal: "",
          achievement: "",
          user: "",
          date: dates[x],
          dayId: x + 1,
        };
        objDays.push(day);
      }
      //console.log(objDays);
      console.log("Inserted into db: ");
      //---------------------------------------
      //insert array objDays to the databases
      this.db.insert(objDays);
  }
  //get all data from the database
  getAllEntries() {
    //loop thorugh the collection and format the date.
    function forEachFunction(item, index, arr) {
      /*console.log("==========================================================");
      console.log(arr[index].date);
      console.log("----------------------------------------------------------");
      console.log(item);
      console.log("----------------------------------------------------------");
      console.log(formatDate(item.date));
      console.log("==========================================================");*/
      item.date = formatDate(item.date);
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
          entries.sort((a, b) => a.dayId - b.dayId);
          entries.forEach(forEachFunction);
          resolve(entries);
          //to see what the returned data looks like
          //console.log("function all() returns: ", entries);
        }
      });
    });
  }
  //-----------------------------------------------------------------------------------
  getDayById(dayIdIn) {
    //var parsed = parseInt(dayIdIn,10);
    //console.log("this is getDayById" + parsed);
    return new Promise((resolve, reject) => {
      this.db.find({ dayId: parseInt(dayIdIn, 10) }, function (err, day) {
        if (err) {
          console.log("error occured in Planner model");
          reject(err);
        } else {
          console.log("Found day:");
          //console.log(day);
          resolve(day);
        }
      });
    });
  }
  //=====================================================================================
  getNotAchievedGoals(user) {
    //var parsed = parseInt(dayIdIn,10);
    //console.log("this is getDayById" + parsed);
    console.log("this is getNotAchievedGoals()");
    console.log("user is: " + user);
    return new Promise((resolve, reject) => {
      this.db.find({ user: user }, function (err, days) {
        if (err) {
          console.log("error occured in Planner model:getNotAchievedGoals()");
          reject(err);
        } else {
          var notAchievedGoals = [];
          console.log("days:");
          console.log(days);
          days.forEach(myFunction);
          function myFunction(item, index) {
            //var test =[];
            if (item.goal != "" && item.achievement === "") {
              item.date = formatDate(item.date);
              notAchievedGoals.push(item);
              console.log("inside foreach");
              console.log(item);
            }
          }
          //notAchievedGoals.forEach(myFunction);
          resolve(notAchievedGoals);
          console.log("Not Achieved Goals:");
          console.log(notAchievedGoals);
        }
      });
    });
  }
  //-----------------------------------------------------------------------------------

  getAchievedGoals(user) {
    //var parsed = parseInt(dayIdIn,10);
    //console.log("this is getDayById" + parsed);
    console.log("this is getNotAchievedGoals()");
    console.log("user is: " + user);
    return new Promise((resolve, reject) => {
      this.db.find({ user: user }, function (err, days) {
        if (err) {
          console.log("error occured in Planner model:getNotAchievedGoals()");
          reject(err);
        } else {
          var notAchievedGoals = [];
          console.log("days:");
          console.log(days);
          days.forEach(myFunction);
          function myFunction(item, index) {
            //var test =[];
            if (item.goal != "" && item.achievement != "") {
              item.date = formatDate(item.date);
              notAchievedGoals.push(item);
              console.log("inside foreach");
              console.log(item);
            }
          }
          //notAchievedGoals.forEach(myFunction);
          resolve(notAchievedGoals);
          console.log("Not Achieved Goals:");
          console.log(notAchievedGoals);
        }
      });
    });
  }
  //-----------------------------------------------------------------------------------
  setGoal(id, newGoal, userId) {
    console.log("setGoal id: " + id);
    this.db.update(
      { dayId: parseInt(id, 10) },
      { $set: { goal: newGoal } },
      function (err, numReplaced) {
        console.log("replaced---->" + numReplaced);
      }
      //add setAchievement(id, "") to reset achievement
    );
    this.db.update(
      { dayId: parseInt(id, 10) },
      { $set: { user: userId } },
      function (err, numReplaced) {
        console.log("replaced---->" + numReplaced);
      }
      //add setAchievement(id, "") to reset achievement
    );
  }
  //-----------------------------------------------------------------------------------
  deleteGoal(id) {
    console.log("deleteGoal id: " + id);
    this.db.update(
      { dayId: parseInt(id, 10) },
      { $set: { goal: "" } },
      function (err, numReplaced) {
        console.log("replaced---->" + numReplaced);
      }
      //add setAchievement(id, "") to reset achievement
    );
  }
  //-----------------------------------------------------------------------------------
  setAchievement(id, achievement) {
    this.db.update(
      { dayId: parseInt(id, 10) },
      { $set: { achievement: achievement } },
      function (err, numReplaced) {
        console.log("replaced---->" + numReplaced);
      }
    );
  }
  //-----------------------------------------------------------------------------------
  deleteAchievement(id) {
    this.db.update(
      { dayId: parseInt(id, 10) },
      { $set: { achievement: "" } },
      function (err, numReplaced) {
        console.log("replaced---->" + numReplaced);
      }
    );
  }
  //-----------------------------------------------------------------------------------
  markGoal(id) {
    this.db.update(
      { dayId: parseInt(id, 10) },
      { $set: { achievement: "Achieved" } },
      function (err, numReplaced) {
        console.log("replaced---->" + numReplaced);
      }
    );
  }
  //-----------------------------------------------------------------------------------
  formatDate(date) {
    //console.log("this is the method formatDate")
    if (date == "" || date == null) {
      return -1;
    } else {
      return (
        //date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
        moment(date).format("MMM Do YYYY")
      );
    }
  }
  //-----------------------------------------------------------------------------------

  doInit(){
    return new Promise((resolve, reject) => {
      this.db.find({ }, function (err, days) {
        if (err) {
          console.log("error occured in Planner model");
          reject(err);
        } else {
          var lastDayDate = new Date(Math.max.apply(null, days.map(function(e) {
            return new Date(e.date);
          })));
          //console.log(lastDayDate);
          var a;
          var today = new Date();
          //console.log(today);
          //console.log(today.getUTCMonth());
          //console.log(lastDayDate.getUTCMonth());
          if(days !=null && today.getUTCMonth()===lastDayDate.getUTCMonth()){
            resolve(a=false)
          }
          else{
            resolve(a=true)
          }
        }
      });
    });

  }

  
} // end of class

function formatDate(date) {
  //console.log("this is the function formatDate")
  if (date == "" || date == null) {
    return -1;
  } else {
    return (
      //date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
      moment(date).format("MMM Do YYYY")
    );
  }
}

const dao = new Planner("../planner.db");
//dao.init();
module.exports = dao;

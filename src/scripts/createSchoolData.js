var fs = require("fs");
var axios = require("axios");
var degrees = require("../data_set/degree_subject.json");
var query = require("./query.json");

var url =
  "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/UF/UF0205/ExaLasarOversikt";

var ageGroup1 = "0-19";
var ageGroup2 = "20-24";
var ageGroup3 = "25-29";
var ageGroup4 = "30-34";
var ageGroup5 = "35-39";
var ageGroup6 = "40-49";
var ageGroup7 = "50-59";
var ageGroup8 = "60+";

//httpPost(url, "YAGRO");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function httpPost(url, value) {
  axios
    .post(url, query)
    .then(function(response) {
      var exam = new Object();
      exam.exam = value;
      var examAsJson = JSON.stringify(exam);

      var data = response.data;
      console.log(data.columns);
      for (i = 0; i < data.length; i++) {
        console.log("Fetching data: " + i);
        console.log(data[i]);
        var stuff = data[i].key;
        if (stuff.length != 5) {
          console.log(
            "Found anomaly in key array. Size: " + data[i].values.length
          );

          var schoolId = stuff[0];
          var examId = stuff[1]; // skip
          var gender = stuff[2];
          var ages = stuff[3];
          var year = stuff[4]; // skip
          console.log(schoolId);
          console.log(examId);
          console.log(gender);
          console.log(ages);
          console.log(year);

          var numberOfStudents = data[i].values[0];
          console.log(numberOfStudents);
          if (data[i].values.length > 1) {
            console.log(
              "Found anomaly in values array. Size: " + data[i].values.length
            );
          }
        }
      }
      fs.appendFile("result.json", response.data, function(err) {
        if (err) throw err;
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

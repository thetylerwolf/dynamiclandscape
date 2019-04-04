// Change these two and go
var mappingFile = "wasteIdMapping"; // Change to your kpi mapping file
var resultFolder = "waste"; // Change and create folder with this name

var kpiFile = require("../data_set/" + mappingFile + ".json");
var munisFile = require("../data_set/municipalityIdMapping.json");
var fs = require("fs");
var axios = require("axios");
var baseUrl = "http://api.kolada.se/v2/data/kpi/";
var years = "/year/2014,2015,2016,2017,2018";

Object.keys(kpiFile).forEach(kpi => {
  var munisList;
  Object.keys(munisFile).forEach(muni => {
    if (munisList == null) {
      munisList = muni;
    } else {
      munisList = munisList + "," + muni;
    }
  });
  var theUrl = baseUrl + kpi + "/municipality/" + munisList + years;
  console.log("Sedning request: " + theUrl);
  getStuff(theUrl, kpi);
});

function getStuff(url, fileName) {
  axios
    .get(encodeURI(url))
    .then(function(response) {
      fs.appendFile(
        "../data_set/" + resultFolder + "/" + fileName + ".json",
        JSON.stringify(response.data, null, 4),
        function(err) {
          if (err) throw err;
        }
      );
    })
    .catch(function(error) {
      console.log("error: " + error);
    })
    .then(function() {});
}

var folderName = "elderlyCare";
var allYearsFileName = "all_elderlyCare_all_years";
var resultFileName = "all_elderlyCare_latest_years.json";

var goalsData = require("../data_set/" +
  folderName +
  "/" +
  allYearsFileName +
  ".json");
var fs = require("fs");
var result = new Object();
result.kpis = [];
goalsData.kpis.map(kpi => {
  // sort kpis in municipality by year
  kpi.municipalities.sort((a, b) => a.year - b.year);
  // reverse to put most recent first
  kpi.municipalities.reverse();

  // for each kpi we have in our list
  const allMunis = kpi.municipalities.reduce((acc, b) => {
    acc[b.id] = b.id;
    return acc;
  }, {});

  const mostRecentKpis = Object.keys(allMunis).map(muniId => {
    return kpi.municipalities.find(muni => muni.id == muniId);
  });

  kpi.municipalities = mostRecentKpis;

  var obj = new Object();
  obj.id = kpi.id;
  obj.municipalities = kpi.municipalities;

  result.kpis.push(obj);
});

fs.appendFile(
  "../data_set/" + folderName + "/" + resultFileName,
  JSON.stringify(result, null, 4),
  function(err) {
    if (err) throw err;
  }
);

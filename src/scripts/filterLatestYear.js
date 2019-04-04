var stuff = require("../data_set/elderlyCare/all_elderlyCare_all_years.json");        // Change to the filename you want to filter
var filteredFileName = '../data_set/elderlyCare/all_elderlyCare_latest_years.json';    // Change to the filename you want to create 
var fs = require("fs");

var municipalities = stuff.municipalities;
var done = false;

var muni = new Object();
muni.municipality = [];

Object.entries(municipalities).forEach(([key, value]) => {
  // value.kpis is a list with all KPIs for a muncipality
  var kpi = value.kpis;

  for (var i = 0; i < kpi.length; i++) {
    var latestYear = 0;
    var id = kpi[i].id;
    var deleteArray = [];

    if (kpi.length == i + 1) {
      writeNewData(value)
    } else {
      if (id === kpi[i + 1].id) {
        if (latestYear < kpi[i + 1].year) {
          latestYear = kpi[i + 1].year;
          kpi[i].id = "DELETE";
        }
      }
    }
  }

});


function writeNewData(value) {

  value.kpis = value.kpis.filter(function(value, index, arr) {
    return value.id !== "DELETE";
  });

  muni.municipality.push(value);

  
}

fs.appendFile( 
  filteredFileName, JSON.stringify(muni, null, 4),
  
  function(err) {
  if (err) throw err;
}
);

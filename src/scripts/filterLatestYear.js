var stuff = require("../data_set/elderlyCare/test.json");        // Change to the filename you want to filter
var filteredFileName = '../data_set/elderlyCare/test_new.json';    // Change to the filename you want to create 
var fs = require("fs");

var kpis = stuff.kpis;
var done = false;

var muni = new Object();
muni.municipality = [];

Object.entries(kpis).forEach(([key, value]) => {
  // value.municipalities is a list with all municipalities for a KPI
  var municipalities = value.municipalities;

  for (var i = 0; i < municipalities.length; i++) {
    var latestYear = 0;
    var id = municipalities[i].id;
    var deleteArray = [];

    if (municipalities.length == i + 1) {
      writeNewData(value);
    } else {
      if (id === municipalities[i + 1].id) {
        if (latestYear < municipalities[i + 1].year) {
          latestYear = municipalities[i + 1].year;
          municipalities[i].id = "DELETE";
        }
      }
    }
  }

});


function writeNewData(value) {

  value.municipalities = value.municipalities.filter(function(value, index, arr) {
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

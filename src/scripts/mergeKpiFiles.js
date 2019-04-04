// Change these three and go
var kpiMappingFile = "integrationIdMapping.json"; // Change to your kpi mapping file
var dataFolder = "integration"; // Should already exist
var resultFileName = "all_integration_all_years.json"; // The result file, should not exist

var ids = require("../data_set/mapping/" + kpiMappingFile);
var muniFile = require("../data_set/municipalityIdMapping.json");
var fs = require("fs");

var result = new Object();
var munis = (result.municipalities = []);
for (var muniId in muniFile) {
  var muni = new Object();
  muni.id = muniId;
  muni.kpis = [];
  munis.push(muni);
}

for (var kpi in ids) {
  console.log("Merging kpi: " + kpi);

  var file = require("../data_set/" + dataFolder + "/" + kpi + ".json");
  var array = file.values;

  for (i = 0; i < array.length; i++) {
    var value = array[i].values[0].value;
    if (value != null) {
      var mun = array[i].municipality;
      var year = array[i].period;
      var kpi = array[i].kpi;
      var list = result.municipalities;

      for (j = 0; j < list.length; j++) {
        if (list[j].id == mun) {
          var kpiObj = new Object();
          kpiObj.id = kpi;
          kpiObj.value = value;
          kpiObj.year = year;
          list[j].kpis.push(kpiObj);
        }
      }
    }
  }
}
fs.appendFile(
  "../data_set/" + dataFolder + "/" + resultFileName,
  JSON.stringify(result, null, 4),
  function(err) {
    if (err) throw err;
  }
);

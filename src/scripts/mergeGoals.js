var muniFile = require("../data_set/municipalityIdMapping.json");
var ids = require("../data_set/goalIdMapping.json");
var fs = require("fs");

var result = new Object();
var munis = (result.municipalities = []);
for (var muniId in muniFile) {
  if (muniFile.hasOwnProperty(muniId)) {
    var muni = new Object();
    muni.id = muniId;
    muni.kpis = [];
    munis.push(muni);
  }
}

for (var goal in ids) {
  console.log("Running goal: " + goal);

  if (ids.hasOwnProperty(goal)) {
    var file = require("../data_set/goals/" + goal + ".json");
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
}
fs.appendFile("./asd.json", JSON.stringify(result, null, 4), function(err) {
  if (err) throw err;
});

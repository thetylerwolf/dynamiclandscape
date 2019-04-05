// Change these three and go
var kpiMappingFile = "wasteIdMapping.json"; // Change to your kpi mapping file
var dataFolder = "waste"; // Should already exist
var resultFileName = "all_waste_all_years.json"; // The result file

var kpiFile = require("../data_set/mapping/" + kpiMappingFile);
var fs = require("fs");

var result = new Object();
var kpis = [];

for (var kpi in kpiFile) {
  console.log("Merging file: " + kpi);
  var array = new Object();
  array.id = kpi;
  array.municipalities = [];
  var file = require("../data_set/" + dataFolder + "/" + kpi + ".json");

  var fileArray = file.values;

  for (i = 0; i < fileArray.length; i++) {
    var object = new Object();
    object.id = fileArray[i].municipality;

    let v = fileArray[i].values.find(j => j.gender == "T");

    if (!v) {
      v = fileArray[i].values.reduce((acc, b) => {
        if (b.value == null) return acc;
        return (acc += b.value);
      }, 0);
    } else {
      v = v.value;
    }
    if (v != null) {
      object.value = v;
      object.year = fileArray[i].period;
      array.municipalities.push(object);
    }
  }
  kpis.push(array);
}

result = {
  kpis
};

fs.writeFileSync(
  "../data_set/" + dataFolder + "/" + resultFileName,
  JSON.stringify(result, null, 4)
);

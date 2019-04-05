//Change these two and go
var theMappingFile = "wasteIdMapping.json"; // The mapping file
var heading = "Household waste"; // Pick a nice header

var kpiDescriptionMappings = require("../data_set/mapping/" + theMappingFile);
var headingFilePath = "../data_set/headingMapping.json";
var headingFile = require(headingFilePath);
var fs = require("fs");

var ids = [];
Object.keys(kpiDescriptionMappings).forEach(kpi => {
  ids.push(kpi);
});

var result = new Object();
result.name = heading;
result.ids = ids;

console.log("Added:");
console.log(JSON.stringify(result, null, 4));

headingFile.push(result);

fs.writeFile(headingFilePath, JSON.stringify(headingFile, null, 4), function(
  err
) {
  if (err) throw err;
});

var fs = require("fs");
const mapping = require("../models/mappings.js");

fs.appendFile(
  "./municipalityIds.json",
  JSON.stringify(mapping.municipalityIds, null, 4),
  function(err) {
    if (err) throw err;
  }
);
fs.appendFile(
  "./nodeData.json",
  JSON.stringify(mapping.nodeData, null, 4),
  function(err) {
    if (err) throw err;
  }
);
fs.appendFile(
  "./modelData.json",
  JSON.stringify(mapping.modelData, null, 4),
  function(err) {
    if (err) throw err;
  }
);

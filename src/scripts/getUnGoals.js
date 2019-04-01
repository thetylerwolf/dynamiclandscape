//var result = require("./unGoals.json");
var stuff = require("../data_set/muncipalityIdMapping.json");
var fs = require("fs");
var axios = require("axios");
var goal =
  "N02904,N31816,U01411,N00403,N00925,N00923,N74811,U20462,N00404,N15428,N15533,N17461,N18409,N00209,N00943,N00952,N00953,N85069,N85051,N85052,N85053,N45933,N45929,N45905,N03700,N00955,N02906,N07900,U07451,N07418,N00956,U01413,N00973,U28532,N00927,N07907,N85047,N85048,U07801,U07414,U07514,N00401,U00437,N07400,U07917,N85054,N05831,U01420,N07403,N03102";
var url1 = "http://api.kolada.se/v2/data/kpi/" + goal + "/municipality/";
var url2 = "/year/2014,2015,2016,2017,2018";
var ids;
for (var value in stuff) {
  if (stuff.hasOwnProperty(value)) {
    if (ids == null) {
      ids = stuff[value];
    } else {
      ids = ids + "," + stuff[value];
    }
    //console.log(theUrl);
  }
}
var theUrl = url1 + ids + url2;
console.log("Sedning request: " + theUrl);
getStuff(theUrl);
function getStuff(url) {
  axios
    .get(encodeURI(url))
    .then(function(response) {
      //console.log(response.data);
      fs.appendFile(
        "./goals/" + "ALL" + ".json",
        JSON.stringify(response.data),
        function(err) {
          if (err) throw err;
        }
      );
    })
    .catch(function(error) {
      console.log("error: " + url);
    })
    .then(function() {});
}

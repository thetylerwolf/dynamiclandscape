var munToId = require("./municipalityIdMapping.json");
var mun = require("../data_set/municipalities.json");
var fs = require("fs");
var axios = require("axios");

var array = [];
function verifyUnique(obj) {
  var result = "";
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      if (array[obj[p]]) {
        // Found duplicate
        console.log(obj[p]);
      }
      array[obj[p]] = true;
      result += p + " , " + obj[p] + "\n";
    }
  }
  return result;
}

var counter = 0;
var result = new Object();
var munList = mun.objects.SWE_adm2.geometries;

verifyUnique(munToId);

for (i = 0; i < munToId.length; i++) {
  //getMuncipalityIds(munList[i].properties.NAME_2);
}

function getMuncipalityIds(muncipality) {
  axios
    .get(encodeURI("http://api.kolada.se/v2/municipality?title=" + muncipality))
    .then(function(response) {
      // handle success
      var list = response.data.values;
      for (i = 0; i < list.length; i++) {
        if (munToId.hasOwnProperty(list[i].title)) {
          if (munToId[list[i].title] != list[i].id) {
            console.log("*****");
            counter = counter + 1;
            console.log("Counter: " + counter);
            console.log(munToId[list[i].title] + " : " + list[i].id);
            console.log("*****");
          }
        }
      }
      var title = response.data.values[0].title;
      var id = response.data.values[0].id;
      var asd = new Object();
      asd[title] = id;
      //console.log("asdasdas: " + id);

      /*fs.appendFile("muncipalityToId.json", JSON.stringify(asd), function(err) {
        if (err) throw err;
      });*/
    })
    .catch(function(error) {
      // handle error
      console.log("error: " + muncipality);
    })
    .then(function() {});
}

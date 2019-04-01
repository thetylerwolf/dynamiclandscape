var result = require("./theResult.json");
var stuff = require("../data_set/theStuff.json");
var fs = require("fs");
var axios = require("axios");

for (var value in stuff) {
  if (stuff.hasOwnProperty(value)) {
    console.log(getStuff(""));
  }
}

function getStuff(url) {
  axios
    .get(encodeURI(url))
    .then(function(response) {
      console.log(response.data);
      /*fs.appendFile(result, JSON.stringify(asd), function(err) {
        if (err) throw err;
      });*/
    })
    .catch(function(error) {
      console.log("error: " + url);
    })
    .then(function() {});
}

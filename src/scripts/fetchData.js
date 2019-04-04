var stuff = require("../data_set/theStuff.json");
var fs = require("fs");
var axios = require("axios");

// Loop through your shit
Object.keys(stuff).forEach(theThing => {
  console.log(theThing);
});

// Get request + write to file
function getStuff(url) {
  axios
    .get(encodeURI(url))
    .then(function(response) {
      console.log(response.data);
      /*fs.appendFile(./resultFile.json, JSON.stringify(asd, null, 4), function(err) {
        if (err) throw err;
      });*/
    })
    .catch(function(error) {
      console.log("error: " + url);
    })
    .then(function() {});
}

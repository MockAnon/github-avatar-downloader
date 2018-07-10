// node download_avatars.js https://avatars0.githubusercontent.com/u/1615?v=4 avatars/kvirani.jpg

// User-Agent: curl/7.47.0

var secrets = require('./secrets.js');

var request = require('request');

var fs = require('fs');

var args = process.argv.slice(2);

var sourceURL = args[0] || "https://avatars0.githubusercontent.com/u/1615?v=4";
var filePathing = args[1] || "avatars/kvirani.jpg";




// downloadImageByURL(sourceURL, filePathing);

// console.log("sourceURL" + sourceURL);
// console.log("filePathing" + filePathing);

// console.log('NOTE!!!!!!:', args);

// console.log("secrets",secrets);

console.log('Welcome to the GitHub Avatar Downloader!');



function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secrets.GITHUB_TOKEN
    }
    // request(options);
    };

  request(options, function(err, res, body) {

    if(err) {
      return cb(err, null);
    } else {
      var info = JSON.parse(body);
      cb(null, info)
    }
  });
}

// function repoItemPrinter(err, data) {
//   if (err) {
//     console.log('Error', err)
//   } else {
//     console.log('DATA', data)
//   }
// }

getRepoContributors("jquery", "jquery", repoItemPrinter)

getRepoContributors("jquery", "jquery", function(err, result) {
getRepoContributors("jquery", "jquery", function(err, result) {
  if(err){
    console.log("Errors:", err);
  } else if(result.message) {
    console.log(result.message)
  } else {
    result.forEach(function(item) {
      console.log(item);
      let pathing = "avatars/" + item.login + ".jpeg";
      // let pathing = filePathing;
      let item_url = item.url;
      // let item_url = sourceURL;

      downloadImageByURL(item_url, pathing);
      // invokde downloadImageUrl()

    })
  }
});


function downloadImageByURL(url, filePath) {

  // console.log("url:", url);
  console.log("filePath:", filePath);

  // var request = require('request');


  console.log('Downloading image...');

  request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));               // Note 4
       console.log('Download complete.');
  // ...
}


//https://avatars0.githubusercontent.com/u/1615?v=4

// downloadImageByURL(avatar_url, "avatars/kvirani.jpg");




// // Notes:
// // 1. `request.get` is equivalent to `request()`
// // 2. `request.on('error', callback)` handles any error
// // 3. `request.on('response, callback)` handles the response
// // 4. What is happening here?


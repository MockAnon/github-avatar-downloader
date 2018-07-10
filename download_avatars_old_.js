// User-Agent: curl/7.47.0

var secrets = require('./secrets.js');

var request = require('request');

var fs = require('fs');

var args = process.argv.slice(2);



// var theOwner = args[0] || "jquery";
// var filePathing = args[1] || "jquery";

var theOwner = args[0];
var filePathing = args[1];






// function end(){
//   console.log("error, both feilds need to have inputs. Please input jeresig nodelist");
//   break;
// }

if(args[1] == null){
  console.log("error, both feilds need to have inputs. Please input jeresig nodelist. OR enter jquery jquery");
  exit();


}


console.log('NOTE!!!!!!:', args);

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
      console.log(info);
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

// getRepoContributors("jquery", "jquery", repoItemPrinter)

// getRepoContributors("jquery", "jquery", function(err, result) {
getRepoContributors(theOwner, filePathing, function(err, result) {
  if(err){
    console.log("Errors:", err);
  // } else if(result.message) {
  //   console.log(result.message)
  } else {
    result.forEach(function(item) {
      console.log(item);
      let pathing = "avatars/" + item.login + ".jpeg";
      let item_url = item.avatar_url;
      // Create the url
      // Create the filepage
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





















// // require `request` and the Node `fs` (filesystem) module
// var request = require('request');
// var fs = require('fs');

// console.log('Downloading image...');

// request.get('https://sytantris.github.io/http-examples/future.jpg')               // Note 1
//        .on('error', function (err) {                                   // Note 2
//          throw err;
//        })
//        .on('response', function (response) {                           // Note 3
//          console.log('Response Status Code: ', response.statusCode);
//        })
//        .pipe(fs.createWriteStream('./future.jpeg'));               // Note 4
//        console.log('Download complete.');

// // Notes:
// // 1. `request.get` is equivalent to `request()`
// // 2. `request.on('error', callback)` handles any error
// // 3. `request.on('response, callback)` handles the response
// // 4. What is happening here?


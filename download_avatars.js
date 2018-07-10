var secrets = require('./secrets.js');

var request = require('request');

var fs = require('fs');

var args = process.argv.slice(2);

var theOwner = args[0];

var filePathing = args[1];

if(args[1] == null){
  console.log("error, both feilds need to have inputs. Please input jeresig nodelist. OR enter jquery jquery");
  exit();
}

console.log('NOTE!!!!!!:', args);
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secrets.GITHUB_TOKEN
    }
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

getRepoContributors(theOwner, filePathing, function(err, result) {
  if(err){
    console.log("Errors:", err);
  } else {
    result.forEach(function(item) {
      console.log(item);
      let pathing = "avatars/" + item.login + ".jpeg";
      let item_url = item.avatar_url;
      downloadImageByURL(item_url, pathing);
    })
  }
});

function downloadImageByURL(url, filePath) {
  console.log("filePath:", filePath);
  console.log('Downloading image...');

  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));
       console.log('Download complete.');
  // ...
}

// User-Agent: curl/7.47.0
//https://avatars0.githubusercontent.com/u/1615?v=4
// downloadImageByURL(avatar_url, "avatars/kvirani.jpg");
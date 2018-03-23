require("dotenv").config();
var fs = require('fs');
var keys = require('./key.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
//spotify.search({})


// setting the 4 liri commands to var
var liriCommand = process.argv[2];

var choice = '';

for(var i = 3; i < process.argv.length; i++) {
    if(i > 3 || i < process.argv.length) {
        choice = choice + '+' + process.argv[i];
    }
    else{
        choice = process.argv[3];
    }
}

switch (liriCommand) {
case 'my-tweets':
    myTweets();
    break;

case `spotify-this-song`:
    if(choice) {
        spotifySearch(choice);
    }
    else{
        spotifySearch('')
    }
    
    break;

case 'movie-this':
    movie();
    break;

case 'do-what-it-says':
    obey();
    break;
}

function myTweets() {

    var params = {screen_name: 'cryptocorndog'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for(var i = 0; i < tweets.length; i++) {
                var tweetDate = tweets[i].created_at;

                console.log('@cryptocorndog: ' + tweets[i].text + 'Date: ' + tweetDate);
                console.log('---------------------');

                fs.appendFile('random.txt', '@cryptocorndog: ' + tweets[i].text + 'Date: ' + tweetDate)
                fs.appendFile('random.txt', '---------------------');
            }
        }
        else{
            console.log('Error!')
        }
    });
}

function spotifySearch(song) {

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       console.log(data); 
      });
}
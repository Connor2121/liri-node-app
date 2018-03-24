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

// deals with multiple word searches for movie or song

for(var i = 3; i < process.argv.length; i++) {
    if(i > 3 || i < process.argv.length) {
        choice = choice + '+' + process.argv[i];
    }
    else{
        choice = process.argv[3];
    }
}
// four different liri commands and related functions
switch (liriCommand) {
case 'my-tweets':
    myTweets();
    break;

case `spotify-this-song`:
    if(choice) {
        spotifySearch(choice);
    }
    else{
        spotifySearch('Breakthrough')
    }
    break;

case 'movie-this':
    if(choice) {
        movieSearch(choice);
    }
    else {
        movieSearch('Mr. Nobody')
    }
    break;

case 'do-what-it-says':
    obey();
    break;
}

function myTweets() {

    var params = {screen_name: 'cryptocorndog'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
           return console.log('Error!')
        }
        for(var i = 0; i < tweets.length; i++) {
            var tweetDate = tweets[i].created_at;

            console.log('@cryptocorndog: ' + tweets[i].text + '\nDate: ' + tweetDate);
            console.log('---------------------');

            // logs to txt file, but gives a deprecation warning: Calling an asynchronous function without callback is deprecated.
            fs.appendFile('random.txt', '\n@cryptocorndog: ' + tweets[i].text + '\nDate: ' + tweetDate)
            fs.appendFile('random.txt', '\n---------------------');
        }
    });
}
    


function spotifySearch(song) {

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        for(var i = 0; i < data.tracks.items.length; i++) {

            var spotInfo = data.tracks.items[i];
           
            console.log('Artist: ' + spotInfo.artists[0].name + '\nSong: ' + spotInfo.name + 
            '\nPreview Link: ' + spotInfo.preview_url +'\nAlbum: ' + spotInfo.album.name); 
            console.log('-------------------------');

            // logs to  txt file, but gives a deprecation warning: Calling an asynchronous function without callback is deprecated.
            fs.appendFile('random.txt', '\nArtist: ' + spotInfo.artists[0].name + '\nSong: ' + spotInfo.name + 
            '\nPreview Link: ' + spotInfo.preview_url +'\nAlbum: ' + spotInfo.album.name);
            fs.appendFile('random.txt', '\n---------------------');
        }
    });
}

function movieSearch(movie) {

    request('http://www.omdbapi.com/?apikey=trilogy&t=' + movie  , function (error, response, body) {

        body = JSON.parse(body);
        if(error) {
           return console.log('error:', error);
        }
        if(movie === 'Mr. Nobody') {
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/")
            console.log("It's on Netflix!")
            console.log('-------------------------')
            fs.appendFile('random.txt',"\nIf you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            fs.appendFile('random.txt', "\nIt's on Netflix!")
            fs.appendFile('random.txt', '\n--------------------------')
        }
        //console.log('statusCode:', response && response.statusCode); 
        //console.log(JSON.stringify(body, null, 5)); 
        console.log('Title: ' + body.Title + '\nYear: ' + body.Year + '\nIMBD Rating: ' + body.Ratings[0].Value + 
        '\nRotten Tomato Rating: ' + body.Ratings[1].Value + '\nCountries Produced In: ' + body.Country + 
        '\nLanguage: ' + body.Language + '\nPlot: ' + body.Plot + '\nActors: ' + body.Actors);
        console.log('-------------------------')

        fs.appendFile('random.txt', '\nTitle: ' + body.Title + '\nYear: ' + body.Year + '\nIMBD Rating: ' + body.Ratings[0].Value + 
        '\nRotten Tomato Rating: ' + body.Ratings[1].Value + '\nCountries Produced In: ' + body.Country + 
        '\nLanguage: ' + body.Language + '\nPlot: ' + body.Plot + '\nActors: ' + body.Actors)
        fs.appendFile('random.txt', '\n--------------------------------')
    });
}
# liri-node-app

Week 10 Liri Bot

This application uses Node JS to create LIRI, a similar bot to iPhones's SIRI. LIRI is a Language Interpretation and Recognition Interface.  LIRI uses the command line to take in pararmeters and return data tied to one of four commands:

my-tweets
spotify-this-song
movie-this
do-what-it-says

#Getting Started

Clone this repository.
Navigate to directory where the repo was cloned.
Run the command 'npm install' in Terminal(mac) or GitBash(windows). This installs neccessary npm packages for application to run.
Run the command 'node liri.js' + one of the four commands.

#Command Description

1. node liri.js my-tweets
This will show your last 20 tweets and when they were created at in your terminal/bash window.

2. node liri.js spotify-this-song '<song name here>'
This will show the following information about the song in your terminal/bash window:

Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from

If no song is provided then your program will default to 'Breakthrough' by Modest Mouse and other artists.

3. node liri.js movie-this <movie name>
This will output the following information in terminal/bash.

Title of the movie.
Year the movie came out.
IMDB Rating of the movie.
Country where the movie was produced.
Language of the movie.
Plot of the movie.
Actors in the movie.
Rotten Tomatoes Rating.
Rotten Tomatoes URL.

Or if no movie is passed through, it will default to "Mr. Nobody"

4. node liri.js do-what-it-says

It will run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

#Technology Used

Node.js
Twitter NPM Package - https://www.npmjs.com/package/twitter
Spotify NPM Package - https://www.npmjs.com/package/node-spotify-api
Request NPM Package - https://www.npmjs.com/package/request
Request is used to grab data from OMDB API.
DotEnv NPM Package - https://www.npmjs.com/package/dotenv

#Author 
Connor Reed





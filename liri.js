
// Reads and sets any environment variables 
require("dotenv").config();
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
// API Key links
// var spotifyKeys = keys.spotify;
// var twitterKeys = keys.twitter;

// var spotify = keys.spotify;
// var client = keys.twitter;

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// input variables
var liriOpp = process.argv[2]
var userRequest = "";

// loops through the entire node comand to create user request (helpful for multi-word)

for (let i =3; i < process.argv.length; i++) {
    if (process.argv[i]===(process.argv.length-1)) {
        userRequest +=process.argv[i];
    } else {
       userRequest += process.argv[i] + " ";  
    }
   
}

// `my-tweets`

if (liriOpp === 'my-tweets') {
    client.get('statuses/show/:id', function (error, tweets, response) {
        if (error) throw error;
        console.log(tweets);  // The favorites. 
        console.log(response);  // Raw response object. 
        console.log(JSON.parse(response));  // Raw response object. 
    });
}

// `spotify-this-song`

else if (liriOpp === 'spotify-this-song') {
    spotify.search({ type: 'track', query: "Royals"}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
        console.log(JSON.parse(data));
    });
}

// `movie-this`

else if (liriOpp === 'movie-this') {

    let movieRequest = userRequest.split(" ").join("+");
    if (userRequest === null || userRequest === undefined) {
        movieRequest = "Mr. Nobody";
        let OMDBApi = "http://www.omdbapi.com/?t=" + movieRequest + "&apikey=587c29c0";

        request(OMDBApi, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(JSON.parse(body));
            }
        });
    } else {
        let OMDBApi = "http://www.omdbapi.com/?t=" + movieRequest + "&apikey=587c29c0";

        request(OMDBApi, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(JSON.parse(body));
            }
        });
    }
   


}


// `do-what-it-says`

else if (liriOpp === 'do-what-it-says') {

}

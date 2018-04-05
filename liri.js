
// Reads and sets any environment variables 
require("dotenv").config();
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
// API Key links

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// input variables
var liriOpp = process.argv[2]
var userRequest = "";

// loops through the entire node comand to create user request (helpful for multi-word)

for (let i =3; i < process.argv.length; i++) {
    if (process.argv[i]===((process.argv.length)-1)) {
        userRequest +=process.argv[i];
    } else {
       userRequest += process.argv[i] + " ";  
    }
   
}

// `my-tweets`

if (liriOpp === 'my-tweets') {
    var params = { screen_name: 'oddliferants' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            var tweetNumber = 1;
            console.log("====== Your Tweets =======" + "\n");
            for (let i = 0; i < tweets.length; i++) {
                console.log("====Tweet number " + tweetNumber + "====" + "\n");
                tweetNumber++;            
                console.log(tweets[i].created_at +             
                     "\n" + "\n" + tweets[i].text + "\n");
            }
            console.log("========================" + "\n");
        } else {
            return error;
        }
    });
}

// `spotify-this-song`

// Trying to log multiple artists
else if (liriOpp === 'spotify-this-song') {
    spotify.search({ type: 'track', query: userRequest, limit: 1}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
            function artistNames() {
                
                for (var j = 0; j < data.tracks.items[0].artists.length; j++) {
                        var artists = "";
                    if (data.tracks.items[0].artists.length > 1) {
                           artists += data.tracks.items[0].artists[j].name + ", "
                            console.log(artists);  
                        }
                    else {
                        artists = data.tracks.items[0].artists[j].name;
                        }
                    }  
                }

        
        console.log("====== Your Song =======" + "\n");
       
        console.log("Artist(s) -> " + data.tracks.items[0].artists[0].name+
        "\nSong Title -> " + data.tracks.items[0].name+
        "\nLink to Spotify -> " + data.tracks.items[0].album.external_urls.spotify+
            "\nAlbum Title -> " + data.tracks.items[0].album.name + "\n");        
      

        console.log("========================" + "\n");
        
    });
}

// `movie-this`

else if (liriOpp === 'movie-this') {

    let movieRequest = userRequest.split(" ").join("+");
    
    if (process.argv[3] === undefined) {
        movieRequest = "Mr. Nobody";
        let OMDBApi = "http://www.omdbapi.com/?t=" + movieRequest + "&apikey=587c29c0";
        request(OMDBApi, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                console.log("====== Your Movie =======" + "\n");
                console.log("Movie Title -> " + JSON.parse(body).Title +
                    "\nRelease Date -> " + JSON.parse(body).Released +
                    "\nMovie IMDB Rating -> " + JSON.parse(body).imdbRating +
                    "\nMovie Rotten Tomatoes Score -> " + JSON.parse(body).Ratings[1].Value +
                    "\nCountry where movie was produced -> " + JSON.parse(body).Country +
                    "\nMovie Language -> " + JSON.parse(body).Language +
                    "\nMovie Plot -> " + JSON.parse(body).Plot +
                    "\nMovie Actors/Actresses -> " + JSON.parse(body).Actors);
                console.log("========================" + "\n");
            }
        });
    } else {
        let OMDBApi = "http://www.omdbapi.com/?t=" + movieRequest + "&apikey=587c29c0";

        request(OMDBApi, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("====== Your Movie =======" + "\n");
                console.log("Movie Title -> " + JSON.parse(body).Title+
                "\nRelease Date -> " + JSON.parse(body).Released+
                "\nMovie IMDB Rating -> " + JSON.parse(body).imdbRating+
                "\nMovie Rotten Tomatoes Score -> " + JSON.parse(body).Ratings[1].Value+
                "\nCountry where movie was produced -> " + JSON.parse(body).Country+
                "\nMovie Language -> " + JSON.parse(body).Language+
                "\nMovie Plot -> " + JSON.parse(body).Plot+
                "\nMovie Actors/Actresses -> " + JSON.parse(body).Actors + "\n");
                console.log("========================" + "\n");
            }
        });
    }
}


// `do-what-it-says`

else if (liriOpp === 'do-what-it-says') {
    fs.readFile("random.txt", "utf8", function (err, info) {
        if (err) {
            return console.log(err);
        }

        var output = info.split(",");

        spotify.search({ type: 'track', query: output[1], limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            function artistNames() {

                for (var j = 0; j < data.tracks.items[0].artists.length; j++) {
                    var artists = "";
                    if (data.tracks.items[0].artists.length > 1) {
                        artists += data.tracks.items[0].artists[j].name + ", "
                        console.log(artists);
                    }
                    else {
                        artists = data.tracks.items[0].artists[j].name;
                    }
                }
            }


            // console.log(data.tracks.items);

            console.log("====== Your Song =======" + "\n");

            console.log("Artist(s) -> " + data.tracks.items[0].artists[0].name +
                "\nSong Title -> " + data.tracks.items[0].name +
                "\nLink to Spotify -> " + data.tracks.items[0].album.external_urls.spotify +
                "\nAlbum Title -> " + data.tracks.items[0].album.name + "\n");


            console.log("========================" + "\n");

            });
        });
    }

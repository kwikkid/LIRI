require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
//node-spotify-api package will give us a constructor//
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
//spotify constructors expect keys in order to work.We're creating an instance with our own keys//

var command = process.argv[2];
var moment = require("moment");
moment().format();

function liri() {
	if (command === "concert-this") {
		var artist = process.argv[3];
		var bandsAxios = require("axios");
		bandsAxios
			.get(
				"https://rest.bandsintown.com/artists/" +
					artist +
					"/events?app_id=codingbootcamp"
			)
			.then(function(response) {
				for (var i = 0; i < response.data.length; i++) {
					var date = moment(response.data[i].datetime).format(
						"MM-DD-YYYY"
					);
					console.log(
						date,
						response.data[i].venue.name,
						response.data[i].venue.city,
						response.data[i].venue.country
					);
				}

				// console.log(response.venue[key]);
			});
	}

	if (command === "spotify-this-song") {
		var arg2 = process.argv.slice(3).join(" ");
		spotifyThisSongFunction(arg2);
	}

	function spotifyThisSongFunction(songName) {
		// var song = process.argv.slice(3).join(" ");
		//add something here to splice//

		spotify.search({ type: "track", query: songName }, function(err, data) {
			if (err) {
				return console.log("Error");
			}
			var spotifyResult = data.tracks.items;
			for (var i = 0; i < spotifyResult.length; i++) {
				console.log("Artist: ", spotifyResult[i].artists[0].name);
				console.log("Album: ", spotifyResult[i].album.name);
				console.log("Song Name: ", spotifyResult[i].name);
				console.log("Preview Link: ", spotifyResult[i].preview_url);
			}
		});
	}

	var omdbFunction = function(movie) {
		if (movie !== undefined) {
			var omdbAxios = require("axios");
			omdbAxios
				.get(
					"http://omdbapi.com/?t=" +
						movie +
						"&y=&plot=short&apikey=trilogy"
				)
				.then(function(response) {
					console.log(
						"Title: " +
							response.data.Title +
							"\nimdbRating: " +
							response.data.imdbRating
					);
					console.log(
						"Rotten Tomatoes Rating: " +
							response.data.Ratings[1].Value,
						"\nCountry: " +
							response.data.Country +
							"\nLanguage: " +
							response.data.Language +
							"\nPlot: " +
							response.data.Plot +
							"\nActors: " +
							response.data.Actors
					);
				});
		} else {
			var omdbAxios = require("axios");
			omdbAxios
				.get(
					"http://omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy"
				)
				.then(function(response) {
					console.log(
						"Title: " +
							response.data.Title +
							"\nimdbRating: " +
							response.data.imdbRating
					);
					console.log(
						"Rotten Tomatoes Rating: " +
							response.data.Ratings[1].Value,
						"\nCountry: " +
							response.data.Country +
							"\nLanguage: " +
							response.data.Language +
							"\nPlot: " +
							response.data.Plot +
							"\nActors: " +
							response.data.Actors
					);
				});
		}
	};
}

if (command === "movie-this") {
	var movie = process.argv.slice(3).join(" ");
	omdbFunction(movie);
}
if (command === "do-what-it-says") {
	fs.readFile("random.txt", "utf8", function(err, response) {
		if (err) {
			return console.log(err);
		}

		console.log(response);
		var dataAfterSplit = response.split(",");
		console.log("data after split: " + dataAfterSplit);
		if (dataAfterSplit[0] === "spotify-this-song") {
			spotifyThisSongFunction(dataAfterSplit[1]);
		}
		if (dataAfterSplit[0] === "movie-this") {
			omdbFunction(dataAfterSplit[1]);
		}
	});
}
// how to return "Mr. Nobody" if process.

liri();

/*
 https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

 name of the venue
 venue location
 date of the event MM/DD/YYYY
 */

/*
 https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

 name of the venue
 venue location
 date of the event MM/DD/YYYY
 */

require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
//node-spotify-api package will give us a constructor//
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var bandsAxios = require("axios");
//spotify constructors expect keys in order to work.We're creating an instance with our own keys//

var command = process.argv[2];
var moment = require("moment");
moment().format();

function liri() {
	if (command === "spotify-this-song") {
		var song = process.argv.slice(3).join(" ");
		spotifyThisSongFunction(song);
	}

	function spotifyThisSongFunction(songName) {
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
				var arg2 = dataAfterSplit[1];
				omdbFunction(arg2);
			}
			if (dataAfterSplit[0] === "concert-this") {
				console.log("artist after split: " + dataAfterSplit[1]);
				concerts(dataAfterSplit[1]);
			}
		});
	}

	if (command === "concert-this") {
		var artist = process.argv.slice(3).join(" ");
		concerts(artist);
	}
	function concerts(artistName) {
		// var bandsAxios = require("axios");
		console.log("artists inside concerts function: " + artistName);
		bandsAxios
			.get(
				"https://rest.bandsintown.com/artists/" +
					artistName +
					"/events?app_id=codingbootcamp"
			)
			.then(function(response) {
				for (var i = 0; i < response.data.length; i++) {
					console.log("response.data:" + response.data.length);
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
			});
	}

	function omdbFunction(movie) {
		if (movie !== "") {
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
				})
				.catch(function(error) {
					console.log(error.response);
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
	}
}
// how to return "Mr. Nobody" if process.

liri();

// require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var moment = require("moment");
moment().format();

//OMDB Code//
function liri() {
	if (command === "concert-this") {
		var artist = process.argv[3];
		var omdbAxios = require("axios");
		omdbAxios
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
}
liri();

/*
 https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

 name of the venue
 venue location
 date of the event MM/DD/YYYY
 */

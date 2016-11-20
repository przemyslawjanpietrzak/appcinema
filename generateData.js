var db = require('./config/sequelize');


function randomString() {
	var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var result = '';
	for (var i = 10; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
}

function randomFrom(arr) {
	return arr[Math.floor(Math.random()) % arr.length];
}
var moviesTypes = ['comedy', 'horror', 'drama', 'thriler', 'sci-fi'];


var movies = [];
function generateMovies() {
	for (var i = 0; i < 10; i++) {
		db.Movie.create({
			title: randomString(),
			type: randomFrom(moviesTypes)
		}).then(function (movie) {
			movies.push(movie);
		})
	}
}


var rows = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
var cols = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
function generatePlaces() {
	for (var r = 0; r < rows.length; r++) {
		for (var c = 0; c < cols.length; c++) {
			db.Place.create({
				row: rows[r],
				col: cols[c]
			})
		}
	}
}


var hour = 1000*60*60;
function generateProjections(places) {
	for (var i = 0; i < 50; i++) {
		db.Projection.create({
			dateTime: Date.now() + 3*i*hour,
			is3D: Math.floor(Math.random()) % 2 === 0,
			helper: randomFrom['subtitles', 'dubbing', 'lector']
		}).then(function (projection) {
			projection.setPlaces(places);
			projection.setMovie(movies[i % 10])
		})
	}
}


(function generateData() {
	global.setTimeout(function () {
		generateMovies();
		generatePlaces();

		global.setTimeout(function () {
			db.Place.findAll({}).then(function(places) {
				generateProjections(places, { status: 'free' });
			});
			
		}, 1500);
	}, 1500);




})();

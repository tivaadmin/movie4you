// Import the packages
var mysql = require('mysql');

//=== Local database connection
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'MovieSearch',
//     password: 'tiva101'
// });

//=== Clear database connection
var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'b036ac2e55f447',
    database: 'heroku_85481808730d415',
    password: 'd0817784'
});

// Connect database
connection.connect(function (err) {
    if (err) {
        console.error('*** Error connecting: ' + err.stack);
    } else {
        console.log('Connected as ID: ' + connection.threadId);
        connection.query('select count(*) from Movie', function (err, result) {

            // console.log(req.body);
            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
            }
        });
    }
});

// insert user
exports.add_user = function (req, res) {
    var query = connection.query("Insert into user set ?", req.body, function (req, res) {
        if (err) {
            return res.status(400).send(err);
        }
    });
}

// select popular
exports.get_popular = function (req, res) {

    var query = connection.query('select distinct m.* from Movie m join Movie_Genre g on m.movieId = g.movieId join Register r on r.genreId = g.genreId where r.userId = 1 order by vote_average DESC,release_date DESC limit 0,10'
        , function (err, result) {

            // console.log(req.body);
            if (err) {
                return res.status(400).send(err);
            } else {
                if (result.length > 0) {
                    return res.status(200).send(result);
                } else {
                    return res.status(201).send('');
                }
            }
        });
}

// select all popular
exports.get_allpopular = function (req, res) {

    var query = connection.query('select distinct m.* from Movie m join Movie_Genre g on m.movieId = g.movieId join Register r on r.genreId = g.genreId where r.userId = 1 order by vote_average DESC,release_date DESC limit 0,100'
        , function (err, result) {

            // console.log(req.body);
            if (err) {
                return res.status(400).send(err);
            } else {
                if (result.length > 0) {
                    return res.status(200).send(result);
                } else {
                    return res.status(201).send('');
                }
            }
        });
}

// select movie detail
exports.get_detail = function (req, res) {

    var query = connection.query('select * from Movie where movieId = ?', req.params.movieId, function (err, result) {
        if (err) {
            return res.status(400).send(err);
        } else {
            if (result.length > 0) {
                return res.status(200).send(result[0]);
            } else {
                return res.status(201).send('');
            }
        }

    });
}

//select genre
exports.get_genre = function (req, res) {

    var query = connection.query('select g.genreName from Genre g join Movie_Genre mg on g.genreId = mg.genreId where mg.movieId = ?', req.params.movieId, function (err, result) {
        if (err) {
            return res.status(400).send(err);
        } else {
            if (result.length > 0) {
                return res.status(200).send(result);
            } else {
                return res.status(201).send('');
            }
        }

    });
}

// Insert Recommendation
exports.add_recommendations = function (req, res) {

    var query = connection.query('insert ignore into Recommendation set ?', req.body, function (err, result) {
        if (err) {
            return res.status(400).send(err);
        } else {
            if (result.length > 0) {
                return res.status(200).send(result);
            } else {
                return res.status(201).send('');
            }
        }
    });
}

// Insert Like Movies
exports.add_likeMovies = function (req, res) {

    var query = connection.query('insert ignore into Like_Movies set ?', req.body, function (err, result) {
        if (err) {
            return res.status(400).send(err);
        } else {
            if (result.length > 0) {
                return res.status(200).send(result);
            } else {
                return res.status(201).send('');
            }
        }
    });
}

// Insert Like Genre
exports.add_likeGenre = function (req, res) {

    var query = connection.query('insert ignore into Like_Genre set ?', req.body, function (err, result) {
        if (err) {
            return res.status(400).send(err);
        } else {
            if (result.length > 0) {
                return res.status(200).send(result);
            } else {
                return res.status(201).send('');
            }
        }
    });
}
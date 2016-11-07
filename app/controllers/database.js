// Import the packages
var mysql = require('mysql');

//=== Local database connection
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'MovieSearch',
//     password: 'tiva101'
// });

//=== ClearDB database connection
var db_config = {
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'b036ac2e55f447',
    database: 'heroku_85481808730d415',
    password: 'd0817784'
};

var connection;

// Wrapper function for Connection to handle connection timeout
function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function (err) {              // The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);            // We introduce a delay before attempting to reconnect,
        } else {
            connection.query({ sql: 'select count(*) from Movie', timeout: 40000 }, function (err, result) {
                console.log(result);
            });
        }
        // to avoid a hot loop, and to allow our node script to
    });                                                // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

// Start DB connection
handleDisconnect();

// Connect database
// connection.connect(function (err) {
//     if (err) {
//         console.error('*** Error connecting: ' + err.stack);
//     } else {
//         console.log('Connected as ID: ' + connection.threadId);
//         connection.query({sql: 'select count(*) from Movie', timeout: 40000}, function (err, result) {

//             // console.log(req.body);
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 console.log(result);
//             }
//         });
//     }
// });

//get user password
exports.get_password = function (req, res) {

    var query = connection.query({ sql: "select * from user where userEmail=?", timeout: 40000 }, req.params.userEmail,
        function (err, result) {

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
// insert user
exports.add_user = function (req, res) {
    var query = connection.query({ sql: "Insert into user set ?", timeout: 40000 }, req.body, function (req, res) {
        if (err) {
            return res.status(400).send(err);
        }
    });
}

// select popular
exports.get_popular = function (req, res) {

    var query = connection.query({ sql: 'select distinct m.* from Movie m join Movie_Genre g on m.movieId = g.movieId join Register r on r.genreId = g.genreId where r.userId = 1 order by vote_average DESC,release_date DESC limit 0,10', timeout: 40000 }
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

    var query = connection.query({ sql: 'select distinct m.* from Movie m join Movie_Genre g on m.movieId = g.movieId join Register r on r.genreId = g.genreId where r.userId = 1 order by vote_average DESC,release_date DESC limit 0,100', timeout: 40000 }
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

    var query = connection.query({ sql: 'select * from Movie where movieId = ?', timeout: 40000 }, req.params.movieId
        , function (err, result) {

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

    var query = connection.query({ sql: 'select g.genreName from Genre g join Movie_Genre mg on g.genreId = mg.genreId where mg.movieId = ?', timeout: 40000 }, req.params.movieId
        , function (err, result) {
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

    var query = connection.query({ sql: 'insert ignore into Recommendation set ?', timeout: 40000 }, req.body, function (err, result) {
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

    var query = connection.query({ sql: 'insert ignore into Like_Movies set ?', timeout: 40000 }, req.body, function (err, result) {
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

    var query = connection.query({ sql: 'insert ignore into Like_Genre set ?', timeout: 40000 }, req.body, function (err, result) {
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

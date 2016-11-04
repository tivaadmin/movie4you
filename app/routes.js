// Import Controller modules
var database = require("./controllers/database");

// Export all of the routes back to the application
module.exports = function (app) {
    // The prefix that every route will start with.
    var prefix = "/api";

    // Front-end routes =========================================================
    // route to handle all angular requests from browser
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/app/index.html');
    });

    // API Endpoints
    //  user apis
    app.post(prefix + "/user", database.add_user);

    // Popular apis
    app.get(prefix + "/popular", database.get_popular);
    app.get(prefix + "/allpopular", database.get_allpopular);
    app.get(prefix + "/detail/:movieId", database.get_detail);
    app.get(prefix + "/genre/:movieId", database.get_genre);

    // Recomendation apis
    app.post(prefix + '/recommendations', database.add_recommendations);    
    app.post(prefix + '/likemovies', database.add_likeMovies);    
    app.post(prefix + '/likegenre', database.add_likeGenre);    

};

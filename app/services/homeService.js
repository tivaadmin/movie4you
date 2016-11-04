"use strict";

angular.module("homeService", [])

    .factory("Home", ["$http", function ($http) {
        //create a new object
        var homeService = {};

        homeService.getPopular = function () {
            return $http.get('/api/popular/');
        }

        homeService.getRecommendations = function (movieID) {
            return $http.get("https://api.themoviedb.org/3/movie/" + movieID
                + "/recommendations?api_key=81d7640dffed48055b1803be5b452893&language=en-US");
        }

        homeService.postRecommendations = function (param) {
            return $http.post("/api/recommendations/", param);
        }

        return homeService;
    }]);

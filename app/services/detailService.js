"use strict";

angular.module("detailService", [])

    .factory("Detail", ["$http", function ($http) {
        //create a new object
        var detailService = {};

        detailService.getDetail = function (id) {
            return $http.get('/api/detail/' + id);
        }

        detailService.getGenre = function (id) {
            return $http.get('/api/genre/' + id);
        }

        detailService.getSimilar = function (id) {
            return $http.get('https://api.themoviedb.org/3/movie/' + id + '/similar?api_key=81d7640dffed48055b1803be5b452893&language=en-US');
        }

        return detailService;
    }]);

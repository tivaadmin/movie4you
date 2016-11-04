"use strict";

angular.module('app.directives.home', [])
	.directive('homeForm', [function () {
		return {
			restrict: 'E',
			scope: {},
			// replace: true,
			templateUrl: 'components/home/template.html',
			controller: ['$scope', '$http', '$location', 'Home', '$mdSidenav', function ($scope, $http, $location, Home, $mdSidenav) {
				$scope.items = [];

				$scope.toggleLeft = buildToggler('left');
				$scope.toggleRight = buildToggler('right');

				function buildToggler(componentId) {
					return function () {
						$mdSidenav(componentId).toggle();
					}
				}

				for (var i = 0; i < 1000; i++) {
					$scope.items.push(i);
				}

				$scope.movies = {};

				Home.getPopular().success(function (result) {
					$scope.movies = result;
					makeImageUrl($scope.movies);
				});

				var makeImageUrl = function (movies) {
					for (var i in movies) {
						var movie = movies[i];
						movie.poster_path = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
						// console.log(movie.poster_path);
					}
				}

				$scope.detail = function (movie) {
					$location.path('/detail/' + movie.movieId);
				}

				// Recomendation for like movies
				$scope.automateRecommendation = function (i) {
					Home.getRecommendations(i).success(function (result) {
						console.log(result);
						for (var n = 0; n < result.results.length; n++) {
							$scope.movieRecommendation = {};
							$scope.movieRecommendation.movieId = i;
							$scope.movieRecommendation.recMovieId = result.results[n].id;

							// Call post recommendations api
							Home.postRecommendations($scope.movieRecommendation).success(function (res) { });
						}

					});
				};

//
			}]


		};
	}]);

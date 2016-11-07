"use strict";

angular.module('app.directives.detail', [])
	.directive('detailForm', [function () {
		return {
			restrict: 'E',
			templateUrl: 'components/detail/template.html',
			controller: ['$scope', '$http', '$location', '$routeParams', 'Detail', 'History', function ($scope, $http, $location, $routeParams, Detail, History) {

				$scope.movie = {};
				$scope.genre = {};

				$scope.similar = {};

				var w = History.watch('movie', $scope)
					.addChangeHandler('myChangeHandler', function () {
						console.log('movie changed to ' + $scope.movie);
					})
					.addUndoHandler('myUndoHandler', function () {
						console.log('undid foo.  this message will self-destruct');
						w.removeUndoHandler('myUndoHandler');
					});

				$scope.backClicked = function () {
					History.undo('movie', $scope);
				};

				$scope.forwardClicked = function () {
					History.redo('movie', $scope);
				}

				Detail.getSimilar($routeParams.movieId).success(function (result) {
					$scope.similar = result.results;
					makeImageUrl($scope.similar);
				});

				var makeImageUrl = function (movies) {
					for (var i in movies) {
						var similar = movies[i];
						similar.poster_path = "https://image.tmdb.org/t/p/w300" + similar.poster_path;
					}
				}

				Detail.getDetail($routeParams.movieId).success(function (result) {
					result.poster_path = "https://image.tmdb.org/t/p/w500_and_h281_bestv2" + result.backdrop_path;
					$scope.movie = result;
				});

				Detail.getGenre($routeParams.movieId).success(function (result) {
					$scope.genre = result;
				})
				// var movie = Home.getMovieDetail();

				$scope.refreshDetail = function (movie) {
					movie.poster_path = "https://image.tmdb.org/t/p/w500_and_h281_bestv2" + movie.backdrop_path;
					$scope.movie = movie;

					Detail.getSimilar(movie.id).success(function (result) {
						$scope.similar = result.results;
						makeImageUrl($scope.similar);
					});

				};

				$scope.home = function () {
					$location.path('/home');
				}

			}]
		};
	}]);

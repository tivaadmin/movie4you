"use strict";

angular.module('app.directives.login', ['userService'])
	.directive('loginForm', [function () {
		return {
			restrict: 'E',
			templateUrl: 'components/login/template.html',
			controller: ['$scope', '$http', '$location', 'User', '$cookies', function ($scope, $http, $location, User, $cookies) {

				$scope.errMessage = {error: ''};

                             
                $scope.submit = function(){
                    // get user password and check
                    User.getPassword($scope.userEmail).success(function (response) {
                        if ($scope.userPassword === response.password) {
                            // store user email in cookies
                            $cookies.put("userEmail", $scope.userEmail);
                            $location.path('/home');
                        } else {
                            $scope.errMessage.error = "Invalid email or password";
                        }
                    }).error(function (response) {
                        $scope.errMessage.error = response.code;
                    });
                };
			}]
		};
	}]);

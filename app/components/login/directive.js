"use strict";

angular.module('app.directives.login', [])
	.directive('loginForm', [function () {
		return {
			restrict: 'E',
			templateUrl: 'components/login/template.html',
			controller: ['$scope', '$http', '$location', function ($scope, $http, $location) {

				$scope.errMessage = {error: ''};

                $scope.vm = {
                    formData: {
                        email: 'hello@patternry.com',
                        password: 'foobar'
                    }
                }              
                $scope.submit = function(){
                    // Get User Password and check
                    // if ( $scope.email === $scope.vm.formData.email){
                        // if( $scope.password === $scope.vm.formData.password){
                        // Store user email in cookies                           
                        $location.path('/home');
                        
                    // } else {
                    //     $scope.errMessage.error = 'Invalid email or password!';
                    // }
                };
			}]
		};
	}]);

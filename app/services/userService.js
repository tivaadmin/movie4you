"use strict";

angular.module("userService", [])

.factory("User", ["$http", "$cookies", function ($http, $cookies) {

	// Initialize once and store the values for the whole life cycle
	var userFactory = {};
	var userEmail = "";
	// $cookies.userEmail = "";

	// Get Password
	userFactory.getPassword = function(email) {
		// Store the UserEmail
		userEmail = email;
	    return $http.get('/api/password/' + email);
	};
  
	// Get User Email
	userFactory.getUserEmail = function() {
		return $cookies.get("userEmail");
	}

	// Check User is already logged in or not
	userFactory.isLoggedIn = function() {
		if ($cookies.get("userEmail") === undefined || $cookies.get("userEmail").length === 0){
			return false;
		} else {
			return true;
		}
	}

	// Store Source Route
	userFactory.setSource = function(para){
		$cookies.put("route", para);
	}

	// Get Source Route
	userFactory.getSource = function(){
		return $cookies.get("route");
	}
	
	// User Logout
	userFactory.logOut = function() {
		$cookies.remove("userEmail");
	}

	// return our entire UsersService object
	return userFactory;

}]);
'use strict';

InstagramApp.config(['$locationProvider', '$routeProvider',
		function config($locationProvider, $routeProvider) {
			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});

			$routeProvider
				.when('/', {
					// "views/home.html?v<?=hash_file('md5', $_SERVER['DOCUMENT_ROOT'].'views/home.html')?"
					templateUrl: "views/home.html?3",
					controller: 'HomeCtrl'
				})
				.when('/login', {
					templateUrl: "views/login.html?3",
					controller: 'LoginCtrl'
				})
				.when('/personal_page', {
					templateUrl: "views/personal_page.html?3",
					controller: 'PersonalPageCtrl'
				})
				.when('/images', {
					templateUrl: "views/images.html?3",
					controller: 'ImagesCtrl'
				})
				/*.otherwise('/')*/;
		}
	]);

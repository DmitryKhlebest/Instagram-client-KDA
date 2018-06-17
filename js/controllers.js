'use strict';

/* Controllers */
//var instagramApp = angular.module('InstagramApp', ['ngRoute', 'ngResource']);

/* Config */
/*instagramApp.config([
  '$routeProvider', '$locationProvider',
  function($routeProvide, $locationProvider){
    $routeProvide
        .when('/',{
          templateUrl:'template/authorization.html',
          controller:'InstagramAppCtrl'
        })
        .when('/about',{
          templateUrl:'template/about.html',
          controller:'AboutCtrl'
        })
        .when('/contact',{
          templateUrl:'template/contact.html',
          controller:'ContactCtrl'
        })
        .when('/phones/:phoneId', {
          templateUrl:'template/phone-detail.html',
          controller:'PhoneDetailCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
  }
]);*/

/* Factory */
/*instagramApp.factory('Phone', [
  '$resource', function($resource) {
    return $resource('phones/:phoneId.:format', {
      phoneId: 'phones',
      format: 'json',
      apiKey: 'someKeyThis'
      // http://localhost:8888/phones/phones.json?apiKey=someKeyThis 
    }, {
      // action: {method: <?>, params: <?>, isArray: <?>, ...}
      update: {method: 'PUT', params: {phoneId: '@phone'}, isArray: true}
    });
    //Phone.update(params, successcb, errorcb);
  }
]);*/

/* Filter */
/*instagramApp.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  }
});*/

instagramApp.controller('InstagramAppCtrl',[
  '$scope','$http', '$location', 'Phone',
  function($scope, $http, $location, Phone) {

    $scope.title = "Instagram";
    $scope.main_page = "Главная";

    /*Phone.query({phoneId: 'phones'}, function(data) {
      $scope.phones = data;
    });*/

    //Phone.query(params, successcb, errorcb)

    //Phone.get(params, successcb, errorcb)

    //Phone.save(params, payloadData, successcb, errorcb)

    //Phone.delete(params, successcb, errorcb)

  }
]);

/* About Controller */
instagramApp.controller('AboutCtrl',[
  '$scope','$http', '$location',
  function($scope, $http, $location) {

  }
]);

/* Contact Controller */
instagramApp.controller('ContactCtrl',[
  '$scope','$http', '$location',
  function($scope, $http, $location) {

  }
]);

/* Phone Detail Controller */
instagramApp.controller('PhoneDetailCtrl',[
  '$scope','$http', '$location', '$routeParams', 'Phone',
  function($scope, $http, $location, $routeParams, Phone) {
    $scope.phoneId = $routeParams.phoneId;

    Phone.get({phoneId: $routeParams.phoneId}, function(data) {
      $scope.phone = data;
      $scope.mainImageUrl = data.images[0];
      //data.$save();
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }

  }
]);



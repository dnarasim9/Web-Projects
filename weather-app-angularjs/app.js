//Modules
var app = angular.module('app', ['ngRoute','ngResource']);

app.config(function($routeProvider) {
   $routeProvider
   
   .when('/', {
       templateUrl: '/pages/home.html',
       controller: 'homeController'
   })
   
   .when('/forecast', {
       templateUrl: '/pages/forecast.html',
       controller: 'forecastController'
   })
   
   .when('/forecast/:days', {
       templateUrl: '/pages/forecast.html',
       controller: 'forecastController'
   })
   
});

app.service('cityService', function() {
    this.city = 'Los Angeles, CA';
})

app.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    })
}]);

app.controller('forecastController', ['$scope', '$http', '$routeParams', 'cityService', function($scope, $http, $routeParams, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || '2';
    
    $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?appid=efff9bff2e9aa1fe03e82339fd6e8307&q="+$scope.city+"&cnt="+$scope.days)
        .then(function(response) {
            $scope.weatherResult = response;
            console.log($scope.weatherResult);
        }, function(response, status) {
            console.log("The request failed with response " + response + " and status code " + status);
        });
    
	
    $scope.convertToDate = function(dt) {
        return new Date(dt*1000);
    }
    
    $scope.convertToFahrenheit = function(degK) {
        return Math.round((1.8 * (degK - 273)) + 32);
    }
    
}]);


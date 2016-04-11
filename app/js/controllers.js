'use strict';

angular.module('f1FeederApp.controllers', []).
controller('DriversController', function($scope, ergastAPIservice) {
  $scope.nameFilter = null;
  $scope.driversList = [];
  $scope.searchFilter = function(driver) {
    var re = new RegExp($scope.nameFilter, 'i');
    return !$scope.nameFilter || re.test(driver.Driver.givenName) || re.test(driver.Driver.familyName);
  };

  ergastAPIservice.getDrivers().success(function(response) {
    $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  });
}).

controller('DriverController', function($scope, $routeParams, ergastAPIservice) {
  $scope.id = $routeParams.id;
  $scope.races = [];
  $scope.driver = null;

  ergastAPIservice.getDriverDetails($scope.id).success(function(response) {
    $scope.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
  });

  ergastAPIservice.getDriverRaces($scope.id).success(function(response) {
    $scope.races = response.MRData.RaceTable.Races;
  });
});



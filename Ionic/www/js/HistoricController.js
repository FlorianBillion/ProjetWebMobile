angular.module('starter')
  .controller('HistoricController', function($scope, $http){

    $http({
      url: "/api/infoplayer/historic",
      method: "GET"

    }).then(function sucess(response) {
      $scope.games = response.data;
    }, function fail(response){
      console.log(response);
    })
  })

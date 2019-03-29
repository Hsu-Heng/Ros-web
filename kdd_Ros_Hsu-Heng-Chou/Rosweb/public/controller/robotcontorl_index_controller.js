var myApp = angular.module('workstation', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http, $window, $location) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/workstation/all').success(
      function(response) {
    console.log("I got the data I requested");
    $scope.workstationlist = response;
    $scope.workstation = "";
  }).error(
    function(response){
        $scope.workstationlist=[];

    }
  );
};

refresh();

 
$scope.control = function(id) {
    console.log(id);
    // var host = $window.location.host;
    var landingUrl = "/robotcontrol/control/"+id;
    alert(landingUrl);
    window.location.href = landingUrl;
    
  };


}]);
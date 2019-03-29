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

$scope.addWorkstation = function() {
  console.log($scope.workstation);
  $http.post('/workstation', $scope.workstation).success(function(response) {
    console.log(response);
   
  });
  refresh();
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/workstation/' + id).success(function(response) {
    
  });
  refresh();
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/workstation/' + id).success(function(response) {
    $scope.workstation = response;
  });
};  
$scope.editrobot = function(id) {
    console.log(id);
    // var host = $window.location.host;
    var landingUrl = "/robot/"+id;
    alert(landingUrl);
    window.location.href = landingUrl;
    
  };

$scope.update = function() {
  console.log($scope.workstation._id);
  $http.put('/workstation/' + $scope.workstation._id, $scope.workstation).success(function(response) {
    refresh();
  })
  
};

$scope.deselect = function() {
  $scope.contact = "";
}

}]);
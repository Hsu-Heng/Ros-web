var myApp = angular.module('robot', []);
myApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.html5Mode(true).hashPrefix('!');
  }]);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http, $location) {
    
    console.log("Robot controller");
    var workstationid = location.href.split('/')[4];   //path will be /person/show/321/, and array looks like: ["","person","show","321",""]
    console.log(workstationid);

var refresh = function() {
    console.log("letsgo");
    console.log(workstationid); 
    var url = '/robot/all/'+workstationid;
    console.log(url);
    $http.get(url).success(
        function(response) {
        console.log("I got the data I requested");
        console.log(response);
        $scope.robotlist = response;
        $scope.robot = "";
    }).error(
        function(response){
            $scope.robotlist=[];

        }
    );
};

refresh();

$scope.addrobot = function() {
  console.log($scope.robot);
  $http.post('/robot/'+workstationid, $scope.robot).success(function(response) {
    console.log(response);
    refresh();
    
  });
  
};

$scope.remove = function(id) {
  console.log('/robot/'+workstationid+"/"+id)
  
  $http.delete('/robot/'+workstationid+"/"+id).success(function(response) { 
    refresh();
  });
  
};

$scope.edit = function(id) {
  console.log(id)
  $http.get('/robot/edit/'+workstationid+"/"+id).success(function(response) {
    $scope.robot = response;
  });
};  


$scope.update = function() {
//   console.log($scope.robot._id);
   var url = '/robot/'+workstationid+"/"+$scope.robot._id;
   console.log(url);
  console.log($scope.robot);
  $http.put(url, $scope.robot).success(function(response) {
    refresh();
  });
  
};

$scope.deselect = function() {
  $scope.robot = "";
}

}]);
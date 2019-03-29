var myApp = angular.module('robot', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http, $location) {
    
    console.log("Robot controller");
    console.log(location.href);
    var workstationid = location.href.split('/')[5];   //path will be /person/show/321/, and array looks like: ["","person","show","321",""]
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

 
$scope.control = function(id) {
    console.log(id);
    // var host = $window.location.host;
    var landingUrl = "/robotcontrol/control/"+id;
    alert(landingUrl);
    window.location.href = landingUrl;
    
  };


}]);
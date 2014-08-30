(function() {
    
    function HeaderController($scope, $location) {
        var islog = _.isNull(localStorage.getItem("loggedUser"));

        $scope.logOut = function ($event) {
            $event.preventDefault();
            localStorage.removeItem("loggedUser");
            $scope.isLogged = false;
            $location.path("/login");
            
        };
        
        $scope.isActive = function (viewLocation) { 
            return $location.path().indexOf(viewLocation) !== -1;
        };
        
        
        
        $scope.isLogged = function () {
            return !islog;
        };
        if (!islog) {
            if ($location.path() === "/login") {
                $location.path("/tasks");
            }
        } else {
            $location.path("/login");
        }
        
    }
    
    HeaderController.$inject = ["$scope", "$location"];
    
    angular.module("usersModule").controller("HeaderController", HeaderController);
    
}());
    
    
    

(function() {
    
    function HeaderController($scope, $location, authFactory) {
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

        //authFactory.getUserLogIn();
        
//        $scope.isLoggedUser = authFactory.isLogIn;
        $scope.isLoggedUser = function () {
            authFactory.getUserLogIn();
            return authFactory.isLogIn;
        };
        
        if (!islog) {
            if ($location.path() === "/login") {
                $location.path("/tasks");
            }
        } else {
            $location.path("/login");
        }
        
    }
    
    HeaderController.$inject = ["$scope", "$location", "authFactory"];
    
    angular.module("usersModule").controller("HeaderController", HeaderController);
    
}());
    
    
    

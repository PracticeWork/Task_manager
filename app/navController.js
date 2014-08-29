(function() {
    
    function HeaderController($scope, $location) { 
        $scope.isActive = function (viewLocation) { 
            return $location.path().indexOf(viewLocation) !== -1;
        };
        
        $scope.isLogged = function () {
            return !_.isNull(localStorage.getItem("id"));
        };
        if (_.isNull(localStorage.getItem("id"))) {
            $location.path("/login");
        }
        
    }
    
    HeaderController.$inject = ["$scope", "$location"];
    
    angular.module("usersModule").controller("HeaderController", HeaderController);
    
}());
    
    
    

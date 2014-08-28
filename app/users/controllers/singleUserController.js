(function() {
    
    var SingleUserController = function($scope, $http, $routeParams, usersFactory) {

        $scope.deleteUser = usersFactory.deleteUser;
        
        $scope.updateUser = usersFactory.updateUsers;
        
        
        $http.get("/users/" + $routeParams.userId)
            .success(function (user) {
                $scope.user = user;
            });
        
    };
    
    SingleUserController.$inject = ["$scope", "$http", "$routeParams", "usersFactory"];
    
    angular.module("usersModule").controller("SingleUserController", SingleUserController);
    
}());
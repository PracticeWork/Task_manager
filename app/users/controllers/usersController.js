(function() {
    
    var UsersController = function ($scope, usersFactory) {
        
        $scope.users = [];
        $scope.predicate = "name";
        $scope.sort = true;

        function init() {
            usersFactory.getUsers()
                    .success(function(users) {
                        $scope.users = users;
                    })
                    .error(function() {
                        //error
                    });
        }
        
        init();
        
    };
    
    UsersController.$inject = ["$scope", "usersFactory"];
    
    angular.module("usersModule").controller("UsersController", UsersController);
    
}());
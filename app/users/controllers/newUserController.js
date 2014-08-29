(function() {
    
    var NewUserController = function($scope, $http,  $location) {
        
        $scope.createNewUser = function(name, email, age, password) {
            
            var newUser = {
                name: name,
                email: email,
                age: age,
                password: password
            };
            
            $http.post("/users/new", newUser)
                .success(function (data) {
                    $location.path("/users");
                    console.log(data);
                });
            
        };
    };
    
    NewUserController.$inject = ["$scope", "$http", "$location"];
    
    angular.module("usersModule").controller("NewUserController", NewUserController);
    
}());
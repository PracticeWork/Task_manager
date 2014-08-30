(function() {
    
    var AuthController = function($scope, $http, $location) {
        
        var isLogged =  _.isNull(localStorage.getItem("id"));
        
        $scope.logIn = function(login, password) {
            $http.get("/users/" + login + "/" + password).success(function (data) {
                if (!data) {
                    alert("Login or password is incorrect");
                } else {
                    localStorage.setItem("loggedUser", data._id);
                    $location.path("/tasks");
                }
            });
        };

    };
    
    AuthController.$inject = ["$scope", "$http", "$location"];
    
    angular.module("AppModule").controller("AuthController", AuthController);
    
}());
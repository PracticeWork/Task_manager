(function() {
    
    var AuthController = function($scope, $http) {
        
        var isLogged =  _.isNull(localStorage.getItem("id"));
        
        console.log(isLogged);
        
        $scope.logIn = function(login, password) {
            $http.get("/users/" + login + "/" + password).success(function (data) {
                console.log(data);
            });
        };

    };
    
    AuthController.$inject = ["$scope", "$http"];
    
    angular.module("AppModule").controller("AuthController", AuthController);
    
}());
(function() {
    
    var usersFactory = function($http) {
        
        return {
            
            getUsers: function() {
                return $http.get("/users");
            }
            
        };
        
    };
    
    usersFactory.$inject = ["$http"];
    
    angular.module("usersModule").factory("usersFactory", usersFactory);
    
}());
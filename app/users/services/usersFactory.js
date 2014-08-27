(function() {
    
    var usersFactory = function($http, $location) {
        
        return {
            
            getUsers: function () {
                return $http.get("/users");
            },
            updateUsers: function (user) {
                $http.put("/users/" + user.name + "/" + user._id + "/edit", user);     
            },
            deleteUser: function(userId) {
                $http.delete("/users/delete/" + userId)
                    .success(function () {
                        $location.path("/users");
                    });
            }
            
        };

    };
    
    usersFactory.$inject = ["$http", "$location"];
    
    angular.module("usersModule").factory("usersFactory", usersFactory);
    
}());
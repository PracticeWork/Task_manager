(function() {
    
    var authFactory = function () {
        
        return {
            
            isLogIn: false,
            
            getUserLogIn: function() {
                this.isLogIn = !_.isNull(localStorage.getItem("loggedUser"));
            },
            
            setUserLogIn: function(value) {
                this.isLogIn = value;
            }
            
        }; 
    };
    
//    authFactory.$inject = ["$http", "$routeParams"];
    
    angular.module("AppModule").factory("authFactory", authFactory);
    
}());



(function() {
    
    var tasksFactory = function ($http) {
        return {
            getTasks: function() {
                return $http.get("/tasks");
            },
            createTask: function(taskTitle, taskContent) {
                var newTask = {
                    title: taskTitle,
                    content: taskContent
                };
                return $http.post("/tasks/new", newTask);
            }
        }; 
    };
    
    tasksFactory.$inject = ["$http"];
    
    angular.module("tasksModule").factory("tasksFactory", tasksFactory);
    
}());
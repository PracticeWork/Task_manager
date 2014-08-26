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
            },
            updateTask: function (editedTask) {
                return $http.put("/tasks/" + editedTask._id + "/update", editedTask);
            },
            deleteTask: function (taskId) {
                return $http.delete("/tasks/delete/" + taskId);
            }
            
        }; 
    };
    
    tasksFactory.$inject = ["$http"];
    
    angular.module("tasksModule").factory("tasksFactory", tasksFactory);
    
}());
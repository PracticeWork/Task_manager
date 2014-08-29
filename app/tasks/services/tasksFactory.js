(function() {
    
    var tasksFactory = function ($http, $routeParams) {
        
        return {
            
            getTasks: function() {
                return $http.get("/tasks");
            },
            createTask: function(taskTitle, taskContent, assignedTo, dueDate) {
                var newTask = {
                    title: taskTitle,
                    content: taskContent,
                    assigned: assignedTo,
                    due_date: dueDate
                };
                return $http.post("/tasks/new", newTask);
            },
            updateTask: function (editedTask) {
                return $http.put("/tasks/" + editedTask._id + "/update", editedTask);
            },
            deleteTask: function (taskId) {
                return $http.delete("/tasks/delete/" + taskId);
            },
            createComment: function(taskId, commentContent) {
                var newComment = {
                    content: commentContent,
                    task_id: taskId
                };
                return $http.post("/tasks/"  + taskId + "/comments", newComment);
            },
            getComments: function() {
                $http.get("/");
            },
            getSingleTask: function () {
                return $http.get("/tasks/" + $routeParams.taskId);
            },
            getTaskComments: function () {
                return $http.get("/tasks/" + $routeParams.taskId + "/comments");
            }
            
        }; 
    };
    
    tasksFactory.$inject = ["$http", "$routeParams"];
    
    angular.module("tasksModule").factory("tasksFactory", tasksFactory);
    
}());
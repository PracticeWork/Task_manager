(function() {
    
    var SingleTaskController = function($scope, $http, $routeParams, tasksFactory, $location, usersFactory) {
        $scope.taskComments = [];
        

        $scope.createComment = function(taskId, commentContent) {
            tasksFactory.createComment(taskId, commentContent).success(function(data) {
                $scope.taskComments.push(data);
                $scope.commentContent = "";
            });
        };
        
        $scope.updateTask = tasksFactory.updateTask;
        
        
        // Delete task
        $scope.deleteTask = function (taskId) {
            tasksFactory.deleteTask(taskId).success(function(data) {
                $location.path("/tasks");
            });    
        };
        
        function init() {
            tasksFactory.getSingleTask()
                .success(function(data) {
                    $scope.task = data;
            });
            tasksFactory.getTaskComments()
                .success(function(data) {
                    $scope.taskComments = data;
                });
            usersFactory.getUsers().success(function (data) {
                $scope.users = data;
            });
            
                
            
        }
        
        init();
  
    };
    
    SingleTaskController.$inject = ["$scope", "$http", "$routeParams", "tasksFactory", "$location", "usersFactory"];
    
    angular.module("tasksModule").controller("SingleTaskController", SingleTaskController);
    
}());
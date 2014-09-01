(function() {
    
    var SingleTaskController = function($scope, $http, $routeParams, tasksFactory, $location, usersFactory) {
        $scope.taskComments = [];
        
        $scope.updateTask = tasksFactory.updateTask;
        
        $scope.switchStatus = function () {
            $scope.task.status = $scope.task.status === 0 ? 4 : 0;
            $scope.updateTask($scope.task);
        };
        
        $scope.createComment = function(taskId, commentContent) {
            tasksFactory.createComment(taskId, commentContent).success(function(data) {
                $scope.taskComments.push(data);
                $scope.commentContent = "";
            });
        };
        
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
                    $scope.isChecked = function () {
                            console.log($scope.task.status === 4);
                        return $scope.task.status === 4;
                    };
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
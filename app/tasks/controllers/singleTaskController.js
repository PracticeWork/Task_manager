(function() {
    
    var SingleTaskController = function($scope, $http, $routeParams, tasksFactory) {
        $scope.taskComments = [];
        
        $scope.createComment = function(taskId, commentContent) {
            tasksFactory.createComment(taskId, commentContent).success(function(data) {
                console.log(data);
                $scope.taskComments.push(data);
                $scope.commentContent = "";
            });
        };
        
        $scope.updateTask = tasksFactory.updateTask;
        
        
        // Delete task
        $scope.deleteTask = function (taskId) {
            tasksFactory.deleteTask(taskId).success(function(data) {
                var delTask = _.find($scope.tasks, function (task, index) {
                    if (task._id === taskId) {
                        $scope.tasks.splice(index, 1);
                    }
                    return task._id === taskId;
                });
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
                
            
        }
        
        init();
  
    };
    
    SingleTaskController.$inject = ["$scope", "$http", "$routeParams", "tasksFactory"];
    
    angular.module("tasksModule").controller("SingleTaskController", SingleTaskController);
    
}());
(function() {
    
    var TasksController = function($scope, tasksFactory, $http, $modal, $log) {
        
        $scope.open = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'app/tasks/views/createNewTaskModal.html',
                controller: ModalInstanceController,
                size: size,
                resolve: {
                        
                }
            });

        modalInstance.result.then(function (newTask) {
                $scope.tasks.unshift(newTask);
            }, function () {
//                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        

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
            tasksFactory.getTasks()
                .success(function(tasks) { 
                    $scope.tasks = tasks;
                });
                
                
                
                    
            $http.get("/users")
                .success(function (users) {
                    users = _.pluck(users, "name");
                    $scope.users = users;
                });
        }
        
        init();
        
    };
    
    var ModalInstanceController = function($scope, $modalInstance, tasksFactory) {

            $scope.createTask = tasksFactory.createTask;

            $scope.ok = function (taskTitle, taskContent) {
                tasksFactory.createTask(taskTitle, taskContent)
                    .success(function (data) {
                        $modalInstance.close(data);
                    });
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

        };
        
    ModalInstanceController.$inject = ["$scope", "$modalInstance", "tasksFactory"];
    TasksController.$inject = ["$scope", "tasksFactory", "$http", "$modal", "$log"];
    
    angular.module("tasksModule").controller("TasksController", TasksController);
    
}());
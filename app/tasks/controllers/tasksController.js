(function() {
    
    var TasksController = function($scope, tasksFactory, $http, $location, $modal, $log) {
        
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
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
  
        $scope.editTask = function(taskId) {
            $location.path("/tasks/" + taskId + "/edit");
        };
        
        $scope.createNewTask = function(title, taskContent) {
            
            var newTask = {
                title: title,
                content: taskContent
            };
            
            $http.post("tasks/new", newTask)
                .success(function (data) {
                    $scope.tasks.push(data);
                }); 
        };
         
        // Delete task
        $scope.deleteTask = function (taskId) {
            $http.delete("/tasks/delete/" + taskId)
                .success(function() {
                   init();
            });
            
        };
        
        // Update task
        $scope.updateTask = function (editedTask) {
            $http.put("/tasks/" + editedTask._id + "/update", editedTask)
                .success(function (task) {
                    init();
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
    
    var ModalInstanceController = function($scope, $modalInstance, $http, tasksFactory) {

            $scope.createTask = function(taskTitle, taskContent) {
                var newTask = {
                    title: taskTitle,
                    content: taskContent
                };
                $http.post("/tasks/new", newTask).success(function (data) {
                    console.log($scope.tasks);
                });
            };

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
        
    ModalInstanceController.$inject = ["$scope", "$modalInstance", "$http", "tasksFactory"];
    TasksController.$inject = ["$scope", "tasksFactory", "$http", "$location", "$modal", "$log"];
    
    angular.module("tasksModule").controller("TasksController", TasksController);
    
}());
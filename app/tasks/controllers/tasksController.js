(function() {
    
    var TasksController = function($scope, tasksFactory, $http, $modal, $log) {

        
        
        $scope.predicate = "title";
        $scope.sort = true;
        
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
    
    var ModalInstanceController = function($scope, $modalInstance, tasksFactory, usersFactory) {
        
        function init() {
            usersFactory.getUsers()
                .success(function (data) {
                    //var x = _.pluck(data, "name");
                    $scope.users = data;
                });
        }

        init();

        $scope.createTask = tasksFactory.createTask;

        $scope.ok = function (taskTitle, taskContent, assignedTo, dueDate) {
            tasksFactory.createTask(taskTitle, taskContent, assignedTo, dueDate)
                .success(function (data) {
                    $modalInstance.close(data);
                });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        
        // Date picker
        $scope.today = function() {
             $scope.dt = new Date();
        };
        
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        
        $scope.toggleMin();

        $scope.openPicker = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };
        
        
        
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.initDate = new Date('2016-15-20');
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        

    };
        
    ModalInstanceController.$inject = ["$scope", "$modalInstance", "tasksFactory", "usersFactory"];
    TasksController.$inject = ["$scope", "tasksFactory", "$http", "$modal", "$log"];
    
    angular.module("tasksModule").controller("TasksController", TasksController);
    
}());
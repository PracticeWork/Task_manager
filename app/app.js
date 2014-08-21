(function() {
    
    var app = angular.module("AppModule", ["usersModule", "tasksModule", "ngRoute"]);
    
    app.config(function ($routeProvider) {
        $routeProvider
//                .when("/", {
//                    controller: "TasksController",
//                    templateUrl: "app/tasks/views/tasksView.html"
//                })
                .when("/", {
                    controller: "UsersController",
                    templateUrl: "app/users/views/usersView.html"
                })
                .when("/users", {
                    controller: "UsersController",
                    templateUrl: "app/users/views/usersView.html"
                })
                .when("/users/:userName/:userId/edit", {
                    controller: "EditUserController",
                    templateUrl: "app/users/views/editUserView.html"
                })
                .when("/users/:userName/:userId", {
                    controller: "SingleUserController",
                    templateUrl: "app/users/views/singleUserView.html"
                })
                .when("/users/new", {
                    controller: "NewUserController",
                    templateUrl: "app/users/views/newUserView.html"
                })
                .when("/tasks", {
                    controller: "TasksController",
                    templateUrl: "app/tasks/views/tasksView.html"
                })
                .when("/tasks/:taskId/edit", {
                    controller: "EditTaskController",
                    templateUrl: "app/tasks/views/editTaskView.html"
                })
                .otherwise({redirectTo: "/"});
    });
    
}());
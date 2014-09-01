var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    _und = require("underscore"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override");
    

app.use(express.static(__dirname, "/"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json()); // put the parsed body to req.body

//app.use(methodOverride());



mongoose.connect("mongodb://localhost/task_manager");

var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age :Number,
    created_at:Date,
    password: String
}),
    Users = mongoose.model("Users", UserSchema),
    
    TaskSchema = new mongoose.Schema({
        created_by: String,
        title: String,
        created_at: Date,
        content: String,
        due_date: Date,
        assigned: Object,
        owner_name: String,
        status: Number //0 - represents uncompleted task status, 4 - is for completed
}),
    Tasks = mongoose.model("Tasks", TaskSchema),
    
    CommentSchema = new mongoose.Schema({
        created_by: String,
        task_id: String,
        content: String,
        created_at: Date,
        owner_name: String
    }),
    Comments = mongoose.model("Comments", CommentSchema);
    
// Get comments
app.get("/tasks/:taskId/comments", function(req, res) {
    Comments.find({task_id: req.params.taskId}, function (err, docs) {
        res.json(docs);
    });
});

// Create comment
app.post("/tasks/:taskId/comments", function (req, res) {
    var b = req.body,
        commentCreator = function (created_by) {
            Users.find({_id: created_by}, function (err, docs) {
                new Comments({
                    owner_name: docs[0].name,
                    content: b.content,
                    task_id: b.task_id,
                    created_at: new Date().valueOf(),
                    created_by: b.created_by
                }).save(function (err, docs) {
                    res.json(docs);
                });
            });
        };
        commentCreator(b.created_by);
    
    
});
    
    
// Get tasks list
app.get("/tasks", function (req, res) {
    Tasks.find({}, function (err, docs) {
        res.json(docs);
    });
});

// Create task
app.post("/tasks/new", function (req, res) {
    
    var b = req.body,
        TaskCreator = function (created_by) {
            Users.find({_id: created_by}, function (err, docs) {
                new Tasks({
                    created_by: b.created_by,
                    owner_name: docs[0].name,
                    title: b.title,
                    created_at: new Date().valueOf(),
                    content: b.content,
                    assigned: b.assigned,
                    due_date: b.due_date.valueOf(),
                    status: 0
                }).save(function (err, docs) {
                    res.json(docs);
                });
            });
        };
    TaskCreator(b.created_by);
});



// Get single task
app.get("/tasks/:taskId", function (req, res) {
    Tasks.find({_id: req.params.taskId}, function (err, docs) {
       res.json(docs[0]);
    });
});

// Update task
app.put("/tasks/:taskId/update", function (req, res) {
    
    var b = req.body;

    Tasks.update({_id: req.params.taskId}, {
        title: b.title,
        content: b.content,
        created_at: new Date().valueOf(),
        assigned: b.assigned,
        status: b.status
    }, function (err, docs) {
        console.log(b);
        res.json(docs);
    });

});

// Delete task
app.delete("/tasks/delete/:taskId", function (req, res) {
    Tasks.remove({_id: req.params.taskId}, function (err) {
        res.json(err);
    });
});

// Get users list
app.get("/users", function (req, res) {
    Users.find({}, function (err, docs) {
        res.json(docs);
    });  
});

// Get user by login
app.get("/users/:userName/:password", function (req, res) {
    Users.find({name: req.params.userName, password: req.params.password}, function (err, docs) {
        res.json(docs[0]);
    });
});

// Get single user
app.get("/users/:userId", function (req, res) {
    Users.find({_id: req.params.userId}, function (err, docs) {
        res.json(docs[0]);
    });
});

// Create new user
app.post("/users/new", function (req, res) {
    
    var b = req.body;
    
    new Users({
        name: b.name,
        email: b.email,
        age: b.age,
        password: b.password,
        created_at: new Date().valueOf()
    }).save(function(err, docs) {
        res.json(docs);
    });
    
});

// Update user
app.put("/users/:userName/:userId/edit", function(req, res) {
    
    var b = req.body;
    
    Users.update({_id: req.params.userId}, {
        name: b.name,
        email: b.email,
        age: b.age
    }, function (err) {
        res.json(err);
    });
    
    
});


// Delete user
app.delete("/users/delete/:userId", function(req, res) {
    Users.remove({_id: req.params.userId}, function(err) {
       res.json(err);
    });
});

app.listen(8080);

console.log("Express listening on port 8080");

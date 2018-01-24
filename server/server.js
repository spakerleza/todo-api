const _ = require("lodash");
const {ObjectID} = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

var {Mongoose} = require("./db/mongoose");
var {Todo} = require("./model/todo");
var {User} = require("./model/user");

var app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then(doc => {
        res.send(doc);
    }, e => {
       res.status(400).send(e);
    });
});

app.get("/todos", (req, res) => {
    Todo.find().then( todos => {
        res.send({todos});
    }, e => {
        res.status(400).send(e);
    });
});

app.get("/todos/:id", (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send("Invalid Id");
    }

    Todo.findById(id).then( data => {
        if (!data) {
            return res.status(404).send();
        } 

        res.status(200).send({data});

    }, e => {
        res.status(400).send();
    });
});

app.delete("/todos/:id", (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send("Invalid Id");
    }

    Todo.findByIdAndRemove(id).then( data => {
        if (!data) {
            return res.status(404).send();
        } 

        res.status(200).send({data});

    }, e => {
        res.status(400).send();
    });
});

app.patch("/todos/:id", (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ["text", "completed"]);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send("Invalid Id");
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then( data => {
        if (!data) {
            return res.status(404).send();
        }

        res.status(200).send({data});

    }).catch( e=> {
        res.status(400).send();
    });

});

app.post("/users", (req, res) => {
    var body = _.pick(req.body, ["email", "password"]);
    var user = new User(body);
    
    user.save().then( () => {
        return user.generateAuthToken();
    }).then( token => {
        res.header("x-auth", token).send(user);
    }).catch( e  => {
        res.status(400).send(e);
    });
});


app.get("/users/me", (req, res) => {
    var token = req.header("x-auth");

    User.findByToken(token).then(user => {
        if (!user) {
            return Promise.reject();
        }
        res.send(user);
    }).catch( e => {
        res.status(401).send();
    });
});

app.listen(port, () => {
    console.log("Started on port 3000");
});

module.exports = {app};


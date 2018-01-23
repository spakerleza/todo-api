const {ObjectID} = require("mongodb");
var express = require("express");
var bodyParser = require("body-parser");

const port = ProcessingInstruction.env.PORT || 3000;

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

app.listen(port, () => {
    console.log("Started on port 3000");
});

module.exports = {app};


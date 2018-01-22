var express = require("express");
var bodyParser = require("body-parser");

var {Mongoose} = require("./db/mongoose");
var {Todo} = require("./model/todo");
var {User} = require("./model/user");

var app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
    // console.log(req.body);'
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then(doc => {
        res.send(doc);
    }, e => {
       res.status(400).send(e);
    })
});


app.listen(3000, () => {
    console.log("Started on port 3000");
})




// var newUser = new User({
//     email: "chukwumdimma4life@gmail.com"
// })

// newUser.save().then( result => {
//     console.log(result)
// }, e => {
//     console.log(e);
// })
// var newTodo = new Todo({
//     text: "Cook dinner"
// });

// newTodo.save().then( doc => {
//     console.log(`Save todo ${doc}`)
// }, e => {
//     console.log("Unable to save todo")
// });

// var assTodo = new Todo({
//     text: "Write some nodeJs code",
//     completed: true,
//     completedAt: 1234
// })

// clear

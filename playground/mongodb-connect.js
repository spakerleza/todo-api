// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// Object destructuring
// var user = {name: 'sab-udeh', age: 25};
// var {name} = user;

// var obj = new ObjectID();
// console.log(obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log("Unable to connect to MongoDB server", err)
    }
    console.log("Connected to MongoDB server");
   
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err) {
    //         return console.log("Unable to insert todo", err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection("Users").insertOne({
    //     name: 'Sab-Udeh Chukwumdimma',
    //     age: 27,
    //     location: 'Trans Ekulu, Enugu'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log("Unable to insert new user", err);
    //     }

    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    // });
    db.close();
});
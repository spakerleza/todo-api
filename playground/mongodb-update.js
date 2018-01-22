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
    
    //findOneAndUpdate
    // db.collection("Todos").findOneAndUpdate({
    //     _id: new ObjectID("5a649df26759e1d63452a89f")
    // }, {
    //     $set: {
    //         completed: true,
    //     }
    // }, {
    //     returnOriginal: false
    // }).then( result => {
    //     console.log(result);
    // });

    // Assignment
    db.collection("Users").findOneAndUpdate({
        _id: new ObjectID("5a63aa78262d46077ed344b2")
    }, {
        $set: {
            name: "Sommy Sab-Udeh",
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then( result => {
        console.log(result);
    });
    

    db.close();
});
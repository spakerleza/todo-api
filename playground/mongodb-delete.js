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
    
    // DeleteMany
    // db.collection("Todos").deleteMany({text: "Eat lunch"}).then( result => {
    //     console.log(result);
    // }, err => {
    //     console.log(err);
    // });

    // DeleteOne
    // db.collection("Todos").deleteOne({text: 'Eat lunch'}).then(result => {
    //     console.log(result);
    // });

    // FindOneAndDelete
    db.collection("Todos").findOneAndDelete({completed: false}).then(result => {
        console.log(result);
    });
    

    db.close();
});
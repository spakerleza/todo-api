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
   
    // Fetch all
    // db.collection("Todos").find().toArray().then( docs => {
    //     console.log("Todos");
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }, err => {
    //     console.log("Unablet o fetch todos", err)
    // });

    // Fetch with a cluse
    // db.collection("Todos").find({completed: false}).toArray().then( docs => {
    //     console.log("Todos");
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }, err => {
    //     console.log("Unablet o fetch todos", err)
    // });

    // db.collection("Todos").find({
    //     _id: new ObjectID('5a63a90614ad6d0773b39caf')
    // }).toArray().then( docs => {
    //     console.log("Todos");
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }, err => {
    //     console.log("Unablet o fetch todos", err)
    // });
    // Fetch with a cluse End

    // count
    // db.collection("Todos").find().count().then( count => {
    //     console.log("Todos");
    //     console.log(`Todos count: ${count}`);
    // }, err => {
    //     console.log("Unabable to fetch todos", err)
    // });

    // Assignment --- with a call back
    // db.collection("Users").find({name: 'Sab-Udeh Chukwumdimma'}).toArray(function(err, docs) {
    //     if (err) {
    //         console.log("Unable to fetch data", err);
    //     }
    //     console.log(JSON.stringify(docs, undefined, 2));
    // })
    // Assignment --- with a promise
    db.collection("Users").find({name: 'Sab-Udeh Chukwumdimma'}).toArray().then( doc => {
        console.log(JSON.stringify(doc, undefined, 2));
    }, err => {
        console.log("Unable to fetch data", err)
    });
    

    db.close();
});
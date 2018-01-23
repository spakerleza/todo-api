const {ObjectID} = require("mongodb"); 
const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/model/todo");
const {User} = require("./../server/model/user");

var id     = "5a671e2519fd5b2a107c43f8";
var UserId = "5a66312837d6f31e49ed7400";

if (!ObjectID.isValid(UserId)) {
    return console.log("ID not valid");
}

User.findById({_id: UserId}).then( data => {
    if (!data) {
        return console.log("User does not exist");
    }
    console.log("User email: ", data.email);
}).catch( e => console.log("error"));

//Find - user to query and get data
// Todo.find({
//     _id: id,
// }).then( data => {
//     console.log("Todos", data);
// });

// // Find one to get only one maching Item
// Todo.findOne({
//     _id: id,
// }).then( data => {
//     console.log("Todos", data);
// });

// // FInd by Id
// Todo.findById(id).then( data => {
//     if (!data) {
//         return console.log("Wrong Id");
//     }
//     console.log("Todos by Id", data);
// }).catch(e => {
//     console.log(e);
// });
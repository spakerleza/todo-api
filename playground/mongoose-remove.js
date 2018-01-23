const {ObjectID} = require("mongodb"); 
const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/model/todo");
const {User} = require("./../server/model/user");

// var id     = "5a671e2519fd5b2a107c43f8";

// All mongoose remove methods

// CollectionInstatnce.remove({})
// CollectionInstatnce.findOneAndRemove({key: value});
// CollectionInstatnce.findByIdAndRemove(id);

// Todo.remove({}).then( res => {
//     console.log(res);
// });

// Todo.findOneAndRemove({_id: "5a676ba96759e1d634534d72"}).then( res => {
//     // Code here
// });

Todo.findByIdAndRemove("5a6772416759e1d634535034").then( res => {
    console.log(res);
});

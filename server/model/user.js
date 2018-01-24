const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true,
        unique: true,
        validate: {
            validator : validator.isEmail,
            message: "{VALUE} is not a valid email"
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    tokens: [{
        access: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        }
    }]
});

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObj = user.toObject();

    console.log(userObj);
    return _.pick(userObj, ["_id", "email"]);
};

// Instance method
UserSchema.methods.generateAuthToken = function () {
    var user = this;

    var access = "auth";
    var token = jwt.sign({_id: user._id.toHexString(), access}, "abc123").toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};


UserSchema.statics.findByToken = function(token) {
    var User = this, decoded = "true";

    try {
        decoded = jwt.verify(token, "abc123");
    } catch(e) {
        // return new Promise( (resolve, reject) => {
        //     reject();
        // });
        return Promise.reject();
    }
  
    return User.findOne({
        "_id" : decoded._id,
        "tokens.token": token,
        "tokens.access" : "auth"
    });
    
};


var User = mongoose.model("Users",UserSchema);

module.exports = {User};
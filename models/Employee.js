const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    address:{
        type:String,
        require:true,
        trim:true
    }
})

module.exports = mongoose.model('User', UserSchema);
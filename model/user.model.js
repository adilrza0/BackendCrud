const { default: mongoose } = require("mongoose");

const UserSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String
},{versionKey:false})

const userModel=mongoose.model("user",UserSchema)

module.exports={
    userModel
}
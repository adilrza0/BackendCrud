const { default: mongoose } = require("mongoose");

const noteSchema=mongoose.Schema({
    titel:String,
    body:String,
    username:String,
    userId:String

},{versionKey:false})

const noteModel=mongoose.model("note",noteSchema)

module.exports={
    noteModel
}
const express=require("express")
const { auth } = require("../middleware/auth.middleware")
const { noteModel } = require("../model/note.model")


const noteRouter=express.Router()
noteRouter.use(auth)
noteRouter.get("/",async(req,res)=>{
    const {username,userId}=req.body
    try {
        const note=await noteModel.find({userId,username})
        res.status(200).send(note)
    } catch (error) {
        res.status(400).send({"err":error})
    }
})

noteRouter.post("/add",async(req,res)=>{
    const {title,body,username,userId}=req.body
    console.log(req.body)
    try {
       const note=new noteModel({title,body,userId,username})
       await note.save()
       res.status(200).send({"msg":"new note added","newNote":req.body})
    } catch (error) {
        res.status(400).send({"err":error})
        
    }

})

noteRouter.patch("/update/:noteId",async(req,res)=>{
    const {noteId}=req.params
    
    const note=await noteModel.find({_id:noteId})
   
    try {
        
    if(note.userId==req.body.noteId){
      
        const update=await noteModel.findOneAndUpdate({_id:noteId},req.body)
       
        if(update,"updtae"){
            res.send({"msg":update})
        }else{
            res.send({"err0":"not working"})
        }
    }
        
    } catch (error) {
        console.log(error)
        res.send({"err":error})
    }
    

})
noteRouter.delete("/delete/:noteId",async(req,res)=>{
    const {noteId}=req.params
    
    const note=await noteModel.find({_id:noteId})
   
    try {
        
    if(note.userId==req.body.noteId){
      
        const Delete=await noteModel.findOneAndDelete({_id:noteId})
        console.log(Delete)
       
        if(Delete){
            res.send({"msg":Delete})
        }else{
            res.send({"err0":"not working"})
        }
    }
        
    } catch (error) {
        console.log(error)
        res.send({"err":error})
    }
    
    
})

module.exports={
    noteRouter
}
const express=require("express")
const bcrypt=require("bcrypt")
const { userModel } = require("../model/user.model")
const jwt=require("jsonwebtoken")

const userRouter=express.Router()

userRouter.post("/register",(req,res)=>{
    const {email,username,password}=req.body
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(200).send({"err":err.message})
            }
            else{
                console.log(hash)
                const user=new userModel({email,username,password:hash})
                await user.save()
                res.status(200).send({"msg":"new user has been added","NewUser":req.body})
            }
        })
    
        
    } catch (error) {
        res.status(400).send({"err":err})
    }
    

})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body

    try {
        const user=await userModel.find({email})
       
        bcrypt.compare(password,user[0].password,(err,result)=>{
            if(result){
                const token=jwt.sign({username:user[0].username,userId:user[0]._id},"masai")
                res.status(200).send({"msg":"successfully logedin ","token":token})
            }else{
                res.status(200).send({"err":err.message})
            }

        })
        
    } catch (error) {
        res.status(400).send({"err":error})
        
    }
})

module.exports={
    userRouter
}
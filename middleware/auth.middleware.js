const jwt=require("jsonwebtoken")
const express=require('express')

const auth=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[0]
    if(token){
        jwt.verify(token,"masai",(err,result)=>{
            if(result){
                req.body.username=result.username
                req.body.userId=result.userId
                console.log(req.body)
                next()
            }else{
                res.status(200).send({"err":err})
            }
        })
    }
    else{
        res.status(400).send({"err":"Please Login Again"})
    }
    
}

module.exports={
    auth
}
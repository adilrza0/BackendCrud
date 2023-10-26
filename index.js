const express=require("express")
const connection = require("./db")
const { userRouter } = require("./Route/user.route")
const { noteRouter } = require("./Route/note.route")\
const cors=require("cors")
require("dotenv").config()

const app=express()


app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("send")
})
app.use("/users",userRouter)

app.use("/notes",noteRouter)


app.listen(4500,async()=>{
    await connection
    console.log("server running")
})
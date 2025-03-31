const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')



const server = express()
server.use(express.json())
server.use(cors())
mongoose.connect("mongodb://localhost:27017/task")

const monSchema = new mongoose.Schema({
        taskHead:{
            require:true,
            type:String,
        },
        task:{
            require:true,
            type:String,
        }
})
const mongoModel = mongoose.model('task',monSchema)

//  create
server.post('/task',async(req,res)=>{
    const {taskHead,task}= req.body
    try {
        const model = new mongoModel({taskHead,task})
       await model.save()
        res.status(201).json(model)
    } catch (error) {
        console.log(error);
        
    }
})
// store the data
server.get('/task',async(req,res)=>{
   try {
    const tasks = await mongoModel.find()
   res.json(tasks)
   } catch (error) {
    console.log(error);
    res.status(500).json({messaage:"error in get "})
    
   }
})
// delete
server.delete('/task/:id',async(req,res)=>{
    try {
        const id = req.params.id
        await mongoModel.findByIdAndDelete(id)
        res.status(200).end()
    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error in delete "})
            
    }
    })
server.listen(8000,()=>{
    console.log("port is connect");
})

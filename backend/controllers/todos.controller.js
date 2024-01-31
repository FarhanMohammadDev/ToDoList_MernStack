import TodoModel from "../models/todo.schema.js"

const CreateTask = async (req , res) => {
    console.log(req.body);
    try {
        const response = await TodoModel.create(req.body)
        res.status(200).json({
            data : response,
            message : "Task is created"
        })
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

const getTask = async (req, res) => {
    try {
        const response = await TodoModel.find()
        res.status(200).json({
            data : response,
            message : "All tasks are fetched "
        })
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

const getTaskById = async (req , res) => {
    try {
        const response = await TodoModel.find(req.params.id)
        res.status(200).json({
            data : response,
            message : "All tasks are fetched "
        })
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

const UpdateTask = async(req , res)=> {
  try {
    const response = await TodoModel.findByIdAndUpdate(req.params.id , {$set : req.body})
    res.status(200).json({
        data : response,
        message : "Task is updated "
    })
    
  } catch (error) {
    res.status(400).json({message : error.message})
  }
}

const DeleteTask = async(req , res) => {
    try {
        const response = await TodoModel.findByIdAndDelete(req.params.id , {$set : req.body})
        res.status(200).json({
            data : response,
            message : "Task is deleted "
        })  
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

export default {
    CreateTask, 
    getTask,
    getTaskById,
    UpdateTask,
    DeleteTask
}
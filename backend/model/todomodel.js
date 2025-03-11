import mongoose, { Schema } from "mongoose";
const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
      },
      user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
      },
      answers: [{
        text: { type: String, required: true },
        userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    }]
    
},{timestamps:true})

const Todo = mongoose.model('todo',todoSchema)

export default Todo
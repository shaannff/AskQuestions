import User from "../model/userModal.js";
import Todo from "../model/todomodel.js";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import dotenv from 'dotenv'

export const login = async( req,res )=>{
    const {email , password }= req.body
    try {
    

        const user = await User.findOne({email:email})
        if(!user){
            console.log(1)
            return res.status(404).json({message:'user not found'})

            
        }
        if(user.password == password){

            const paylod = {id:user.id,email:user.email}
            const token = jwt.sign(paylod,process.env.JWTSECRET,{expiresIn:'1h'})
            console.log(2)
            return res.status(200).json({message:'login succses',token,email:user.email,name:user.name})

        }else{
            res.status(401).json({message:'password is not matching'})
            console.log(3)

            return
        }

        
    } catch (error) {
        console.log(error,'from the register user ')
        res.status(500).json({message:'user register failed',error:error.message})
    }
}

export const SignUp = async (req,res)=>{

    const {name,email,password}=req.body
    
    try {
        const esixt=await User.findOne({email:email})

        if(esixt){
            return res.status(500).json({message:'email already existed'})
            
        }
        const newUser = new User({name,email,password})
        await newUser.save()
        
        const payload = {id:newUser.id,email:newUser.email, name: newUser.name }
        const token = jwt.sign(payload,process.env.JWTSECRET,{expiresIn:'1h'})
        return res.status(201).json({message:'signUp succses',token})

        
    } catch (error) {
        console.log(error,'from the signUp')
        return res.status(500).json({message:'user signUp failed',error:error.message})
    }
}
export const addQuestion=async(req,res)=>{
    try {
        const {questionText,email}=req.body

        const userdet = await User.findOne({email:email})

        const text = questionText;
        const userId = userdet.id

        const newQuestion = new Todo ({
            text,
            user:userId,
            answers:[]
        })

        await newQuestion.save()
        return  res.status(200).json({newQuestion,message:'question added'})


    } catch (error) {
        console.log(error,'from the add question')
       return res.status(500).json({message:'question adding failed'})
    }
}

export const getQuestion=async(req,res)=>{
    try {
        const data = await Todo.find({})
       return res.status(200).json({message:'got the questions',data})
    } catch (error) {
        console.log(error,'from the getQuestions')
       return res.status(500).json({message:'issue to get the questions'})
    }
}

export const addAnswer=async(req,res)=>{
    try {
        const {id,answer,email}=req.body
      
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message :'nothg founded'})
        }
        const todo = await Todo.findById(id)
        if(!todo){
            return res.status(401).json({message:'Question not founded'})
        }
        const newAnswer = {
            text: String(answer),
            userid: new mongoose.Types.ObjectId(user._id)
        };

        todo.answers.push(newAnswer)
        await todo.save();

        return res.status(200).json({message:'answer added succes'})
    } catch (error) {
        console.log('error from the addAnswer',error)
        return res.status(500).json({message:'error from addin answer'})
    }
}

export const logout=async(req,res)=>{
    try {
        res.clearCookie('token')
        return res.status(200).json({ message: "Logout successful" });

    } catch (error) {
        console.log('error fro the logout',error)
        return res.status(500).json({ message: "Logout failed",token:'' });

    }
}

export const deleteAll = async(req,res)=>{
    try{
        console.log(123)
            const result = await Todo.deleteMany({})
            console.log(result,'.............succses')
            return res.status(200).json({
                message: "All todos deleted successfully",
                deletedCount: result.deletedCount,
            });
    }catch(error){
        console.log(error,'from the the delete all')
        return res.status(500).json({ message: "Failed to delete todos", error: error.message });

    }
}
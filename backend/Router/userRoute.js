import express from 'express'
import { addAnswer, addQuestion, deleteAll, getQuestion, login, logout, SignUp } from '../controller/userController.js'
import { authmiddleware } from '../middleware/authmiddleware.js'

const router = express.Router()

router.post('/login',login)
router.post('/signUp',SignUp)
router.post('/addQuestion',authmiddleware,addQuestion)
router.post('/addAnswer',authmiddleware,addAnswer)
router.get('/getQuestions',authmiddleware,getQuestion)
router.post('/logout',authmiddleware,logout)
router.delete('/deleteall',deleteAll)


export default router
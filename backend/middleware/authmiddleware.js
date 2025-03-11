import jwt  from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export const authmiddleware=(req,res,next)=>{
    const authheaders = req.headers.authorization 

    if(!authheaders || !authheaders.startsWith('Bearer')){
        return res.status(401).json({mesaage:'usee unauthrizied'})
    }
    const token = authheaders.split(' ')[1]
    try {
        const decode = jwt.verify(token,process.env.JWTSECRET)
        req.user = decode
        next()
    } catch (error) {
        console.log(error,'from the auth middleware')
        return res.status(401).json({mesaage:'Unauthrized user so ..cant '})
    }
}


const jwt = require('jsonwebtoken');
require('dotenv').config({path:".env"});
let Key = process.env.SECRETKEY;
const FetchUser = async(req,res,next)=>{
    let success = false
    let token = req.header('auth-token');
    if(!token){
        return res.status(500).json({
            msg:"NO Token is Provided , Authorization Denaied",
            success
        })
    }
    // if there has a token
    try {
        let verifyVal = jwt.verify(token,Key)
       req.payload = {
        userId:verifyVal
       }
        
    } catch (error) {
        return res.status(500).json({
            msg:"something went wrong in middleware file",
            success,
            error
        })
    }
     next();
}

module.exports = FetchUser
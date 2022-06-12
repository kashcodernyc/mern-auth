const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');

const auth = asyncHandler(async(req,res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // Get token from headers
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user froom the token
            req.user = await User.findById(decoded.id).select('-password')
            next()

        }catch(err){
            console.log(err)
            res.status(401)
            throw new Error('not authorized')
        }
        if(!token){
            res.status(401)
            throw new Error('not authorized')
        }
    }
})

module.exports = {auth}
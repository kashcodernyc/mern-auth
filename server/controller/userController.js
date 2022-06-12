const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');

// Register new user
// POST
// Public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;

    if(!name|| !email|| !password) {
        res.status(400)
        throw new Error('Please add all the required fields')
    }else{
        // Check if the email already exist
        const userExist = await User.findOne({email})
        if(userExist) {
            res.status(400)
            throw new Error('Email already exist')
        }

        // Hash the passwords
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        
        if(user){
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateTokem(user._id)
            })
        }else{
            res.status(400)
            throw new Error('invalid user data')
        }
    }
})

// Authenticate a user
// POST /api/users/login
// Public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    //check for user by email
    const user = await User.findOne({ email})

    if(user && (await bcrypt.compare(password.toString(), user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email, 
            passwordtoken: generateTokem(user._id)
        })
    }else{
        res.status(404)
        throw new Error('Invalid email or password!')
    }

})

// Get user data
// GET /api/users/login
// Private
const getLoggedUser = asyncHandler(async(req, res) => {
    res.json({message: "Dispay Logged User"})
})


// generate JWT
const generateTokem = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '7d'})
}

module.exports = {registerUser, loginUser, getLoggedUser};
const asyncHandler = require('express-async-handler');
// Get All Goals
// GET /api/Goals
// Private
const getGoals = asyncHandler(async(req,res) => {
    res.status(200).send({message: 'Get Goals'})
    res.status(400).send(err)
})

// Set Goal
// POST /api/Goals
// Private
const setGoal = asyncHandler(async(req,res) => {
    if(!req.body.text){
        res.status(404)
        throw new Error('please add a text field')
    }
    console.log(req.body);
    res.status(200).send({message: 'Set Goals'})

})

// Update Goal
// PUT /api/Goal:id
// Private
const updateGoal = asyncHandler(async(req,res) => {
    res.status(200).send({message: `Update Goal ${req.params.id}`})
})

// Delete Goal
// DELETE /api/Goals:id
// Private
const deleteGoal = asyncHandler(async(req,res) => {
    res.status(200).send({message: `Delete Goals ${req.params.id}`})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal

}
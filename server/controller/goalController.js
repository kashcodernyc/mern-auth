const asyncHandler = require('express-async-handler');
const Goal = require('../model/goalModel');

// Get All Goals
// GET /api/Goals
// Private
const getGoals = asyncHandler(async(req,res) => {
    const goals = await Goal.find();
    res.status(200).json(goals)
})

// Set Goal
// POST /api/Goals
// Private
const setGoal = asyncHandler(async(req,res) => {
    if(!req.body.text){
        res.status(404)
        throw new Error('please add a text field')
    }else{
        const goal = await Goal.create({
            text: req.body.text
        })
        res.status(200).json(goal)
    }
   

})

// Update Goal
// PUT /api/Goal:id
// Private
const updateGoal = asyncHandler(async(req,res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('goal not found')
    }else{
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json({updatedGoal})
    }
    
})

// Delete Goal
// DELETE /api/Goals:id
// Private
const deleteGoal = asyncHandler(async(req,res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('goal not found')
    }else{
        await goal.remove()
        res.status(200).json({id: req.params.id})
    }
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal

}
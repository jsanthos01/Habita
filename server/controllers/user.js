const User = require("../models/Users");
const Habits = require("../models/Habits");
const express = require('express');
const ErrorResponse = require('../utils/errorResponse');

exports.userInfo = async (req, res, next) => {
    const { username, email } = req.body;
    try {
        const user = await User.findOne({ username, email }, { password: 0, email: 0 });
        res.status(200).json({
            success: true, 
            data: user
        })
    } catch (error) {
        next(error);
    }
}

exports.createHabit = async (req, res, next) => {
    const email = req.user.email;
    const { title, notes, difficulty, tags, timeframe } = req.body;

    try {
        const habit =  await Habits.create ({
           name: title, notes, difficulty, tags, timeframe
        })
        const user = await User.findOneAndUpdate({ email }, { $push: { habits: habit._id} }, { new: true });
        res.status(200).json({
            success: true, 
            data: user
        })
    } catch (error) {
        next(error);
    }
}
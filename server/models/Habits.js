const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a title for your habit"]
    },

    notes: String,
    type: String,
    difficulty: String,
    timeframe: String,
    tags: String,
    // timestamps: true
    
});



const Habits = mongoose.model('Habits', HabitSchema);
module.exports = Habits;
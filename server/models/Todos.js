const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: [true, "Please provide a title for your Todo"]
    },

    notes: String,
    type: String,
    difficulty: String,
    timeframe: String,
    tags: String,
    // timestamps: true
    
});



const Todos = mongoose.model('Todos', TodoSchema);
module.exports = Todos;
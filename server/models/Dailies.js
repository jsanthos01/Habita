const mongoose = require('mongoose');

const DailiesSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: [true, "Please provide a title for your Dailies"]
    },

    notes: String,
    type: String,
    difficulty: String,
    timeframe: String,
    tags: String,
    // timestamps: true
    
});



const Dailies = mongoose.model('Dailies', DailiesSchema);
module.exports = Dailies;
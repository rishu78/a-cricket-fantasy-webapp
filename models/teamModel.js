const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['WK', 'BAT', 'AR', 'BWL'],
        required: true
    }
});

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    players: {
        type: [playerSchema],
        required: true
    },
    captain: {
        type: String,
        required: true
    },
    viceCaptain: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Team', teamSchema);

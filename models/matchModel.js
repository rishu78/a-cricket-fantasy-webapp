const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    matchDate: {
        type: Date,
        required: true
    },
    teams: [{
        type: String,
        required: true
    }],
    result: {
        type: String,
        required: true
    },
    ballByBall: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Match', matchSchema);

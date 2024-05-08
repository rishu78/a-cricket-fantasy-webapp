const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const User = require('./models/userModel');
const Team = require('./models/teamModel');
const Match = require('./models/matchModel');
const teamRoutes = require('./routes/teamRoutes');
const matchRoutes = require('./routes/matchRoutes');
const { processMatchResult, viewTeamResults } = require('./controllers/matchController');

mongoose.connect('mongodb+srv://rishabh782818:j4lWoeH3vZhoKUg6@fantasy-app-db.stlirrp.mongodb.net/?retryWrites=true&w=majority&appName=fantasy-app-db');

app.use(express.json());
app.use('/team', teamRoutes);
app.use('/match', matchRoutes);

async function insertData() {
    try {
        // Insert user data
        const user = await User.create({
            name: 'Rishabh Rathore',
            email: 'rishabh140302@gmail.com',
            password: 'Rishabh@123'
        });
        console.log('User inserted successfully:', user);

        // Insert team data for RR
        const teamRR = await Team.create({
            teamName: 'RR',
            players: [
                { name: 'Rishabh', type: 'WK' },
                { name: 'Rohit', type: 'BAT' },
                { name: 'Amar', type: 'AR' },
                { name: 'Ajit', type: 'WK' },
                { name: 'Rohit', type: 'BAT' },
                { name: 'Suresh', type: 'AR' },
                { name: 'Rishikesh', type: 'WK' },
                { name: 'Puneet', type: 'BAT' },
                { name: 'Avinash', type: 'BWL' },
                { name: 'Daya', type: 'WK' },
                { name: 'Jehtalal', type: 'BAT' },
                { name: 'Sunder', type: 'BWL' }
            ],
            captain: 'Rishabh',
            viceCaptain: 'Rohit'
        });
        console.log('RR Team inserted successfully:', teamRR);

        // Insert team data for CSK
        const teamCSK = await Team.create({
            teamName: 'CSK',
            players: [
                { name: 'Arjun', type: 'WK' },
                { name: 'Vikram', type: 'BAT' },
                { name: 'Rajesh', type: 'AR' },
                { name: 'Ravi', type: 'WK' },
                { name: 'Sanjay', type: 'BAT' },
                { name: 'Amit', type: 'AR' },
                { name: 'Deepak', type: 'WK' },
                { name: 'Prakash', type: 'BAT' },
                { name: 'Rahul', type: 'BWL' },
                { name: 'Anand', type: 'WK' },
                { name: 'Ajay', type: 'BAT' },
                { name: 'Mohan', type: 'BWL' },
            ],
            captain: 'Arjun',
            viceCaptain: 'Vikram'
        });
        console.log('CSK Team inserted successfully:', teamCSK);

        const matchData = await Match.create({
            teams: 'CSKvRR',
            result: JSON.stringify([
                { 
                    playerName: 'Rishabh', 
                    runs: 50, 
                    isBoundary: true, 
                    isSix: false, 
                    isThirtyRunBonus: true, 
                    isHalfCentury: true, 
                    isCentury: false, 
                    isDismissed: false, 
                    wickets: 2, 
                    isBonus: false, 
                    isThreeWicket: false, 
                    isFourWicket: false, 
                    isFiveWicket: false, 
                    isMaidenOver: false, 
                    catches: 1, 
                    isThreeCatches: false, 
                    stumpings: 0, 
                    runOuts: 1 
                },
                { 
                    playerName: 'Rohit', 
                    runs: 30, 
                    isBoundary: false, 
                    isSix: true, 
                    isThirtyRunBonus: false, 
                    isHalfCentury: false, 
                    isCentury: false, 
                    isDismissed: true, 
                    wickets: 0, 
                    isBonus: false, 
                    isThreeWicket: false, 
                    isFourWicket: false, 
                    isFiveWicket: false, 
                    isMaidenOver: false, 
                    catches: 2, 
                    isThreeCatches: true, 
                    stumpings: 0, 
                    runOuts: 0 
                },
                { 
                    playerName: 'Arjun', 
                    runs: 20, 
                    isBoundary: true, 
                    isSix: false, 
                    isThirtyRunBonus: true, 
                    isHalfCentury: true, 
                    isCentury: false, 
                    isDismissed: false, 
                    wickets: 2, 
                    isBonus: false, 
                    isThreeWicket: false, 
                    isFourWicket: false, 
                    isFiveWicket: false, 
                    isMaidenOver: false, 
                    catches: 1, 
                    isThreeCatches: false, 
                    stumpings: 0, 
                    runOuts: 1 
                },
                { 
                    playerName: 'Vikram', 
                    runs: 55, 
                    isBoundary: false, 
                    isSix: true, 
                    isThirtyRunBonus: false, 
                    isHalfCentury: false, 
                    isCentury: false, 
                    isDismissed: true, 
                    wickets: 0, 
                    isBonus: false, 
                    isThreeWicket: false, 
                    isFourWicket: false, 
                    isFiveWicket: false, 
                    isMaidenOver: false, 
                    catches: 2, 
                    isThreeCatches: true, 
                    stumpings: 0, 
                    runOuts: 0 
                }
            ]),
            ballByBall: JSON.stringify([
                { ballNumber: 1, runs: 1, isBoundary: false, isSix: false, isWicket: false },
                { ballNumber: 2, runs: 0, isBoundary: false, isSix: false, isWicket: true },
                { ballNumber: 3, runs: 6, isBoundary: true, isSix: true, isWicket: true },
                { ballNumber: 4, runs: 0, isBoundary: false, isSix: false, isWicket: true },
                { ballNumber: 5, runs: 2, isBoundary: false, isSix: false, isWicket: true },
                { ballNumber: 6, runs: 4, isBoundary: true, isSix: false, isWicket: true }
            ]),
            matchDate: new Date() // Provide the match date here
        });
        
        console.log('Match data inserted successfully:', matchData);
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

insertData();

// Endpoint to process match result
app.post('/process-result', processMatchResult);

// Endpoint to view team results
app.get('/team-result', viewTeamResults);

http.listen(3000, function(){
    console.log('Server is running');
});

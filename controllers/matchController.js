const Team = require('../models/teamModel');
const Match = require('../models/matchModel');

const calculateBattingPoints = (runs, isBoundary, isSix, isThirtyRunBonus, isHalfCentury, isCentury, isDismissed) => {
    let points = runs;

    // Bonus points for boundaries
    if (isBoundary) {
        points += 1;
    }

    // Bonus points for sixes
    if (isSix) {
        points += 2;
    }

    // Bonus points for 30 runs
    if (isThirtyRunBonus) {
        points += 4;
    }

    // Bonus points for half-century
    if (isHalfCentury) {
        points += 8;
    }

    // Bonus points for century
    if (isCentury) {
        points += 16;
    }

    // Deduct points for dismissal for a duck
    if (isDismissed) {
        points -= 2;
    }

    return points;
};

const calculateBowlingPoints = (wickets, isBonus, isThreeWicket, isFourWicket, isFiveWicket, isMaidenOver) => {
    let points = wickets * 25;

    // Bonus points for LBW or Bowled
    if (isBonus) {
        points += 8;
    }

    // Bonus points for 3 wickets
    if (isThreeWicket) {
        points += 4;
    }

    // Bonus points for 4 wickets
    if (isFourWicket) {
        points += 8;
    }

    // Bonus points for 5 wickets
    if (isFiveWicket) {
        points += 16;
    }

    // Bonus points for maiden over
    if (isMaidenOver) {
        points += 12;
    }

    return points;
};

const calculateFieldingPoints = (catches, isThreeCatches, stumpings, runOuts) => {
    let points = catches * 8;

    // Bonus points for 3 catches
    if (isThreeCatches) {
        points += 4;
    }

    // Bonus points for stumpings
    points += stumpings * 12;

    // Bonus points for run outs
    points += runOuts * 6;

    return points;
};

const calculatePlayerPoints = (playerPerformance) => {
    const { type, runs, isBoundary, isSix, isThirtyRunBonus, isHalfCentury, isCentury, isDismissed, wickets, isBonus, isThreeWicket, isFourWicket, isFiveWicket, isMaidenOver, catches, isThreeCatches, stumpings, runOuts } = playerPerformance;
    let points = 0;

    // Calculate points based on player type
    switch (type) {
        case 'BAT':
            points = calculateBattingPoints(runs, isBoundary, isSix, isThirtyRunBonus, isHalfCentury, isCentury, isDismissed);
            break;
        case 'BWL':
            points = calculateBowlingPoints(wickets, isBonus, isThreeWicket, isFourWicket, isFiveWicket, isMaidenOver);
            break;
        case 'WK':
            points = calculateFieldingPoints(catches, isThreeCatches, stumpings, runOuts);
            break;
        default:
            break;
    }

    return points;
};

const calculateTeamPoints = (teamPlayers, matchResult) => {
    let totalPoints = 0;

    for (const player of teamPlayers) {
        const playerPerformance = matchResult.find(performance => performance.playerName === player.name);

        if (playerPerformance) {
            const playerPoints = calculatePlayerPoints(playerPerformance);
            totalPoints += playerPoints;
        }
    }

    return totalPoints;
};

exports.processMatchResult = async (req, res) => {
    try {
        // Read match result data (CSV or JSON)
        // For simplicity, let's assume match data is pre-stored in the database
        const matchData = await Match.findOne({ matchId: 'CSKvRR' });

        if (!matchData) {
            return res.status(404).json({ message: "Match data not found" });
        }

        // Get match result and ball-by-ball details
        const { result, ballByBall } = matchData;

        // Update team entries with calculated points
        const teams = await Team.find();
        for (const team of teams) {
            team.points = calculateTeamPoints(team.players, result);
            await team.save();
        }

        res.status(200).json({ message: "Match result processed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.viewTeamResults = async (req, res) => {
    try {
        // Fetch team entries from the database
        const teams = await Team.find().sort({ points: -1 });

        // Determine top team(s) with maximum points
        const topPoints = teams[0].points;
        const winningTeams = teams.filter(team => team.points === topPoints);

        res.status(200).json({ message: "Team results", winningTeams });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

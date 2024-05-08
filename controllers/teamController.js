const Team = require('../models/teamModel');

exports.addTeamEntry = async (req, res) => {
    // Extract data from request body
    const { teamName, players, captain, viceCaptain } = req.body;

    try {
        // Validate number of players
        if (players.length !== 11) {
            return res.status(400).json({ message: "A team must have exactly 11 players" });
        }

        // Validate player types and counts
        const playerCounts = { WK: 0, BAT: 0, AR: 0, BWL: 0 };
        for (const player of players) {
            const playerType = player.type;
            if (!playerCounts.hasOwnProperty(playerType)) {
                return res.status(400).json({ message: "Invalid player type" });
            }
            playerCounts[playerType]++;
            if (playerCounts[playerType] > 8) {
                return res.status(400).json({ message: `Maximum 8 players allowed for ${playerType}` });
            }
        }

        // Validate captain and vice-captain
        const selectedPlayerNames = players.map(player => player.name);
        if (!selectedPlayerNames.includes(captain) || !selectedPlayerNames.includes(viceCaptain)) {
            return res.status(400).json({ message: "Captain or vice-captain not among selected players" });
        }

        // Save team entry to the database
        const newTeam = await Team.create({
            teamName,
            players,
            captain,
            viceCaptain
        });

        res.status(201).json({ message: "Team entry added successfully", team: newTeam });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

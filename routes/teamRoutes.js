const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// Add team entry route
router.post('/add-team', teamController.addTeamEntry);

module.exports = router;

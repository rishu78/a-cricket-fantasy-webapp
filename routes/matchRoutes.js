const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

// Process match result route
router.post('/process-result', matchController.processMatchResult);

// View team results route
router.get('/team-result', matchController.viewTeamResults);

module.exports = router;

const express = require("express")
const playerController = require("./../controllers/playerController");

/////////////////////////////////////////////////////////// PLAYER ROUTES
const router = express.Router({mergeParams: true});

router.route('/').get(playerController.getAllPlayers)
router.route('/:id').get(playerController.getPlayerById)

module.exports = router;
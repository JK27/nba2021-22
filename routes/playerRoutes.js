const express = require("express")
const playerController = require("./../controllers/playerController");

/////////////////////////////////////////////////////////// PLAYER ROUTES
const router = express.Router({mergeParams: true});

router.route('/').get(playerController.getAllPlayers)
router.route('/:id').get(playerController.getPlayerById)
router.route('/player-info/:team').get(playerController.getPlayerInfo)

// router.get("/", playerController.getAllPlayers);
// router.get("/:id", playerController.getPlayerById);
// router.get("/player-info/:team", playerController.getPlayerInfo);


module.exports = router;
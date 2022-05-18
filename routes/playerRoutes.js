const express = require("express")
const playerController = require("./../controllers/playerController");

/////////////////////////////////////////////////////////// PLAYER ROUTES
const router = express.Router()

router.get("/", playerController.getAllPlayers);
router.get("/:id", playerController.getPlayerById);
router.route("/player-info/:team").get(playerController.getPlayerInfo);

module.exports = router;
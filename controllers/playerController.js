const Player = require("./../models/playerModel");
const APIFeatures = require("./../utils/apiFeatures")

/////////////////////////////////////////////////////////// GET ALL PLAYERS 
exports.getAllPlayers = async (req, res) => {
  try {
    // DOES => Executes the query.
    // NOTE => Chaining methods is possible because after calling each method, we always return "this".
    const features = new APIFeatures(Player.find(), req.query).filter().sort().limitFields().paginate();
    const players = await features.query;

    // DOES => Sends the response.
    res.status(200).json({
      status: "success",
      results: players.length,
      data: {
        players,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: 'Cannot find all players.',
    });
  }
};

/////////////////////////////////////////////////////////// GET PLAYER BY ID
exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        player,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid player id.",
    });
  }
}

/////////////////////////////////////////////////////////// GET PLAYERS INFO
exports.getPlayerInfo = async (req, res) => {
  try {
    const playersInfo = await Team.aggregate([
      // {
      // 	$unwind: {
      // 		path: "$players",
      // 		preserveNullAndEmptyArrays: true
      // 	}
      // },
      {
        $match: {"name": req.params.team}
      },
      {
        $match: {"players.status": "ACT", }
      },
      {
        $group: {
          _id: {
            _id: "$id",
            playerId: "$players.id"
          },
          name: {
            $first: "$name"
          },
          player_name: {
            $first: "$players.full_name"
          },
          jersey_number: {
            $first: "$players.jersey_number",
          },
          birthdate: {
            $first: "$players.birthdate"
          },
          status: {
            $first: "$players.status"
          }
        }
      },
      {
        $group: {
          _id: "$id.id",
          name: {
            $first: "$name"
          },
          players: {
            $push: {
              name: "$player_name",
              number: {$toInt: "$jersey_number"},
              birthdate: "$birthdate",
              status: "$status"
              // birthdate: {
              // 	$dateFromString: {
              // 		dateString: "$birthdate",
              // 	}
              // }
            },
          }
        },
      },
    ])


    res.status(200).json({
      status: "success",
      data: {
        playersInfo,
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}
const Team = require("./../models/teamModel");
const APIFeatures = require('./../utils/apiFeatures')

/////////////////////////////////////////////////////////// ROUTE HANDLERS
/////////////////////////////////////// GET ALL TEAMS
exports.getAllTeams = async (req, res) => {
	try {
		// DOES => Executes the query.
		// NOTE => Chaining methods is possible because after calling each method, we always return 'this'.
		const features = new APIFeatures(Team.find(), req.query).filter().sort().limitFields().paginate();
		const teams = await features.query;

		// DOES => Sends the response.
		res.status(200).json({
			status: "success",
			results: teams.length,
			data: {
				teams,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: err,
		});
	}
};

/////////////////////////////////////// GET TEAM BY ID
exports.getTeamById = async (req, res) => {
	try {
		const team = await Team.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: {
				team,
			},
		});
	} catch (err) {
		return res.status(404).json({
			status: "fail",
			message: "Invalid team id.",
		});
	}
};

const Team = require("./../models/teamModel");

/////////////////////////////////////////////////////////// ROUTE HANDLERS
/////////////////////////////////////// GET ALL TEAMS
exports.getAllTeams = async (req, res) => {
	try {
		// FUNCTIONALITY => FILTERING
		// DOES => Creates a new object containing all the key-value pairs from the query parameters.
		const queryObj = { ...req.query };
		// DOES => Removes all the fields in the array from the queryObj.
		const excludedFields = ["page", "sort", "limit", "fields"];
		excludedFields.forEach(el => delete queryObj[el]);
		// DOES => Advance filtering. Allows to use greater and lower than operators adding a '$' to the query to match the mongoDB operators.
		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(/\b(gte?|lte?)\b/g, match => `$${match}`);

		// DOES => Builds the query.
		let query = Team.find(JSON.parse(queryStr));

		// FUNCTIONALITY => SORTING
		if (req.query.sort) {
			const sortBy = req.query.sort.split(",").join(" ");
			query = query.sort(sortBy);
		} else {
			query = query.sort("market");
		}

		// DOES => Executes the query.
		const teams = await query;
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

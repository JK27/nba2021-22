const fs = require("fs");

const teams = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/hierarchy.json`)
);

/////////////////////////////////////////////////////////// ROUTE HANDLERS
/////////////////////////////////////// GET ALL TEAMS
exports.getAllTeams = (req, res) => {
	res.status(200).json({
		status: "success",
		results: teams.length,
		data: {
			teams,
		},
	});
};

/////////////////////////////////////// GET TEAM BY ID
exports.getTeamById = (req, res) => {
	console.log(req.params);

	const id = req.params.id;
	// DOES => Finds the team with id matching the id in the params.
	const team = teams.find(el => el.id === id);

	if (!team) {
		return res.status(404).json({
			status: "fail",
			message: "Team not found",
		});
	}

	res.status(200).json({
		status: "success",
		data: {
			team,
		},
	});
};

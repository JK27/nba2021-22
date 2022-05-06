const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "A team must have a name."],
	},
	market: {
		type: String,
		required: [true, "A team must have a market."],
	},
	alias: {
		type: String,
		length: 3,
	},
	logo: {
		type: String,
	},
	founded: {
		type: Number,
		length: 4,
	},
	reference: {
		type: Number,
	},
	venue: {
		type: {
			name: String,
			capacity: Number,
			address: String,
			city: String,
			state: {
				type: String,
				length: 2,
			},
			state_name: String,
			zip: Number,
			country: String,
			latitude: String,
			longitude: String,
		},
	},
	conference: {
		type: String,
	},
	division: {
		type: String,
	},
	coach: {
		id: String,
		name: String,
		experience: String,
	},

	players: [
		{
			full_name: String,
			first_name: String,
			last_name: String,
			abbr_name: String,
			height: Number,
			weight: Number,
			position: String,
			primary_position: String,
			jersey_number: String,
			experience: String,
			college: String,
			high_school: String,
			birth_place: String,
			birthdate: String,
			rookie_year: Number,
			draft: {
				team_id: String,
				year: Number,
				round: String,
				pick: String,
			},
		},
	],
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;

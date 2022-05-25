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
		// NOTE => Using GeoJSON
		type: {
			type: String,
			default: "Point",
			enum: ["Point"]
		},
		coordinates: [Number],
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
	},
	venueLocation: {
		// NOTE => Using GeoJSON
		type: {
			type: String,
			default: "Point",
			enum: ["Point"]
		},
		coordinates: [Number]

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
			type: mongoose.Schema.ObjectId,
			ref: "Player"
		},
	]

});


const Team = mongoose.model("Team", teamSchema);

module.exports = Team;

const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  status: String,
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
  team_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Team"
  },
});

/////////////////////////////////////////////////////////// INDEXES
playerSchema.index({height: 1, weight: 1})
playerSchema.index({primary_position: 1})
playerSchema.index({jersey_number: 1})
playerSchema.index({experience: 1})
playerSchema.index({rookie_year: 1})

const Player = mongoose.model("Player", playerSchema);

module.exports = Player
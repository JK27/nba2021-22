const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  status: String,
  full_name: String,
  first_name: String,
  last_name: String,
  abbr_name: String,
  height: Number, // Inches
  weight: Number, // Pounds
  position: String,
  primary_position: String,
  jersey_number: String,
  experience: String,
  college: String,
  high_school: String,
  birth_place: String,
  birthdate: String,
  name_suffix: String,
  rookie_year: Number,
  draft: {
    team_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Team",
    },
    year: Number,
    round: String,
    pick: String,
  },
  team_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Team"
  },
});

//////////////////////////////////////////// POPULATE MIDDLEWARE
playerSchema.pre(/^find/, function (next) {
  this.populate({
    path: "draft.team_id",
    select: "market name -_id",
  });

  next();
});

/////////////////////////////////////////////////////////// INDEXES
playerSchema.index({height: 1, weight: 1})
playerSchema.index({primary_position: 1})
playerSchema.index({jersey_number: 1})
playerSchema.index({experience: 1})
playerSchema.index({rookie_year: 1})

const Player = mongoose.model("Player", playerSchema);

module.exports = Player
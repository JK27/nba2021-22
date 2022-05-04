const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

// DOES => Reads variables from file and saves them into Node.js environment variables.
dotenv.config({ path: "./config.env" });

/////////////////////////////////////////////////////////// DATABASE
const DB = process.env.DATABASE.replace(
	"<PASSWORD>",
	process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => console.log("DB connection succesful ✅"));

/////////////////////////////////////////////////////////// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});

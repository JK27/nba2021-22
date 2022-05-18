const mongoose = require("mongoose");
const dotenv = require("dotenv");

// DOES => Reads variables from file and saves them into Node.js environment variables.
dotenv.config({path: "./config.env"});
const app = require("./app");

/////////////////////////////////////////////////////////// DATABASE
const DB = process.env.DATABASE.replace(
	"<PASSWORD>",
	process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => console.log("DB connection succesful ✅"));

/////////////////////////////////////////////////////////// PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
	console.log(err.name, err.message);
	console.log('UNHANDLED REJECTION! 💥 Shutting down...');
	// DOES => Gives the server time to finish all pending requests before exiting the application.
	server.close(() => {
		process.exit(1);
	});
});

const mongoose = require("mongoose");
const dotenv = require("dotenv");

/////////////////////////////////////////////////////////// UNCAUGHT EXCEPTIONS
process.on("uncaughtException", err => {
	console.log("UNCAUGHT EXCEPTION! 💥 SHUTTING DOWN...");
	console.log(err.name, err.message);
	// DOES => Gives the server time to finish all pending requests before exiting the application.
	// NOTE => When dealing with an ucaught exception, we need to crash the application and restart it.
	process.exit(1);
});

/////////////////////////////////////////////////////////// DOTENV
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

/////////////////////////////////////////////////////////// UNHANDLED REJECTIONS
process.on('unhandledRejection', err => {
	console.log('UNHANDLED REJECTION! 💥 Shutting down...');
	console.log(err.name, err.message);
	// DOES => Gives the server time to finish all pending requests before exiting the application.
	server.close(() => {
		process.exit(1);
	});
});


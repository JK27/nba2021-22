const dotenv = require("dotenv");

// DOES => Reads variables from file and saves them into Node.js environment variables.
dotenv.config({ path: "./config.env" });

const app = require("./app");
/////////////////////////////////////////////////////////// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});

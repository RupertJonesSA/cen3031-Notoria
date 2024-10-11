require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const uri = process.env.MONGODB_URI;
const port = 5000;

// MongoDB client setup
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

app.use(express.json());

// Connect to MongoDB once, keep the client open
async function connectToMongoDB() {
	try {
		await client.connect();
		console.log("Connected to MongoDB successfully!");
	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
		await client.close();
		process.exit(1);
	}
}

// Import and use the routes
require("./routes/auth")(app, client);

// Sample route to check the API status
app.get("/api/test-mongo", (req, res) => {
	res.send("MongoDB is running!");
});

// Start the server and connect to MongoDB
app.listen(port, async () => {
	await connectToMongoDB();
	console.log(`Server running on port ${port}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
	console.log("Shutting down");
	await client.close();
	console.log("MongoDB client closed");
	process.exit(0);
});

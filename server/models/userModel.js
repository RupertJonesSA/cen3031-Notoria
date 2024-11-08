// Checks if email is in database
async function getUserByEmail(email, usersCollection) {
	return await usersCollection.findOne({ email });
}

// Inserts user into database
async function createUser(userData, usersCollection) {
	return await usersCollection.insertOne(userData);
}

module.exports = { getUserByEmail, createUser };

const { body, validationResult } = require("express-validator");
const {
	getUserByID,
	addFile,
	renameFile,
	deleteFile,
} = require("../models/userModel");

module.exports = (app, client) => {
	const database = client.db("UserInfo");
	const users = database.collection("users");

	// Retrieve all of the file names for a specific userID
	app.get(
		"/api/get-files",
		[
			// Validate id in the request body
			body("id").notEmpty().withMessage("ID is required"),
		],
		async (req, res) => {
			// Validate request input
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const { id } = req.body;

			try {
				// Check if the user exists
				const user = await getUserByID(id, users);
				if (!user) {
					return res.status(404).json({ msg: "User not found" });
				}

				// Return the user's email if found
				return res.status(200).json({ msg: "Success", files: user.files });
			} catch (error) {
				// Log and handle server errors
				console.error(error);
				return res.status(500).json({ msg: "Server error" });
			}
		}
	);

	app.post(
		"/api/add-file",
		[
			// Validate id in the request body
			body("id").notEmpty().withMessage("ID is required"),
			body("filename").notEmpty().withMessage("File name is required"),
		],
		async (req, res) => {
			// Validate request input
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const { id, filename } = req.body;

			try {
				// Check if the user exists
				const success = await addFile(id, filename, users);

				if (success) {
					return res.status(200).json({ msg: "Success" });
				} else {
					return res.status(404).json({ msg: "Failed" });
				}
			} catch (error) {
				// Log and handle server errors
				console.error(error);
				return res.status(500).json({ msg: "Server error" });
			}
		}
	);

	// Route for renaming a file
	app.put(
		"/api/rename-file",
		[
			body("id").notEmpty().withMessage("ID is required"),
			body("oldFilename").notEmpty().withMessage("Old file name is required"),
			body("newFilename").notEmpty().withMessage("New file name is required"),
		],
		async (req, res) => {
			// Validate request input
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const { id, oldFilename, newFilename } = req.body;

			try {
				// Rename the file in the user's files array
				const result = await renameFile(id, oldFilename, newFilename, users);

				if (result.msg === "File renamed successfully") {
					return res.status(200).json({ msg: "Success" });
				} else {
					return res.status(404).json({ msg: "File not found" });
				}
			} catch (error) {
				console.error(error);
				return res.status(500).json({ msg: "Server error" });
			}
		}
	);

	// Route for deleting a file
	app.delete(
		"/api/delete-file",
		[
			body("id").notEmpty().withMessage("ID is required"),
			body("filename").notEmpty().withMessage("File name is required"),
		],
		async (req, res) => {
			// Validate request input
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const { id, filename } = req.body;

			try {
				// Delete the file from the user's files array
				const result = await deleteFile(id, filename, users);

				if (result.msg === "File deleted successfully") {
					return res.status(200).json({ msg: "Success" });
				} else {
					return res.status(404).json({ msg: "File not found" });
				}
			} catch (error) {
				console.error(error);
				return res.status(500).json({ msg: "Server error" });
			}
		}
	);
};

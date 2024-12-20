const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const { getUserByEmail, createUser } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = (app, client) => {
  const database = client.db("UserInfo");
  const users = database.collection("users");

  const auth = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  };

  // Register route
  app.post(
    "/api/register",
    [
      // Validate username, email and password
      body("username").notEmpty().withMessage("Username is required"),
      body("email").isEmail().withMessage("Please enter a valid email"),
      body("password")
        .isLength({ min: 7 })
        .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
        .withMessage(
          "Password must be at least 7 characters long, contain a capital letter and a special character",
        ),
    ],
    async (req, res) => {
      // Return error if information is not valid
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password } = req.body;

      try {
        // Check if user with same email already exists
        const existingUser = await getUserByEmail(email, users);
        if (existingUser) {
          return res.status(400).json({ msg: "User already exists" });
        }

        // Hash password and store user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await createUser({ username, email, password: hashedPassword }, users);

        res.status(201).json({ msg: "User registered successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
      }
    },
  );

  // Login route
  app.post(
    "/api/login",
    [
      // Validate email and password
      body("email").isEmail().withMessage("Please enter a valid email"),
      body("password").exists().withMessage("Password is required"),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      try {
        // Return error if user does not exist
        const user = await getUserByEmail(email, users);
        if (!user) {
          return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Return error if password does not match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: "Invalid credentials" });
        }

        // const payload = {
        //   user: {
        //     id: user._id,
        //     email: user.email,
        //   },
        // };
        //
        // jwt.sign(payload, jwtSecret, { expiresIn: "1h" }, (err, token) => {
        //   if (err) throw err;
        //   res.status(200).json({ token });
        // });
        res.status(200).json({ msg: "Logged in successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
      }
    },
  );

  // Delete a user by email
  app.delete("/api/delete-user", async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Email is required" });
    }

    try {
      const result = await users.deleteOne({ email });

      if (result.deletedCount === 0) {
        return res.status(404).json({ msg: "User not found" });
      }

      res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  });
};

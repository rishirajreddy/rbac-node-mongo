const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config/dotenv");
const Roles = require("../constants/userRoles");

const jwt_secret = config.jwt_secret || "your_secret_key";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!Object.values(Roles).includes(role)) {
      return res
        .status(400)
        .json({ message: `${Object.values(Roles)} roles are allowed` });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res
      .status(201)
      .json({ data: user, message: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, jwt_secret, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ token, role: user.role, message: "Login successful" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser };

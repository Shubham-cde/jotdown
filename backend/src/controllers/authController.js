const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
});



exports.registerUser = async (req, res, next) => {

  try {
    

    const { name, email, password } = req.body;

    // basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }



    // create salt
const salt = await bcrypt.genSalt(10);

// hash password
const hashedPassword = await bcrypt.hash(password, salt);

// create user with hashed password
const user = await User.create({
  name,
  email,
  password: hashedPassword,
});

    const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

res.status(201).json({
  user: formatUser(user),
  token,
});

  } catch (error) {
  next(error);
}

};
exports.loginUser = async (req, res, next) => {
  try {
    
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      user: formatUser(user),
      token,
    });
  } catch (error) {
    next(error);
  }
};



const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");


const { registerUser, loginUser } = require("../controllers/authController");

// @route   POST /api/auth/register
router.post("/register", registerUser);

// @route   POST /api/auth/login
router.post("/login", loginUser);

// @route   GET /api/auth/me
// @desc    Protected test route
router.get("/me", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});



module.exports = router;

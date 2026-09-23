const cors = require("cors");
const express = require("express");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// CLIENT_URL can list several frontend addresses separated by commas.
// Trailing slashes are removed because CORS compares origins exactly.
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""));

// CORS must run before the routes so browser preflight requests are answered.
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("JOTDOWN backend is running");
});

// Error handler
app.use(errorHandler);

module.exports = app;
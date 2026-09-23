const cors = require("cors");
const express = require("express");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// ✅ CORS FIRST — this is enough
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ THEN body parser
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

const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const tipRoutes = require("./routes/tipRoutes");
const bodyParser = require("body-parser");
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", userRoutes);
app.use("/api", tipRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// server.js
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");

app.use(express.json()); // middleware to parse JSON bodies

// Routes
app.use("/api/users", userRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

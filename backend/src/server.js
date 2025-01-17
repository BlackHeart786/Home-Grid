import express from "express";
import userRoutes from "./routes/userRoutes.js";
import { execute } from "./config/db.js";

import cors from 'cors';

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT"],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Test the database connection
(async () => {
  try {
    const users = await execute("SELECT * FROM users", []); // Test query
    console.log("Database Test Query Results:", users);
  } catch (err) {
    console.error("Error running test query:", err.message);
  }
})();

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import express from "express";
import userRoutes from "./routes/userRoutes.js";

import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

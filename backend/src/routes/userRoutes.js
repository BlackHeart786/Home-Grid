import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../Controllers/userController.js";

const router = express.Router();

// Define routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/createUser", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;

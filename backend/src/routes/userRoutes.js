import express from "express";
import {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllImages
} from "../Controllers/userController.js";

const router = express.Router();

// Define routes

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/images", getAllImages);

export default router;

import User from "../Models/user.js";
import { execute } from "../config/db.js";

import path from 'path';
import sharp from 'sharp';
import multer from 'multer';
// Register user

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('profile_image');

export const registerUser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'File upload error', error: err.message });
    } else if (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }

    try {
      const { name, email, password, phone } = req.body;

      // Validate required fields
      if (!name || !email || !password || !phone) {
        return res.status(400).json({
          message: 'Missing required fields',
          required: ['name', 'email', 'password', 'phone'],
        });
      }

      let profileImagePath = '/images/default-profile.avif';

      if (req.file) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = `profile-${uniqueSuffix}.jpg`;
        const uploadPath = path.join(__dirname, '../public/uploads/profiles', filename);

        await sharp(req.file.buffer)
          .resize(300, 300)
          .jpeg({ quality: 90 })
          .toFile(uploadPath);

        profileImagePath = `/uploads/profiles/${filename}`;
      }

      const userData = { name, email, password, phone, profile_image: profileImagePath };
      const result = await User.registerUser(userData);

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: result.user_id,
          profile_image: result.profile_image,
        },
      });
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({
        message: 'Registration failed',
        error: err.message,
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      });
    }
  });
};
// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("loginuser", email, password);

    const { user, token } = await User.loginUserDetails(email, password);

    res.json({
      message: "Login successful",
      user: { user_id: user.user_id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error("Error during login:", err);

    res.status(400).json({ message: "Error logging in", error: err.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const result = await User.deleteUser(req.params.id);
    if (result.affectedRows > 0) {
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};
// Update an existing user
export const updateUser = async (req, res) => {
  try {
    const userData = req.body;
    const result = await User.updateUser(req.params.id, userData);
    if (result.affectedRows > 0) {
      res.json({ message: "User updated" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
};

export const getAllImages = async (req, res) => {
  try {
    const query = "SELECT image_id, image_url FROM images";
    const rows = await execute(query);
    console.log("rowdata", rows);
    res.status(200).send(rows);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error fetching images", error: err.message });
  }
};

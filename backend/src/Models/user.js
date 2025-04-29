import { execute } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const secret = process.env.JWT_PASS;

class User {
  static async registerUser(userData) {
    const { name, email, password, phone, profile_image } = userData;

    const namePrefix = name.slice(0, 3).toUpperCase();
    const randomSuffix = crypto.randomInt(1000, 9999);

    const user_id = `${namePrefix}${randomSuffix}`;

    const hashedPassword = await bcrypt.hash(password, 6);

    try {
      const result = await execute(
        "INSERT INTO users (user_id, name, email, password, phone, profile_image) VALUES (?, ?, ?, ?, ?, ?)",
        [user_id, name, email, hashedPassword, phone, profile_image]
      );

      return { user_id };
    } catch (err) {
      throw new Error("Error registering user: " + err.message);
    }
  }

  static async loginUserDetails(email, password) {
    console.log("loginuser", email, password);

    const [rows] = await execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    console.log("Query result in loginUserDetails:", rows);

    if (!rows || rows.length === 0) {
      throw new Error("User not found");
    }

    const user = rows;
    if (!user.password) {
      throw new Error("Password field missing in user record");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      secret,
      { expiresIn: "30d" }
    );

    return {
      user: {
        user_id: user.user_id,
      },
      token,
    };
  }

  static async updateUser(user_id, userData) {
    const { name, email } = userData;
    const [result] = await execute(
      "UPDATE users SET name = ?, email = ? WHERE user_id = ?",
      [name, email, user_id]
    );
    return result;
  }

  static async deleteUser(user_id) {
    const [result] = await execute("DELETE FROM users WHERE user_id = ?", [
      user_id,
    ]);
    return result;
  }
}

export default User;

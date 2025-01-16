//import { execute } from "../config/db";
import { execute } from "../config/db.js";

class User {
  static async getAllUsers() {
    const [rows] = await execute("SELECT * FROM users");
    return rows;
  }

  static async getUserById(user_id) {
    const [rows] = await execute("SELECT * FROM users WHERE user_id = ?", [user_id]);
    return rows[0]; // Returns the first match
  }

  static async createUser(userData) {
    const { name, email } = userData;
    const [result] = await execute(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );
    return result;
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
    const [result] = await execute("DELETE FROM users WHERE user_id = ?", [user_id]);
    return result;
  }
}

export default User;

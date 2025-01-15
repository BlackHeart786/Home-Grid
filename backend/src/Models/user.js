import { execute } from "../config/db";

class User {
  static async getAllUsers() {
    const [rows] = await execute("SELECT * FROM users");
    return rows;
  }

  static async getUserById(id) {
    const [rows] = await execute("SELECT * FROM users WHERE id = ?", [id]);
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

  static async updateUser(id, userData) {
    const { name, email } = userData;
    const [result] = await execute(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, id]
    );
    return result;
  }

  static async deleteUser(id) {
    const [result] = await execute("DELETE FROM users WHERE id = ?", [id]);
    return result;
  }
}

export default User;

import User from "../Models/user.js";

// Register user
export const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    const result = await User.registerUser(userData);
    res.status(201).json({ message: "User registered", id: result.user_id });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
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
    const query = "SELECT image_id, image_url, address FROM images";
    const [rows,fields] = await db.query(query);
    console.log("rowdata",rows)
    res.status(501).send(rows);
    
  } catch (err) {
    res.status(501).send({ message: "Error fetching images", error: err.message });
  }
};

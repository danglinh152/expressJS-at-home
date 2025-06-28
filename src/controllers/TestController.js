const connection = require("../config/Database");

require("dotenv").config();

const helloWorld = (req, res) => {
  res.send("Hello World!");
};

const testView = async (req, res) => {
  try {
    const [results] = await connection.query("SELECT * FROM `users`");
    res.render("Test", { User: results });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getHomePage = async (req, res) => {
  const [results] = await connection.query("SELECT * FROM `users`");
  res.render("Homepage", { User: results });
};

const getCreateUser = (req, res) => {
  res.render("CreateUser");
};

const postCreateUser = async (req, res) => {
  try {
    const { id, name, address, age } = req.body;

    // Make sure all fields are present (optional but recommended)
    if (!id || !name || !address || !age) {
      return res.status(400).send("All fields are required!");
    }

    const sql =
      "INSERT INTO `users` (`id`, `name`, `address`, `age`) VALUES (?, ?, ?, ?)";
    const values = [id, name, address, age];

    await connection.query(sql, values);

    res.redirect("/");
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).send("Internal Server Error");
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).send("User ID is required.");
    }

    const sql = "DELETE FROM `users` WHERE `id` = ?";
    const [result] = await connection.query(sql, [userId]);

    if (result.affectedRows === 0) {
      // No user found with this ID
      return res.status(404).send("User not found.");
    }

    // Redirect back to the list or homepage after deletion
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getUpdateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const [results] = await connection.query(
      "SELECT * FROM `users` WHERE `id` = ?",
      [userId]
    );

    if (results.length === 0) {
      return res.status(404).send("User not found.");
    }

    const user = results[0];

    res.render("UpdateUser", { user }); // Pass data to your update form EJS
  } catch (error) {
    console.error("Error fetching user for update:", error);
    res.status(500).send("Internal Server Error");
  }
};

const postUpdateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, address, age } = req.body;

    if (!name || !address || !age) {
      return res.status(400).send("All fields are required.");
    }

    const sql =
      "UPDATE `users` SET `name` = ?, `address` = ?, `age` = ? WHERE `id` = ?";
    const [result] = await connection.query(sql, [name, address, age, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).send("User not found or no changes made.");
    }

    res.redirect("/");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  helloWorld,
  testView,
  getHomePage,
  getCreateUser,
  postCreateUser,
  deleteUser,
  getUpdateUser,
  postUpdateUser,
};

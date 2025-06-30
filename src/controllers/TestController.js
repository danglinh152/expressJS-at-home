const connection = require("../config/Database");
const User = require("../models/User");

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
  // const [results] = await connection.query("SELECT * FROM `users`");

  results = await User.find({});
  res.render("Homepage", { User: results });
};

const getCreateUser = (req, res) => {
  res.render("CreateUser");
};

const postCreateUser = async (req, res) => {
  try {
    const { name, address, age } = req.body;

    // Make sure all fields are present (optional but recommended)
    if (!name || !address || !age) {
      return res.status(400).send("All fields are required!");
    }

    // const sql =
    //   "INSERT INTO `users` (`id`, `name`, `address`, `age`) VALUES (?, ?, ?, ?)";
    // const values = [id, name, address, age];

    // await connection.query(sql, values);

    User.create({
      name,
      address,
      age,
    });

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

    // const sql = "DELETE FROM `users` WHERE `id` = ?";
    // const [result] = await connection.query(sql, [userId]);

    // if (result.affectedRows === 0) {
    //   // No user found with this ID
    //   return res.status(404).send("User not found.");
    // }

    await User.deleteOne({ _id: userId }).exec();

    // Redirect back to the list or homepage after deletion
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal Server Error");
  }
};

const mongoose = require("mongoose");

const getUpdateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send("Invalid user ID.");
    }

    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.render("UpdateUser", { user });
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

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send("Invalid user ID.");
    }

    const parsedAge = Number(age);
    if (Number.isNaN(parsedAge)) {
      return res.status(400).send("Age must be a number.");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, address, age: parsedAge },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found.");
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

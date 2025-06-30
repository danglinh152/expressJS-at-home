const { default: mongoose } = require("mongoose");
const User = require("../models/User");

const HelloWorldAPI = (req, res) => {
  return res.status(200).json({ statusCode: 200, body: "Hello World" });
  //   res.send("Hello world");
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  return res.status(200).json({ ErrorCode: 0, data: users });
};

const postNewUser = async (req, res) => {
  try {
    const { name, address, age } = req.body;

    // Make sure all fields are present (optional but recommended)
    if (!name || !address || !age) {
      return res
        .status(400)
        .json({ ErrorCode: 1, data: "All fields are required!" });
    }

    const user = await User.create({
      name,
      address,
      age,
    });

    return res.status(201).json({ ErrorCode: 0, data: user });
  } catch (error) {
    console.error("Error inserting user:", error);
    return res
      .status(500)
      .json({ ErrorCode: 1, data: "Internal Server Error" });
  }
};

const updateTheUser = async (req, res) => {
  try {
    const { id, name, address, age } = req.body;

    if (!id || !name || !address || !age) {
      return res
        .status(400)
        .json({ ErrorCode: 1, data: "All fields are required." });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ ErrorCode: 1, data: "Invalid user ID." });
    }

    const parsedAge = Number(age);
    if (Number.isNaN(parsedAge)) {
      return res
        .status(400)
        .json({ ErrorCode: 1, data: "Age must be a number." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, address, age: parsedAge },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ ErrorCode: 1, data: "User not found." });
    }

    return res.status(200).json({ ErrorCode: 0, data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ ErrorCode: 1, data: "Internal Server Error" });
  }
};

const deleteTheUser = async (req, res) => {
  try {
    const userId = req.body.id;

    if (!userId) {
      return res
        .status(400)
        .json({ ErrorCode: 1, data: "User ID is required." });
    }

    await User.deleteOne({ _id: userId }).exec();

    // Redirect back to the list or homepage after deletion
    return res.status(204).json({ ErrorCode: 0, data: "Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res
      .status(500)
      .json({ ErrorCode: 1, data: "Internal Server Error" });
  }
};

module.exports = {
  HelloWorldAPI,
  getAllUsers,
  postNewUser,
  updateTheUser,
  deleteTheUser,
};

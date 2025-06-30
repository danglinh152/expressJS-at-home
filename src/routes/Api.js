const express = require("express");
const {
  HelloWorldAPI,
  getAllUsers,
  postNewUser,
  updateTheUser,
  deleteTheUser,
} = require("../controllers/APIController");

const routerAPI = express.Router();

// Register routes
routerAPI.get("/", HelloWorldAPI);

routerAPI.get("/users", getAllUsers);
routerAPI.post("/users", postNewUser);
routerAPI.put("/users", updateTheUser);
routerAPI.delete("/users", deleteTheUser);

module.exports = routerAPI;

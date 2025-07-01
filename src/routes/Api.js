const express = require("express");
const {
  HelloWorldAPI,
  getAllUsers,
  postNewUser,
  updateTheUser,
  deleteTheUser,
} = require("../controllers/APIController");
const { uploadAPI, uploadManyAPI } = require("../controllers/FileController");
const {
  getAllCustomers,
  postNewCustomer,
  updateTheCustomer,
  deleteTheCustomer,
} = require("../controllers/CustomerController");

const routerAPI = express.Router();

// Register routes
routerAPI.get("/", HelloWorldAPI);

routerAPI.get("/users", getAllUsers);
routerAPI.post("/users", postNewUser);
routerAPI.put("/users", updateTheUser);
routerAPI.delete("/users", deleteTheUser);

routerAPI.get("/customers", getAllCustomers);
routerAPI.post("/customers", postNewCustomer);
routerAPI.put("/customers", updateTheCustomer);
routerAPI.delete("/customers", deleteTheCustomer);

routerAPI.post("/upload", uploadAPI);
routerAPI.post("/upload-many", uploadManyAPI);

module.exports = routerAPI;

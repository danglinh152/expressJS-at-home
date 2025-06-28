const express = require("express");

const {
  getHomePage,
  testView,
  getCreateUser,
  postCreateUser,
  getUpdateUser,
  postUpdateUser,
  deleteUser,
} = require("../controllers/TestController"); // adjust path!

const router = express.Router();

// Register routes
router.get("/", getHomePage);
router.get("/create-user", getCreateUser);
router.get("/test", testView);
router.get("/update-user/:id", getUpdateUser);

router.post("/create-user", postCreateUser);
router.post("/update-user/:id", postUpdateUser);

router.post("/delete-user/:id", deleteUser);

module.exports = router;

const express = require("express");
const {
  getUsers,
  registerUser,
  loginUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);

module.exports = router;

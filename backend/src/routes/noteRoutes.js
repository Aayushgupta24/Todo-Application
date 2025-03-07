const express = require("express");
const { addNote } = require("../controllers/noteController");

const router = express.Router();
router.post("/", addNote);

module.exports = router;

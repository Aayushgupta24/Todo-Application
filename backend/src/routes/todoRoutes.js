const express = require("express");
const { getTodos, createTodo } = require("../controllers/todoController");
const Todo = require("../models/Todo");

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    if (!title || title.trim().length === 0) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = new Todo({
      title: title.trim(),
      description: description ? description.trim() : "",
      completed: completed || false,
    });

    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(400).json({
      message: error.message || "Failed to create todo",
      details: error.errors,
    });
  }
});

module.exports = router;

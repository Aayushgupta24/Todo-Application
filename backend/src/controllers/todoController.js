const Todo = require("../models/Todo");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().populate("user").populate("assignedUsers");
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, description, priority, user, tags, assignedUsers } =
      req.body;
    const todo = new Todo({
      title,
      description,
      priority,
      user,
      tags,
      assignedUsers,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getTodos, createTodo };

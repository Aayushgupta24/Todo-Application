const Note = require("../models/Note");

const addNote = async (req, res) => {
  try {
    const { content, todo } = req.body;
    const note = new Note({ content, todo });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addNote };

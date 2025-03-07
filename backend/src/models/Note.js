const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    todo: { type: mongoose.Schema.Types.ObjectId, ref: "Todo", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);

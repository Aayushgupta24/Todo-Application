const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tags: [String],
    assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);

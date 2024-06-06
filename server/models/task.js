const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
});

const Task = mongoose.model('tasks', taskSchema);

module.exports = Task;

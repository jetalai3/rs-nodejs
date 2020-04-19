const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    order: Number,
    userId: String,
    boardId: String,
    columnId: String
  }
);

taskSchema.statics.toResponse = task => {
  if (task) {
    const { _id, title, order, description, userId, boardId, columnId } = task;
    return { id: _id, title, order, description, userId, boardId, columnId };
  }
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

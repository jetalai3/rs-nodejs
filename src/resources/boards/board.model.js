const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: [
      {
        _id: String,
        title: String,
        order: Number
      }
    ]
  }
);

boardSchema.statics.toResponse = board => {
  const { _id, title, columns } = board;
  const responeColumns = columns.map(Board.columnToResponse);

  return { id: _id, title, columns: responeColumns };
};

boardSchema.statics.columnToResponse = column => {
  const { _id, title, order } = column;
  return { id: _id, title, order };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
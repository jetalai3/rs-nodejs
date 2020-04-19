const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/tasks').get(async (_, res, next) => {
  try {
    const tasks = await taskService.getAll();
    res.json(tasks.map(Task.toResponse));
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks').get(async (req, res, next) => {
  try {
    const boardId = req.params.boardId;

    const tasks = await taskService.getTaskByBoardId(boardId);
    res.json(tasks.map(Task.toResponse));
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:id').get(async (req, res, next) => {
  try {
    const id = req.params.id;
    const boardId = req.params.boardId;

    const task = await taskService.getTaskByBoardAndTaskId(id, boardId);
    res.json(Task.toResponse(task));
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks').post(async (req, res, next) => {
  try {
    const boardId = req.params.boardId;

    const newTask = await taskService.addTask(boardId, req.body);
    res.status(200).json(Task.toResponse(newTask));
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:id').put(async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const boardId = req.params.boardId;

    await taskService.updateTaskById(id, boardId, body);
    res.status(200).json();
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:id').delete(async (req, res, next) => {
  try {
    const id = req.params.id;
    const boardId = req.params.boardId;

    await taskService.deleteTaskById(id, boardId);
    res.status(200).json();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

const router = require('express').Router();
const { Task } = require('./task.model');
const tasksService = require('./task.service');

router.route('/tasks').get(async (_, res, next) => {
  try {
    const tasks = await tasksService.getAll();
    res.json(tasks.map(Task.toResponse));
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks').get(async (req, res, next) => {
  try {
    const boardId = req.params.boardId;

    const tasks = await tasksService.getTaskByBoardId(boardId);
    res.json(tasks.map(Task.toResponse));
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:id').get(async (req, res, next) => {
  try {
    const id = req.params.id;
    const boardId = req.params.boardId;

    const task = await tasksService.getTaskByBoardAndTaskId(id, boardId);
    res.json(Task.toResponse(task));
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks').post(async (req, res, next) => {
  try {
    const task = new Task(req.body);
    const boardId = req.params.boardId;

    const newTask = await tasksService.addTask(boardId, task);
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

    await tasksService.updateTaskById(id, boardId, body);
    res.status(200).json();
  } catch (error) {
    return next(error);
  }
});

router.route('/:boardId/tasks/:id').delete(async (req, res, next) => {
  try {
    const id = req.params.id;
    const boardId = req.params.boardId;

    await tasksService.deleteTaskById(id, boardId);
    res.status(200).json();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

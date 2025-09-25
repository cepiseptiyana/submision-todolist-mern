const todoController = require("../controllers/todoController");
const express = require("express");

const router = express.Router();

// GET ALL TODOS
router.get("/", (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 10;
    const search = req.query.search || "";

    todoController.getAllTodos(req, res, { page, perPage, search });
  } catch (err) {
    // skip semua middleware normal
    next(err);
  }
});

// GET BY ID
router.get("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    todoController.getTodoById(req, res, id);
  } catch (err) {
    next(err);
  }
});

// CREATE TOOD
router.post("/", (req, res, next) => {
  try {
    todoController.createTodo(req, res);
  } catch (err) {
    // skip semua middleware normal
    next(err);
  }
});

// DELETE TOOD
router.delete("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    todoController.deleteTodo(id, res);
  } catch (err) {
    next(err);
  }
});

// UPDATE TODO
router.put("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    todoController.updateTodo(id, req, res);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

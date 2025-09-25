const categoryController = require("../controllers/categoryController");
const express = require("express");

const router = express.Router();

// GET ALL CATEGORIES
router.get("/", (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 10;
    const search = req.query.search || "";

    categoryController.getAllCategories(req, res, { page, perPage, search });
  } catch (err) {
    // skip semua middleware normal
    // ke middleware error
    next(err);
  }
});

// GET BY ID
router.get("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    categoryController.getTodoById(req, res, id);
  } catch (err) {
    next(err);
  }
});

// CREATE CATEGORY
router.post("/", (req, res, next) => {
  try {
    categoryController.createCategory(req, res);
  } catch (err) {
    // skip semua middleware normal
    next(err);
  }
});

// DELETE CATEGORY
router.delete("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    categoryController.deleteCategory(id, res);
  } catch (err) {
    next(err);
  }
});

// UPDATE TODO
router.put("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    categoryController.updateCategory(id, req, res);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

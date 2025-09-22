const Joi = require("joi");
const { Category, Todo } = require("../models");

// GET TODO
exports.getAllCategories = async (req, res, { page, perPage }) => {
  try {
    const { count, rows } = await Todo.findAndCountAll({
      limit: perPage,
      offset: (page - 1) * perPage,
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "color"],
        },
      ],
    });

    const todosData = rows.map((todo) => ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      category: todo.category,
      created_at: todo.createdAt,
      updated_at: todo.updatedAt,
    }));

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: todosData,
        pagination: {
          current_page: page,
          per_page: perPage,
          total: count,
          total_pages: Math.ceil(count / perPage),
        },
      })
    );
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: false, message: err.message }));
  }
};

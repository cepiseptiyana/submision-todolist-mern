const { Op } = require("sequelize");
const Joi = require("joi");
const { Category, Todo } = require("../models");

// GET TODO
module.exports.getAllTodos = async (req, res, { page, perPage, search }) => {
  try {
    const whereClause = search
      ? {
          title: {
            [Op.iLike]: `%${search}%`, // case-insensitive LIKE
          },
        }
      : {};

    const { count, rows } = await Todo.findAndCountAll({
      where: whereClause,
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

    // Jika tidak ada data
    if (rows.length === 0) {
      return res.status(200).json({
        status: false,
        message: "No todos found",
        data: [],
        pagination: {
          current_page: page,
          per_page: perPage,
          total: count,
          total_pages: Math.ceil(count / perPage),
        },
      });
    }

    // KIRIM RESPONSE
    res.status(200).json({
      status: true,
      data: rows,
      pagination: {
        current_page: page,
        per_page: perPage,
        total: count,
        total_pages: Math.ceil(count / perPage),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// GET BY ID
module.exports.getTodoById = async (req, res, id) => {
  try {
    const todo = await Todo.findByPk(id, {
      include: [
        {
          model: Category,
          as: "category", // harus sama dengan alias di model
          attributes: ["id", "name", "color"],
        },
      ],
    });

    if (!todo) {
      return res
        .status(500)
        .json({ status: false, data: null, message: "Todo not found" });
    }

    res.status(200).json({ status: true, data: todo, message: null });
  } catch (err) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// CREATE TODO
module.exports.createTodo = async (req, res) => {
  const body = req.body;

  try {
    const schema = Joi.object({
      title: Joi.string().min(3).required(),
      description: Joi.string().allow(""),
      completed: Joi.boolean().default(false),
      category_id: Joi.number().integer().optional(),
      priority: Joi.string().valid("low", "medium", "high").default("medium"),
      due_date: Joi.date().optional(),
    });

    // Validasi body request
    const { error, value } = schema.validate(body);
    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });
    }

    // CREATE data
    const todo = await Todo.create(value);

    res
      .status(201)
      .json({ status: true, message: "Create Todo Successfully.", data: todo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// DELETE TODO
module.exports.deleteTodo = async (id, res) => {
  try {
    const todo = await Todo.findByPk(id);

    if (!todo) {
      // Todo tidak ditemukan
      return res.status(404).json({
        status: false,
        message: "Todo not found",
        data: null,
      });
    }

    const todoDelete = await todo.destroy();

    res.status(201).json({
      status: true,
      message: "Todo deleted successfully.",
      data: todoDelete,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// UPDATE TODO
module.exports.updateTodo = async (id, req, res) => {
  const body = req.body;

  try {
    const todo = await Todo.findByPk(id);

    if (!todo) {
      res
        .status(500)
        .json({ status: false, data: null, message: "Todo not found" });
    }

    // validasi Todo baru
    const schema = Joi.object({
      title: Joi.string().min(3).required(),
      description: Joi.string().allow(""),
      completed: Joi.boolean().default(false),
      category_id: Joi.number().integer().optional(),
      priority: Joi.string().valid("low", "medium", "high").default("medium"),
      due_date: Joi.date().optional(),
    });

    const { error, value } = schema.validate(body);

    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });
    }

    // UPDATE data
    const update = await todo.update(value);

    return res.status(200).json({
      status: true,
      message: "Update Todo Successfully.",
      data: update,
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

const { Op } = require("sequelize");
const Joi = require("joi");
const { Category, Todo } = require("../models");

// GET TODO
exports.getAllTodos = async (req, res, { page, perPage, search }) => {
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

    const todosData = rows.map((todo) => ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      category: todo.category,
      completed: todo.completed,
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

// GET getTodoById
exports.getTodoById = async (req, res, id) => {
  try {
    const todo = await Todo.findByPk(Number(id), {
      include: [
        {
          model: Category,
          as: "category", // harus sama dengan alias di model
          attributes: ["id", "name", "color"],
        },
      ],
    });

    if (!todo) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ status: false, data: null, message: "Todo not found" })
      );
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: true, data: todo, message: null }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ status: false, data: null, message: error.message })
    );
  }
};

// CREATE
exports.createTodo = async (req, res) => {
  try {
    const schema = Joi.object({
      title: Joi.string().min(3).required(),
      description: Joi.string().allow(""),
      completed: Joi.boolean().default(false),
      category_id: Joi.number().integer().optional(),
      priority: Joi.string().valid("low", "medium", "high").default("medium"),
      due_date: Joi.date().optional(),
    });

    // Kumpulin body request
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    // kalau semua data sudah masuk
    req.on("end", async () => {
      let data;

      // gagal jika body bukan JSON
      try {
        data = JSON.parse(body); // bisa gagal jika body bukan JSON
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ status: false, message: "Invalid JSON" })
        );
      }

      // ✅ validasi input
      const { error, value } = schema.validate(data);
      if (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            status: false,
            message: error.details[0].message,
          })
        );
      }

      // CREATE data
      await Todo.create(value);

      // kirim response
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ status: true, message: "Create Todo Successfully." })
      );
    });
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: false, message: err.message }));
  }
};

// DELETE
exports.deleteTodo = async (id, res) => {
  try {
    const todo = await Todo.findByPk(Number(id));

    if (!todo) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: false, message: "Todo not found." }));
      return;
    }

    // DELETE
    await todo.destroy();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ status: true, message: "Todo deleted successfully." })
    );
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: false, message: "Server error." }));
  }
};

// UPDATE
exports.updateTodo = async (id, req, res) => {
  try {
    let body = "";

    // cari todo
    const todo = await Todo.findByPk(Number(id));

    // todo tidak ada
    if (!todo) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: false, message: "Todo not found" }));
      return;
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

    // get data req
    req.on("data", (chunk) => {
      body += chunk;
    });

    // kirim response
    req.on("end", async () => {
      let data;

      // gagal jika body bukan JSON
      try {
        data = JSON.parse(body);
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ status: false, message: "Invalid JSON" })
        );
      }

      // ✅ validasi input
      const { error, value } = schema.validate(data);
      if (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            status: false,
            message: error.details[0].message,
          })
        );
      }

      // UPDATE data
      await todo.update(value);

      // kirim response
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ status: true, message: "Update Todo Successfully." })
      );
    });
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: false, message: err.message }));
  }
};

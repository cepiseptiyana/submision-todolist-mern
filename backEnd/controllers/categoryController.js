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

exports.createCategory = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      color: Joi.string()
        .pattern(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/)
        .allow(""),
    });

    // Kumpulin body request
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    // kalau semua data sudah masuk
    req.on("end", async () => {
      let data;

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
      await Category.create(value);

      // kirim response
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: true,
          message: "Create Category Successfully.",
        })
      );
    });
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: false, message: err.message }));
  }
};

exports.deleteCategory = async (id, res) => {
  try {
    const category = await Category.findByPk(Number(id));

    if (!category) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ status: false, message: "Category not found." })
      );
      return;
    }

    // DELETE
    await category.destroy();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: true,
        message: "Category deleted successfully.",
      })
    );
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: false, message: "Server error." }));
  }
};

exports.updateCategory = async (id, req, res) => {
  try {
    let body = "";

    // cari category
    const category = await Category.findByPk(Number(id));

    // todo tidak ada
    if (!category) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: false, message: "Category not found" }));
      return;
    }

    // validasi Category baru
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      color: Joi.string()
        .pattern(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/)
        .allow(""),
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
      await category.update(value);

      // kirim response
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: true,
          message: "Update Category Successfully.",
        })
      );
    });
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: false, message: err.message }));
  }
};

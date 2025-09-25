const { Op } = require("sequelize");
const Joi = require("joi");
const { Category } = require("../models");

// GET ALL
module.exports.getAll = async (req, res) => {
  try {
    const categories = await Category.findAll();

    if (!categories) {
      return res
        .status(404)
        .json({ status: false, data: null, message: "Category not found" });
    }

    res
      .status(200)
      .json({ status: true, data: categories, message: "Get all" });
  } catch (err) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// GET CATEGORIES PAGINATIONS
module.exports.getAllCategories = async (
  req,
  res,
  { page, perPage, search }
) => {
  try {
    const whereClause = search
      ? {
          name: {
            [Op.iLike]: `%${search}%`, // case-insensitive LIKE
          },
        }
      : {};

    const { count, rows } = await Category.findAndCountAll({
      where: whereClause,
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    // Jika tidak ada data
    if (rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No Categories found",
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
    const category = await Category.findByPk(id);

    if (!category) {
      return res
        .status(404)
        .json({ status: false, data: null, message: "Category not found" });
    }

    res.status(200).json({ status: true, data: category, message: null });
  } catch (err) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// CREATE CATEGORY
module.exports.createCategory = async (req, res) => {
  const body = req.body;

  try {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      color: Joi.string()
        .pattern(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/)
        .allow(""),
    });

    const { error, value } = schema.validate(body);
    if (error) {
      return res
        .status(404)
        .json({ status: false, message: error.details[0].message });
    }

    // CREATE data
    const category = await Category.create(value);

    res.status(201).json({
      status: true,
      message: "Create Category Successfully.",
      data: category,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// DELETE CATEGORY
module.exports.deleteCategory = async (id, res) => {
  try {
    const category = await Category.findByPk(id);

    if (!category) {
      // Todo tidak ditemukan
      return res.status(404).json({
        status: false,
        message: "Category not found",
        data: null,
      });
    }

    const deleteCategory = await category.destroy();

    res.status(201).json({
      status: true,
      message: "Category deleted successfully.",
      data: deleteCategory,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// UPDATE CATEGORY
module.exports.updateCategory = async (id, req, res) => {
  const body = req.body;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      res
        .status(404)
        .json({ status: false, data: null, message: "Category not found" });
    }

    // validasi Todo baru
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      color: Joi.string()
        .pattern(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/)
        .allow(""),
    });

    const { error, value } = schema.validate(body);

    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });
    }

    // UPDATE data
    const update = await category.update(value);

    return res.status(200).json({
      status: true,
      message: "Update Category Successfully.",
      data: update,
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

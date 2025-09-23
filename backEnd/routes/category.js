const categoryController = require("../controllers/categoryController");

exports.handleCategoryRoute = (req, res) => {
  const method = req.method;
  const { pathname, searchParams } = new URL(
    req.url,
    `http://${req.headers.host}`
  );

  try {
    // GET ALL CATEGORIES & PAGINATION
    if (method === "GET" && pathname === "/api/categories") {
      const page = Number(searchParams.get("page")) || 1;
      const perPage = Number(searchParams.get("perPage")) || 10;

      categoryController.getAllCategories(req, res, { page, perPage });
      return true;
    }

    // CREATE
    if (method === "POST" && pathname === "/api/categories") {
      categoryController.createCategory(req, res);
      return true;
    }

    // DELETE
    if (method === "DELETE" && pathname.startsWith("/api/categories/")) {
      const id = Number(pathname.split("/")[3]);

      categoryController.deleteCategory(id, res);
      return true;
    }

    // EDIT TODO
    if (method === "PUT" && pathname.startsWith("/api/categories/")) {
      const id = Number(pathname.split("/")[3]);

      categoryController.updateCategory(id, req, res);
      return true;
    }

    return false; // server 404
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: false, message: err.message }));
    return true; // tetap dianggap handled
  }
};

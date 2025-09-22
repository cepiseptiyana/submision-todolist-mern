const categoryController = require("../controllers/categoryController");

exports.handleCategoryRoute = (req, res) => {
  const method = req.method;
  const { pathname, searchParams } = new URL(
    req.url,
    `http://${req.headers.host}`
  );

  try {
    if (method === "GET" && pathname === "/api/categories") {
      const page = Number(searchParams.get("page")) || 1;
      const perPage = Number(searchParams.get("perPage")) || 10;

      categoryController.getAllCategories(req, res, { page, perPage });
      return true;
    }
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: false, message: err.message }));
    return true; // tetap dianggap handled
  }
};

const todoController = require("../controllers/todoController");

exports.handleTodoRoute = (req, res) => {
  const method = req.method;
  const { pathname, searchParams } = new URL(
    req.url,
    `http://${req.headers.host}`
  );

  try {
    // GET ALL
    if (method === "GET" && pathname === "/api/todos") {
      const page = Number(searchParams.get("page")) || 1;
      const perPage = Number(searchParams.get("perPage")) || 10;
      const search = searchParams.get("search") || "";

      todoController.getAllTodos(req, res, { page, perPage, search });
      return true; // route sudah ke-handle
    }

    // GET getTodoById TODO
    if (method === "GET" && pathname.startsWith("/api/todos/")) {
      const id = Number(pathname.split("/")[3]);

      todoController.getTodoById(req, res, id);
      return true; // route sudah ke-handle
    }

    // CREATE TOOD
    if (method === "POST" && pathname === "/api/todos") {
      todoController.createTodo(req, res);
      return true;
    }

    // DELETE TOOD
    if (method === "DELETE" && pathname.startsWith("/api/todos/")) {
      const id = Number(pathname.split("/")[3]);

      todoController.deleteTodo(id, res);
      return true;
    }

    // UPDATE TODO
    if (method === "PUT" && pathname.startsWith("/api/todos/")) {
      const id = Number(pathname.split("/")[3]);

      todoController.updateTodo(id, req, res);
      return true;
    }

    return false; // server 404
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: false, message: err.message }));
    return true; // tetap dianggap handled
  }
};

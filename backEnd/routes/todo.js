const todoController = require("../controllers/todoController");

exports.handleTodoRoute = (req, res) => {
  const method = req.method;
  const { pathname, searchParams } = new URL(
    req.url,
    `http://${req.headers.host}`
  );

  try {
    if (method === "GET" && pathname === "/todos") {
      todoController.getAllTodos(req, res);
      return true; // route sudah ke-handle
    }

    if (method === "POST" && pathname === "/create-todo") {
      todoController.createTodo(req, res);
      return true;
    }

    if (method === "DELETE" && pathname === "/delete-todo") {
      const id = Number(searchParams.get("id"));

      todoController.deleteTodo(id, res);
      return true;
    }

    if (method === "PUT" && pathname.startsWith("/update-todo/")) {
      const todoId = Number(pathname.split("/")[2]);
      todoController.updateTodo(todoId, req, res);
      return true;
    }

    return false; // server 404
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: false, message: err.message }));
    return true; // tetap dianggap handled
  }
};

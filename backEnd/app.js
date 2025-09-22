const { createServer } = require("node:http");

// rotues
const { handleTodoRoute } = require("./routes/todo");
const { handleCategoryRoute } = require("./routes/category");

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  if (handleTodoRoute(req, res)) return;
  if (handleCategoryRoute(req, res)) return;

  // Kalau tidak ada route yang cocok → 404
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Page not found");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

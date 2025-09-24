const { createServer } = require("node:http");

// rotues
const { handleTodoRoute } = require("./routes/todo");
const { handleCategoryRoute } = require("./routes/category");

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow semua origin
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    res.writeHead(204); // No Content
    res.end();
    return;
  }

  if (handleTodoRoute(req, res)) return;
  if (handleCategoryRoute(req, res)) return;

  // Kalau tidak ada route yang cocok → 404
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Page not found");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

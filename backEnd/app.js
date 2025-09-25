const express = require("express");
const cors = require("cors");

const hostname = "127.0.0.1";
const port = 3000;

// Middleware
const handleTodoRoute = require("./routes/todo");
const handleCategoryRoute = require("./routes/category");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/todos", handleTodoRoute);
app.use("/api/categories", handleCategoryRoute);

// 404 middleware → kalau route tidak ada
// midddleware normal
app.use((req, res) => {
  res.status(404).json({ status: false, message: "Route not found" });
});

// Error middleware → kalau controller lempar error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).json({ status: false, message: err.message });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

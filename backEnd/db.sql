-- Up: buat tabel
CREATE TABLE "Categories" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  color VARCHAR(20),
  "createdAt" TIMESTAMP,
  "updatedAt" TIMESTAMP
);

CREATE TABLE "Todos" (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  completed BOOLEAN,
  category_id INT,
  priority VARCHAR(50),
  due_date DATE,
  "createdAt" TIMESTAMP,
  "updatedAt" TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES "Categories"(id) ON DELETE SET NULL
);

-- Down: hapus tabel (untuk rollback)
DROP TABLE "Todos";
DROP TABLE "Categories";